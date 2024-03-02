import PortFolioStack from '@/pages/PortFolio/PortFolioStack';
import PortFolioNewProject from '@/pages/PortFolio/PortFolioNewProject';
import Dashboard from '@/pages/Dashboard';
import PortFolioProjectBoard from '@/pages/PortFolio/PortFolioProjectBoard';
import PortfolioEditProject from '@/pages/PortFolio/PortfolioEditProject';

export default {
  '/dashboard': <Dashboard />,
  '/portfolio/stack': <PortFolioStack />,
  '/portfolio/project/new': <PortFolioNewProject />,
  '/portfolio/project': <PortFolioProjectBoard />,
  '/portfolio/project/:id': <PortfolioEditProject />,
  '/timeline/past': <div />,
  '/timeline/present': <div />,
  '/timeline/future': <div />,
  '/blog/new': <div />,
};
