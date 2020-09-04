import React from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as postActions from 'stores/post';

function IndexContainer({ postState, postActions }) {
    React.useMemo(() => {
        // postActions.onGetPosts();
    }, []);
    const { posts, post } = postState;
    // console.log(posts);

    return (
        <>
            <h1>Index</h1>
            {posts?.posts.length !== 0
                ? posts?.posts.map((post) => {
                      return <div>{post.title}</div>;
                  })
                : [1, 2, 3, 4].map((skeleton) => {
                      return <div>asdf</div>;
                  })}
        </>
    );
}

export default connect(
    (state) => ({
        postState: state.post.toJS(),
    }),
    (dispatch) => ({
        postActions: bindActionCreators(postActions, dispatch),
    }),
)(IndexContainer);
