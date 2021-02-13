import {} from 'react';
import styled from '@emotion/styled';

export const MouseCursor = (): JSX.Element => {
  return (
    <Cursor className="_cursor">
      <Circle />
    </Cursor>
  );
};

const Cursor = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  pointer-events: none;
  /* transition: all 0.2s ease;
  transition-property: background, border, transform;
  transform-origin: 150% 150%150%; */
  z-index: 999;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Circle = styled.div`
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.8);
`;
