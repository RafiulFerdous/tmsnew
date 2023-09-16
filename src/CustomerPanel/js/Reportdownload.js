import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
import Creportdownload from "../../Model/Customer_content/Creportdownload";
import "../css/all.css";
import "./Reportdownload.css";
import {
  Linksidebar,
  CustomerCareLinksidebar,
  Salessidebar,
  Operationsidebar,
  Degital_Ocean_flag,
  company_name,
} from "../../Common/Linksidebar";
import { LoginContext } from "../../Context/loginContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { toast } from "react-toastify";
import Multiselect from "multiselect-react-dropdown";
import ReactPaginate from "react-paginate";
import Loader from "../../Loader";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";

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

let convert_time_to_time = (receive_time) => {
  let return_time = "";
  for (let i = 0; i < receive_time.length; i++) {
    if (return_time[i] == "/") return_time = return_time + "-";
    else return_time = return_time + receive_time[i];
  }
  return_time = return_time + "T15:47:28.807";
  return return_time;
};

// let startDateTime,setstartDateTime;
// let endDataTime,setendDataTime;
let submitFlag, setsubmitFlag;

const Reportdownload = () => {
  toast.configure();
  const [searchTerm, setSearchTerm] = React.useState([]);

  const [SubmitFlag, setSubmitFlag] = useState(false);

  const [dcname, setdcname] = useState(null);

  const [client, setclient] = useState(null);
  const [startdate, setstartdate] = useState(null);
  const [enddate, setenddate] = useState(null);

  const [paymenttype, setpaymenttype] = useState(null);
  const [pdStatus, setPdStatus] = useState(null);

  const [searchreasult, setsearchreasult] = useState([]);
  const [waybilsearch, setwaybilsearch] = useState([]);

  const [clientId, setclientId] = useState("");
  // [startDateTime, setstartDateTime] = useState("");
  // [endDataTime, setendDataTime] = useState("");
  [submitFlag, setsubmitFlag] = useState("");

  const [information, setinformation] = useState({});
  const [payload, setpayload] = useState(false);
  const [cname, setcname] = useState("");
  const [reportDate, setReportDate] = useState("");

  const [showBtn, setShowBtn] = useState(false);
  const [reportUrl, setReportUrl] = useState("");

  const [reportStartDate, setReportStartDate] = useState(null);
  const [reportEndDate, setReportEndDate] = useState(null);

  const [waybill, setWaybill] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [searchToggle, setSearchToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusString, setStatusString] = useState("");

  const handleOnchange = (val) => {
    setStatusString(val);
  };
  const options = [
    { label: "IN-SYSTEM", value: "InSystem" },
    { label: "DELIVERED", value: "Delevered" },
    { label: "RETURN", value: "Returned" },
    { label: "LOST", value: "Lost" },
  ];

  const [statusS, setstatus] = useState([
    "InSystem",
    "Delevered",
    "Returned",
    "Lost",
  ]);

  // console.log("reportStartDate", reportStartDate);
  // console.log("reportEndDate", reportEndDate);
  // console.log("waybill", waybill);
  // console.log("pageNumber", pageNumber);
  // console.log("finalstatus", finalstatus);
  console.log("tableData", tableData);

  const localStorageData = JSON.parse(
    localStorage.getItem("logingInformation_LocalStore")
  );

  // console.log("localStorageData", localStorageData);

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
      } else if (
        loginInformation.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.ProcessingCenter
      ) {
        setsiteBarInformation_LocalStore(Linksidebar); //useState a set kore rakhlam.
        final_sideBar = Linksidebar;
      }

      setLogin_Sidebar_LocalStore(loginInformation, final_sideBar); //local store a set kore rakhlam.
      setlogingInformation_LocalStore(loginInformation); //useState a set kore rakhlam.
      setclientId(loginInformation.all_user_list_Client.customeR_ID);
      setcname(loginInformation.all_user_list_Client.customeR_NAME);
    } else {
      if (context_flag_obj.user_type == employee_degignation_list.Customer) {
        setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam.
      } else if (
        context_flag_obj.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.ProcessingCenter
      ) {
        setsiteBarInformation_LocalStore(Linksidebar); //useState a set kore rakhlam.
      }
      setlogingInformation_LocalStore(context_flag_obj);
      setclientId(context_flag_obj.all_user_list_Client.customeR_ID);
      setcname(context_flag_obj.all_user_list_Client.customeR_NAME);
    }
  }, []);

  // const search = () => {
  //   setIsLoading(true);
  //   toast.info("searching...");
  //   console.log("this is dc", dcname);
  //   console.log("this is client", client);
  //   console.log("this is startdate", startdate);
  //   console.log("this is enddate", enddate);
  //   console.log("this is finalstatus", finalstatus);
  //   console.log("this is paymenttype", paymenttype);

  //   //console.log("this is singlestatus", final)

  //   var axios = require("axios");
  //   var data = JSON.stringify({
  //     user_id: 0,
  //     dc_name: dcname,
  //     client_name: cname,
  //     start_datetime: startdate,
  //     end_datetime: enddate,
  //     payment_type: paymenttype,
  //     status: finalstatus,
  //   });
  //   console.log("this is data : ", data);
  //   var config = {
  //     method: "post",
  //     url: Degital_Ocean_flag
  //       ? "https://e-deshdelivery.com/universalapi/allapi/all_panel_all_search" +
  //         "?company_name=" +
  //         company_name
  //       : "/universalapi/allapi/all_panel_all_search" +
  //         "?company_name=" +
  //         company_name,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${logingInformation_LocalStore.token}`,
  //     },
  //     data: data,
  //   };

  //   console.log("this is config", config);

  //   axios(config)
  //     .then(function (response) {
  //       console.log(JSON.stringify(response.data));
  //       console.log(response.data);

  //       return response;
  //     })
  //     .then((res) => {
  //       console.log("new response", res);
  //       setsearchreasult(res.data.message.all_product_information);
  //       setwaybilsearch(res.data.message.all_product_information);
  //       setIsLoading(false);
  //       toast.success("Search Successfull.");
  //       //setinfoModalOpen(true);

  //       //setpayload(true);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       setIsLoading(false);
  //     });
  // };

  const handleReportDate = (e) => {
    setReportDate(e.target.value);
  };

  const handlePageClick = ({ selected: selectedPage }) => {
    let currentPage = selectedPage + 1;
    setPageNumber(currentPage);
  };
  useEffect(() => {
    // setPageNumber(1);
    console.log(pageNumber);
    // setfinalstatus("");
    // setpaymenttype("");
    // setReportStartDate(null);
    // setReportEndDate(null);
  }, [searchToggle]);

  useEffect(() => {
    console.log("eff");
    var axios = require("axios");
    setShowBtn(false);
    setIsLoading(true);
    var payload = JSON.stringify({
      pagenumber: pageNumber,
      customer_id: localStorageData?.all_user_list_Client?.customeR_ID,
      // status: statusString,
      status: pdStatus,
      payment_type: paymenttype,
      start_date: reportStartDate === "" ? null : reportStartDate,
      end_date: reportEndDate === "" ? null : reportEndDate,
      waybill: waybill,
    });
    // let data = JSON.stringify({
    //   customer_id: clientId,
    // });
    var config = {
      method: "post",
      data: payload,
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/Multiplewaybill" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/Multiplewaybill" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageData.token}`,
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
        toast.info(res?.message);
        setReportUrl(res.downloadurl);
        setTableData(res.data);
        setPageCount(res.total_page);
        setShowBtn(true);
        setIsLoading(false);
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
        console.log(error?.response?.data?.message);
        toast.error(error?.response?.data?.meessage);
        setTableData(error?.response?.data?.data);
        setShowBtn(false);
        setIsLoading(false);
      });
  }, [pageNumber, searchToggle]);

  // useEffect(() => {
  //   const results =
  //     waybilsearch &&
  //     waybilsearch.filter(
  //       (p) =>
  //         // p.consignee_contact.search(searchTerm.toLowerCase()) !=-1||
  //         p.product_waybill
  //           .toString()
  //           .toLowerCase()
  //           .includes(searchTerm.toString().toLowerCase()) ||
  //         p.consignee_contact
  //           .toString()
  //           .toLowerCase()
  //           .includes(searchTerm.toString().toLowerCase()) ||
  //         p.order_id
  //           .toString()
  //           .toLowerCase()
  //           .includes(searchTerm.toString().toLowerCase())
  //     );
  //   setsearchreasult(results);
  //   //if(results.length >0){
  //   setall_data(results);

  //   // }
  //   console.log("Search result", searchResults);
  // }, [searchTerm]);
  const searchIcon = <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>;

  return (
    <>
      <div className="bodydiv">
        <div>
          <div>
            <div className="row">
              <div className="col-12 bg-dark">
                <Navbar sidebar_manu={siteBarInformation_LocalStore} />
              </div>
            </div>
            {/* <div className="row">
                  <div className="col-12">
                   <Sidebar  sidebar_manu={siteBarInformation_LocalStore}/>
                  </div>
                  </div> */}

            {/* <div className="container">
             
              <div className="row mt-5 pt-5">
              
                <div className="col-lg-5 col-md-6 col-12 p-3 shadow-lg m-auto text-center">
                  <label htmlFor="report-download" className="mt-3">
                    select start Date:
                  </label>

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
                    onChange={(e) => setReportStartDate(e.target.value)}
                  />
                </div>
                <div className="col-lg-5 col-md-6 col-12 p-3 shadow-lg m-auto text-center">
                  <label htmlFor="report-download" className="mt-3">
                    select end Date:
                  </label>

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
                    onChange={(e) => setReportEndDate(e.target.value)}
                  />
                </div>
                <div className="text-center">
                  {reportStartDate.length == 0 && reportEndDate.length == 0 ? (
                    <></>
                  ) : (
                    showBtn && (
                      <a className="btn btn-success px-2 my-2" href={reportUrl}>
                        DownLoad Report
                      </a>
                    )
                  )}
                </div>
              </div>
          
            </div> */}

            <div className="container row-col-2 mt-5 pt-5">
              {/* search option */}
              {/*new design sales panel report download start */}

              <div className="">
                {/* <h4 className="text-dark text-center">Report Download</h4> */}
                <div className="container shadow my-3 py-3 rounded single-product-upload-bg">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                      <div className="row my-2">
                        <div className="col-lg-3 col-md-3 col-12">
                          <p> Waybill:</p>
                        </div>
                        <div className="col-lg-9 col-md-9 col-12">
                          <input
                            className="shadow-lg form-control  me-3 bg-white rounded"
                            // defaultValue={clientName}
                            type="text"
                            placeholder="Waybill"
                            value={waybill}
                            onChange={(e) => {
                              setWaybill(e.target.value);
                            }}
                          ></input>
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-lg-6 col-md-6 col-12">
                      <div className="row my-2">
                        <div className="col-lg-3 col-md-3 col-12">
                          <p>Client Name:</p>
                        </div>
                        <div className="col-lg-9 col-md-9 col-12">
                          <input
                            className="shadow-lg form-control  me-3 bg-white rounded"
                            list="clientNames"
                            id="clientname"
                            // onChange={(e) => {
                            //   setclient(e.target.value);
                            // }}
                          />
                          <datalist id="clientNames">
                            <option selected value="">
                              None
                            </option>
                          </datalist>
                        </div>
                      </div>
                    </div> */}
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="row my-2">
                        <div className="col-lg-3 col-md-3 col-12">
                          <p> Start Date:</p>
                        </div>
                        <div className="col-lg-9 col-md-9 col-12">
                          <input
                            style={{
                              backgroundColor: "#fff",
                              outline: "none",
                              border: "none",
                              padding: "7px",
                              borderRadius: "8px",
                              width: "100%",
                            }}
                            className="input-small "
                            type="date"
                            id="startdate"
                            value={reportStartDate}
                            onChange={(e) => {
                              setReportStartDate(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="row my-2">
                        <div className="col-lg-3 col-md-3 col-12">
                          <p> End Date:</p>
                        </div>
                        <div className="col-lg-9 col-md-9 col-12">
                          <input
                            style={{
                              backgroundColor: "#fff",
                              outline: "none",
                              border: "none",
                              padding: "7px",
                              borderRadius: "8px",
                              width: "100%",
                            }}
                            type="date"
                            className="input-small"
                            id="enddate"
                            value={reportEndDate}
                            onChange={(e) => {
                              setReportEndDate(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="row my-2">
                        <div className="col-lg-3 col-md-3 col-12">
                          <p> Payement Type:</p>
                        </div>
                        <div className="col-lg-9 col-md-9 col-12">
                          <select
                            placeholder={paymenttype}
                            className="form-select"
                            id="paymenttype"
                            onChange={(e) => {
                              setpaymenttype(e.target.value);
                            }}
                          >
                            <option value="">None</option>
                            <option value="COD">COD</option>
                            <option value="Prepaid">Prepaid</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="row my-2">
                        <div className="col-lg-3 col-md-3 col-12">
                          <p> Status:</p>
                        </div>
                        <div className="col-lg-9 col-md-9 col-12">
                          <div
                            style={{
                              backgroundColor: "#fff",
                              outline: "none",
                              border: "none",
                              borderRadius: "8px",
                            }}
                          >
                            {/* <MultiSelect
                              onChange={handleOnchange}
                              options={options}
                            /> */}
                            {/* <Multiselect
                              isObject={false}
                              onChange={(e) => console.log(e.target.value)}
                              onRemove={(event) => {
                                // setProductStatus(event);

                                console.log("e", event);
                                // finalstatus.replace(event, "");
                              }}
                              onSelect={(event) => {
                                console.log("event", event);

                                setProductStatus(() => event);
                                // let selectedStatus = "";
                                // for (let i = 0; i < event.length; i++) {
                                //   selectedStatus += event[i] + ",";
                                // }
                                // setfinalstatus(selectedStatus);
                                //finalstatus.push(event.selectedItem)
                              }}
                              options={statusS}
                              // selectedValues={[]}
                              //showCheckbox
                            /> */}
                            <select
                              placeholder={pdStatus}
                              className="form-select"
                              id="pdStatus"
                              onChange={(e) => {
                                setPdStatus(e.target.value);
                              }}
                            >
                              <option value="">None</option>
                              <option value="InSystem">InSystem</option>
                              <option value="Delevered">Delevered</option>
                              <option value="Returned">Returned</option>
                              <option value="Lost">Lost</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 d-flex justify-content-center mt-4 mb-2">
                    <button
                      type="button"
                      className="btn btn-success btn-sm px-4 me-2"
                      onClick={() => setSearchToggle(!searchToggle)}
                    >
                      Search
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm px-4 ms-2"
                      onClick={() => window.location.reload()}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
              {/*new design sales panel report download end */}

              <div id="requesttable">
                <div id="no-more-tables">
                  {/*<CSVLink data={searchreasult} className="btn btn-sm bg-info text-black border-info mb-2" >Download csv</CSVLink>*/}
                  {/*Table*/}

                  <div className="row p-0">
                    <div className="col-2">
                      <a href={reportUrl} className="btn btn-success px-4">
                        Export Excell
                      </a>
                    </div>
                    {/* <div className="col-lg-2 col-md-3 col-12 mb-2 ">
                      <ReactHTMLTableToExcel
                        className="js-download-link btn btn-dark px-4 text-white rounded-3"
                        table="bd"
                        filename={`Report${getCurrentTime()}`}
                        sheet="Sheet"
                        buttonText="Export excel"
                      />
                    </div> */}
                    {/* <div className="col-lg-6 col-md-6 col-12 mb-2 ">
                      <input
                        style={{
                          backgroundColor: "#C5D5E4",
                          outline: "none",
                          border: "none",
                          padding: "7px",
                          borderRadius: "8px",
                          width: "93%",
                        }}
                        type="text"
                        placeholder="Waybill Or Order ID"
                        // value={searchTerm}
                        // onChange={(e) => {
                        //   setSearchTerm(e.target.value);
                        // }}
                      />
                    </div> */}

                    <div className="mb-2 d-flex flex-row-reverse">
                      <ReactPaginate
                        breakLabel="..."
                        nextLabel=" >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="< "
                        renderOnZeroPageCount={null}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        containerClassName={"pagination"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        activeClassName={"active"}
                      />
                    </div>
                  </div>
                  {isLoading ? (
                    <div>
                      <Loader />
                    </div>
                  ) : (
                    <table
                      className="table css-serial bg-white"
                      style={{ fontSize: "13px", marginLeft: "1px" }}
                      id="bd"
                    >
                      {/*Table head*/}
                      <thead
                        className="text-center shadow sticky-top "
                        style={{
                          backgroundColor: "#b4bec2",
                          top: "60px",
                          zIndex: "0",
                        }}
                      >
                        <tr className="text-dark" style={{ border: "none" }}>
                          <th>SL</th>
                          <th scope="col">Waybill</th>
                          <th>Order ID</th>
                          <th scope="col">Customer Name</th>
                          <th scope="col">Customer No.</th>
                          <th scope="col">Address</th>
                          <th scope="col">Description</th>
                          <th scope="col">Payment type</th>
                          <th>Value</th>
                          {/* <th>Weight</th> */}
                          <th scope="col">Procsscing Status </th>
                          <th scope="col">processing_status_datetime </th>
                          <th scope="col">Entry Date </th>
                          {/* <th>Pin Code</th> */}
                          <th>Person</th>
                          <th>Reason</th>
                        </tr>
                      </thead>
                      {/*Table head*/}
                      {/*Table body*/}
                      <tbody className="text-center border border-dark">
                        {tableData?.map((single_message, i) => {
                          return (
                            <tr key={i} className="">
                              <td data-title="SL"></td>
                              <td data-title="Waybill" scope="row">
                                {single_message.waybill_number}
                              </td>
                              <td data-title="Order ID">
                                {single_message.reference_number}
                              </td>
                              <td data-title="Customer Name">
                                {single_message.consignee_name}
                              </td>
                              <td data-title="Customer No">
                                {single_message.contact_number}
                              </td>
                              <td data-title="Address">
                                {single_message.address}
                              </td>
                              <td data-title="Description">
                                {single_message.description}
                              </td>
                              <td data-title="Payment type">
                                {single_message.payment_type}
                              </td>
                              <td data-title="Value">
                                {single_message.value_amount}
                              </td>
                              {/* <td> {single_message.product_weight}</td> */}
                              <td data-title="Procsscing Status">
                                {single_message.processing_status}
                              </td>

                              <td data-title="processing_status_datetime">
                                {single_message.processing_status_datetime &&
                                  single_message.processing_status_datetime.split(
                                    "T"
                                  )[0]}
                              </td>
                              <td data-title="Entry Date">
                                {single_message.entry_time &&
                                  single_message.entry_time.split("T")[0]}
                              </td>
                              <td data-title="Person">
                                {single_message.person}
                              </td>

                              <td data-title="Reason">
                                {single_message.reason}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      {/*Table body*/}
                    </table>
                  )}
                  {/*Table*/}
                </div>
              </div>
            </div>

            <div className="">
              <div className="col-12">
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Reportdownload;
