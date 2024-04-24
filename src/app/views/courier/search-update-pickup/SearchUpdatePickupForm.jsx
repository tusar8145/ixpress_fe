 
/*Imports---------(1)*/
  
    
 
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Autocomplete, Box, Button, Card, Grid, Icon, IconButton, styled } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
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
import { useEffect, useRef, useState } from 'react';
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import * as XLSX from "xlsx";
import { base_url, business_address, business_email, business_web } from '../../../utils/constant';
import InvoiceBulk from "./_InvoiceBulk";
import SearchUpdate from "./_SearchUpdate";
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

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


dayjs.extend(customParseFormat);
const ExpansionPanel = styled(Accordion)(() => ({ "&.root": { boxShadow: "none", border: "1px solid rgba(0, 0, 0, .125)", "&:not(:last-child)": { borderBottom: 0 }, "&:before": { display: "none" }, "&$expanded": { margin: "auto" }, },}));const ExpansionPanelSummary = styled(AccordionSummary)({ "&.root": { minHeight: 56, marginBottom: -1, backgroundColor: "rgba(0, 0, 0, .03)", borderBottom: "1px solid rgba(0, 0, 0, .125)", "&$expanded": { minHeight: 56 }, }, "& .content": { "&$expanded": { margin: "12px 0" } },});const ExpansionPanelDetails = styled(AccordionDetails)(({ theme }) => ({ "&.root": { padding: theme.spacing(2) },}));

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const Alert = React.forwardRef(function Alert(props, ref) { return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;});
const TextField = styled(TextValidator)(() => ({ width: "100%", marginBottom: "16px", }));
const {format} = require('date-fns');
 
axios.defaults.headers.common['accessToken'] =  'JWT '+window.localStorage.getItem('accessToken');

export default function AddPodForm() {
 
/*------------------------------------------State-------------------------------------------------*/

const [t_delivery_cost_amount, sett_delivery_cost_amount] = useState(0);
const [t_collection_amount, sett_collection_amount] = useState(0);
const [t_cod_cost_percent, sett_cod_cost_percent] = useState(0);
const [t_return_cost_amount, sett_return_cost_amount] = useState(0);
const [t_amount_from_wallet, sett_amount_from_wallet] = useState(0);
const [t_amount_to_wallet, sett_amount_to_wallet] = useState(0); 

const [t_paid_ids, sett_paid_ids] = useState([]); 
const [t_collection_ids, sett_collection_ids] = useState([]); 

const [allow_collection, setallow_collection] = useState(1);
const [allow_paid, setallow_paid] = useState(1);

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
const [state, setState] = useState({range:'', username:'tusara',total_cost:'0',overwriting_cost:'0', total_cost:'0',collection_amount:'0',});   
const {range, overwriting_cost, total_cost, collection_amount, is_track_web, } = state;

const [expanded, setExpanded] = React.useState("panel1");
const [checked, setChecked] = React.useState(false);
const [checked_pickup, setchecked_pickup] = React.useState(true);
const [popupOpen, setpopupOpen] = useState(false);
const [hideotp, sethideotp] =useState(0);
const [product_info_json, setproduct_infoForm]= useState([{qty:"", remarks:"", fixed_cost:"", weight:"", dimension:"", }])
const [popupPrintOpen, setpopupPrintOpen] = useState(false);
const [search_count, setsearch_count] = useState(0);
var counter_=1
const [runsheed, setrunsheed] = useState(0);
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(20);
const [count_search, setcount_search] = useState(0);
const [loading,setloading] = useState(0);
const [branch_error,setbranch_error]  = useState(0);
const [force_print8,setforce_print8]  = useState(0);

 
const [table1, settable1] = useState([]);
const [table2, settable2] = useState([]);
const [table3, settable3] = useState([]);
const [table4, settable4] = useState([]);

 
const [general, setgeneral] = useState(0);
const [security, setsecurity] = useState(0);
const [others, setothers] = useState(0);

const currentx = new Date();
const datex = `${currentx.getDate()}/${currentx.getMonth()+1}/${currentx.getFullYear()}`;
 
  const handleChangePage = (event, newPage) => {
    //setloading(1)
    setPage(newPage);
    //console.log(newPage,'newPage')
    handleSubmit()
    //setloading(0)
  };

  const  printDocument=() => {
    setrunsheed(1)
  }


  const  printDocumentOk=() => {
    
    const input = document.getElementById('divToPrint');

 
	var doc = new jsPDF("p", "pt", "a4");
 
	// Convert HTML to PDF in JavaScript
	doc.html(input, {
		callback: function(doc) {
			doc.save("iXpress.pdf");
		},
		x: 10,
		y: 10
	});





    /*html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png',10);
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save("runsheed.pdf");
      })*/
    ;
    setrunsheed(0)
  }



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
    if(runsheed==1){
      printDocumentOk()
    }
    
  }, [runsheed]);


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

  { field: 'amount_from_wallet', headerName: 'Charge Paid', width: 110 },
  { field: 'amount_to_wallet', headerName: 'Collection Received', width: 150 },
  { field: 'payment', headerName: 'Payment', width: 110 },
  { field: 'delivery_boy_id_', headerName: 'Delivery Man', width: 130 },
  { field: 'delivery_boy_id', headerName: 'Delivery Man Id', width: 100 },
  { field: 'i_relation', headerName: 'Delivery Relation', width: 130 },
  { field: 'i_relation_person', headerName: 'Relation Name', width: 130 },
  { field: 'i_return_cause', headerName: 'Return Reason', width: 130 },

  { field: 'delivery_date', headerName: 'Status Date', width: 150 },
  { field: 'delivery_time', headerName: 'Time', width: 100 },
  
  { field: 'otp_verified', headerName: 'OTP Veryfied', width: 110 },
  { field: 'creator', headerName: 'Created by', width: 110 },
  { field: 'created_branch', headerName: 'Created Branch', width: 110 }, 
  { field: 'created', headerName: 'Created Date', width: 110 },
  { field: 'charge_trxid', headerName: 'Charge trxid', width: 140 }, 
  { field: 'collection_trxid', headerName: 'Collection trxid', width: 140 },
];

const rows = get_search_data;



