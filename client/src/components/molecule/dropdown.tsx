import {} from 'react';
import styled from '@emotion/styled';
import { SerializedStyles } from '@emotion/core';
import { DropdownProps, DropdownItemProps } from 'common/types';

export const Dropdown = ({
  children,
  view,
  css,
  items,
  onMouseOver = () => {},
}: DropdownProps): JSX.Element | null => {
  if (!view) return null;

  const itemList = items
    ? items.map(
        (item: DropdownItemProps, index: number) => (
          <DropdownItem
            key={item?.id || `dropdown-${index}`}
            onClick={item?.onClick ? item?.onClick : () => {}}
          >
            {item?.content}
          </DropdownItem>
        ),
        [],
      )
    : null;

  return (
    <>
      <DropdownWrapper css={css}>{itemList || children}</DropdownWrapper>
      <Other onClick={onMouseOver} />
    </>
  );
};

const Other = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 991;
`;

const DropdownWrapper = styled.ul<{ css?: SerializedStyles }>`
  width: 120px;
  background-color: white;

  position: absolute;

  border-radius: 4px;
  box-shadow: 3px 2px 14px 3px rgba(0, 0, 0, 0.05);
  z-index: 992;

  ${(props) => props.css};
`;

const DropdownItem = styled.li`
  list-style: none;
  padding: 10px 12px;
  padding-top: 10px;
  border-bottom: 0.5px solid #eaeaea;

  font-family: ${(props: any) => props.theme.fontFamily.primary};
  font-size: 15px;

  &:hover {
    background-color: #f0f0f0;
  }

  &:last-child {
    border-bottom: 0;
  }
`;
