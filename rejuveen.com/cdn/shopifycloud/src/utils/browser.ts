import {isoNavigator} from '~/utils/navigator';
import {isoWindow} from '~/utils/window';

export function getQueryParam(name: string): string | null {
  const urlParams = new URLSearchParams(isoWindow.location.search);
  return urlParams.get(name);
}

export function isMobileBrowser(): boolean {
  return (
    (Boolean(isoNavigator.userAgent) &&
      /(android|iphone|ipad|mobile|phone)/i.test(isoNavigator.userAgent)) ||
    isMobileWebview()
  );
}

export function removeTrailingSlash(value: string): string {
  if (value === '/') return value;
  return value.endsWith('/') ? value.slice(0, -1) : value;
}

export function isIosSafari() {
  const agent = isoNavigator.userAgent;
  const iOS = Boolean(agent.match(/iPad/i)) || Boolean(agent.match(/iPhone/i));
  const webkit = Boolean(agent.match(/WebKit/i));
  return iOS && webkit && !agent.match(/CriOS/i);
}

export function isAndroidWebViewBrowser() {
  // The 'wv' in the user agent string is the key indicator for a webview
  return /Mozilla\/5.0 \([^)]*Android[^)]*; wv\).+Chrome\//.test(
    isoNavigator.userAgent,
  );
}

export function isInstagramBrowser() {
  return isoNavigator.userAgent.toLowerCase().includes('instagram');
}

export function isIosWebViewBrowser() {
  const userAgent = isoNavigator.userAgent;
  return (
    RegExp(WEBVIEW_REGEX_1).test(userAgent) ||
    RegExp(WEBVIEW_REGEX_2).test(userAgent)
  );
}

export function isMessengerBrowser() {
  return isoNavigator.userAgent.toLowerCase().includes('messenger');
}

export function isMetaBrowser() {
  const agent = isoNavigator.userAgent.toLowerCase();
  return agent.includes('fban/fbios') || agent.includes('fb_iab/fb4a');
}

export function isMobile() {
  return /iPhone|iPad|iPod|Android/i.test(isoNavigator?.userAgent);
}

export function isMobileWebview() {
  return (
    isMetaBrowser() ||
    isInstagramBrowser() ||
    isMessengerBrowser() ||
    isIosWebViewBrowser() ||
    isAndroidWebViewBrowser()
  );
}

export function isWebComponentCompatibleBrowser(): boolean {
  return Boolean(isoWindow.customElements);
}

export function isIntersectionObserverSupported(): boolean {
  return Boolean(
    typeof IntersectionObserver !== 'undefined' && IntersectionObserver,
  );
}

// Regex strings from https://github.com/3rd-Eden/useragent/blob/master/lib/regexps.js
const WEBVIEW_REGEX_1 =
  '(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\\d+)_(\\d+)(?:_(\\d+)|).* AppleNews';
const WEBVIEW_REGEX_2 =
  '(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\\d+)_(\\d+)(?:_(\\d+)|)(?!.*Version).*Mobile(?!.*Safari)';
