import { Stack } from "@mui/material";
 
import { Breadcrumb } from "app/components";
 
 
import { Box, Card, Grid, Icon, IconButton, styled, Tooltip } from "@mui/material";
import { Small } from 'app/components/Typography';
import useAuth from 'app/hooks/useAuth';
import axios from "axios";
import * as React from 'react';
import { useEffect, useState } from 'react';
import { base_url } from '../../../utils/constant';
 
import CircularProgress from '@mui/material/CircularProgress';

const StyledCard = styled(Card)(({ theme }) => ({ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', padding: '24px !important', background: theme.palette.background.paper, [theme.breakpoints.down('sm')]: { padding: '16px !important' }, }));

const ContentBox = styled(Box)(({ theme }) => ({ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& small': { color: theme.palette.text.secondary }, '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main }, }));

const Heading = styled('h6')(({ theme }) => ({ margin: 0, marginTop: '4px', fontSize: '14px', fontWeight: '500', color: theme.palette.primary.main, }));





const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));


//{ name: "Material", path: "/material" },
const AddPod = () => {


    const handlecountsShow = (e) => {
        let id = e.target.getAttribute("data-id")
        seti_delivery_status_count(id)
       // handleSubmit()
        console.log(id)
    }

    
    const [i_delivery_status_count, seti_delivery_status_count] = useState(null);
const [processing, setprocessing] = useState(0);
const [shipped, setshipped] = useState(0);
const [in_transit, setin_transit] = useState(0);
const [hold, sethold] = useState(0);
const [out_for_deli, setout_for_deli] = useState(0);
const [exception, setexception] = useState(0);
const [return_process, setreturn_process] = useState(0);
const [booking, setbooking] = useState(0);
const [delivered, setdelivered] = useState(0);
const [return_received, setreturn_received] = useState(0);
const [total_order, settotal_order] = useState(0);
const [showPro, setshowPro] = useState(1);
  
    const { logout, user } = useAuth();

    const cardList = [
        { name: 'Booking', amount: booking, icon: 'local_mall', id:9 },
        { name: 'Processing', amount: processing, icon: 'next_week', id:3 },
        { name: 'In Transit', amount: in_transit, icon: 'local_shipping', id:5 },
        { name: 'Received', amount: shipped, icon: 'redeem', id:4 },
        { name: 'Return in process', amount: return_process, icon: 'art_track', id:7 },
        { name: 'Hold', amount: hold, icon: 'settings_power', id:9 },
        { name: 'Out For Delivery', amount: out_for_deli, icon: 'directions_bike', id:12 },
        { name: 'Exception', amount: exception, icon: 'call_missed', id:12 },
        { name: 'Delivered', amount: delivered, icon: 'check', id:6 },
        { name: 'Returned', amount: return_received, icon: 'assignment_return', id:8 },
        { name: 'Total Order', amount: total_order, icon: 'star', id:99 },
      ]; 

      
      const getData = async () => {
        setshowPro(1)
        var abc =[]
        var all_access = localStorage.getItem('all_access');
       
        abc = {
           branch_id: user.branch_id,
           current_branch_id: user.branch_id,
           sender_client_id_7: null,
           is_delivery_boy:user.is_delivery_boy,
           delivery_boy_id:user.id,
       }
       
        //all_access=0;
         /*  if(all_access!=1){
       
                 abc = {
                   branch_id: user.branch_id,
                   current_branch_id: user.branch_id,
                   sender_client_id_7: null,
                   is_delivery_boy:user.is_delivery_boy,
                   delivery_boy_id:user.id,
               }
           }else{
                 abc = {
                   delivery_boy_id:user.id,
                   sender_client_id_7: null,
                   is_delivery_boy:user.is_delivery_boy,
               }
           }*/
        
         //for marchant overwrite
        
       if(user.is_marchant==1){
       
           abc = {
               sender_client_id_7: null,
               user_id:user.id,
               is_delivery_boy:user.is_delivery_boy,
               delivery_boy_id:user.id,
           }
       
           /*if(all_access!=1){
       
               abc = {
                 branch_id: user.branch_id,
                 current_branch_id: user.branch_id,
                 sender_client_id_7: null,
                 user_id:user.id,
                 is_delivery_boy:user.is_delivery_boy,
                 delivery_boy_id:user.id,
       
             }
         }else{
               abc = {
                 sender_client_id_7: null,
                 user_id:user.id,
                 is_delivery_boy:user.is_delivery_boy,
                 delivery_boy_id:user.id,
             }
         }*/
       }
       
       
         console.log(abc, 'abc');
       
         await axios.post(base_url + "stock_counts_this", abc).then((res) => {
       console.log(res,'res')
             setprocessing(res.data.processing)
             setshipped(res.data.shipped)
             setin_transit(res.data.in_transit)
             sethold(res.data.hold)
             setreturn_process(res.data.return_process)
             setbooking(res.data.booking)
             setout_for_deli(res.data.out_for_deli)
             setexception(res.data.exception)
             setreturn_received(res.data.return_received)
             setdelivered(res.data.delivered)
    
             settotal_order(res.data.processing+res.data.shipped+res.data.in_transit+res.data.hold+res.data.return_process+res.data.booking+res.data.out_for_deli+res.data.exception+res.data.return_received+res.data.delivered)
     
             setshowPro(0)
             
             //res.data.services_clients.map((temp) => { return arr_services_clients.push({value: temp. 
         });
       };
        
       
       
       useEffect(() => {
       
         getData();
       }, []);


       const [progress, setProgress] = React.useState(0);

       React.useEffect(() => {
         const timer = setInterval(() => {
           setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
         }, 800);
     
         return () => {
           clearInterval(timer);
         };
       }, []);


  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[ { name: "Current Stock" }]} />  
      </Box>

      <Stack spacing={3}>
          <div>
    
{/*Current Stock*/}
<div title="Current Stock" style={{borderRadius: "3px", backgroundColor: "cornflowerblue", padding:"10px",border:"3px solid cornflowerblue", }}><Grid item md={12} lg={12} sm={12} xs={12} style={{backgroundColor: "cornflowerblue",borderRadius: "3px",paddingLeft: "5px",color: "azure",fontSize: "26px",marginBottom:"1%" }}> <Icon>grain</Icon> Current Stock  

{user.is_marchant !=1 &&
<>
&nbsp;  &nbsp;<x style={{fontSize:"16px"}}><i>{user.branch}</i></x>
</>
}



{/*all_access==1 &&
  <> of All Branch</>*/ 
}

{showPro==1 &&
    <CircularProgress style={{color:"white", cursor:"pointer", float: "right"}}/>
}
{showPro==0 &&
 <Icon style={{cursor:"pointer", float: "right"}} onClick={getData}>refresh</Icon>    
}
  </Grid>

<Grid container spacing={3} sx={{ mb: '24px' }}>
      {cardList.map((item, index) => (
        <Grid item xs={12} md={3} key={index}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon">{item.icon}</Icon>
              <Box ml="12px">
                <Small>{item.name}</Small>
                <Heading>{item.amount.toLocaleString()}</Heading>
              </Box>
            </ContentBox>

            {/*<Tooltip   title="View Details" placement="top">
              <IconButton >
                <Icon data-id={item.id} onClick={handlecountsShow} >arrow_right_alt</Icon>
              </IconButton>
      </Tooltip>*/}
          </StyledCard>
        </Grid>
      ))}
    </Grid>
</div>    

          </div>
      </Stack>
    </Container> 
  );
};

export default AddPod;