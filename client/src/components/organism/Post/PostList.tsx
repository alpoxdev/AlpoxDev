import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

import { Text, Footer } from 'components';
import { IPost } from 'common/models';
import { FontSize } from 'common/theme';
import { onGetDateFormat } from 'utils';

interface IPostList {
  posts: IPost[];
  onGetMorePosts: () => void;
}

interface IPostItem {
  post: IPost;
}

const List = ({ posts, onGetMorePosts }: IPostList) => {
  const postList = posts.map((post: IPost, index: number) => <PostItem key={index} post={post} />);

  return <PostListView>{postList}</PostListView>;
};

const PostItem = ({ post }: IPostItem) => {
  return (
    <Link href="/posts/:id" as={`/posts/${post.id}`}>
      <PostItemView>
        <Thumbnail src={'/logo.png'} />

        <ContentWrapper>
          <Title>{post.title}</Title>
          <SubTitle>{post.subtitle}</SubTitle>
        </ContentWrapper>

        <InfoWrapper>
          <Profile src={'/logo.png'} />
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
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #eaeaea;

  margin-right: 6.5px;
`;

const Name = styled(Text)`
  color: ${(props: any) => props.theme.color.text};
`;

const CreatedAt = styled(Text)`
  margin-left: auto;
`;
