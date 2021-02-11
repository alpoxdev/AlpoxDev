import { types, Instance } from 'mobx-state-tree';
import { CategoryRepository } from 'repository';

import {
  categories,
  category,
  createCategory,
  deleteCategory,
  updateCategory,
} from 'common/models';

export const CategoryStore = types
  .model('CategoryStore', {
    categories,
    category,
    createCategory,
    deleteCategory,
    updateCategory,
  })
  .actions((self) => ({
    onGetCategories: (props?) =>
      self.categories.onGetAll(() => CategoryRepository.onGetCategories(props), 'categories'),
    onGetCategory: (props?) =>
      self.category.onGetOne(() => CategoryRepository.onGetCategory(props), 'category'),
  }));

const categoryStore = CategoryStore.create();

export type ICategoryStore = Instance<typeof categoryStore>;

export default categoryStore;
