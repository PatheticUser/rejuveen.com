import type {ComponentChildren, JSX} from 'preact';
import {useContext} from 'preact/hooks';

import {I18nContext} from './context';
import type {LocaleDictionary, TranslateOptions} from './types';

export const useI18nContext = () => useContext(I18nContext);

const stringVarType = ['string', undefined];

export const useI18n = () => {
  const {locale, translations} = useI18nContext();

  const translate = (
    key: string,
    options?: TranslateOptions,
  ): ComponentChildren => {
    const keys = key.split('.');

    if (!translations || !locale) {
      throw new ReferenceError();
    }

    const {count, defaultValue, ...variables} = options || {};
    let ret: LocaleDictionary | string | undefined = translations.get(locale);

    if (!ret && options?.defaultValue) {
      return options.defaultValue;
    }

    try {
      // Traverse through the translation data one "scope" at a time
      for (const key of keys) {
        switch (typeof ret) {
          case 'object':
            ret = ret[key];
            break;
          case 'string':
          case 'undefined':
            throw new ReferenceError();
        }
      }

      // If we don't have a key throw a reference error that we can catch below.
      if (typeof ret === 'undefined') {
        throw new ReferenceError();
      }

      if (typeof translations !== 'string' && count) {
        let key = count === 1 ? 'one' : 'other';

        if (
          count === 0 &&
          typeof translations !== 'string' &&
          'zero' in translations
        ) {
          key = 'zero';
        }

        ret = (ret as LocaleDictionary)[key];
      }

      if (typeof ret !== 'string') {
        throw new ReferenceError();
      }

      let withJSX = false;
      const replacements = Object.keys(variables);
      const resultList: (string | JSX.Element)[] = ret.split(
        new RegExp(`({${replacements.join('}|{')}})`, 'g'),
      );

      replacements.forEach((key) => {
        if (!withJSX && !stringVarType.includes(typeof variables[key])) {
          withJSX = true;
        }
        resultList.forEach((item, index) => {
          if (item === `{${key}}`) {
            resultList[index] = variables[key];
          }
        });
      });

      if (withJSX) {
        return <>{resultList}</>;
      }

      return resultList.join('');
    } catch (err) {
      // If the options provided contain a default value, return it.
      if (defaultValue) {
        return defaultValue;
      }

      // Return the provided key back to the DOM.
      return key;
    }
  };

  return {
    locale,
    translate,
  };
};
