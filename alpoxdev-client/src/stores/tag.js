import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import { Request } from 'lib/api';

const initialState = Map({
    tags: Map({
        pending: false,
        error: null,
        tags: List([]),
    }),
    tag: Map({
        pending: false,
        error: null,
        tag: null,
    }),
});

const SET_TAG_STATE = 'tag/SET_TAG_STATE';
const TAGS_PENDING = 'tag/TAGS_PENDING';
const TAGS_SUCCESS = 'tag/TAGS_SUCCESS';
const TAGS_FAILURE = 'tga/TAGS_FAILURE';
const TAG_PENDING = 'tag/TAG_PENDING';
const TAG_SUCCESS = 'tag/TAG_SUCCESS';
const TAG_FAILURE = 'tag/TAG_FAILURE';

export const setTagState = createAction(SET_TAG_STATE);

export const onGetTags = (init = false) => {
    return async (dispatch, getState) => {
        const { tags } = getState().tag?.toJS().tags;
        if(init && tags.length > 0) return;
        
        console.log(`태그 목록 불러오는중...`);
        dispatch({ type: TAGS_PENDING });

        const url = 'https://api.alpox.kr/tags';
        const { status, data } = await Request.onRequestGet({ url });

        if (status === 200) {
            dispatch({ type: TAGS_SUCCESS, payload: data.tags });
        } else {
            dispatch({ type: TAGS_FAILURE, payload: { status, data } });
        }
    };
};

export const onGetTag = (id) => {
    return async (dispatch, getState) => {
        console.log(`태그 자세히 불러오는중... | ${id}`);
        dispatch({ type : TAG_PENDING });

        const url = `https://api.alpox.kr/tags/${id}`;
        const { status, data } = await Request.onRequestGet({ url });

        if(status === 200){
            dispatch({ type : TAG_SUCCESS, payload : data });
        }else{
            dispatch({ type : TAG_FAILURE, payload : { status, data }});
        }
    };
};

export default handleActions(
    {
        [TAGS_PENDING]: (state, _) => {
            return state.setIn(['tags', 'pending'], true).setIn(['tags', 'error'], null);
        },
        [TAGS_SUCCESS]: (state, action) => {
            const tags = action?.payload;
            return state.setIn(['tags', 'pending'], false).setIn(['tags', 'error'], null).setIn(['tags', 'tags'], tags);
        },
        [TAGS_FAILURE]: (state, action) => {
            const error = action?.payload;
            return state.setIn(['tags', 'pending'], false).setIn(['tags', 'error'], error);
        },
        [TAG_PENDING]: (state, action) => {
            return state.setIn(['tag', 'pending'], true).setIn(['tag', 'error'], null);
        },
        [TAG_SUCCESS]: (state, action) => {
            const tag = action?.payload;
            return state.setIn(['tag', 'pending'], false).setIn(['tag', 'error'], null).setIn(['tag', 'tag'], tag);
        },
        [TAG_FAILURE]: (state, action) => {
            const error = action.payload;
            return state.setIn(['tag', 'pending'], false).setIn(['tag', 'error'], error);
        },
        [SET_TAG_STATE]: (_, action) => {
            const state = action?.payload;
            return state;
        },
    },
    initialState,
);
