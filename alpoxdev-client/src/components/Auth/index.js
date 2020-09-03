import dynamic from 'next/dynamic';

export const AuthSection = dynamic(() => import('./Section'));
export const AuthForm = dynamic(() => import('./Form'));
export const AuthInput = dynamic(() => import('./Input'));
export const AuthButton = dynamic(() => import('./Button'));
export const AuthLoginFooter = dynamic(() => import('./LoginFooter'));
export const AuthRegisterFooter = dynamic(() => import('./RegisterFooter'));

export const GoogleButton = dynamic(() => import('./GoogleButton'));
