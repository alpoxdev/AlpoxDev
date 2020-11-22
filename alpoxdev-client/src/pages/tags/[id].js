import React from 'react';
import { useRouter } from 'next/router';

// redux
import { wrapper } from 'stores';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tagActions from 'stores/tag';

// components
import { Helmet } from 'components';
import { tagDetailHelmet as helmet } from 'config';

// container
import PostDetailContainer from 'container/tag/detail';

export default function TagDetailPage({ tag }) {
    const router = useRouter();

    const dispatch = useDispatch();
    const { setTagState } = bindActionCreators(tagActions, dispatch);

    const data = tag?.tag?.data;
    const posts = data?.posts;
    const firstPost = posts?.length > 0 ? posts[0] : null;
    const firstPostThumbnail = firstPost?.thumbnail;

    React.useEffect(() => {
        setTagState(tag);
    }, [tag]);

    return (
        <>
            <Helmet helmet={helmet(`${data?.tag} 태그`, firstPostThumbnail)} />
            <PostDetailContainer />
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(
    async ({ store, req, res, params, ...etc }) => {
        const id = params?.id;
        // console.log(`getServerSideProps`, store.getState());
        const { dispatch, getState } = store;
        await dispatch(tagActions.onGetTag({ id }));

        const tag = getState()?.tag.toJS();

        return {
            props: { tag },
        };
    },
);
