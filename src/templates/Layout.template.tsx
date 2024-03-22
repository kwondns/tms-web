import { Outlet } from 'react-router-dom';

import Header from '@/components/Header';

export default function LayoutTemplate() {
  return (
    <div className="flex min-h-screen w-screen">
      <Header />
      <main className="max-w-[100vw] flex-1 px-8 pt-[72px]">
        <Outlet />
      </main>
    </div>
  );
}
