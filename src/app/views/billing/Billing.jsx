import { Icon, Grid, Button,Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Breadcrumb } from "app/components";
import useAuth from 'app/hooks/useAuth';
import axios from "axios";
import { useEffect, useState } from 'react';
import { Span } from 'app/components/Typography';
import { base_url } from '../../utils/constant';
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Autocomplete from '@mui/material/Autocomplete';
import * as React from 'react';
import ReactLoading from 'react-loading';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { DatePicker } from 'antd';
import Select from 'react-select'
axios.defaults.headers.common['accessToken'] =  'JWT '+window.localStorage.getItem('accessToken');

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
})); 

const TextField = styled(TextValidator)(() => ({ width: "100%", marginBottom: "16px", }));
const filterItems = (arr, field, value) => { try { if (field != null) { return arr.filter((item) => { return item[field].includes(value) }) }} catch (error) { console.error(error);}}
const filterItems_mul = (arr, field, value) => { try { if (field != null) { return arr.filter((item) => {  return value.includes(item[field])  }) } } catch (error) { console.error(error);}}
const filterItems2 = (arr, field, value) => { try { if (field != null) { return arr.filter((item) => { return item[field]==value }) } } catch (error) { console.error(error);}}
const filterItemsequal = (arr, field, value) => { try { if (field != null) { return arr.filter((item) => { return item[field]==value }) }} catch (error) { console.error(error);}}
const Alert = React.forwardRef(function Alert(props, ref) { return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;});


