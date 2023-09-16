import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomeO.css";
import { Navbar } from "../../Common/Navbar";
import Footer from "../../Common/Footer";
import HomeOperation from "../../Model/operation_content/HomeOperation";
import "../css/all.css";
import { LoginContext } from "../../Context/loginContext";
import {
  CustomerCareLinksidebar,
  Operationsidebar,
  Degital_Ocean_flag,
  company_name,
  superadminsidebar,
} from "../../Common/Linksidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-circular-progressbar/dist/styles.css";
import Loader from "../../Loader";
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

const HomeO = () => {
  toast.configure();
  const [employId, setemployId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reportDate, setReportDate] = useState("");
  const [showBtn, setShowBtn] = useState(false);

  const [reportUrl, setReportUrl] = useState("");

  const [information, setinformation] = useState({});
  //

  // unattamptStutus number for dashboard

  const [payload, setpayload] = useState(false);

  const [startdate, setstartdate] = useState(null);
  const [enddate, setenddate] = useState(null);
  const [waybill, setwaybill] = useState("");

  const [error, setError] = useState({});

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
        setIsLoading(false);
        if (res.message.length === 0) {
          toast.success("No Data!");
          setpayload(false);
        } else {
          setpayload(true);
        }
        // setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  console.log("this is new api information in operation", information);

  useEffect(() => {
    setemployId(logingInformation_LocalStore.all_user_list.employeE_ID);
  }, [logingInformation_LocalStore]);

  useEffect(() => {
    var axios = require("axios");
    setShowBtn(false);
    var config = {
      method: "get",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/api/Report/OperationReport" +
          "?company_name=" +
          company_name +
          "&endDate=" +
          reportDate
        : "http://test.e-deshdelivery.com/api/Report/OperationReport" +
          "?company_name=" +
          company_name +
          "&endDate=" +
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
        console.log("report url", res);
        setReportUrl(res.downloadurl);
        setShowBtn(true);
      })
      .catch(function (error) {
        console.log(error);
        setError(error?.response);
        setShowBtn(false);
      });
  }, [reportDate]);

  const unattamptStutus = information?.message?.filter(checkUnattampt);
  function checkUnattampt(unattamptStutus) {
    return unattamptStutus?.color_code == "PRODUCT";
  }
  console.log("unattamptStutus", unattamptStutus?.length);

  // DeliveredStutus number for dashboard

  const DeliveredStutus = information?.message?.filter(checkDelivered);
  function checkDelivered(DeliveredStutus) {
    return DeliveredStutus?.color_code == "DELEVERED_PRODUCT_INFORMATION";
  }
  console.log("DeliveredStutus", DeliveredStutus?.length);
  // HoldStutus number for dashboard

  const holdStutus = information?.message?.filter(checkHold);
  function checkHold(holdStutus) {
    return holdStutus?.color_code == "Hold";
  }
  console.log("holdStutus", holdStutus?.length);
  // lostStutus number for dashboard

  const lostStutus = information?.message?.filter(checkLost);
  function checkLost(lostStutus) {
    return lostStutus?.color_code == "LOST_PRODUCT_INFORMATION";
  }
  console.log("lostStutus", lostStutus?.length);
  // lostStutus number for dashboard

  const returnStutus = information?.message?.filter(checkReturn);
  function checkReturn(returnStutus) {
    return returnStutus?.color_code == "RETURNED_PRODUCT_INFORMATION";
  }
  console.log("returnStutus", returnStutus?.length);
  const searchIcon = <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>;

  const percentage = 80;

  return (
    <>
      <div className="bodydiv">
        <div className="row">
          <div className="col-12">
            <Navbar sidebar_manu={siteBarInformation_LocalStore} />
          </div>
        </div>

        <div className="container mt-5 pt-5">
          <div className="row justify-content-between">
            <div className="col-lg-5 col-md-6 col-12 p-3 shadow-lg text-center">
              <label htmlFor="report-download" className="mt-3">
                Pick date for report previous 5 month.
              </label>
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
                <a
                  className="btn btn-success my-2 text-white "
                  href={reportUrl}
                >
                  <AiFillFileExcel /> DownLoad Report
                </a>
              ) : error.statusText ? (
                <p className="text-danger">{error?.statusText}</p>
              ) : (
                //loader
                <ScaleLoader color="#36d7b7" height={15} width={3} />
              )}
            </div>
            <div className="col-lg-5 col-md-6 col-12 p-3 shadow-lg text-center">
              <div className="p-3">
                <div className="row  ">
                  <div className="col-lg-6 col-md-12 col-12">
                    <div className="text-start my-1">
                      {/* <label htmlFor="startdate">Start Date</label> */}
                      <p className="mb-0">Start Date</p>
                      <input
                        style={{
                          backgroundColor: "#C5D5E4",
                          outline: "none",
                          border: "none",
                          padding: "7px",
                          borderRadius: "8px",
                          width: "100%",
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
                    <div className="text-end my-1">
                      {/* <label htmlFor="enddate">End Date</label> */}
                      <p className="mb-0">End Date</p>
                      <input
                        style={{
                          backgroundColor: "#C5D5E4",
                          outline: "none",
                          border: "none",
                          padding: "7px",
                          borderRadius: "8px",
                          marginLeft: "6px",
                          width: "100%",
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
                      width: "96%",
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
                <div className=" d-flex justify-content-center mt-3">
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-4 rounded-pill"
                    onClick={search}
                  >
                    Search
                  </button>
                </div>
                {/* <div className="border">
                  <div className="row mt-2">

                    <div className="col-6">
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="col-12" id="">
            {isLoading ? (
              <Loader />
            ) : payload ? (
              <HomeOperation response={information} />
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
export default HomeO;

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
