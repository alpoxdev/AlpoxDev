import { Provider } from 'mobx-react';
import { ThemeProvider, Global, css } from '@emotion/react';
import { useStore } from 'stores';
import { theme, ITheme } from 'common/theme';
import { Layout, DefaultHelmet } from 'components';

export default function App({ Component, pageProps }: any): JSX.Element {
  console.log('initialState', pageProps.initialState);

  const store = useStore(pageProps.initialState);

  return (
    <>
      <DefaultHelmet />
      <ThemeProvider theme={theme as ITheme}>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </ThemeProvider>
    </>
  );
}
