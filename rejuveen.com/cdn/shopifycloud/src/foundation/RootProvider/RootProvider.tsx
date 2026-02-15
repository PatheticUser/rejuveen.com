/**
 * Injects a style tag with a string that gets replaced at build with the compiled
 * Tailwind styles. This is required for our top-level components since we utilize
 * the shadow DOM.
 *
 * This Provider also wraps the top-level component in the Bugsnag, I18n, and Monorail
 * providers ensuring that all sub components in the tree are also translated and have
 * eventing + bugsnag functionality.
 */
import type {FunctionComponent} from 'preact';
import {useEffect, useMemo} from 'preact/hooks';
import {v4 as uuidv4} from 'uuid';

import {isoDocument} from '~/utils/document';

import {AuthorizeStateProvider} from '../AuthorizeState/AuthorizeStateProvider';
import {BugsnagProvider} from '../Bugsnag/BugsnagProvider';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import {I18nProvider} from '../I18n/I18n';
import {MonorailProvider} from '../Monorail/MonorailProvider';
import {OpenTelemetryProvider} from '../OpenTelemetry/OpenTelemetryProvider';

import {RootContext} from './context';
import type {
  MetricsProviderProps,
  RootProviderProps,
  StateProviderProps,
} from './types';

const SHOPLIFTED_FONT_FACES = `
@font-face {
  font-family: 'GTStandard-M';
  src: url('https://cdn.shopify.com/shop-assets/static_uploads/shoplift/GTStandard-MRegular.woff2')
    format('woff2');
  font-style: normal;
  font-weight: 450;
  font-display: swap;
}

@font-face {
  font-family: 'GTStandard-M';
  src: url('https://cdn.shopify.com/shop-assets/static_uploads/shoplift/GTStandard-MMedium.woff2')
    format('woff2');
  font-style: normal;
  font-weight: 500;
  font-display: swap;
}

@font-face {
  font-family: 'GTStandard-M';
  src: url('https://cdn.shopify.com/shop-assets/static_uploads/shoplift/GTStandard-MSemibold.woff2')
    format('woff2');
  font-style: normal;
  font-weight: 600;
  font-display: swap;
}`;

const GRAVITY_FONT_FACES_SELECTOR = 'gravity-font-faces';

export const RootProvider: FunctionComponent<RootProviderProps> = ({
  authorizeStateEnabled = true,
  children,
  devMode = false,
  element,
  featureName,
  getFeatureDictionary,
  metricsEnabled = true,
  monorailProps,
  overrideLocale,
}) => {
  // Web components don't support @font-face in the shadow dom, so have to hack around it.
  useEffect(() => {
    // Check to make sure the fonts haven't already been loaded by another feature.
    if (
      isoDocument.querySelector(
        `style[data-description="${GRAVITY_FONT_FACES_SELECTOR}"]`,
      )
    ) {
      return;
    }

    const style = isoDocument.createElement('style');
    style.dataset.description = GRAVITY_FONT_FACES_SELECTOR;
    style.appendChild(isoDocument.createTextNode(SHOPLIFTED_FONT_FACES));
    isoDocument.head.appendChild(style);
  }, []);

  // A unique id created and bound to our portals. We also reuse this unique id for our monorail trace id.
  const instanceId = useMemo(() => {
    return uuidv4();
  }, []);

  useEffect(() => {
    if (element) {
      element.setAttribute('data-instance-id', instanceId);
    }
  }, [element, instanceId]);

  const value = useMemo(() => {
    return {
      devMode,
      element,
      featureName,
      instanceId,
    };
  }, [devMode, element, featureName, instanceId]);

  return (
    <RootContext.Provider value={value}>
      <MetricsProvider enabled={metricsEnabled} monorailProps={monorailProps}>
        <I18nProvider
          getFeatureDictionary={getFeatureDictionary}
          overrideLocale={overrideLocale}
        >
          <StateProvider enabled={authorizeStateEnabled}>
            {children}
          </StateProvider>
        </I18nProvider>
      </MetricsProvider>
    </RootContext.Provider>
  );
};

function MetricsProvider({
  children,
  enabled = true,
  monorailProps,
}: MetricsProviderProps) {
  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <BugsnagProvider>
      <ErrorBoundary>
        <OpenTelemetryProvider>
          <MonorailProvider {...monorailProps}>{children}</MonorailProvider>
        </OpenTelemetryProvider>
      </ErrorBoundary>
    </BugsnagProvider>
  );
}

function StateProvider({children, enabled = true}: StateProviderProps) {
  if (!enabled) {
    return children;
  }

  return <AuthorizeStateProvider>{children}</AuthorizeStateProvider>;
}
