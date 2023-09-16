import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
import Modal from "react-modal";
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
export default function Lostmarkops() {
  toast.configure();
  const [employId, setemployId] = useState("");

  const [information, setinformation] = useState("");
  const [payload, setpayload] = useState(false);
  const [employeezone, setemployeezone] = useState("");
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  const [submitflag, setsubmitflag] = useState(false);
  const [dc_name, setdc_name] = useState([]);
  const [dcname, setdcname] = useState("");
  const [productlist, setproductlist] = useState([]);
  const [selectedtype, setselectedtype] = useState("");
  const [empid, setempid] = useState("");
  const [lostproductlist, setlostproductlist] = useState([]);
  const [lostwaybill, setlostwaybill] = useState("");
  const [selectedDc, setSelectedDc] = useState("");
  const [feDcList, setFeDcList] = useState("");
  const [dcmanelist, setdcmanelist] = useState([]);

  const [infoModalOpen, setinfoModalOpen] = useState(false);

  const [infoModalOpen1, setinfoModalOpen1] = useState(false);

  const [modalIsOpen, setIsOpen] = useState(false);

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
    var axios = require("axios");
    // var data = JSON.stringify({
    //     employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
    // });

    // console.log(" Table APi: ",data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
          ? "https://e-deshdelivery.com/universalapi/allapi/allDcList" +
          "?company_name=" +
          company_name
          : "/universalapi/allapi/allDcList" + "?company_name=" + company_name,
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      // data: data,
    };

    axios(config)
        .then(function (response) {
          let json_object_str = JSON.stringify(response.data);
          let json_object = JSON.parse(json_object_str);
          console.log("data is here", json_object);
          return json_object;
        })
        .then((res) => {
          //console.log("this is all dc name list", res);
          // setlostproductlist(res.message);
          setdcmanelist(res);
        })
        .catch(function (error) {
          console.log(error);
        });
  }, []);

  useEffect(() => {
    if (!selectedDc) return;
    var axios = require("axios");
    var data = JSON.stringify({
      DcName: selectedDc,
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
          setFeDcList(res.message);
          // setlostproductlist(res.message);
        })
        .catch(function (error) {
          console.log(error);
        });
  }, [selectedDc]);

  console.log("this is all feunderdc", feDcList);

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

  //lost product list information api

  useEffect(() => {
    var axios = require("axios");
    var data = JSON.stringify({
      employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
    });

    // console.log(" Table APi: ",data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
          ? "https://e-deshdelivery.com/universalapi/allapi/lostProductInformation" +
          "?company_name=" +
          company_name
          : "/universalapi/allapi/lostProductInformation" +
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
          console.log("this is lostproductlist", res);
          setlostproductlist(res.message);
        })
        .catch(function (error) {
          console.log(error);
        });
  }, [logingInformation_LocalStore]);

  useEffect(() => {
    if (!dcname) return;
    var axios = require("axios");
    let emp_desg = null;
    if (selectedtype == "dcDetailsJson") {
      emp_desg = "DISTRICT INCHARGE";
    } else if (selectedtype == "feDetailsjson") {
      emp_desg = "FIELD EXECUTIVE";
    }
    var data = JSON.stringify({
      employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
      waybill_number: lostwaybill,
      lost_responsible_person: parseInt(dcname),
      lost_responsible_person_degignation: emp_desg,
      lost_datetime: getCurrentTime(),
    });

    console.log(" Table APi: ", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
          ? "https://e-deshdelivery.com/universalapi/allapi/lostResponsible_update" +
          "?company_name=" +
          company_name
          : "/universalapi/allapi/lostResponsible_update" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: data,
    };

    console.log("Lost config", config);
    axios(config)
        .then(function (response) {
          let json_object_str = JSON.stringify(response.data);
          let json_object = JSON.parse(json_object_str);
          console.log("data is here", json_object);
          return json_object;
        })
        .then((res) => {
          console.log("this is lostproductlist", res);
          // setlostproductlist(res.message);
          toast.success(res.message);
          closeInvoiceModal();
        })
        .catch(function (error) {
          console.log(error);
        });
  }, [submitflag]);
  const choosefedc = (e) => {
    console.log(dc_name);
    setselectedtype(e.target.value);
  };

  const search = () => {
    setsubmitflag(!submitflag);
  };

  function closeInvoiceModal() {
    setinfoModalOpen(false);
  }

  function closeInvoiceModal1() {
    setinfoModalOpen1(false);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles1 = {
    overlay: {
      position: "fixed",
      height: "100vh",
      width: "100vw",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(255, 255, 255, 0.75)",
    },
    content: {
      // top: '50%',
      // left: '60%',
      // right: '60',
      // bottom: 'auto',
      // marginRight: '-50%',
      // transform: 'translate(-50%, -50%)',
      color: "orange",
      position: "absolute",

      top: "80px",
      left: "10%",
      right: "10%",
      bottom: "40px",
      border: "1px solid #ccc",
      background: "#fff",
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "4px",
      outline: "none",
      padding: "20px",
    },
  };

  const customStyles = {
    overlay: {
      position: "fixed",
      height: "100vh",
      width: "100vw",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(255, 255, 255, 0.75)",
    },
    content: {
      // top: '50%',
      // left: '60%',
      // right: '60',
      // bottom: 'auto',
      // marginRight: '-50%',
      // transform: 'translate(-50%, -50%)',
      color: "orange",
      position: "absolute",

      top: "80px",
      left: "10%",
      right: "10%",
      bottom: "40px",
      border: "1px solid #ccc",
      background: "#fff",
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "4px",
      outline: "none",
      padding: "20px",
    },
  };

  function openModal(e, way, dc) {
    console.log("waybill", way);
    setSelectedDc(dc);
    setlostwaybill(way);
    //setSubmitFlag(!SubmitFlag);
    setinfoModalOpen(true);
  }

  const [confirmlist, setconfirmlist] = useState([]);

  //this effect use to calculate confirmed lost product list

  useEffect(() => {
    //if(!lostproductlist) return;
    console.log("mapping inform", lostproductlist);
    let temp = [];
    let temp1 = [];
    lostproductlist &&
    lostproductlist.map((confirmlist) => {
      if (confirmlist.lost_responsible_person != null) {
        console.log("this is lost confirmlist", confirmlist);
        temp.push(confirmlist);
        console.log("confirmed ", temp);
      }
    });

    console.log("confirmed ", temp);
    setconfirmlist(temp);
  }, [lostproductlist]);
  console.log("this is confirmlostlist", confirmlist);
  return (
      <>
        <div className="bodydiv">
          <div className="row ">
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
          <div className="mt-5 pt-5">
            <div className="col-12 " id="">
              <div className="container row-col-2">
                {/* search option */}

                {/*modal start*/}

                <Modal
                    isOpen={infoModalOpen}
                    style={customStyles}
                    onRequestClose={closeInvoiceModal}
                    closeTimeoutMS={200}
                    contentLabel="Example Modal"
                >
                  <button
                      className="btn btn-outline-danger mb-2"
                      onClick={closeInvoiceModal}
                  >
                    close
                  </button>

                  <div className="d-flex">
                    <div className="order-track shadow p-3 mb-5 bg-white rounded m-auto modal-width">
                      <div className="  mb-5">
                        <form className="">
                          <div className=" col-12 form-group  mt-2">
                            <div className=" text-center text-black mx-1">
                              {selectedDc}
                            </div>
                            <div className=" text-center text-black mx-1">
                              Choose
                            </div>
                            {/*  onChange={handleFilter}*/}
                            <select
                                className="form-control "
                                onChange={(e) => {
                                  choosefedc(e);
                                }}
                                value={selectedtype}
                            >
                              <option selected value="">
                                None
                              </option>
                              <option value="dcDetailsJson">DC</option>
                              <option value="feDetailsjson">FE</option>
                            </select>
                          </div>
                          <div className=" col-12 form-group  mt-2">
                            <div className=" text-center text-black mx-1">
                              Employee Name:
                            </div>
                            {/*  onChange={handleFilter}*/}
                            <input
                                list="dcNames"
                                className="form-control "
                                onChange={(e) => {
                                  setdcname(e.target.value);
                                }}
                            />
                            <datalist id="dcNames">
                              <option selected value="">
                                None
                              </option>
                              {selectedtype &&
                                  feDcList &&
                                  feDcList[selectedtype].map(
                                      (single_dc_office_name) => {
                                        // console.log("SINGLE DC NAME:", single_dc_office_name);
                                        return (
                                            <option
                                                value={
                                                  selectedtype === "dcDetailsJson"
                                                      ? single_dc_office_name.dcPersonId
                                                      : single_dc_office_name.feId
                                                }
                                            >
                                              {selectedtype === "dcDetailsJson"
                                                  ? single_dc_office_name.dcPersonName
                                                  : single_dc_office_name.feName}
                                              {/* {single_dc_office_name.employee_name+"  "+single_dc_office_name.dc_name} */}
                                            </option>
                                        );
                                      }
                                  )}
                            </datalist>
                          </div>

                          <div className="col-md-12 d-flex justify-content-center mt-4 mb-2">
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                disabled={selectedtype == "" ? true : false}
                                onClick={search}
                            >
                              Submit
                            </button>
                            {/* onClick={searchFilter} */}
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </Modal>

                {/*modal end*/}

                {/*confirmed lost list start*/}

                <div className="bordered">
                  {/* Invoice modal */}
                  <Modal
                      isOpen={infoModalOpen1}
                      style={customStyles1}
                      onRequestClose={closeInvoiceModal1}
                      closeTimeoutMS={200}
                      contentLabel="Example Modal"
                  >
                    <button
                        className="btn btn-outline-danger mb-2"
                        onClick={closeInvoiceModal1}
                    >
                      close
                    </button>
                    <div className="container">
                      <div>
                        <div id="no-more-tables">
                          <div>
                            <ReactHTMLTableToExcel
                                className="js-download-link button bg-info border border-info px-4 btn-sm mb-2 mx-2 text-white rounded-3"
                                table="datatable1"
                                filename="ReportExcel"
                                sheet="Sheet"
                                buttonText="Export excel"
                            />

                            <table
                                className="table bg-white"
                                style={{ fontSize: "13px", marginLeft: "1px" }}
                                id="datatable1"
                            >
                              <thead
                                  className="text-center shadow  "
                                  style={{
                                    backgroundColor: "#b4bec2",
                                  }}
                              >
                              <tr
                                  className="text-dark"
                                  style={{ border: "none" }}
                              >
                                <th scope="col">Waybill</th>
                                <th scope="col">Order Id</th>
                                <th>Dc Name</th>
                                <th>Consignee Name</th>
                                <th>Contact number</th>
                                <th>Actual Value</th>
                                <th>COD</th>
                                <th>Responsible Person</th>
                                <th>Product Detail</th>
                                <th>Lost Date</th>
                                <th>Lost MarkDate</th>
                              </tr>
                              </thead>

                              <tbody className="text-center border border-secondary">
                              {confirmlist &&
                                  confirmlist.map((single_message) => {
                                    let lostr =
                                        single_message.lost_responsible_person;
                                    console.log("lost rep", lostr);

                                    let disableflag = true;
                                    if (lostr === null) {
                                      disableflag = false;
                                    } else {
                                      disableflag = true;
                                    }

                                    console.log("disabled flag", disableflag);

                                    return (
                                        <tr key={single_message.waybill}>
                                          {/* className="btn btn-outline-primary text-white"*/}
                                          <td scope="row">
                                            {single_message.waybill}
                                          </td>
                                          <td>{single_message.order_id}</td>
                                          <td>{single_message.dc_name}</td>
                                          <td>{single_message.consignee_name}</td>
                                          <td>{single_message.contact_number}</td>
                                          <td>{single_message.actual_value}</td>
                                          <td>{single_message.cod_amount}</td>
                                          <td>
                                            {single_message.lost_responsible_person}
                                          </td>
                                          <td>{single_message.product_detail}</td>
                                          <td>
                                            {single_message.lost_date.split("T")[0]}
                                          </td>
                                          <td>
                                            {single_message.lost_mark_datetime &&
                                                single_message.lost_mark_datetime.split(
                                                    "T"
                                                )[0]}
                                          </td>
                                        </tr>
                                    );
                                  })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Modal>
                </div>

                {/*confirm lostlist end*/}

                <div id="requesttable">
                  <h4>Lost Product list</h4>
                  <div id="no-more-tables">
                    <ReactHTMLTableToExcel
                        className="js-download-link button bg-info border border-info px-4 btn-sm mb-2 mx-2 text-white rounded-3"
                        table="datatable"
                        filename="ReportExcel"
                        sheet="Sheet"
                        buttonText="Export excel"
                    />

                    <button
                        className="btn btn-sm btn-success ms-2 mb-2 px-3 rounded-3"
                        onClick={(e) => setinfoModalOpen1(true)}
                    >
                      Confirmed List
                    </button>

                    <table
                        className="table bg-white"
                        style={{ fontSize: "13px", marginLeft: "1px" }}
                        id="datatable"
                    >
                      <thead
                          className="text-center shadow sticky-top "
                          style={{
                            backgroundColor: "#b4bec2",
                            top: "60px",
                            zIndex: "0",
                          }}
                      >
                      <tr className="text-dark" style={{ border: "none" }}>
                        <th scope="col">Waybill</th>
                        <th scope="col">Order Id</th>
                        <th>Dc Name</th>
                        <th>Consignee Name</th>
                        <th>Contact number</th>
                        <th>Actual Value</th>
                        <th>COD</th>
                        <th>Responsible Person</th>
                        <th>Product Detail</th>
                        <th>Lost Date</th>
                      </tr>
                      </thead>

                      <tbody className="text-center border border-secondary">
                      {lostproductlist &&
                          lostproductlist.map((single_message) => {
                            let lostr = single_message.lost_responsible_person;
                            console.log("lost rep", lostr);

                            let disableflag = true;
                            if (lostr === null) {
                              disableflag = false;
                            } else {
                              disableflag = true;
                            }

                            console.log("disabled flag", disableflag);
                            if (lostr === null) {
                              return (
                                  <tr key={single_message.waybill}>
                                    {/* className="btn btn-outline-primary text-white"*/}
                                    <td scope="row">
                                      <button
                                          className="btn btn-outline-primary"
                                          disabled={disableflag}
                                          onClick={(e) =>
                                              openModal(
                                                  e,
                                                  single_message.waybill,
                                                  single_message.dc_name
                                              )
                                          }
                                      >
                                        {single_message.waybill}
                                      </button>
                                    </td>
                                    <td>{single_message.order_id}</td>
                                    <td>{single_message.dc_name}</td>
                                    <td>{single_message.consignee_name}</td>
                                    <td>{single_message.contact_number}</td>
                                    <td>{single_message.actual_value}</td>
                                    <td>{single_message.cod_amount}</td>
                                    <td>
                                      {single_message.lost_responsible_person}
                                    </td>
                                    <td>{single_message.product_detail}</td>
                                    <td>
                                      {single_message.lost_date.split("T")[0]}
                                    </td>
                                  </tr>
                              );
                            }
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
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
