import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { FutureBoxType } from '@/types/TimeLine/future.type';
import CardSet from '@/components/CardSet';
import CardContainer from '@/components/CardContainer';
import { Button } from '@/components/ui/button';

type TimeLineFutureTemplateProps = {
  data: { high: FutureBoxType[] | undefined; middle: FutureBoxType[] | undefined; low: FutureBoxType[] | undefined };
};

export default function TimeLineFutureTemplate(props: TimeLineFutureTemplateProps) {
  const { data } = props;
  const route = useLocation();
  const [isRecord, setIsRecord] = useState(false);
  useEffect(() => {
    if (route.pathname.includes('record')) setIsRecord(true);
  }, []);
  const { high, middle, low } = data;
  return (
    <>
      <Link to={isRecord ? '/timeline/future' : '/timeline/future/record'}>
        <Button>{isRecord ? '이전으로' : '기록 보기'}</Button>
      </Link>
      <div className="flex max-h-screen flex-col gap-y-4 overflow-y-auto">
        {high?.length ? (
          <CardSet futureBoxes={high} priority={1} />
        ) : (
          <CardContainer priority={1} index={0}>
            <span className="text-primary mr-4 p-4 text-2xl">우선순위 상급</span>
          </CardContainer>
        )}
        {middle?.length ? (
          <CardSet futureBoxes={middle} priority={2} />
        ) : (
          <CardContainer priority={2} index={0}>
            <span className="text-secondary mr-4 p-4 text-2xl">우선순위 중급</span>
          </CardContainer>
        )}
        {low?.length ? (
          <CardSet futureBoxes={low} priority={3} />
        ) : (
          <CardContainer priority={3} index={0}>
            <span className="text-success mr-4 p-4 text-2xl">우선순위 하급</span>
          </CardContainer>
        )}
      </div>
    </>
  );
}
