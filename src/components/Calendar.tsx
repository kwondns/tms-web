import { MouseEvent, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { PastAtom, PastDataAtom, PastSelector } from '@/stores/TimeLine/past.store';
import { makeLocaleDate } from '@/lib/date';

export default function Calendar() {
  const today = new Date();
  const current = useRecoilValue(PastAtom);
  const prev = useRecoilValue(PastSelector);
  const data = useRecoilValue(PastDataAtom);
  const navigate = useNavigate();

  const generateCalendar = (startDate: Date) => {
    const calArr = [];
    for (let week = 0; week < 6; week++) {
      const weekArr = [];
      for (let day = 0; day < 7; day++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + week * 7 + day);
        weekArr.push(date);
      }
      calArr.push(weekArr);
    }
    return calArr;
  };

  const calendarArray = useMemo(() => generateCalendar(prev), [current]);

  const onClickTitle = (event: MouseEvent<HTMLSpanElement>) => {
    const { id } = event.currentTarget;
    const [week, day] = id.split('.');
    const target = calendarArray[Number(week)][Number(day)];
    navigate(`/timeline/past/${makeLocaleDate(target)}`);
  };

  return (
    <table className="grid h-full max-h-full grid-rows-[auto_1fr]">
      <thead className="">
        <tr className="grid grid-cols-7 text-lg">
          <th>일</th>
          <th>월</th>
          <th>화</th>
          <th>수</th>
          <th>목</th>
          <th>금</th>
          <th>토</th>
        </tr>
      </thead>
      <tbody className="grid grid-rows-6">
        {calendarArray.map((week, weekIndex) => (
          <tr className="grid grid-cols-7" key={`${weekIndex} 주`}>
            {week.map((day, dayIndex) => {
              const titleIndex = weekIndex * 7 + dayIndex;
              return (
                <td className="border align-text-top" key={day.getTime()}>
                  <span
                    className={`${day.getMonth() === current.getMonth() ? 'text-lg' : 'text-accent'} ${day.toDateString() === today.toDateString() && '!text-2xl text-sky-300'}`}
                  >
                    {day.getDate() === 1 ? `${day.getMonth() + 1}월 ${day.getDate()}일` : `${day.getDate()}일`}
                  </span>
                  <div className="overflow-auto">
                    {data
                      ? data[titleIndex]?.titles?.map((title, titleIndex) => (
                          <span
                            key={`${data[titleIndex].date}_${data[titleIndex].id}_${title}`}
                            id={`${weekIndex}.${dayIndex}.${titleIndex}.${data[titleIndex].count}`}
                            onClick={onClickTitle}
                            className="mb-1.5 block cursor-pointer"
                          >
                            {title}
                          </span>
                        ))
                      : null}
                  </div>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
