import React from 'react';

// redux
import { wrapper } from 'stores';
import { useStore } from 'react-redux';
import { serializeStates, deserializeState } from 'lib/utils';
import * as postActions from 'stores/post';
import * as tagActions from 'stores/tag';
import * as uiActions from 'stores/ui';

// container
import IndexContainer from 'container/index';

// components
import { ReactHelmet } from 'components';
import { defaultHelmet as helmet } from 'config';

// dev
const dev = process.env.NODE_ENV === 'development';

export default function IndexPage(props) {
    const { post, tag, ui } = props;

    const store = useStore();
    React.useMemo(() => {
        store.dispatch(postActions.setPostState(deserializeState(post)));
        store.dispatch(tagActions.setTagState(deserializeState(tag)));
        store.dispatch(uiActions.setUIState(deserializeState(ui)));
    }, []);

    return (
        <>
            <ReactHelmet helmet={helmet} />
            <IndexContainer />
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res }) => {
    await Promise.all([
        store.dispatch(postActions.onGetPosts()), 
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
