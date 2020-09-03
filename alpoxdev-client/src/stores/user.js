import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { Request } from 'lib/api';

const initialState = Map({
    user: null,
    accessToken: null,
    refreshToken: null,
    input: Map({
        nickname: '',
        profile: '',
    }),
    update: Map({
        pending: false,
        error: null,
        done: false,
    }),
});

const SET_USER = 'user/SET_USER';
const SET_NICKNAME = 'user/SET_NCIKNAME';
const SET_PROFILE = 'user/SET_PROFILE';
const SET_TOKEN = 'user/SET_TOKEN';
const SET_INPUT = 'user/SET_INPUT';

const UPDATE_PENDING = 'user/UPDATE_PENDING';
const UPDATE_SUCCESS = 'user/UPDATE_SUCCESS';
const UPDATE_FAILURE = 'user/UPDATE_FAILURE';

const LOGOUT = 'user/LOGOUT';

export const setUser = createAction(SET_USER);
export const setNickname = createAction(SET_NICKNAME);
export const setProfile = createAction(SET_PROFILE);
export const setToken = createAction(SET_TOKEN);
export const setInput = createAction(SET_INPUT);

export const onLogout = createAction(LOGOUT);

export const onUpdateUser = () => {
    return async (dispatch, getState) => {
        const { user, accessToken, input } = getState()?.user?.toJS();
        const { nickname, profile } = input;

        const url = `https://api.apick.kr/users/${user.id}`;
        const params = { nickname, profile };
        const headers = { Authorization: `Bearer ${accessToken}` };

        dispatch({ type: UPDATE_PENDING });

        const { status, data } = await Request.onRequestPatch({
            url,
            params,
            headers,
        });
        if (status === 204) {
            if (nickname) dispatch({ type: SET_NICKNAME, payload: nickname });
            if (profile) dispatch({ type: SET_PROFILE, payload: profile });

            dispatch({ type: UPDATE_SUCCESS, payload: params });
        } else {
            dispatch({ type: UPDATE_FAILURE });
        }
    };
};

export default handleActions(
    {
        [SET_USER]: (state, action) => {
            const user = action.payload;
            return state.set('user', user);
        },
        [SET_NICKNAME]: (state, action) => {
            const nickname = action.payload;
            return state.set('user', { ...state.get('user'), nickname });
        },
        [SET_PROFILE]: (state, action) => {
            const profile = action.payload;
            return state.set('user', { ...state.get('user'), profile });
        },
        [SET_TOKEN]: (state, action) => {
            const { accessToken, refreshToken } = action.payload;
            if (!accessToken || !refreshToken) return state;

            return state.set('accessToken', accessToken).set('refreshToken', refreshToken);
        },
        [SET_INPUT]: (state, action) => {
            const { name, value } = action.payload;
            return state.setIn(['input', name], value);
        },
        [UPDATE_PENDING]: (state, action) => {
            return state
                .setIn(['update', 'pending'], true)
                .setIn(['update', 'error'], null)
                .setIn(['update', 'done'], false);
        },
        [UPDATE_SUCCESS]: (state, action) => {
            const { nickname, profile } = action?.payload;

            return state
                .setIn(['update', 'pending'], false)
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
        [LOGOUT]: (state, _) => {
            return initialState;
        },
    },
    initialState,
);
