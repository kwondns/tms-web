import { useRecoilValue, useSetRecoilState } from 'recoil';

import { themeSelector, themeAtom } from '@/stores/theme.store';
import { Button } from '@/components/ui/button';

export default function ThemeButton() {
  const theme = useRecoilValue(themeSelector);
  const setTheme = useSetRecoilState(themeAtom);
  const onClick = () =>
    setTheme((prevState) => {
      if (prevState === 'light') return 'dark';
      return 'light';
    });
  return (
    <Button variant="outline" size="icon" onClick={onClick}>
      {theme}
    </Button>
  );
}
