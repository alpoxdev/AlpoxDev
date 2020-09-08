import { HYDRATE } from 'next-redux-wrapper';
import { createAction, handleActions } from 'redux-actions';
import { List, Map } from 'immutable';
import { Request } from 'lib/api';

const initialState = Map({
    posts: Map({
        pending: false,
        error: null,
        posts: List([]),
        page : 0,
        offset : 15,
        more : true
    }),
    post: Map({
        pending: false,
        error: null,
        post: null,
    }),
    upload : Map({
        input : Map({
            title : '',
            thumbnail : '',
            content : '',
            tagInput : '', // tag 입력
            tags : [] // tag object로 변환
        }),
        pending : false,
        error : null,
        post : null,
        done : false
    }),
    update : Map({
        input : Map({
            title : '',
            thumbnail : '',
            content : '',
            tagInput : '', // tag 입력
            tags : [] // tag object로 변환
        }),
        pending : false,
        error : null,
        post : null,
        done : false
    }),
    remove : Map({
        pending : false,
        error : null,
        done : false
    })
});

const SET_POST_STATE = 'post/SET_POST_STATE';
const SET_POST_MORE = 'post/SET_POST_MORE';

const POSTS_PENDING = 'post/POSTS_PENDING';
const POSTS_SUCCESS = 'post/POSTS_SUCCESS';
const POSTS_FAILURE = 'post/POSTS_FAILURE';
const POST_PENDING = 'post/POST_PENDING';
const POST_SUCCESS = 'post/POST_SUCCESS';
const POST_FAILURE = 'post/POST_FAILURE';

const UPLOAD_PENDING = 'post/UPLOAD_PENDING';
const UPLOAD_SUCCESS = 'post/UPLOAD_SUCCESS';
const UPLOAD_FAILURE = 'post/UPLOAD_FAILURE';
const UPDATE_PENDING = 'post/UPDATE_FAILURE';
const UPDATE_SUCCESS = 'post/UPDATE_SUCCESS';
const UPDATE_FAILURE = 'post/UPDATE_FAILURE';
const REMOVE_PENDING = 'post/REMOVE_PENDING';
const REMOVE_SUCCESS = 'post/REMOVE_SUCCESS';
const REMOVE_FAILURE = 'post/REMOVE_FAILURE';

const SET_UPLOAD_INPUT = 'post/SET_UPLOAD_INPUT';
const SET_UPDATE_INPUT = 'post/SET_UPDATE_INPUT';
const SET_UPLOAD_TAGS = 'post/SET_UPLOAD_TAGS';
const SET_UPDATE_TAGS = 'post/SET_UPDATE_TAGS';
const SET_UPDATE_POST = 'post/SET_UPDATE_POST';

const RESET_UPLOAD = 'post/RESET_UPLOAD';
const RESET_UPDATE = 'post/RESET_UPDATE';

export const setPostState = createAction(SET_POST_STATE);
export const setPostMore = createAction(SET_POST_MORE);
export const setUploadInput = createAction(SET_UPLOAD_INPUT);
export const setUpdateInput = createAction(SET_UPDATE_INPUT);
export const setUploadTags = createAction(SET_UPLOAD_TAGS);
export const setUpdateTags = createAction(SET_UPDATE_TAGS);
export const resetUpload = createAction(RESET_UPLOAD);
export const resetUpdate = createAction(RESET_UPDATE);

export const onGetPosts = (init = false) => {
    return async (dispatch, getState) => {
        const { pending, page, offset, more, posts } = getState().post?.toJS().posts;
        if(!more || pending) return;
        if(init && posts.length > 0) return;

        console.log(`글 목록을 불러오는중...`);

        dispatch({ type: POSTS_PENDING });

        const url = 'https://api.alpox.kr/posts';
        const query = { page, offset };

        const { status, data } = await Request.onRequestGet({ url, query });
        if (status === 200) {
            const { posts } = data;
            dispatch({ type: POSTS_SUCCESS, payload: { posts, page : page + 1 } });
            if(posts.length === 0 || posts.length < offset){
                dispatch({ type : SET_POST_MORE, payload : false});
            }
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
            dispatch({ type: SET_UPDATE_POST, payload : data.post });
        } else {
            dispatch({ type: POST_FAILURE, page: data.post });
        }
    };
};

export const onUploadPost = () => {
    return async(dispatch, getState) => {
        const { pending, input } = getState().post?.toJS().upload;
        const { accessToken } = getState().user?.toJS();
        if(pending) return;
        console.log(`글 업로드 중...`);

        dispatch({ type : UPLOAD_PENDING });
        const { title, thumbnail, content, tags } = input;

        const url = `https://api.alpox.kr/posts`;
        const params = {
            title, thumbnail, content, tags
        };
        const headers = { Authorization: `Bearer ${accessToken}` };

        const { status, data } = await Request.onRequestPost({ url, params, headers });
        if(status === 201){
            const { post } = data;
            dispatch({ type : UPLOAD_SUCCESS, payload : post });
        }else{
            dispatch({ type : UPLOAD_FAILURE, payload : data });
        }
    }
}

export const onUpdatePost = () => {
    return async(dispatch, getState) => {
        const { pending, input, post } = getState().post?.toJS().update;
        const { accessToken } = getState().user?.toJS();
        if(pending || !post) return;
        console.log(`글 업로드 중...`);

        dispatch({ type : UPDATE_PENDING });
        const { title, thumbnail, content, tags } = input;

        const url = `https://api.alpox.kr/posts/${post.id}`;
        const params = {
            title, thumbnail, content, tags
        };
        const headers = { Authorization: `Bearer ${accessToken}` };

        const { status, data } = await Request.onRequestPatch({ url, params, headers });
        if(status === 204){
            dispatch({ type : UPDATE_SUCCESS });
        }else{
            dispatch({ type : UPLOAD_FAILURE, payload : data });
        }
    }
}

