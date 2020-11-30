import { createStore } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import immutableTransform from 'redux-persist-transform-immutable';

// reducers & middleware
import middleware from './utils/middleware';
import reducers, { serializeState, deserializeState } from './utils/reducer';

const makeStore = ({ isServer = typeof window === 'undefined' }) => {
    if (isServer) {
        return createStore(reducers, middleware());
    }

    const { persistStore, persistReducer } = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;
    const persistConfig = {
        transforms: [immutableTransform()],
        key: 'alpoxdev',
        whitelist: ['user'],
        storage,
    };

    const persistedReducer = persistReducer(persistConfig, reducers);
    const store = createStore(persistedReducer, middleware());
    store.__persistor = persistStore(store);

    return store;
};

export const wrapper = createWrapper(makeStore, {
    serializeState,
    deserializeState,
    debug: false,
});
