import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Auth from '@/pages/Auth';
import Layout from '@/pages/Layout';
import Dashboard from '@/pages/Dashboard';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000 * 100,
      retry: 1,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, caseSensitive: true, element: <Auth /> },
      { path: 'dashboard', element: <Dashboard /> },
    ],
  },
]);
export default function Router() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
