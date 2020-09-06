import Head from 'next/head';
import { Helmet } from 'react-helmet';
import { defaultHelmet } from 'config';

export default function ReactHelmet({ helmet = defaultHelmet }) {
    for(const [key, value] of Object.entries(helmet)){
        if(!value) delete helmet[key];
    }

    helmet = Object.assign(defaultHelmet, helmet);
    const { title, description, image, keywords, url } = helmet;
    // console.log(title, description, image, keywords, url);

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
