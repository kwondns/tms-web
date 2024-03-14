import { useGetFutureHigh, useGetFutureLow, useGetFutureMiddle } from '@/hooks/TimeLine/useFuture';
import TimeLineFutureTemplate from '@/templates/TimeLine/TimeLineFuture.Template';

export default function TimeLineFuture() {
  const { data: highData } = useGetFutureHigh();
  const { data: middleData } = useGetFutureMiddle();
  const { data: lowData } = useGetFutureLow();
  const data = { high: highData, middle: middleData, low: lowData };
  return <TimeLineFutureTemplate data={data} />;
}
