import { useState, useCallback } from 'react';
import styled from '@emotion/styled';

import { Text, Button, UserProfile } from 'components';

import { CommentListProps, CommentProps } from 'common/types';
import { IComment } from 'common/models';

const PostDetailCommentList = ({
  comments,
  onCreateComment,
  isCreatePending,
}: CommentListProps): JSX.Element => {
  const [content, setContent] = useState<string>('');

  const commentList = comments.map((comment: IComment) => (
    <PostDetailCommentItem key={comment.id} comment={comment} />
  ));

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = e.target;

      setContent(value);
    },
    [content],
  );

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      setContent('');
      onCreateComment(content);
    },
    [content, onCreateComment],
  );

  const onCancel = useCallback(() => {
    setContent('');
  }, [content, setContent]);

  return (
    <CommentListWrapper>
      <CommentForm onSubmit={onSubmit}>
        <CommentInput placeholder="댓글을 작성해주세요..." value={content} onChange={onChange} />
        <ButtonWrapper>
          <CommentButton isAuto primary onClick={onSubmit}>
            작성{isCreatePending && '중...'}
          </CommentButton>
          <CancelButton isAuto onClick={onCancel}>
            취소
          </CancelButton>
        </ButtonWrapper>
      </CommentForm>
      <CommentList>{commentList}</CommentList>
    </CommentListWrapper>
  );
};

const PostDetailCommentItem = ({ comment }: CommentProps): JSX.Element => {
  console.log(comment);
  return (
    <CommentItem>
      <UserWrapper>
        <UserProfile src={comment.user?.profile} />
        <Name>{comment.user?.nickname}</Name>
      </UserWrapper>
      <Content>{comment.content}</Content>
    </CommentItem>
  );
};

export default PostDetailCommentList;

const CommentListWrapper = styled.div`
  margin-top: 3rem;
`;

const CommentForm = styled.form``;

const CommentInput = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 15px 10px;
  font-size: ${(props: any) => props.theme.fontSize.content};

  border: 1px solid #eaeaea;
  border-radius: 6px;
  background-color: #fff;
  outline: none;

  &:focus {
    border-width: 2px;
    border-color: ${(props: any) => props.theme.color.primary};
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 10px;

  display: flex;
  align-items: center;
`;

const CommentButton = styled(Button)`
  margin-left: auto;
  margin-right: 7px;
`;

const CancelButton = styled(Button)``;

const CommentList = styled.div`
  margin-top: 25px;
`;

const CommentItem = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #eaeaea;
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled(Text)`
  margin-left: 5px;
  font-weight: 600;
`;

const Content = styled(Text)`
  margin-top: 12px;
`;
