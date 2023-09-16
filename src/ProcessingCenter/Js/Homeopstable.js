import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Footer from "../../Common/Footer";
import Homeoperationtable from "../../Model/Processingcenter/Homeoperationtable";
import "../css/all.css";
import { LoginContext } from "../../Context/loginContext";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  Linksidebar,
  CustomerCareLinksidebar,
  Salessidebar,
  Operationsidebar,
  Degital_Ocean_flag,
  company_name,
  superadminsidebar,
} from "../../Common/Linksidebar";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../Loader";
import { Input } from "antd";
const { Search } = Input;

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

let employId, setemployId;
let date_time, setdate_time;

const Homeopstable = () => {
  [employId, setemployId] = useState("");
  [date_time, setdate_time] = useState("");

  const [inputText, setInputText] = useState("");

  const [startdate, setstartdate] = useState(null);
  const [enddate, setenddate] = useState(null);
  const [waybill, setwaybill] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    }
  }, []);

  useEffect(() => {
    setemployId(logingInformation_LocalStore.all_user_list.employeE_ID);
  }, [logingInformation_LocalStore]);

  //product count code start here

  const unattamptStutus = information?.message?.filter(checkUnattampt);
  function checkUnattampt(unattamptStutus) {
    return unattamptStutus?.color_code == "PRODUCT";
  }

  // DeliveredStutus number for dashboard

  const DeliveredStutus = information?.message?.filter(checkDelivered);
  function checkDelivered(DeliveredStutus) {
    return DeliveredStutus?.color_code == "DELEVERED_PRODUCT_INFORMATION";
  }

  // HoldStutus number for dashboard

  const holdStutus = information?.message?.filter(checkHold);
  function checkHold(holdStutus) {
    return holdStutus?.color_code == "Hold";
  }

  // lostStutus number for dashboard

  const lostStutus = information?.message?.filter(checkLost);
  function checkLost(lostStutus) {
    return lostStutus?.color_code == "LOST_PRODUCT_INFORMATION";
  }

  // lostStutus number for dashboard

  const returnStutus = information?.message?.filter(checkReturn);
  function checkReturn(returnStutus) {
    return returnStutus?.color_code == "RETURNED_PRODUCT_INFORMATION";
  }

  //product count code end here

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
        if (res.message.length === 0) {
          toast.info("No Data!");
          setpayload(false);
        } else {
          setpayload(true);
        }
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  console.log("this is new api information", information);

  const searchIcon = <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>;

  const percentage = 80;

  // function for get CSV
  const getCSV = () => {
    console.log({ inputText });

    // <a  href="https://e-deshdelivery.com/report/OperationReport-May25.csv"></a>;
    return;

    var axios = require("axios");
    var data = JSON.stringify({
      // order_id: referenceno,
    });

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
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        return json_object;
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
      });

    // setTimeout(() => {
    //   setInputText("");
    // }, 1000);
  };

  return (
    <>
      <div className="bodydiv">
        <div className="row">
          <div className="col-12">
            <Navbar sidebar_manu={siteBarInformation_LocalStore} />
          </div>
        </div>

        {/*new design start*/}

        <div className="container mt-5 pt-5">
          <div className="row">
            <div
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
                      {unattamptStutus ? (
                        <span className="m-0 fw-bold">
                          {unattamptStutus?.length}
                        </span>
                      ) : (
                        <span className="m-0 fw-bold">0</span>
                      )}
                    </div>
                    <div className="d-flex justify-content-between my-1">
                      <div className="Delivered m-0"></div>
                      <span className="m-0 fw-bold">Total Delivered</span>
                      {DeliveredStutus ? (
                        <span className="m-0 fw-bold">
                          {DeliveredStutus?.length}
                        </span>
                      ) : (
                        <span className="m-0 fw-bold">0</span>
                      )}
                    </div>
                    <div className="d-flex justify-content-between my-1">
                      <div className="Lost m-0"></div>
                      <span className="m-0 fw-bold">Total Lost</span>
                      {lostStutus ? (
                        <span className="m-0 fw-bold">
                          {lostStutus?.length}
                        </span>
                      ) : (
                        <span className="m-0 fw-bold">0</span>
                      )}
                    </div>
                    <div className="d-flex justify-content-between my-1">
                      <div className="Hold m-0"></div>
                      <span className="m-0 fw-bold">Total Hold</span>
                      {holdStutus ? (
                        <span className="m-0 fw-bold">
                          {holdStutus?.length}
                        </span>
                      ) : (
                        <span className="m-0 fw-bold">0</span>
                      )}
                    </div>
                    <div className="d-flex justify-content-between my-1">
                      <div className="Return m-0"></div>
                      <span className="m-0 fw-bold">Total Return</span>
                      {returnStutus ? (
                        <span className="m-0 fw-bold">
                          {returnStutus?.length}
                        </span>
                      ) : (
                        <span className="m-0 fw-bold">0</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12 col-12 my-3">
                  <h6 className="fw-bold m-0">Data Overview by Search</h6>

                  <div className="mt-4">
                    <div className="d-flex justify-content-between my-1">
                      <div className="unattempted m-0"></div>
                      <span className="m-0  fw-bold">Total Unattempted</span>
                      {unattamptStutus ? (
                        <span className="m-0 fw-bold">
                          {unattamptStutus?.length}
                        </span>
                      ) : (
                        <span className="m-0 fw-bold">0</span>
                      )}
                    </div>
                    <div className="d-flex justify-content-between my-1">
                      <div className="Delivered m-0"></div>
                      <span className="m-0  fw-bold">Total Delivered</span>
                      {DeliveredStutus ? (
                        <span className="m-0 fw-bold">
                          {DeliveredStutus?.length}
                        </span>
                      ) : (
                        <span className="m-0 fw-bold">0</span>
                      )}
                    </div>
                    <div className="d-flex justify-content-between my-1">
                      <div className="Lost m-0"></div>
                      <span className="m-0  fw-bold">Total Lost</span>
                      {lostStutus ? (
                        <span className="m-0 fw-bold">
                          {lostStutus?.length}
                        </span>
                      ) : (
                        <span className="m-0 fw-bold">0</span>
                      )}
                    </div>
                    <div className="d-flex justify-content-between my-1">
                      <div className="Hold m-0"></div>
                      <span className="m-0  fw-bold">Total Hold</span>
                      {holdStutus ? (
                        <span className="m-0 fw-bold">
                          {holdStutus?.length}
                        </span>
                      ) : (
                        <span className="m-0 fw-bold">0</span>
                      )}
                    </div>
                    <div className="d-flex justify-content-between my-1">
                      <div className="Return m-0"></div>
                      <span className="m-0  fw-bold">Total Return</span>
                      {returnStutus ? (
                        <span className="m-0 fw-bold">
                          {returnStutus?.length}
                        </span>
                      ) : (
                        <span className="m-0 fw-bold">0</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-6 col-12 ">
              <div className="p-3">
                {/* <div className="row mb-2">
                  {" "}
                  <Search
                    placeholder="input search loading default"
                    loading={false}
                    enterButton="Download"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onSearch={getCSV}
                  />
                </div> */}
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

        {/*new design end*/}

        <div className="container">
          <div className="col-12 pt-5" id="">
            {isLoading ? (
              <Loader />
            ) : payload ? (
              <Homeoperationtable response={information} />
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
export default Homeopstable;

function Example(props) {
  return (
    <div style={{ marginBottom: "" }}>
      <div style={{ marginTop: 30, display: "flex" }}>
        <div style={{ width: "100%" }}>{props.children}</div>
      </div>
    </div>
  );
}
