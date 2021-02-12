import { useCallback, useEffect } from 'react';

// stores
import { inject, observer } from 'mobx-react';
import { initializeStore, MSTProps } from 'stores';
import { AsyncStatus } from 'common/mst';

// containers and components
import { PostListContainer } from 'containers';
import { Introduce } from 'components';

// utils
import { deleteUndefinedInStore } from 'utils';

const IndexPage = ({ store }: MSTProps): JSX.Element => {
  const { postStore } = store;
  const { posts } = postStore;

  const onGetInit = useCallback(() => {
    if (!posts.isReady) postStore.onGetPosts({});
  }, [posts.isReady]);

  useEffect(() => {
    onGetInit();
  }, [onGetInit, posts.isReady]);

  return (
    <>
      <Introduce />
      <PostListContainer store={store} />
    </>
  );
};

export async function getServerSideProps() {
  const store = initializeStore();
  const { postStore, tagStore } = store;

  await postStore.onGetPosts({});
  await tagStore.onGetTags({});

  return { props: { initialState: deleteUndefinedInStore(store) } };
}

export default inject('store')(observer(IndexPage));
