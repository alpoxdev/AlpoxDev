import React from 'react';
import { useRouter } from 'next/router';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postActions from 'stores/post';

// container
import PostDetailContainer from 'container/post/detail';

// component
import { Helmet } from 'components';

export default function PostDetailPage() {
    const router = useRouter();
    const { id } = router.query;

    const dispatch = useDispatch();
    const { onGetPost } = bindActionCreators(postActions, dispatch);

    const { post } = useSelector((state) => ({
        post: state.post.toJS().post,
    }));
    const { data, pending } = post;

    React.useEffect(() => {
        if (id && `${data?.id}` !== id && !pending) {
            onGetPost({ id });
        }
    }, [id]);

    return (
        <>
            <Helmet />
            <PostDetailContainer />
        </>
    );
}
