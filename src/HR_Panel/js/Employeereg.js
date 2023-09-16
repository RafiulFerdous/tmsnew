import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
import {
  Linksidebar,
  CustomerCareLinksidebar,
  Salessidebar,
  Operationsidebar,
  Hrsidebar,
  Degital_Ocean_flag,
  company_name,
  superadminsidebar,
} from "../../Common/Linksidebar";
import { LoginContext } from "../../Context/loginContext";
import axios from "axios";
import { toast } from "react-toastify";

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

let employeeid, setemployeeid;
let employeename, setemployeename;
let userid, setuserid;
let password, setpassword;
let employeeaddress, setemployeeaddress;
let employeezone, setemployeezone;
let employeedesignation, setemployeedesignation;
let employeecontact, setemployeecontact;
let employeeemergencycontact, setemployeeemergencycontact;
let employeeemail, setemployeeemail;
let dcname, setdcname;

const Employeereg = () => {
  toast.configure();

  const [information, setinformation] = useState({});
  const [payload, setpayload] = useState(false);

  [employeeid, setemployeeid] = useState("");
  [employeename, setemployeename] = useState("");
  [userid, setuserid] = useState("");
  [password, setpassword] = useState("");
  [employeeaddress, setemployeeaddress] = useState("");
  [employeezone, setemployeezone] = useState("");
  [employeedesignation, setemployeedesignation] = useState("");
  [employeecontact, setemployeecontact] = useState("");
  [employeeemergencycontact, setemployeeemergencycontact] = useState("");
  [employeeemail, setemployeeemail] = useState("");
  [dcname, setdcname] = useState([]);
  // [submitFlag, setsubmitFlag] = useState(false);
  //   const [employeeid,setemployeeid] = useState("");
  //   const [employeeid,setemployeeid] = useState("");

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
        employee_degignation_list.Admin
      ) {
        setsiteBarInformation_LocalStore(Hrsidebar); //useState a set kore rakhlam.
        final_sideBar = Hrsidebar;
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
        employee_degignation_list.Admin
      ) {
        setsiteBarInformation_LocalStore(Hrsidebar); //useState a set kore rakhlam.
      } else if (
        context_flag_obj.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.SuperAdmin
      ) {
        setsiteBarInformation_LocalStore(superadminsidebar); //useState a set kore rakhlam
      }
      setlogingInformation_LocalStore(context_flag_obj);
    }
  }, []);

  useEffect(() => {
    var axios = require("axios");

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/allDcList" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/allDcList" + "?company_name=" + company_name,
      headers: {
        "Content-Type": "application/json",
        //'Authorization': `Bearer ${logingInformation_LocalStore.token}`
      },
    };

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        return json_object;
      })
      .then((res) => {
        console.log("response is ", res);
        setdcname(res.message);
        //setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  console.log("these are dc name", dcname);

  let submit = (e) => {
    e.preventDefault();

    var axios = require("axios");
    var data = JSON.stringify({
      registration: {
        EMPLOYEE_ID: parseInt(employeeid),
        EMPLOYEE_NAME: employeename,
        EMPLOYEE_USER_ID: userid,
        EMPLOYEE_PASSWORD: password,
        EMPLOYEE_ADDRESS: employeeaddress,
        EMPLOYEE_ZONE: employeezone,
        EMPLOYEE_DEGIGNATION: employeedesignation,
        //"EMPLOYEE_TYPE":
        EMPLOYEE_CONTACT: employeecontact,
        EMPLOYEE_EMERGENCY_CONTACT: employeeemergencycontact,
        EMPLOYEE_EMAIL: employeeemail,
        EMPLOYEE_CREATION_DATE: getCurrentTime(),
      },
      accept: {
        LoginID: logingInformation_LocalStore.all_user_list.employeE_ID,
      },
    });

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/loginRegistration/registration" +
          "?company_name=" +
          company_name
        : "/loginRegistration/registration" + "?company_name=" + company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: data,
    };

    console.log("this is data", data);
    console.log("this is config", config);

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));

        toast.success(response.data.message, {
          position: "top-right",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });
      })
      .catch(function (error) {
        console.log("this is", error);
        toast.error("Something Wrong!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1800,
        });
      });
  };

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

        <div className="row container">
          <div className="col-12" id="bgcrt">
            <div className="border border-primary d">
              <h3 className="text-center">Employee Registration</h3>
              <div className="container p-3">
                <form className>
                  <div className="form-group row mb-2">
                    <label htmlFor className="col-sm-3 col-form-label">
                      Employee ID :{" "}
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Employee ID"
                        required
                        value={employeeid}
                        onChange={(e) => {
                          setemployeeid(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label htmlFor className="col-sm-3 col-form-label">
                      Employee Name :{" "}
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Employee Name"
                        required
                        value={employeename}
                        onChange={(e) => {
                          setemployeename(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label htmlFor className="col-sm-3 col-form-label">
                      User ID :{" "}
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="User ID"
                        required
                        value={userid}
                        onChange={(e) => {
                          setuserid(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label htmlFor className="col-sm-3 col-form-label">
                      Password :{" "}
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => {
                          setpassword(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label htmlFor className="col-sm-3 col-form-label">
                      Employee Address :{" "}
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Employee Address"
                        required
                        value={employeeaddress}
                        onChange={(e) => {
                          setemployeeaddress(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label htmlFor className="col-sm-3 col-form-label">
                      Employee Zone :{" "}
                    </label>
                    <div className="col-sm-6">
                      <input
                        list="dcnamelist"
                        className="form-control"
                        onChange={(e) => {
                          setemployeezone(e.target.value);
                        }}
                        placeholder="Employee Zone"
                      />
                      <datalist id="dcnamelist">
                        <option selected value="None"></option>
                        <option value="Head Office"></option>
                        {/* required value={employeezone} onChange={(e) => { setemployeezone(e.target.value) }} */}
                        {dcname &&
                          dcname.map((single_dc) => {
                            console.log("SINGLE DC NAME:", single_dc);
                            return <option value={single_dc}></option>;
                          })}
                      </datalist>
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label htmlFor className="col-sm-3 col-form-label">
                      Employee Designation:{" "}
                    </label>
                    <div className="col-sm-6">
                      <select
                        type="text"
                        className="form-control"
                        placeholder="Employee Designation"
                        required
                        value={employeedesignation}
                        onChange={(e) => {
                          setemployeedesignation(e.target.value);
                        }}
                      >
                        <option selected value="">
                          None
                        </option>
                        <option value="PROCESSING CENTER">
                          PROCESSING CENTER
                        </option>
                        <option value="DISTRICT INCHARGE">
                          DISTRICT INCHARGE
                        </option>
                        <option value="CUSTOMER CARE">CUSTOMER CARE</option>
                        <option value="FIELD EXECUTIVE">FIELD EXECUTIVE</option>
                        <option value="OPERATION">OPERATION</option>
                        <option value="Client">Client</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label htmlFor className="col-sm-3 col-form-label">
                      Employee Contact:{" "}
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Employee Contact"
                        required
                        value={employeecontact}
                        onChange={(e) => {
                          setemployeecontact(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label htmlFor className="col-sm-3 col-form-label">
                      Employee Emergency Contact:{" "}
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Employee Emergency Contact"
                        required
                        value={employeeemergencycontact}
                        onChange={(e) => {
                          setemployeeemergencycontact(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label htmlFor className="col-sm-3 col-form-label">
                      Employee Email:{" "}
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Employee Email"
                        required
                        value={employeeemail}
                        onChange={(e) => {
                          setemployeeemail(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 d-flex justify-content-center text-align-center">
                      <button
                        className="btn btn-primary  mb-3 "
                        onClick={submit}
                        disabled={!employeedesignation || !userid}
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

        <div className="row">
          <div className="col-12">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};
export default Employeereg;
