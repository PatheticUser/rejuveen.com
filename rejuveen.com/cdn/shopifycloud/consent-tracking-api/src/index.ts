import {
  TrackingEvents,
  ConsentValuesV1,
  ConsentValuesV2,
  TrackingRegulations,
  TrackingRegulationLimitations,
  ShopPrefs,
} from "./types";

import {
  getRegulationValue,
  getShopPrefsValue,
  getGDPRConsentValue,
  transformConsentToDisplaySchema,
  validCookieDoesNotExist,
  isGDPRNotEnforced,
} from "./cookie";

import { regulationEnforcementDict } from './regulation'

import { isArrayEmpty } from './utils'

/**
 * Update buyer tracking consent in the _tracking_consent cookie.
 *
 * @param {boolean} data The buyer's consent data.
 * @param {function} callback The result from the API call.
 */
function updateTrackingConsent(
  data: { consent: boolean },
  callback: (err: null | {}, success?: {}) => {},
  customEvent: TrackingEvents | undefined = undefined
) {
  const xhr = new XMLHttpRequest();

  const url =
    "https://" + document.location.host + "/set_tracking_consent.json";
  const body = JSON.stringify(data);

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  function handleReadyStateChange() {
    // XMLHttpRequest.DONE === 4
    if (xhr.readyState !== 4) {
      return;
    }

    const statusOk =
      xhr.status === 0 || (200 >= xhr.status && xhr.status < 400);
    let responseJson;

    try {
      responseJson = JSON.parse(xhr.responseText);
    } catch (err) {
      responseJson = {
        error: "Unknown error",
      };
    }

    if (statusOk) {
      if (customEvent) {
        document.dispatchEvent(
          new CustomEvent(customEvent, {
            detail: {},
          })
        );
      }
      callback(null, responseJson);
    } else {
      callback(responseJson);
    }
  }

  xhr.onreadystatechange = handleReadyStateChange;
  xhr.send(body);
}

function setTrackingConsent(consent: boolean, callback: () => {}) {
  if (consent == undefined || !(typeof consent === "boolean")) {
    throw TypeError(
      "setTrackingConsent must be called with a boolean consent value"
    );
  }
  if (callback == undefined || !(typeof callback === "function")) {
    throw TypeError(
      "setTrackingConsent must be called with a callback function"
    );
  }
  if (consent === true) {
    return updateTrackingConsent(
      { consent: true },
      callback,
      TrackingEvents.TRACKING_ACCEPTED
    );
  }
  return updateTrackingConsent(
    { consent: false },
    callback,
    TrackingEvents.TRACKING_DECLINED
  );
}

function getTrackingConsentValue(consentValue: ConsentValuesV2): ConsentValuesV1 {
  if (validCookieDoesNotExist()) {
    return ConsentValuesV1.NO_VALUE;
  }
  if (consentValue === ConsentValuesV2.NO_VALUE) {
    return ConsentValuesV1.NO_INTERACTION;
  }

  return transformConsentToDisplaySchema(consentValue);
}

function getTrackingConsent(): ConsentValuesV1 {
  const consentValue = getGDPRConsentValue();
  return getTrackingConsentValue(consentValue);
}

function getRegulation(): TrackingRegulations {
  const regulation = getRegulationValue();

  if (regulation in TrackingRegulations) {
    return regulation;
  } else {
    return TrackingRegulations.NO_VALUE;
  }
}

function getShopPrefs(): ShopPrefs {
  return getShopPrefsValue();
}

function isLimitMappedToRegulation(regulation: TrackingRegulations, limitedReg: TrackingRegulationLimitations) {
  return regulationEnforcementDict[regulation].includes(limitedReg);
}

function isRegulationEnforced(): boolean {
  const regulation = getRegulation();
  if (regulation === TrackingRegulations.NO_VALUE) {
    return false;
  }

  const shopPrefs = getShopPrefs();
  if (isArrayEmpty(shopPrefs.limit)) {
    return false;
  }

  return shopPrefs.limit.some(limitedReg => isLimitMappedToRegulation(regulation, limitedReg));
};

function userCanBeTracked(): boolean {
  if (validCookieDoesNotExist()) {
    return true;
  }

  if (isGDPRNotEnforced()) {
    return true;
  }

  const GDPRConsent = getGDPRConsentValue();

  switch (GDPRConsent) {
    case ConsentValuesV2.ACCEPTED:
      return true;
    case ConsentValuesV2.DECLINED:
      return false;
    case ConsentValuesV2.NO_VALUE:
      const regulation = getRegulation();
      return regulation === TrackingRegulations.GDPR ? false : true;
  }
}

function userDataCanBeSold(): boolean {
  const regulation = getRegulation();

  if (regulation === TrackingRegulations.CCPA) {
    return !isRegulationEnforced();
  } else {
    return true;
  }
}

function shouldShowGDPRBanner(): boolean {
  return (
    getRegulation() === TrackingRegulations.GDPR &&
    isRegulationEnforced() &&
    getTrackingConsent() === ConsentValuesV1.NO_INTERACTION
  );
}

export function shopifyConsentAPI() {
  return {
    getTrackingConsent,
    setTrackingConsent,
    userCanBeTracked,
    getRegulation,
    isRegulationEnforced,
    getShopPrefs,
    shouldShowGDPRBanner,
    userDataCanBeSold,
  };
}

declare global {
  interface Window {
    Shopify: {
      trackingConsent?: {};
      customerPrivacy?: {};
    };
  }
}
window.Shopify = window.Shopify ? window.Shopify : {};
// We are sunsetting the trackingConsent namespace in favor of the customerPrivacy namespace
window.Shopify.customerPrivacy = window.Shopify.trackingConsent = shopifyConsentAPI();
