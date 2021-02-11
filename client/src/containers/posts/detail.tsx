import React, { useCallback, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

// stores
import { MSTProps } from 'stores';
import { AsyncStatus } from 'common/mst';

// components
import { PostDetailHeader, PostDetailContent, PostDetailCommentList } from 'components';

export const PostDetailContainer = ({ store }: MSTProps): JSX.Element => {
  const router = useRouter();
  const postId = useMemo(() => router.query?.id, [router.query]);

  const { postStore, commentStore } = store;
  const { post } = postStore;
  const { comments, createComment } = commentStore;

  const postComments = useMemo(() => {
    if (post.data?.comments?.length > comments.data.length) return post.data?.comments;
    if (comments.data.length > 0) return comments.data;

    return [];
  }, [post.data, comments.data]);

  const onCreateComment = useCallback(
    (content: string) => {
      const params = { content };
      commentStore.onCreateComment({ id: postId, params });
    },
    [postId, commentStore.createComment],
  );

  const onGetComments = useCallback(() => {
    commentStore.onGetComments({ id: postId });
  }, [postId, commentStore.onGetComments, commentStore.createComment.status]);

  useEffect(() => {
    if (postId && createComment.status === AsyncStatus.ready) {
      onGetComments();
      createComment.onDefault();
    }
  }, [postId, createComment.status]);

  return (
    <PostDetailContainerWrapper>
      <PostDetailHeader post={post.data} />
      <PostDetailContent content={post.data?.content || ''} />
      <PostDetailCommentList
        comments={postComments}
        onCreateComment={onCreateComment}
        isCreatePending={createComment.status === AsyncStatus.pending}
      />
    </PostDetailContainerWrapper>
  );
};

const PostDetailContainerWrapper = styled.div`
  width: 800px;
  margin: 0 auto;
`;
