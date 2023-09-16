import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../css/all.css";
import Salesreportdownloadtable from "../../Model/Sales_content/SalesReportdownloadtable";
import "../css/all.css";
import { toast } from "react-toastify";
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
let clientName, setclientName;
let date_time, setdate_time;
let submitFlag, setsubmitFlag;
const Salesreportdownload = () => {
  toast.configure();
  [employId, setemployId] = useState("");
  [clientName, setclientName] = useState("");
  [date_time, setdate_time] = useState("");
  [submitFlag, setsubmitFlag] = useState("");

  const [information, setinformation] = useState({});
  const [payload, setpayload] = useState(false);

  var { loginInformation, setloginInformation } = useContext(LoginContext);

  const [logingInformation_LocalStore, setlogingInformation_LocalStore] =
    useState(loginInformation);
  const [siteBarInformation_LocalStore, setsiteBarInformation_LocalStore] =
    useState([]);
  const searchIcon = <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>;

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

      setLogin_Sidebar_LocalStore(loginInformation, final_sideBar); //local store a set kore rakhlam.
      setlogingInformation_LocalStore(loginInformation); //useState a set kore rakhlam.
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
  let searchButtonFunction = (e) => {
    e.preventDefault();

    setclientName(clientName);
    setsubmitFlag((submitFlag) => !submitFlag);
    if (typeof clientName == typeof null) {
      console.log("Value is not set. No api calling.");
    } else {
      var axios = require("axios");
      var data = JSON.stringify({
        sales_employee_id: employId,
        client_name: clientName,
      });
      console.log("Api call data: ", data);
      var config = {
        method: "post",
        url: Degital_Ocean_flag
          ? "https://e-deshdelivery.com/universalapi/allapi/salesPanelClientReport" +
            "?company_name=" +
            company_name
          : "/universalapi/allapi/salesPanelClientReport" +
            "?company_name=" +
            company_name,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${logingInformation_LocalStore.token}`,
        },
        data: data,
      };
      console.log("this is ", config);
      axios(config)
        .then(function (response) {
          let json_object_str = JSON.stringify(response.data);
          let json_object = JSON.parse(json_object_str);
          toast.success("Report show !", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
          console.log(json_object);
          return json_object;
        })
        .then((res) => {
          setinformation(res);
          setpayload(true);
        })
        .catch(function (error) {
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
    }
  };

  // useEffect(()=>{

  // },[logingInformation_LocalStore,submitFlag]);

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

        <div className="mt-5 pt-5 container">
          <div className="col-12 pt-5" id="">
            {/*new design start*/}

            <form className="row d-flex justify-content-center">
              <div className="col-lg-6 col-md-6 col-sm-4 form-group mx-3 mt-2 p-4">
                <div className="input-group  input-icons">
                  <i className="icon ">{searchIcon}</i>
                  <input
                    type="search"
                    name=""
                    id=""
                    placeholder="Client Name"
                    className="rounded-pill px-5 py-2  input-field"
                    style={{
                      width: "-webkit-fill-available",
                      textAlign: "start",
                      marginLeft: "15px",
                      boxShadow: "2px 3px 3px 1px #00000059",
                      outline: "none",
                      border: "none",
                    }}
                    value={clientName}
                    onChange={(e) => {
                      setclientName(e.target.value);
                    }}
                    // value={searchTerm}
                    // onChange={handleonChange}
                  />
                </div>

                <div className="mx-auto text-center">
                  <button
                    type="submit"
                    className="btn btn-info text-white mt-5"
                    onClick={searchButtonFunction}
                    disabled={!clientName}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </form>

            {/*new design end*/}

            {/*<div className="border rounded-3 border-dark bg-dark py-5">*/}
            {/*  <h3 className="text-center text-white">*/}
            {/*    Please Enter Your Client Name*/}
            {/*  </h3>*/}
            {/*  <div className="container p-3">*/}
            {/*    <div className="row justify-content-center mx-auto">*/}
            {/*      <div className="col-10 mx-auto">*/}
            {/*        <form className="form-inline">*/}
            {/*          <div className="d-flex justify-content-center mx-auto text-center">*/}
            {/*            <div className="mx-auto text-center text-white">*/}
            {/*              <input*/}
            {/*                placeholder="Client Name"*/}
            {/*                type="text"*/}
            {/*                className="input-small "*/}
            {/*                value={clientName}*/}
            {/*                onChange={(e) => {*/}
            {/*                  setclientName(e.target.value);*/}
            {/*                }}*/}
            {/*              />*/}
            {/*            </div>*/}
            {/*          </div>*/}
            {/*          <div className="mx-auto text-center">*/}
            {/*            <button*/}
            {/*              type="submit"*/}
            {/*              className="btn btn-info text-white mt-5"*/}
            {/*              onClick={searchButtonFunction}*/}
            {/*              disabled={!clientName}*/}
            {/*            >*/}
            {/*              Confirm*/}
            {/*            </button>*/}
            {/*          </div>*/}
            {/*        </form>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}
            <div>
              {payload ? (
                <Salesreportdownloadtable response={information} />
              ) : (
                <h4 className="text-center">Please Enter Your Client Name</h4>
              )}
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
export default Salesreportdownload;
