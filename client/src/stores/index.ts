import { useMemo } from 'react';
import { types, Instance } from 'mobx-state-tree';
import { useStaticRendering } from 'mobx-react';
import makeInspectable from 'mobx-devtools-mst';

// stores
import { AuthStore } from 'stores/auth';
import { PostStore } from 'stores/post';
import { CategoryStore } from 'stores/category';
import { SeriesStore } from 'stores/series';
import { TagStore } from 'stores/tag';
import { CommentStore } from 'stores/comment';
import { ModalStore } from 'stores/modal';
import { UserStore } from 'stores/user';

const isServer = typeof window === 'undefined';
let store: IStore | null = null;

useStaticRendering(isServer);

export const Store = types.model({
  authStore: types.optional(AuthStore, {}),
  userStore: types.optional(UserStore, {}),
  postStore: types.optional(PostStore, {}),
  categoryStore: types.optional(CategoryStore, {}),
  seriesStore: types.optional(SeriesStore, {}),
  tagStore: types.optional(TagStore, {}),
  commentStore: types.optional(CommentStore, {}),
  modalStore: types.optional(ModalStore, {}),
});

export type IStore = Instance<typeof Store>;
export interface MSTProps {
  store: IStore;
}

export const initializeStore = (initialState?: any): IStore => {
  if (isServer) {
    return Store.create(initialState);
  } else if (store !== null) {
    return store;
  } else {
    return (store = Store.create(initialState));
  }
};

export const useStore = (initialState?: any) => {
  const store = useMemo(() => initializeStore(initialState), [initialState]);

  makeInspectable(store);
  return store;
};
