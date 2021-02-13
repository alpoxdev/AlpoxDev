import { Provider } from 'mobx-react';
import { ThemeProvider } from '@emotion/react';
import { useStore } from 'stores';
import { theme, ITheme } from 'common/theme';
import { Layout, DefaultHelmet, MouseCursor } from 'components';
import { useMouseCursor, MouseSelectorType } from 'hooks';

export default function App({ Component, pageProps }: any): JSX.Element {
  //   console.log('initialState', pageProps.initialState);

  useMouseCursor(MouseSelectorType.class, '_cursor');
  const store = useStore(pageProps.initialState);

  return (
    <>
      <DefaultHelmet />
      <MouseCursor />
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
