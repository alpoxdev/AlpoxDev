import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import { MSTProps } from 'stores';

// components
import { Input, Form, Button } from 'components';
import { AsyncStatus } from 'common/mst';
import { observer } from 'mobx-react';
import { Router } from 'next/router';

const initialInput = {
  id: '',
  password: '',
};

type InitialInput = typeof initialInput;

export const AuthLoginContainer = observer(
  ({ store }: MSTProps): JSX.Element => {
    const router = useRouter();

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

    useEffect(() => {
      if (login.status !== AsyncStatus.ready) return null;

      router.push('/');
      return () => login.onDefault();
    }, [router, login.status === AsyncStatus.ready]);

    return (
      <Form>
        <Input name="id" type="text" placeholder="id" value={input.id} onChange={onChange} />
        <Input
          name="password"
          type="password"
          placeholder="password"
          value={input.password}
          onChange={onChange}
        />

        <LoginButton onClick={onLogin}>
          로그인{login.status === AsyncStatus.pending && '중...'}
        </LoginButton>
      </Form>
    );
  },
);

const LoginButton = styled(Button)`
  margin-top: auto;

  color: #fff;
  background-color: ${(props: any) => props.theme.color.primary};
`;
