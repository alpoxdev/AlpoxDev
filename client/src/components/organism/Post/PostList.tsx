import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

import { Text } from 'components';
import { IPost } from 'common/models';
import { FontSize } from 'common/theme';
import { onGetDateFormat } from 'utils';

interface IPostList {
  posts: IPost[];
}

interface IPostItem {
  post: IPost;
}

const List = ({ posts }: IPostList) => {
  const postList = posts.map((post: IPost, index: number) => <PostItem key={index} post={post} />);

  return <PostListView>{postList}</PostListView>;
};

const PostItem = ({ post }: IPostItem) => {
  return (
    <Link href="/posts/:id" as={`/posts/${post.id}`}>
      <PostItemView>
        <Thumbnail
          src={
            'https://user-images.githubusercontent.com/29870990/46203755-bcaeaa00-c355-11e8-81f1-4802fa47682b.jpg'
          }
        />

        <ContentWrapper>
          <Title>{post.title}</Title>
          <SubTitle>{post.subtitle}</SubTitle>
        </ContentWrapper>

        <InfoWrapper>
          <Profile
            src={
              'data:image/jpeg;base64,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'
            }
          />
          <Name fontSize={FontSize.info}>AlpoxDev</Name>
          <CreatedAt fontSize={FontSize.info}>{onGetDateFormat(post.createdAt)}</CreatedAt>
        </InfoWrapper>
      </PostItemView>
    </Link>
  );
};

export default List;

const PostListView = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PostItemView = styled.article`
  box-shadow: 3px 2px 14px 3px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
  cursor: pointer;

  display: flex;
  flex-direction: column;

  transition-property: margin-top, margin-bottom;
  transition-timing-function: ease-in-out;
  transition-duration: 350ms;
  &:hover {
    margin-top: -7px;
    margin-bottom: 37px;
  }

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
  object-fit: contain;
  border-bottom: 1px solid #eaeaea;

  @media (max-width: 575.98px) {
    max-height: 190px;
  }

  @media (min-width: 576px) and (max-width: 992px) {
    height: 220px;
  }

  @media (min-width: 993px) {
    height: 250px;
  }
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
  margin-top: auto;
  padding: 13px 18px;
  border-top: 1px solid #eaeaea;

  display: flex;
  align-items: center;
`;

const Profile = styled.img`
  width: 18px;
  height: 18px;
  border-radius: 50%;

  margin-right: 6.5px;
`;

const Name = styled(Text)`
  color: ${(props: any) => props.theme.color.text};
`;

const CreatedAt = styled(Text)`
  margin-left: auto;
`;
