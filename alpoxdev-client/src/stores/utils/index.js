import { Map, List } from 'immutable';

export const TYPE_DONE = (type) => `${type}_DONE`;
export const TYPE_ERROR = (type) => `${type}_ERROR`;

export const initialDataState = {
    list: Map({
        pending: false,
        done: false,
        error: null,
        data: List([]),
        dataCount: 0,
        page: 0,
        offset: 200,
    }),
    object: Map({
        pending: false,
        done: false,
        error: null,
        data: Map({}),
    }),
};
