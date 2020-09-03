import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const initialState = Map({
    header: {
        view: true,
        dropdown: false,
    },
});

const SET_DROPDOWN = 'ui/SET_DROPDOWN';

export const setDropdown = createAction(SET_DROPDOWN);

export default handleActions(
    {
        [SET_DROPDOWN]: (state, action) => {
            let value = action.payload;
            if (!value) value = false;

            return state.setIn(['header', 'dropdown'], value);
        },
    },
    initialState,
);
