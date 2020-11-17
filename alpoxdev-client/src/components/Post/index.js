import dynamic from 'next/dynamic';

export const PostList = dynamic(() => import('./PostList'));

export const PostDetailHeader = dynamic(() => import('./PostDetail/Header'));
export const PostDetailTagList = dynamic(() => import('./PostDetail/TagList'));
export const PostDetailContent = dynamic(() => import('./PostDetail/Content'));
export const PostDetailDisqus = dynamic(() => import('./PostDetail/Disqus'));
