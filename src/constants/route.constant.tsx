import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import Layout from '@/pages/Layout';
import Auth from '@/pages/Auth';

const DashBoard = lazy(() => import('pages/Dashboard'));
const PortFolioStack = lazy(() => import('pages/PortFolio/PortFolioStack'));
const PortFolioNewProject = lazy(() => import('pages/PortFolio/PortFolioNewProject'));
const PortFolioProjectBoard = lazy(() => import('pages/PortFolio/PortFolioProjectBoard'));
const PortFolioEditProject = lazy(() => import('pages/PortFolio/PortfolioEditProject'));
const TimeLinePast = lazy(() => import('@/pages/TimeLine/TimeLinePast'));
const TimeLineEditPast = lazy(() => import('@/pages/TimeLine/TimeLineEditPast'));
const TimeLinePresent = lazy(() => import('@/pages/TimeLine/TimeLinePresent'));
const TimeLineFuture = lazy(() => import('pages/Dashboard'));
const BlogNewPost = lazy(() => import('pages/Dashboard'));
export const route: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        caseSensitive: true,
        element: <Auth />,
      },
      { path: '/dashboard', element: <DashBoard /> },
      { path: '/portfolio/stack', element: <PortFolioStack /> },
      { path: '/portfolio/project/new', element: <PortFolioNewProject /> },
      { path: '/portfolio/project', element: <PortFolioProjectBoard /> },
      { path: '/portfolio/project/:id', element: <PortFolioEditProject /> },
      { path: '/timeline/past', element: <TimeLinePast /> },
      { path: '/timeline/past/:date', element: <TimeLineEditPast /> },
      { path: '/timeline/present', element: <TimeLinePresent /> },
      { path: '/timeline/future', element: <TimeLineFuture /> },
      { path: '/blog/new', element: <BlogNewPost /> },
    ],
  },
];

export default route;
