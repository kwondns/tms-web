import { ComponentProps } from 'react';

type ImgProps = ComponentProps<'img'> & { target: string };
export default function Img(props: ImgProps) {
  const { src, alt, target, ...others } = props;
  return <img alt={alt ?? src} src={`https://kwondns-${target}.s3.ap-northeast-2.amazonaws.com/${src}`} {...others} />;
}
