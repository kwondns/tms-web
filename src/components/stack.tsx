import { useSetRecoilState } from 'recoil';

import Img from './Img';
import { StackUpdateType } from '@/types/PortFolio/stack.type';
import { SheetTrigger } from '@/components/ui/sheet';
import StackAtom from '@/stores/PortFolio/stack.store';

export default function Stack(props: StackUpdateType) {
  const { name, img, tech, url, recent, category } = props;
  const setSelectStack = useSetRecoilState(StackAtom);
  const onClickStack = () => {
    setSelectStack({ name, img, tech, url, recent, category });
  };
  return (
    <SheetTrigger asChild>
      <button
        type="button"
        className="shadow-button hover:shadow-button-hover flex flex-col justify-between gap-y-2 rounded-2xl border-2 border-stone-600/50 p-2 text-center transition-all hover:-translate-y-0.5 hover:translate-x-0.5 active:-translate-x-[3px] active:translate-y-[3px] active:shadow-none dark:border-stone-400/25"
        onClick={onClickStack}
      >
        <Img
          className="m-auto aspect-auto max-h-[80px] min-h-[80px] w-full min-w-[80px] max-w-[80px] object-contain"
          src={`${img}`}
          target="port"
        />
        <span className="break-words text-xs sm:text-lg">{name}</span>
      </button>
    </SheetTrigger>
  );
}
