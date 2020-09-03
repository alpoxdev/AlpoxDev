import React from 'react';
import * as styled from './styled';

const clientId = "82029157752-5vkt5g636jb8klb60qthf1i35730alah.apps.googleusercontent.com";

export default function GoogleLogin({ type = 'login', onSocial }){
    const onSuccess = async(response) => {
        const { 
            googleId,
            profileObj
        } = response;
        const { email, name, imageUrl } = profileObj;

        await onSocial({
            socialId : googleId,
            socialType : 'google',
            email,
            nickname : name,
            profile : imageUrl
        });
    }
    const onFailure = (error) => {
        console.log(error);
    }

    return(
        <>
            <styled.GoogleButtonWrapper>
                <styled.GoogleLogin
                    clientId={clientId}
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    render={renderProps => (
                        <GoogleButton 
                            onClick={renderProps.onClick} 
                            disabled={renderProps.disabled}
                            text={type==='login' ? '구글로 로그인하기' : '구글로 회원가입하기'}/>
                    )}
                    cookiePolicy={'single_host_origin'}/>
            </styled.GoogleButtonWrapper>

            <styled.Divider>
                <styled.DividerText>or</styled.DividerText>
            </styled.Divider>
        </>
    )
}

function GoogleButton({ onClick, disabled, text }){
    return(
        <styled.GoogleButton 
            onClick={onClick}
            disabled={disabled}>
            {text}
        </styled.GoogleButton>
    )
}