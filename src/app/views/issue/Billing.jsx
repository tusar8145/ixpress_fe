import { Icon, Grid, Button,Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { DataGrid, GridApi, GridCellValue, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Breadcrumb } from "app/components";
import useAuth from 'app/hooks/useAuth';
import axios from "axios";
import { useEffect, useState } from 'react';
import { Span } from 'app/components/Typography';
import { base_url } from '../../utils/constant';
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Autocomplete from '@mui/material/Autocomplete';
import * as React from 'react';

 import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
 import Typography from '@mui/material/Typography';
 import Box1 from '@mui/material/Box';
axios.defaults.headers.common['accessToken'] =  'JWT '+window.localStorage.getItem('accessToken');

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
})); 

const TextField = styled(TextValidator)(() => ({ width: "100%", marginBottom: "16px", }));
const filterItems = (arr, field, value) => { try { if (field != null) { return arr.filter((item) => { return item[field].includes(value) }) }} catch (error) { console.error(error);}}
const filterItems_mul = (arr, field, value) => { try { if (field != null) { return arr.filter((item) => {  return value.includes(item[field])  }) } } catch (error) { console.error(error);}}
const filterItems2 = (arr, field, value) => { try { if (field != null) { return arr.filter((item) => { return item[field]==value }) } } catch (error) { console.error(error);}}
const filterItemsequal = (arr, field, value) => { try { if (field != null) { return arr.filter((item) => { return item[field]==value }) }} catch (error) { console.error(error);}}


