import React, { useCallback } from 'react';
import Router from 'next/router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from 'stores/user';
import * as loginActions from 'stores/login';
import * as socialActions from 'stores/social';

import { Modal, AuthSection, AuthForm, AuthInput, AuthButton, AuthLoginFooter, GoogleButton } from 'components';

function LoginContainer(props) {
    const { userState, loginState, socialState, loginActions, socialActions } = props;
    const { user } = userState;
    const { setInput, onLogin } = loginActions;
    const { onSocial } = socialActions;

    React.useEffect(() => {
        if (user) Router.push('/');
    }, [user]);

    return (
        <>
            <AuthSection>
                <GoogleButton onSocial={onSocial} />

                <AuthForm onSubmit={onLogin}>
                    <AuthInput
                        value={loginState?.input.email}
                        setValue={(e) => setInput({ name: 'id', value: e.target.value })}
                        type="id"
                        name="id"
                        placeholder="이메일을 입력해주세요"
                    />
                    <AuthInput
                        value={loginState?.input.password}
                        setValue={(e) =>
                            setInput({
                                name: 'password',
                                value: e.target.value,
                            })
                        }
                        type="password"
                        name="password"
                        placeholder="패스워드를 입력해주세요"
                    />
                    <AuthButton onClick={onLogin} type="login" action={loginState.pending} />

                    <AuthLoginFooter />
                </AuthForm>
            </AuthSection>
        </>
    );
}

export default connect(
    (state) => ({
        userState: state.user.toJS(),
        loginState: state.login.toJS(),
        socialState: state.social.toJS(),
    }),
    (dispatch) => ({
        loginActions: bindActionCreators(loginActions, dispatch),
        socialActions: bindActionCreators(socialActions, dispatch),
    }),
)(LoginContainer);
