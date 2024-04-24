import { Icon,  Autocomplete, Grid, Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Breadcrumb } from "app/components";
import useAuth from 'app/hooks/useAuth';
import axios from "axios";
import { useEffect, useState } from 'react';
import { base_url } from '../../../utils/constant';
import { DatePicker } from 'antd';
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';
import Select from 'react-select'
import { TextValidator } from "react-material-ui-form-validator";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';

axios.defaults.headers.common['accessToken'] =  'JWT '+window.localStorage.getItem('accessToken');
const TextField = styled(TextValidator)(() => ({ width: "100%", marginBottom: "16px", }));

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
})); 

 
//{ name: "Material", path: "/material" },
const PickupReport = () => {
    const {format} = require('date-fns');
  const filterItems = (arr, field, value) => { try { if (field != null) { return arr.filter((item) => { return item[field].includes(value) }) }} catch (error) { console.error(error);}}
  const filterItemsequal = (arr, field, value) => { try { if (field != null) { return arr.filter((item) => { return item[field]==value }) }} catch (error) { console.error(error);}}
    const { RangePicker } = DatePicker;
    const [get_search_data_tracking, setget_search_data_tracking] = useState([]);
    const dateFormat = 'YYYY-MM-DD';
 
    const { logout, user } = useAuth();

 
//Define function with three arguments array, p1 and p2
function dataCount(array, p1, p2) {
    const group = {};
  
   // initialize a for loop
    for (let i = 0; i < array.length; i++) {
  
  
      //adding properties of array with _
      const batch = array[i][p1] + ' ['+array[i][p2]+']';
  
      // Conditional statements if 
      if (!group[batch]) {
        group[batch] = 1;
      } else {
        group[batch]++;
      }
    }
  
    //return group value
    return group;
  }


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


      const [wait, setwait] = useState(null);
      const [Sort, setSort] = useState([]);
      const [deliv, setdeliv] = useState([]);
	  
	  
	  
	  
	  
	  
	  
	  
	  
        const getData_sc_down = async () => {
			
				if(delivery_boy_id>0){
				        const all_access = localStorage.getItem('all_access');
        var firsr_page_json =[]
 
 
 //
	             firsr_page_json = {
 
                range_start:range_start,
                range_end:range_end,
				 "delivery_boy_id":delivery_boy_id,
					"rows_per_page": "10000000",
					"page_no": "1"
            }
  
            setwait("Please Wait......")


console.log(firsr_page_json,'firsr_page_json')

            await axios.post(base_url + "pickup-query-app", firsr_page_json).then((res) => {
                console.log(res,'resres')


              const my_json = []
                var cc = 0;
				
				
				
                var get_ = res.data.result;
				//var boy_ = res.data.delivery_boy;
				
				
				
				
				 /*for (var i=0; i < boy_.length; i++) {
                    let obj= boy_[i]
					var filter_this_user = filterItemsequal(get_, 'delivery_boy_id', obj.userID);
					
					var out=filterItemsequal(filter_this_user, 'i_delivery_status_id_18', 12)[0]?._count?.id || 0;
					var deli=filterItemsequal(filter_this_user, 'i_delivery_status_id_18', 6)[0]?._count?.id || 0;
					var excep=filterItemsequal(filter_this_user, 'i_delivery_status_id_18', 10)[0]?._count?.id || 0;
					
					
                     var x_data = {
                        "Id": i + 1,
                        "userID":obj.userID,
						"userName":obj.userName,
						"employee_id":obj.employee_id,
						"out":out,		
						"deli":deli,
						"excep":excep,						
                    }
					
					if(out>0 || deli>0 || excep>0){
						my_json.push(x_data);
					} 
                }
				
                
				console.log("vvv3",my_json);
                setwait("Processing....")

                for (var i=0; i < get_.length; i++) {
                    let obj= get_[i]
                     var x_data = {
                        "Id": i + 1,
                        "Date":obj.date,
                        "Action Type":obj.action_type,  
                        "Ref":obj.pickup_reference_id,
                        "Delivery Status":obj.i_delivery_status.i_delivery_status,
                        "Tracking Status":obj.i_tracking_status.i_tracking_status,
                        "Origin":obj.branch_destination.branch,
                        "Destination":obj.branch_source.branch,
                        "Creator":obj.creator_.userName,            
                    }


                    my_json.push(x_data);
                    
                } */

                /*const dataGrouped = dataCount(my_json , 'Creator','Delivery Status');


                let yy=JSON.stringify(dataGrouped)
                let resultyy = yy 
                resultyy = resultyy.replace('{', "");
                resultyy = resultyy.replace('}', "");

                const array = resultyy.split(',');
				let str=""
                for(let j=0; j<array.length; j++){
                    str=str+"<p>"+array[j].replace('"', "").replace('"', "")+"</p>"
                }

                setSort(str)

                console.log(dataGrouped,'my_json')

                setget_search_data_tracking(my_json); */

                 Export(get_,delivery_boy_name+ " (Delivery Boy) "+range_start+" to "+range_end)


 
                setwait(null)
            }
			
			
			
			
			
			).catch(function (error) { if (error.response) { setwait("") } });	
					
				}else{
					 alert("Please select a delivery boy for download");
				}


        };
		
		
		
		
		
		
		
		
		
		
		
        const getData_sc = async () => {



        const all_access = localStorage.getItem('all_access');
        var firsr_page_json =[]
 
            firsr_page_json = {
 
                range_start:range_start,
                range_end:range_end,
 delivery_boy_id:delivery_boy_id
            }
  
            setwait("Please Wait......")


console.log(firsr_page_json,'firsr_page_json1')

            await axios.post(base_url + "delivery_boy_repo", firsr_page_json).then((res) => {
                console.log(res,'resres')


              const my_json = []
                var cc = 0;
				
				
				
                var get_ = res.data.data;
				var boy_ = res.data.delivery_boy;
				
				
				var boy_col=[{
						value:null,
						label:"All Delivery Boy",
					}]
				
				
				for (var i=0; i < boy_.length; i++) {
                    let obj= boy_[i]
					
					boy_col.push({
						value:obj.userID,
						label:obj.userName,
					});
					
					
					var filter_this_user = filterItemsequal(get_, 'delivery_boy_id', obj.userID);
					
					var out=filterItemsequal(filter_this_user, 'i_delivery_status_id_18', 12)[0]?._count?.id || 0;
					var deli=filterItemsequal(filter_this_user, 'i_delivery_status_id_18', 6)[0]?._count?.id || 0;
					var excep=filterItemsequal(filter_this_user, 'i_delivery_status_id_18', 10)[0]?._count?.id || 0;
					
					
                     var x_data = {
                        "Id": i + 1,
                        "userID":obj.userID,
						"userName":obj.userName,
						"employee_id":obj.employee_id,
						"out":out,		
						"deli":deli,
						"excep":excep,						
                    }
					
					if(out>0 || deli>0 || excep>0){
						
						my_json.push(x_data);
					} 
                }
				
                setdeliv(boy_col)
				console.log("vvv3",my_json);
                setwait("Processing....")
 

                setget_search_data_tracking(my_json); 

                //Export(my_json,"All Tracking "+range_start+" to "+range_end)
                setwait(null)
            }).catch(function (error) { if (error.response) { setwait("") } });
        };
        let delivery_boyList =[]
     useEffect(() => {
      getData_sc();
 
    }, []); 

    const [range_start, setrange_start] = useState(format(new Date(),'yyyy-MM-dd'));
    const [range_end, setrange_end] = useState(format(new Date(),'yyyy-MM-dd'));
    const [this_date, setthis_date] = useState(null);
    const [choice, setUserChoice] = useState(6);
    const [delivery_boy_id, setdelivery_boy_id] = useState(null); 
    const [delivery_boy_name, setdelivery_boy_name] = useState(null); 
  
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


      const options = [
        { value: '0', label: 'All' },
        { value: '2', label: 'Booking' },
        { value: '3', label: 'Processing' },
        { value: '4', label: 'Received' },
        { value: '5', label: 'In Transit' },
        { value: '6', label: 'Delivered' },
        { value: '7', label: 'Return in process' },
        { value: '8', label: 'Return Received' },
        { value: '9', label: 'Hold' },
        { value: '10', label: 'Exception' },
        { value: '12', label: 'Out for Delivery' },
        
      ]
    
 
             
return (
  <Container>
    <Box className="breadcrumb">
      <Breadcrumb routeSegments={[{ name: "Delivery Boy Report" }]} />{delivery_boy_name}
    </Box>

    <Grid container spacing={3}>
      <Grid item lg={3} md={3} sm={12} xs={12}>
        {" "}
        <RangePicker onChange={handleDateChange} format={dateFormat} />{" "}
      </Grid>
  


                <Grid item lg={3} md={3} sm={12} xs={12}>

                <Select
        placeholder={"Select Delivery Boy"}
        
                    onChange={(choice) => { 
                      console.log(choice,'choice')
                       
                        
                                if(choice.value!=null){ 
                                    setdelivery_boy_id(choice.value) 
									setdelivery_boy_name(choice.label)
                                }else{ 
                                  setdelivery_boy_id(null) 
                                } 

                    } } options={deliv} />   
</Grid> 



      <Grid item lg={1} md={1} sm={6} xs={6} >
	  <Button onClick={getData_sc} variant="outlined">Search</Button>
        
      </Grid>
	        <Grid item lg={1} md={1} sm={6} xs={6} >
	  <Button onClick={getData_sc_down} variant="outlined">Download</Button>
        
      </Grid>
    </Grid>

    {wait && (
      <>
        <Grid container spacing={3}>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <h6 style={{ color: "red", "font-size": "20px" , "margin-left":"20px"}}>{wait} </h6>
          </Grid>
        </Grid>
      </>
    )}

    <Grid container spacing={3}>
      <Grid item lg={6} md={6} sm={12} xs={12}>
       <div style={{padding:"20px"}}>
	   
	   
	   <p>Showing Result: {range_start} to {range_end}</p>
	   
	<TableContainer >
      <Table  aria-label="simple table">
        <TableHead >
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Out for delivery</TableCell>
            <TableCell align="right">Exception</TableCell>
            <TableCell align="right">Deliverd</TableCell>
           </TableRow>
        </TableHead>
        <TableBody>
          {get_search_data_tracking.map((info) => (
            <TableRow  style={{padding:"5px"}}
              key={info.userName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
 
              <TableCell  component="th" scope="row" align="">{info.userName} </TableCell>
			  <TableCell align="right">{info.out} </TableCell>
			  <TableCell align="right">{info.excep} </TableCell>
			  <TableCell align="right">{info.deli} </TableCell>
 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
	
	{get_search_data_tracking?.length==0 && 
		<p style={{color:"red", textAlign:"center"}}>
			No Result Found
		</p>
	}
 
             
        </div>
      </Grid>
    </Grid>

    <div style={{ height: 400, width: "100%" }}></div>
  </Container>
);

};

export default PickupReport;


 