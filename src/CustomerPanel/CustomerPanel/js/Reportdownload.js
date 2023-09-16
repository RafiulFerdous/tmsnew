import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
import Creportdownload from "../../Model/Customer_content/Creportdownload";
import "../css/all.css";
import axios from "axios";

import Modal from "react-modal";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Multiselect from "multiselect-react-dropdown";
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

let clientId, setclientId;
// let startDateTime,setstartDateTime;
// let endDataTime,setendDataTime;
let submitFlag, setsubmitFlag;

const Reportdownload = () => {
  const [searchTerm, setSearchTerm] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);
  const [startDateTime, setstartDateTime] = React.useState([]);
  const [endDataTime, setendDataTime] = React.useState([]);
  const [infoData, setinfoData] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [infoModalOpen, setinfoModalOpen] = useState(false);

  const [alldata, setall_data] = useState([]);
  const [alldatafilter, setall_data_filter] = useState([]);
  const [waybill, setwaybill] = useState([]);
  const [SubmitFlag, setSubmitFlag] = useState(false);

  const [dcname, setdcname] = useState(null);

  const [client, setclient] = useState(null);
  const [startdate, setstartdate] = useState(null);
  const [enddate, setenddate] = useState(null);

  const [paymenttype, setpaymenttype] = useState(null);
  const [status, setstatus] = useState([
    "InSystem",
    "Delevered",
    "Returned",
    "Lost",
  ]);
  const [finalstatus, setfinalstatus] = useState([]);

  const [searchreasult, setsearchreasult] = useState([]);
  const [waybilsearch, setwaybilsearch] = useState([]);
  const [clientname, setclientname] = useState([]);
  const [dc_name, setdc_name] = useState([]);

  [clientId, setclientId] = useState("");
  // [startDateTime, setstartDateTime] = useState("");
  // [endDataTime, setendDataTime] = useState("");
  [submitFlag, setsubmitFlag] = useState("");

  const [information, setinformation] = useState({});
  const [payload, setpayload] = useState(false);
  const [cname, setcname] = useState("");

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

  const search = () => {
    console.log("this is dc", dcname);
    console.log("this is client", client);
    console.log("this is startdate", startdate);
    console.log("this is enddate", enddate);
    console.log("this is finalstatus", finalstatus);
    console.log("this is paymenttype", paymenttype);

    //console.log("this is singlestatus", final)

    var axios = require("axios");
    var data = JSON.stringify({
      user_id: 0,
      dc_name: dcname,
      client_name: cname,
      start_datetime: startdate,
      end_datetime: enddate,
      payment_type: paymenttype,
      status: finalstatus,
    });
    console.log("this is data : ", data);
    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/all_panel_all_search" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/all_panel_all_search" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: data,
    };

    console.log("this is config", config);

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        console.log(response.data);

        return response;
      })
      .then((res) => {
        console.log("new response", res);
        setsearchreasult(res.data.message.all_product_information);
        setwaybilsearch(res.data.message.all_product_information);

        //setinfoModalOpen(true);

        //setpayload(true);
      });
  };

  console.log("This is searchresult", searchreasult);

  // let searchButtonFunction = (e)=>{
  //   e.preventDefault();
  //   console.log("before conversion start time : ",startDateTime);
  //   console.log("before conversion End time : ",endDataTime);
  //
  //   console.log("after conversion start time : ",convert_time_to_time(startDateTime));
  //   console.log("after conversion End time : ",convert_time_to_time(endDataTime));
  //
  //   setstartDateTime(convert_time_to_time(startDateTime));
  //   setendDataTime(convert_time_to_time(endDataTime));
  //   setsubmitFlag(submitFlag => !submitFlag);
  // }

  // useEffect(()=>{
  //
  //     var axios = require('axios');
  //     // var data = JSON.stringify({
  //     //     "sales_employee_id": employId
  //     // });
  //
  //     // console.log(" Table APi: ",data);
  //
  //     var config = {
  //         method: 'post',
  //         url: Degital_Ocean_flag ? 'https://e-deshdelivery.com/universalapi/allapi/allmerchentname'+'?company_name='+company_name : '/universalapi/allapi/allmerchentname'+'?company_name='+company_name,
  //         headers: {
  //             'Content-Type': 'application/json',
  //             'Authorization': `Bearer ${logingInformation_LocalStore.token}`
  //         },
  //         //data : data
  //     };
  //
  //     axios(config)
  //         .then(function (response) {
  //             let json_object_str = JSON.stringify(response.data);
  //             let json_object = JSON.parse(json_object_str);
  //             console.log("data is here",json_object);
  //             return(json_object);
  //         }).then(res => {
  //         console.log("this is res",res)
  //         //setclientname(res.message);
  //         setinformation(res.message);
  //         setpayload(true);
  //
  //     })
  //         .catch(function (error) {
  //             console.log(error);
  //         });
  // },[logingInformation_LocalStore]);
  //

  //
  // useEffect(()=>{
  //   if(typeof(startDateTime)==typeof(null) || typeof(endDataTime)==typeof(null)){
  //     console.log("Value is not set. No api calling.");
  //   }
  //   else {
  //     var axios = require('axios');
  //     var data = JSON.stringify({
  //       "client_id": clientId,
  //       "start_date_time": startDateTime,
  //       "end_date_time": endDataTime
  //     });
  //     console.log("Api call data: ",data);
  //     var config = {
  //       method: 'post',
  //       url: Degital_Ocean_flag ? 'https://e-deshdelivery.com/universalapi/allapi/ClientReport'+'?company_name='+company_name : '/universalapi/allapi/ClientReport'+'?company_name='+company_name,
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${logingInformation_LocalStore.token}`
  //       },
  //       data : data
  //     };
  //     console.log("this is",config)
  //
  //     axios(config)
  //     .then(function (response) {
  //       let json_object_str = JSON.stringify(response.data);
  //       let json_object = JSON.parse(json_object_str);
  //       console.log(json_object);
  //       return(json_object);
  //     }).then(res =>{
  //           setinformation(res);
  //           setpayload(true);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //
  //   }
  //
  // },[logingInformation_LocalStore,submitFlag]);
  useEffect(() => {
    const results =
      waybilsearch &&
      waybilsearch.filter(
        (p) =>
          p.product_waybill
            .toString()
            .toLowerCase()
            .includes(searchTerm.toString().toLowerCase()) ||
          p.order_id
            .toString()
            .toLowerCase()
            .includes(searchTerm.toString().toLowerCase())
      );
    setsearchreasult(results);
    //if(results.length >0){
    setall_data(results);

    // }
    console.log("Search result", searchResults);
  }, [searchTerm]);
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

            <div className="container">
              {/*<div className="bordered">*/}
              {/*    /!* Invoice modal *!/*/}
              {/*    <Modal*/}
              {/*        isOpen={infoModalOpen}*/}
              {/*        style={customStyles}*/}
              {/*        onRequestClose={closeInvoiceModal}*/}

              {/*        contentLabel="Example Modal"*/}
              {/*    >*/}

              {/*        <button className="btn btn-outline-danger mb-2" onClick={closeInvoiceModal}>close</button>*/}
              {/*        <div>*/}
              {/*            <h4>Datewise Status</h4>*/}

              {/*            <table className="table table-bordered table-sm">*/}
              {/*                <thead>*/}
              {/*                <th>Date time</th>*/}
              {/*                <th>Processing status</th>*/}

              {/*                </thead>*/}
              {/*                <tbody>*/}
              {/*                {*/}
              {/*                    infoData.status_datetime && infoData.status_datetime.map(single_product => (*/}

              {/*                            <tr>*/}
              {/*                                <td>{single_product.date_time}</td>*/}
              {/*                                <td>{single_product.processing_status}</td>*/}

              {/*                            </tr>*/}
              {/*                        )*/}
              {/*                    )*/}
              {/*                }*/}
              {/*                </tbody>*/}
              {/*            </table>*/}

              {/*            <h4>Details Info</h4>*/}

              {/*            <h6><span*/}
              {/*                className="badge bg-secondary">Product Name</span>: {infoData.product_infor && infoData.product_infor.producT_NAME}*/}
              {/*            </h6>*/}
              {/*            <h6><span*/}
              {/*                className="badge bg-secondary">Product Waybill Number</span>: {infoData.product_infor && infoData.product_infor.producT_WAYBILL_NUMBER}*/}
              {/*            </h6>*/}
              {/*            <h6><span*/}
              {/*                className="badge bg-secondary">Address</span>: {infoData.product_infor && infoData.product_infor.address}*/}
              {/*            </h6>*/}
              {/*            <h6><span*/}
              {/*                className="badge bg-secondary">Product Return Address</span>: {infoData.product_infor && infoData.product_infor.producT_RETURN_ADDRESS}*/}
              {/*            </h6>*/}
              {/*            <h6><span*/}
              {/*                className="badge bg-secondary">Product Total</span>: {infoData.product_infor && infoData.product_infor.producT_TOTAL}*/}
              {/*            </h6>*/}
              {/*            <h6><span*/}
              {/*                className="badge bg-secondary">Product Type</span>: {infoData.product_infor && infoData.product_infor.producT_TYPE}*/}
              {/*            </h6>*/}
              {/*            <h6><span*/}
              {/*                className="badge bg-secondary">Product Urgent STATUS</span>: {infoData.product_infor && infoData.product_infor.producT_URGENT_STATUS}*/}
              {/*            </h6>*/}
              {/*            <h6><span*/}
              {/*                className="badge bg-secondary">Product VALUE AMOUNT</span>: {infoData.product_infor && infoData.product_infor.producT_VALUE_AMOUNT}*/}
              {/*            </h6>*/}

              {/*            <h6><span*/}
              {/*                className="badge bg-secondary">Product WEIGHT</span>: {infoData.product_infor && infoData.product_infor.producT_WEIGHT}*/}
              {/*            </h6>*/}

              {/*            <h6><span*/}
              {/*                className="badge bg-secondary">Receiver NAME</span>: {infoData.product_infor && infoData.product_infor.receiveR_NAME}*/}
              {/*            </h6>*/}
              {/*            <h6><span*/}
              {/*                className="badge bg-secondary">Receiver PHONE NUMBER</span>: {infoData.product_infor && infoData.product_infor.receiveR_PHONE_NUMBER}*/}
              {/*            </h6>*/}
              {/*            <h6><span*/}
              {/*                className="badge bg-secondary">Reference NO</span>: {infoData.product_infor && infoData.product_infor.referencE_NO}*/}
              {/*            </h6>*/}
              {/*            <h6><span*/}
              {/*                className="badge bg-secondary">Return PIN</span>: {infoData.product_infor && infoData.product_infor.returN_PIN}*/}
              {/*            </h6>*/}

              {/*            <h6><span*/}
              {/*                className="badge bg-secondary">Area CODE</span>: {infoData.product_infor && infoData.product_infor.areA_CODE}*/}
              {/*            </h6>*/}
              {/*            <h6><span*/}
              {/*                className="badge bg-secondary">Bag ID NUMBER</span>: {infoData.product_infor && infoData.product_infor.baG_ID_NUMBER}*/}
              {/*            </h6>*/}
              {/*            <h6><span*/}
              {/*                className="badge bg-secondary">Consignee NAME</span>: {infoData.product_infor && infoData.product_infor.consigneE_NAME}*/}
              {/*            </h6>*/}
              {/*            <h6><span*/}
              {/*                className="badge bg-secondary">Contact NUMBER</span>: {infoData.product_infor && infoData.product_infor.contacT_NUMBER}*/}
              {/*            </h6>*/}
              {/*            <h6><span*/}
              {/*                className="badge bg-secondary">District INCHARGE ID</span>: {infoData.product_infor && infoData.product_infor.districT_INCHARGE_ID}*/}
              {/*            </h6>*/}
              {/*            <h6><span*/}
              {/*                className="badge bg-secondary">Emergency NUMBER</span>: {infoData.product_infor && infoData.product_infor.emergencY_NUMBER}*/}
              {/*            </h6>*/}
              {/*            <h6><span*/}
              {/*                className="badge bg-secondary">EOD STATUS</span>: {infoData.product_infor && infoData.product_infor.eoD_STATUS}*/}
              {/*            </h6>*/}
              {/*            <h6><span*/}
              {/*                className="badge bg-secondary">EOD STATUS DATETIME</span>: {infoData.product_infor && infoData.product_infor.eoD_STATUS_DATETIME}*/}
              {/*            </h6>*/}
              {/*            <h6><span*/}
              {/*                className="badge bg-secondary">EOD STATUS FINISH DATETIME</span>: {infoData.product_infor && infoData.product_infor.eoD_STATUS_FINISH_DATETIME}*/}
              {/*            </h6>*/}
              {/*            <h6><span*/}
              {/*                className="badge bg-secondary">Pincode</span>: {infoData.product_infor && infoData.product_infor.pincode}*/}
              {/*            </h6>*/}
              {/*            <h6><span*/}
              {/*                className="badge bg-secondary">Product CUSTOMER ID</span>: {infoData.product_infor && infoData.product_infor.producT_CUSTOMER_ID}*/}
              {/*            </h6>*/}
              {/*            <h6><span*/}
              {/*                className="badge bg-secondary">Product DELEVERED BY</span>: {infoData.product_infor && infoData.product_infor.producT_DELEVERED_BY}*/}
              {/*            </h6>*/}
              {/*            <h6><span*/}
              {/*                className="badge bg-secondary">Product DELEVERY TIME</span>: {infoData.product_infor && infoData.product_infor.producT_DELEVERY_TIME}*/}
              {/*            </h6>*/}
              {/*            <h6><span*/}
              {/*                className="badge bg-secondary">Product DESCRIPTION</span>: {infoData.product_infor && infoData.product_infor.producT_DESCRIPTION}*/}
              {/*            </h6>*/}

              {/*            <h6><span*/}
              {/*                className="badge bg-secondary">Product DETAILS</span>: {infoData.product_infor && infoData.product_infor.producT_DETAILS}*/}
              {/*            </h6>*/}
              {/*            <h6><span*/}
              {/*                className="badge bg-secondary">Product ENTRY TIME</span>: {infoData.product_infor && infoData.product_infor.producT_ENTRY_TIME}*/}
              {/*            </h6>*/}
              {/*            <h6><span*/}
              {/*                className="badge bg-secondary">Product ID</span>: {infoData.product_infor && infoData.product_infor.producT_ID}*/}
              {/*            </h6>*/}
              {/*            <h6><span*/}
              {/*                className="badge bg-secondary">Product LOCK STATUS</span>: {infoData.product_infor && infoData.product_infor.producT_LOCK_STATUS}*/}
              {/*            </h6>*/}

              {/*            <h6><span*/}
              {/*                className="badge bg-secondary">Product PAYMENT TYPE</span>: {infoData.product_infor && infoData.product_infor.producT_PAYMENT_TYPE}*/}
              {/*            </h6>*/}
              {/*            <h6><span*/}
              {/*                className="badge bg-secondary">Product PROCESSING STATUS</span>: {infoData.product_infor && infoData.product_infor.producT_PROCESSING_STATUS}*/}
              {/*            </h6>*/}
              {/*            <h6><span*/}
              {/*                className="badge bg-secondary">Product PRODESSING STATUS DATETIME</span>: {infoData.product_infor && infoData.product_infor.producT_PRODESSING_STATUS_DATETIME}*/}
              {/*            </h6>*/}

              {/*        </div>*/}
              {/*    </Modal>*/}
              {/*</div>*/}

              {/* modal end */}

              {/* <div className="row n">
                        <div className="col-12 mx-5">
                        <div className="border-dark border">
                        <form>
                            <div className="input-group">
                                    <input type="text" className="form-control mx-2" placeholder="type here......." value={searchTerm} onChange={handleChange}/>
                                    <div className="input-group-append">

                                    </div>
                            </div>
                        </form>
                        </div>
                        </div>
                   </div> */}
              <div className="container row-col-2">
                {/* search option */}

                <div className="border  mb-5" id="cr">
                  <form className="row d-flex justify-content-center">
                    {/*<div className=" col-sm-4 form-group mx-3 mt-2">*/}
                    {/*    <div className=" text-center text-black mx-1">*/}
                    {/*        DC Name:*/}
                    {/*    </div>*/}
                    {/*    /!*  onChange={handleFilter}*!/*/}
                    {/*    <input list="dcNames" className="form-control " id="dcname" onChange={(e) => {*/}
                    {/*        setdcname(e.target.value)*/}
                    {/*    }}/>*/}
                    {/*    <datalist id="dcNames">*/}
                    {/*        <option selected value="">None</option>*/}
                    {/*        {dc_name.map(single_dc_office_name => {*/}
                    {/*            // console.log("SINGLE DC NAME:", single_dc_office_name);*/}
                    {/*            return (*/}
                    {/*                <option value={single_dc_office_name.toString().toLowerCase()}></option>*/}
                    {/*            );*/}
                    {/*        })}*/}
                    {/*    </datalist>*/}

                    {/*</div>*/}
                    {/*<div className="col-sm-4 form-group mx-3 mt-2">*/}
                    {/*    <div className=" text-center text-black mx-1">*/}
                    {/*        Client Name:*/}
                    {/*    </div>*/}
                    {/*    /!* onChange={handleFilter} *!/*/}
                    {/*    <input list="clientNames" className="form-control" id="clientname" onChange={(e) => {*/}
                    {/*        setclient(e.target.value)*/}
                    {/*    }}/>*/}
                    {/*    <datalist id="clientNames">*/}
                    {/*        <option selected value="">None</option>*/}
                    {/*        {clientname.map(single_dc_office_name => {*/}
                    {/*            // console.log("SINGLE DC NAME:", single_dc_office_name);*/}
                    {/*            return (*/}
                    {/*                <option value={single_dc_office_name}></option>*/}
                    {/*            );*/}
                    {/*        })}*/}
                    {/*    </datalist>*/}

                    {/*</div>*/}
                    {/*  onChange={handleFilter} */}
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
                    {/*  onChange={handleFilter}*/}
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
                    <div className=" col-sm-4 form-group mx-3 mt-4">
                      <div className=" text-center text-black mx-1">
                        Payement Mode:
                      </div>
                      {/* onChange={handleFilter} */}
                      <select
                        className="form-select"
                        id="paymenttype"
                        onChange={(e) => {
                          setpaymenttype(e.target.value);
                        }}
                      >
                        <option selected value="">
                          None
                        </option>
                        <option value="COD">COD</option>
                        <option value="Prepaid">Prepaid</option>
                      </select>
                    </div>
                    <div className=" col-sm-4 form-group mx-3 mt-4">
                      <div className=" text-center text-black mx-1">
                        Status:
                      </div>
                      {/* onChange={handleFilter} */}
                      {/* <select className="form-select"  multiple="multiple" onChange={(e) => { setstatus(e.target.value) }}>
                                <option selected value="">None</option>
                                <option value="InSystem">InSystem</option>
                                <option value="Delevered">Delevered</option>
                                <option value="Returned">Returned</option>
                                <option value="Lost">Lost</option>

                            </select> */}

                      <Multiselect
                        isObject={false}
                        onRemove={(event) => {
                          console.log(event);
                          finalstatus.pop(event);
                        }}
                        onSelect={(event) => {
                          console.log(event);
                          setfinalstatus(event);
                          //finalstatus.push(event.selectedItem)
                        }}
                        options={status}
                        selectedValues={[]}
                        //showCheckbox
                      />
                    </div>

                    <div className="col-md-12 d-flex justify-content-center mt-4 mb-2">
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={search}
                      >
                        Search
                      </button>
                      {/* onClick={searchFilter} */}
                    </div>
                  </form>
                </div>

                <div className="row-2 mt-5 d-flex justify-content-center">
                  <div className="col-12 mx-5">
                    <div className="">
                      {/*  */}
                      <form className="row d-flex justify-content-center">
                        <div className="col-lg-6 col-md-6 col-sm-4 form-group mx-3 mt-2 p-4">
                          <div className="input-group  input-icons">
                            <i className="icon ">{searchIcon}</i>
                            <input
                              type="search"
                              name=""
                              id=""
                              placeholder="Search"
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
                              onChange={(e) => {
                                setSearchTerm(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </form>
                      {/*  */}
                      {/* <form>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control mx-2"
                            placeholder="Search......."
                            value={searchTerm}
                            onChange={(e) => {
                              setSearchTerm(e.target.value);
                            }}
                          />
                          <div className="input-group-append"></div>
                        </div>
                      </form> */}
                    </div>
                  </div>
                </div>

                {/* <div className="border border-dark bg-dark mb-5">
                    <h3 className="text-center text-white"></h3>

                        <div className="row justify-content-center mx-auto">

                                <form className="form-inline">
                                    <div className="d-flex justify-content-center mx-auto text-center">
                                        <div className="col-sm-4">
                                           Dc Name: <input list="data" className="form-control" id="bgscrl" placeholder="Dc Name "   />
                                            <datalist id="data">
                                                {

                                                    dc_name.map(single_dc_office_name => {
                                                         return (
                                                             <option>{single_dc_office_name}</option>
                                                         );
                                                     })
                                                }
                                            </datalist>
                                        </div>

                                        <div className="col-sm-4">
                                           Client Name: <input list="brow" className="form-control" id="bgscrl" placeholder="Client Name "   />
                                            <datalist id="brow">
                                                {

                                                    clientname.map(single_clientname => {
                                                         return (
                                                             <option>{single_clientname}</option>
                                                         );
                                                     })
                                                }
                                            </datalist>
                                        </div>



                                        {/* <div className="text-center text-white mx-1">
                                            Client Name: <input type="text" className="input-small "   />
                                        </div> */}

                {/* <div className=" text-center text-white mx-1">
                                            Start Date: <input type="date" className="input-small " value={startDateTime} onChange={(e) => { setstartDateTime(e.target.value) }} />
                                        </div>
                                        <div className="text-center text-white mx-1">
                                            End Date: <input type="date" className="input-small" value={endDataTime} onChange={(e) => { setendDataTime(e.target.value) }} />
                                        </div>


                                    </div>
                                    <div className="d-flex justify-content-center mx-auto text-center">
                                    <div className="col-sm-4 p-3">
                                           Payment Type: <input list="brow" className="form-control" id="bgscrl" placeholder="Payment Type"   />
                                            <datalist id="brow">
                                                {
                                                    <option>COD</option>

                                                    // DistrictNameinformation.message.all_dc_name.map(single_dc_office_name => {
                                                    //     return (
                                                    //         <option>{single_dc_office_name}</option>
                                                    //     );
                                                    // })
                                                }
                                            </datalist>

                                        </div>
                                        <div className="col-sm-4 p-3">
                                        Status: <input list="brow" className="form-control" id="bgscrl" placeholder="Status"   />
                                            <datalist id="brow">
                                                {
                                                    <option></option>
                                                    // DistrictNameinformation.message.all_dc_name.map(single_dc_office_name => {
                                                    //     return (
                                                    //         <option>{single_dc_office_name}</option>
                                                    //     );
                                                    // })
                                                }
                                            </datalist>
                                        </div>
                                        </div>

                                    <div className="mx-auto text-center">
                                        {/* <button type="submit" className="btn btn-info text-white mt-5" onClick={searchButtonFunction}>Confirm</button> */}
                {/* </div>
                                </form>

                        </div> */}

                {/* </div> */}

                {/* <div className="row-2 mt-5">
                    <div className="col-8 mx-5">
                        <div className="">
                            <form>
                                <div className="input-group">
                                    <input type="text" className="form-control mx-2" placeholder="Type here......." value={searchTerm} onChange={handleChange} />
                                    <div className="input-group-append">

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div> */}
                <div id="requesttable">
                  <div id="no-more-tables">
                    {/*<CSVLink data={searchreasult} className="btn btn-sm bg-info text-black border-info mb-2" >Download csv</CSVLink>*/}
                    {/*Table*/}

                    <ReactHTMLTableToExcel
                      className="btn btn-primary px-3 mb-2"
                      table="bd"
                      filename={`Report${getCurrentTime()}`}
                      sheet="Sheet"
                      buttonText="Export excel"
                    />
                    <table
                      className="col-md-12 table-bordered table-striped table-condensed cf css-serial bg-white"
                      style={{ fontSize: "13px" }}
                      id="bd"
                    >
                      {/*Table head*/}
                      <thead
                        className="text-center"
                        style={{ backgroundColor: "#f1f1f1" }}
                      >
                        <tr className="text-dark" style={{ border: "none" }}>
                          <th>SL</th>
                          <th scope="col">Waybill</th>
                          <th>Order ID</th>
                          <th scope="col">Customer Name</th>
                          <th scope="col">Consignee Name</th>
                          <th scope="col">Consignee NO.</th>
                          <th scope="col">Details</th>
                          <th scope="col">Address</th>
                          <th>Payment Type</th>
                          <th>COD</th>
                          <th scope="col">Dc</th>
                          <th>Status</th>
                          <th>Status Date</th>
                        </tr>
                      </thead>
                      {/*Table head*/}
                      {/*Table body*/}
                      <tbody className="text-center">
                        {searchreasult.map((single_message) => {
                          let clor;
                          if (
                            single_message.product_processing_status.includes(
                              "Product in Bag"
                            ) ||
                            single_message.product_processing_status.includes(
                              "Product in System"
                            )
                          ) {
                            clor = "bg-primary";
                          } else if (
                            single_message.product_processing_status.includes(
                              "Hold"
                            )
                          ) {
                            clor = "bg-warning";
                          } else if (
                            single_message.product_processing_status.includes(
                              "Return"
                            )
                          ) {
                            clor = "bg-info";
                          } else if (
                            single_message.product_processing_status.includes(
                              "Delivered"
                            )
                          ) {
                            clor = "bg-success";
                          } else if (
                            single_message.product_processing_status.includes(
                              "Lost"
                            )
                          ) {
                            clor = "bg-danger";
                          } else {
                            clor = "bg-info";
                          }

                          return (
                            <tr
                              key={single_message.product_waybill}
                              className=""
                            >
                              <td data-title="SL"></td>
                              {/*  onClick={(e) => openModal(e, single_message.product_waybill)}*/}
                              <td data-title="Waybill" scope="row">
                                {single_message.product_waybill}
                              </td>
                              <td data-title="Order ID">
                                {single_message.order_id}
                              </td>
                              <td data-title="Customer Name">
                                {single_message.client_name}
                              </td>
                              <td data-title="Consignee Name">
                                {single_message.consingee_name}
                              </td>
                              <td data-title="Consignee NO.">
                                {single_message.consignee_contact}
                              </td>
                              <td data-title="Details">
                                {single_message.product_des}
                              </td>
                              <td data-title="Address">
                                {single_message.consignee_address}
                              </td>
                              <td data-title="Payment Type">
                                {single_message.payment_type}
                              </td>
                              <td data-title="COD">
                                {single_message.cod_amount}
                              </td>
                              <td data-title="Dc">{single_message.dc_name}</td>
                              <td
                                data-title="Status"
                                className={`${clor} text-white`}
                              >
                                {single_message.product_processing_status}
                              </td>
                              <td data-title="Status Date">
                                {" "}
                                {single_message.product_processing_status_datetime.split(
                                  "T"
                                )[0] ||
                                  single_message.product_processing_status_datetime}
                              </td>
                            </tr>
                          );
                        })}
                        {/* {
                                    json_information.message.returned_product_list.map(single_message => {

                                        return (
                                            <tr key={single_message.waybill_number} className="bg-primary text-white">
                                                <td></td>
                                                <th scope="row">{single_message.waybill_number}<br></br>
                                                    {single_message.order_id}
                                                </th>
                                                <td>{single_message.customer_name}</td>
                                                <td>{single_message.consignee_name}</td>
                                                <td>{single_message.product_detail}

                                                </td>
                                                <td>{single_message.product_value}<br></br>
                                                    {single_message.product_weight}</td>
                                                <td>{single_message.dc_office_name}<br></br>
                                                    {single_message.pincode}
                                                </td>
                                                <td>{single_message.product_processing_stage}<br></br>
                                                    {single_message.product_processing_stage_datetime}
                                                </td>
                                                <td>
                                                    {single_message.reason}

                                                </td>

                                            </tr>
                                        )
                                    })
                                }
                                {
                                    json_information.message.holded_product_list.map(single_message => {

                                        return (
                                            <tr key={single_message.waybill_number} className="bg-warning text-white">
                                                <td></td>
                                                <th scope="row">{single_message.waybill_number}<br></br>
                                                    {single_message.order_id}
                                                </th>
                                                <td>{single_message.customer_name}</td>
                                                <td>{single_message.consignee_name}</td>
                                                <td>{single_message.product_detail}

                                                </td>
                                                <td>{single_message.product_value}<br></br>
                                                    {single_message.product_weight}</td>
                                                <td>{single_message.dc_office_name}<br></br>
                                                    {single_message.pincode}
                                                </td>
                                                <td>{single_message.product_processing_stage}<br></br>
                                                    {single_message.product_processing_stage_datetime}
                                                </td>
                                                <td>
                                                    {single_message.reason}

                                                </td>

                                            </tr>
                                        )
                                    })
                                }
                                {
                                    json_information.message.lost_product_list.map(single_message => {

                                        return (
                                            <tr key={single_message.waybill_number} className="bg-danger text-black">
                                                <td></td>
                                                <th scope="row">{single_message.waybill_number}<br></br>
                                                    {single_message.order_id}
                                                </th>
                                                <td>{single_message.customer_name}</td>
                                                <td>{single_message.consignee_name}</td>
                                                <td>{single_message.product_detail}

                                                </td>
                                                <td>{single_message.product_value}<br></br>
                                                    {single_message.product_weight}</td>
                                                <td>{single_message.dc_office_name}<br></br>
                                                    {single_message.pincode}
                                                </td>
                                                <td>{single_message.product_processing_stage}<br></br>
                                                    {single_message.product_processing_stage_datetime}
                                                </td>
                                                <td>
                                                    {single_message.reason}

                                                </td>

                                            </tr>
                                        )
                                    })
                                } */}
                        {/* {
                                    searchResults.map(single_message => {

                                        return (
                                            <tr key={single_message.waybill_number} className="bg-info">
                                                <td></td>
                                                <th scope="row">{single_message.waybill_number}<br></br>
                                                    {single_message.order_id}
                                                </th>
                                                <td>{single_message.customer_name}</td>
                                                <td>{single_message.consignee_name}</td>
                                                <td>{single_message.product_detail}

                                                </td>
                                                <td>{single_message.product_value}<br></br>
                                                    {single_message.product_weight}</td>
                                                <td>{single_message.dc_office_name}<br></br>
                                                    {single_message.pincode}
                                                </td>
                                                <td>{single_message.product_processing_stage}<br></br>
                                                    {single_message.product_processing_stage_datetime}
                                                </td>
                                                <td>
                                                    {single_message.reason}

                                                </td>

                                            </tr>
                                        )
                                    })
                                } */}
                      </tbody>
                      {/*Table body*/}
                    </table>
                    {/*Table*/}
                  </div>
                </div>
              </div>
              {/*<div className="col-11 report">*/}

              {/*      <div className="border border-dark bg-dark mb-5">*/}
              {/*            <h3 className="text-center text-white">Report Field</h3>*/}
              {/*            <div className="container p-3">*/}
              {/*              <div className="row justify-content-center mx-auto">*/}
              {/*                <div className="col-10 mx-auto">*/}
              {/*                  <form className="form-inline">*/}
              {/*                      <div className="d-flex justify-content-center mx-auto text-center">*/}
              {/*                            <div className="mx-auto text-center text-white">*/}
              {/*                                Start Date: <input type="date" className="input-small " value={startDateTime} onChange={(e)=>{ setstartDateTime(e.target.value) }}/>*/}
              {/*                            </div>*/}
              {/*                            <div className="mx-auto text-center text-white">*/}
              {/*                                End Date: <input type="date" className="input-small" value={endDataTime} onChange={(e)=>{ setendDataTime(e.target.value) }}/>*/}
              {/*                            </div>*/}
              {/*                      </div>*/}
              {/*                      <div className="mx-auto text-center">*/}
              {/*                          <button type="submit" className="btn btn-info text-white" onClick={searchButtonFunction}>Confirm</button>*/}
              {/*                      </div>*/}
              {/*                  </form>  */}
              {/*                </div>*/}
              {/*              </div>*/}
              {/*            </div>*/}
              {/*        </div>*/}

              {/*        {*/}
              {/*        payload ? <Creportdownload response={information}/> :*/}

              {/*            <div className="sk-cube-grid">*/}
              {/*                <div className="sk-cube sk-cube1"></div>*/}
              {/*                <div className="sk-cube sk-cube2"></div>*/}
              {/*                <div className="sk-cube sk-cube3"></div>*/}
              {/*                <div className="sk-cube sk-cube4"></div>*/}
              {/*                <div className="sk-cube sk-cube5"></div>*/}
              {/*                <div className="sk-cube sk-cube6"></div>*/}
              {/*                <div className="sk-cube sk-cube7"></div>*/}
              {/*                <div className="sk-cube sk-cube8"></div>*/}
              {/*                <div className="sk-cube sk-cube9"></div>*/}
              {/*            </div>*/}
              {/*           // <div className="mx-5 d-flex justify-content-center mt-5">*/}
              {/*           //      <h4>Please Filter Your Date</h4>*/}
              {/*           // </div>*/}
              {/*        }*/}
              {/*  </div>*/}
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
