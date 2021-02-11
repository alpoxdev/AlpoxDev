import { Instance, types } from 'mobx-state-tree';

export const Modal = types.model('Modal', {
  id: types.optional(types.number, 0),
  status: types.optional(types.boolean, false),
  content: types.optional(types.maybeNull(types.string), null),
  title: types.optional(types.maybeNull(types.string), null),
  zIndex: types.optional(types.number, 2),
  width: types.optional(types.string, '300px'),
  height: types.optional(types.string, '400px'),
});

export type IModal = Instance<typeof Modal>;
