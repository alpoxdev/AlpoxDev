import React, { useState, useCallback } from 'react';
import * as styled from './styled';
import Dropzone from './Dropzone';

export default function UserDefault({
    user = null,
    input,
    setInput,
    onUpdateUser,
    onImageUpload,
}) {
    if (!user) return null;

    React.useMemo(() => {
        setInput({ name: 'email', value: user.email });
        setInput({ name: 'nickname', value: user.nickname });
        setInput({ name: 'profile', value: user.profile });
    }, []);

    const setProfile = () => {
        // onImageUpload & change Input
    };

    return (
        <styled.UserDefault>
            <styled.TopWrapper>
                <styled.Title>개인정보 수정</styled.Title>
                <styled.ChangeButton
                    onClick={onUpdateUser}
                    isChange={user.nickname !== input.nickname}
                    disabled={user.nickname === input.nickname}
                >
                    변경사항 저장
                </styled.ChangeButton>
            </styled.TopWrapper>

            <styled.InfoWrapper>
                <styled.Label>프로필</styled.Label>

                <styled.ProfileWrapper>
                    <Dropzone profile={input.profile} setProfile={setProfile} />
                </styled.ProfileWrapper>
            </styled.InfoWrapper>

            <styled.InfoWrapper>
                <styled.Label>닉네임</styled.Label>
                <styled.Nickname
                    name="nickname"
                    value={input.nickname}
                    onChange={(e) => setInput(e.target)}
                />
            </styled.InfoWrapper>

            <styled.InfoWrapper>
                <styled.Label>이메일</styled.Label>
                <styled.Email name="email" value={input.email} disabled />
            </styled.InfoWrapper>
        </styled.UserDefault>
    );
}
