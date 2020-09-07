import React from 'react';
import * as styled from './styled';

export default function PostUploadButton({ isUpdate, onUpload }){

    return(
        <styled.ButtonWrapper>
            <styled.UploadButton onClick={onUpload}>
                {!isUpdate ? '글 올리기' : '글 수정'}
            </styled.UploadButton>
        </styled.ButtonWrapper>
    )
}