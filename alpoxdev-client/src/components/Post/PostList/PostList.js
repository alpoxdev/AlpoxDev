import React from 'react';
import Link from 'next/link';
import * as styled from './styled';

import PostLoading from './PostLoading';
import { markdownRemoval, parseTimestamp } from 'lib/utils';
import { useScrollBottom } from 'lib/hooks';

export default function PostList({ pending = false, posts = [], getPosts }) {
    const postLength = posts?.length;
    const postList = posts.map((post, index) => {
        return (
            <PostItem
                key={index}
                post={post}
                useScrollBottom={
                    postLength === index + 4
                        ? () => useScrollBottom(getPosts)
                        : null
                }
            />
        );
    });


    return (
        <>
            <styled.PostList>{postList}</styled.PostList>
            <PostLoading pending={pending} getPosts={getPosts}/>
        </>
    );
}

function PostItem({ post = null}) {

    return (
        <Link href="/posts/[id]" as={`/posts/${post.id}`}>
            <styled.PostItem>
                {post.thumbnail ? <styled.Thumbnail alt={post.title} src={post.thumbnail} /> : <styled.TempThumbnail />}

                <styled.PostContent isThumbnail={post.thumbnail ? 'true' : ''}>
                    {post.title && <styled.Title>{post.title}</styled.Title>}
                    {post.content && <styled.Content>{markdownRemoval(post.content.slice(0, 100))}</styled.Content>}
                </styled.PostContent>

                <styled.PostFooter>
                    {post.user && post.user.profile && (
                        <styled.UserProfile alt={post.user.username} src={post.user.profile} />
                    )}
                    {post.user && post.user.nickname && <styled.Username>{post.user.nickname}</styled.Username>}
                    {post.createdAt && <styled.PostCreatedAt>{parseTimestamp(post.createdAt)}</styled.PostCreatedAt>}
                </styled.PostFooter>
            </styled.PostItem>
        </Link>
    );
}
