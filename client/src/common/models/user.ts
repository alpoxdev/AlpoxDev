import { Instance, types } from 'mobx-state-tree';
import { createAsyncModel, createAsyncModels, EmptyModel } from 'common/mst';

export const User = types.model('User', {
  id: types.maybe(types.number),
  email: types.maybe(types.string),
  nickname: types.maybe(types.string),
  profile: types.maybeNull(types.string),
  role: types.maybe(types.string),
  createdAt: types.maybe(types.string),
  updatedAt: types.maybe(types.string),
  deletedAt: types.maybe(types.maybeNull(types.string)),
});

export const users = createAsyncModels('Users', User);
export const user = createAsyncModel('user', User);
export const deleteUser = createAsyncModel('delete', EmptyModel);
export const updateUser = createAsyncModel('update', EmptyModel);

export type IUser = Instance<typeof User>;
