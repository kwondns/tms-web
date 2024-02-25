import { Outlet } from 'react-router-dom';

import Header from '@/components/Header';

export default function LayoutTemplate() {
  return (
    <div className="flex h-screen w-screen">
      <Header />
      <main className="flex-1 px-8 pt-[56px]">
        <Outlet />
      </main>
    </div>
  );
}
