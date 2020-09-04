import dynamic from 'next/dynamic';

export const PostList = dynamic(() => import('./PostList'));
export const SkeletonPostList = dynamic(() => import('./SkeletonPostList'));
