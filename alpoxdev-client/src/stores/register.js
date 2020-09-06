import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import axios from 'axios';

const initialState = Map({
    input: {
        email: '',
        password: '',
        nickname: '',
    },
    pending: false,
    done: false,
    error: null,
});

const SET_INPUT = 'register/SET_INPUT';
const REGISTER_PENDING = 'register/PENDING';
const REGISTER_SUCCESS = 'register/SUCCESS';
const REGISTER_FAILURE = 'register/FAILURE';

export const setInput = createAction(SET_INPUT);

export const onRegister = () => {
    return async (dispatch, getState) => {
        const {
            input: { email, password, nickname },
        } = getState()?.register?.toJS();
        const url = 'https://api.alpox.kr/auth/register';
        const params = { email, password, nickname };

        dispatch({ type: REGISTER_PENDING });

        try {
            const { status, data } = await axios.post(url, params);
            console.log(status, data);
            if (status === 200) {
                dispatch({ type: REGISTER_SUCCESS });
            } else {
                dispatch({ type: REGISTER_FAILURE, payload: 'bad request' });
            }
        } catch (error) {
            dispatch({ type: REGISTER_FAILURE, payload: error });
        }
    };
};

export default handleActions(
    {
        [SET_INPUT]: (state, action) => {
            const { name, value } = action?.payload;
            return state.setIn(['input', name], value);
        },
        [REGISTER_PENDING]: (state, _) => {
            return state.set('pending', true).set('done', false).set('error', null);
        },
        [REGISTER_SUCCESS]: (state, _) => {
            return state.set('pending', false).set('done', true).set('error', null);
        },
        [REGISTER_FAILURE]: (state, action) => {
            const error = action?.payload;
            return state.set('pending', false).set('done', false).set('error', error);
        },
    },
    initialState,
);
