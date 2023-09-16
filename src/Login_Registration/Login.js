import { React, useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import "./modalAnimation.css";
import {
  faUser,
  faUnlockAlt,
  faCartPlus,
  faBriefcase,
  faDolly,
  faTruck,
  faChalkboardTeacher,
  faPeopleCarry,
  faShippingFast,
  faHandHolding,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";

import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../Context/loginContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Degital_Ocean_flag, company_name } from "../Common/Linksidebar";

let UserName = "",
  setUserName;
let Password = "",
  setPassword;
let waybill, setwaybill;
let searchresult, setsearchresult;

let productinfo, setproductinfo;

let Login_flag = 0,
  setLogin_flag;

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
//end of all variable declaration.................
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

const Login = () => {
  //console.log("this is login page.")
  return (
    <div>
      <Loging_card_View></Loging_card_View>
    </div>
  );
};

let Loging_card_View = () => {
  toast.configure();
  const eye = <FontAwesomeIcon icon={faEye} />;
  const [passwordShown, setPasswordShown] = useState(false);
  const [infoModalOpen, setinfoModalOpen] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  [waybill, setwaybill] = useState("")[(searchresult, setsearchresult)] =
    useState([]);
  [productinfo, setproductinfo] = useState([]);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  let history = useHistory();

  console.log("card view.");

  [UserName, setUserName] = useState("");
  [Password, setPassword] = useState("");
  [Login_flag, setLogin_flag] = useState(0);

  var { loginInformation, setloginInformation } = useContext(LoginContext);

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

  const search = () => {
    console.log("this is waybill", waybill);

    var axios = require("axios");
    var data = JSON.stringify({
      access_id: 1,
      access_token: "firstAccessToken_test_product_track",
      product_waybill: waybill,
    });
    console.log("this is data : ", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/unAuthorized_parcel_tracking" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/unAuthorized_parcel_tracking" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        //'Authorization': `Bearer ${logingInformation_LocalStore.token}`
      },
      data: data,
    };

    console.log("this is config", config);

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        console.log(response.data);

        return response;
      })
      .then((res) => {
        console.log("new response", res);
        setproductinfo(res.data.message.message);
        //setsearchresult(res.data.message.message.status_datetime)

        setinfoModalOpen(true);

        //setinfoModalOpen(true);

        //setpayload(true);
      });
  };

  //this code for user login start

  function componentDidMount() {
    var config = {
      method: "post",
      //e-deshdelivery.com
      //165.227.203.72
      //https://bridge.e-deshdelivery.com
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/loginRegistration/login?UserName=" +
          UserName +
          "&Password=" +
          Password +
          "&company_name=" +
          company_name +
          "&login_time=" +
          getCurrentTime()
        : "/loginRegistration/login?UserName=" +
          UserName +
          "&Password=" +
          Password +
          "&company_name=" +
          company_name +
          "&login_time=" +
          getCurrentTime(),
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        setloginInformation(json_object);
        return json_object;
      })
      .then((res) => {
        localStorage.clear();
        console.log("login info res", res);
        if (res.user_type == "Client") {
          // history.push("/HomeC");
          //history.push("/Waybilltrackingsales");
          history.push("/Dashboard");
          toast.success(res.status, {
            position: "top-right",
            autoClose: true,
            // hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          });
        } else if (res.user_type == "Employee") {
          console.log(
            "response outside : ",
            res.all_user_list.employeE_DEGIGNATION
          );
          if (
            res.all_user_list.employeE_DEGIGNATION ==
            employee_degignation_list.ProcessingCenter
          ) {
            history.push("/HomePC");
            toast.success(res.status, {
              position: "top-right",
              autoClose: true,
              // hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
          } else if (
            res.all_user_list.employeE_DEGIGNATION ==
            employee_degignation_list.Marketing_executive
          ) {
            console.log(
              "inside the function : ",
              res.all_user_list.employeE_DEGIGNATION
            );
            history.push("/ClientP");
            toast.success(res.status, {
              position: "top-right",
              autoClose: true,
              // hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
          } else if (
            res.all_user_list.employeE_DEGIGNATION ==
            employee_degignation_list.Operation
          ) {
            history.push("/HomeOperation");
            toast.success(res.status, {
              position: "top-right",
              autoClose: true,
              // hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
          } else if (
            res.all_user_list.employeE_DEGIGNATION ==
            employee_degignation_list.Admin
          ) {
            history.push("/employeereg");
            toast.success(res.status, {
              position: "top-right",
              autoClose: true,
              // hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
          } else if (
            res.all_user_list.employeE_DEGIGNATION ==
            employee_degignation_list.Finance
          ) {
            history.push("/shipmentd");
            toast.success(res.status, {
              position: "top-right",
              autoClose: true,
              // hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
          }

          // DC_panel
          else if (
            res.all_user_list.employeE_DEGIGNATION ==
            employee_degignation_list.DistrictIncharge
          ) {
            history.push("/Homeopsdc");
            toast.success(res.status, {
              position: "top-right",
              autoClose: true,
              // hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
          } else if (
            res.all_user_list.employeE_DEGIGNATION ==
            employee_degignation_list.SuperAdmin
          ) {
            history.push("/superhome");
            toast.success(res.status, {
              position: "top-right",
              autoClose: true,
              // hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
          } else if (
            res.all_user_list.employeE_DEGIGNATION ==
              employee_degignation_list.FieldExecutive &&
            res.all_user_list.employeE_USER_ID === "Superadmin_1121"
          ) {
            // && res.all_user_list.employeE_USER_ID==="Superadmin_1121"
            //FieldExecutive

            history.push("/Receiveparcelfe");
            toast.success(res.status, {
              position: "top-right",
              autoClose: true,
              // hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
          }
        } else history.push("/errorPage");
      })
      .catch(function (error) {
        console.log(error);

        history.push("/maintance");
      });
  }

  //user login code end

  let handleSubmit = (e) => {
    e.preventDefault();

    componentDidMount();
  };
  const something = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();

      componentDidMount();
    }
  };
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
    <section className=" gradient-form ">
      {/* modal start */}

      <div className="bordered">
        {/* Invoice modal */}
        {/*  */}

        {/*  */}
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
            <h4>Datewise Status</h4>

            {/*  */}

            {/* <div className="box">
          <section className="root">
            <figure>
              <img
                src="https://image.flaticon.com/icons/svg/970/970514.svg"
                alt
              />
              <figcaption>
                <h4>Tracking Details</h4>
                <h6>Order Id</h6>
                <h2>{parcelInformation.ordeR_ID}</h2>
              </figcaption>
            </figure>
            <div className="order-track">
              {track.map((single_track) => (
                <div className="order-track-step">
                  <div className={single_track.color}>
                    <span className="order-track-status-dot" />
                  </div>
                  <div className="order-track-text">
                    <div>
                      <div className="mx-auto text-center"></div>
                      <div className="order-track-text-stat">
                        <span>
                          {single_track.stage}- {single_track.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div> */}
            <div className="d-flex">
              <div className="order-track shadow p-3 mb-5 bg-white rounded m-auto">
                {productinfo.status_datetime &&
                  productinfo.status_datetime.map((single_product) => {
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
                  <span className="badge bg-secondary">Reason</span>:
                  {productinfo.product_infor &&
                    productinfo.product_infor.reason}
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
                {productinfo.status_datetime &&
                  productinfo.status_datetime.map((single_product) => (
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
                  <span className="badge bg-secondary">Product Waybill</span>:
                  {productinfo.product_infor &&
                    productinfo.product_infor.producT_WAYBILL_NUMBER}
                </h6>

                <h6>
                  <span className="badge bg-secondary">Product Name</span>:
                  {productinfo.product_infor &&
                    productinfo.product_infor.producT_DESCRIPTION}
                </h6>
                <h6>
                  <span className="badge bg-secondary">
                    Product Entry date{" "}
                  </span>
                  :
                  {productinfo.product_infor &&
                    productinfo.product_infor.producT_ENTRY_TIME}
                </h6>
                <h6>
                  <span className="badge bg-secondary">Product COD</span>:
                  {productinfo.product_infor &&
                    productinfo.product_infor.producT_VALUE_AMOUNT}
                </h6>
                <h6>
                  <span className="badge bg-secondary">Order ID</span>:
                  {productinfo.product_infor &&
                    productinfo.product_infor.referencE_NO}
                </h6>
                <h6>
                  <span className="badge bg-secondary">Consignee Name</span>:
                  {productinfo.product_infor &&
                    productinfo.product_infor.consigneE_NAME}
                </h6>

                <h6>
                  <span className="badge bg-secondary">Client Name</span>:
                  {productinfo.product_infor &&
                    productinfo.product_infor.merchentName}
                </h6>
              </div>
            </div>
          </div>
        </Modal>
      </div>

      {/* modal end */}

      {/* <div className="row m-0 d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-12 ">
          <div className="card rounded-3 text-black" id="login-card">
            //cut from here....
          </div>
        </div>
      </div> */}
      <div className="row login-form rounded-3 text-black m-0" id="login-card">
        <div className="col-lg-6 d-flex justify-content-center align-items-center  gradient-custom-2">
          <div className="text-black px-3 py-4 p-md-5 mx-md-4">
            <img
              src="/images/e_desh_logo.png"
              className=" w-75 img-fluid"
              alt="logo"
            />
            <h4 className="m-4 py-4 fw-bold fs-1  ">
              Logistic Solution <br />{" "}
              <span className="text-green" id="span">
                Anytime{" "}
              </span>{" "}
              <br /> Everytime...
            </h4>
          </div>
        </div>
        <div className=" col-lg-6 d-flex justify-content-center align-items-center bg-dark text-white">
          <div className="card-body px-md-5 mx-md-4">
            <form onSubmit={handleSubmit} onKeyDown={(e) => something(e)}>
              <h4 className="fw-bold text-center">Login</h4>

              <div className=" mb-4 d-flex">
                <FontAwesomeIcon icon={faUser} className="fa-lg mx-2 my-2" />
                <input
                  type="text"
                  id="form2Example11"
                  className="form-control login-input text-dark rounded-2"
                  placeholder="Username"
                  value={UserName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </div>

              <div className="input-group mb-4">
                <FontAwesomeIcon
                  icon={faUnlockAlt}
                  className="fa-lg mx-2 my-2"
                />
                <input
                  type={passwordShown ? "text" : "password"}
                  id="Password"
                  value={Password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="form-control login-input  text-dark rounded-2 position-relative"
                  style={{ height: "38px" }}
                  placeholder="Password"
                ></input>
                <span
                  className="input-group-text text-white border-0 position-absolute top-50 end-0 translate-middle-y bg-transparent"
                  style={{ zIndex: "10" }}
                  onClick={togglePasswordVisiblity}
                >
                  <FontAwesomeIcon
                    className="text-dark"
                    style={{ cursor: "pointer" }}
                    icon={faEye}
                  />
                </span>
              </div>

              <div className="text-center pt-1 mb-5 pb-1">
                <button
                  className="btn btn-success btn-block fa-lg gradient-custom-2 mb-3"
                  onClick={handleSubmit}
                  onKeyDown={(e) => something(e)}
                >
                  Login
                </button>
              </div>
            </form>

            <h4 className="fw-bold text-center" id="way">
              Search Waybill
            </h4>

            <div className=" mb-4 d-flex">
              <FontAwesomeIcon icon={faUser} className="fa-lg mx-2 my-2" />
              <input
                type="text"
                className="form-control text-white bg-dark"
                placeholder="Waybill or Order Id or Phone Number"
                value={waybill}
                onChange={(e) => {
                  setwaybill(e.target.value);
                }}
              />
            </div>

            {/* <div className="text-center pt-1 mb-5 pb-1">
                                        <button
                                            className="btn btn-success btn-block fa-lg gradient-custom-2 mb-3"
                                            onClick={search}
                                        >
                                            Search
                                        </button>
                                    </div> */}

            <div className="text-center pt-1 mb-5 pb-1">
              <Link target={"_blank"} to={`/ProductInformation/${waybill}`}>
                <button className="btn btn-success btn-block fa-lg gradient-custom-2 mb-3">
                  See information
                </button>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
