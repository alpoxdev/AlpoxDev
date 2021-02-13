import React from 'react';
import styled from '@emotion/styled';

import { Text, Skeleton } from 'components';
import { PostProps } from 'common/types';
import { FontSize } from 'common/theme';

const Header = ({ post }: PostProps): JSX.Element => {
  return (
    <>
      <HeaderWrapper>
        <Title fontSize={FontSize.title}>
          {post ? post?.title : <Skeleton width={300} height={45} />}
        </Title>
      </HeaderWrapper>

      <UserWrapper>
        {post ? <Profile src="/logo.png" /> : <Skeleton circle width={30} height={30} />}

        <Name>{post ? post?.user?.nickname : <Skeleton width={80} height={20} />}</Name>
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
  border-radius: 50%;
  border: 1px solid #eaeaea;
`;

const Name = styled(Text)`
  margin-left: 5px;
`;
