import { IModal } from 'common/models';

export interface ModalItemProps {
  modal: IModal;
  onModalRemove: (id: number) => void;
}
