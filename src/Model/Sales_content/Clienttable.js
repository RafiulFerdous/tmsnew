import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sales.css";
import { CSVLink, CSVDownload } from "react-csv";
import Modal from "react-modal";
import {
  Linksidebar,
  CustomerCareLinksidebar,
  Salessidebar,
  Operationsidebar,
  Degital_Ocean_flag,
  company_name,
} from "../../Common/Linksidebar";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
//import "./modalAnimation.css";
let waiting_client_payload, setwaiting_client_payload;
let waiting_client_information, setwaiting_client_information;
let client_confirm_flag, setclient_confirm_flag;
let confirmed_client_id, setconfirmed_client_id;
let client_confirm_button;
let waiting_client_confirm_refresh_flag, setwaiting_client_confirm_refresh_flag;
let confirm_client_information, setconfirm_client_information;
Modal.setAppElement("#root");
const Clienttable = (props) => {
  const csvData = [
    [
      "Waybill",
      "reference no",
      "Consignee Name",
      "City",
      "State",
      "Address",
      "Pincode",
      "Areacode",
      "Phone",
      "Mobile",
      "Weight",
      "Payment Mode",
      "Package Amount",
      "Cod Amount",
      "Product to be Shipped",
      "Return Address",
      "Return Pin",
      "Seller Name",
      "Country",
      "Seller Address",
      "Country_code",
      "Seller CST No",
      "Seller TIN",
      "Invoice No",
      "Invoice Date",
      "Length",
      "Breadth",
      "Height",
      "Quantity",
      "Commodity Value",
      "Tax Value",
      "Category of Goods",
      "Sales Tax Form ack no",
      "Consignee TIN",
      "Shipping Client",
      "Seller_GST_TIN",
      "Client_GST_TIN",
      "Consignee_GST_TIN",
      "Invoice_Reference",
      "HSN_Code",
      "Return Reason",
      "Vendor Pickup Location",
      "EWBN",
      "Supply_Sub_Type",
      "Document_Type",
      "Document_Number",
      "Document_Date",
      "OD_Distance",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "p88",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
  ];
  let json_information = props.response;

  const [employee_id, setemployee_id] = useState("");
  const [logingInformation_LocalStore, setlogingInformation_LocalStore] =
    useState("");
  [waiting_client_information, setwaiting_client_information] = useState("");
  [waiting_client_payload, setwaiting_client_payload] = useState(false);
  [client_confirm_flag, setclient_confirm_flag] = useState("");
  [confirmed_client_id, setconfirmed_client_id] = useState(-5);
  [confirm_client_information, setconfirm_client_information] = useState("");
  [
    waiting_client_confirm_refresh_flag,
    setwaiting_client_confirm_refresh_flag,
  ] = useState(false);

  let getLogingInformation_LocalStore = () => {
    let value = JSON.parse(
      localStorage.getItem("logingInformation_LocalStore")
    );
    return value;
  };

  useEffect(() => {
    let context_flag_obj = null;
    context_flag_obj = getLogingInformation_LocalStore();
    setemployee_id(context_flag_obj.all_user_list.employeE_ID);
    setlogingInformation_LocalStore(context_flag_obj);
  }, []);

  const [showText, setShowText] = useState(false);
  let onclick = (e) => {
    e.preventDefault();
    if (showText)
      //setwaiting_client_payload(false);
      setShowText((showText) => !showText);
    else {
      //setwaiting_client_payload(true);
      setShowText((showText) => !showText);
    }
  };
  const [waybill, setwaybill] = useState("");
  const [SubmitFlag, setSubmitFlag] = useState(false);
  const [IsOpen, setIsOpen] = useState(false);
  const [client_information, setclient_information] = useState("");

  useEffect(() => {
    console.log("Waiting Client Payload : ", waiting_client_payload);
    //if(waiting_client_payload){
    var axios = require("axios");
    var data = JSON.stringify({
      sales_employee_id: employee_id,
    });

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/salesPanelClientInformation_waiting_tobe_confirmed" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/salesPanelClientInformation_waiting_tobe_confirmed" +
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
        console.log(json_object);
        return json_object;
      })
      .then((res) => {
        console.log("waithing to be confirmed: ", res);
        setwaiting_client_information(res);
        setwaiting_client_payload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
    //}
  }, [showText, waiting_client_confirm_refresh_flag]);

  client_confirm_button = (client_id) => {
    setconfirmed_client_id(client_id);
    console.log("Confirmed button clicked.", client_id);
    setclient_confirm_flag((client_confirm_flag) => !client_confirm_flag);
    setwaiting_client_confirm_refresh_flag(false);
  };

  useEffect(() => {
    let client_id_list = [];
    client_id_list.push(confirmed_client_id);
    var axios = require("axios");
    var data = JSON.stringify({
      sales_employee_id: employee_id,
      client_id_list: client_id_list,
    });

    console.log("confirm button data : ", data);
    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/confirmClientRegistrationbySales" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/confirmClientRegistrationbySales" +
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
        console.log("confirmed button clicked api : ", json_object);
        return json_object;
      })
      .then((res) => {
        setconfirm_client_information(res);
        setwaiting_client_confirm_refresh_flag(true);
        console.log("last api json response : ", res);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [client_confirm_flag]);

  const [searchTerm, setSearchTerm] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);
  console.log(searchResults);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  React.useEffect(() => {
    const results = json_information.message.all_client_information_list.filter(
      (p) =>
        p.customeR_NAME
          .toString()
          .toLowerCase()
          .includes(searchTerm.toString().toLowerCase()) ||
        p.customeR_ADDRESS
          .toString()
          .toLowerCase()
          .includes(searchTerm.toString().toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);
  useEffect(() => {
    var axios = require("axios");
    var data = JSON.stringify({
      EMPLOYEE_ID: employee_id,
      CUSTOMER_ID: waybill,
    });

    console.log("confirm button data : ", data);
    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/salesPanelClientChargeInformation" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/salesPanelClientChargeInformation" +
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
        console.log("client info: ", json_object);
        return json_object;
      })
      .then((res) => {
        setclient_information(res.message);

        console.log("last api json response : ", res);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [SubmitFlag]);

  // client charge info
  function openModal(e, way) {
    console.log("waybill", way);
    setwaybill(way);
    setSubmitFlag(!SubmitFlag);
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
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
      // backgroundColor: "rgba(255, 255, 255, 0.75)",
    },
    content: {
      // top: '50%',
      // left: '60%',
      // right: '60',
      // bottom: 'auto',
      // marginRight: '-50%',
      // transform: 'translate(-50%, -50%)',
      // backgroundColor: "#0000001a",

      backgroundColor: "white",
      color: "Black",
      position: "absolute",
      top: "70px",
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
  const searchIcon = <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>;
  return (
    <>
      <div className="bordered mt-5 ">
        {/* Invoice modal */}
        <Modal
          isOpen={IsOpen}
          style={customStyles}
          onRequestClose={closeModal}
          closeTimeoutMS={500}
          contentLabel="Example Modal"
        >
          <div className="d-flex justify-content-end">
            <button
              className="btn fw-bold btn-outline-danger rounded-pill px-4 mb-2"
              onClick={closeModal}
            >
              close
            </button>
          </div>
          <div className="d-flex mt-4">
            <div
              className="order-track shadow p-3 mb-5 rounded m-auto modal-width"
              style={{ background: "rgba(197, 213, 228, 0.25)" }}
            >
              <h4>Client Info</h4>

              <h6>
                <span>INSIDE DHAKA DELIVERY CHARGE</span>:
                <span className="badge bg-secondary">
                  {client_information &&
                    client_information.insidE_DHAKA_DELEVERY_CHARGE}
                </span>
              </h6>
              <h6>
                <span>OUTSIDE DHAKA DELIVERY CHARGE</span>:
                <span className="badge bg-secondary">
                  {client_information &&
                    client_information.outsidE_DHAKA_DELEVERY_CHARGE}
                </span>
              </h6>
              <h6>
                <span>INSIDE DHAKA DELIVERY CHARGE INCREMENT</span>:
                <span className="badge bg-secondary">
                  {client_information &&
                    client_information.insidE_DHAKA_DELEVERY_CHARGE_INCREMENT}
                </span>
              </h6>
              <h6>
                <span>OUTSIDE DHAKA DELIVERY CHARGE INCREMENT</span>:
                <span className="badge bg-secondary">
                  {client_information &&
                    client_information.outsidE_DHAKA_DELEVERY_CHARGE_INCREMENT}
                </span>
              </h6>
              <h6>
                <span>COD CHARGE</span>:
                <span className="badge bg-secondary">
                  {client_information && client_information.coD_CHARGE}
                </span>
              </h6>
              <h6>
                <span>INSIDE DHAKA RETURN CHARGE</span>:
                <span className="badge bg-secondary">
                  {client_information &&
                    client_information.insidE_DHAKA_RETURN_CHARGE}
                </span>
              </h6>
              <h6>
                <span>OUTSIDE DHAKA RETURN CHARGE</span>:
                <span className="badge bg-secondary">
                  {client_information &&
                    client_information.outsidE_DHAKA_RETURN_CHARGE}
                </span>
              </h6>
              <h6>
                <span>PICKUP CHARGE</span>:
                <span className="badge bg-secondary">
                  {client_information && client_information.pickuP_CHARGE}
                </span>
              </h6>
              <h6>
                <span>PACKING CHARGE</span>:
                <span className="badge bg-secondary">
                  {client_information && client_information.packinG_CHARGE}
                </span>
              </h6>
              <h6>
                <span>VAT TAX CHARGE</span>:
                <span className="badge bg-secondary">
                  {client_information && client_information.vaT_TAX_CHARGE}
                </span>
              </h6>
              <h6>
                <span>INSIDE DHAKA WEIGHT MIN LIM</span>:
                <span className="badge bg-secondary">
                  {client_information &&
                    client_information.insidE_DHAKA_WEIGHT_MIN_LIM}
                </span>
              </h6>
              <h6>
                <span>OUTSIDE DHAKA WEIGHT MIN LIM</span>:
                <span className="badge bg-secondary">
                  {client_information &&
                    client_information.outsidE_DHAKA_WEIGHT_MIN_LIM}
                </span>
              </h6>
              <h6>
                <span>QUALITY CHECK CHARGE</span>:{" "}
                <span className="badge bg-secondary">
                  {client_information &&
                    client_information.qualitY_CHECK_CHARGE}
                </span>
              </h6>
              <h6>
                <span>OTHER CHARGE</span>:
                <span className="badge bg-secondary">
                  {client_information && client_information.otheR_CHARGE}
                </span>
              </h6>
            </div>
          </div>
        </Modal>
      </div>
      {/* <div className="col-md-12 ">
        <abbr
          title="CSV Template"
          className=" font-weight-bolder text-monospace"
        >
          {" "}
          <CSVLink filename="Template.csv" data={csvData}>
            CSV Template
          </CSVLink>
        </abbr>
      </div>
      <div className="row n">
        <div className="col-8 mx-5">
          <div className="">
            <form>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control mx-2 border-warning border"
                  placeholder="type here......."
                  value={searchTerm}
                  onChange={handleChange}
                />
                <div className="input-group-append"></div>
              </div>
            </form>
          </div>
        </div>
      </div> */}
      {/*  */}
      <div className="row">
        <div className="col-lg-6 col-md-8 col-12 mb-2">
          <input
            style={{
              backgroundColor: "#C5D5E4",
              outline: "none",
              border: "none",
              padding: "7px",
              borderRadius: "8px",
              width: "93%",
            }}
            type="text"
            placeholder="Client Name or Address"
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-6 col-md-4 col-12 mb-2">
          <CSVLink
            filename="Template.csv"
            data={csvData}
            className="btn btn-dark  fw-bold px-4 rounded-pill"
          >
            CSV Template
          </CSVLink>
        </div>
      </div>
      {/* <form className="row">
        <div className="col-lg-6 col-md-6 col-sm-4 form-group mx-3 mt-2 p-4">
          <div className="input-group  input-icons">
            <i className="icon ">{searchIcon}</i>
            <input
              type="search"
              name=""
              id=""
              placeholder="Client Name or Address"
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
              onChange={handleChange}
            />
          </div>
          <div className=" mt-3">
            <CSVLink
              filename="Template.csv"
              data={csvData}
              className="btn btn-outline-primary  fw-bold px-4 rounded-pill"
            >
              CSV Template
            </CSVLink>
          </div>
        </div>
      </form> */}
      {/*  */}
      <div className="container-fluid">
        <div className="">
          <div className="col-md-12 mb-1 mt-5">
            <button
              className="btn btn-outline-primary px-3 rounded-pill"
              onClick={onclick}
            >
              {" "}
              Client Registration Confirm
            </button>
          </div>
        </div>
        <div>
          {showText && <Text />}

          <div id="no-more-tables">
            <ReactHTMLTableToExcel
              className="js-download-link button bg-info border border-info px-4 btn-sm mb-2 mx-2 text-white rounded-pill"
              table="clientlist"
              filename="ReportExcel"
              sheet="Sheet"
              buttonText="Export excel"
            ></ReactHTMLTableToExcel>
            <table
              className="table css-serial bg-white"
              style={{ fontSize: "13px", marginLeft: "1px" }}
              id="clientlist"
            >
              <thead
                className="text-center shadow sticky-top "
                style={{ backgroundColor: "#b4bec2", top: "60px", zIndex: "0" }}
              >
                <tr className="text-dark" style={{ border: "none" }}>
                  <th scope="col">SL</th>
                  <th scope="col">Charge Info</th>
                  <th scope="col">Client Name</th>
                  <th scope="col">Contact Number</th>
                  <th scope="col">Address</th>
                  <th scope="col">Email</th>
                  <th scope="col">Pin Code</th>
                </tr>
              </thead>
              <tbody className="text-center border border-dark">
                {/* <div>
                  {console.log(
                    "after confirming client: ",
                    waiting_client_confirm_refresh_flag
                  )}
                </div> */}
                {waiting_client_confirm_refresh_flag ||
                  searchResults.map((single_message) => {
                    return (
                      <tr key={single_message.customeR_NAME}>
                        <td data-title="SL"></td>
                        <td data-title="Charge Info">
                          <button
                            className="btn btn-sm btn-primary mt-2"
                            onClick={(e) =>
                              openModal(e, single_message.customeR_ID)
                            }
                          >
                            Charge Info
                          </button>
                        </td>
                        <td data-title="Client Name" scope="row">
                          {single_message.customeR_NAME}
                        </td>
                        <td data-title="Contact Number">
                          {single_message.customeR_PHONE_NUMBER}
                        </td>
                        <td data-title="Address" className="clientP-td-address">
                          {single_message.customeR_ADDRESS}
                        </td>
                        <td data-title="Email">
                          {single_message.customeR_EMAIL}
                        </td>
                        <td data-title="Pin Code">
                          {single_message.customeR_RETURN_PIN}
                        </td>
                      </tr>
                    );
                  })}

                {waiting_client_confirm_refresh_flag &&
                  confirm_client_information.message.confirmed_client_information_list.map(
                    (single_message) => {
                      return (
                        <tr key={single_message.customeR_NAME}>
                          <td data-title="SL"></td>
                          <td data-title="Charge Info">
                            <button
                              className="btn btn-sm btn-primary mt-2"
                              onClick={(e) =>
                                openModal(e, single_message.customeR_ID)
                              }
                            >
                              Charge Info
                            </button>
                          </td>
                          <td data-title="Client Name" scope="row">
                            {single_message.customeR_NAME}
                          </td>
                          <td data-title="Contact Number">
                            {single_message.customeR_PHONE_NUMBER}
                          </td>
                          <td
                            data-title="Address"
                            className="clientP-td-address"
                          >
                            {single_message.customeR_ADDRESS}
                          </td>
                          <td data-title="Email">
                            {single_message.customeR_EMAIL}
                          </td>
                          <td data-title="Pin Code">
                            {single_message.customeR_RETURN_PIN}
                          </td>
                        </tr>
                      );
                    }
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
const Text = () => {
  return (
    <div className="mt-5 mb-5">
      <div className="" id="no-more-tables">
        {waiting_client_payload && (
          <table
            className="table css-serial bg-white"
            style={{ fontSize: "13px", marginLeft: "1px" }}
          >
            <thead
              className="text-center shadow sticky-top "
              style={{ backgroundColor: "#b4bec2", top: "60px", zIndex: "0" }}
            >
              <tr className="text-dark" style={{ border: "none" }}>
                <th scope="col">SL</th>
                <th scope="col">Client Name</th>
                <th scope="col">Contact Number</th>
                <th scope="col">Address</th>
                <th scope="col">Email</th>
                <th scope="col">Pin Code</th>
                <th></th>
              </tr>
            </thead>

            <tbody
              className={
                waiting_client_information.message.all_client_information_list
                  ? "text-center border border-dark"
                  : ""
              }
            >
              {waiting_client_information.message.all_client_information_list.map(
                (single_message) => {
                  return (
                    <tr
                      key={single_message.customeR_NAME}
                      className="text-white bg-success"
                    >
                      <td></td>
                      <th scope="row">{single_message.customeR_NAME}</th>
                      <td>{single_message.customeR_PHONE_NUMBER}</td>
                      <td>{single_message.customeR_ADDRESS}</td>
                      <td>{single_message.customeR_EMAIL}</td>
                      <td>{single_message.customeR_RETURN_PIN}</td>
                      <td>
                        <button
                          className="btn btn-dark btn-small text-white"
                          onClick={() =>
                            client_confirm_button(single_message.customeR_ID)
                          }
                        >
                          Confirm
                        </button>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Clienttable;