export const onRemovePost = (id) => {
    return async(dispatch, getState) => {
        const { pending } = getState()?.post?.toJS().remove;
        const { accessToken } = getState().user?.toJS();
        if(pending || !accessToken) return;

        console.log(`글 삭제중...`);

        dispatch({ type : REMOVE_PENDING });
        
        const url = `https://api.alpox.kr/posts/${id}`;
        const headers = { Authorization : `Bearer ${accessToken}` };
        const { status, data } = await Request.onRequestDelete({ url, headers });

        if(status === 204){
            dispatch({ type : REMOVE_SUCCESS });
        }else{
            dispatch({ type : REMOVE_FAILURE, payload : { status, data } });
        }
    }
}

export default handleActions(
    {
        [POSTS_PENDING]: (state, _) => {
            return state.setIn(['posts', 'pending'], true).setIn(['posts', 'error'], null);
        },
        [POSTS_SUCCESS]: (state, action) => {
            const { posts, page } = action?.payload;

            return state
                .setIn(['posts', 'posts'], state.getIn(['posts', 'posts']).push(...posts))
                .setIn(['posts', 'pending'], false)
                .setIn(['posts', 'error'], null)
                .setIn(['posts', 'page'], page);
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
            return state.setIn(['post', 'post'], post).setIn(['post', 'pending'], false).setIn(['post', 'error'], null);
        },
        [POST_FAILURE]: (state, action) => {
            const error = action?.payload;
            return state.setIn(['post', 'pending'], false).setIn(['post', 'error'], null);
        },
        [UPLOAD_PENDING]: (state, action) => {
            return state
                .setIn(['upload', 'pending'], true)
                .setIn(['upload', 'error'], null);
        },
        [UPLOAD_SUCCESS]: (state, action) => {
            const post = action.payload;
            return state
                .setIn(['upload', 'pending'], false)
                .setIn(['upload', 'error'], null)
                .setIn(['upload', 'post'], post)
                .setIn(['upload', 'done'], true);
        },
        [UPLOAD_FAILURE]: (state, action) => {
            const error = action.payload;
            return state
                .setIn(['upload', 'pending'], false)
                .setIn(['upload', 'error'], error);
        },
        [UPDATE_PENDING]: (state, action) => {
            return state
                .setIn(['update', 'pending'], true)
                .setIn(['update', 'error'], null)
                .setIn(['update', 'done'], false);
        },
        [UPDATE_SUCCESS]: (state, action) => {
            return state
                .setIn(['update', 'pending'], true)
                .setIn(['update', 'error'], null)
                .setIn(['update', 'done'], true);
        },
        [UPDATE_FAILURE]: (state, action) => {  
            const error = action.payload;
            return state
                .setIn(['update', 'pending'], false)
                .setIn(['update', 'error'], error)
                .setIn(['update', 'done'], false);
        },
        [REMOVE_PENDING]: (state, action) => {
            return state
                .setIn(['remove', 'pending'], true)
                .setIn(['remove', 'error'], null)
                .setIn(['remove', 'done'], false);
        },
        [REMOVE_SUCCESS]: (state, action) => {
            return state
                .setIn(['remove', 'pending'], false)
                .setIn(['remove', 'error'], null)
                .setIn(['remove', 'done'], true);
        },
        [REMOVE_FAILURE]: (state, action) => {
            const error = action.payload;
            return state
                .setIn(['remove', 'pending'], false)
                .setIn(['remove', 'error'], error)
                .setIn(['remove', 'done'], false);
        },
        [SET_POST_STATE]: (_, action) => {
            const state = action?.payload;
            return state;
        },
        [SET_POST_MORE] : (state, action) => {
            const more = action?.payload || true;
            return state.setIn(['posts', 'more'], more);
        },
        [SET_UPLOAD_INPUT]: (state, action) => {
            const { name, value } = action.payload;
            // console.log(name, value);
            return state.setIn(['upload', 'input', name], value);
        },
        [SET_UPDATE_INPUT]: (state, action) => {
            const { name, value } = action.payload;
            // console.log(name, value);
            return state.setIn(['update', 'input', name], value);
        },
        [SET_UPLOAD_TAGS]: (state, action) => {
            const { type = 'create', value } = action.payload;
            if(type === 'create'){
                console.log(value);
                return state.setIn(['upload', 'input', 'tags'], [...state.getIn(['upload', 'input', 'tags']), value]);
            }
            if(type === 'remove'){
                return state.setIn(['upload', 'input', 'tags'], state.getIn(['upload', 'input', 'tags']).filter(item => item !== value));
            }
            return state;
        },
        [SET_UPDATE_TAGS]: (state, action) => {
            const { type = 'create', value } = action.payload;
            if(type === 'create'){
                return state.setIn(['update', 'input', 'tags'], [...state.getIn(['update', 'input', 'tags']), value]);
            }
            if(type === 'remove'){
                return state.setIn(['update', 'input', 'tags'], state.getIn(['update', 'input', 'tags']).filter(item => item !== value));
            }
            return state;
        },
        [RESET_UPLOAD]: (state, action) => {
            return state
                .setIn(['upload', 'pending'], false)
                .setIn(['upload', 'error'], null)
                .setIn(['upload', 'post'], null)
                .setIn(['upload', 'done'], false)
        },
        [RESET_UPDATE]: (state, action) => {
            return state
                .setIn(['update', 'pending'], false)
                .setIn(['update', 'error'], null)
                .setIn(['update', 'done'], false)
        },
        [SET_UPDATE_POST]: (state, action)=>{
            const post = action?.payload;

            return state.setIn(['update', 'post'], post);
        }
    },
    initialState,
);
