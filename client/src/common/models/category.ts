import { Instance, types } from 'mobx-state-tree';
import { createAsyncModel, createAsyncModels, EmptyModel } from 'common/mst';

export const Category = types.model('Category', {
  id: types.maybe(types.number),
  name: types.maybe(types.string),
});

export const categories = createAsyncModels('categories', Category);
export const category = createAsyncModel('category', Category);
export const createCategory = createAsyncModel('create', EmptyModel);
export const deleteCategory = createAsyncModel('delete', EmptyModel);
export const updateCategory = createAsyncModel('update', EmptyModel);

export type ICategory = Instance<typeof Category>;
