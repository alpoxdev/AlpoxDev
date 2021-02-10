import { inject, observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import { initializeStore, MSTProps } from 'stores';

import { PostListPage } from 'pages/posts';
import { Introduce } from 'components';

const IndexPage = ({ store }: MSTProps): JSX.Element => {
  return (
    <>
      <Introduce />
      <PostListPage store={store} />
    </>
  );
};

export async function getServerSideProps(context) {
  const store = initializeStore();
  const { postStore, tagStore } = store;

  await postStore.onGetPosts({});
  await tagStore.onGetTags({});

  return { props: { initialState: getSnapshot(store) } };
}

export default inject('store')(observer(IndexPage));
