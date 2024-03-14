import { useParams } from 'react-router-dom';

import { useGetProjectOne } from '@/hooks/PortFolio/useProject';
import PortFolioProjectTemplate from '@/templates/PortFolio/PortFolioProject.template';
import QueryHandler from '@/components/QueryHandler';

export default function PortfolioEditProject() {
  const { id } = useParams();
  const { data: project, isError, isLoading } = useGetProjectOne(id);
  if (!id || !project) return <span>잘못된 요청입니다.</span>;

  return !isLoading && project === undefined ? null : (
    <QueryHandler isError={isError} isLoading={isLoading}>
      <PortFolioProjectTemplate defaultProject={project} />
    </QueryHandler>
  );
}
