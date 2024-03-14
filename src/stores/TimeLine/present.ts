import { atom, AtomEffect, selector } from 'recoil';

import { fromDate } from '@/lib/date';

export const MarkdownAtom = atom({
  key: 'markdownAtom',
  default: '',
});

export const TitleAtom = atom({
  key: 'titleAtom',
  default: '',
});

const CurrentTimeEffect =
  (): AtomEffect<Date> =>
  ({ setSelf }) => {
    const now = new Date();
    const timeUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    // 정각에 맞춰 첫 업데이트를 실행
    const timeoutId = setTimeout(() => {
      setSelf(new Date());

      // 그 후 1분마다 업데이트
      const intervalId = setInterval(() => {
        setSelf(new Date());
      }, 60 * 1000);

      return () => clearInterval(intervalId);
    }, timeUntilNextMinute);

    return () => clearTimeout(timeoutId);
  };
export const CurrentTimeAtom = atom({
  key: 'currentTimeAtom',
  default: new Date(),
  effects: [CurrentTimeEffect()],
});
export const StartTimeAtom = atom<Date | null>({
  key: 'startTimeAtom',
  default: null,
});

export const StartTimeSelector = selector({
  key: 'startTimeSelector',
  get: ({ get }) => {
    const startTime = get(StartTimeAtom);
    if (startTime) return startTime.toISOString();
    return '';
  },
});

export const EndTimeAtom = atom<Date | null>({
  key: 'endTimeAtom',
  default: null,
});
export const EndTimeSelector = selector({
  key: 'endTimeSelector',
  get: ({ get }) => {
    const endTime = get(EndTimeAtom);
    if (endTime) return endTime.toISOString();
    return '';
  },
});
export const DiffTimeAtom = atom<string | null>({
  key: 'diffTimeAtom',
  default: null,
});

export const DiffTimeSelector = selector({
  key: 'diffTimeSelector',
  get: ({ get }) => {
    const startTime = get(StartTimeAtom);
    const endTime = get(EndTimeAtom);
    const currentTime = get(CurrentTimeAtom);
    if (startTime) {
      if (endTime) {
        return fromDate(startTime, endTime);
      }
      return fromDate(startTime, currentTime);
    }
    return '';
  },
});
