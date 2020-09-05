import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { fromJS } from 'immutable';

import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import immutableTransform from 'redux-persist-transform-immutable';

import ui from './ui';
import login from './login';
import register from './register';
import social from './social';
import user from './user';
import post from './post';
import tag from './tag';

const combinedReducers = combineReducers({
    ui,
    login,
    register,
    social,
    user,
    post,
    tag,
});

const reducers = (state, action) => {
    if (action?.type === HYDRATE) {
        // console.log(state);
        // console.log(action.payload.tag.toJS());
        for (const [key, value] of Object.entries(action.payload)) {
            state[key] = value;
        }
        return combinedReducers(state, action);
    }
    return combinedReducers(state, action);
};

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV === 'development') {
        const { composeWithDevTools } = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(ReduxThunk);
};

const makeStore = ({ isServer = typeof window === 'undefined' }) => {
    if (isServer) {
        return createStore(reducers, bindMiddleware([ReduxThunk]));
    }
    const { persistStore, persistReducer } = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;

    const persistConfig = {
        transforms: [immutableTransform()],
        key: 'apick-client',
        whitelist: ['user'],
        storage,
    };

    const persistedReducer = persistReducer(persistConfig, reducers);

    const store = createStore(persistedReducer, bindMiddleware([logger, ReduxThunk]));
    store.__persistor = persistStore(store);

    return store;
};

export const wrapper = createWrapper(makeStore, {
    serializeState: (state) => {
        const serialized = [];
        for (const [key, value] of Object.entries(state)) {
            serialized[key] = value ? value.toJS() : value;
        }

        return serialized;
    },
    deserializeState: (state) => {
        const deserialized = [];
        for (const [key, value] of Object.entries(state)) {
            deserialized[key] = value ? fromJS(value) : value;
        }

        return deserialized;
    },
    debug: false,
});
