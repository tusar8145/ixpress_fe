import { Box, Card, Grid, Icon, IconButton, styled, Tooltip } from '@mui/material';
import { Small } from 'app/components/Typography';
import useAuth from 'app/hooks/useAuth';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { base_url } from '../../../../constants/global';
const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  '& small': { color: theme.palette.text.secondary },
  '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main },
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: theme.palette.primary.main,
}));

const StockCountsCard = () => {
    const { logout, user } = useAuth();

    const [processing, setprocessing] = useState(0); 
    const [shipped, setshipped] = useState(0); 
	const [in_transit, setin_transit] = useState(0); 
    const [hold, sethold] = useState(0); 
	const [return_process, setreturn_process] = useState(0); 

    useEffect(() => {
        const getData = async () => {
          const abc={
            branch_id:user.branch_id,
            current_branch_id:null,
            sender_client_id_7:null
          }
          await axios.post(base_url+"stock_counts",abc).then((res) => {
           
            setprocessing(res.data.processing)
            setshipped(res.data.shipped)
            setin_transit(res.data.in_transit)
            sethold(res.data.hold)
            setreturn_process(res.data.return_process)
              //res.data.services_clients.map((temp) => { return arr_services_clients.push({value: temp. 
          });
        };
        getData();
      }, []);

  const cardList = [
    { name: 'Processing', amount: processing, icon: 'shopping_cart' },
    { name: 'Shipped', amount: shipped, icon: 'redeem' },
    { name: 'In Transit', amount: in_transit, icon: 'local_shipping' },
    { name: 'Return in process', amount: return_process, icon: 'art_track' },
    { name: 'Hold', amount: hold, icon: 'settings_power' },

  ];

  return (
    <Grid container spacing={3} sx={{ mb: '24px' }}>
      {cardList.map((item, index) => (
        <Grid item xs={12} md={4} key={index}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon">{item.icon}</Icon>
              <Box ml="12px">
                <Small>{item.name}</Small>
                <Heading>{item.amount}</Heading>
              </Box>
            </ContentBox>

            <Tooltip title="View Details" placement="top">
              <IconButton>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Tooltip>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default StockCountsCard;
