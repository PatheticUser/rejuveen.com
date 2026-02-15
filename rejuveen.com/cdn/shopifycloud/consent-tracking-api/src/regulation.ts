import { RegulationLimitDictionary, TrackingRegulationLimitations } from "./types";

export const regulationEnforcementDict: RegulationLimitDictionary = {
  GDPR: [TrackingRegulationLimitations.GDPR],
  CCPA: [TrackingRegulationLimitations.CCPA_BLOCK_ALL],
}
