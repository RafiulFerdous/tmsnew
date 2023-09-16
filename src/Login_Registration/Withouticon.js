import { React, useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import { faUser, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
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

let User_Information = {},
  setUser_Information;
let Login_flag = 0,
  setLogin_flag;

let employee_information = {
  token: null,
  user_type: null,
  expiration: null,
  all_user_list: {
    employeE_ID: null,
    employeE_NAME: null,
    employeE_USER_ID: null,
    employeE_PASSWORD: null,
    employeE_ADDRESS: null,
    employeE_ZONE: null,
    employeE_DEGIGNATION: null,
    employeE_TYPE: null,
    employeE_CONTACT: null,
    employeE_EMERGENCY_CONTACT: null,
    employeE_EMAIL: null,
    employeE_CREATION_DATE: null,
  },
};

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
  [User_Information, setUser_Information] = useState(employee_information);
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
      color: "orange",
      position: "absolute",
      top: "50px",
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

  function componentDidMount() {
    var config = {
      method: "post",
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
        if (res.user_type == "Client") {
          history.push("/HomeC");
          toast.success(res.status, {
            position: "top-right",
            autoClose: false,
            hideProgressBar: true,
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
              autoClose: false,
              hideProgressBar: true,
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
              autoClose: false,
              hideProgressBar: true,
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
              autoClose: false,
              hideProgressBar: true,
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
              autoClose: false,
              hideProgressBar: true,
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
              autoClose: false,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
          }

          // DC_panel
          else if (
            res.all_user_list.employeE_DEGIGNATION ==
            employee_degignation_list.DistrictIncharge
          ) {
            history.push("/Homedc");
            toast.success(res.status, {
              position: "top-right",
              autoClose: false,
              hideProgressBar: true,
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
              autoClose: false,
              hideProgressBar: true,
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
                  productinfo.status_datetime.map((single_product) => (
                    <div className="order-track-step h-100">
                      <div className="bg-success">
                        <span className="order-track-status-dot"></span>
                      </div>
                      <div className="order-track-text">
                        <div className="">
                          <div className="order-track-text-stat border-bottom">
                            <span className=" d-inline-block d-flex ">
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
                  ))}
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
              <span className="badge bg-secondary">Product Entry date </span>:
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
        </Modal>
      </div>

      {/* modal end */}

      <div className="row m-0 d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-12 ">
          <div className="card rounded-3 text-black" id="login-card">
            <div className="row login-form">
              <div className="col-lg-6 d-flex justify-content-center align-items-center  gradient-custom-2">
                <div className="text-black px-3 py-4 p-md-5 mx-md-4">
                  <img
                    src="/images/e_desh_logo.png"
                    className=" w-75 img-fluid"
                    alt="logo"
                  />
                  <h4 className="m-4 py-4 fw-bold fs-1  ">
                    At Your Service <br />{" "}
                    <span className="text-green" id="span">
                      Anytime{" "}
                    </span>{" "}
                    <br /> Everytime...
                  </h4>
                </div>
              </div>
              <div className=" col-lg-6 d-flex justify-content-center align-items-center bg-dark text-white">
                <div className="card-body p-md-5 mx-md-4">
                  <form onSubmit={handleSubmit} onKeyDown={(e) => something(e)}>
                    <h4 className="fw-bold mx-auto w-25 fs-1 h-75">Login</h4>

                    <div className=" mb-4 d-flex">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="fa-lg mx-2 my-2"
                      />
                      <input
                        type="text"
                        id="form2Example11"
                        className="form-control login-input bg-dark"
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
                        className="form-control login-input bg-dark"
                        placeholder="Password"
                      ></input>
                      <span
                        className="input-group-text bg-dark text-white border-0"
                        onClick={togglePasswordVisiblity}
                      >
                        <FontAwesomeIcon icon={faEye} />
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

                  <h4 className="fw-bold mx-auto w-25 fs-1 h-75" id="way">
                    Search Waybill
                  </h4>

                  <div className=" mb-4 d-flex">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="fa-lg mx-2 my-2"
                    />
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

                  <div className="text-center pt-1 mb-5 pb-1">
                    <button
                      className="btn btn-success btn-block fa-lg gradient-custom-2 mb-3"
                      onClick={search}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    // <div className="container-fluid" id="bc_a">
    //     <div className="row maxx_hheight justify-content-center mx-auto align-items-center">
    //         <div className="col-sm-10 col-md-8 col-lg-5 text-align-center mx-auto">
    //             <div className="card card-body mx-auto text-align-center my-4 card_border_redius box_shadow">

    //                 <div className="container">
    //                     <div className="row justify-content-center mx-auto">
    //                         <div className="col-6">
    //                             <img className="d-block w-100" src="/images/e_desh_logo.png"></img>
    //                         </div>
    //                     </div>
    //                 </div>

    //                 <div className="card-title text-center text-white mt-5">
    //                     <h6 className="text-dark">Please Login</h6>
    //                 </div>

    //                 <div className="text-center mt-2">
    //                     <form className="mx-auto text-center"  onSubmit={handleSubmit} onKeyDown={(e) => something(e) }>
    //                         <div className="input-group mx-2">
    //                             <div className="input-group-prepand">
    //                                <span><FontAwesomeIcon icon={faUser} className="fa-lg mt-1"/></span>
    //                             </div>
    //                             <label htmlFor="UserName"></label>
    //                             <input type="text" id="UserName" className="shadow-lg form-control mx-2 bg-white rounded" placeholder="UserName" value={UserName} onChange={(e)=>{ setUserName(e.target.value) }}></input>
    //                         </div>

    //                         <div className="input-group mx-2 my-3">
    //                             <div className="input-group-prepand">
    //                                 <span><FontAwesomeIcon icon={faUnlockAlt} className="fa-lg mt-1"/></span>
    //                             </div>
    //                             <label htmlFor="Password"></label>

    //                             <input type={passwordShown ? "text" : "password"} id="Password" className="shadow-lg form-control form-control-md mx-2 bg-white rounded" placeholder="Password" value={Password} onChange={(e)=>{ setPassword(e.target.value) }} ></input>

    //                         </div>

    //                     </form>
    //                     <i onClick={togglePasswordVisiblity} className="">Hide/Show</i>
    //                 </div>

    //                 <div className="ms-auto">
    //                     <button className="ms-auto text-center btn btn-primary btn-sm my-3" onClick={handleSubmit} onKeyDown={(e) => something(e) }>Submit</button>
    //                 </div>

    //             </div>
    //         </div>
    //     </div>
    // </div>
  );
};

export default Login;
