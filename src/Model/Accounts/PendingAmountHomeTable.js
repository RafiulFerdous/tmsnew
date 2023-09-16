import React, { useState, useEffect, useContext } from "react";
import reactDom from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { SearchContext } from "../../Context/searchContext";
import { SearchButtonContext } from "../../Context/buttonContext";
import BarCode, { useBarcode } from "react-barcode";
import { jsPDF } from "jspdf";
import { CSVLink, CSVDownload } from "react-csv";
//import './sc.css';

import html2canvas from "html2canvas";
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
const PendingAmountHomeTable = (props) => {
  toast.configure();
  const [allData, setAllData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  let json_information = props.response;
  useEffect(() => {
    setAllData(json_information.message);
    console.log("response for all", json_information.message);
  }, []);
  const [dcName, setDcname] = useState("");
  const [dcIndex, setDcIndex] = useState("");

  const searchByDc = () => {
    let results = [];
    allData.map((singleData, i) => {
      if (singleData.dc_name == dcName) {
        setDcIndex(i);
        singleData.product_information_list_delevered.map((product) => {
          results.push(product);
        });
        singleData.product_information_list_pending.map((product) => {
          results.push(product);
        });
      }
    });
    console.log("results", results);
    setFilterData(results);
  };
  const handleChange = (e) => {
    console.log(e.target.value);
    setDcname(e.target.value);
  };

  return (
    <>
      <div className="container row-col-2">
        {/*new design accounts panel Pending Amount DC start */}
        <div className="col-lg-10 col-md-11 col-11 m-auto">
          <div className="">
            <h4 className="text-dark text-center">Pending Amount DC</h4>
            <div className="container shadow my-3 py-3 rounded single-product-upload-bg">
              <div className="row my-2">
                <div className="col-lg-7 col-md-7 col-12">
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-12">
                      <p>DC Name:</p>
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
                        className="form-select"
                        list="dcname"
                        onChange={handleChange}
                      ></input>
                      <datalist id="dcname">
                        <option selected value="">
                          None
                        </option>
                        {allData.map((singledata) => {
                          return (
                            <option value={singledata.dc_name}>
                              {singledata.dc_name}
                            </option>
                          );
                        })}
                      </datalist>
                    </div>
                  </div>
                  <div className="col-md-12 d-flex justify-content-center mt-4 mb-2">
                    <button
                      type="button"
                      className="btn btn-success btn-sm px-4 rounded-pill"
                      onClick={searchByDc}
                    >
                      Search
                    </button>
                  </div>
                </div>
                <div className="col-lg-5 col-md-5 col-12">
                  <div>
                    <h5>
                      Delivered Cod Amount:{" "}
                      <span className="badge bg-secondary">
                        {dcIndex !== ""
                          ? allData[dcIndex].delevered_cod_amount
                          : ""}
                      </span>
                    </h5>

                    <h5>
                      Pending Cod Amount:{" "}
                      <span className="badge bg-secondary">
                        {dcIndex !== ""
                          ? allData[dcIndex].pending_cod_amount
                          : ""}
                      </span>
                    </h5>
                    <h5>
                      Total Cod Amount:{" "}
                      <span className="badge bg-secondary">
                        {dcIndex !== ""
                          ? allData[dcIndex].total_cod_amount
                          : ""}
                      </span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*new design accounts panel Pending Amount DC end */}
        {/* <div className="border  mb-5">
          <form className="row d-flex justify-content-center">
            <div className=" col-sm-4 form-group mx-3 mt-2">
              <div className=" text-center text-black mx-1">DC Name:</div>
              <select
                className="form-select "
                id="dcname"
                onChange={handleChange}
              >
                <option selected value="none">
                  None
                </option>
                {allData.map((singledata) => {
                  return (
                    <option value={singledata.dc_name}>
                      {singledata.dc_name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="col-md-12 d-flex justify-content-center mt-4 mb-2">
              <button
                type="button"
                onClick={searchByDc}
                className="btn btn-outline-primary"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div>
          <h3>
            Delivered Cod Amount:{" "}
            <span className="badge bg-secondary">
              {dcIndex !== "" ? allData[dcIndex].delevered_cod_amount : ""}
            </span>
          </h3>

          <h3>
            Pending Cod Amount:{" "}
            <span className="badge bg-secondary">
              {dcIndex !== "" ? allData[dcIndex].pending_cod_amount : ""}
            </span>
          </h3>
          <h3>
            Total Cod Amount:{" "}
            <span className="badge bg-secondary">
              {dcIndex !== "" ? allData[dcIndex].total_cod_amount : ""}
            </span>
          </h3>
        </div> */}
        {/* table */}
        <div className="mt-5" id="no-more-tables">
          <div>
            <CSVLink
              data={filterData}
              filename={`DcPayment${getCurrentTime()}.csv`}
              className="btn btn-sm btn-dark px-4 mb-2"
            >
              Export csv
            </CSVLink>
          </div>
          <table
            className="table css-serial bg-white"
            style={{ fontSize: "13px", marginLeft: "1px" }}
          >
            {/*Table head*/}
            <thead
              className="text-center shadow sticky-top"
              style={{ backgroundColor: "#b4bec2", top: "60px", zIndex: 0 }}
            >
              <tr className="text-dark" style={{ border: "none" }}>
                <th>SL</th>
                <th scope="col">Client Name</th>
                <th scope="col">Order Id</th>
                <th scope="col">Payment Amount</th>
                <th scope="col">Payment Status</th>
                <th>Payment Type</th>
                <th scope="col">waybill number</th>

                {/* <th><CSVLink data={alldata} className="btn btn-sm bg-info text-black border-info mb-2" >Download csv</CSVLink></th> */}
              </tr>
            </thead>
            {/*Table head*/}
            {/*Table body*/}
            <tbody className="text-center border border-secondary">
              {filterData.map((single_message) => {
                console.log(
                  "dekhbo ami single message",
                  single_message.payment_status == "COLLECTED"
                    ? "hello"
                    : single_message.payment_status == "Pending"
                    ? "hi"
                    : "nothing"
                );
                return (
                  <tr
                    key={single_message.waybill_number}
                    // className="bg-success text-white"
                    className={
                      single_message.payment_status == "COLLECTED"
                        ? "bg-success text-white"
                        : single_message.payment_status == "Pending"
                        ? "bg-primary text-white"
                        : ""
                    }
                  >
                    <td></td>
                    <td scope="row">{single_message.client_name}</td>
                    <td>{single_message.order_id}</td>
                    <td>{single_message.payment_amount}</td>
                    <td>{single_message.payment_status}</td>
                    <td>{single_message.payment_type}</td>
                    <td>{single_message.product_waybill_number}</td>
                  </tr>
                );
              })}
            </tbody>
            {/*Table body*/}
          </table>
        </div>
      </div>
    </>
  );
};
export default PendingAmountHomeTable;
