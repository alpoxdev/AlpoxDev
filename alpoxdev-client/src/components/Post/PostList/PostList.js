import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Text } from 'lib/styles';
import { markdownRemoval, parseTimestamp } from 'lib/utils';

export default function PostList({ posts = [], postCount = 0 }) {
    const postList = posts.map((post) => <PostItem key={post.id} post={post} />);

    return <PostListView>{postList}</PostListView>;
}

function PostItem({ post }) {
    return (
        <Link href="/posts/:id" as={`/posts/${post.id}`}>
            <PostItemView>
                {post?.thumbnail && <Thumbnail src={post.thumbnail} />}

                <PostContent>
                    <Title>{post?.title}</Title>
                    <Content>{markdownRemoval(post?.content.slice(200))}</Content>
                </PostContent>

                <PostFooter>
                    {post?.user?.profile && (
                        <UserProfile alt={post?.user?.nickname} src={post?.user?.profile} />
                    )}
                    <Username>{post?.user?.nickname}</Username>
                    <PostCreatedAt>{parseTimestamp(post.createdAt)}</PostCreatedAt>
                </PostFooter>
            </PostItemView>
        </Link>
    );
}

const PostListView = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding-top: 65px;

    @media (min-width: 1520px) {
        padding-top: 100px;
    }
`;

const PostItemView = styled.div`
    width: calc(100% - 30px);
    min-height: 361.89px;
    margin: 15px;

    display: flex;
    flex-direction: column;

    position: relative;
    background-color: white;
    border-radius: 4px;

    cursor: pointer;
    -webkit-box-shadow: 0 10px 7.5px -6px #e6e6e6;
    -moz-box-shadow: 0 10px 7.5px -6px #e6e6e6;
    box-shadow: 0 10px 7.5px -6px #e6e6e6;

    @media (min-width: 768px) {
        width: calc(50% - 30px);
    }
    @media (min-width: 992px) {
        width: calc(50% - 30px);
    }
    @media (min-width: 1200px) {
        width: calc(33% - 30px);
    }
`;

const PostContent = styled.div`
    flex: auto;
    padding: 1.2rem;

    line-height: 1.35;
    border-top: 0.5px solid transparent;
    border-color: ${(props) => (props.isThumbnail ? '#e3e3e3' : 'transparent')};
`;

const Thumbnail = styled.img`
    width: 100%;
    height: auto;
    max-height: 175px;

    object-fit: cover;

    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
`;

const Title = styled(Text)`
    font-size: 1.3rem;
    font-weight: bold;
    color: ${(props) => props.theme.textBoldColor};

    -webkit-line-clamp: 1;
    word-wrap: break-word;
    word-break: break-all;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
`;

const Content = styled(Text)`
    width: 100%;
    margin-top: 0.8rem;
    font-size: 1rem;

    color: ${(props) => props.theme.textColor};
    overflow: hidden;
    text-overflow: ellipsis;

    display: -webkit-box;
    -webkit-line-clamp: 3; /* number of lines to show */
    -webkit-box-orient: vertical;
`;

const PostFooter = styled.div`
    width: 100%;
    height: 50px;
    padding-left: 1.2rem;
    padding-right: 1.2rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    position: absolute;
    left: 0;
    bottom: 0;
    border-top: 1px solid rgb(230, 230, 230);
`;

const UserProfile = styled.img`
    width: 27.5px;
    height: 27.5px;
    border-radius: 50%;
`;

const Username = styled(Text)`
    margin-top: 2.5px;
    margin-left: 6.7px;
    font-size: 1rem;
`;

const PostCreatedAt = styled(Text)`
    margin-left: auto;
    margin-top: 1.5px;
    font-size: 0.85rem;
    color: ${(props) => props.theme.textInfoColor};
`;
