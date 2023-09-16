import React,{useState,useEffect,useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar} from '../../Common/Navbar';
import Sidebar from '../../Common/Sidebar';
import Search from '../../Common/Search';
import Footer from '../../Common/Footer';
import { Producttable } from '../../Model/Processingcenter/producttable';
import '../css/all.css';
import { useHistory,useLocation } from 'react-router';
import {toast} from 'react-toastify'; 
import QrReader from 'react-qr-reader';

import {LoginContext} from '../../Context/loginContext';
import {Linksidebar,CustomerCareLinksidebar,Salessidebar,Operationsidebar,Degital_Ocean_flag,company_name} from '../../Common/Linksidebar';
import { Navbar1 } from '../../Common/Navbar1';

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

let bagIdNumber,setbagIdNumber;
let bagProductWaybillList,setbagProductWaybillList;
let dateTime, setdateTime;
let strProductWaybillList,setstrProductWaybillList;

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

let string_to_list = (str_obj) => {
  let list_obj = [];
  let single_list_value = "";
  for(let i=0;i<str_obj.length;i++){

    if(str_obj[i]==','){
      list_obj.push(single_list_value);
      single_list_value = "";
    }
    else {
      if(str_obj[i]==' ')
        continue;
      else 
        single_list_value = single_list_value + str_obj[i];
    }
  }
  if(single_list_value.length > 0)
    list_obj.push(single_list_value);

  return list_obj;
}
  
const Product =() =>{
  toast.configure();
  let location = useLocation();
  // change here
  // const [myparam,setmyparam] =useState("")
  // useEffect(()=>{
  //   setmyparam(location.state.fromNotifications)
  // },[])
  // change end
  let history = useHistory()
  let myparam;
  try{
    myparam = location.state.fromNotifications;
  }catch(e){
    history.push("/bagcreation");
  }
  const [scannedData, setScannedData] = useState('');
  const [information, setinformation] = useState({});
  const [payload, setpayload] = useState(false);
  const [insertProductBag, setinsertProductBag] = useState(false);
  const [insertProductRefreshflag, setinsertProductRefreshflag] = useState(false);

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


  [bagIdNumber,setbagIdNumber] = useState(-5);
  [bagProductWaybillList,setbagProductWaybillList] = useState([]);
  [dateTime, setdateTime] = useState("");
  [strProductWaybillList, setstrProductWaybillList] = useState("");

  const handleScan = (data) => {
    if (data) {
      // Add a comma to the scanned data
      const dataWithComma = `${data},`;
      setScannedData(dataWithComma);
    }
  }
  console.log("scanned data",scannedData)

  const handleError = (error) => {
    console.error(error);
  }


  let insertProductinBagSubmitButtonFunction = (e) => {
    e.preventDefault();
    //string theke list a convert korte hobe.......
    setbagProductWaybillList(string_to_list(strProductWaybillList));
    
    //end of conversion............................
    setbagIdNumber(myparam);//ekhane bag id number dite hobe............
    setdateTime(getCurrentTime);
    setinsertProductBag(insertProductBag => !insertProductBag);
  }
   useEffect(()=>{
    var axios = require('axios');
    var data = JSON.stringify({
      "employee_id": logingInformation_LocalStore.all_user_list.employeE_ID,
      "bag_id": bagIdNumber,
      "all_product_waybill": bagProductWaybillList,
      "dateTime": dateTime,
    });
    console.log("body parameter : ", data);
    var config = {
      method: 'post',
      url: Degital_Ocean_flag ? 'https://e-deshdelivery.com/universalapi/allapi/insertProductinBag'+'?company_name='+company_name : '/universalapi/allapi/insertProductinBag'+'?company_name='+company_name,
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${logingInformation_LocalStore.token}`
      },
      data : data
    };

    axios(config)
    .then(function (response) {
      console.log("bag insert response",response.data);
      setinsertProductRefreshflag(insertProductRefreshflag => !insertProductRefreshflag);
      if(response.status == 200){
        if(response.data.wrong_waybill_list.length>=1){
          let str="";
          response.data.wrong_waybill_list.map(wrong_waybill=>{
            str += wrong_waybill +" ";
          })

          toast.error(`Wrong Waybill List ! 
          ${str}`, {
            position: "top-right",
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,

          });
      }else{
        toast.success("Product Inserted in Bag !", {
          position: "top-right",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,

        });

      }
      }
      else{
        toast.error("Some went Wrong!", {
        position: toast.POSITION.TOP_CENTER, autoClose:1500
      });
      }
     
    })
    .catch(function (error) {
      console.log(error);
      
      // toast.error("Product Already Insert !", {
      //   position: toast.POSITION.TOP_CENTER, autoClose:1500
      // });
      
    });

 },[insertProductBag])
    

    useEffect(()=>{

            var axios = require('axios');
            var data = JSON.stringify({
              "bag_id_number": myparam 
            });

            var config = {
              method: 'post',
              url: Degital_Ocean_flag ? 'https://e-deshdelivery.com/universalapi/allapi/bagProductInformationForPC'+'?company_name='+company_name : '/universalapi/allapi/bagProductInformationForPC'+'?company_name='+company_name,
              headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${logingInformation_LocalStore.token}`
              },
              data : data
            };

            axios(config)
            .then(function (response) {
              let json_object_str = JSON.stringify(response.data);
              let json_object = JSON.parse(json_object_str);
              console.log(json_object);
              return(json_object);
            }).then((res)=>{
              setinformation(res);
              setpayload(true);
              console.log("call successful",res);
            })
            .catch(function (error) {
              console.log(error);
            });

    },[logingInformation_LocalStore,insertProductRefreshflag])
// to add auto comma
// to go back to old version replace 
    const addcomma=(e)=>{

      let tempstr = e.target.value
      let newstr=""
      let count=0
      for(let i=0;i<tempstr.length;i++){
        if(tempstr[i]==" "||tempstr[i]==","){
          continue;
        }
        if(count===12){
          count=0
          newstr+=tempstr[i]+","
        }
        else{
        count++
        newstr+=tempstr[i]
        }
      }
      console.log("new str", newstr)
      setstrProductWaybillList(newstr)
      

    }

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
                    
                 
                       <div className="row container">
                          <div className="col-12" id="bgcrt">
                            <div className="border border-primary d">
                                <div className="container p-3">
                                        <form>
                                            <div className="form-group row mb-2">
                                                <label htmlFor className="col-sm-3 col-form-label">Way Bill Number:</label>
                                                <div className="col-sm-6">
                                                    <input type="text" className="form-control form-control-success" placeholder="Waybill Number" required value={strProductWaybillList}  onChange={(e)=>{ addcomma(e) }}/>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-12 d-flex justify-content-center text-align-center">
                                                    <button className="btn btn-primary  mb-3" onClick={insertProductinBagSubmitButtonFunction}disabled={!strProductWaybillList}>Submit</button>
                                                </div>
                                            </div>
                                        </form>
                                </div>
                            </div>
                            {payload ? <Producttable response={information}/> : 
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
};
export default Product;