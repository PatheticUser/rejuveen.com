import type {
  ComponentClass,
  FunctionComponent,
  FunctionalComponent,
  VNode,
  Attributes,
} from 'preact';

import {boolean} from '../transforms/boolean';
import {fn} from '../transforms/function';
import {number} from '../transforms/number';
import {string} from '../transforms/string';

export const TRANSFORMS = {
  boolean,
  function: fn,
  number,
  string,
};

type TransformExpectation = keyof typeof TRANSFORMS;
type VdomComponent =
  | ComponentClass<any>
  | FunctionComponent<any>
  | FunctionalComponent<any>;

export type VdomChildNode = string | VNode<Attributes | null> | null;
type VdomNode<T> = VNode<(Attributes & T) | null> | null;

export type PreactCustomElement = HTMLElement & {
  _props: Record<string, any>;
  _root: HTMLElement | ShadowRoot;
  _vdomComponent: VdomComponent;
  _vdom: VdomNode<any>;
  _eventListenerReadyPromise: Promise<void>;
  _eventListenerReadyPromiseResolve: (value: void | PromiseLike<void>) => void;
};

export interface Options {
  methods?: string[];
  name: string;
  props?: Record<string, TransformExpectation>;
  shadow?: 'open' | 'closed';
}

export interface PropMapValue {
  attribute: string;
  preactProp: string;
  type: TransformExpectation;
}

export type TransformedPropValue =
  | boolean
  | number
  | string
  | ((...args: unknown[]) => unknown)
  | undefined;
