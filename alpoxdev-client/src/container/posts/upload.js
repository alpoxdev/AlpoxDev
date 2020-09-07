import React from 'react';
import Router from 'next/router';
import styled from 'styled-components';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postActions from 'stores/post';

// component
import { PostUploadViewer, PostUploadInput, PostUploadButton } from 'components';

function PostUploadContainer({ isUpdate = false, postState, postActions, userState }){
    const { upload, update, } = postState;
    const { user } = userState;
    const {
        setUploadInput,
        setUpdateInput,
        setUploadTags,
        setUpdateTags,
        onUploadPost,
        onUpdatePost,
    } = postActions;

    const input = !isUpdate ? upload.input : update.input;
    const setInput = !isUpdate ? setUploadInput : setUpdateInput;
    const setTags = !isUpdate ? setUploadTags : setUpdateTags;
    const onUpload = !isUpdate ? onUploadPost : onUpdatePost;

    React.useEffect(()=>{
        if(!user && !dev){
            Router.push('/auth');
            alert(`로그인이 되어있지 않습니다.`);
        }

        if(isUpdate){
            // 글이 수정파트면?    
        }
    }, [user, isUpdate]);

    return(
        <PostUploadWrapper>
            <PostUploadSection>
                <PostUploadInput 
                    input={input} 
                    setInput={setInput}
                    setTags={setTags}/>
                <PostUploadButton 
                    isUpdate={isUpdate} 
                    onUpload={onUpload}/>
            </PostUploadSection>
            <PostUploadSection viewer>
                <PostUploadViewer markdown={input.content}/>
            </PostUploadSection>
        </PostUploadWrapper>
    )
}

export default connect(
    (state) => ({
        postState : state.post?.toJS(),
        userState : state.user?.toJS(),
    }),
    (dispatch) => ({
        postActions : bindActionCreators(postActions, dispatch)
    })
)(PostUploadContainer);

const PostUploadWrapper = styled.div`
    width : 100%;
    min-height : calc(100vh - 64px);
    overflow-x : hidden;
    overflow-y : auto;

    display : flex;
    flex-wrap : wrap;
    
    position : absolute;
    top : 64px;
    left : 0;
    z-index : 3;
`;

const PostUploadSection = styled.div`
    flex : 1;
    min-height : calc(100vh - 64px);
    padding : 3rem; 

    font-size : 1.1rem;
    color : ${props=>props.viewer ? 'white' : '#222'};
    background-color : ${props=>props.viewer ? '#333' : 'white'};

    @media (max-width: 992px) {
        display : none;
    }
`;