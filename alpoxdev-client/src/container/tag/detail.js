import React from 'react';

// redux
import { useSelector } from 'react-redux';

// components
import { TagDetailHeader, PostList } from 'components';

export default function TagDetailContainer() {
    const { tag } = useSelector((state) => ({
        tag: state.tag.toJS().tag,
    }));
    const { data } = tag;
    const posts = data?.posts || [];

    return (
        <>
            <TagDetailHeader tag={data} />
            <PostList posts={posts} postCount={posts?.length} />
        </>
    );
}
