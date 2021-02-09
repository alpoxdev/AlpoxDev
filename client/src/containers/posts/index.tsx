import React from 'react';

// stores
import { MSTProps } from 'stores';

// components
import { PostList } from 'components';

export const PostListContainer = ({ store }: MSTProps): JSX.Element => {
  const { postStore } = store;
  const { posts } = postStore;
  return (
    <>
      <PostList posts={posts.data || []} />
    </>
  );
};
