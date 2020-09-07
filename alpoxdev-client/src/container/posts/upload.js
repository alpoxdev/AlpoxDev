import React, { useState } from 'react';
import Router from 'next/router';
import styled from 'styled-components';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postActions from 'stores/post';

// component
import { PostUploadViewer, PostUploadInput, PostUploadButton } from 'components';

const dev = (process.env.NODE_ENV !== 'production');

function PostUploadContainer({ isUpdate = false, postState, postActions, userState }){
    const { upload, update } = postState;
    const { user } = userState;
    const {
        setUploadInput,
        setUpdateInput,
        setUploadTags,
        setUpdateTags,
        onUploadPost,
        onUpdatePost,
        resetUpload,
        resetUpdate
    } = postActions;

    React.useMemo(()=>{
        !isUpdate ? resetUpload() : resetUpdate();
    }, []);

    React.useEffect(()=>{
        const post = update?.post;

        if(!user && !dev){
            Router.push('/auth');
            alert(`로그인이 되어있지 않습니다.`);
        }

        if(isUpdate && !post){
            Router.replace('/');
            alert(`데이터가 존재하지 않습니다.`);
        }

        if(isUpdate && (post?.user?.email !== user?.email || user.role !== 'admin')){
            Router.replace(`/`);
            alert(`권한이 없습니다.`);
        }

        if(isUpdate && post){
            const { title, thumbnail, content, tags } = post;
            const listTag = tags.map((tag)=>{
                return tag.tag;
            });

            setUpdateInput({ name : 'title', value : title });
            setUpdateInput({ name : 'thumbnail', value : thumbnail });
            setUpdateInput({ name : 'content', value : content });
            setUpdateInput({ name : 'tags', value : listTag });
        }
    }, []);

    React.useEffect(()=>{
        if(upload.done){
            Router.push(`/posts/${upload.post.id}`);
        }
        if(update.done){
            Router.push(`/posts/${update.post.id}`);
        }
    }, [isUpdate, upload.done, update.done]);

    const input = !isUpdate ? upload.input : update.input;
    const pending = !isUpdate ? upload.pending : update.pending;
    const setInput = !isUpdate ? setUploadInput : setUpdateInput;
    const setTags = !isUpdate ? setUploadTags : setUpdateTags;
    const onUpload = !isUpdate ? onUploadPost : onUpdatePost;

    return(
        <PostUploadWrapper>
            <PostUploadSection>
                <PostUploadInput 
                    input={input} 
                    setInput={setInput}
                    setTags={setTags}/>
                <PostUploadButton 
                    isUpdate={isUpdate} 
                    onUpload={onUpload}
                    pending={pending}/>
            </PostUploadSection>
            <PostUploadSection viewer>
                <PostUploadViewer markdown={!isUpdate ? upload.input.content : update.input.content}/>
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
    z-index : 1;
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