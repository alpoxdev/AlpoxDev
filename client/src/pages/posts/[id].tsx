import React from 'react';

import { inject, observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import { initializeStore, MSTProps } from 'stores';
import { PostList } from 'components';
import posts from '.';

const PostDetailPage = ({ store }): JSX.Element => {
  const { postStore } = store;
  const { post } = postStore;

  return (
    <div>
      <div>제목: {post.data.title}</div>
      <div>부제목: {post.data.subtitle}</div>
      <div>내용: {post.data.content}</div>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const { id } = params;

  const store = initializeStore();
  const { postStore } = store;

  await postStore.onGetPost({ id });

  return { props: { initialState: getSnapshot(store) } };
}

export default inject('store')(observer(PostDetailPage));
