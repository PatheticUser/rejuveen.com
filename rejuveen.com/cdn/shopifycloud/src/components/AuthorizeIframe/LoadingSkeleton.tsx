import type {ComponentChildren} from 'preact';

import {useAuthorizeState} from '~/foundation/AuthorizeState/hooks';

const Skeleton = () => (
  <>
    <div class="animate-pulse px-4 py-1 pb-6" data-testid="loading-skeleton">
      <div class="flex items-center pb-3">
        <div class="mr-3 size-6 rounded-max bg-grayscale-l2" />
        <div class="mr-20 h-3 flex-1 rounded-md bg-grayscale-l2" />
      </div>
      <div class="h-10 rounded-md bg-grayscale-l2" />
    </div>
    <div class="h-10 animate-pulse bg-grayscale-l3" />
  </>
);

interface LoadingSkeletonProps {
  children: ComponentChildren;
}

export const LoadingSkeleton = ({children}: LoadingSkeletonProps) => {
  const {uiRendered} = useAuthorizeState();

  return (
    <>
      {!uiRendered && <Skeleton />}
      <div>{children}</div>
    </>
  );
};
