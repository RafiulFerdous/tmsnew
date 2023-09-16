import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { company_name, Degital_Ocean_flag } from "../../Common/Linksidebar";
import Loader from "../../Loader";

const NotPickedTable = () => {
  toast.configure();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [waybill, setWaybill] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchToggle, setSearchToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const localStorageData = JSON.parse(
    localStorage.getItem("logingInformation_LocalStore")
  );

  console.log("localStorageData", localStorageData);

  const handlePageClick = ({ selected: selectedPage }) => {
    let currentPage = selectedPage + 1;
    setPageNumber(currentPage);
  };

  useEffect(() => {
    setIsLoading(true);
    let payload = JSON.stringify({
       WaybillList: waybill,
      page_number: pageNumber,
      start_date: startDate === "" ? null : startDate,
      end_date: endDate === "" ? null : endDate,
    });

    var config = {
      method: "post",
      data: payload,
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/NotPickProduct" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/NotPickProduct" +
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
        console.log("res", res);
        toast.success(res?.message);
        setTotalPage(res?.total_page);
        setTableData(res?.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
        setTableData(error?.response?.data?.data);
        setIsLoading(false);
        console.log("error", error);
      });
  }, [searchToggle, pageNumber]);

   function InputTextfun(e) {
    // Get the current value of the input field
    const inputValue = e;

    const stringsArray = inputValue.split(",");
    const trimmedStrings = stringsArray.map((str) => str.trim());

    // Check for duplicates
    const duplicates = findDuplicates(trimmedStrings);

    if (duplicates.length > 0) {
       setError(`Duplicate values: ${duplicates.join(", ")}`);
      setWaybill(trimmedStrings);
      //  setIsSubmitDisabled(true);
    } else {
      setError("");
      setWaybill(trimmedStrings);
      // setIsSubmitDisabled(false);
    }
  }

  const findDuplicates = (array) => {
    const counts = {};
    const duplicates = [];

    array.forEach((item) => {
      if (counts[item]) {
        counts[item]++;
        if (!duplicates.includes(item)) {
          duplicates.push(item);
        }
      } else {
        counts[item] = 1;
      }
    });

    return duplicates;
  };

  console.log("see input text", waybill);

  return (
    <div>
      <div className="">
        <div
          className="container shadow my-3 py-3 rounded single-product-upload-bg"
          style={{ width: "80%" }}
        >
          <div className="row">
            <div className="col-lg-12 col-md-12 col-12">
              <div className="row my-2">
                <div className="col-lg-2 col-md-3 col-12">
                  <p> Waybill:</p>
                </div>
                <div className="col-lg-10 col-md-9 col-12">
                  <input
                    className="shadow-lg form-control  me-3 bg-white rounded"
                    // defaultValue={clientName}
                    type="text"
                    placeholder="Waybill"
                    value={waybill}
                    onChange={(e) => InputTextfun(e.target.value)}
                    // onChange={(e) => {
                    //   setWaybill(e.target.value);
                    // }}
                  ></input>
                </div>
              </div>
            </div>
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
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);
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
                    value={endDate}
                    onChange={(e) => {
                      setEndDate(e.target.value);
                    }}
                  />
                </div>
                <div>
                          {error && <p style={{ color: "red" }}>{error}</p>}
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

      <div id="no-more-tables">
        <div className="row p-0">
          <div className="mb-2 d-flex flex-row-reverse">
            <ReactPaginate
              breakLabel="..."
              nextLabel=" >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={totalPage}
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
            className="table bg-white"
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
                <th>Partner Courier</th>
                <th scope="col">Customer Name</th>
                <th scope="col">Product Name</th>
                <th scope="col">Product Details</th>
                <th scope="col">Consignee Name</th>
                <th scope="col">Address</th>
                <th>Contact Number</th>

                <th scope="col">Area Code </th>
                <th scope="col">Payment Type</th>
                <th scope="col">Product Value </th>
                <th scope="col">Weight</th>
                <th>Processing Status</th>
                <th>Processing Date</th>
                <th>Entry Date</th>
              </tr>
            </thead>
            {/*Table head*/}
            {/*Table body*/}
            <tbody className="text-center border border-dark">
              {tableData &&
                tableData?.map((single_message, i) => {
                  return (
                    <tr key={i} className="">
                      <td data-title="SL">{i + 1}</td>
                      <td data-title="Waybill" scope="row">
                        {single_message.producT_WAYBILL_NUMBER}
                      </td>
                      <td data-title="Order ID">
                        {single_message.referencE_NO}
                      </td>
                      <td data-title="Partner Courier">
                        {single_message.partneR_KOREAR_COMPANY}
                      </td>
                      <td data-title="Customer Name">
                        {single_message.customeR_NAME}
                      </td>
                      <td data-title="Product Name">
                        {single_message?.producT_NAME}
                      </td>
                      <td data-title="Product Details">
                        {single_message?.producT_DETAILS}
                      </td>
                      <td data-title="Consignee Name">
                        {single_message?.consigneE_NAME}
                      </td>
                      <td data-title="Address">{single_message?.address}</td>
                      <td data-title="Contact Number">
                        {single_message?.contacT_NUMBER}
                      </td>
                      {/* <td> {single_message.product_weight}</td> */}
                      <td data-title="Area Code">
                        {single_message?.areA_CODE}
                      </td>
                      <td data-title="Payment Type">
                        {single_message?.producT_PAYMENT_TYPE}
                      </td>
                      <td data-title="Product Value">
                        {single_message?.producT_VALUE_AMOUNT}
                      </td>
                      <td data-title="Weight">
                        {single_message?.producT_WEIGHT}
                      </td>
                      <td data-title="Processing Status">
                        {single_message?.producT_PROCESSING_STATUS}
                      </td>

                      <td data-title="Processing Date">
                        {single_message?.producT_PRODESSING_STATUS_DATETIME &&
                          single_message?.producT_PRODESSING_STATUS_DATETIME.split(
                            "T"
                          )[0]}
                      </td>
                      <td data-title="Entry Date">
                        {single_message?.producT_ENTRY_TIME &&
                          single_message?.producT_ENTRY_TIME.split("T")[0]}
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
  );
};

export default NotPickedTable;
