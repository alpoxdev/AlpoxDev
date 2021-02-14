import React, { useCallback, useMemo } from 'react';
import { observer } from 'mobx-react';

// stores
import { MSTProps } from 'stores';

// components
import { PostList, Footer } from 'components';

export const PostListContainer = observer(
  ({ store }: MSTProps): JSX.Element => {
    const { postStore } = store;
    const { posts } = postStore;

    const isDone = useMemo(() => posts.skip >= posts.total, [posts.skip, posts.total]);

    const onGetMorePosts = useCallback(() => {
      if (isDone) return;

      const query = { skip: posts.skip, take: posts.take };
      postStore.onGetMorePosts({ query });
    }, [postStore.onGetMorePosts, posts.total, isDone]);

    return (
      <>
        <PostList posts={posts.data || []} onGetMorePosts={onGetMorePosts} />
        <Footer view={!isDone} action={onGetMorePosts} />
      </>
    );
  },
);
