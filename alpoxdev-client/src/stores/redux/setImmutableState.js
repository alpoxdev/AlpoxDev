export const setImmutableState = (state, key, value) => {
    return state.set(key, state.get(key).merge(value));
};
