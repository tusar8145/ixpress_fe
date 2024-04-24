import {Autocomplete, Box, Card, Grid, Icon, IconButton, styled, Tooltip, useTheme } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Breadcrumb } from "app/components";
import { Small } from 'app/components/Typography';
import useAuth from 'app/hooks/useAuth';
import axios from "axios";
import * as React from 'react';
import { Fragment, useEffect, useState } from 'react';
import { base_url } from '../../utils/constant';
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Select from 'react-select'
import { DatePicker } from 'antd';
import { useRef } from "react";
import {  Button  } from "@mui/material";
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';
import { PieChart } from 'react-minimal-pie-chart';
import Lottie from "lottie-react";
import animation_lmfccbqn from "./animation_lmfccbqn.json";
//import CanvasJSReact from './canvasjs.react';
//var CanvasJS = CanvasJSReact.CanvasJS;
//var CanvasJSChart = CanvasJSReact.CanvasJSChart;

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Checkbox from '@mui/material/Checkbox';


 axios.defaults.headers.common['accessToken'] =  'JWT '+window.localStorage.getItem('accessToken');
 
const TextField = styled(TextValidator)(() => ({ width: "100%", marginBottom: "16px", }));
const {format} = require('date-fns');
const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginRight: '.5rem',
  textTransform: 'capitalize',
}));

const SubTitle = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

const H4 = styled('h4')(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginBottom: '16px',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
}));

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

