 
/*Imports---------(1)*/
  
   
 
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Autocomplete, Box, Button, Card, Grid, Icon, IconButton, styled, Tooltip } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import { DataGrid, GridApi, GridCellValue, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { DatePicker } from 'antd';
import { Small, Span } from 'app/components/Typography';
import useAuth from 'app/hooks/useAuth';
import axios from "axios";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import * as XLSX from "xlsx";
import { base_url, business_address, business_email, business_web } from '../../../../utils/constant';
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
 


dayjs.extend(customParseFormat);
const ExpansionPanel = styled(Accordion)(() => ({ "&.root": { boxShadow: "none", border: "1px solid rgba(0, 0, 0, .125)", "&:not(:last-child)": { borderBottom: 0 }, "&:before": { display: "none" }, "&$expanded": { margin: "auto" }, },}));const ExpansionPanelSummary = styled(AccordionSummary)({ "&.root": { minHeight: 56, marginBottom: -1, backgroundColor: "rgba(0, 0, 0, .03)", borderBottom: "1px solid rgba(0, 0, 0, .125)", "&$expanded": { minHeight: 56 }, }, "& .content": { "&$expanded": { margin: "12px 0" } },});const ExpansionPanelDetails = styled(AccordionDetails)(({ theme }) => ({ "&.root": { padding: theme.spacing(2) },}));

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const Alert = React.forwardRef(function Alert(props, ref) { return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;});
const TextField = styled(TextValidator)(() => ({ width: "100%", marginBottom: "16px", }));

 
  const {format} = require('date-fns');
 
 
export default function AddPodForm() {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChangexx = (panel) => (_, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleChangewriteotp = (event) => {
    setotp_write(event.target.value);
   
  };

  
  const { RangePicker } = DatePicker;
  const dateFormat = 'YYYY-MM-DD';

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
  };
  const [checked, setChecked] = React.useState(false);

  

  const handleid_single = (event) => {
 
    if(event.target.value!=null){
      localStorage.setItem('id_single', event.target.value);
      setid_single(event.target.value)
    }
};

const handleid_bulk_search = (event) => {
  var previous_ids1=localStorage.getItem('previous_ids'); 
  handleid_single_search(previous_ids1)
  localStorage.removeItem("previous_ids");
};


function handleid_single_search  (new_id) {




  var active_global_search1=localStorage.getItem('active_global_search');  

  if(active_global_search1==1){
    var bra=null
  }else{
    var bra=user.branch_id
  }

  const firsr_page_json={
    "creator":user.id,
    "current_branch_id":bra,
    "ids":new_id
   }

  axios.post(base_url + "search_data_id", firsr_page_json).then((response) => {  
console.log(response.data,'response.data.result');

const my_json=[]
var cc=0;
const get_=response.data.result;
for (var i = 0; i < get_.length; i++){
cc++
var obj = get_[i];


var client='';
var client_branch='';

//console.log(services_clientsList);


try {
  if(obj.sender_category_1=='corporate_sender'){
var  filter2 =filterItemsequal(services_clientsList, 'value', obj.sender_client_id_7); 
client=filter2[0].label;

var  filter3 =filterItemsequal(services_clients_branchList, 'value', obj.sender_client_branch_id_8); 
client_branch=filter3[0].label;
}
  
} catch (error) {
  console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // (Note: the exact output may be browser-dependent)
}
/* */

  var x_data={
      id:obj.id,
      pickup_date_3:obj.pickup_date_3,
      i_delivery_status:obj.i_delivery_status.i_delivery_status,
      i_packaging_type:obj.i_packaging_type.i_packaging_type,
      i_payment_type:obj.i_payment_type.i_payment_type,
      i_priority:obj.i_priority.i_priority,
      i_product_type:obj.i_product_type.i_product_type,
      i_shipment_method:obj.i_shipment_method.i_shipment_method,
      i_tracking_status:obj.i_tracking_status.i_tracking_status,
      recipient_address_24:obj.recipient_address_24,
    
      sender_ref_no_4:obj.sender_ref_no_4,
      recipient_phone_20:obj.recipient_phone_20,
      recipient_name_21:obj.recipient_name_21,
      services:obj.services.services,
      overwriting_cost_5:obj.overwriting_cost_5,
      total_cost_6:obj.total_cost_6,
      collection_amount_7:obj.collection_amount_7,
      clients:client,
      client_branch:client_branch,
      sender_name_6:obj.sender_name_6,
      sender_phone_5:obj.sender_phone_5,
      current_branch:obj.current_branch.branch,
      otp_verified:obj.otp_verified,
      created_branch:obj.created_branch_.branch,
      creator:obj.creator1_.userName,
      created:obj.created

  }

  my_json.push( x_data );
//console.log(obj.i_shipment_method_id_17,'i_shipment_method_id_17');


 



setget_search_data_tracking([]);
}

setalert_def_txt(cc+' Result found');  setalert_def_class('success');  handleClick();



localStorage.setItem('result_found',1);

setget_search_data(my_json);
seti_delivery_status_count(null)
        //Reset values
    }).catch(function(error) {  if (error.response) {  console.log(error.response.data); }   });




 
   //view search result for all comma separated iteams



};





  const handleDateChange = (value) => {

      if(value!=null){
          setrange_start(format(value[0].$d,'yyyy-MM-dd'));
        setrange_end(format(value[1].$d,'yyyy-MM-dd'));

      console.log(range_start,'range_start',range_end,'range_end');
      }


    
};





const DialogTitleRoot = styled(MuiDialogTitle)(({ theme }) => ({
  margin: 0,
  padding: theme.spacing(2),
  '& .closeButton': {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const DialogTitle = (props) => {
  const { children, onClose } = props;
  return (
    <DialogTitleRoot disableTypography>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className="closeButton" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitleRoot>
  );
};

const DialogContent = styled(MuiDialogContent)(({ theme }) => ({
  '&.root': { padding: theme.spacing(2) },
}));

const DialogActions = styled(MuiDialogActions)(({ theme }) => ({
  '&.root': { margin: 0, padding: theme.spacing(1) },
}));

const [popupOpen, setpopupOpen] = useState(false);

const [hideotp, sethideotp] = useState(0);

const popupClickOpen = () => setpopupOpen(true);

const popupClose = () => setpopupOpen(false);

const [popupPrintOpen, setpopupPrintOpen] = useState(false);

const popupPrintClickOpen = () => setpopupPrintOpen(true);

const popupPrintClose = () => setpopupPrintOpen(false);



    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 40 },
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
        
        { field: 'clients', headerName: 'Client Branch', width: 150 },
        { field: 'client_branch', headerName: 'Branch', width: 150 },
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
        { field: 'overwriting_cost_5', headerName: 'Overwrite Cost', width: 110 },
        { field: 'total_cost_6', headerName: 'Generated Cost', width: 110 },
        { field: 'collection_amount_7', headerName: 'Collection Amount', width: 110 },
        { field: 'otp_verified', headerName: 'OTP Veryfied', width: 110 },
        { field: 'creator', headerName: 'Created by', width: 110 },
        { field: 'created_branch', headerName: 'Created Branch', width: 110 }, 
        { field: 'created', headerName: 'Created Date', width: 110 },
      ];
      
      const rows = get_search_data;





      const columns2: GridColDef[] = [
        { field: 'id', headerName: 'ID', minWidth: 40, flex: 1, hide: true }, 
         { field: 'date', headerName: 'Date', minWidth: 100, flex: 1 },
        { field: 'action_type', headerName: 'Action Key', minWidth: 160 , flex: 1},
       
        { field: 'pickup_reference_id', headerName: 'Signature', minWidth: 100 , flex: 1},
        { field: 'source', headerName: 'Origin', minWidth: 170, flex: 1 },
        { field: 'destination', headerName: 'Destination', minWidth: 170, flex: 1 },

         { field: 'creator', headerName: 'Creator', minWidth: 100, flex: 1 },
        { field: 'i_delivery_status_id_18', headerName: 'Delivery Status', minWidth: 150, flex: 3 },
 
  
      
       
      ];
      
      //const rows2 = get_search_data_tracking;


      





    /*  const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        { field: 'age', headerName: 'Age',  type: 'number',  width: 90, },
        { field: 'fullName',  headerName: 'Full name',
          description: 'This column has a value getter and is not sortable.',  sortable: false,  width: 160,
          valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
      ];*/


 

  const Item = styled(Paper)(({ theme }) => ({ backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff', ...theme.typography.body2, padding: theme.spacing(1), textAlign: 'center', color: theme.palette.text.secondary, }));
  //system variables
  const { logout, user } = useAuth();
  const SenderRecipientRef=useRef();
  const SenderRecipientRef2=useRef();
  const InvoiceBulkRef=useRef();
  /*function set_i_sms_template_id(value) {
    var _i_sms_template_id=''; for (var i = 0; i < value.length; i++) { _i_sms_template_id=_i_sms_template_id+','+value[i].value;  }   seti_sms_template_id(_i_sms_template_id.substring(1));
    }*/
  const filterItems = (arr, field, value) => { try { if (field != null) { return arr.filter((item) => { return item[field].includes(value) }) }} catch (error) { console.error(error);}}
  const filterItemsequal = (arr, field, value) => { try { if (field != null) { return arr.filter((item) => { return item[field]==value }) }} catch (error) { console.error(error);}}
  //product_info_4
  const [product_info_json, setproduct_infoForm]= useState([{ qty:"", remarks:"", fixed_cost:"", weight:"", dimension:"", }])
  const handleCheck = (index, e, selected)=>{ console.log(index, e.target.value, selected); let temp = [...product_info_json]; temp[index][selected] = e.target.value; setproduct_infoForm(temp); } 
  const handleNewRow = () => { setproduct_infoForm([...product_info_json,{ qty:"", remarks:"", fixed_cost:"", weight:"", dimension:"", }])}
  const handleClick = () =>{ setOpen(true); };
  const handleClose = (event, reason) => { if (reason === 'clickaway') { return; } setOpen(false); };
  const handleChange = (event) => { event.persist(); setState({ ...state, [event.target.name]: event.target.value });  };
  const handleRemoveXlsx = () =>{    setswitch_xlsx_active(0);   setjson_upload(null);   };

  const {format} = require('date-fns');
  

 

  const handlecountsShow = (e) =>{ 
    let id = e.target.getAttribute("data-id")
    seti_delivery_status_count(id)
    
    handleSubmit()


    console.log(id) }

















    

    const handlePrint = () =>{ 
            setinvoice_print(null)
            const temp=[]
            selected_rows.forEach(function(number) {
              var  filter2 =filterItemsequal(get_search_data, 'id', number); 
             
              temp.push( filter2 );

              console.log(filter2)

            })

            setinvoice_print(temp)
            setpopupPrintOpen(true)
          //  console.log(get_search_data,'get_search_data');
     }


















  function handleViewDetails(this_selected_rows,thisRow){ 
    setinvoice(thisRow)
      console.log(thisRow,'call handleViewDetails');         
      const master_submit={  selected_rows:this_selected_rows}
              const res =  axios.post(base_url+"get_tracking",master_submit).then((response) => {
              setalert_def_txt('Action Completed');  setalert_def_class('success');  handleClick();
              
  
               const my_json=[]
                var cc=0;
                const get_=response.data.result;
                for (var i = 0; i < get_.length; i++){
                  cc++
                var obj = get_[i];
                var f_d=obj.i_delivery_status.i_delivery_status+' ('+obj.i_tracking_status.i_tracking_status+')';
                    var x_data={
                        id:obj.id,
                        action_type:obj.action_type,
                        created:obj.created,
                        creator:obj.creator_.userName,
                        date:obj.date,
                        destination:obj.branch_destination.branch,
                        source:obj.branch_source.branch,
                        i_delivery_status_id_18:f_d,
                        i_tracking_status_id_19:obj.i_tracking_status.i_tracking_status,
                        pickup_reference_id:obj.pickup_reference_id,
                    }
                
                    my_json.push( x_data );
              
                }
                setalert_def_txt(cc+' Tracking found');  setalert_def_class('success');  handleClick();
                setget_search_data_tracking(my_json);  
                console.log(my_json,'my_json');
              }).catch(function(error) {  if (error.response) { console.log(error.response.data,'error'); 
            } });  
  }


    const handleUpdateStatus = () =>{    

      if(selected_rows==null){
        setalert_def_txt('No Data Selected')
        setalert_def_class('warning')
        handleClick()
      }

      else if(selected_rows.length>0){
              const new_data={
                creator:user.id,
                created:format(new Date(), 'yyyy-MM-dd'),
                source:user.branch_id,
              }

                const SenderRecipientMax = SenderRecipientRef2.current.getSenderRecipient(); 
//console.log(SenderRecipientMax)
                var error=0;
                if(SenderRecipientMax.action_type=="branch_transfer" || SenderRecipientMax.action_type=="send_to_deliveryman" || SenderRecipientMax.action_type=="return_process"){
                  if(SenderRecipientMax.destination>0){

                    error=0;
                    //console.log('1');
                  }else{
                    error=1;
                    //console.log('2');
                  }
                } 


                if(SenderRecipientMax.i_delivery_status_id_18>0 && SenderRecipientMax.i_tracking_status_id_19>0  && SenderRecipientMax.pickup_reference_id!=null){
                    error=0;
                }else{
                    error=1;
                }

  
                
                if(error==0){
                const final_json= Object.assign({},new_data, SenderRecipientMax)

                const master_submit=[]

                for (var i = 0; i < selected_rows.length; i++){
                 // console.log(selected_rows[i],'sss')
                  const excel_get={  pickup_id:selected_rows[i],  }   
                  let z2_excel = Object.assign({},final_json, excel_get) 
                  master_submit.push(z2_excel);
                  
                    //jodi delivery hoi sob gula selected row te otp bosabo & sms korbo

 

console.log(SenderRecipientMax.action_type,'wrer','ewrr');
if(SenderRecipientMax.action_type=="deliverd_to_recipient"){ 
                    var filter = filterItemsequal(get_search_data, 'id', selected_rows[i]);  
                    var phn=filter[0].recipient_phone_20;
                    var ref=filter[0].sender_ref_no_4;
                    var id=selected_rows[i];

                    console.log(phn , id , 'id');
                    const set_data={

                      phn:phn,
                      id:id,
                    }
                      const resxx =  axios.post(base_url+"set_otp_db",set_data).then((response) => {
                     console.log(response.data.result.otp,'otp');
                      //send sms

                    

                        var msg_get=response.data.result.otp+' is OTP for your order REF:'+ref+' delivered. Thanks iXpress Ltd '
                    
                       
                        //
                        const url="http://portal.metrotel.com.bd/smsapi?api_key=C200220963982415234249.96775123&type=text&contacts="+phn+"&senderid=8809612444336&msg="+msg_get;
                        axios.post(url).then((response) => { console.log(response); }).catch(function(error) {  if (error.response) {  } }); 
                        console.log('sms send');
                   

 



                       //console.log(response);
                    }).catch(function(error) {  if (error.response) { console.log(error.response.data,'error'); 
                  
                    error=1;
                  
                  } });
}






//



                }

                console.log(master_submit);
                  const res =  axios.post(base_url+"create_pickup_tracking",master_submit).then((response) => {
                    setalert_def_txt('Action Completed');  setalert_def_class('success');  handleClick();
                   
                    setselected_rows(null);
                    handleSubmit()
                    getData()
                     //console.log(response);
                  }).catch(function(error) {  if (error.response) { console.log(error.response.data,'error'); 
                
                  error=1;
                
                } });   
              }

if(error==1){
                  setalert_def_txt('Please fill in all required fields')
                  setalert_def_class('warning')
                  handleClick()
}

                


                //console.log(res);

      }else{

        setalert_def_txt('No Data Selected')
        setalert_def_class('warning')
        handleClick()
      }

 

       



     };


   



  const handleSubmit = (event) => {
    const SenderRecipientMax = SenderRecipientRef.current.getSenderRecipient(); 
    const SenderRecipientMin = SenderRecipientRef.current.getSenderRecipient_excel(); //replace by excel
    var bra=user.branch_id;
 if(active_global_search!=0){bra=null}


 

    const firsr_page_json={
     "services_id_1":firstpage.services_id,
     "i_product_type_id_2":firstpage.i_product_type_id,
     "i_payment_type_8":firstpage.i_payment_type,
     "creator":user.id,
     "current_branch_id":bra,
     "range_start":range_start,
     "range_end":range_end,
     "i_delivery_status_count":i_delivery_status_count
    }
 
    
    let marge_common = Object.assign(SenderRecipientMax, firsr_page_json)
    let final_submtted_data = Object.assign(SenderRecipientMin, marge_common)


    console.log(final_submtted_data);

    
    axios.post(base_url + "search_data", final_submtted_data).then((response) => {
      //  setalert_def_txt('Data Submitted Successfully');  setalert_def_class('success');  handleClick();
          //sms services  
          
console.log(response.data,'response.data.result');

const my_json=[]
var cc=0;
const get_=response.data.result;
for (var i = 0; i < get_.length; i++){
  cc++
var obj = get_[i];


var client='';
var client_branch='';

//console.log(services_clientsList);

if(obj.sender_category_1=='corporate_sender'){
  var  filter2 =filterItemsequal(services_clientsList, 'value', obj.sender_client_id_7); 
  client=filter2[0].label;

  var  filter3 =filterItemsequal(services_clients_branchList, 'value', obj.sender_client_branch_id_8); 
  client_branch=filter3[0].label;


}else{

}



//var filter2 ='';
//if(obj.sender_client_id_7.length>0){
 
    //} 
 

    var x_data={
        id:obj.id,
        pickup_date_3:obj.pickup_date_3,
        i_delivery_status:obj.i_delivery_status.i_delivery_status,
        i_packaging_type:obj.i_packaging_type.i_packaging_type,
        i_payment_type:obj.i_payment_type.i_payment_type,
        i_priority:obj.i_priority.i_priority,
        i_product_type:obj.i_product_type.i_product_type,
        i_shipment_method:obj.i_shipment_method.i_shipment_method,
        i_tracking_status:obj.i_tracking_status.i_tracking_status,
        recipient_address_24:obj.recipient_address_24,
      
        sender_ref_no_4:obj.sender_ref_no_4,
        recipient_phone_20:obj.recipient_phone_20,
        recipient_name_21:obj.recipient_name_21,
        services:obj.services.services,
        overwriting_cost_5:obj.overwriting_cost_5,
        total_cost_6:obj.total_cost_6,
        collection_amount_7:obj.collection_amount_7,
        clients:client,
        client_branch:client_branch,
        sender_name_6:obj.sender_name_6,
        sender_phone_5:obj.sender_phone_5,
        current_branch:obj.current_branch.branch,
        otp_verified:obj.otp_verified,
        created_branch:obj.created_branch_.branch,
        creator:obj.creator1_.userName,
        created:obj.created

    }

    my_json.push( x_data );
//console.log(obj.i_shipment_method_id_17,'i_shipment_method_id_17');


setget_search_data_tracking([]);
}
setalert_def_txt(cc+' Result found');  setalert_def_class('success');  handleClick();


setget_search_data(my_json);
seti_delivery_status_count(null)
          //Reset values
      }).catch(function(error) {  if (error.response) {  console.log(error.response.data); }   });


};
  
  
    




                                        //pickup sms      
                                      /*  if(SenderRecipientMax.i_sms_template_id_30.includes(2)){
                                          var filter = filterItemsequal(i_sms_templateList,'value',2);
                                          var filter2 = filterItemsequal(i_product_typeList_filtered,'value',firsr_page_json.i_product_type_id_2);
                                          var msg_get=filter[0].template.replace('[[PRODUCT]]', filter2[0].label)
                                          var msg_get_final=msg_get.replace('[[REF_NO]]', SenderRecipientMin.sender_ref_no_4)
                                          var this_msg = {
                                            to : SenderRecipientMin.recipient_phone_20,    
                                            message : msg_get 
                                          };
                                          //
                                          const url="http://portal.metrotel.com.bd/smsapi?api_key=C200220963982415234249.96775123&type=text&contacts="+SenderRecipientMin.recipient_phone_20+"&senderid=8809612444336&msg="+msg_get_final;
                                          axios.post(url).then((response) => { console.log(response); }).catch(function(error) {  if (error.response) { console.log(error.response.data); } }); 
                                        }*/
                                        const current = new Date();
                                        const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
                                      
 

  const [i_delivery_status_count, seti_delivery_status_count] = useState(null);
  const [invoice_print, setinvoice_print] = useState(null);


   const [range_start, setrange_start] = useState(null);
   const [range_end, setrange_end] = useState(null);
   const [status_update_restrict, setstatus_update_restrict] = useState(0);
   const [status_receive_restrict, setstatus_receive_restrict] = useState(0);


   const [status_update_restrict_4, setstatus_update_restrict_4] = useState(0);
   const [status_update_restrict_5, setstatus_update_restrict_5] = useState(0);
   const [status_update_restrict_6, setstatus_update_restrict_6] = useState(0);
   const [status_update_restrict_7, setstatus_update_restrict_7] = useState(0);
   const [status_update_restrict_8, setstatus_update_restrict_8] = useState(0);
   const [status_update_restrict_9, setstatus_update_restrict_9] = useState(0);
   const [status_update_restrict_10, setstatus_update_restrict_10] = useState(0);


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
    
      //i_priority_id_3
      const [i_priorityList, seti_priorityList] = useState([]);

      //i_payment_type_8
      const [i_payment_typeList, seti_payment_typeList] = useState([]);

      //sender_client_id_7 recipient_client_id_22
      const [services_clientsList, setservices_clientsList] = useState([]);
      const [services_clientsList_filtered, setservices_clientsList_filtered] = useState([]);   
      const [services_clients_branchList, setservices_clients_branchList] = useState([]); //sender_client_branch_id_8 recipient_branch_id_29

      //pickup_type_2
      const [i_packaging_typeList, seti_packaging_typeList] = useState([]);
      const [i_packaging_typeList_filtered, seti_packaging_typeList_filtered] = useState([]);   

      
      const [i_shipment_methodList, seti_shipment_methodList] = useState([]); //i_shipment_method_id_17
      const [i_delivery_statusList, seti_delivery_statusList] = useState([]); //i_delivery_status_id_18

      const [i_tracking_statusList, seti_tracking_statusList] = useState([]); //i_tracking_status_id_19

      //i_sms_template_id_30
      const [i_sms_templateList, seti_sms_templateList] = useState([]);
      const [i_sms_template_id, seti_sms_template_id] = useState([]);



      const [i_zoneList, seti_zoneList] = useState([]); //?


      //SenderRecipient
      const [zone_countriesList, setzone_countriesList] = useState([]);
      const [zone_districtsList, setzone_districtsList] = useState([]);
      const [zone_divisionsList, setzone_divisionsList] = useState([]);
      const [zone_upazilasList, setzone_upazilasList] = useState([]);
      const [branchList, setbranchList] = useState([]); //recipient_branch_id_29

      const [sender_category_1, setsender_category_1] = React.useState("corporate_sender"); //sender_category_1


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
      const [get_search_data_tracking, setget_search_data_tracking] = useState([]);

      const [id_collection, setid_collection] = useState(null);
      const [id_single, setid_single] = useState(null);


      /*firstpage*/
      const [firstpage, setfirstpage] = useState({
        services_id: null,
        i_product_type_id: null,
        i_priority_id: null,
        i_payment_type:null
      });

      /*cost*/
      const [state, setState] = useState({username:'tusara',total_cost:'0',overwriting_cost:'0', total_cost:'0',collection_amount:'0',});  //set defaullt value
      const {overwriting_cost, total_cost,collection_amount,  is_track_web,
       } = state;



  
       const handleOtp = (e) =>{ 
        let id = e.target.getAttribute("data-id")
 
var id_=parseInt(id);
        if(otp_write!=null){

                      const master_submit={
                          selected_rows:id_,
                          otp: otp_write
                    }
                    
                                  const res =  axios.post(base_url+"otpverify",master_submit).then((response) => {
                                        // handleClick();
                                        console.log(response.data.result,'res');
                                        if(response.data.result==0){
                                          alert('OTP not match');
                                        }else{
                                          alert('OTP verified successfully');
                                        
                                           
                                          sethideotp(1);
                                            
                                        }

                                  }).catch(function(error) {  if (error.response) { console.log(error.response.data,'error'); 
                                
                                // error=1;
                                
                                } });  

                   // console.log(otp_write,props.selected_rows[0]);
        }



}








       useEffect(() => {
        const keyDownHandler = event => {
          if (event.key === 'Enter') {
            const id_single = localStorage.getItem('id_single');
            event.preventDefault();
            // handleid_single_print()
          
            var previous_ids=localStorage.getItem('previous_ids');  

            if(id_single!=null){


              if(previous_ids!=null){
                var new_id=previous_ids+','+id_single.toString()
              }else{
                var new_id=id_single.toString()
              }
                
              //view search result for single iteams
              


              handleid_single_search(id_single)



              var result_found=localStorage.getItem('result_found');  
              if(result_found==1){
                localStorage.setItem('previous_ids',new_id);
                localStorage.removeItem("result_found");
              }
                



             setid_single(null)
            }

            var previous_ids1=localStorage.getItem('previous_ids');  
            console.log('id_single previous_ids ', id_single, previous_ids1);
           
          }
        };
      
        document.addEventListener('keydown', keyDownHandler);

        return () => {
          document.removeEventListener('keydown', keyDownHandler);
        };
      
      }, []); 


  useEffect(() => {
    localStorage.removeItem("active_global_search");
    localStorage.removeItem("result_found");
    localStorage.removeItem("previous_ids");
    const getData_sc = async () => {
      const arr_services_clients = []; const arr_services_clients_branch = []; const arr_i_product_type = []; const arr_i_sms_template = []; const arr_i_tracking_status = []; const arr_i_payment_type = []; const arr_i_priority = []; const arr_services = []; const arr_i_packaging_type = []; const arr_i_shipment_method = []; const arr_i_delivery_status = []; const arr_i_zone = []; const arr_zone_countries = []; const arr_zone_districts = []; const arr_zone_divisions = []; const arr_zone_upazilas = []; const arr_branch = []; 
      await axios.get(base_url+"setup_config").then((res) => {
          res.data.services_clients.map((temp) => { return arr_services_clients.push({value: temp.services_clients_id, label: temp.services_clients,services_id:temp.services_id,services_provider_id:temp.services_provider_id,i_sms_template_id:temp.i_sms_template_id,i_product_type_id:temp.i_product_type_id,services_packages_id:temp.services_packages_id}); }); setservices_clientsList(arr_services_clients) 
          res.data.services_clients_branch.map((temp) => { return arr_services_clients_branch.push({value: temp.services_clients_branch_id, label: temp.services_clients_branch,  services_clients_id: temp.services_clients_id}); }); setservices_clients_branchList(arr_services_clients_branch) 
          res.data.i_product_type.map((temp) => { return arr_i_product_type.push({value: temp.i_product_type_id, label: temp.i_product_type, services_id: temp.services_id}); }); seti_product_typeList(arr_i_product_type) 
          res.data.i_sms_template.map((temp) => { return arr_i_sms_template.push({value: temp.i_sms_template_id, label: temp.i_sms_template,have_general_sender:temp.have_general_sender,template:temp.message,}); }); seti_sms_templateList(arr_i_sms_template) 
          res.data.i_tracking_status.map((temp) => { return arr_i_tracking_status.push({value: temp.i_tracking_status_id, label: temp.i_tracking_status}); }); seti_tracking_statusList(arr_i_tracking_status) 
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
      });
    };
    getData_sc();
  }, []);

    
 

  /*Defines for select option*/
  const servicesProps = { options: servicesList, getOptionLabel: (option) => option.label,};
  const i_product_typeProps = { options: i_product_typeList_filtered, getOptionLabel: (option) => option.label,};
  const i_priorityProps = { options: i_priorityList, getOptionLabel: (option) => option.label,};
  const i_payment_typeProps = { options: i_payment_typeList, getOptionLabel: (option) => option.label,};



  /*JSON Import*/
  const readUploadFile = (e) => { e.preventDefault(); 
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
              
              

                console.log(json);
                //json validate
                var error=0;
                var line='';
                for (var i = 0; i < json.length; i++){
                  console.log('checking');
                  var obj = json[i];
                  var phn=json[i].phone.toString();
                  try {
                        if(obj['reference'].length>2 &&  obj['name'].length>2  &&  obj['address'].length>2  &&  phn.length>10){
                         
                        }else{
                          error=1;
                          line=line+'/'+(i+1);
                        }
                      }
                      catch(err) { error=1;  }
                }

                if(error==1){
                  console.log(json);
                  setjson_upload(null)
                  setcount_xlsx_item(0)
                  setswitch_xlsx_active(1)

                  setalert_def_txt('Fail! XLSX File not Correct Line: '+line)
                  setalert_def_class('warning')
                  handleClick()
                  //setalert_def_txt('Data Submitted Successfully!')
                }

                console.log('error ',error);


              }; 
              reader.readAsArrayBuffer(e.target.files[0]);





        }
    }
    catch(err) {}
  }


  const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px !important',
    background: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: { padding: '16px !important' },
  }));
  
  const ContentBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    '& small': { color: theme.palette.text.secondary },
    '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main },
  }));
  
  const Heading = styled('h6')(({ theme }) => ({
    margin: 0,
    marginTop: '4px',
    fontSize: '14px',
    fontWeight: '500',
    color: theme.palette.primary.main,
  }));

  
