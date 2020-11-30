import React from 'react';

// redux
import { useSelector } from 'react-redux';

// components
import {
    PostDetailHeader,
    PostDetailTagList,
    PostDetailContent,
    PostDetailDisqus,
} from 'components';

export default function PostDetailContainer() {
    const { post, logined } = useSelector((state) => ({
        post: state.post.toJS().post,
        logined: state.user.toJS().logined,
    }));
    const { data, pending } = post;

    return (
        <>
            <PostDetailHeader post={data} user={logined?.user} />
            <PostDetailTagList tags={data?.tags} />
            <PostDetailContent post={data} />
            <PostDetailDisqus id={data?.id} title={data?.title} />
        </>
    );
}
