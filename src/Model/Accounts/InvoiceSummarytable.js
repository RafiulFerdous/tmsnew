import React, { useState, useEffect, useContext } from "react";
import reactDom from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { SearchContext } from "../../Context/searchContext";
import { SearchButtonContext } from "../../Context/buttonContext";
import BarCode, { useBarcode } from "react-barcode";
import { jsPDF } from "jspdf";
import { CSVLink, CSVDownload } from "react-csv";
import { toast } from "react-toastify";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

//import { Linksidebar, CustomerCareLinksidebar, Salessidebar, Operationsidebar, Degital_Ocean_flag, company_name, acsidebar } from '../../Common/Linksidebar';
//import { LoginContext } from '../../Context/loginContext';
//for modal popup
import Modal from "react-modal";
//import './sc.css';

import html2canvas from "html2canvas";

import axios from "axios";
import {
  BrowserRouter,
  Switch,
  Route,
  useHistory,
  useLocation,
  Link,
} from "react-router-dom";
import { LoginContext } from "../../Context/loginContext";
//import { SearchContext } from '../../Context/searchContext';
//import { SearchButtonContext } from '../../Context/buttonContext';
import {
  Linksidebar,
  CustomerCareLinksidebar,
  Salessidebar,
  Operationsidebar,
  Degital_Ocean_flag,
  company_name,
  acsidebar,
} from "../../Common/Linksidebar";

let employId, setemployId;

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

