import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
import "../css/all.css";
import Clienttable from "../../Model/Sales_content/Clienttable";
import Modal from "react-modal";

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
} from "../../Common/Linksidebar";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  Customer: "CUSTOMER",
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

let employId, setemployId;
let date_time, setdate_time;
let clientid, setclientid;

const Parceltrackingwaybill = () => {
  const [showText, setShowText] = useState(false);
  let onclick = (e) => {
    e.preventDefault();
    setShowText(!showText);
  };
  [employId, setemployId] = useState("");
  [date_time, setdate_time] = useState("");
  [clientid, setclientid] = useState("");
  const [infoData, setinfoData] = useState([]);
  const [waybill, setwaybill] = useState([]);
  const [infoModalOpen, setinfoModalOpen] = useState(false);
  const [SubmitFlag, setSubmitFlag] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  const [information, setinformation] = useState({});
  const [payload, setpayload] = useState(false);

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
        employee_degignation_list.ProcessingCenter
      ) {
        setsiteBarInformation_LocalStore(Linksidebar); //useState a set kore rakhlam.
        final_sideBar = Linksidebar;
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
        employee_degignation_list.ProcessingCenter
      ) {
        setsiteBarInformation_LocalStore(Linksidebar); //useState a set kore rakhlam.
      } else if (
        context_flag_obj.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.DistrictIncharge
      ) {
        setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam
      }
      setlogingInformation_LocalStore(context_flag_obj);
    }
  }, []);

  function submit() {
    setSubmitFlag(!SubmitFlag);
  }

  useEffect(() => {
    // e.preventDefault();
    var axios = require("axios");

    var data = JSON.stringify({
      employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
      waybill_number: waybill,
    });

    console.log("this is data : ", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/operationPanelSingleProductInformation" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/operationPanelSingleProductInformation" +
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
        // setpickupRefreshFlag(pickupRefreshFlag => !pickupRefreshFlag);
        //  toast.success("SuccessFully Forworded", {
        //      position: toast.POSITION.TOP_CENTER, autoClose: 1500
        //  }
        //  );
        //setUsers(response.data.all_product_list)
        // console.log("successfully forworded");
        return response;
      })
      .then((res) => {
        console.log("new response", res);
        setinfoData(res.data.message);

        setinfoModalOpen(true);

        //setpayload(true);
      })
      .catch(function (error) {
        // Error
        //  if (error.response) {
        //      toast.error("Error!", {
        //          position: toast.POSITION.TOP_CENTER, autoClose: 1500
        //      });

        //  } else if (error.request) {
        //      toast.error(" Request Error!", {
        //          position: toast.POSITION.TOP_CENTER, autoClose: 1500
        //      });
        //      console.log(error.request);
        //  } else {

        //      console.log('Error', error.message);
        //  }
        console.log(error.config);
      });

    //setpickupFlag(pickupFlag => !pickupFlag);
  }, [SubmitFlag, logingInformation_LocalStore, employId]);

  function closeInvoiceModal() {
    setinfoModalOpen(false);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const customStyles = {
    overlay: {
      position: "fixed",
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
      top: "100px",
      left: "40px",
      right: "40px",
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
      <div className="bodydiv">
        <div className="row">
          <div className="col-12 bg-dark">
            <Navbar sidebar_manu={siteBarInformation_LocalStore} />
          </div>
        </div>
        {/* <div className="row">
                    <div className="col-12">
                        <Sidebar sidebar_manu={siteBarInformation_LocalStore} />
                    </div>
                </div> */}

        {/* <div className="row container">
                            <div className="col-6 " id="srchmenu">
                                    <Search/>
                            </div>
                       </div> */}

        <div className="container mt-5 pt-5">
          <div className="mb-5 pt-5">
            <form className="row d-flex justify-content-center">
              <div className="col-lg-6 col-md-6 col-sm-4 form-group mx-3 mt-2 p-4">
                <div className="input-group  input-icons">
                  <i className="icon ">{searchIcon}</i>
                  <input
                    type="search"
                    name=""
                    id=""
                    placeholder="Type Waybill here"
                    className="rounded-pill px-5 py-2  input-field"
                    style={{
                      width: "-webkit-fill-available",
                      textAlign: "start",
                      marginLeft: "15px",
                      boxShadow: "2px 3px 3px 1px #00000059",
                      outline: "none",
                      border: "none",
                    }}
                    value={waybill}
                    onChange={(e) => {
                      setwaybill(e.target.value);
                    }}
                  />

                  {/* <input
                        type="text"
                        className="form-control mx-2 border-warning border"
                        placeholder="Type Waybill here......."
                        value={waybill}
                        onChange={handleonChange}
                      /> */}
                  {/* <div className="input-group-append"  value={searchTerm} onChange={handleonChange}>

                </div> */}
                </div>
                {/* <div className="justify-content-center"> */}
                <div className="d-flex justify-content-center mt-3">
                  <button
                    type="button"
                    className="btn btn-outline-primary  fw-bold px-4 rounded-pill"
                    onClick={submit}
                  >
                    Submit
                  </button>
                </div>
                {/* </div> */}
              </div>
            </form>
          </div>
        </div>

        <div className="bordered">
          {/* Invoice modal */}
          <Modal
            isOpen={infoModalOpen}
            style={customStyles}
            onRequestClose={closeInvoiceModal}
            contentLabel="Example Modal"
          >
            <button
              className="btn btn-outline-danger mb-2"
              onClick={closeInvoiceModal}
            >
              close
            </button>
            <div>
              <h4>Datewise Status</h4>

              <table className="table table-bordered table-sm">
                <thead>
                  <th>Date time</th>
                  <th>Processing status</th>
                </thead>
                <tbody>
                  {infoData.status_datetime &&
                    infoData.status_datetime.map((single_product) => (
                      <tr>
                        <td>{single_product.date_time}</td>
                        <td>{single_product.processing_status}</td>
                      </tr>
                    ))}
                </tbody>
              </table>

              <h4>Details Info</h4>

              <h6>
                <span className="badge bg-secondary">Product Name</span>:{" "}
                {infoData.product_infor && infoData.product_infor.producT_NAME}
              </h6>
              <h6>
                <span className="badge bg-secondary">
                  Product Waybill Number
                </span>
                :{" "}
                {infoData.product_infor &&
                  infoData.product_infor.producT_WAYBILL_NUMBER}
              </h6>
              <h6>
                <span className="badge bg-secondary">Address</span>:{" "}
                {infoData.product_infor && infoData.product_infor.address}
              </h6>
              <h6>
                <span className="badge bg-secondary">
                  Product Return Address
                </span>
                :{" "}
                {infoData.product_infor &&
                  infoData.product_infor.producT_RETURN_ADDRESS}
              </h6>
              <h6>
                <span className="badge bg-secondary">Product Total</span>:{" "}
                {infoData.product_infor && infoData.product_infor.producT_TOTAL}
              </h6>
              <h6>
                <span className="badge bg-secondary">Product Type</span>:{" "}
                {infoData.product_infor && infoData.product_infor.producT_TYPE}
              </h6>
              <h6>
                <span className="badge bg-secondary">
                  Product Urgent STATUS
                </span>
                :{" "}
                {infoData.product_infor &&
                  infoData.product_infor.producT_URGENT_STATUS}
              </h6>
              <h6>
                <span className="badge bg-secondary">Product VALUE AMOUNT</span>
                :{" "}
                {infoData.product_infor &&
                  infoData.product_infor.producT_VALUE_AMOUNT}
              </h6>

              <h6>
                <span className="badge bg-secondary">Product WEIGHT</span>:{" "}
                {infoData.product_infor &&
                  infoData.product_infor.producT_WEIGHT}
              </h6>

              <h6>
                <span className="badge bg-secondary">Receiver NAME</span>:{" "}
                {infoData.product_infor && infoData.product_infor.receiveR_NAME}
              </h6>
              <h6>
                <span className="badge bg-secondary">
                  Receiver PHONE NUMBER
                </span>
                :{" "}
                {infoData.product_infor &&
                  infoData.product_infor.receiveR_PHONE_NUMBER}
              </h6>
              <h6>
                <span className="badge bg-secondary">Reference NO</span>:{" "}
                {infoData.product_infor && infoData.product_infor.referencE_NO}
              </h6>
              <h6>
                <span className="badge bg-secondary">Return PIN</span>:{" "}
                {infoData.product_infor && infoData.product_infor.returN_PIN}
              </h6>

              <h6>
                <span className="badge bg-secondary">Area CODE</span>:{" "}
                {infoData.product_infor && infoData.product_infor.areA_CODE}
              </h6>
              <h6>
                <span className="badge bg-secondary">Bag ID NUMBER</span>:{" "}
                {infoData.product_infor && infoData.product_infor.baG_ID_NUMBER}
              </h6>
              <h6>
                <span className="badge bg-secondary">Consignee NAME</span>:{" "}
                {infoData.product_infor &&
                  infoData.product_infor.consigneE_NAME}
              </h6>
              <h6>
                <span className="badge bg-secondary">Contact NUMBER</span>:{" "}
                {infoData.product_infor &&
                  infoData.product_infor.contacT_NUMBER}
              </h6>
              <h6>
                <span className="badge bg-secondary">District INCHARGE ID</span>
                :{" "}
                {infoData.product_infor &&
                  infoData.product_infor.districT_INCHARGE_ID}
              </h6>
              <h6>
                <span className="badge bg-secondary">Emergency NUMBER</span>:{" "}
                {infoData.product_infor &&
                  infoData.product_infor.emergencY_NUMBER}
              </h6>
              <h6>
                <span className="badge bg-secondary">EOD STATUS</span>:{" "}
                {infoData.product_infor && infoData.product_infor.eoD_STATUS}
              </h6>
              <h6>
                <span className="badge bg-secondary">EOD STATUS DATETIME</span>:{" "}
                {infoData.product_infor &&
                  infoData.product_infor.eoD_STATUS_DATETIME}
              </h6>
              <h6>
                <span className="badge bg-secondary">
                  EOD STATUS FINISH DATETIME
                </span>
                :{" "}
                {infoData.product_infor &&
                  infoData.product_infor.eoD_STATUS_FINISH_DATETIME}
              </h6>
              <h6>
                <span className="badge bg-secondary">Pincode</span>:{" "}
                {infoData.product_infor && infoData.product_infor.pincode}
              </h6>
              <h6>
                <span className="badge bg-secondary">Product CUSTOMER ID</span>:{" "}
                {infoData.product_infor &&
                  infoData.product_infor.producT_CUSTOMER_ID}
              </h6>
              <h6>
                <span className="badge bg-secondary">Product DELEVERED BY</span>
                :{" "}
                {infoData.product_infor &&
                  infoData.product_infor.producT_DELEVERED_BY}
              </h6>
              <h6>
                <span className="badge bg-secondary">
                  Product DELEVERY TIME
                </span>
                :{" "}
                {infoData.product_infor &&
                  infoData.product_infor.producT_DELEVERY_TIME}
              </h6>
              <h6>
                <span className="badge bg-secondary">Product DESCRIPTION</span>:{" "}
                {infoData.product_infor &&
                  infoData.product_infor.producT_DESCRIPTION}
              </h6>

              <h6>
                <span className="badge bg-secondary">Product DETAILS</span>:{" "}
                {infoData.product_infor &&
                  infoData.product_infor.producT_DETAILS}
              </h6>
              <h6>
                <span className="badge bg-secondary">Product ENTRY TIME</span>:{" "}
                {infoData.product_infor &&
                  infoData.product_infor.producT_ENTRY_TIME}
              </h6>
              <h6>
                <span className="badge bg-secondary">Product ID</span>:{" "}
                {infoData.product_infor && infoData.product_infor.producT_ID}
              </h6>
              <h6>
                <span className="badge bg-secondary">Product LOCK STATUS</span>:{" "}
                {infoData.product_infor &&
                  infoData.product_infor.producT_LOCK_STATUS}
              </h6>

              <h6>
                <span className="badge bg-secondary">Product PAYMENT TYPE</span>
                :{" "}
                {infoData.product_infor &&
                  infoData.product_infor.producT_PAYMENT_TYPE}
              </h6>
              <h6>
                <span className="badge bg-secondary">
                  Product PROCESSING STATUS
                </span>
                :{" "}
                {infoData.product_infor &&
                  infoData.product_infor.producT_PROCESSING_STATUS}
              </h6>
              <h6>
                <span className="badge bg-secondary">
                  Product PRODESSING STATUS DATETIME
                </span>
                :{" "}
                {infoData.product_infor &&
                  infoData.product_infor.producT_PRODESSING_STATUS_DATETIME}
              </h6>
            </div>
          </Modal>
        </div>

        <div className="">
          <div className="col-12">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};
export default Parceltrackingwaybill;
