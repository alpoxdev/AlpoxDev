import React from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postActions from 'stores/post';

// components
import {
    PostDetailHeader,
    PostDetailContent,
    Disqus
} from 'components';

function PostDetailContainer({ postState, userState, postActions }){
    const post = postState?.post?.post || null;
    const user = userState?.user || null;

    return(
        <>
            <PostDetailHeader post={post} user={user} onRemovePost={postActions.onRemovePost}/>
            <PostDetailContent post={post}/>
            <Disqus id={post?.id} title={post?.title}/>
        </>
    );
}

export default connect(
    (state) => ({
        postState: state.post?.toJS(),
        userState: state.user?.toJS()
    }),
    (dispatch) => ({
        postActions: bindActionCreators(postActions, dispatch)
    })
)(PostDetailContainer);

