import React from 'react';
import * as styled from './styled';

export default function TagDetailHeader({ tag = null }) {
    if (!tag) return null;

    return (
        <styled.TagDetailHeader>
            <styled.TagName>{tag.tag}</styled.TagName>
            {
                tag?.description && (
                    <styled.TagDescription>
                        {tag.description}
                    </styled.TagDescription>
                )
            }
        </styled.TagDetailHeader>
    );
}