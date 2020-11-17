export const getAccessTokenFromState = (getState) => {
    const accessToken = getState()?.user?.toJS()?.logined?.accessToken;
    return { accessToken };
};

export const getUserIdFromState = (getState) => {
    const userId = getState()?.user?.toJS()?.logined?.user?.id;
    return { userId };
};

export const getDataPageAndOffset = (getState, reducer, key) => {
    const { limit, offset } = getState()[reducer].toJS()[key];
    return { limit, offset };
};

export const getLoginInput = (getState) => {
    const input = getState()?.auth?.toJS()?.login?.input;
    return input;
};

export const getRegisterInput = (getState) => {
    const input = getState()?.auth?.toJS()?.register?.input;
    return input;
};
