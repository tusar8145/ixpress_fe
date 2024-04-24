 
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
  { name: 'Hold', amount: hold, icon: 'settings_power', id:9 },
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




/*JSON Import*/
const readUploadFile = (e) => {
  //  e.target.value = null;
  e.preventDefault();
  console.log('111');
  try {
      if (e.target.files) {
          const reader = new FileReader();
          reader.onload = (e) => {
              const data = e.target.result;
              const workbook = XLSX.read(data, { type: "array" });
              const sheetName = workbook.SheetNames[0];
              const worksheet = workbook.Sheets[sheetName];
              const json = XLSX.utils.sheet_to_json(worksheet);
              setjson_upload(json);
              console.log(Object.keys(json).length);
              setcount_xlsx_item(Object.keys(json).length);
              setswitch_xlsx_active(1)
              //console.log(json);
              //json validate
              var error = 0;
              var line = '';
              for (var i = 0; i < json.length; i++) {
                  console.log('checking');
                  var obj = json[i];
                  var phn = json[i].phone.toString();
                  try {
                      if (obj['reference'].length > 2 && obj['name'].length > 2 && obj['address'].length > 2 && phn.length > 10) {
                      } else {
                          error = 1;
                          line = line + '/' + (i + 1);
                      }
                  }
                  catch (err) { error = 1; }
              }

              if (error == 1) {
                  console.log(json);
                  setjson_upload(null)
                  setcount_xlsx_item(0)
                  setswitch_xlsx_active(1)

                  setalert_def_txt('Fail! XLSX File not Correct Line: ' + line)
                  setalert_def_class('warning')
                  handleClick()
                  //setalert_def_txt('Data Submitted Successfully!')
              }
              console.log('error ', error);
          };
          reader.readAsArrayBuffer(e.target.files[0]);
      }
  }
  catch (err) { }
}


  const [img_col, setimg_col] = useState(null);

const doSomething = function (e) {
    
    e.preventDefault();

console.log(11111111)

    var formData = new FormData(); 

    const fileInput = document.querySelector('input[type="file"]'); 
   

for (let y=0; y<fileInput.files.length; y++){
    //console.log(fileInput.files[y],'okk')
    formData.append(`file-${y}`, fileInput.files[y], fileInput.files[y].name);
    //console.log(formData,'formData')
}





setloading_pod(1)
        fetch(base_url +'pod/'+fileInput.files.length, {
            method: 'POST',
            body: formData,
        })
 
        .then((res) => res.json())
        .then((data) => {
            setalert_def_txt(fileInput.files.length +' Files Upload Completed'); setalert_def_class('success'); handleClick();
            setloading_pod(0)
            console.log(data, '1')

   

            //remove selected files    

        })
        .catch((err) => console.error(err, '2'));  
}

 const onFileChange = function (e) {
    e.preventDefault();
    console.log(55555)
    setimg_col(e.target.files)
}


/*------------------------------------------Handler & Function-------------------------------------------------*/

const handleid_single = (event) => {
  if(event.target.value!=null){
    localStorage.setItem('id_single', event.target.value);
    setid_single(event.target.value)
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
          console.log(x_data,'z2_excel_1')
      }
      
      if(get_.length>0){
              var previous_ids_=localStorage.getItem('previous_ids'); 
            if(previous_ids_!=null){
                    var x_count=previous_ids_.split(",")
                    const withoutDuplicates = [...new Set(x_count)];
                    setsearch_count(withoutDuplicates.length)

            }
            
      } 


      setalert_def_txt(cc + ' Result found'); setalert_def_class('success'); handleClick();
      localStorage.setItem('result_found', 1);
      setget_search_data(my_json);

      console.log(my_json,'mylen')
      
      if(my_json.length==1){
        setinvoice_print(my_json)
        console.log(my_json,'my_jsonmy_json')
        handleViewDetails(my_json[0].id,my_json[0])
        const arr = [  my_json[0].id  ];
        setselected_rows(arr)
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
    setselected_rows(''); setloading(1);
   
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
        setalert_def_txt(counts.toLocaleString() + ' Result found'); setalert_def_class('success'); handleClick();
        seti_delivery_status_count(null)
        setget_search_data_tracking(null);
        //Reset values
    }).catch(function (error) { if (error.response) { console.log(error.response.data); } });

};

function handlestatusRestriction (newSelectionArray,get_search_data) {
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
    }
}