const InvoiceSummarytable = (props) => {
  toast.configure();

  const [employId, setemployId] = useState("");
  const [searchTerm, setsearchTerm] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const [information, setinformation] = useState({});
  const [payload, setpayload] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen1, setIsOpen1] = useState(false);
  const [downloadmodal, setdownloadmodal] = useState(false);
  const [downloadmodal1, setdownloadmodal1] = useState(false);
  const [downloadflag, setdownloadflag] = useState(true);
  const [invoice_number, setinvoice_number] = useState("");

  const [randomnumber, setrandomnumber] = useState("");
  const [random, setrandom] = useState("");
  const [infoModalOpen, setinfoModalOpen] = useState(false);

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
        employee_degignation_list.DistrictIncharge
      ) {
        setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam
      }
      setlogingInformation_LocalStore(context_flag_obj);
    }
  }, []);
  const [allClient, setAllClient] = useState([]);

  const [allinvoice, setallinvoice] = useState([]);

  let json_information = props.response;

  useEffect(() => {
    setallinvoice(json_information.message);
  }, []);

  console.log("allInvoice", allinvoice);
  const [invoiceId, setInvoiceId] = useState("");
  const [displayInvoice, setDisplayInvoice] = useState("");

  useEffect(() => {
    var axios = require("axios");

    var data = JSON.stringify({
      employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,

      invoice_number: invoiceId,
    });
    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/accountPanelSinglePaymentInvoiceDisplay" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/accountPanelSinglePaymentInvoiceDisplay" +
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
        console.log("response is : ", json_object);
        return json_object;
      })
      .then((res) => {
        console.log("invoice display ", res);
        if (res.message.invoice_number != "") {
          toast.success("Download Complete", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          });
        }
        setDisplayInvoice(res);
        setdownloadflag(false);
        //setdownloadmodal1(true);
        //setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [invoiceId]);

  const showinvoice = (e, innum) => {
    var axios = require("axios");

    var data = JSON.stringify({
      employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,

      invoice_number: innum,
    });
    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/accountPanelSinglePaymentInvoiceDisplay" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/accountPanelSinglePaymentInvoiceDisplay" +
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
        console.log("response is : ", json_object);
        return json_object;
      })
      .then((res) => {
        console.log("invoice display ", res);
        if (res.message.invoice_number != "") {
          toast.success("To view invoice details scroll down", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          });
        }
        setDisplayInvoice(res);
        setdownloadflag(false);
        setdownloadmodal1(true);
        //setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function closeModal() {
    setIsOpen(false);
    setdownloadmodal(false);
  }

  function closeModal1() {
    setIsOpen1(false);
    setdownloadmodal1(false);
  }
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
      top: "50%",
      left: "50%",
      right: "60",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  function closeInvoiceModal() {
    setinfoModalOpen(false);
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
      height: "80%",
      width: "80%",
      top: "20%",
      left: "10%",
      right: "10%",

      border: "1px solid #ccc",
      background: "#fff",
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "4px",
      outline: "none",
      padding: "20px",
    },
  };
  const [submitFlag, setSubmitFlag] = useState(false);
  const submitTransId = (e) => {
    setSubmitFlag(!submitFlag);
    closeModal();
  };
  const [transId, setTransId] = useState("");
  const [confirmInvoiceId, setconfirmInvoiceId] = useState("");
  const confirmClick = (e) => {
    setIsOpen(true);
    setconfirmInvoiceId(e.target.value);
  };
  //confirming transaction api
  useEffect(() => {
    var axios = require("axios");

    var data = JSON.stringify({
      employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,

      invoice_number: confirmInvoiceId,
      transection_number: transId,
      date_time: getCurrentTime(),
    });
    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/accountPanelPaymentInvoiceConfirm" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/accountPanelPaymentInvoiceConfirm" +
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
        console.log("response is : ", json_object);
        return json_object;
      })
      .then((res) => {
        console.log("invoice confirm ", res);
        if (res.message.successful_invoice_list.length >= 1) {
          toast.success("Transaction Confirmed!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          });
        }
        //setDisplayInvoice(res);
        //setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [submitFlag, logingInformation_LocalStore]);
  const downloadinvoice = (invoiceid) => {
    setInvoiceId(invoiceid);
    setdownloadmodal(true);
  };
  useEffect(() => {
    const users1 = json_information.message.all_invoice_information.filter(
      (p) =>
        p.invoicE_NUMBER
          .toString()
          .toLowerCase()
          .includes(searchTerm.toString().toLowerCase())
    );

    setSearchResults(users1);
  }, [searchTerm]);

  const Rollback = (e, invoice_number) => {
    setinvoice_number(invoice_number);
    setinfoModalOpen(true);

    let min = 15267;
    let max = 98765;
    let number = Math.floor(Math.random() * (max - min + 1) + min);
    setrandomnumber(number);
  };

  const submit = () => {
    if (random != randomnumber) {
      toast.warning("Please input the verification Number", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });

      return;
    }
    console.log("api hit start");

    var axios = require("axios");
    var data = JSON.stringify({
      employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
      invoice_number: invoice_number,
    });
    console.log("this is data : ", data);
    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/accountPanelDeletenotPaidInvoice" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/accountPanelDeletenotPaidInvoice" +
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

        toast.info(res.data.status, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });
        closeInvoiceModal();
        //setinformation(res.data.message.all_invoice_info)

        //setinfoModalOpen(true);

        // setpayload(true);
      });
    //closeInvoiceModal()
    console.log("api hit end");
  };

  return (
    <>
      {/*delete modal start*/}

      <div className="bordered">
        {/* Invoice modal */}
        <Modal
          isOpen={infoModalOpen}
          style={customStyles1}
          onRequestClose={closeInvoiceModal}
          closeTimeoutMS={200}
          contentLabel="Example Modal"
          closeTimeoutMS={500}
        >
          <button
            className="btn btn-outline-danger mb-2"
            onClick={closeInvoiceModal}
          >
            close
          </button>
          <div className="d-flex justify-content-center">
            <label>Please Input Bellow Number: </label>
            <input
              list="felist"
              className="form-control w-50"
              onChange={(e) => setrandom(e.target.value)}
            />
            <br></br>

            {/*onChange={e => setselectedfe(e.target.value)}*/}
            {/*<datalist id="felist">*/}
            {/*    {*/}
            {/*        felist.map((single_fe) => {*/}
            {/*            if(single_fe.active_or_inactive==="Active")*/}
            {/*                return(*/}
            {/*                    <option value={single_fe.field_operative_id}>{single_fe.field_operative_name}</option>*/}
            {/*                )})*/}
            {/*    }*/}

            {/*</datalist>*/}
          </div>
          <div className="d-flex justify-content-center">
            <h4>{randomnumber}</h4>
          </div>

          <div className="d-flex mt-4 justify-content-center">
            <button className="btn btn-outline-success mb-2" onClick={submit}>
              Submit
            </button>
          </div>
        </Modal>
      </div>

      {/*delete modal end*/}

      <div className="row container">
        <div>
          {/* transaction modal */}
          <Modal
            isOpen={modalIsOpen}
            style={customStyles}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            closeTimeoutMS={500}
          >
            <button
              className="btn btn-outline-danger mb-2"
              onClick={closeModal}
            >
              close
            </button>
            <div>
              <label>Enter Transaction Id:</label>
              <input
                value={transId}
                onChange={(e) => {
                  setTransId(e.target.value);
                }}
                type="text"
                className="form-control"
                id="basic-url"
                aria-describedby="basic-addon3"
              />
              <button
                className="btn btn-outline-success mt-2 mb-2"
                onClick={submitTransId}
              >
                Submit
              </button>
            </div>
          </Modal>
        </div>
        <div>
          {/* transaction modal */}
          <Modal
            isOpen={downloadmodal}
            style={customStyles}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            closeTimeoutMS={500}
          >
            <button
              className="btn btn-outline-danger mb-2"
              onClick={closeModal}
            >
              close
            </button>
            <div>
              <label>Click To Download Csv</label>
              <br />
              {/*<ReactHTMLTableToExcel*/}
              {/*    className="js-download-link button bg-info border border-info px-4 btn-sm mb-2 mx-2 text-white rounded-pill"*/}
              {/*    table="download"*/}
              {/*    filename="ReportExcel"*/}
              {/*    sheet="Sheet"*/}
              {/*    buttonText="Export Excel"*/}
              {/*    onClick={closeModal}*/}
              {/*    disabled={downloadflag}*/}
              {/*/>*/}
              <CSVLink
                onClick={closeModal}
                disabled={downloadflag}
                data={
                  displayInvoice && displayInvoice.message.product_information
                }
                filename={`${invoiceId}.csv`}
                className="btn btn-sm bg-info text-black border-info mb-2"
              >
                Export csv
              </CSVLink>
            </div>
          </Modal>
        </div>
        {/* <div className="input-group my-3 w-75">
          <label for="">Invoice search</label>
          <input
            type="text"
            className="form-control mx-2"
            placeholder="search......."
            value={searchTerm}
            onChange={(e) => setsearchTerm(e.target.value)}
          />
        </div> */}
        {/*  */}
        <div className="row">
          <div className="col-lg-6 col-md-8 col-12">
            <div className="row my-2">
              <div className="col-lg-3 col-md-3 col-12">
                <p>Invoice search</p>
              </div>
              <div className="col-lg-9 col-md-9 col-12">
                <input
                  className="shadow-lg form-control  me-3 bg-white rounded"
                  // defaultValue={clientName}
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setsearchTerm(e.target.value)}
                ></input>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div id="no-more-tables" className=" ">
          <table
            className="table bg-white"
            style={{ fontSize: "13px", marginLeft: "1px" }}
          >
            <thead
              className="text-center shadow sticky-top "
              style={{ backgroundColor: "#b4bec2", top: "-20px", zIndex: "0" }}
            >
              <tr className="text-dark" style={{ border: "none" }}>
                {/* <th scope="col">SL</th>
                           <th scope="col">
                               <div className="custom-control custom-checkbox">
                                   <input type="checkbox" className="custom-control-input" name="allSelect" onChange={(e) => select_all_function()} />

                               </div>
                           </th> */}
                <th scope="col">Action</th>
                <th scope="col">ID</th>

                <th scope="col">COD Amount</th>
                <th scope="col">Invioce Generated BY</th>
                <th scope="col">Invioce Generated Date</th>
                <th scope="col">Invioce Nnumber</th>
                {/*<th scope="col">payment_CONFIRMED_BY*/}
                {/*</th>*/}
                {/*<th scope="col">payment_CONFIRMED_DATE*/}
                {/*</th>*/}
                {/*<th scope="col">Transaction Number</th>*/}
                <th scope="col">Transaction Amount</th>
                <th scope="col">Transaction Client ID</th>
                <th>Delete</th>

                {/* <th><button className="btn btn-sm bg-info text-black border-info mb-2" onClick={(e) => print_function(e)}>Print All</button> </th>
                            <th><CSVLink data={users} className="btn btn-sm bg-info text-black border-info mb-2" >Export csv</CSVLink></th> */}
              </tr>
            </thead>
            <tbody className="text-center border border-secondary">
              {searchResults.map((invoice) => (
                <tr>
                  <td data-title="Action" scope="col" className="w-100 h-100">
                    <button
                      value={invoice.invoicE_NUMBER}
                      onClick={(e) => showinvoice(e, invoice.invoicE_NUMBER)}
                      className="btn btn-sm bg-info text-black border-info mb-2 me-2"
                    >
                      Show Invoice
                    </button>
                    <button
                      value={invoice.invoicE_NUMBER}
                      className="btn btn-sm bg-success text-white mb-2 me-2"
                      onClick={confirmClick}
                    >
                      Confirm
                    </button>
                    <button
                      value={invoice.invoicE_NUMBER}
                      onClick={(e) => downloadinvoice(e.target.value)}
                      className="btn btn-sm bg-dark text-white mb-2"
                    >
                      Download Invoice
                    </button>
                  </td>
                  <td data-title="ID" scope="col">
                    {invoice.id}
                  </td>
                  <td data-title="COD Amount" scope="col">
                    {invoice.coD_AMOUNT}
                  </td>
                  <td data-title="Invioce Generated BY" scope="col">
                    {invoice.invoicE_GENERATED_NAME}
                  </td>
                  <td
                    data-title="Invioce Generated Date"
                    scope="col"
                    className="text-center"
                  >
                    {invoice.invoicE_GENERATED_DATE &&
                      invoice.invoicE_GENERATED_DATE.split("T")[0]}
                  </td>
                  <td data-title="Invioce Nnumber" scope="col">
                    {invoice.invoicE_NUMBER}
                  </td>
                  {/*<td scope="col">{invoice.paymenT_CONFIRMED_BY}*/}
                  {/*</td>*/}
                  {/*<td scope="col">{invoice.paymenT_CONFIRMED_DATE}*/}
                  {/*</td>*/}
                  {/*<td data-title="Transaction Number" scope="col">*/}
                  {/*    {invoice.transactioN_NUMBER}*/}
                  {/*</td>*/}
                  <td data-title="Transaction Amount" scope="col">
                    {invoice.transectioN_AMOUNT}
                  </td>
                  <td data-title="Transaction Client ID" scope="col">
                    {invoice.transectioN_CLIENT_NAME}
                  </td>

                  <td data-title="Delete">
                    <button
                      className="btn btn-outline-danger"
                      onClick={(e) => Rollback(e, invoice.invoicE_NUMBER)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* invoice display */}

        <Modal
          isOpen={downloadmodal1}
          style={customStyles1}
          onRequestClose={closeModal1}
          contentLabel="Example Modal"
          closeTimeoutMS={500}
        >
          <button className="btn btn-outline-danger mb-2" onClick={closeModal1}>
            close
          </button>

          <ReactHTMLTableToExcel
            className="js-download-link button bg-info border border-info ms-2 px-4 mb-2 btn-sm text-white rounded-3"
            // table="modal-to-export"
            table="download-total-and-tableData1"
            filename={`Invoice${getCurrentTime()}.xls`}
            sheet="Sheet"
            buttonText="Export excel"
          />
          <div className="px-2" id="no-more-tables">
            <div className=" ">
              <table className=" " id="download-total-and-tableData1">
                <h4>Invoice</h4>
                <h6>
                  total cod amount:{" "}
                  {displayInvoice && displayInvoice.message.total_cod_amount}
                </h6>
                <h6>
                  total number product:{" "}
                  {displayInvoice &&
                    displayInvoice.message.total_number_product}
                </h6>
                <h6>
                  total charge:{" "}
                  {displayInvoice && displayInvoice.message.total_charge}
                </h6>
                <h6>
                  {" "}
                  Net Payable amount:
                  {displayInvoice && displayInvoice.message.total_submit_amount}
                </h6>
                <h6>
                  client name:{" "}
                  {displayInvoice && displayInvoice.message.client_name}
                </h6>
                <h6>
                  invoice number:{" "}
                  {displayInvoice && displayInvoice.message.invoice_number}
                </h6>
                <table
                  className="table bg-white"
                  id="download"
                  style={{ fontSize: "13px", marginLeft: "1px" }}
                >
                  <thead
                    className="text-center shadow sticky-top "
                    style={{
                      backgroundColor: "#b4bec2",
                      top: "-20px",
                      zIndex: "0",
                    }}
                  >
                    <tr className="text-dark" style={{ border: "none" }}>
                      <th>Waybill Number</th>
                      <th>Order Id</th>
                      <th>Invoice No.</th>
                      <th>Payment Type</th>
                      <th>productInsystem dateTime</th>
                      <th>status</th>
                      <th>status dateTime</th>
                      <th>inside outside dhaka</th>
                      <th>product weight</th>
                      <th>Cod Amount</th>
                      <th>Single Product Charge</th>
                      <th>Cod Charge</th>

                      <th>other charge</th>

                      <th>packing charge</th>
                      <th>pickup charge</th>
                      <th>quality check charge</th>
                      {/*<th>single product_charge*/}
                      {/*</th>*/}

                      <th>vat tax charge</th>

                      <th>Net Payable Amount</th>
                    </tr>
                  </thead>
                  <tbody className="text-center border border-secondary">
                    {displayInvoice &&
                      displayInvoice.message.product_information.map(
                        (single_product) => (
                          <tr>
                            <td
                              data-title="Waybill Number"
                              className="text-end"
                            >
                              {single_product.product_waybill_number}
                            </td>
                            <td data-title="Order Id" className="text-end">
                              {single_product.order_id}
                            </td>
                            <td data-title="Invoice No" className="text-end">
                              {displayInvoice &&
                                displayInvoice.message.invoice_number}
                            </td>
                            <td data-title="Payment Type" className="text-end">
                              {single_product.payment_type}
                            </td>
                            <td
                              data-title="productInSystem date"
                              className="text-end"
                            >
                              {single_product.productInsystem_dateTime &&
                                single_product.productInsystem_dateTime.split(
                                  "T"
                                )[0]}
                            </td>
                            <td data-title="status" className="text-end">
                              {single_product.status}
                            </td>
                            <td
                              data-title="status dateTime"
                              className="text-end"
                            >
                              {single_product.status_dateTime}
                            </td>
                            <td
                              data-title="inside outside dhaka"
                              className="text-end"
                            >
                              {single_product.inside_outside_dhaka}
                            </td>
                            <td
                              data-title="product weight"
                              className="text-end"
                            >
                              {single_product.product_weight}
                            </td>
                            <td data-title="Cod Amount" className="text-end">
                              {single_product.cod_amount}
                            </td>
                            <td
                              data-title="Single Product Charge"
                              className="text-end"
                            >
                              {single_product.single_product_charge}
                            </td>
                            <td data-title="Cod Charge" className="text-end">
                              {single_product.cod_charge}
                            </td>

                            <td
                              data-title="other charge"
                              className="text-end"
                              scope="col"
                            >
                              {single_product.other_charge}
                            </td>

                            <td
                              data-title="packing charge"
                              className="text-end"
                              scope="col"
                            >
                              {single_product.packing_charge}
                            </td>
                            <td
                              data-title="pickup charge"
                              className="text-end"
                              scope="col"
                            >
                              {single_product.pickup_charge}
                            </td>
                            <td
                              data-title="quality check charge"
                              className="text-end"
                              scope="col"
                            >
                              {single_product.quality_check_charge}
                            </td>
                            {/*<td scope="col">{single_product.single_product_charge}*/}
                            {/*</td>*/}

                            <td
                              data-title="vat tax charge"
                              className="text-end"
                              scope="col"
                            >
                              {single_product.vat_tex_charge}
                            </td>
                            <td
                              data-title="Net Payable Amount"
                              className="text-end"
                            >
                              {single_product.client_submit_amount}
                            </td>
                          </tr>
                        )
                      )}
                  </tbody>
                </table>
              </table>

              {/* <h4>Cod Charge: <span className="badge bg-secondary">{clickedClient.coD_CHARGE}</span></h4>
                            <h4>Inside DELEVERY CHARGE: <span className="badge bg-secondary">{clickedClient.insidE_DHAKA_DELEVERY_CHARGE}</span></h4>
                            <h4>Inside DHAKA DELEVERY CHARGE INCREMENT: <span className="badge bg-secondary">{clickedClient.insidE_DHAKA_DELEVERY_CHARGE_INCREMENT}</span></h4>
                            <h4>Return CHARGE: <span className="badge bg-secondary">{clickedClient.returN_CHARGE}</span></h4>
                            <h4>Outside DHAKA DELEVERY CHARGE: <span className="badge bg-secondary">{clickedClient.outsidE_DHAKA_DELEVERY_CHARGE}</span></h4>
                            <h4>Outside DHAKA DELEVERY CHARGE INCREMENT: <span className="badge bg-secondary">{clickedClient.outsidE_DHAKA_DELEVERY_CHARGE_INCREMENT}</span></h4> */}
            </div>

            {/* <CSVLink onClick={closeModal}disabled={downloadflag} data={displayInvoice && displayInvoice.message.product_information} filename={`${invoiceId}.csv`} className="btn btn-sm bg-info text-black border-info mb-2" >Export csv</CSVLink> */}
          </div>
        </Modal>
      </div>
    </>
  );
};
export default InvoiceSummarytable;
