import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { DateTimePicker,DatePicker,TimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Autocomplete, Grid } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { styled } from "@mui/system";
import { SimpleCard } from "app/components";
import useAuth from 'app/hooks/useAuth';
import axios from "axios";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { TextValidator } from "react-material-ui-form-validator";
import { base_url } from '../../../utils/constant';


 
import dayjs from 'dayjs';

axios.defaults.headers.common['accessToken'] =  'JWT '+window.localStorage.getItem('accessToken');

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const RadioRoot = styled("div")(({ theme }) => ({ display: "flex", "& .formControl": { marginRight: theme.spacing(3), marginLeft: theme.spacing(3), }, "& .group": { margin: theme.spacing(1, 0) },}));
const TextField = styled(TextValidator)(() => ({ width: "100%", marginBottom: "16px", }));
const filterItems = (arr, field, value) => { try { if (field != null) { return arr.filter((item) => { return item[field]==value }) } } catch (error) { console.error(error);}}
const filterItems_mul = (arr, field, value) => { try { if (field != null) { return arr.filter((item) => {  return value.includes(item[field])  }) } } catch (error) { console.error(error);}}
const filterItems2 = (arr, field, value) => { try { if (field != null) { return arr.filter((item) => { 
  
  if(item[field]!=null){
      return item[field].includes(value) 
  }



})}} catch (error) { console.error(error);}}


const {format} = require('date-fns');

