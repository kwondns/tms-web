import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';

import route from '@/constants/route.constant';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000 * 100,
      retry: 1,
    },
  },
});

const router = createBrowserRouter(route);

export default function Router() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Suspense fallback={<span>loading...</span>}>
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  );
}
