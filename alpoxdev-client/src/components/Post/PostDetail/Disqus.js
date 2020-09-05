import React from 'react';
import { DiscussionEmbed } from 'disqus-react';
import * as styled from './styled';

export default function Disqus({ id, title }) {
    const url = `https://alpox.kr/posts/${id}`;

    return (
        <styled.DisqusWrapper>
            <DiscussionEmbed
                shortname="https-alpox-kr"
                config={{
                    url,
                    identifier: `${id}`,
                    title,
                    language: 'ko' //e.g. for Traditional Chinese (Taiwan)
                }}
            />
        </styled.DisqusWrapper>
    );
}