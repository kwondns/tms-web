import { Link } from 'react-router-dom';

import Img from './Img';
import { StackType } from '@/types/PortFolio/stack.type';

export default function Stack(props: Omit<StackType, 'category'>) {
  const { name, url, img } = props;
  return (
    <Link
      className="shadow-button hover:shadow-button-hover flex flex-col justify-between gap-y-2 rounded-2xl border-2 border-stone-600/50 p-2 text-center transition-all hover:-translate-y-0.5 hover:translate-x-0.5 active:-translate-x-[3px] active:translate-y-[3px] active:shadow-none dark:border-stone-400/25"
      to={url ?? ''}
    >
      <Img
        className="m-auto aspect-auto max-h-[80px] min-h-[80px] w-full min-w-[80px] max-w-[80px] object-contain"
        src={`${img}`}
      />
      <span className="break-words text-xs sm:text-lg">{name}</span>
    </Link>
  );
}
