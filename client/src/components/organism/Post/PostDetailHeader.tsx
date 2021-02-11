import React from 'react';
import styled from '@emotion/styled';

import { Text, Skeleton } from 'components';
import { PostProps } from 'common/types';
import { FontSize } from 'common/theme';

const Header = ({ post }: PostProps): JSX.Element => {
  //   post = null;
  return (
    <>
      <HeaderWrapper>
        <Skeleton width={200} height={45} view={!post}>
          <Title fontSize={FontSize.title}>{post?.title}</Title>
        </Skeleton>
      </HeaderWrapper>

      <UserWrapper>
        <Skeleton width={30} height={30} circle view={!post}>
          <Profile src="/logo.png" />
        </Skeleton>

        <Name>{post?.user?.nickname}</Name>
      </UserWrapper>
    </>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const UserWrapper = styled.div`
  margin-top: 15px;

  display: flex;
  align-items: center;
`;

const Title = styled(Text)`
  font-size: 2.5em;
`;

const Profile = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 5px;
  border-radius: 50%;
  border: 1px solid #eaeaea;
`;

const Name = styled(Text)``;
