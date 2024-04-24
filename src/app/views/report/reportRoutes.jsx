import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const PickupReport = Loadable(lazy(() => import('./pickup/pickupReport')));
const ShipmentReport = Loadable(lazy(() => import('./shipment/shipmentReport')));
const Dta_EntryReport = Loadable(lazy(() => import('./data_entry/data_entryReport')));
const Delivery_BoyReport = Loadable(lazy(() => import('./delivery_boy/delivery_boyReport')));
const Test = Loadable(lazy(() => import('./Test')));
const reportRoutes = [
  {// here
    path: '/report/pickup',
    element: <PickupReport/>,
  }, 
    {// here
      path: '/report/shipment',
      element: <ShipmentReport/>,
    },   {// here
      path: '/report/data_entry',
      element: <Dta_EntryReport/>,
    }, 
	{// here
      path: '/report/delivery_boy',
      element: <Delivery_BoyReport/>,
    }, 
    {// here
      path: '/report/test',
      element: <Test/>,
    }
];

export default reportRoutes;
