 
/*Imports---------(1)*/
  
 
 
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Box, Button, Card, Grid, Icon, IconButton, styled } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import { DataGrid, GridApi, GridCellValue, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { DatePicker } from 'antd';
import { Span } from 'app/components/Typography';
import useAuth from 'app/hooks/useAuth';
import axios from "axios";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import * as React from 'react';
import { useEffect, useRef, useState, ChangeEvent, } from 'react';
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import * as XLSX from "xlsx";
import { base_url, business_address, business_email, business_web } from '../../../utils/constant';
import InvoiceBulk from "./_InvoiceBulk";
import UpdateStatus from "./_UpdateStatus";
 

import CloseIcon from '@mui/icons-material/Close';
 
import Dialog from '@mui/material/Dialog';
 
import MuiDialogActions from '@mui/material/DialogActions';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogTitle from '@mui/material/DialogTitle';
 
import Typography from '@mui/material/Typography';
import Barcode from 'react-barcode';
import ReactToPrint from 'react-to-print';

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import TablePagination from '@mui/material/TablePagination';
import ReactLoading from 'react-loading';


dayjs.extend(customParseFormat);
const ExpansionPanel = styled(Accordion)(() => ({ "&.root": { boxShadow: "none", border: "1px solid rgba(0, 0, 0, .125)", "&:not(:last-child)": { borderBottom: 0 }, "&:before": { display: "none" }, "&$expanded": { margin: "auto" }, },}));const ExpansionPanelSummary = styled(AccordionSummary)({ "&.root": { minHeight: 56, marginBottom: -1, backgroundColor: "rgba(0, 0, 0, .03)", borderBottom: "1px solid rgba(0, 0, 0, .125)", "&$expanded": { minHeight: 56 }, }, "& .content": { "&$expanded": { margin: "12px 0" } },});const ExpansionPanelDetails = styled(AccordionDetails)(({ theme }) => ({ "&.root": { padding: theme.spacing(2) },}));

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const Alert = React.forwardRef(function Alert(props, ref) { return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;});
const TextField = styled(TextValidator)(() => ({ width: "100%", marginBottom: "16px", }));
const {format} = require('date-fns');
 
axios.defaults.headers.common['accessToken'] =  'JWT '+window.localStorage.getItem('accessToken');

export default function AddPodForm() {
    const inputReference = useRef(null);
/*------------------------------------------State-------------------------------------------------*/
const [i_delivery_status_count, seti_delivery_status_count] = useState(null);
const [invoice_print, setinvoice_print] = useState(null);
const [show_counts_all, setshow_counts_all] = useState(0);
 
const [show_counts, setshow_counts] = useState(0);
const [show_counts1, setshow_counts1] = useState(0);
const [show_counts2, setshow_counts2] = useState(0);
const [show_counts3, setshow_counts3] = useState(0);

const [range_start, setrange_start] = useState(null);
const [range_end, setrange_end] = useState(null);
const [status_update_restrict, setstatus_update_restrict] = useState(0);
const [status_receive_restrict, setstatus_receive_restrict] = useState(0);



const [status_update_restrict_4, setstatus_update_restrict_4] = useState(false);
const [status_update_restrict_5, setstatus_update_restrict_5] = useState(false);
const [status_update_restrict_3, setstatus_update_restrict_3] = useState(false);
const [status_update_restrict_6, setstatus_update_restrict_6] = useState(false);
const [status_update_restrict_7, setstatus_update_restrict_7] = useState(false);
const [status_update_restrict_8, setstatus_update_restrict_8] = useState(false);
const [status_update_restrict_9, setstatus_update_restrict_9] = useState(false);
const [status_update_restrict_10, setstatus_update_restrict_10] = useState(false);


const [previous_delivery_status, setprevious_delivery_status] = useState(null);

const [updatenow, setupdatenow] = useState(0);
const [invoice, setinvoice] = useState(null);
const [otp_allow, setotp_allow] = useState(0);
const [setready_otp_ok, setsetready_otp_ok] = useState(0);
const [selected_rows, setselected_rows] = useState([]);

//services_id_1
const [servicesList, setservicesList] = useState([]);

//i_product_type_id_2
const [i_product_type_id, seti_product_type_id] = useState(null);
const [i_product_typeList, seti_product_typeList] = useState([]);
const [i_product_typeList_filtered, seti_i_product_typeList_filtered] = useState([]);
const [i_priorityList, seti_priorityList] = useState([]);

//i_payment_type_8
const [i_payment_typeList, seti_payment_typeList] = useState([]);

//sender_client_id_7 recipient_client_id_22
const [services_clientsList, setservices_clientsList] = useState([]);
const [services_clientsList_filtered, setservices_clientsList_filtered] = useState([]);
const [services_clients_branchList, setservices_clients_branchList] = useState([]);  

//pickup_type_2
const [i_packaging_typeList, seti_packaging_typeList] = useState([]);
const [i_packaging_typeList_filtered, seti_packaging_typeList_filtered] = useState([]);

const [i_shipment_methodList, seti_shipment_methodList] = useState([]);  
const [i_delivery_statusList, seti_delivery_statusList] = useState([]);  
const [i_tracking_statusList, seti_tracking_statusList] = useState([]);  
const [i_sms_templateList, seti_sms_templateList] = useState([]);
const [i_sms_template_id, seti_sms_template_id] = useState([]);

const [i_zoneList, seti_zoneList] = useState([]);  

//SenderRecipient
const [zone_countriesList, setzone_countriesList] = useState([]);
const [zone_districtsList, setzone_districtsList] = useState([]);
const [zone_divisionsList, setzone_divisionsList] = useState([]);
const [zone_upazilasList, setzone_upazilasList] = useState([]);
const [branchList, setbranchList] = useState([]); 
const [delivery_boyList, setdelivery_boyList] = useState([]); 
const [i_relationList, seti_relationList] = useState([]);
const [i_return_causeList, seti_return_causeList] = useState([]);

const [sender_category_1, setsender_category_1] = React.useState("corporate_sender");  


/*Flags*/
const [switch_have_collection, setswitch_have_collection] = useState(0);
const [switch_data_submitted, setswitch_data_submitted] = useState(0);
const [switch_xlsx_active, setswitch_xlsx_active] = useState(0);
const [alert_def_txt, setalert_def_txt] = useState('Data Submitted Successfully!');
const [alert_def_class, setalert_def_class] = useState('success');
const [otp_write, setotp_write] = useState(null);
const [count_xlsx_item, setcount_xlsx_item] = useState(0);
const [open, setOpen] = React.useState(false);
const [json_upload, setjson_upload] = useState(null);
const [show_error, setshow_error] = useState(0);
const [active_global_search, setactive_global_search] = React.useState(0);


const [get_search_data, setget_search_data] = useState([]);
const [first_id_get_search_data, setfirst_id_get_search_data] = useState(null);
const [get_search_data_tracking, setget_search_data_tracking] = useState([]);

const [id_collection, setid_collection] = useState(null);
const [id_single, setid_single] = useState(null);


/*firstpage*/
const [firstpage, setfirstpage] = useState({ services_id: null, i_product_type_id: null, i_priority_id: null, i_payment_type:null });

/*cost*/
const [state, setState] = useState({username:'tusara',total_cost:'0',overwriting_cost:'0', total_cost:'0',collection_amount:'0',});   
const {overwriting_cost, total_cost, collection_amount, is_track_web, } = state;
const [processing, setprocessing] = useState(0);
const [shipped, setshipped] = useState(0);
const [in_transit, setin_transit] = useState(0);
const [hold, sethold] = useState(0);
const [out_for_deli, setout_for_deli] = useState(0);
const [exception, setexception] = useState(0);
const [return_process, setreturn_process] = useState(0);
const [booking, setbooking] = useState(0);
const [expanded, setExpanded] = React.useState("panel1");
const [checked, setChecked] = React.useState(true);
const [popupOpen, setpopupOpen] = useState(false);
const [hideotp, sethideotp] =useState(0);
const [product_info_json, setproduct_infoForm]= useState([{qty:"", remarks:"", fixed_cost:"", weight:"", dimension:"", }])
const [popupPrintOpen, setpopupPrintOpen] = useState(false);
const [search_count, setsearch_count] = useState(0);

  
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(20);
const [count_search, setcount_search] = useState(0);
const [loading,setloading] = useState(0);
const [branch_error,setbranch_error]  = useState(0);
const [force_print8,setforce_print8]  = useState(0);


const [ready_to,setready_to]  = useState(null);

const [loading_pod,setloading_pod]  = useState(0);

///filemanage
 
 

  const handleChangePage = (event, newPage) => {
    //setloading(1)
    setPage(newPage);
    //console.log(newPage,'newPage')
    handleSubmit()
    //setloading(0)
  };

  const handleChangeRowsPerPage = (event) => {
    //setloading(1)
    
    if(event.target.value>count_search){
      setRowsPerPage(count_search);
    }else{
      setRowsPerPage(parseInt(event.target.value));
    }
    //setloading(0)
    setPage(0);

    //console.log(parseInt(event.target.value, 20),'RowsPerPage')
  };

 
  useEffect(() => {
    if(count_search!=0){
      handleSubmit()
    }
    
  }, [rowsPerPage,page]);

  function removeDuplicates(arr) {
    return arr.filter((item,
        index) =>arr.indexOf(item) === index && item>0);
}
  //system variables
  const { logout, user } = useAuth();
  const SenderRecipientRef=useRef();
  const SenderRecipientRef2=useRef();
  const InvoiceBulkRef=useRef();

 
 //date
  const { RangePicker } = DatePicker;
  const dateFormat = 'YYYY-MM-DD';
  const {format} = require('date-fns');
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  const StyledCard = styled(Card)(({ theme }) => ({ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', padding: '24px !important', background: theme.palette.background.paper, [theme.breakpoints.down('sm')]: { padding: '16px !important' }, }));
  const ContentBox = styled(Box)(({ theme }) => ({ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& small': { color: theme.palette.text.secondary }, '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main }, }));
  const Heading = styled('h6')(({ theme }) => ({ margin: 0, marginTop: '4px', fontSize: '14px', fontWeight: '500', color: theme.palette.primary.main, }));

  const DialogTitleRoot = styled(MuiDialogTitle)(({ theme }) => ({ margin: 0, padding: theme.spacing(2), '& .closeButton': { position: 'absolute', right: theme.spacing(1), top: theme.spacing(1), color: theme.palette.grey[500], }, }));
  const DialogTitle = (props) => { const { children, onClose } = props; return ( <DialogTitleRoot disableTypography> <Typography variant="h6">{children}</Typography> {onClose ? ( <IconButton aria-label="Close" className="closeButton" onClick={onClose}> <CloseIcon /> </IconButton> ) : null} </DialogTitleRoot> ); };
  const DialogContent = styled(MuiDialogContent)(({ theme }) => ({ '&.root': { padding: theme.spacing(2) }, }));
  const DialogActions = styled(MuiDialogActions)(({ theme }) => ({ '&.root': { margin: 0, padding: theme.spacing(1) }, }));
  const popupClickOpen = () => setpopupOpen(true);
  const popupClose = () => setpopupOpen(false);
  const popupPrintClickOpen = () => setpopupPrintOpen(true);
  const popupPrintClose = () => setpopupPrintOpen(false);
  const Item = styled(Paper)(({ theme }) => ({ backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff', ...theme.typography.body2, padding: theme.spacing(1), textAlign: 'center', color: theme.palette.text.secondary, }));

  const filterItems = (arr, field, value) => { try { if (field != null) { return arr.filter((item) => { return item[field].includes(value) }) }} catch (error) { console.error(error);}}
  const filterItemsequal = (arr, field, value) => { try { if (field != null) { return arr.filter((item) => { return item[field]==value }) }} catch (error) { console.error(error);}}
    //product_info_4
  const handleCheck = (index, e, selected)=>{ console.log(index, e.target.value, selected); let temp = [...product_info_json]; temp[index][selected] = e.target.value; setproduct_infoForm(temp); } 
  const handleNewRow = () => { setproduct_infoForm([...product_info_json,{ qty:"", remarks:"", fixed_cost:"", weight:"", dimension:"", }])}
  const handleClick = () =>{ setOpen(true); };
  const handleClose = (event, reason) => { if (reason === 'clickaway') { return; } setOpen(false); };
  const handleChange = (event) => { event.persist(); setState({ ...state, [event.target.name]: event.target.value });  };
  const handleRemoveXlsx = () =>{    setswitch_xlsx_active(0);   setjson_upload(null);   };
  const handleChangexx = (panel) => (_, newExpanded) => { setExpanded(newExpanded ? panel : false); };
  const handleDateChange = (value) => { if(value!=null){ setrange_start(format(value[0].$d,'yyyy-MM-dd')); setrange_end(format(value[1].$d,'yyyy-MM-dd')); console.log(range_start,'range_start',range_end,'range_end'); } };


                                    

/*Defines for select option*/
const servicesProps = { options: servicesList, getOptionLabel: (option) => option.label,};
const i_product_typeProps = { options: i_product_typeList_filtered, getOptionLabel: (option) => option.label,};
const i_priorityProps = { options: i_priorityList, getOptionLabel: (option) => option.label,};
const i_payment_typeProps = { options: i_payment_typeList, getOptionLabel: (option) => option.label,};


 
const cardList = [
  { name: 'Booking', amount: booking, icon: 'local_mall', id:9 },
  { name: 'Processing', amount: processing, icon: 'next_week', id:3 },
  { name: 'In Transit', amount: in_transit, icon: 'local_shipping', id:5 },
  { name: 'Received', amount: shipped, icon: 'redeem', id:4 },
  { name: 'Return in process', amount: return_process, icon: 'art_track', id:7 },
  { name: 'Not Received', amount: hold, icon: 'settings_power', id:9 },
  { name: 'Out For Delivery', amount: out_for_deli, icon: 'directions_bike', id:12 },
  { name: 'Exception', amount: exception, icon: 'call_missed', id:12 },
]; 







/*------------------------------------------Interface Functions-------------------------------------------------*/
    
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 80 },
  {
    field: 'action',
    headerName: 'Action',
    sortable: false,
    renderCell: (params) => {
      const onClick = (e) => {
        e.stopPropagation(); // don't select this row after clicking
        const api: GridApi = params.api;
        const thisRow: Record<string, GridCellValue> = {};
        api
          .getAllColumns()
          .filter((c) => c.field !== '__check__' && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
          );

          //setselected_rows(thisRow.id,thisRow)
          handleViewDetails(thisRow.id,thisRow)
          setpopupOpen(true)
      };
      return <Button onClick={onClick}>Invoice</Button>;
    },
  },
  { field: 'sender_ref_no_4', headerName: 'REF No', width: 100 },
  { field: 'services', headerName: 'Service', width: 150 },{ field: "i_delivery_status", headerName: 'Delivery status', width: 130 },
  { field: 'current_branch', headerName: 'Current Branch', width: 150 },
  { field: 'clients', headerName: 'Client ', width: 150 },
  { field: 'client_branch', headerName: 'Client Branch', width: 150 },
  { field: 'sender_name_6', headerName: 'General sender', width: 150 },
  { field: 'sender_phone_5', headerName: 'sender Phone', width: 150 },
  { field: 'pickup_date_3', headerName: 'Pickup Date', width: 100 },
  { field: 'i_packaging_type', headerName: 'Packaging type', width: 130 },
  { field: 'i_payment_type', headerName: 'Payment type', width: 130 },
  { field: 'i_priority', headerName: 'Priority', width: 90 },
  { field: 'i_product_type', headerName: 'Product type', width: 130 },
  { field: 'i_shipment_method', headerName: 'Shipment', width: 110 },
  { field: 'i_tracking_status', headerName: 'Tracking status', width: 150 },
  { field: 'recipient_name_21', headerName: 'Recipient name', width: 130 },
  { field: 'recipient_phone_20', headerName: 'Recipient phone', width: 130 },
  { field: 'recipient_address_24', headerName: 'Recipient address', width: 130 },

  { field: 'delivery_cost_amount', headerName: 'Delivery Cost', width: 110 },
  { field: 'collection_amount', headerName: 'Collection', width: 110 },
  { field: 'cod_cost_percent', headerName: 'COD Cost', width: 110 },
  { field: 'return_cost_amount', headerName: 'Return Cost', width: 110 },

  { field: 'delivery_boy_id_', headerName: 'Delivery Man', width: 130 },
  { field: 'delivery_boy_id', headerName: 'Delivery Man Id', width: 100 },
  { field: 'i_relation', headerName: 'Delivery Relation', width: 130 },
  { field: 'i_return_cause', headerName: 'Return Reason', width: 130 },

  { field: 'otp_verified', headerName: 'OTP Veryfied', width: 110 },
  { field: 'creator', headerName: 'Created by', width: 110 },
  { field: 'created_branch', headerName: 'Created Branch', width: 110 }, 
  { field: 'created', headerName: 'Created Date', width: 110 },
];

const rows = get_search_data;



const columns2: GridColDef[] = [
  { field: 'id', headerName: 'ID', minWidth: 40, flex: 1, hide: true }, 
  { field: 'date', headerName: 'Date', minWidth: 100, flex: 1 },
  { field: 'time', headerName: 'Time', minWidth: 100, flex: 1 },
  { field: 'i_tracking_status_id_19', headerName: 'Current Tracking Status', minWidth: 150, flex: 3 },  
 

  { field: 'source', headerName: 'Origin', minWidth: 170, flex: 1 },
  { field: 'destination', headerName: 'Destination', minWidth: 170, flex: 1 },

  { field: 'creator', headerName: 'Updated by', minWidth: 100, flex: 1 },
  { field: 'i_delivery_status_id_18', headerName: 'Delivery Status', minWidth: 150, flex: 3 },  
  { field: 'pickup_reference_id', headerName: 'Remarks', minWidth: 100 , flex: 1},
];



 
 

/*------------------------------------------Handler & Function-------------------------------------------------*/

const handleid_single = (event) => {
    
  if(event.target.value!=null){
    localStorage.setItem('id_single', event.target.value);
    setid_single(event.target.value)  
    /*let this_setprevious_delivery_status= parseInt(localStorage.getItem('setprevious_delivery_status'));
    if(this_setprevious_delivery_status==event.target.value){
        console.log('duplicate1')
        localStorage.removeItem('id_single');
        setid_single(null) 
    }else{
            console.log('duplicate0')
            localStorage.setItem('id_single', event.target.value);
            setid_single(event.target.value)      
    }*/

  }
};
 
const handleid_bulk_search = (event) => {
  var previous_ids1=localStorage.getItem('previous_ids'); 
  handleid_single_search(previous_ids1,services_clientsList,services_clients_branchList)
  localStorage.removeItem("previous_ids");
  setsearch_count(0)
};

 

   const handleid_single_search = (new_id,services_clientsList,services_clients_branchList) =>  {
    console.log(new_id,'new_id')
  var active_global_search1 = localStorage.getItem('active_global_search');
  if (active_global_search1 == 1) { var bra = null } else { var bra = user.branch_id }
  const firsr_page_json = {
      "creator": user.id,
      "ids": new_id,
      "user_id":user.id,
      "is_marchant":user.is_marchant,
      "is_delivery_boy":user.is_delivery_boy,
  }


  console.log(firsr_page_json,'firsr_page_jsonx')

  axios.post(base_url + "search_data_id", firsr_page_json).then((response) => {
      console.log(response.data, 'response.data.resultx');
      setforce_print8(0)
      const my_json = []
      var cc = 0;
      const get_ = response.data.result;
      for (var i = 0; i < get_.length; i++) {
          cc++
          var obj = get_[i];
          var client = '';
          var client_branch = '';

          try {

              if (obj.sender_category_1 == 'corporate_sender') {
                  var filter2 = filterItemsequal(services_clientsList, 'value', obj.sender_client_id_7);
                  console.log(services_clientsList,obj.sender_client_id_7,filter2,'filter22')
                  client = filter2[0].label;

                  var filter3 = filterItemsequal(services_clients_branchList, 'value', obj.sender_client_branch_id_8);
                  client_branch = filter3[0].label;
              } 
              
          } catch (error) {
              console.error(error);
          }


var cod_=obj.collection_amount*obj.cod_cost_percent/100
var pp_date=obj.pickup_date_3.split("-").reverse().join("-").toString()

          var x_data = {
              id: obj.id,
              pickup_date_3: pp_date,
              i_delivery_status: obj.i_delivery_status.i_delivery_status,
              i_delivery_status_id_18: obj.i_delivery_status_id_18,
              i_packaging_type: obj.i_packaging_type.i_packaging_type,
              i_payment_type: obj.i_payment_type.i_payment_type,
              i_priority: obj.i_priority.i_priority,
              i_product_type: obj.i_product_type.i_product_type,
              i_shipment_method: obj.i_shipment_method.i_shipment_method,
              i_tracking_status: obj.i_tracking_status.i_tracking_status,
              recipient_address_24: obj.recipient_address_24,
              i_sms_template_id_30: obj.i_sms_template_id_30,
              sender_ref_no_4: obj.sender_ref_no_4,
              recipient_phone_20: obj.recipient_phone_20,
              recipient_name_21: obj.recipient_name_21,
              services: obj.services.services,

              delivery_cost_amount: obj.delivery_cost_amount,
              collection_amount: obj.collection_amount,
              cod_cost_percent: cod_,
              return_cost_amount:obj.return_cost_amount,
  
              clients: client,
              client_branch: client_branch,
              sender_name_6: obj.sender_name_6,
              sender_phone_5: obj.sender_phone_5,
              current_branch: obj.current_branch.branch,
              otp_verified: obj.otp_verified,
              created_branch: obj.created_branch_.branch,
              creator: obj.creator1_.userName,
              created: obj.created,
              unique_upload_id:obj.unique_upload_id,
              ...(obj.i_relation_id ? { i_relation: obj.i_relation.i_relation } : {i_relation:'' }),
              ...(obj.i_return_cause_id ? { i_return_cause: obj.i_return_cause.i_return_cause } : {i_return_cause:''}),
              
              ...(obj.delivery_boy_id ? { delivery_boy_id_: obj.delivery_boy_id_.userName + "("+obj.delivery_boy_id_.employee_id+")"   } : {delivery_boy_id_:''}),
              ...(obj.delivery_boy_id ? { delivery_boy_id: obj.delivery_boy_id_.userID } : {delivery_boy_id:''}),
              ...(obj.i_relation_person ? { i_relation_person: obj.i_relation_person} : {i_relation_person:''}),

 
          }
          my_json.push(x_data);
          setprevious_delivery_status(obj.i_delivery_status_id_18)
          localStorage.setItem('setprevious_delivery_status', obj.id.toString());
           
      }
      
      if(get_.length>0){
              var previous_ids_=localStorage.getItem('previous_ids'); 
            if(previous_ids_!=null){
                    var x_count=previous_ids_.split(",")
                    const withoutDuplicates = [...new Set(x_count)];
                    setsearch_count(withoutDuplicates.length)

            }
            
      } 


      //setalert_def_txt(cc + ' Result found'); setalert_def_class('success'); handleClick();
      localStorage.setItem('result_found', 1);
      setget_search_data(my_json);

      console.log(my_json,'mylen')
      
      if(my_json.length==1){
        setinvoice_print(my_json)
        console.log(my_json,'my_jsonmy_json')
        
        const arr = [  my_json[0].id  ];
        setselected_rows(arr)
        localStorage.setItem('setselected_rows', arr.toString());
        handleUpdateStatus(my_json)
       // handleViewDetails(my_json[0].id,my_json[0])

        setready_to(my_json[0].id)
        handlestatusRestriction (arr,my_json);
        setforce_print8(1)
      }

      seti_delivery_status_count(null)
      setget_search_data_tracking([]);
      //Reset values
  }).catch(function (error) { if (error.response) { console.log(error.response.data); } });
};



const handleOtp = (e) => {
    let id = e.target.getAttribute("data-id")
    var id_ = parseInt(id);
    if (otp_write != null) {
        const master_submit = {
            selected_rows: id_,
            otp: otp_write
        }
        const res = axios.post(base_url + "otpverify", master_submit).then((response) => {
            // handleClick();
            console.log(response.data.result, 'res');
            if (response.data.result == 0) {
                alert('OTP not match');
            } else {
                alert('OTP verified successfully');
                sethideotp(1);
            }
        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.data, 'error');
            }
        });
    }
}

const handleSubmit = (event) => {
  /*  setselected_rows(''); setloading(1);
   
    const SenderRecipientMax = SenderRecipientRef.current.getSenderRecipient();
    const SenderRecipientMin = SenderRecipientRef.current.getSenderRecipient_excel(); //replace by excel
    var bra = user.branch_id;
    if (active_global_search != 0) { bra = null }

    const firsr_page_json = {
        "services_id_1": firstpage.services_id,
        "i_product_type_id_2": firstpage.i_product_type_id,
        "i_payment_type_8": firstpage.i_payment_type,
        "creator": user.id,
        "current_branch_id": bra,
        "range_start": range_start,
        "range_end": range_end,
        "i_delivery_status_count": i_delivery_status_count,
        "page": page,
        "rowsPerPage": rowsPerPage,
        "user_id":user.id,
        "is_marchant":user.is_marchant,
        "is_delivery_boy":user.is_delivery_boy,
    }

  

    let marge_common = Object.assign(SenderRecipientMax, firsr_page_json)
    let final_submtted_data = Object.assign(SenderRecipientMin, marge_common)

    console.log(final_submtted_data);


    axios.post(base_url + "search_data", final_submtted_data,firsr_page_json).then((response) => {

        console.log(response,'responseresponse')
        var counts=response.data.counts_

        if(counts>25000){
            setshow_counts(25000)

            if(counts>50000){
                setshow_counts1(50000)
                    if(counts>70000){
                        setshow_counts2(70000)
                            if(counts>100000){
                                setshow_counts3(100000)
                            }else{
                                setshow_counts3(counts)
                            }
                    }else{
                        setshow_counts2(counts)
                    }
            }else{
                setshow_counts1(counts)
            }
        }else{
            setshow_counts(counts)
        }






        setshow_counts_all(response.data.counts_)
        setcount_search(response.data.counts_)
        

        const my_json = []
        var cc = 0;
        const get_ = response.data.result;
       
        for (var i = 0; i < get_.length; i++) {
          
            cc++
            var obj = get_[i];

            var client = '';
            var client_branch = '';

            //console.log(services_clientsList);
            

            try {
                if (obj.sender_category_1 == 'corporate_sender') {
                    var filter2 = filterItemsequal(services_clientsList, 'value', obj.sender_client_id_7);
                    client = filter2[0].label;
                    var filter3 = filterItemsequal(services_clients_branchList, 'value', obj.sender_client_branch_id_8);
                    client_branch = filter3[0].label;
                } else {

                }               
            } catch (error) {
                
            }


var cod_=obj.collection_amount*obj.cod_cost_percent/100
            console.log(i,'x_data')
            var pp_date=obj.pickup_date_3.split("-").reverse().join("-").toString()

            var x_data = {
                id: obj.id,
                pickup_date_3: pp_date,
                i_delivery_status: obj.i_delivery_status.i_delivery_status,
                i_packaging_type: obj.i_packaging_type.i_packaging_type,
                i_payment_type: obj.i_payment_type.i_payment_type,
                i_priority: obj.i_priority.i_priority,
                i_product_type: obj.i_product_type.i_product_type,
                i_shipment_method: obj.i_shipment_method.i_shipment_method,
                i_tracking_status: obj.i_tracking_status.i_tracking_status,
                recipient_address_24: obj.recipient_address_24,
                i_sms_template_id_30: obj.i_sms_template_id_30,
                sender_ref_no_4: obj.sender_ref_no_4,
                recipient_phone_20: obj.recipient_phone_20,
                recipient_name_21: obj.recipient_name_21,
                services: obj.services.services,

              delivery_cost_amount: obj.delivery_cost_amount,
              collection_amount: obj.collection_amount,
              cod_cost_percent: cod_,
              return_cost_amount:obj.return_cost_amount,

                clients: client,
                client_branch: client_branch,
                sender_name_6: obj.sender_name_6,
                sender_phone_5: obj.sender_phone_5,
                current_branch: obj.current_branch.branch,
                otp_verified: obj.otp_verified,
                created_branch: obj.created_branch_.branch,
                creator: obj.creator1_.userName,
                created: obj.created,   
                unique_upload_id:obj.unique_upload_id,
                ...(obj.i_relation_id ? { i_relation: obj.i_relation.i_relation } : {i_relation:'' }),
                ...(obj.i_return_cause_id ? { i_return_cause: obj.i_return_cause.i_return_cause } : {i_return_cause:''}),
                
                ...(obj.delivery_boy_id ? { delivery_boy_id_: obj.delivery_boy_id_.userName + "("+obj.delivery_boy_id_.employee_id+")"} : {delivery_boy_id_:''}),
                ...(obj.delivery_boy_id ? { delivery_boy_id: obj.delivery_boy_id_.userID } : {delivery_boy_id:''}),
                ...(obj.i_relation_person ? { i_relation_person: obj.i_relation_person} : {i_relation_person:''}),
  

            }
            
            my_json.push(x_data);
            //
        } 
        setget_search_data(my_json);
        
        if(my_json.length==1){
            setforce_print8(0)
            setinvoice_print(my_json)
            
            handleViewDetails(my_json[0].id,my_json[0])
            const arr = [  my_json[0].id  ];
            setselected_rows(arr)
            handlestatusRestriction (arr,my_json); 
          }
        setloading(0)
       // setalert_def_txt(counts.toLocaleString() + ' Result found'); setalert_def_class('success'); handleClick();
        seti_delivery_status_count(null)
        setget_search_data_tracking(null);
        //Reset values
    }).catch(function (error) { if (error.response) { console.log(error.response.data); } });
*/
};

function handlestatusRestriction (newSelectionArray,get_search_data) {/*
    var this_id = 0; var any_intransit = 0; var any_received = 0; var ready_otp = 0;
    var t3 = 0; var t4 = 0; var t5 = 0; var t6 = 0; var t7 = 0; var t8 = 0; var t9 = 0;
console.log(newSelectionArray,'newSelectionArray')
    for (var i = 0; i < newSelectionArray.length; i++) {
        var filter = filterItemsequal(get_search_data, 'id', parseInt(newSelectionArray[i]));
        console.log(filter,'calling3');
        console.log(get_search_data,'get_search_data');
        var this_status = filter[0].i_delivery_status;
        console.log('calling4', this_status);
        if (this_status == 'Received') { this_id = 4 }
        if (this_status == 'In Transit') { this_id = 5 }
        if (this_status == 'Delivered') { this_id = 6 }
        if (this_status == 'Return in process') { this_id = 7 } 
        if (this_status == 'Return Received') { this_id = 8 }
        if (this_status == 'Hold') { this_id = 9 }
        if (this_status == 'Booking') { this_id = 2 }
        if (this_status == 'Processing') { this_id = 3 }
console.log(this_id,'this_status')
        if (t3 != 1) { if ( this_id == 3 || this_id == 5 ||this_id == 5 || this_id == 4 || this_id == 6 || this_id == 8 ||  this_id == 7 || this_id == 9) { t3 = 1 } } 
        if (t4 != 1) { if (this_id == 2 || this_id == 4 || this_id == 6 || this_id == 7 || this_id == 8) { t4 = 1 } }
        if (t5 != 1) { if (this_id == 2 || this_id == 5 || this_id == 6 || this_id == 7 || this_id == 8 || this_id == 9) { t5 = 1 } }
        if (t6 != 1) { if (this_id == 2 || this_id == 5 || this_id == 6 || this_id == 8 || this_id == 9) { t6 = 1 } }
        if (t7 != 1) { if (this_id == 2 || this_id == 5 || this_id == 6 || this_id == 7 || this_id == 8 || this_id == 9) { t7 = 1 } }
        if (t8 != 1) { if (this_id == 2 || this_id == 5 || this_id == 6 || this_id == 8 || this_id == 9) { t8 = 1 } } 
        if (t9 != 1) { if (this_id == 2 || this_id == 5 || this_id == 6 || this_id == 8 || this_id == 9) { t9 = 1 } }
        if (any_intransit != 1) { if (filter[0].i_delivery_status == 'In Transit') { console.log('In Transit'); any_intransit = 1; } }
        if (any_received != 1) { if (filter[0].i_delivery_status == 'Received') { console.log('In 	Received'); any_received = 1; } }
        if (ready_otp != 1) {
            console.log(filter[0].otp_verified, 'otp_verified', filter[0].i_delivery_status, 'i_delivery_status')
            if (filter[0].i_delivery_status == 'Deliverd' && filter[0].otp_verified != 1) {
                ready_otp = 1
            }
        } 
        //console.log(newSelectionArray[i])
    }
    console.log(t3,t4,'t3')
    if (t3 == 1) { setstatus_update_restrict_3(true) } else { setstatus_update_restrict_3(false) }
    if (t4 == 1) { setstatus_update_restrict_4(true) } else { setstatus_update_restrict_4(false) }
    if (t5 == 1) { setstatus_update_restrict_5(true) } else { setstatus_update_restrict_5(false) }
    if (t6 == 1) { setstatus_update_restrict_6(true) } else { setstatus_update_restrict_6(false) }
    if (t7 == 1) { setstatus_update_restrict_7(true) } else { setstatus_update_restrict_7(false) }
    if (t8 == 1) { setstatus_update_restrict_8(true) } else { setstatus_update_restrict_8(false) }
    if (t9 == 1) { setstatus_update_restrict_9(true) } else { setstatus_update_restrict_9(false) }

    if (any_intransit == 1) { setstatus_update_restrict(true) } else { setstatus_update_restrict(false) }
    if (any_received == 1) { setstatus_receive_restrict(true) } else { setstatus_receive_restrict(false) }
    if (ready_otp == 1) {
        setotp_allow(1)
        console.log(otp_allow, 'otp_allow1')
    } else {
        setotp_allow(0)
        console.log(otp_allow, 'otp_allow2')
    }*/
}



const handleUpdateStatus = (getdata) => {
       let against_selected=null
const SenderRecipientMax = SenderRecipientRef2.current.getSenderRecipient();
try {
    against_selected=parseInt(localStorage.getItem('setselected_rows'))
} catch (error) {
    
}

if (SenderRecipientMax.action_type == "search_data"){

    handleViewDetails(against_selected,[])
}else{




 
    setupdatenow(0)
    /*if (against_selected == null) {
        setalert_def_txt('No Data Selected')
        setalert_def_class('warning')
        handleClick()
    }*/

    ///else if (against_selected>0) {
      //  console.log('gotv','call for action')
        const new_data = {
            creator: user.id,
            created: format(new Date(), 'yyyy-MM-dd'),
        }

        var error = 0;

        if (SenderRecipientMax.action_type == "branch_transfer" ||  SenderRecipientMax.action_type == "return_process") {
            if (SenderRecipientMax.destination > 0) { error = 0; } else { error = 1; }
        }

        if (SenderRecipientMax.action_type == "branch_transfer" &&  SenderRecipientMax.pickup_reference_id==null) {
           error = 1;
           console.log('got.pickup_reference_id')
        }


        if (SenderRecipientMax.action_type == "send_to_deliveryman") {
            if (SenderRecipientMax.delivery_boy_id > 0) { error = 0; } else { error = 1; }
            if (SenderRecipientMax.pickup_reference_id) { error = 0; console.log('0') } else { error = 1;  console.log('01') }
        }


        if (SenderRecipientMax.action_type == "deliverd_to_recipient") {
            if (SenderRecipientMax.i_relation_id > 0) { error = 0; } else { error = 1; }
        }

        if (SenderRecipientMax.i_delivery_status_id_18 > 0 && SenderRecipientMax.i_tracking_status_id_19 > 0 && error == 0) {
            error = 0;
        } else { error = 1; }

        
        if(SenderRecipientMax.source > 0){
            console.log('2222got.pickup_reference_id',SenderRecipientMax.source)
        }else{
            error = 1;
            console.log('1111got.pickup_reference_id')
        }

 

        if (error == 0) {
            const final_json = Object.assign({}, new_data, SenderRecipientMax)

            const master_submit = []

          //  for (var i = 0; i < selected_rows.length; i++) {
                // console.log(selected_rows[i],'sss')
                const excel_get = { pickup_id: against_selected, }
                let z2_excel = Object.assign({}, final_json, excel_get)
 
                
                //let this_setprevious_delivery_status= localStorage.getItem('setprevious_delivery_status');

               // console.log(this_setprevious_delivery_status, against_selected, 'zz2_excel')

                //if (z2_excel.i_delivery_status_id_18 != previous_delivery_status) {
                    master_submit.push(z2_excel);

                    //jodi delivery hoi sob gula selected row te otp bosabo & sms korbo

	
					
               // }
           // }
 
            console.log(master_submit, 'master_submit2');
            const res = axios.post(base_url + "create_pickup_tracking_noduplicate", master_submit).then((response) => {
                //
                /*let verse=response?.data?.act?.length || ""
                if (verse === "") {
                    console.log('Operation Fail of'+ master_submit[0].pickup_id, 'verse')
                }else{
                    console.log('Operation Success'+ master_submit[0].pickup_id, 'verse')
                }*/
                //console.log(verse, 'verse')
                 
                    if(response?.data?.act!=null){
                        setalert_def_txt('Update Success '+ master_submit[0].pickup_id); setalert_def_class('success'); handleClick();

                        handleViewDetails(against_selected,[])


                                        if (SenderRecipientMax.action_type == "deliverd_to_recipient") {
                                            //var filter = filterItemsequal(get_search_data, 'id', against_selected);
                                            var phn = getdata[0].recipient_phone_20;
                                            var ref = getdata[0].sender_ref_no_4;
                    
                                            //new
                                            var i_product_type = getdata[0].i_product_type;
                                            var clients = getdata[0].clients;
                                            var i_sms_template_id_30 = getdata[0].i_sms_template_id_30;
                    
                    
                                            var id = against_selected;
                    
                                             const set_data = {
                                                phn: phn,
                                                id: id,
                                            }
                    
                    
                                            var pickup_sms_collection = []
                                            const resxx = axios.post(base_url + "set_otp_db", set_data).then((response) => {
                    
                                                const myArray = i_sms_template_id_30.split(",");
                    
                    
                    
                                                if (myArray.includes("4") == true) {
                    
                                                    var msg_get = 'Your ' + i_product_type + ' is delivered. Thanks iXpress Ltd'
                    
                                                    var this_msg = {
                                                        to: phn,
                                                        message: msg_get
                                                    };
                                                    pickup_sms_collection.push(this_msg);
                    
                                                } else if (myArray.includes("5") == true) {
                    
                                                    var msg_get = response.data.result.otp + ' is OTP for delivery your ' + i_product_type + ', REF:' + ref + '. Thanks iXpress Ltd'
                    
                                                    var this_msg = {
                                                        to: phn,
                                                        message: msg_get
                                                    }; 
                                                    pickup_sms_collection.push(this_msg);
                    
                                                } else if (myArray.includes("1") == true) {
                    
                                                    /*var msg_get = 'Your ' + i_product_type + ' has been returned. Reference No: ' + ref + '. Thanks iXpress Ltd. Contact Number: 02-98830376-79'
                    
                                                    var this_msg = {
                                                        to: phn,
                                                        message: msg_get
                                                    };
                                                    pickup_sms_collection.push(this_msg);*/
                                                }
                    
                    
                                                if (pickup_sms_collection != null) {
                                                    const requestOptions = {
                                                        method: 'POST',
                                                        mode: 'no-cors',
                                                        headers: {
                                                            "content-type": "application/json"
                                                        },
                                                        body: JSON.stringify(pickup_sms_collection)
                                                    };
                                                    console.log(requestOptions, 'requestOptions')
                    
                                                    fetch(process.env.REACT_APP_BULK_SMS_API_URL, requestOptions)
                                                        .then(data => console.log(data));
                    
                                                    pickup_sms_collection = null
                                                }
                    
                    
                    
                    
                                                //console.log(response);
                                            }).catch(function (error) {
                                                if (error.response) {
                                                    console.log(error.response.data, 'error');
                                                    error = 1;
                                                }
                                            });
                                        }
                        
                                        else if (SenderRecipientMax.action_type == "return_completed") {
                                            //var filter = filterItemsequal(get_search_data, 'id', against_selected);
                                            var phn = getdata[0].recipient_phone_20;
                                            var ref = getdata[0].sender_ref_no_4;
                    
                                            //new
                                            var i_product_type = getdata[0].i_product_type;
                                            var clients = getdata[0].clients;
                                            var i_sms_template_id_30 = getdata[0].i_sms_template_id_30;
                    
                                            var id = against_selected;
                    
                                             
                                            const set_data = {
                                                phn: phn,
                                                id: id,
                                            }
                    
                    
                                            var pickup_sms_collection=[]
                        
                                                const myArray = i_sms_template_id_30.split(",");
                    
                                                if(myArray.includes("1")==true){
                    
                                                var msg_get = 'Your '+i_product_type+' has been returned. Reference No: ' + ref + '. Thanks iXpress Ltd. Customer Service Number: 01409-964940 & 01409-964941'
                    
                                                var this_msg = {
                                                    to : phn,    
                                                    message : msg_get 
                                                };
                                                pickup_sms_collection.push(this_msg);
                                            }
                    
                    
                                                if(pickup_sms_collection!=null){
                                                    const requestOptions = {
                                                    method: 'POST',
                                                    mode: 'no-cors',
                                                    headers: { 
                                                        "content-type": "application/json"
                                                    },
                                                    body: JSON.stringify(pickup_sms_collection)
                                                };
                                                console.log(requestOptions,'requestOptions')
                    
                                                fetch(process.env.REACT_APP_BULK_SMS_API_URL, requestOptions)
                                                .then(data =>console.log(data) );
                                                    
                                                pickup_sms_collection=null
                                            }
                    
                                        }





                       // console.log('Operation Success'+ master_submit[0].pickup_id, 'verse')
                        }else{  
                            setalert_def_txt(response?.data?.msg+' of '+ master_submit[0].pickup_id)
                            setalert_def_class('warning')
                            handleClick()
                            handleViewDetails(against_selected,[])
                           // console.log('Operation Fail of'+ master_submit[0].pickup_id, 'verse')
                        }
             

                setselected_rows(null); 

            
            }).catch(function (error) {
                console.log(error,'888888888')
                setalert_def_txt('Operation Fail!')
                setalert_def_class('warning') 
                handleClick()
                if (error.response) {
                   // console.log(error.response.data, 'errorxxx');
                    error = 1;
                }
            });
        }

        if (error == 1) {
            setalert_def_txt('Please fill in all required fields')
            setalert_def_class('warning')
            handleClick()
        }
   /* } else {
        setalert_def_txt('No Data Selected')
        setalert_def_class('warning')
        handleClick()
    }*/
}



};


function handleViewDetails(this_selected_rows, thisRow) {
     console.log(this_selected_rows,'this_selected_rows',thisRow,'thisRow')
     if(thisRow?.length>0){
        setinvoice(thisRow) 
     }
   
    const master_submit = { selected_rows: this_selected_rows }
    const res = axios.post(base_url + "get_tracking", master_submit).then((response) => {
       // setalert_def_txt('Action Completed'); setalert_def_class('success'); handleClick();

        const my_json = []
        var cc = 0;
        const get_ = response.data.result;
        for (var i = 0; i < get_.length; i++) {
            cc++
            var obj = get_[i];




            var t1_date= obj.date.slice(0, 10).split("-").reverse().join("-").toString()
            var t1_hour=''


            if(obj.date.length>11){
            t1_hour = obj.date.slice(11, 13);
            var end='AM'
            if(t1_hour>12){ t1_hour=t1_hour-12;  
             if(t1_hour.toString().length==1){t1_hour='0'+t1_hour}
            end='PM'  }
            var t1_min = obj.date.slice(14, 16);
            t1_hour='('+t1_hour+':'+t1_min+' '+end+')'                
            }



            //var f_d = obj.i_delivery_status.i_delivery_status + ' (' + obj.i_tracking_status.i_tracking_status + ')';
            var f_d = obj.i_delivery_status.i_delivery_status;
            var x_data = {
                id: obj.id,
                action_type: obj.action_type,
                created: obj.created,
                creator: obj.creator_.userName,
                date: t1_date+' '+t1_hour,
                time: obj.time,
                destination: obj.branch_destination.branch,
                source: obj.branch_source.branch,
                i_delivery_status_id_18: f_d,
                i_tracking_status_id_19: obj.i_tracking_status.i_tracking_status,
                pickup_reference_id: obj.pickup_reference_id,
                
                ...(obj.i_relation_id ? { i_relation: obj.i_relation.i_relation } : {i_relation:'' }),
                ...(obj.i_return_cause_id ? { i_return_cause: obj.i_return_cause.i_return_cause } : {i_return_cause:''}),
                
                ...(obj.delivery_boy_id ? { delivery_boy_id_: obj.delivery_boy_id_.userName+ "("+obj.delivery_boy_id_.employee_id+")" } : {delivery_boy_id_:''}),
                ...(obj.delivery_boy_id ? { delivery_boy_id: obj.delivery_boy_id_.userID } : {delivery_boy_id:''}),
                ...(obj.i_relation_person ? { i_relation_person: obj.i_relation_person} : {i_relation_person:''}),
              
            }

            my_json.push(x_data);

        }
       // setalert_def_txt(cc + ' Tracking found'); setalert_def_class('success'); handleClick();
        setget_search_data_tracking(my_json);
        console.log(my_json, 'my_json_tra');
    }).catch(function (error) {
        if (error.response) {
            console.log(error.response.data, 'error');
        }
    }); 
}



const handlePrint = () => {
    if(selected_rows.length>0){
            setforce_print8(0)
    setinvoice_print(null)
    const temp = []
    selected_rows.forEach(function (number) {
        var filter2 = filterItemsequal(get_search_data, 'id', number);
        temp.push(filter2);
        //console.log(filter2)
    })
console.log(temp,'temptemp')
    setinvoice_print(temp)
    setpopupPrintOpen(true)
    }else{
        setalert_def_txt('Nothing Selected')
        setalert_def_class('warning')
        handleClick()
    }
}

const handlePrint8 = () => {
    if(selected_rows.length>0){
    setforce_print8(1)
    setinvoice_print(null)
    const temp = []
    selected_rows.forEach(function (number) {
        var filter2 = filterItemsequal(get_search_data, 'id', number);
        temp.push(filter2);
        //console.log(filter2)
    })
console.log(temp,'temptemp')
    setinvoice_print(temp)
    setpopupPrintOpen(true)}else{
        setalert_def_txt('Nothing Selected')
        setalert_def_class('warning')
        handleClick()
    }
}

const handlecountsShow = (e) => {
    let id = e.target.getAttribute("data-id")
    seti_delivery_status_count(id)
    handleSubmit()
    console.log(id)
}

const handleChangewriteotp = (event) => {
  setotp_write(event.target.value);
};

const handleChangeglobal = (event) => {
  setChecked(event.target.checked);
  if(active_global_search==0){
    setactive_global_search(1)
    localStorage.setItem('active_global_search',1);
  }else{
    setactive_global_search(0)
    localStorage.setItem('active_global_search',0);
  }
  console.log(active_global_search,'active_global_search');

//check that selected branch
  console.log(selected_rows,'selected_rows_ok')
   
  var branch_error=0;
  if(selected_rows!=''){
            selected_rows.forEach(function (number) {
            var filter2 = filterItemsequal(get_search_data, 'id', number);
            if(filter2[0].current_branch!=user.branch){
                branch_error=1
                setbranch_error(1)
                return;
            }
             
        })
  }


};










/*------------------------------------------useEffect-------------------------------------------------*/
useEffect(() => {
  localStorage.removeItem("active_global_search");
  localStorage.removeItem("result_found");
  localStorage.removeItem("previous_ids");
  const basic_user = {
    id: user.id,
    is_all_branch: user.is_all_branch,
    is_marchant: user.is_marchant,
    }
  const getData_sc = async () => {
    const arr_i_relation = [];  const arr_i_return_cause = [];  const arr_delivery_boy = [];   const arr_services_clients = []; const arr_services_clients_branch = []; const arr_i_product_type = []; const arr_i_sms_template = []; const arr_i_tracking_status = []; const arr_i_payment_type = []; const arr_i_priority = []; const arr_services = []; const arr_i_packaging_type = []; const arr_i_shipment_method = []; const arr_i_delivery_status = []; const arr_i_zone = []; const arr_zone_countries = []; const arr_zone_districts = []; const arr_zone_divisions = []; const arr_zone_upazilas = []; const arr_branch = []; 
    await axios.post(base_url+"setup_config",basic_user).then((res) => {
        res.data.services_clients.map((temp) => { return arr_services_clients.push({value: temp.services_clients_id, label: temp.services_clients,services_id:temp.services_id,services_provider_id:temp.services_provider_id,i_sms_template_id:temp.i_sms_template_id,i_product_type_id:temp.i_product_type_id,services_packages_id:temp.services_packages_id}); }); setservices_clientsList(arr_services_clients) 
        res.data.services_clients_branch.map((temp) => { return arr_services_clients_branch.push({value: temp.services_clients_branch_id, label: temp.services_clients_branch,  services_clients_id: temp.services_clients_id}); }); setservices_clients_branchList(arr_services_clients_branch) 
        res.data.i_sms_template.map((temp) => { return arr_i_sms_template.push({value: temp.i_sms_template_id, label: temp.i_sms_template,have_general_sender:temp.have_general_sender,template:temp.message,}); }); seti_sms_templateList(arr_i_sms_template) 
        res.data.i_tracking_status.map((temp) => { return arr_i_tracking_status.push({value: temp.i_tracking_status_id,i_delivery_status_id: temp.i_delivery_status_id, label: temp.i_tracking_status}); }); seti_tracking_statusList(arr_i_tracking_status); console.log(arr_i_tracking_status,'arr_i_tracking_status') 
        res.data.services.map((temp) => { return arr_services.push({value: temp.services_id, label: temp.services}); }); setservicesList(arr_services)
        res.data.i_delivery_status.map((temp) => { return arr_i_delivery_status.push({value: temp.i_delivery_status_id, label: temp.i_delivery_status}); }); seti_delivery_statusList(arr_i_delivery_status)  
        res.data.branch.map((temp) => { return arr_branch.push({value: temp.branch_id, label: temp.branch}); }); setbranchList(arr_branch)  
        res.data.delivery_boy.map((temp) => { return arr_delivery_boy.push({value: temp.userID, label: temp.userName, employee_id:temp.employee_id}); }); setdelivery_boyList(arr_delivery_boy)  
     
        res.data.i_relation.map((temp) => { return arr_i_relation.push({value: temp.i_relation_id, label: temp.i_relation}); }); seti_relationList(arr_i_relation)  
        res.data.i_return_cause.map((temp) => { return arr_i_return_cause.push({value: temp.i_return_cause_id, label: temp.i_return_cause}); }); seti_return_causeList(arr_i_return_cause)  
   // console.log(res.data.delivery_boy,'arr_delivery_boy')
   // console.log(res.data.branch,'branch')
    
    });
  };
  getData_sc();
}, []);



 


useEffect(() => {
    
 var branch_error=0;

  if(selected_rows){
            selected_rows.forEach(function (number) {
            var filter2 = filterItemsequal(get_search_data, 'id', number);
            if(filter2[0].current_branch!=user.branch){
                branch_error=1
                setbranch_error(1)
                return;
            }else{
               // handleUpdateStatus()
            }

             
        })
       // setupdatenow(1)
  }

},[selected_rows]);




/*useEffect(() => {
     if(updatenow==1){
             handleUpdateStatus()
     }
     console.log('call66',updatenow)
},[updatenow]);*/

 


useEffect(() => {
    const keyDownHandler =   event => {
 
     /* if (  event.key === '+') {

        event.preventDefault();
         // console.log(selected_rows,'selected_rows')
         handleUpdateStatus()
         
         
         //inputReference.current.focus();
      }*/
        if (event.key === 'Enter') {
            event.preventDefault();
            
            const id_single = localStorage.getItem('id_single');
            localStorage.removeItem('id_single')
  
            var previous_ids = localStorage.getItem('previous_ids');
            if (id_single != null) {                
                if (previous_ids != null) {
                    var new_id = previous_ids + ',' + id_single.toString()
                } else {
                    var new_id = id_single.toString()
                }
  
                //view search result for single iteams
               let rr=   handleid_single_search(id_single,services_clientsList,services_clients_branchList)

                

                var result_found = localStorage.getItem('result_found');
                if (result_found == 1) {
                    localStorage.setItem('previous_ids', new_id);
                    localStorage.removeItem("result_found");
                }
                setid_single(null)
                
            }else{
             
            }
  
           
            if(previous_ids1==null){
              localStorage.setItem('previous_ids', new_id); 
              console.log('id single null')
            }else{
              console.log('id single not null')
            }
             var previous_ids1 = localStorage.getItem('previous_ids');
             
            console.log('id_single previous_ids ', id_single, previous_ids1);
        }
    };
    
    document.addEventListener('keydown', keyDownHandler);
    return () => {
        document.removeEventListener('keydown', keyDownHandler);
    };
  
  }, [selected_rows]);









return ( 
<div>

<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
    <Alert onClose={handleClose} severity={alert_def_class} sx={{ width: '100%' }}>
      {alert_def_txt}<br></br>
    </Alert>
</Snackbar>
 
{
    /*
    {user.is_marchant} / {branch_error} / {get_search_data.length} / {active_global_search} / {selected_rows}
    */
}


<ValidatorForm onSubmit={handleSubmit} onError={() => null}>



{/*Advanced Search*/ }
<div title="Advanced search" style={{ borderRadius: "3px", backgroundColor: "#6495ed36", padding: "10px", border: "3px solid cornflowerblue",}}><Grid item md={12} lg={12} sm={12} xs={12} style={{ backgroundColor: "cornflowerblue", borderRadius: "3px", paddingLeft: "5px", color: "azure", fontSize: "26px", marginBottom: "1%" }}> <Icon>grain</Icon>Quick Update</Grid>

<Grid container spacing={6}>

<Grid item md={2} lg={2} sm={6} xs={6}>
    <Grid item md={4} lg={4} sm={6} xs={6}> <Checkbox checked={checked} onChange={handleChangeglobal} inputProps={{ 'aria-label': 'controlled' }} /> </Grid> 
    <Grid item md={8} lg={8} sm={6} xs={6}>Global Search Enable</Grid> 
</Grid>
<Grid item md={3} lg={4} sm={6} xs={6}> <TextField type="number"    inputProps={ {  tabIndex: "100"} }      ref={inputReference}  autoFocus  name="id_single" id="standard-basicc" value={id_single || ""} onChange={handleid_single} label="Barcode & Press Enter*  " /> </Grid> 
<Grid item md={2} lg={2} sm={3} xs={3}> <Button color="primary"   tabIndex= {-1}   data-id={1} onClick={handleid_bulk_search} variant="contained" > <Icon>search</Icon> <Span sx={{ pl: 1, textTransform: "capitalize" }}>Search({search_count})</Span> </Button> </Grid>
<Grid item md={2} lg={2} sm={3} xs={3}><Button color="primary"    tabIndex= {-1}    data-id={1} onClick={handlePrint} variant="contained" > <Icon>print</Icon> <Span sx={{ pl: 1, textTransform: "capitalize" }}>Print ✖ 3</Span> </Button> </Grid> 
<Grid item md={2} lg={2} sm={3} xs={3}><Button color="primary"   tabIndex= {-1}    data-id={1} onClick={handlePrint8} variant="contained" > <Icon>print</Icon> <Span sx={{ pl: 1, textTransform: "capitalize" }}>Print ✖ 8</Span>  </Button>  </Grid>


</Grid>



  
 

 {get_search_data.length==1 && 
 <> 
    {get_search_data != null &&
                        <div className="element-to-print11">
                            {/*
                            <ReactToPrint
                                trigger={() =>
                                    <button variant="contained" color="primary" >Print this out!</button>}
                                content={() => InvoiceBulkRef.current}
                            />
                                */}
                            <InvoiceBulk ref={InvoiceBulkRef}
                                creator={user.id}
                                branch={user.branch_id}
                                tracking={1}
                                tracking_data={get_search_data_tracking}
                                invoice_print={[get_search_data]}
                                force_print8={force_print8}
                                
                            />
                        </div>
    }

 </>
   
 }



{get_search_data.length==1 && 
    <Grid item lg={12} md={12} sm={12} xs={12}><br></br>
{
    get_search_data.map(item => (
 
            <div>
                        {item['i_delivery_status'] == 'Delivered' && item['otp_verified'] != "1" &&
                            <Grid container spacing={2}>
                                 <Grid item   lg={4} md={4} sm={6} xs={6}></Grid>
                                <Grid item   lg={3} md={3} sm={8} xs={8}>
                                    <TextField type="text" name="otp_write" id="standard-basic" value={otp_write} onChange={handleChangewriteotp} label="Write OTP*" />
                                </Grid>
                                <Grid   item  lg={2} md={2} sm={4} xs={4}>
                                    <Button color="primary" variant="contained">
                                        <Icon data-id={item.id} onClick={handleOtp}  >send</Icon>
                                        <Span data-id={item.id} onClick={handleOtp} sx={{ pl: 1, textTransform: "capitalize" }}>Verify OTP</Span>
                                    </Button>
                                </Grid>

                            </Grid>
                        }

                        {item['i_delivery_status'] == 'Delivered' && item['otp_verified'] == "1" && 
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <p><i>OTP Verified</i></p>
                            </Grid>
                        }
<hr></hr>
            </div>

        )) 
}
</Grid>
}



 {get_search_data.length>1 && 
     <Grid item md={12} lg={12} sm={12} xs={12} style={{ backgroundColor: "white", padding: "5px", borderRadius: "3px", }}>
     
     
    <Grid container spacing={2}>
        <Grid item xs={4}>{loading==1  &&  <ReactLoading type="bubbles"   color="blue" /> }
           
        </Grid>
        <Grid item xs={8}>
            <TablePagination
            component="div"
            count={show_counts_all} 
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
 
            rowsPerPageOptions={removeDuplicates([20,50,100,200,1000,2000,5000,show_counts,show_counts1,show_counts2,show_counts3])} 
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Grid>
    </Grid>
         
     
     
        <div style={{ height: 600, width: '100%' }}      >
            {rowsPerPage>100 &&
            <DataGrid
                components={{ Toolbar: GridToolbar }}
                rows={get_search_data}
                columns={columns}
                rowsPerPageOptions={removeDuplicates([20,50,100,200,1000,2000,5000,show_counts,show_counts1,show_counts2,show_counts3])} 
                checkboxSelection
                onSelectionModelChange={(newSelectionArray) => {
                    setbranch_error(0)
                    setselected_rows(newSelectionArray);
                    handlestatusRestriction (newSelectionArray,get_search_data); 
                    //setSelection(newSelection.rows);
                }}
            />
            }
    
            {rowsPerPage<101 &&
                        <DataGrid
                            components={{ Toolbar: GridToolbar }}
                            rows={get_search_data}
                            columns={columns}
                            pageSize={rowsPerPage}
                            rowsPerPageOptions={removeDuplicates([20,50,100,200,1000,2000,5000,show_counts,show_counts1,show_counts2,show_counts3])} 
                            checkboxSelection
                            onSelectionModelChange={(newSelectionArray) => {
                                setbranch_error(0)
                                setselected_rows(newSelectionArray);
                                handlestatusRestriction (newSelectionArray,get_search_data); 
                                //setSelection(newSelection.rows);
                            }}
                        />
            }







        </div>
    </Grid>

 }




 

    {user.is_marchant!=1 && 
        <div>
            <br></br><br></br>
            <UpdateStatus ref={SenderRecipientRef2}
                zone_countriesList={zone_countriesList}
                zone_districtsList={zone_districtsList}
                zone_divisionsList={zone_divisionsList}
                zone_upazilasList={zone_upazilasList}
                branchList={branchList}
                i_relationList={i_relationList}
                i_return_causeList={i_return_causeList}
                delivery_boyList={delivery_boyList}
                services_clientsList={services_clientsList_filtered}
                services_clients_branchList={services_clients_branchList}
                i_packaging_typeList={i_packaging_typeList_filtered}
                i_shipment_methodList={i_shipment_methodList}
                i_delivery_statusList={i_delivery_statusList}
                i_tracking_statusList={i_tracking_statusList}
                i_sms_templateList={i_sms_templateList}
                i_product_type_id={i_product_type_id}
                sender_category_1={sender_category_1}
                show_error={show_error}
                creator={user.id}
                branch={user.branch_id}
                switch_data_submitted={switch_data_submitted}
                switch_xlsx_active={switch_xlsx_active}
                status_update_restrict={status_update_restrict}
                status_receive_restrict={status_receive_restrict}
                selected_rows={selected_rows}
                otp_allow={otp_allow}
                status_update_restrict_4={status_update_restrict_4}
                status_update_restrict_5={status_update_restrict_5}
                status_update_restrict_6={status_update_restrict_6}
                status_update_restrict_7={status_update_restrict_7}
                status_update_restrict_8={status_update_restrict_8}
                status_update_restrict_9={status_update_restrict_9}
                status_update_restrict_10={status_update_restrict_10}
                status_update_restrict_3={status_update_restrict_3}
            />

            <Grid container spacing={6}>
                <Grid item md={5} lg={5} sm={6} xs={6}> </Grid>
                <Grid style={{textAlign:"center"}} item md={2} lg={2} sm={3} xs={3}>
                    {get_search_data.length > 0 && active_global_search == 0 &&
                        <Button color="primary" onClick={handleUpdateStatus} variant="contained"> <Icon>send</Icon> <Span sx={{ pl: 1, textTransform: "capitalize" }}>Update</Span> </Button> 
                    }
                </Grid>
                <Grid item md={5} lg={5} sm={6} xs={6}> </Grid>
            </Grid>
        </div>
    }
 

</div>



 


{/*-------------------------------------------------------------------------------------------------------------------------------------------------------*/}
<Grid container spacing={6}>
    <Grid item md={12} lg={12} sm={12} xs={12}>
        <div>
             
            <Dialog fullWidth={true} maxWidth={'lg'} onClose={popupClose} aria-labelledby="customized-dialog-title" open={popupOpen}>
                <DialogTitle id="customized-dialog-title" onClose={popupClose}> Invoice
                </DialogTitle>

                <DialogContent dividers className="element-to-print"    >

                    {invoice != null &&
                        <Grid container spacing={2}>
                            <Grid item xs={7}>
                                <img width="200" src='/assets/images/logo.png' />
                                <p style={{ margin: "18px 2px 2px 2px", fontSize: "14px" }} inline variant="body1" align=""><b>Address:</b> {business_address} </p>
                                <p style={{ margin: "2px", fontSize: "14px" }} inline variant="body1" align=""><b>Email: </b>{business_email}</p>
                                <p style={{ margin: "2px", fontSize: "14px" }} inline variant="body1" align=""><b>Web:</b> {business_web}</p>

                                <br></br>
                                <p style={{ margin: "2px", fontSize: "14px" }} inline variant="body1" align=""><b>Creator: </b>{invoice.creator}</p>
                                <p style={{ margin: "2px", fontSize: "14px" }} inline variant="body1" align=""><b>Created: </b>{invoice.created}</p>
                                <p style={{ margin: "2px", fontSize: "14px" }} inline variant="body1" align=""><b>Pickup:</b> {invoice.created_branch}</p>
                            </Grid>

                            <Grid item xs={3}>
                                <h2 align="right">-</h2>
                                <p style={{ margin: "2px", fontSize: "14px" }} inline variant="body1" align="right"><b>Ref. No: </b></p>

                                <p style={{ margin: "2px", fontSize: "14px" }} inline variant="body1" align="right"><b>Pickup Date: </b></p>
                                <p style={{ margin: "2px", fontSize: "14px" }} inline variant="body1" align="right"><b>Packaging Type: </b></p>
                                <p style={{ margin: "2px", fontSize: "14px" }} inline variant="body1" align="right"><b>Shipment Method: </b></p>
                                <p style={{ margin: "2px", fontSize: "14px" }} inline variant="body1" align="right"><b>Product Type: </b></p>
                                <p style={{ margin: "2px", fontSize: "14px" }} inline variant="body1" align="right"><b>Product Priority: </b></p>
                            </Grid>

                            <Grid item xs={2}>
                                <h2 inline variant="body1" align="right">INVOICE</h2>
                                <p style={{ margin: "2px", fontSize: "14px" }} inline variant="body1" align="right">{invoice.sender_ref_no_4}</p>
                                <p style={{ margin: "2px", fontSize: "14px" }} inline variant="body1" align="right">{invoice.pickup_date_3}</p>
                                <p style={{ margin: "2px", fontSize: "14px" }} inline variant="body1" align="right">{invoice.i_packaging_type}</p>
                                <p style={{ margin: "2px", fontSize: "14px" }} inline variant="body1" align="right">{invoice.i_shipment_method}</p>
                                <p style={{ margin: "2px", fontSize: "14px" }} inline variant="body1" align="right">{invoice.i_product_type}</p>
                                <p style={{ margin: "2px", fontSize: "14px" }} inline variant="body1" align="right">{invoice.i_priority}</p>
                            </Grid>
                            <Grid item xs={6}>

                                {invoice.i_delivery_status == 'Delivered' && invoice.otp_verified != "1" &&
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <br></br><br></br>
                                        <Grid item xs={3}>
                                            <TextField type="text" name="otp_write" id="standard-basic" value={otp_write} onChange={handleChangewriteotp} label="Write OTP*" />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Button color="primary" variant="contained">
                                                <Icon data-id={invoice.id} onClick={handleOtp}  >send</Icon>
                                                <Span data-id={invoice.id} onClick={handleOtp} sx={{ pl: 1, textTransform: "capitalize" }}>Verify OTP</Span>
                                            </Button>
                                        </Grid><hr></hr>

                                    </Grid>
                                }

                                {invoice.i_delivery_status == 'Delivered' && invoice.otp_verified == "1" &&
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <p><i>OTP Verified</i></p>
                                    </Grid>
                                }

                            </Grid>
                            <Grid item xs={6}>
                                <p style={{ margin: "2px", fontSize: "14px" }} inline variant="body1" align="right"><Barcode height="50" value={invoice.id} /></p>
                            </Grid>                            <Grid item xs={4}>
                                <h2 style={{ margin: "2px", fontSize: "16px" }} inline variant="body1" align="">Sender</h2>
                                <p style={{ margin: "2px", fontSize: "14px" }} inline variant="body1" align="">{invoice.sender_name_6}</p>
                                <p style={{ margin: "2px", fontSize: "14px" }} inline variant="body1" align="">{invoice.sender_phone_5}</p>
                                <p style={{ margin: "2px", fontSize: "14px" }} inline variant="body1" align="">{invoice.clients}</p>
                                <p style={{ margin: "2px", fontSize: "14px" }} inline variant="body1" align="">{invoice.client_branch}</p>

                            </Grid>
                            <Grid item xs={5}>
                                <h2 style={{ margin: "2px", fontSize: "16px" }} inline variant="body1" align="">Recipient</h2>
                                <p style={{ margin: "2px", fontSize: "14px" }} inline variant="body1" align="">{invoice.recipient_name_21}</p>
                                <p style={{ margin: "2px", fontSize: "14px" }} inline variant="body1" align="">{invoice.recipient_phone_20}</p>
                            </Grid>

                            <Grid item xs={2}>
                                <h2 style={{ margin: "2px", fontSize: "16px" }} align="">Payment Information</h2>
                                <p style={{ margin: "2px", fontSize: "14px" }} align=""><b>Payment Type: </b>{invoice.i_payment_type}</p>



         { invoice.collection_amount>0 &&
            <p style={{margin: "2px" , fontSize: "14px"}}   align=""><b>Collection Amount: </b></p> 
        }

        { invoice.cod_cost_percent>0 &&
            <p style={{margin: "2px" , fontSize: "14px"}}   align=""><b>COD Charge: </b></p> 
        }    

        { invoice.delivery_cost_amount>0 &&
            <p style={{margin: "2px" , fontSize: "14px"}}   align=""><b>Delivery Charge: </b></p> 
        }


        {(invoice.i_delivery_status=='Return in process' || invoice.i_delivery_status=='Return Received') &&  invoice.return_cost_amount>0 && 
                
                    <p style={{margin: "2px" , fontSize: "14px"}}   align=""><b>Return Charge: </b></p> 
                
        }

<p style={{margin: "2px" , fontSize: "14px"}}   align=""><b>Total Charge: </b>       
              </p>
                            </Grid>

                            <Grid item xs={1}>
                            <h2 style={{ margin: "2px", fontSize: "16px" }} align="">&nbsp;</h2>
                                <p style={{ margin: "2px", fontSize: "14px" }} align="">&nbsp;</p>

        { invoice.collection_amount>0 &&
            <p style={{margin: "2px" , fontSize: "14px"}}   align="right">{invoice.collection_amount.toLocaleString()}</p> 
        }

        { invoice.cod_cost_percent>0 &&
            <p style={{margin: "2px" , fontSize: "14px"}}   align="right">{invoice.cod_cost_percent.toLocaleString()}</p> 
        }    

        { invoice.delivery_cost_amount>0 &&
            <p style={{margin: "2px" , fontSize: "14px"}}   align="right">{invoice.delivery_cost_amount.toLocaleString()}</p> 
        }


        {(invoice.i_delivery_status=='Return in process' || invoice.i_delivery_status=='Return Received') &&  invoice.return_cost_amount>0 && 
                
                    <p style={{margin: "2px" , fontSize: "14px"}}   align="right">{invoice.return_cost_amount.toLocaleString()} </p> 
                
        }

<p style={{margin: "2px" , fontSize: "14px"}}   align="right">
              {(invoice.i_delivery_status=='Return in process' || invoice.i_delivery_status=='Return Received') &&  invoice.return_cost_amount>0 && 
                    <>{(parseInt(invoice.collection_amount)+parseInt(invoice.cod_cost_percent)+parseInt(invoice.delivery_cost_amount)+parseInt(invoice.return_cost_amount)).toLocaleString()}</>

              
                    
              }  
              {(invoice.i_delivery_status!='Return in process' && invoice.i_delivery_status!='Return Received')  && 
                  <>{(parseInt(invoice.collection_amount)+parseInt(invoice.cod_cost_percent)+parseInt(invoice.delivery_cost_amount)).toLocaleString()}</> 
              }
             
              </p>
                            </Grid>

                            <Grid item xs={12}>
                                <h2 style={{ margin: "2px", fontSize: "14px" }} >Tracking Status</h2>
                                
                                { get_search_data_tracking &&
                                <div style={{ height: 500, width: '100%' }}>
                                    <DataGrid rowHeight={25}
                                        rows={get_search_data_tracking}
                                        columns={columns2}
                                        pageSize={5}
                                        rowsPerPageOptions={[10]}
                                    />
                                </div>                                    
                                }
                            </Grid>

                        </Grid>
                    }
                </DialogContent>

                <DialogActions>
                    <Button onClick={popupClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog fullWidth={true} maxWidth={'lg'} onClose={popupPrintClose} aria-labelledby="customized-dialog-title" open={popupPrintOpen}>
                <DialogTitle id="customized-dialog-title" onClose={popupPrintClose}> Invoice
                </DialogTitle>

                <DialogContent dividers className="element-to-print_printall"    >

                    <ReactToPrint
                        trigger={() =>
                            <button variant="contained" color="primary" >Print this out!</button>}
                        content={() => InvoiceBulkRef.current}
                    />
                    {invoice_print != null &&
                        <div className="element-to-print11">
                            <InvoiceBulk ref={InvoiceBulkRef}
                                creator={user.id}
                                branch={user.branch_id}
                                invoice_print={invoice_print}
                                force_print8={force_print8}
                                tracking={1}
                                tracking_data={get_search_data_tracking}
                            />
                        </div>
                    }

                </DialogContent>
                <DialogActions>
                    <Button onClick={popupPrintClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    </Grid>
</Grid>
</ValidatorForm>


<br></br>


 





</div>
);
};


 
