import React from 'react';
import { wrapper } from 'stores';

// container
import RegisterContainer from 'container/auth/register';

// helmet
import { ReactHelmet } from 'components';
import { registerHelmet } from 'config';

export default function RegisterPage({ helmet }) {
    return (
        <>
            <ReactHelmet helmet={registerHelmet} />
            <RegisterContainer />
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(({ store, req, res, ...etc }) => {});
