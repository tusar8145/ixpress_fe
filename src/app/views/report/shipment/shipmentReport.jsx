import { Icon, Stack, Button,  Grid,   } from "@mui/material";
import { Box, styled } from "@mui/system";
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Breadcrumb } from "app/components";
import useAuth from 'app/hooks/useAuth';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { base_url } from '../../../utils/constant';
import "../myStyle.css";
import jsPDF from 'jspdf';
import { DataGridPro } from '@mui/x-data-grid-pro';
import Select from 'react-select';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


axios.defaults.headers.common['accessToken'] =  'JWT '+window.localStorage.getItem('accessToken');
const Alert = React.forwardRef(function Alert(props, ref) { return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;});

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": { 
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));


//{ name: "Material", path: "/material" },
const ShipmentReport = () => {
    const [bran, setbran] = useState([]); 
    const [pickup, setpickup] = useState([]);
    const [get_search_data, setget_search_data] = useState([]);
    const filterItemsequal = (arr, field, value) => { try { if (field != null) { return arr.filter((item) => { return item[field] == value }) } } catch (error) { console.error(error); } }

    const [get_search_data_tracking, setget_search_data_tracking] = useState([]);
    const [table1, settable1] = useState([]);
    const [table2, settable2] = useState([]);
    const [table3, settable3] = useState([]);
    const [table4, settable4] = useState([]);
    
    const [pro, setpro] = useState(0);

    const [destination, setdestination] = useState(null);
    const [source, sesource] = useState(null);
    const [date, setdate] = useState(null);
    const [ref, setref] = useState(null);


    const [search_src, setsearch_src] = useState(null);
    const [search_des, setsearch_des] = useState(null);
    const [alert_def_txt, setalert_def_txt] = useState('Search Completed');
    const [alert_def_class, setalert_def_class] = useState('success');

    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => { if (reason === 'clickaway') { return; } setOpen(false); };

const [branches, setbranches] = useState([]);

const [selectedOption, setSelectedOption] = useState(null);

const options = [];

const handleClick = () =>{ setOpen(true); };

    var gen=0
    var sec=0
    var oth=0

    var counter_=1
 
    const [runsheed, setrunsheed] = useState(0);
    const  printDocument=() => {
        setrunsheed(1)
      }
 
    useEffect(() => {
        if(runsheed==1){
          printDocumentOk()
        }
        
      }, [runsheed]);

    const [general, setgeneral] = useState(0);
    const [security, setsecurity] = useState(0);
    const [others, setothers] = useState(0);

    const  printDocumentOk=() => {
    
        const input = document.getElementById('divToPrint');
    
     
        var doc = new jsPDF("p", "pt", "a4");
     
        // Convert HTML to PDF in JavaScript
        doc.html(input, {
            callback: function(doc) {
                doc.save("ixpress.pdf");
            },
            x: 10,
            y: 10
        });
    
    
    
    
    
        /*html2canvas(input)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png',10);
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'JPEG', 0, 0);
            // pdf.output('dataurlnewwindow');
            pdf.save("runsheed.pdf");
          })*/
        ;
        setrunsheed(0)
      }
    



    const columns2: GridColDef[] = [{ field: 'id', headerName: 'SL', Width: 40,  },
    {
        field: 'action1',
        headerName: 'Direction',
        sortable: false,
        renderCell: (params) => {
          const onClick = async(e) => {
          //  e.stopPropagation(); // don't select this row after clicking
            const api: GridApi = params.api;
            const thisRow: Record<string, GridCellValue> = {};
            api
              .getAllColumns()
              .filter((c) => c.field !== '__check__' && !!c)
              .forEach(
                (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
              );
 
          };
            return <p style={{float:"right"}}>  <Icon>local_shipping</Icon> </p>;
        },
    },    
    
        { field: 'date', headerName: 'Date', minWidth: 120, flex: 1 },
        { field: 'pickup_reference_id', headerName: 'Signature', minWidth: 140, flex: 1 },
        { field: 'source', headerName: 'Origin', minWidth: 160, flex: 1 },
        { field: 'destination', headerName: 'Destination', minWidth: 160, flex: 1 },
        { field: 'total', headerName: 'Transfer Qty', minWidth: 140, flex: 1 },
        
        { field: 'note', headerName: 'Receive Qty', minWidth: 140, flex: 1 },
        { field: '_count', headerName: 'In Transit Qty', minWidth: 140, flex: 1 },
        {
            field: 'action',
            headerName: 'Download',
            sortable: false,
            renderCell: (params) => {
              const onClick = async(e) => {
              //  e.stopPropagation(); // don't select this row after clicking
                const api: GridApi = params.api;
                const thisRow: Record<string, GridCellValue> = {};
                api
                  .getAllColumns()
                  .filter((c) => c.field !== '__check__' && !!c)
                  .forEach(
                    (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
                  );
                  var destination0 = filterItemsequal(bran, 'branch', thisRow.destination)[0];
                  var source0 = filterItemsequal(bran, 'branch', thisRow.source)[0];
                  var destination =destination0.branch_id
                  var source = source0.branch_id
 
                  setdestination(destination0.branch)
                  sesource(source0.branch)
                  setdate(thisRow.date)
                  setref(thisRow.pickup_reference_id)
   
 
const firsr_page_json = {
    "pickup_reference_id": thisRow.pickup_reference_id,

    "i_delivery_status_id_18":5,
    "destination":destination,
    "source":source,
    "date":thisRow.date
}

console.log(firsr_page_json,'firsr_page_json')
await axios.post(base_url + "shipment_report_pickupid", firsr_page_json).then((res) => {
    console.log(res,'jkl')


    const my_json = []
    var cc = 0;
    const get_ = res.data.result;
    const branch = res.data.branch;
    setbran(branch)
 
    var sl=1

    for (var i = 0; i < get_.length; i++) {

        cc++
        var obj = get_[i];
        console.log(obj ,'gggg')


 if(obj.pickup_id_.i_priority_id_3==1){
    gen++
 }

 else if(obj.pickup_id_.i_priority_id_3==2){
    sec++
 }else{
    oth++
 }

        var x_data = {
            id: sl,
            date: obj.pickup_id, 
            updated_at: new Date (obj.date+" "+obj.time).getTime(),
            o_id:obj.id,       }
        sl++
        
     
        my_json.push(x_data);
    }
    setgeneral(gen)
    setsecurity(sec)
    setothers(oth)

    console.log(my_json,'my_json')
    setget_search_data(my_json);

    let p3=JSON.stringify(my_json)
    let p4=JSON.parse(p3)

   let new_my_json = my_json /*p4.sort(function (a, b) {
       return  b.updated_at  -  a.updated_at
   });*/


    
    var start=0
    var tt1=[]
    var tt2=[]
    var tt3=[]
    var tt4=[]
    //var gen=0
    //var sec=0
    for (var i=0; i < new_my_json.length; i++) {
    /*if(my_json[i].i_priority=='General'){
        gen++
    }
    if(my_json[i].i_priority=='Security'){
        sec++
    }*/

        if(start==0){tt1.push(new_my_json[i])}
        if(start==1){tt2.push(new_my_json[i])}
        if(start==2){tt3.push(new_my_json[i])}
        if(start==3){tt4.push(new_my_json[i]); start=-1; }
        start++
    
     }

     //setgeneral(gen)
     //setsecurity(sec)
console.log(tt1,'tt1')
     settable1(tt1)
     settable2(tt2)
     settable3(tt3)
     settable4(tt4)

     printDocument()

//console.log(my_json,'kk')
getData_sc()
});  



                  //setselected_rows(thisRow.id,thisRow)
                 // handleViewDetails(thisRow.id,thisRow)
                 // setpopupOpen(true)
              };
                return <p style={{float:"right"}}><Button onClick={onClick}> <Icon>download</Icon></Button></p>;
            },
        },    
        

    ];  

    const { logout, user } = useAuth();

        const getData_sc = async () => {
            
         

        const all_access = localStorage.getItem('all_access');
        var firsr_page_json =[]

        if(all_access!=1){
            firsr_page_json = {
                "source": user.branch_id,
                "i_delivery_status_id_18": 5, 
            }
        }else{
            firsr_page_json = { 
                "i_delivery_status_id_18": 5, 
                "source":search_src, 
                "destination":search_des}
            
        }

console.log(firsr_page_json,'firsr_page_json')

        if(user.is_marchant!=1){

          
            await axios.post(base_url + "shipment_report", firsr_page_json).then((res) => {
                console.log(res)

                console.log("completed")

if(get_?.length>0){
    setalert_def_txt('Search Completed!'); setalert_def_class('success'); handleClick();

}else{
    setalert_def_txt('No Record Found!'); setalert_def_class('warning'); handleClick();

}


                const my_json = []
                var cc = 0;
                const get_ = res.data.result;
                const branch = res.data.branch;
                setbran(branch)

                let obj_y=[{ value: 999, label: "<< Select Branch >>" }]
                for (let y=0; y<branch.length; y++){
                    obj_y.push({ value: branch[y].branch_id, label: branch[y].branch },)
                }
                 

                setbranches(obj_y)
 
                var sl=1
                for (var i = 0; i < get_.length; i++) {
                    cc++
                    var obj = get_[i];
                    var filter2 = filterItemsequal(branch, 'branch_id', obj.destination);
                    var filter3 = filterItemsequal(branch, 'branch_id', obj.source);
                    //console.log(filter2, 'branch')

 
                    var next =''

                    try {
                        if(obj.date==get_[i+1].date && obj.pickup_reference_id==get_[i+1].pickup_reference_id && obj.pickup_reference_id!=null){
                            next=get_[i+1]._count.id
                        } 
                    } catch (error) {
                        
                    }

                    var x_data = {
                        id: sl,
                        date: obj.date,
                        source: filter3[0].branch,
                        destination: filter2[0].branch,
                        pickup_reference_id: obj.pickup_reference_id,
                        _count: obj._count.id,
                        rtn: '0',
                        note: next,
                        total:next+obj._count.id
                    }
                    sl++
                    
                    if(next!=''){i=i+1}
                    my_json.push(x_data);
                }


                setget_search_data_tracking(my_json);



            });  
        }



        };

    useEffect(() => {

        getData_sc();
    }, []);


    return (




        <Container>

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alert_def_class} sx={{ width: '100%' }}>
          {alert_def_txt}<br></br>
        </Alert>
    </Snackbar>

            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Shipment Report" }]} />
            </Box>
 

            <Grid container spacing={6}>

                <Grid item lg={3} md={3} sm={6} xs={6}>
                    <p
                        style={{

                            marginTop: "-1px",
                            marginLeft: "5%",
                            cursor: "pointer",

                        }}
                        onClick={() => {
                            if (pro == 0) {
                                setpro(1)
                            } else {
                                setpro(0)
                            }

                        }
                        }

                    >
                        {pro == 0 &&
                            <x style={{ color: "blue" }}>
                                Enable Multi Column Filter
                            </x>
                        }
                        {pro == 1 &&
                            <x style={{ color: "greeb" }}>
                                Disable Multi Column Filter
                            </x>
                        }

                    </p>
                </Grid>
                <Grid item lg={1} md={1} sm={3} xs={3}>
                <Icon style={{cursor:"pointer", float: "right"}} onClick={getData_sc}>refresh</Icon> 
                
                </Grid>
                <Grid item lg={4} md={4} sm={6} xs={6}>

                    <Select
                        placeholder={"Select Origin"}
                        defaultValue={search_src}
                         
                        onChange={(choice) => {
                            setsearch_src(choice.value)
                            if (choice.value == 999) {
                                setsearch_src(null)
                            } else {

                            }

                        }}
                        options={branches}
                    />
                </Grid>
                <Grid item lg={4} md={4} sm={6} xs={6}>
                    <Select
                        placeholder={"Select Destination"}
                        defaultValue={selectedOption}
                        onChange={(choice) => {
                            setsearch_des(choice.value)
                            if (choice.value == 999) {
                                setsearch_des(null)
                            } else {

                            }

                        }}
                        options={branches}
                    />

                </Grid>
            </Grid>


    



            <Stack spacing={3}  style={{ marginTop:'30px' }} >
                


                <div style={{ height: 400, width: '100%' }}      >

{ pro==0 && 
                    <DataGrid  rowHeight={35}
                    components={{ Toolbar: GridToolbar }}
                    rows={get_search_data_tracking}
                    columns={columns2}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />
}

{ pro==1 && 
                    <DataGridPro  rowHeight={35}
                    components={{ Toolbar: GridToolbar }}
                    rows={get_search_data_tracking}
                    columns={columns2}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />
}


                </div>

            </Stack>


            { runsheed==1 &&
            <Grid container spacing={6} >
    <Grid item md={12} lg={12} sm={12} xs={12}>
    <div>
      <div id="divToPrint" className="mt4 this_class_sm" style={{
        
        width: '575px',
        padding: '10px',

        marginLeft: 'auto',
        marginRight: 'auto'
      }}>

<Grid container spacing={2}>
<Grid item xs={12} style={{fontSize: "8px"}}>
{get_search_data.map((item, index) => (   
    <>
        { index==0 &&
                <> 
               <p style={{textAlign:'center'}}>
               <h4><img  style={{width: "140px"}} src='/assets/images/logo.png' />    </h4> 
                
                 Shipment - <b>Origin: </b> {source}   &nbsp; &nbsp;&nbsp; &nbsp;<b>To: </b>  {destination}  &nbsp; &nbsp;&nbsp; &nbsp;<b> Sign: </b>{ref}   &nbsp; &nbsp;&nbsp; &nbsp;<b> Date: </b>{date}  <hr></hr></p>
                </>
                 }
    </> 
))}
</Grid>
<Grid item xs={3}>
<table style={{fontSize: "8px"}}>
    {table1.map((item, index) => (
        <>
            { index==0 &&
                <tr>
                    <td>#SL</td>
                    <td>HWB NO.</td>
                </tr> 
            }
            <tr>
                <td>{counter_++}</td>
                <td>{item.date}</td>
            </tr> 
        </>
    ))} 
</table>
</Grid>
<Grid item xs={3}>
<table style={{fontSize: "8px"}}>
    {table2.map((item, index) => (
        <>
            { index==0 &&
                <tr>
                    <td>#SL</td>
                    <td>HWB NO.</td>
                </tr> 
            }
            <tr>
                <td>{counter_++}</td>
                <td>{item.date}</td>
            </tr> 
        </>
    ))} 
</table>
</Grid>
<Grid item xs={3}>
<table style={{fontSize: "8px"}}>
    {table3.map((item, index) => (
        <>
            { index==0 &&
                <tr>
                    <td>#SL</td>
                    <td>HWB NO.</td>
                </tr> 
            }
            <tr>
                <td>{counter_++}</td>
                <td>{item.date}</td>
            </tr> 
        </>
    ))} 
</table>
</Grid>
<Grid item xs={3}>
<table  style={{fontSize: "8px"}}>
    {table4.map((item, index) => (
        <>
            { index==0 &&
                <tr>
                    <td>#SL</td>
                    <td>HWB NO.</td>
                </tr> 
            }
            <tr>
                <td>{counter_++}</td>
                <td>{item.date}</td>
            </tr> 
        </>
    ))} 
</table>
</Grid>


            <Grid item xs={3}  style={{fontSize: "8px"}}>
            <br></br>
                <b>Prepared by:</b> <br></br><i>{user.name}</i><br></br> ___________________ 
            </Grid>
            <Grid item xs={6}  style={{fontSize: "10px"}}>
                    <br></br>
                    <table>
                    <tr>
                        <th>Security</th>
                        <th>General</th>
                        <th>Online Products</th>
                        <th>Total</th>
                    </tr>
                    <tr>
 
                        <th>{security}</th>
                        <th>{general}</th>
                        <th>{others}</th>
                        <th>{counter_-1}</th>

                    </tr>
                    </table>
            </Grid>

            <Grid item xs={3} style={{fontSize: "8px",textAlign: "right"}}>
            <br></br>
                Shipment Received By <br></br> <br></br> ___________________
            </Grid>

</Grid>



       </div>
    </div>
    </Grid>
</Grid>
}

        </Container>
    );
};

export default ShipmentReport;