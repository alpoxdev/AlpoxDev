import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { Helmet } from 'react-helmet';

const GA_TRACKING_ID = '';

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
                helmet: Helmet.renderStatic(),
            };
        } finally {
            sheet.seal();
        }
    }

    // should render on <html>
    get helmetHtmlAttrComponents() {
        return this.props.helmet.htmlAttributes.toComponent();
    }

    // should render on <body>
    get helmetBodyAttrComponents() {
        return this.props.helmet.bodyAttributes.toComponent();
    }

    // should render on <head>
    get helmetHeadComponents() {
        return Object.keys(this.props.helmet)
            .filter((el) => el !== 'htmlAttributes' && el !== 'bodyAttributes')
            .map((el) => this.props.helmet[el].toComponent());
    }

    render() {
        return (
            <Html {...this.helmetHtmlAttrComponents}>
                <Head>
                    {this.helmetHeadComponents}
                    {this.props.styles}
                    <link rel="icon" href="" type="image/x-icon" />
                    <link rel="apple-touch-icon" href="" />
                    <link rel="shortcut icon" href="" />
                    <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${GA_TRACKING_ID}', {
                                page_path: window.location.pathname,
                            });
                        `,
                        }}
                    />
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.css" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;1,700&family=Noto+Serif+KR:wght@700&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body {...this.helmetBodyAttrComponents}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
