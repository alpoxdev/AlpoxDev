import React, { useCallback, useEffect } from 'react';

import { inject, observer } from 'mobx-react';
import { initializeStore, MSTProps } from 'stores';
import { AsyncStatus } from 'common/mst';

// container
import { PostListContainer } from 'containers';

// utils
import { deleteUndefinedInStore } from 'utils';

export const PostListPage = ({ store }: MSTProps): JSX.Element => {
  const { postStore, tagStore } = store;

  const onGetInit = useCallback(() => {
    if (postStore.posts.status !== AsyncStatus.ready) postStore.onGetPosts({});
    if (tagStore.tags.status !== AsyncStatus.ready) tagStore.onGetTags({});
  }, [postStore.posts.status, tagStore.tags.status]);

  useEffect(() => {
    onGetInit();
  }, [onGetInit]);

  return <PostListContainer store={store} />;
};

export async function getServerSideProps() {
  const store = initializeStore();
  const { postStore, tagStore } = store;

  await postStore.onGetPosts({});
  await tagStore.onGetTags({});

  return { props: { initialState: deleteUndefinedInStore(store) } };
}

export default inject('store')(observer(PostListPage));
