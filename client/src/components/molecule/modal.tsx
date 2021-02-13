import { useCallback } from 'react';
import styled from '@emotion/styled';

import { useStore } from 'stores';
import { ModalItemProps } from 'common/types';
import { IModal } from 'common/models';

import { FontSize } from 'common/theme';
import { Text } from 'components';

export const Modal = (): JSX.Element | null => {
  const store = useStore();
  const { modalStore } = store;
  const { modals } = modalStore;

  //   console.log('ModalStore', modals.toJS());

  const onModalRemove = (id: number) => {
    //   modalStore.onModalRemove(id);
    modalStore.onModalCreate({
      id: 2,
      status: true,
      content: 'testtest2',
    } as IModal);
  };

  if (modals.length === 0) return null;

  return (
    <>
      {modals.map((modal: IModal) => (
        <ModalItem key={modal.id} modal={modal} onModalRemove={onModalRemove} />
      ))}
    </>
  );
};

const ModalItem = ({ modal, onModalRemove }: ModalItemProps): JSX.Element | null => {
  const { status, width, height, zIndex, title, content } = modal;
  if (!status) return null;

  return (
    <>
      <ModalWrapper onClick={() => onModalRemove(modal.id)} />

      <ModalView width={width} height={height} zIndex={zIndex}>
        {title && <Title fontSize={FontSize.title}>{title}</Title>}
        <Content fontSize={FontSize.content}>{content}</Content>
      </ModalView>
    </>
  );
};

const ModalWrapper = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  background-color: transparent;
`;

interface ModalViewProps {
  width: string;
  height: string;
  zIndex: number;
  [key: string]: any;
}

const ModalView = styled.div<ModalViewProps>`
  width: ${(props) => props.width};
  min-height: ${(props) => props.height};

  z-index: ${(props) => props.zIndex};

  background-color: white;
  box-shadow: 3px 2px 14px 3px rgba(0, 0, 0, 0.05);

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Title = styled(Text)``;

const Content = styled(Text)``;
