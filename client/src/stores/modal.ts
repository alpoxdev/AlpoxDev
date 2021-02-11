import { Instance, types } from 'mobx-state-tree';
import { Modal, IModal } from 'common/models';
import { EFAULT } from 'constants';

export const ModalStore = types
  .model('Modal', {
    modals: types.optional(types.array(Modal), []),
  })
  .actions((self) => ({
    onModalCreate: (modalItem: IModal) => {
      self.modals.push(modalItem);
    },
    onModalRemove: (id: number) => {
      const newModals: IModal[] = self.modals.filter((modal: IModal) => modal.id !== id);
      console.log('onModalRemove', self.modals, newModals);

      const findItem = self.modals.find((item: IModal) => item.id === id);
      const index = self.modals.indexOf(findItem);
      if (index > -1) self.modals.splice(index, 1);

      //   self.modals.clear();
      //   self.modals.push(...newModals);
    },
  }));

const modalStore = ModalStore.create();
export type IModalStore = Instance<typeof modalStore>;
