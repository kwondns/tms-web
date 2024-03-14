import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';

import ThemeButton from '@/components/ThemeButton';
import { AuthAtom } from '@/stores/auth.store';
import Menu from '@/components/Menu';
import { themeAtom } from '@/stores/theme.store';

export default function Header() {
  const isAuthed = useRecoilValue(AuthAtom);
  const theme = useRecoilValue(themeAtom);
  return (
    <header className="fixed inset-x-4 top-4 z-10 flex items-center justify-between bg-[hsl(var(--background))] px-4">
      <Link className="font-Kanit flex cursor-pointer items-center gap-x-1.5 text-3xl" to="/dashboard">
        <img src={`${theme === 'dark' ? '/tms-logo-nonbg.svg' : '/tms-logo.svg'}`} alt="logo" className="size-10" />
        TMS
      </Link>
      {isAuthed && <Menu />}
      <ThemeButton />
    </header>
  );
}
