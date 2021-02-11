import styled from '@emotion/styled';

export const Input = styled.input<{ fontWeight?: number }>`
  padding: 7px 15px;
  background-color: transparent;

  display: block;

  font-size: ${(props: any) => props.theme.color.subtitle};
  font-weight: ${(props: any) => props.fontWeight || 600};

  border: 0;
  outline: 0;
`;
