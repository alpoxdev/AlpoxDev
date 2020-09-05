import React from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as postActions from 'stores/post';

// component
import { PostList, SkeletonPostList } from 'components';

function IndexContainer({ postState, postActions }) {
    const {
        posts: { posts, pending, error },
    } = postState;
    const { onGetPosts } = postActions;

    return <><PostList pending={pending} posts={posts} getPosts={onGetPosts}/></>;
}

export default connect(
    (state) => ({
        postState: state.post.toJS(),
    }),
    (dispatch) => ({
        postActions: bindActionCreators(postActions, dispatch),
    }),
)(IndexContainer);
