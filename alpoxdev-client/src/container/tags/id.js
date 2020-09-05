import React from 'react';

// redux
import { connect } from 'react-redux';

function TagDetailContainer({ tagState }){
    const { tags : { tags } } = tagState;
    console.log(tags);
    return(
        <>

        </>
    );
}

export default connect(
    (state) => ({
        state : state.tag.toJS()
    }),
    null
)(TagDetailContainer);