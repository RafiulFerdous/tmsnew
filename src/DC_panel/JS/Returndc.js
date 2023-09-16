import React,{useState,useEffect,useContext}  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar} from '../../Common/Navbar';
import Sidebar from '../../Common/Sidebar';
import Search from '../../Common/Search';
import Footer from '../../Common/Footer';
import Returndctable from '../../Model/Dcpanel/Returndctable';
// import '../css/all.css';
import axios from 'axios';
import {BrowserRouter,Switch,Route,useHistory,useLocation,Link} from 'react-router-dom';
import {LoginContext} from '../../Context/loginContext';
import { SearchContext} from '../../Context/searchContext';
import {SearchButtonContext} from '../../Context/buttonContext';
import {Linksidebar,CustomerCareLinksidebar,Salessidebar,Operationsidebar,Degital_Ocean_flag,company_name,dcpanel,superadminsidebar} from '../../Common/Linksidebar';

let employee_degignation_list = {
    ProcessingCenter : "PROCESSING CENTER",
    DistrictIncharge : "DISTRICT INCHARGE",
    CustomerCare : "CUSTOMER CARE",
    FieldExecutive : "FIELD EXECUTIVE",
    Marketing_executive : "MARKETING EXECUTIVE",
    Operation : "OPERATION",
    Finance : "FINANCE",
    Admin : "ADMIN",
    SuperAdmin : "SUPERADMIN",
    Customer : "Client"
}

const Returndc =() => {
    const [employId, setemployId] = useState("")

    const [information, setinformation] = useState({});
    const [payload, setpayload] = useState(false);

    var {loginInformation, setloginInformation} = useContext(LoginContext);

    const [logingInformation_LocalStore, setlogingInformation_LocalStore] = useState(loginInformation);
    const [siteBarInformation_LocalStore, setsiteBarInformation_LocalStore] = useState([]);

    let setLogin_Sidebar_LocalStore = (current_value_login_context, sidebar_context) => {
        localStorage.setItem("logingInformation_LocalStore", JSON.stringify(current_value_login_context));
    }

    let getLogingInformation_LocalStore = () => {
        let value = JSON.parse(localStorage.getItem("logingInformation_LocalStore"));
        return value;
    }

    useEffect(() => {
        let final_sideBar = null;
        let context_flag_obj = null;
        context_flag_obj = getLogingInformation_LocalStore();

        if (context_flag_obj == undefined) {
            if (loginInformation.all_user_list.employeE_DEGIGNATION == employee_degignation_list.ProcessingCenter) {
                setsiteBarInformation_LocalStore(Linksidebar);//useState a set kore rakhlam.
                final_sideBar = Linksidebar;
            } else if (loginInformation.all_user_list.employeE_DEGIGNATION == employee_degignation_list.DistrictIncharge) {
                setsiteBarInformation_LocalStore(dcpanel);//useState a set kore rakhlam
                final_sideBar = dcpanel;
            }
            setemployId(loginInformation.all_user_list.employeE_ID);
            setLogin_Sidebar_LocalStore(loginInformation, final_sideBar);//local store a set kore rakhlam.
            setlogingInformation_LocalStore(loginInformation);//useState a set kore rakhlam.
        } else {
            if (context_flag_obj.all_user_list.employeE_DEGIGNATION == employee_degignation_list.ProcessingCenter) {
                setsiteBarInformation_LocalStore(Linksidebar);//useState a set kore rakhlam.
            } else if (context_flag_obj.all_user_list.employeE_DEGIGNATION == employee_degignation_list.DistrictIncharge) {
                setsiteBarInformation_LocalStore(dcpanel);//useState a set kore rakhlam
            }

            else if (context_flag_obj.all_user_list.employeE_DEGIGNATION == employee_degignation_list.SuperAdmin) {
                setsiteBarInformation_LocalStore(superadminsidebar);//useState a set kore rakhlam
            }
            setemployId(context_flag_obj.all_user_list.employeE_ID);
            setlogingInformation_LocalStore(context_flag_obj);
        }

    }, []);

    useEffect(()=>{
        console.log(siteBarInformation_LocalStore);
        let data = JSON.stringify({
            "DC_ID_number": logingInformation_LocalStore.all_user_list.employeE_ID
        });

        var config = {
            method: 'post',
            url: Degital_Ocean_flag ? 'https://e-deshdelivery.com/universalapi/allapi/GettingReturnProductbyDC'+'?company_name='+company_name : '/universalapi/allapi/GettingReturnProductbyDC'+'?company_name='+company_name,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${logingInformation_LocalStore.token}`
            },
            data:data
        };

        axios(config)
            .then(function (response) {
                let json_object_str = JSON.stringify(response.data);
                let json_object = JSON.parse(json_object_str);
                return(json_object);
            })
            .then(res => {
                console.log("response is return product dc ",res);
                setinformation(res.message.returnProductInformation);
                setpayload(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    },[logingInformation_LocalStore]);

    console.log("response is return product dc info ",information);



    return(
        <>
            <div className="bodydiv">
                <div className="row">
                    <div className="col-12 ">
                        <Navbar sidebar_manu={siteBarInformation_LocalStore}/>
                    </div>
                </div>
                {/* <div className="row">
                  <div className="col-12">
                   <Sidebar sidebar_manu={siteBarInformation_LocalStore}/>
                  </div>
                  </div> */}

                {/* <div className="row container-fluid">
                            <div className="col-6 " id="srchmenu">
                                    <Search/>
                            </div>
                       </div>
                    */}

                <div className="row container">
                    <div className="col-12 d-flex" id="menuhome">
                        {payload ? <Returndctable response={information}/> :
                            <div className="sk-cube-grid">
                                <div className="sk-cube sk-cube1"></div>
                                <div className="sk-cube sk-cube2"></div>
                                <div className="sk-cube sk-cube3"></div>
                                <div className="sk-cube sk-cube4"></div>
                                <div className="sk-cube sk-cube5"></div>
                                <div className="sk-cube sk-cube6"></div>
                                <div className="sk-cube sk-cube7"></div>
                                <div className="sk-cube sk-cube8"></div>
                                <div className="sk-cube sk-cube9"></div>
                            </div>
                        }

                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Footer/>

                    </div>
                </div>
            </div>

        </>
    )

}
export default Returndc;