//{ name: "Material", path: "/material" },
const AddPod = () => {

  const handleSubject = (event) => {  setsubject(event.target.value); };
  const handleIssue = (event) => {  setissue(event.target.value); };
   const handleIssueReply = (event) => {  setpostreply(event.target.value); };

  const [error, seterror] = useState(0);
  const [error2, seterror2] = useState(0);
  const [subject, setsubject] = useState('');
  const [issue, setissue] = useState('');

  const [issue_id, setissue_id] = useState(null);

  const [getreply, setgetreply] = useState([]);
  const [postreply, setpostreply] = useState('');
  const [issolved, setissolved] = useState(0);

  const postIssueReply = (event) => {
   if(postreply==''){seterror2(1)}else{
   
      const current = new Date();
      const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
      var this_unique=new Date().valueOf().toString();

      
      const master_submit = {
        "issue_id":issue_id,
        "user_id":user.id,
        "issue_user_id":user.id,
        "reply":postreply,
        "created":date
      }


      const res = axios.post(base_url + "post_issue_reply", master_submit).then(async (response) => {
        //alert('Request Submitted')
        setpostreply('')
 
        var firsr_page_jsonreply = {
          "issue_id":issue_id
        } 
    console.log(firsr_page_jsonreply,'firsr_page_jsonreply')

        await axios.post(base_url + "get_issue_reply", firsr_page_jsonreply).then((res) => {
          console.log(res,'res')
          setgetreply(res.data.result)
  
          var objDiv = document.getElementById("hjk");
          objDiv.scrollTop = objDiv.scrollHeight;
      }).catch(function (error) { if (error.response) { console.log(error.response.data); } });    




      }).catch(function (error) {
        if (error.response) {  console.log(error.response.data, 'error'); } 
      });  

    } 
    
   };



  const postIssue = (event) => {
    if(subject=='' || issue==''){seterror(1)}else{
      console.log(subject,issue,'res')

      const current = new Date();
      const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
      var this_unique=new Date().valueOf().toString();

      
      const master_submit = {
        subject: subject,
        issue: issue,
        created: date,
        creator:  user.id,
      }

      const res = axios.post(base_url + "post_issue", master_submit).then((response) => {
        alert('Request Submitted')
        setsubject('')
        setissue('')
        get_issue();
      }).catch(function (error) {
        if (error.response) {  console.log(error.response.data, 'error'); } 
      });  

    }
    
   };



   

 
    const   get_issue = async (event) => {
var iid
    //let id = e.target.getAttribute("data-id")

    //console.log(id,'get_issueget_issue')
 
    try {
      iid = event.target.getAttribute("data-id2")
      console.log(iid,'get_issueget_issue')
    } catch (error) {
      
    } 
  
 
     var firsr_page_json = {
        ...(user.is_marchant==1? { user_id:user.id , } : { }), 
 
      } 
  
    

      await axios.post(base_url + "get_issue", firsr_page_json).then((res) => {
            console.log(res,'res')
            const my_json = []
            var get_ = res.data.result;
            for (var i=0; i < get_.length; i++) {


var status='Pending'
var status_date
if(get_[i].is_solved==1){
  status='Solved'
}

else if(get_[i].is_seen==1){
  status='Seen'
}



var have_new=''
if(get_[i].is_solved!=1){
if(get_[i].reply=='mar_new' && user.is_marchant==1){
have_new=' New ✉ found'
}
else if (get_[i].reply=='adm_new' && user.is_marchant!=1){
  have_new=' New ✉ found'
}
}





                var x_data = {
                      id: get_[i].id,
                      subject: get_[i].subject, 
                      issue: get_[i].issue, 
                      reply: get_[i].reply, 
                      have_new:have_new,
                      status:status,
                      is_seen: get_[i].is_seen,
                      is_solved: get_[i].is_solved,
                      creator_: get_[i].creator_.userName,
                      ...(get_[i].reply_by_? { reply_by_: get_[i].reply_by_.userName , } : {reply_by_:''}), 
                      created: get_[i].created, 
                      status_date: get_[i].replied, 
                }
                my_json.push(x_data);
                console.log(x_data,'x_data')
            } 
          setget_issues(my_json); 
          console.log(my_json,'my_json')
        }).catch(function (error) { if (error.response) { console.log(error.response.data); } });    
    };

useEffect(() => {
    get_issue();
}, []);


const   get_issue2 = async (event) => {
 
   
       var firsr_page_json = {
          ...(user.is_marchant==1? { user_id:user.id , } : { }), 
           is_seen:0, 
           is_solved:0, 
        } 
    console.log(firsr_page_json,'firsr_page_json')
        await axios.post(base_url + "get_issue", firsr_page_json).then((res) => {
              console.log(res,'res')
              const my_json = []
              var get_ = res.data.result;
              for (var i=0; i < get_.length; i++) {
  
  
  var status='Pending'
  var status_date
  if(get_[i].is_solved==1){
    status='Solved'
  }
  
  else if(get_[i].is_seen==1){
    status='Seen'
  }
  
  var have_new=''
  if(get_[i].is_solved!=1){
  if(get_[i].reply=='mar_new' && user.is_marchant==1){
  have_new=' New ✉ found'
  }
  else if (get_[i].reply=='adm_new' && user.is_marchant!=1){
    have_new=' New ✉ found'
  }
  }



                  var x_data = {
                        id: get_[i].id,
                        subject: get_[i].subject, 
                        issue: get_[i].issue, 
                        reply: get_[i].reply, 
                        have_new:have_new,
                        status:status,
                        is_seen: get_[i].is_seen,
                        is_solved: get_[i].is_solved,
                        creator_: get_[i].creator_.userName,
                        ...(get_[i].reply_by_? { reply_by_: get_[i].reply_by_.userName , } : {reply_by_:''}), 
                        created: get_[i].created, 
                        status_date: get_[i].replied, 
                  }
                  my_json.push(x_data);
                  console.log(x_data,'x_data')
              } 
            setget_issues(my_json); 
            console.log(my_json,'my_json')
          }).catch(function (error) { if (error.response) { console.log(error.response.data); } });    
      };
  
 
      const   get_issue3 = async (event) => {
        var iid
            //let id = e.target.getAttribute("data-id")
        
            //console.log(id,'get_issueget_issue')
         
            try {
              iid = event.target.getAttribute("data-id2")
              console.log(iid,'get_issueget_issue')
            } catch (error) {
              
            } 
         
         
             var firsr_page_json = {
                ...(user.is_marchant==1? { user_id:user.id , } : { }), 
                is_seen:1 , is_solved:0 , 
 
              } 
          
            
        
              await axios.post(base_url + "get_issue", firsr_page_json).then((res) => {
                    console.log(res,'res')
                    const my_json = []
                    var get_ = res.data.result;
                    for (var i=0; i < get_.length; i++) {
        
        
        var status='Pending'
        var status_date
        if(get_[i].is_solved==1){
          status='Solved'
        }
        
        else if(get_[i].is_seen==1){
          status='Seen'
        }
        

        var have_new=''
        if(get_[i].is_solved!=1){
        if(get_[i].reply=='mar_new' && user.is_marchant==1){
        have_new=' New ✉ found'
        }
        else if (get_[i].reply=='adm_new' && user.is_marchant!=1){
          have_new=' New ✉ found'
        }
        }

        
                        var x_data = {
                              id: get_[i].id,
                              subject: get_[i].subject, 
                              issue: get_[i].issue, 
                              reply: get_[i].reply, 
                              have_new:have_new,
                              status:status,
                              is_seen: get_[i].is_seen,
                              is_solved: get_[i].is_solved,
                              creator_: get_[i].creator_.userName,
                              ...(get_[i].reply_by_? { reply_by_: get_[i].reply_by_.userName , } : {reply_by_:''}), 
                              created: get_[i].created, 
                              status_date: get_[i].replied, 
                        }
                        my_json.push(x_data);
                        console.log(x_data,'x_datax_data')
                    } 
                  setget_issues(my_json); 
                  console.log(my_json,'my_json')
                }).catch(function (error) { if (error.response) { console.log(error.response.data); } });  
                

 
            };
        

 
            const   get_issue4 = async (event) => {
              console.log( 'res')
              var iid
                  //let id = e.target.getAttribute("data-id")
              
                  //console.log(id,'get_issueget_issue')
               
                  try {
                    iid = event.target.getAttribute("data-id2")
                    console.log(iid,'get_issueget_issue')
                  } catch (error) {
                    
                  } 
               
               
                   var firsr_page_json = {
                      ...(user.is_marchant==1? { user_id:user.id , } : { }), 
                      is_seen:null ,    is_solved:1  
                    } 
                
                  
              
                    await axios.post(base_url + "get_issue", firsr_page_json).then((res) => {
                          console.log(res,'res')
                          const my_json = []
                          var get_ = res.data.result;
                          for (var i=0; i < get_.length; i++) {
              
              
              var status='Pending'
              var status_date
              if(get_[i].is_solved==1){
                status='Solved'
              }
              
              else if(get_[i].is_seen==1){
                status='Seen'
              }
    

              var have_new=''
              if(get_[i].is_solved!=1){
              if(get_[i].reply=='mar_new' && user.is_marchant==1){
              have_new=' New ✉ found'
              }
              else if (get_[i].reply=='adm_new' && user.is_marchant!=1){
                have_new=' New ✉ found'
              }
              }
              
                              var x_data = {
                                    id: get_[i].id,
                                    subject: get_[i].subject, 
                                    issue: get_[i].issue, 
                                    reply: get_[i].reply, 
                                    have_new:have_new,
                                    status:status,
                                    is_seen: get_[i].is_seen,
                                    is_solved: get_[i].is_solved,
                                    creator_: get_[i].creator_.userName,
                                    ...(get_[i].reply_by_? { reply_by_: get_[i].reply_by_.userName , } : {reply_by_:''}), 
                                    created: get_[i].created, 
                                    status_date: get_[i].replied, 
                              }
                              my_json.push(x_data);
                              console.log(x_data,'x_data')
                          } 
                        setget_issues(my_json); 
                        console.log(my_json,'my_json')
                      }).catch(function (error) { if (error.response) { console.log(error.response.data); } });    
                  };




const [get_issues, setget_issues] = useState([]);

const [selected_rows, setselected_rows] = useState([]);
const [servicesList, setservicesList] = useState([]);

const [services_clientsList, setservices_clientsList] = useState([]);
const [services_clientsList_filtered, setservices_clientsList_filtered] = useState([]);

const services_clientsProps_sender = { options: services_clientsList_filtered, getOptionLabel: (option) => option.label,};

const [services_clients_branchList, setservices_clients_branchList] = useState([]);  
const [services_clients_branchList_sender_filtered, setservices_clients_branchList_sender_filtered] = useState([]); 
const services_clients_branchList_sender = { options: services_clients_branchList_sender_filtered, getOptionLabel: (option) => option.label,};

const [alert_def_txt, setalert_def_txt] = useState('Data Submitted Successfully!');
const [alert_def_class, setalert_def_class] = useState('success');
const handleClick = () =>{ setOpen(true); };
const handleClose = (event, reason) => { if (reason === 'clickaway') { return; } setOpen(false); };
const [open, setOpen] = React.useState(false);
//main


const [client_id, setclient_id] = useState(null);
const [marchant_id, setmarchant_id] = useState(null);

const [amount, setamount] = useState([]);
const [method, setmethod] = useState([]);
const [account, setaccount] = useState([]);

/*------------------------------------------useEffect-------------------------------------------------*/
/*useEffect(() => {
  const basic_user = {
    id: user.id,
    is_all_branch: user.is_all_branch,
    is_marchant: user.is_marchant,
    }
  const getData_sc = async () => {
      const arr_services_clients = []; const arr_services_clients_branch = [];  const arr_services = [];
    await axios.post(base_url+"setup_config",basic_user).then((res) => {
        res.data.services_clients.map((temp) => { return arr_services_clients.push({value: temp.services_clients_id, label: temp.services_clients,services_id:temp.services_id,services_provider_id:temp.services_provider_id,i_sms_template_id:temp.i_sms_template_id,i_product_type_id:temp.i_product_type_id,services_packages_id:temp.services_packages_id}); }); setservices_clientsList(arr_services_clients) 
        res.data.services_clients_branch.map((temp) => { return arr_services_clients_branch.push({value: temp.services_clients_branch_id, label: temp.services_clients_branch+' (c/b:'+temp.wallet+')',  services_clients_id: temp.services_clients_id}); }); setservices_clients_branchList(arr_services_clients_branch) 
        res.data.services.map((temp) => { return arr_services.push({value: temp.services_id, label: temp.services}); }); setservicesList(arr_services)
    });
  };
  getData_sc();
}, []);*/


const paymentList = [
  { label: 'Bkash', value: 'Bkash' },
  { label: 'Nagad', value: 'Nagad' },
  { label: 'Upay', value: 'Upay' },
  { label: 'Bank', value: 'Bank' },
]




 

const markSeen = (event) => {
  var done=0
  if(selected_rows.length>0){
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

      for (var i = 0; i < selected_rows.length; i++) {
          

          var filter = filterItemsequal(get_issues, 'id', parseInt(selected_rows[i]));

                const data1 = {
                    id: filter[0].id,
                    is_seen:1,
                    is_solved:0,
                    reply_by:user.id,
                    replied:date,
                    is_delete:0,
                }

                console.log(data1, 'data1');
                console.log(data1,'data1')
                const res = axios.post(base_url + "update_issues", data1).then((response) => {
                    console.log(response.data, 'res');
                    done=1
                    get_issue();
                }).catch(function (error) {
                    if (error.response) { 
                        done=0
                        console.log(done, 'done');
                    }
                }); 
      } 
 
  }else{
    alert('Nothing Selected')
  setalert_def_txt('Nothing Selected')
  setalert_def_class('warning')
  handleClick()
  }
};

const markSolved= (event) => {
  var done=0
  if(selected_rows.length>0){
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

      for (var i = 0; i < selected_rows.length; i++) {
          

          var filter = filterItemsequal(get_issues, 'id', parseInt(selected_rows[i]));

                const data1 = {
                    id: filter[0].id,
                    is_seen:1,
                    is_solved:1,
                    reply_by:user.id,
                    replied:date,
                }

                console.log(data1, 'data1');
                console.log(data1,'data1')
                const res = axios.post(base_url + "update_issues", data1).then((response) => {
                    console.log(response.data, 'res');
                    done=1
                    get_issue();
                }).catch(function (error) {
                    if (error.response) { 
                        done=0
                        console.log(done, 'done');
                    }
                }); 
      } 
 
  }else{
    alert('Nothing Selected')
  setalert_def_txt('Nothing Selected')
  setalert_def_class('warning')
  handleClick()
  }
};

const markDelete= (event) => {
  var done=0
  if(selected_rows.length>0){
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

      for (var i = 0; i < selected_rows.length; i++) {
          

          var filter = filterItemsequal(get_issues, 'id', parseInt(selected_rows[i]));
            if(filter[0].status=='Pending'){
                              const data1 = {
                                id: filter[0].id,
                                is_delete:1,
                            }
                            const res = axios.post(base_url + "update_issues", data1).then((response) => {
                                console.log(response.data, 'res');
                                done=1
                                get_issue();
                            }).catch(function (error) {
                                if (error.response) { 
                                    done=0
                                    console.log(done, 'done');
                                }
                            });
            }else{
              alert('ID : ' + filter[0].id + ' Not Deleted. Only issue with pending status can be deleted')
            }
 
      } 
 
  }else{
    alert('Nothing Selected')
  setalert_def_txt('Nothing Selected')
  setalert_def_class('warning')
  handleClick()
  }
};


  const columns2: GridColDef[] = [

    { field: 'id', headerName: 'ID', Width: 40,   },
    { field: 'subject', headerName: 'Subject', minWidth: 110, flex: 1 },
    { field: 'issue', headerName: 'Issue', minWidth: 110, flex: 1 },
    { field: 'created', headerName: 'created', minWidth: 110, flex: 1 },
    { field: 'creator_', headerName: 'created By', minWidth: 110, flex: 1 },
    { field: 'status', headerName: 'Status', minWidth: 110, flex: 1 },
    { field: 'status_date', headerName: 'Status Date', minWidth: 110, flex: 1 },
    { field: 'have_new',cellClassName: 'super-app-theme--cell', 
    
    
    headerName: 'New Message', minWidth: 110, flex: 1, color:'red' },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      renderCell: (params) => {
        const onClick = async (e) => {
          e.stopPropagation(); // don't select this row after clicking
          const api: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};
          api
            .getAllColumns()
            .filter((c) => c.field !== '__check__' && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
            );
  
            //setselected_rows(thisRow.id,thisRow)
            //alert(thisRow)
            setsubject(thisRow.subject)
            setissue(thisRow.issue)
            setissue_id(parseInt(thisRow.id))
            setissolved(thisRow.status)

            console.log(thisRow.id,'thisRow.id')
            //handleViewDetails(thisRow.id,thisRow)
            //setpopupOpen(true)



                
 
         
            var firsr_page_jsonreply = {
              "issue_id":parseInt(thisRow.id),
              "this_user":user.id
            } 
            console.log(firsr_page_jsonreply,'firsr_page_jsonreply')
        
         await axios.post(base_url + "get_issue_reply", firsr_page_jsonreply).then((res) => {
                          console.log(res,'res')
                          setgetreply(res.data.result)
                  
                          var objDiv = document.getElementById("hjk");
                          objDiv.scrollTop = objDiv.scrollHeight;


                      }).catch(function (error) { if (error.response) { console.log(error.response.data); } });    
        
        
            





        };
        return <Button onClick={onClick}>View</Button>;
      },
    },
    ];

    const { logout, user } = useAuth();



 

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[ { name: "Issue" }]} />  
      </Box>


 
 

