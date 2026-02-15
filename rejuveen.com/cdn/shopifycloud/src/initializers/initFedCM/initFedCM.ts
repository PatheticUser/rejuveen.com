import type {Monorail} from '~/foundation/Monorail/Monorail';
import {AbstractShopJSError} from '~/utils/errors';
import {fetchWithRetry} from '~/utils/fetch';
import {isoNavigator} from '~/utils/navigator';
import {isoWindow} from '~/utils/window';

import type {CredentialProvider, FederatedCredentials} from '../../../fedcm';

interface InitFedCMParams {
  mediation?: CredentialMediationRequirement;
  analyticsTraceId?: string;
  monorailTracker?: Monorail;
  signal?: AbortSignal;
}

export class FedCMNotSupportedError extends Error {
  constructor() {
    super('FedCM is not supported');
  }
}

export class FedCMCancelledError extends Error {
  constructor() {
    super('FedCM was cancelled');
  }
}

export const initFedCM = async (
  params: InitFedCMParams,
): Promise<Response | undefined> => {
  // Browser does not support FedCM
  if (!('IdentityCredential' in isoWindow)) {
    throw new FedCMNotSupportedError();
  }

  const {
    mediation = 'optional',
    analyticsTraceId,
    monorailTracker,
    signal,
  } = params;

  const providers = await getFedCMProviders(analyticsTraceId);

  if (!providers) return;

  const credential = await getFedCMCredentials(mediation, providers, signal);
  // User has cancelled the fedCM prompt
  if (!credential) {
    monorailTracker?.trackUserAction({userAction: 'FEDCM_CANCELLED'});
    throw new FedCMCancelledError();
  }

  // Open session on merchant.com
  return submitTokenToServer(
    credential?.token,
    providers.state,
    monorailTracker,
  );
};

function getFedCMCredentials(
  mediation: CredentialMediationRequirement,
  providers: CredentialProvider,
  signal?: AbortSignal,
) {
  return (isoNavigator.credentials as FederatedCredentials).get({
    identity: {
      providers: [providers],
    },
    mediation,
    signal,
  });
}

async function getFedCMProviders(
  analyticsTraceId?: string,
): Promise<CredentialProvider | undefined> {
  let url = '/services/login_with_shop/fedcm/provider';
  if (analyticsTraceId) {
    url += `?analytics_trace_id=${encodeURIComponent(analyticsTraceId)}`;
  }

  try {
    const response = await fetchWithRetry(
      url,
      {
        method: 'GET',
      },
      {maxRetries: 5, retryDelay: 1000},
    );

    const body = await response.json();

    return {
      configURL: body.configURL,
      clientId: body.clientId,
      state: body.state,
      nonce: body.nonce,
      params: {nonce: body.nonce},
    };
  } catch (error) {
    throw new AbstractShopJSError(
      `Failed to fetch FedCM Provider`,
      'FetchFedCMProviderError',
    );
  }
}

async function submitTokenToServer(
  token: string,
  state: string,
  monorailTracker?: Monorail,
) {
  try {
    const response = await fetchWithRetry(
      '/services/login_with_shop/fedcm/callback',
      {
        method: 'POST',
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          // eslint-disable-next-line @typescript-eslint/naming-convention
          raw_id_token: token,
          state,
        }).toString(),
      },
      {maxRetries: 5, retryDelay: 1000},
    );

    monorailTracker?.trackUserAction({userAction: 'FEDCM_COMPLETED'});

    return response;
  } catch (error) {
    throw new AbstractShopJSError(
      `Failed to fetch FedCM Callback`,
      'FetchFedCMPCallbackError',
    );
  }
}
