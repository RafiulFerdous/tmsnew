import React,{useState,useEffect,useContext}  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar} from '../../Common/Navbar';
import Sidebar from '../../Common/Sidebar';
import Search from '../../Common/Search';
import Footer from '../../Common/Footer';
import '../css/all.css';
import Operformance from '../../Model/operation_content/PerfomanceOperation';
import {LoginContext} from '../../Context/loginContext';
import { SearchContext} from '../../Context/searchContext';
import {SearchButtonContext} from '../../Context/buttonContext';
import {Linksidebar,CustomerCareLinksidebar,Salessidebar,Operationsidebar,Degital_Ocean_flag,company_name,superadminsidebar} from '../../Common/Linksidebar';

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

let convert_time_to_time = (receive_time)=>{
  let return_time = "";
  for(let i=0;i<receive_time.length;i++){
    if(return_time[i]=='/')
      return_time = return_time + "-";
    else 
      return_time = return_time + receive_time[i];
  }
  return_time = return_time + "T15:47:28.807";
  return return_time;
}

let employId,setemployId;
let dcId, setdcId;
let feId, setfeId;
let startDateTime,setstartDateTime;
let endDataTime,setendDataTime;
let submitFlag,setsubmitFlag;
const ODcfeperformance =() =>{
  [employId, setemployId] = useState("");
  [dcId, setdcId] = useState("");
  [feId, setfeId] = useState("");
  [startDateTime, setstartDateTime] = useState("");
  [endDataTime, setendDataTime] = useState("");
  [submitFlag, setsubmitFlag] = useState("");

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
      if(loginInformation.all_user_list.employeE_DEGIGNATION == employee_degignation_list.Operation)
      {
          setsiteBarInformation_LocalStore(Operationsidebar);//useState a set kore rakhlam.
          final_sideBar = Operationsidebar;
      }
      else if(loginInformation.all_user_list.employeE_DEGIGNATION == employee_degignation_list.DistrictIncharge)
      {
          setsiteBarInformation_LocalStore(CustomerCareLinksidebar);//useState a set kore rakhlam
          final_sideBar = CustomerCareLinksidebar;
      }

      else if(loginInformation.all_user_list.employeE_DEGIGNATION == employee_degignation_list.SuperAdmin)
      {
          setsiteBarInformation_LocalStore(superadminsidebar);//useState a set kore rakhlam
          final_sideBar = superadminsidebar;
      }
            
      setLogin_Sidebar_LocalStore(loginInformation,final_sideBar);//local store a set kore rakhlam.
      setlogingInformation_LocalStore(loginInformation);//useState a set kore rakhlam.
    }
    else {
      if(context_flag_obj.all_user_list.employeE_DEGIGNATION == employee_degignation_list.Operation)
      {
          setsiteBarInformation_LocalStore(Operationsidebar);//useState a set kore rakhlam.
      }
      else if(context_flag_obj.all_user_list.employeE_DEGIGNATION == employee_degignation_list.DistrictIncharge)
      {
          setsiteBarInformation_LocalStore(CustomerCareLinksidebar);//useState a set kore rakhlam
      }

      else if(context_flag_obj.all_user_list.employeE_DEGIGNATION == employee_degignation_list.SuperAdmin)
      {
          setsiteBarInformation_LocalStore(superadminsidebar);//useState a set kore rakhlam
      }
      setlogingInformation_LocalStore(context_flag_obj);
      setemployId(context_flag_obj.all_user_list.employeE_ID);
     
    }

  },[]); 
  let searchButtonFunction = (e)=>{
    e.preventDefault();
    console.log("before conversion start time : ",startDateTime);
    console.log("before conversion End time : ",endDataTime);
    
    console.log("after conversion start time : ",convert_time_to_time(startDateTime));
    console.log("after conversion End time : ",convert_time_to_time(endDataTime));

    setstartDateTime(convert_time_to_time(startDateTime));
    setendDataTime(convert_time_to_time(endDataTime));
    setdcId(dcId);
    setfeId(feId);
    console.log("this is fe",feId)
    setsubmitFlag(submitFlag => !submitFlag);
  }

  useEffect(()=>{
    if(typeof(startDateTime)==typeof(null) || typeof(endDataTime)==typeof(null)){
      console.log("Value is not set. No api calling.");
    }
    else {
      var axios = require('axios');
      var data = JSON.stringify({
        "operation_employee_id": employId,
        "start_date": startDateTime,
        "finishing_date": endDataTime,
        "dc_id": parseInt(dcId),
        "fe_id": parseInt(feId)
        
      });
      console.log("Api call data: ",data);
      var config = {
        method: 'post',
        url: Degital_Ocean_flag ? 'https://e-deshdelivery.com/universalapi/allapi/product_volumes'+'?company_name='+company_name : '/universalapi/allapi/product_volumes'+'?company_name='+company_name,
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${logingInformation_LocalStore.token}`
        },
        data : data
      };
      console.log("This is config",config);
  
      axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        console.log(json_object);
        return(json_object);
      }).then(res =>{
            setinformation(res);
            setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  
    }
    
  },[logingInformation_LocalStore,submitFlag]);
    return(
        <>
            <div className="bodydiv">
          <div className="row">
              <div className="col-12 bg-dark">
                  <Navbar sidebar_manu={siteBarInformation_LocalStore}/>
              </div>
          </div>
            {/* <div className="row">
                  <div className="col-12">
                   <Sidebar sidebar_manu={siteBarInformation_LocalStore}/>
                  </div>
                  </div> */}
                    
                      
                   
           
                       <div className="row container">
            
                          <div className="col-12" id="volume">
                          <div className="border border-dark bg-dark mb-5">
                                <h3 className="text-center text-white">FE-DC Performance</h3>
                                <div className="container p-3">
                                  <div className="row justify-content-center mx-auto">
                                    <div className="col-10 mx-auto">
                                      <form className="form-inline">
                                          <div className="d-flex justify-content-center mx-auto text-center">
                                            <div className=" text-center text-white mx-1">
                                                    DC Name: <input type="tex" className="input-small " value={dcId} onChange={(e)=>{ setdcId(e.target.value) }}/>
                                                </div>
                                                <div className="text-center text-white mx-1">
                                                    FE Name: <input type="text" className="input-small " value={feId} onChange={(e)=>{ setfeId(e.target.value) }}/>
                                                </div>
                                              
                                                <div className=" text-center text-white mx-1">
                                                    Start Date: <input type="date" className="input-small " value={startDateTime} onChange={(e)=>{ setstartDateTime(e.target.value) }}/>
                                                </div>
                                                <div className="text-center text-white mx-1">
                                                    End Date: <input type="date" className="input-small" value={endDataTime} onChange={(e)=>{ setendDataTime(e.target.value) }}/>
                                                </div>
                                               
                                          </div>
                                          <div className="mx-auto text-center">
                                              <button type="submit" className="btn btn-info text-white mt-5" onClick={searchButtonFunction}>Confirm</button>
                                          </div>
                                      </form>  
                                    </div>
                                  </div>
                                </div>
                            </div>
                            <div>
                            {
                            payload ? <Operformance response={information}/> : 
                              <div className="mx-5 d-flex justify-content-center mt-5">
                                    <h4>Please Filter Your Date</h4>
                              </div>
                            }
                          
                            </div>
                          
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
export default ODcfeperformance;