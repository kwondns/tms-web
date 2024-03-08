import { useRecoilValue } from 'recoil';

import ThemeButton from '@/components/ThemeButton';
import { AuthAtom } from '@/stores/auth.store';
import Menu from '@/components/Menu';

export default function Header() {
  const isAuthed = useRecoilValue(AuthAtom);
  return (
    <header className="fixed inset-x-4 top-4 z-10 flex items-center justify-between bg-[hsl(var(--background))] px-4">
      <span className="font-Kanit text-3xl">TMS</span>
      {isAuthed && <Menu />}
      <ThemeButton />
    </header>
  );
}
