import { List, Map } from 'immutable';

export const createPromiseState = {
    pending: () =>
        Map({
            pending: true,
            done: false,
            error: null,
        }),
    done: (data, dataCount = 0) =>
        Map({
            pending: false,
            done: true,
            error: null,
            data,
            dataCount,
        }),
    error: (error) =>
        Map({
            pending: false,
            done: false,
            error,
        }),
};
