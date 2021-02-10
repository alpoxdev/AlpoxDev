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
import { deleteUndefinedInStore } from 'utils';

const PostDetailPage = ({ store }: MSTProps): JSX.Element => {
  const router = useRouter();
  const id = router.query?.id;

  const { postStore } = store;
  const { post } = postStore;

  const onGetPost = useCallback(() => {
    postStore.onGetPost({ id });
  }, [id]);

  useEffect(() => {
    onGetPost();
  }, [id, onGetPost]);

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
  const { postStore } = store;

  await postStore.onGetPost({ id });

  return { props: { initialState: deleteUndefinedInStore(store) } };
}

export default inject('store')(observer(PostDetailPage));
