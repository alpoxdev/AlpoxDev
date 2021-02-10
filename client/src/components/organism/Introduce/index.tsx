import React from 'react';
import styled from '@emotion/styled';
import { FontSize } from 'common/theme';
import { Text } from 'components';

const Introduce = (): JSX.Element => {
  return (
    <IntroduceWraper>
      <Title fontSize={FontSize.title}>Hi, This is Alpox.</Title>
      <Description>안녕하세요. 프론트엔드 개발자 양민열입니다.</Description>
    </IntroduceWraper>
  );
};

export default Introduce;

const IntroduceWraper = styled.div`
  width: 100%;

  margin-bottom: 35px;
  color: ${(props: any) => props.theme.color.primary};

  /* @media (min-width: 576px) and (max-width: 992px) {
    height: 200px;
  }

  @media (max-width: 575.98px) {
    height: 150px;
  }

  @media (min-width: 993px) {
    height: 300px;
  } */
`;

const Title = styled(Text)`
  font-family: ${(props) => props.theme.fontFamily.logo};
  font-size: 32px;
  color: ${(props: any) => props.theme.color.textBold};
`;

const Description = styled(Text)`
  margin-top: 20px;

  color: ${(props: any) => props.theme.color.text};
`;
