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

import {
  Linksidebar,
  CustomerCareLinksidebar,
  Salessidebar,
  Operationsidebar,
  Degital_Ocean_flag,
  company_name,
  acsidebar,
} from "../../Common/Linksidebar";
import { LoginContext } from "../../Context/loginContext";
//for modal popup
import Modal from "react-modal";
//import './sc.css';

import html2canvas from "html2canvas";
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
const InvoiceSummarypaidtable = (props) => {
  const [allinvoicepaid, setallinvoicepaid] = useState("");
  const [searchTerm, setsearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [downloadmodal1, setdownloadmodal1] = useState(false);

  const [modalIsOpen1, setIsOpen1] = useState(false);

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

  let json_information = props.response;

  useEffect(() => {
    setallinvoicepaid(json_information.message);
  }, []);

  console.log("allInvoicepaid", allinvoicepaid);
  useEffect(() => {
    const users1 = json_information.message.all_invoice_information.filter(
      (p) =>
        p.invoicE_NUMBER
          .toString()
          .toLowerCase()
          .includes(searchTerm.toString().toLowerCase()) ||
        p.transactioN_NUMBER
          .toString()
          .toLowerCase()
          .includes(searchTerm.toString().toLowerCase())
    );

    setSearchResults(users1);
  }, [searchTerm]);

  const [displayInvoice, setDisplayInvoice] = useState("");

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
        // setdownloadflag(false)
        setdownloadmodal1(true);
        //setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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

  function closeModal1() {
    setIsOpen1(false);
    setdownloadmodal1(false);
  }

  return (
    <>
      <div className="container">
        <div className="">
          <div className="">
            {/* <ReactHTMLTableToExcel
              className="js-download-link button bg-info border border-info px-4 btn-sm mb-2 mx-2 text-white rounded-pill"
              table="table-to-export"
              filename={`PainInvoice${getCurrentTime()}`}
              sheet="Sheet"
              buttonText="Export excel"
            /> */}
            {/*<button className="btn btn-sm me-2 bg-info text-black border-info mb-2" onClick={(e) => Print_all_emement(e)}>Print All</button>*/}
            {/*<CSVLink data={allinvoicepaid} className="btn btn-sm bg-info text-black border-info mb-2" >Export csv</CSVLink>*/}
          </div>

          <div id="no-more-tables">
            {/* <div className="input-group my-3 w-75">
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
              <div className="col-lg-8 col-md-11 col-12">
                <div className="row my-2">
                  <div className="col-lg-3 col-md-3 col-12">
                    <ReactHTMLTableToExcel
                      className="js-download-link button bg-info border border-info px-4 mb-2 btn-sm text-white rounded-3"
                      table="table-to-export"
                      filename={`PainInvoice${getCurrentTime()}`}
                      sheet="Sheet"
                      buttonText="Export excel"
                    />
                  </div>
                  <div className="col-lg-9 col-md-9 col-12">
                    <input
                      className="shadow-lg form-control mb-2 me-3 bg-white rounded"
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

            <table
              className="table bg-white"
              style={{ fontSize: "13px", marginLeft: "1px" }}
              id="table-to-export"
            >
              <thead
                className="text-center shadow sticky-top "
                style={{ backgroundColor: "#b4bec2", top: "60px", zIndex: "0" }}
              >
                <tr className="text-dark" style={{ border: "none" }}>
                  {/* <th scope="col">SL</th>
                           <th scope="col">
                               <div className="custom-control custom-checkbox">
                                   <input type="checkbox" className="custom-control-input" name="allSelect" onChange={(e) => select_all_function()} />

                               </div>
                           </th> */}
                  <th>Action</th>
                  <th scope="col">ID</th>
                  <th scope="col">COD Amount</th>
                  <th scope="col">Invoice Generated BY</th>
                  <th scope="col">Invoice Generated Date</th>
                  <th scope="col">Invoice Number</th>
                  <th scope="col">payment Confirmed BY</th>
                  <th scope="col">payment Confirmed Date</th>
                  <th scope="col">Transaction Number</th>
                  <th scope="col">Transaction Amount</th>
                  <th scope="col">Transaction Client ID</th>

                  {/* <th><button className="btn btn-sm bg-info text-black border-info mb-2" onClick={(e) => print_function(e)}>Print All</button> </th>
                            <th><CSVLink data={users} className="btn btn-sm bg-info text-black border-info mb-2" >Export csv</CSVLink></th> */}
                </tr>
              </thead>
              <tbody className="text-center border border-secondary">
                {searchResults.map((invoice) => (
                  <tr>
                    <td data-title="Action" className="w-100">
                      <button
                        value={invoice.invoicE_NUMBER}
                        onClick={(e) => showinvoice(e, invoice.invoicE_NUMBER)}
                        className="btn btn-sm bg-info text-black border-info mb-2"
                      >
                        Show Invoice
                      </button>
                    </td>
                    <td data-title="ID" scope="col">
                      {invoice.id}
                    </td>
                    <td data-title="COD Amount" scope="col">
                      {invoice.coD_AMOUNT}
                    </td>
                    <td data-title="Invoice Generated BY" scope="col">
                      {invoice.invoicE_GENERATED_NAME}
                    </td>
                    <td data-title="Invoice Generated Date" scope="col">
                      {invoice.invoicE_GENERATED_DATE}
                    </td>
                    <td data-title="Invoice Number" scope="col">
                      {invoice.invoicE_NUMBER}
                    </td>
                    <td data-title="payment Confirmed BY" scope="col">
                      {invoice.paymenT_CONFIRMED_NAME}
                    </td>
                    <td data-title="payment Confirmed Date" scope="col">
                      {invoice.paymenT_CONFIRMED_DATE}
                    </td>
                    <td data-title="Transaction Number" scope="col">
                      {invoice.transactioN_NUMBER}
                    </td>
                    <td data-title="Transaction Amount" scope="col">
                      {invoice.transectioN_AMOUNT}
                    </td>
                    <td data-title="Transaction Client ID" scope="col">
                      {invoice.transectioN_CLIENT_NAME}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Modal
            isOpen={downloadmodal1}
            style={customStyles1}
            onRequestClose={closeModal1}
            contentLabel="Example Modal"
            closeTimeoutMS={500}
          >
            <button
              className="btn btn-outline-danger mb-2"
              onClick={closeModal1}
            >
              close
            </button>
            <ReactHTMLTableToExcel
              className="js-download-link button bg-info border border-info ms-2 px-4 mb-2 btn-sm text-white rounded-3"
              // table="modal-to-export"
              table="download-total-and-tableData"
              filename={`PaidInvoice${getCurrentTime()}.xls`}
              sheet="Sheet"
              buttonText="Export excel"
            />

            <div id="no-more-tables" className="px-2">
              <table className=" " id="download-total-and-tableData">
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
                {/* <ReactHTMLTableToExcel
                  className="js-download-link button bg-info border border-info ms-2 px-4 mb-2 btn-sm text-white rounded-3"
                  // table="modal-to-export"
                  table="no-more-tables"
                  filename={`PainInvoice${getCurrentTime()}`}
                  sheet="Sheet"
                  buttonText="Export excel"
                /> */}

                <table
                  className="table bg-white mx-2"
                  style={{ fontSize: "13px", marginLeft: "1px" }}
                  //   id="download"
                  id="modal-to-export"
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
                              className="text-end"
                              data-title="Waybill Number"
                            >
                              {single_product.product_waybill_number}
                            </td>
                            <td className="text-end" data-title="Order Id">
                              {single_product.order_id}
                            </td>
                            <td className="text-end" data-title="Invoice No">
                              {displayInvoice &&
                                displayInvoice.message.invoice_number}
                            </td>
                            <td className="text-end" data-title="Payment Type">
                              {single_product.payment_type}
                            </td>
                            <td
                              className="text-end"
                              data-title="productInsystem date"
                            >
                              {single_product.productInsystem_dateTime &&
                                single_product.productInsystem_dateTime.split(
                                  "T"
                                )[0]}
                            </td>
                            <td className="text-end" data-title="status">
                              {single_product.status}
                            </td>
                            <td
                              className="text-end"
                              data-title="status dateTime"
                            >
                              {single_product.status_dateTime}
                            </td>
                            <td
                              className="text-end"
                              data-title="inside outside dhaka"
                            >
                              {single_product.inside_outside_dhaka}
                            </td>
                            <td
                              className="text-end"
                              data-title="product weight"
                            >
                              {single_product.product_weight}
                            </td>
                            <td className="text-end" data-title="Cod Amount">
                              {single_product.cod_amount}
                            </td>
                            <td
                              className="text-end"
                              data-title="Single Product Charge"
                            >
                              {single_product.single_product_charge}
                            </td>
                            <td className="text-end" data-title="Cod Charge">
                              {single_product.cod_charge}
                            </td>

                            <td
                              className="text-end"
                              data-title="other charge"
                              scope="col"
                            >
                              {single_product.other_charge}
                            </td>

                            <td
                              className="text-end"
                              data-title="packing charge"
                              scope="col"
                            >
                              {single_product.packing_charge}
                            </td>
                            <td
                              className="text-end"
                              data-title="pickup charge"
                              scope="col"
                            >
                              {single_product.pickup_charge}
                            </td>
                            <td
                              className="text-end"
                              data-title="quality check charge"
                              scope="col"
                            >
                              {single_product.quality_check_charge}
                            </td>
                            {/*<td scope="col">{single_product.single_product_charge}*/}
                            {/*</td>*/}

                            <td
                              className="text-end"
                              data-title="vat tax charge"
                              scope="col"
                            >
                              {single_product.vat_tex_charge}
                            </td>
                            <td
                              className="text-end"
                              data-title="Net Payable Amount"
                            >
                              {single_product.client_submit_amount}
                            </td>
                          </tr>
                        )
                      )}
                  </tbody>
                </table>

                {/* <h4>Cod Charge: <span className="badge bg-secondary">{clickedClient.coD_CHARGE}</span></h4>
                            <h4>Inside DELEVERY CHARGE: <span className="badge bg-secondary">{clickedClient.insidE_DHAKA_DELEVERY_CHARGE}</span></h4>
                            <h4>Inside DHAKA DELEVERY CHARGE INCREMENT: <span className="badge bg-secondary">{clickedClient.insidE_DHAKA_DELEVERY_CHARGE_INCREMENT}</span></h4>
                            <h4>Return CHARGE: <span className="badge bg-secondary">{clickedClient.returN_CHARGE}</span></h4>
                            <h4>Outside DHAKA DELEVERY CHARGE: <span className="badge bg-secondary">{clickedClient.outsidE_DHAKA_DELEVERY_CHARGE}</span></h4>
                            <h4>Outside DHAKA DELEVERY CHARGE INCREMENT: <span className="badge bg-secondary">{clickedClient.outsidE_DHAKA_DELEVERY_CHARGE_INCREMENT}</span></h4> */}
              </table>

              {/* <CSVLink onClick={closeModal}disabled={downloadflag} data={displayInvoice && displayInvoice.message.product_information} filename={`${invoiceId}.csv`} className="btn btn-sm bg-info text-black border-info mb-2" >Export csv</CSVLink> */}
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};
export default InvoiceSummarypaidtable;
