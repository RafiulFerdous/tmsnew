import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./customermodel.css";
import "./Cpayment.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { getCurrentTime } from "../../Common/common";
import { company_name, Degital_Ocean_flag } from "../../Common/Linksidebar";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Loader from "../../Loader";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";

const CustomerPayment = () => {
  toast.configure();
  const [paymentTableData, setPaymentTableData] = useState([]);

  const [PaymentStatus, setPaymentStatus] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageDisabled, setPageDisabled] = useState(false);
  const [searchType, setSearchType] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [waybill, setWaybill] = useState("");
  const [orderId, setOrderId] = useState("");
  const [number, setNumber] = useState("");
  const [invoice, setInvoice] = useState("");
  const [searchFlag, setSearchFlag] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  console.log("searchType", searchType);
  // console.log("waybill", waybill);
  // console.log("orderId", orderId);
  // console.log("number", number);

  const searchIcon = <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>;

  const localStorageData = JSON.parse(
    localStorage.getItem("logingInformation_LocalStore")
  );
  // console.log(localStorageData);

  const handlePageClick = ({ selected: selectedPage }) => {
    let currentPage = selectedPage + 1;
    setCurrentPage(currentPage);
  };
  useEffect(() => {
    if (searchType === "WAYBILL") {
      setWaybill(searchInput);
      setCurrentPage(1);
      setOrderId("");
      setNumber("");
      setInvoice("");
      setPaymentStatus("");
    }
    if (searchType === "ORDERID") {
      setOrderId(searchInput);
      setCurrentPage(1);
      setWaybill("");
      setNumber("");
      setInvoice("");
      setPaymentStatus("");
    }
    if (searchType === "NUMBER") {
      setNumber(searchInput);
      setCurrentPage(1);
      setWaybill("");
      setOrderId("");
      setInvoice("");
      setPaymentStatus("");
    }
    if (searchType === "INVOICE") {
      setNumber("");
      setCurrentPage(1);
      setWaybill("");
      setOrderId("");
      setInvoice(searchInput);
      setPaymentStatus("");
    }
  }, [searchType, searchInput]);
  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    console.log("input", e.target.value);
  };
  const handleChange = (e) => {
    setPaymentStatus(e.target.value);
    setSearchInput("");
    setSearchType("");
    setWaybill("");
    setOrderId("");
    setNumber("");
    setInvoice("");
    setCurrentPage(1);
  };
  const resetflag = (e) => {
    e.preventDefault();

    window.location.reload();
    // toast.info("Table data has been reset!");
  };

  useEffect(() => {
    setIsLoading(true);
    const data = JSON.stringify({
      client_id: localStorageData.all_user_list_Client.customeR_ID,
      page_number: currentPage,
      waybill: waybill,
      order_id: orderId,
      number: number,
      payment_status: PaymentStatus,
    });
    console.log("data", data);
    const options = {
      method: "POST",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/clientFinance" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/clientFinance" +
          "?company_name=" +
          company_name,
      // params: { company_name: "EDESH" },
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
        setPaymentTableData(res.data);
        res.totalPage > 1 ? setPageDisabled(false) : setPageDisabled(true);
        setIsLoading(false);
        toast.success(res?.status);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
        toast.info(error?.response?.data?.message);
      });
  }, [PaymentStatus, currentPage, searchFlag]);

  return (
    <>
      <div className="container">
        <div>
          <div className="row mb-2">
            <div className="col-12">
              <div className="row">
                <div className="col-12">
                  <h5>
                    Total Product : {paymentTableData?.total_number_of_product}
                  </h5>
                  <h5>Total COD : {paymentTableData?.total_COD_amount}</h5>
                  <h5>
                    Total Given COD : {paymentTableData?.total_given_cod_amout}
                  </h5>
                  <h5>
                    Total Pending COD :{" "}
                    {paymentTableData?.total_pending_cod_amout}
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div id="no-more-tables ">
            <form className="row ">
              {/* <div className="col-lg-2 col-md-3 col-8 mb-2">
                <ReactHTMLTableToExcel
                  className="js-download-link btn btn-success px-4 text-white rounded-3"
                  table="clientprp"
                  filename={`Report${getCurrentTime()}`}
                  sheet="Sheet"
                  buttonText="Export excel"
                />
              </div> */}
              <div className="col-lg-6 col-md-6 col-sm-8 m-auto mb-2 form-group p-0">
                <div className="input-group  input-icons">
                  <i className="icon ">{searchIcon}</i>
                  <input
                    type="search"
                    name=""
                    id=""
                    placeholder="Search Waybill / Order ID / Number"
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
                    value={searchInput}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-8 m-auto mb-2 form-group p-0 ps-2">
                <p className="mb-0">select Search Type</p>
                <select
                  className="select-style"
                  onChange={(e) => setSearchType(e.target.value)}
                  value={searchType}
                >
                  <option value="">NONE</option>
                  <option value="WAYBILL">WAYBILL</option>
                  <option value="ORDERID">ORDERID</option>
                  <option value="NUMBER">NUMBER</option>
                  {/* <option value="INVOICE">INVOICE</option> */}
                </select>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-8 m-auto">
                <button
                  onClick={() => setSearchFlag(!searchFlag)}
                  className="btn btn-sm btn-success px-3 ms-2 rounded-3"
                >
                  Search
                </button>
                <button
                  className="btn btn-sm btn-danger px-3 ms-2 rounded-3"
                  onClick={resetflag}
                >
                  Reset
                </button>
              </div>
            </form>

            <div className="mb-2 d-flex justify-content-between">
              <div>
                <ReactHTMLTableToExcel
                  className="js-download-link btn btn-success px-4 text-white rounded-3"
                  table="clientprp"
                  filename={`Report${getCurrentTime()}`}
                  sheet="Sheet"
                  buttonText="Export excel"
                />
                {/* <CSVLink
                  data={paymentTableData?.all_product_info}
                  className="btn btn-sm btn-dark px-4 me-3 mb-2"
                >
                  Export csv
                </CSVLink> */}
              </div>
              {pageDisabled ? (
                <div></div>
              ) : (
                <div>
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
            </div>

            {isLoading ? (
              <div>
                <Loader />
              </div>
            ) : (
              <table
                className="table css-serial bg-white"
                style={{ fontSize: "13px", marginLeft: "1px" }}
                id="clientprp"
              >
                <thead
                  className="text-center shadow sticky-top"
                  style={{
                    backgroundColor: "#b4bec2",
                    top: "60px",
                    zIndex: "0",
                  }}
                >
                  <tr className="text-dark" style={{ border: "none" }}>
                    <th>SL</th>
                    <th>Waybill</th>
                    <th>Order ID</th>
                    <th>Invoice Number</th>
                    <th>Payment Type</th>
                    <th>Customer Name</th>
                    <th>Customer Number</th>
                    <th>Weight</th>
                    <th>COD Amount</th>
                    <th>COD Charge</th>
                    <th>Delivery Charge</th>
                    <th>Inside / Outside</th>

                    <th>Product Status</th>
                    <th
                      className="custom-dropdown-from"
                      style={{ padding: "0 15px" }}
                    >
                      Payment Status
                      <div
                        className="sort-payment-status"
                        style={{ position: "absolute" }}
                      >
                        <select value={PaymentStatus} onChange={handleChange}>
                          <option value="">NONE</option>
                          <option value="PENDING">PENDING</option>
                          <option value="SUBMITED">SUBMITTED</option>
                        </select>
                      </div>
                    </th>
                    <th>DateTime</th>
                  </tr>
                </thead>

                <tbody className="text-center border border-secondary">
                  {paymentTableData?.all_product_info?.map((single_message) => {
                    return (
                      <tr key={single_message.order_id}>
                        <td data-title="SL"></td>
                        <td data-title="Waybill">
                          {single_message.waybill_number}
                        </td>
                        <td data-title="Order ID">{single_message.order_id}</td>
                        <td data-title="Invoice Number">
                          {single_message.invoiceNumber}
                        </td>
                        <td data-title="Payment Type">
                          {single_message.product_payment_type}
                        </td>
                        <td data-title="Customer Name">
                          {single_message.consignee_name}
                        </td>
                        <td data-title="Customer Number">
                          {single_message.consignee_number}
                        </td>
                        <td data-title="Weight">{single_message.weight}kg</td>
                        <td data-title="COD Amount">
                          {single_message.cod_amount}
                        </td>
                        <td data-title="COD Charge">
                          {single_message.cod_charge}
                        </td>
                        <td data-title="Delivery Charge">
                          {single_message.delivery_charge}
                        </td>
                        <td data-title="Inside / Outside">
                          {single_message.isd_Osd}
                        </td>
                        <td data-title="Product Status">
                          {single_message.status}
                        </td>
                        <td data-title="Payment Status">
                          {single_message.client_financeStatus || "Pending"}
                        </td>
                        <td data-title="DateTime">
                          {single_message.client_financeStatus_dateTime ||
                            "Pending"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default CustomerPayment;
