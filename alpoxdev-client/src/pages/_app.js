import React from 'react';
import App, { Container } from 'next/app';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

// redux
import { useStore } from 'react-redux';
import { wrapper } from 'stores';
import { PersistGate } from 'redux-persist/integration/react';

// components
import { Layout, ReactHelmet } from 'components';
import { theme, defaultHelmet as helmet } from 'config';

const isBrowser = () => typeof window !== 'undefined';

export const GlobalStyle = createGlobalStyle`
    html,
    body {
        margin: 0;
    }

    * {
        box-sizing: border-box;
    }

    @font-face {
        font-family: 'NanumSquareRound';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/NanumSquareRound.woff')
            format('woff');
        font-weight: normal;
        font-style: normal;
    }
`;

function MyApp({ Component, pageProps }) {
    const store = useStore((state) => state);

    return isBrowser() ? (
        <PersistGate persistor={store.__persistor} loading={null}>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </PersistGate>
    ) : (
        <>
            <GlobalStyle />
            <ReactHelmet helmet={helmet} />
            <ThemeProvider theme={theme}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </>
    );
}

export default wrapper.withRedux(MyApp);
