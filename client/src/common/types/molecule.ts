import { SerializedStyles } from '@emotion/react';
import { IModal } from 'common/models';
import { SkeletonThemeProps } from 'react-loading-skeleton';

export interface ModalItemProps {
  modal: IModal;
  onModalRemove: (id: number) => void;
}

export interface SkeletonProps extends SkeletonThemeProps {
  width: number;
  height: number;
  circle?: boolean;
  count?: number;
}

export interface SkeletonListProps extends SkeletonThemeProps {
  widths: number[];
  height: number;
  circle?: boolean;
  count?: number;
  css?: SerializedStyles;
  duration?: number;
}

export interface UserProfileProps {
  src?: string;
  width?: string;
  height?: string;
  css?: SerializedStyles;
  onMouseHover?: () => void;
}

export type DropdownItemProps = {
  id?: number;
  content: string;
  onClick?: () => void;
};
export interface DropdownProps {
  children?: JSX.Element | JSX.Element[];
  view: boolean;
  css?: SerializedStyles;
  items?: DropdownItemProps[];
  onMouseOver?: () => void;
}
