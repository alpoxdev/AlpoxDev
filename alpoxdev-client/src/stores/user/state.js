import { Map } from 'immutable';
import { initialDataState } from '../utils';

export const userState = Map({
    logined: Map({
        user: null,
        accessToken: null,
    }),
});
