import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const Billing = Loadable(lazy(() => import('./Billing')));
 

const courierRoutes = [
  {// here
    path: '/issue',
    element: <Billing />,
  }, 
];

export default courierRoutes;
