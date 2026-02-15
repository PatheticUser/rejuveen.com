import 'construct-style-sheets-polyfill';
import type {ComponentChildren} from 'preact';
import {createPortal} from 'preact/compat';
import {useLayoutEffect, useRef, useState} from 'preact/hooks';

import {useBugsnag} from '~/foundation/Bugsnag/hooks';
import type {PortalProviderVariant} from '~/types/portalProvider';

import styles from '../styles.css';

interface PortalProviderProps {
  children?: ComponentChildren;
  instanceId: string;
  type: 'modal' | 'toast';
  variant: PortalProviderVariant;
}

export function PortalProvider({
  children,
  instanceId,
  type,
  variant,
}: PortalProviderProps) {
  const root = useRef<HTMLDivElement | null>(null);
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null);
  const {notify} = useBugsnag();

  useLayoutEffect(() => {
    setShadowRoot(root.current!.attachShadow({mode: 'open'}));
  }, []);

  useLayoutEffect(() => {
    if (shadowRoot) {
      const stylesheet = new CSSStyleSheet();
      stylesheet
        .replace(styles)
        .then(() => {
          shadowRoot.adoptedStyleSheets = [stylesheet];
        })
        .catch((error) => {
          notify(
            new Error(
              `Failed to adopt stylesheets for portal provider: ${error}`,
            ),
          );
        });
    }
  }, [shadowRoot, notify]);

  return (
    <div
      data-nametag="shop-portal-provider"
      data-portal-instance-id={instanceId}
      data-type={type}
      data-variant={variant}
      ref={root}
    >
      {shadowRoot && createPortal(children, shadowRoot)}
    </div>
  );
}
