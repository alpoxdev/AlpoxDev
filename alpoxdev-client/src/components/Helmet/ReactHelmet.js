import React from 'react';
import { Helmet } from 'react-helmet';
import { defaultHelmet } from 'config';

const getHelmet = (helmet) => ({
    title : (helmet.title? helmet.title : defaultHelmet.title),
    description : (helmet.description? helmet.description : defaultHelmet.description),
    image : (helmet.image? helmet.image : defaultHelmet.image),
    keywords : (helmet.keywords? helmet.keywords : defaultHelmet.keywords),
    url : (helmet.url? helmet.url : defaultHelmet.url)
});

export default function ReactHelmet({ helmet = defaultHelmet }) {
    const [ newHelmet, setNewHelmet ] = React.useState(getHelmet(helmet));

    React.useMemo(()=>{
        setNewHelmet(getHelmet(helmet));
    }, [helmet.title, helmet.description, helmet.image, helmet.keywords, helmet.url]);
    
    const { title, description, image, keywords, url } = newHelmet;
    // console.log(newHelmet);

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
