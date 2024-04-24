import { MatxLoading } from 'app/components';
import axios from 'axios.js';
import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import React, { createContext, useEffect, useReducer } from 'react';

const JWT_SECRET = 'jwt_secret_key';
const JWT_VALIDITY = '1 day';
localStorage.removeItem("setselected_rows");
localStorage.removeItem("setprevious_delivery_status");
const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,
}
const filterItemsequal = (arr, field, value) => { try { if (field != null) { return arr.filter((item) => { return item[field]==value }) }} catch (error) { console.error(error);}}

const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false
    }

    const decodedToken = jwtDecode(accessToken)
    const currentTime = Date.now() / 1000
    return decodedToken.exp > currentTime
}

const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        localStorage.removeItem('accessToken')
        delete axios.defaults.headers.common.Authorization
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        case 'LOGIN': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        }
        case 'REGISTER': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => { },
    register: () => Promise.resolve(),
})

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const login = async (email, password) => {

        const this_credentials={
            email:email,
            password:password
           }

        const arr_user = [];

        try { var filter = [];
                  await axios.post(process.env.REACT_APP_API_BASE_URL+"user/login",this_credentials).then((res) => {
                    if(res.data.tbl_users_userType[0].is_all_branch==1){
                    localStorage.setItem('all_access', '1');}else{
                        localStorage.setItem('all_access', '0');
                    }
					console.log(res.data.message,'res.data.getUser',res.data?.message)

					if(res.data?.message=='No Clients Assigned'){
						alert('No Clients Assigned in this Merchant account')
					}   


                    filter = filterItemsequal(res.data.branch, 'branch_id', parseInt(res.data.first_branch));

                    res.data.getUser.map((temp) => { 
                        return arr_user.push({userID:temp.userID, userName: temp.userName, userEmail: temp.userEmail, commission:temp.commission_rate,
                        branch: res.data.branch[0].branch, 
                        branch_id: res.data.branch[0].branch_id, 
                        all_branch: res.data.branch,


						is_dashboard_account:res.data.tbl_users_userType[0].is_dashboard_account,
						is_dashboard_orders:res.data.tbl_users_userType[0].is_dashboard_orders,
						is_stock_branch:res.data.tbl_users_userType[0].is_stock_branch,
						is_pickup:res.data.tbl_users_userType[0].is_pickup,
						is_update_status_payment:res.data.tbl_users_userType[0].is_update_status_payment,
						is_update_status_update:res.data.tbl_users_userType[0].is_update_status_update,
						is_update_status:res.data.tbl_users_userType[0].is_update_status,
						is_quick_status:res.data.tbl_users_userType[0].is_quick_status,
						is_quick_status_all:res.data.tbl_users_userType[0].is_quick_status_all,
						is_scan_pod:res.data.tbl_users_userType[0].is_scan_pod,
						is_billing_app_col:res.data.tbl_users_userType[0].is_billing_app_col,
						is_billing_dis:res.data.tbl_users_userType[0].is_billing_dis,
						is_billing_app_dis:res.data.tbl_users_userType[0].is_billing_app_dis,
						is_billing:res.data.tbl_users_userType[0].is_billing,
						is_issue:res.data.tbl_users_userType[0].is_issue,
						is_all_report:res.data.tbl_users_userType[0].is_all_report,
						
						is_all_report_data:res.data.tbl_users_userType[0].is_all_report_data,
						is_all_report_deli:res.data.tbl_users_userType[0].is_all_report_deli,
						is_all_report_ship:res.data.tbl_users_userType[0].is_all_report_ship,
						
						is_setup_conf:res.data.tbl_users_userType[0].is_setup_conf,
						is_all_branch:res.data.tbl_users_userType[0].is_all_branch,
						is_marchant:res.data.tbl_users_userType[0].is_marchant,
						is_delivery_boy:res.data.tbl_users_userType[0].is_delivery_boy,


                        user_type:res.data.user_type, 
                        
                    }); });

                    if(res.data.tbl_users_userType[0].is_all_branch==1){
                                            localStorage.setItem('all_access', '1');
                    }else{
                        localStorage.setItem('all_access', '0');
                    }

                    console.log(res.data.accessToken);
                    setSession(res.data.accessToken)
                    localStorage.setItem('accessToken', res.data.accessToken)
                    const decode = jwt.verify(res.data.accessToken, JWT_SECRET);

                    console.log(decode,'decode');
                    }); 
 
          } catch (error) { 
            console.error(error);
            console.log('???');
          }
          


         
        /*const accessToken = jwt.sign({ userId: arr_user[0].userID }, JWT_SECRET, {
        expiresIn: JWT_VALIDITY,
        });*/



        const   user= {
                id: arr_user[0].userID,
                avatar: '/assets/images/face-6.jpg',
                email: arr_user[0].userEmail,
                commission: arr_user[0].commission,
                name:  arr_user[0].userName,
                branch_id:filter[0].branch_id,
                branch:filter[0].branch,
                all_branch:arr_user[0].all_branch,

 

                is_dashboard_account:arr_user[0].is_dashboard_account,
                is_dashboard_orders:arr_user[0].is_dashboard_orders,
                is_stock_branch:arr_user[0].is_stock_branch,
                is_pickup:arr_user[0].is_pickup,
                is_update_status_payment:arr_user[0].is_update_status_payment,
                is_update_status_update:arr_user[0].is_update_status_update,
                is_update_status:arr_user[0].is_update_status,
                is_quick_status:arr_user[0].is_quick_status,
                is_quick_status_all:arr_user[0].is_quick_status_all,
                is_scan_pod:arr_user[0].is_scan_pod,
                is_billing_app_col:arr_user[0].is_billing_app_col,
                is_billing_dis:arr_user[0].is_billing_dis,
                is_billing_app_dis:arr_user[0].is_billing_app_dis,
                is_billing:arr_user[0].is_billing,
                is_issue:arr_user[0].is_issue,
                is_all_report:arr_user[0].is_all_report,
				
					    is_all_report_data:arr_user[0].is_all_report_data,
						is_all_report_deli:arr_user[0].is_all_report_deli,
						is_all_report_ship:arr_user[0].is_all_report_ship,
						
						
                is_setup_conf:arr_user[0].is_setup_conf,
                is_all_branch:arr_user[0].is_all_branch,
                is_marchant:arr_user[0].is_marchant,
                is_delivery_boy:arr_user[0].is_delivery_boy,

                user_type:arr_user[0].user_type,
                role: 'SA',
                accessToken:window.localStorage.getItem('accessToken'),
              };
          

        console.log(user,'666')

        dispatch({
            type: 'LOGIN',
            payload: {
                user,
            },
        })
    }

    const register = async (email, username, password) => {
        const response = await axios.post('/api/auth/register', {
            email,
            username,
            password,
        })

        const { accessToken, user } = response.data

        setSession(accessToken)

        dispatch({
            type: 'REGISTER',
            payload: {
                user,
            },
        })
    }

    const logout = () => {
        setSession(null)
        localStorage.setItem('accessToken',null)
        localStorage.clear()
        dispatch({ type: 'LOGOUT' })
    }

    useEffect(() => {
        ; (async () => {
            try {
                const accessToken = window.localStorage.getItem('accessToken')

                if (accessToken && isValidToken(accessToken)) {

                    const decode2 = jwt.verify(accessToken, JWT_SECRET);


                    const this_credentials2={
                        email:decode2.email,
                        password:decode2.password
                       }
            
                    const arr_user = [];
                    var filter = [];
                    await axios.post(process.env.REACT_APP_API_BASE_URL+"user/login",this_credentials2).then((res) => {
                        if(res.data.tbl_users_userType[0].is_all_branch==1){
                        localStorage.setItem('all_access', '1');}else{
                            localStorage.setItem('all_access', '0');
                        }
                    filter = filterItemsequal(res.data.branch, 'branch_id', parseInt(res.data.first_branch));

                    console.log(res.data.tbl_users_userType,'res.data.getUser')

                    res.data.getUser.map((temp) => { return arr_user.push({userID:temp.userID, userName: temp.userName, userEmail: temp.userEmail, commission:temp.commission_rate,
                        branch: res.data.branch[0].branch, 
                        branch_id: res.data.branch[0].branch_id, 
                        all_branch: res.data.branch,

                        is_dashboard_account:res.data.tbl_users_userType[0].is_dashboard_account,
						is_dashboard_orders:res.data.tbl_users_userType[0].is_dashboard_orders,
						is_stock_branch:res.data.tbl_users_userType[0].is_stock_branch,
						is_pickup:res.data.tbl_users_userType[0].is_pickup,
						is_update_status_payment:res.data.tbl_users_userType[0].is_update_status_payment,
						is_update_status_update:res.data.tbl_users_userType[0].is_update_status_update,
						is_update_status:res.data.tbl_users_userType[0].is_update_status,
						is_quick_status:res.data.tbl_users_userType[0].is_quick_status,
						is_quick_status_all:res.data.tbl_users_userType[0].is_quick_status_all,
						is_scan_pod:res.data.tbl_users_userType[0].is_scan_pod,
						is_billing_app_col:res.data.tbl_users_userType[0].is_billing_app_col,
						is_billing_dis:res.data.tbl_users_userType[0].is_billing_dis,
						is_billing_app_dis:res.data.tbl_users_userType[0].is_billing_app_dis,
						is_billing:res.data.tbl_users_userType[0].is_billing,
						is_issue:res.data.tbl_users_userType[0].is_issue,

						is_all_report:res.data.tbl_users_userType[0].is_all_report,
						is_all_report_data:res.data.tbl_users_userType[0].is_all_report_data,
						is_all_report_deli:res.data.tbl_users_userType[0].is_all_report_deli,
						is_all_report_ship:res.data.tbl_users_userType[0].is_all_report_ship,

						is_setup_conf:res.data.tbl_users_userType[0].is_setup_conf,
						is_all_branch:res.data.tbl_users_userType[0].is_all_branch,
						is_marchant:res.data.tbl_users_userType[0].is_marchant,
						is_delivery_boy:res.data.tbl_users_userType[0].is_delivery_boy,

                        user_type:res.data.user_type,   
                    }); });
                    
                     if(res.data.tbl_users_userType[0].is_all_branch==1){
                                            localStorage.setItem('all_access', '1');
                    }else{
                        localStorage.setItem('all_access', '0');
                    }
                    localStorage.setItem('accessToken', res.data.accessToken)

                    });
            
 

                    const   user = {
                            id: arr_user[0].userID,
                            avatar: '/assets/images/face-6.jpg',
                            email: arr_user[0].userEmail,
                            commission: arr_user[0].commission,
                            name:  arr_user[0].userName,
                            branch_id:filter[0].branch_id,
                            branch:filter[0].branch,
                            all_branch:arr_user[0].all_branch,


						is_dashboard_account:arr_user[0].is_dashboard_account,
						is_dashboard_orders:arr_user[0].is_dashboard_orders,
						is_stock_branch:arr_user[0].is_stock_branch,
						is_pickup:arr_user[0].is_pickup,
						is_update_status_payment:arr_user[0].is_update_status_payment,
						is_update_status_update:arr_user[0].is_update_status_update,
						is_update_status:arr_user[0].is_update_status,
						is_quick_status:arr_user[0].is_quick_status,
						is_quick_status_all:arr_user[0].is_quick_status_all,
						is_scan_pod:arr_user[0].is_scan_pod,
						is_billing_app_col:arr_user[0].is_billing_app_col,
						is_billing_dis:arr_user[0].is_billing_dis,
						is_billing_app_dis:arr_user[0].is_billing_app_dis,
						is_billing:arr_user[0].is_billing,
						is_issue:arr_user[0].is_issue,
						is_all_report:arr_user[0].is_all_report,
						
						is_all_report_data:arr_user[0].is_all_report_data,
						is_all_report_deli:arr_user[0].is_all_report_deli,
						is_all_report_ship:arr_user[0].is_all_report_ship,
						
						is_setup_conf:arr_user[0].is_setup_conf,
						is_all_branch:arr_user[0].is_all_branch,
						is_marchant:arr_user[0].is_marchant,
						is_delivery_boy:arr_user[0].is_delivery_boy,


                            user_type:arr_user[0].user_type,
                            accessToken:window.localStorage.getItem('accessToken'),
                            role: 'SA',
                          }; 
                           console.log(user,'resuser');

                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: true,
                            user,
                        },
                    })
                } else {
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    })
                }
            } catch (err) {
                console.error(err)
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        })()
    }, [])

    if (!state.isInitialised) {
        return <MatxLoading />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
