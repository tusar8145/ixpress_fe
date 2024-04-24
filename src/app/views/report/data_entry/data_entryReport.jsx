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
    const filterItemsequal = (arr, field, value) => { try { if (field != null) { return arr.filter((item) => { return item[field] == value }) } } catch (error) { console.error(error); } }
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

        const getData_sc = async () => {



        const all_access = localStorage.getItem('all_access');
        var firsr_page_json =[]
 
            firsr_page_json = {
                user_id:user.id,
                range_start:range_start,
                range_end:range_end,
                choice:choice,
                delivery_boy_id:delivery_boy_id
            }
  
            setwait("Please Wait......")


console.log(firsr_page_json,'firsr_page_json')

            await axios.post(base_url + "get_tracking_all", firsr_page_json).then((res) => {
                console.log(res,'resres')


              const my_json = []
                var cc = 0;
                var get_ = res.data.result;
                
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
                    
                } 

                const dataGrouped = dataCount(my_json , 'Creator','Delivery Status');


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

                setget_search_data_tracking(my_json); 

                Export(my_json,"All Tracking "+range_start+" to "+range_end)
                setwait(null)
            }).catch(function (error) { if (error.response) { setwait("") } });
        };
        let delivery_boyList =[]
    useEffect(() => {
      //  getData_sc();
      let kk=localStorage.getItem("arr_delivery_boy")
      if(kk){
        let db=JSON.parse(kk)
        setdeliv(db)
 
        console.log(kk,db,'ddddddddd')
      }
      
    }, []);

    const [range_start, setrange_start] = useState(null);
    const [range_end, setrange_end] = useState(null);
    const [this_date, setthis_date] = useState(null);
    const [choice, setUserChoice] = useState(6);
    const [delivery_boy_id, setdelivery_boy_id] = useState(null); 

  
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
                <Breadcrumb routeSegments={[{ name: "Data Entry Report" }]} />
            </Box>







            <Grid container spacing={3}>
                <Grid item lg={3} md={3} sm={12} xs={12}> <RangePicker onChange={handleDateChange} format={dateFormat} /> </Grid>

                <Grid item lg={3} md={3} sm={12} xs={12}>
                        <Select
        placeholder={"Select Company"}
        defaultValue={{ value: '6', label: 'Delivered' }}
                    onChange={(choice) => { 
                        if(choice.value==0){setUserChoice(null);}else{
                          setUserChoice(choice.value);
                        }
                        
                            
        
                    } } options={options} />                    
                </Grid>

                <Grid item lg={3} md={3} sm={12} xs={12}>

                <Select
        placeholder={"Select User"}
        
                    onChange={(choice) => { 
                      console.log(choice,'choice')
                       
                        
                                if(choice.value!=null){ 
                                    setdelivery_boy_id(choice.value) 
                                }else{ 
                                  setdelivery_boy_id(null) 
                                } 
                        
                            
        
                    } } options={deliv} />   




 
</Grid> 


                <Grid item lg={3} md={3} sm={12} xs={12}><Stack spacing={3}><Icon style={{ cursor: "pointer", float: "right" }} onClick={getData_sc}>download</Icon> </Stack>
                </Grid>
            </Grid>

{wait && 
<>

            <Grid container spacing={3}>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                   <h6 style={{"color":"red", "font-size":"20px"}}>{wait} </h6>                   
                </Grid>
            </Grid>
</>}



            <Grid container spacing={3}>
  

            <Grid item lg={6} md={6} sm={12} xs={12}>

          
{Sort && 
<>
 
<p>  
 
<div dangerouslySetInnerHTML={{__html: Sort}}></div>
</p> 

 
</>}
 
</Grid>

                
            </Grid>


            <div style={{ height: 400, width: '100%' }}      >
 
            </div>



        </Container>
    );
};

export default PickupReport;


 