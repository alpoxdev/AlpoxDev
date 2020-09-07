import React from 'react';
import Link from 'next/link';
import * as styled from './styled';
import { parseTimestamp } from 'lib/utils';

import TagList from './TagList';

export default function PostDetailHeader({ post = null, user = null }){
    const isThumbnail = post?.user?.profile;
    const isFix = (post?.user?.email === user?.email);

    return(
        <styled.PostDetailHeader>
            <styled.HeaderTopWrapper>
                <styled.HeaderTitle>{post.title && post.title ? post.title : ''}</styled.HeaderTitle>
                {isFix && <styled.HeaderTopButtonWrapper>
                    <styled.HeaderButton isDelete>
                        삭제
                    </styled.HeaderButton>
                    <Link href="/posts/:id/update" as={`/posts/${post.id}/update`}>
                        <styled.HeaderButton>
                            수정
                        </styled.HeaderButton>
                    </Link>
                </styled.HeaderTopButtonWrapper>}
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