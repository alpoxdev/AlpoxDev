import { inject, observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import { initializeStore, MSTProps } from 'stores';

import { PostListPage } from 'pages/posts';

const IndexPage = ({ store }: MSTProps): JSX.Element => {
  return (
    <>
      <PostListPage store={store} />
    </>
  );
};

export async function getServerSideProps(context) {
  const store = initializeStore();
  const { postStore } = store;

  await postStore.onGetPosts({});

  return { props: { initialState: getSnapshot(store) } };
}

export default inject('store')(observer(IndexPage));
