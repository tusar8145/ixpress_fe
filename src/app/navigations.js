export const navigations = [
  { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },


    
  { label: 'Documents', type: 'label' },
  {
    name: 'Courier Manage',
    icon: 'assistant',
    children: [
      { name: 'Stock Branch', icon: 'format_italic', path: '/courier/stock-branch' },
      { name: 'New Pickup', icon: 'format_italic', path: '/courier/new-pickup' },
	  { name: 'New Booking', icon: 'format_italic', path: '/courier/new-booking' },
      { name: 'Search & Status', icon: 'format_italic', path: '/courier/search-update-pickup' },
      { name: 'Quick Update', icon: 'format_italic', path: '/courier/quick-update-pickup' },
      { name: 'POD Upload', icon: 'format_italic', path: '/courier/pod-upload' },],
  },
 /* {
    name: 'Test',
    icon: 'assistant',
    children: [
      { name: 'Test', icon: 'format_italic', path: '/material/test' },
    ], { name: 'test', icon: 'format_italic', path: '/report/test' },
  },*/ 
 

  {
    name: 'Billing',
    icon: 'attach_money', 
    path: '/billing',
  },


  {
    name: 'Issue',
    icon: 'brush',
    path: '/issue',
  },

  {
    name: 'All Report',
    icon: 'trending_up',
    children: [
      { name: 'Pickup Report', icon: 'format_italic', path: '/report/pickup' },
      { name: 'Shipment Report', icon: 'format_italic', path: '/report/shipment' },
      { name: 'DataEntry Report', icon: 'format_italic', path: '/report/data_entry' },
	   { name: 'Delivery Boy', icon: 'format_italic', path: '/report/delivery_boy' },
    ],
  },





  { label: 'Settings', type: 'label' },


  {
    name: 'Setup & Configuration',
    icon: 'launch',
    type: 'extLink',
    path: process.env.REACT_APP_BACKOFFICE_URL,
  },


  /*{ label: 'PAGES', type: 'label' },

  {
    name: 'Session/Auth',
    icon: 'security',
    children: [
      { name: 'Sign in', iconText: 'SI', path: '/session/signin' },
      { name: 'Sign up', iconText: 'SU', path: '/session/signup' },
      { name: 'Forgot Password', iconText: 'FP', path: '/session/forgot-password' },
      { name: 'Error', iconText: '404', path: '/session/404' },
    ],
  },
  
  {
    name: 'Components',
    icon: 'favorite',
    badge: { value: '30+', color: 'secondary' },
    children: [
      { name: 'Auto Complete', path: '/material/autocomplete', iconText: 'A' },
      { name: 'Buttons', path: '/material/buttons', iconText: 'B' },
      { name: 'Checkbox', path: '/material/checkbox', iconText: 'C' },
      { name: 'Dialog', path: '/material/dialog', iconText: 'D' },
      { name: 'Expansion Panel', path: '/material/expansion-panel', iconText: 'E' },
      { name: 'Form', path: '/material/form', iconText: 'F' },
      { name: 'Icons', path: '/material/icons', iconText: 'I' },
      { name: 'Menu', path: '/material/menu', iconText: 'M' },
      { name: 'Progress', path: '/material/progress', iconText: 'P' },
      { name: 'Radio', path: '/material/radio', iconText: 'R' },
      { name: 'Switch', path: '/material/switch', iconText: 'S' },
      { name: 'Slider', path: '/material/slider', iconText: 'S' },
      { name: 'Snackbar', path: '/material/snackbar', iconText: 'S' },
      { name: 'Table', path: '/material/table', iconText: 'T' },
    ],
  },

  {
    name: 'Charts',
    icon: 'trending_up',
    children: [{ name: 'Echarts', path: '/charts/echarts', iconText: 'E' }],
  },*/

];
