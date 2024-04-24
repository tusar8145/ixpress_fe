import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";  
import { Autocomplete, Checkbox, Grid } from "@mui/material";
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
 
axios.defaults.headers.common['accessToken'] =  'JWT '+window.localStorage.getItem('accessToken');

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const RadioRoot = styled("div")(({ theme }) => ({ display: "flex", "& .formControl": { marginRight: theme.spacing(3), marginLeft: theme.spacing(3), }, "& .group": { margin: theme.spacing(1, 0) },}));
const TextField = styled(TextValidator)(() => ({ width: "100%", marginBottom: "16px", }));
const filterItems = (arr, field, value) => { try { if (field != null) { return arr.filter((item) => { return item[field]==value }) } } catch (error) { console.error(error);}}
const filterItems_mul = (arr, field, value) => { try { if (field != null) { return arr.filter((item) => {  return value.includes(item[field])  }) } } catch (error) { console.error(error);}}

 
const SenderRecipient=forwardRef((props,_ref)=> 
{

  const { logout, user } = useAuth();
  
  const handleChange = (event) => { event.persist(); setState({ ...state, [event.target.name]: event.target.value });


   const name_=null;
   const address =null;

if((event.target.name=="sender_phone_5" || event.target.name=="recipient_phone_20")  && event.target.value.length>10 ){
  console.log('call rrr');
  const master_submit1={
    phone:event.target.value
  } 
  
                const res =  axios.post(base_url+"get_general_customer",master_submit1).then((response) => {

                  

                  if(response.data.general_customer[0].sender_name_6!=null){
                    console.log('found in sender',event.target.name);
                     if(event.target.name=="sender_phone_5"){
                                              setState({ ...state, 
                          sender_name_6:response.data.general_customer[0].sender_name_6, 
                          sender_address_9:response.data.general_customer[0].sender_address_9, 
                          sender_phone_5:event.target.value,
                        });
                     }else{
                      setState({ ...state, 
                        recipient_name_21:response.data.general_customer[0].sender_name_6, 
                        recipient_address_24:response.data.general_customer[0].sender_address_9, 
                        recipient_phone_20:event.target.value,
                      });
                     }

                               
                  }else{
                    console.log('found in rec',event.target.name);

                    if(event.target.name=="recipient_phone_20"){
                      setState({ ...state, 
                        recipient_name_21:response.data.general_customer[0].recipient_name_21, 
                        recipient_address_24:response.data.general_customer[0].recipient_address_24, 
                        recipient_phone_20:event.target.value,
                      });
                    }else{
                      setState({ ...state, 
                        sender_name_6:response.data.general_customer[0].recipient_name_21, 
                        sender_address_9:response.data.general_customer[0].recipient_address_24, 
                        sender_phone_5:event.target.value,
                      });
                    }
                   
                  }


                  //console.log(response.data.general_customer[0].sender_name_6,'general_customer'); 


  
                }).catch(function(error) {  if (error.response) { console.log(error.response.data,'error'); 
              
               // error=1;
              
              } }); 
              
              

}


};


  const handleDateChange = (pickup_date_3) => {
    const new_date=format(pickup_date_3, 'yyyy-MM-dd');

    setState({ ...state,  pickup_date_3 })

    setnew_pickup_date_3(new_date)
    
};

    
  useImperativeHandle(_ref, () => ({  
   getSenderRecipient: () => { 
    //const new_date=pickup_date_3.toString().substring(0, 10);
     
var d_s=delivery_options.i_delivery_status_id_18
var t_s=delivery_options.i_tracking_status_id_19

   // if(user.is_marchant==1){
      d_s=2
      t_s=15
 //}


        const jason = {
          sender_category_1:sender_category_1,
          pickup_type_2:pickup_type_2,
          pickup_date_3:new_pickup_date_3,
          sender_phone_5:sender_phone_5,
          sender_name_6:sender_name_6,
          sender_client_id_7:secondPage.sender_client_id_7,
          sender_client_branch_id_8:secondPage.sender_client_branch_id_8,
          sender_address_9:sender_address_9,
          sender_country_id_10:sender_country_id_10,
          sender_division_id_11:sender_division_id_11,
          sender_district_id_12:sender_district_id_12,
          sender_upazila_id_13:sender_upazila_id_13,
          recipient_category_14:recipient_category_14,
          delivery_type_15:delivery_type_15,
          i_packaging_type_id_16:delivery_options.i_packaging_type_id_16,
          i_shipment_method_id_17:delivery_options.i_shipment_method_id_17,
          i_delivery_status_id_18:d_s,
          i_tracking_status_id_19:t_s,
          recipient_client_id_22:secondPage.recipient_client_id_22,
          recipient_client_branch_id_23:secondPage.recipient_client_branch_id_23,
          recipient_country_id_25:recipient_country_id_25,
          recipient_division_id_26:recipient_division_id_26,
          recipient_district_id_27:recipient_district_id_27,
          recipient_upazila_id_28:recipient_upazila_id_28,
          recipient_branch_id_29:recipient_branch_id_29,
          i_sms_template_id_30:i_sms_template_id_30,
          is_track_by_rec:is_track_by_rec,
        }
       // console.log(jason); 
    return jason;
}, 
getSenderRecipient_excel: () => { 
  const jason = {
    sender_ref_no_4:sender_ref_no_4,
    recipient_phone_20:recipient_phone_20,
    recipient_name_21:recipient_name_21,
    recipient_address_24:recipient_address_24,
  }
 // console.log(jason); 
return jason;
}, 

}));

function set_i_sms_template_id_30(value) { var _i_sms_template_id_30=''; for (var i = 0; i < value.length; i++) { _i_sms_template_id_30=_i_sms_template_id_30+','+value[i].value; } seti_sms_template_id_30(_i_sms_template_id_30.substring(1));}
 

 
const [secondPage, setSecondPage] = useState({
  sender_client_branch_id_8: null,
  sender_client_id_7:null,
  recipient_client_id_22:null,
  recipient_client_branch_id_23:null
});


/*----------------------------------------------Start sender--------------------------------------------------------------*/

  const services_clientsProps_sender = { options: props.services_clientsList, getOptionLabel: (option) => option.label,};

  const [services_clients_branchList_sender_filtered, setservices_clients_branchList_sender_filtered] = useState([]); 
  const services_clients_branchList_sender = { options: services_clients_branchList_sender_filtered, getOptionLabel: (option) => option.label,};

  const [sender_category_1, setsender_category_1] = React.useState(props.sender_category_1);

 
  function sender_handleChange(event,sender_category_1) { setsender_category_1(sender_category_1); /*props.customer_category(sender_phone_5); */ 
 
  if(sender_category_1=="general_sender"){
      var filter = filterItems(props.i_sms_templateList, 'have_general_sender', 1);
      seti_sms_templateList_sender_filtered(filter);
       

      setis_track_by_rec(general_customer_track_web)

      //seti_sms_template_id_30(filter);
      var _i_sms_template_id_30=''; 
      for (var i = 0; i < filter.length; i++) { _i_sms_template_id_30=_i_sms_template_id_30+','+filter[i].value; } seti_sms_template_id_30(_i_sms_template_id_30.substring(1));
      setswitch_sms_provider(1);
  }else{
    setis_track_by_rec(0)
    seti_sms_templateList_sender_filtered(null);
    setswitch_sms_provider(0);
  }

} 

 


  //pickup
  const [general_customer_track_web, setgeneral_customer_track_web] = React.useState(0);
  const [pickup_type_2, setpickup_type_2] = React.useState("branch_pickup");
  function pickup_handleChange(event,pickup_type_2) { setpickup_type_2(pickup_type_2); } 


  //address
  const zone_countriesList_sender = { options: props.zone_countriesList, getOptionLabel: (option) => option.label,};
  const [zone_divisionsList_sender_filtered, setZone_divisionsList_sender_filtered] = useState([]); 
  const zone_divisionsList_sender = { options: zone_divisionsList_sender_filtered, getOptionLabel: (option) => option.label,};
  const [zone_districtsList_sender_filtered, setZone_districtsList_sender_filtered] = useState([]); 
  const zone_districtsList_sender = { options: zone_districtsList_sender_filtered, getOptionLabel: (option) => option.label,};
  const [zone_upazilasList_sender_filtered, setZone_upazilasList_sender_filtered] = useState([]); 
  const zone_upazilasList_sender = { options: zone_upazilasList_sender_filtered, getOptionLabel: (option) => option.label,};



  const [sender_client_id_7, setsender_client_id_7] = useState(null); 
  const [is_track_by_rec, setis_track_by_rec] = useState(null); 

  const [sender_client_branch_id_8, setsender_client_branch_id_8] = useState(null); 
  const [sender_country_id_10, setsender_country_id_10] = useState(null);
  const [sender_division_id_11, setsender_division_id_11] = useState(null);
  const [sender_district_id_12, setsender_district_id_12] = useState(null);
  const [sender_upazila_id_13, setsender_upazila_id_13] = useState(null);

  const [i_sms_template_id_30, seti_sms_template_id_30] = useState(null);

 
  const [i_sms_templateList_sender_filtered, seti_sms_templateList_sender_filtered] = useState([]); 
  const i_sms_templateList_sender = { options: i_sms_templateList_sender_filtered, getOptionLabel: (option) => option.label,};

  const [switch_sms_provider, setswitch_sms_provider] = useState([]);

 
  const [sms_template_list, setsms_template_list] = useState('');
  //sms notification
  
  const [healper_corporate_sender_selected, sethealper_corporate_sender_selected] = useState(null); 
  useEffect(() => {
    sms_sending_option_refresh(healper_corporate_sender_selected)
  },[props.i_product_type_id])
  

  function sms_sending_option_refresh(value){
    console.log('value call = ',value);

    try {
    const i_sms_template_id=value.i_sms_template_id;  //4,3,2,1
    seti_sms_template_id_30(i_sms_template_id);
    console.log(props.i_sms_templateList);
    var filter = filterItems_mul(props.i_sms_templateList, 'value', i_sms_template_id);
    seti_sms_templateList_sender_filtered(filter); 
 

      //sms notification
      if(value.services_provider_id.includes(34) && value.i_product_type_id.includes(props.i_product_type_id.value)){setswitch_sms_provider(1)  
      console.log('allow sms for this product')
      
      }else{
        seti_sms_template_id_30(null);
        console.log('Not allow sms for this product')
        setswitch_sms_provider(0)  } 
      
      if(value.services_provider_id.includes(33)){setis_track_by_rec(1)}else{
        setis_track_by_rec(0)  } 


    }
    catch(err) {
      setswitch_sms_provider(0) 
    }
  }
  const {format} = require('date-fns');


  useEffect(() => {
    setSecondPage(previousState => {  return { ...previousState, sender_client_branch_id_8: null }  }); 
    setSecondPage(previousState => {  return { ...previousState, sender_client_id_7:null  }  }); 
    setSecondPage(previousState => {  return { ...previousState, recipient_client_id_22: null   }  }); 
    setSecondPage(previousState => {  return { ...previousState, recipient_client_branch_id_23: null }  }); 
    setdelivery_options(previousState => {  return { ...previousState, i_packaging_type_id_16: 3 }  }); 
    setsender_client_id_7(null)
    setsender_client_branch_id_8(null)
    setrecipient_client_id_22(null)
    setrecipient_client_branch_id_23(null)
    seti_packaging_type_id_16(3)
    setis_track_by_rec(0)
  }, [props.services_clientsList]); 

  
  useEffect(() => {
    setgeneral_customer_track_web(props.is_track_web_general)
    console.log('change detected',props.is_track_web_general,'sender_category_1',sender_category_1)

 
//new
    if(sender_category_1=="general_sender"){
      var filter = filterItems(props.i_sms_templateList, 'have_general_sender', 1);
      seti_sms_templateList_sender_filtered(filter);
       

      setis_track_by_rec(props.is_track_web_general)

      //seti_sms_template_id_30(filter);
      var _i_sms_template_id_30=''; 
      for (var i = 0; i < filter.length; i++) { _i_sms_template_id_30=_i_sms_template_id_30+','+filter[i].value; } seti_sms_template_id_30(_i_sms_template_id_30.substring(1));
      setswitch_sms_provider(1);
  }else{
    setis_track_by_rec(0)
    seti_sms_templateList_sender_filtered(null);
    setswitch_sms_provider(0);
  }

  }, [props.services_id]); 






  useEffect(() => {


    if(user.is_marchant!=1){
           setSecondPage(previousState => {  return { ...previousState, sender_client_branch_id_8: null }  });  setsender_client_branch_id_8(null);
           setSecondPage(previousState => {  return { ...previousState, sender_client_id_7:null  }  });  setsender_client_id_7(null)    
           
           set_i_sms_template_id_30('')
            seti_sms_templateList_sender_filtered([])
           setswitch_sms_provider(0)
    }



    setSecondPage(previousState => {  return { ...previousState, recipient_client_id_22: null   }  }); 
    setSecondPage(previousState => {  return { ...previousState, recipient_client_branch_id_23: null }  }); 

   
   
    setrecipient_client_id_22(null)
    setrecipient_client_branch_id_23(null)

    setState({ ...state, 
      sender_phone_5:null, sender_name_6:null,sender_address_9:null,recipient_phone_20:null,recipient_name_21:null,recipient_address_24:null,
    });


    
  }, [props.switch_data_submitted]);


 
  
  useEffect(() => {
  
 console.log('xxx',services_clients_branchList_sender_filtered)
    if(services_clients_branchList_sender_filtered?.length>0){
      setsender_client_branch_id_8(services_clients_branchList_sender_filtered[0])
      setSecondPage(previousState => {  return { ...previousState, sender_client_branch_id_8: services_clients_branchList_sender_filtered[0].value }  }); 
    }else{
      setsender_client_branch_id_8(null)
      setSecondPage(previousState => {  return { ...previousState, sender_client_branch_id_8: null }  }); 
    }
    }, [services_clients_branchList_sender_filtered])


/*--------------------------------------------End sender------------------------------------------------------------------- 

#Register Variables:
 
      sender_category_1         recipient_category_14
      pickup_type_2             delivery_type_15
      pickup_date_3
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
  const services_clientsProps_recipient = { options: props.services_clientsList, getOptionLabel: (option) => option.label,};

  const [services_clients_branchList_recipient_filtered, setservices_clients_branchList_recipient_filtered] = useState([]); 
  const services_clients_branchList_recipient = { options: services_clients_branchList_recipient_filtered, getOptionLabel: (option) => option.label,};

  const [recipient_category_14, setrecipient_category_14] = React.useState("general_recipient");
  function receiver_handleChange(event,recipient_category_14) { setrecipient_category_14(recipient_category_14); } 

  //delivery
  const [delivery_type_15, setdelivery_type_15] = React.useState("home_delivery");
  function delivery_handleChange(event,delivery_type_15) { setdelivery_type_15(delivery_type_15); } 


  //address
  const zone_countriesList_recipient = { options: props.zone_countriesList, getOptionLabel: (option) => option.label,};
  const [zone_divisionsList_recipient_filtered, setZone_divisionsList_recipient_filtered] = useState([]); 
  const zone_divisionsList_recipient = { options: zone_divisionsList_recipient_filtered, getOptionLabel: (option) => option.label,};
  const [zone_districtsList_recipient_filtered, setZone_districtsList_recipient_filtered] = useState([]); 
  const zone_districtsList_recipient = { options: zone_districtsList_recipient_filtered, getOptionLabel: (option) => option.label,};
  const [zone_upazilasList_recipient_filtered, setZone_upazilasList_recipient_filtered] = useState([]); 
  const zone_upazilasList_recipient = { options: zone_upazilasList_recipient_filtered, getOptionLabel: (option) => option.label,};



  const [recipient_client_id_22, setrecipient_client_id_22] = useState(null); 
  const [recipient_client_branch_id_23, setrecipient_client_branch_id_23] = useState(null); 
  const [recipient_country_id_25, setrecipient_country_id_25] = useState(null);
  const [recipient_division_id_26, setrecipient_division_id_26] = useState(null);
  const [recipient_district_id_27, setrecipient_district_id_27] = useState(null);
  const [recipient_upazila_id_28, setrecipient_upazila_id_28] = useState(null);
  const [recipient_branch_id_29, setrecipient_branch_id_29] = useState(null); 

  const branchList_recipient = { options: props.branchList, getOptionLabel: (option) => option.label,}; 


  const i_packaging_typeProps = { options: props.i_packaging_typeList, getOptionLabel: (option) => option.value+'. '+ option.label ,};
  const i_shipment_methodProps = { options: props.i_shipment_methodList, getOptionLabel: (option) => option.label,};
  const i_delivery_statusProps = { options: props.i_delivery_statusList, getOptionLabel: (option) => option.label,};
  const i_tracking_statusProps = { options: props.i_tracking_statusList, getOptionLabel: (option) => option.label,};

 
  const [new_pickup_date_3, setnew_pickup_date_3] = useState(format(new Date(),'yyyy-MM-dd'));
  const date_ = new Date(); let day_ = date_.getDate(); let month_ = date_.getMonth() + 1;  let year_ = date_.getFullYear().toString().slice(-2);

  const [state, setState] = useState({pickup_date_3:format(new Date(),'yyyy-MM-dd'), sender_phone_5:null,sender_name_6:null,sender_address_9:null,recipient_phone_20:null,recipient_name_21:null,recipient_address_24:null,sender_ref_no_4:year_+month_+day_,});
  const {  pickup_date_3,sender_ref_no_4,sender_name_6,sender_phone_5,sender_address_9,recipient_name_21,recipient_phone_20,recipient_address_24,} = state;

  //for marchant



  const [delivery_options, setdelivery_options] = useState({
    i_packaging_type_id_16: 3,
    i_shipment_method_id_17: 3,
    i_delivery_status_id_18:3, 
    i_tracking_status_id_19:1,
  });
 

  if(user.is_marchant==1){
       //setdelivery_options(previousState => {  return { ...previousState, i_delivery_status_id_18: 2 }  });
      // setdelivery_options(previousState => {  return { ...previousState, i_tracking_status_id_19: 15 }  });
  }

  const [i_packaging_type_id_16, seti_packaging_type_id_16] = useState(3);


  /*--------------------------------------------End recipient----------------------------------------------------------------*/








return (
<RadioRoot>
 
<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>


{/*----------------------------------------------Start sender--------------------------------------------------------------*/}

  <Grid item lg={3} md={3}  sm={12} xs={12}>

        <SimpleCard title=""  >
 
              <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
           
          value={pickup_date_3}
          onChange={handleDateChange} 

  


          mask="____-__-__"
        inputFormat="yyyy-MM-dd"
        label="Booking Date"
        renderInput={(params) => <TextField {...params} />}
    />
</LocalizationProvider>
              { props.switch_xlsx_active == 0 &&
              <TextField type="text" inputProps={ { readOnly: false, } } name="sender_ref_no_4" id="standard-basic" value={""} onChange={handleChange}errorMessages={["This field is required"]} label="Reference No: (Optional) "   />
              }

              {switch_sms_provider == 1 &&
              <Autocomplete  defaultValue={[
                  i_sms_templateList_sender_filtered[0]?i_sms_templateList_sender_filtered[0]:'',i_sms_templateList_sender_filtered[1]?i_sms_templateList_sender_filtered[1]:'',i_sms_templateList_sender_filtered[2]?i_sms_templateList_sender_filtered[2]:'',i_sms_templateList_sender_filtered[3]?i_sms_templateList_sender_filtered[3]:''
               
              ]}  onChange={(event, value) => {
                set_i_sms_template_id_30(value) 
                console.log(value); 
              }

              }  multiple id="i_sms_template_id_30" {...i_sms_templateList_sender} disableCloseOnSelect renderOption={(props, option, { selected }) => ( <li {...props}> <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} /> {option.label} </li> )} style={{ width: '100%', marginTop: 20 }} renderInput={(params) => ( <TextField {...params} label="SMS sending options" placeholder="Multi Select" /> )} />
              }


              {is_track_by_rec == 1 &&
              <p  style={{ color: 'blue' }}>➊ Track from web is Active</p>
              }


        </SimpleCard>


  </Grid>


  <Grid item lg={3} md={3}  sm={12} xs={12}>
        <p>Sender Info [Required*]</p>
        {sender_category_1 == 'general_sender' &&
          <div>
            
            <TextField type="text" autoComplete='off' name="sender_phone_5" id="standard-basic" value={sender_phone_5 || ""} onChange={handleChange}errorMessages={["This field is required"]} label="Phone:  " validators={["required"]}/>
            <TextField type="text" autoComplete='off' name="sender_name_6" id="standard-basic" value={sender_name_6 || ""} onChange={handleChange}errorMessages={["This field is required"]} label="Name:  " validators={["required"]}/>
          
          
            <p>Home Address{sender_country_id_10}</p>
              <TextField type="text" autoComplete='off' name="sender_address_9" id="standard-basic" value={sender_address_9 || ""} onChange={handleChange}errorMessages={["This field is required"]} label="Address:*  "validators={[ "required" ]}/>

              {/*country*/}
                            <Autocomplete {...zone_countriesList_sender}  
                              onChange={(event, value)=>{
                                if(value!=null){ 
                                  setsender_country_id_10(value.value) 
                                  setsender_division_id_11(null) 
                                  setsender_district_id_12(null) 
                                  setsender_upazila_id_13(null) 


                                  var filter = filterItems(props.zone_divisionsList, 'zone_countries_id', value.value);
                                  setZone_divisionsList_sender_filtered(filter); 
                                  setZone_districtsList_sender_filtered([]);
                                  setZone_upazilasList_sender_filtered([]);
              
                                }else{
                                  //setZone_divisionsList_sender_filtered([]);
                                }
              
                            
                                }
                              }     autoComplete='off' id="services_clients_id_sender" SelectClient renderInput={(params) => ( <TextField {...params} label="Select Country" variant="standard" /> )} />      
                            
              {/*division*/}
                            <Autocomplete {...zone_divisionsList_sender}  
                              
                              onChange={(event, value)=>{
                                if(value!=null){ 
                                  setsender_division_id_11(value.value)
                                  setsender_district_id_12(null) 
                                  setsender_upazila_id_13(null) 

                                  var filter = filterItems(props.zone_districtsList, 'zone_divisions_id', value.value);
                                  setZone_districtsList_sender_filtered(filter); 
                                  setZone_upazilasList_sender_filtered([]);
                                }
                                }
                              } 
                                
                              autoComplete='off' id="sender_division_id_11" SelectClient renderInput={(params) => ( <TextField {...params} label="Select Division" variant="standard" /> )} />      


              {/*district*/}               
                            <Autocomplete {...zone_districtsList_sender}  
                              onChange={(event, value)=>{
                                if(value!=null){ 
                                setsender_district_id_12(value.value)
                                setsender_upazila_id_13(null)

                                var filter = filterItems(props.zone_upazilasList, 'zone_districts_id', value.value);
                                setZone_upazilasList_sender_filtered(filter); 
                                }
                                }
                              }    autoComplete='off' id="services_clients_id_sender" SelectClient renderInput={(params) => ( <TextField {...params} label="Select City" variant="standard" /> )} />      


              {/*upazila*/}
                              <Autocomplete {...zone_upazilasList_sender}  
                              onChange={(event, value)=>{
                                if(value!=null){ 
                                  setsender_upazila_id_13(value.value)
                                }
                                }
                              }    autoComplete='off' id="services_clients_id_sender" SelectClient renderInput={(params) => ( <TextField {...params} label="Select Upazila" variant="standard" /> )} />      

          
          
          
          
          
          </div>
        }

        { sender_category_1 == 'corporate_sender' &&
          <div>
             <Autocomplete {...services_clientsProps_sender} disableClearable
             value={sender_client_id_7}                
                onChange={(event, value)=>{
                  if(value!=null){ 

                    setSecondPage(previousState => {  return { ...previousState, sender_client_id_7: value.value }  }); 


                    setsender_client_id_7(value) 
                    sethealper_corporate_sender_selected(value) 
                    var filter = filterItems(props.services_clients_branchList, 'services_clients_id', value.value);
                    setservices_clients_branchList_sender_filtered(filter); 
                   // setsender_client_branch_id_8(null);
                    sms_sending_option_refresh(value);
                    console.log(services_clients_branchList_sender_filtered,'mmm');
                  }else{
                    setsender_client_id_7(null) 
                    sethealper_corporate_sender_selected(null) 
                    sms_sending_option_refresh(null);
                  } 
                  


         
                  
                  } } id="services_clients_id_sender" SelectClient renderInput={(params) => ( <TextField {...params} label="Select Client" variant="standard" /> )} /> 
              { (sender_client_id_7 == null && props.show_error==1) && <div> <p style={{color: "red", marginTop:"-10px"}}>This field is required</p>  </div> }

 

              <Autocomplete {...services_clients_branchList_sender}  disableClearable
              value={sender_client_branch_id_8}                
                onChange={(event, value)=>{
                  setSecondPage(previousState => {  return { ...previousState, sender_client_branch_id_8: value.value }  }); 
                  console.log(value);
                  if(value!=null){ 
                    setsender_client_branch_id_8(value)
                  } } } id="services_clients_branch_id_sender" SelectClient renderInput={(params) => ( <TextField {...params} label="Select Client Branch" variant="standard" /> )} />   
          { (sender_client_branch_id_8 == null && props.show_error==1) && <div> <p style={{color: "red", marginTop:"-10px"}}>This field is required</p>  </div> }

          </div>
        }

 

  </Grid>


{/*--------------------------------------------Start recipient---------------------------------------------------------------*/}

<Grid item lg={3} md={3}  sm={12} xs={12} style={{"display":"none"}} >
        <SimpleCard title="Recipient >">
            <FormControl component="fieldset" className="formControl">
            <FormLabel component="legend">Select Recipient Category</FormLabel>
            <RadioGroup
              value={recipient_category_14}
              name="gender2"
              className="group"
              aria-label="Gender"
              onChange={receiver_handleChange}
            >
              <FormControlLabel value="general_recipient" control={<Radio />} label="General Customer" />
              <FormControlLabel value="corporate_recipient" control={<Radio />} label="Corporate Client" /> 
            </RadioGroup>
            </FormControl>   
            
            <p></p>

            <FormControl component="fieldset" className="formControl">
            <FormLabel component="legend">Select Delivery Type</FormLabel>
            <RadioGroup
              value={delivery_type_15}
              name="gender1"
              className="group"
              aria-label="Gender"
              onChange={delivery_handleChange}
            >
            <FormControlLabel value="home_delivery" control={<Radio />} label="Home Delivery" />
            <FormControlLabel value="branch_delivery" control={<Radio />} label="Branch Delivery" />  
            </RadioGroup>
            </FormControl>

            <br></br> <br></br>

            <Autocomplete {...i_packaging_typeProps} disableClearable
             defaultValue= {{value: 3, label: 'Medium'}}
                        onChange={(event, value)=>{
                          if(value!=null){ 
                            seti_packaging_type_id_16(value)
                            setdelivery_options(previousState => {
                              return { ...previousState, i_packaging_type_id_16: value.value }
                            });

                          }
                          }
                        }
            id="i_packaging_type_id"    SelectPodType renderInput={(params) => ( <TextField {...params} label="Select Packaging Type" variant="standard" /> )} /> 
 { (delivery_options.i_packaging_type_id_16 == null && props.show_error==1) && <div> <p style={{color: "red", marginTop:"-10px"}}>This field is required</p>  </div> }


            <Autocomplete {...i_shipment_methodProps} 
                        defaultValue= {{value: 3, label: 'Regular'}}
                        onChange={(event, value)=>{
                          if(value!=null){ 
                            setdelivery_options(previousState => {
                              return { ...previousState, i_shipment_method_id_17: value.value }
                            });
                          }
                          }
                        }
            id="i_shipment_method_id" readOnly  SelectPodType renderInput={(params) => ( <TextField {...params} label="Select Shipment Method" variant="standard" /> )} />        
            <Autocomplete {...i_delivery_statusProps} 
                        defaultValue= {user.is_marchant ? {value: 2, label: 'Booking'} : {value: 3, label: 'Processing'}}
                        
                        onChange={(event, value)=>{
                          if(value!=null){ 
                            setdelivery_options(previousState => {
                              return { ...previousState, i_delivery_status_id_18: value.value }
                            });
                          }
                          }
                        }
            id="i_delivery_status_id" readOnly  SelectPodType renderInput={(params) => ( <TextField {...params} label="Select Delivery Status" variant="standard" /> )} />  
            <Autocomplete {...i_tracking_statusProps} 
                        defaultValue= {user.is_marchant ? {value: 15, label: 'Order placed'} : {value: 1, label: 'Shipment picked up'}}
                        onChange={(event, value)=>{
                          if(value!=null){ 
                            setdelivery_options(previousState => {
                              return { ...previousState, i_tracking_status_id_19: value.value }
                            });
                          }
                          }
                        }
            id="i_tracking_status_id" readOnly  SelectTracking renderInput={(params) => ( <TextField {...params} label="Select Tracking Status" variant="standard" /> )} />





        </SimpleCard>
  </Grid>  

 
</Grid>
 







</RadioRoot>
);

} );

export default React.memo(SenderRecipient);