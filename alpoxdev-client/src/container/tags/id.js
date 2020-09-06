import React from 'react';

// redux
import { connect } from 'react-redux';

// components
import {
    TagDetailHeader,
    PostList
} from 'components';

function TagDetailContainer({ tagState }){
    const { tag : { tag } } = tagState;

    return(
        <>
            <TagDetailHeader tag={tag}/>
            <PostList posts={tag.posts || []}/>
        </>
    );
}

export default connect(
    (state) => ({
        tagState : state?.tag.toJS()
    }),
    null
)(TagDetailContainer);