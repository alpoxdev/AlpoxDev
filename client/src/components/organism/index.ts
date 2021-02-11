import dynamic from 'next/dynamic';

export const Introduce = dynamic(() => import('./Introduce'));
export const PostList = dynamic(() => import('./Post/PostList'));
export const PostDetailHeader = dynamic(() => import('./Post/PostDetailHeader'));
export const PostDetailContent = dynamic(() => import('./Post/PostDetailContent'));
export const PostDetailCommentList = dynamic(() => import('./Post/PostDetailCommentList'));
export const PostCreatePreview = dynamic(() => import('./Post/PostCreatePreview'));
export const PostCreateTextarea = dynamic(() => import('./Post/PostCreateTextarea'));
