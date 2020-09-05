import Head from 'next/head';
import { Helmet } from 'react-helmet';
import { defaultHelmet } from 'config';

export default function ReactHelmet({ helmet = defaultHelmet }) {
    const {
        title = helmet?.title || defaultHelmet.title,
        description = helmet?.description || defaultHelmet.description,
        image = helmet?.image || defaultHelmet.image,
        keywords = helmet?.keywords || defaultHelmet.keywords,
        url = helmet?.url || defaultHelmet.url,
    } = helmet;

    return (
        <Helmet
            htmlAttributes={{ lang: 'ko' }}
            title={title}
            meta={[
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1',
                },
                {
                    name: 'keywords',
                    content: keywords
                },
                {
                    name: 'description',
                    content: description
                },
                { property: 'og:title', content: title },
                { property: 'og:description', content: description },
                { property: 'og:image', content: image },
                { property: 'og:url', content: url },

                { property: 'twitter:title', content: title },
                { property: 'twitter:description', content: description },
                { property: 'twitter:image', content: image },
            ]}
        />
    );
}
