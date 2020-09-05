import { HYDRATE } from 'next-redux-wrapper';
import { createAction, handleActions } from 'redux-actions';
import { List, Map } from 'immutable';
import { Request } from 'lib/api';

const initialState = Map({
    posts: Map({
        pending: false,
        error: null,
        posts: List([]),
    }),
    post: Map({
        pending: false,
        error: null,
        post: null,
    }),
});

const SET_POST_STATE = 'post/SET_POST_STATE';
const POSTS_PENDING = 'post/POSTS_PENDING';
const POSTS_SUCCESS = 'post/POSTS_SUCCESS';
const POSTS_FAILURE = 'post/POSTS_FAILURE';
const POST_PENDING = 'post/POST_PENDING';
const POST_SUCCESS = 'post/POST_SUCCESS';
const POST_FAILURE = 'post/POST_FAILURE';

export const setPostState = createAction(SET_POST_STATE);

export const onGetPosts = (page = 0, offset = 20) => {
    return async (dispatch, getState) => {
        console.log(`글 목록을 불러오는중...`);

        dispatch({ type: POSTS_PENDING });

        const url = 'https://api.alpox.kr/posts';
        const query = { page, offset };

        const { status, data } = await Request.onRequestGet({ url, query });
        if (status === 200) {
            dispatch({ type: POSTS_SUCCESS, payload: data.posts });
        } else {
            dispatch({ type: POSTS_FAILURE, payload: { status, data } });
        }
    };
};

export const onGetPost = (id) => {
    return async (dispatch, getState) => {
        console.log(`글 자세히 불러오는중... | ${id}`);

        dispatch({ type: POST_PENDING });

        const url = `https://api.alpox.kr/posts/${id}`;

        const { status, data } = await Request.onRequestGet({ url });
        if (status === 200) {
            dispatch({ type: POST_SUCCESS, payload: data.post });
        } else {
            dispatch({ type: POST_FAILURE, page: data.post });
        }
    };
};

export default handleActions(
    {
        [POSTS_PENDING]: (state, _) => {
            return state.setIn(['posts', 'pending'], true).setIn(['posts', 'error'], null);
        },
        [POSTS_SUCCESS]: (state, action) => {
            const posts = action.payload;
            return state
                .setIn(['posts', 'posts'], state.getIn(['posts', 'posts']).push(...posts))
                .setIn(['posts', 'pending'], false)
                .setIn(['posts', 'error'], null);
        },
        [POSTS_FAILURE]: (state, action) => {
            const error = action?.payload;
            return state.setIn(['posts', 'pending'], false).setIn(['posts', 'error'], error);
        },
        [POST_PENDING]: (state, _) => {
            return state.setIn(['post', 'pending'], true).setIn(['posts', 'error'], false);
        },
        [POST_SUCCESS]: (state, action) => {
            const post = action?.payload;
            return state.setIn(['post', 'post'], post).setIn(['post', 'pending'], false).error(['post', 'error'], null);
        },
        [POST_FAILURE]: (state, action) => {
            const error = action?.payload;
            return state.setIn(['post', 'pending'], false).setIn(['post', 'error'], null);
        },
        [SET_POST_STATE]: (_, action) => {
            const state = action?.payload;
            return state;
        },
    },
    initialState,
);