const [processing, setprocessing] = useState(0); 
const [shipped, setshipped] = useState(0); 
const [in_transit, setin_transit] = useState(0); 
const [hold, sethold] = useState(0); 
const [return_process, setreturn_process] = useState(0); 


      const getData = async () => {
        const abc={
          branch_id:user.branch_id,
          current_branch_id:user.branch_id,
          sender_client_id_7:null
        }
        console.log(abc,'abc');

        await axios.post(base_url+"stock_counts",abc).then((res) => {
         
          setprocessing(res.data.processing)
          setshipped(res.data.shipped)
          setin_transit(res.data.in_transit)
          sethold(res.data.hold)
          setreturn_process(res.data.return_process)
            //res.data.services_clients.map((temp) => { return arr_services_clients.push({value: temp. 
        });
      };

  useEffect(() => {

      getData();
    }, []);

const cardList = [
  { name: 'Processing', amount: processing, icon: 'shopping_cart', id:3 },
  { name: 'In Transit', amount: in_transit, icon: 'local_shipping', id:5 },
  { name: 'Received', amount: shipped, icon: 'redeem', id:4 },
  { name: 'Return in process', amount: return_process, icon: 'art_track', id:7 },
  { name: 'Hold', amount: hold, icon: 'settings_power', id:9 },

];


  return (
    <div>
 

    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alert_def_class} sx={{ width: '100%' }}>
          {alert_def_txt}<br></br>
        </Alert>
    </Snackbar>

 
