import { useGetStack } from '@/hooks/PortFolio/useStack';
import PortFolioStackTemplate from '@/templates/PortFolio/PortFolioStack.template';
import QueryHandler from '@/components/QueryHandler';

export default function PortFolioStack() {
  const { data, isLoading, isError } = useGetStack();

  return data === undefined ? null : (
    <QueryHandler isError={isError} isLoading={isLoading}>
      <PortFolioStackTemplate stacks={data} />
    </QueryHandler>
  );
}
