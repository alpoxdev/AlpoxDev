import React from 'react';
import styled from '@emotion/styled';

import { Text, Divider } from 'components';
import { IPost } from 'common/models';
import { FontSize } from 'common/theme';
import { onGetDateFormat } from 'utils';

interface IPostList {
  posts: IPost[];
}

interface IPostItem {
  post: IPost;
}

export const PostList = ({ posts }: IPostList) => {
  const postList = posts.map((post: IPost, index: number) => <PostItem key={index} post={post} />);

  return <PostListView>{postList}</PostListView>;
};

const PostItem = ({ post }: IPostItem) => {
  return (
    <PostItemView>
      <Thumbnail
        src={
          'https://user-images.githubusercontent.com/29870990/46203755-bcaeaa00-c355-11e8-81f1-4802fa47682b.jpg'
        }
      />
      <Divider color="#ddd" />

      <ContentWrapper>
        <Title>{post.title}</Title>
        <SubTitle>{post.subtitle}</SubTitle>
        <InfoWrapper>
          <CreatedAt fontSize={FontSize.info}>{onGetDateFormat(post.createdAt)}</CreatedAt>
        </InfoWrapper>
      </ContentWrapper>
    </PostItemView>
  );
};

const PostListView = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PostItemView = styled.article`
  box-shadow: 3px 2px 14px 3px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
  cursor: pointer;

  @media (max-width: 575.98px) {
    width: 100%;

    &:nth-child(3n + 2) {
      margin-left: 0;
      margin-right: 0;
    }

    &:nth-child(2n) {
      margin-left: 0;
    }

    &:nth-child(2n + 1) {
      margin-right: 0;
    }
  }

  @media (min-width: 576px) and (max-width: 992px) {
    width: 48.5%;

    &:nth-child(3n + 2) {
      margin-left: 0;
      margin-right: 0;
    }

    &:nth-child(2n) {
      margin-left: 1.5%;
    }

    &:nth-child(2n + 1) {
      margin-right: 1.5%;
    }
  }

  @media (min-width: 993px) {
    width: 32%;

    &:nth-child(2n) {
      margin-left: 0;
    }

    &:nth-child(2n + 1) {
      margin-right: 0;
    }

    &:nth-child(3n + 2) {
      margin-left: 2%;
      margin-right: 2%;
    }
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  max-height: 250px;

  object-fit: contain;
`;

const ContentWrapper = styled.div`
  padding: 22px 18px 20px;
`;

const Title = styled(Text)`
  font-size: ${(props: any) => props.theme.fontSize.title};
  font-weight: 600;
`;

const SubTitle = styled(Text)`
  margin-top: 8px;
`;

const InfoWrapper = styled.div`
  margin-top: 12px;

  display: flex;
  align-items: center;
`;

const CreatedAt = styled(Text)``;
