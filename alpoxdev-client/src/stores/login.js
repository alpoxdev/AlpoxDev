import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import axios from 'axios';

import { bindActionCreators } from 'redux';
import * as userActions from 'stores/user';

const initialState = Map({
    input: {
        id: '',
        password: '',
    },
    pending: false,
    done: false,
    error: null,
});

const SET_INPUT = 'login/SET_INPUT';
const LOGIN_PENDING = 'login/PENDING';
const LOGIN_SUCCESS = 'login/SUCCESS';
const LOGIN_FAILURE = 'login/FAILURE';

export const setInput = createAction(SET_INPUT);

export const onLogin = () => {
    return async (dispatch, getState) => {
        const {
            input: { id, password },
        } = getState()?.login?.toJS();
        const url = 'https://api.alpox.kr/auth/login';
        const params = { id, password };

        console.log(id, password);

        dispatch({ type: LOGIN_PENDING });

        try {
            const { status, data } = await axios.post(url, params);
            // console.log(status, data);

            if (status === 200) {
                console.log(`로그인 성공!`);
                const { user, accessToken, refreshToken } = data;

                const setUser = bindActionCreators(userActions.setUser, dispatch);
                const setToken = bindActionCreators(userActions.setToken, dispatch);
                setUser(user);
                setToken({ accessToken, refreshToken });

                dispatch({ type: LOGIN_SUCCESS });
            } else {
                dispatch({ type: LOGIN_FAILURE, payload: 'bad request' });
            }
        } catch (error) {
            dispatch({ type: LOGIN_FAILURE, payload: error });
        }
    };
};

export default handleActions(
    {
        [SET_INPUT]: (state, action) => {
            const { name, value } = action?.payload;
            return state.setIn(['input', name], value);
        },
        [LOGIN_PENDING]: (state, _) => {
            return state.set('pending', true).set('done', false).set('error', null);
        },
        [LOGIN_SUCCESS]: (state, _) => {
            return state
                .set('pending', false)
                .set('done', true)
                .set('error', null)
                .set('input', initialState.get('input'));
        },
        [LOGIN_FAILURE]: (state, action) => {
            const error = action?.payload;
            return state.set('pending', false).set('done', false).set('error', error);
        },
    },
    initialState,
);
