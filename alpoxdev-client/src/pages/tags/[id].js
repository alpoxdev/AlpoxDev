import React from 'react';
import { useRouter } from 'next/router';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tagActions from 'stores/tag';

// components
import { Helmet } from 'components';

// container
import PostDetailContainer from 'container/tag/detail';

export default function TagDetailPage() {
    const router = useRouter();
    const id = router.query?.id;

    const dispatch = useDispatch();
    const { onGetTag } = bindActionCreators(tagActions, dispatch);

    const { tag } = useSelector((state) => ({
        tag: state.tag.toJS().tag,
    }));
    const { data, done, pending } = tag;

    React.useEffect(() => {
        if (id && `${data?.id}` !== id && !pending) {
            onGetTag({ id });
        }
    }, [id]);

    return (
        <>
            <Helmet />
            <PostDetailContainer />
        </>
    );
}
