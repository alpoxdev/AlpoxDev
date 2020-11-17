import Request from './request';

export const onGetTags = async({ page, offset }) => {
    const url = `/tags`;
    const query = { page, offset };

    const response = await Request.onRequestGet({ url, query });
    return response;
}

export const onGetTag = async({ id }) => {
    const url = `/tags/${id}`;

    const response = await Request.onRequestGet({ url });
    return response;
}