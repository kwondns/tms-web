import { useParams } from 'react-router-dom';

import { useGetProjectOne } from '@/hooks/PortFolio/useProject';
import PortFolioProjectTemplate from '@/templates/PortFolio/PortFolioProject.template';

export default function PortfolioEditProject() {
  const { id } = useParams();
  const { data: project } = useGetProjectOne(id);
  if (!id || !project) return <span>잘못된 요청입니다.</span>;

  return <PortFolioProjectTemplate defaultProject={project} />;
}
