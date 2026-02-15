import type {FederatedCredentials} from '../../fedcm';

interface NavigatorUABrandVersion {
  brand: string;
  version: string;
}

interface UADataValues {
  brands?: NavigatorUABrandVersion[];
  mobile?: boolean;
  platform?: string;
  architecture?: string;
  bitness?: string;
  model?: string;
  platformVersion?: string;
  fullVersionList?: NavigatorUABrandVersion[];
}

interface NavigatorUAData {
  brands: NavigatorUABrandVersion[];
  mobile: boolean;
  platform: string;
  getHighEntropyValues(hints: string[]): Promise<UADataValues>;
  toJSON(): UADataValues;
}

const navigatorWithDefaultValues = {
  languages: [],
  userAgent: '',
  userAgentData: {} as NavigatorUAData,
  userLanguage: '',
  credentials: {} as FederatedCredentials,
};

export const isoNavigator =
  typeof navigator === 'undefined' ? navigatorWithDefaultValues : navigator;
