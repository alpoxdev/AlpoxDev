import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

// redux
import { useStore } from 'react-redux';
import { wrapper } from 'stores';
import { PersistGate } from 'redux-persist/integration/react';

// components
import { Layout, DefaultHelmet } from 'components';
import { theme } from 'config';

const isBrowser = () => typeof window !== 'undefined';

export const GlobalStyle = createGlobalStyle`
    html,
    body {
        margin: 0;
    }

    * {
        box-sizing: border-box;
    }
`;

function MyApp({ Component, pageProps }) {
    const store = useStore((state) => state);

    return isBrowser() ? (
        <PersistGate persistor={store.__persistor} loading={null}>
            <GlobalStyle />
            <DefaultHelmet />
            <ThemeProvider theme={theme}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </PersistGate>
    ) : (
        <>
            <GlobalStyle />
            <DefaultHelmet />
            <ThemeProvider theme={theme}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </>
    );
}

export default wrapper.withRedux(MyApp);