<ValidatorForm onSubmit={handleSubmit} onError={() => null}>

 

{/*Current Stock*/}
<div title="Current Stock" style={{borderRadius: "3px", backgroundColor: "cornflowerblue", padding:"10px",border:"3px solid cornflowerblue", }}><Grid item md={12} lg={12} sm={12} xs={12} style={{backgroundColor: "cornflowerblue",borderRadius: "3px",paddingLeft: "5px",color: "azure",fontSize: "26px",marginBottom:"1%" }}> <Icon>grain</Icon> Current Stock</Grid>

<Grid container spacing={3} sx={{ mb: '24px' }}>
      {cardList.map((item, index) => (
        <Grid item xs={12} md={4} key={index}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon">{item.icon}</Icon>
              <Box ml="12px">
                <Small>{item.name}</Small>
                <Heading>{item.amount}</Heading>
              </Box>
            </ContentBox>

            <Tooltip   title="View Details" placement="top">
              <IconButton >
                <Icon data-id={item.id} onClick={handlecountsShow} >arrow_right_alt</Icon>
              </IconButton>
            </Tooltip>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
</div> 
 





{/*Advanced Search*/}
<div title="Advanced search" style={{borderRadius: "3px", backgroundColor: "#6495ed36", padding:"10px",border:"3px solid cornflowerblue",marginTop:"4%" }}><Grid item md={12} lg={12} sm={12} xs={12} style={{backgroundColor: "cornflowerblue",borderRadius: "3px",paddingLeft: "5px",color: "azure",fontSize: "26px",marginBottom:"1%" }}> <Icon>grain</Icon> Advanced search</Grid>
<Grid container spacing={6}> 
  <Grid item md={12}  lg={12}   sm={12} xs={12}> 
        <Grid container spacing={4}>
               
              <Grid item md={3}   lg={3}   sm={12} xs={12}>
                                <Autocomplete {...servicesProps}  disableClearable  InputLabelProps={ { required: true }}  onChange={(event, value)=>{
                                // seti_packaging_typeList([]);
                    
                                if(value!=null){ 

                                        if(value.value==23 || value.value==25){  setsender_category_1("general_sender"); }else{  setsender_category_1("corporate_sender"); }

                                        setfirstpage(previousState => {  return { ...previousState, services_id: value.value }  });

                                        if(i_product_typeList.length>0){       var filter = filterItems(i_product_typeList, 'services_id', value.value.toString()); seti_i_product_typeList_filtered(filter);}       else{ seti_i_product_typeList_filtered(null); }
                                        if(i_packaging_typeList.length>0){     var filter1 = filterItems(i_packaging_typeList, 'services_id', value.value.toString());  seti_packaging_typeList_filtered(filter1);}  else{ seti_packaging_typeList_filtered(null); }
                                        if(services_clientsList.length>0){                                  var filter2 = filterItems(services_clientsList, 'services_id', value.value.toString()); setservices_clientsList_filtered(filter2);}   else{ setservices_clientsList_filtered(null); }
                                        seti_product_type_id(null);
                                        setfirstpage(previousState => {  return { ...previousState, i_product_type_id: null }  });
                                }
                                /*else{
                                    setfirstpage(previousState => {  return { ...previousState, services_id: null }  });
                                    seti_i_product_typeList_filtered([]); 
                                }*/
                                
                        }
                        }    id="services_id_1"  renderInput={(params) => ( <TextField {...params}   InputLabelProps={ { required: true }}   label="Select Service Type" variant="standard" /> )} /> 
                        { firstpage.services_id == null && show_error==1 && <div> <p style={{color: "red", marginTop:"-10px"}}>This field is required</p>  </div> }
              </Grid>

              <Grid item md={3} lg={3} sm={12} xs={12}>
                        <Autocomplete {...i_product_typeProps} disableClearable    onChange={(event, value)=>{

                        setfirstpage(previousState => {  return { ...previousState, i_product_type_id: value.value }  });  
                        seti_product_type_id(value);  

                        }}  

                        value={i_product_type_id} id="i_product_type_id" SelectPodType renderInput={(params) => ( <TextField {...params} label="Select Product Type:*" variant="standard" /> )} />
                        { firstpage.i_product_type_id == null && show_error==1 && <div> <p style={{color: "red", marginTop:"-10px"}}>This field is required</p>  </div> }
                </Grid>
                
                <Grid item md={3} lg={3} sm={12} xs={12}>
                            <Autocomplete {...i_priorityProps}  disableClearable        onChange={(event, value)=>{   setfirstpage(previousState => {  return { ...previousState, i_priority_id: value.value }  }); }}   id="i_priority_id" SelectPodType renderInput={(params) => ( <TextField {...params} label="Select Product Priority:*" variant="standard" /> )} />    
                            { firstpage.i_priority_id == null && show_error==1 && <div> <p style={{color: "red", marginTop:"-10px"}}>This field is required</p>  </div> }
                </Grid>


                <Grid item md={3} lg={3} sm={12} xs={12}>
              <Autocomplete {...i_payment_typeProps}  disableClearable
                              onChange={(event, value)=>{
                                setfirstpage(previousState => {  return { ...previousState, i_payment_type: value.value }  });
                                
                                setswitch_have_collection(value.have_collection);
                                }
                              }
              id="i_payment_type_id" SelectPodType renderInput={(params) => ( <TextField {...params} label="Select Payment Type" variant="standard" /> )} />  
              { firstpage.i_payment_type == null && show_error==1 && <div> <p style={{color: "red", marginTop:"-10px"}}>This field is required</p>  </div> }
              </Grid>

              
        </Grid>
   </Grid>
</Grid>





<br></br>  
 
<SearchUpdate ref={SenderRecipientRef}   
    zone_countriesList={zone_countriesList}
    zone_districtsList={zone_districtsList}
    zone_divisionsList={zone_divisionsList}
    zone_upazilasList={zone_upazilasList}
    branchList={branchList}
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
 <Grid item md={12}    lg={12}   sm={12}xs={12} >

<Box>
      <ExpansionPanel square expanded={expanded === "panel1"} onChange={handleChangexx("panel1")}>
        <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>General Search</Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
        
        <Grid container spacing={6}>

<Grid item md={2}    lg={2}   sm={6}xs={6}>
<Grid item md={4}    lg={4}  sm={6}xs={6}>
  <Checkbox
      checked={checked}
      onChange={handleChangeglobal}
      inputProps={{ 'aria-label': 'controlled' }}
    />
</Grid>
<Grid item md={8}    lg={8}  sm={6}xs={6}>Global Search Enable</Grid>

 {/*defaultValue={[dayjs(format(new Date(),'yyyy-MM-dd'), dateFormat), dayjs(format(new Date(),'yyyy-MM-dd'), dateFormat)]}*/} 
</Grid>

    <Grid item md={4}    lg={4}   sm={6}xs={6}>
    <RangePicker
     onChange={handleDateChange} 
    
      format={dateFormat}
    />
    </Grid>


    <Grid item md={2}    lg={2}   sm={3} xs={3}>
          <Button color="primary"  data-id={1}  onClick={handleSubmit} variant="contained" >
            <Icon>search</Icon>
            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Search</Span>
        </Button>
    </Grid>
    <Grid item md={2}    lg={2}   sm={3} xs={3}>
          <Button color="primary"  data-id={1}  onClick={handlePrint} variant="contained" >
            <Icon>print</Icon>
            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Print</Span>
        </Button>
    </Grid>
    {/*<Grid item md={5}   lg={5}   sm={6} xs={6}>
        <p><b>For XLSX upload required column: </b> name phone reference address customer_no</p>
        { switch_xlsx_active >0 &&
        <p> Total {count_xlsx_item} Items Found on XLSX File  <Fab  onClick={handleRemoveXlsx}  size="small"   color="secondary" aria-label="Add" className="button"><Icon> cancel </Icon></Fab></p>
        }
        


    </Grid>
    <Grid item md={2}   lg={2}   sm={12} xs={12} justify="flex-end">
        <form>
          <Button  color="success"   variant="contained"  component="label">
              <Icon> add_to_photos </Icon> Import XLSX
                <input hidden  name="upload"  id="upload" onChange={readUploadFile} accept="XLSX/*" multiple type="file" />
          </Button>
        </form> 
    </Grid>*/}


</Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel square expanded={expanded === "panel2"} onChange={handleChangexx("panel2")}>
        <ExpansionPanelSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Scanner Search</Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
                  <Grid container spacing={6}>        
                    <Grid item md={2}    lg={2}   sm={6}xs={6}>
                  <Grid item md={4}    lg={4}  sm={6}xs={6}>
                    <Checkbox
                        checked={checked}
                        onChange={handleChangeglobal}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                  </Grid>
                  <Grid item md={8}    lg={8}  sm={6}xs={6}>Global Search Enable</Grid>

                  {/*defaultValue={[dayjs(format(new Date(),'yyyy-MM-dd'), dateFormat), dayjs(format(new Date(),'yyyy-MM-dd'), dateFormat)]}*/} 
                  </Grid>

                      <Grid item md={4}    lg={4}   sm={6}xs={6}>
                      <TextField type="number"  name="id_single" id="standard-basic" value={id_single || ""} onChange={handleid_single} label="HWB:*  " />
                      </Grid>


                      <Grid item md={2}    lg={2}   sm={3} xs={3}>
                            <Button color="primary"  data-id={1}  onClick={handleid_bulk_search} variant="contained" >
                              <Icon>search</Icon>
                              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Search</Span>
                          </Button>
                      </Grid>
                      <Grid item md={2}    lg={2}   sm={3} xs={3}>
                            <Button color="primary"  data-id={1}  onClick={handlePrint} variant="contained" >
                              <Icon>print</Icon>
                              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Print</Span>
                          </Button>
                      </Grid>
                  </Grid>       
        </ExpansionPanelDetails>
      </ExpansionPanel>


    </Box>
    </Grid>
    </Grid>






<br></br>  <br></br>


 
    <Grid item md={12}    lg={12}   sm={12}xs={12} style={{ backgroundColor: "white", padding:"5px",borderRadius: "3px",  }}>

    <div style={{ height: 600, width: '100%' }}      >
        <DataGrid
        components={{ Toolbar: GridToolbar }} 
            rows={get_search_data}
            columns={columns}
            pageSize={100}
            rowsPerPageOptions={[100,200,500]}
            checkboxSelection
            onSelectionModelChange={(newSelectionArray) => {
              setselected_rows(newSelectionArray);
              console.log(newSelectionArray)

console.log('calling1');

 
 




                 var this_id=0; var any_intransit=0;   var any_received=0;  var ready_otp=0;
                 var t4=0; var t5=0; var t6=0; var t7=0; var t8=0; var t9=0;
               
   

              for (var i = 0; i < newSelectionArray.length; i++){

                console.log('calling2');

                    var filter = filterItemsequal(get_search_data, 'id', newSelectionArray[i]);  
                    console.log('calling3');
                    var this_status=filter[0].i_delivery_status;
                    console.log('calling4',this_status);
                    if(this_status=='Received'){this_id=4}
                    if(this_status=='In Transit'){this_id=5}
                    if(this_status=='Delivered'){this_id=6}
                    if(this_status=='Return in process'){this_id=7}
                    if(this_status=='Return Received'){this_id=8}
                    if(this_status=='Hold'){this_id=9}
                    console.log('calling6',this_id);
                   // console.log(this_status,'this_status',this_id,'this_id')

                    if(t4!=1){
                          if(this_id==4 || this_id==6 || this_id==7 || this_id==8) {  t4=1  }
                    }

                    if(t5!=1){
                      if(this_id==5 || this_id==6 || this_id==7 || this_id==8 || this_id==9) {  t5=1  }
                    }

                    if(t6!=1){
                      if(this_id==5 || this_id==6 || this_id==8 || this_id==9) {  t6=1  }
                    }

                    if(t7!=1){
                      if(this_id==5 || this_id==6 || this_id==7 || this_id==8 || this_id==9) {  t7=1  }
                    }

                    if(t8!=1){
                      if(this_id==5 || this_id==6 || this_id==8 || this_id==9) {  t8=1  }
                    }
                    if(t9!=1){
                      if(this_id==5 || this_id==6 ||  this_id==8 || this_id==9) { t9=1  }
                    }                    

                    if(any_intransit!=1){
                          if(filter[0].i_delivery_status=='In Transit') {
                          console.log('In Transit')
                          any_intransit=1
                      }
                    }

                    if(any_received!=1){
                      if(filter[0].i_delivery_status=='Received') {
                      console.log('In 	Received')
                      any_received=1
                      }
                    }

                 if(ready_otp!=1){
                  console.log(filter[0].otp_verified,'otp_verified',filter[0].i_delivery_status,'i_delivery_status')
                      if(filter[0].i_delivery_status=='Deliverd' && filter[0].otp_verified!=1 ) {
                     
                      ready_otp=1
                      }
                    }

                    
                 console.log(newSelectionArray[i])

                 }             



              if(t4==1){ setstatus_update_restrict_4(1)  }else{  setstatus_update_restrict_4(0)   }
              if(t5==1){ setstatus_update_restrict_5(1)  }else{  setstatus_update_restrict_5(0)   }
              if(t6==1){ setstatus_update_restrict_6(1)  }else{  setstatus_update_restrict_6(0)   }
              if(t7==1){ setstatus_update_restrict_7(1)  }else{  setstatus_update_restrict_7(0)   }
              if(t8==1){ setstatus_update_restrict_8(1)  }else{  setstatus_update_restrict_8(0)   }
              if(t9==1){ setstatus_update_restrict_9(1)  }else{  setstatus_update_restrict_9(0)   }


 
                if(any_intransit==1){setstatus_update_restrict(1)}else{setstatus_update_restrict(0)}

                if(any_received==1){setstatus_receive_restrict(1)}else{setstatus_receive_restrict(0)}
              
                 if(ready_otp==1){ 
                  setotp_allow(1)
                  console.log(otp_allow,'otp_allow1')
                 }else{
                  setotp_allow(0)
                  console.log(otp_allow,'otp_allow2')
                 }
                 
              //setSelection(newSelection.rows);
            }}
        />
    </div>

    </Grid>
 




    { get_search_data.length>0  &&  active_global_search==0 && selected_rows!='' &&
    <div> 
        <br></br><br></br>
        <UpdateStatus ref={SenderRecipientRef2}   
            zone_countriesList={zone_countriesList}
            zone_districtsList={zone_districtsList}
            zone_divisionsList={zone_divisionsList}
            zone_upazilasList={zone_upazilasList}
            branchList={branchList}
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
        />

        <Grid container spacing={6}>
        <Grid item md={6}    lg={6}   sm={6}xs={6}>

        </Grid>
            <Grid item md={3}    lg={3}   sm={6} xs={6}> </Grid>
            <Grid item md={1}    lg={1}   sm={3} xs={3}>
            { get_search_data.length>0  &&  active_global_search==0 &&
                  <Button color="primary"  onClick={handleUpdateStatus}   variant="contained">
                    <Icon>send</Icon>
                    <Span sx={{ pl: 1, textTransform: "capitalize" }}>Update</Span>
                </Button>
        }
            </Grid>
        </Grid>


    </div>
}
 

</div>















{/*
 <button
    onClick={() =>
      pdfFromReact(".element-to-print", "My-file", "p", true, false )
    }
  >pdf</button>
*/}       



<Grid container spacing={6}>
    <Grid item md={12}    lg={12}   sm={12}xs={12}>
<div>
 

      <Dialog   fullWidth={true}  maxWidth={'lg'}   onClose={popupClose} aria-labelledby="customized-dialog-title" open={popupOpen}>
        <DialogTitle id="customized-dialog-title" onClose={popupClose}> Invoice
        </DialogTitle>

        <DialogContent dividers  className="element-to-print"    >

{invoice!=null &&
    <Grid container spacing={2}>
      <Grid item xs={7}> 
       <img width="200" src='/assets/images/logo.png'/>
       <p style={{margin: "18px 2px 2px 2px", fontSize: "14px"}} inline variant="body1" align=""><b>Address:</b> {business_address} </p> 
       <p style={{margin: "2px" , fontSize: "14px"}} inline variant="body1" align=""><b>Email: </b>{business_email}</p> 
       <p style={{margin: "2px" , fontSize: "14px"}} inline variant="body1" align=""><b>Web:</b> {business_web}</p>  

<br></br> 
       <p style={{margin: "2px" , fontSize: "14px"}} inline variant="body1" align=""><b>Creator: </b>{invoice.creator}</p> 
       <p style={{margin: "2px" , fontSize: "14px"}} inline variant="body1" align=""><b>Created: </b>{invoice.created}</p> 
       <p style={{margin: "2px" , fontSize: "14px"}} inline variant="body1" align=""><b>Pickup:</b> {invoice.created_branch}</p>  


       </Grid>

       <Grid item xs={3}>    
       <h2  align="right">-</h2>
       <p style={{margin: "2px" , fontSize: "14px"}} inline variant="body1" align="right"><b>Ref. No: </b></p> 
       
       <p style={{margin: "2px" , fontSize: "14px"}} inline variant="body1" align="right"><b>Pickup Date: </b></p> 
       <p style={{margin: "2px" , fontSize: "14px"}} inline variant="body1" align="right"><b>Packaging Type: </b></p> 
       <p style={{margin: "2px" , fontSize: "14px"}} inline variant="body1" align="right"><b>Shipment Method: </b></p>   
       <p style={{margin: "2px" , fontSize: "14px"}} inline variant="body1" align="right"><b>Product Type: </b></p>   
        <p style={{margin: "2px" , fontSize: "14px"}} inline variant="body1" align="right"><b>Product Priority: </b></p>   


      </Grid>

      <Grid item xs={2}>  
      <h2 inline variant="body1" align="right">INVOICE</h2>    
       <p style={{margin: "2px" , fontSize: "14px"}} inline variant="body1" align="right">{invoice.id}-{invoice.sender_ref_no_4}</p> 
       <p style={{margin: "2px" , fontSize: "14px"}} inline variant="body1" align="right">{invoice.pickup_date_3}</p> 
       <p style={{margin: "2px" , fontSize: "14px"}} inline variant="body1" align="right">{invoice.i_packaging_type}</p> 
       <p style={{margin: "2px" , fontSize: "14px"}} inline variant="body1" align="right">{invoice.i_shipment_method}</p>   
       <p style={{margin: "2px" , fontSize: "14px"}} inline variant="body1" align="right">{invoice.i_product_type}</p>   
        <p style={{margin: "2px" , fontSize: "14px"}} inline variant="body1" align="right">{invoice.i_priority}</p>   
      </Grid>


      <Grid item xs={6}>




{invoice.i_delivery_status=='Delivered' &&  invoice.otp_verified!="1" &&  
      <Grid item lg={12} md={12} sm={12} xs={12}>
    <br></br><br></br>
        <Grid item xs={3}>
             <TextField type="text" name="otp_write" id="standard-basic" value={otp_write}  onChange={handleChangewriteotp} label="Write OTP*" />
        </Grid> 

   
        <Grid item xs={3}>
            <Button color="primary" variant="contained">
            <Icon data-id={invoice.id}  onClick={handleOtp}  >send</Icon>
            <Span   data-id={invoice.id}  onClick={handleOtp}   sx={{ pl: 1, textTransform: "capitalize" }}>Verify OTP</Span>
          </Button>
        </Grid><hr></hr>

    </Grid>
}

{invoice.i_delivery_status=='Delivered' &&  invoice.otp_verified=="1" &&  
      <Grid item lg={12} md={12} sm={12} xs={12}>
          <p><i>OTP Verified</i></p>
    </Grid>
}

      </Grid>
      <Grid item xs={6}>
      <p style={{margin: "2px" , fontSize: "14px"}} inline variant="body1" align="right"><Barcode height= "50"   value={invoice.id} /></p>
      </Grid>


      <Grid item xs={4}>  
      <h2 style={{margin: "2px" ,fontSize: "16px"}}  inline variant="body1" align="">Sender</h2> 
       <p style={{margin: "2px" , fontSize: "14px"}} inline variant="body1" align="">{invoice.sender_name_6}</p> 
       <p style={{margin: "2px" , fontSize: "14px"}} inline variant="body1" align="">{invoice.sender_phone_5}</p> 
       <p style={{margin: "2px" , fontSize: "14px"}} inline variant="body1" align="">{invoice.clients}</p> 
       <p style={{margin: "2px" , fontSize: "14px"}} inline variant="body1" align="">{invoice.client_branch}</p> 

     </Grid>
      <Grid item xs={5}>   
      <h2 style={{margin: "2px" ,fontSize: "16px"}} inline variant="body1" align="">Recipient</h2> 
       <p style={{margin: "2px" , fontSize: "14px"}} inline variant="body1" align="">{invoice.recipient_name_21}</p> 
       <p style={{margin: "2px" , fontSize: "14px"}} inline variant="body1" align="">{invoice.recipient_phone_20}</p> 
      </Grid>

      <Grid item xs={3}>   
          <h2 style={{margin: "2px" ,fontSize: "16px"}}  align="">Payment Information</h2> 
          <p style={{margin: "2px" , fontSize: "14px"}}   align=""><b>Payment Type: </b>{invoice.i_payment_type}</p>
           <p style={{margin: "2px" , fontSize: "14px"}}   align=""><b>Collection Amount: </b>{invoice.collection_amount_7}</p> 
           <p style={{margin: "2px" , fontSize: "14px"}}   align=""><b>Delivery Charge: </b> </p> 
           <p style={{margin: "2px" , fontSize: "14px"}}   align=""><b>COD Charge: </b> </p> 
           <p style={{margin: "2px" , fontSize: "14px"}}   align=""><b>Return Charge: </b> </p>  
           <p style={{margin: "2px" , fontSize: "14px"}}   align=""><b>Total Charge: </b>{invoice.total_cost_6}</p>
      </Grid>

      <Grid item xs={12}>  
        <h2 style={{margin: "2px" ,fontSize: "14px"}} >Tracking Status</h2>
        <div style={{ height: 500, width: '100%' }}>
        <DataGrid  rowHeight={25} 
            rows={get_search_data_tracking}
            columns={columns2}
            pageSize={5}
            rowsPerPageOptions={[10]}
        />
      </div>
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




      <Dialog   fullWidth={true}  maxWidth={'lg'}   onClose={popupPrintClose} aria-labelledby="customized-dialog-title" open={popupPrintOpen}>
        <DialogTitle id="customized-dialog-title" onClose={popupPrintClose}> Invoice
        </DialogTitle>

        <DialogContent dividers  className="element-to-print_printall"    >
 
      <ReactToPrint
        trigger={() => 
        <button variant="contained"  color="primary" >Print this out!</button>}
        content={() => InvoiceBulkRef.current}
      />
{invoice_print!=null &&
<div className="element-to-print11">   



    <InvoiceBulk ref={InvoiceBulkRef}   
  
            creator={user.id}
            branch={user.branch_id}
            invoice_print={invoice_print}
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


 
