import React from 'react';
import { useRouter } from 'next/router';

// redux
import { wrapper } from 'stores';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postActions from 'stores/post';

// container
import PostDetailContainer from 'container/post/detail';

// component
import { Helmet } from 'components';
import { postDetailHelmet as helmet } from 'config';

export default function PostDetailPage({ post }) {
    const router = useRouter();
    const { id } = router.query;

    const dispatch = useDispatch();
    const { setPostState } = bindActionCreators(postActions, dispatch);

    const data = post.post?.data;

    React.useEffect(() => {
        setPostState(post);
    }, [post]);

    return (
        <>
            <Helmet
                helmet={helmet(data?.title, `https://alpox.kr/posts/${data?.id}`, data?.thumbnail)}
            />
            <PostDetailContainer />
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(
    async ({ store, req, res, params, ...etc }) => {
        const id = params?.id;
        // console.log(`getServerSideProps`, store.getState());
        const { dispatch, getState } = store;
        await dispatch(postActions.onGetPost({ id }));

        const post = getState()?.post.toJS();

        return {
            props: { post },
        };
    },
);
