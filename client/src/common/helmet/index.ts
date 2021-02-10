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

export const customHelmet = (props: HelmetProps): HelmetProps => ({
  title: props.title || defaultHelmet.title,
  description: props.description || defaultHelmet.description,
  image: props.image || defaultHelmet.image,
  url: props.url || defaultHelmet.url,
});
