import { useGetPresent, useSocketPresent } from '@/hooks/TimeLine/usePresent';
import QueryHandler from '@/components/QueryHandler';
import TimeLinePresentTemplate from '@/templates/TimeLine/TimeLinePresent.template';

export default function TimelinePresent() {
  const { data, isLoading, isError } = useGetPresent();
  useSocketPresent();
  return data === undefined ? null : (
    <QueryHandler isError={isError} isLoading={isLoading}>
      <TimeLinePresentTemplate data={data} />
    </QueryHandler>
  );
}
