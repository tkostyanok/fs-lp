import {
  Route, Routes 
} from 'react-router';

import loadable from '@loadable/component';

import { AppLayout } from './layouts';

const Home = loadable(() => import('./pages/Home'));
const NotFound = loadable(() => import('./pages/NotFound'));
const AntDesign = loadable(() => import('./pages/AntDesign'));

/** Material UI */
const MaterialUI = loadable(() => import('./pages/MaterialUI'));
const MuiTable= loadable(() => import('./pages/MaterialUI/components/Organisms/MuiTableDashboard'));
const MuiCards= loadable(() => import('./pages/MaterialUI/components/Organisms/MuiCards'));

/** Ant Design */
const NutritionistDashboard = loadable(() => import('./pages/AntDesign/components/Organisms/NutritionistDashboard'));
const NutritionistPatients = loadable(() => import('./pages/AntDesign/components/Organisms/NutritionistPatients'));
const NutritionistCalendar = loadable(() => import('./pages/AntDesign/components/Organisms/NutritionistCalendar'));
const NutritionistChat = loadable(() => import('./pages/AntDesign/components/Organisms/NutritionistChat'));
const NutritionistSettings = loadable(() => import('./pages/AntDesign/components/Organisms/NutritionistSettings'));
const ClientDashboard = loadable(() => import('./pages/AntDesign/components/Organisms/ClientDashboard'));
const AdminDashboard = loadable(() => import('./pages/AntDesign/components/Organisms/AdminDashboard'));


const App = () => {
  return (
    <AppLayout>
      <Routes>
        <Route index element={<Home />} />

        <Route element={<MaterialUI />}>
          <Route path='/material-ui/table' element={<MuiTable />} />
          <Route path='/material-ui/cards' element={<MuiCards />} />
        </Route>

        <Route element={<AntDesign />}>
          {/* Nutritionist routes */}
          <Route path='/ant-design/nutritionist/dashboard' element={<NutritionistDashboard />} />
          <Route path='/ant-design/nutritionist/patients' element={<NutritionistPatients />} />
          <Route path='/ant-design/nutritionist/appointments' element={<NutritionistCalendar />} />
          <Route path='/ant-design/nutritionist/chat' element={<NutritionistChat />} />
          <Route path='/ant-design/nutritionist/settings' element={<NutritionistSettings />} />
          {/* Client routes */}
          <Route path='/ant-design/client/dashboard' element={<ClientDashboard />} />
          {/* Admin routes */}
          <Route path='/ant-design/admin/dashboard' element={<AdminDashboard />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </AppLayout>
  );
};

export default App;