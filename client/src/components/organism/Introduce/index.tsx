import React from 'react';
import styled from '@emotion/styled';

export const Introduce = (): JSX.Element => {
  return <IntroduceWraper>Hi, This is Alpox</IntroduceWraper>;
};

const IntroduceWraper = styled.div`
  width: 100%;

  margin-bottom: 25px;
  color: ${(props) => props.theme.color.primary};

  @media (min-width: 576px) and (max-width: 992px) {
    height: 200px;
  }

  @media (max-width: 575.98px) {
    height: 150px;
  }

  @media (min-width: 993px) {
    height: 300px;
  }
`;
