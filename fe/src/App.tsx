import loadable from '@loadable/component';
import { Route, Routes } from 'react-router';

import { AppLayout } from './layouts';

const Home = loadable(() => import('./pages/Home'));
const NotFound = loadable(() => import('./pages/NotFound'));
const AntDesign = loadable(() => import('./pages/AntDesign'));

const MaterialUI = loadable(() => import('./pages/MaterialUI'));
const MuiTable= loadable(() => import('./pages/MaterialUI/components/Organisms/MuiTable'));
const MuiCards= loadable(() => import('./pages/MaterialUI/components/Organisms/MuiCards'));

const App = () => {
  const RoutesComponents = () => {
    return (
      <Routes>
        <Route index element={<Home />} />

        <Route element={<MaterialUI />} >
          <Route path='/material-ui/table' element={<MuiTable />} />
          <Route path='/material-ui/cards' element={<MuiCards />} />
        </Route>

        <Route path='/ant-design' element={<AntDesign />} />
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