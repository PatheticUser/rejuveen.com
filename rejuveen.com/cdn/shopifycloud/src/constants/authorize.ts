import {isoWindow} from '~/utils/window';

import {getDomains} from './getDomains';

const domains = getDomains(isoWindow.location);

export const CORE_AUTH_DOMAIN = domains.coreAuthDomain;
export const PAY_AUTH_DOMAIN = domains.payAuthDomain;
export const PAY_AUTH_DOMAIN_ALT = domains.payAuthDomainAlt;
