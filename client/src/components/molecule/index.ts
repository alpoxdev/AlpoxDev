import dynamic from 'next/dynamic';

export * from './layout';
export * from './helmet';
export * from './modal';
export * from './skeleton';
export * from './form';
export * from './userProfile';
export * from './cursor';
export * from './dropdown';
export * from './header';

export const Footer = dynamic(() => import('./footer'), { ssr: false });
