import type {ComponentChild} from 'preact';
import {useMemo} from 'preact/hooks';

import {useShopLogin} from '~/foundation/ShopLogin/useShopLogin';
import type {FooterPolicyLink, FooterPolicy} from '~/types/event';
import {classNames} from '~/utils/css';

export function FooterPolicy() {
  const {state} = useShopLogin();

  const footerPolicyVisible = useMemo(() => {
    return !state.consented && !state.matched;
  }, [state.consented, state.matched]);

  const footerPolicy = useMemo(() => {
    if (!state.footerPolicy) {
      return null;
    }

    const links = new Map<string, ComponentChild>();

    Object.entries(state.footerPolicy.links).forEach(([key, value]) => {
      if (value) {
        links.set(key, <FooterPolicyLink text={value.text} url={value.url} />);
      }
    });

    const linkKeys = Array.from(links.keys());

    if (linkKeys.length === 0) {
      return state.footerPolicy.text;
    }

    const resultList: ComponentChild[] = state.footerPolicy.text.split(
      new RegExp(`({${linkKeys.join('}|{')}})`, 'g'),
    );

    resultList.forEach((item, index) => {
      if (
        typeof item === 'string' &&
        item.startsWith('{') &&
        item.endsWith('}')
      ) {
        const key = item.replace('{', '').replace('}', '');
        const link = links.get(key);

        if (link) {
          resultList[index] = link;
        }
      }
    });

    return resultList;
  }, [state.footerPolicy]);

  if (!state.loaded && state.localPresentationMode === 'card') {
    return (
      <div
        className="flex flex-col items-center"
        data-testid="footer-policy-skeleton"
      >
        <div className="my-0.5 h-3 w-full animate-pulse rounded-sm bg-grayscale-l2 motion-reduce_animate-none" />
        <div className="my-0.5 h-3 w-44 animate-pulse rounded-sm bg-grayscale-l2 motion-reduce_animate-none" />
      </div>
    );
  }

  if (!footerPolicyVisible) return null;

  return (
    <span
      className={classNames(
        'block w-full text-center text-caption data-hidden_invisible',
        state.parentTheme === 'dark'
          ? 'text-grayscale-l1'
          : 'text-grayscale-d0',
      )}
      data-testid="footer-policy"
      data-visible={footerPolicyVisible}
    >
      {footerPolicy}
    </span>
  );
}

function FooterPolicyLink({text, url}: FooterPolicyLink) {
  return (
    <a
      className="m-0 inline cursor-pointer appearance-none border-none bg-none p-0 underline hover_opacity-70 focus_opacity-70 active_opacity-70"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
    </a>
  );
}
