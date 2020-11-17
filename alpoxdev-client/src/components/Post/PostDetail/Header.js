import React from 'react';
import styled from 'styled-components';
import { Header, Text } from 'lib/styles';

export default function PostDetailHeader({ post, user }) {
    const postUser = post?.user;

    return (
        <PostDetailHeaderView>
            <HeaderTopView>
                <HeaderTitle>{post?.title || ''}</HeaderTitle>
            </HeaderTopView>

            <HeaderBottomView>
                {postUser?.profile && <UserProfile src={postUser?.profile} />}
                <Username isProfile={!!postUser?.profile}>{postUser?.nickname}</Username>
                <PostCreatedAt>{post.createdAt}</PostCreatedAt>
            </HeaderBottomView>
        </PostDetailHeaderView>
    );
}

const PostDetailHeaderView = styled.div`
    padding-top: 100px;
`;

const HeaderTopView = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const HeaderBottomView = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 1.2rem;
`;

const HeaderTitle = styled(Header)`
    font-size: 2rem;
`;

const UserProfile = styled.img`
    width: 35px;
    height: 35px;
    border-radius: 50%;
`;

const Username = styled(Text)`
    margin-left: ${(props) => (props.isProfile === 'true' ? '10px' : '0')};
    font-size: 1.2rem;
`;

const PostCreatedAt = styled(Text)`
    margin-top: 3px;
    margin-left: 10px;
    font-size: 1rem;
    color: #999;
`;
