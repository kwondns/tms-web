import { useGetStack } from '@/hooks/PortFolio/useStack';
import PortFolioStackTemplate from '@/templates/PortFolio/PortFolioStack.template';

export default function PortFolioStack() {
  const { data } = useGetStack();
  if (!data) return <span>에러 발생</span>;
  return <PortFolioStackTemplate stacks={data} />;
}
