import React from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tagActions from 'stores/tag';

// components
import { Helmet } from 'components';

// container
import TagListContainer from 'container/tag/tags';

export default function TagListPage() {
    const dispatch = useDispatch();
    const { onGetTags } = bindActionCreators(tagActions, dispatch);

    const { tags } = useSelector((state) => ({
        tags: state.tag.toJS().tags,
    }));
    const { data, pending } = tags;

    React.useEffect(() => {
        if (data?.length === 0 && !pending) onGetTags();
    }, [data]);

    return (
        <>
            <Helmet />
            <TagListContainer />
        </>
    );
}
