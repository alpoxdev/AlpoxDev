import { createAction, handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

import { postState } from './state';
import { POST_TYPES } from './type';
import {
    createPromiseThunk,
    createPromiseState,
    setImmutableState,
    getDataPageAndOffset,
} from '../redux';
import * as postAPI from 'services/post';

export const setPostState = createAction(POST_TYPES.SET_POST_STATE);
export const onGetPosts = createPromiseThunk(POST_TYPES.GET_POSTS, postAPI.onGetPosts, (getState) =>
    getDataPageAndOffset(getState, 'post', 'posts'),
);

export const onGetPost = createPromiseThunk(POST_TYPES.GET_POST, postAPI.onGetPost);

export default handleActions(
    {
        [POST_TYPES.SET_POST_STATE]: (state, action) => {
            return fromJS(action.payload);
        },
        [POST_TYPES.GET_POSTS]: (state, _) => {
            const pendingState = createPromiseState.pending();
            return setImmutableState(state, 'posts', pendingState);
        },
        [POST_TYPES.GET_POSTS_DONE]: (state, action) => {
            const doneState = createPromiseState.done(action.payload?.posts);
            return setImmutableState(state, 'posts', doneState);
        },
        [POST_TYPES.GET_POSTS_ERROR]: (state, action) => {
            const errorState = createPromiseState.error(action.payload);
            return setImmutableState(state, 'posts', errorState);
        },
        [POST_TYPES.GET_POST]: (state, action) => {
            const pendingState = createPromiseState.pending();
            return setImmutableState(state, 'post', pendingState);
        },
        [POST_TYPES.GET_POST_DONE]: (state, action) => {
            const doneState = createPromiseState.done(action.payload?.post);
            return setImmutableState(state, 'post', doneState);
        },
        [POST_TYPES.GET_POST_ERROR]: (state, action) => {
            const errorState = createPromiseState.error(action.payload);
            return setImmutableState(state, 'post', errorState);
        },
    },
    postState,
);
