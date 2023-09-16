import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
import Assigntofetable from "../../Model/Dcpanel/Assigntofetable";
// import '../css/all.css';
import axios from "axios";
import {
  BrowserRouter,
  Switch,
  Route,
  useHistory,
  useLocation,
  Link,
} from "react-router-dom";
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
  dcpanel,
  superadminsidebar,
} from "../../Common/Linksidebar";
import { toast } from "react-toastify";

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

export default function Wrongcorrection() {
  toast.configure();
  const [DistrictNamePayload, setDistrictNamePayload] = useState(false);
  const [DistrictNameinformation, setDistrictNameinformation] = useState([]);
  const [employId, setemployId] = useState("");
  const [waybill, setwaybill] = useState("");
  const [address, setaddress] = useState("");
  const [dcname, setdcname] = useState("");
  const [pin, setpin] = useState("");
  const [submitflag, setsubmitflag] = useState(false);
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
        employee_degignation_list.Operation
      ) {
        setsiteBarInformation_LocalStore(Operationsidebar); //useState a set kore rakhlam.
        final_sideBar = Operationsidebar;
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
        employee_degignation_list.Operation
      ) {
        setsiteBarInformation_LocalStore(Operationsidebar); //useState a set kore rakhlam.
      } else if (
        context_flag_obj.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.DistrictIncharge
      ) {
        setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam
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
  // useEffect(()=>{
  //   setemployId(logingInformation_LocalStore.all_user_list.employeE_ID);
  // },[logingInformation_LocalStore])

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
    if (!waybill) return;

    let data = JSON.stringify({
      employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
      waybill: waybill,

      dc_name: dcname,

      date_time: getCurrentTime(),
    });

    console.log("this is wrong correction data", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/wrongMenifestCorrection" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/wrongMenifestCorrection" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: data,
    };
    console.log("wrong correction  congig", config);
    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        return json_object;
      })
      .then((res) => {
        console.log("response is wrong correction status", res);
        toast.success(res.message, {
          position: "top-right",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });
        //setinformation(res);
        //setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [submitflag]);
  const submitaddress = (e) => {
    e.preventDefault();
    setsubmitflag(!submitflag);
  };

  return (
    <div>
      <div className="bodydiv">
        <div className="row">
          <div className="col-12 ">
            <Navbar sidebar_manu={siteBarInformation_LocalStore} />
          </div>
        </div>
        <div className=" mt-5 pt-5  mx-5 border border-primary d">
          <h3 className="text-center">Wrong Menifest Correction </h3>
          <div className="container p-3">
            <form className>
              <div className="form-group row mb-2">
                <label htmlFor className="col-sm-3 col-form-label">
                  DC Name:
                </label>
                <div className="col-sm-6">
                  <input
                    list="dcnames"
                    className="form-control"
                    placeholder="DC Name "
                    required
                    onChange={(e) => {
                      setdcname(e.target.value);
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
              {/*<div className="form-group row mb-2">*/}
              {/*    <label htmlFor className="col-sm-3 col-form-label">Address: </label>*/}
              {/*    <div className="col-sm-6">*/}
              {/*        <input type="text" className="form-control" placeholder="Address" required value={address} onChange={(e)=>{ setaddress(e.target.value) }}/>*/}
              {/*    </div>*/}
              {/*</div>*/}
              {/*<div className="form-group row mb-2">*/}
              {/*    <label htmlFor className="col-sm-3 col-form-label">Pin : </label>*/}
              {/*    <div className="col-sm-6">*/}
              {/*        <input type="text" className="form-control" placeholder="Pin" required value={pin} onChange={(e)=>{ setpin(e.target.value) }}/>*/}
              {/*    </div>*/}
              {/*</div>*/}
              <div className="form-group row mb-2">
                <label htmlFor className="col-sm-3 col-form-label">
                  Waybill :{" "}
                </label>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Waybill "
                    required
                    value={waybill}
                    onChange={(e) => {
                      setwaybill(e.target.value);
                    }}
                  />
                </div>
              </div>

              {/* bag type */}

              <div className="row">
                <div className="col-12 d-flex justify-content-center text-align-center">
                  <button
                    className="btn btn-primary  mb-3 "
                    onClick={submitaddress}
                    disabled={!waybill || !dcname}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
