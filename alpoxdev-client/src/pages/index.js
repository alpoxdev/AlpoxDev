import React from 'react';

// redux
import { wrapper } from 'stores';
import { useStore } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postActions from 'stores/post';
import * as tagActions from 'stores/tag';

// container
import IndexContainer from 'container/index';

// components
import { ReactHelmet } from 'components';
import { defaultHelmet as helmet } from 'config';

// dev
const dev = process.env.NODE_ENV === 'development';

export default function IndexPage() {
    const store = useStore();

    React.useMemo(() => {
        Promise.all([store.dispatch(postActions.onGetPosts()), store.dispatch(tagActions.onGetTags())]);
    }, []);

    return (
        <>
            <ReactHelmet helmet={helmet} />
            <IndexContainer />
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res }) => {
    await Promise.all([store.dispatch(postActions.onGetPosts()), store.dispatch(tagActions.onGetTags())]);
});
