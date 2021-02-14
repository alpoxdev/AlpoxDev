import { useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

// components
import { UserProfile, Dropdown, Text } from 'components';
import { FontSize } from 'common/theme';

// utils
import { onGetUserData } from 'utils';

// hooks
import { useMouseHover } from 'hooks';
import { route } from 'next/dist/next-server/server/router';

const DropdownItems = (onPush: (url: string) => void) => [
  {
    id: 1,
    content: '새글 작성',
    onClick: () => onPush('/posts/write'),
  },
  {
    id: 2,
    content: '로그아웃',
  },
];

export const Header = (): JSX.Element => {
  const router = useRouter();

  const { hover, onMouseHover } = useMouseHover();
  const { user } = onGetUserData();

  const onPush = useCallback(
    (url: string) => {
      router.push(url);
    },
    [router],
  );

  return (
    <>
      <LayoutHeaderWrapper>
        <LayoutHeader>
          <Link href="/">
            <Logo fontSize={FontSize.title}>AlpoxDev</Logo>
          </Link>

          <UserProfile src={user?.profile} css={UserProfileCSS} onMouseHover={onMouseHover} />

          <Dropdown
            view={hover}
            css={DropdownCSS}
            items={DropdownItems(onPush)}
            onMouseOver={onMouseHover}
          />
        </LayoutHeader>
      </LayoutHeaderWrapper>
    </>
  );
};

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
  height: 64px;
  margin: 0 auto;
  padding: 0 21px;

  position: relative;

  display: flex;
  align-items: center;
`;

const Logo = styled(Text)`
  margin-left: 5px;
  cursor: pointer;
`;

const UserProfileCSS = css`
  margin-left: auto;
  border: 1px solid #eaeaea;
`;

const DropdownCSS = css`
  top: 50px;
  right: 21px;
`;
