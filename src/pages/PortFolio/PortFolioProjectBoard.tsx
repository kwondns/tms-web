import PortFolioProjectBoardTemplate from '@/templates/PortFolio/PortFolioProjectBoard.template';
import { useGetProjectAll } from '@/hooks/PortFolio/useProject';

export default function PortFolioProjectBoard() {
  const { data } = useGetProjectAll();
  if (!data) return <span>데이터가 없습니다.</span>;
  return <PortFolioProjectBoardTemplate projects={data} />;
}
