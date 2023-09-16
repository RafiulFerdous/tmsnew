import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CSVLink } from "react-csv";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import axios from "axios";
import csvTemplate from "../../TemplateCSV/templete.xlsx";
import "./sc.css";
import "./table.css";
import "./modal.css";
import { print_function } from "../../utils/printFunction";
import Loader from "../../Loader";
import { Degital_Ocean_flag } from "../../Common/Linksidebar";

const Hometable = () => {
  toast.configure();

  const [searchOrderId, setSearchOrderId] = useState("");
  const [searchWaybill, setSearchWaybill] = useState("");
  const [pcData, setPcData] = useState([]);
  const [initialDataForSelect, setInitialDataForSelect] = useState([]);
  const [dataForPrint, setDataForPrint] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [flag, setFlag] = useState(false);

  const token = JSON.parse(
    localStorage.getItem("logingInformation_LocalStore")
  )?.token;

  const employee = JSON.parse(
    localStorage.getItem("logingInformation_LocalStore")
  )?.all_user_list;

  // api call get productInPc

  const getProductInPc = (payload) => {
    setIsLoading(true);
    // setSearchOrderId("");
    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/productInPC?company_name=EDESH"
        : "https://test.e-deshdelivery.com/universalapi/allapi/productInPC?company_name=EDESH",
      headers: {
        "Content-Type": "application/json",
      },
      data: payload,
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${logingInformation_LocalStore.token}`,
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then((resData) => {
        toast.success(resData?.data?.message);

        if (searchOrderId == "" || searchOrderId == null) {
          setInitialDataForSelect(resData?.data?.data);
        }

        let waybilllist = [];
        if (searchOrderId !== "") {
          waybilllist = searchOrderId.split(",");
        }
        if (searchWaybill !== "") {
          waybilllist = searchWaybill.split(",");
        }

        let temp = [];

        for (let i = 0; i < waybilllist.length; i++) {
          for (let j = 0; j < resData?.data?.data.length; j++) {
            if (
              resData?.data?.data[j].waybill_number === waybilllist[i].trim()
            ) {
              temp.push(resData?.data?.data[j]);
            } else if (
              resData?.data?.data[j].order_id === waybilllist[i].trim()
            ) {
              temp.push(resData?.data?.data[j]);
            }
          }
        }
        if (temp.length > 0) {
          setInitialDataForSelect(temp);
        } else {
          setInitialDataForSelect(resData?.data?.data);
        }

        setPcData(resData?.data);

        setIsLoading(false);
      })

      .catch(function (error) {
        toast.error("Data not found.");
        setPcData([]);
        setInitialDataForSelect([]);
        setIsLoading(false);
      });
  };

  // ------------------------------------------ search start------------------------------
  const search = () => {
    toast.info("searching...", { autoClose: 1300 });
    const payload = JSON.stringify({
      waybill_number: null,
      reference_no: searchOrderId,
      Pagenumber: 1,
    });
    getProductInPc(payload);
  };
  // ------------------------------------------ search end------------------------------
  // WaybillSearch start
  const WaybillSearch = () => {
    toast.info("searching...", { autoClose: 1300 });
    const payload = JSON.stringify({
      waybill_number: searchWaybill,
      reference_no: null,
      Pagenumber: 1,
    });
    getProductInPc(payload);
  };
  // WaybillSearch end

  const refresh = () => {
    // window.location.reload();

    setSearchWaybill("");
    setSearchOrderId("");

    //console.log("orderid", searchOrderId);

    // const payload = JSON.stringify({
    //   waybill_number: null,
    //   reference_no: null,
    //   Pagenumber: pageNumber,
    // });
    // getProductInPc(payload);
    setFlag(!flag);

    toast.info("Table data has been reset!");
  };

  useEffect(() => {
    const payload = JSON.stringify({
      waybill_number: null,
      reference_no: null,
      Pagenumber: pageNumber,
    });
    getProductInPc(payload);
  }, [pageNumber, token, flag]);

  // checkbox function

  const handleCheck = (e) => {
    const { name, checked } = e.target;
    if (name === "allselect") {
      const tempData = initialDataForSelect.map((e) => {
        return { ...e, isChecked: checked };
      });

      setInitialDataForSelect(tempData);
    } else {
      const tempData = initialDataForSelect.map((e) =>
        e.waybill_number === name ? { ...e, isChecked: checked } : e
      );

      setInitialDataForSelect(tempData);
    }
  };

  // get check box data
  useEffect(() => {
    const selectedValue = initialDataForSelect.filter(
      (e) => e.isChecked == true
    );

    setDataForPrint(selectedValue);
  }, [initialDataForSelect]);

  // waybill sync api
  const handleAdd = (e) => {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: Degital_Ocean_flag
        ? `https://e-deshdelivery.com/universalapi/allapi/WaybillSync?referenceno=${e}&employeeid=${employee.employeE_ID}`
        : `https://test.e-deshdelivery.com/universalapi/allapi/WaybillSync?referenceno=${e}&employeeid=${employee.employeE_ID}`,
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${logingInformation_LocalStore.token}`,
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        toast.success(JSON.stringify(response.data));
      })
      .catch(function (error) {
        toast.error(error?.message);
      });
  };

  return (
    <>
      <div className="container">
        <div className="container ">
          <div className="mb-5 ">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-12 mb-2 ps-0">
                <p className="mb-0">Please Enter Waybill</p>
                <div className="d-flex justify-content-between">
                  <input
                    style={{
                      backgroundColor: "#C5D5E4",
                      outline: "none",
                      border: "none",
                      padding: "7px",
                      borderRadius: "8px",
                      width: "70%",
                    }}
                    type="text"
                    placeholder="Search waybill"
                    value={searchWaybill}
                    onChange={(e) => setSearchWaybill(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        search();
                      }
                    }}
                  />

                  <button
                    className="btn btn-sm btn-success px-3 rounded-3"
                    type="submit"
                    onClick={WaybillSearch}
                  >
                    Search
                  </button>
                  <button
                    className="btn btn-sm btn-danger px-3 rounded-3"
                    onClick={refresh}
                  >
                    Reset
                  </button>
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-12 mb-2 pe-0">
                <p className="mb-0">Please Enter single OrderID</p>
                <div className="d-flex justify-content-between">
                  <input
                    style={{
                      backgroundColor: "#C5D5E4",
                      outline: "none",
                      border: "none",
                      padding: "7px",
                      borderRadius: "8px",
                      width: "70%",
                    }}
                    type="text"
                    placeholder="Search Order ID"
                    value={searchOrderId}
                    onChange={(e) => setSearchOrderId(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        search();
                      }
                    }}
                  />

                  <button
                    className="btn btn-sm btn-success px-3 rounded-3"
                    type="submit"
                    onClick={search}
                  >
                    Search
                  </button>
                  <button
                    className="btn btn-sm btn-danger px-3 rounded-3"
                    onClick={refresh}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div>
            <Loader />
          </div>
        ) : (
          pcData.length !== 0 &&
          pcData?.oRDER_LOG_Class?.referencE_NO && (
            <div id="no-more-tables">
              <table
                className="table bg-white"
                id=""
                style={{ fontSize: "13px", marginLeft: "1px" }}
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
                    <th>Order ID</th>
                    <th>Client Name</th>
                    <th>Consignee Name</th>
                    <th>Number</th>
                    <th>Address</th>
                    <th>Details</th>
                    <th>District </th>
                    <th>Coverage Area</th>
                    <th>Value</th>
                    <th>Weight</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="text-center border border-secondary">
                  <tr>
                    <td data-title="Order ID">
                      {pcData?.oRDER_LOG_Class?.referencE_NO}
                    </td>
                    <td data-title="Client Name">
                      {pcData?.oRDER_LOG_Class?.client_name}
                    </td>
                    <td data-title="Consignee Name">
                      {pcData?.oRDER_LOG_Class?.consigneE_NAME}
                    </td>
                    <td data-title="Number">
                      {pcData?.oRDER_LOG_Class?.contacT_NUMBER}
                    </td>
                    <td data-title="Address">
                      {pcData?.oRDER_LOG_Class?.address}
                    </td>
                    <td data-title="Details">
                      {pcData?.oRDER_LOG_Class?.producT_DETAILS}
                    </td>
                    <td data-title="District">
                      {pcData?.oRDER_LOG_Class?.districT_CITY}
                    </td>
                    <td data-title="Coverage Area">
                      {pcData?.oRDER_LOG_Class?.coveragE_AREA}
                    </td>
                    <td data-title="Value">
                      {pcData?.oRDER_LOG_Class?.producT_VALUE_AMOUNT}
                    </td>
                    <td data-title="Weight">
                      {pcData?.oRDER_LOG_Class?.producT_WEIGHT}
                    </td>
                    <td data-title="Action">
                      <button
                        className="btn btn-sm btn-success px-3"
                        onClick={() =>
                          handleAdd(pcData?.oRDER_LOG_Class?.referencE_NO)
                        }
                      >
                        ADD
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )
        )}

        {pcData?.data?.length !== 0 && isLoading === false && (
          <div id="no-more-tables" className="">
            <div className="row mb-2">
              <div className="col-xl-6 col-lg-6 col-md-8 col-12">
                <CSVLink
                  onClick={() => toast.success("CSV Download Successful")}
                  filename={"Parcel List"}
                  data={pcData?.data === undefined ? "nodata" : pcData?.data}
                  className="btn btn-success btn-sm me-2 fw-bold px-4 rounded-3 mb-2"
                >
                  Export csv
                </CSVLink>
                <button
                  className="btn btn-sm me-2 bg-info text-black rounded-3 px-4 mb-2"
                  onClick={() => print_function(dataForPrint)}
                  onFocus={() =>
                    toast.info("Please Wait a Moment!", {
                      position: "top-right",
                      autoClose: 2500,
                    })
                  }
                  disabled={dataForPrint?.length == 0}
                >
                  {dataForPrint?.length > 1 ? "Print All" : "Print"}
                </button>

                <button className="btn btn-dark btn-sm ms-2 fw-bold px-4 rounded-3 mb-2">
                  <a
                    className="text-white"
                    href={csvTemplate}
                    download="Product Template.xlsx"
                  >
                    {" "}
                    CSV Template
                  </a>
                </button>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-12 col-12 d-flex justify-content-end">
                <ReactPaginate
                  breakLabel="..."
                  nextLabel=" >"
                  onPageChange={(e) => setPageNumber(e.selected + 1)}
                  pageRangeDisplayed={5}
                  initialPage={pageNumber - 1}
                  pageCount={pcData?.pagenumber}
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
            <table
              className="table bg-white"
              id=""
              style={{ fontSize: "13px", marginLeft: "1px" }}
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
                  <th>SL</th>
                  <th scope="col">
                    Select All
                    <br />
                    <input
                      type="checkbox"
                      checked={
                        initialDataForSelect.filter((e) => e.isChecked !== true)
                          .length < 1
                      }
                      name="allselect"
                      onChange={handleCheck}
                    />
                  </th>
                  <th>Waybill</th>
                  <th>Order ID</th>
                  <th>Client Name</th>
                  <th>Consignee Name</th>
                  <th>Details</th>
                  <th>DC Office </th>
                  <th>Pin Code</th>
                  <th>Value</th>
                  <th>Weight</th>
                </tr>
              </thead>
              <tbody className="text-center border border-secondary">
                {initialDataForSelect?.map((single_message, i) => {
                  return (
                    <tr key={single_message.waybill_number}>
                      <td style={{ fontSize: "14px" }} data-title="SL">
                        {i + 1}
                      </td>
                      <td style={{ fontSize: "14px" }} data-title="Select">
                        <input
                          type="checkbox"
                          onChange={handleCheck}
                          name={single_message?.waybill_number}
                          checked={single_message?.isChecked || false}
                        />
                      </td>

                      <td
                        style={{ fontSize: "14px" }}
                        data-title="WayBill Number"
                      >
                        {single_message.waybill_number}
                      </td>
                      <td style={{ fontSize: "14px" }} data-title=" Order Id">
                        {single_message.order_id}
                      </td>
                      <td style={{ fontSize: "14px" }} data-title="Client Name">
                        {single_message.customer_name}
                      </td>
                      <td
                        style={{ fontSize: "14px" }}
                        data-title=" Consignee Name"
                      >
                        {single_message.consignee_name}
                      </td>
                      <td
                        style={{ fontSize: "14px" }}
                        data-title="Product Details"
                      >
                        {single_message.product_detail}
                      </td>
                      <td
                        style={{ fontSize: "14px" }}
                        data-title="Dc Office Name"
                      >
                        {single_message.dc_office_name}
                      </td>
                      <td style={{ fontSize: "14px" }} data-title="Pin Code">
                        {single_message.pincode}
                      </td>
                      <td
                        style={{ fontSize: "14px" }}
                        data-title="Product Value"
                      >
                        {single_message.product_value}{" "}
                      </td>
                      <td
                        style={{ fontSize: "14px" }}
                        data-title="Product Weight"
                      >
                        {single_message.product_weight}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <img id="PDFTable" style={{ display: "none" }} />
    </>
  );
};
export default Hometable;
