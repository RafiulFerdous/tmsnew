import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
import "../css/all.css";
import Salespickuprequesttable from "../../Model/Sales_content/SalesPickuprequesttable";

import { LoginContext } from "../../Context/loginContext";
import { SearchContext } from "../../Context/searchContext";
import { SearchButtonContext } from "../../Context/buttonContext";
import {
  Linksidebar,
  CustomerCareLinksidebar,
  Salessidebar,
  Operationsidebar,
  Degital_Ocean_flag,
  company_name,
  superadminsidebar,
} from "../../Common/Linksidebar";
import {
  faAddressBook,
  faAddressCard,
  faBusinessTime,
  faEnvelope,
  faMobile,
  faMoneyBillAlt,
  faTruck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faProductHunt } from "@fortawesome/free-brands-svg-icons";

let employee_degignation_list = {
  ProcessingCenter: "PROCESSING CENTER",
  DistrictIncharge: "DISTRICT INCHARGE",
  CustomerCare: "CUSTOMER CARE",
  FieldExecutive: "FIELD EXECUTIVE",
  Marketing_executive: "MARKETING EXECUTIVE",
  Operation: "OPERATION",
  Finance: "FINANCE",
  Admin: "ADMIN",
  SuperAdmin: "SUPERADMIN",
  Customer: "CUSTOMER",
};
let getCurrentTime = () => {
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  if (hours < 10) hours = "0" + hours;
  let minutes = date_ob.getMinutes();
  if (minutes < 10) minutes = "0" + minutes;
  let seconds = date_ob.getSeconds();
  if (seconds < 10) seconds = "0" + seconds;
  let milisecond = date_ob.getMilliseconds();
  if (milisecond < 10) milisecond = "0" + milisecond;
  let date_time =
    year +
    "-" +
    month +
    "-" +
    date +
    "T" +
    hours +
    ":" +
    minutes +
    ":" +
    seconds +
    "." +
    milisecond;
  return date_time;
};

let employId, setemployId;
let date_time, setdate_time;

