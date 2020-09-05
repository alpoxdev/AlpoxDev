import dynamic from 'next/dynamic';

export const TagList = dynamic(()=>import('./TagList'));