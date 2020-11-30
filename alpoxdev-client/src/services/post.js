import Request from './request';

export const onGetPosts = async ({ page, offset }) => {
    const url = `/posts`;
    const query = { page, offset };

    const response = await Request.onRequestGet({ url, query });
    return response;
};

export const onGetPost = async ({ id }) => {
    const url = `/posts/${id}`;

    const response = await Request.onRequestGet({ url });
    return response;
};

export const onDeletePost = async ({ accessToken, id }) => {
    const url = `/posts/${id}`;
    const headers = Request.getAuthorizationHeader(accessToken);

    const response = await Request.onRequestDelete({ url, headers });
    return response;
};
