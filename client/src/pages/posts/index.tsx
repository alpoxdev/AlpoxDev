import React, { useCallback } from 'react';

import { inject, observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import { initializeStore, MSTProps } from 'stores';

// container
import { PostListContainer } from 'containers';
// import { PostList } from 'components';

export const PostListPage = ({ store }: MSTProps): JSX.Element => {
  return <PostListContainer store={store} />;
};

export async function getServerSideProps(context) {
  const store = initializeStore();
  const { postStore } = store;

  await postStore.onGetPosts({});

  return { props: { initialState: getSnapshot(store) } };
}

export default inject('store')(observer(PostListPage));
