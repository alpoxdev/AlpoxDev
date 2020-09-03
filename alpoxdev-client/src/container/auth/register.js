import React, { useCallback } from 'react';
import Router from 'next/router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as registerActions from 'stores/register';

import {
    Modal,
    AuthSection,
    AuthForm,
    AuthInput,
    AuthButton,
    AuthRegisterFooter,
    GoogleButton,
} from 'components';

function RegisterContainer(props) {
    const { 
        state,
        registerActions
    } = props;
    const {
        input,
        
        pending,
        done,
        error
    } = state;
    const { setInput, onRegister } = registerActions;

    const redirect = useCallback(() => {
        Router.push('/auth');
    });

    let onSocial = null;

    return (
        <>
            {
                /*
                    <Modal
                    title="회원가입"
                    content="성공!"
                    redirect={redirect}
                    modal={modal.onRegister}
                    setModal={(view)=>setModal('onRegister', view)}/>
                */
            }
            
            <AuthSection>
                <GoogleButton type={'register'} onSocial={onSocial} />

                <AuthForm onSubmit={onRegister}>
                    <AuthInput
                        value={input.email}
                        setValue={(e)=>setInput({ name : 'email', value : e.target.value })}
                        type="email"
                        name="email"
                        placeholder="이메일을 입력해주세요"
                    />
                    <AuthInput
                        value={input.nickname}
                        setValue={(e)=>setInput({ name : 'nickname', value : e.target.value })}
                        type="nickname"
                        name="nickname"
                        placeholder="닉네임을 입력해주세요"
                    />
                    <AuthInput
                        value={input.password}
                        setValue={(e)=>setInput({ name : 'password', value : e.target.value })}
                        type="password"
                        name="password"
                        placeholder="패스워드를 입력해주세요"
                    />
                    <AuthButton
                        onClick={onRegister}
                        type="register"
                        action={pending}
                    />

                    <AuthRegisterFooter />
                </AuthForm>
            </AuthSection>
        </>
    );
}

export default connect(
    (state) => ({
        state : state.register.toJS()
    }),
    (dispatch) => ({
        registerActions : bindActionCreators(registerActions, dispatch),
    })
)(RegisterContainer);

