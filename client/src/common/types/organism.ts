import React from 'react';
import { IPost, IComment } from 'common/models';

export interface PostProps {
  post: IPost;
}

export interface PostsProps {
  posts: IPost[];
}

export interface CommentProps {
  comment: IComment;
}
export interface CommentsProps {
  comments: IComment[];
}

export interface CommentListProps extends CommentsProps {
  onCreateComment: (content: string) => void;
  isCreatePending: boolean;
}

export interface PostCreateTextAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export type CreatePostInput = {
  title: string;
  subtitle: string;
  content: string;
  tagInput: string;
  tags: string[];
};

export interface PostCreateHeaderProps {
  input: CreatePostInput;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onTagEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