const columns2: GridColDef[] = [
  { field: 'id', headerName: 'ID', minWidth: 40, flex: 1, hide: true }, 
  { field: 'date', headerName: 'Date', minWidth: 140, flex: 1 },
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

 
 function handleid_single_search(new_id,services_clientsList,services_clients_branchList) {
 
    console.log(new_id,'new_id')
  var active_global_search1 = localStorage.getItem('active_global_search');
  if (active_global_search1 == 1) { var bra = null } else { var bra = user.branch_id }
  const firsr_page_json = {
      "creator": user.id,
      "current_branch_id": bra,
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
      //for (var i = 0; i < get_.length; i++) {
        for (var i =get_.length-1 ; i > -1; i--) {
          cc++
          var obj = get_[i];
          var client = '';
          var client_branch = '';

          try {

              if (obj.sender_category_1 == 'corporate_sender') {

                console.log(services_clientsList,'services_clientsList')

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

var check_cost=obj.delivery_cost_amount+cod_+obj.return_cost_amount-obj.amount_from_wallet
var check_bal=obj.collection_amount-obj.amount_to_wallet


var payment='!'

if(check_cost==0 || check_bal==0){
    payment='Not Completed'
}

if(check_cost==0 && check_bal==0){
    payment='Completed'
}
var pp_date=obj.pickup_date_3.split("-").reverse().join("-").toString()


var delivery_date=null
//if(obj.i_delivery_status.i_delivery_status=='Delivered'){
    delivery_date=obj.delivery_date
//}




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
              delivery_boy_area:obj.delivery_boy_area,
              clients: client,
              client_branch: client_branch,
              sender_client_branch_id_8:obj.sender_client_branch_id_8,
              sender_client_id_7:obj.sender_client_id_7,
              sender_name_6: obj.sender_name_6,
              sender_phone_5: obj.sender_phone_5,
              current_branch: obj.current_branch.branch,
              otp_verified: obj.otp_verified,
              created_branch: obj.created_branch_.branch,
              creator: obj.creator1_.userName,
              created: obj.created,
              amount_from_wallet: obj.amount_from_wallet,
              amount_to_wallet: obj.amount_to_wallet,
              payment:payment,
              unique_upload_id:obj.unique_upload_id,
              charge_trxid:obj.charge_trxid,
              collection_trxid:obj.collection_trxid,
              ...(obj.i_relation_id ? { i_relation: obj.i_relation.i_relation } : {i_relation:'' }),
              ...(obj.i_return_cause_id ? { i_return_cause: obj.i_return_cause.i_return_cause } : {i_return_cause:''}),
              
              ...(obj.delivery_boy_id ? { delivery_boy_id_: obj.delivery_boy_id_.userName+ "("+obj.delivery_boy_id_.employee_id+")" } : {delivery_boy_id_:''}),
              ...(obj.delivery_boy_id ? { delivery_boy_id: obj.delivery_boy_id_.userID } : {delivery_boy_id:''}),
              ...(obj.i_relation_person ? { i_relation_person: obj.i_relation_person} : {i_relation_person:''}),
              delivery_date:delivery_date,
              charge_trxid_:obj.charge_trxid_?.created?.split("-").reverse().join("-").toString(),
              charge_trxid_creator:obj.charge_trxid_?.creator_?.userName,
              collection_trxid_:obj.collection_trxid_?.created?.split("-").reverse().join("-").toString(),
              collection_trxid_creator:obj.collection_trxid_?.creator_?.userName,
              


          }
          my_json.push(x_data);
          
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
        handlestatusRestriction (arr,my_json);
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
        "checked_pickup":checked_pickup,
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
       
        for (var i =get_.length-1 ; i > -1; i--) {
          
            cc++
            var obj = get_[i];
console.log(obj,'obj');
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
var check_cost=obj.delivery_cost_amount+cod_+obj.return_cost_amount-obj.amount_from_wallet
var check_bal=obj.collection_amount-obj.amount_to_wallet
var payment='!'

if(check_cost==0 || check_bal==0){
    payment='partially'
}

if(check_cost==0 && check_bal==0){
    payment='complete'
}


var pp_date=obj.pickup_date_3.split("-").reverse().join("-").toString()

var delivery_date=null
//if(obj.i_delivery_status.i_delivery_status=='Delivered'){
    delivery_date=obj.delivery_date
//}


var date=""
var time=""
var given=delivery_date || ""

if(given.length>9){
    date=given.substring(0,10)
}
if(given.length>11){
    time=given.substring(11,25)
}



            console.log(i,'x_data')
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

                sender_ref_no_4: obj.sender_ref_no_4,
                recipient_phone_20: obj.recipient_phone_20,
                recipient_name_21: obj.recipient_name_21,
                services: obj.services.services,
                i_sms_template_id_30: obj.i_sms_template_id_30,
              delivery_cost_amount: obj.delivery_cost_amount,
              collection_amount: obj.collection_amount,
              cod_cost_percent: cod_,
              return_cost_amount:obj.return_cost_amount,
              delivery_boy_area:obj.delivery_boy_area,
              payment:payment,
                clients: client,
                sender_client_branch_id_8:obj.sender_client_branch_id_8, 
                sender_client_id_7:obj.sender_client_id_7,
                client_branch: client_branch,
                sender_name_6: obj.sender_name_6,
                sender_phone_5: obj.sender_phone_5,
                current_branch: obj.current_branch.branch,
                otp_verified: obj.otp_verified,
                created_branch: obj.created_branch_.branch,
                creator: obj.creator1_.userName,
                created: obj.created,   
                unique_upload_id:obj.unique_upload_id,
                amount_from_wallet: obj.amount_from_wallet,
                amount_to_wallet: obj.amount_to_wallet,
                charge_trxid:obj.charge_trxid,
                collection_trxid:obj.collection_trxid,
                ...(obj.i_relation_id ? { i_relation: obj.i_relation.i_relation } : {i_relation:'' }),
                ...(obj.i_return_cause_id ? { i_return_cause: obj.i_return_cause.i_return_cause } : {i_return_cause:''}),
                
                ...(obj.delivery_boy_id ? { delivery_boy_id_: obj.delivery_boy_id_.userName+ "("+obj.delivery_boy_id_.employee_id+")" } : {delivery_boy_id_:''}),
                ...(obj.delivery_boy_id ? { delivery_boy_id: obj.delivery_boy_id_.userID } : {delivery_boy_id:''}),
                ...(obj.i_relation_person ? { i_relation_person: obj.i_relation_person} : {i_relation_person:''}),
  
                delivery_date:date,
                delivery_time:time,
                created_at: obj.created_at,
                updated_at: new Date (obj.updated_at).getTime(),
            }
            
            my_json.push(x_data);
            //
        } 
        setget_search_data(my_json);
        
        console.log(my_json,'pppppp')


 
             let p3=JSON.stringify(my_json)
             let p4=JSON.parse(p3)

            let new_my_json = p4.sort(function (a, b) {
                return  b.updated_at  -  a.updated_at
            });
        
                        //console.log(new_my_json2,'pppppp2')
        
 


        var start=0
        var tt1=[]
        var tt2=[]
        var tt3=[]
        var tt4=[]
        var gen=0
        var sec=0
        var others=0


        let t_count=new_my_json.length
        let t_div=Math.ceil(t_count/4)
        let t_next=t_count-(t_div*3)
        let round=0
        let round_inc=0



        for (var i=new_my_json.length-1; i >= 0; i--) {
            if(new_my_json[i].i_priority=='General'){
                gen++
            }
            else if(new_my_json[i].i_priority=='Security'){
                sec++
            }else{
                others++
            }



if(round==0){
    tt1.push(new_my_json[i])
    round_inc=round_inc+1
    if(round_inc==t_div){   round=1 ; round_inc=0  }
}
else if(round==1){
    tt2.push(new_my_json[i])
    round_inc=round_inc+1
    if(round_inc==t_div){   round=2 ; round_inc=0  }
}
else if(round==2){
    tt3.push(new_my_json[i])
    round_inc=round_inc+1
    if(round_inc==t_div){   round=3 ; round_inc=0  }
}
else if(round==3){
    tt4.push(new_my_json[i])
    round_inc=round_inc+1
}



           /* if(start==0){tt1.push(new_my_json[i])}
            if(start==1){tt2.push(new_my_json[i])}
            if(start==2){tt3.push(new_my_json[i])}
            if(start==3){tt4.push(new_my_json[i]); start=-1; }
            start++*/
         }

         setgeneral(gen)
         setsecurity(sec)
         setothers(others)


         settable1(tt1)
         settable2(tt2)
         settable3(tt3)
         settable4(tt4)

 


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


 
const deletes =() =>{

    let first_c_b=""
var done=0
            if(selected_rows.length>0){
            const date = format(new Date(), 'yyyy-MM-dd')
            var this_unique=new Date().valueOf().toString(); 
            const data1_collect=[]
            var c_b; var c_c
                for (var i = 0; i < selected_rows.length; i++) {
                    console.log(selected_rows[i],'test')

                    var filter = filterItemsequal(get_search_data, 'id', parseInt(selected_rows[i]));
                    c_b= filter[0].sender_client_branch_id_8
                    c_c= filter[0].	sender_client_id_7

                    if (first_c_b == "") {
                        first_c_b = c_b
                    } else {
                        if (first_c_b != c_b) {
                            alert("Selected All Client Branch should be same")
                            return
                        } 
                    }

                    //2.    [update pickup]
                    const data1 = {
                        id: selected_rows[i],
                        amount_to_wallet: filter[0].collection_amount,
                        services_clients_branch_id:c_b,
                        type:"send",
                        trxid:this_unique
                    }


                    data1_collect.push(data1)

                    
                }

                          for (var i = 0; i < data1_collect.length; i++) {
                                const res = axios.post(base_url + "delete_all", data1_collect[i]).then((response) => {
                                    console.log(response.data, 'res');
                                    done=1
                                }).catch(function (error) {
                                    if (error.response) { 
                                        done=0
                                        console.log(done, 'done');
                                    }
                                });
                        }
						
						handleSubmit()
                
            }else{
            setalert_def_txt('Nothing Selected')
            setalert_def_class('warning')
            handleClick()
            }

}



const collection_send =() =>{

    let first_c_b=""
var done=0
            if(selected_rows.length>0){
            const date = format(new Date(), 'yyyy-MM-dd')
            var this_unique=new Date().valueOf().toString(); 
            const data1_collect=[]
            var c_b; var c_c
                for (var i = 0; i < selected_rows.length; i++) {
                    console.log(selected_rows[i],'test')

                    var filter = filterItemsequal(get_search_data, 'id', parseInt(selected_rows[i]));
                    c_b= filter[0].sender_client_branch_id_8
                    c_c= filter[0].	sender_client_id_7

                    if (first_c_b == "") {
                        first_c_b = c_b
                    } else {
                        if (first_c_b != c_b) {
                            alert("Selected All Client Branch should be same")
                            return
                        } 
                    }

                    //2.    [update pickup]
                    const data1 = {
                        id: selected_rows[i],
                        amount_to_wallet: filter[0].collection_amount,
                        services_clients_branch_id:c_b,
                        type:"send",
                        trxid:this_unique
                    }


                    data1_collect.push(data1)

                    
                }

                //1.    [insert wallet] [update services branch]
                console.log(done, 'error');
               // if(done==1){

                    let selected_rows_text = selected_rows.toString();

                    
                    const master_submit = {
                        transaction_id: this_unique,
                        amount: t_collection_amount,
                        key: 'collection',
                        method: 'general',
                        account: '',
                        marchant_id:c_b,
                        client_id:c_c,
                        request_date: date,
                        created: date,
                        creator:  user.id,
                        approved_by: user.id,
                        approved_date: date,
                        invoices:selected_rows_text,
                    }
console.log(master_submit,'master_submit')
                    const res = axios.post(base_url + "insert_wallet", master_submit).then((response) => {



                        for (var i = 0; i < data1_collect.length; i++) {
                                const res = axios.post(base_url + "update_pickup_walet", data1_collect[i]).then((response) => {
                                    console.log(response.data, 'res');
                                    done=1
                                }).catch(function (error) {
                                    if (error.response) { 
                                        done=0
                                        console.log(done, 'done');
                                    }
                                });
                        }






                        console.log(response.data, 'res');
                        handleSubmit()
                    }).catch(function (error) {
                        if (error.response) {
                            console.log(error.response.data, 'error');
                        }
                    });                    
       




                
            }else{
            setalert_def_txt('Nothing Selected')
            setalert_def_class('warning')
            handleClick()
            }

}





 const paid_from =() =>{ 
    var done=0
    let first_c_b=""
    const data1_collect=[]
    if(selected_rows.length>0){
        
        var this_unique=new Date().valueOf().toString();  
        const date = format(new Date(), 'yyyy-MM-dd')
            var c_b; var c_c
            for (var i = 0; i < selected_rows.length; i++) {
                console.log(selected_rows[i],'test')

                var filter = filterItemsequal(get_search_data, 'id', parseInt(selected_rows[i]));
                c_b= filter[0].sender_client_branch_id_8
                c_c= filter[0].	sender_client_id_7

                if (first_c_b == "") {
                    first_c_b = c_b
                } else {
                    if (first_c_b != c_b) {
                        alert("Selected All Client Branch should be same")
                        return
                    }
                }


                //2.    [update pickup]
                var sum=filter[0].delivery_cost_amount+filter[0].cod_cost_percent+filter[0].return_cost_amount
                const data1 = {
                    id: selected_rows[i],
                    amount_to_wallet:sum,
                    services_clients_branch_id:c_b,
                    trxid:this_unique,
                    type:"paid",
                }
                data1_collect.push(data1)
                console.log(data1,'data1')


            }

            //1.    [insert wallet] [update services branch]
            //if(done==1){
               

                    
                    let selected_rows_invoices  = selected_rows.toString();
                    const master_submit = {
                        transaction_id: this_unique,
                        amount: t_delivery_cost_amount+t_cod_cost_percent+t_return_cost_amount,
                        key: 'paid',
                        method: 'general',
                        account: '',
                        marchant_id:c_b,
                        client_id:c_c,
                        request_date: date,
                        created: date,
                        creator:  user.id,
                        approved_by: user.id,
                        approved_date: date,
                        invoices:selected_rows_invoices,
                    }

                    const res = axios.post(base_url + "insert_wallet", master_submit).then((response) => {
                        console.log(response.data, 'res');


                        for (var i = 0; i < data1_collect.length; i++) {
                        const res = axios.post(base_url + "update_pickup_walet", data1_collect[i]).then((response) => {
                            console.log(response.data, 'res');
                            done=1
                        }).catch(function (error) {
                            if (error.response) {
                                done=0
                                console.log(error.response.data, 'error');
                            }
                        });
                    }


                        handleSubmit()
                    }).catch(function (error) {
                        if (error.response) {
                            console.log(error.response.data, 'error');
                        }
                    });                
           }

        else{
        setalert_def_txt('Nothing Selected')
        setalert_def_class('warning')
        handleClick()
        }
 }


function handlestatusRestriction (newSelectionArray,get_search_data) {

    //console.log('just');

    var this_id = 0; var any_intransit = 0; var any_received = 0; var ready_otp = 0;
    var t3 = 0; var t4 = 0; var t5 = 0; var t6 = 0; var t7 = 0; var t8 = 0; var t9 = 0;
console.log(newSelectionArray,'newSelectionArray')

var t_t_delivery_cost_amount=0
var t_t_collection_amount=0
var t_t_cod_cost_percent=0
var t_t_return_cost_amount=0
var t_t_amount_from_wallet=0
var t_t_amount_to_wallet=0
var this_marchant=null
var count_dup=0
var amount_to_wallet_issue=0
var amount_from_wallet_issue=0

    for (var i = 0; i < newSelectionArray.length; i++) {
var filter = filterItemsequal(get_search_data, 'id', parseInt(newSelectionArray[i]));

         t_t_delivery_cost_amount=t_t_delivery_cost_amount+filter[0].delivery_cost_amount
         t_t_collection_amount=t_t_collection_amount+filter[0].collection_amount
         t_t_cod_cost_percent=t_t_cod_cost_percent+filter[0].cod_cost_percent
         t_t_return_cost_amount=t_t_return_cost_amount+filter[0].return_cost_amount
         t_t_amount_from_wallet=t_t_amount_from_wallet+filter[0].amount_from_wallet
         t_t_amount_to_wallet=t_t_amount_to_wallet+filter[0].amount_to_wallet

         if(this_marchant==null){  this_marchant=filter[0].sender_client_branch_id_8 }else{
            if(this_marchant!=filter[0].sender_client_branch_id_8){count_dup++}
         }

         if(filter[0].amount_to_wallet>0){
            amount_to_wallet_issue=1
         }
         if(filter[0].amount_from_wallet>0){
            amount_from_wallet_issue=1
         }        
        
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






     if(count_dup>0){
            setallow_collection(0)
            setallow_paid(0)
     }else{
        
            if(amount_to_wallet_issue==1){
                setallow_collection(0)
            }else{
                setallow_collection(1)
            }

            if(amount_from_wallet_issue==1){
                setallow_paid(0)
            }else{
                setallow_paid(1)
            }
    }


 console.log(count_dup,'count_dup')

    sett_delivery_cost_amount(t_t_delivery_cost_amount)
    sett_collection_amount(t_t_collection_amount)
    sett_cod_cost_percent(t_t_cod_cost_percent)
    sett_return_cost_amount(t_t_return_cost_amount)
    sett_amount_from_wallet(t_t_amount_from_wallet)
    sett_amount_to_wallet(t_t_amount_to_wallet)


    console.log(t_t_delivery_cost_amount,t_t_collection_amount,t_t_cod_cost_percent,t_t_amount_from_wallet,'total')

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

    if (selected_rows == null) {
        setalert_def_txt('No Data Selected')
        setalert_def_class('warning')
        handleClick()
    }

    else if (selected_rows.length > 0) {
        const new_data = {
            creator: user.id,
            created: format(new Date(), 'yyyy-MM-dd'),
            source: user.branch_id,
        }

        const SenderRecipientMax = SenderRecipientRef2.current.getSenderRecipient();
console.log(SenderRecipientMax.pickup_reference_id,'SenderRecipientMax.pickup_reference_id')
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


        if (error == 0) {
            const final_json = Object.assign({}, new_data, SenderRecipientMax)

            const master_submit = []

            for (var i = 0; i < selected_rows.length; i++) {
                 console.log(selected_rows[i],'sss')
                const excel_get = { pickup_id: selected_rows[i], }
                let z2_excel = Object.assign({}, final_json, excel_get)
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

                    console.log(filter, 'filter1');
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
                    
}
else if(myArray.includes("5")==true){

                        var msg_get = response.data.result.otp + ' is OTP for delivery your '+i_product_type+', REF:' + ref + '. Thanks iXpress Ltd'

                        var this_msg = {
                            to : phn,    
                            message : msg_get 
                          };
                        pickup_sms_collection.push(this_msg);
                    }
                    /*else if(myArray.includes("1")==true){

                        var msg_get = 'Your '+i_product_type+' has been returned. Reference No: ' + ref + '. Thanks iXpress Ltd. Contact Number: 02-98830376-79'

                        var this_msg = {
                            to : phn,    
                            message : msg_get 
                          };
                        pickup_sms_collection.push(this_msg);
                    }*/


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
				
				
				
								
				
				
                else if (SenderRecipientMax.action_type == "return_completed") {
                    var filter = filterItemsequal(get_search_data, 'id', selected_rows[i]);
                    var phn = filter[0].recipient_phone_20;
                    var ref = filter[0].sender_ref_no_4;

                    //new
                    var i_product_type = filter[0].i_product_type;
                    var clients = filter[0].clients;
                    var i_sms_template_id_30 = filter[0].i_sms_template_id_30;

                    var id = selected_rows[i];

                    console.log(filter, 'filter1');
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
				
				
				
				
				
				
				
				
				
				
				
				
				
				

            }

            console.log(master_submit, 'master_submit2');
            const res = axios.post(base_url + "create_pickup_tracking", master_submit).then((response) => {
                setalert_def_txt('Action Completed'); setalert_def_class('success'); handleClick();
                setselected_rows(null);
console.log(response,'response456')
                if(selected_rows.length==1){
                    handleid_single_search(selected_rows['0'],services_clientsList,services_clients_branchList)
                }else{
                    handleSubmit()
                }
                

               // getData()
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


            
           // if(obj.date.slice(11, 16))

            //var f_d = obj.i_delivery_status.i_delivery_status + ' (' + obj.i_tracking_status.i_tracking_status + ')';
            var f_d = obj.i_delivery_status.i_delivery_status;
            var x_data = {
                id: obj.id,
                action_type: obj.action_type,
                created: obj.created,
                creator: obj.creator_.userName,
                date: t1_date+' '+t1_hour,
                time:obj.time,
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




const handleChangeglobal_pickup = (event) => {
  setchecked_pickup(event.target.checked);
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
    const arr_i_relation = [];  const arr_i_return_cause = [];  const arr_delivery_boy = []; const arr_operator_users =[]; const arr_services_clients = []; const arr_services_clients_branch = []; const arr_i_product_type = []; const arr_i_sms_template = []; const arr_i_tracking_status = []; const arr_i_payment_type = []; const arr_i_priority = []; const arr_services = []; const arr_i_packaging_type = []; const arr_i_shipment_method = []; const arr_i_delivery_status = []; const arr_i_zone = []; const arr_zone_countries = []; const arr_zone_districts = []; const arr_zone_divisions = []; const arr_zone_upazilas = []; const arr_branch = []; 
    await axios.post(base_url+"setup_config",basic_user).then((res) => {
        res.data.services_clients.map((temp) => { return arr_services_clients.push({value: temp.services_clients_id, label: temp.services_clients,services_id:temp.services_id,services_provider_id:temp.services_provider_id,i_sms_template_id:temp.i_sms_template_id,i_product_type_id:temp.i_product_type_id,services_packages_id:temp.services_packages_id}); }); setservices_clientsList(arr_services_clients) 
        res.data.services_clients_branch.map((temp) => { return arr_services_clients_branch.push({value: temp.services_clients_branch_id, label: temp.services_clients_branch,  services_clients_id: temp.services_clients_id}); }); setservices_clients_branchList(arr_services_clients_branch) 
        res.data.i_product_type.map((temp) => { return arr_i_product_type.push({value: temp.i_product_type_id, label: temp.i_product_type, services_id: temp.services_id}); }); seti_product_typeList(arr_i_product_type) 
        res.data.i_sms_template.map((temp) => { return arr_i_sms_template.push({value: temp.i_sms_template_id, label: temp.i_sms_template,have_general_sender:temp.have_general_sender,template:temp.message,}); }); seti_sms_templateList(arr_i_sms_template) 
        res.data.i_tracking_status.map((temp) => { return arr_i_tracking_status.push({value: temp.i_tracking_status_id,i_delivery_status_id: temp.i_delivery_status_id, label: temp.i_tracking_status}); }); seti_tracking_statusList(arr_i_tracking_status); console.log(arr_i_tracking_status,'arr_i_tracking_status') 
        res.data.i_payment_type.map((temp) => { return arr_i_payment_type.push({value: temp.i_payment_type_id, label: temp.i_payment_type,have_collection:temp.have_collection}); }); seti_payment_typeList(arr_i_payment_type) 
        res.data.i_priority.map((temp) => { return arr_i_priority.push({value: temp.i_priority_id, label: temp.i_priority}); }); seti_priorityList(arr_i_priority) 
        res.data.services.map((temp) => { return arr_services.push({value: temp.services_id, label: temp.services}); }); setservicesList(arr_services)
        res.data.i_packaging_type.map((temp) => { return arr_i_packaging_type.push({value: temp.i_packaging_type_id, label: temp.i_packaging_type, services_id:temp.services_id}); }); seti_packaging_typeList(arr_i_packaging_type)  
        res.data.i_shipment_method.map((temp) => { return arr_i_shipment_method.push({value: temp.i_shipment_method_id, label: temp.i_shipment_method}); }); seti_shipment_methodList(arr_i_shipment_method)  
        res.data.i_delivery_status.map((temp) => { return arr_i_delivery_status.push({value: temp.i_delivery_status_id, label: temp.i_delivery_status}); }); seti_delivery_statusList(arr_i_delivery_status)  
        res.data.i_zone.map((temp) => { return arr_i_zone.push({value: temp.i_zone_id, label: temp.i_zone}); }); seti_zoneList(arr_i_zone)  
      //SenderRecipient
        res.data.zone_countries.map((temp) => { return arr_zone_countries.push({value: temp.zone_countries_id, label: temp.zone_countries}); }); setzone_countriesList(arr_zone_countries)  
        res.data.zone_districts.map((temp) => { return arr_zone_districts.push({value: temp.zone_districts_id, label: temp.zone_districts, zone_divisions_id:temp.zone_divisions_id }); }); setzone_districtsList(arr_zone_districts)  
        res.data.zone_divisions.map((temp) => { return arr_zone_divisions.push({value: temp.zone_divisions_id, label: temp.zone_divisions, zone_countries_id:temp.zone_countries_id}); }); setzone_divisionsList(arr_zone_divisions)  
        res.data.zone_upazilas.map((temp) => { return arr_zone_upazilas.push({value: temp.zone_upazilas_id, label: temp.zone_upazilas, zone_districts_id:temp.zone_districts_id}); }); setzone_upazilasList(arr_zone_upazilas)  
        res.data.branch.map((temp) => { return arr_branch.push({value: temp.branch_id, label: temp.branch}); }); setbranchList(arr_branch)  
        res.data.delivery_boy.map((temp) => { return arr_delivery_boy.push({value: temp.userID, label: temp.userName, employee_id:temp.employee_id }); }); setdelivery_boyList(arr_delivery_boy)  
    
        res.data.operator_users.map((temp) => { return arr_operator_users.push({value: temp.userID, label: temp.userName, employee_id:temp.employee_id }); });  
    


        localStorage.setItem("arr_delivery_boy", JSON.stringify(arr_operator_users));

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
            }
             
        })
  }

},[selected_rows]);


useEffect(() => {
    
    console.log(services_clientsList,'services_clientsList')
   
   },[setservices_clientsList]);







useEffect(() => {
  const keyDownHandler = event => {
      if (event.key === 'Enter') {
          const id_single = localStorage.getItem('id_single');
          event.preventDefault();

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

}, [services_clientsList,services_clients_branchList]);










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
<div title="Advanced search" style={{ borderRadius: "3px", backgroundColor: "#6495ed36", padding: "10px", border: "3px solid cornflowerblue",  }}><Grid item md={12} lg={12} sm={12} xs={12} style={{ backgroundColor: "cornflowerblue", borderRadius: "3px", paddingLeft: "5px", color: "azure", fontSize: "26px", marginBottom: "1%" }}> <Icon>grain</Icon> Advanced search</Grid>
            {user.is_delivery_boy !=1 &&
 <>   <Grid container spacing={6}>

        <Grid item md={12} lg={12} sm={12} xs={12}>
            <Grid container spacing={4}>
           
  

 
    
      
    
        
    

   
                <Grid item md={3} lg={3} sm={12} xs={12}>
                    <Autocomplete {...servicesProps} disableClearable InputLabelProps={{ required: true }} onChange={(event, value) => {

                        if (value != null) {
                            if (value.value == 23 || value.value == 25) { setsender_category_1("general_sender"); } else { setsender_category_1("corporate_sender"); }
                            setfirstpage(previousState => { return { ...previousState, services_id: value.value } });
                            if (i_product_typeList.length > 0) { var filter = filterItems(i_product_typeList, 'services_id', value.value.toString()); seti_i_product_typeList_filtered(filter); } else { seti_i_product_typeList_filtered(null); }
                            if (i_packaging_typeList.length > 0) { var filter1 = filterItems(i_packaging_typeList, 'services_id', value.value.toString()); seti_packaging_typeList_filtered(filter1); } else { seti_packaging_typeList_filtered(null); }
                            if (services_clientsList.length > 0) { var filter2 = filterItems(services_clientsList, 'services_id', value.value.toString()); setservices_clientsList_filtered(filter2); } else { setservices_clientsList_filtered(null); }
                            seti_product_type_id(null);
                            setfirstpage(previousState => { return { ...previousState, i_product_type_id: null } });
                        }

                    }
                    } id="services_id_1" renderInput={(params) => (<TextField {...params} InputLabelProps={{ required: true }} label="Select Service Type" variant="standard" />)} />
                    {firstpage.services_id == null && show_error == 1 && <div> <p style={{ color: "red", marginTop: "-10px" }}>This field is required</p>  </div>}
                </Grid>

                <Grid item md={3} lg={3} sm={12} xs={12}>
                    <Autocomplete {...i_product_typeProps} disableClearable onChange={(event, value) => {
                        setfirstpage(previousState => { return { ...previousState, i_product_type_id: value.value } });
                        seti_product_type_id(value);
                    }}

                        value={i_product_type_id} id="i_product_type_id" SelectPodType renderInput={(params) => (<TextField {...params} label="Select Product Type:*" variant="standard" />)} />
                    {firstpage.i_product_type_id == null && show_error == 1 && <div> <p style={{ color: "red", marginTop: "-10px" }}>This field is required</p>  </div>}
                </Grid>

                <Grid item md={3} lg={3} sm={12} xs={12}>
                    <Autocomplete {...i_priorityProps} disableClearable onChange={(event, value) => { setfirstpage(previousState => { return { ...previousState, i_priority_id: value.value } }); }} id="i_priority_id" SelectPodType renderInput={(params) => (<TextField {...params} label="Select Product Priority:*" variant="standard" />)} />
                    {firstpage.i_priority_id == null && show_error == 1 && <div> <p style={{ color: "red", marginTop: "-10px" }}>This field is required</p>  </div>}
                </Grid>


                <Grid item md={3} lg={3} sm={12} xs={12}>
                    <Autocomplete {...i_payment_typeProps} disableClearable
                        onChange={(event, value) => {
                            setfirstpage(previousState => { return { ...previousState, i_payment_type: value.value } });
                            setswitch_have_collection(value.have_collection);
                        } }id="i_payment_type_id" SelectPodType renderInput={(params) => (<TextField {...params} label="Select Payment Type" variant="standard" />)} />
                    {firstpage.i_payment_type == null && show_error == 1 && <div> <p style={{ color: "red", marginTop: "-10px" }}>This field is required</p>  </div>}
                </Grid>


            </Grid>
        </Grid>               
    </Grid>
 </>
 }




    <br></br>

    <SearchUpdate ref={SenderRecipientRef}
        zone_countriesList={zone_countriesList}
        zone_districtsList={zone_districtsList}
        zone_divisionsList={zone_divisionsList}
        zone_upazilasList={zone_upazilasList}
        branchList={branchList}
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
        i_delivery_status_count={i_delivery_status_count}
    />


    <br></br> <Divider /> <br></br>


    <Grid container spacing={6}>
        <Grid item md={12} lg={12} sm={12} xs={12} >
            <Box>
                <ExpansionPanel square expanded={expanded === "panel1"} onChange={handleChangexx("panel1")}>
                    <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Typography>General Search</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container spacing={6}>
                            <Grid item md={2} lg={2} sm={6} xs={6}>
                                <Grid item md={4} lg={4} sm={6} xs={6}> <Checkbox checked={checked} onChange={handleChangeglobal} inputProps={{ 'aria-label': 'controlled' }} /> </Grid>
                                <Grid item md={8} lg={8} sm={6} xs={6}>Global Search Enable</Grid>
                            </Grid>
                            <Grid item md={4} lg={4} sm={6} xs={6}><RangePicker styl={{width:"100%"}} onChange={handleDateChange} format={dateFormat} /> 
                            <>
                             <Checkbox checked={checked_pickup} onChange={handleChangeglobal_pickup} inputProps={{ 'aria-label': 'controlled' }} /> 
Pickup Date  
                            </>
                            
                            
                            
                            </Grid>
                            <Grid item md={2} lg={2} sm={4} xs={4}><Button color="primary" data-id={1} onClick={handleSubmit} variant="contained" > <Icon>search</Icon> <Span sx={{ pl: 1, textTransform: "capitalize" }}>Search</Span> </Button> </Grid>
                            <Grid item md={2} lg={2} sm={8} xs={8} style={{textAlign:"right"}}><Button color="primary" data-id={1} onClick={printDocument} variant="contained" > <Icon>print</Icon> <Span sx={{ pl: 1, textTransform: "capitalize" }}>Run Sheed</Span>  </Button> </Grid>

                            <Grid item md={2} lg={2} sm={12} 
                            
                            sx={{
                                display: { xs: "none", lg: "block" }
                              }}
                            >
                            <Button color="primary" data-id={1} onClick={handlePrint} variant="contained"  style={{margin:"3px"}}> <Icon>print</Icon> <Span sx={{ pl: 1, textTransform: "capitalize" }}>Print ✖ 3</Span> </Button>  
                            <Button color="primary" data-id={1} onClick={handlePrint8} variant="contained" style={{margin:"3px"}}> <Icon>print</Icon> <Span sx={{ pl: 1, textTransform: "capitalize" }}>Print ✖ 8</Span>  </Button> 
                           </Grid>
                           
                           
                      


                        </Grid> 
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel square expanded={expanded === "panel2"} onChange={handleChangexx("panel2")}>
                    <ExpansionPanelSummary aria-controls="panel2d-content" id="panel2d-header">
                        <Typography>Scanner Search</Typography>
                    </ExpansionPanelSummary>

                    <ExpansionPanelDetails>
                        <Grid container spacing={6}>

                            <Grid item md={2} lg={2} sm={6} xs={6}>
                                <Grid item md={4} lg={4} sm={6} xs={6}> <Checkbox checked={checked} onChange={handleChangeglobal} inputProps={{ 'aria-label': 'controlled' }} /> </Grid> 
                                <Grid item md={8} lg={8} sm={6} xs={6}>Global Search Enable</Grid> 
                            </Grid>
                            <Grid item md={3} lg={4} sm={6} xs={6}> <TextField type="text" name="id_single" id="standard-basic" value={id_single || ""} onChange={handleid_single} label="Barcode & Press Enter*  " /> </Grid> 
                            <Grid item md={2} lg={2} sm={3} xs={6}> <Button color="primary" data-id={1} onClick={handleid_bulk_search} variant="contained" > <Icon>search</Icon> <Span sx={{ pl: 1, textTransform: "capitalize" }}>Search({search_count})</Span> </Button> </Grid>
                            <Grid item md={2} lg={2} sm={3} xs={6} style={{textAlign:"right"}}><Button color="primary" data-id={1} onClick={handlePrint} variant="contained" > <Icon>print</Icon> <Span sx={{ pl: 1, textTransform: "capitalize" }}>Print ✖ 3</Span> </Button> </Grid>
                            <Grid item md={2} lg={2} sm={3}    sx={{  display: { xs: "none", lg: "block" } }} ><Button color="primary" data-id={1} onClick={handlePrint8} variant="contained" > <Icon>print</Icon> <Span sx={{ pl: 1, textTransform: "capitalize" }}>Print ✖ 8</Span>  </Button> </Grid>
                            </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

{user.is_delivery_boy==0 &&
<>
{(user.is_update_status_payment==1 || user.is_setup_conf==1) && 
<>
                <ExpansionPanel square expanded={expanded === "panel3"} onChange={handleChangexx("panel3")}>
                    <ExpansionPanelSummary aria-controls="panel3d-content" id="panel3d-header">
                        <Typography>Make Payment</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container spacing={6}>
                            <Grid item md={5} lg={5} sm={6} xs={6}>
                            <p><b>Total Collection Amount:</b> {t_collection_amount.toLocaleString()}</p>
                            </Grid>

                            <Grid item md={5} lg={5} sm={6} xs={6}>   
                            <p><b>Total Delivery Cost:</b> {t_delivery_cost_amount.toLocaleString()}</p>
                            <p><b>Total COD Cost:</b> {t_cod_cost_percent.toLocaleString()}</p>
                            <p><b>Total Return Cost:</b> {t_return_cost_amount.toLocaleString()}</p><br></br>
                            <p><b>Total Cost:</b> {(t_delivery_cost_amount+t_return_cost_amount+t_cod_cost_percent).toLocaleString()}</p>
                            </Grid> 
                        </Grid>
                        <Grid container spacing={6}>
                            <Grid item md={5} lg={5} sm={6} xs={6}>
                            <hr></hr>
                            <p><b>Total Amount send to Wallet: </b> {t_amount_to_wallet.toLocaleString()}</p><br></br>
                                
                                {allow_collection==1 &&
                                     <Button color="primary" data-id={1} onClick={collection_send} variant="contained" > <Icon>send</Icon> <Span sx={{ pl: 1, textTransform: "capitalize" }}>Collection</Span>  </Button>
                                }
                            
                            
                            </Grid>

                            <Grid item md={5} lg={5} sm={6} xs={6}>  
                            <hr></hr>
                            <p><b>Total Amount paid from  Wallet: </b> {t_amount_from_wallet.toLocaleString()}</p><br></br> 
                                
                            {allow_paid==1 &&
                                <Button color="primary" data-id={1} onClick={paid_from} variant="contained" > <Icon>send</Icon> <Span sx={{ pl: 1, textTransform: "capitalize" }}>Paid</Span> </Button>
                            }
                            
                            </Grid> 
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
</>
}

</>
}



{user.is_delivery_boy==0 &&
<>
{(user.is_setup_conf==1) && 
<>
                <ExpansionPanel square expanded={expanded === "panel4"} onChange={handleChangexx("panel4")}>
                    <ExpansionPanelSummary aria-controls="panel4d-content" id="panel4d-header">
                        <Typography>Delete Pickup Record</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container spacing={6}>
						<Grid item md={5} lg={5} sm={6} xs={6}>
                            <Button color="primary" data-id={1} onClick={deletes} variant="contained" > <Icon>send</Icon> <Span sx={{ pl: 1, textTransform: "capitalize" }}>Deletes</Span>  </Button>
                        </Grid></Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
</>
}

</>
}





            </Box>
        </Grid>
    </Grid>



    <br></br>  <br></br>
 

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
        <Grid item xs={4}>{loading==1  && 
        <div style={{height:"20px", opacity: ".5"}}>
                    <ReactLoading type="bubbles"   color="blue"  style={{marginTop:"3px"}} /> 

        </div>
        
        }
        <TextField type="text"inputProps={ { readOnly: false, } } name="range" id="range" value={range || ""} onChange={handleChange} label="Print Range: (ex: 0-10)  " />

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
                columnVisibilityModel={{
                     
                    sender_name_6: false, 
                    sender_phone_5: false, 
                    i_packaging_type: false, 
                    i_payment_type: false, 
                    i_shipment_method: false, 

                    i_tracking_status: false, 

                    delivery_cost_amount: false, 
                    cod_cost_percent: false, 
                    return_cost_amount: false, 
                    amount_from_wallet: false, 
                    amount_to_wallet: false, 
                    payment: false, 
                    charge_trxid: false, 
 
                  }}
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
                            columnVisibilityModel={{
                     
                                sender_name_6: false, 
                                sender_phone_5: false, 
                                i_packaging_type: false, 
                                i_payment_type: false, 
                                i_shipment_method: false, 
            
                                i_tracking_status: false, 
            
                                delivery_cost_amount: false, 
                                cod_cost_percent: false, 
                                return_cost_amount: false, 
                                amount_from_wallet: false, 
                                amount_to_wallet: false, 
                                payment: false, 
                                charge_trxid: false, 
             
                              }}
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




<br></br><br></br><br></br>


        </div>
    </Grid>

 }



{(user.is_update_status_update==1 || user.is_setup_conf==1) &&
<>
    {user.is_marchant!=1 && branch_error==0 && get_search_data.length > 0 && active_global_search == 0 && selected_rows != '' &&
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
</>
}
 


 

</div>








 

{ runsheed==1 &&


<Grid container spacing={6} >
    <Grid item md={12} lg={12} sm={12} xs={12}>
    <div>
      <div id="divToPrint" className="mt4 this_class_sm" style={{
        
        width: '575px',
        padding: '10px',
 
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>

<Grid container spacing={2}>
<Grid item xs={12} style={{fontSize: "12px"}}>
{get_search_data.map((item, index) => (   
    <>
        { index==0 &&
                <> 
               <p style={{textAlign:'center'}}>
               <h4><img  style={{width: "140px"}} src='/assets/images/logo.png' />    </h4> 
                
                 Runsheet - <b>Assign to: </b> {item.delivery_boy_id_} {item.delivery_boy_id}  &nbsp; &nbsp;&nbsp; &nbsp;<b>Area: </b>  {item.delivery_boy_area}  &nbsp; &nbsp;&nbsp; &nbsp;<b> Print Date: </b>{datex}  <hr></hr></p>
                 {range_start &&
                        <p style={{textAlign:'center',fontSize:'9px'}}>
                        {checked_pickup==true &&
<>
Pickup Date
</>
                        }
{checked_pickup==false &&
<>
Assign Date  
</>
                        }
                        {' From '} <b>{range_start.split("-").reverse().join("/").toString()}</b>  {' To '} <b>{range_end.split("-").reverse().join("/").toString()}</b> 
                        </p>
                 }
                </>
        }
    </> 
))}
</Grid>
<Grid item xs={3}>
<table style={{fontSize: "8px"}}>
    {table1.map((item, index) => (
        <>
            { index==0 &&
                <tr>
                    <td>#SL</td>
                    <td>HWB NO.</td>
                </tr> 
            }
            <tr>
                <td>{counter_++}</td>
                <td>{item.id}</td>
            </tr> 
        </>
    ))} 
</table>
</Grid>
<Grid item xs={3}>
<table style={{fontSize: "8px"}}>
    {table2.map((item, index) => (
        <>
            { index==0 &&
                <tr>
                    <td>#SL</td>
                    <td>HWB NO.</td>
                </tr> 
            }
            <tr>
                <td>{counter_++}</td>
                <td>{item.id}</td>
            </tr> 
        </>
    ))} 
</table>
</Grid>
<Grid item xs={3}>
<table style={{fontSize: "8px"}}>
    {table3.map((item, index) => (
        <>
            { index==0 &&
                <tr>
                    <td>#SL</td>
                    <td>HWB NO.</td>
                </tr> 
            }
            <tr>
                <td>{counter_++}</td>
                <td>{item.id}</td>
            </tr> 
        </>
    ))} 
</table>
</Grid>
<Grid item xs={3}>
<table  style={{fontSize: "8px"}}>
    {table4.map((item, index) => (
        <>
            { index==0 &&
                <tr>
                    <td>#SL</td>
                    <td>HWB NO.</td>
                </tr> 
            }
            <tr>
                <td>{counter_++}</td>
                <td>{item.id}</td>
            </tr> 
        </>
    ))} 
</table>
</Grid>


            <Grid item xs={2}  style={{fontSize: "8px"}}>
            <br></br>
                Delivery Man Sign <br></br> <br></br> ___________________
            </Grid>
            <Grid item xs={8}  style={{fontSize: "10px"}}>
                    <br></br>
                    <table>
                    <tr>
                        <th>Type</th>
                        <th>Received</th>
                        <th>Delivered</th>
                        <th>Attach</th>
                        <th>RD</th>
                        <th>Rate</th>
                    </tr>
                    <tr>
                        <th>General</th>
                        <th>{general}</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <th>Security</th>
                        <th>{security}</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <th>Online Product</th>
                        <th>{others}</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    </table>
            </Grid>

            <Grid item xs={2} style={{fontSize: "8px",textAlign: "right"}}>
            <br></br>
                POD/Return Rec. By <br></br> <br></br> ___________________
            </Grid>

</Grid>



       </div>
    </div>
    </Grid>
</Grid>
 
}


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
                                range={range}
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
</div>
);
};


 
