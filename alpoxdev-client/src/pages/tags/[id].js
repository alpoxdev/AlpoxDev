import React from 'react';

// redux
import { wrapper } from 'stores';
import { useStore } from 'react-redux';
import { serializeStates, deserializeState } from 'lib/utils';
import * as tagActions from 'stores/tag';
import * as uiActions from 'stores/ui';

// container
import TagDetailContainer from 'container/tags/id';

// components
import { ReactHelmet } from 'components';
import { tagDetailHelmet as helmet} from 'config';

export default function PostDetailPage(props){
    const { tag, ui } = props;

    const store = useStore();
    React.useMemo(()=>{
        store.dispatch(tagActions.setTagState(deserializeState(tag)));
        store.dispatch(uiActions.setUIState(deserializeState(ui)));
    }, []);

    return(
        <>
            <ReactHelmet helmet={helmet(null || 'Not Found', `https://alpox.kr/tags/${1}`)}/>
            <TagDetailContainer/>
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res, params }) => {
    const id = params.id;

    await Promise.all([
        store.dispatch(tagActions.onGetTag(id)),
        store.dispatch(uiActions.setDrawerActive('Tags'))
    ]);

    const { tag, ui } = store.getState();

    return {
        props: {
            ...serializeStates({ tag, ui }),
        },
    };
});
