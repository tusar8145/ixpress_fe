import { Grid } from "@mui/material";
import useAuth from 'app/hooks/useAuth';
import React, { forwardRef, useState } from "react";
import Barcode from 'react-barcode';
import { business_address, business_email, business_web } from '../../../../utils/constant';
import "../../myStyle.css";
const {format} = require('date-fns');


const InvoiceBulk=forwardRef((props,_ref)=> 
{
 
 
  

 
 const { logout, user } = useAuth();
 const [active_update_button, setactive_update_button] = useState(0); 

/*----------------------------------------------Start sender--------------------------------------------------------------*/
 
  /*--------------------------------------------End recipient----------------------------------------------------------------*/








return (
<div  ref={_ref}>




<Grid item md={12}    lg={12}   sm={12}xs={12} style={{ backgroundColor: "white", padding:"5px",borderRadius: "3px",  }}>


 


{/*----------------------------------------------Start sender--------------------------------------------------------------*/}



{props.invoice_print.map(item => (
                  <div> 
                  <Grid container>
                      <Grid item xs={12} id='this_class' className="this_class"> 



<table>
  <tr>
    <th  colspan="2"><img width="200" src='/assets/images/logo.png'/></th>
    <th  colspan="2">
    <p style={{margin: "18px 2px 2px 2px", fontSize: "12px"}} inline variant="body1" align=""><b>HOTLINE:</b> (880) 2-9830376-78 </p>
       <p style={{margin: "18px 2px 2px 2px", fontSize: "8px"}} inline variant="body1" align=""><b>Address:</b> {business_address} </p> 
       <p style={{margin: "2px" , fontSize: "8px"}} inline variant="body1" align=""><b>Email: </b>{business_email}</p> 
       <p style={{margin: "2px" , fontSize: "8px"}} inline variant="body1" align=""><b>Web:</b> {business_web}</p> 
    </th>
    <th  colspan="2">
      <p style={{margin: "2px" , fontSize: "14px"}} inline variant="body1" align="center"><Barcode height= "50"   value={item[0].id} /></p>
 
    </th>
  </tr>
 
  <tr>
        <th  style={{color: "white", background: "black"}}   align="left" >Product Type</th>
        <th  style={{color: "white", background: "black"}}   align="left" >Product Priority</th>
        <th  style={{color: "white", background: "black"}}   align="left" >Shipment Method</th>
        <th  style={{color: "white", background: "black"}}   align="left" >Packaging Type</th>
        <th  style={{color: "white", background: "black"}}   align="left" >Ref. No.</th>
        <th  style={{color: "white", background: "black"}}   align="left" >Pickup Date</th>
  </tr>

  <tr>
        <td   >{item[0].i_product_type}</td>
        <td   >{item[0].i_priority}</td>
        <td   >{item[0].i_shipment_method}</td>
        <td   >{item[0].i_packaging_type}</td>
        <td   >{item[0].id}-{item[0].sender_ref_no_4}</td>
        <td   >{item[0].pickup_date_3}</td>
  </tr>


  <tr>
        <th   colspan="2">Sender</th>
        <th   colspan="2">Recipient</th>
        <th   colspan="2">Payment Information</th>
  </tr>

  <tr>
        <td   colspan="2">
              <p style={{margin: "2px" , fontSize: "14px"}} inline variant="body1" align="">{item[0].sender_name_6}</p> 
              <p style={{margin: "2px" , fontSize: "14px"}} inline variant="body1" align="">{item[0].sender_phone_5}</p> 
              <p style={{margin: "2px" , fontSize: "14px"}} inline variant="body1" align="">{item[0].clients}</p> 
              <p style={{margin: "2px" , fontSize: "14px"}} inline variant="body1" align="">{item[0].client_branch}</p> 

        </td>

        <td  colspan="2">
              <p style={{margin: "2px" , fontSize: "14px"}} inline variant="body1" align="">{item[0].recipient_name_21}</p> 
              <p style={{margin: "2px" , fontSize: "14px"}} inline variant="body1" align="">{item[0].recipient_address_24}</p> 
              <p style={{margin: "2px" , fontSize: "14px"}} inline variant="body1" align="">{item[0].recipient_phone_20}</p> 
        </td>

        <td  >
              <p style={{margin: "2px" , fontSize: "14px"}}   align=""><b>Collection Amount: </b>{item[0].collection_amount_7}</p> 
              <p style={{margin: "2px" , fontSize: "14px"}}   align=""><b>Delivery Charge: </b> </p> 
              <p style={{margin: "2px" , fontSize: "14px"}}   align=""><b>COD Charge: </b> </p> 
              <p style={{margin: "2px" , fontSize: "14px"}}   align=""><b>Return Charge: </b> </p>  
        </td>
        <td  >
              <p style={{margin: "2px" , fontSize: "14px"}}   align=""><b>Payment Type: </b>{item[0].i_payment_type}</p> 
              <p style={{margin: "2px" , fontSize: "14px"}}   align=""><b>Total Charge: </b>{item[0].total_cost_6}</p>
        </td>
  </tr>
  <tr>
        <th    align="left" colspan="2">Remarks/Description of Goods</th>
        <th    align="left" colspan="2">Picked By</th>
        <th    align="left" colspan="2">For Customer</th>
  </tr>

  <tr>
    <td  colspan="2"> 
    </td>
    <td  colspan="2"> 
    
    <p style={{margin: "2px" , fontSize: "14px"}}   align="">{item[0].creator}</p>
    <p style={{margin: "2px" , fontSize: "14px"}}   align="">{item[0].created_branch}</p> 
    
    </td>
    <td  colspan="2"> 
      <p style={{margin: "2px" , fontSize: "14px"}}   align=""><b>Received by (Name):</b>..........................................................</p>
      <p style={{margin: "2px" , fontSize: "14px"}}   align=""><b>Relation:</b>................................. <b>Date:</b>......................</p>
      <p style={{margin: "2px" , fontSize: "14px"}}   align=""><b>Identification:</b>..............................................................</p>
    </td>
  </tr>
</table>

                      </Grid>










                  </Grid>
                  <br></br>
                  </div> 
                ))}


 


{/*--------------------------------------------Start recipient---------------------------------------------------------------*/}
 
 
</Grid>
 






</div>
);

} );

export default React.memo(InvoiceBulk);