import { useSetRecoilState } from 'recoil';

import StackByTech from '@/components/StackByTech';
import { StackGetType } from '@/types/PortFolio/stack.type';
import StackUpdate from '@/components/StackUpdate';
import { Sheet } from '@/components/ui/sheet';
import StackAtom from '@/stores/PortFolio/stack.store';
import Stack from '@/components/stack';

export default function PortFolioStackTemplate({ stacks }: { stacks: StackGetType }) {
  const { recent, other } = stacks;
  const { front, back, etc } = recent;

  const setSelectStack = useSetRecoilState(StackAtom);
  const onOpenChange = (e: boolean) => {
    if (!e) setSelectStack(null);
  };
  return (
    <Sheet onOpenChange={onOpenChange}>
      <StackUpdate />
      <StackByTech data={front} tech="front" />
      <StackByTech data={back} tech="back" />
      <StackByTech data={etc} tech="etc" />
      <p className="my-4 text-3xl">Others</p>
      <div className="mb-10 flex flex-wrap justify-center gap-4">
        {other.map((stack) => (
          <Stack
            key={stack.name}
            url={stack.url}
            recent={stack.recent}
            tech={stack.tech}
            name={stack.name}
            img={stack.img}
            category={stack.category}
          />
        ))}
      </div>
    </Sheet>
  );
}
