import ThemeButton from '@/components/ThemeButton';

export default function Header() {
  return (
    <header className="fixed inset-x-4 top-4 flex items-center justify-between px-4">
      <span className="font-Kanit text-3xl">TMS</span>
      <ThemeButton />
    </header>
  );
}
