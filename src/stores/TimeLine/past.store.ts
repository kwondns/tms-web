import { atom, selector } from 'recoil';

import { makePreviousMonth } from '@/lib/date';
import { PastCountType } from '@/types/TimeLine/past.type';

export const PastAtom = atom({
  key: 'pastAtom',
  default: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
});

export const PastSelector = selector({
  key: 'pastSelector',
  get: ({ get }) => {
    const past = get(PastAtom);
    const firstDay = past.getDay();
    return makePreviousMonth(past, firstDay);
  },
});

export const PastDataAtom = atom<PastCountType[]>({
  key: 'pastDataAtom',
  default: undefined,
});
