import React from 'react';

// redux
import { wrapper } from 'stores';
import { useStore } from 'react-redux';
import { serializeStates, deserializeState } from 'lib/utils';
import * as postActions from 'stores/post';
import * as tagActions from 'stores/tag';
import * as uiActions from 'stores/ui';

// helmet
import { ReactHelmet } from 'components';
import { postUpdateHelmet as helmet} from 'config';

// container
import PostUpdateContainer from 'container/posts/update';

export default function PostUpdatePage(props){
    const { post, tag, ui } = props;

    const store = useStore();
    React.useMemo(()=>{
        store.dispatch(postActions.setPostState(deserializeState(post)));
        store.dispatch(tagActions.setTagState(deserializeState(tag)));
        store.dispatch(uiActions.setUIState(deserializeState(ui)));
    }, []);

    const { title } = post?.post?.post;

    return(
        <>
            <ReactHelmet helmet={helmet(title)}/>
            <PostUpdateContainer isUpdate={true}/>
        </> 
    )
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
