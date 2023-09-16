import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { SearchContext } from "../../Context/searchContext";
import { SearchButtonContext } from "../../Context/buttonContext";
import {
  Linksidebar,
  CustomerCareLinksidebar,
  Salessidebar,
  Operationsidebar,
  Degital_Ocean_flag,
  company_name,
} from "../../Common/Linksidebar";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileSaver from "file-saver";
import * as XLSX from "xlsx";
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

let pageRefreshFlag, setpageRefreshFlag;
let informationResponse, setinformationResponse;
let idNumber, setidNumber;
let employee_id, setemployee_id;
let dateTime, setdateTime;

const Picktable = (props) => {
  var { searchInformation, setsearchInformation } = useContext(SearchContext);
  var { searchButtonInformation, setsearchButtonInformation } =
      useContext(SearchButtonContext);
  if (searchButtonInformation) {
    //search button click korar pore ki hobe...........
    setsearchInformation("");
    setsearchButtonInformation(false);
  }
  let json_information = props.response;

  [informationResponse, setinformationResponse] = useState("");
  [pageRefreshFlag, setpageRefreshFlag] = useState(true);
  [idNumber, setidNumber] = useState(-5);
  [employee_id, setemployee_id] = useState(-5);
  [dateTime, setdateTime] = useState("");

  const [information, setinformation] = useState({});
  const [payload, setpayload] = useState(false);

  const [logingInformation_LocalStore, setlogingInformation_LocalStore] =
      useState("");

  //new code for search in Pickup Request page...........
  var { searchInformation, setsearchInformation } = useContext(SearchContext);
  var { searchButtonInformation, setsearchButtonInformation } =
      useContext(SearchButtonContext);
  if (searchButtonInformation) {
    //search button click korar pore ki hobe...........
    setsearchInformation("");
    setsearchButtonInformation(false);
  }
  //code end for search in Pickup Request page.............

  let pickupRequest_accept_buttonFunction = (bag_id_number) => {
    setidNumber(bag_id_number);
    setpageRefreshFlag(false);
    setinformationResponse("Accept");
    setdateTime(getCurrentTime);
  };

  let pickupRequest_done_buttonFunction = (bag_id_number) => {
    setidNumber(bag_id_number);
    setpageRefreshFlag(false);
    setinformationResponse("Done");
    setdateTime(getCurrentTime);
  };

  let getLogingInformation_LocalStore = () => {
    let value = JSON.parse(
        localStorage.getItem("logingInformation_LocalStore")
    );
    return value;
  };

  useEffect(() => {
    let context_flag_obj = null;
    context_flag_obj = getLogingInformation_LocalStore();
    setemployee_id(context_flag_obj.all_user_list.employeE_ID);
    setlogingInformation_LocalStore(context_flag_obj);

    console.log("json Information : ", json_information);
    console.log("id number : ", idNumber);
    console.log("Login Information : ", logingInformation_LocalStore);
    console.log("local_storage value : ", context_flag_obj);
    console.log("Refresh Flag : ", pageRefreshFlag);
  }, []);

  useEffect(() => {
    if (idNumber > 0) {
      var axios = require("axios");
      var data = JSON.stringify({
        pc_employee_id: employee_id,
        pickup_request_id: idNumber,
        response_status: informationResponse,
        date_time: dateTime,
      });

      var config = {
        method: "post",
        url: Degital_Ocean_flag
            ? "https://e-deshdelivery.com/universalapi/allapi/accept_or_cancel_pickupRequest" +
            "?company_name=" +
            company_name
            : "/universalapi/allapi/accept_or_cancel_pickupRequest" +
            "?company_name=" +
            company_name,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${logingInformation_LocalStore.token}`,
        },
        data: data,
      };
      console.log("this is ", config);

      console.log("date from axios : ", data);
      axios(config)
          .then(function (response) {
            let json_object_str = JSON.stringify(response.data);
            let json_object = JSON.parse(json_object_str);
            console.log(json_object);
            return json_object;
          })
          .then((res) => {
            console.log("object information : ", res);
            setinformation(res);
            setpayload(true);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  }, [idNumber, logingInformation_LocalStore, informationResponse]);

  const [searchTerm, setSearchTerm] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);
  const handleonChange = (event) => {
    setSearchTerm(event.target.value);
  };
  React.useEffect(() => {
    const users1 = json_information.message.all_pickup_request.filter((p) =>
        p.clienT_NAME
            .toString()
            .toLowerCase()
            .includes(searchTerm.toString().toLowerCase())
    );
    setSearchResults(users1);
  }, [searchTerm]);
  const searchIcon = <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>;

  // ------------------excel download function start---------------------------

  const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const fileName = "PickUp Request Table ";

  const exportToCSV = (apiData, fileName) => {
    toast.success("Excel Download Successful");
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  // ------------------excel download function end---------------------------
  return (
      <>
        <div className="container">
          {/* <form className="row d-flex justify-content-center">
          <div className="col-lg-6 col-md-6 col-sm-4 form-group mx-3 mt-2 p-4">
            <div className="input-group  input-icons">
              <i className="icon ">{searchIcon}</i>
              <input
                type="search"
                name=""
                id=""
                placeholder="Type Client Name"
                className="rounded-pill px-5 py-2  input-field"
                style={{
                  width: "-webkit-fill-available",
                  textAlign: "start",
                  marginLeft: "15px",
                  boxShadow: "2px 3px 3px 1px #00000059",
                  outline: "none",
                  border: "none",
                }}
                value={searchTerm}
                onChange={handleonChange}
              />
            </div>
          </div>
        </form> */}

          <div className="mt-3" id="no-more-tables">
            <div className="row">
              <div className="col-lg-6 col-md-8 col-12 mb-3">
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
                    placeholder="Type Client Name"
                    value={searchTerm}
                    onChange={handleonChange}
                />
              </div>
            </div>
            {/* <table
            className="table bg-white"
            style={{ fontSize: "13px", marginLeft: "1px" }}
          >
            <thead
              className="text-center shadow sticky-top "
              style={{ backgroundColor: "#b4bec2", top: "60px", zIndex: "0" }}
            >
              <tr className="text-dark" style={{ border: "none" }}>
                <th style={{ fontSize: "14px", fontWeight: 500 }}>Action</th>
                <th style={{ fontSize: "14px", fontWeight: 500 }}>
                  Client Name
                </th>
                <th style={{ fontSize: "14px", fontWeight: 500 }}>
                  Pickup Address
                </th>
                <th style={{ fontSize: "14px", fontWeight: 500 }}>Pin Code</th>
                <th style={{ fontSize: "14px", fontWeight: 500 }}>
                  Pickup Date
                </th>
                <th style={{ fontSize: "14px", fontWeight: 500 }}>
                  Pickup Request Date
                </th>
                <th style={{ fontSize: "14px", fontWeight: 500 }}>
                  Total Package
                </th>
                <th style={{ fontSize: "14px", fontWeight: 500 }}>Type</th>
                <th style={{ fontSize: "14px", fontWeight: 500 }}>
                  Pickup Request Status
                </th>
                <th style={{ fontSize: "14px", fontWeight: 500 }}>
                  Pickup Request Status Date
                </th>
                <th style={{ fontSize: "14px", fontWeight: 500 }}>
                  Monitored By
                </th>
              </tr>
            </thead>

            <tbody className="text-center border border-dark">
              {pageRefreshFlag
                ? searchResults.map((single_message) => {
                    let button_activity_accept = "disabled";
                    let button_activity_done = "disable";
                    if (
                      single_message.pickuP_REQUEST_STATUS ==
                      "PickupRequestAccepted"
                    ) {
                      button_activity_accept = "disabled";
                      button_activity_done = "enable";
                    } else if (
                      single_message.pickuP_REQUEST_STATUS ==
                      "PickupRequestPlaced"
                    ) {
                      button_activity_accept = "enable";
                      button_activity_done = "enable";
                    } else if (
                      single_message.pickuP_REQUEST_STATUS == "PickupDone"
                    ) {
                      button_activity_accept = "disabled";
                      button_activity_done = "disabled";
                    }

                    //single_message.waybill_number.includes(searchInformation)

                    return (
                      <tr key={single_message.id}>
                        <td data-title="Action" className=" pe-2">
                          <button
                            className={
                              "btn btn-dark me-1 btn-sm " +
                              button_activity_accept
                            }
                            onClick={() =>
                              pickupRequest_accept_buttonFunction(
                                single_message.id
                              )
                            }
                          >
                            Accept
                          </button>
                          <button
                            className={
                              "btn btn-secondary btn-sm px-3 " +
                              button_activity_done
                            }
                            onClick={() =>
                              pickupRequest_done_buttonFunction(
                                single_message.id
                              )
                            }
                          >
                            Done
                          </button>
                        </td>
                        <td data-title="Client Name" className="text-end pe-2">
                          {single_message.clienT_NAME}
                        </td>
                        <td
                          data-title="Pickup Address"
                          className="text-end pe-2 W-100"
                        >
                          {single_message.pickuP_ADDRESS}
                        </td>
                        <td data-title="Pin Code" className="text-end pe-2">
                          {single_message.pincode}
                        </td>
                        <td data-title="Pickup Date" className="text-end pe-2">
                          {single_message.pickuP_DATETIME}
                        </td>
                        <td
                          data-title="Pickup Request Date"
                          className="text-end pe-2"
                        >
                          {single_message.pickuP_REQUEST_DATETIME}
                        </td>
                        <td
                          data-title="Total Package Number"
                          className="text-end pe-2"
                        >
                          {single_message.totaL_NUMBER_OF_PACKAGES}
                        </td>
                        <td data-title="Type" className="text-end pe-2">
                          {single_message.producT_TYPE}
                        </td>
                        <td
                          data-title="Request Status"
                          className="text-end pe-2"
                        >
                          {single_message.pickuP_REQUEST_STATUS}
                        </td>
                        <td
                          data-title="Request Status Date"
                          className="text-end pe-2"
                        >
                          {single_message.pickuP_REQUEST_STATUS_DATETIME}
                        </td>
                        <td
                          data-title="Request Monitored By"
                          className="text-end pe-2"
                        >
                          {single_message.pickuP_REQUEST_MONITORED_BY}
                        </td>
                      </tr>
                    );
                  })
                : payload
                ? information.message.all_pickup_request.map(
                    (single_message) => {

                      return (
                        <tr key={single_message.id}>
                          <td data-title="Action" className="text-end pe-2">
                            <button
                              className="btn btn-success  btn-sm"
                              onClick={() =>
                                pickupRequest_accept_buttonFunction(
                                  single_message.id
                                )
                              }
                            >
                              Accept
                            </button>
                            <button
                              className="btn btn-dark btn-sm"
                              onClick={() =>
                                pickupRequest_done_buttonFunction(
                                  single_message.id
                                )
                              }
                            >
                              Done
                            </button>
                          </td>
                          <td
                            data-title="Client Name"
                            className="text-end pe-2"
                          >
                            {single_message.clienT_NAME}
                          </td>
                          <td
                            data-title="Pickup Address"
                            className="text-end pe-2 w-100"
                          >
                            <span className="w-100">
                              {single_message.pickuP_ADDRESS}
                            </span>
                          </td>
                          <td data-title="Pin Code" className="text-end pe-2">
                            {single_message.pincode}
                          </td>
                          <td
                            data-title="Pickup Date"
                            className="text-end pe-2"
                          >
                            {single_message.pickuP_DATETIME}
                          </td>
                          <td
                            data-title="Pickup Request Date"
                            className="text-end pe-2"
                          >
                            {single_message.pickuP_REQUEST_DATETIME}
                          </td>
                          <td
                            data-title="Total Package Number"
                            className="text-end pe-2"
                          >
                            {single_message.totaL_NUMBER_OF_PACKAGES}
                          </td>
                          <td data-title="Type" className="text-end pe-2">
                            {single_message.producT_TYPE}
                          </td>
                          <td
                            data-title="Request Status"
                            className="text-end pe-2"
                          >
                            {single_message.pickuP_REQUEST_STATUS}
                          </td>
                          <td
                            data-title="Request Status Date"
                            className="text-end pe-2"
                          >
                            {single_message.pickuP_REQUEST_STATUS_DATETIME}
                          </td>
                          <td
                            data-title="Request Monitored By"
                            className="text-end pe-2"
                          >
                            {single_message.pickuP_REQUEST_MONITORED_BY}
                          </td>
                        </tr>
                      );
                    }
                  )
                : "Wait for a moment."}
            </tbody>
          </table> */}
            <div className="my-3">
              <button
                  className="btn btn-sm btn-dark px-3 rounded-3"
                  onClick={(e) =>
                      exportToCSV(
                          searchResults || information.message.all_pickup_request,
                          fileName
                      )
                  }
              >
                Export Excel
              </button>
            </div>

            <table
                className="table bg-white"
                style={{ fontSize: "13px", marginLeft: "1px" }}
            >
              <thead
                  className="text-center shadow sticky-top "
                  style={{ backgroundColor: "#b4bec2", top: "60px", zIndex: "0" }}
              >
              <tr className="text-dark" style={{ border: "none" }}>
                <th>Action</th>
                <th>Client Name</th>
                <th>Pickup Address</th>
                <th>Pin Code</th>
                <th>Pickup Date</th>
                <th>Pickup Request Date</th>
                <th>Total Package</th>
                <th>Type</th>
                <th>Pickup Request Status</th>
                <th>Pickup Request Status Date</th>
                <th>Monitored By</th>
              </tr>
              </thead>

              <tbody className="text-center border border-dark">
              {pageRefreshFlag
                  ? searchResults.map((single_message) => {
                    let button_activity_accept = "disabled";
                    let button_activity_done = "disable";
                    if (
                        single_message.pickuP_REQUEST_STATUS ==
                        "PickupRequestAccepted"
                    ) {
                      button_activity_accept = "disabled";
                      button_activity_done = "enable";
                    } else if (
                        single_message.pickuP_REQUEST_STATUS ==
                        "PickupRequestPlaced"
                    ) {
                      button_activity_accept = "enable";
                      button_activity_done = "enable";
                    } else if (
                        single_message.pickuP_REQUEST_STATUS == "PickupDone"
                    ) {
                      button_activity_accept = "disabled";
                      button_activity_done = "disabled";
                    }

                    //single_message.waybill_number.includes(searchInformation)
                    {
                      /* if(single_message.pincode == searchInformation || single_message.clienT_NAME == searchInformation ){
                                                 background = "bg-danger";
                                             } */
                    }
                    {
                      /* className={background} */
                    }
                    return (
                        <tr key={single_message.id}>
                          <td data-title="Action" className="">
                            <button
                                className={
                                    "btn btn-dark me-1 btn-sm mb-2 " +
                                    button_activity_accept
                                }
                                onClick={() =>
                                    pickupRequest_accept_buttonFunction(
                                        single_message.id
                                    )
                                }
                            >
                              Accept
                            </button>
                            <button
                                className={
                                    "btn btn-secondary btn-sm px-3 mb-2 " +
                                    button_activity_done
                                }
                                onClick={() =>
                                    pickupRequest_done_buttonFunction(
                                        single_message.id
                                    )
                                }
                            >
                              Done
                            </button>
                          </td>
                          <td data-title="Client Name">
                            {single_message.clienT_NAME}
                          </td>
                          <td data-title="Pickup Address" className="h-100">
                            {single_message.pickuP_ADDRESS}
                          </td>
                          <td data-title="Pin Code">{single_message.pincode}</td>
                          <td data-title="Pickup Date">
                            {single_message.pickuP_DATETIME}
                          </td>
                          <td data-title="Pickup Request Date">
                            {single_message.pickuP_REQUEST_DATETIME}
                          </td>
                          <td data-title="Total Package Number">
                            {single_message.totaL_NUMBER_OF_PACKAGES}
                          </td>
                          <td data-title="Type">{single_message.producT_TYPE}</td>
                          <td data-title="Request Status">
                            {single_message.pickuP_REQUEST_STATUS}
                          </td>
                          <td data-title="Request Status Date">
                            {single_message.pickuP_REQUEST_STATUS_DATETIME}
                          </td>
                          <td data-title="Request Monitored By">
                            {single_message.pickuP_REQUEST_MONITORED_BY}
                          </td>
                        </tr>
                    );
                  })
                  : payload
                      ? information.message.all_pickup_request.map(
                          (single_message) => {
                            return (
                                <tr key={single_message.id}>
                                  <td data-title="Action">
                                    <button
                                        className="btn btn-success  btn-sm mb-2 "
                                        onClick={() =>
                                            pickupRequest_accept_buttonFunction(
                                                single_message.id
                                            )
                                        }
                                    >
                                      Accept
                                    </button>
                                    <button
                                        className="btn btn-dark btn-sm mb-2 "
                                        onClick={() =>
                                            pickupRequest_done_buttonFunction(
                                                single_message.id
                                            )
                                        }
                                    >
                                      Done
                                    </button>
                                  </td>
                                  <td data-title="Client Name">
                                    {single_message.clienT_NAME}
                                  </td>
                                  <td data-title="Pickup Address">
                                    {single_message.pickuP_ADDRESS}
                                  </td>
                                  <td data-title="Pin Code">
                                    {single_message.pincode}
                                  </td>
                                  <td data-title="Pickup Date">
                                    {single_message.pickuP_DATETIME}
                                  </td>
                                  <td data-title="Pickup Request Date">
                                    {single_message.pickuP_REQUEST_DATETIME}
                                  </td>
                                  <td data-title="Total Package Number">
                                    {single_message.totaL_NUMBER_OF_PACKAGES}
                                  </td>
                                  <td data-title="Type" className="text-end pe-2">
                                    {single_message.producT_TYPE}
                                  </td>
                                  <td data-title="Request Status">
                                    {single_message.pickuP_REQUEST_STATUS}
                                  </td>
                                  <td data-title="Request Status Date">
                                    {single_message.pickuP_REQUEST_STATUS_DATETIME}
                                  </td>
                                  <td data-title="Request Monitored By">
                                    {single_message.pickuP_REQUEST_MONITORED_BY}
                                  </td>
                                </tr>
                            );
                          }
                      )
                      : "Wait for a moment."}
              </tbody>
            </table>
          </div>
        </div>
      </>
  );
};
export default Picktable;
