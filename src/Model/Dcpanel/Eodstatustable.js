import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../Context/loginContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { CSVLink, CSVDownload } from "react-csv";
import axios from "axios";
import Modal from "react-modal";
import {
  Linksidebar,
  Degital_Ocean_flag,
  company_name,
  dcpanel,
} from "../../Common/Linksidebar";

import "./css/home.css";
import { toast } from "react-toastify";
import { getCurrentTime } from "../../Common/common";
import Loader from "../../Loader";

const Eodstatustable = (props) => {
  toast.configure();

  const [allPendingEod, setAllPendingEod] = useState([]);
  const [allPendingEodCalculation, setAllPendingEodCalculation] = useState({});
  const [selectedDAta, setSelectedDAta] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [employId, setemployId] = useState("");
  const [infoModalOpen, setinfoModalOpen] = useState(false);
  const [selectedfe, setselectedfe] = useState("");
  const [eodRes, setEodRes] = useState([]);

  let logingInformation_LocalStore = JSON.parse(
    localStorage.getItem("logingInformation_LocalStore")
  );

  //
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
      color: "orange",
      position: "absolute",
      height: "50%",
      width: "50%",
      top: "30%",
      left: "20%",
      right: "40px",

      border: "1px solid #ccc",
      background: "#fff",
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "4px",
      outline: "none",
      padding: "20px",
    },
  };

  function submit() {
    console.log("this is fun call");
    const listForEOD = [];
    selectedDAta?.map((data) => {
      listForEOD.push(data.waybill);
    });

    let data = JSON.stringify({
      dc_id: logingInformation_LocalStore.all_user_list.employeE_ID,
      product_waybill_list: listForEOD,
      current_datetime: getCurrentTime(),
    });

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/feEODComplete" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/feEODComplete" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: data,
    };
    // console.log("this is data", data);
    // console.log("this is config", config);

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        return json_object;
      })
      .then((res) => {
        // console.log("response is confirmation", res);
        // setfelist(res.message);
        // setpayload(true);
        toast.success(res.status, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
        searchForEod();
      })
      .catch(function (error) {
        console.log(error);
      });
    setinfoModalOpen(false);
  }

  // useEffect(() => {
  //   // if (inputs.length === 0) return

  //   let data = JSON.stringify({
  //     dc_id: logingInformation_LocalStore.all_user_list.employeE_ID,
  //   });

  //   var config = {
  //     method: "post",
  //     url: Degital_Ocean_flag
  //       ? "https://e-deshdelivery.com/universalapi/allapi/feEodincompleteProductlistforDc" +
  //         "?company_name=" +
  //         company_name
  //       : "/universalapi/allapi/feEodincompleteProductlistforDc" +
  //         "?company_name=" +
  //         company_name,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${logingInformation_LocalStore.token}`,
  //     },
  //     data: data,
  //   };

  //   axios(config)
  //     .then(function (response) {
  //       let json_object_str = JSON.stringify(response.data);
  //       let json_object = JSON.parse(json_object_str);
  //       return json_object;
  //     })
  //     .then((res) => {
  //       setEodRes(
  //         res.message.insystem_product_list
  //           .concat(res.message.delevered_product_list)
  //           .concat(res.message.holded_product_list)
  //           .concat(res.message.lost_product_list)
  //           .concat(res.message.return_product_list)
  //       );
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   setinfoModalOpen(false);
  // }, [logingInformation_LocalStore, selectedfe]);

  const searchForEod = () => {
    setIsLoading(true);
    var config = {
      method: "get",
      url: Degital_Ocean_flag
        ? `https://e-deshdelivery.com/universalapi/allapi/AllPendingEod?fe_id=${selectedfe}`
        : `http://test.e-deshdelivery.com/universalapi/allapi/AllPendingEod?fe_id=${selectedfe}`,
      headers: { "Content-Type": "application/json" },
    };

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        return json_object;
      })
      .then((res) => {
        toast.success(res?.message);
        setAllPendingEod(
          res?.data?.lost_product_list
            ?.concat(res?.data?.holded_product_list)
            ?.concat(res?.data?.delevered_product_list)
            ?.concat(res?.data?.return_product_list)
            ?.concat(res?.data?.insystem_product_list)
        );
        setAllPendingEodCalculation(res?.data?.cal);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleCheck = (e) => {
    const { name, checked } = e.target;
    if (name === "allselect") {
      const tempUser = allPendingEod.map((e) => {
        return { ...e, isChecked: checked };
      });
      setAllPendingEod(tempUser);
    } else {
      const tempUser = allPendingEod.map((e) =>
        e.waybill === name ? { ...e, isChecked: checked } : e
      );

      setAllPendingEod(tempUser);
    }
  };

  // get check box data
  useEffect(() => {
    const selectedValue = allPendingEod.filter((e) => e.isChecked == true);
    setSelectedDAta(selectedValue);
  }, [allPendingEod]);

  const status = allPendingEod?.map(
    (status) =>
      status?.status === "Product Delivered" ||
      status?.status === "Product Lost" ||
      status?.status === "Product Returned"
  );

  const isFeExist = props?.response
    ?.map((e) => (e?.field_operative_id == selectedfe ? true : false))
    .includes(true);

  return (
    <>
      {/*model start*/}

      <div className="bordered">
        {/* Invoice modal */}
        <Modal
          isOpen={infoModalOpen}
          style={customStyles}
          onRequestClose={() => setinfoModalOpen(false)}
          closeTimeoutMS={200}
          contentLabel="Example Modal"
        >
          <button
            className="btn btn-outline-danger mb-2"
            onClick={() => setinfoModalOpen(false)}
          >
            close
          </button>
          <div className="d-flex justify-content-center">
            <h4>Confirm Eod</h4>
          </div>
          <div className="d-flex mt-4 justify-content-center">
            <button className="btn btn-outline-success mb-2" onClick={submit}>
              Submit
            </button>
          </div>
        </Modal>
      </div>

      {/*model end*/}

      <div className="container ">
        <div className="row">
          <div className="col-lg-5 col-md-5 col-12">
            <div className="border mb-2 p-3 rounded-3">
              <div className="row">
                <div className="col-12 col-md-4 col-lg-3">
                  <p className="">FE Name:</p>
                </div>
                <div className="col-12 col-md-8 col-lg-9">
                  {" "}
                  <input
                    style={{
                      backgroundColor: "#C5D5E4",
                      outline: "none",
                      border: "none",
                      padding: "7px",
                      borderRadius: "8px",
                      width: "100%",
                    }}
                    placeholder="Select FE"
                    list="felist"
                    className="form-control "
                    onChange={(e) => {
                      setselectedfe(e.target.value);
                    }}
                  />
                  <datalist id="felist">
                    <option selected value="">
                      None
                    </option>
                    {props.response?.map((single_dc_office_name) => {
                      // console.log("SINGLE DC NAME:", single_dc_office_name);
                      return (
                        <option
                          key={single_dc_office_name.field_operative_id}
                          value={single_dc_office_name.field_operative_id}
                        >
                          {single_dc_office_name.field_operative_name}
                        </option>
                      );
                    })}
                  </datalist>
                </div>
                <div className="col-md-12 d-flex justify-content-center mt-3 mb-2">
                  <button
                    disabled={!isFeExist}
                    type="button"
                    className="btn btn-success btn-sm px-4"
                    onClick={searchForEod}
                    // onClick={handleSearch}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7 col-md-7 col-12">
            <div className="border mb-2 p-3 rounded-3">
              <div className="row">
                <div className="col-lg-6 col-md-12 col-12">
                  <h5>Total COD : {allPendingEodCalculation?.total_COD}</h5>
                  <h5>
                    Total Collected cod :
                    {allPendingEodCalculation?.total_collected_COD}
                  </h5>
                  <h5>
                    Total UnCollected cod :
                    {allPendingEodCalculation?.total_uncollected_COD}
                  </h5>
                  <h5>
                    Total InSystem :
                    {allPendingEodCalculation?.total_insystem_product}
                  </h5>
                  <h5>
                    Total Delivered :
                    {allPendingEodCalculation?.total_delevered_product}
                  </h5>
                </div>
                <div className="col-lg-6 col-md-12 col-12">
                  <h5>
                    Total Lost : {allPendingEodCalculation?.total_lost_product}
                  </h5>
                  <h5>
                    Total Return :{" "}
                    {allPendingEodCalculation?.total_returned_product}
                  </h5>
                  <h5>
                    Total Hold /On Proccess :{" "}
                    {allPendingEodCalculation?.total_holded_product}
                  </h5>
                  <h5>
                    Total shipment : {allPendingEodCalculation?.total_shipment}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="no-more-tables" className="mt-5 pt-4">
          <div className="row mb-2">
            <div className="col-lg-6 col-md-6 col-12">
              <CSVLink
                data={allPendingEod}
                className="btn btn-sm btn-dark px-4 me-3 mb-2"
              >
                Export csv
              </CSVLink>
              <button
                className="btn btn-sm me-2 bg-info text-black border-info ms-2 mb-2"
                onClick={(e) => setinfoModalOpen(true)}
              >
                Confirm Eod
              </button>
              {/* <div className=""></div>
              <div className=""></div> */}
            </div>
          </div>

          {isLoading ? (
            <Loader />
          ) : (
            <table
              className="table bg-white"
              style={{ fontSize: "13px", marginLeft: "1px" }}
              id="dctable"
            >
              <thead
                className="text-center shadow sticky-top "
                style={{ backgroundColor: "#b4bec2", top: "60px", zIndex: "0" }}
              >
                <tr className="text-dark" style={{ border: "none" }}>
                  <th>SL</th>
                  <th scope="col">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        checked={
                          allPendingEod?.filter((e) => e.isChecked !== true)
                            .length < 1
                        }
                        name="allselect"
                        onChange={handleCheck}
                        className="custom-control-input"
                        disabled={status.includes(false)}
                      />
                    </div>
                  </th>

                  <th>WAYBILL</th>
                  <th>Order Id</th>
                  <th>Consignee</th>
                  <th>Status</th>
                  {/* <th>Product </th> */}

                  <th>Dc </th>
                  <th>Fe </th>
                  <th>Date Time </th>
                </tr>
              </thead>

              <tbody className="text-center border border-dark">
                {allPendingEod?.map((single_message, i) => {
                  return (
                    <tr key={single_message.waybill}>
                      <td data-title="SL">{i + 1}</td>
                      <td data-title="Select">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            onChange={handleCheck}
                            name={single_message.waybill}
                            checked={single_message?.isChecked || false}
                            className="custom-control-input"
                            disabled={
                              single_message?.status === "Product Delivered" ||
                              single_message?.status === "Product Hold " ||
                              single_message?.status === "Product Returned" ||
                              single_message?.status === "Product Lost"
                                ? false
                                : true
                            }
                          />
                        </div>
                      </td>

                      <td data-title="WAYBILL">{single_message.waybill}</td>
                      <td data-title="orderid">{single_message.orderid}</td>
                      <td data-title=" Consignee Name">
                        {single_message.consignee_name}
                      </td>
                      <td data-title=" Status">{single_message.status}</td>
                      <td data-title="DC name">
                        {single_message.dc_employee_name}
                      </td>
                      <td data-title="FE name">{single_message.fe_name}</td>
                      <td data-title="status Date">
                        {single_message.status_datetime}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/*    table end*/}
      </div>
    </>
  );
};
export default Eodstatustable;
