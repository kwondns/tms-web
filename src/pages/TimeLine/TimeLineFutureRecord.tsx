import { useGetFutureHigh, useGetFutureLow, useGetFutureMiddle } from '@/hooks/TimeLine/useFuture';
import TimeLineFutureTemplate from '@/templates/TimeLine/TimeLineFuture.Template';

export default function TimeLineFutureRecord() {
  const { data: highData } = useGetFutureHigh(true);
  const { data: middleData } = useGetFutureMiddle(true);
  const { data: lowData } = useGetFutureLow(true);
  const data = { high: highData, middle: middleData, low: lowData };
  return <TimeLineFutureTemplate data={data} />;
}
