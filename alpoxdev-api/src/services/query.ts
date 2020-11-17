type QueryStringParameters = {
    [name: string]: string
} | null;

export const parsePageQuery = (params: QueryStringParameters) => {
    const page = params?.limit || '0';
    const offset = params?.offset || '20';
  
    return { 
        page: parseInt(page, 10), 
        offset: parseInt(offset, 10)
    };
}
  