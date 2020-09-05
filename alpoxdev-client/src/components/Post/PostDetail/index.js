import dynamic from 'next/dynamic';

export const PostDetailHeader = dynamic(()=>import('./Header'));
export const PostDetailTagList = dynamic(()=>import('./TagList'));
export const PostDetailContent = dynamic(()=>import('./Content'));
export const Disqus = dynamic(()=>import('./Disqus'));