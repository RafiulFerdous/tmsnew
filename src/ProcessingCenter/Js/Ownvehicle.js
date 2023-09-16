import React,{useState,useEffect,useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar} from '../../Common/Navbar';
import Sidebar from '../../Common/Sidebar';
import Search from '../../Common/Search';
import Footer from '../../Common/Footer';
import '../css/all.css';
import Owntable from '../../Model/Processingcenter/owntable';
import {LoginContext} from '../../Context/loginContext';
import {Linksidebar,CustomerCareLinksidebar,Salessidebar,Operationsidebar,company_name} from '../../Common/Linksidebar';

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
    Customer : "CUSTOMER"
  }
  
const Own =() =>{
  const [information, setinformation] = useState({});
  const [payload, setpayload] = useState(false);

  var {loginInformation,setloginInformation} = useContext(LoginContext);

  const [logingInformation_LocalStore, setlogingInformation_LocalStore] = useState(loginInformation);
  const [siteBarInformation_LocalStore, setsiteBarInformation_LocalStore] = useState([]);

  let setLogin_Sidebar_LocalStore = (current_value_login_context,sidebar_context)=>{
    localStorage.setItem("logingInformation_LocalStore", JSON.stringify(current_value_login_context));
  }

  let getLogingInformation_LocalStore = ()=>{
    let value = JSON.parse(localStorage.getItem("logingInformation_LocalStore"));
    return value;
  }

  useEffect(()=>{
    let final_sideBar = null;
    let context_flag_obj = null;
    context_flag_obj = getLogingInformation_LocalStore();

    if(context_flag_obj == undefined){
      if(loginInformation.all_user_list.employeE_DEGIGNATION == employee_degignation_list.ProcessingCenter)
      {
          setsiteBarInformation_LocalStore(Linksidebar);//useState a set kore rakhlam.
          final_sideBar = Linksidebar;
      }
      else if(loginInformation.all_user_list.employeE_DEGIGNATION == employee_degignation_list.DistrictIncharge)
      {
          setsiteBarInformation_LocalStore(CustomerCareLinksidebar);//useState a set kore rakhlam
          final_sideBar = CustomerCareLinksidebar;
      }
            
      setLogin_Sidebar_LocalStore(loginInformation,final_sideBar);//local store a set kore rakhlam.
      setlogingInformation_LocalStore(loginInformation);//useState a set kore rakhlam.
    }
    else {
      if(context_flag_obj.all_user_list.employeE_DEGIGNATION == employee_degignation_list.ProcessingCenter)
      {
          setsiteBarInformation_LocalStore(Linksidebar);//useState a set kore rakhlam.
      }
      else if(context_flag_obj.all_user_list.employeE_DEGIGNATION == employee_degignation_list.DistrictIncharge)
      {
          setsiteBarInformation_LocalStore(CustomerCareLinksidebar);//useState a set kore rakhlam
      }
      setlogingInformation_LocalStore(context_flag_obj);
    }

  },[]); 

    return(
        <>
            <div className="truck bodydiv">
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
                      {/*        
                      <div className="row container">
                            <div className="col-6 " id="srchmenu">
                                <Search/>
                            </div>
                      </div>*/}
                            
                    
                        <div className="row container">
                          <div className="col-12" id="vh">
                              <Owntable/> 
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
};
export default Own;