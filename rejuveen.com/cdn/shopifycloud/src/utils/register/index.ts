import 'construct-style-sheets-polyfill';
import {cloneElement, h, render} from 'preact';
import type {Component, ComponentType, RenderableProps} from 'preact';

import {Bugsnag} from '~/foundation/Bugsnag/Bugsnag';

import styles from '../../styles.css';
import {toDashedCase} from '../casing';
import {defineElement, reflectConstruct} from '../customElement';
import {AbstractShopJSError} from '../errors';

import {
  TRANSFORMS,
  type Options,
  type PreactCustomElement,
  type PropMapValue,
  type TransformedPropValue,
  type VdomChildNode,
} from './types/register';

export default function register<T>(
  Component: ComponentType<T>,
  {methods, name, props, shadow}: Options,
) {
  if (typeof window === 'undefined') {
    return;
  }

  const {notify} = new Bugsnag(name);

  function CustomElement(): PreactCustomElement {
    const node: PreactCustomElement = reflectConstruct(CustomElement);

    // This promise will resolve once web component methods (aka events) are listened to
    // The events will be listened once the preact inner component is mounted
    // There are still possible race conditions with this approach;
    // more details and a solution proposal is discussed here:
    // https://github.com/Shopify/shop-identity/discussions/3618
    node._eventListenerReadyPromise = new Promise<void>((resolve) => {
      node._eventListenerReadyPromiseResolve = resolve;
    });

    node._vdomComponent = Component;
    node._root = shadow ? node.attachShadow({mode: shadow}) : node;

    if (shadow) {
      const stylesheet = new CSSStyleSheet();
      stylesheet.replaceSync(styles);
      (node._root as ShadowRoot).adoptedStyleSheets = [stylesheet];
    }

    return node;
  }

  const propsMap = new Map<string, PropMapValue>();

  Object.entries(props || {}).forEach(([prop, type]) => {
    const attribute = toDashedCase(prop);

    propsMap.set(attribute, {
      attribute,
      preactProp: prop,
      type,
    });
  });

  const observedAttributes = Array.from(propsMap.values()).map(
    ({attribute}) => attribute,
  );

  CustomElement.prototype = Object.create(HTMLElement.prototype);
  CustomElement.prototype.constructor = CustomElement;
  CustomElement.observedAttributes = observedAttributes;

  CustomElement.prototype.attributeChangedCallback =
    function attributeChangedCallback(
      attribute: string,
      _oldValue: string,
      value: string,
    ) {
      if (!this._vdom) {
        return;
      }

      // Before assigning the attribute, ensure that it is a prop we observe.
      const propMapValue = propsMap.get(attribute);
      if (!propMapValue) {
        return;
      }

      const {preactProp, type} = propMapValue;
      const transform = TRANSFORMS[type];
      const props: Record<string, any> = {};

      if (!value && type === 'boolean') {
        const newValue = transform.parse(value, attribute, this);
        props[attribute] = newValue;
        props[preactProp] = newValue;
      } else if (type && value) {
        const newValue = transform.parse(value, attribute, this);
        props[attribute] = newValue;
        props[preactProp] = newValue;
      }

      this._vdom = cloneElement(this._vdom, props);
      render(this._vdom, this._root);
    };

  CustomElement.prototype.connectedCallback = function connectedCallback() {
    // Obtain a reference to the previous context by pinging the nearest
    // higher up node that was rendered with Preact. If one Preact component
    // higher up receives our ping, it will set the `detail` property of
    // our custom event. This works because events are dispatched
    // synchronously.
    const event: CustomEvent<any> = new CustomEvent('_preact', {
      detail: {},
      bubbles: true,
      cancelable: true,
    });

    this.dispatchEvent(event);
    const context = event.detail.context;

    this._vdom = h(
      ContextProvider,
      {...this._props, context, element: this},
      toVdom(this, this._vdomComponent),
    );

    render(this._vdom, this._root);
  };

  // Set up component functions. When a component function is called, we
  // dispatch an event on the element. Features which use these methods
  // will add an event listener and perform their callbacks internally.
  methods?.forEach((fnName) => {
    CustomElement.prototype[fnName] = function (
      this: PreactCustomElement,
      args: any,
    ) {
      // Wait for the event listener to be ready before dispatching the event
      this._eventListenerReadyPromise
        .then(() => {
          this.dispatchEvent(new CustomEvent(fnName, {detail: args}));
        })
        .catch(() => {
          notify(
            new AbstractShopJSError(
              `Custom element ${name}: Error listening for methods`,
              'CustomElementMethodListenerError',
            ),
          );
        });
    };
  });

  CustomElement.prototype.disconnectedCallback =
    function disconnectedCallback() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      render((this._vdom = null), this._root);
    };

  function ContextProvider(this: Component, props: RenderableProps<any>) {
    this.getChildContext = () => props.context;
    const {context, children, ...rest} = props;
    return cloneElement(children, rest);
  }

  /**
   * Pass an event listener to each `<slot>` that "forwards" the current
   * context value to the rendered child. The child will trigger a custom
   * event, where will add the context value to. Because events work
   * synchronously, the child can immediately pull of the value right
   * after having fired the event.
   */
  function Slot(props: object) {
    return h('slot', {...props});
  }

  function toVdom(element: HTMLElement, component: any) {
    if (element.nodeType === 3) {
      // TypeScript isn't picking up on the spec here, but element at this point
      // represents a text node.
      return (element as unknown as Text).data;
    }

    if (element.nodeType !== 1) {
      return null;
    }

    const props: Record<string, TransformedPropValue> = {};

    const children: VdomChildNode[] = [];
    const {childNodes} = element;

    propsMap.forEach(({attribute, preactProp, type}) => {
      const transform = TRANSFORMS[type];
      const value = element.getAttribute(attribute);

      let newValue: TransformedPropValue | null = value;

      if (type === 'boolean') {
        newValue = transform.parse(value, attribute, element);
      } else if (value) {
        newValue = transform.parse(
          value,
          attribute,
          element,
        ) as TransformedPropValue;
      }

      if (newValue === null) {
        return;
      }

      props[attribute] = newValue;
      props[preactProp] = newValue;
    });

    for (const node of childNodes) {
      const vnode = toVdom(node as HTMLElement, null) as VdomChildNode;
      children.push(vnode);
    }

    const wrappedChildren = component ? h(Slot, null, children) : children;
    return h(component, props, wrappedChildren);
  }

  // Keep DOM properties and Preact props in sync
  propsMap.forEach(({attribute, type}) => {
    const transform = TRANSFORMS[type];

    Object.defineProperty(CustomElement.prototype, attribute, {
      get() {
        if (!this._vdom || !this._vdom.props) {
          return null;
        }

        return this._vdom.props[attribute];
      },
      set(value) {
        let newValue = value;

        if (this._vdom) {
          this.attributeChangedCallback(attribute, null, value);
        } else {
          if (type === 'boolean') {
            newValue = transform.parse(value, attribute, this);
          } else if (value) {
            newValue = transform.parse(value, attribute, this);
          }

          if (!this._props) {
            this._props = {};
          }

          this._props[attribute] = newValue;

          this.connectedCallback();
        }

        this.setAttribute(attribute, transform.stringify(newValue));
      },
    });
  });

  const existingConstructor = customElements.get(name);
  if (existingConstructor) {
    return;
  }

  Reflect.defineProperty?.(CustomElement, 'componentVersion', {
    value: 'preact',
  });
  return defineElement(
    name,
    // Despite the fact that our CustomElement function returns a PreactCustomElement type which extends HTMLElement,
    // TypeScript is not able to infer this and derive that the type is an HTMLElement or a CustomElementConstructor.
    CustomElement as unknown as CustomElementConstructor,
  );
}
