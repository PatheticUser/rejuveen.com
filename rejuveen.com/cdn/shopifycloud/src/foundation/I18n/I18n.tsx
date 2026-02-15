import {useCallback, useEffect, useMemo, useState} from 'preact/hooks';

import {useBugsnag} from '~/foundation/Bugsnag/hooks';
import {useOpenTelemetry} from '~/foundation/OpenTelemetry/hooks';
import {useRootProvider} from '~/foundation/RootProvider/hooks';
import {debounce} from '~/utils/debounce';
import {isoDocument} from '~/utils/document';
import {AbstractShopJSError} from '~/utils/errors';
import {importWithRetry} from '~/utils/importWithRetry';
import {isoNavigator} from '~/utils/navigator';
import {isoWindow} from '~/utils/window';

import {I18nContext, SUPPORTED_LOCALES} from './context';
import type {
  Dictionary,
  I18nProviderProps,
  Locale,
  LocaleDictionary,
} from './types';

function isSupportedLocale(locale: any): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale);
}

const pendingCallbacks: (() => void)[] = [];
const pendingTranslations: LocaleDictionary[] = [];
const translations: Dictionary = new Map();

function updateTranslations(locale: Locale) {
  let dictionary: LocaleDictionary = {};
  const currentDictionary = translations.get(locale);

  pendingTranslations.forEach((translations) => {
    dictionary = {
      ...dictionary,
      ...translations,
    };
  });

  translations.set(locale, {
    ...currentDictionary,
    ...dictionary,
  });

  pendingCallbacks.forEach((callback) => callback());

  // Clean up our pending state.
  pendingCallbacks.splice(0, pendingCallbacks.length);
  pendingTranslations.splice(0, pendingTranslations.length);
}

const debouncedUpdateTranslations = debounce(updateTranslations, 250);

export function I18nProvider({
  children,
  getFeatureDictionary,
  overrideLocale,
}: I18nProviderProps) {
  const {notify} = useBugsnag();
  const {recordCounter} = useOpenTelemetry();
  const {featureName} = useRootProvider();
  const [loading, setLoading] = useState<boolean>();
  const [locale, setLocale] = useState<Locale | undefined>(
    // eslint-disable-next-line no-process-env
    (process.env.BUILD_LOCALE as Locale) || undefined,
  );

  const getDefaultLanguage = useCallback(() => {
    // The order of the locales is important, the first one that is supported will be used.
    const potentialLocales = Object.freeze(
      [
        overrideLocale,
        isoDocument.documentElement.lang,
        isoWindow.Shopify?.locale,
        ...isoNavigator.languages,
      ].filter((locale) => locale),
    );

    let result: Locale | undefined;
    for (const localeCandidate of potentialLocales) {
      if (isSupportedLocale(localeCandidate)) {
        result = localeCandidate;
        break;
      }
      try {
        const parsedLocale = new Intl.Locale(localeCandidate);

        if (parsedLocale.language && isSupportedLocale(parsedLocale.language)) {
          // Fallback on the unsupported language, pick the language without the region (e.g. 'en-GB' -> 'en')
          result = parsedLocale.language;
          break;
        } else {
          recordCounter('shop_js_unsupported_locale', {
            attributes: {
              locale: localeCandidate,
            },
          });
          // eslint-disable-next-line no-console
          console.error(`Unsupported locale: "${localeCandidate}"`);
        }
      } catch (error) {
        // Intl.Locale failed to parse the locale
        recordCounter('shop_js_invalid_locale', {
          attributes: {
            locale: localeCandidate,
          },
        });

        // eslint-disable-next-line no-console
        console.error(`Invalid locale: "${localeCandidate}"`);
      }
    }

    if (result) {
      return result;
    }

    return 'en';
  }, [overrideLocale, recordCounter]);

  const loadDictionary = useCallback(async () => {
    if (!isSupportedLocale(locale)) {
      return;
    }

    try {
      // Add the shared translations to the dictionary.
      if (!translations.has(locale)) {
        setLoading(true);

        try {
          const dictionary: Dictionary = await importWithRetry(
            async () => {
              const importedDictionary = await import(
                `./translations/${locale}.json`
              );
              return importedDictionary;
            },
            {maxRetries: 5, retryDelay: 1000},
          );
          translations.set(locale, dictionary);
        } catch (error) {
          if (locale !== 'en') {
            /**
             * Re-throw if non-English translations failed to fetch. We will rescue this further down and
             * attempt to re-invoke loadDictionary by setting the locale to 'en'.
             *
             * This ensures that we do not falsely set the loading state to false and display our translation
             * keys as the content when rendered.
             */
            throw new AbstractShopJSError(
              'Failed to fetch non-English translations',
              'HandledTranslationFetchError',
            );
          }

          notify(
            new AbstractShopJSError(
              `Failed to load shared translations for "en" locale: ${error}`,
              'TranslationFetchError',
            ),
          );
        }
      }

      // Add the feature translations to the dictionary.
      if (featureName && getFeatureDictionary) {
        setLoading(true);

        try {
          const featureDictionary =
            (await importWithRetry(async () => getFeatureDictionary(locale), {
              maxRetries: 5,
              retryDelay: 1000,
            })) || {};
          pendingTranslations.push(featureDictionary);
        } catch (error) {
          /**
           * Re-throw if non-English translations failed to fetch. We will rescue this further down and
           * attempt to re-invoke loadDictionary by setting the locale to 'en'.
           *
           * This ensures that we do not falsely set the loading state to false and display our translation
           * keys as the content when rendered.
           */
          if (locale !== 'en') {
            throw new AbstractShopJSError(
              'Failed to fetch non-English translations',
              'HandledTranslationFetchError',
            );
          }

          notify(
            new AbstractShopJSError(
              `Failed to load ${featureName} translations for "en" locale: ${error}`,
              'TranslationFetchError',
            ),
          );
        }
      }

      pendingCallbacks.push(() => setLoading(false));

      debouncedUpdateTranslations(locale);
    } catch (error) {
      if (
        error instanceof AbstractShopJSError &&
        error.name === 'HandledTranslationFetchError'
      ) {
        recordCounter('shop_js_handle_silent_error', {
          attributes: {
            error: error.name,
            locale,
          },
        });

        setLocale('en');
      }
    }
  }, [featureName, getFeatureDictionary, locale, notify, recordCounter]);

  useEffect(() => {
    const defaultLanguage = getDefaultLanguage();
    setLocale(defaultLanguage);
  }, [getDefaultLanguage]);

  useEffect(() => {
    try {
      loadDictionary();
    } catch (error) {
      if (error instanceof Error) {
        notify(error);
      }
    }
  }, [loadDictionary, locale, notify]);

  const value = useMemo(() => {
    return {
      loading,
      locale,
      translations,
    };
  }, [loading, locale]);

  return (
    <I18nContext.Provider value={value}>
      {loading === false && children}
    </I18nContext.Provider>
  );
}

/**
 * This allows us to set the translations content for testing, ensuring cache functionality, providing more granular
 * control over the translations loading and various network conditions.
 *
 * This returns undefined in non-testing environments to ensure the constant does not exist in production builds.
 */
export const __testHelper__ =
  // eslint-disable-next-line no-process-env
  process.env.NODE_ENV === 'testing' ? {translations} : undefined;
