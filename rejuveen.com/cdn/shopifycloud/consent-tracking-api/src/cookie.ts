import {
  ConsentCookie,
  ConsentValuesV1,
  ConsentValuesV2,
  TrackingRegulations,
  ShopPrefs,
  TrackingRegulationLimitations,
  V1_1SchemaCookie,
  V2_0SchemaCookie,
  v1_1SchemaKeys,
  v2_0SchemaKeys
} from "./types";

import { areArraysEqual } from "./utils";

export const CONSENT_COOKIE_NAME = "_tracking_consent";

function readCookie(): V2_0SchemaCookie | undefined {
  try {
    const cookies = document.cookie ? document.cookie.split("; ") : [];
    let result = undefined;
    cookies.forEach((cookie) => {
      const [name, value] = cookie.split("=");

      if (CONSENT_COOKIE_NAME === decodeURIComponent(name)) {
        var cookieObj = JSON.parse(decodeURIComponent(value));

        result = cookieObj;
      }
    });

    if (result === undefined || cookieMalformed(result)) {
      return undefined;
    }

    if (usingV1_1CookieSchema(result)) {
      result = transformCookieToNewSchema(result);
    }

    return result;
  } catch {
    return undefined;
  }
}

export function getRegulationValue(): TrackingRegulations {
  const cookie = readCookie();

  if (validCookieDoesNotExist(cookie)) {
    return TrackingRegulations.NO_VALUE;
  }

  return cookie.reg;
}

export function getShopPrefsValue(): ShopPrefs {
  const cookie = readCookie();

  if (validCookieDoesNotExist(cookie)) {
    return { limit: [] };
  }

  return { limit: cookie.lim };
}

export function getGDPRConsentValue(): ConsentValuesV2 {
  const cookie = readCookie();

  if (validCookieDoesNotExist(cookie)) {
    return ConsentValuesV2.NO_VALUE;
  }

  return cookie.con.GDPR;
}

export function validCookieDoesNotExist(consentCookie = null): boolean {
  if (consentCookie === null) {
    consentCookie = readCookie();
  }
  return consentCookie === undefined;
}

function cookieMalformed(cookie: ConsentCookie): boolean {
  const cookieKeys = Object.keys(cookie);

  return !(areArraysEqual(cookieKeys, v2_0SchemaKeys) || areArraysEqual(cookieKeys, v1_1SchemaKeys))
}

function usingV1_1CookieSchema(cookie: ConsentCookie): boolean {
  if (cookie.hasOwnProperty('version')) {
    return true;
  } else if (cookie.hasOwnProperty('v')) {
    return false;
  }
}

export function transformConsentToDisplaySchema(
  consentValue: ConsentValuesV2
): ConsentValuesV1 {
  switch (consentValue) {
    case ConsentValuesV2.ACCEPTED:
      return ConsentValuesV1.ACCEPTED;
    case ConsentValuesV2.DECLINED:
      return ConsentValuesV1.DECLINED;
    default:
      return ConsentValuesV1.NO_VALUE;
  }
}

export function transformConsentToNewSchema(
  consentValue: ConsentValuesV1
): ConsentValuesV2 {
  switch (consentValue) {
    case ConsentValuesV1.ACCEPTED:
      return ConsentValuesV2.ACCEPTED;
    case ConsentValuesV1.DECLINED:
      return ConsentValuesV2.DECLINED;
    default:
      return ConsentValuesV2.NO_VALUE;
  }
}

function isGDPREnforcedInV1Cookie(cookie: V1_1SchemaCookie): boolean {
  return cookie.prefs.limit.includes(TrackingRegulationLimitations.GDPR);
}

export function isGDPRNotEnforced(): boolean {
  const prefs = getShopPrefsValue();
  return !prefs.limit.includes(TrackingRegulationLimitations.GDPR)
}

function transformCookieToNewSchema(cookie: V1_1SchemaCookie): V2_0SchemaCookie {
  const limits = cookie.prefs.limit;
  const regulation = cookie.regulation;
  const version = cookie.version;

  let consent = {};
  if (isGDPREnforcedInV1Cookie(cookie)) {
    consent = { GDPR: transformConsentToNewSchema(cookie.consent) };
  }
  return {
    con: consent,
    reg: regulation,
    v: version,
    lim: limits,
  }
}

