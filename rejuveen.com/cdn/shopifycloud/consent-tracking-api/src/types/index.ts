export enum TrackingEvents {
  TRACKING_LOADED = "trackingConsentLoaded",
  TRACKING_ACCEPTED = "trackingConsentAccepted",
  TRACKING_DECLINED = "trackingConsentDeclined",
  TRACKING_RESET = "trackingConsentReset",
}

export enum ConsentValuesV1 {
  ACCEPTED = "yes",
  DECLINED = "no",
  NO_INTERACTION = "no_interaction",
  NO_VALUE = "",
}

export enum ConsentValuesV2 {
  NO_INTERACTION = "no_interaction",
  NO_VALUE = "",
  ACCEPTED = "1",
  DECLINED = "0",
}

export enum TrackingRegulations {
  GDPR = "GDPR",
  CCPA = "CCPA",
  NO_VALUE = "",
}

export enum TrackingRegulationLimitations {
  CCPA_BLOCK_ALL = "CCPA_BLOCK_ALL",
  GDPR = "GDPR",
}

export type V1_1SchemaCookie = {
  consent: ConsentValuesV1;
  regulation: TrackingRegulations;
  version: string;
  prefs: {
    limit: TrackingRegulationLimitations[];
  };
}

export const v1_1SchemaKeys = ["prefs", "version", "consent", "regulation"];

export type V2_0SchemaCookie = {
  v: string;
  reg: TrackingRegulations;
  lim: TrackingRegulationLimitations[];
  con: {
    GDPR?: ConsentValuesV2;
  };
}

export const v2_0SchemaKeys = ["lim", "v", "con", "reg"];

export type ConsentCookie = V2_0SchemaCookie | V1_1SchemaCookie;

export type ShopPrefs = {
  limit: TrackingRegulationLimitations[];
};

export type ConsentAPIResponse = {
  userCanBeTracked: boolean | Error;
  userTrackingConsent: ConsentValuesV1;
};

export interface RegulationLimitDictionary {
  GDPR: TrackingRegulationLimitations[],
  CCPA: TrackingRegulationLimitations[],
}
