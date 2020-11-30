import Request from './request';

export const onLogin = async ({ id, password }) => {
    const url = `/auth/login`;
    const params = { id, password };

    const response = await Request.onRequestPost({ url, params });
    return response;
};

export const onRegister = async ({ email, password, nickname }) => {
    const url = `/auth/register`;
    const params = { email, password, nickname };

    const response = await Request.onRequestPost({ url, params });
    return response;
};
