import { useRecoilState } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';

import Calendar from '@/components/Calendar';
import { PastAtom } from '@/stores/TimeLine/past.store';
import { Button } from '@/components/ui/button';
import { GetFetch } from '@/lib/fetch';
import { PastCountType } from '@/types/TimeLine/past.type';

export default function TimeLinePastTemplate() {
  const today = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const [current, setCurrent] = useRecoilState(PastAtom);
  const onClickToday = () => setCurrent(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const queryClient = useQueryClient();
  const prefetch = (targetMonth: Date) => {
    queryClient.prefetchQuery({
      queryKey: ['past', 'calendar', targetMonth],
      queryFn: async () => GetFetch<PastCountType[]>(`time/past/calendar/${targetMonth}`),
    });
  };

  const makePreviousMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), -date.getDay() + 1);
  const onHoverPrevMonth = () => {
    prefetch(makePreviousMonth(new Date(current.getFullYear(), current.getMonth() - 1, 1)));
  };
  const onClickPrevMonth = () => {
    setCurrent((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };
  const onClickNextMonth = () => {
    setCurrent((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };
  const onHoverNextMonth = () => {
    prefetch(makePreviousMonth(new Date(current.getFullYear(), current.getMonth() + 1, 1)));
  };
  return (
    <div className="grid size-full grid-rows-[auto_1fr] overflow-auto">
      <div className="flex items-baseline justify-center gap-x-4">
        <Button
          variant="ghost"
          className="rounded-full text-xl"
          onClick={onClickPrevMonth}
          onMouseEnter={onHoverPrevMonth}
        >
          &lt;
        </Button>
        <span>
          {`${current.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })}`}
          {current.toDateString() !== today.toDateString() && (
            <Button variant="link" onClick={onClickToday}>
              오늘 보기
            </Button>
          )}
        </span>
        <Button variant="ghost" className="text-xl" onClick={onClickNextMonth} onMouseEnter={onHoverNextMonth}>
          &gt;
        </Button>
      </div>
      <Calendar />
    </div>
  );
}
