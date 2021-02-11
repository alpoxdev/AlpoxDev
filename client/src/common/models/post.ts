import { Instance, types } from 'mobx-state-tree';
import { createAsyncModel, createAsyncModels, EmptyModel } from 'common/mst';
import { User, Comment } from 'common/models';

export const Post = types.model('Post', {
  id: types.maybe(types.number),
  title: types.maybe(types.string),
  subtitle: types.maybe(types.string),
  content: types.maybe(types.string),
  views: types.maybe(types.number),
  public: types.maybe(types.boolean),
  createdAt: types.maybe(types.string),

  user: types.optional(types.maybe(User), undefined),
  comments: types.optional(types.array(Comment), []),
});

export const posts = createAsyncModels('Posts', Post);
export const post = createAsyncModel('Post', Post);
export const createPost = createAsyncModel('create', EmptyModel);
export const deletePost = createAsyncModel('delete', EmptyModel);
export const updatePost = createAsyncModel('update', EmptyModel);

export type IPost = Instance<typeof Post>;
