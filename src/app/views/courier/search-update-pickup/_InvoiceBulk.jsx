import { Grid } from "@mui/material";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import useAuth from 'app/hooks/useAuth';
import React, { useEffect,forwardRef, useState } from "react";
import Barcode from 'react-barcode';
import { business_address, business_email, business_hotline, business_web } from '../../../utils/constant';
import "../myStyle.css";
import { styled } from "@mui/system";
import { TextValidator } from "react-material-ui-form-validator";
 

const { format } = require('date-fns');
const TextField = styled(TextValidator)(() => ({ width: "100%", marginBottom: "16px", }));



 


const InvoiceBulk = forwardRef((props, _ref) => {
const [start, setstart] = useState(-1);
const [end, setend] = useState(99999999);

const [height, setheight] = useState(145);

  const handleChange = (event) => { event.persist(); 
      
      setheight(event.target.value)
         };

useEffect(() => {

      try {
   var num = props.range.split('-');

if(num.length>1){
      if(num[1] > -1){
            var t1=parseInt(num[1])+1
            setend(t1) 
      }else{
          // setend(num[0]-1)
      }  

  if(num[0]>-1){
     var t0=parseInt(num[0])-1
     setstart(t0)
    }else{
      setstart(-1)
      setend(99999999)
    }   

}



     
      } catch (error) {
            setstart(-1)
            setend(99999999)   
      }


      
   //console.log(num[0],num[1])
   },[props.range]);


      const { logout, user } = useAuth();
      const [active_update_button, setactive_update_button] = useState(0);

      /*----------------------------------------------Start sender--------------------------------------------------------------*/

      /*--------------------------------------------End recipient----------------------------------------------------------------*/

 
      function formatAMPM(date) {
    if(date){
               const myArray = date.split(":");
              
            var hours = myArray[0];
            var minutes = myArray[1];
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0'+minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            return strTime;   
    }else{
      return ""
    }

          }




 

                  return (
            <div ref={_ref} style={{ backgroundColor: "white", padding: "5px", borderRadius: "3px", paddingLeft:'20px', paddingRight:'20px' }}>


<p className="dnone"> 

<TextField type="number" inputProps={ { readOnly: false, } } name="height" id="standard-basic" value={height} onChange={handleChange} label="Set Height" />

</p>

{/*8X*/}
{props.force_print8==1 &&
<Grid container  spacing={0}
 

  justifyContent="left">
{props.invoice_print.map(item => (  
<>
{(item[0].id > start && item[0].id < end) &&
      <Grid xs={6} id='this_class_4' className="this_class_4" style={{marginTop:"10px",padding:"3px"}}>
            <div style={{margin:"5px"}}>
            <table style={{width: "100%", }}> 
            <tbody> 
            
                  <tr>
                        <td colspan="5" style={{  textAlign: "center",  padding: "3px",  borderRight: "0px", borderBottom: "0px"}} justify="center" justifyContent="center"><img  style={{width: "140%"}} src='/assets/images/logo.png' /></td>
                        <td colspan="1" style={{ textAlign: "center", padding: "2px",  borderLeft: "0px", borderBottom: "0px"}}></td>
                        <td colspan="6"  rowspan="2" style={{  textAlign:"center"}}><Barcode height="23" value={item[0].id} /></td>
                  </tr>
            
                  <tr>
                        <td colspan="7" style={{width: "58.2255%", borderTop: "0px", fontSize:"8px"}}><b>HOTLINE:</b> <x   style={{fontSize: "9px"}} >{business_hotline}</x><br></br><b>Web:</b> {business_web}</td>
                  </tr>

                  <tr>
                        <td colspan="3" style={{width: "24.9538%"}}><b>{item[0].services.replace('Domestic','').replace('International','').replace('Service','')} Type</b></td>
                        <td colspan="3" style={{width: "24.9538%"}}><b>Batch Code</b></td>
                        <td colspan="3" style={{width: "24.9538%"}}><b>Reference</b></td>
                        <td colspan="3" style={{width: "24.9538%"}}><b>Date</b></td>
                  </tr>
                  <tr>
                        <td colspan="3" style={{width: "24.9538%"}}>{item[0].i_product_type!='Undefined'?  item[0].i_product_type : ""}</td>
                        <td colspan="3" style={{width: "24.9538%"}}>{item[0].unique_upload_id}</td>
                        <td colspan="3" style={{width: "24.9538%"}}>{item[0].sender_ref_no_4 !="#"? item[0].sender_ref_no_4 : ""}</td>
                        <td colspan="3" style={{width: "24.9538%"}}>{item[0].i_product_type!='Undefined'?  item[0].pickup_date_3 : ""}</td>
                  </tr>
                  <tr>
                        <td colspan="4" style={{width: "49.9076%", height: height+"px"}}>
                              <b>Sender</b> 
                              <p style={{ margin: "2px",  }} inline variant="body1" align="">{item[0].sender_name_6}</p>
                              <p style={{ margin: "2px",  }} inline variant="body1" align="">{item[0].sender_phone_5}</p>
                              <p style={{ margin: "2px",  }} inline variant="body1" align="">{item[0].clients!='Booking Clients'? item[0].clients : ": "  }</p>
							  
							  {item[0].clients !=item[0].client_branch &&
							                                <p style={{ margin: "2px",  }} inline variant="body1" align="">{item[0].client_branch}</p>

							  }
							  
            <br></br>
                        </td>
                        <td colspan="8" style={{width: "49.9076%", height: height+"px"}}>
                              <b>Recipient</b> 
							  
							  {item[0].i_product_type=='Undefined' &&
							  <p>
							  <br></br><br></br><br></br><br></br>
							  </p>  
							  }
							  
                              <p style={{ margin: "2px",  }} inline variant="body1" align="">{item[0].recipient_name_21} </p>
                              <p style={{ margin: "2px",  }} inline variant="body1" align="">{item[0].recipient_phone_20} </p>
                              <p style={{ margin: "2px",   }} inline variant="body1" align=""><i>{item[0].recipient_address_24.replaceAll(",", ", ")}</i> </p>
                              

                        </td>
                  </tr>
                  <tr>
                        <td colspan="8" style={{width: "66.5434%"}}><b>RECEIVED BY CONSIGNEE IN GOOD CONDITION</b></td>
                        <td colspan="4" style={{width: "33.2717%"}}><b>SEAL</b></td>
                  </tr>
                  <tr>
                        <td colspan="8" style={{width: "66.5434%"}}>
                              <p style={{ margin1: "6px", }} align=""><b>Received by (Name):</b>..........................................................</p>
                              <p style={{ margin1: "6px", }} align=""><b>Relation:</b>........................................... <b>Date:</b>..........................</p>
                              <p style={{ margin1: "6px",  }} align=""><b>Identification:</b>.......................................................................</p>
                        </td>
                        <td colspan="4" style={{width: "33.2717%"}}>
                              
                        </td>
                  </tr>
            
            </tbody>
            </table>
            </div>
      </Grid>
}
</>





))}
</Grid>
}   


{/*3X*/}
{props.force_print8==0 &&
<Grid container spacing={2}>
{props.invoice_print.map(item => (
<>
{(item[0].id > start && item[0].id < end) &&
<Grid item xs={12} id='this_class' className="this_class"     style={{marginTop:"10px",   "overflow-x": user.is_delivery_boy !=1?"":"scroll", width: "100%", background: "white"}}>
                              <table>
                                    <tr>
                                          <th colspan="2"><img width="200" src='/assets/images/logo.png' /></th>
                                          <th colspan="2">
                                                <p style={{ margin: "18px 2px 2px 2px", fontSize: "12px" }} inline variant="body1" align=""><b>HOTLINE:</b> {business_hotline}</p>
                                                <p style={{ margin: "18px 2px 2px 2px", fontSize: "10px" }} inline variant="body1" align=""><b>Address:</b> {business_address} </p>
                                                <p style={{ margin: "2px", fontSize: "8px" }} inline variant="body1" align=""><b>Email: </b>{business_email}</p>
                                                <p style={{ margin: "2px", fontSize: "8px" }} inline variant="body1" align=""><b>Web:</b> {business_web}</p>
                                          </th>
                                          <th colspan="2">
                                                <p style={{ margin: "2px", fontSize: "14px" }} inline variant="body1" align="center"><Barcode height="50" value={item[0].id} /></p>
                                          </th>
                                    </tr>

                                    <tr>
                                          <th style={{ color: "rgb(0 0 0 / 88%)", background: "rgb(0 0 0 / 26%)" }} align="left" >Product Type</th>
                                          <th style={{ color: "rgb(0 0 0 / 88%)", background: "rgb(0 0 0 / 26%)" }} align="left" >Product Priority</th>
                                          <th style={{ color: "rgb(0 0 0 / 88%)", background: "rgb(0 0 0 / 26%)" }} align="left" >Shipment Method</th>
                                          <th style={{ color: "rgb(0 0 0 / 88%)", background: "rgb(0 0 0 / 26%)" }} align="left" >Packaging Type</th>
                                          <th style={{ color: "rgb(0 0 0 / 88%)", background: "rgb(0 0 0 / 26%)" }} align="left" >Ref. No.</th>
                                          <th style={{ color: "rgb(0 0 0 / 88%)", background: "rgb(0 0 0 / 26%)" }} align="left" >Pickup Date</th>
                                    </tr>

                                    <tr>
                                          <td   >{item[0].i_product_type != "Undefined"? item[0].i_product_type : "‐ " }</td>
                                          <td   >{item[0].i_product_type != "Undefined"? item[0].i_priority : " " }</td>
                                          <td   >{item[0].i_product_type != "Undefined"? item[0].i_shipment_method : " " }</td>
                                          <td   >{item[0].i_product_type != "Undefined"? item[0].i_packaging_type : " " }</td>
                                          <td   >{item[0].i_product_type != "Undefined"? item[0].sender_ref_no_4 : " " }</td>
                                          <td   >{item[0].i_product_type != "Undefined"? item[0].pickup_date_3 : " " }</td>
                                    </tr>


                                    <tr>
                                          <th colspan="1">Sender</th>
                                          <th colspan="3">Recipient</th>
                                          <th colspan="2">Payment Information</th>
                                    </tr>

                                    <tr>
                                          <td colspan="1">
                                                <p style={{ margin: "2px", fontSize: "14px" }} inline variant="body1" align="">{item[0].sender_name_6}</p>
                                                <p style={{ margin: "2px", fontSize: "14px" }} inline variant="body1" align="">{item[0].sender_phone_5}</p>
                                                <p style={{ margin: "2px", fontSize: "14px" }} inline variant="body1" align="">{item[0].clients!='Booking Clients'? item[0].clients : ": "  }</p>
												
												{item[0].clients !=item[0].client_branch &&
												
												                                                <p style={{ margin: "2px", fontSize: "14px" }} inline variant="body1" align="">{item[0].client_branch}</p>
	
												}
												

                                          </td>

                                          <td colspan="3">
                                                <p style={{ margin: "2px", fontSize: "14px" }} inline variant="body1" align="">{item[0].recipient_name_21}</p>
                                                <p style={{ margin: "2px", fontSize: "14px" }} inline variant="body1" align="">{item[0].recipient_address_24.replaceAll(",", ", ")}</p>
                                                <p style={{ margin: "2px", fontSize: "14px" }} inline variant="body1" align="">{item[0].recipient_phone_20}</p>
                                          </td>

                                          <td style={{ textAlign: "right", paddingRight: "5px" }}>
                                                {item[0].collection_amount > 0 &&
                                                      <p style={{ margin: "2px", fontSize: "14px" }} align=""><b>Collection Amount: </b>{item[0].collection_amount.toLocaleString()}</p>
                                                }

                                                {item[0].cod_cost_percent > 0 &&
                                                      <p style={{ margin: "2px", fontSize: "14px" }} align=""><b>COD Charge: </b>{item[0].cod_cost_percent.toLocaleString()}</p>
                                                }

                                                {item[0].delivery_cost_amount > 0 &&
                                                      <p style={{ margin: "2px", fontSize: "14px" }} align=""><b>Delivery Charge: </b>{item[0].delivery_cost_amount.toLocaleString()}</p>
                                                }


                                                {(item[0].i_delivery_status == 'Return in process' || item[0].i_delivery_status == 'Return Received') && item[0].return_cost_amount > 0 &&

                                                      <p style={{ margin: "2px", fontSize: "14px" }} align=""><b>Return Charge: </b>{item[0].return_cost_amount.toLocaleString()} </p>

                                                }

                                          </td>
                                          <td  >
                                                <p style={{ margin: "2px", fontSize: "14px" }} align=""><b>Payment Type: </b>  {item[0].i_product_type != "Undefined"? item[0].i_payment_type : " " }</p>
                                                <p style={{ margin: "2px", fontSize: "14px" }} align=""><b>Total Charge: </b>
												
												{item[0].i_product_type != "Undefined"? 

<>
                                                      {(item[0].i_delivery_status == 'Return in process' || item[0].i_delivery_status == 'Return Received') && item[0].return_cost_amount > 0 &&
                                                            <>{(parseInt(item[0].collection_amount) + parseInt(item[0].cod_cost_percent) + parseInt(item[0].return_cost_amount)).toLocaleString()}</>



                                                      }
                                                      {(item[0].i_delivery_status != 'Return in process' && item[0].i_delivery_status != 'Return Received') &&
                                                            <>{(parseInt(item[0].collection_amount) + parseInt(item[0].cod_cost_percent)).toLocaleString()}</>
                                                      }
</>

												: " " }
												
												


                                                </p>
                                          </td>
                                    </tr>
                                    <tr>
                                          <th align="left" colspan="2">Remarks/Description of Goods</th>
                                          <th align="left" colspan="2">Picked By</th>
                                          <th align="left" colspan="2">For Customer</th>
                                    </tr>

                                    <tr>
                                          <td colspan="2">
                                          </td>
                                          <td colspan="2">

                                                <p style={{ margin: "2px", fontSize: "14px" }} align="">{item[0].i_product_type != "Undefined"? item[0].creator : "" }</p>
                                                <p style={{ margin: "2px", fontSize: "14px" }} align="">{item[0].i_product_type != "Undefined"? item[0].created_branch : "" }</p>

                                          </td>
                                          <td colspan="2">
                                                <p style={{ margin: "2px", fontSize: "14px" }} align=""><b>Received by (Name):</b>..........................................................</p>
                                                <p style={{ margin: "2px", fontSize: "14px" }} align=""><b>Relation:</b>................................. <b>Date:</b>......................</p>
                                                <p style={{ margin: "2px", fontSize: "14px" }} align=""><b>Identification:</b>..............................................................</p>
                                          </td>
                                    </tr>
                              </table>

                              <table style={{width:"100%"}}>
                                    <tr>
                                          <td colspan="1" align="left" ><b>Service:</b> {item[0].i_product_type != "Undefined"? item[0].services : item[0].services } </td>
                                          {props.tracking == 1 &&<td colspan="1" align="left" ><b>Delivery Status: </b>



                                                {item[0].i_delivery_status == 'Exception' &&
                                                      <>&nbsp; {item[0].i_delivery_status}
                                                            <i> Reason:</i> {item[0].i_return_cause}     by  {item[0].delivery_boy_id_}  ({item[0].delivery_boy_id})
                                                      </>
                                                }


                                                {(item[0].i_delivery_status == 'Return in process' || item[0].i_delivery_status == 'Return Received') &&
                                                      <>
                                                            &nbsp; {item[0].i_delivery_status}
                                                            <i>&nbsp;Exception -  </i> (Reason: {item[0].i_return_cause})     by  {item[0].delivery_boy_id_}  ({item[0].delivery_boy_id})
                                                      </>
                                                }

                                                {item[0].i_delivery_status == 'Delivered' &&

                                                      <>
                                                            &nbsp; {item[0].i_delivery_status}
                                                            {item[0].delivery_boy_id_ &&
                                                                  <>
                                                                        <i>- by</i>  {item[0].delivery_boy_id_}  ({item[0].delivery_boy_id})
                                                                  </>
                                                            }

                                                            {item[0].i_relation &&

                                                                  <><br></br>
                                                                        <i>to -</i>  {item[0].i_relation} : ({item[0].i_relation_person})
                                                                  </>
                                                            }
                                                      </>
                                                }

                                                {item[0].i_delivery_status == 'Out for Delivery' &&

                                                      <>
                                                            {item[0].i_delivery_status}

                                                            {item[0].delivery_boy_id_ &&

                                                                  <>
                                                                        <i>&nbsp; - by</i>  {item[0].delivery_boy_id_}  ({item[0].delivery_boy_id})
                                                                  </>

                                                            }
                                                      </>
                                                }


                                                {item[0].i_delivery_status != 'Return Received' && item[0].i_delivery_status != 'Out for Delivery' && item[0].i_delivery_status != 'Delivered' && item[0].i_delivery_status != 'Return in process' && item[0].i_delivery_status != 'Exception' &&

                                                      <>
                                                            {item[0].i_delivery_status}

                                                      </>

                                                }

                                          </td>}
                                          {props.tracking == 1 &&
                                          <td colspan="1" align="left" ><b>Branch:</b> { } {item[0].current_branch}</td>
}
                                    </tr>
                              </table>





                              


                              
 
{props.tracking == 1 &&
 
      <Grid       sx={{  display: { xs: "none", lg: "block" } }} item xs={12} id='this_class' className="this_class" style={{ backgroundColor: "white", marginTop:"30px", padding: "5px", borderRadius: "3px", }}>


<table>
<tr>
      <th style={{ color: "white", background: "black" }} colspan="10" align="center">Collection & Delivery charge: {props.invoice_print[0][0]?.payment}</th>
      </tr>
{(props.invoice_print[0][0]?.collection_trxid_  ) && 


      <tr>
            <td colspan="1" align="left" ><b>Collection Transaction Date: </b> 
            {props.invoice_print[0][0]?.collection_trxid_} by {props.invoice_print[0][0]?.collection_trxid_creator}
            </td>
      </tr>
}
{(props.invoice_print[0][0]?.charge_trxid_) && 

      <tr>
            <td colspan="1" align="left" ><b>Delivery Charge Transaction Date: </b> 
            {props.invoice_print[0][0]?.charge_trxid_} by {props.invoice_print[0][0]?.charge_trxid_creator}
            </td>
      </tr>
}

</table>
<br></br>

                  <div className="tracking" id="tracking">

                        <table>
                              <tr>
                                    <th style={{ color: "white", background: "black" }} colspan="10" align="center">Tracking Status</th>
                              </tr>

                              <tr>
                                    <th colspan="1" align="left" >Date Time</th>
                                    
                                    {/*<th   colspan="1"   align="left" >Action Key</th>*/}

                                    <th colspan="3" align="left" >Current Tracking Status</th>
                                    <th colspan="1" style={{ textAlign: "center" }} align="left" >Origin</th>
                                    <th colspan="1" style={{ textAlign: "center" }} align="left" >Destination</th>


                                    <th colspan="3" style={{ width: "20%" }} align="left" >Updated</th>
                                    <th colspan="1" align="left" >Remarks</th>
                              </tr>

                              {props.tracking_data &&
                                    <>
                                          {props.tracking_data.map(item => (
                                                <tr>
                                                      <td colspan="1" >{item['date']} {formatAMPM(item['time'])}</td>
                                                      
                                                      {/*<td  colspan="1" >{item['action_type']} </td>*/}



                                                      <td colspan="3" >{item['i_tracking_status_id_19']}

                                                            {(item['delivery_boy_id_'] && item['i_delivery_status_id_18'] == 'Out for Delivery') &&
                                                                  <>
                                                                        <b> &nbsp;Assign: </b> {item['delivery_boy_id_']} ({item['delivery_boy_id']})
                                                                  </>
                                                            }

                                                            {item['i_relation'] && item['i_relation'] != 'Self' &&
                                                                  <>
                                                                        <b>&nbsp;to: </b>{item['i_relation_person']}  (Relation:{item['i_relation']})
                                                                  </>
                                                            }

                                                            {item['i_relation'] && item['i_relation'] == 'Self' &&
                                                                  <>
                                                                        <b>&nbsp;to: </b>({item['i_relation']})  
                                                                  </>
                                                            }


                                                            {(item['i_return_cause'] && item['i_delivery_status_id_18'] == 'Exception') &&
                                                                  <>
                                                                        <b> &nbsp;Cause: </b> {item['i_return_cause']}
                                                                  </>
                                                            }

                                                      </td>

                                                      {item['source'] == item['destination'] &&
                                                            <td style={{ textAlign: "center" }} colspan="2" >{item['source']} </td>
                                                      }


                                                      {item['source'] != item['destination'] &&
                                                            <>
                                                                  <td style={{ textAlign: "center" }} colspan="1" >{item['source']} </td>
                                                                  <td style={{ textAlign: "center" }} colspan="1" >{item['destination']} </td>
                                                            </>
                                                      }




                                                      <td colspan="3" >
                                                            <Stack direction="row" spacing={1}>
                                                                  <Chip label={item['i_delivery_status_id_18']} variant="outlined" size="small" /> &nbsp; by  {item['creator']}

                                                            </Stack>
                                                      </td>


                                                      <td colspan="1" >{item['pickup_reference_id']} </td>

                                                </tr>
                                          ))}
                                    </>

                              }

                              {props.tracking_data == '' &&
                                    <td colspan="9" style={{ textAlign: "center" }} ><i>No Data Found</i></td>
                              }



                        </table>

 

  

{<p style={{textAlign:"center", marginTop:"10px" , background:"#a9a9a952", padding: "10px"}}>     <p>POD Scan Copy</p>                   
<img  style={{  "max-height":"600px" }}  onError = {e => e.target.style.display = 'none'}

src={"http://139.59.120.225/api/image/"+item[0].id} />

</p>}








                  </div>
<br></br>
      </Grid>
}

</Grid>
}
</>

 ))}

{/*Tracking*/}



</Grid>
}




 
 
            </div>
      );

});

export default React.memo(InvoiceBulk);