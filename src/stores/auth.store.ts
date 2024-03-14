import { atom, AtomEffect } from 'recoil';

const AuthEffect =
  (key: string): AtomEffect<string> =>
  ({ setSelf, onSet }) => {
    const storageValue = localStorage.getItem(key);
    if (storageValue !== null) {
      setSelf(JSON.parse(storageValue));
    }
    onSet((newValue, _, isReset) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };
export const AuthAtom = atom<string>({
  key: 'access_token',
  default: localStorage.getItem('accessToken') ?? '',
  effects: [AuthEffect('accessToken')],
});
