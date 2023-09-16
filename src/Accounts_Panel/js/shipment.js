import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Footer from "../../Common/Footer";
import "../css/all.css";
import { LoginContext } from "../../Context/loginContext";
import { toast } from "react-toastify";
import {
  Linksidebar,
  CustomerCareLinksidebar,
  Salessidebar,
  Operationsidebar,
  Degital_Ocean_flag,
  acsidebar,
  company_name,
  superadminsidebar,
} from "../../Common/Linksidebar";
import ACMultiWaybillTable from "../../Model/Accounts/ACMultiWaybillTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import Loader from "../../Loader";

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

const Shipment = () => {
  toast.configure();
  const [employId, setemployId] = useState("");
  const [date_time, setdate_time] = useState("");
  const [reportStartDate, setReportStartDate] = useState(null);
  const [reportEndDate, setReportEndDate] = useState(null);
  const [waybill, setwaybill] = useState("");
  const [accountsReportUrl, setAccountsReportUrl] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [startdate, setstartdate] = useState(null);
  const [enddate, setenddate] = useState(null);
  const [information, setinformation] = useState({});
  const [payload, setpayload] = useState(false);

  //start date formate for accounts report
  var startDateForAccountReport = new Date(reportStartDate);
  const startDateForReport =
    (startDateForAccountReport.getMonth() > 8
      ? startDateForAccountReport.getMonth() + 1
      : "0" + (startDateForAccountReport.getMonth() + 1)) +
    "/" +
    (startDateForAccountReport.getDate() > 9
      ? startDateForAccountReport.getDate()
      : "0" + startDateForAccountReport.getDate()) +
    "/" +
    startDateForAccountReport.getFullYear();

  //end date formate for accounts report
  var endDateForAccountReport = new Date(reportEndDate);

  const endDateForReport =
    (endDateForAccountReport.getMonth() > 8
      ? endDateForAccountReport.getMonth() + 1
      : "0" + (endDateForAccountReport.getMonth() + 1)) +
    "/" +
    (endDateForAccountReport.getDate() > 9
      ? endDateForAccountReport.getDate()
      : "0" + endDateForAccountReport.getDate()) +
    "/" +
    endDateForAccountReport.getFullYear();

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
        employee_degignation_list.Finance
      ) {
        setsiteBarInformation_LocalStore(acsidebar); //useState a set kore rakhlam.
        final_sideBar = acsidebar;
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
        employee_degignation_list.Finance
      ) {
        setsiteBarInformation_LocalStore(acsidebar); //useState a set kore rakhlam.
      } else if (
        context_flag_obj.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.SuperAdmin
      ) {
        setsiteBarInformation_LocalStore(superadminsidebar); //useState a set kore rakhlam
      }
      setlogingInformation_LocalStore(context_flag_obj);
    }
  }, []);
  const search = () => {
    setIsLoading(true);
    if (!logingInformation_LocalStore.token || employId === "") return;
    if (
      (waybill === "" || waybill === null) &&
      (startdate === "" || startdate === null) &&
      (enddate === "" || enddate === null)
    ) {
      toast.info("Enter Date or Waybills");
      setIsLoading(false);
      console.log("Nothing");
      return;
    }
    toast.info("Searching");
    var data = JSON.stringify({
      employee_id: employId,
      waybill_string: waybill === "" ? null : waybill,
      start_date: startdate === "" ? null : startdate,
      end_date: enddate === "" ? null : enddate,
    });

    var axios = require("axios");

    console.log("Locked api: ", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/operationPanel_Homeapi" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/operationPanel_Homeapi" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: data,
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
        console.log("ops api call", res);
        toast.success("Successful Search!");
        setinformation(res);
        setpayload(true);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  console.log("this is new api information", information);

  useEffect(() => {
    setemployId(logingInformation_LocalStore.all_user_list.employeE_ID);
  }, [logingInformation_LocalStore]);

  const searchIcon = <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>;
  const percentage = 80;

  const getReport = () => {
    var axios = require("axios");

    if (reportStartDate === null || reportStartDate === "") {
      return toast.warning("Please Select Start Date.");
    }
    if (reportEndDate === null || reportEndDate === "") {
      return toast.warning("Please Select End Date.");
    }
    setLoading(true);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? `https://e-deshdelivery.com/api/Report/AccountReport/?company_name=${company_name}&startDate=${startDateForReport}&endDate=${reportEndDate}`
        : `http://test.e-deshdelivery.com/api/Report/AccountReport/?company_name=${company_name}&startDate=${startDateForReport}&endDate=${reportEndDate}`,
      // url: 'http://test.e-deshdelivery.com/api/Report/AccountReport/?company_name=EDESH&startDate=11/01/2022&endDate=11/09/2022',
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
        console.log(res);
        setAccountsReportUrl(res?.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(true);
      });
  };

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

        {/* new design accounts Home start */}
        <div className="container mt-5 pt-5">
          <div className="row">
            {/* <div
                  className="col-lg-7 col-md-6 col-12 rounded-2 "
                  style={{ background: "#C5D5E4" }}
              >
                <div className="row py-3 justify-content-center">
                  <div className="col-lg-3 col-md-6 col-12 d-flex justify-content-center">
                    <Example label="">
                      <CircularProgressbar
                          value={percentage}
                          text={`${percentage}%`}
                          background
                          backgroundPadding={6}
                          styles={buildStyles({
                            backgroundColor: "#414042",
                            textColor: "#fff",
                            pathColor: "#ffde17",
                            trailColor: "#58595B",
                          })}
                      />
                    </Example>
                  </div>
                  <div className="col-lg-5 col-md-12 col-12 my-3">
                    <div className="d-flex justify-content-between align-itens-center">
                      <span className="fw-bold m-0">Previous Month:</span>
                      <input
                          className="shadow"
                          style={{
                            width: "250px",
                            color: "white",
                            backgroundColor: "#6D6D6D",
                            outline: "none",
                            border: "none",
                            padding: "7px",
                            borderRadius: "8px",
                          }}
                          type="month"
                          name=""
                          id=""
                      />
                    </div>
                    <div className="mt-2">
                      <div className="d-flex justify-content-between my-1">
                        <div className="unattempted m-0"></div>
                        <span className="m-0 fw-bold">Total Unattempted</span>
                        <span className="m-0 fw-bold">{7126}</span>
                      </div>
                      <div className="d-flex justify-content-between my-1">
                        <div className="Delivered m-0"></div>
                        <span className="m-0 fw-bold">Total Delivered</span>
                        <span className="m-0 fw-bold">{7126}</span>
                      </div>
                      <div className="d-flex justify-content-between my-1">
                        <div className="Lost m-0"></div>
                        <span className="m-0 fw-bold">Total Lost</span>
                        <span className="m-0 fw-bold">{726}</span>
                      </div>
                      <div className="d-flex justify-content-between my-1">
                        <div className="Hold m-0"></div>
                        <span className="m-0 fw-bold">Total Hold</span>
                        <span className="m-0 fw-bold">{712}</span>
                      </div>
                      <div className="d-flex justify-content-between my-1">
                        <div className="Return m-0"></div>
                        <span className="m-0 fw-bold">Total Return</span>
                        <span className="m-0 fw-bold">{26}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12 col-12 my-3">
                    <span className="fw-bold m-0">Current Month:</span>

                    <div className="mt-4">
                      <div className="d-flex justify-content-between my-1">
                        <div className="unattempted m-0"></div>
                        <span className="m-0  fw-bold">Total Unattempted</span>
                        <span className="m-0  fw-bold">{7126}</span>
                      </div>
                      <div className="d-flex justify-content-between my-1">
                        <div className="Delivered m-0"></div>
                        <span className="m-0  fw-bold">Total Delivered</span>
                        <span className="m-0  fw-bold">{7126}</span>
                      </div>
                      <div className="d-flex justify-content-between my-1">
                        <div className="Lost m-0"></div>
                        <span className="m-0  fw-bold">Total Lost</span>
                        <span className="m-0 fw-bold">{726}</span>
                      </div>
                      <div className="d-flex justify-content-between my-1">
                        <div className="Hold m-0"></div>
                        <span className="m-0  fw-bold">Total Hold</span>
                        <span className="m-0  fw-bold">{712}</span>
                      </div>
                      <div className="d-flex justify-content-between my-1">
                        <div className="Return m-0"></div>
                        <span className="m-0  fw-bold">Total Return</span>
                        <span className="m-0  fw-bold">{26}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            <div
              className="col-lg-6 col-md-6 col-12 rounded-2"
              style={{ background: "#C5D5E4" }}
            >
              <div className="p-3">
                <h5 className="text-center">Weekly Report DownLoad</h5>
                <div className="row  ">
                  <div className="col-lg-6 col-md-12 col-12">
                    <div className="d-flex-justify-content-center my-1">
                      <label htmlFor="reportStartDate">Start Date : </label>
                      <input
                        style={{
                          backgroundColor: "#e7f4f9",
                          outline: "none",
                          border: "none",
                          padding: "7px",
                          borderRadius: "8px",
                        }}
                        type="date"
                        className="input-small "
                        id="reportStartDate"
                        value={reportStartDate}
                        onChange={(e) => {
                          setReportStartDate(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 col-12">
                    <div className="d-flex-justify-content-center my-1">
                      <label htmlFor="reportEndDate">End Date : </label>
                      <input
                        style={{
                          backgroundColor: "#e7f4f9",
                          outline: "none",
                          border: "none",
                          padding: "7px",
                          borderRadius: "8px",
                          marginLeft: "6px",
                        }}
                        type="date"
                        className="input-small"
                        id="reportEndDate"
                        value={reportEndDate}
                        onChange={(e) => {
                          setReportEndDate(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-center mt-3">
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-4 rounded-pill me-2"
                    onClick={getReport}
                  >
                    Get Report
                  </button>

                  {reportStartDate === null ||
                  reportStartDate === "" ||
                  reportEndDate === null ||
                  reportEndDate === "" ? (
                    <></>
                  ) : accountsReportUrl === "" ? (
                    <></>
                  ) : (
                    <a
                      className="btn btn-outline-success px-2 ms-2"
                      href={loading ? "" : accountsReportUrl}
                    >
                      {loading ? "loading..." : " DownLoad Report"}
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12 ">
              <div className="p-3">
                <div className="row  ">
                  <div className="col-lg-6 col-md-12 col-12">
                    <div className="d-flex-justify-content-center my-1">
                      <label htmlFor="startdate">Start Date</label>
                      <input
                        style={{
                          backgroundColor: "#C5D5E4",
                          outline: "none",
                          border: "none",
                          padding: "7px",
                          borderRadius: "8px",
                        }}
                        type="date"
                        className="input-small "
                        id="startdate"
                        value={startdate}
                        onChange={(e) => {
                          setstartdate(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 col-12">
                    <div className="d-flex-justify-content-center my-1">
                      <label htmlFor="enddate">End Date</label>
                      <input
                        style={{
                          backgroundColor: "#C5D5E4",
                          outline: "none",
                          border: "none",
                          padding: "7px",
                          borderRadius: "8px",
                          marginLeft: "6px",
                        }}
                        type="date"
                        className="input-small"
                        id="enddate"
                        value={enddate}
                        onChange={(e) => {
                          setenddate(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <input
                    style={{
                      backgroundColor: "#C5D5E4",
                      outline: "none",
                      border: "none",
                      padding: "7px",
                      borderRadius: "8px",
                      width: "93%",
                      marginLeft: "10px",
                    }}
                    type="text"
                    placeholder="Waybill"
                    value={waybill}
                    onChange={(e) => {
                      setwaybill(e.target.value);
                    }}
                  />
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-4 rounded-pill"
                    onClick={search}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* new design accounts Home end */}

        <div className="container">
          <div className="col-12 pt-5" id="">
            {isLoading ? (
              <Loader />
            ) : payload ? (
              <ACMultiWaybillTable response={information} />
            ) : (
              <></>
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
export default Shipment;
function Example(props) {
  return (
    <div style={{ marginBottom: "" }}>
      <div style={{ marginTop: 30, display: "flex" }}>
        <div style={{ width: "100%" }}>{props.children}</div>
        {/* <div style={{ width: "70%" }}>
            <h3 className="h5">{props.label}</h3>
            <p>{props.description}</p>
          </div> */}
      </div>
    </div>
  );
}
