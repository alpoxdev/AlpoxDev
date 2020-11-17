import { Map } from 'immutable';
import { initialDataState } from '../utils';

export const postState = Map({
    posts: initialDataState.list,
    post: initialDataState.object,
    create: initialDataState.object,
    delete: initialDataState.object,
    udpate: initialDataState.object,
});