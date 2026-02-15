import {v4 as uuidv4} from 'uuid';

import {PAY_AUTH_DOMAIN, PAY_AUTH_DOMAIN_ALT} from '~/constants/authorize';
import type {PayEvents, TrackablePostMessageEvent} from '~/types/event';

export interface PostMessageProps {
  contentWindow: Window | null | undefined;
  event: PayEvents;
  onMessageSent?: (event: PayEvents & TrackablePostMessageEvent) => void;
}

export function postMessage({
  contentWindow,
  event,
  onMessageSent,
}: PostMessageProps) {
  if (!contentWindow) {
    // eslint-disable-next-line no-process-env
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('content window undefined for event', event);
    }

    return;
  }

  const eventOrigins = [PAY_AUTH_DOMAIN, PAY_AUTH_DOMAIN_ALT];
  const trackableEvent = {
    ...event,
    messageId: uuidv4(),
  };

  eventOrigins.forEach((origin) => {
    contentWindow.postMessage(trackableEvent, origin);
  });

  onMessageSent?.(trackableEvent);
}

export interface MessageEventSource {
  isSourceOf: (event: MessageEvent) => boolean;
}

export class IFrameEventSource implements MessageEventSource {
  private readonly _source: HTMLIFrameElement;

  constructor(source: HTMLIFrameElement) {
    this._source = source;
  }

  isSourceOf(event: MessageEvent) {
    return event.source === this._source.contentWindow;
  }
}
