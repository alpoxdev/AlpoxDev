import Head from 'next/head';
import { defaultHelmet } from 'config';

export default function Helmet({ helmet = defaultHelmet }) {
    console.log(helmet);
    const {
        title = helmet.title || defaultHelmet.title,
        description = helmet.description || defaultHelmet.description,
        image = helmet.image || defaultHelmet.image,
        keywords = helmet.keywords || defaultHelmet.keywords,
        url = helmet.url || defaultHelmet.url,
    } = helmet;

    return (
        <Head>
            <title>{title}</title>

            {/* 검색엔진 Default */}
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Facebook : OpenGraph */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />

            {/* Twitter */}
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Head>
    );
}
