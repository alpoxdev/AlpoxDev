import React from 'react';
import * as styled from './styled';

export default function PostUploadButton({ isUpdate, onUpload, pending = false }){

    return(
        <styled.ButtonWrapper>
            <styled.UploadButton onClick={onUpload}>
                {!isUpdate ? '글 업로드' : '글 수정'}
                {pending ? '중...' : ''}
            </styled.UploadButton>
        </styled.ButtonWrapper>
    )
}