const handleUpdateStatus = () => {
    
const SenderRecipientMax = SenderRecipientRef2.current.getSenderRecipient();

if (SenderRecipientMax.action_type == "search_data"){

}else{
    setupdatenow(0)
    if (selected_rows == null) {
        setalert_def_txt('No Data Selected')
        setalert_def_class('warning')
        handleClick()
    }

    else if (selected_rows.length > 0) {
        const new_data = {
            creator: user.id,
            created: format(new Date(), 'yyyy-MM-dd'),
        }

        
        console.log(SenderRecipientMax,'SenderRecipientMax.pickup_reference_id')
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

            for (var i = 0; i < selected_rows.length; i++) {
                // console.log(selected_rows[i],'sss')
                const excel_get = { pickup_id: selected_rows[i], }
                let z2_excel = Object.assign({}, final_json, excel_get)
              
                console.log(z2_excel,'z2_excel')

                if(z2_excel.i_delivery_status_id_18 != previous_delivery_status){
                    master_submit.push(z2_excel);

                                                        //jodi delivery hoi sob gula selected row te otp bosabo & sms korbo

                                                        console.log(SenderRecipientMax.action_type, 'wrer', 'ewrr');
                                                        if (SenderRecipientMax.action_type == "deliverd_to_recipient") {
                                                            var filter = filterItemsequal(get_search_data, 'id', selected_rows[i]);
                                                            var phn = filter[0].recipient_phone_20;
                                                            var ref = filter[0].sender_ref_no_4;

                                                                                //new
                                                                                var i_product_type = filter[0].i_product_type;
                                                                                var clients = filter[0].clients;
                                                                                var i_sms_template_id_30 = filter[0].i_sms_template_id_30;


                                                            var id = selected_rows[i];

                                                            console.log(phn, id, 'id');
                                                            const set_data = {
                                                                phn: phn,
                                                                id: id,
                                                            }


                                                            var pickup_sms_collection=[]
                                                            const resxx = axios.post(base_url + "set_otp_db", set_data).then((response) => {
                                                                //console.log(response.data.result.otp, 'otp');
                                                                
                                                                //send sms
                                                                //
                                                                /*const url = "http://portal.metrotel.com.bd/smsapi?api_key=C200220963982415234249.96775123&type=text&contacts=" + phn + "&senderid=8809612444336&msg=" + msg_get;
                                                                axios.post(url).then((response) => { console.log(response); }).catch(function (error) { if (error.response) { } });*/
                                                                //console.log('sms send');

                                                        
                                        const myArray = i_sms_template_id_30.split(",");



                                       if (myArray.includes("4")==true){

                                            var msg_get = 'Your '+i_product_type+' is delivered. Thanks iXpress Ltd'

                                            var this_msg = {
                                                to : phn,    
                                                message : msg_get 
                                            };
                                            pickup_sms_collection.push(this_msg);
                                        
                    } else if(myArray.includes("5")==true){

                                                                var msg_get = response.data.result.otp + ' is OTP for delivery your '+i_product_type+', REF:' + ref + '. Thanks iXpress Ltd'

                                                                var this_msg = {
                                                                    to : phn,    
                                                                    message : msg_get 
                                                                };
                                                                pickup_sms_collection.push(this_msg);

                                        }                     else if(myArray.includes("1")==true){

                                            var msg_get = 'Your '+i_product_type+' has been returned. Reference No: ' + ref + '. Thanks iXpress Ltd. Contact Number: 02-98830376-79'
                    
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
                                                            



                                                                //console.log(response);
                                                            }).catch(function (error) {
                                                                if (error.response) {
                                                                    console.log(error.response.data, 'error');
                                                                    error = 1;
                                                                }
                                                            });
                                                        }                    
                }
                

 




            }

            console.log(master_submit, 'master_submit2');
            const res = axios.post(base_url + "create_pickup_tracking", master_submit).then((response) => {
               // setalert_def_txt('Action Completed'); setalert_def_class('success'); handleClick();
                setselected_rows(null);
console.log(response,'response456')
              /*  if(selected_rows.length==1){
                    handleid_single_search(selected_rows['0'],services_clientsList,services_clients_branchList)
                }else{
                    handleSubmit()
                }*/
                

              //  getData()
               // setselected_rows(null)
                //console.log(response);
            }).catch(function (error) {
                if (error.response) {
                    console.log(error.response.data, 'error');
                    error = 1;
                }
            });
        }

        if (error == 1) {
            setalert_def_txt('Please fill in all required fields')
            setalert_def_class('warning')
            handleClick()
        }
    } else {
        setalert_def_txt('No Data Selected')
        setalert_def_class('warning')
        handleClick()
    }
}



};


