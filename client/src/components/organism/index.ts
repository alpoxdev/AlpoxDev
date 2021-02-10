import dynamic from 'next/dynamic';

export const Introduce = dynamic(() => import('./Introduce'));
export const PostList = dynamic(() => import('./Post/PostList'));
export const PostDetailHeader = dynamic(() => import('./Post/PostDetailHeader'));
export const PostDetailContent = dynamic(() => import('./Post/PostDetailContent'));
