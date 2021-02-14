import React, { useCallback, useEffect } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { Header } from 'components';
import { FontSize } from 'common/theme';

// stores
import { useStore } from 'stores';
import { AsyncStatus } from 'common/mst';

// components
import { Modal, UserProfile, Dropdown } from 'components';

// utils
import { onGetUserData } from 'utils';

// hooks
import { useMouseHover } from 'hooks';

export const Layout = ({ children }) => {
  const store = useStore();
  const { tagStore } = store;
  const { tags } = tagStore;

  const onGetTags = useCallback(() => {
    if (!tags.isReady) tagStore.onGetTags({});
  }, [tags.isReady]);

  useEffect(() => {
    onGetTags();
  }, [tags.isReady, onGetTags]);

  return (
    <LayoutWrapper>
      <LayoutContent>{children}</LayoutContent>
      <Header />
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: rgb(247, 248, 251);
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