//{ name: "Material", path: "/material" },
const AddPod = () => {

const {format} = require('date-fns');
  const [this_date, setthis_date] = useState(null);
  const [get_search_data_tracking, setget_search_data_tracking] = useState([]);

  const [selected_rows, setselected_rows] = useState([]);
const [servicesList, setservicesList] = useState([]);

const [services_clientsList, setservices_clientsList] = useState([]);
const [services_clientsList_filtered, setservices_clientsList_filtered] = useState([]);

const services_clientsProps_sender = { options: services_clientsList_filtered, getOptionLabel: (option) => option.label,};

const [services_clients_branchList, setservices_clients_branchList] = useState([]);  
const [services_clients_branchList_sender_filtered, setservices_clients_branchList_sender_filtered] = useState([]); 
const services_clients_branchList_sender = { options: services_clients_branchList_sender_filtered, getOptionLabel: (option) => option.label,};

const [alert_def_txt, setalert_def_txt] = useState('Data Submitted Successfully!');
const [alert_def_class, setalert_def_class] = useState('success');
const handleClick = () =>{ setOpen(true); };
const handleClose = (event, reason) => { if (reason === 'clickaway') { return; } setOpen(false); };
const [open, setOpen] = React.useState(false);
//main

 
const [client_id, setclient_id] = useState(null);
const [marchant_id, setmarchant_id] = useState(null);
const [img_col, setimg_col] = useState(null);
const [amount, setamount] = useState([]);
const [method, setmethod] = useState([]);
const [account, setaccount] = useState([]);
const [trx_src, settrx_src] = useState(null);
const [amount_sum, setamount_sum] = useState(0);
const [img_src, setimg_src] = useState(null);
const [last_trx, setlast_trx] = useState(null);

const [loading_pod,setloading_pod]  = useState(0);


  const dateFormat = 'YYYY-MM-DD';
  const [range_start, setrange_start] = useState(null);
  const [range_end, setrange_end] = useState(null);
  const [mykey,setmykey]  = useState(null);
const { RangePicker } = DatePicker;
/*------------------------------------------useEffect-------------------------------------------------*/
useEffect(() => {
  const basic_user = {
    id: user.id,
    is_all_branch: user.is_all_branch,
    is_marchant: user.is_marchant,
    }
  const getData_sc = async () => {
      const arr_services_clients = []; const arr_services_clients_branch = [];  const arr_services = [];
    await axios.post(base_url+"setup_config",basic_user).then((res) => {
        res.data.services_clients.map((temp) => { return arr_services_clients.push({value: temp.services_clients_id, label: temp.services_clients,services_id:temp.services_id,services_provider_id:temp.services_provider_id,i_sms_template_id:temp.i_sms_template_id,i_product_type_id:temp.i_product_type_id,services_packages_id:temp.services_packages_id}); }); setservices_clientsList(arr_services_clients) 
        res.data.services_clients_branch.map((temp) => { return arr_services_clients_branch.push({value: temp.services_clients_branch_id, label: temp.services_clients_branch+' (c/b:'+temp.wallet+')',  services_clients_id: temp.services_clients_id}); }); setservices_clients_branchList(arr_services_clients_branch) 
        res.data.services.map((temp) => { return arr_services.push({value: temp.services_id, label: temp.services}); }); setservicesList(arr_services)
    });
  };
  getData_sc();
}, []);


const paymentList = [
  { label: 'Bkash', value: 'Bkash' },
  { label: 'Nagad', value: 'Nagad' },
  { label: 'Upay', value: 'Upay' },
  { label: 'Bank', value: 'Bank' },
]
const optionsx = [
  { value: null, label: '------Clear----- ' },
  { value: 'withdraw', label: 'Withdraw' },
  { value: 'paid', label: 'Paid' },
  { value: 'collection', label: 'Collection' }
]

const handleChangeamount = (event) => {
  setamount_sum(event.target.value);
};
const handleChangeaccount = (event) => {
  setaccount(event.target.value);
};
const handleChangeaccountsrc = (event) => {
  settrx_src(event.target.value);
};
const withdraw = (event) => {
  event.preventDefault();


  if(amount_sum==null){
    return
  }

   const date = format(new Date(), 'yyyy-MM-dd')
  var this_unique=new Date().valueOf().toString(); 

  let selected_rows_text = selected_rows.toString();
  //console.log(selected_rows,'selected_rows')
  

  const master_submit = {
    transaction_id: this_unique,
    amount: parseInt(amount_sum),
    key: 'withdraw',
    method: method,
    account: account,
    marchant_id:marchant_id,
    client_id:client_id,
    request_date: date,
    created: date,
    creator:  user.id,
    approved_by: null,
    approved_date: '',
    selected_rows_text:selected_rows_text
} 
 
console.log(master_submit,'master_submit')

const res = axios.post(base_url + "insert_wallet_request", master_submit).then((response) => {
  console.log(response.data, 'res');
  setalert_def_txt('Request Submitted'); setalert_def_class('success'); handleClick();
  getData_sc2();
  alert('Request Submitted')
  setamount_sum(null)
}).catch(function (error) {
  if (error.response) {
      console.log(error.response.data, 'error');
  } 
});    





};

const view_po = (event) => {
  event.preventDefault();

  console.log(last_trx,'last_trx')

  setimg_src(1)

 // setlast_trx()

};

const addfunds = (event) => {
  event.preventDefault();

   const date = format(new Date(), 'yyyy-MM-dd')
    var this_unique=new Date().valueOf().toString(); 
  const master_submit = {
    transaction_id: this_unique,
    amount: parseInt(amount),
    key: 'add funds',
    method: method,
    account: account,
    marchant_id:marchant_id,
    client_id:client_id,
    request_date: date,
    created: date,
    creator:  user.id,
    approved_by: null,
    approved_date: '',
}
  
console.log(master_submit,'master_submit')

const res = axios.post(base_url + "insert_wallet_request", master_submit).then((response) => {
  console.log(response.data, 'res');
  setalert_def_txt('Request Submitted'); setalert_def_class('success'); handleClick();
  getData_sc2();
  alert('Request Submitted')

}).catch(function (error) {
  if (error.response) {
      console.log(error.response.data, 'error');
  } 
});    


};
const onFileChange = function (e) {
  e.preventDefault();
  console.log(55555)
  setimg_col(e.target.files)
}
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

const aapproved = (event) => {
  var done=0
  if(selected_rows.length>0){
     const date = format(new Date(), 'yyyy-MM-dd')
      var c_b; var c_c
      for (var i = 0; i < selected_rows.length; i++) {
          

          var filter = filterItemsequal(get_search_data_tracking, 'id', parseInt(selected_rows[i]));
         
         
          c_b= filter[0].marchant_id
     
          var approved_by2_=filter[0].approved_by2_
console.log(approved_by2_)
          //2.    [update pickup]
          if(approved_by2_==null){
                            const data1 = {
                    id: filter[0].wallet_id,
                    marchant_id:c_b,
                    amount_to_wallet: filter[0].amount,
                    key: filter[0].key,
                    user:user.id,
                    date:date,
                    type:"approved",
                }

                console.log(data1,'data1')
                const res = axios.post(base_url + "approved_pickup_wallet", data1).then((response) => {
                    console.log(response.data, 'res');
                    done=1
                    getData_sc2();
                }).catch(function (error) {
                    if (error.response) { 
                        done=0
                        console.log(done, 'done');
                    }
                });  
          }

      }

      //1.    [insert wallet] [update services branch]
      //console.log(done, 'error');
     // if(done==1){
       /*   var this_unique=new Date().valueOf().toString(); 
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
          }
console.log(master_submit,'master_submit')
          const res = axios.post(base_url + "insert_wallet", master_submit).then((response) => {
              console.log(response.data, 'res');
              handleSubmit()
          }).catch(function (error) {
              if (error.response) {
                  console.log(error.response.data, 'error');
              }
          });  */                  
   /*   }else{
          setalert_def_txt('Not Completed')
          setalert_def_class('warning')
          handleClick()
      }*/




      
  }else{
  setalert_def_txt('Nothing Selected')
  setalert_def_class('warning')
  handleClick()
  }
};



  const columns2: GridColDef[] = [

    { field: 'id', headerName: 'SL', Width: 40,   },
    { field: 'amount', headerName: 'Amount', minWidth: 110, flex: 1 },
    { field: 'status', headerName: 'Status', Width: 70,   },
    { field: 'key', headerName: 'Key', minWidth: 110, flex: 1 },
    { field: 'is_disbursed', headerName: 'Disbursed', minWidth: 110, flex: 1 },
    { field: 'branch_', headerName: 'Branch', minWidth: 110, flex: 1 },
    { field: 'client_id_', headerName: 'Client', minWidth: 150, flex: 1 },
    { field: 'marchant_id_', headerName: 'Client Branch', minWidth: 110, flex: 1 },
    { field: 'wallet', headerName: 'Wallet Balance', minWidth: 110, flex: 1 },
    { field: 'method', headerName: 'Method', minWidth: 110, flex: 1 },
    { field: 'transaction_id', headerName: 'Transaction id', minWidth: 150, flex: 1 },
    { field: 'request_date', headerName: 'Request Date', minWidth: 110, flex: 1 },
    { field: 'created', headerName: 'created', minWidth: 110, flex: 1 },
    { field: 'creator_', headerName: 'created By', minWidth: 110, flex: 1 },
    { field: 'approved_by2_', headerName: 'Approved By', minWidth: 110, flex: 1 },
    { field: 'approved_date', headerName: 'Approved Date', minWidth: 110, flex: 1 },
    
    { field: 'disbursed_trx', headerName: 'Disbursed trx', minWidth: 140, flex: 1 },
    { field: 'len', headerName: 'Qty', minWidth: 140, flex: 1 },
    ];


    const { logout, user } = useAuth();


    const getData_sc2 = async () => {

 

      const all_access = localStorage.getItem('all_access');
      var firsr_page_json =[]

      if(all_access!=1){
        firsr_page_json = {
          "created_branch_id": user.branch_id, 
          mykey:mykey,
          range_start:range_start,
          range_end:range_end,
          trx_src:trx_src,
          client_id:client_id
          }
      }else{
          firsr_page_json = {           mykey:mykey,
            range_start:range_start,
            range_end:range_end,
            trx_src:trx_src,
            client_id:client_id }
      }


      if(user.is_marchant==1){

          firsr_page_json = {
              user_id:user.id,
              mykey:mykey,
              range_start:range_start,
              range_end:range_end,
              trx_src:trx_src,
              client_id:client_id
          }
           
      }

    /*  firsr_page_json = {
        user_id:127,
    }*/


console.log(firsr_page_json,'firsr_page_json')

          await axios.post(base_url + "get_transaction", firsr_page_json).then((res) => {
              console.log(res,'resres')

              const my_json = []
              var cc = 0;
              var get_ = res.data.result;
var wallet_b=0
               for (var i=0; i < get_.length; i++) {
                wallet_b=get_[i].marchant_id_.wallet

                   /*if(wallet_b==0){wallet_b=get_[i].marchant_id_.wallet}


                   if(get_[i].key=='paid' || get_[i].key=='add funds'){
                      if(wallet_b>0){ wallet_b=wallet_b+get_[i].amount }else{}
                   } else if(get_[i].key=='collection' || get_[i].key=='withdraw' ){
                      if(wallet_b>0){ wallet_b=wallet_b-get_[i].amount }else{}
                   }*/

                 


                   var amount=get_[i].amount
            
                  //var filter3 = filterItemsequal(branch, 'branch_id', created_branch_id);
                  // var filter4 = filterItemsequal(services_clients, 'services_clients_id', services_clients_id);

var app=null
var app_d=null
var status='pending'
//if(get_[i].approved_by2_.length>0){app=get_[i].approved_by2_.userName }
//console.log(get_[i].approved_by2_,'get_[i].approved_by2_')
//if(get_[i].approved_date){app_d=get_[i].approved_by2_.userName }

try {
  app=get_[i].approved_by2_.userName 
  app_d=get_[i].approved_date 
  if(app.length>0){
    status='success'
  }
} catch (error) {
  
}

let dis_msg=""
if(get_[i].is_disbursed==0){
  dis_msg=""
}else{
  dis_msg="Completed"
}


let branch_ =  get_[i].current_branch?.branch || ""

let inv = get_[i].invoices

const arr =[]
if(inv){
arr=inv.split(',');
}
   
//console.log(arr,99)
                   var x_data = {
                        id: get_[i].id,
                        amount: get_[i].amount, 
                        status:status,
                        approved_by2_: app, 
                        approved_date: app_d,  
                        marchant_id:get_[i].marchant_id,

                        wallet_id:get_[i].id,
                        created: get_[i].created, 
                        creator_: get_[i].creator_.userName, 
                      key: get_[i].key, 
                        marchant_id_: get_[i].marchant_id_.services_clients_branch, 
                        wallet: wallet_b, 
                        method: get_[i].method, 
                        client_id_: get_[i].client_id_.services_clients, 
                        transaction_id: get_[i].transaction_id, 
                        request_date: get_[i].request_date,
                        is_disbursed: dis_msg,
                        disbursed_trx: get_[i].disbursed_trx,
                        branch_:branch_,
                        len:arr.length
                  }
                  my_json.push(x_data);
              } 
            setget_search_data_tracking(my_json); 
            console.log(my_json,'my_json')


            setalert_def_txt('Search Completed'); setalert_def_class('success'); handleClick();


          }).catch(function (error) { if (error.response) { console.log(error.response.data); } });
         
      };

  useEffect(() => {
      getData_sc2();
  }, []);


  const servicesProps = { options: servicesList, getOptionLabel: (option) => option.label,};
 
 


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





  return (
    <Container>

 
<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
    <Alert onClose={handleClose} severity={alert_def_class} sx={{ width: '100%' }}>
      {alert_def_txt}<br></br>
    </Alert>
</Snackbar>

      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[ { name: "Billing" }]} />  
      </Box>



{(user.is_billing==1) &&
  <ValidatorForm   onError={() => null}>
      <Stack spacing={3}>

<Grid container spacing={0}>


  <Grid xs={3}> {(user.is_billing_dis==1) &&
<>

                    <Autocomplete {...servicesProps} disableClearable InputLabelProps={{ required: true }} onChange={(event, value) => {
                         if (value != null) {
                             if (services_clientsList.length > 0) { 
                              var filter2 = filterItems(services_clientsList, 'services_id', value.value.toString()); 
                              setservices_clientsList_filtered(filter2); } else { setservices_clientsList_filtered(null); }

                            } 
                    }
                    } id="services_id_1" renderInput={(params) => (<TextField {...params} InputLabelProps={{ required: true }} label="Select Service Type" variant="standard" />)} />
               


                  <Autocomplete {...services_clientsProps_sender} disableClearable                        
                  onChange={(event, value)=>{
                  if(value!=null){ 
                   // setsender_client_id_7(value) 
                    var filter = filterItems2(services_clients_branchList, 'services_clients_id', value.value);
                    setservices_clients_branchList_sender_filtered(filter); 
                    setclient_id(value.value)
                  }else{
                  } 
                  
                  } } id="services_clients_id_sender" SelectClient renderInput={(params) => ( <TextField {...params} label="Select Client" variant="standard" /> )} /> 
        



                  <Autocomplete {...services_clients_branchList_sender}  disableClearable
                  onChange={(event, value)=>{
                  setmarchant_id(value.value)
                        /*setSecondPage(previousState => {  return { ...previousState, sender_client_branch_id_8: value.value }  }); 
                        console.log(value);
                        if(value!=null){ 
                        setsender_client_branch_id_8(value)
                  }*/ } } id="services_clients_branch_id_sender" SelectClient renderInput={(params) => ( <TextField {...params} label="Select Client Branch" variant="standard" /> )} />   
 </>}
  </Grid>








  {(user.is_billing_dis==1) &&
  <Grid xs={3}>


    <Autocomplete
      disablePortal
      onChange={(event, value)=>{
        if(value!=null){ 
          setmethod(value.value)
         console.log(value.value,'value')
        }else{
          setmethod(null)
        } 
        
        }}
      id="combo-box-demo"
      options={paymentList}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Select Payment Method" />}
    />

  <TextField   InputProps={{

  }} type="number" name="otp_write" id="standard-basic" value={amount_sum} onChange={handleChangeamount} label="Write Amount*" />
  <TextField type="text" name="otp_write" id="standard-basic" value={account} onChange={handleChangeaccount} label="Write Account Details*" />



  </Grid>

}



  {(user.is_billing_dis==1)  &&
  <Grid xs={2} style={{marginLeft:"10px"}}>
  <Button color="primary" data-id={1} onClick={withdraw} variant="contained" style={{marginTop:"3px"}}> <Icon>attach_money</Icon> <Span sx={{ pl: 1, textTransform: "capitalize" }}>Withdraw Request</Span>  </Button>  
  </Grid>
  }
  {(user.is_billing_dis==1)  &&
  <Grid xs={2}>
  <Button color="primary" data-id={1} onClick={addfunds} variant="contained" style={{marginTop:"3px"}}> <Icon>add</Icon> <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add Funds</Span>  </Button>  
  </Grid>
}

  <Grid xs={1}>
  <Button color="primary" data-id={1} onClick={view_po} variant="contained" style={{marginTop:"3px"}}> <Icon>search</Icon> <Span sx={{ pl: 1, textTransform: "capitalize" }}>View REF</Span>  </Button>  
  </Grid>

</Grid>





<Grid container spacing={2}>
 
  <i>More info for search</i>  <hr/>
  <Grid item xs={2}>
      <RangePicker onChange={handleDateChange} format={dateFormat} />  <p></p>
  </Grid>
  <Grid item xs={2}>
      <TextField type="text" name="trx_src" id="standard-basic" value={trx_src} onChange={handleChangeaccountsrc} label="Write Trx id*" /> <p></p>
  </Grid>
  <Grid item xs={2}>
  <Select  
          placeholder={"Select Key"}
            
            onChange={(choice) => {   
              setmykey(choice.value)  
             //setservices_clients_id(choice.value); 
            // setservices_clients_name(choice.label)
               } } options={optionsx} />
  </Grid>
  <Grid item xs={1}>
  <Button color="primary" data-id={1} onClick={getData_sc2} variant="contained"  > <Icon>search</Icon> <Span sx={{ pl: 1, textTransform: "capitalize" }}>Filter</Span>  </Button>  
  </Grid>
</Grid>


      </Stack>
</ValidatorForm>
}






 
 
 





      <Stack spacing={3}>  
                <div style={{ height: 400, width: '100%' }}      >
                    <DataGrid rowHeight={35}
                    checkboxSelection
                        components={{ Toolbar: GridToolbar }}
                        rows={get_search_data_tracking}
                        columns={columns2}
                        pageSize={10}
                        onSelectionModelChange={(newSelectionArray) => {
                          setselected_rows(newSelectionArray);

                          //get_search_data_tracking
let amnt=0
let init_branch=""
let ses_trx=""
for (let i=0; i<newSelectionArray.length; i++){


  var filter = filterItemsequal(get_search_data_tracking, 'id', parseInt(newSelectionArray[i]));
  ses_trx=filter[0].transaction_id
if(init_branch==""){
  init_branch=filter[0].marchant_id_
}

if(init_branch!=filter[0].marchant_id_){
  amnt=0
  break;
}

if(filter[0].key=="withdraw"){
  amnt=0
  break;
}


if(filter[0].is_disbursed==""){
    amnt=amnt+filter[0].amount 
}else{
  amnt=0
  break;
}


}

setlast_trx(ses_trx)

console.log(amnt,'amnt')
setamount_sum(amnt)

                          let sum=0
                                  try {
                                        sum = newSelectionArray.reduce(function(a, b){
                                        return a + b;
                                        });
                                  } catch (error) {
                                    
                                  }


                          console.log(sum,'sum')

                          //setSelection(newSelection.rows);
                      }}
                        rowsPerPageOptions={[10]}
                    />
                </div>
            </Stack>
  <Grid xs={1}>
  {(user.is_billing_app_col==1 || user.is_billing_app_dis==1)  &&
  
    <Button color="primary" data-id={1} onClick={aapproved} variant="contained" style={{marginTop:"3px"}}> <Icon>check</Icon> <Span sx={{ pl: 1, textTransform: "capitalize" }}>Approved</Span>  </Button>  

  }
  </Grid>



{img_src && 
  <p style={{textAlign:"center", marginTop:"50px" , background:"#a9a9a952", padding: "20px"}}>     <p>Reference</p>                   <img 
style={{
  height:"350px"
}}
 onError={({ currentTarget }) => {
    currentTarget.onerror = null; // prevents looping
    currentTarget.src="http://139.59.120.225/api/image/no-image_sm";
  }}

src={"http://139.59.120.225/api/image/"+last_trx} />

</p>
}



<br></br> <br></br>
 <br></br> <br></br>
 <p>Reference Upload (jpg)</p>
 <hr/>     
                   <form onSubmit={doSomething} style={{ marginTop: " 50px" }}>
                      {loading_pod == 1 && <ReactLoading type="bubbles" color="blue" />}
                    <div className=" ">
                        <input onChange={onFileChange} type="file" name="imgCollection" multiple />
                    </div>
             
                    <div className=" " style={{marginLeft:"15%"}}>

                        {loading_pod == 1 ?

                            <>
                                 <Button disabled color="primary" type="submit"  tabIndex= {-1}   data-id={1} variant="contained" > <Icon>upload</Icon> <Span sx={{ pl: 1, textTransform: "capitalize" }}>Upload </Span> </Button>

                            </>


                            : <>

<Button color="primary" type="submit"  tabIndex= {-1}   data-id={1}   variant="contained" > <Icon>upload</Icon> <Span sx={{ pl: 1, textTransform: "capitalize" }}>Upload </Span> </Button>
 
                            </>}


                    </div>
                     
              </form>  
            
              <hr/>    
 








    </Container>
  );
};

export default AddPod;
