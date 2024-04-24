import { Icon, Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Breadcrumb } from "app/components";
import useAuth from 'app/hooks/useAuth';
import axios from "axios";
import { useEffect, useState } from 'react';
import { base_url } from '../../../utils/constant';

axios.defaults.headers.common['accessToken'] =  'JWT '+window.localStorage.getItem('accessToken');

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

    const filterItemsequal = (arr, field, value) => { try { if (field != null) { return arr.filter((item) => { return item[field] == value }) } } catch (error) { console.error(error); } }

    const [get_search_data_tracking, setget_search_data_tracking] = useState([]);

    const columns2: GridColDef[] = [

        { field: 'id', headerName: 'SL', Width: 40,   },

        {
            field: 'action',
            headerName: 'Pickedup',
            sortable: false,
            renderCell: (params) => {

                return <p> <Icon>card_giftcard</Icon></p>;
            },

        },
        { field: 'date', headerName: 'Date', minWidth: 110, flex: 1 },
        
        { field: 'services_clients', headerName: 'Client', minWidth: 160, flex: 1 }, 
          { field: 'origin', headerName: 'Origin', minWidth: 160, flex: 1 },       
        
        { field: 'services', headerName: 'Service', minWidth: 160, flex: 1 },
        { field: 'unique_upload_id', headerName: 'UID', minWidth: 160, flex: 1 },
        { field: 'picked', headerName: 'Total Pickedup', minWidth: 160, flex: 1 },
        { field: 'Delivered6', headerName: 'Delivered', minWidth: 140, flex: 1 },
        { field: 'ReturnReceived8', headerName: 'Return Received', minWidth: 140, flex: 1 },
        { field: 'Returninprocess7', headerName: 'Return in process', minWidth: 140, flex: 1 },
        { field: 'Hold9', headerName: 'Hold', minWidth: 140, flex: 1 },

        { field: 'Processing3', headerName: 'Pickedup Branch', minWidth: 140, flex: 1 },
        { field: 'InTransit5', headerName: 'In Transit', minWidth: 140, flex: 1 },
        { field: 'Received4', headerName: 'Transit Received', minWidth: 140, flex: 1 },
        { field: 'Exception10', headerName: 'Exception', minWidth: 140, flex: 1 },

        ];
    const { logout, user } = useAuth();

 
        const getData_sc = async () => {
  


        const all_access = localStorage.getItem('all_access');
        var firsr_page_json =[]

        if(all_access!=1){
          firsr_page_json = {
            "created_branch_id": user.branch_id, 
            }
        }else{
            firsr_page_json = {  }
        }

        if(user.is_marchant==1){

            firsr_page_json = {
                user_id:user.id,
            }
              /*  if(all_access!=1){
                    firsr_page_json = {
                            "created_branch_id": user.branch_id, 
                            user_id:user.id,
                    }
                }else{
                    firsr_page_json = {
                        user_id:user.id,
                    }
                } */
        }




console.log(firsr_page_json,'firsr_page_json')

            await axios.post(base_url + "pickup_report", firsr_page_json).then((res) => {
                console.log(res,'resres')


                const my_json = []
                var cc = 0;
                var get_ = res.data.result;
                const services = res.data.services;
                const branch = res.data.branch;
                const services_clients = res.data.services_clients;
  
             var   result = get_.reduce((r, { unique_upload_id: name, ...object }) => {
                    var temp = r.find(o => o.name === name);
                    if (!temp) r.push(temp = { name, children: [] });
                    
                    temp.children.push(object);
                    return r;
                }, []);
                
                console.log(JSON.stringify(result),'result'); 

                 for (var i=0; i < result.length; i++) {
                     
                     var name=result[i].name

                     console.log(name,' name ');

                     var pickup_date_3=result[i]?.children[0]['pickup_date_3']
                     var services_id_1=result[i]?.children[0]['services_id_1']
                     var created_branch_id=result[i]?.children[0]['created_branch_id']
                     var services_clients_id=result[i]?.children[0]['sender_client_id_7']

             
              
                     var Processing3=null
                     var Received4=null
                     var InTransit5=null
                     var Delivered6=null
                     var Returninprocess7=null
                     var ReturnReceived8=null
                     var Hold9=null
                     var Exception10=null
                     var picked=0
                 
                     var children=result[i].children
                     for (var j=0; j < children.length; j++) {
                         var key=children[j]['i_delivery_status_id_18']
                         if(key==3){  Processing3=children[j]['_count']['id']  }
                         if(key==4){  Received4=children[j]['_count']['id']  }
                         if(key==5){  InTransit5=children[j]['_count']['id']  }
                         if(key==6){  Delivered6=children[j]['_count']['id']  }
                         if(key==7){  Returninprocess7=children[j]['_count']['id']  }
                         if(key==8){  ReturnReceived8=children[j]['_count']['id']  }
                         if(key==9){  Hold9=children[j]['_count']['id']  }
                         if(key==10){  Exception10=children[j]['_count']['id']  }
                         picked=picked+children[j]['_count']['id']
                          
                     }
                    
                     var filter2 = filterItemsequal(services, 'services_id', services_id_1);
                     var filter3 = filterItemsequal(branch, 'branch_id', created_branch_id);

                     console.log(services_clients_id,'services_clients_id',services_clients)
                     var filter4 = filterItemsequal(services_clients, 'services_clients_id', services_clients_id);


                     var x_data = {
                        id: i + 1,
                        date: pickup_date_3,
                        services: filter2[0]?.services,
                        services_clients: filter4[0]?.services_clients,
                        origin: filter3[0]?.branch,
                        unique_upload_id: name,
                        Processing3:Processing3,
                        Received4:Received4,
                        InTransit5:InTransit5,
                        Delivered6:Delivered6,
                        Returninprocess7:Returninprocess7,
                        ReturnReceived8:ReturnReceived8,
                        Hold9:Hold9,
                        Exception10:Exception10,
                        picked:picked
                    }


                    my_json.push(x_data);
                     console.log(x_data,'x_data')
                } 










                /* for (var i = 0; i < get_.length; i++) {
                    
                    
                    



                   cc++
                    var obj = get_[i];
                    var filter2 = filterItemsequal(services, 'services_id', obj.services_id_1);
                    var filter3 = filterItemsequal(branch, 'branch_id', obj.created_branch_id);
                    var x_data = {
                        id: i + 1,
                        date: obj.pickup_date_3,
                        services: filter2[0].services,
                        origin: filter3[0].branch,
                        unique_upload_id: obj.unique_upload_id,
                        _count:obj._count.id,
                    }



                    my_json.push(x_data);
                }*/


                setget_search_data_tracking(my_json);



            }).catch(function (error) { if (error.response) { console.log(error.response.data); } });
        };

    useEffect(() => {
        getData_sc();
    }, []);


    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Pickup Report" }]} />
            </Box>


  




            <Stack spacing={3}><Icon style={{cursor:"pointer", float: "right"}} onClick={getData_sc}>refresh</Icon>  
                <div style={{ height: 400, width: '100%' }}      >
                    <DataGrid rowHeight={35}
                        components={{ Toolbar: GridToolbar }}
                        rows={get_search_data_tracking}
                        columns={columns2}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </div>
            </Stack>



        </Container>
    );
};

export default PickupReport;


 