import { createAction, handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
import { tagState } from './state';
import { TAG_TYPES } from './type';
import {
    createPromiseThunk,
    createPromiseState,
    setImmutableState,
    getDataPageAndOffset,
} from '../redux';
import * as tagAPI from 'services/tag';

export const setTagState = createAction(TAG_TYPES.SET_TAG_STATE);
export const onGetTags = createPromiseThunk(TAG_TYPES.GET_TAGS, tagAPI.onGetTags, (getState) =>
    getDataPageAndOffset(getState, 'tag', 'tags'),
);
export const onGetTag = createPromiseThunk(TAG_TYPES.GET_TAG, tagAPI.onGetTag);

export default handleActions(
    {
        [TAG_TYPES.SET_TAG_STATE]: (state, action) => {
            return fromJS(action.payload);
        },
        [TAG_TYPES.GET_TAGS]: (state, _) => {
            const pendingState = createPromiseState.pending();
            return setImmutableState(state, 'tags', pendingState);
        },
        [TAG_TYPES.GET_TAGS_DONE]: (state, action) => {
            const doneState = createPromiseState.done(action.payload?.tags);
            return setImmutableState(state, 'tags', doneState);
        },
        [TAG_TYPES.GET_TAGS_ERROR]: (state, action) => {
            const errorState = createPromiseState.error(action.payload);
            return setImmutableState(state, 'tags', errorState);
        },
        [TAG_TYPES.GET_TAG]: (state, _) => {
            const pendingState = createPromiseState.pending();
            return setImmutableState(state, 'tag', pendingState);
        },
        [TAG_TYPES.GET_TAG_DONE]: (state, action) => {
            const doneState = createPromiseState.done(action.payload?.tag);
            return setImmutableState(state, 'tag', doneState);
        },
        [TAG_TYPES.GET_TAG_ERROR]: (state, action) => {
            const errorState = createPromiseState.error(action.payload);
            return setImmutableState(state, 'tag', errorState);
        },
    },
    tagState,
);
