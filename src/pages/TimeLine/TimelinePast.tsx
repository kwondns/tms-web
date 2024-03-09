import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';

import TimeLinePastTemplate from '@/templates/TimeLine/TimeLinePast.template';
import { useGetPast } from '@/hooks/TimeLine/usePast';
import { PastDataAtom, PastSelector } from '@/stores/TimeLine/past.store';
import QueryHandler from '@/components/QueryHandler';

export default function TimelinePast() {
  const prev = useRecoilValue(PastSelector);
  const setData = useSetRecoilState(PastDataAtom);
  const { data, isLoading, isError } = useGetPast(prev);

  useEffect(() => {
    if (data) setData(data);
  }, [data]);

  return !isLoading && data === undefined ? null : (
    <QueryHandler isError={isError} isLoading={isLoading}>
      <TimeLinePastTemplate />
    </QueryHandler>
  );
}
