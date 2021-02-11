import React from 'react';

import ReactSkeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { SkeletonProps } from 'common/types';

export const Skeleton = ({
  children,
  view,
  width,
  height,
  circle = false,
  color,
  highlightColor,
}: SkeletonProps): JSX.Element => {
  return (
    <SkeletonTheme color={color} highlightColor={highlightColor}>
      {view ? <ReactSkeleton width={width} height={height} circle={circle} /> : children}
    </SkeletonTheme>
  );
};
