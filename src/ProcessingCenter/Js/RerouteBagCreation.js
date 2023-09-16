import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
import { Bagtable, Product } from "../../Model/Processingcenter/Bagtable";
import "../css/all.css";
import { toast } from "react-toastify";
import axios from "axios";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faShoppingBag,
  faSuitcaseRolling,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

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

let bagCreationCenter, setbagCreationCenter;
let bagDestinationCenter, setbagDestinationCenter;
let bagDescription, setbagDescription;
let dateTime, setdateTime;
let bagCreator, setbagCreator;
let DistrictNameinformation, setDistrictNameinformation;
let DistrictNamePayload, setDistrictNamePayload;

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

const Reroutebagcreation = () => {
  toast.configure();

  [DistrictNameinformation, setDistrictNameinformation] = useState([]);
  [DistrictNamePayload, setDistrictNamePayload] = useState(false);
  [bagCreationCenter, setbagCreationCenter] = useState("");
  [bagDestinationCenter, setbagDestinationCenter] = useState("");
  [bagDescription, setbagDescription] = useState("");
  [dateTime, setdateTime] = useState("");
  [bagCreator, setbagCreator] = useState("");
  const [bagtype, setbagtype] = useState("");

  console.log("this is bag type", bagtype);

  const [information, setinformation] = useState({});
  const [payload, setpayload] = useState(false);
  const [bagCreationFlag, setbagCreationFlag] = useState(false);
  const [bagInformationrefreshflag, setbagInformationrefreshflag] =
    useState(false);

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
        employee_degignation_list.ProcessingCenter
      ) {
        setsiteBarInformation_LocalStore(Linksidebar); //useState a set kore rakhlam.
        final_sideBar = Linksidebar;
      } else if (
        loginInformation.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.DistrictIncharge
      ) {
        setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam
        final_sideBar = CustomerCareLinksidebar;
      }

      setLogin_Sidebar_LocalStore(loginInformation, final_sideBar); //local store a set kore rakhlam.
      setlogingInformation_LocalStore(loginInformation); //useState a set kore rakhlam.

      setbagCreationCenter(loginInformation.all_user_list.employeE_ZONE); //bag creation form er jonno.
      setbagCreator(loginInformation.all_user_list.employeE_ID); //bag creation form er jonno.

      setbagCreationCenter(loginInformation.all_user_list.employeE_ZONE);
      setbagCreator(loginInformation.all_user_list.employeE_ID);
      setdateTime(getCurrentTime);
    } else {
      if (
        context_flag_obj.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.ProcessingCenter
      ) {
        setsiteBarInformation_LocalStore(Linksidebar); //useState a set kore rakhlam.
      } else if (
        context_flag_obj.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.SuperAdmin
      ) {
        setsiteBarInformation_LocalStore(superadminsidebar); //useState a set kore rakhlam
      }
      setlogingInformation_LocalStore(context_flag_obj);

      setbagCreationCenter(context_flag_obj.all_user_list.employeE_ZONE); //bag creation form er jonno
      setbagCreator(context_flag_obj.all_user_list.employeE_ID); //bag creation form er jonno.

      setbagCreationCenter(context_flag_obj.all_user_list.employeE_ZONE);
      setbagCreator(context_flag_obj.all_user_list.employeE_ID);
      setdateTime(getCurrentTime);
    }
  }, []);

  //bag creation api here

  let bagCreationSubmitButtonFunction = (e) => {
    e.preventDefault();
    var axios = require("axios");
    var data = JSON.stringify({
      Bag_Creation_Center: bagCreationCenter,
      Bag_Destination_Center: bagDestinationCenter,
      Bag_Description: bagDescription,
      dateTime: dateTime,
      bagCreatedByEmployeeID: bagCreator,
      bag_type: bagtype,
    });

    console.log("this is json body parameter of bag creation: ", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/bagcreation" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/bagcreation" + "?company_name=" + company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: data,
    };

    console.log("this is bag creation config", config);

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setbagInformationrefreshflag(
          (bagInformationrefreshflag) => !bagInformationrefreshflag
        );
        toast.success("SuccessFully Bag Created  !", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
      })
      .catch(function (error) {
        toast.error("Something was Wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
        console.log(error);
      });
    setbagCreationFlag((bagCreationFlag) => !bagCreationFlag);
  };

  //bag creation api end here
  // useEffect(()=>{

  // },[bagCreationFlag])
  const [empName, setEmpName] = useState("");

  useEffect(() => {
    if (!logingInformation_LocalStore.token) return;
    var axios = require("axios");
    var config = {
      method: "get",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/getAllDCName" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/getAllDCName" + "?company_name=" + company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
    };

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        return json_object;
      })
      .then((res) => {
        setDistrictNameinformation(res);
        setDistrictNamePayload(true);
        console.log("GET ALL DC name successful", res);
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log("LOGING USER : ", logingInformation_LocalStore);
  }, [logingInformation_LocalStore]);

  useEffect(() => {
    if (!logingInformation_LocalStore.token) return;
    var axios = require("axios");
    var config = {
      method: "get",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/all_bag_information" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/all_bag_information" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
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
        setEmpName(logingInformation_LocalStore.all_user_list.employeE_NAME);
        setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [logingInformation_LocalStore, bagInformationrefreshflag]);
  const userIcon = <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>;
  const bagDesIcon = (
    <FontAwesomeIcon icon={faSuitcaseRolling}></FontAwesomeIcon>
  );
  const bagTypIcon = <FontAwesomeIcon icon={faShoppingBag}></FontAwesomeIcon>;
  const editIcon = <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>;
  return (
    <>
      <div className="bodydiv">
        <div className="row">
          <div className="col-12">
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

        {/* */}

        <div className="mt-5 pt-5 container">
          <div className="col-12 pt-5" id="">
            {/*  */}
            <div
              className=" shadow p-2 mb-4 rounded"
              style={{ backgroundColor: "#c5d5e4" }}
            >
              <h3 className="text-center mt-3">Re-route Bag Creation</h3>
              <div className="container p-3">
                <form className>
                  <div className="form-group row">
                    <label htmlFor className="col-sm-3 col-form-label">
                      Bag Creation Center:
                    </label>
                    <div className="col-sm-6 position-relative">
                      <span
                        className=" position-absolute text-secondary p-2 m-0"
                        style={{ marginLeft: "-4px" }}
                      >
                        {editIcon}
                      </span>
                      <p
                        className="shadow mb-3 bg-body rounded border border-light bg-light"
                        style={{ padding: "5px 10px 10px 35px" }}
                      >
                        {
                          logingInformation_LocalStore.all_user_list
                            .employeE_ZONE
                        }
                      </p>
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label htmlFor className="col-sm-3 col-form-label">
                      Bag Destination Center:
                    </label>
                    <div className="col-sm-6 position-relative">
                      <span
                        className="position-absolute text-secondary p-2 m-0"
                        style={{ marginLeft: "-4px" }}
                      >
                        {bagDesIcon}
                      </span>
                      <input
                        list="dcnames"
                        className="form-control shadow mb-3 bg-body rounded"
                        style={{ paddingLeft: "35px" }}
                        placeholder="Select Your Destination "
                        required
                        onChange={(e) => {
                          setbagDestinationCenter(e.target.value);
                        }}
                      />
                      <datalist id="dcnames">
                        {DistrictNamePayload &&
                          DistrictNameinformation.message.all_dc_name.map(
                            (single_dc_office_name) => {
                              return (
                                <option value={single_dc_office_name}>
                                  {single_dc_office_name}
                                </option>
                              );
                            }
                          )}
                      </datalist>
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label htmlFor className="col-sm-3 col-form-label">
                      Bag Description :{" "}
                    </label>
                    <div className="col-sm-6 position-relative">
                      <span
                        className="position-absolute text-secondary p-2 m-0"
                        style={{ marginLeft: "-4px" }}
                      >
                        {bagDesIcon}
                      </span>
                      <input
                        type="text"
                        className="form-control shadow mb-3 bg-body rounded"
                        style={{ paddingLeft: "35px" }}
                        placeholder="Bag Description"
                        required
                        value={bagDescription}
                        onChange={(e) => {
                          setbagDescription(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label htmlFor className="col-sm-3 col-form-label">
                      Bag Created By:
                    </label>
                    <div className="col-sm-6 position-relative">
                      <span
                        className="position-absolute text-secondary p-2 m-0"
                        style={{ marginLeft: "-4px" }}
                      >
                        {userIcon}
                      </span>
                      <p
                        className="shadow mb-3 bg-body rounded border border-light bg-light"
                        style={{ padding: "5px 10px 10px 35px" }}
                      >
                        {/* <span
                          className="text-secondary p-2"
                          style={{ marginLeft: "-4px" }}
                        >
                          {userIcon}
                        </span> */}
                        {
                          logingInformation_LocalStore.all_user_list
                            .employeE_NAME
                        }
                      </p>
                    </div>
                  </div>

                  {/* bag type */}

                  <div className="form-group row mb-2">
                    <label htmlFor className="col-sm-3 col-form-label">
                      Bag Type:
                    </label>
                    <div className="col-sm-6 position-relative">
                      <span
                        className="position-absolute text-secondary p-2 m-0"
                        style={{ marginLeft: "-4px" }}
                      >
                        {bagTypIcon}
                      </span>
                      <select
                        className="form-control shadow mb-3 bg-body rounded"
                        style={{ paddingLeft: "35px" }}
                        id="bgscrl"
                        onChange={(e) => {
                          setbagtype(e.target.value);
                        }}
                      >
                        <option selected value="">
                          None
                        </option>
                        <option value="Regular">Re-route</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 d-flex justify-content-center text-align-center">
                      <button
                        className="btn btn-success rounded-pill px-4 mb-3 "
                        onClick={bagCreationSubmitButtonFunction}
                        disabled={!bagDescription || !bagDestinationCenter}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/*  */}
            {/* <div className="border border-primary d">
              <h3 className="text-center">Reroute Bag Creation</h3>
              <div className="container p-3">
                <form className>
                  <div className="form-group row">
                    <label htmlFor className="col-sm-3 col-form-label">
                      Bag Creation Center:
                    </label>
                    <div className="col-sm-6">
                      <p className="border border-light bg-light">
                        {
                          logingInformation_LocalStore.all_user_list
                            .employeE_ZONE
                        }
                      </p>
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label htmlFor className="col-sm-3 col-form-label">
                      Bag Destination Center:
                    </label>
                    <div className="col-sm-6">
                      <input
                        list="dcnames"
                        className="form-control"
                        placeholder="Select Your Destination "
                        required
                        onChange={(e) => {
                          setbagDestinationCenter(e.target.value);
                        }}
                      />
                      <datalist id="dcnames">
                        {DistrictNamePayload &&
                          DistrictNameinformation.message.all_dc_name.map(
                            (single_dc_office_name) => {
                              return (
                                <option value={single_dc_office_name}>
                                  {single_dc_office_name}
                                </option>
                              );
                            }
                          )}
                      </datalist>
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label htmlFor className="col-sm-3 col-form-label">
                      Bag Description :{" "}
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Bag Description"
                        required
                        value={bagDescription}
                        onChange={(e) => {
                          setbagDescription(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label htmlFor className="col-sm-3 col-form-label">
                      Bag Created By:
                    </label>
                    <div className="col-sm-6">
                      <p className="border border-light bg-light">
                        {
                          logingInformation_LocalStore.all_user_list
                            .employeE_NAME
                        }
                      </p>
                    </div>
                  </div>


                  <div className="form-group row mb-2">
                    <label htmlFor className="col-sm-3 col-form-label">
                      Bag Type:
                    </label>
                    <div className="col-sm-6">
                      <select
                        className="form-control"
                        id="bgscrl"
                        onChange={(e) => {
                          setbagtype(e.target.value);
                        }}
                      >
                        <option selected value="">
                          None
                        </option>
                        <option value="Regular">Re-route</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 d-flex justify-content-center text-align-center">
                      <button
                        className="btn btn-primary  mb-3 "
                        onClick={bagCreationSubmitButtonFunction}
                        disabled={!bagDescription || !bagDestinationCenter}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div> */}

            {payload ? (
              <Bagtable response={information} />
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
export default Reroutebagcreation;
