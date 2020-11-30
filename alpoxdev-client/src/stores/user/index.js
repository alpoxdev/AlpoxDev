import { handleActions } from 'redux-actions';
import { userState } from './state';
import { USER_TYPES } from './type';

export default handleActions(
    {
        [USER_TYPES.SET_LOGINED]: (state, action) => {
            const { user, accessToken } = action.payload;

            let nextState = state;
            if (user) nextState = nextState.setIn(['logined', 'user'], user);
            if (accessToken) nextState = nextState.setIn(['logined', 'accessToken'], accessToken);

            return nextState;
        },
    },
    userState,
);
