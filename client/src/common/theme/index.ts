import { Theme } from '@emotion/react';

export enum FontSize {
  title = '24px',
  subtitle = '20px',
  content = '16px',
  info = '14px',
}

export const theme: Theme = {
  color: {
    primary: 'rgb(106, 99, 221)',
    subPrimary: 'rgba(106, 99, 221, 0.15)',
    background: 'rgb(247, 248, 251)',
    text: '#000000',
    textBoldInfo: '#8D8D8D',
    textInfo: '#C6C6C8',
    buttonBackground: '#EDEDED',
    buttonBoldBackground: '#C8C8C8',
  },
  fontSize: {
    title: '24px',
    subtitle: '20px',
    content: '16px',
    info: '14px',
  },
  fontFamily: {
    primary: 'San Francisco',
    logo: '',
  },
};

export type ITheme = typeof theme;
