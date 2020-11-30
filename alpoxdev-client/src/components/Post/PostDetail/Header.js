import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Header, Text } from 'lib/styles';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postActions from 'stores/post';

export default function PostDetailHeader({ post, user }) {
    const router = useRouter();

    const dispatch = useDispatch();
    const { onDeletePost } = bindActionCreators(postActions, dispatch);

    const { deletePost } = useSelector((state) => ({
        deletePost: state.post.toJS().delete,
    }));

    const onDeleteClick = useCallback(() => {
        onDeletePost({ id: post.id });
    });

    useEffect(() => {
        if (deletePost?.done) {
            router.back();
        }
    }, [deletePost?.done]);

    const postUser = post?.user;

    return (
        <PostDetailHeaderView>
            <HeaderTopView>
                <HeaderTitle>{post?.title || ''}</HeaderTitle>

                {(user?.role === 'admin' || user?.role === 'member') && (
                    <ButtonListView>
                        <DeleteButton onClick={onDeleteClick}>삭제</DeleteButton>
                    </ButtonListView>
                )}
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

const ButtonListView = styled.div`
    margin-left: auto;

    display: flex;
    align-items: center;
`;

const DeleteButton = styled.button`
    height: 32px;
    padding: 4px 15px;

    font-size: 14px;
    line-height: 1.5715;

    color: #ff4d4f;
    background: #fff;
    border-color: #ff4d4f;
    border-radius: 2px;
    border-width: 1px;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
    cursor: pointer;

    outline: none;
`;
