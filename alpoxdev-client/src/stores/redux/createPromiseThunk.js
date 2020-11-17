export const createPromiseThunk = (type, promise, ...args) => {
    const [TYPE_DONE, TYPE_ERROR] = [`${type}_DONE`, `${type}_ERROR`];
    const lastAction = args?.length !== 0 ? args[args.length - 1] : null;

    return (data) => async (dispatch, getState) => {
        let param = { ...data };

        if (args?.length > 0) {
            args.forEach((arg) => {
                if (typeof arg === 'function') {
                    param = {
                        ...param,
                        ...arg(getState),
                    };
                }
            });
        }

        if (lastAction?.before && Array.isArray(lastAction?.before)) {
            lastAction?.before.forEach((before) => {
                if (typeof before === 'function') {
                    before(getState);
                }
            });
        }

        dispatch({ type }); // pending

        try {
            const { status, data } = await promise(param);
            if (status >= 200 && status < 300) {
                if (lastAction?.after && Array.isArray(lastAction?.after)) {
                    lastAction?.after.forEach((after) => {
                        if (typeof after === 'function') {
                            after({ dispatch, data });
                        }
                    });
                }

                dispatch({ type: TYPE_DONE, payload: data });
            } else {
                dispatch({ type: TYPE_ERROR, payload: { status, data } });
            }
        } catch (error) {
            dispatch({ type: TYPE_ERROR, payload: error });
        }
    };
};