const SalesPickup = () => {
  //   const [showText, setShowText] = useState(false);
  //   let onclick = (e) =>{
  //     e.preventDefault();
  //     setShowText(!showText);
  //   }
  [employId, setemployId] = useState("");
  [date_time, setdate_time] = useState("");

  const [information, setinformation] = useState({});
  const [payload, setpayload] = useState(false);

  var { loginInformation, setloginInformation } = useContext(LoginContext);

  const [logingInformation_LocalStore, setlogingInformation_LocalStore] =
    useState(loginInformation);
  const [siteBarInformation_LocalStore, setsiteBarInformation_LocalStore] =
    useState([]);

  let setLogin_Sidebar_LocalStore = (
    current_value_login_context,
    sidebar_context
  ) => {
    localStorage.setItem(
      "logingInformation_LocalStore",
      JSON.stringify(current_value_login_context)
    );
  };

  let getLogingInformation_LocalStore = () => {
    let value = JSON.parse(
      localStorage.getItem("logingInformation_LocalStore")
    );
    return value;
  };

  useEffect(() => {
    let final_sideBar = null;
    let context_flag_obj = null;
    context_flag_obj = getLogingInformation_LocalStore();

    if (context_flag_obj == undefined) {
      if (
        loginInformation.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.Marketing_executive
      ) {
        setsiteBarInformation_LocalStore(Salessidebar); //useState a set kore rakhlam.
        final_sideBar = Salessidebar;
      } else if (
        loginInformation.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.DistrictIncharge
      ) {
        setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam
        final_sideBar = CustomerCareLinksidebar;
      }
      //useState a set kore rakhlam.
      setLogin_Sidebar_LocalStore(loginInformation, final_sideBar); //local store a set kore rakhlam.
      setemployId(loginInformation.all_user_list.employeE_ID);
      setlogingInformation_LocalStore(loginInformation); //useState a set kore rakhlam.
      console.log(
        "value set up if: ",
        loginInformation.all_user_list.employeE_ID
      );
    } else {
      if (
        context_flag_obj.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.Marketing_executive
      ) {
        setsiteBarInformation_LocalStore(Salessidebar); //useState a set kore rakhlam.
      } else if (
        context_flag_obj.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.SuperAdmin
      ) {
        setsiteBarInformation_LocalStore(superadminsidebar); //useState a set kore rakhlam
      }
      setlogingInformation_LocalStore(context_flag_obj);
      setemployId(context_flag_obj.all_user_list.employeE_ID);
      setlogingInformation_LocalStore(context_flag_obj);
      console.log(
        "value set up else : ",
        context_flag_obj.all_user_list.employeE_ID
      );
    }
  }, []);

  useEffect(() => {
    var axios = require("axios");
    var data = JSON.stringify({
      sales_employee_id: employId,
    });

    console.log(" Table APi: ", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/salesMonitorPickupRequest" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/salesMonitorPickupRequest" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        console.log(json_object);
        return json_object;
      })
      .then((res) => {
        setinformation(res);
        setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [logingInformation_LocalStore]);
  return (
    <>
      <div className="bodydiv">
        <div className="row">
          <div className="col-12 bg-dark">
            <Navbar sidebar_manu={siteBarInformation_LocalStore} />
          </div>
        </div>
        {/* <div className="row">
                  <div className="col-12">
                   <Sidebar sidebar_manu={siteBarInformation_LocalStore}/>
                  </div>
                  </div> */}

        {/* <div className="row container">
                            <div className="col-6 " id="srchmenu">
                                    <Search/>
                            </div>
                       </div> */}

        <div className="mt-5 pt-5 container">
          <div className="pt-5 col-12" id="">
            {/* <div className="m">
                                    <div className='col-md-12 d-flex justify-content-center mb-1 mt-5'> 

                                            <button className=" bg-primary  border-primary btn-sm text-white"onClick={onclick}> PickUp Request Form</button>
                                            

                                    </div>
                                  
                                    
                            </div>
                            {showText && <Text/>} */}
            {payload ? (
              <Salespickuprequesttable response={information} />
            ) : (
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
            )}
          </div>
        </div>
        <div className="">
          <div className="col-12">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};
// const Text = () =>
//                         <div className="mt-5">
//                                 <div className="border border-primary bgimg">
//                               <h3 className="text-center bg-info"> Place an order/PickUp Request</h3>
//                               <div className="container p-3">
//                                       <form>
//                                           {/*
//                                           <div className="form-group row mb-2">
//                                               <label htmlFor className="col-sm-3 col-form-label">Client Name:</label>
//                                               <div className="col-sm-6">
//                                                   <input type="text" className="form-control form-control-success" placeholder="Name.." required/>
//                                               </div>
//                                           </div>
//                                           <div className="form-group row mb-2">
//                                               <label htmlFor className="col-sm-3 col-form-label">PickUp Address:</label>
//                                               <div className="col-sm-6">
//                                                   <input type="text" className="form-control" placeholder="Address" required/>
//                                               </div>
//                                           </div>
//                                           <div className="form-group row mb-2">
//                                               <label htmlFor className="col-sm-3 col-form-label">Pin Code:</label>
//                                               <div className="col-sm-6">
//                                                   <input type="text" className="form-control" placeholder="1230" required/>
//                                               </div>
//                                           </div>
//                                           <div className="form-group row mb-2">
//                                               <label htmlFor className="col-sm-3 col-form-label">Date and Time</label>
//                                               <div className="col-sm-6">
//                                                   <input type="text" className="form-control" placeholder="11-7-21 11.30"required/>
//                                               </div>
//                                           </div>
//                                           <div className="form-group row mb-2">
//                                               <label htmlFor className="col-sm-3 col-form-label">Total Number of Packges:</label>
//                                               <div className="col-sm-6">
//                                                   <input type="text" className="form-control" placeholder="1-2-3" required/>
//                                               </div>
//                                           </div>
//                                           <div className="form-group row mb-2">
//                                               <label htmlFor className="col-sm-3 col-form-label">Product Type:</label>
//                                               <div className="col-sm-6" >
//                                               <select className="form-control">
//                                                   <option>Select Your Product Type</option>
//                                                   <option>Fragile</option>
//                                                   <option>Perishable</option>
//                                                   <option>Gadgets</option>
//                                                   <option>Electronics</option>
//                                                   <option>Fashion Item</option>
//                                                   <option>Clothing</option>
//                                                   <option>Document</option>
//                                                   <option>Glass</option>
//                                                   <option>Liquid</option>
//                                               </select>
//                                               </div>
//                                           </div>
//                                           */}
//                                           <h6 className="text-success"><FontAwesomeIcon icon={faBusinessTime} className=" rounded-circle mx-2" id="icn"></FontAwesomeIcon><u>Shop/Business Deatils</u></h6>
//                                           <div className="form-group has-success mb-2">
//                                               <label className="control-label" htmlFor="inputSuccess1">
//                                                   <h6><FontAwesomeIcon icon={faUser} className=" rounded-circle mx-2" id="icn"></FontAwesomeIcon>Marchant/Shop Name:</h6>
//                                               </label>
//                                               <p className="border border-light bg-light form-control mt-1">Mithila Collection</p>
//                                           </div>
//                                           <div className="form-group has-success mb-2">
//                                               <label className="control-label" htmlFor="inputSuccess1">
//                                                   <h6><FontAwesomeIcon icon={faAddressBook} className=" rounded-circle mx-2" id="icn"></FontAwesomeIcon>Marchant Contact Person Name:</h6>
//                                               </label>
//                                               <p className="border border-light bg-light form-control mt-1">ALien</p>
//                                           </div>
//                                           <h6 className="text-success"><FontAwesomeIcon icon={faTruck} className=" rounded-circle mx-2" id="icn"></FontAwesomeIcon><u>Package and Delivary Details:</u></h6>
//                                           <div className="form-group has-success mb-2">
//                                               <label className="control-label" htmlFor="inputSuccess1">
//                                                   <h6><FontAwesomeIcon icon={faUser} className=" rounded-circle mx-2" id="icn"></FontAwesomeIcon>Consignee:</h6>
//                                               </label>
//                                               <input type="text" className="form-control mt-1" required/>
//                                           </div>
//                                           <div className="form-group has-success mb-2">
//                                               <label className="control-label" htmlFor="inputSuccess1">
//                                                   <h6><FontAwesomeIcon icon={faAddressCard} className=" rounded-circle mx-2" id="icn"></FontAwesomeIcon>Delivary Address:</h6>
//                                               </label>
//                                               <input type="text" className="form-control mt-1" required/>
//                                           </div>
//                                           <div className="form-group has-success mb-2">
//                                               <label className="control-label" htmlFor="inputSuccess1">
//                                                   <h6><FontAwesomeIcon icon={faMobile} className=" rounded-circle mx-2" id="icn"></FontAwesomeIcon>Mobile Number:</h6>
//                                               </label>
//                                               <input type="text" className="form-control mt-1"required/>
//                                           </div>
//                                           <div className="form-group has-success mb-2">
//                                               <label className="control-label" htmlFor="inputSuccess1">
//                                                   <h6><FontAwesomeIcon icon={faMoneyBillAlt} className=" rounded-circle mx-2" id="icn"></FontAwesomeIcon>Total COD Amount:</h6>
//                                               </label>
//                                               <input type="text" className="form-control mt-1"required/>
//                                           </div>
//                                           <div className="form-group has-success mb-2">
//                                               <label className="control-label" htmlFor="inputSuccess1">
//                                                   <h6><FontAwesomeIcon icon={faProductHunt} className=" rounded-circle mx-2" id="icn"></FontAwesomeIcon>Product Deatils</h6>
//                                               </label>
//                                               </div>
//                                           <div>
//                                           <input list="brow"  className="form-control" required/>
//                                           <datalist id="brow">
//                                               <option value="Fragile"></option>
//                                               <option value="Perishable"></option>
//                                               <option value="Gadgets"></option>
//                                               <option value="Electronics"></option>
//                                               <option value="Fashion Item"></option>
//                                               <option value="Clothing"></option>
//                                               <option value="Document"></option>
//                                               <option value="Glass"></option>
//                                               <option value="Liquid"></option>
//                                           </datalist>
//                                           </div>
//                                           <div className="form-group has-success mb-2">
//                                               <label className="control-label" htmlFor="inputSuccess1">
//                                                   <h6><FontAwesomeIcon icon={faProductHunt} className=" rounded-circle mx-2" id="icn"></FontAwesomeIcon>Product Description:</h6>
//                                               </label>
//                                               <input type="text" className="form-control mt-1"required/>
//                                           </div>
//                                           <div className="form-group has-success mb-3">
//                                               <label className="control-label" htmlFor="inputSuccess1">
//                                                   <h6><FontAwesomeIcon icon={faEnvelope} className=" rounded-circle mx-2" id="icn"></FontAwesomeIcon>Special Instruction:</h6>
//                                               </label>
//                                           </div>
//                                           <div>
//                                               <input list="brow"  className="form-control" required/>
//                                               <datalist id="brow">
//                                                   <option value="Fragile"></option>
//                                                   <option value="Perishable"></option>
//                                                   <option value="Gadgets"></option>
//                                                   <option value="Electronics"></option>
//                                                   <option value="Fashion Item"></option>
//                                                   <option value="Clothing"></option>
//                                                   <option value="Document"></option>
//                                                   <option value="Glass"></option>
//                                                   <option value="Liquid"></option>
//                                               </datalist>
//                                           </div>
//                                           <div className="row">
//                                               <div className="col-12 d-flex justify-content-center text-align-center">
//                                                   <button className="btn btn-primary  mb-3 mt-2 ">Submit</button>
//                                               </div>
//                                           </div>
//                                       </form>
//                                   </div>
//                               </div>
//                         </div>;

export default SalesPickup;
