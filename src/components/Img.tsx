import { ComponentProps } from 'react';

type ImgProps = ComponentProps<'img'>;
export default function Img(props: ImgProps) {
  const { src, alt, ...others } = props;
  return <img alt={alt ?? src} src={`${import.meta.env.VITE_IMAGE_URL}/${src}`} {...others} />;
}
