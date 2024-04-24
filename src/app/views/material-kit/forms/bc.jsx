
/*Imports---------(1)*/
import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Autocomplete, Button, Checkbox, Fab, Grid, Icon, styled } from "@mui/material";
import * as React from 'react';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import MuiAlert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import { Span } from "app/components/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { base_url } from '../../../constants/global';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/*System Html Configuration---------(3)*/
const TextField = styled(TextValidator)(() => ({ width: "100%", marginBottom: "16px", }));

 
/*Main function---------(4)*/
const AddPodForm = () => {

   

  const [mydata, setForm]= useState([{
    qty:"",
    remarks:"",
    fixed_cost:"",
    weight:"", 
    dimension:"",
  }])

  const handleCheck = (index, e, selected)=>{
    console.log(index, e.target.value, selected);
    let temp = [...mydata];
    temp[index][selected] = e.target.value;
    setForm(temp);
    }

    const handleNewRow = () => {
      setForm([...mydata,{
        qty:"",
        remarks:"",
        fixed_cost:"",
        weight:"", 
        dimension:"",
      }])}
  
      
  const [i_product_type_id, seti_product_type_id] = useState(null);
  const [i_product_typeList, seti_product_typeList] = useState([""]); 
  const [i_product_typeList_filtered, seti_i_product_typeList_filtered] = useState([""]);      
 

  const [services_clientsList, setservices_clientsList] = useState([""]);
  const [i_relationList, seti_relationList] = useState([""]);
  const [i_return_causeList, seti_return_causeList] = useState([""]);
  const [i_sms_templateList, seti_sms_templateList] = useState([""]);
  const [i_tracking_statusList, seti_tracking_statusList] = useState([""]);
  const [i_unitList, seti_unitList] = useState([""]);
  const [i_payment_typeList, seti_payment_typeList] = useState([""]);
  const [i_priorityList, seti_priorityList] = useState([""]);
  const [servicesList, setservicesList] = useState([""]);
  const [i_packaging_typeList, seti_packaging_typeList] = useState([""]);
  const [i_shipment_methodList, seti_shipment_methodList] = useState([""]);
  const [i_delivery_statusList, seti_delivery_statusList] = useState([""]);
  const [i_sms_template_id, seti_sms_template_id] = useState([""]);
  const [i_zoneList, seti_zoneList] = useState([""]);

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const getData = async () => {

      const arr_services_clients = []; 
      const arr_i_product_type = [];
      const arr_i_relation = [];
      const arr_i_return_cause = [];
      const arr_i_sms_template = [];
      const arr_i_tracking_status = [];
      const arr_i_unit = [];
      const arr_i_payment_type = [];
      const arr_i_priority = [];
      const arr_services = [];
      const arr_i_packaging_type = []; 
      const arr_i_shipment_method = []; 
      const arr_i_delivery_status = []; 
      const arr_i_zone = []; 



      await axios.get(base_url+"setup_config").then((res) => {


        res.data.services_clients.map((temp) => { return arr_services_clients.push({value: temp.services_clients_id, label: temp.services_clients}); }); setservices_clientsList(arr_services_clients) 
        res.data.i_product_type.map((temp) => { return arr_i_product_type.push({value: temp.i_product_type_id, label: temp.i_product_type, services_id: temp.services_id}); }); seti_product_typeList(arr_i_product_type) 
        res.data.i_relation.map((temp) => { return arr_i_relation.push({value: temp.i_relation_id, label: temp.i_relation}); }); seti_relationList(arr_i_relation) 
        res.data.i_return_cause.map((temp) => { return arr_i_return_cause.push({value: temp.i_return_cause_id, label: temp.i_return_cause}); }); seti_return_causeList(arr_i_return_cause) 
        res.data.i_sms_template.map((temp) => { return arr_i_sms_template.push({value: temp.i_sms_template_id, label: temp.i_sms_template}); }); seti_sms_templateList(arr_i_sms_template) 
        res.data.i_tracking_status.map((temp) => { return arr_i_tracking_status.push({value: temp.i_tracking_status_id, label: temp.i_tracking_status}); }); seti_tracking_statusList(arr_i_tracking_status) 
        res.data.i_unit.map((temp) => { return arr_i_unit.push({value: temp.i_unit_id, label: temp.i_unit}); }); seti_unitList(arr_i_unit) 
        res.data.i_payment_type.map((temp) => { return arr_i_payment_type.push({value: temp.i_payment_type_id, label: temp.i_payment_type}); }); seti_payment_typeList(arr_i_payment_type) 
        res.data.i_priority.map((temp) => { return arr_i_priority.push({value: temp.i_priority_id, label: temp.i_priority}); }); seti_priorityList(arr_i_priority) 
        res.data.services.map((temp) => { return arr_services.push({value: temp.services_id, label: temp.services}); }); setservicesList(arr_services)
        res.data.i_packaging_type.map((temp) => { return arr_i_packaging_type.push({value: temp.i_packaging_type_id, label: temp.i_packaging_type}); }); seti_packaging_typeList(arr_i_packaging_type)  
        res.data.i_shipment_method.map((temp) => { return arr_i_shipment_method.push({value: temp.i_shipment_method_id, label: temp.i_shipment_method}); }); seti_shipment_methodList(arr_i_shipment_method)  
        res.data.i_delivery_status.map((temp) => { return arr_i_delivery_status.push({value: temp.i_delivery_status_id, label: temp.i_delivery_status}); }); seti_delivery_statusList(arr_i_delivery_status)  
		    res.data.i_zone.map((temp) => { return arr_i_zone.push({value: temp.i_zone_id, label: temp.i_zone}); }); seti_zoneList(arr_i_zone)  

       
      });
    };
    getData();
  }, []);

   

  /*state management---------(5)*/
  const [state, setState] = useState({date: new Date(),username:'tusara'});  //set defaullt value
  const {  date,re_name, re_company, re_address, re_city, re_post_code, re_country, re_cell_no, re_customer_no , re_tracking_code,re_ref_no, remarkes,overwriting_cost, total_cost,is_track_web,
   } = state;


  /*handle---------(5)*/
  const handleChange = (event) => { event.persist(); setState({ ...state, [event.target.name]: event.target.value });  };
  const handleDateChange = (date) => setState({ ...state, date });


  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

       
      function set_i_sms_template_id(value) {
        var _i_sms_template_id='';
        for (var i = 0; i < value.length; i++) {
          _i_sms_template_id=_i_sms_template_id+','+value[i].value;
        } 
        seti_sms_template_id(_i_sms_template_id.substring(1));
      }





  const handleSubmit = (event) => {


    console.log(mydata);


    let i_tracking_status_id =null
    let services_clients_id = null
    let services_id =null
   
    let i_priority_id = null
    let i_payment_type_id =null
    let i_packaging_type_id = null
    let i_shipment_method_id = null
    let i_delivery_status_id = null
    let i_zone_id = null


    try { 
         
          const temp_i_tracking_status_id = document.getElementById('i_tracking_status_id').value; if(temp_i_tracking_status_id!=null) {i_tracking_status_id = i_tracking_statusList.find(el => el.label === temp_i_tracking_status_id);  i_tracking_status_id=i_tracking_status_id["value"]; } 
          const temp_services_clients_id = document.getElementById('services_clients_id').value;  if(temp_i_tracking_status_id!=null) {services_clients_id = services_clientsList.find(el => el.label === temp_services_clients_id); services_clients_id=services_clients_id["value"]; }  
          const temp_services_id  = document.getElementById('services_id').value;  if(temp_i_tracking_status_id!=null) {services_id = servicesList.find(el => el.label === temp_services_id); services_id=services_id["value"]; }   
         // const temp_i_product_type_id = document.getElementById('i_product_type_id').value;  if(temp_i_tracking_status_id!=null) {i_product_type_id = i_product_typeList.find(el => el.label === temp_i_product_type_id); i_product_type_id=i_product_type_id["value"]; }   
          const temp_i_priority_id = document.getElementById('i_priority_id').value;  if(temp_i_tracking_status_id!=null) {i_priority_id = i_priorityList.find(el => el.label === temp_i_priority_id); i_priority_id=i_priority_id["value"];  }  
          const temp_i_payment_type_id = document.getElementById('i_payment_type_id').value;  if(temp_i_tracking_status_id!=null) {i_payment_type_id = i_payment_typeList.find(el => el.label === temp_i_payment_type_id); i_payment_type_id=i_payment_type_id["value"]; }  
          const temp_i_packaging_type_id = document.getElementById('i_packaging_type_id').value;  if(temp_i_tracking_status_id!=null) { i_packaging_type_id = i_packaging_typeList.find(el => el.label === temp_i_packaging_type_id); i_packaging_type_id=i_packaging_type_id["value"];  } 
          const temp_i_shipment_method_id = document.getElementById('i_shipment_method_id').value;  if(temp_i_tracking_status_id!=null) { i_shipment_method_id = i_shipment_methodList.find(el => el.label === temp_i_shipment_method_id); i_shipment_method_id=i_shipment_method_id["value"];  } 
          const temp_i_delivery_status_id = document.getElementById('i_delivery_status_id').value;  if(temp_i_tracking_status_id!=null) {i_delivery_status_id = i_delivery_statusList.find(el => el.label === temp_i_delivery_status_id); i_delivery_status_id=i_delivery_status_id["value"];  }  
          const temp_i_zone_id = document.getElementById('i_zone_id').value;  if(temp_i_tracking_status_id!=null) {i_zone_id = i_zoneList.find(el => el.label === temp_i_zone_id); i_zone_id=i_zone_id["value"];  } 


      } catch (e) {
      
      }

  /* qty:parseInt(qty),
      remarkes:remarkes, 
      weight:parseInt(weight),
      dimension:dimension,*/
      
    //  if(!i_sms_template_id.length>0){
      //  seti_sms_template_id("1");
     // }

  const res =  axios.post(base_url+"create_shipment_multiple", 
    { 

      services_id:parseInt(services_id), 
      i_product_type_id:parseInt(i_product_type_id),
      i_priority_id:parseInt(i_priority_id),
      
      goods_info:JSON.stringify(mydata),
      
      total_cost:parseInt(total_cost),
      overwriting_cost:parseInt(overwriting_cost),
      i_payment_type_id:parseInt(i_payment_type_id),

      re_ref_no:re_ref_no,  
      re_name:re_name,
      re_address:re_address,
      re_city:re_city,
      re_post_code:re_post_code,
      re_country:re_country,
      re_company:re_company,
      re_cell_no:re_cell_no,
      re_customer_no:re_customer_no,  
      re_tracking_code:re_tracking_code,  
      is_track_web:is_track_web,  


      services_clients_id:services_clients_id,
      
      i_packaging_type_id:i_packaging_type_id,
      i_shipment_method_id:i_shipment_method_id,
      i_sms_template_id:"1,2",
      i_tracking_status_id:i_tracking_status_id,  
      i_delivery_status_id:i_delivery_status_id,
      i_zone_id:i_zone_id,


      pickup_date:date
   
    }).then((response) => {

      handleClick()
      setForm([{  qty:"",  remarks:"",  fixed_cost:"",   weight:"",    dimension:"",  }])  
      setState([{  re_ref_no:"", }])

    });
    console.log(res);

  /*
  
  ,
    i_payment_type_id:i_payment_type_id
  
  axios
  .post(url2, {
    text
 })
  
 .then((response) => {
   console.log(response.data);
  });*/

  
     //alert(country["year"]);  

     /*console.log("submitted");
     console.log(username);
     console.log(event);


     axios
     .post(url2, {
       jason
    })
     
    .then((response) => {
      console.log(response.data);
     });*/
  };
 


  /*Defines for select option---------(4)*/
  const services_clientsProps = { options: services_clientsList, getOptionLabel: (option) => option.label,};
  const i_product_typeProps = { options: i_product_typeList_filtered, getOptionLabel: (option) => option.label,};
  const i_relationProps = { options: i_relationList, getOptionLabel: (option) => option.label,};
  const i_return_causeProps = { options: i_return_causeList, getOptionLabel: (option) => option.label,};
  const i_sms_templateProps = { options: i_sms_templateList, getOptionLabel: (option) => option.label,};
  const i_tracking_statusProps = { options: i_tracking_statusList, getOptionLabel: (option) => option.label,};
  const i_unitProps = { options: i_unitList, getOptionLabel: (option) => option.label,};
  const i_payment_typeProps = { options: i_payment_typeList, getOptionLabel: (option) => option.label,};
  const i_priorityProps = { options: i_priorityList, getOptionLabel: (option) => option.label,};
  const servicesProps = { options: servicesList, getOptionLabel: (option) => option.label,};
  const i_packaging_typeProps = { options: i_packaging_typeList, getOptionLabel: (option) => option.label,};
  const i_shipment_methodProps = { options: i_shipment_methodList, getOptionLabel: (option) => option.label,};
  const i_delivery_statusProps = { options: i_delivery_statusList, getOptionLabel: (option) => option.label,};
  const i_zoneProps = { options: i_zoneList, getOptionLabel: (option) => option.label,};

  const filterItems = (arr, field, value) => { if (field != null) { return arr.filter((item) => { 
    return item[field].includes(value)
  }) } }

  
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


  return (
    <div>

<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Data Submitted Successfully!
        </Alert>
      </Snackbar>


 
<ValidatorForm onSubmit={handleSubmit} onError={() => null}>


<Grid container spacing={6}> 
  <Grid item xs={4}>
      <Autocomplete {...servicesProps}  onChange={(event, value)=>{
              if(value!=null){ 
                  var filter = filterItems(i_product_typeList, 'services_id', value.value.toString());
                  seti_i_product_typeList_filtered(filter); 
              }else{
                seti_i_product_typeList_filtered([]); 
              }
              seti_product_type_id(null);
      }
    }    id="services_id"  renderInput={(params) => ( <TextField {...params}   InputLabelProps={ { required: true }}   label="Select Service Type" variant="standard" /> )} /> 
   </Grid>
  <Grid item xs={4}>
      <Autocomplete {...i_product_typeProps}     onChange={(event, value)=>{  seti_product_type_id(value); }}    value={i_product_type_id} id="i_product_type_id" SelectPodType renderInput={(params) => ( <TextField {...params} label="Select Product Type:*" variant="standard" /> )} />
   </Grid>
  <Grid item xs={4}> 
      <Autocomplete {...i_priorityProps} id="i_priority_id" SelectPodType renderInput={(params) => ( <TextField {...params} label="Select Product Priority" variant="standard" /> )} />        
   </Grid>
</Grid>

 


<p>Goods Information</p> 
 
{
mydata.map((details, index)=>(
<>
<Grid container spacing={1}  key={index}>


<Grid item xs={1}>
      <TextField type="number" name="qty" id="standard-basic" value={details?.qty}    onChange={(e)=>handleCheck(index,e,"qty")}   label="Qty:  "validators={[ ]}/>
  </Grid>
  <Grid item xs={3}>
  <TextField type="text" name="remarks" id="standard-basic" value={details?.remarks} onChange={(e)=>handleCheck(index,e,"remarks")}  label="Remarks:  "validators={[ ]}/>
  </Grid>
  <Grid item xs={2}>
      <TextField type="number" name="weight" id="standard-basic" value={details?.weight} onChange={(e)=>handleCheck(index,e,"weight")}  label="Weight: (Kg)"validators={[ ]}/>
  </Grid>

  <Grid item xs={2}>
      <TextField type="text" name="dimension" id="standard-basic" value={details?.dimension} onChange={(e)=>handleCheck(index,e,"dimension")}  label="Dimension: (W * D * H)  "validators={[ ]}/>
   </Grid>

   <Grid item xs={2}>
      <TextField type="number" name="fixed_cost" id="standard-basic" value={details?.fixed_cost} onChange={(e)=>handleCheck(index,e,"fixed_cost")}  label="Fixed Cost/Qty:  "validators={[ ]}/>
  </Grid>

  <Grid item xs={1}> </Grid>
  <Grid item xs={1}>
      <Fab size="small" color="secondary" aria-label="remove" className="button"><Icon>remove</Icon></Fab> 
  </Grid>

</Grid>
  </>
))
}

<Grid container spacing={1}>
  <Grid item xs={1}>
      <Fab size="small" onClick={handleNewRow} color="primary" aria-label="Add" className="button"><Icon>add</Icon></Fab>
  </Grid>

  <Grid item xs={2}>

 
  <Button  color="success"   variant="contained"  component="label">
  <Icon> add_to_photos </Icon> ` Import XLSX
  <input hidden accept="XLSX/*" multiple type="file" />
</Button>


</Grid>
</Grid>

 
 
  


<Grid container spacing={6}>

  <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 2 }}>

    <p>Sender Info</p>
    <Autocomplete {...services_clientsProps} id="services_clients_id" SelectClient renderInput={(params) => ( <TextField {...params} label="Select Client" variant="standard" /> )} />      

    <p>Others</p>
    <LocalizationProvider dateAdapter={AdapterDateFns}> <DatePicker value={date} onChange={handleDateChange} renderInput={(props) => ( <TextField {...props} label="Pickup Date" id="mui-pickers-date" sx={{ mb: 2, width: "100%" }} /> )} /> </LocalizationProvider>
    <TextField type="text" name="re_ref_no" id="standard-basic" value={re_ref_no || ""} onChange={handleChange}errorMessages={["Please write in correct form"]} label="Reference No:*  "validators={[ ]}/>

    <Button color="primary" style={{ marginTop: 28 }} variant="contained" type="submit">
        <Icon>send</Icon>
        <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
    </Button>

  </Grid> 

  <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 2 }}>
      <p>Delivery to</p>
      <Autocomplete {...i_zoneProps} id="i_zone_id" SelectPodType renderInput={(params) => ( <TextField {...params} label="Select Zone" variant="standard" /> )} />  

      <TextField type="text" name="re_name" id="standard-basic" value={re_name || ""} onChange={handleChange}errorMessages={["This field is required"]} label="Name:* (Min length 4, Max length 20)"validators={["required", "minStringLength: 4", "maxStringLength: 20"]}/>
      <TextField type="text" name="re_company" id="re_company" value={re_company || ""} onChange={handleChange}errorMessages={["Please write in correct form"]} label="Company: (Min length 4, Max length 20)"validators={[]}/>
      <TextField type="text" name="re_address" id="standard-basic" value={re_address || ""} onChange={handleChange}errorMessages={["This field is required"]} label="Address:* (Min length 4, Max length 20)"validators={["minStringLength: 4", "maxStringLength: 20"]}/>
      <TextField type="text" name="re_city" id="standard-basic" value={re_city || ""} onChange={handleChange}errorMessages={["Please write in correct form"]} label="City: (Min length 4, Max length 20)"validators={[]}/>
      <TextField type="text" name="re_post_code" id="standard-basic" value={re_post_code || ""} onChange={handleChange}errorMessages={["Please write in correct form"]} label="Post Code: (Min length 4, Max length 20)"validators={[]}/>
      <TextField type="text" name="re_country" id="standard-basic" value={re_country || ""} onChange={handleChange}errorMessages={["Please write in correct form"]} label="Country: (Min length 4, Max length 20)"validators={[]}/>
      <TextField type="text" name="re_cell_no" id="standard-basic" value={re_cell_no || ""} onChange={handleChange}errorMessages={["Please write in correct form"]} label="Cell No: (Min length 4, Max length 20)"validators={[]}/>
  </Grid>  
 
  <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 2 }}>
      <p>Packaging Information</p> 
      <Autocomplete {...i_packaging_typeProps} id="i_packaging_type_id" SelectPodType renderInput={(params) => ( <TextField {...params} label="Select Packaging Type" variant="standard" /> )} />        
      <Autocomplete {...i_shipment_methodProps} id="i_shipment_method_id" SelectPodType renderInput={(params) => ( <TextField {...params} label="Select Shipment Method" variant="standard" /> )} />        
      <Autocomplete {...i_delivery_statusProps} id="i_delivery_status_id" SelectPodType renderInput={(params) => ( <TextField {...params} label="Select Delivery Status" variant="standard" /> )} />  

      <Autocomplete {...i_tracking_statusProps} id="i_tracking_status_id" SelectTracking renderInput={(params) => ( <TextField {...params} label="Select Tracking Status" variant="standard" /> )} />
      <Autocomplete  onChange={(event, value) => set_i_sms_template_id(value) }  multiple id="i_sms_template_id" {...i_sms_templateProps} disableCloseOnSelect renderOption={(props, option, { selected }) => ( <li {...props}> <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} /> {option.label} </li> )} style={{ width: '100%', marginTop: 20 }} renderInput={(params) => ( <TextField {...params} label="SMS sending options" placeholder="Multi Select" /> )} />  

      <p>Cost</p>   
      <TextField type="text" name="overwriting_cost" id="standard-basic" value={overwriting_cost || ""} onChange={handleChange}errorMessages={["Please write in correct form"]} label="Overwriting Cost:  "validators={[  ]}/>
      <TextField type="text" name="total_cost" id="standard-basic" value={total_cost || ""} onChange={handleChange}errorMessages={["Please write in correct form"]} label="Total Cost:  "validators={[ ]}/>
      <Autocomplete {...i_payment_typeProps} id="i_payment_type_id" SelectPodType renderInput={(params) => ( <TextField {...params} label="Select Payment Type" variant="standard" /> )} /> 
  </Grid> 

</Grid>



      </ValidatorForm>
    </div>
  );
};


export default AddPodForm;
