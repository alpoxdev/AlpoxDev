import styled from '@emotion/styled';

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props: any) => props.color || '#000'};
`;
