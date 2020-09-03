import React from 'react';
import * as styled from './styled';

export default function AuthForm({ children, onSubmit }){
    return(
        <styled.AuthForm onSubmit={(e)=>{
            e.preventDefault();
            onSubmit();
        }}>
            {children}
        </styled.AuthForm>
    )
}