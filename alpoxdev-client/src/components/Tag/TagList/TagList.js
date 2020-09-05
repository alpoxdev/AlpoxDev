import React from 'react';
import Link from 'next/link';
import * as styled from './styled';

export default function TagList({ tags = [] }){
    const tagList = tags.map((tag) => {
        return <TagItem key={tag.id} tag={tag}/>;
    });

    return(
        <styled.TagList>
            {tagList}
        </styled.TagList>
    );
}

export function TagItem({ tag = null }){
    return(
        <Link href={`/tags/${tag.id}`}>
            <styled.TagItem>
                <styled.TopWrapper>
                    <styled.TagName>{tag.tag}</styled.TagName>
                </styled.TopWrapper>
                <styled.BottomWrapper>
                    <styled.Description>{tag.description}</styled.Description>
                    <styled.PostCount>{tag.postCount}개의 포스팅</styled.PostCount>
                </styled.BottomWrapper>
            </styled.TagItem>
        </Link>
    )
}