import PortFolioStack from '@/pages/PortFolio/PortFolioStack';
import PortFolioNewProject from '@/pages/PortFolio/PortFolioNewProject';
import Dashboard from '@/pages/Dashboard';

export default {
  '/dashboard': <Dashboard />,
  '/portfolio/profile': <div />,
  '/portfolio/stack': <PortFolioStack />,
  '/portfolio/project/new': <PortFolioNewProject />,
  '/portfolio/project': <div />,
  '/timeline/past': <div />,
  '/timeline/present': <div />,
  '/timeline/future': <div />,
  '/blog/new': <div />,
};
