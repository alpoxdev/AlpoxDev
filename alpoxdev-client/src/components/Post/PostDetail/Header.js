import React from 'react';
import * as styled from './styled';
import { parseTimestamp } from 'lib/utils';

import TagList from './TagList';

export default function PostDetailHeader({ post = null }){
    const isThumbnail = post?.user?.profile;

    return(
        <styled.PostDetailHeader>
            <styled.HeaderTopWrapper>
                <styled.HeaderTitle>{post.title && post.title ? post.title : ''}</styled.HeaderTitle>
            </styled.HeaderTopWrapper>
            <styled.HeaderBottomWrapper>
                {
                    isThumbnail && <styled.UserProfile
                        alt={post.user && post.user.username ? post.user.username : ''}
                        src={post.user && post.user.profile ? post.user.profile : ''}/>
                }
                <styled.Username isThumbnail={isThumbnail && 'true'}>{post.user && post.user.nickname ? post.user.nickname : ''}</styled.Username>
                <styled.PostCreatedAt>{parseTimestamp(post.createdAt)}</styled.PostCreatedAt>
            </styled.HeaderBottomWrapper>
            <TagList tags={post.tags ? post.tags : []}/>
        </styled.PostDetailHeader>
    )
}