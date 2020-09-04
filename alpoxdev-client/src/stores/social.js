import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import axios from 'axios';

const initialState = Map({
    pending: false,
    done: false,
    error: null,
});

const SOCIAL_PENDING = 'social/PENDING';
const SOCIAL_SUCCESS = 'social/SUCCESS';
const SOCIAL_FAILURE = 'social/FAILURE';

export const onSocial = ({ socialType = 'google', socialId, email = null, nickname = null, profile = null }) => {
    return async (dispatch, getState) => {
        const url = 'https://api.apick.kr/auth/social';
        const params = { socialId, socialType };
        if (email) params.email = email;
        if (nickname) params.nickname = nickname;
        if (profile) params.profile = profile;

        dispatch({ type: SOCIAL_PENDING });

        try {
            const { status, data } = await axios.post(url, params);
            console.log(status, data);
            if (status === 200 || status === 201) {
                console.log(status, data);
                dispatch({ type: SOCIAL_SUCCESS });
            } else {
                dispatch({ type: SOCIAL_FAILURE, payload: 'bad request' });
            }
        } catch (error) {
            dispatch({ type: SOCIAL_FAILURE, payload: error });
        }
    };
};

export default handleActions(
    {
        [SOCIAL_PENDING]: (state, _) => {
            return state.set('pending', true).set('done', false).set('error', null);
        },
        [SOCIAL_SUCCESS]: (state, _) => {
            return state.set('pending', false).set('done', true).set('error', null);
        },
        [SOCIAL_FAILURE]: (state, action) => {
            const error = action?.payload;
            return state.set('pending', false).set('done', false).set('error', error);
        },
    },
    initialState,
);
