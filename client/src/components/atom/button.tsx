import styled from '@emotion/styled';
import { FontSize } from 'common/theme';

export const Button = styled.button<{ isAuto?: boolean; fontSize?: FontSize; primary?: boolean }>`
  width: ${(props: any) => (props.isAuto ? 'auto' : '100%')};
  padding: 7px 15px;
  padding-top: 8px;

  color: ${(props: any) => (props.primary ? 'white' : props.theme.color.text)};
  background-color: ${(props: any) => (props.primary ? props.theme.color.primary : '#eaeaea')};
  font-size: ${(props: any) => props.theme.fontSize.content};
  font-family: 700;

  border: 0;
  border-radius: 5px;
  outline: 0;
  cursor: pointer;
`;
