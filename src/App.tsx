import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Router from '@/router';

function App() {
  return (
    <RecoilRoot>
      <ToastContainer pauseOnFocusLoss={false} />
      <Router />
    </RecoilRoot>
  );
}

export default App;
