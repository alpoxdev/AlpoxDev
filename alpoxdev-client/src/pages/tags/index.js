import React from 'react';

// redux
import { wrapper } from 'stores';
import { useStore } from 'react-redux';
import { serializeStates, deserializeState } from 'lib/utils';
import * as postActions from 'stores/post';
import * as tagActions from 'stores/tag';
import * as uiActions from 'stores/ui';

// container
import TagListContainer from 'container/tags/index';

// components
import { ReactHelmet } from 'components';
import { tagListHelmet as helmet } from 'config';

export default function TagListPage(props){
    const { tag, ui } = props;

    const store = useStore();
    React.useMemo(() => {
        store.dispatch(tagActions.setTagState(deserializeState(tag)));
        store.dispatch(uiActions.setUIState(deserializeState(ui)));
    }, []);

    return(
        <>
            <ReactHelmet helmet={helmet}/>
            <TagListContainer/>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res }) => {
    await Promise.all([
        store.dispatch(tagActions.onGetTags()), 
        store.dispatch(uiActions.setDrawerActive('Posts'))
    ]);

    const { tag, ui } = store.getState();
    return {
        props: {
            ...serializeStates({ tag, ui }),
        },
    };
});
