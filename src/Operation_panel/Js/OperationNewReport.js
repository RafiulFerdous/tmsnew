/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomeO.css";
import { Navbar } from "../../Common/Navbar";
import Footer from "../../Common/Footer";
import "../css/all.css";
import { LoginContext } from "../../Context/loginContext";
import {
  CustomerCareLinksidebar,
  Operationsidebar,
  Degital_Ocean_flag,
  company_name,
  superadminsidebar,
} from "../../Common/Linksidebar";
import { toast } from "react-toastify";
import "react-circular-progressbar/dist/styles.css";
import { ScaleLoader } from "react-spinners";
import { AiFillFileExcel } from "react-icons/ai";

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
const OperationNewReport = () => {
  toast.configure();
  const [employId, setemployId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reportDate, setReportDate] = useState("");
  const [showBtn, setShowBtn] = useState(false);

  const [reportUrl, setReportUrl] = useState("");

  var { loginInformation, setloginInformation } = useContext(LoginContext);

  const [logingInformation_LocalStore, setlogingInformation_LocalStore] =
    useState(loginInformation);
  const [siteBarInformation_LocalStore, setsiteBarInformation_LocalStore] =
    useState([]);

  const handleReportDate = (e) => {
    setReportDate(e.target.value);
  };

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

    if (context_flag_obj === undefined) {
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
  }, [loginInformation]);
  useEffect(() => {
    var axios = require("axios");
    setShowBtn(false);
    var config = {
      method: "get",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/api/v1.1/NewReport/NewReasonReport" +
          "?endDate=" +
          reportDate
        : "http://test.e-deshdelivery.com/api/v1.1/NewReport/NewReasonReport" +
          "?endDate=" +
          reportDate,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
    };
    console.log("new api", config);

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        console.log(json_object);
        return json_object;
      })
      .then((res) => {
        setReportUrl(res?.data);
        setShowBtn(true);
      })
      .catch(function (error) {
        toast.error(error?.message);
        setShowBtn(false);
      });
  }, [reportDate, logingInformation_LocalStore.token]);

  console.log("reportUrl", reportUrl);
  return (
    <div className="bodydiv">
      <div className="row">
        <div className="col-12">
          <Navbar sidebar_manu={siteBarInformation_LocalStore} />
        </div>
      </div>
      <div className="container mt-5 pt-5">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-6 col-12 p-3 shadow-lg text-center">
            {/* <label htmlFor="report-download" className="mt-3">
              Pick date for report previous 5 month.
            </label> */}
            <br />
            <br />
            <input
              style={{
                backgroundColor: "#C5D5E4",
                outline: "none",
                border: "none",
                padding: "7px",
                borderRadius: "8px",
                // marginLeft: "6px",
                width: "65%",
              }}
              type="date"
              name=""
              id="report-download"
              onChange={handleReportDate}
            />
            <br />
            <br />

            {reportDate.length == 0 ? (
              <p className="border p-2 d-inline ">Please Select Date:</p>
            ) : showBtn ? (
              <a className="btn btn-success my-2 text-white " href={reportUrl}>
                <AiFillFileExcel /> DownLoad Report
              </a>
            ) : (
              //loader
              <ScaleLoader color="#36d7b7" height={15} width={3} />
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
  );
};

export default OperationNewReport;
