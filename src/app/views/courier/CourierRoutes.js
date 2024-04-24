import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const NewPickup = Loadable(lazy(() => import('./new-pickup/NewPickup')));
const NewBooking = Loadable(lazy(() => import('./new-booking/NewBooking')));
const SearchUpdate = Loadable(lazy(() => import('./search-update-pickup/SearchUpdate')));
const QuickUpdate = Loadable(lazy(() => import('./quick-update-pickup/SearchUpdate')));
const ScanPod = Loadable(lazy(() => import('./scan-pod/SearchUpdate')));
const CurrentStock = Loadable(lazy(() => import('./stock/BranchStock')));

const courierRoutes = [
  {// here
    path: '/courier/new-pickup',
    element: <NewPickup />,
  }, 
    {// here
    path: '/courier/new-booking',
    element: <NewBooking />,
  }, 
    {// here
      path: '/courier/search-update-pickup',
      element: <SearchUpdate />,
    }, 
    {// here
      path: '/courier/quick-update-pickup',
      element: <QuickUpdate />,
    }
    , 
    {// here
      path: '/courier/pod-upload',
      element: <ScanPod />,
    }
    , 
    {// here
      path: '/courier/stock-branch',
      element: <CurrentStock />,
    }
];

export default courierRoutes;
