import React from 'react';
import Link from 'next/link';
import * as styled from './styled';

export default function LoginFooter(){
    return(
        <styled.LoginFooter>
            <Link href="/auth/register">
                <styled.RegisterButton>회원가입하기</styled.RegisterButton>
            </Link>
        </styled.LoginFooter>
    )
}