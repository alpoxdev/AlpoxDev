import React from 'react';
import styled from 'styled-components';

export default function PostUploadPage(){
    return(
        <PostUploadWrapper>
            <PostUploadSection>

            </PostUploadSection>
            <PostUploadSection preview="true">
                
            </PostUploadSection>
        </PostUploadWrapper>
    );
}

export const PostUploadWrapper = styled.div`
    width : 100%;
    min-height : calc(100vh - 64px);

    display : flex;
    flex-wrap : wrap;
    
    position : absolute;
    top : 64px;
    left : 0;
    z-index : 9;

    background-color : ${props=>props.theme.subPrimaryColor};
    border-top : 2px solid #ccc;
`;

export const PostUploadSection = styled.div`
    flex : 1;
    min-height : calc(100vh - 64px);
    background-color : ${props=>props.preview==='true' ? 'white' : 'transprarent'};
`;