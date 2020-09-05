import React from 'react';

// redux
import { wrapper } from 'stores';
import { useStore } from 'react-redux';
import { serializeStates, deserializeState } from 'lib/utils';
import * as postActions from 'stores/post';
import * as tagActions from 'stores/tag';
import * as uiActions from 'stores/ui';

// container
import PostDetailContainer from 'container/posts/id';

// components
import { Helmet, ReactHelmet } from 'components';
import { postDetailHelmet as helmet} from 'config';

export default function PostDetailPage(props){
    const { post, tag, ui } = props;

    const store = useStore();
    React.useMemo(()=>{
        store.dispatch(postActions.setPostState(deserializeState(post)));
        store.dispatch(tagActions.setTagState(deserializeState(tag)));
        store.dispatch(uiActions.setUIState(deserializeState(ui)));
    }, []);

    return(
        <>
            <ReactHelmet helmet={helmet(post?.post?.post?.title || 'Not Found', `https://alpox.kr/posts/${post?.post?.post?.id}`)}/>
            <PostDetailContainer/>
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res, params }) => {
    const id = params.id;

    await Promise.all([
        store.dispatch(postActions.onGetPost(id)),
        store.dispatch(tagActions.onGetTags()),
        store.dispatch(uiActions.setDrawerActive('Posts'))
    ]);

    const { post, tag, ui } = store.getState();

    return {
        props: {
            ...serializeStates({ post, tag, ui }),
        },
    };
});
