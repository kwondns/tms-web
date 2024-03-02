import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ProjectType } from '@/types/PortFolio/project.type';

type PortFolioProjectBoardTemplateProps = { projects: ProjectType[] };
export default function PortFolioProjectBoardTemplate(props: PortFolioProjectBoardTemplateProps) {
  const { projects } = props;
  const navigate = useNavigate();

  const onClickRow = (event: MouseEvent<HTMLTableRowElement>) => {
    const { id } = event.currentTarget;
    navigate(`/portfolio/project/${id}`);
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[100px]">Title</TableHead>
          <TableHead>소개글</TableHead>
          <TableHead>대표 이미지</TableHead>
          <TableHead className="text-right">작업일</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow className="cursor-pointer" key={project.id} id={project.id} onClick={onClickRow}>
            <TableCell className="font-medium">{project.title}</TableCell>
            <TableCell>{project.shorten_content}</TableCell>
            <TableCell>
              <img className="max-h-[80px]" src={project.preview_image} alt={project.preview_image} />
            </TableCell>
            <TableCell className="text-right">{project.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
