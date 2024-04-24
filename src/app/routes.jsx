import AuthGuard from 'app/auth/AuthGuard';
import chartsRoute from 'app/views/charts/ChartsRoute';
import courierRoutes from 'app/views/courier/CourierRoutes';
import billingRoutes from 'app/views/billing/BillingRoutes';
import issueRoutes from 'app/views/issue/BillingRoutes';
import dashboardRoutes from 'app/views/dashboard/DashboardRoutes';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';
import reportRoutes from 'app/views/report/reportRoutes';
import NotFound from 'app/views/sessions/NotFound';
import sessionRoutes from 'app/views/sessions/SessionRoutes';
import { Navigate } from 'react-router-dom';
import MatxLayout from './components/MatxLayout/MatxLayout';
const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [...issueRoutes, ...billingRoutes, ...dashboardRoutes, ...chartsRoute, ...materialRoutes, ...courierRoutes, ...reportRoutes],
  },
  ...sessionRoutes,
  { path: '/', element: <Navigate to="dashboard/default" /> },
  { path: '*', element: <NotFound /> },
];

export default routes;
