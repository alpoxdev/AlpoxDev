import React from 'react';
import * as styled from './styled';

export default function Profile({ user = null, onClick }) {
    if (!user) return null;

    return (
        <styled.Profile onClick={onClick}>
            <styled.ProfileImage alt={user.nickname} src={user.profile} />
        </styled.Profile>
    );
}
