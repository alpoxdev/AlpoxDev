import React from 'react';
import Link from 'next/link';
import * as styled from './styled';

export default function RegisterFooter(){
    return(
        <styled.RegisterFooter>
            <Link href="/auth">
                <styled.LoginButton>
                    로그인하기
                </styled.LoginButton>
            </Link>
        </styled.RegisterFooter>
    )
}