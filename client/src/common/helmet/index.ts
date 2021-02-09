export type HelmetProps = {
  title: string;
  description?: string;
  image?: string;
  url?: string;
};

export const defaultHelmet: HelmetProps = {
  title: 'AlpoxDev',
  description: 'Hi, This is Alpox.',
  image: '/logo.png',
  url: 'https://alpox.dev',
};
