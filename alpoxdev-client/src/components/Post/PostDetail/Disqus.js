import React from 'react';
import { DiscussionEmbed } from 'disqus-react';
import styled from 'styled-components';

export default function PostDetailDisqus({ id, title }) {
    if (!id || !title) return null;

    const url = `https://alpox.kr/posts/${id}`;

    return (
        <DisqusView>
            <DiscussionEmbed
                shortname="https-alpox-kr"
                config={{
                    url,
                    identifier: `${id}`,
                    title,
                    language: 'ko', // e.g. for Traditional Chinese (Taiwan)
                }}
            />
        </DisqusView>
    );
}

const DisqusView = styled.div`
    margin-top: 5rem;
`;
