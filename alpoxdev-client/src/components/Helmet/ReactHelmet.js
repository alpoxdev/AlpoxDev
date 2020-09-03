import Head from 'next/head';
import { Helmet } from 'react-helmet';
import { defaultHelmet } from 'config';

export default function ReactHelmet({ helmet = null }) {
    return (
        <Helmet
            htmlAttributes={{ lang: 'ko' }}
            title={helmet?.title ?? defaultHelmet.title}
            meta={[
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1',
                },
                {
                    name: 'keywords',
                    content: helmet?.keywords ?? defaultHelmet.keywords,
                },
                {
                    name: 'description',
                    content: helmet?.description ?? defaultHelmet.description,
                },
                { property: 'og:title', content: helmet?.title ?? defaultHelmet.title },
                { property: 'og:description', content: helmet?.description ?? defaultHelmet.description },
                { property: 'og:image', content: helmet?.image ?? defaultHelmet?.image },
                { property: 'og:url', content: helmet?.url ?? defaultHelmet?.url },

                { property: 'twitter:title', content: helmet?.title ?? defaultHelmet.title },
                { property: 'twitter:description', content: helmet?.description ?? defaultHelmet.description },
                { property: 'twitter:image', content: helmet?.image ?? defaultHelmet?.image },
            ]}
        />
    );
}
