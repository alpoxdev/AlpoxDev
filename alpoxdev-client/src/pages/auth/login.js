import React from 'react';

// helmet
import { Helmet } from 'components';
import { loginHelmet as helmet } from 'config';

// container
import AuthLoginContainer from 'container/auth/login';

export default function AuthLoginPage() {
    return (
        <>
            <Helmet helmet={helmet} />
            <AuthLoginContainer />
        </>
    );
}
