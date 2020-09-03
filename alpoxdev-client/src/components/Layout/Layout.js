import React from 'react';
import Head from 'next/head';
import * as styled from './styled';

function Layout({ children }) {
    return (
        <>
            <Head>
                <meta
                    id="viewport"
                    name="viewport"
                    content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover"
                />
            </Head>

            <styled.LayoutWrapper>
                <styled.Layout>{children}</styled.Layout>
            </styled.LayoutWrapper>
        </>
    );
}

export default Layout;
