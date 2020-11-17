import React from 'react';
import styled from 'styled-components';
import { Text } from 'lib/styles';

export default function PostDetailTagList({ tags = [] }) {
    if (!Array.isArray(tags)) return null;
    if (tags?.length === 0) return null;

    const tagList = tags.map((tag) => <PostDetailTagItem key={tag?.id} tag={tag} />);

    return <PostDetailTagListView>{tagList}</PostDetailTagListView>;
}

function PostDetailTagItem({ tag }) {
    return <PostDetailTagItemView>{tag?.tag}</PostDetailTagItemView>;
}

const PostDetailTagListView = styled.div`
    margin-top: 0.4rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`;

export const PostDetailTagItemView = styled(Text)`
    margin-top: 0.65rem;
    margin-right: 0.8rem;
    padding: 0.4rem 0.8rem;
    color: ${(props) => props.theme.primaryColor};
    background-color: ${(props) => props.theme.subPrimaryColor};
    font-size: 0.8rem;
    font-weight: bold;
    border-radius: 14px;
    cursor: pointer;
    &:last-child {
        margin-right: 0;
    }
`;
