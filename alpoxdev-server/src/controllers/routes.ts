/*
    /auth
*/

export const AUTH_LOGIN: string = 'POST /auth/login';
export const AUTH_REGISTER: string = 'POST /auth/register';
export const AUTH_SOCIAL: string = 'POST /auth/social';
export const AUTH_REFRESH: string = 'POST /auth/refresh';

/*
    /posts
*/

export const GET_POSTS: string = 'GET /posts';
export const GET_POST: string = 'GET /posts/:id';
export const CREATE_POST: string = 'POST /posts';
export const UPDATE_POST: string = 'PATCH /posts/:id';

/*
    /tags
*/

export const GET_TAGS: string = 'GET /tags';
export const GET_TAG: string = 'GET /tags/:id';

/*
    /lessons
*/

export const GET_LESSON_INFO: string = 'GET /lessons/info';
export const GET_LESSONS: string = 'GET /lessons?name=';

/*
    /yourface
*/

export const GET_YOURFACE_RESULT: string = 'post /yourface';
export const GET_YOURFACE_COUNT: string = 'GET /yourface';

/*
    Apick
*/

export const GET_APICK_POSTS: string = 'GET /apick/posts';
export const GET_APICK_POST: string = 'GET /apick/posts/:id';
export const CREATE_APICK_POST: string = 'POST /apick/posts';

export const GET_APICK_TAGS: string = 'GET /apick/tags';
export const CREATE_APICK_TAG: string = 'POST /apick/tags';
