import { handleActions } from 'redux-actions';
import { createPromiseThunk, createPromiseState, setImmutableState } from '../redux';

import { authState } from './state';
import { AUTH_TYPES } from './type';
import * as authAPI from 'services/auth';

const setUser = ({ dispatch, data }) => {
    console.log(`setUser`, data);
};

export const onLogin = createPromiseThunk(AUTH_TYPES.LOGIN, authAPI.onLogin, { after: [setUser] });

export const onRegister = createPromiseThunk(AUTH_TYPES.REGISTER, authAPI.onRegister);

export default handleActions(
    {
        [AUTH_TYPES.LOGIN]: (state, _) => {
            const pendingState = createPromiseState.pending();
            return setImmutableState(state, 'login', pendingState);
        },
        [AUTH_TYPES.LOGIN_DONE]: (state, _) => {
            const doneState = createPromiseState.done(null);
            return setImmutableState(state, 'login', doneState);
        },
        [AUTH_TYPES.LOGIN_ERROR]: (state, action) => {
            const errorState = createPromiseState.error(action.payload);
            return setImmutableState(state, 'login', errorState);
        },
        [AUTH_TYPES.REGISTER]: (state, _) => {
            const pendingState = createPromiseState.pending();
            return setImmutableState(state, 'register', pendingState);
        },
        [AUTH_TYPES.REGISTER_DONE]: (state, _) => {
            const doneState = createPromiseState.done(null);
            return setImmutableState(state, 'register', doneState);
        },
        [AUTH_TYPES.REGISTER_ERROR]: (state, action) => {
            const errorState = createPromiseState.error(action.payload);
            return setImmutableState(state, 'register', errorState);
        },
    },
    authState,
);
