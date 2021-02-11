import { Instance, types } from 'mobx-state-tree';
import { createAsyncModel, createAsyncModels, EmptyModel } from 'common/mst';
import { User } from 'common/models';

export const Comment = types.model('Comment', {
  id: types.maybe(types.number),
  content: types.maybe(types.string),
  name: types.maybe(types.string),
  user: types.maybe(types.maybeNull(User)),
  createdAt: types.maybe(types.string),
  updatedAt: types.maybe(types.string),
});

export const comments = createAsyncModels('Comments', Comment);
export const createComment = createAsyncModel('create', EmptyModel);

export type IComment = Instance<typeof Comment>;
