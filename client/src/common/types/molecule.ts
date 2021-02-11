import { IModal } from 'common/models';
import { SkeletonThemeProps } from 'react-loading-skeleton';

export interface ModalItemProps {
  modal: IModal;
  onModalRemove: (id: number) => void;
}

export interface SkeletonProps extends SkeletonThemeProps {
  children?: React.ReactNode | React.ReactNode;

  view?: boolean;

  width: number;
  height: number;
  circle?: boolean;
}
