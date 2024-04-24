import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
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
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { TextValidator } from "react-material-ui-form-validator";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const RadioRoot = styled("div")(({ theme }) => ({ display: "flex", "& .formControl": { marginRight: theme.spacing(3), marginLeft: theme.spacing(3), }, "& .group": { margin: theme.spacing(1, 0) },}));
const TextField = styled(TextValidator)(() => ({ width: "100%", marginBottom: "16px", }));
const filterItems = (arr, field, value) => { try { if (field != null) { return arr.filter((item) => { return item[field]==value }) } } catch (error) { console.error(error);}}
const filterItems_mul = (arr, field, value) => { try { if (field != null) { return arr.filter((item) => {  return value.includes(item[field])  }) } } catch (error) { console.error(error);}}

 
const SearchUpdate=forwardRef((props,_ref)=> 
{

  const handleChange = (event) => { event.persist(); setState({ ...state, [event.target.name]: event.target.value }); console.log('call'); };
  const handleDateChange = (pickup_date_3) => {

    const new_date=format(pickup_date_3, 'yyyy-MM-dd');

    setState({ ...state,  pickup_date_3 })

    setnew_pickup_date_3(new_date)
    
    //console.log(new_date,'new_date');
    
};

    
  useImperativeHandle(_ref, () => ({  
   getSenderRecipient: () => { 
   // const new_date=pickup_date_3.toString().substring(0, 10);
     
         // pickup_date_3:new_pickup_date_3,
        const jason = {
          sender_category_1:sender_category_1,

          sender_phone_5:sender_phone_5,
          sender_client_id_7:secondPage.sender_client_id_7,
          sender_client_branch_id_8:secondPage.sender_client_branch_id_8,
          recipient_category_14:recipient_category_14,
          delivery_type_15:delivery_type_15,
          i_packaging_type_id_16:delivery_options.i_packaging_type_id_16,
          i_shipment_method_id_17:delivery_options.i_shipment_method_id_17,
          i_delivery_status_id_18:delivery_options.i_delivery_status_id_18,
          i_tracking_status_id_19:delivery_options.i_tracking_status_id_19,
          recipient_client_id_22:secondPage.recipient_client_id_22,
          recipient_client_branch_id_23:secondPage.recipient_client_branch_id_23,
          delivery_boy_id:delivery_boy_id,
        }
       // console.log(jason); 
    return jason;
}, 
getSenderRecipient_excel: () => { 
  const jason = {
    sender_ref_no_4:sender_ref_no_4,
    unique_upload_id:unique_upload_id,
    shipment_ref:shipment_ref,
    recipient_phone_20:recipient_phone_20,
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
  const delivery_boyList = { options: props.delivery_boyList, getOptionLabel: (option) => option.label+' ('+option.employee_id+' - '+option.value+')',}; 
  const [services_clients_branchList_sender_filtered, setservices_clients_branchList_sender_filtered] = useState([]); 
  const services_clients_branchList_sender = { options: services_clients_branchList_sender_filtered, getOptionLabel: (option) => option.label,};

  const [sender_category_1, setsender_category_1] = React.useState(props.sender_category_1);

 
  function sender_handleChange(event,sender_category_1) { setsender_category_1(sender_category_1); /*props.customer_category(sender_phone_5); */ 
 
  if(sender_category_1=="general_sender"){
      var filter = filterItems(props.i_sms_templateList, 'have_general_sender', 1);
      seti_sms_templateList_sender_filtered(filter);
      setswitch_sms_provider(1);
  }else{
    seti_sms_templateList_sender_filtered(null);
    setswitch_sms_provider(0);
  }

} 

 


  //pickup
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
  const [delivery_boy_id, setdelivery_boy_id_id] = useState(null); 
 
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


    try {
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
    }
  }
  const {format} = require('date-fns');


  useEffect(() => {
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


  /*useEffect(() => {
    console.log('value change ',props.i_delivery_status_count)
   setdelivery_options(previousState => {
    return { ...previousState, i_delivery_status_id_18: props.i_delivery_status_count }
  });
  }, [props.i_delivery_status_count]); */







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
    
  }, [props.switch_data_submitted]);


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


  const i_packaging_typeProps = { options: props.i_packaging_typeList, getOptionLabel: (option) => option.label,};
  const i_shipment_methodProps = { options: props.i_shipment_methodList, getOptionLabel: (option) => option.label,};
  const i_delivery_statusProps = { options: props.i_delivery_statusList, getOptionLabel: (option) => option.label,};
  const i_tracking_statusProps = { options: props.i_tracking_statusList, getOptionLabel: (option) => option.label,};

 

  const date_ = new Date(); let day_ = date_.getDate(); let month_ = date_.getMonth() + 1;  let year_ = date_.getFullYear().toString().slice(-2);


  const [new_pickup_date_3, setnew_pickup_date_3] = useState(format(new Date(),'yyyy-MM-dd'));

  const [state, setState] = useState({pickup_date_3:format(new Date(),'yyyy-MM-dd'),unique_upload_id:null, shipment_ref:null, sender_phone_5:null,sender_name_6:null,sender_address_9:null,recipient_phone_20:null,recipient_name_21:null,recipient_address_24:null,sender_ref_no_4:null,});
  const {  pickup_date_3,sender_ref_no_4,unique_upload_id,shipment_ref,sender_name_6,sender_phone_5,sender_address_9,recipient_name_21,recipient_phone_20,recipient_address_24,} = state;


  const [delivery_options, setdelivery_options] = useState({
    i_packaging_type_id_16: null,
    i_shipment_method_id_17: null,
    i_delivery_status_id_18: null,
    i_tracking_status_id_19: null
  });
  const [i_packaging_type_id_16, seti_packaging_type_id_16] = useState(null);


  /*--------------------------------------------End recipient----------------------------------------------------------------*/








return (
<RadioRoot>
 
<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>


{/*----------------------------------------------Start sender--------------------------------------------------------------*/}

  <Grid item lg={3} md={3}  sm={12} xs={12}>

        <SimpleCard title="Sender  >"  >

              <FormControl component="fieldset" className="formControl">
              <FormLabel component="legend">Select Sender Category</FormLabel>
              <RadioGroup
                value={sender_category_1}
                name="gender1"
                className="group"
                aria-label="Gender"
                onChange={sender_handleChange}
              >
              <FormControlLabel value="general_sender" control={<Radio />} label="General Customer" />
              <FormControlLabel value="corporate_sender" control={<Radio />} label="Corporate Client" />          
              </RadioGroup>
              </FormControl>

              <p></p>

               <br></br> <br></br> <br></br>
             {/* <LocalizationProvider dateAdapter={AdapterDateFns}> <DatePicker value={pickup_date_3} onChange={handleDateChange} renderInput={(props) => ( <TextField {...props} label="Pickup Date" id="mui-pickers-date" sx={{ mb: 2, width: "100%" }} /> )} /> </LocalizationProvider>
*/}

              <LocalizationProvider dateAdapter={AdapterDateFns}>
    {/*
    <DatePicker

          disableFuture
          value={pickup_date_3}
          onChange={handleDateChange} 

  


          mask="____-__-__"
        inputFormat="yyyy-MM-dd"
        label="Pickup Date"
        renderInput={(params) => <TextField {...params} />}
    />
    */}  
</LocalizationProvider>
              { props.switch_xlsx_active == 0 && 
              <>
                            <TextField type="text" inputProps={ { readOnly: false, } } name="sender_ref_no_4" id="standard-basic" value={sender_ref_no_4 || ""} onChange={handleChange} label="Reference No:  " />


              <TextField type="text" inputProps={ { readOnly: false, } } name="unique_upload_id" id="standard-basic" value={unique_upload_id || ""} onChange={handleChange} label="UID:  " />

              <TextField type="text" inputProps={ { readOnly: false, } } name="shipment_ref" id="standard-basic" value={shipment_ref || ""} onChange={handleChange} label="Shipment Signature:  " />
              </>
              }


        </SimpleCard>


  </Grid>


  <Grid item lg={3} md={3}  sm={12} xs={12}>
        <p>Sender Info</p>
        {sender_category_1 == 'general_sender' &&
          <div>
            
            <TextField type="text" autoComplete='off' name="sender_phone_5" id="standard-basic" value={sender_phone_5 || ""} onChange={handleChange}  label="Phone:  "  />     
          
            <p>Home Address{sender_country_id_10}</p>

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

          
          
                          <Autocomplete {...delivery_boyList}  
                              onChange={(event, value)=>{
                                  if(value!=null){ 
                                      setdelivery_boy_id_id(value.value) 
                                  }else{ }
                                  }
                              }     autoComplete='off' id="deli" SelectClient renderInput={(params) => ( <TextField {...params} label="Select Delivery Boy*" variant="standard" /> )} />  
          
          
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
                    setsender_client_branch_id_8(null);
                    sms_sending_option_refresh(value);
                    console.log(services_clients_branchList_sender_filtered,'mmm');
                  }else{
                    setsender_client_id_7(null) 
                    sethealper_corporate_sender_selected(null) 
                    sms_sending_option_refresh(null);
                  } 
                  


         
                  
                  } } id="services_clients_id_sender" SelectClient renderInput={(params) => ( <TextField {...params} label="Select Client" variant="standard" /> )} /> 
        




              <Autocomplete {...services_clients_branchList_sender}  disableClearable
              value={sender_client_branch_id_8}                
                onChange={(event, value)=>{
                  setSecondPage(previousState => {  return { ...previousState, sender_client_branch_id_8: value.value }  }); 
                  console.log(value);
                  if(value!=null){ 
                    setsender_client_branch_id_8(value)
                  } } } id="services_clients_branch_id_sender" SelectClient renderInput={(params) => ( <TextField {...params} label="Select Client Branch" variant="standard" /> )} />   
 

                  </div>
                }

<br></br><br></br><br></br>
<p>Assigned Delivery Boy</p>

<Autocomplete {...delivery_boyList}  
    onChange={(event, value)=>{
        if(value!=null){ 
            setdelivery_boy_id_id(value.value) 
        }else{ 
          setdelivery_boy_id_id(null) 
        }
        }
    }     autoComplete='off' id="deli" SelectClient renderInput={(params) => ( <TextField {...params} label="Select Delivery Boy" variant="standard" /> )} />     

  </Grid>


{/*--------------------------------------------Start recipient---------------------------------------------------------------*/}

<Grid item lg={3} md={3}  sm={12} xs={12}>
        <SimpleCard title="Recipient >"  >
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



             <br></br>

            <Autocomplete {...i_shipment_methodProps} 
                        onChange={(event, value)=>{
                          if(value!=null){ 
                            setdelivery_options(previousState => {
                              return { ...previousState, i_shipment_method_id_17: value.value }
                            });
                          }else{
                            setdelivery_options(previousState => {
                              return { ...previousState, i_shipment_method_id_17: null}
                            });
                          }
                          }
                        }
            id="i_shipment_method_id"   SelectPodType renderInput={(params) => ( <TextField {...params} label="Select Shipment Method" variant="standard" /> )} /> 

            <Autocomplete {...i_delivery_statusProps}                  
                        onChange={(event, value)=>{
                          if(value!=null){ 
                            setdelivery_options(previousState => {
                              return { ...previousState, i_delivery_status_id_18: value.value }
                            });
                          }else{
                            setdelivery_options(previousState => {
                              return { ...previousState, i_delivery_status_id_18: null }
                            });
                          }
                          }
                        }
            id="i_delivery_status_id"   SelectPodType renderInput={(params) => ( <TextField {...params} label="Select Delivery Status" variant="standard" /> )} />  


            <Autocomplete {...i_tracking_statusProps} 
                        onChange={(event, value)=>{
                          if(value!=null){ 
                            setdelivery_options(previousState => {
                              return { ...previousState, i_tracking_status_id_19: value.value }
                            });
                          }else{
                            setdelivery_options(previousState => {
                              return { ...previousState, i_tracking_status_id_19: null }
                            });
                          }
                          }
                        }
            id="i_tracking_status_id"   SelectTracking renderInput={(params) => ( <TextField {...params} label="Select Tracking Status" variant="standard" /> )} />





        </SimpleCard>
  </Grid>  

  { props.switch_xlsx_active == 0 &&
  <Grid item lg={3} md={3}  sm={12} xs={12}>


        <p>Recipient Info</p>
      
         {recipient_category_14 == 'general_recipient' &&
          <div>
            <TextField type="text" autoComplete='off' name="recipient_phone_20" id="standard-basic" value={recipient_phone_20 || ""} onChange={handleChange} label="Phone:  "/> 
          </div>
         }
         {recipient_category_14 == 'corporate_recipient' &&
          <div>
             <Autocomplete {...services_clientsProps_recipient}  disableClearable
             value={recipient_client_id_22}
              onChange={(event, value)=>{
              if(value!=null){ 
                setrecipient_client_branch_id_23(null)
                setSecondPage(previousState => {  return { ...previousState, recipient_client_id_22: value.value }  }); 
                 setrecipient_client_id_22(value)
                 var filter = filterItems(props.services_clients_branchList, 'services_clients_id', value.value);
                 setservices_clients_branchList_recipient_filtered(filter); 
              } } } 

             id="services_clients_id_recipient" SelectClient renderInput={(params) => ( <TextField {...params} label="Select Client" variant="standard" /> )} />      
 

            
             <Autocomplete {...services_clients_branchList_recipient}  disableClearable   
             value={recipient_client_branch_id_23}             
                onChange={(event, value)=>{
                  if(value!=null){ 
                    setSecondPage(previousState => {  return { ...previousState, recipient_client_branch_id_23: value.value }  }); 
                    setrecipient_client_branch_id_23(value)
                  } } } id="services_clients_branch_id_recipient" SelectClient renderInput={(params) => ( <TextField {...params} label="Select Client Branch" variant="standard" /> )} />   
 

          </div>
         } 

        
        
        {delivery_type_15 == 'home_delivery' && recipient_category_14=='general_recipient' &&
          <div> 
              <p>Delivery Address</p>

          {/*country*/}
          <Autocomplete {...zone_countriesList_recipient}  
                onChange={(event, value)=>{
                  if(value!=null){ 
                     setrecipient_country_id_25(value.value) 
                     setrecipient_division_id_26(null) 
                     setrecipient_district_id_27(null) 
                     setrecipient_upazila_id_28(null) 


                     var filter = filterItems(props.zone_divisionsList, 'zone_countries_id', value.value);
                     setZone_divisionsList_recipient_filtered(filter); 
                     setZone_districtsList_recipient_filtered([]);
                     setZone_upazilasList_recipient_filtered([]);
 
                  }else{
                    //setZone_divisionsList_recipient_filtered([]);
                  }
 
              
                  }
                }     autoComplete='off' id="services_clients_id_recipient" SelectClient renderInput={(params) => ( <TextField {...params} label="Select Country" variant="standard" /> )} />      
               
{/*division*/}
               <Autocomplete {...zone_divisionsList_recipient}  
                
                onChange={(event, value)=>{
                  if(value!=null){ 
                    setrecipient_division_id_26(value.value)
                    setrecipient_district_id_27(null) 
                    setrecipient_upazila_id_28(null) 

                    var filter = filterItems(props.zone_districtsList, 'zone_divisions_id', value.value);
                    setZone_districtsList_recipient_filtered(filter); 
                    setZone_upazilasList_recipient_filtered([]);
                  }
                  }
                } 
                  
                autoComplete='off' id="recipient_division_id_26" SelectClient renderInput={(params) => ( <TextField {...params} label="Select Division" variant="standard" /> )} />      


{/*district*/}               
               <Autocomplete {...zone_districtsList_recipient}  
                onChange={(event, value)=>{
                  if(value!=null){ 
                   setrecipient_district_id_27(value.value)
                   setrecipient_upazila_id_28(null)

                   var filter = filterItems(props.zone_upazilasList, 'zone_districts_id', value.value);
                   setZone_upazilasList_recipient_filtered(filter); 
                  }
                  }
                }    autoComplete='off' id="services_clients_id_recipient" SelectClient renderInput={(params) => ( <TextField {...params} label="Select City" variant="standard" /> )} />      


{/*upazila*/}
                <Autocomplete {...zone_upazilasList_recipient}  
                onChange={(event, value)=>{
                  if(value!=null){ 
                    setrecipient_upazila_id_28(value.value)
                  }
                  }
                }    autoComplete='off' id="services_clients_id_recipient" SelectClient renderInput={(params) => ( <TextField {...params} label="Select Upazila" variant="standard" /> )} />      

          </div>
         }
         {delivery_type_15 != 'home_delivery' &&
            <div> 
              <p>Delivery Branch</p>
              <Autocomplete {...branchList_recipient}  
                onChange={(event, value)=>{
                  if(value!=null){ 
                     setrecipient_branch_id_29(value.value) 
                  }else{
                  }
 
              
                  }
                }     autoComplete='off' id="recipient_branch_id" SelectClient renderInput={(params) => ( <TextField {...params} label="Select Branch" variant="standard" /> )} />      
                

            </div>
        }

  </Grid>
}
</Grid>
 







</RadioRoot>
);

} );

export default React.memo(SearchUpdate);