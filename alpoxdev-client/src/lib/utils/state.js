import { fromJS } from 'immutable';

export const serializeState = (state) => {
    return state.toJS();
};

export const deserializeState = (state) => {
    return fromJS(state);
};

export const serializeStates = (states) => {
    const serializedStates = {};
    for (const [key, value] of Object.entries(states)) {
        serializedStates[key] = value.toJS();
    }

    return serializedStates;
};

export const deserializeStates = (states) => {
    const deserializedStates = {};
    for (const [key, value] of Object.entries(states)) {
        deserializedStates[key] = fromJS(value);
    }

    return deserializedStates;
};
