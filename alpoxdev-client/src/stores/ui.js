import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { defaultHelmet as helmet } from 'config';

const initialState = Map({
    helmet,
    drawer : {
        active : 'Posts'   
    }
});

const SET_UI_STATE = 'ui/SET_UI_STATE';
const SET_HELMET = 'ui/SET_HELMET';
const SET_DRAWER_ACTIVE = 'ui/SET_DRAWER_ACTIVE';

export const setUIState = createAction(SET_UI_STATE);
export const setHelmet = createAction(SET_HELMET);
export const setDrawerActive = createAction(SET_DRAWER_ACTIVE);

export default handleActions(
    {
        [SET_HELMET] : (state, action) => {
            const helmet = action.payload;
            return state.set('helmet', helmet);
        },
        [SET_DRAWER_ACTIVE]: (state, action) => {
            let value = action.payload;
            if (!value) value = 'Posts';

            return state.setIn(['drawer', 'active'], value);
        },
        [SET_UI_STATE] : (_, action) => {
            const state = action?.payload;
            return state;
        }
    },
    initialState,
);