const UpdateStatus=forwardRef((props,_ref)=> 
{

  const handleChange = (event) => { event.persist(); setState({ ...state, [event.target.name]: event.target.value }); console.log('call'); };
  
  const handleOtp = () =>{
 

                  if(otp_write!=null){

                                const master_submit={

                                selected_rows:props.selected_rows[0],
                                otp: otp_write
                              }
                              
                                            const res =  axios.post(base_url+"otpverify",master_submit).then((response) => {
                                            // handleClick();
                                            console.log(response.data.result,'res');
                              if(response.data.result==0){
                                alert('OTP not match');
                              }else{
                                alert('OTP verified successfully');
                                setshow_otp(0)
                              }

                                            }).catch(function(error) {  if (error.response) { console.log(error.response.data,'error'); 
                                          
                                          // error=1;
                                          
                                          } });  

                              console.log(otp_write,props.selected_rows[0]);
                  }



   }
   
  const handleDateChange = (pickup_date_3) => {
console.log(pickup_date_3,'pickup_date_3')
    try {
    const new_date=format(pickup_date_3, 'yyyy-MM-dd');
    setdateTime(new_date)
  //  console.log(new_date,'new_date')
    setState({ ...state,  pickup_date_3:new_date })

    setnew_pickup_date_3(new_date)
   // console.log(status_date,'status_date')
    
  } catch (error) {
    console.error(error);
    setState({ ...state,  pickup_date_3 })

    setnew_pickup_date_3(null)
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
  }
    //console.log(new_date,'new_date');
    
};


  const handleDateChange_time = (pickup_date_3) => {
     try {
    const new_date=format(pickup_date_3, 'yyyy-MM-dd HH:mm');
    const new_time=format(pickup_date_3, 'HH:mm');
    setdateTime_time(new_date)
    setnew_pickup_date_3_time(new_time)
    //console.log(new_date,'new_date',new_time)
    //setState({ ...state,  pickup_date_3:new_date })

    
   // console.log(status_date,'status_date')
    
  } catch (error) {
    console.error(error);
   // setState({ ...state,  pickup_date_3 })

     setnew_pickup_date_3_time(null)
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
  }
    //console.log(new_date,'new_date');
    
};


     
  useImperativeHandle(_ref, () => ({  
   getSenderRecipient: () => { 
   // const new_date=status_date.toString().substring(0, 10);
     
 
   const jason = {
    action_type:select_action_1,
    date:new_pickup_date_3,
    time:new_pickup_date_3_time,
    i_delivery_status_id_18:deli,
    i_tracking_status_id_19:delivery_options.i_tracking_status_id_19,
    destination:recipient_branch_id_29,
    pickup_reference_id:sender_ref_no_4,
    i_relation_person:i_relation_person,
    delivery_boy_id:delivery_boy_id,
    i_return_cause_id:i_return_cause_id,
    i_relation_id:i_relation_id,
    source:source_branch

  } 
       // console.log(jason); 
    return jason;
}, 
getSenderRecipient_excel: () => { 
  const jason = {
    sender_ref_no_4:sender_ref_no_4,
  }
 // console.log(jason); 
return jason;
}, 

}));

 



useEffect(() => {
  const keyDownHandler = event => {

  


    /*if (  event.keyCode == 9) {
      document.getElementById("standard-basicxx").focus();
    //alert(1)
    }*/
      /*if (event.key === 'Enter') {
          event.preventDefault();
          handleUpdateStatus()
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
      }*/
  };
  
  document.addEventListener('keydown', keyDownHandler);
  return () => {
      document.removeEventListener('keydown', keyDownHandler);
  };

}, []);










useEffect(() => {
if(props.selected_rows!=null){
        if(props.selected_rows.length==1 && props.otp_allow==1){


        //check delivered?
        


        console.log(props.selected_rows);
        setshow_otp(1)
      }else{
        setshow_otp(0)
      }
}


}, [props.selected_rows]); 


const { start1, setstart1 } = React.useState(0);
 
 const { logout, user } = useAuth();
 const [active_update_button, setactive_update_button] = useState(0); 

/*----------------------------------------------Start sender--------------------------------------------------------------*/

  const services_clientsProps_sender = { options: props.services_clientsList, getOptionLabel: (option) => option.label,};

  const [services_clients_branchList_sender_filtered, setservices_clients_branchList_sender_filtered] = useState([]); 
  const services_clients_branchList_sender = { options: services_clients_branchList_sender_filtered, getOptionLabel: (option) => option.label,};

  const [select_action_1, setselect_action_1] = React.useState('branch_transfer');

 
  function action_handleChange(event,select_action_1,start1) { 
    
    setselect_action_1(select_action_1); /*props.customer_category(sender_phone_5); */ 

 
  if(select_action_1=="branch_transfer"){
    setdeli(5)
    setdeli_val({value: 5, label: 'In Transit'})
    setdefault_title("Signature *")
  } 

 else if(select_action_1=="send_to_deliveryman"){
    setdeli(12)
    setdeli_val({value: 12, label: 'Out for Delivery'})
    setdefault_title("Delivery Area *")
    
  } else{
    setdefault_title("Remarks ")
  }



  if(select_action_1=="deliverd_to_recipient"){
    setdeli(6)
    setdeli_val({value: 6, label: 'Delivered'})
  } 
  if(select_action_1=="return_process"){
    setdeli(7)
    setdeli_val({value: 7, label: 'Return in process'})
  } 
  if(select_action_1=="return_completed"){
    setdeli(8)
    setdeli_val({value: 8, label: 'Return Received'})
  } 
  if(select_action_1=="update_to_shipped"){
    setdeli(4)
    setdeli_val({value: 4, label: 'Received'})
  } 
  if(select_action_1=="update_to_hold"){
    setdeli(9)
    setdeli_val({value: 9, label: 'Not Received'})
  } 
  if(select_action_1=="others"){
    setdeli(10)
    setdeli_val({value: 10, label: 'Exception'})
  } 
  if(select_action_1=="update_to_pickedup"){
    setdeli(3)
    setdeli_val({value: 3, label: 'Processing'})
  } 
console.log(deli,'deliv');

if(start1==0){
  console.log('deliv1');
}else{
  console.log('deliv2',props.i_tracking_statusList);
}

}  

 
 

const [new_pickup_date_3, setnew_pickup_date_3] = useState(format(new Date(),'yyyy-MM-dd'));
const [new_pickup_date_3_time, setnew_pickup_date_3_time] = useState(format(new Date(),'HH:mm'));

  const [sender_client_id_7, setsender_client_id_7] = useState(null); 
 
  const [sender_client_branch_id_8, setsender_client_branch_id_8] = useState(null); 

  const [deli, setdeli] = useState(5); 

   const [default_title, setdefault_title] = useState('Signature *'); 
 
  const [i_sms_templateList_sender_filtered, seti_sms_templateList_sender_filtered] = useState([]); 
 
 
 
   //sms notification
  
  const [healper_corporate_sender_selected, sethealper_corporate_sender_selected] = useState(null); 
  useEffect(() => {
    sms_sending_option_refresh(healper_corporate_sender_selected)
  },[props.i_product_type_id])
  
  useEffect(() => {
    console.log(props.i_tracking_statusList,'props.i_tracking_statusList')
    console.log(deli,'delideli')

    var filter3 = filterItems2(props.i_tracking_statusList, 'i_delivery_status_id', deli.toString());
    seti_tracking_status_filtered(filter3) 
    console.log(filter3,'filter3')
  },[deli,props.i_tracking_statusList,start1])
  
  function sms_sending_option_refresh(value){


  /*  try {
    const i_sms_template_id=value.i_sms_template_id;  //4,3,2,1
    seti_sms_template_id_30(i_sms_template_id);
    console.log(props.i_sms_templateList);
    var filter = filterItems_mul(props.i_sms_templateList, 'value', i_sms_template_id);
    seti_sms_templateList_sender_filtered(filter); 
 

      //sms notification
      if(value.services_provider_id.includes(34) && value.i_product_type_id.includes(props.i_product_type_id.value)){setswitch_sms_provider(1)}else{
      setswitch_sms_provider(0)  } 
      
      if(value.services_provider_id.includes(33)){setis_track_by_rec(1)}else{
        setis_track_by_rec(0)  } 


    }
    catch(err) {
      setswitch_sms_provider(0) 
    }*/
  }
  //const {format} = require('date-fns');


  /* useEffect(() => {
   setSecondPage(previousState => {  return { ...previousState, sender_client_branch_id_8: null }  }); 
    setSecondPage(previousState => {  return { ...previousState, sender_client_id_7:null  }  }); 
    setSecondPage(previousState => {  return { ...previousState, recipient_client_id_22: null   }  }); 
    setSecondPage(previousState => {  return { ...previousState, recipient_client_branch_id_23: null }  }); 
    setdelivery_options(previousState => {  return { ...previousState, i_packaging_type_id_16: null }  }); 
    setsender_client_id_7(null)
    setsender_client_branch_id_8(null)
    setrecipient_client_id_22(null)
    setrecipient_client_branch_id_23(null)
    seti_packaging_type_id_16(null)
    setis_track_by_rec(0) 
  }, [props.services_clientsList]); 



  useEffect(() => {
    setSecondPage(previousState => {  return { ...previousState, sender_client_branch_id_8: null }  }); 
    setSecondPage(previousState => {  return { ...previousState, sender_client_id_7:null  }  }); 
    setSecondPage(previousState => {  return { ...previousState, recipient_client_id_22: null   }  }); 
    setSecondPage(previousState => {  return { ...previousState, recipient_client_branch_id_23: null }  }); 

    setsender_client_id_7(null)
    setsender_client_branch_id_8(null)
    setrecipient_client_id_22(null)
    setrecipient_client_branch_id_23(null)

    setState({ ...state, 
      sender_phone_5:null, sender_name_6:null,sender_address_9:null,recipient_phone_20:null,recipient_name_21:null,recipient_address_24:null,
    });

    set_i_sms_template_id_30('')
    seti_sms_templateList_sender_filtered([])
    setswitch_sms_provider(0)
    
  }, [props.switch_data_submitted]);*/


/*--------------------------------------------End sender------------------------------------------------------------------- 

#Register Variables:
 
      select_action_1         recipient_category_14
      pickup_type_2             delivery_type_15
      status_date
      sender_ref_no_4

      sender_phone_5
      sender_name_6

      sender_client_id_7
      sender_address_9
      sender_country_id_10
      sender_division_id_11
      sender_district_id_12
      sender_upazila_id_13
 
 --------------------------------------------Start recipient---------------------------------------------------------------*/
 const [recipient_branch_id_29, setrecipient_branch_id_29] = useState(user.branch_id); 
  const [source_branch, setsource_branch] = useState(null); 
 const [delivery_boy_id, setdelivery_boy_id_id] = useState(null); 
 const [i_return_cause_id, seti_return_cause_id] = useState(null); 
 const [i_relation_id, seti_relation_id] = useState(null); 


  const [recipient_category_14, setrecipient_category_14] = React.useState("general_recipient");
  function receiver_handleChange(event,recipient_category_14) { setrecipient_category_14(recipient_category_14); } 

  const [show_otp, setshow_otp] = useState(0); 


  const branchList_recipient = { options: props.branchList, getOptionLabel: (option) => option.label,}; 
  const i_relationList = { options: props.i_relationList, getOptionLabel: (option) => option.label,}; 
  const delivery_boyList = { options: props.delivery_boyList, getOptionLabel: (option) => option.label+' ('+option.employee_id+' - '+option.value+')',}; 
  const i_return_causeList = { options: props.i_return_causeList, getOptionLabel: (option) => option.label,}; 

  const i_delivery_statusProps = { options: props.i_delivery_statusList, getOptionLabel: (option) => option.label,};


 
const [i_tracking_status_filtered, seti_tracking_status_filtered] = useState(props.i_tracking_statusList);


  const i_tracking_statusProps = { options: i_tracking_status_filtered, getOptionLabel: (option) => option.label,};

 

  const date_ = new Date(); let day_ = date_.getDate(); let month_ = date_.getMonth() + 1;  let year_ = date_.getFullYear().toString().slice(-2);


  const [new_status_date, setnew_status_date] = useState(format(new Date(),'yyyy-MM-dd HH:mm'));

  const [deli_val, setdeli_val] = useState({value: 5, label: 'In Transit'});

  const [dateTime, setdateTime] = useState(format(new Date(),'yyyy-MM-dd')); 
  const [dateTime_time, setdateTime_time] = useState(format(new Date(),'yyyy-MM-dd HH:mm')); 


  const [state, setState] = useState({status_date:format(new Date(),'yyyy-MM-dd HH:mm'), i_relation_person:null, otp_write:null, sender_phone_5:null,sender_name_6:null,sender_address_9:null,recipient_phone_20:null,recipient_name_21:null,recipient_address_24:null,sender_ref_no_4:null,});
  const {  otp_write,status_date,sender_ref_no_4,i_relation_person, sender_name_6,sender_phone_5,sender_address_9,recipient_name_21,recipient_phone_20,recipient_address_24,} = state;


  const [delivery_options, setdelivery_options] = useState({
    i_packaging_type_id_16: null,
    i_shipment_method_id_17: null,
    i_delivery_status_id_18: null,
    i_tracking_status_id_19: null
  });
  /*--------------------------------------------End recipient----------------------------------------------------------------*/


  const [valuew, setValuew] = React.useState(dayjs('2014-08-18T21:11:54'));

  const handleChangew = (newValue) => {
    setValuew(newValue);
  };



return (
<RadioRoot>




<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>






{/*----------------------------------------------Start sender--------------------------------------------------------------*/}


<Grid item lg={1} md={1}  sm={12} xs={12}> </Grid>
  <Grid item lg={4} md={4}  sm={12} xs={12}>
 {props.status_update_restrict_3}
        <SimpleCard title="Update Status >"  >

              <FormControl component="fieldset" className="formControl">
              <FormLabel component="legend">Select Action</FormLabel>
              <RadioGroup
                value={select_action_1}
                name="gender1"
                className="group"
                aria-label="Gender"
                onChange={action_handleChange}
                tabIndex= {-1} 
              >
              <FormControlLabel     value="search_data" control={<Radio />} label="Search" />
              <FormControlLabel  disabled={props.status_update_restrict_3}   value="update_to_pickedup" control={<Radio />} label="Picked up" />
              <FormControlLabel  disabled={props.status_update_restrict_5}   value="branch_transfer" control={<Radio />} label="Branch Transfer" />
              <FormControlLabel  disabled={props.status_update_restrict_5}   value="send_to_deliveryman" control={<Radio />} label="Assign Delivery Man." /> 
              <FormControlLabel  disabled={props.status_update_restrict_6}   value="deliverd_to_recipient" control={<Radio />} label="Delivered to Recipient" />
              <FormControlLabel  disabled={props.status_update_restrict_7}   value="return_process" control={<Radio />} label="Return Process" />
              <FormControlLabel  disabled={props.status_update_restrict_8}   value="return_completed" control={<Radio />} label="Return to Sender" />
              <FormControlLabel  disabled={props.status_update_restrict_4}   value="update_to_shipped" control={<Radio />} label='Update to "Received"' />
              <FormControlLabel  disabled={props.status_update_restrict_9}   value="update_to_hold" control={<Radio />} label='Update to "Not Received"' />
              <FormControlLabel  disabled={props.status_update_restrict_10}  value="others" control={<Radio />} label="Exception" /> 


              </RadioGroup>
              </FormControl> 

              <p></p>

              
             {/* <LocalizationProvider dateAdapter={AdapterDateFns}> <DatePicker value={status_date} onChange={handleDateChange} renderInput={(props) => ( <TextField {...props} label="Pickup Date" id="mui-pickers-date" sx={{ mb: 2, width: "100%" }} /> )} /> </LocalizationProvider>
*/}




        </SimpleCard>


  </Grid>


 


{/*--------------------------------------------Start recipient---------------------------------------------------------------*/}
<Grid item lg={3} md={3}  sm={12} xs={12}>
 
<p>Current Branch</p>
<Autocomplete {...branchList_recipient}  
    onChange={(event, value)=>{
        if(value!=null){ 
          setsource_branch(value.value) 
        }else{
          setsource_branch(null)
         }
        }
    }     autoComplete='off'  id="source" SelectClient renderInput={(params) => ( <TextField {...params} label="Select Current Branch*" variant="standard" /> )} />       



        



{ (select_action_1 == 'branch_transfer' ||  select_action_1 =='return_process' )  && 
<>
 <p>Destination </p>
    <Autocomplete {...branchList_recipient}  
    onChange={(event, value)=>{
        if(value!=null){ 
            setrecipient_branch_id_29(value.value) 
        }else{ }
        }
    }     autoComplete='off' id="recipient_branch_id" SelectClient renderInput={(params) => ( <TextField {...params} label="Select Branch*" variant="standard" /> )} />        

</>
}



{ (select_action_1 == 'send_to_deliveryman')  &&
    <Autocomplete {...delivery_boyList}  
    onChange={(event, value)=>{
        if(value!=null){ 
            setdelivery_boy_id_id(value.value) 
        }else{ }
        }
    }     autoComplete='off' id="deli" SelectClient renderInput={(params) => ( <TextField {...params} label="Select Delivery Boy*" variant="standard" /> )} />        
}



{ select_action_1 == 'deliverd_to_recipient' &&
<div>
  <p><br></br><i>Delivered to Recipien</i></p>

  <Autocomplete {...i_relationList}  
  onChange={(event, value)=>{
      if(value!=null){ 
          seti_relation_id(value.value) 
      }else{ }
      }
  }     autoComplete='off' id="deli" SelectClient renderInput={(params) => ( <TextField {...params} label="Select Relation*" variant="standard" /> )} /> 

<TextField type="text" inputProps={ { readOnly: false, tabIndex: "3000"} } name="i_relation_person" id="standard-basicxx" value={i_relation_person || ""} onChange={handleChange} label="Relation Person Name" />

</div>                                            
 
}  

 

{ select_action_1 == 'others'  &&
<div>
  <p><br></br><i>Others</i></p>

  <Autocomplete {...i_return_causeList}  
  onChange={(event, value)=>{
      if(value!=null){ 
          seti_return_cause_id(value.value) 
      }else{ }

      }
  }     autoComplete='off' id="deli" SelectClient renderInput={(params) => ( <TextField {...params} label="Select Exception Cause" variant="standard" /> )} />  

</div> 
}


{ select_action_1 == 'return_completed'  &&
  <p><br></br><i>Return to Sender</i></p>
}
{ select_action_1 == 'update_to_shipped'  &&
  <p><br></br><i>Received</i></p>
}
{ select_action_1 == 'update_to_hold'  &&
  <p><br></br><i>Not Received</i></p>
}
{ select_action_1 == 'update_to_pickedup'  &&
  <p><br></br><i>Picked up</i></p>
}
<br></br>
<LocalizationProvider dateAdapter={AdapterDateFns}>
  
      <DatePicker
        disableFuture
        value={dateTime}
        onChange={handleDateChange} 
       
        mask="____-__-__"
        inputFormat="yyyy-MM-dd" 
        label="Update Date"
        renderInput={(params) => <TextField   tabIndex= {-1}   {...params} />}
    />
 

</LocalizationProvider>


<br></br>
<LocalizationProvider dateAdapter={AdapterDateFns}>
  
      <TimePicker
        disableFuture
        value={dateTime_time}
        onChange={handleDateChange_time} 
       
        mask="____-__-__"
        inputFormat="HH:mm" 
        label="Update Time"
        renderInput={(params) => <TextField   tabIndex= {-1}   {...params} />}
    />
 

</LocalizationProvider>


 
<TextField type="text" inputProps={ { readOnly: false, } } name="sender_ref_no_4" id="standard-basic" value={sender_ref_no_4 || ""} onChange={handleChange} label={default_title} />
 



</Grid>


<Grid item lg={3} md={3}  sm={12} xs={12}>
        <SimpleCard title="Status >"  >
 
             <br></br>

   
            <Autocomplete {...i_delivery_statusProps}  
           readOnly  value={deli_val}                 
                        onChange={(event, value)=>{
                          console.log(value);
                          if(value!=null){ 
                            setdelivery_options(previousState => {
                              return { ...previousState, i_delivery_status_id_18: value.value }
                            });
                          }
                          }
                        }
            id="i_delivery_status_id"   SelectPodType renderInput={(params) => ( <TextField {...params} label="Select Delivery Status*" variant="standard" /> )} />  

{ select_action_1 != 'search_data' &&
            <Autocomplete {...i_tracking_statusProps} 
                        onChange={(event, value)=>{
                          if(value!=null){ 
                            setdelivery_options(previousState => {
                              return { ...previousState, i_tracking_status_id_19: value.value }
                            });
                          }
                          }
                        }
            id="i_tracking_status_id"   SelectTracking renderInput={(params) => ( <TextField {...params} label="Select Tracking Status*" variant="standard" /> )} />

                      }



        </SimpleCard>
  </Grid>  
  <Grid item lg={1} md={1}  sm={12} xs={12}> </Grid> 
 
</Grid>
 






</RadioRoot>
);

} );

export default React.memo(UpdateStatus);