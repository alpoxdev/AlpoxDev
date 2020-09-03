import dynamic from 'next/dynamic';

export const UserDefault = dynamic(()=>import('./Default'));
