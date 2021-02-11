import {} from 'react';
import styled from '@emotion/styled';

export const Form = ({
  children,
  onSubmit,
}: {
  children: JSX.Element | JSX.Element[];
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}): JSX.Element => {
  return (
    <FormWrapper onSubmit={onSubmit ? onSubmit : (e) => e.preventDefault()}>{children}</FormWrapper>
  );
};

const FormWrapper = styled.form`
  width: 400px;
  height: 120px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
`;
