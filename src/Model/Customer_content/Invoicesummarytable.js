import React, { useState, useEffect, useContext } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Loader from "../../Loader";
//import './sc.css';

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
import { getCurrentTime } from "../../Common/common";
import axios from "axios";
import ReactPaginate from "react-paginate";

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

const Invoicesummarytable = () => {
  const [invoiceTableData, setInvoiceTableData] = useState([]);
  const [searchResults1, setSearchResults1] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm1, setSearchTerm1] = useState();
  console.log(currentPage);
  const [inputValue, setInputValue] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [infoModalOpen1, setinfoModalOpen1] = useState(false);
  const [pageDisabled, setPageDisabled] = useState(false);

  const localStorageData = JSON.parse(
    localStorage.getItem("logingInformation_LocalStore")
  );
  const handlePageClick = ({ selected: selectedPage }) => {
    let currentPage = selectedPage + 1;
    setCurrentPage(currentPage);
  };
  useEffect(() => {
    setIsLoading(true);
    const data = JSON.stringify({
      client_id: localStorageData.all_user_list_Client.customeR_ID,
      page_number: currentPage,
      invoice_number: inputValue,
    });
    // var data = JSON.stringify({
    //   client_id: 3,
    //   page_number: 1,
    //   invoice_number: inputValue,
    // });
    console.log("data", data);
    const options = {
      method: "POST",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/clientPanelallInvoiceSummary" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/clientPanelallInvoiceSummary" +
          "?company_name=" +
          company_name,
      params: { company_name: "EDESH" },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageData.token}`,
      },
      data: data,
    };

    axios
      .request(options)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        return json_object;
      })
      .then((res) => {
        console.log("res", res);
        setPageCount(res.totalPage);
        setInvoiceTableData(res.data);
        res.totalPage > 1 ? setPageDisabled(false) : setPageDisabled(true);
        setIsLoading(false);
        // toast.success(res?.status);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
        // toast.info(error?.response?.data?.message);
      });
  }, [inputValue, currentPage]);

  // useEffect(() => {
  //   let final_sideBar = null;
  //   let context_flag_obj = null;
  //   context_flag_obj = getLogingInformation_LocalStore();

  //   if (context_flag_obj == undefined) {
  //     if (loginInformation.user_type == employee_degignation_list.Customer) {
  //       setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam.
  //       final_sideBar = CustomerCareLinksidebar;
  //     } else {
  //       if (
  //         loginInformation.all_user_list.employeE_DEGIGNATION ==
  //         employee_degignation_list.ProcessingCenter
  //       ) {
  //         setsiteBarInformation_LocalStore(Linksidebar); //useState a set kore rakhlam.
  //         final_sideBar = Linksidebar;
  //       }
  //     }
  //     setLogin_Sidebar_LocalStore(loginInformation, final_sideBar); //local store a set kore rakhlam.
  //     setclientId(loginInformation.all_user_list_Client.customeR_ID);
  //     setdate_time(getCurrentTime);
  //     setlogingInformation_LocalStore(loginInformation); //useState a set kore rakhlam.
  //     console.log(
  //       "value set up if: ",
  //       loginInformation.all_user_list_Client.customeR_ID
  //     );
  //   } else {
  //     if (context_flag_obj.user_type == employee_degignation_list.Customer) {
  //       setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam.
  //     } else if (
  //       context_flag_obj.all_user_list.employeE_DEGIGNATION ==
  //       employee_degignation_list.ProcessingCenter
  //     ) {
  //       setsiteBarInformation_LocalStore(Linksidebar); //useState a set kore rakhlam.
  //     }
  //     setclientId(context_flag_obj.all_user_list_Client.customeR_ID);
  //     setdate_time(getCurrentTime);
  //     setlogingInformation_LocalStore(context_flag_obj);
  //     console.log(
  //       "value set up else : ",
  //       context_flag_obj.all_user_list_Client.customeR_ID
  //     );
  //   }
  // }, []);

  const [displayInvoice, setDisplayInvoice] = useState(null);

  // invoice show url

  const showinvoice = (e, invoice) => {
    var axios = require("axios");

    var data = JSON.stringify({
      employee_id: localStorageData.all_user_list_Client.customeR_ID,

      invoice_number: invoice,
      //  invoiceId
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
        Authorization: `Bearer ${localStorageData.token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        console.log("response is : ", json_object);
        return json_object;
      })
      .then((res) => {
        setDisplayInvoice(res);
        setSearchResults1(res.message.product_information);
        setinfoModalOpen1(true);
        //setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const searchIcon = <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>;

  // allinvoice.all_invoice_information

  // React.useEffect(() => {
  //   const users1 = json_information.message.all_invoice_information.filter(
  //     (p) =>
  //       p.invoicE_NUMBER
  //         .toString()
  //         .toLowerCase()
  //         .includes(searchTerm.toString().toLowerCase()) ||
  //       p.transactioN_NUMBER
  //         .toString()
  //         .toLowerCase()
  //         .includes(searchTerm.toString().toLowerCase())
  //   );

  //   setSearchResults(users1);
  // }, [searchTerm]);

  // const handleonChange = (event) => {
  //   setSearchTerm(event.target.value);
  // };

  function closeInvoiceModal1() {
    setinfoModalOpen1(false);
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
      color: "black",
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

  const handleonChange1 = (event) => {
    setSearchTerm1(event.target.value);
  };

  React.useEffect(() => {
    const users1 =
      displayInvoice &&
      displayInvoice.message.product_information.filter(
        (p) =>
          p.product_waybill_number
            .toString()
            .toLowerCase()
            .includes(searchTerm1.toString().toLowerCase()) ||
          p.order_id
            .toString()
            .toLowerCase()
            .includes(searchTerm1.toString().toLowerCase()) ||
          p.customer_Number
            .toString()
            .toLowerCase()
            .includes(searchTerm1.toString().toLowerCase())
      );

    setSearchResults1(users1);
  }, [searchTerm1]);

  return (
    <>
      <div className="container">
        <div className="">
          {/*  */}
          <form className="row d-flex justify-content-center">
            <div className="col-lg-6 col-md-8 col-sm-10 form-group mx-3 mt-2 p-4">
              <div className="input-group  input-icons">
                <i className="icon ">{searchIcon}</i>
                <input
                  type="search"
                  name=""
                  id=""
                  placeholder="INVOICE NUMBER"
                  className=" border border-secondary px-5 py-2  input-field"
                  style={{
                    // width: "-webkit-fill-available",
                    textAlign: "start",
                    marginLeft: "15px",
                    // boxShadow: "2px 3px 3px 1px #00000059",
                    outline: "none",
                    // border: "none",
                    borderRadius: "15px",
                  }}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
            </div>
          </form>
          {/*  */}
        </div>

        {pageDisabled ? (
          <></>
        ) : (
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
        )}

        {isLoading ? (
          <div>
            <Loader />
          </div>
        ) : (
          <div id="no-more-tables">
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
                  <th>ID</th>

                  <th>COD AMOUNT</th>
                  <th>Invoice Generated By</th>
                  <th>Invoice Generated Date</th>
                  <th>Invoice Number</th>
                  <th>Payment Confirmed By</th>
                  <th>Payment Confirmed DATE</th>
                  <th>Transaction Number</th>
                  <th>Transaction Amount</th>
                  <th>Transaction Client Id</th>
                </tr>
              </thead>
              <tbody className="text-center border border-secondary">
                {invoiceTableData.all_invoice_information?.map((invoice) => (
                  <tr className="td-text-right">
                    <td data-title="Action" style={{ width: "500px" }}>
                      <button
                        value={invoice.invoicE_NUMBER}
                        onClick={(e) => showinvoice(e, invoice.invoicE_NUMBER)}
                        className="btn btn-sm bg-info text-black border-info mb-2"
                      >
                        Show Invoice
                      </button>
                    </td>
                    <td data-title="ID">{invoice.id}</td>
                    <td data-title="COD AMOUNT">{invoice.coD_AMOUNT}</td>
                    <td data-title="Invoice Generated By" className="">
                      {invoice.invoicE_GENERATED_NAME}
                    </td>
                    <td data-title="Invoice Generated Date" className="">
                      {invoice.invoicE_GENERATED_DATE &&
                        invoice.invoicE_GENERATED_DATE.slice(0, 10)}
                    </td>
                    <td data-title="Invoice Number">
                      {invoice.invoicE_NUMBER}
                    </td>
                    <td data-title="Payment Confirmed By" className="  ">
                      {invoice.paymenT_CONFIRMED_NAME}
                    </td>
                    <td data-title="Payment Confirmed" className="  ">
                      {invoice.paymenT_CONFIRMED_DATE &&
                        invoice.paymenT_CONFIRMED_DATE.split("T")[0]}
                    </td>
                    <td data-title="Transaction Number">
                      {invoice.transactioN_NUMBER}
                    </td>
                    <td data-title="Transaction Amount">
                      {invoice.transectioN_AMOUNT}
                    </td>
                    <td data-title="Transaction Client">
                      {invoice.transectioN_CLIENT_NAME}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* invoice display */}

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

            <div id="no-more-tables">
              <h3>INVOICE SUMMARY</h3>
              <h6>
                Total Cod Amount:{" "}
                {displayInvoice && displayInvoice.message.total_cod_amount}
              </h6>
              <h6>
                Total Products:{" "}
                {displayInvoice && displayInvoice.message.total_number_product}
              </h6>
              <h6>
                Total Charge:{" "}
                {displayInvoice && displayInvoice.message.total_charge}
              </h6>
              <h6>
                {" "}
                Total Submit Amount:
                {displayInvoice && displayInvoice.message.total_submit_amount}
              </h6>
              <h6>
                Client Name:{" "}
                {displayInvoice && displayInvoice.message.client_name}
              </h6>
              <h6>
                Invoice Number:{" "}
                {displayInvoice && displayInvoice.message.invoice_number}
              </h6>

              <form className="row">
                <div className="col-lg-2 col-md-3 col-8 mb-2">
                  <ReactHTMLTableToExcel
                    className="js-download-link btn btn-success px-4 text-white rounded-3"
                    table="marchantinvoice"
                    filename={`Report${getCurrentTime()}`}
                    sheet="Sheet"
                    buttonText="Export excel"
                  />
                </div>
                <div className="col-lg-6 col-md-8 col-sm-10 mb-2 form-group p-0">
                  <div className="input-group  input-icons">
                    <i className="icon ">{searchIcon}</i>
                    <input
                      type="search"
                      name=""
                      id=""
                      placeholder="WAYBILL / ORDER ID / NUMBER"
                      className=" border border-secondary px-5 py-2  input-field"
                      style={{
                        // width: "-webkit-fill-available",
                        textAlign: "start",
                        marginLeft: "15px",
                        // boxShadow: "2px 3px 3px 1px #00000059",
                        outline: "none",
                        // border: "none",
                        borderRadius: "15px",
                      }}
                      value={searchTerm1}
                      onChange={handleonChange1}
                    />
                  </div>
                </div>
              </form>

              <table
                id="marchantinvoice"
                className="table bg-white"
                style={{ fontSize: "13px", marginLeft: "1px" }}
              >
                <thead
                  className="text-center shadow sticky-top"
                  style={{ backgroundColor: "#b4bec2", top: "-20px" }}
                >
                  <tr className="text-dark" style={{ border: "none" }}>
                    <th>Waybill Number</th>
                    <th>Order Id</th>
                    <th>Customer Number</th>
                    <th>Payment Type</th>
                    <th>Product In System DateTime</th>
                    <th>Status</th>
                    <th>Status DateTime</th>
                    <th>Inside/Outside Dhaka</th>
                    <th>Product Weight</th>
                    <th>COD Amount</th>
                    <th>Single Product Charge</th>
                    <th>COD Charge</th>
                    <th>Client Submit Amount</th>
                  </tr>
                </thead>
                <tbody className="text-center border border-secondary">
                  {searchResults1 &&
                    searchResults1.map((single_product) => (
                      <tr className="td-text-right">
                        <td data-title="Waybill Number">
                          {single_product.product_waybill_number}
                        </td>
                        <td data-title="Order Id">{single_product.order_id}</td>
                        <td data-title="Customer Number">
                          {single_product.customer_Number}
                        </td>
                        <td data-title="Payment Type">
                          {single_product.payment_type}
                        </td>
                        <td data-title="Product In System DateTime">
                          {single_product.productInsystem_dateTime &&
                            single_product.productInsystem_dateTime.split(
                              "T"
                            )[0]}
                        </td>
                        <td data-title="Status">{single_product.status}</td>
                        <td data-title="Status DateTime">
                          {single_product.status_dateTime &&
                            single_product.status_dateTime.split("T")[0]}
                        </td>
                        <td data-title="Inside/Outside Dhaka">
                          {single_product.inside_outside_dhaka}
                        </td>
                        <td data-title="Product Weight">
                          {single_product.product_weight}
                        </td>
                        <td data-title="COD Amount">
                          {single_product.cod_amount}
                        </td>
                        <td data-title="Single Product Charge">
                          {single_product.single_product_charge}
                        </td>
                        <td data-title="COD Charge">
                          {single_product.cod_charge}
                        </td>
                        <td data-title="Client Submit Amount">
                          {single_product.client_submit_amount}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};
export default Invoicesummarytable;
