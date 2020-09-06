import React from 'react';

// redux
import { connect } from 'react-redux';

// components
import {
    PostDetailHeader,
    PostDetailContent,
    Disqus
} from 'components';

function PostDetailContainer({ postState }){
    const { post: { post }} = postState;

    return(
        <>
            <PostDetailHeader post={post}/>
            <PostDetailContent post={post}/>
            <Disqus id={post?.id} title={post?.title}/>
        </>
    );
}

export default connect(
    (state) => ({
        postState: state.post?.toJS()
    }),
    null
)(PostDetailContainer);

