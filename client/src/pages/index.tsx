import { useCallback, useEffect } from 'react';

// stores
import { inject, observer } from 'mobx-react';
import { initializeStore, MSTProps } from 'stores';

// containers and components
import { PostListContainer } from 'containers';
import { Introduce } from 'components';

// utils
import { isSSR, deleteUndefinedInStore } from 'utils';

const IndexPage = ({ store }: MSTProps): JSX.Element => {
  const { postStore } = store;
  const { posts } = postStore;

  const onGetInit = useCallback(() => {
    if (posts.total === 0) {
      postStore.onGetPosts({});
    }
  }, [posts.total]);

  useEffect(() => {
    onGetInit();
  }, [onGetInit]);

  return (
    <>
      <Introduce />
      <PostListContainer store={store} />
    </>
  );
};

export async function getServerSideProps() {
  const store = initializeStore();
  const { postStore } = store;

  isSSR() && (await postStore.onGetPosts({}));

  return { props: { initialState: deleteUndefinedInStore(store) } };
}

export default inject('store')(observer(IndexPage));
