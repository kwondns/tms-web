import { useParams } from 'react-router-dom';

import { useGetPastDay } from '@/hooks/TimeLine/usePast';
import TimeLineEditPastTemplate from '@/templates/TimeLine/TimeLineEditPast.template';
import QueryHandler from '@/components/QueryHandler';

export default function TimelineEditPast() {
  const params = useParams<{ date: string }>();
  if (params.date === undefined) return null;
  const { data, isError, isLoading } = useGetPastDay(params.date);

  return data === undefined ? null : (
    <QueryHandler isError={isError} isLoading={isLoading}>
      <TimeLineEditPastTemplate data={data} />
    </QueryHandler>
  );
}
