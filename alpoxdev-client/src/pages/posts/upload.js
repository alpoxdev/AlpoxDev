import React from 'react';

// helmet
import { ReactHelmet } from 'components';
import { postUploadHelmet as helmet } from 'config';

// container
import PostUploadContainer from 'container/posts/upload';

export default function PostUploadPage(){
    return(
        <>
            <ReactHelmet helmet={helmet}/>
            <PostUploadContainer/>
        </> 
    )
}