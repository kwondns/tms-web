import PortFolioProjectBoardTemplate from '@/templates/PortFolio/PortFolioProjectBoard.template';
import { useGetProjectAll } from '@/hooks/PortFolio/useProject';
import QueryHandler from '@/components/QueryHandler';

export default function PortFolioProjectBoard() {
  const { data, isError, isLoading } = useGetProjectAll();
  return data === undefined ? null : (
    <QueryHandler isError={isError} isLoading={isLoading}>
      <PortFolioProjectBoardTemplate projects={data} />
    </QueryHandler>
  );
}
