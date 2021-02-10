import { Instance, types } from 'mobx-state-tree';
import { createAsyncModel, createAsyncModels, EmptyModel } from 'common/mst';

export const Tag = types.model('Tag', {
  id: types.maybe(types.number),
  name: types.maybe(types.string),
});

export const tags = createAsyncModels('Tags', Tag);
export const tag = createAsyncModel('Tag', Tag);
export const createTag = createAsyncModel('create', EmptyModel);
export const deleteTag = createAsyncModel('delete', EmptyModel);
export const updateTag = createAsyncModel('update', EmptyModel);

export type ITag = Instance<typeof Tag>;
