import React, { useCallback } from 'react';

import { inject, observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import { initializeStore, MSTProps } from 'stores';
import { PostList } from 'components';

export const PostListPage = ({ store }: MSTProps): JSX.Element => {
  const { postStore } = store;
  const { posts } = postStore;

  return (
    <>
      <PostList posts={posts.data} />
    </>
  );
};

export async function getServerSideProps(context) {
  const store = initializeStore();
  const { postStore } = store;

  await postStore.onGetPosts({});

  return { props: { initialState: getSnapshot(store) } };
}

export default inject('store')(observer(PostListPage));
