import React from 'react';

// redux
import { useSelector } from 'react-redux';

// components
import { TagList } from 'components';

export default function TagListContainer() {
    const { tags } = useSelector((state) => ({
        tags: state.tag.toJS().tags,
    }));
    const { data, pending } = tags;

    return <TagList tags={data} />;
}
