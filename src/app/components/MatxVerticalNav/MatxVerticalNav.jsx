import { Box, ButtonBase, Icon, styled } from '@mui/material';
import useAuth from 'app/hooks/useAuth';
import useSettings from 'app/hooks/useSettings';
import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Paragraph, Span } from '../Typography';
import MatxVerticalNavExpansionPanel from './MatxVerticalNavExpansionPanel';


const ListLabel = styled(Paragraph)(({ theme, mode }) => ({
  fontSize: '12px',
  marginTop: '20px',
  marginLeft: '15px',
  marginBottom: '10px',
  textTransform: 'uppercase',
  display: mode === 'compact' && 'none',
  color: theme.palette.text.secondary,
}));

const ExtAndIntCommon = {
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '4px',
  height: 44,
  whiteSpace: 'pre',
  marginBottom: '8px',
  textDecoration: 'none',
  justifyContent: 'space-between',
  transition: 'all 150ms ease-in',
  '&:hover': { background: 'rgba(255, 255, 255, 0.08)' },
  '&.compactNavItem': {
    overflow: 'hidden',
    justifyContent: 'center !important',
  },
  '& .icon': {
    fontSize: '18px',
    paddingLeft: '16px',
    paddingRight: '16px',
    verticalAlign: 'middle',
  },
};
const ExternalLink = styled('a')(({ theme }) => ({
  ...ExtAndIntCommon,
  color: theme.palette.text.primary,
}));

const InternalLink = styled(Box)(({ theme }) => ({
  '& a': {
    ...ExtAndIntCommon,
    color: theme.palette.text.primary,
  },
  '& .navItemActive': {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
  },
}));

const StyledText = styled(Span)(({ mode }) => ({
  fontSize: '0.875rem',
  paddingLeft: '0.8rem',
  display: mode === 'compact' && 'none',
}));

const BulletIcon = styled('div')(({ theme }) => ({
  padding: '2px',
  marginLeft: '24px',
  marginRight: '8px',
  overflow: 'hidden',
  borderRadius: '300px',
  background: theme.palette.text.primary,
}));

const BadgeValue = styled('div')(() => ({
  padding: '1px 8px',
  overflow: 'hidden',
  borderRadius: '300px',
}));

const MatxVerticalNav = ({ items }) => {
  const { settings } = useSettings();
  const { mode } = settings.layout1Settings.leftSidebar;

const { logout, user } = useAuth();

  const renderLevels = (data) => {

const xyz=123;



    return data.map((item, index) => {
var error=0
 console.log(item.name,'item.name',user.is_all_report)
if(item.name=='Quick Update' && user.is_quick_status==0) {error=1}     
if(item.name=='Search & Status' && user.is_update_status==0) {error=1}  
if(item.name=='Quick Update' && user.is_marchant==1) {error=1} 
if(item.name=='POD Upload' && user.is_scan_pod==0) {error=1} 
if(item.name=='New Pickup' && user.is_pickup==0) {error=1} 
if(item.name=='New Booking' && user.is_pickup==0) {error=1} 

//if(item.name=='All Report' && user.is_update_status==0   && user.is_pickup==0) {error=1} 
if(item.name=='Billing' && user.is_billing==0) {error=1} 
if(item.name=='Issue' && user.is_issue==0) {error=1}  
if(item.name=='Stock Branch' && user.is_update_status==0   && user.is_pickup==0) {error=1} 


if(item.name=='All Report' && (user.is_all_report==0 && user.is_all_report_data==0 && user.is_all_report_deli==0 && user.is_all_report_ship==0)) {error=1} 
if(item.name=='Delivery Boy' &&  user.is_all_report_deli==0) {error=1}
if(item.name=='Pickup Report' &&  user.is_all_report==0) {error=1}
if(item.name=='Shipment Report' &&  user.is_all_report_ship==0) {error=1}
if(item.name=='DataEntry Report' &&  user.is_all_report_data==0) {error=1}

if(item.name=='Stock Branch' && user.is_stock_branch==0) {error=1} 


if(user.is_all_branch==1) {error=0}  


if (error==0){ 


var use='';
if(item.path==process.env.REACT_APP_BACKOFFICE_URL) {
item.path=process.env.REACT_APP_BACKOFFICE_URL+'?'+window.localStorage.getItem('accessToken').slice(-10);
} 

if(item.name=='Setup & Configuration'  ){

}



      if (item.type === 'label'){
       
        return (
          <ListLabel key={index} mode={mode} className="sidenavHoverShow">
            {item.label}
          </ListLabel>
        );
      
      }


      if (item.children) {
        return (
          <MatxVerticalNavExpansionPanel mode={mode} item={item} key={index}>
            {renderLevels(item.children)}
          </MatxVerticalNavExpansionPanel>
        );
      } else if (item.type === 'extLink') {

        if(user.is_setup_conf==1){
          return (
            <ExternalLink   
            
            
              key={index}
              href={item.path}
              className={`${mode === 'compact' && 'compactNavItem'}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <ButtonBase key={item.name} name="child" sx={{ width: '100%' }}>
                {(() => {
                  if (item.icon) {
                    return <Icon className="icon">{item.icon}</Icon>;
                  } else {
                    return <span className="item-icon icon-text">{item.iconText}</span>;
                  }
                })()}
                <StyledText mode={mode} className="sidenavHoverShow">
                  {item.name}
                </StyledText>
                <Box mx="auto"></Box>
                {item.badge && <BadgeValue>{item.badge.value}</BadgeValue>}
              </ButtonBase>
            </ExternalLink>
          );

        }



      } else {
        return (
          <InternalLink   key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? `navItemActive ${mode === 'compact' && 'compactNavItem'}`
                  : `${mode === 'compact' && 'compactNavItem'}`
              }
            >
              <ButtonBase key={item.name} name="child" sx={{ width: '100%' }}>
                {item?.icon ? (
                  <Icon className="icon" sx={{ width: 36 }}>
                    {item.icon}
                  </Icon>
                ) : (
                  <Fragment>
                    <BulletIcon
                      className={`nav-bullet`}
                      sx={{ display: mode === 'compact' && 'none' }}
                    />
                    <Box
                      className="nav-bullet-text"
                      sx={{
                        ml: '20px',
                        fontSize: '11px',
                        display: mode !== 'compact' && 'none',
                      }}
                    >
                      {item.iconText}
                    </Box>
                  </Fragment>
                )}
                <StyledText mode={mode} className="sidenavHoverShow">
                  {item.name}  
                </StyledText>

                <Box mx="auto" />

                {item.badge && (
                  <BadgeValue className="sidenavHoverShow">{item.badge.value}</BadgeValue>
                )}
              </ButtonBase>
            </NavLink>
          </InternalLink>
        );
      }


    }

    });
  };

  return <div className="navigation">{renderLevels(items)}</div>;
};

export default React.memo(MatxVerticalNav);
