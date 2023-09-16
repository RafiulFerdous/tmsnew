import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
import "../css/all.css";
import { toast } from "react-toastify";
import {
  faUser,
  faUnlockAlt,
  faHome,
  faEnvelope,
  faBriefcase,
  faPhone,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter, Link } from "react-router-dom";

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
let clientid, setclientid;
let clientName, setclientName;
let clientContact, setclientContact;
let pickuPADDRESS, setpickuPADDRESS;
let pincode, setpincode;
let username, setusername;
let password, setpassword;
let email, setemail;
let returnaddress, setreturnaddress;
let person, setperson;
let businessurl, setbusinessurl;
let speciaLINSTRUCTION, setspeciaLINSTRUCTION;
let producTTYPE, setproducTTYPE;
let pickupRefreshFlag, setpickupRefreshFlag;

const ClientRegistration = () => {
  toast.configure();
  [clientName, setclientName] = useState("");
  [clientContact, setclientContact] = useState("");
  [pickuPADDRESS, setpickuPADDRESS] = useState("");
  [username, setusername] = useState("");
  [password, setpassword] = useState("");
  [email, setemail] = useState("");
  [returnaddress, setreturnaddress] = useState("");
  [businessurl, setbusinessurl] = useState("");
  [person, setperson] = useState("");
  [pincode, setpincode] = useState("");
  const [pickupFlag, setpickupFlag] = useState(false);
  [pickupRefreshFlag, setpickupRefreshFlag] = useState(false);
  const [showText, setShowText] = useState(false);
  let onclick = (e) => {
    e.preventDefault();
    setShowText(!showText);
  };
  [employId, setemployId] = useState("");
  [date_time, setdate_time] = useState("");
  [clientid, setclientid] = useState("");
  const [areacode, setareacode] = useState("");
  const [dclist, setdclist] = useState([]);

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

    console.log(" Table APi1: ", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/allDcList" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/allDcList" + "?company_name=" + company_name,
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      // data: data,
    };

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        console.log(json_object);
        return json_object;
      })
      .then((res) => {
        console.log("this is dclist", res);
        setdclist(res.message);
        //setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  let SubmitButtonFunction = (e) => {
    e.preventDefault();
    var axios = require("axios");

    var data = JSON.stringify({
      CUSTOMER_NAME: clientName,
      CUSTOMER_PHONE_NUMBER: clientContact,
      CUSTOMER_ADDRESS: pickuPADDRESS,
      CUSTOMER_USERNAME: username,
      CUSTOMER_PASSWORD: password,
      CUSTOMER_EMAIL: email,
      CUSTOMER_RETURN_ADDRESS: returnaddress,
      CUSTOMER_RETURN_PIN: pincode,
      CONTACT_PERSON: person,
      BUSINESS_URL: businessurl,
    });

    console.log("Make a Pickup Request : ", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/customerregistration" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/customerregistration" +
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
        console.log(JSON.stringify(response.data));
        setpickupRefreshFlag((pickupRefreshFlag) => !pickupRefreshFlag);
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });
        console.log("successfully created", response.data);
      })
      .catch(function (error) {
        // Error
        if (error.response) {
          toast.error("Error!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
        } else if (error.request) {
          toast.error(" Request Error!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
    setpickupFlag((pickupFlag) => !pickupFlag);
  };

  // useEffect(()=>{

  // },[logingInformation_LocalStore,pickupFlag]);

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
          <Sidebar sidebar_manu={siteBarInformation_LocalStore} />
        </div>
      </div> */}

        {/* <div className="row container">
                            <div className="col-6 " id="srchmenu">
                                    <Search/>
                            </div>
                       </div> */}

        <div className="mt-5 pt-5 container">
          <div className="" id="">
            <div className="container shadow my-3 py-3 rounded single-product-upload-bg">
              <div>
                <div className="container">
                  <div className="row justify-content-center mx-auto">
                    <div className="col-6">
                      <img
                        className="d-block w-50 mx-auto image-style"
                        src="/images/e_desh_logo.png"
                      ></img>
                    </div>
                  </div>
                </div>
                <div className="card-title text-center text-white mt-3">
                  <h4 className="text-dark">Registration Form</h4>
                </div>

                <div className="text-center mt-2">
                  <div className="row my-2">
                    <div className="col-lg-3 col-md-3 col-12">
                      <p className="text-start">Customer Name</p>
                    </div>
                    <div className="col-lg-9 col-md-9 col-12">
                      <input
                        type="text"
                        id="UserName"
                        className="shadow-lg form-control  me-3 bg-white rounded"
                        // placeholder="Customer Name"
                        value={clientName}
                        onChange={(e) => {
                          setclientName(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>

                  <div className="row my-2">
                    <div className="col-lg-3 col-md-3 col-12">
                      <p className="text-start">User Name</p>
                    </div>
                    <div className="col-lg-9 col-md-9 col-12">
                      <input
                        type="text"
                        id="UserName"
                        className="shadow-lg form-control  me-3 bg-white rounded"
                        // placeholder="User Name"
                        value={username}
                        onChange={(e) => {
                          setusername(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>

                  <div className="row my-2">
                    <div className="col-lg-3 col-md-3 col-12">
                      <p className="text-start">Password</p>
                    </div>
                    <div className="col-lg-9 col-md-9 col-12">
                      <input
                        type="text"
                        id="UserName"
                        className="shadow-lg form-control  me-3 bg-white rounded"
                        // placeholder="password"
                        value={password}
                        onChange={(e) => {
                          setpassword(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>

                  <div className="row my-2">
                    {/*<div className="input-group-prepand">*/}
                    {/*<span>*/}
                    {/*  <FontAwesomeIcon*/}
                    {/*      icon={faEnvelope}*/}
                    {/*      className="fa-lg mt-1"*/}
                    {/*  />*/}
                    {/*</span>*/}
                    {/*</div>*/}
                    <div className="col-lg-3 col-md-3 col-12">
                      <p className="text-start">Email</p>
                    </div>
                    <div className="col-lg-9 col-md-9 col-12">
                      <input
                        type="text"
                        id="UserName"
                        className="shadow-lg form-control  me-3 bg-white rounded"
                        // placeholder="Email"
                        value={email}
                        onChange={(e) => {
                          setemail(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>

                  <div className="row my-2">
                    <div className="col-lg-3 col-md-3 col-12">
                      <p className="text-start">Customer Number</p>
                    </div>
                    <div className="col-lg-9 col-md-9 col-12">
                      <input
                        type="text"
                        id="UserName"
                        className="shadow-lg form-control  me-3 bg-white rounded"
                        // placeholder="Customer Number"
                        value={clientContact}
                        onChange={(e) => {
                          setclientContact(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>

                  <div className="row my-2">
                    {/*<div className="input-group-prepand">*/}
                    {/*<span>*/}
                    {/*  <FontAwesomeIcon icon={faUser} className="fa-lg mt-1" />*/}
                    {/*</span>*/}
                    {/*</div>*/}
                    <div className="col-lg-3 col-md-3 col-12">
                      <p className="text-start">Contact Person</p>
                    </div>
                    <div className="col-lg-9 col-md-9 col-12">
                      <input
                        type="text"
                        id="UserName"
                        className="shadow-lg form-control  me-3 bg-white rounded"
                        // placeholder="contact person"
                        value={person}
                        onChange={(e) => {
                          setperson(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>

                  <div className="row my-2">
                    {/*<div className="input-group-prepand">*/}
                    {/*<span>*/}
                    {/*  <FontAwesomeIcon icon={faHome} className="fa-lg mt-1" />*/}
                    {/*</span>*/}
                    {/*</div>*/}
                    <div className="col-lg-3 col-md-3 col-12">
                      <p className="text-start">Customer Address</p>
                    </div>
                    <div className="col-lg-9 col-md-9 col-12">
                      <input
                        type="text"
                        id="UserName"
                        className="shadow-lg form-control  me-3 bg-white rounded"
                        // placeholder="Customer Address"
                        value={pickuPADDRESS}
                        onChange={(e) => {
                          setpickuPADDRESS(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>

                  <div className="row my-2">
                    <div className="col-lg-3 col-md-3 col-12">
                      <p className="text-start">Pincode</p>
                    </div>
                    <div className="col-lg-9 col-md-9 col-12">
                      <input
                        type="text"
                        id="UserName"
                        className="shadow-lg form-control  me-3 bg-white rounded"
                        // placeholder="Pincode"
                        value={pincode}
                        onChange={(e) => {
                          setpincode(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>

                  <div className="row my-2">
                    <div className="col-lg-3 col-md-3 col-12">
                      <p className="text-start">Return Address</p>
                    </div>
                    <div className="col-lg-9 col-md-9 col-12">
                      <input
                        type="text"
                        id="UserName"
                        className="shadow-lg form-control  me-3 bg-white rounded"
                        // placeholder="Return Address"
                        value={returnaddress}
                        onChange={(e) => {
                          setreturnaddress(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>

                  {/* business url */}
                  <div className="row my-2">
                    <div className="col-lg-3 col-md-3 col-12">
                      <p className="text-start">Business Url</p>
                    </div>
                    <div className="col-lg-9 col-md-9 col-12">
                      <input
                        type="text"
                        id="UserName"
                        className="shadow-lg form-control  me-3 bg-white rounded"
                        // placeholder="Business Url"
                        value={businessurl}
                        onChange={(e) => {
                          setbusinessurl(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>

                  {/*area code*/}

                  <div className="row my-2">
                    <div className="col-lg-3 col-md-3 col-12">
                      <p className="text-start">Area Code</p>
                    </div>
                    <div className="col-lg-9 col-md-9 col-12">
                      <input
                        type="text"
                        list="areacodes"
                        id="areacode"
                        className="shadow-lg form-control  me-3 bg-white rounded"
                        // placeholder="Area Code"
                        value={areacode}
                        onChange={(e) => {
                          setareacode(e.target.value);
                        }}
                      ></input>

                      <datalist id="areacodes">
                        {dclist.map((single_dc_office_name) => {
                          return (
                            <option value={single_dc_office_name}></option>
                          );
                        })}
                      </datalist>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 d-flex justify-content-center text-align-center">
                      <button
                        className="btn btn-primary  mb-3 "
                        onClick={SubmitButtonFunction}
                        disabled={
                          !clientName ||
                          !username ||
                          !password ||
                          !person ||
                          !clientContact ||
                          !pickuPADDRESS ||
                          !pincode ||
                          !returnaddress
                        }
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

export default ClientRegistration;
