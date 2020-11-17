import React from 'react';

// redux
import { useSelector } from 'react-redux';

// components
import { PostList } from 'components';

export default function PostListContainer() {
    const { posts } = useSelector((state) => ({
        posts: state.post.toJS().posts,
    }));
    const { data, pending, error } = posts;

    return <PostList posts={data} postCount={data?.length} />;
}
