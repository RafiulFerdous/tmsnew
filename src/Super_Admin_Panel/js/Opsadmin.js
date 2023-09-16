import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
import {
  company_name,
  superadminsidebar,
  Linksidebar,
  CustomerCareLinksidebar,
  Salessidebar,
  Operationsidebar,
  Hrsidebar,
  Degital_Ocean_flag,
} from "../../Common/Linksidebar";
import { LoginContext } from "../../Context/loginContext";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "react-modal";
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

const Opsadmin = () => {
  toast.configure();

  const [infoModalOpen, setinfoModalOpen] = useState(false);
  const [infoModalOpen1, setinfoModalOpen1] = useState(false);
  const [infoModalOpen2, setinfoModalOpen2] = useState(false);
  const [infoModalOpen3, setinfoModalOpen3] = useState(false);
  const [information, setinformation] = useState({});
  const [payload, setpayload] = useState(false);
  const [waybill, setwaybill] = useState("");
  const [waybillret, setwaybillret] = useState("");
  const [waybillpick, setwaybillpick] = useState("");
  const [waybillunpick, setwaybillunpick] = useState("");

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
        employee_degignation_list.Admin
      ) {
        setsiteBarInformation_LocalStore(Hrsidebar); //useState a set kore rakhlam.
        final_sideBar = Hrsidebar;
      } else if (
        loginInformation.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.DistrictIncharge
      ) {
        setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam
        final_sideBar = CustomerCareLinksidebar;
      } else if (
        loginInformation.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.SuperAdmin
      ) {
        setsiteBarInformation_LocalStore(superadminsidebar); //useState a set kore rakhlam
        final_sideBar = superadminsidebar;
      }

      setLogin_Sidebar_LocalStore(loginInformation, final_sideBar); //local store a set kore rakhlam.
      setlogingInformation_LocalStore(loginInformation); //useState a set kore rakhlam.
    } else {
      if (
        context_flag_obj.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.Admin
      ) {
        setsiteBarInformation_LocalStore(Hrsidebar); //useState a set kore rakhlam.
      } else if (
        context_flag_obj.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.DistrictIncharge
      ) {
        setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam
      } else if (
        loginInformation.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.SuperAdmin
      ) {
        setsiteBarInformation_LocalStore(superadminsidebar); //useState a set kore rakhlam
        //final_sideBar = superadminsidebar;
      } else if (
        loginInformation.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.Operation
      ) {
        setsiteBarInformation_LocalStore(Operationsidebar); //useState a set kore rakhlam
        final_sideBar = Operationsidebar;
      } else if (
        context_flag_obj.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.SuperAdmin
      ) {
        setsiteBarInformation_LocalStore(superadminsidebar); //useState a set kore rakhlam
      }
      setlogingInformation_LocalStore(context_flag_obj);
    }
  }, []);
  const search = () => {
    // e.preventDefault()
    //if (!logingInformation_LocalStore.token) return;

    var data = JSON.stringify({
      employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
      waybill_string: waybill,
      date_time: getCurrentTime(),
    });

    var axios = require("axios");

    console.log("This is data: ", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/superAdmin_deliveredToUndelivered" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/superAdmin_deliveredToUndelivered" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: data,
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
        console.log("sal3es otp api call", res);
        if (res.message.successful_list.length >= 1) {
          let msg;
          res.message.successful_list.map((single) => {
            msg += single;
          });
          toast.success("Successful Delivered to Undelivered" + msg);
        } else if (res.message.unsuccessful_list.length >= 1) {
          let msg;
          res.message.unsuccessful_list.map((single) => {
            msg += single;
          });
          toast.error("Unsuccessful Delivered to Undelivered" + msg);
        }

        setinformation(res.message);
        setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const search1 = () => {
    // e.preventDefault()
    if (!logingInformation_LocalStore.token) return;

    var data = JSON.stringify({
      employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
      waybill_string: waybillret,
      date_time: getCurrentTime(),
    });

    var axios = require("axios");

    console.log("Locked api: ", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/superAdmin_returnToUndelivered" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/superAdmin_returnToUndelivered" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: data,
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
        console.log("sal3es otp api call", res);
        if (res.message.successful_list.length >= 1) {
          let msg;
          res.message.successful_list.map((single) => {
            msg += single;
          });
          toast.success("Successful Returned to Undelivered" + msg);
        } else if (res.message.unsuccessful_list.length >= 1) {
          let msg;
          res.message.unsuccessful_list.map((single) => {
            msg += single;
          });
          toast.error("Unsuccessful Returned to Undelivered" + msg);
        }
        setinformation(res.message);
        setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const search2 = () => {
    // e.preventDefault()
    if (!logingInformation_LocalStore.token) return;

    var data = JSON.stringify({
      employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
      waybill_string: waybillpick,
      date_time: getCurrentTime(),
    });

    var axios = require("axios");

    console.log("Locked api: ", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/superAdmin_picktoUnPick" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/superAdmin_picktoUnPick" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: data,
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
        console.log("sal3es otp api call", res);
        if (res.message.successful_list.length >= 1) {
          let msg;
          res.message.successful_list.map((single) => {
            msg += single;
          });
          toast.success("Successful picked to Unpicked" + msg);
        } else if (res.message.unsuccessful_list.length >= 1) {
          let msg;
          res.message.unsuccessful_list.map((single) => {
            msg += single;
          });
          toast.error("Unsuccessful picked to Unpicked" + msg);
        }
        setinformation(res.message);
        setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const search3 = () => {
    // e.preventDefault()
    if (!logingInformation_LocalStore.token) return;

    var data = JSON.stringify({
      employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
      waybill_string: waybillunpick,
      date_time: getCurrentTime(),
    });

    var axios = require("axios");

    console.log("Locked api: ", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/superAdmin_UnpicktoPick" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/superAdmin_UnpicktoPick" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: data,
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
        console.log("sal3es otp api call", res);
        if (res.message.successful_list.length >= 1) {
          let msg;
          res.message.successful_list.map((single) => {
            msg += single;
          });
          toast.success("Successful unpicked to picked" + msg);
        } else if (res.message.unsuccessful_list.length >= 1) {
          let msg;
          res.message.unsuccessful_list.map((single) => {
            msg += single;
          });
          toast.error("Unsuccessful unpicked to picked" + msg);
        }
        setinformation(res.message);
        setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function closeInvoiceModal() {
    setinfoModalOpen(false);
  }
  function closeInvoiceModal1() {
    setinfoModalOpen1(false);
  }

  function closeInvoiceModal2() {
    setinfoModalOpen2(false);
  }

  function closeInvoiceModal3() {
    setinfoModalOpen3(false);
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
      top: "80px",
      left: "25%",
      right: "25%",
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
                   <Sidebar sidebar_manu={siteBarInformation_LocalStore}/>
              </div>
            </div> */}
        <Modal
          isOpen={infoModalOpen}
          style={customStyles}
          onRequestClose={closeInvoiceModal}
          closeTimeoutMS={200}
          contentLabel="Example Modal"
        >
          <button
            className="btn btn-outline-danger mb-2"
            onClick={closeInvoiceModal}
          >
            close
          </button>
          <div>
            <div className="input-group mx-2 my-3 w-75">
              Multiple Delivered Waybill :
              <input
                className="form-control"
                value={waybill}
                onChange={(e) => setwaybill(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={(e) => {
                search();
              }}
            >
              Confirm
            </button>
          </div>
        </Modal>
        <Modal
          isOpen={infoModalOpen1}
          style={customStyles}
          onRequestClose={closeInvoiceModal1}
          closeTimeoutMS={200}
          contentLabel="Example Modal"
        >
          <button
            className="btn btn-outline-danger mb-2"
            onClick={closeInvoiceModal1}
          >
            close
          </button>
          <div>
            <div className="input-group mx-2 my-3 w-75">
              Multiple Returned Waybill :
              <input
                className="form-control"
                value={waybillret}
                onChange={(e) => setwaybillret(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={(e) => {
                search1();
              }}
            >
              Confirm
            </button>
          </div>
        </Modal>

        <Modal
          isOpen={infoModalOpen2}
          style={customStyles}
          onRequestClose={closeInvoiceModal2}
          closeTimeoutMS={200}
          contentLabel="Example Modal"
        >
          <button
            className="btn btn-outline-danger mb-2"
            onClick={closeInvoiceModal2}
          >
            close
          </button>
          <div>
            <div className="input-group mx-2 my-3 w-75">
              Multiple Picked Waybill :
              <input
                className="form-control"
                value={waybillpick}
                onChange={(e) => setwaybillpick(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={(e) => {
                search2();
              }}
            >
              Confirm
            </button>
          </div>
        </Modal>

        <Modal
          isOpen={infoModalOpen3}
          style={customStyles}
          onRequestClose={closeInvoiceModal3}
          closeTimeoutMS={200}
          contentLabel="Example Modal"
        >
          <button
            className="btn btn-outline-danger mb-2"
            onClick={closeInvoiceModal3}
          >
            close
          </button>
          <div>
            <div className="input-group mx-2 my-3 w-75">
              Multiple UnPicked Waybill :
              <input
                className="form-control"
                value={waybillunpick}
                onChange={(e) => setwaybillunpick(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={(e) => {
                search3();
              }}
            >
              Confirm
            </button>
          </div>
        </Modal>

        <div className="mt-5 pt-5 ">
          <div className="row m-0 px-5 mt-5" id="">
            {/* <h1>KPI</h1> */}
            <div className="text-center pt-1 col-12 col-md-3 col-sm-6">
              <button
                className="btn btn-success btn-block fa-lg gradient-custom-2 mb-3"
                onClick={(e) => setinfoModalOpen(true)}
              >
                Delivered to Undelivered
              </button>
            </div>
            <div className="text-center p-2 pt-1 col-12 col-md-3 col-sm-6">
              <button
                className="btn btn-success btn-block fa-lg gradient-custom-2 mb-3"
                onClick={(e) => setinfoModalOpen1(true)}
              >
                Returned to Undelivered
              </button>
            </div>

            <div className="text-center p-2 pt-1 col-12 col-md-3 col-sm-6">
              <button
                className="btn btn-success btn-block fa-lg gradient-custom-2 mb-3"
                onClick={(e) => setinfoModalOpen2(true)}
              >
                Picked To Unpicked
              </button>
            </div>

            <div className="text-center p-2 pt-1 col-12 col-md-3 col-sm-6">
              <button
                className="btn btn-success btn-block fa-lg gradient-custom-2 mb-3"
                onClick={(e) => setinfoModalOpen3(true)}
              >
                UnPicked To picked
              </button>
            </div>
          </div>
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
export default Opsadmin;
