import { Instance, types } from 'mobx-state-tree';
import { createAsyncModel, createAsyncModels, EmptyModel, IEmpty } from 'common/mst';

export const login = createAsyncModel('Login', EmptyModel);
export const register = createAsyncModel('Register', EmptyModel);
