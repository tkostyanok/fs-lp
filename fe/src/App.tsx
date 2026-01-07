import loadable from '@loadable/component';
import { Route, Routes } from 'react-router';

import { AppLayout } from './layouts';

const Home = loadable(() => import('./pages/Home'));
const NotFound = loadable(() => import('./pages/NotFound'));
const TestPage1 = loadable(() => import('./pages/TestPage1'));
const TestPage2 = loadable(() => import('./pages/TestPage2'));

const App = () => {
  const RoutesComponents = () => {
    return (
      <Routes>
        <Route index element={<Home />} />
        <Route path='/mui-tables' element={<TestPage1 />} />
        <Route path='/test-page-2' element={<TestPage2 />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    );
  };
  return (
	  <AppLayout>
      <RoutesComponents />
	  </AppLayout>
  );
};

export default App;