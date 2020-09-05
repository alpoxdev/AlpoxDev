import React from 'react';

// redux
import { connect } from 'react-redux';

// components
import { TagList } from 'components';

function TagListContainer({ tagState }) {
    const { tags : { tags }} = tagState;

    return(
        <>
            <TagList tags={tags}/>
        </>
    )
}

export default connect(
    (state) => ({
        tagState: state.tag.toJS(),
    }),
    null
)(TagListContainer);