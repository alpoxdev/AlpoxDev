import { applyMiddleware } from 'redux';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';

const middleware = () => {
    const middleware = [logger, ReduxThunk];

    if (process.env.NODE_ENV === 'development') {
        const { composeWithDevTools } = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware));
    }

    return applyMiddleware(ReduxThunk);
};

export default middleware;
