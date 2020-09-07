import dynamic from 'next/dynamic';

export const PostUploadViewer = dynamic(()=>import('./Viewer'));
export const PostUploadInput = dynamic(()=>import('./Input'));
export const PostUploadButton = dynamic(()=>import('./Button'));