{(user.is_issue==1 || user.is_marchant==1) &&
  <ValidatorForm   onError={() => null}>
      <Stack spacing={3}>

<Grid container spacing={2} style={{paddingRight:"15px"}}>
      <Grid xs={5} style={{padding:"5px", paddingRight:"15px"}}>
                    <TextField type="text" name="subject" id="standard-basic" value={subject} onChange={handleSubject} label="Write Subject*" />
                    {subject=='' && error==1 && <p style={{color:"red",marginTop: "-1%",marginBottom: "4%"}}>"Write  Subject" field is required *</p> }
                    

                    <TextField type="text"
                      multiline
                      rows={5}
                      maxRows={8}
                    name="issue" id="standard-basic" value={issue} onChange={handleIssue} label="Write Issue*" />
                    {issue=='' && error==1 && <p style={{color:"red",marginTop: "-1%",marginBottom: "4%"}}>"Write Issue" field is required *</p> }
                    {user.is_marchant==1 &&
                    <>{getreply.length==0 &&
                                        <Button color="primary" data-id={1} onClick={postIssue} variant="contained" style={{marginTop:"3px"}}> <Icon>check</Icon> <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit New Issue</Span>  </Button>  
                    }
                    </>
                    }




<div>
<br></br>

{getreply.length>0 &&
<div id={"hjk"}
style={{

  height: "420px",
  overflowY: "scroll",
  padding: "5px",
  border: "2px solid lightskyblue",
  borderRadius: "5px",

}}
>
{getreply.map(item => (  
  <>
      <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>

      <x style={{
        fontWeight: "bold",
        color: "black"
      }}>
      {item.user_.userName.toString()}   
      </x>  

        <p style={{    textAlign: "right", marginTop: "-20px"}}><i>{'Date:' } {item.created}</i> </p>
        </Typography>
 
        <Typography variant="body2">
        {item.reply.toString()}
        </Typography>
      </CardContent>
    </Card><br></br>
  </>
))}
</div>

    }
<br></br>


{issolved != "Solved" && issue_id >0 &&
<>
    <TextField type="text"
      multiline
      rows={4}
      maxRows={8}
    name="issue" id="standard-basic2" value={postreply} onChange={handleIssueReply} label="Write Issue Reply*" />
    {postreply=='' && error2==1 && <p style={{color:"red",marginTop: "-1%",marginBottom: "4%"}}>"Write Issue" field is required *</p> }
      <Button color="primary" data-id={1} onClick={postIssueReply} variant="contained" style={{marginTop:"3px"}}> <Icon>check</Icon> <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>  </Button>  


</>
}


</div>
 






                 </Grid>









      <Grid xs={7}>
                    <>
                        <Button color="primary" data-id2={1} onClick={get_issue} variant="contained" style={{marginTop:"3px"}}> <Icon>remove_red_eye</Icon> <Span sx={{ pl: 1, textTransform: "capitalize" }}>View All</Span></Button>
                        &nbsp;&nbsp;
                        <Button color="primary" data-id2={2} onClick={get_issue2} variant="contained" style={{marginTop:"3px"}}> <Icon>remove_red_eye</Icon> <Span sx={{ pl: 1, textTransform: "capitalize" }}>View Pending</Span></Button>  
                        &nbsp;&nbsp;
                        <Button color="primary" data-id2={3} onClick={get_issue3} variant="contained" style={{marginTop:"3px"}}> <Icon>remove_red_eye</Icon> <Span sx={{ pl: 1, textTransform: "capitalize" }}>View Seen</Span></Button>  
                        &nbsp;&nbsp;
                        <Button color="primary" data-id2={4} onClick={get_issue4} variant="contained" style={{marginTop:"3px"}}> <Icon>remove_red_eye</Icon> <Span sx={{ pl: 1, textTransform: "capitalize" }}>View Solved</Span></Button>  
                    </>

                    <Icon style={{cursor:"pointer", float: "right"}} onClick={get_issue}>refresh</Icon>  
                    <div style={{ height: 400, width: '100%' }}      >

                    <Box
      sx={{
        height: 400,
        width: '100%',
        '& .super-app-theme--cell': {
          backgroundColor: 'rgba(224, 183, 60, 0.55)',
          color: 'green',
          fontWeight: '600',
        },
        '& .super-app.negative': {
          backgroundColor: 'rgba(157, 255, 118, 0.49)',
          color: 'green',
          fontWeight: '600',
        },
        '& .super-app.positive': {
          backgroundColor: '#d47483',
          color: 'green',
          fontWeight: '600',
        },
      }}
    >


                        <DataGrid rowHeight={35}
                        checkboxSelection
                            components={{ Toolbar: GridToolbar }}
                            rows={get_issues}
                            columns={columns2}
                            pageSize={10}
                            onSelectionModelChange={(newSelectionArray) => {
                              setselected_rows(newSelectionArray);
 
//console.log(newSelection.rows)
                              //setSelection(newSelection.rows);
                          }}
                            rowsPerPageOptions={[10]}
                        />
</Box>




                    </div> 


                    {(user.is_issue==1 && user.is_marchant!=1 ) &&
                    <>
                        <Button color="primary" data-id={1} onClick={markSeen} variant="contained" style={{marginTop:"3px"}}> <Icon>check</Icon> <Span sx={{ pl: 1, textTransform: "capitalize" }}>Mark as Seen</Span></Button>
                        &nbsp;&nbsp;
                        <Button color="primary" data-id={1} onClick={markSolved} variant="contained" style={{marginTop:"3px"}}> <Icon>check</Icon> <Span sx={{ pl: 1, textTransform: "capitalize" }}>Mark as Solved</Span></Button>  
  
                    </>
                    } 

                    {user.is_marchant==1 &&
                    <>
                         <Button color="secondary" data-id={1} onClick={markDelete} variant="contained" style={{marginTop:"3px"}}> <Icon>delete</Icon> <Span sx={{ pl: 1, textTransform: "capitalize" }}>Delete</Span></Button>  
 
                    </>
                    }                      

      </Grid>
</Grid>


      </Stack>
</ValidatorForm>
}

    </Container>
  );
};

export default AddPod;
