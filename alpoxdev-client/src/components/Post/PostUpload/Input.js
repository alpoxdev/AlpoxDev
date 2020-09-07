import React, { useCallback } from 'react';
import * as styled from './styled';

export default function PostUploadInput({ input, setInput, setTags }){
    const onEnter = useCallback((e) => {
        if (e.key === 'Enter') {
            setTags({ type : 'create', value : input.tagInput });
            setInput({ name : 'tagInput', value : '' });
        }
    });

    const onDelete = useCallback((tagName) => {
        setTags({ type : 'remove', value : tagName });
    });

    return(
        <styled.PostUploadInput>
            <styled.TitleInput
                name="title"
                value={input.title}
                placeholder="제목을 입력해주세요"
                onChange={(e)=>setInput(e.target)}/>
            <styled.ThumbnailInput
                name="thumbnail"
                value={input.thumbnail}
                placeholder="썸네일을 입력하세요"
                onChange={(e)=>setInput(e.target)}/>

            <styled.TagWrapper>
                <TagList tags={input.tags} onDelete={onDelete}/>
                <styled.TagInput
                    name="tagInput"
                    value={input.tagInput}
                    placeholder="태그를 입력하세요. 엔터를 누를시 추가가 됩니다."
                    onChange={(e)=>setInput(e.target)}
                    onKeyDown={onEnter}
                    tagsNone={input.tags.length === 0 ? 'true' : ''}/>
            </styled.TagWrapper>
            <styled.ContentInput
                name="content"
                value={input.content}
                placeholder="글을 입력하세요"
                onChange={(e)=>setInput(e.target)}/>
        </styled.PostUploadInput>
    );
}

function TagList({ tags = [], onDelete }){
    const tagList = tags.map((tag, index)=>{
        return <TagItem key={index} tag={tag} onDelete={onDelete}/>;
    });

    return(
        <styled.TagList>
            {tagList}
        </styled.TagList>
    );
}

function TagItem({ tag, onDelete }){
    return (
        <styled.TagItem onClick={()=>onDelete(tag)}>
            {tag}
        </styled.TagItem>
    )
}