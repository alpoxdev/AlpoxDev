import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { defaultHelmet } from 'config';

const initialState = Map({
    helmet: defaultHelmet,
});

const SET_HELMET = 'helmet/SET_HELMET';

export const setHelmet = createAction(SET_HELMET);

export default handleActions(
    {
        [SET_HELMET]: (state, action) => {
            console.log(`HELMET STORE`, action.payload);
            const helmet = action?.payload;
            return state.set('helmet', helmet);
        },
    },
    initialState,
);
