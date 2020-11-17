import { TYPE_DONE, TYPE_ERROR } from '../utils';

export const TAG_TYPES = {
    GET_TAGS: 'tag/GET_TAGS',
    GET_TAGS_DONE: TYPE_DONE('tag/GET_TAGS'),
    GET_TAGS_ERROR: TYPE_ERROR('tag/GET_TAGS'),
    
    GET_TAG: 'tag/GET_TAG',
    GET_TAG_DONE: TYPE_DONE('tag/GET_TAG'),
    GET_TAG_ERROR: TYPE_ERROR('tag/GET_TAG'),

    DELETE_TAG: 'tag/DELETE_TAG',
    DELETE_TAG_DONE: TYPE_DONE('tag/DELETE_TAG'),
    DELETE_TAG_ERROR: TYPE_ERROR('tag/DELETE_TAG'),
    
    UPDATE_TAG: 'tag/UPDATE_TAG',
    UPDATE_TAG_DONE: TYPE_DONE('tag/UPDATE_TAG'),
    UPDATE_TAG_ERROR: TYPE_ERROR('tag/UPDATE_TAG'),
}