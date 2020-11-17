import { TYPE_DONE, TYPE_ERROR } from '../utils';

export const AUTH_TYPES = {
    LOGIN: 'auth/LOGIN',
    LOGIN_DONE: TYPE_DONE('auth/LOGIN'),
    LOGIN_ERROR: TYPE_ERROR('auth/LOGIN'),
    
    REGISTER: 'auth/REGISTER',
    REGISTER_DONE: TYPE_DONE('auth/REGISTER'),
    REGISTER_ERROR: TYPE_ERROR('auth/REGISTER')
}