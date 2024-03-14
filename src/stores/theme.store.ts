import { atom, AtomEffect, selector } from 'recoil';

import ThemeSVG from '@/components/ThemeSVG';

const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const setTheme = (value: 'light' | 'dark') => {
  if (value === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

const localStorageEffect =
  (key: string): AtomEffect<string> =>
  ({ setSelf, onSet }) => {
    const storageValue = localStorage.getItem(key);
    if (storageValue !== null) {
      setSelf(JSON.parse(storageValue));
      setTheme(JSON.parse(storageValue) as 'light' | 'dark');
    } else {
      localStorage.setItem(key, JSON.stringify(systemTheme));
      setTheme(systemTheme);
    }
    onSet((newValue, _, isReset) => {
      setTheme(newValue as 'light' | 'dark');
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const themeAtom = atom({
  key: 'theme',
  default: localStorage.getItem('theme') ?? systemTheme,
  effects: [localStorageEffect('theme')],
});

export const themeSelector = selector({
  key: 'themeSelector',
  get: ({ get }) => {
    const currentTheme = get(themeAtom);
    if (currentTheme === 'light') return ThemeSVG.light;
    return ThemeSVG.dark;
  },
});
