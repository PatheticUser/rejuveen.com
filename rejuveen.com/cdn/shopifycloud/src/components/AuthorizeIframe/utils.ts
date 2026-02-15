import type {SdkErrorCode} from '~/types/authorize';

const SILENT_SDK_ERROR_CODES: SdkErrorCode[] = [
  'api_unavailable',
  'captcha_challenge',
  'retriable_server_error',
];

const SILENT_MESSAGE_REGEX: RegExp[] = [
  /existing customer \d+ on shop \d+ has a conflicting provider subject associated: existing '([^']+)' != incoming '([^']+)'/,
  /no_prequalification_amount_available/,
];

export function isUsefulError(code: SdkErrorCode, message: string) {
  return !(
    SILENT_SDK_ERROR_CODES.includes(code) ||
    SILENT_MESSAGE_REGEX.some((regex) => regex.test(message))
  );
}
