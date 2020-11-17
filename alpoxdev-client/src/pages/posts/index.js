import React from 'react';

// redux
import { wrapper } from 'stores';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postActions from 'stores/post';

// components
import { DefaultHelmet } from 'components';

// container
import PostListContainer from 'container/post/posts';

export default function PostListPage({ post }) {
    const dispatch = useDispatch();
    const { setPostState } = bindActionCreators(postActions, dispatch);

    React.useEffect(() => {
        setPostState(post);
    }, [post]);

    return (
        <>
            <DefaultHelmet />
            <PostListContainer />
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(
    async ({ store, req, res, ...etc }) => {
        // console.log(`getServerSideProps`, store.getState());
        const { dispatch, getState } = store;
        await dispatch(postActions.onGetPosts());

        const post = getState()?.post.toJS();

        return {
            props: { post },
        };
    },
);
