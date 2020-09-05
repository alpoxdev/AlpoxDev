import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const initialState = Map({
    drawer : {
        active : 'Posts'   
    }
});

const SET_UI_STATE = 'ui/SET_UI_STATE';
const SET_DRAWER_ACTIVE = 'ui/SET_DRAWER_ACTIVE';

export const setUIState = createAction(SET_UI_STATE);
export const setDrawerActive = createAction(SET_DRAWER_ACTIVE);

export default handleActions(
    {
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
