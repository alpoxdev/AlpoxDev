import React from 'react';

// stores
import { MSTProps } from 'stores';

// components
import { PostDetailHeader, PostDetailContent } from 'components';

export const PostDetailContainer = ({ store }: MSTProps): JSX.Element => {
  const { postStore } = store;
  const { post } = postStore;

  return (
    <>
      <PostDetailHeader post={post.data} />
      <PostDetailContent content={post.data?.content || ''} />
    </>
  );
};
