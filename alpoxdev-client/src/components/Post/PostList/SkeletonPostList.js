import React from 'react';
import * as styled from './styled';

export default function SkeletonPostList({ postLength = 18 }) {
    const skeletonPostList = [];
    for (let i = 0; i < postLength; i += 1) {
        skeletonPostList.push(<SkeletonPostItem />);
    }

    return <styled.PostList>{skeletonPostList}</styled.PostList>;
}

function SkeletonPostItem() {
    return <styled.PostItem />;
}
