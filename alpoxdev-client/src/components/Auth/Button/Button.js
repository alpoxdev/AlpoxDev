import React from 'react';
import * as styled from './styled';

export default function AuthButton({ onClick, type = 'login', action }){
    return(
        <styled.AuthButton onClick={onClick} action={action ? 'true' : 'false'}>
            {type === 'login' ? "로그인" : "회원가입"}
            {action ? ' 중...' : ''}
        </styled.AuthButton>
    )
}