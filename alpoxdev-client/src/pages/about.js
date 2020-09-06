import React from 'react';

// redux
import { wrapper } from 'stores';
import { useStore } from 'react-redux';
import { serializeStates, deserializeState } from 'lib/utils';
import * as uiActions from 'stores/ui';

// container
import AboutContainer from 'container/about';

// helmet
import { ReactHelmet } from 'components';
import { aboutHelmet as helmet } from 'config';

export default function AboutPage(props){
    const { ui } = props;

    const store = useStore();
    React.useMemo(() => {
        store.dispatch(uiActions.setUIState(deserializeState(ui)));
    }, []);

    return(
        <>
            <ReactHelmet helmet={helmet}/>
            <AboutContainer/>
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res }) => {
    await Promise.all([
        store.dispatch(uiActions.setDrawerActive('About'))
    ]);

    const { ui } = store.getState();
    return {
        props: {
            ...serializeStates({ ui }),
        },
    };
});