function handleViewDetails(this_selected_rows, thisRow) {
    console.log(this_selected_rows,'this_selected_rows',thisRow,'thisRow')
    setinvoice(thisRow)
    console.log(thisRow, 'call handleViewDetails');
    const master_submit = { selected_rows: this_selected_rows }
    const res = axios.post(base_url + "get_tracking", master_submit).then((response) => {
        setalert_def_txt('Action Completed'); setalert_def_class('success'); handleClick();

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
        setalert_def_txt(cc + ' Tracking found'); setalert_def_class('success'); handleClick();
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



const getData = async () => {
 var abc =[]
 var all_access = localStorage.getItem('all_access');

 abc = {
    branch_id: user.branch_id,
    current_branch_id: user.branch_id,
    sender_client_id_7: null,
    is_delivery_boy:user.is_delivery_boy,
    delivery_boy_id:user.id,
}

 //all_access=0;
  /*  if(all_access!=1){

          abc = {
            branch_id: user.branch_id,
            current_branch_id: user.branch_id,
            sender_client_id_7: null,
            is_delivery_boy:user.is_delivery_boy,
            delivery_boy_id:user.id,
        }
    }else{
          abc = {
            delivery_boy_id:user.id,
            sender_client_id_7: null,
            is_delivery_boy:user.is_delivery_boy,
        }
    }*/
 
  //for marchant overwrite
 
if(user.is_marchant==1){

    abc = {
        sender_client_id_7: null,
        user_id:user.id,
        is_delivery_boy:user.is_delivery_boy,
        delivery_boy_id:user.id,
    }

    /*if(all_access!=1){

        abc = {
          branch_id: user.branch_id,
          current_branch_id: user.branch_id,
          sender_client_id_7: null,
          user_id:user.id,
          is_delivery_boy:user.is_delivery_boy,
          delivery_boy_id:user.id,

      }
  }else{
        abc = {
          sender_client_id_7: null,
          user_id:user.id,
          is_delivery_boy:user.is_delivery_boy,
          delivery_boy_id:user.id,
      }
  }*/
}


  console.log(abc, 'abc');

  await axios.post(base_url + "stock_counts", abc).then((res) => {
console.log(res,'res')
      setprocessing(res.data.processing)
      setshipped(res.data.shipped)
      setin_transit(res.data.in_transit)
      sethold(res.data.hold)
      setreturn_process(res.data.return_process)
      setbooking(res.data.booking)
      setout_for_deli(res.data.out_for_deli)
      setexception(res.data.exception)
      
      
      
      //res.data.services_clients.map((temp) => { return arr_services_clients.push({value: temp. 
  });
};
 


useEffect(() => {

  getData();
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




useEffect(() => {
     if(updatenow==1){
             handleUpdateStatus()
     }
     console.log('call66',updatenow)
},[updatenow]);



useEffect(() => {
    //inputReference.current.focus();
}, []);



useEffect(() => {
    const keyDownHandler = event => {

    


      if (  event.key === '+') {

        event.preventDefault();
         // console.log(selected_rows,'selected_rows')
         handleUpdateStatus()
         
         
         //inputReference.current.focus();
      }
        if (event.key === 'Enter') {
            event.preventDefault();
            handleUpdateStatus()
            const id_single = localStorage.getItem('id_single');
            
  
            var previous_ids = localStorage.getItem('previous_ids');
            if (id_single != null) {                
                if (previous_ids != null) {
                    var new_id = previous_ids + ',' + id_single.toString()
                } else {
                    var new_id = id_single.toString()
                }
  
                //view search result for single iteams
                handleid_single_search(id_single,services_clientsList,services_clients_branchList)
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
 



 


{/*-------------------------------------------------------------------------------------------------------------------------------------------------------*/}
 
</ValidatorForm>


<br></br>


<div title="Advanced search" style={{ borderRadius: "3px", backgroundColor: "#6495ed36", padding: "10px", border: "3px solid cornflowerblue",}}><Grid item md={12} lg={12} sm={12} xs={12} style={{ backgroundColor: "cornflowerblue", borderRadius: "3px", paddingLeft: "5px", color: "azure", fontSize: "26px", marginBottom: "1%" }}> <Icon>grain</Icon>POD File Upload (jpg)</Grid>

        <Grid container spacing={6}>
            
                <Grid   item md={6} lg={6} sm={6} xs={6}><form onSubmit={doSomething} style={{ marginTop: " 50px" }}>
                      {loading_pod == 1 && <ReactLoading type="bubbles" color="blue" />}
                    <div className=" ">
                        <input onChange={onFileChange} type="file" name="imgCollection" multiple />
                    </div>
             
                    <div className=" " style={{marginLeft:"70%"}}>

                        {loading_pod == 1 ?

                            <>
                                 <Button disabled color="primary" type="submit"  tabIndex= {-1}   data-id={1} onClick={handleid_bulk_search} variant="contained" > <Icon>upload</Icon> <Span sx={{ pl: 1, textTransform: "capitalize" }}>Upload </Span> </Button>

                            </>


                            : <>

<Button color="primary" type="submit"  tabIndex= {-1}   data-id={1} onClick={handleid_bulk_search} variant="contained" > <Icon>upload</Icon> <Span sx={{ pl: 1, textTransform: "capitalize" }}>Upload </Span> </Button>
 
                            </>}


                    </div>
                     
              </form>  </Grid>
            
        </Grid>
</div>





</div>
);
};


 
