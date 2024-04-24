 
/*Imports---------(1)*/

import { Autocomplete, Button, Fab, Grid, Icon, styled } from "@mui/material";
 
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import MuiAlert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import { Span } from "app/components/Typography";
import useAuth from 'app/hooks/useAuth';
import axios from "axios";
import React, { useEffect, useRef, useState } from 'react';
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import * as XLSX from "xlsx";
import { base_url } from '../../../../utils/constant';
import SenderRecipient from "./SenderRecipient";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const Alert = React.forwardRef(function Alert(props, ref) { return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;});
const TextField = styled(TextValidator)(() => ({ width: "100%", marginBottom: "16px", }));

 

 
 

const AddPodForm = () => {
  const Item = styled(Paper)(({ theme }) => ({ backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff', ...theme.typography.body2, padding: theme.spacing(1), textAlign: 'center', color: theme.palette.text.secondary, }));
  //system variables
  const { logout, user } = useAuth();
  const SenderRecipientRef=useRef();
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


  

  const handlesendsms = () =>{    
    
console.log('ok');
const msg_data=[]
var this_msg = [{
  to :"8801795621796",    
  message : "test" 
}];

 


 
  // POST request using fetch with async/await
  const requestOptions = {
      method: 'POST',
      mode: 'no-cors',
      headers: { 
        "content-type": "application/json"
      },
      body: JSON.stringify(this_msg)
  };
  fetch(process.env.REACT_APP_BULK_SMS_API_URL, requestOptions)
  .then(data =>console.log(data) );

        //  console.log(msg_config);                                    
          
      /*     fetch('http://206.189.159.184/api', { 

            mode: 'no-cors',
            method: 'POST',
 
            body:'ok',
          
          })
       
          .then(data => {
            console.log(data);
            //return data;
          })
          .catch(e => {
            console.log(e);
            //return e;
          }); 

//http://portal.metrotel.com.bd/smsapimany


        /*  fetch("http://206.189.159.184/api", {
            body: msg_config,
          }).then(data => {
            console.log(data);
            //return data;
          }).catch(e => {
            console.log(e);
            //return e;
          });*/



      /*    const headers = {
            'Content-Type': 'application/json',
            'Connection': 'Keep-Alive',
            'Access-Control-Allow-Origin':"*"
        };
        
        const data = {
            name: "John Doe"
        };
        
        axios.post("http://portal.metrotel.com.bd/smsapimany", msg_config,
        
        
        headers
        
        ).then((response) => {
            
          console.log(response); 

        }).catch(function(error) {  if (error.response) {  //console.log(error.response.data); 
        }   });

*/
          
          //res.data.headers['Content-Type'];





     };


  const handleSubmit = (event) => {
    const SenderRecipientMax = SenderRecipientRef.current.getSenderRecipient(); 
    const SenderRecipientMin = SenderRecipientRef.current.getSenderRecipient_excel(); //replace by excel
 
    const firsr_page_json={
     "services_id_1":firstpage.services_id,
     "i_product_type_id_2":firstpage.i_product_type_id,
     "i_priority_id_3":firstpage.i_priority_id,
     "product_info_4":JSON.stringify(product_info_json),
     "overwriting_cost_5":overwriting_cost,
     "total_cost_6":total_cost,
     "collection_amount_7":collection_amount,    
     "i_payment_type_8":firstpage.i_payment_type,
     "creator":user.id,
     "current_branch_id":user.branch_id,
     "created_branch_id":user.branch_id,
 
    }
 
    
    let marge_common = Object.assign(SenderRecipientMax, firsr_page_json)
   
    
 //bulk import
 if(json_upload!=null){   console.log(json_upload,'Ready json');

      const master_submit=[]

                                    var filter = filterItemsequal(i_sms_templateList,'value',2);
                                    var filter2 = filterItemsequal(i_product_typeList_filtered,'value',firsr_page_json.i_product_type_id_2);

                                    var pickup_sms_collection=[]
                                    var allow_sms=0
                                    if(SenderRecipientMax.i_sms_template_id_30.includes(2)){allow_sms=1}

       for (var i = 0; i < json_upload.length; i++){
         var obj = json_upload[i];
           var phn=json_upload[i].phone.toString();
            

          //json validate


           const excel_get={
             sender_ref_no_4:obj['reference'],
             recipient_phone_20:phn, 
             recipient_name_21:obj['name'],
             recipient_address_24:obj['address'],
             customer_no:obj['customer_no'],
            }   


            if(allow_sms==1){
                      var msg_get=filter[0].template.replace('[[PRODUCT]]', filter2[0].label)
                      var msg_get_final=msg_get.replace('[[REF_NO]]', obj['reference'])
                      const msg={
                        to:phn,
                        message:msg_get_final
                      }
                      pickup_sms_collection.push(msg);
            }
            
           

                                        //pickup sms      
                                        



                                          

                                          
                                         
                                          //
                                         /* const url="http://portal.metrotel.com.bd/smsapi?api_key=C200220963982415234249.96775123&type=text&contacts="+phn+"&senderid=8809612444336&msg="+msg_get_final;
                                          axios.post(url).then((response) => { console.log(response); }).catch(function(error) {  if (error.response) {  } }); 
                                          console.log('sms send');*/



                                        


            let z2_excel = Object.assign(marge_common, excel_get)
            master_submit.push(z2_excel);
       }

 
       const res =  axios.post(base_url+"create_shipment_multiple",master_submit).then((response) => {
        console.log('response',response)
        });

       if(pickup_sms_collection!=null){
              const requestOptions = {
                method: 'POST',
                mode: 'no-cors',
                headers: { 
                  "content-type": "application/json"
                },
                body: JSON.stringify(pickup_sms_collection)
            };
            fetch(process.env.REACT_APP_BULK_SMS_API_URL, requestOptions)
            .then(data =>console.log(data) );
              
            pickup_sms_collection=null
       }
      


       setalert_def_txt('Data Submitted Successfully');  setalert_def_class('success');  handleClick();

  


       setswitch_data_submitted(1)
       setswitch_data_submitted(0)
       setswitch_xlsx_active(1);   
       setjson_upload(null); 



 
 } else{ 
   //single import
         let final_submtted_data = Object.assign(SenderRecipientMin, marge_common)
 console.log(final_submtted_data);
              //common validation
              if (firsr_page_json.services_id_1 > 0 && firsr_page_json.i_product_type_id_2 > 0 && firsr_page_json.i_priority_id_3 > 0 && firsr_page_json.i_payment_type_8 > 0 && SenderRecipientMax.i_packaging_type_id_16 > 0) {
                setshow_error(0)
                let clearance = 1;
            
            
                //check corporate sender client?
                if (SenderRecipientMax.sender_category_1 == "corporate_sender") {
                    clearance = 0;
                    if (SenderRecipientMax.sender_client_id_7 > 0 && SenderRecipientMax.sender_client_branch_id_8 > 0) {
                        clearance = 1;
                    }
                } else {
                    clearance = 1;
                }
            
            
                //check corporate recipient client?
                if (SenderRecipientMax.recipient_category_14 == "corporate_recipient") {
                    clearance = 0;
                    if (SenderRecipientMax.recipient_client_id_22 > 0 && SenderRecipientMax.recipient_client_branch_id_23 > 0) {
                        clearance = 1;
                    }
                } else {
                    if(SenderRecipientMin.recipient_phone_20.length>10){clearance = 1;  } else{ clearance = 0;}                  
                }



                          console.log(clearance, ' clearance!');
                          if (clearance == 1) {


                            console.log(final_submtted_data);

                              axios.post(base_url + "create_shipment_multiple", final_submtted_data).then((response) => {
                                setalert_def_txt('Data Submitted Successfully');  setalert_def_class('success');  handleClick();

                                setState({ ...state, overwriting_cost: 0 }); 
                                setState({ ...state, total_cost: 0 });
                                setState({ ...state, collection_amount: 0 });
                               

                                  //sms services 
                                  console.log(final_submtted_data);

                                        //pickup sms      
                                        if(SenderRecipientMax.i_sms_template_id_30.includes(2)){
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
                                        }





                                  //Reset values
                                  setproduct_infoForm([{ qty: "", remarks: "", fixed_cost: "", weight: "", dimension: "", }])
                              }).catch(function(error) {  if (error.response) {  console.log(error.response.data); }   });
                              setswitch_data_submitted(1)
                              setswitch_data_submitted(0)
                          } else {
                            setalert_def_txt('Fail! Phone Number is invalid')
                            setalert_def_class('warning')
                            handleClick()
                              console.log('Not cleared!');
                              setshow_error(1)
                          }






            
            } else {
                setshow_error(1)
            }
 
 }
};
  
  
const [is_track_web_general, setis_track_web_general] = useState(0);
 
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
      const [track_web_customer, settrack_web_customer] = useState(0);

      const [switch_have_collection, setswitch_have_collection] = useState(0);
      const [switch_data_submitted, setswitch_data_submitted] = useState(0);
      const [switch_xlsx_active, setswitch_xlsx_active] = useState(0);

      const [alert_def_txt, setalert_def_txt] = useState('Data Submitted Successfully!');
      const [alert_def_class, setalert_def_class] = useState('success');


      const [count_xlsx_item, setcount_xlsx_item] = useState(0);
      const [open, setOpen] = React.useState(false);
      const [json_upload, setjson_upload] = useState(null);
      const [show_error, setshow_error] = useState(0);


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



  useEffect(() => {


    console.log('process.env',process.env);

    const getData = async () => {
      const arr_services_clients = []; const arr_services_clients_branch = []; const arr_i_product_type = []; const arr_i_sms_template = []; const arr_i_tracking_status = []; const arr_i_payment_type = []; const arr_i_priority = []; const arr_services = []; const arr_i_packaging_type = []; const arr_i_shipment_method = []; const arr_i_delivery_status = []; const arr_i_zone = []; const arr_zone_countries = []; const arr_zone_districts = []; const arr_zone_divisions = []; const arr_zone_upazilas = []; const arr_branch = []; 
      await axios.get(base_url+"setup_config").then((res) => {
          res.data.services_clients.map((temp) => { return arr_services_clients.push({value: temp.services_clients_id, label: temp.services_clients,services_id:temp.services_id,services_provider_id:temp.services_provider_id,i_sms_template_id:temp.i_sms_template_id,i_product_type_id:temp.i_product_type_id,services_packages_id:temp.services_packages_id}); }); setservices_clientsList(arr_services_clients) 
          res.data.services_clients_branch.map((temp) => { return arr_services_clients_branch.push({value: temp.services_clients_branch_id, label: temp.services_clients_branch,  services_clients_id: temp.services_clients_id}); }); setservices_clients_branchList(arr_services_clients_branch) 
          res.data.i_product_type.map((temp) => { return arr_i_product_type.push({value: temp.i_product_type_id, label: temp.i_product_type, services_id: temp.services_id}); }); seti_product_typeList(arr_i_product_type) 
          res.data.i_sms_template.map((temp) => { return arr_i_sms_template.push({value: temp.i_sms_template_id, label: temp.i_sms_template,have_general_sender:temp.have_general_sender,template:temp.message,}); }); seti_sms_templateList(arr_i_sms_template) 
          res.data.i_tracking_status.map((temp) => { return arr_i_tracking_status.push({value: temp.i_tracking_status_id, label: temp.i_tracking_status}); }); seti_tracking_statusList(arr_i_tracking_status) 
          res.data.i_payment_type.map((temp) => { return arr_i_payment_type.push({value: temp.i_payment_type_id, label: temp.i_payment_type,have_collection:temp.have_collection}); }); seti_payment_typeList(arr_i_payment_type) 
          res.data.i_priority.map((temp) => { return arr_i_priority.push({value: temp.i_priority_id, label: temp.i_priority}); }); seti_priorityList(arr_i_priority) 
          res.data.services.map((temp) => { return arr_services.push({value: temp.services_id, label: temp.services, is_track_web: temp.is_track_web}); }); setservicesList(arr_services)
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
    getData();
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
                 // console.log('checking');
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




 /////////////////////////////////////Registration//////////////////////////////////// 
  return (
    <div>
  

    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alert_def_class} sx={{ width: '100%' }}>
          {alert_def_txt}<br></br>
        </Alert>
    </Snackbar>

 
<ValidatorForm onSubmit={handleSubmit} onError={() => null}>


<Grid container spacing={6}> 
  <Grid item md={3} lg={3}   sm={12} xs={12}>
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

                    
                      setis_track_web_general(value.is_track_web)
                   
                    console.log(is_track_web_general,'is_track_web_general');
 

                   //  settrack_web_customer
              }
              /*else{
                setfirstpage(previousState => {  return { ...previousState, services_id: null }  });
                seti_i_product_typeList_filtered([]); 
              }*/
             
      }
    }    id="services_id_1"  renderInput={(params) => ( <TextField {...params}   InputLabelProps={ { required: true }}   label="Select Service Type" variant="standard" /> )} /> 
    { firstpage.services_id == null && show_error==1 && <div> <p style={{color: "red", marginTop:"-10px"}}>This field is required</p>  </div> }



    <Autocomplete {...i_product_typeProps} disableClearable    onChange={(event, value)=>{

      setfirstpage(previousState => {  return { ...previousState, i_product_type_id: value.value }  });  
      seti_product_type_id(value);  
      
      }}  
      
      value={i_product_type_id} id="i_product_type_id" SelectPodType renderInput={(params) => ( <TextField {...params} label="Select Product Type:*" variant="standard" /> )} />
    { firstpage.i_product_type_id == null && show_error==1 && <div> <p style={{color: "red", marginTop:"-10px"}}>This field is required</p>  </div> }


    <Autocomplete {...i_priorityProps}  disableClearable        onChange={(event, value)=>{   setfirstpage(previousState => {  return { ...previousState, i_priority_id: value.value }  }); }}   id="i_priority_id" SelectPodType renderInput={(params) => ( <TextField {...params} label="Select Product Priority:*" variant="standard" /> )} />    
    { firstpage.i_priority_id == null && show_error==1 && <div> <p style={{color: "red", marginTop:"-10px"}}>This field is required</p>  </div> }

  </Grid>

  <Grid item md={9}  lg={9}   sm={12} xs={12}> 
        <p>Products Information</p>  
            {
          product_info_json.map((details, index)=>(
          <>

          { switch_xlsx_active == 0 &&
          <Grid container spacing={1}  key={index}>
              <Grid item md={1}  lg={1}   sm={4} xs={4}>
                    <TextField type="number" name="qty" id="standard-basic" value={details?.qty}    onChange={(e)=>handleCheck(index,e,"qty")}   label="Qty:  "validators={[ ]}/>
                </Grid>
                <Grid item md={3}   lg={3}   sm={4} xs={4}>
                <TextField type="text" name="remarks" id="standard-basic" value={details?.remarks} onChange={(e)=>handleCheck(index,e,"remarks")}  label="Remarks:  "validators={[ ]}/>
                </Grid>
                <Grid item md={2}   lg={2}   sm={4} xs={4}>
                    <TextField type="number" name="weight" id="standard-basic" value={details?.weight} onChange={(e)=>handleCheck(index,e,"weight")}  label="Weight: (Kg)"validators={[ ]}/>
                </Grid>

                <Grid item md={2}   lg={2}   sm={4} xs={4}>
                    <TextField type="text" name="dimension" id="standard-basic" value={details?.dimension} onChange={(e)=>handleCheck(index,e,"dimension")}  label="Dimension: (W * D * H)  "validators={[ ]}/>
                </Grid>

                <Grid item md={2}   lg={2}   sm={4} xs={4}>
                    <TextField type="number" name="fixed_cost" id="standard-basic" value={details?.fixed_cost} onChange={(e)=>handleCheck(index,e,"fixed_cost")}  label="Fixed Cost/Qty:  "validators={[ ]}/>
                </Grid>

                <Grid item md={1}   lg={1}   sm={4} xs={4}> </Grid>
                <Grid item md={1}   lg={1}   sm={4} xs={4}>
                    <Fab size="small" color="secondary" aria-label="remove" className="button"><Icon>remove</Icon></Fab> 
                </Grid>
          </Grid>
          }
            </> 
          ))
          } 
        <br></br> 
        <Grid container spacing={1}>
               
              <Grid item md={1}   lg={1}   sm={12} xs={12}>
                { switch_xlsx_active == 0 &&
                  <Fab size="small" onClick={handleNewRow} color="primary" aria-label="Add" className="button"><Icon>add</Icon></Fab>
                }
                
              </Grid>


              {/*<Grid item md={1}   lg={1}   sm={12} xs={12}>
                 <Fab size="small" onClick={handlesendsms} color="primary" aria-label="Add" className="button"><Icon>test bulk sms</Icon></Fab>
              </Grid>*/}
              
             
                    
                     <Grid item md={3}   lg={3}   sm={12} xs={12}> 
                     { switch_xlsx_active == 0 &&
                     <TextField type="text" name="overwriting_cost" id="standard-basic" value={overwriting_cost || ""} onChange={handleChange}errorMessages={["Please write in correct form"]} label="Overwriting Cost:  "validators={[  ]}/>
                     }
                     </Grid>
                     
                     <Grid item md={2}  lg={2}   sm={12} xs={12}>
                     { switch_xlsx_active == 0 &&
                     <TextField type="number" name="total_cost" id="standard-basic" value={total_cost} onChange={handleChange}errorMessages={["This field is required"]} label="Total Cost:  "   validators={["required"]}/>
                     }
                     </Grid>
                    {switch_have_collection == 1 && 
                    <Grid item md={3}   lg={3}   sm={12} xs={12}> 
                    <TextField type="text" name="collection_amount" id="standard-basic" value={collection_amount || ""} onChange={handleChange}errorMessages={["Please write in correct form"]} label="Collection Amount:  "validators={[  ]}/>
                    </Grid>
                    }
              <Grid item md={3}  lg={3}   sm={12} xs={12}>
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

<br></br> <Divider /> <br></br>

<Grid container spacing={6}>
    <Grid item md={5}    lg={5}   sm={6} xs={6}>
          <Button color="primary"  variant="contained" type="submit">
            <Icon>send</Icon>
            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
        </Button>
    </Grid>
    
    <Grid item md={5}   lg={5}   sm={6} xs={6}>
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
    </Grid>
</Grid>



<br></br> <Divider /> <br></br>
 
<SenderRecipient ref={SenderRecipientRef}   
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
    is_track_web_general={is_track_web_general}
    services_id={firstpage.services_id}
/>
 
 
 
      </ValidatorForm>
    </div>
  );
};


export default AddPodForm;
