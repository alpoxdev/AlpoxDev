import { Map } from 'immutable';
import { initialDataState } from '../utils';

export const authState = Map({ 
    login: initialDataState.object,
    register: initialDataState.object
})