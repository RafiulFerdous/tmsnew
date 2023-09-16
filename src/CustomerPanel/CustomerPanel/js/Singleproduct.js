import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
//import '../css/allc.css';
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
} from "../../Common/Linksidebar";
let contact_color, setcontact_color;

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

// let employee_degignation_list = {
//   ProcessingCenter : "PROCESSING CENTER",
//   DistrictIncharge : "DISTRICT INCHARGE",
//   CustomerCare : "CUSTOMER CARE",
//   FieldExecutive : "FIELD EXECUTIVE",
//   Marketing_executive : "MARKETING EXECUTIVE",
//   Operation : "OPERATION",
//   Finance : "FINANCE",
//   Admin : "ADMIN",
//   SuperAdmin : "SUPERADMIN",
//   Customer : "CUSTOMER"
// }

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

let username, setusername;
let password, setpassword;
let email, setemail;

let person, setperson;
let speciaLINSTRUCTION, setspeciaLINSTRUCTION;
let coveragearea, setcoveragearea;

let area, setarea;

let generate;
let areacodedrop, setareacodedrop;

let referenceno, setreferenceno;
let consigneename, setconsigneename;
let address, setaddress;
let pincode, setpincode;
let areacode, setareacode;
let contactnum, setcontactnum;
let emergencynumber, setemergencynumber;
let weight, setweight;
let paymenttype, setpaymenttype;
let totalpackage, settotalpackage;
let codamount, setcodamount;
let producttobeshift, setproducttobeshift;
let returnaddress, setreturnaddress;
let returnpin, setreturnpin;
let sellername, setsellername;
let producTTYPE, setproducTTYPE;
let pickupRefreshFlag, setpickupRefreshFlag;

let clientId, setclientId;

