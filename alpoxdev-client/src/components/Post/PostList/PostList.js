import React from 'react';
import Link from 'next/link';
import { markdownRemoval, parseTimestamp } from 'lib/utils';
import * as styled from './styled';

export default function PostList({ posts = [] }) {
    const postList = posts.map((post) => {
        return <PostItem key={post.id} post={post} />;
    });
    return <styled.PostList>{postList}</styled.PostList>;
}

function PostItem({ post = null }) {
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
