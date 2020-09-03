import React, { useState, useCallback } from 'react';
import * as styled from './styled';
import { useDropzone } from 'react-dropzone';

export default function Dropzone({ profile = null, setProfile, onImageUpload }){
    const onDrop = useCallback((file)=>{
        console.log(file)
    });
    const { getRootProps, getInputProps } = useDropzone({ 
        accept: 'image/*',
        onDrop
    });

    return(
        <styled.Dropzone {...getRootProps()}>
            <styled.DropzoneInput {...getInputProps()}/>
            <styled.DropzoneProfile alt="profile-profile" src={profile}/>
            <styled.DropzoneInfo>
                <styled.DropzonePreview alt="profile-preview" src={profile}/>
                <styled.DropzoneInfoText>
                    파일을 드래그 하거나 <br/>
                    클릭해서 프로필을 변경 해보세요!
                </styled.DropzoneInfoText>
            </styled.DropzoneInfo>
        </styled.Dropzone>
    )
}