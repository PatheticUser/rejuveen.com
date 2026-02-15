import type {MutableRef} from 'preact/hooks';
import {useCallback, useEffect, useMemo} from 'preact/hooks';

import {useMonorail} from '~/foundation/Monorail/hooks';
import type {
  MessageEventData,
  PostMessageEvent,
  TrackablePostMessageEvent,
} from '~/types/event';
import {AbstractShopJSError} from '~/utils/errors';
import {isRootDomainMatch} from '~/utils/validators';
import {isoWindow} from '~/utils/window';

type MessageHandler<T> = (arg0: T) => void;

interface UseEventListenerParams<T extends {type: string}> {
  allowedOrigins: string[];
  destination?: typeof isoWindow;
  handler: MessageHandler<T>;
  source: MutableRef<HTMLIFrameElement | Window | null>;
}

function isSourceOf(event: MessageEvent, source: Window | null) {
  return event.source === source;
}

function isTrackableMessage<T = unknown>(
  event: T,
): event is T & TrackablePostMessageEvent {
  return (
    typeof event === 'object' &&
    event !== null &&
    'messageId' in event &&
    'type' in event
  );
}

export function useEventListener<T extends PostMessageEvent>({
  allowedOrigins,
  destination = isoWindow,
  handler,
  source,
}: UseEventListenerParams<T>) {
  const {trackPostMessageTransmission} = useMonorail();
  const subscriberSet = useMemo(() => new Set<MessageHandler<any>>(), []);

  useEffect(() => {
    subscriberSet.add(handler);

    return () => {
      subscriberSet.delete(handler);
    };
  }, [handler, subscriberSet]);

  useEffect(() => {
    const handler = (event: T) =>
      isTrackableMessage(event) &&
      trackPostMessageTransmission({
        direction: 'incoming',
        event,
      });
    subscriberSet.add(handler);

    return () => {
      subscriberSet.delete(handler);
    };
  }, [trackPostMessageTransmission, subscriberSet]);

  const notify = useCallback(
    (event: T) => {
      subscriberSet.forEach((subscriber) => subscriber(event));
    },
    [subscriberSet],
  );

  const eventListener = useCallback(
    (event: MessageEvent) => {
      const elementSource =
        source.current instanceof HTMLIFrameElement
          ? source.current.contentWindow
          : source.current;

      if (!isSourceOf(event, elementSource || null)) {
        return;
      }

      if (
        !allowedOrigins.some((origin) =>
          isRootDomainMatch(origin, event.origin),
        )
      ) {
        // eslint-disable-next-line no-console
        console.error('Origin mismatch for message event', event);
        return;
      }

      notify(event.data);
    },
    [allowedOrigins, notify, source],
  );

  const destroy = useCallback(() => {
    destination.removeEventListener('message', eventListener, false);
  }, [destination, eventListener]);

  useEffect(() => {
    destination.addEventListener('message', eventListener, false);

    return () => {
      destroy();
    };
  }, [destination, destroy, eventListener]);

  const waitForMessage = useCallback(
    async <TMessageType extends MessageEventData['type']>(
      messageType: TMessageType,
      signal?: AbortSignal,
    ): Promise<Extract<MessageEventData, {type: TMessageType}>> => {
      let handler: MessageHandler<MessageEventData>;

      const promise = new Promise<
        Extract<MessageEventData, {type: TMessageType}>
      >((resolve, reject) => {
        function handleAbort() {
          reject(
            new AbstractShopJSError(
              'Abort signal received',
              'AbortSignalReceivedError',
            ),
          );
        }

        if (signal?.aborted) {
          handleAbort();
        }

        handler = (event) => {
          if (event.type === messageType) {
            signal?.removeEventListener('abort', handleAbort);
            resolve(event as Extract<MessageEventData, {type: TMessageType}>);
          }
        };

        subscriberSet.add(handler);
        signal?.addEventListener('abort', handleAbort);
      }).finally(() => {
        subscriberSet.delete(handler);
      });

      return promise;
    },
    [subscriberSet],
  );

  return {
    destroy,
    waitForMessage,
  };
}
