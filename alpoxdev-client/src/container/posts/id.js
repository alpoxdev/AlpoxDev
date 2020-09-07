import React from 'react';

// redux
import { connect } from 'react-redux';

// components
import {
    PostDetailHeader,
    PostDetailContent,
    Disqus
} from 'components';

function PostDetailContainer({ postState, userState }){
    const post = postState?.post?.post || null;
    const user = userState?.user || null;

    return(
        <>
            <PostDetailHeader post={post} user={user}/>
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
    null
)(PostDetailContainer);

