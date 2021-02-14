type QueryStringParameters = {
    [name: string]: string;
} | null;

export const parsePageQuery = (query: QueryStringParameters) => {
    const limit = query?.limit || query?.take || '20';
    const offset = query?.offset || query?.skip || '0';

    return {
        limit: parseInt(limit),
        offset: parseInt(offset),
    };
};
