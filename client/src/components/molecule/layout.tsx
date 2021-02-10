import React from 'react';
import styled from '@emotion/styled';
import { Text } from 'components';
import { FontSize } from 'common/theme';

export const Layout: React.FC = ({ children }) => {
  return (
    <LayoutWrapper>
      <LayoutHeaderWrapper>
        <LayoutHeader>
          <Logo fontSize={FontSize.title}>AlpoxDev</Logo>
        </LayoutHeader>
      </LayoutHeaderWrapper>

      <LayoutContent>{children}</LayoutContent>
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: rgb(247, 248, 251);
`;

const LayoutHeaderWrapper = styled.div`
  width: 100%;
  height: 64px;
  padding: 0 21px;

  background-color: rgb(247, 248, 251);
  box-shadow: 3px 2px 14px 3px rgba(0, 0, 0, 0.1);

  position: fixed;
  top: 0;

  display: flex;
  align-items: center;
`;

const LayoutHeader = styled.div`
  width: 1080px;
  margin: 0 auto;
  padding: 0 21px;
`;

const Logo = styled(Text)`
  margin-left: 5px;
`;

const LayoutContent = styled.div`
  width: 1080px;
  min-height: 100vh;

  margin: 0 auto;
  padding: 0 21px;
  padding-top: 96px;

  @media (max-width: 1080px) {
    width: 100%;
  }
`;
