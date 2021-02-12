import React, { useCallback, useEffect } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { Text } from 'components';
import { FontSize } from 'common/theme';

// stores
import { useStore } from 'stores';
import { AsyncStatus } from 'common/mst';

// components
import { Modal } from 'components';
import { UserProfile } from './userProfile';

// utils
import { onGetUserData } from 'utils';

export const Layout = ({ children }) => {
  const { user, accessToken } = onGetUserData();

  const store = useStore();
  const { tagStore } = store;
  const { tags } = tagStore;

  const onGetTags = useCallback(() => {
    if (tags.status !== AsyncStatus.ready) tagStore.onGetTags({});
  }, [tags.status]);

  useEffect(() => {
    onGetTags();
  }, [onGetTags]);

  return (
    <LayoutWrapper>
      <LayoutHeaderWrapper>
        <LayoutHeader>
          <Link href="/">
            <Logo fontSize={FontSize.title}>AlpoxDev</Logo>
          </Link>

          <UserProfile src={user?.profile} css={UserProfileCSS} />
        </LayoutHeader>
      </LayoutHeaderWrapper>

      <LayoutContent>{children}</LayoutContent>

      <Modal />
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
  border-bottom: 1px solid #eaeaea;

  position: fixed;
  top: 0;

  display: flex;
  align-items: center;
`;

const LayoutHeader = styled.div`
  width: 1080px;
  margin: 0 auto;
  padding: 0 21px;

  display: flex;
  align-items: center;
`;

const Logo = styled(Text)`
  margin-left: 5px;
  cursor: pointer;
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

const UserProfileCSS = css`
  margin-left: auto;
  border: 1px solid #eaeaea;
`;
