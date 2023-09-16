import React,{useState,useEffect,useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar} from '../../Common/Navbar';
import Sidebar from '../../Common/Sidebar';
import Search from '../../Common/Search';
import Footer from '../../Common/Footer';
import Csupport from '../../Model/Customer_content/Csupport';
import '../css/all.css';
import axios from 'axios';
import {Linksidebar,CustomerCareLinksidebar,Salessidebar,Operationsidebar,Degital_Ocean_flag,company_name} from '../../Common/Linksidebar';
import {LoginContext} from '../../Context/loginContext';
import {toast} from 'react-toastify'; 
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
  let getCurrentTime = ()=>{
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  if(hours < 10)
    hours = "0"+hours;
  let minutes = date_ob.getMinutes();
  if(minutes < 10)
    minutes = "0"+minutes;
  let seconds = date_ob.getSeconds();
  if(seconds < 10)
    seconds = "0"+seconds;
  let milisecond = date_ob.getMilliseconds();
  if(milisecond < 10)
    milisecond = "0"+milisecond;
  let date_time = year + "-" + month + "-" + date + "T" + hours + ":" + minutes + ":" + seconds +"." + milisecond;
  return date_time;
}
let clientName,setclientName;
let clientEmail,setclientEmail;
let clientContact,setclientContact;
let dateTime, setdateTime;
let clientQuery, setclientQuery;
let id, setid;
const Support =() =>{
  toast.configure();
  [clientName,setclientName] = useState("");
  [id,setid] = useState("");
  [clientEmail,setclientEmail] = useState("");
  [clientContact,setclientContact] = useState("");
  [clientQuery, setclientQuery] = useState("");
  [dateTime, setdateTime] = useState("");
  const [information, setinformation] = useState({});
  const [payload, setpayload] = useState(false);
  const [bagCreationFlag, setbagCreationFlag] = useState(false);
  const [bagInformationrefreshflag, setbagInformationrefreshflag] = useState(false);
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
      if(loginInformation.user_type == employee_degignation_list.Customer)
      {
          setsiteBarInformation_LocalStore(CustomerCareLinksidebar);//useState a set kore rakhlam.
          final_sideBar = CustomerCareLinksidebar;
      }
      else if(loginInformation.all_user_list.employeE_DEGIGNATION == employee_degignation_list.ProcessingCenter)
      {
          setsiteBarInformation_LocalStore(Linksidebar);//useState a set kore rakhlam.
          final_sideBar = Linksidebar;
      }
            
      setLogin_Sidebar_LocalStore(loginInformation,final_sideBar);//local store a set kore rakhlam.
      setlogingInformation_LocalStore(loginInformation);//useState a set kore rakhlam.
       setdateTime(getCurrentTime);
      
    }
    else {
      if(context_flag_obj.user_type == employee_degignation_list.Customer)
      {
          setsiteBarInformation_LocalStore(CustomerCareLinksidebar);//useState a set kore rakhlam.
      }
      else if(context_flag_obj.all_user_list.employeE_DEGIGNATION == employee_degignation_list.ProcessingCenter)
      {
          setsiteBarInformation_LocalStore(Linksidebar);//useState a set kore rakhlam.
      }
      setlogingInformation_LocalStore(context_flag_obj);
       setdateTime(getCurrentTime);
     
    }

  },[]); 
   let bagCreationSubmitButtonFunction = (e) => {
    e.preventDefault();
    var axios = require('axios');
    var data = JSON.stringify({
    
      "clienT_NAME": clientName,
      "clienT_EMAIL": clientEmail,
      "clienT_CONTACT_NUMBER": clientContact,
      "clienT_QUERY": clientQuery,
      "querY_DATETIME": dateTime
    });

    console.log("this is json body parameter: ",data);

    var config = {
      method: 'post',
      url: Degital_Ocean_flag ? 'https://e-deshdelivery.com/universalapi/allapi/clientQueryRequest'+'?company_name='+company_name : '/universalapi/allapi/clientQueryRequest'+'?company_name='+company_name,
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${logingInformation_LocalStore.token}`
      },
      data : data
    };
    console.log("this is",config);

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      setbagInformationrefreshflag(bagInformationrefreshflag => !bagInformationrefreshflag);
      toast.success("Successfully Send !", {
        position: toast.POSITION.TOP_CENTER, autoClose:1500
      });
    })
    .catch(function (error) {
      console.log(error);
    });
    setbagCreationFlag(bagCreationFlag => !bagCreationFlag);
    
  }
  // useEffect(()=>{
   

  // },[bagCreationFlag])
    return(
        <>
            <div className="l bodydiv">
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
                    
                   
           
            <div className="row container-fluid">
                            <div className="col-6 d-flex" id="supoortc">
                             <div className="row my-3" >
                    <div className="col text-center mb-4">
                        <h2 className="text-white" id="contacttext">Contact Us</h2>
                    </div>
                    <div className="container-fluid mx-4">
                        <form>
                            <div className="form-group row">
                            <label htmlFor="fname" className="col-sm-3 mb-3 col-form-label text-white ">
                                <h6>Client Name:</h6>
                            </label>
                            <div className="col-sm-8">
                                <input
                                type="text"
                                className="form-control rounded"
                                id="fname"
                                name="fname"
                                placeholder="Full name..."
                                required
                                value={clientName} onChange={(e)=>{ setclientName(e.target.value) }}
                                />
                            </div>
                            </div>
                            <div className="form-group row">
                            <label htmlFor="email" className="col-sm-3 mb-3 col-form-label text-white">
                                <h6>E-mail:</h6>
                            </label>
                            <div className="col-sm-8">
                                <input
                                type="email"
                                className="form-control rounded"
                                id="email"
                                name="email"
                                placeholder="E-mail address..."
                                required
                                 value={clientEmail} onChange={(e)=>{ setclientEmail(e.target.value) }}
                                />
                            </div>
                            </div>
                            <div className="form-group row">
                            <label htmlFor="phone" className="col-sm-3 mb-3 col-form-label text-white">
                                <h6>Phone Number:</h6>
                            </label>
                            <div className="col-sm-8">
                                <input
                                type="tel"
                                className="form-control rounded"
                                id="phone"
                                name="phone"
                                placeholder="Phone number..."
                                required
                                 value={clientContact} onChange={(e)=>{ setclientContact(e.target.value) }}
                                />
                            </div>
                            </div>
                            <div className="form-group row">
                            <label htmlFor="message" className="col-sm-3 mb-3 col-form-label text-white">
                                <h6>Message:</h6>
                            </label>
                            <div className="col-sm-8">
                                <textarea
                                className="form-control rounded"
                                id="message"
                                name="message"
                                rows={6}
                                placeholder="Your message..."
                                required
                                 value={clientQuery} onChange={(e)=>{ setclientQuery(e.target.value) }}

                                />
                            </div>
                            </div>
                            <div className="row">
                            <div className="col-sm-12 mt-3 mb-3 offset-sm-3">
                                <button type="submit" className="btn btn-primary" onClick={bagCreationSubmitButtonFunction}disabled={!clientName||!clientQuery}>
                                Send Message
                                </button>
                            </div>
                            </div>
                        </form>
                    </div>
                </div>
                                <Csupport/>
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
export default Support;