import { useCallback, useState } from 'react';
import styled from '@emotion/styled';

import { MSTProps } from 'stores';

// components
import { Input, Form, Button } from 'components';
import { AsyncStatus } from 'common/mst';

const initialInput = {
  id: '',
  password: '',
};

type InitialInput = typeof initialInput;

export const AuthLoginContainer = ({ store }: MSTProps): JSX.Element => {
  const { authStore } = store;
  const { login } = authStore;

  const [input, setInput] = useState<InitialInput>(initialInput);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setInput((input) => ({
        ...input,
        [name]: value,
      }));
    },
    [setInput],
  );

  const onLogin = useCallback(() => {
    if (login.status === AsyncStatus.pending) return;

    const params = { ...input };
    authStore.onLogin({ params });
  }, [input, login.status, authStore.onLogin]);

  return (
    <Form>
      <Input name="id" placeholder="id" value={input.id} onChange={onChange} />
      <Input name="password" placeholder="password" value={input.password} onChange={onChange} />

      <LoginButton onClick={onLogin}>로그인</LoginButton>
    </Form>
  );
};

const LoginButton = styled(Button)`
  margin-top: auto;

  color: #fff;
  background-color: ${(props: any) => props.theme.color.primary};
`;
