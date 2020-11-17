import { Map } from 'immutable';
import { initialDataState } from '../utils';

export const tagState = Map({
    tags: initialDataState.list,
    tag: initialDataState.object,
    delete: initialDataState.object,
    update: initialDataState.object,
})