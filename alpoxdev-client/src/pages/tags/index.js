import React from 'react';

// redux
import { wrapper } from 'stores';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tagActions from 'stores/tag';

// components
import { Helmet } from 'components';
import { tagListHelmet as helmet } from 'config';

// container
import TagListContainer from 'container/tag/tags';

export default function TagListPage({ tag }) {
    const dispatch = useDispatch();
    const { setTagState } = bindActionCreators(tagActions, dispatch);

    React.useEffect(() => {
        setTagState(tag);
    }, [tag]);

    return (
        <>
            <Helmet helmet={helmet} />
            <TagListContainer />
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(
    async ({ store, req, res, ...etc }) => {
        // console.log(`getServerSideProps`, store.getState());
        const { dispatch, getState } = store;
        await dispatch(tagActions.onGetTags());

        const tag = getState()?.tag.toJS();

        return {
            props: { tag },
        };
    },
);
