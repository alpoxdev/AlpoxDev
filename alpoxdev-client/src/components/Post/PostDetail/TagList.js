import React from 'react';
import * as styled from './styled';

export default function PostDetailTagList({ tags = [] }){
    const tagList = tags.map((tag) => {
        return <PostDetailTagItem key={tag.id} tag={tag}/>;
    });

    return(
        <styled.PostDetailTagList>
            {tagList}
        </styled.PostDetailTagList>
    )
}

export function PostDetailTagItem({ tag = null }){
    return(
        <styled.PostDetailTagItem>
            {tag.tag}
        </styled.PostDetailTagItem>
    )
}