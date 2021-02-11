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
