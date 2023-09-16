import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
//import Confirmpaymentdctable from '../../Model/Dcpanel/Confirmpaymentdctable';
import Unconfirmpaymentdctable from "../../Model/operation_content/Unconfirmpaymenttable";
// import '../css/all.css';
import axios from "axios";
import { CSVLink, CSVDownload } from "react-csv";
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
import Multiselect from "multiselect-react-dropdown";
import Confirmpaymenttable from "../../Model/Accounts/Confirmpaymenttable";
import Creportdownload from "../../Model/Customer_content/Creportdownload";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { toast } from "react-toastify";
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
export default function OpsDcPerformance() {
  toast.configure();
  const [employId, setemployId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [information, setinformation] = useState("");
  const [payload, setpayload] = useState(false);
  const [employeezone, setemployeezone] = useState("");
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  const [submitflag, setsubmitflag] = useState(false);
  const [dc_name, setdc_name] = useState([]);
  const [dcname, setdcname] = useState(null);
  const [productlist, setproductlist] = useState([]);
  const [selectedtype, setselectedtype] = useState("");
  const [empid, setempid] = useState("");
  const [allDcName, setAllDcName] = useState([]);
  const [feDcInfo, setFeDcInfo] = useState([]);
  console.log(feDcInfo, dc_name);
  const [selectedDcName, setSelectedDcName] = useState("");

  console.log("allDcName", allDcName);
  //     [employId,setemployId] = useState("");
  // [date_time, setdate_time] = useState("");

  // const [information, setinformation] = useState({});
  // const [payload, setpayload] = useState(false);

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

  useEffect(() => {
    setemployId(logingInformation_LocalStore.all_user_list.employeE_ID);
  }, [logingInformation_LocalStore]);

  useEffect(() => {
    console.log(siteBarInformation_LocalStore);
    let emp_desg = null;
    if (selectedtype == "dcDetailsJson") {
      emp_desg = "DISTRICT INCHARGE";
    } else if (selectedtype == "feDetailsjson") {
      emp_desg = "FIELD EXECUTIVE";
    }
    if (emp_desg == null) {
      toast.warning("Select Fe OR DC");
      return;
    } else if (dcname === null || dcname === "") {
      toast.warning("Select Employee.");
      return;
    } else if (startdate === null || startdate === "") {
      toast.warning("Select Start Date.");
      return;
    } else if (enddate === null || enddate === "") {
      toast.warning("Select End Date.");
      return;
    } else {
      toast.info("Searching...");
      setIsLoading(true);
    }

    let data = JSON.stringify({
      employee_id: parseInt(dcname),
      employee_degination: emp_desg,
      begining_date: startdate,
      ending_date: enddate,
    });
    console.log("this is dc_id", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/performanceReportdcandfe" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/performanceReportdcandfe" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: data,
    };
    console.log("config", config);

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        return json_object;
      })
      .then((res) => {
        console.log("response is date wise product", res);
        setinformation(res.message);
        setpayload(true);
        toast.success("Request Successful");
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  }, [submitflag]);

  console.log("token", logingInformation_LocalStore.token);
  useEffect(() => {
    if (information === "") return;
    let temp = [];
    information.day_collection.map((item) => {
      if (item.product_information != null) {
        console.log("single", item.product_information);
        item.product_information.map((single) => {
          temp.push(single);
        });
      }
    });
    setproductlist(temp);
    console.log("product ", temp);
  }, [information]);
  useEffect(() => {
    var axios = require("axios");
    var data = JSON.stringify({
      employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
    });

    // console.log(" Table APi: ",data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/all_dcandfe_information" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/all_dcandfe_information" +
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
        console.log("data is here", json_object);
        return json_object;
      })
      .then((res) => {
        console.log("this is res", res);
        setdc_name(res.message);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [logingInformation_LocalStore]);
  const choosefedc = (e) => {
    // console.log(dc_name);
    setselectedtype(e.target.value);
  };

  useEffect(() => {
    axios
      .get(
        Degital_Ocean_flag
          ? "https://e-deshdelivery.com/universalapi/allapi/getAllDCName" +
              "?company_name=" +
              company_name
          : "/universalapi/allapi/getAllDCName" +
              "?company_name=" +
              company_name,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${logingInformation_LocalStore.token}`,
          },
        }
      )
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        console.log("data is here", json_object);
        return json_object;
      })
      .then((res) => {
        console.log("All DC", res);
        setAllDcName(res.message.all_dc_name);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [logingInformation_LocalStore]);
  useEffect(() => {
    // if (!selectedDc) return;
    var axios = require("axios");
    var data = JSON.stringify({
      DcName: selectedDcName,
    });

    console.log(" selected dc: ", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/feUnderDc" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/feUnderDc" + "?company_name=" + company_name,
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: data,
    };

    console.log("config of feunderdc", config);

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        console.log("data is here", json_object);
        return json_object;
      })
      .then((res) => {
        console.log("this is all fe under dc", res.message);
        // setFeDcList(res.message);
        // setlostproductlist(res.message);
        setFeDcInfo(res.message);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [selectedDcName]);

  const search = () => {
    setsubmitflag(!submitflag);
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
        <div className="mt-5 pt-5 container">
          <div className="mt-5">
            <div className="container row-col-2">
              {/* search option */}

              <div className="border  mb-5">
                <form className="row d-flex justify-content-center">
                  {/*  */}
                  <div className=" col-sm-4 form-group mx-3 mt-2">
                    <div className=" text-center text-black mx-1">
                      Select DC:
                    </div>
                    {/*  onChange={handleFilter}*/}
                    <input
                      list="dcNames"
                      className="form-control "
                      onChange={(e) => {
                        setSelectedDcName(e.target.value);
                      }}
                    />
                    <datalist id="dcNames">
                      <option selected value="">
                        None
                      </option>
                      {allDcName &&
                        allDcName.map((single_dc_office_name) => {
                          // console.log("SINGLE DC NAME:", single_dc_office_name);
                          return (
                            <option value={single_dc_office_name}>
                              {single_dc_office_name}
                            </option>
                          );
                        })}
                    </datalist>
                  </div>
                  {/*  */}
                  <div className=" col-sm-4 form-group mx-3 mt-2">
                    <div className=" text-center text-black mx-1">Choose</div>
                    {/*  onChange={handleFilter}*/}
                    <select
                      className="form-control "
                      onChange={(e) => {
                        choosefedc(e);
                      }}
                    >
                      <option selected value="">
                        None
                      </option>
                      <option value="dcDetailsJson">DC</option>
                      <option value="feDetailsjson">FE</option>
                    </select>
                  </div>
                  <div className=" col-sm-4 form-group mx-3 mt-2">
                    <div className=" text-center text-black mx-1">
                      Employee Name:
                    </div>
                    {/*  onChange={handleFilter}*/}
                    <input
                      list="employee"
                      className="form-control "
                      onChange={(e) => {
                        setdcname(e.target.value);
                      }}
                    />
                    <datalist id="employee">
                      <option selected value="">
                        None
                      </option>
                      {selectedtype &&
                        feDcInfo[selectedtype].map((single_dc_office_name) => {
                          // console.log("SINGLE DC NAME:", single_dc_office_name);
                          return (
                            <div>
                              {single_dc_office_name.dcPersonId ? (
                                <option
                                  value={single_dc_office_name.dcPersonId}
                                >
                                  {single_dc_office_name.dcPersonName}
                                </option>
                              ) : (
                                <option value={single_dc_office_name.feId}>
                                  {single_dc_office_name.feName}
                                </option>
                              )}
                            </div>
                          );
                        })}
                    </datalist>
                  </div>

                  <div className=" col-sm-4 form-group mx-3 mt-4">
                    <div className=" text-center text-black m-2">
                      Start Date:{" "}
                      <input
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
                  <div className=" col-sm-4 form-group mx-3 mt-4">
                    <div className="text-center text-black m-2">
                      End Date:{" "}
                      <input
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
                  <div className="col-md-12 d-flex justify-content-center mt-4 mb-2">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      disabled={selectedtype == "" ? true : false}
                      onClick={search}
                    >
                      Search
                    </button>
                    {/* onClick={searchFilter} */}
                  </div>
                </form>
              </div>
              {isLoading ? (
                <Loader />
              ) : payload ? (
                <div id="requesttable">
                  <div>
                    {/* <CSVLink data={information &&information.day_collection}
                                                     className="btn btn-sm bg-info text-black border-info mb-2">Download
                                                csv</CSVLink> */}
                    <ReactHTMLTableToExcel
                      className="btn btn-info  px-4 btn-sm mb-2 me-2 "
                      table="performance"
                      filename="ReportExcel"
                      sheet="Sheet"
                      buttonText="Performance Csv"
                    />
                    <CSVLink
                      data={productlist && productlist}
                      filename={`DCProductPerformance${getCurrentTime()}.csv`}
                      className="btn btn-sm btn-success mx-2 mb-2"
                    >
                      Product Report csv
                    </CSVLink>

                    <table className="table table-hover" id="performance">
                      <thead className="bg-dark">
                        <tr className="text-white">
                          <th scope="col">Date</th>
                          <th>Dispatched</th>
                          <th>Delivered</th>
                          <th scope="col">Performance %</th>
                        </tr>
                      </thead>

                      <tbody>
                        {information &&
                          information.day_collection.map((single_message) => {
                            if (single_message.total_dispatch != 0) {
                              return (
                                <tr
                                  key={single_message.working_date}
                                  className="bg-success text-white"
                                >
                                  {/* className="btn btn-outline-primary text-white"*/}
                                  <td scope="row">
                                    {single_message.working_date}
                                  </td>
                                  <td>{single_message.total_dispatch}</td>
                                  <td>{single_message.total_delevered}</td>
                                  <td>{single_message.date_performance}</td>
                                </tr>
                              );
                            }
                          })}
                      </tbody>
                    </table>
                  </div>
                  <h4>Performance Summary</h4>
                  <div>
                    <ReactHTMLTableToExcel
                      className="btn btn-dark px-4 btn-sm mb-2"
                      table="datatable"
                      filename="ReportExcel"
                      sheet="Sheet"
                      buttonText="Export excel"
                    />

                    <table className="table table-hover" id="datatable">
                      <thead className="bg-dark">
                        <tr className="text-white">
                          <th scope="col">Name</th>
                          <th>Total COD</th>
                          <th>Dispatched</th>
                          <th>Delivered</th>
                          <th>Holded</th>
                          <th>Returned</th>
                          <th>Lost</th>
                          <th scope="col">Performance %</th>
                        </tr>
                      </thead>

                      <tbody>
                        {information && (
                          <tr
                            key={information.employee_name}
                            className="bg-success text-white"
                          >
                            {/* className="btn btn-outline-primary text-white"*/}
                            <td scope="row">{information.employee_name}</td>
                            <td scope="row">
                              {information.total_collected_cod}
                            </td>
                            <td scope="row">{information.total_dispatch}</td>
                            <td>{information.total_deleved_product}</td>
                            <td>{information.total_holded_product}</td>
                            <td>{information.total_returned_product}</td>
                            <td>{information.total_lost_product}</td>
                            <td>{information.total_performance}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <></>
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
}
