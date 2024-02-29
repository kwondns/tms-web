import StackByTech from '@/components/StackByTech';
import { StackGetType } from '@/types/portfolio/stack.type';
import StackCreate from '@/components/StackCreate';

export default function PortFolioStackTemplate({ stacks }: { stacks: StackGetType }) {
  const { front, back, etc } = stacks;
  return (
    <>
      <StackCreate />
      <StackByTech data={front} tech="front" />
      <StackByTech data={back} tech="back" />
      <StackByTech data={etc} tech="etc" />
    </>
  );
}
