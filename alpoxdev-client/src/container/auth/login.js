import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'stores/auth';

export default function AuthLoginContainer() {
    const router = useRouter();

    const dispatch = useDispatch();
    const { onLogin } = bindActionCreators(authActions, dispatch);

    const { logined, login } = useSelector((state) => ({
        logined: state.user.toJS().logined,
        login: state.auth.toJS().login,
    }));
    const { done, pending, error } = login;
    const { user } = logined;

    const [input, setInput] = React.useState({
        id: '',
        password: '',
    });

    const onChange = React.useCallback((e) => {
        const { name, value } = e.target;

        setInput({
            ...input,
            [name]: value,
        });
    });

    const onLoginClick = React.useCallback(async () => {
        onLogin(input);
    });

    React.useEffect(() => {
        if (done || user) {
            router.replace('/');
        }
    }, [done]);

    return (
        <AuthLoginContainerView>
            <LoginInput name="id" value={input?.id} onChange={onChange} />
            <LoginInput
                type="password"
                name="password"
                value={input?.password}
                onChange={onChange}
            />
            <LoginButton onClick={onLoginClick}>로그인{pending && '중...'}</LoginButton>
        </AuthLoginContainerView>
    );
}

const AuthLoginContainerView = styled.div`
    padding-top: 5rem;
`;

const LoginInput = styled.input``;

const LoginButton = styled.button``;
