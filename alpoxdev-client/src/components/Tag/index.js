import dynamic from 'next/dynamic';

export const TagList = dynamic(() => import('./TagList'));
export const TagDetailHeader = dynamic(() => import('./TagDetail/Header'));