const Analytics = () => {

 
 

  const options_chart =  
    [
      { title: 'One', value: 10, color: '#E38627' },
      { title: 'Two', value: 15, color: '#C13C37' },
      { title: 'Three', value: 20, color: '#6A2135' },
    ]
 

 
  function Export  (exceldata,filename) {

    console.log(exceldata,'collection',filename)

    const fileType= 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset-UTF-8';
    const fileExtension = '.xlsx';

   // var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
//FileSaver.saveAs(blob, "hello world.txt"); 
 
      const ws = XLSX.utils.json_to_sheet(exceldata);
      const wb = {Sheets: {'data': ws}, SheetNames: ['data']};
      const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
      const data = new Blob ([excelBuffer], {type:fileType});
      FileSaver.saveAs(data, filename+fileExtension)
   
 
  }

  const { palette } = useTheme();
  const [i_delivery_status_count, seti_delivery_status_count] = useState(null);
  const [processing, setprocessing] = useState(0);
  const [shipped, setshipped] = useState(0);
  const [in_transit, setin_transit] = useState(0);
  const [hold, sethold] = useState(0);
  const [out_for_deli, setout_for_deli] = useState(0);
  const [exception, setexception] = useState(0);
  const [return_process, setreturn_process] = useState(0);
  const [booking, setbooking] = useState(0);
  const [delivered, setdelivered] = useState(0);
  const [return_received, setreturn_received] = useState(0);
  const [total_order, settotal_order] = useState(0);

  const [dc, setdc] = useState(0);
  const [rc, setrc] = useState(0);
  const [cm, setcm] = useState(0);
  const [co, setco] = useState(0);

  const [fw, setfw] = useState(0);
  const [tw, settw] = useState(0);

  const [sco, setsco] = useState(0);
  const [cao, setcao] = useState(0);

  const [showPro,  setshowPro] = useState(1);
  const [servicesList, setservicesList] = useState([]);
  const servicesProps = { options: servicesList, getOptionLabel: (option) => option.label,};


var selected_service=null

var range1=null
var range2=null

  const dateFormat = 'YYYY-MM-DD';
  const [range_start, setrange_start] = useState(null);
  const [range_end, setrange_end] = useState(null);
  const [this_date, setthis_date] = useState(null);
  const [choice, setUserChoice] = useState(null);
  const [pro_prio, setpro_prio] = useState(null);
  const [selected_delivery_status, setselected_delivery_status] = useState(6);


  const handleDateChange = (value) => {   
    
    if(value!=null){ 
      console.log(format(value[0].$d,'yyyy-MM-dd'),format(value[1].$d,'yyyy-MM-dd'),'value')
      setrange_start(format(value[0].$d,'yyyy-MM-dd')); setrange_end(format(value[1].$d,'yyyy-MM-dd'));    
      setthis_date(format(value[0].$d,'yyyy-MM-dd')+","+format(value[1].$d,'yyyy-MM-dd'))
     } 
    else{
 
        setrange_start(null);
         setrange_end(null); 
    }
  };
  
  const { RangePicker } = DatePicker;
  const options = [
    { value: '1', label: 'All' },
    { value: '20', label: 'Domestic Document' },
    { value: '21', label: 'International Document' },
    { value: '22', label: 'E-commerce Service' },
    { value: '23', label: 'Parcel' }
  ]

  const prio = [{ value: '5', label: 'All' },
    { value: '1', label: 'General' },
    { value: '2', label: 'Security' },
    { value: '3', label: 'Online Product' },
    { value: '4', label: 'Express Service' }
    
  ]

  const { logout, user } = useAuth();

  const filterItems = (arr, field, value) => { try { if (field != null) { return arr.filter((item) => { return item[field].includes(value) }) }} catch (error) { console.error(error);}}
  const filterItemsequal = (arr, field, value) => { try { if (field != null) { return arr.filter((item) => { return item[field]==value }) }} catch (error) { console.error(error);}}



  const [services_clients_branchList, setservices_clients_branchList] = useState([]); //sender_client_branch_id_8 recipient_branch_id_29

  const [service_name, setservice_name] = useState(null);

  const [i_product_typeList, seti_product_typeList] = useState([]); 
  const [i_product_typeList_filtered, seti_i_product_typeList_filtered] = useState([]);     
  const [i_product_type_id, seti_product_type_id] = useState(null);
  const [i_product_type_name, seti_product_type_name] = useState(null);


  const [services_clientsList, setservices_clientsList] = useState([]);
  const [services_clientsList_filtered, setservices_clientsList_filtered] = useState([]);  
  const [services_clients_id, setservices_clients_id] = useState(null);
  const [services_clients_name, setservices_clients_name] = useState(null);

  const [services_clientsbraanchList, setservices_clientsbraanchList] = useState([]);
const [_delivered, set_delivered] = useState(0);
const [checked, setChecked] = React.useState(false);



const handleChangeglobal = (event) => {
	console.log("event.target.checked",event.target.checked)
	if(event.target.checked==true){
		setChecked(user.branch_id)
	}else{
		setChecked(null)
	}
  //setChecked(event.target.checked);
  /*if(active_global_search==0){
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
  }*/


};




function subComponent(vvv,id){
 
}

  const [completed, setcompleted] = useState(0);
  

  useEffect(() => {

 


    const basic_user = {
      id: user.id,
      is_all_branch: user.is_all_branch,
      is_marchant: user.is_marchant,
      }

    const getData = async () => {
      const arr_services_clients = []; const arr_services_clients_branch = []; const arr_i_product_type = [];   
      await axios.post(base_url+"setup_config_basic",basic_user).then((res) => {
          res.data.services_clients.map((temp) => { return arr_services_clients.push({value: temp.services_clients_id, label: temp.services_clients,services_id:temp.services_id,services_provider_id:temp.services_provider_id,i_sms_template_id:temp.i_sms_template_id,i_product_type_id:temp.i_product_type_id,services_packages_id:temp.services_packages_id}); }); setservices_clientsList(arr_services_clients) 
          res.data.services_clients_branch.map((temp) => { return arr_services_clients_branch.push({value: temp.services_clients_branch_id, label: temp.services_clients_branch,  services_clients_id: temp.services_clients_id}); }); setservices_clients_branchList(arr_services_clients_branch) 
          res.data.i_product_type.map((temp) => { return arr_i_product_type.push({value: temp.i_product_type_id, label: temp.i_product_type, services_id: temp.services_id}); });   seti_product_typeList(arr_i_product_type) 
          console.log(arr_services_clients,arr_services_clients_branch,arr_i_product_type,'arr_i_product_type')
    
        });
    };
    getData();
  }, []);


  const handlecountsShow = (e) => {
    let id = e.target.getAttribute("data-id")
    seti_delivery_status_count(id)
    //handleSubmit()
    //console.log(id)
  }
  
  const handleChangePage = (event, newPage) => {
    //setloading(1)
   // setPage(newPage);
    //console.log(newPage,'newPage')
   // handleSubmit()
    //setloading(0)
  };



  const downloadData = async (id,counts,services_clients_name,i_product_type_name, range_start, range_end) => {
    var abc =[]
    setshowPro(1)
    const all_access = localStorage.getItem('all_access');
    var set_choice=choice
    if(set_choice=='1'){set_choice=null}
       if(all_access!=1){
   
             abc = {
              this_date:this_date,
               branch_id: user.branch_id,
               current_branch_id: user.branch_id,
               sender_client_id_7: null,
               is_delivery_boy:user.is_delivery_boy,
               delivery_boy_id:user.id,
               choice:choice,
               range_start:range_start,
               range_end:range_end,
           }
       }else{
             abc = {
              this_date:this_date,
              delivery_boy_id:user.id,
              sender_client_id_7: null,
              is_delivery_boy:user.is_delivery_boy,
              choice:choice,
              range_start:range_start,
              range_end:range_end,
           }
       }
    
     //for marchant overwrite
    
   if(user.is_marchant==1){

    abc = { 
      this_date:this_date,
      sender_client_id_7: null,
      user_id:user.id,
      is_delivery_boy:user.is_delivery_boy,
      delivery_boy_id:user.id,
      choice:choice,
      range_start:range_start,
      range_end:range_end, 
   }
   } 
   
   ///////////////////////////////////////////////////////////////////////////////
 


   var counts=counts
   var scale=2000
 
   let total=counts
   var per_page=0
   var total_page=0
   var last_page=0


   if(counts>scale){
    per_page=scale

      total_page=parseInt(total/per_page)
      last_page=total-total_page*per_page 

   }else{
    total_page=0
    last_page=counts
   }


   const collection=[]
   let report_name=''
   for(var i=0; i<= total_page; i++){
       var skip=i*per_page
       var get_items=per_page
       if(i==total_page){
           get_items=last_page
       }

  let com=parseInt(((i+1)/total_page)*100)
  console.log(com,'com')
  setcompleted(com)

  console.log(abc,'')
let you=[]
   await axios.post(base_url + "pickup_download", {...abc, created_branch_id:checked, i_priority_id_3:pro_prio, skip:skip,get_itms:get_items, sender_client_id_7:services_clients_id,i_product_type_id:i_product_type_id, i_delivery_status_id_18:id }).then((res) => {
     console.log(res.data,'okkkc')
 
    const get_ = res.data.result;
    var cc = 0;
    for (var i =get_.length-1 ; i > -1; i--) {
      cc++
      var obj = get_[i];
      var client = '';
      var client_branch = '';

     try {

          if (obj.sender_category_1 == 'corporate_sender') {

          //  console.log(services_clientsList,'services_clientsList')

              var filter2 = filterItemsequal(services_clientsList, 'value', obj.sender_client_id_7);
             // console.log(services_clientsList,obj.sender_client_id_7,filter2,'filter22')
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
payment='partially'
}

if(check_cost==0 && check_bal==0){
payment='completed'
}
var pp_date=obj.pickup_date_3.split("-").reverse().join("-").toString()


var delivery_date=null
//if(obj.i_delivery_status.i_delivery_status=='Delivered'){
delivery_date=obj.delivery_date
//}
let otp="Not Verified"
if(obj.otp_verified==1){
  otp="Verified"
}




var date=""
var time=""
var given=delivery_date || ""

if(given.length>9){
    date=given.substring(0,10)
}

var pp_date2=date.split("-").reverse().join("-").toString()



if(given.length>11){
    time=given.substring(11,25)
}
  
 if(obj.delivery_boy_id_?.employee_id){
  //you[obj.delivery_boy_id_.employee_id]=obj.delivery_boy_id_?.commission_rate

 }

/*var common ={
  "id": obj.id,
  "UID":obj.unique_upload_id,
  "Reference No": obj.sender_ref_no_4,

  "Pickup Date": pp_date,
  "Delivery Status": obj.i_delivery_status.i_delivery_status,
  
  "Services": obj.services.services,
  "Priority": obj.i_priority.i_priority,
  "Product Type": obj.i_product_type.i_product_type,

  "Clients": client,
  "Client Branch": client_branch,

  "Recipient Phone": obj.recipient_phone_20,
  "Recipient Name": obj.recipient_name_21, 
  "Recipient Address": obj.recipient_address_24,

  "Destination Branch": obj.current_branch.branch,
  "Pickedup Branch": obj.created_branch_.branch,
  "Register": obj.creator1_.userName,
  
  var reurn ={
  "Return Date": date,
  "time":time,
  ...(obj.i_return_cause_id ? { "Return Reason": obj.i_return_cause.i_return_cause } :[]),
  ...(obj.i_relation_id ? { "Relation": obj.i_relation.i_relation } : []),      
  ...(obj.i_relation_person ? { "Relation Person": obj.i_relation_person} : []),
}



var delivered = {
  "Delivery Date": date,
  "time":time,
  ...(obj.i_relation_id ? { "Relation": obj.i_relation.i_relation } : []),      
  ...(obj.i_relation_person ? { "Relation Person": obj.i_relation_person} : []),
  ...(obj.delivery_boy_id ? { "Delivery Boy Name": obj.delivery_boy_id_.userName +"("+ obj.delivery_boy_id_.employee_id+")" } :[] ),
  ...(obj.delivery_boy_id ? { "Delivery Commission": obj.delivery_boy_id_?.commission_rate } :[] ),
  "Delivery Area":obj.delivery_boy_area,
  "Otp": otp,
}
}
var reurn ={
  "Return Date": date,
  "time":time,
  ...(obj.i_relation_person ? { "Received by": obj.i_relation_person} : []),
  ...(obj.i_relation_id ? { "Relation": obj.i_relation.i_relation } : []), 
  ...(obj.i_return_cause_id ? { "Return Reason": obj.i_return_cause.i_return_cause } :[]),
   "Date": date,    
  
}


*/
var common ={
  "Client Name": client,
  "Pickup Date": pp_date,
  "Reference No": obj.sender_ref_no_4,
  
  
  "HMW No.": obj.id,
  "Name": obj.recipient_name_21, 
  "Address": obj.recipient_address_24,
  "Phone":obj.recipient_phone_20,
  "Type": obj.i_product_type.i_product_type,
  "Status": obj.i_delivery_status.i_delivery_status,
  
}

var accounts ={
  "Delivery Cost": obj.delivery_cost_amount,
  "Collection Amount": obj.collection_amount,
  "Cod Percent": cod_, 
  "Return Cost":obj.return_cost_amount,

  "Wallet -": obj.amount_from_wallet,
  "Wallet +": obj.amount_to_wallet,

  "Payment Type": obj.i_payment_type.i_payment_type,
  "Payment":payment, 
} 

var accounts_min ={
  "Delivery Cost": obj.delivery_cost_amount,
} 



var reurn ={
  ...(obj.i_relation_person ? { "Received by": obj.i_relation_person} : []),
  ...(obj.i_relation_id ? { "Relation": obj.i_relation.i_relation } : []), 
  ...(obj.i_return_cause_id ? { "Return Reason": obj.i_return_cause.i_return_cause } :[]),
   "Date": pp_date2,     
}



var delivered = {
  ...(obj.i_relation_person ? { "Received by": obj.i_relation_person} : []),
  ...(obj.i_relation_id ? { "Relation": obj.i_relation.i_relation } : []),      
  "Date": pp_date2,
}


var date_only = {
	...(pp_date2 ? { "Date": pp_date2 } :[]),
}

var alll = {
  ...(obj.i_relation_person ? { "Received by": obj.i_relation_person} : []),
  ...(obj.i_relation_id ? { "Relation": obj.i_relation.i_relation } : []), 
  ...(obj.i_return_cause_id ? { "Return Reason": obj.i_return_cause.i_return_cause } :[]),
  
}

var x_data = {
  ...common
}

if(id==6 ||  id==12){  //Delivered//Out For Delivery
        x_data = {
          ...x_data,
          ...delivered
      }
      report_name="Delivered/Out"
}

else if(id==8){  //Returned
      x_data = {
        ...x_data,
        ...reurn
    }
    report_name="Returned"
}else if(id==99){  


  x_data = {
    ...x_data,
	...date_only,
    ...alll,
	...accounts_min
  }
 
}


//accounts
/*if(service_name=="All Services" || service_name=="E-commerce Service" || service_name=="E-commerce" ){
  x_data = {
    ...x_data,
    ...accounts,
}
}*/
//alert(you.toString())

//setservices_clientsbraanchList(you.toString())
      collection.push(x_data);
      
  }

    //collection.push(result)
      }).catch(function (error) { 
        console.log(error,'error');
      });
      
      ;
    };  


    let name=""
    if(services_clients_name!=null){
      name=name+"_"+services_clients_name
    }
    if(i_product_type_name!=null){
      name=name+"_"+i_product_type_name
    }

    if(name==null){
      name="ixpress"
    }


    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

     let currentDate = `${day}-${month}-${year}`;
   
    

    if(range_start != null){
      name=name+ range_start +" "+ range_end
    }else{
      name=name+" Report on "+ currentDate  
    }

    if(report_name!=''){
          name=report_name+" "+name
    }

    Export(collection,name)
setcompleted(0)
setshowPro(0)
 
   }



   ////////////////////////////////////////////////////////////////////////////////
 
 



     











  const getData = async () => {
    var abc =[]
    setshowPro(1)
    const all_access = localStorage.getItem('all_access');
    var set_choice=choice
    if(set_choice=='1'){set_choice=null}
       if(all_access!=1){
   
             abc = {
               this_date:this_date,
               branch_id: user.branch_id,
               current_branch_id: user.branch_id,
               sender_client_id_7: null,
               is_delivery_boy:user.is_delivery_boy,
               delivery_boy_id:user.id,
               choice:choice,
               range_start:range_start,
               range_end:range_end,
           }
       }else{
             abc = {
              this_date:this_date,
              delivery_boy_id:user.id,
              sender_client_id_7: null,
              is_delivery_boy:user.is_delivery_boy,
              choice:choice,
              range_start:range_start,
              range_end:range_end,
           }
       }
    
     //for marchant overwrite
    
   if(user.is_marchant==1){

    abc = {
      this_date:this_date,
      sender_client_id_7: null,
      user_id:user.id,
      is_delivery_boy:user.is_delivery_boy,
      delivery_boy_id:user.id,
      choice:choice,
      range_start:range_start,
      range_end:range_end,
   }
   } 
   
   
    console.log(abc, 'abc');
   
   await axios.post(base_url + "stock_counts", {...abc, created_branch_id:checked, i_priority_id_3:pro_prio, sender_client_id_7:services_clients_id,i_product_type_id:i_product_type_id }).then((res) => {
    console.log(res,'resres')
         setprocessing(res.data.processing)
         setshipped(res.data.shipped)
         setin_transit(res.data.in_transit)
         sethold(res.data.hold)
         setreturn_process(res.data.return_process)
         setbooking(res.data.booking)
         setout_for_deli(res.data.out_for_deli)
         setexception(res.data.exception)
         
         setreturn_received(res.data.return_received)
         setdelivered(res.data.delivered)

         settotal_order(res.data.processing+res.data.shipped+res.data.in_transit+res.data.hold+res.data.return_process+res.data.booking+res.data.out_for_deli+res.data.exception+res.data.return_received+res.data.delivered)

         setshowPro(0)
         //res.data.services_clients.map((temp) => { return arr_services_clients.push({value: temp. 
     });
     getData2()
    };
     
   

    const getData2 = async (selected_delivery_status=6) => {
      console.log('22222',selected_delivery_status)
      var abc =[]
      setshowPro(1)
      const all_access = localStorage.getItem('all_access');
      var set_choice=choice
      if(set_choice=='1'){set_choice=null}
         if(all_access!=1){
     
               abc = {
                this_date:this_date,
                 branch_id: user.branch_id,
                 current_branch_id: user.branch_id,
                 sender_client_id_7: null,
                 is_delivery_boy:user.is_delivery_boy,
                 delivery_boy_id:user.id,
                 choice:choice,
                 range_start:range_start,
                 range_end:range_end,
             }
         }else{
               abc = {
                this_date:this_date,
                delivery_boy_id:user.id,
                sender_client_id_7: null,
                is_delivery_boy:user.is_delivery_boy,
                choice:choice,
                range_start:range_start,
                range_end:range_end,
             }
         }
      
       //for marchant overwrite
      
     if(user.is_marchant==1){
  
      abc = {
        this_date:this_date,
        sender_client_id_7: null,
        user_id:user.id,
        is_delivery_boy:user.is_delivery_boy, 
        delivery_boy_id:user.id,
        choice:choice,
        range_start:range_start,
        range_end:range_end,
     }
     } 
     
     
      console.log(abc, 'abc0');
     
 
  
       console.log( 'rrrrr')
       await axios.post(base_url + "testsum", {...abc, created_branch_id:checked, i_priority_id_3:pro_prio, selected_delivery_status:selected_delivery_status, sender_client_id_7:services_clients_id,i_product_type_id:i_product_type_id }).then((res) => {
        console.log(res,'xyz')
  
        var resdata=res.data.groupUsers 
        var amount_from_wallet=0
        var amount_to_wallet=0
        var delivery_cost_amount=0
        var cod_cost_amount=0
        var collection_amount=0
        var return_cost_amount=0
        
        for (var i=0; i<resdata.length;i++) {
          delivery_cost_amount=delivery_cost_amount+resdata[i]._sum.delivery_cost_amount
          amount_from_wallet=amount_from_wallet+resdata[i]._sum.amount_from_wallet
          amount_to_wallet=amount_to_wallet+resdata[i]._sum.amount_to_wallet
          cod_cost_amount=cod_cost_amount+resdata[i]._sum.cod_cost_amount
          collection_amount=collection_amount+resdata[i]._sum.collection_amount
          return_cost_amount=return_cost_amount+resdata[i]._sum.return_cost_amount
        } 
   
        var sum=parseInt(delivery_cost_amount)+parseInt(cod_cost_amount)+parseInt(return_cost_amount)-parseInt(amount_from_wallet) 
         
        setfw(amount_from_wallet || 0) 
        settw(amount_to_wallet || 0)
        setdc(delivery_cost_amount || 0)
        setco(cod_cost_amount || 0)
        setcm(collection_amount || 0)
        setrc(return_cost_amount || 0)
        setsco(sum  || 0)
        setcao(parseInt(collection_amount)-parseInt(amount_to_wallet)  || 0)

        setshowPro(0)

            });
      };
       
     
  
  

   
   useEffect(() => {
   console.log('call by')
     getData(); 
     getData2(null);
   }, [choice,range_start,i_product_type_id,services_clients_id,pro_prio]);
   


  let cardList = []; 
   

  if(user.is_delivery_boy==1){
    cardList = [
       { name: 'Out For Delivery', amount: out_for_deli, icon: 'directions_bike', id:12 },
      { name: 'Exception', amount: exception, icon: 'call_missed', id:10 },
      { name: 'Delivered', amount: delivered, icon: 'check', id:6 },
      { name: 'Returned', amount: return_received, icon: 'assignment_return', id:8 },
      { name: 'Total Order', amount: total_order, icon: 'star', id:99 },
    ]
  }else{
    cardList = [
      { name: 'Booking', amount: booking, icon: 'local_mall', id:2 }, 
      { name: 'Not Received', amount: hold, icon: 'settings_power', id:9 },
      { name: 'Processing', amount: processing, icon: 'next_week', id:3 },
      { name: 'In Transit', amount: in_transit, icon: 'local_shipping', id:5 },
      { name: 'Received', amount: shipped, icon: 'redeem', id:4 },
      { name: 'Return in process', amount: return_process, icon: 'art_track', id:7 },
     
      { name: 'Out For Delivery', amount: out_for_deli, icon: 'directions_bike', id:12 },
      { name: 'Exception', amount: exception, icon: 'call_missed', id:10 },
      { name: 'Delivered', amount: delivered, icon: 'check', id:6 },
      { name: 'Returned', amount: return_received, icon: 'assignment_return', id:8 },
      { name: 'Total Order', amount: total_order, icon: 'star', id:99 },
    ]
  }



 
    let cardList1 = [];

if(user.is_delivery_boy==1){
  cardList1 = [
     { name: 'Collection Amount', amount: cm, icon: 'shopping_cart' },
     { name: 'Collection settlement', amount: tw, icon: 'attach_money' },
     { name: 'Collection unsettlement', amount: cao, icon: 'attach_money' },
  ];
}else{
  cardList1 = [
    { name: 'Delivery Cost ', amount: dc, icon: 'attach_money' },
    { name: 'Return Cost ', amount: rc, icon: 'attach_money' },
    { name: 'COD Cost ', amount: co, icon: 'store' },
    { name: 'Collection Amount', amount: cm, icon: 'shopping_cart' },
    { name: 'Service charge settlement', amount: fw, icon: 'attach_money' },
    { name: 'Collection settlement', amount: tw, icon: 'attach_money' },
    { name: 'Service charge Outstanding', amount: sco, icon: 'attach_money' },
    { name: 'Collection usettlement', amount: cao, icon: 'attach_money' },
  ];
}





  return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid container spacing={6}> 
        


        <Grid item lg={12} md={12} sm={12} xs={12}>

        {user.is_delivery_boy !=1 && <>
         <div title="Status" style={{  margin: "2%",  borderRadius: "3px",   padding:"10px",  }}>
            <Box className="breadcrumb" style={{backgroundColor: "#ffffff00"}}>
                <Breadcrumb style={{backgroundColor: "#ffffff00"}} routeSegments={[ { name: "Dashboard" }]} />  
                
            </Box> 
        </div> 
        </> }


 {user.is_delivery_boy ==1 &&
 <> 
 <br></br>
 <p style={{  margin: "7px",      textAlign:"center"  }}>Delivery Boy Dashboard</p>
 
 </>
}


{/*Current Stock*/}



 
<div title=" " style={{  margin: "2%",  borderRadius: "3px",  padding:"10px",  }}> 



 


            <Grid container spacing={3}>
 
            {(user.is_dashboard_account==0  && user.is_dashboard_account==0  && user.is_setup_conf==0) &&
            <>
             <Grid item lg={3} md={3} sm={12} xs={12}><br></br></Grid> 
<Grid item lg={6} md={6} sm={12} xs={12}>

<Lottie animationData={animation_lmfccbqn} loop={true} />
</Grid>            
            </>

}

 


            {(user.is_dashboard_account==1  || user.is_dashboard_account==1  || user.is_setup_conf==1) &&
            <>
            
           

                <Grid item lg={2} md={2} sm={12} xs={12}>
                  <Select
                    placeholder={"Select Service"}
                    onChange={(choice) => {
                      if (choice.value == "1") {
                        seti_product_type_id(null);
                        setservices_clients_id(null)
                        setUserChoice(null);
                        seti_product_type_name(null)
                        setservices_clients_name(null)
                        setservice_name("All Services")
                      } else {
                        setservice_name(choice.label)
                        setUserChoice(choice.value);
                        if (i_product_typeList.length > 0) { var filter = filterItems(i_product_typeList, 'services_id', choice.value.toString()); console.log(filter, 'filter'); seti_i_product_typeList_filtered(filter); } else { seti_i_product_typeList_filtered(null); }
                        if (services_clientsList.length > 0) { var filter2 = filterItems(services_clientsList, 'services_id', choice.value.toString()); setservices_clientsList_filtered(filter2); } else { setservices_clientsList_filtered(null); }
                        seti_product_type_id(null);
                        setservices_clients_id(null)
                      }

                    }} options={options} />
                </Grid> 


                <Grid item lg={2} md={2} sm={12} xs={12}>
                  <Select
                    placeholder={"Select Priority"}
                    onChange={(choice) => {
                       if (choice.value == "5") {
                        setpro_prio(null)
                      } else {
                        setpro_prio(choice.value)
                      } 

                    }} options={prio} />
                </Grid> 



                {user.is_delivery_boy!=1 &&

        <Grid item lg={3} md={3} sm={12} xs={12}>
            <Select  
  placeholder={"Select Client"}
            
            onChange={(choice) => {     
             setservices_clients_id(choice.value); 
             setservices_clients_name(choice.label)
               } } options={services_clientsList_filtered} />
        </Grid> 

              }

{user.is_delivery_boy!=1 &&
        <Grid item lg={2} md={2} sm={12} xs={12}>
            <Select    
            placeholder={"Select Product"} 
            onChange={(choice) => {    
             seti_product_type_id(choice.value); 
             seti_product_type_name(choice.label)
               } } options={i_product_typeList_filtered} />
        </Grid> 

              }






        <Grid item lg={2} md={2} sm={12} xs={12}>
				<RangePicker style={{width:"100%"}} onChange={handleDateChange} format={dateFormat} /> 
	    </Grid>  

 

                            <Grid item md={1} lg={1} sm={6} xs={6}>
                                <Grid item md={4} lg={4} sm={6} xs={6}> <Checkbox checked={checked} onChange={handleChangeglobal} inputProps={{ 'aria-label': 'controlled' }} /> </Grid> 
                                <Grid item md={8} lg={8} sm={6} xs={6}>Stock</Grid> 
                            </Grid>
		
        </>
}

      {/*
     <Grid item lg={1} md={1} sm={6} xs={6}>
              <Button onClick={(choice) => {   

                        seti_product_type_id(null);
                        setservices_clients_id(null) 

               } }  color="primary" className='button'>Clear All</Button>
        </Grid>    
      */ }  

{ service_name &&

<Grid item lg={12} md={12} sm={12} xs={12}>





<x  style={{display: 'inline-block'}}><b>Search result for</b> <p style={{display: 'inline-block'}}></p> {service_name} {" >> "} 

    { services_clients_name &&
    <>
         {services_clients_name} <p onClick={(choice) => {     
              setservices_clients_name(choice.label)
              setservices_clients_id(null) 
                } } style={{display: 'inline-block',     background: "orange", color:"white" , borderRadius: "25px",  cursor: "pointer"}}> Clear client </p> {" >> "} 
    </>
    }

    { i_product_type_name &&
    <>
         {i_product_type_name} <p onClick={(choice) => {     
             seti_product_type_name(choice.label)
             seti_product_type_id(null);
               } } style={{display: 'inline-block',     background: "orange", color:"white" , borderRadius: "25px",  cursor: "pointer"}}> Clear product </p> {" >> "} 
    </>
    }

 </x>
</Grid>
}
 
{(user.is_dashboard_account==1  || user.is_setup_conf==1) &&
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Grid container spacing={3} sx={{ mb: '24px' }}>
                  {cardList1.map((item, index) => (
                    <Grid item xs={12} md={3} key={index}>
                      <StyledCard elevation={6}>
                        <ContentBox>
                          <Icon className="icon">{item.icon}</Icon>
                          <Box ml="12px">
                            <Small>{item.name}</Small>
                            <Heading>৳ {item.amount.toLocaleString()}</Heading>
                          </Box>
                        </ContentBox>

                        <Tooltip title="View Details" placement="top">
                          <IconButton > 
                            <Icon >arrow_right_alt</Icon>
                          </IconButton>
                        </Tooltip>
                      </StyledCard>
                    </Grid>
                  ))} 
                </Grid>
              </Grid>
}



              

            </Grid>


</div>





{(user.is_dashboard_orders==1 || user.is_setup_conf==1) &&
<div title="Current Stock" style={{  margin: "2%",  borderRadius: "3px", backgroundColor: "rgb(224 204 204)", padding:"10px",border:"3px solid cornflowerblue", }}>
  
  

  
  <Grid item md={12} lg={12} sm={12} xs={12} style={{backgroundColor: "rgb(224 204 204)",borderRadius: "3px",paddingLeft: "5px",   color: "cornflowerblue",fontSize: "26px",marginBottom:"1%" }}> <Icon>grain</Icon> Delivery Status  


  {user.is_marchant !=1 &&
<>
&nbsp;  &nbsp;<x style={{fontSize:"16px"}}><i>(All Branch)</i></x>
</>
}


{showPro==1 &&
    <CircularProgress style={{color:"white", cursor:"pointer", float: "right"}}/>
}
{showPro==0 &&
 <Icon style={{cursor:"pointer", float: "right"}} onClick={getData}>refresh</Icon>    
} 
  </Grid>

 
{( completed>0  && completed<101) && 
  <Grid container spacing={3} sx={{ mb: '24px' }}>
  <p style={{color:"red", marginLeft:"150px", background: "white" , borderRadius: "5px", padding:"5px"}}>Please Wait....  Completed <b>{completed} % </b></p>
  </Grid>
}



{/*<Grid container spacing={3} sx={{ mb: '24px' }}>
  <Grid item xs={12} md={3} >
 
  {user.commission>0 &&
  <div style={{"padding":"10px 40px 10px 40px", "border":"1px solid", "color":"white", "font-size":"16px"}}>
 Commission: ৳ {delivered*user.commission}
  </div>
  }

  </Grid>
</Grid>*/}



<Grid container spacing={3} sx={{ mb: '24px' }}>
      {cardList.map((item, index) => (
        <Grid item xs={12} md={3} key={index}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon">{item.icon}</Icon>
              <Box ml="12px">

                <Small>{item.name} 
                
                <IconButton onClick={() => {     
                           
                           if(item.id==99){
                            getData2(null)
                            setselected_delivery_status(null)
                         }else{
                            getData2(item.id)
                            setselected_delivery_status(item.id)
                         }
                           window.scrollTo(0, 0);
                          }
                          }>
                 <Icon data-id={item.id} onClick={handlecountsShow} >arrow_outward</Icon>
              </IconButton>                
                 </Small>

                <Heading>{item.amount.toLocaleString()}</Heading>
     


                {subComponent(item.amount,item.id)}

                { (Math.ceil(100*item.amount/total_order) !=100 &&  total_order)  ? (

                                                  <p style={{"color":"black", width: (Math.ceil(100*item.amount/total_order)*2)+"px", background:"aquamarine", borderRadius:"3px", padding:"2px" }}>{Math.ceil(100*item.amount/total_order)}% </p>

                ): (

                  <p>...</p>
                )

              
              } 



              </Box>
            </ContentBox>
  
            <Tooltip   title="Download" placement="top">
 
              <IconButton onClick={() => {     
                            downloadData(item.id,item.amount,service_name,services_clients_name,i_product_type_name, range_start, range_end)
                            console.log("called")
                          }
                          }>
                <Icon data-id={item.id} onClick={handlecountsShow} >download</Icon>
              </IconButton>
            </Tooltip>
          </StyledCard>
        </Grid>
      ))}
    </Grid>






{/*JSON.stringify(user)*/}

      
				
			 

</div> 
}



</Grid>   




{/*<Grid item lg={6} md={6} sm={12} xs={12}>
<div title="Current Stock" style={{  margin: "2%",  borderRadius: "3px", backgroundColor: "#212943", padding:"10px",border:"3px solid cornflowerblue", }}>
<Grid item md={12} lg={12} sm={12} xs={12} style={{backgroundColor: "#212943",borderRadius: "3px",paddingLeft: "5px",   color: "azure",fontSize: "26px",marginBottom:"1%" }}> <Icon>grain</Icon> Final Status
<Icon style={{cursor:"pointer", float: "right"}} onClick={getData}>refresh</Icon>     </Grid>

 
      <Grid item xs={6} md={3} >
          <Card  >
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Delivered
                </Typography>
                <Typography variant="body2" color="text.secondary">
                1502
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
      </Grid>

      <Grid item xs={6} md={3} >
          <Card  >
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Delivered
                </Typography>
                <Typography variant="body2" color="text.secondary">
                1502
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
      </Grid>
 
</div> 
      </Grid>   */}
















{
/*

          <Grid item lg={8} md={8} sm={12} xs={12}>
            <StatCards />
            <TopSellingTable />
            <StatCards2 />

            <H4>Ongoing Projects</H4>
            <RowCards />
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Card sx={{ px: 3, py: 2, mb: 3 }}>
              <Title>Traffic Sources</Title>
              <SubTitle>Last 30 days</SubTitle>

              <DoughnutChart
                height="300px"
                color={[palette.primary.dark, palette.primary.main, palette.primary.light]}
              />
            </Card>

            <UpgradeCard />
            <Campaigns />
          </Grid>

*/
          }

        </Grid>
      </ContentBox>
    </Fragment>
  );
};

export default Analytics;
