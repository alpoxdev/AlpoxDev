import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

// stores
import { inject, observer } from 'mobx-react';
import { initializeStore, MSTProps } from 'stores';

// helmet
import { Helmet } from 'components';
import { customHelmet as helmet } from 'common/helmet';

// containers
import { PostDetailContainer } from 'containers';

// utils
import { isSSR, deleteUndefinedInStore } from 'utils';

const PostDetailPage = ({ store }: MSTProps): JSX.Element => {
  const router = useRouter();
  const id = router.query?.id;

  const { postStore, commentStore } = store;
  const { post } = postStore;
  const { comments } = commentStore;

  const onGetPost = useCallback(() => {
    if (!post.isReady) postStore.onGetPost({ id });
    if (!comments.isReady) commentStore.onGetComments({ id });
  }, [id, post.isReady, comments.isReady]);

  useEffect(() => {
    onGetPost();
  }, [id, onGetPost]);

  useEffect(() => {
    return () => post.onDefault();
  }, []);

  useEffect((): any => {
    if (post.isError) {
      router.replace('/posts');
      return () => post.onDefault();
    }
  }, [post.isError]);

  return (
    <>
      <Helmet
        helmet={helmet({
          title: `${post.data?.title} - AlpoxDev`,
          description: post.data?.content,
          image: post.data?.thumbnail || null,
        })}
      />
      <PostDetailContainer store={store} />
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { id } = params;

  const store = initializeStore();
  const { postStore, commentStore } = store;

  isSSR() && (await Promise.all([postStore.onGetPost({ id }), commentStore.onGetComments({ id })]));

  return { props: { initialState: deleteUndefinedInStore(store) } };
}

export default inject('store')(observer(PostDetailPage));