const Singleproduct = () => {
  toast.configure();
  [referenceno, setreferenceno] = useState("");
  [consigneename, setconsigneename] = useState("");
  [address, setaddress] = useState("");
  [pincode, setpincode] = useState("");
  [areacode, setareacode] = useState("");
  [contactnum, setcontactnum] = useState("88");
  [emergencynumber, setemergencynumber] = useState("");
  [weight, setweight] = useState("");
  [paymenttype, setpaymenttype] = useState("");
  [totalpackage, settotalpackage] = useState("");
  [codamount, setcodamount] = useState("");
  [producttobeshift, setproducttobeshift] = useState("");
  [returnaddress, setreturnaddress] = useState("");
  [returnpin, setreturnpin] = useState("");
  [sellername, setsellername] = useState("");
  [clientName, setclientName] = useState("");

  [coveragearea, setcoveragearea] = useState([]);

  [contact_color, setcontact_color] = useState("red");

  [area, setarea] = useState("");
  [areacodedrop, setareacodedrop] = useState([]);

  const [pickupFlag, setpickupFlag] = useState(false);
  [pickupRefreshFlag, setpickupRefreshFlag] = useState(false);
  const [showText, setShowText] = useState(false);
  let onclick = (e) => {
    e.preventDefault();
    setShowText(!showText);
  };
  [clientId, setclientId] = useState("");
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
      if (loginInformation.user_type == employee_degignation_list.Customer) {
        setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam.
        final_sideBar = CustomerCareLinksidebar;
      } else {
        if (
          loginInformation.all_user_list.employeE_DEGIGNATION ==
          employee_degignation_list.ProcessingCenter
        ) {
          setsiteBarInformation_LocalStore(Linksidebar); //useState a set kore rakhlam.
          final_sideBar = Linksidebar;
        }
      }
      setLogin_Sidebar_LocalStore(loginInformation, final_sideBar); //local store a set kore rakhlam.
      setclientId(loginInformation.all_user_list_Client.customeR_ID);
      setdate_time(getCurrentTime);
      setlogingInformation_LocalStore(loginInformation); //useState a set kore rakhlam.
      setclientName(loginInformation.all_user_list_Client.customeR_NAME);
      console.log(
        "value set up if: ",
        loginInformation.all_user_list_Client.customeR_ID
      );
    } else {
      if (context_flag_obj.user_type == employee_degignation_list.Customer) {
        setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam.
      } else if (
        context_flag_obj.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.ProcessingCenter
      ) {
        setsiteBarInformation_LocalStore(Linksidebar); //useState a set kore rakhlam.
      }
      setclientId(context_flag_obj.all_user_list_Client.customeR_ID);
      setclientName(context_flag_obj.all_user_list_Client.customeR_NAME);
      setdate_time(getCurrentTime);
      setlogingInformation_LocalStore(context_flag_obj);
      setreturnpin(context_flag_obj.all_user_list_Client.customeR_RETURN_PIN);
      setreturnaddress(
        context_flag_obj.all_user_list_Client.customeR_RETURN_ADDRESS
      );
      console.log(
        "value set up else : ",
        context_flag_obj.all_user_list_Client.customeR_ID
      );
    }
  }, []);

  console.log("This is client name", clientName);

  //   useEffect(()=>{
  //     let final_sideBar = null;
  //     let context_flag_obj = null;
  //     context_flag_obj = getLogingInformation_LocalStore();

  //     if(context_flag_obj == undefined){
  //       if(loginInformation.all_user_list.employeE_DEGIGNATION == employee_degignation_list.Marketing_executive)
  //       {
  //           setsiteBarInformation_LocalStore(Salessidebar);//useState a set kore rakhlam.
  //           final_sideBar = Salessidebar;
  //       }
  //       else if(loginInformation.all_user_list.employeE_DEGIGNATION == employee_degignation_list.DistrictIncharge)
  //       {
  //           setsiteBarInformation_LocalStore(CustomerCareLinksidebar);//useState a set kore rakhlam
  //           final_sideBar = CustomerCareLinksidebar;
  //       }
  //    //useState a set kore rakhlam.
  //       setLogin_Sidebar_LocalStore(loginInformation,final_sideBar);//local store a set kore rakhlam.

  //       setlogingInformation_LocalStore(loginInformation);//useState a set kore rakhlam.
  //       console.log("value set up if: ",loginInformation.all_user_list.employeE_ID);
  //     }
  //     else {
  //       if(context_flag_obj.all_user_list.employeE_DEGIGNATION == employee_degignation_list.Marketing_executive)
  //       {
  //           setsiteBarInformation_LocalStore(Salessidebar);//useState a set kore rakhlam.
  //       }
  //       else if(context_flag_obj.all_user_list.employeE_DEGIGNATION == employee_degignation_list.DistrictIncharge)
  //       {
  //           setsiteBarInformation_LocalStore(CustomerCareLinksidebar);//useState a set kore rakhlam
  //       }
  //       setlogingInformation_LocalStore(context_flag_obj);

  //       setlogingInformation_LocalStore(context_flag_obj);
  //       console.log("value set up else : ",context_flag_obj.all_user_list.employeE_ID);
  //     }

  //   },[]);

  useEffect(() => {
    // e.preventDefault();
    var axios = require("axios");

    // console.log("this is data : ", data);

    var config = {
      method: "get",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/getCoverageArea" +
          "?company_name=" +
          "EDESH"
        : "/universalapi/allapi/getCoverageArea" + "?company_name=" + "EDESH",
      headers: {
        "Content-Type": "application/json",
        //  'Authorization': `Bearer ${logingInformation_LocalStore.token}`
      },
    };
    console.log("this is config", config);

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        console.log(response.data);
        // setpickupRefreshFlag(pickupRefreshFlag => !pickupRefreshFlag);
        //  toast.success("SuccessFully Forworded", {
        //      position: toast.POSITION.TOP_CENTER, autoClose: 1500
        //  }
        //  );
        //setUsers(response.data.all_product_list)
        // console.log("successfully forworded");
        return response;
      })
      .then((res) => {
        console.log("new response", res);
        setcoveragearea(res.data.message.all_information);

        //setinfoModalOpen(true);

        //setpayload(true);
      })
      .catch(function (error) {
        // Error
        //  if (error.response) {
        //      toast.error("Error!", {
        //          position: toast.POSITION.TOP_CENTER, autoClose: 1500
        //      });

        //  } else if (error.request) {
        //      toast.error(" Request Error!", {
        //          position: toast.POSITION.TOP_CENTER, autoClose: 1500
        //      });
        //      console.log(error.request);
        //  } else {

        //      console.log('Error', error.message);
        //  }
        console.log(error.config);
      });

    //setpickupFlag(pickupFlag => !pickupFlag);
  }, []);

  console.log("this is coverage area", coveragearea);

  let SubmitButtonFunction = (e) => {
    e.preventDefault();
    var axios = require("axios");

    var data = JSON.stringify({
      REFERENCE_NO: referenceno,
      CONSIGNEE_NAME: consigneename,
      ADDRESS: address,
      PINCODE: pincode,
      AREA_CODE: areacode,
      CONTACT_NUMBER: contactnum,
      EMERGENCY_NUMBER: emergencynumber,
      WEIGHT: parseFloat(weight),
      PAYMENT_TYPE: paymenttype,
      TOTAL_PACKAGE: parseInt(totalpackage),
      COD_AMOUNT: parseFloat(codamount),
      PRODUCT_TO_BE_SHIFT: producttobeshift,
      RETURN_ADDRESS: returnaddress,
      RETURN_PIN: returnpin,
      SELLER_NAME: clientName,
    });

    console.log("single product : ", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/clientSingleProductUpload" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/clientSingleProductUpload" +
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
        // toast.success("SuccessFully Created !", {
        //   position: toast.POSITION.TOP_CENTER, autoClose: 1500
        // });
        if (typeof response.data.message === "string") {
          toast.error(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          });
        }

        toast.success(response.data.status, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });

        console.log("successfully created", response);
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

  generate = (e) => {
    e.preventDefault();

    var axios = require("axios");
    var data = JSON.stringify({
      coverage_area: area,
    });

    console.log("bag inside vehicle : ", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/getAreaCode_and_pinCode" +
          "?company_name=" +
          "EDESH"
        : "/universalapi/allapi/getAreaCode_and_pinCode" +
          "?company_name=" +
          "EDESH",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Bearer ${logingInformation_LocalStore.token}`
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        return json_object;

        // toast.success("SuccessFully Vehicle Created!", {
        //     position: toast.POSITION.TOP_CENTER, autoClose: 1500
        // });
      })
      .then((res) => {
        console.log("this is res", res);
        setareacodedrop(res.message.all_information);
        setareacode(res.message.all_information[0].area_code);
        setpincode(res.message.all_information[0].pincode);
        //setpayload(true);
      })
      .catch(function (error) {
        console.log("this is", error);
        // toast.error("Something Wrong!", {
        //     position: toast.POSITION.TOP_CENTER, autoClose: 1800
        // });
      });
  };

  useEffect(() => {
    let len = contactnum.length;
    if (len < 13) {
      console.log("Contact number not completed error");
      setcontact_color("red");
    } else {
      if (len > 13) {
        console.log("Contact number overflow.");
        setcontact_color("red");
      } else {
        if (
          contactnum[0] == "8" &&
          contactnum[1] == "8" &&
          contactnum[2] == "0" &&
          contactnum[3] == "1"
        ) {
          console.log("Contact number accepted.");
          setcontact_color("green");
        } else {
          console.log("Contact number formate error. Check first 4 digit.");
          setcontact_color("red");
        }
      }
    }
  }, [contactnum]);

  const validate = (e) => {
    e.preventDefault();

    var axios = require("axios");
    var data = JSON.stringify({
      order_id: referenceno,
    });

    console.log("bag inside vehicle : ", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/order_id_validation" +
          "?company_name=" +
          "EDESH"
        : "/universalapi/allapi/order_id_validation" +
          "?company_name=" +
          "EDESH",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Bearer ${logingInformation_LocalStore.token}`
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        return json_object;

        // toast.success("SuccessFully Vehicle Created!", {
        //     position: toast.POSITION.TOP_CENTER, autoClose: 1500
        // });
      })
      .then((res) => {
        console.log("this is validate", res);
        toast.success(res.message, {
          position: "top-right",
          autoClose: false,
        });
      })
      .catch(function (error) {
        console.log("this is", error);
        // toast.error("Something Wrong!", {
        //     position: toast.POSITION.TOP_CENTER, autoClose: 1800
        // });
      });
  };

  console.log("this is data after generate", areacodedrop);

  console.log("this is areacode after generate", areacode);
  console.log("this is pincode after generate", pincode);
  console.log("this is paymenttype after generate", paymenttype);
  console.log("this is se;;ername after generate", sellername);

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

        <div className="row container">
          <div className="col-12" id="bgcrt">
            <div className="border border-primary d">
              <div className="container">
                <div className="row justify-content-center mx-auto">
                  <div className="col-6">
                    <img
                      className="d-block w-50 mx-auto"
                      src="/images/e_desh_logo.png"
                    ></img>
                  </div>
                </div>
              </div>
              <div className="card-title text-center text-white mt-3">
                <h4 className="text-dark">Single Product Upload</h4>
              </div>

              <div className="text-center mt-2">
                <form className="mx-auto text-center">
                  {/* referenceno */}

                  <div className="input-group mx-2">
                    <div className="input-group-prepand">
                      <span>
                        <FontAwesomeIcon icon={faUser} className="fa-lg mt-1" />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="shadow-lg form-control mx-2 bg-white rounded"
                      placeholder="Order Id"
                      value={referenceno}
                      onChange={(e) => {
                        setreferenceno(e.target.value);
                      }}
                    ></input>
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary mt-2"
                    onClick={validate}
                    disabled={!referenceno}
                  >
                    Validate
                  </button>
                  {/* consigneename */}

                  <div className="input-group mx-2 my-3">
                    <div className="input-group-prepand">
                      <span>
                        <FontAwesomeIcon icon={faUser} className="fa-lg mt-1" />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="shadow-lg form-control mx-2 bg-white rounded"
                      placeholder="Receiver Name"
                      value={consigneename}
                      onChange={(e) => {
                        setconsigneename(e.target.value);
                      }}
                    ></input>
                  </div>
                  {/* address */}

                  <div className="input-group mx-2 my-3">
                    <div className="input-group-prepand">
                      <span>
                        <FontAwesomeIcon icon={faKey} className="fa-lg mt-1" />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="shadow-lg form-control mx-2 bg-white rounded"
                      placeholder="Receiver Address"
                      value={address}
                      onChange={(e) => {
                        setaddress(e.target.value);
                      }}
                    ></input>
                    <input
                      list="dcnamelist"
                      className="form-control bg-white rounded"
                      id="dcname"
                      onChange={(e) => {
                        setarea(e.target.value);
                      }}
                    />
                    <datalist id="dcnamelist">
                      <option selected value="none" />
                      {coveragearea.map((single_area) => {
                        // console.log("SINGLE DC NAME:", single_dc_office_name);
                        return <option value={single_area} />;
                      })}
                    </datalist>
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={generate}
                    disabled={!area}
                  >
                    Generate
                  </button>
                  {/* pincode */}
                  <div className="input-group mx-2 my-3">
                    <div className="input-group-prepand">
                      <span>
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className="fa-lg mt-1"
                        />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="shadow-lg form-control mx-2 bg-white rounded"
                      placeholder="Receiver Address Pincode"
                      value={areacodedrop[0] && areacodedrop[0].pincode}
                      onChange={(e) => {
                        console.log("pincode change", e.target.value);
                        setpincode(e.target.value);
                      }}
                    ></input>
                    {/* <input type="text" className="shadow-lg form-control mx-2 bg-white rounded" placeholder="Receiver Address Pincode" value={pincode} onChange={(e) => { setpincode(e.target.value) }}></input> */}
                  </div>
                  {/* areacode */}

                  <div className="input-group mx-2 my-3">
                    <div className="input-group-prepand">
                      <span>
                        <FontAwesomeIcon
                          icon={faPhone}
                          className="fa-lg mt-1"
                        />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="shadow-lg form-control mx-2 bg-white rounded"
                      placeholder="areacode"
                      value={areacodedrop[0] && areacodedrop[0].dc_name}
                      onChange={(e) => {
                        setareacode(e.target.value);
                      }}
                    ></input>
                    {/* <input type="text" className="shadow-lg form-control mx-2 bg-white rounded" placeholder="areacode" value={areacode} onChange={(e) => { setareacode(e.target.value) }}></input> */}
                  </div>
                  {/* contactnum */}

                  <div className="input-group mx-2 my-3">
                    <div className="input-group-prepand">
                      <span>
                        <FontAwesomeIcon icon={faUser} className="fa-lg mt-1" />
                      </span>
                    </div>
                    <input
                      style={{ color: contact_color }}
                      type="text"
                      className="shadow-lg form-control mx-2 bg-white rounded"
                      placeholder="Receiver Contact Number"
                      value={contactnum}
                      onChange={(e) => {
                        setcontactnum(e.target.value);
                      }}
                    ></input>
                  </div>
                  {/* emergencynumber */}

                  <div className="input-group mx-2 my-3">
                    <div className="input-group-prepand">
                      <span>
                        <FontAwesomeIcon icon={faHome} className="fa-lg mt-1" />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="shadow-lg form-control mx-2 bg-white rounded"
                      placeholder="Emergency number"
                      value={emergencynumber}
                      onChange={(e) => {
                        setemergencynumber(e.target.value);
                      }}
                    ></input>
                  </div>
                  {/* weight */}

                  <div className="input-group mx-2 my-3">
                    <div className="input-group-prepand">
                      <span>
                        <FontAwesomeIcon icon={faHome} className="fa-lg mt-1" />
                      </span>
                    </div>
                    <input
                      type="number"
                      className="shadow-lg form-control mx-2 bg-white rounded"
                      placeholder="Weight"
                      value={weight}
                      onChange={(e) => {
                        setweight(e.target.value);
                      }}
                    ></input>
                  </div>
                  {/* paymenttype */}

                  <div className="input-group mx-2 my-3">
                    <div className="input-group-prepand">
                      <span>
                        <FontAwesomeIcon icon={faHome} className="fa-lg mt-1" />
                      </span>
                    </div>

                    <select
                      type="text"
                      className="shadow-lg form-control mx-2 bg-white rounded"
                      placeholder="Payment Type"
                      value={paymenttype}
                      onChange={(e) => {
                        setpaymenttype(e.target.value);
                      }}
                    >
                      <option selected value="none">
                        Payment Mode
                      </option>
                      <option value="COD">COD</option>
                      <option value="Prepaid">Prepaid</option>
                    </select>

                    {/* <input type="text" className="shadow-lg form-control mx-2 bg-white rounded" placeholder="Payment Type" value={paymenttype} onChange={(e) => { setpaymenttype(e.target.value) }}></input> */}
                  </div>
                  {/* totalpackage */}

                  <div className="input-group mx-2 my-3">
                    <div className="input-group-prepand">
                      <span>
                        <FontAwesomeIcon icon={faHome} className="fa-lg mt-1" />
                      </span>
                    </div>
                    <input
                      type="number"
                      className="shadow-lg form-control mx-2 bg-white rounded"
                      placeholder="Product Actual Value"
                      value={totalpackage}
                      onChange={(e) => {
                        settotalpackage(e.target.value);
                      }}
                    ></input>
                  </div>
                  {/* codamount */}

                  <div className="input-group mx-2 my-3">
                    <div className="input-group-prepand">
                      <span>
                        <FontAwesomeIcon icon={faHome} className="fa-lg mt-1" />
                      </span>
                    </div>
                    <input
                      type="number"
                      className="shadow-lg form-control mx-2 bg-white rounded"
                      placeholder="Cod Amount"
                      value={codamount}
                      onChange={(e) => {
                        setcodamount(e.target.value);
                      }}
                    ></input>
                  </div>
                  {/* producttobeshift */}

                  <div className="input-group mx-2 my-3">
                    <div className="input-group-prepand">
                      <span>
                        <FontAwesomeIcon icon={faHome} className="fa-lg mt-1" />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="shadow-lg form-control mx-2 bg-white rounded"
                      placeholder="Product Description"
                      value={producttobeshift}
                      onChange={(e) => {
                        setproducttobeshift(e.target.value);
                      }}
                    ></input>
                  </div>
                  {/* returnaddress onChange={(e) => { setreturnaddress(e.target.value) }}*/}

                  <div className="input-group mx-2 my-3">
                    <div className="input-group-prepand">
                      <span>
                        <FontAwesomeIcon icon={faHome} className="fa-lg mt-1" />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="shadow-lg form-control mx-2 bg-white rounded"
                      placeholder="Return address"
                      value={returnaddress}
                    ></input>
                  </div>
                  {/* returnpin  onChange={(e) => { setreturnpin(e.target.value) }}*/}

                  <div className="input-group mx-2 my-3">
                    <div className="input-group-prepand">
                      <span>
                        <FontAwesomeIcon icon={faHome} className="fa-lg mt-1" />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="shadow-lg form-control mx-2 bg-white rounded"
                      placeholder="Return Pin"
                      value={returnpin}
                    ></input>
                  </div>
                  {/* sellername */}

                  <div className="input-group mx-2 my-3">
                    <div className="input-group-prepand">
                      <span>
                        <FontAwesomeIcon icon={faHome} className="fa-lg mt-1" />
                      </span>
                    </div>
                    {/*  onChange={(e) => { setsellername(e.target.value) }} */}
                    <input
                      type="text"
                      className="shadow-lg form-control mx-2 bg-white rounded"
                      placeholder="Seller Name"
                      value={clientName}
                    ></input>
                  </div>

                  <div className="row">
                    <div className="col-12 d-flex justify-content-center text-align-center">
                      <button
                        className="btn btn-primary  mb-3 "
                        onClick={SubmitButtonFunction}
                        disabled={!codamount}
                      >
                        Submit
                      </button>
                      {/*  disabled={!clientName||!username||!password||!person||!clientContact||!pickuPADDRESS||!pincode||!returnaddress} */}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Singleproduct;
