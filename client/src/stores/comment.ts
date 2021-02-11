import { types, Instance } from 'mobx-state-tree';
import { CommentRepository } from 'repository';

import { comments, createComment } from 'common/models';

export const CommentStore = types
  .model('CommentStore', {
    comments,
    createComment,
  })
  .actions((self) => ({
    onGetComments: (props?) =>
      self.comments.onGetAll(() => CommentRepository.onGetComments(props), 'comments'),
    onCreateComment: (props?) =>
      self.createComment.onCreate(() => CommentRepository.onCreateComment(props)),
  }));

const commentStore = CommentStore.create({});

export type ICommentStore = Instance<typeof commentStore>;

export default commentStore;
