import dynamic from 'next/dynamic';

export const AboutProfile = dynamic(()=>import('./Profile'));
export const AboutProjectList = dynamic(()=>import('./ProjectList'));