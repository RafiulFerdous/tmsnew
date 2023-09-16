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
  superadminsidebar,
} from "../../Common/Linksidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faCartPlus,
  faChalkboardTeacher,
  faHandHolding,
  faPeopleCarry,
  faSearch,
  faShippingFast,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";

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
        employee_degignation_list.Marketing_executive
      ) {
        setsiteBarInformation_LocalStore(Salessidebar); //useState a set kore rakhlam.
        final_sideBar = Salessidebar;
      } else if (
        loginInformation.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.DistrictIncharge
      ) {
        setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam
        final_sideBar = CustomerCareLinksidebar;
      }
      //useState a set kore rakhlam.
      setLogin_Sidebar_LocalStore(loginInformation, final_sideBar); //local store a set kore rakhlam.
      setemployId(loginInformation.all_user_list.employeE_ID);
      setlogingInformation_LocalStore(loginInformation); //useState a set kore rakhlam.
      console.log(
        "value set up if: ",
        loginInformation.all_user_list.employeE_ID
      );
    } else {
      if (
        context_flag_obj.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.Marketing_executive
      ) {
        setsiteBarInformation_LocalStore(Salessidebar); //useState a set kore rakhlam.
      } else if (
        context_flag_obj.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.SuperAdmin
      ) {
        setsiteBarInformation_LocalStore(superadminsidebar); //useState a set kore rakhlam
      }
      setlogingInformation_LocalStore(context_flag_obj);
      setemployId(context_flag_obj.all_user_list.employeE_ID);
      setlogingInformation_LocalStore(context_flag_obj);
      console.log(
        "value set up else : ",
        context_flag_obj.all_user_list.employeE_ID
      );
    }
  }, []);

  useEffect(() => {
    setemployId(logingInformation_LocalStore.all_user_list.employeE_ID);
  }, [logingInformation_LocalStore]);

  function submit() {
    setSubmitFlag(!SubmitFlag);
  }

  useEffect(() => {
    // e.preventDefault();
    var axios = require("axios");

    var data = JSON.stringify({
      employee_id: employId,
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
      backgroundColor: "#0000001a",
      color: "orange",
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
  const searchIcon = <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>;

  const productIcon = <FontAwesomeIcon icon={faCartPlus}></FontAwesomeIcon>;
  const bagIcon = <FontAwesomeIcon icon={faBriefcase}></FontAwesomeIcon>;
  const transitIcon = <FontAwesomeIcon icon={faShippingFast}></FontAwesomeIcon>;
  const deliveryIcon = <FontAwesomeIcon icon={faTruck}></FontAwesomeIcon>;
  const fEIcon = <FontAwesomeIcon icon={faChalkboardTeacher}></FontAwesomeIcon>;

  const deliveryHandIcon = (
    <FontAwesomeIcon icon={faHandHolding}></FontAwesomeIcon>
  );
  const productReceiveIcon = (
    <FontAwesomeIcon icon={faPeopleCarry}></FontAwesomeIcon>
  );
  return (
    <>
      <div className="bodydiv">
        <div className="row">
          <div className="col-12 bg-dark">
            <Navbar sidebar_manu={siteBarInformation_LocalStore} />
          </div>
        </div>

        <div className="container mt-5 pt-5">
          <div className=" mt-5 mb-5">
            {/*  */}
            <div className="row">
              <div className="col-8 m-auto">
                <div className="container  shadow my-3 py-3 rounded single-product-upload-bg">
                  <div className="row ">
                    <div className="col-lg-2 col-md-2 col-11">Waybill:</div>
                    <div className="col-lg-10 col-md-10 col-11">
                      <input
                        style={{
                          outline: "none",
                          border: "none",
                          padding: "7px",
                          borderRadius: "8px",
                          width: "93%",
                        }}
                        type="text"
                        // placeholder="Waybill"
                        value={waybill}
                        onChange={(e) => {
                          setwaybill(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 d-flex justify-content-center mt-4 mb-2">
                    <button
                      type="button"
                      className="btn btn-success px-4 btn-sm rounded-3"
                      onClick={submit}
                    >
                      submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bordered">
          {/* Invoice modal */}
          <Modal
            isOpen={infoModalOpen}
            style={customStyles}
            onRequestClose={closeInvoiceModal}
            contentLabel="Example Modal"
            closeTimeoutMS={500}
          >
            <button
              className="btn btn-outline-danger mb-2"
              onClick={closeInvoiceModal}
            >
              close
            </button>
            <div>
              {/*  */}
              <div className="d-flex">
                <div className="order-track shadow p-3 mb-5 bg-white rounded m-auto">
                  <h4>Datewise Status</h4>
                  {infoData.status_datetime &&
                    infoData.status_datetime.map((single_product) => {
                      return (
                        <div className="order-track-step h-100">
                          <div className="bg-success d-flex">
                            <span className="text-warning p-2 m-auto">
                              {/* order-track-status-dot */}
                              {single_product.processing_status ==
                              "Product in System"
                                ? productIcon
                                : single_product.processing_status ==
                                  "Product in Bag"
                                ? bagIcon
                                : single_product.processing_status ==
                                  "Product in Transit "
                                ? transitIcon
                                : single_product.processing_status ==
                                  "RECEIVED BY DC (OK) "
                                ? deliveryIcon
                                : single_product.processing_status ==
                                  "Product Assign to FE "
                                ? fEIcon
                                : single_product.processing_status ==
                                  "Product Received by FE "
                                ? productReceiveIcon
                                : single_product.processing_status ==
                                  "Product Delivered "
                                ? deliveryHandIcon
                                : productIcon}
                            </span>
                          </div>
                          <div className="order-track-text">
                            <div className="">
                              <div className="order-track-text-stat ">
                                <span className=" d-inline-block d-flex border-bottom">
                                  {single_product.processing_status}
                                  {"  : "}
                                  <span className="justify-content-end">
                                    {" "}
                                    {single_product.date_time}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                  <h6>
                    <span className="badge bg-secondary">Reason : </span>:{" "}
                    {infoData.product_infor && infoData.product_infor.reason}
                  </h6>
                </div>
              </div>
              {/*  */}

              {/* <table className="table table-bordered table-sm">
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
              </table> */}

              <div className="d-flex">
                <div className="order-track shadow p-3 mb-5 bg-white rounded m-auto modal-width">
                  <h4>Details Info</h4>

                  <h6>
                    <span className="badge bg-secondary">Product Name</span>:{" "}
                    {infoData.product_infor &&
                      infoData.product_infor.producT_NAME}
                  </h6>

                  <h6>
                    <span className="badge bg-secondary">Merchant Name</span>:{" "}
                    {infoData.product_infor &&
                      infoData.product_infor.merchentName}
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
                    {infoData.product_infor &&
                      infoData.product_infor.producT_TOTAL}
                  </h6>
                  <h6>
                    <span className="badge bg-secondary">Product Type</span>:{" "}
                    {infoData.product_infor &&
                      infoData.product_infor.producT_TYPE}
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
                    <span className="badge bg-secondary">
                      Product VALUE AMOUNT
                    </span>
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
                    {infoData.product_infor &&
                      infoData.product_infor.receiveR_NAME}
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
                    {infoData.product_infor &&
                      infoData.product_infor.referencE_NO}
                  </h6>
                  <h6>
                    <span className="badge bg-secondary">Return PIN</span>:{" "}
                    {infoData.product_infor &&
                      infoData.product_infor.returN_PIN}
                  </h6>

                  <h6>
                    <span className="badge bg-secondary">Area CODE</span>:{" "}
                    {infoData.product_infor && infoData.product_infor.areA_CODE}
                  </h6>
                  <h6>
                    <span className="badge bg-secondary">Bag ID NUMBER</span>:{" "}
                    {infoData.product_infor &&
                      infoData.product_infor.baG_ID_NUMBER}
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
                    <span className="badge bg-secondary">
                      District INCHARGE ID
                    </span>
                    :{" "}
                    {infoData.product_infor &&
                      infoData.product_infor.districT_INCHARGE_ID}
                  </h6>
                  <h6>
                    <span className="badge bg-secondary">Emergency NUMBER</span>
                    :{" "}
                    {infoData.product_infor &&
                      infoData.product_infor.emergencY_NUMBER}
                  </h6>
                  <h6>
                    <span className="badge bg-secondary">EOD STATUS</span>:{" "}
                    {infoData.product_infor &&
                      infoData.product_infor.eoD_STATUS}
                  </h6>
                  <h6>
                    <span className="badge bg-secondary">
                      EOD STATUS DATETIME
                    </span>
                    :{" "}
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
                    <span className="badge bg-secondary">
                      Product CUSTOMER ID
                    </span>
                    :{" "}
                    {infoData.product_infor &&
                      infoData.product_infor.producT_CUSTOMER_ID}
                  </h6>
                  <h6>
                    <span className="badge bg-secondary">
                      Product DELEVERED BY
                    </span>
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
                    <span className="badge bg-secondary">
                      Product DESCRIPTION
                    </span>
                    :{" "}
                    {infoData.product_infor &&
                      infoData.product_infor.producT_DESCRIPTION}
                  </h6>

                  <h6>
                    <span className="badge bg-secondary">Product DETAILS</span>:{" "}
                    {infoData.product_infor &&
                      infoData.product_infor.producT_DETAILS}
                  </h6>
                  <h6>
                    <span className="badge bg-secondary">
                      Product ENTRY TIME
                    </span>
                    :{" "}
                    {infoData.product_infor &&
                      infoData.product_infor.producT_ENTRY_TIME}
                  </h6>
                  <h6>
                    <span className="badge bg-secondary">Product ID</span>:{" "}
                    {infoData.product_infor &&
                      infoData.product_infor.producT_ID}
                  </h6>
                  <h6>
                    <span className="badge bg-secondary">
                      Product LOCK STATUS
                    </span>
                    :{" "}
                    {infoData.product_infor &&
                      infoData.product_infor.producT_LOCK_STATUS}
                  </h6>

                  <h6>
                    <span className="badge bg-secondary">
                      Product PAYMENT TYPE
                    </span>
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
                      Product PRODESSING STATUS DATE
                    </span>
                    :{" "}
                    {infoData.product_infor &&
                      infoData.product_infor.producT_PRODESSING_STATUS_DATETIME}
                  </h6>
                </div>
              </div>
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
