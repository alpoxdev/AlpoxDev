import React from 'react';
import styled from '@emotion/styled';

export const Layout: React.FC = ({ children }) => {
  return (
    <LayoutWrapper>
      <LayoutHeader></LayoutHeader>
      <LayoutContent>{children}</LayoutContent>
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: rgb(247, 248, 251);
`;

const LayoutHeader = styled.div`
  width: 100%;
  height: 64px;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const LayoutContent = styled.div`
  width: 1080px;
  min-height: 100vh;

  margin: 0 auto;
  padding: 0 21px;
  padding-top: 64px;

  @media (max-width: 1080px) {
    width: 100%;
  }
`;
