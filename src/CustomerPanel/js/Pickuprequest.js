import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
import "../css/all.css";
import Cpickuprequest from "../../Model/Customer_content/Cpickuprequest";
import {
  Linksidebar,
  CustomerCareLinksidebar,
  Salessidebar,
  Operationsidebar,
  Degital_Ocean_flag,
  company_name,
} from "../../Common/Linksidebar";
import { LoginContext } from "../../Context/loginContext";
import { SearchContext } from "../../Context/searchContext";
import { SearchButtonContext } from "../../Context/buttonContext";
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
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
  Customer: "Client",
};
let clientName, setclientName;
let clientContact, setclientContact;
let pickuPADDRESS, setpickuPADDRESS;
let pincode, setpincode;
let pickuPREQUESTDATETIME, setpickuPREQUESTDATETIME;
let dateTime, setdateTime;
let totaLNUMBEROFPACKAGES, settotaLNUMBEROFPACKAGES;
let totaLCODAMOUNT, settotaLCODAMOUNT;
let producTDESCRIPTION, setproducTDESCRIPTION;
let speciaLINSTRUCTION, setspeciaLINSTRUCTION;
let producTTYPE, setproducTTYPE;
let pickupRefreshFlag, setpickupRefreshFlag;

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
const Pickuprequest = () => {
  [clientName, setclientName] = useState("");
  [clientContact, setclientContact] = useState("");
  [pickuPADDRESS, setpickuPADDRESS] = useState("");
  [dateTime, setdateTime] = useState("");
  [pickuPREQUESTDATETIME, setpickuPREQUESTDATETIME] = useState("");
  [totaLNUMBEROFPACKAGES, settotaLNUMBEROFPACKAGES] = useState("");
  [totaLCODAMOUNT, settotaLCODAMOUNT] = useState("");
  [producTDESCRIPTION, setproducTDESCRIPTION] = useState("");
  [speciaLINSTRUCTION, setspeciaLINSTRUCTION] = useState("");
  [producTTYPE, setproducTTYPE] = useState("");
  [pincode, setpincode] = useState("");
  [pickupRefreshFlag, setpickupRefreshFlag] = useState(false);

  toast.configure();
  const [information, setinformation] = useState({});
  const [payload, setpayload] = useState(false);
  const [pickupFlag, setpickupFlag] = useState(false);
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

  let SubmitButtonFunction = (e) => {
    e.preventDefault();
    var axios = require("axios");

    var data = JSON.stringify({
      CLIENT_NAME: clientName,
      CLIENT_CONTACT: clientContact,
      PICKUP_ADDRESS: pickuPADDRESS,
      PINCODE: pincode,
      PICKUP_DATETIME: dateTime,
      PICKUP_REQUEST_DATETIME: dateTime,
      TOTAL_NUMBER_OF_PACKAGES: parseInt(totaLNUMBEROFPACKAGES),
      TOTAL_COD_AMOUNT: parseFloat(totaLCODAMOUNT),
      PRODUCT_DESCRIPTION: producTDESCRIPTION,
      SPECIAL_INSTRUCTION: speciaLINSTRUCTION,
      PRODUCT_TYPE: producTTYPE,
    });

    console.log("Make a Pickup Request : ", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/pickupRequestByClient" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/pickupRequestByClient" +
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
        toast.success("Pickup Request Sent!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });

        console.log("Pickup request placed successfully.");
      })
      .catch(function (error) {
        toast.error("Something Went Wrong!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });
        console.log(error);
      });
    setpickupFlag((pickupFlag) => !pickupFlag);
  };
  useEffect(() => {
    let final_sideBar = null;
    let context_flag_obj = null;
    context_flag_obj = getLogingInformation_LocalStore();

    if (context_flag_obj == undefined) {
      if (loginInformation.user_type == employee_degignation_list.Customer) {
        setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam.
        final_sideBar = CustomerCareLinksidebar;
      } else if (
        loginInformation.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.ProcessingCenter
      ) {
        setsiteBarInformation_LocalStore(Linksidebar); //useState a set kore rakhlam.
        final_sideBar = Linksidebar;
      }

      setLogin_Sidebar_LocalStore(loginInformation, final_sideBar); //local store a set kore rakhlam.
      setlogingInformation_LocalStore(loginInformation); //useState a set kore rakhlam.
      setclientName(loginInformation.all_user_list_Client.customeR_NAME);
      setdateTime(getCurrentTime);
    } else {
      if (context_flag_obj.user_type == employee_degignation_list.Customer) {
        setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam.
      } else if (
        context_flag_obj.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.ProcessingCenter
      ) {
        setsiteBarInformation_LocalStore(Linksidebar); //useState a set kore rakhlam.
      }
      setlogingInformation_LocalStore(context_flag_obj);
      setclientName(context_flag_obj.all_user_list_Client.customeR_NAME);
      setdateTime(getCurrentTime);
    }
  }, []);

  // useEffect(()=>{

  // },[logingInformation_LocalStore,pickupFlag]);

  useEffect(() => {
    var axios = require("axios");
    var data = JSON.stringify({
      client_name: clientName,
    });

    console.log("Monitor Pickup Request : ", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/clientMonitorPickupRequest" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/clientMonitorPickupRequest" +
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
  }, [logingInformation_LocalStore, pickupRefreshFlag]);

  return (
    <>
      <div className="bodydiv">
        <div>
          <div>
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
    </div>*/}

            <div className="mt-5 pt-5 container">
              {/* <div className="pt-5 col-12" id="">
                <div className="row">
                  <div className="col-12  mb-5">
                    <div className="border border-dark bgimg">
                      <h3 className="text-center bg-dark text-white">
                        {" "}
                        Place an order/PickUp Request
                      </h3>
                      <div className="container p-3">
                        <form>
                          <h6 className="text-success">
                            <FontAwesomeIcon
                              icon={faBusinessTime}
                              className=" rounded-circle mx-2"
                              id="icn"
                            ></FontAwesomeIcon>
                            <u>Shop/Business Details</u>
                          </h6>
                          <div className="form-group has-success mb-2">
                            <label
                              className="control-label"
                              htmlFor="inputSuccess1"
                            >
                              <h6>
                                <FontAwesomeIcon
                                  icon={faUser}
                                  className=" rounded-circle mx-2"
                                  id="icn"
                                ></FontAwesomeIcon>
                                Merchant/Shop Name:
                              </h6>
                            </label>
                            <p className="border border-light bg-light form-control mt-1">
                              {clientName}
                            </p>
                          </div>
                          <h6 className="text-success">
                            <FontAwesomeIcon
                              icon={faTruck}
                              className=" rounded-circle mx-2"
                              id="icn"
                            ></FontAwesomeIcon>
                            <u>Delivery :</u>
                          </h6>
                           //Package and Details 
                          <div className="form-group has-success mb-2">
                            <label
                              className="control-label"
                              htmlFor="inputSuccess1"
                            >
                              <h6>
                                <FontAwesomeIcon
                                  icon={faUser}
                                  className=" rounded-circle mx-2"
                                  id="icn"
                                ></FontAwesomeIcon>
                                PinCode:
                              </h6>
                            </label>
                            <input
                              type="text"
                              className="form-control mt-1"
                              required
                              value={pincode}
                              onChange={(e) => {
                                setpincode(e.target.value);
                              }}
                            />
                          </div>
                          <div className="form-group has-success mb-2">
                            <label
                              className="control-label"
                              htmlFor="inputSuccess1"
                            >
                              <h6>
                                <FontAwesomeIcon
                                  icon={faAddressCard}
                                  className=" rounded-circle mx-2"
                                  id="icn"
                                ></FontAwesomeIcon>
                                Pickup Address:
                              </h6>
                            </label>
                            <input
                              type="text"
                              className="form-control mt-1"
                              required
                              value={pickuPADDRESS}
                              onChange={(e) => {
                                setpickuPADDRESS(e.target.value);
                              }}
                            />
                          </div>
                          <div className="form-group has-success mb-2">
                            <label
                              className="control-label"
                              htmlFor="inputSuccess1"
                            >
                              <h6>
                                <FontAwesomeIcon
                                  icon={faMobile}
                                  className=" rounded-circle mx-2"
                                  id="icn"
                                ></FontAwesomeIcon>
                                Mobile Number:
                              </h6>
                            </label>
                            <input
                              type="text"
                              className="form-control mt-1"
                              required
                              value={clientContact}
                              onChange={(e) => {
                                setclientContact(e.target.value);
                              }}
                            />
                          </div>
                          <div className="form-group has-success mb-2">
                            <label
                              className="control-label"
                              htmlFor="inputSuccess1"
                            >
                              <h6>
                                <FontAwesomeIcon
                                  icon={faMoneyBillAlt}
                                  className=" rounded-circle mx-2"
                                  id="icn"
                                ></FontAwesomeIcon>
                                Total Packages:
                              </h6>
                            </label>
                            <input
                              type="text"
                              className="form-control mt-1"
                              required
                              value={totaLNUMBEROFPACKAGES}
                              onChange={(e) => {
                                settotaLNUMBEROFPACKAGES(e.target.value);
                              }}
                            />
                          </div>
                          <div className="form-group has-success mb-2">
                            <label
                              className="control-label"
                              htmlFor="inputSuccess1"
                            >
                              <h6>
                                <FontAwesomeIcon
                                  icon={faMoneyBillAlt}
                                  className=" rounded-circle mx-2"
                                  id="icn"
                                ></FontAwesomeIcon>
                                Total COD Amount:
                              </h6>
                            </label>
                            <input
                              type="text"
                              className="form-control mt-1"
                              required
                              value={totaLCODAMOUNT}
                              onChange={(e) => {
                                settotaLCODAMOUNT(e.target.value);
                              }}
                            />
                          </div>
                          <div className="form-group has-success mb-2">
                            <label
                              className="control-label"
                              htmlFor="inputSuccess1"
                            >
                              <h6>
                                <FontAwesomeIcon
                                  icon={faProductHunt}
                                  className=" rounded-circle mx-2"
                                  id="icn"
                                ></FontAwesomeIcon>
                                Details
                              </h6>
                            </label>
                          </div>
                          <div>
                            <input
                              list="brow"
                              className="form-control"
                              required
                              value={producTTYPE}
                              onChange={(e) => {
                                setproducTTYPE(e.target.value);
                              }}
                            />

                            <datalist id="brow">
                              <option value="Fragile"></option>
                              <option value="Perishable"></option>
                              <option value="Gadgets"></option>
                              <option value="Electronics"></option>
                              <option value="Fashion Item"></option>
                              <option value="Clothing"></option>
                              <option value="Document"></option>
                              <option value="Glass"></option>
                              <option value="Liquid"></option>
                            </datalist>
                          </div>
                          <div className="form-group has-success mb-2">
                            <label
                              className="control-label"
                              htmlFor="inputSuccess1"
                            >
                              <h6>
                                <FontAwesomeIcon
                                  icon={faProductHunt}
                                  className=" rounded-circle mx-2"
                                  id="icn"
                                ></FontAwesomeIcon>
                                Product Description:
                              </h6>
                            </label>
                            <input
                              type="text"
                              className="form-control mt-1"
                              required
                              value={producTDESCRIPTION}
                              onChange={(e) => {
                                setproducTDESCRIPTION(e.target.value);
                              }}
                            />
                          </div>
                          <div className="form-group has-success mb-2">
                            <label
                              className="control-label"
                              htmlFor="inputSuccess1"
                            >
                              <h6>
                                <FontAwesomeIcon
                                  icon={faProductHunt}
                                  className=" rounded-circle mx-2"
                                  id="icn"
                                ></FontAwesomeIcon>
                                Expected Pickup Date:
                              </h6>
                            </label>
                            <input
                              type="date"
                              className="form-control mt-1"
                              required
                              value={dateTime}
                              onChange={(e) => {
                                setdateTime(e.target.value);
                              }}
                            />
                          </div>
                          <div className="form-group has-success mb-3">
                            <label
                              className="control-label"
                              htmlFor="inputSuccess1"
                            >
                              <h6>
                                <FontAwesomeIcon
                                  icon={faEnvelope}
                                  className=" rounded-circle mx-2"
                                  id="icn"
                                ></FontAwesomeIcon>
                                Special Instruction:
                              </h6>
                            </label>
                            <input
                              type="text"
                              className="form-control mt-1"
                              required
                              value={speciaLINSTRUCTION}
                              onChange={(e) => {
                                setspeciaLINSTRUCTION(e.target.value);
                              }}
                            />
                          </div>
                          <div className="row">
                            <div className="col-12 d-flex justify-content-center text-align-center">
                              <button
                                className="btn btn-primary  mb-3 mt-2 "
                                onClick={SubmitButtonFunction}
                                disabled={
                                  !pincode ||
                                  !pickuPADDRESS ||
                                  !clientContact ||
                                  !totaLNUMBEROFPACKAGES ||
                                  !totaLCODAMOUNT ||
                                  !producTTYPE ||
                                  !producTDESCRIPTION
                                }
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              <div className="">
                <h4 className="text-dark text-center">Pickup Request</h4>
                <div className="container shadow my-3 py-3 rounded single-product-upload-bg">
                  <div>
                    <div className="row my-2">
                      <div className="col-lg-3 col-md-3 col-12">
                        <p>Merchant Name</p>
                      </div>
                      <div className="col-lg-9 col-md-9 col-12">
                        <input
                          className="shadow-lg form-control  me-3 bg-white rounded"
                          // defaultValue={clientName}
                          value={clientName}
                        ></input>
                      </div>
                    </div>
                    <div className="row my-2">
                      <div className="col-lg-3 col-md-3 col-12">
                        <p>Delivery Pincode</p>
                      </div>
                      <div className="col-lg-9 col-md-9 col-12">
                        <input
                          type="text"
                          className="shadow-lg form-control  me-3 bg-white rounded"
                          required
                          value={pincode}
                          onChange={(e) => {
                            setpincode(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="row my-2">
                      <div className="col-lg-3 col-md-3 col-12">
                        <p>Pickup Address</p>
                      </div>
                      <div className="col-lg-9 col-md-9 col-12">
                        <input
                          type="text"
                          className="shadow-lg form-control  me-3 bg-white rounded"
                          required
                          value={pickuPADDRESS}
                          onChange={(e) => {
                            setpickuPADDRESS(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="row my-2">
                      <div className="col-lg-3 col-md-3 col-12">
                        <p>Contact Number</p>
                      </div>
                      <div className="col-lg-9 col-md-9 col-12">
                        <input
                          type="text"
                          className="shadow-lg form-control  me-3 bg-white rounded"
                          required
                          value={clientContact}
                          onChange={(e) => {
                            setclientContact(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="row my-2">
                      <div className="col-lg-3 col-md-3 col-12">
                        <p>Total Packages</p>
                      </div>
                      <div className="col-lg-9 col-md-9 col-12">
                        <input
                          type="text"
                          className="shadow-lg form-control  me-3 bg-white rounded"
                          required
                          value={totaLNUMBEROFPACKAGES}
                          onChange={(e) => {
                            settotaLNUMBEROFPACKAGES(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="row my-2">
                      <div className="col-lg-3 col-md-3 col-12">
                        <p>Total COD Amount</p>
                      </div>
                      <div className="col-lg-9 col-md-9 col-12">
                        <input
                          type="text"
                          className="shadow-lg form-control  me-3 bg-white rounded"
                          required
                          value={totaLCODAMOUNT}
                          onChange={(e) => {
                            settotaLCODAMOUNT(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="row my-2">
                      <div className="col-lg-3 col-md-3 col-12">
                        <p>Details</p>
                      </div>
                      <div className="col-lg-9 col-md-9 col-12">
                        <input
                          list="brow"
                          className="form-control"
                          required
                          value={producTTYPE}
                          onChange={(e) => {
                            setproducTTYPE(e.target.value);
                          }}
                        />

                        <datalist id="brow">
                          <option value="Fragile"></option>
                          <option value="Perishable"></option>
                          <option value="Gadgets"></option>
                          <option value="Electronics"></option>
                          <option value="Fashion Item"></option>
                          <option value="Clothing"></option>
                          <option value="Document"></option>
                          <option value="Glass"></option>
                          <option value="Liquid"></option>
                        </datalist>
                      </div>
                    </div>
                    <div className="row my-2">
                      <div className="col-lg-3 col-md-3 col-12">
                        <p>Product Description</p>
                      </div>
                      <div className="col-lg-9 col-md-9 col-12">
                        <input
                          type="text"
                          className="shadow-lg form-control  me-3 bg-white rounded"
                          required
                          value={producTDESCRIPTION}
                          onChange={(e) => {
                            setproducTDESCRIPTION(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="row my-2">
                      <div className="col-lg-3 col-md-3 col-12">
                        <p>Expected Pickup Date</p>
                      </div>
                      <div className="col-lg-9 col-md-9 col-12">
                        <input
                          type="date"
                          className="shadow-lg form-control  me-3 bg-white rounded"
                          required
                          value={dateTime}
                          onChange={(e) => {
                            setdateTime(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="row my-2">
                      <div className="col-lg-3 col-md-3 col-12">
                        <p>Special Instruction</p>
                      </div>
                      <div className="col-lg-9 col-md-9 col-12">
                        <input
                          type="text"
                          className="shadow-lg form-control  me-3 bg-white rounded"
                          required
                          value={speciaLINSTRUCTION}
                          onChange={(e) => {
                            setspeciaLINSTRUCTION(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center text-align-center mb-3">
                  <button
                    className="btn btn-sm btn-success rounded-3 px-3"
                    onClick={SubmitButtonFunction}
                    disabled={
                      !pincode ||
                      !pickuPADDRESS ||
                      !clientContact ||
                      !totaLNUMBEROFPACKAGES ||
                      !totaLCODAMOUNT ||
                      !producTTYPE ||
                      !producTDESCRIPTION
                    }
                  >
                    Submit
                  </button>
                </div>
              </div>

              <div className="">
                {payload ? (
                  <Cpickuprequest response={information} />
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
        </div>
      </div>
    </>
  );
};
export default Pickuprequest;
