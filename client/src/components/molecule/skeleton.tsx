import React, { useMemo } from 'react';
import styled from '@emotion/styled';

import ReactSkeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { SkeletonProps, SkeletonListProps } from 'common/types';

const getRandomNumberBetween = (start: number, end: number) => {
  return Math.floor(Math.random() * end) + start;
};

const onRange = (index: number) => {
  return Array.from(Array(index).keys());
};

export const Skeleton = ({
  width,
  height,
  circle = false,
  count = 1,
  color,
  highlightColor,
}: SkeletonProps): JSX.Element => {
  return (
    <SkeletonTheme color={color} highlightColor={highlightColor}>
      <ReactSkeleton width={width} height={height} circle={circle} count={count} />
    </SkeletonTheme>
  );
};

export const SkeletonList = ({
  widths,
  height,
  circle,
  color,
  count = 1,
  highlightColor,
  duration = 2,
  css,
}: SkeletonListProps): JSX.Element => {
  const randomNumber: number[] = useMemo(
    () => onRange(count).map((_i) => getRandomNumberBetween(widths[0], widths[1])),
    [count],
  );

  const skeletonList = randomNumber.map((width: number, index: number) => (
    <SkeletonWrapper key={index}>
      <ReactSkeleton width={width} height={height} circle={circle} duration={duration} />
    </SkeletonWrapper>
  ));

  return (
    <SkeletonTheme color={color} highlightColor={highlightColor}>
      {/* <ReactSkeleton width={width} height={height} circle={circle} count={count} /> */}
      {skeletonList}
    </SkeletonTheme>
  );
};

const SkeletonWrapper = styled.span`
  overflow-x: hidden;
  margin-bottom: 7px;
  margin-right: 5px;

  display: inline-block;

  ${(props: any) => props.css};
`;
