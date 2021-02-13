import React, { useCallback, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

// stores
import { observer } from 'mobx-react';
import { MSTProps } from 'stores';
import { AsyncStatus } from 'common/mst';

// components
import { PostDetailHeader, PostDetailContent, PostDetailCommentList } from 'components';

export const PostDetailContainer = observer(
  ({ store }: MSTProps): JSX.Element => {
    const router = useRouter();
    const postId = useMemo(() => router.query?.id, [router.query]);

    const { postStore, commentStore } = store;
    const { post } = postStore;
    const { comments, createComment } = commentStore;

    const onCreateComment = useCallback(
      (content: string) => {
        const params = { content };
        commentStore.onCreateComment({ id: postId, params });
      },
      [postId, commentStore.createComment],
    );

    const onGetComments = useCallback(() => {
      if (postId) commentStore.onGetComments({ id: postId });
    }, [postId, commentStore.onGetComments, commentStore.createComment.status]);

    useEffect(() => {
      return () => {
        comments.onDefault();
      };
    }, [postId]);

    return (
      <PostDetailContainerWrapper>
        <PostDetailHeader post={post.data} />
        <PostDetailContent content={post.data?.content || ''} />
        <PostDetailCommentList
          comments={comments.data}
          onCreateComment={onCreateComment}
          isCreatePending={createComment.status === AsyncStatus.pending}
        />
      </PostDetailContainerWrapper>
    );
  },
);

const PostDetailContainerWrapper = styled.div`
  width: 800px;
  margin: 0 auto;
`;
