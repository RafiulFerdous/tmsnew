import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
import Assigntofetable from "../../Model/Dcpanel/Assigntofetable";
import Modal from "react-modal";
// import '../css/all.css';
import axios from "axios";
import {
  BrowserRouter,
  Switch,
  Route,
  useHistory,
  useLocation,
  Link,
} from "react-router-dom";
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
  dcpanel,
} from "../../Common/Linksidebar";
import Multiselect from "multiselect-react-dropdown";
import { toast } from "react-toastify";

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

const Lostmarktable = (props) => {
  toast.configure();
  const [employId, setemployId] = useState("");
  let json_information = props.response;
  const [infoModalOpen, setinfoModalOpen] = useState(false);
  const [otp, setotp] = useState("");
  const [information, setinformation] = useState({});
  const [payload, setpayload] = useState(false);
  const [fe, setfe] = useState([]);
  const [waybill, setwaybill] = useState("");
  const [reason, setreason] = useState("");

  useEffect(() => {
    setfe(json_information);
  }, []);

  console.log("this is setfe ", fe);

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
        setsiteBarInformation_LocalStore(dcpanel); //useState a set kore rakhlam
        final_sideBar = dcpanel;
      }
      setemployId(loginInformation.all_user_list.employeE_ID);
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
        setsiteBarInformation_LocalStore(dcpanel); //useState a set kore rakhlam
      }
      setemployId(context_flag_obj.all_user_list.employeE_ID);
      setlogingInformation_LocalStore(context_flag_obj);
    }
  }, []);
  // useEffect(()=>{
  //   setemployId(logingInformation_LocalStore.all_user_list.employeE_ID);
  // },[logingInformation_LocalStore])

  const Submit = () => {
    setinfoModalOpen(true);
    let data = JSON.stringify({
      Consignee_phone_number: "8801847425245",
      //8801847425245
      fild_operative_id: 0,
      otp_dateTime: getCurrentTime(),
      product_waybill_number: waybill,
      otp_type: "Lost",
    });
    // let data1 = {
    //     "Consignee_phone_number": "8801853022516",
    //     "fild_operative_id":0,
    //     "otp_dateTime": getCurrentTime(),
    //     "product_waybill_number": waybill,
    //     "otp_type":"Lost",
    // };

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/sendOtpToConsignee" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/sendOtpToConsignee" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: data,
    };
    // console.log("otpconfig",data1)

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        return json_object;
      })
      .then((res) => {
        console.log("response is otp list", res);
        //setfelist(res.message);

        // setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function closeInvoiceModal() {
    setinfoModalOpen(false);
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

  const lostreport = () => {
    let data = JSON.stringify({
      product_waybill_number: waybill,
      lost_datetime: getCurrentTime(),
      otp_information: otp,
      employee_id: 0,
      employee_dezignation: "",
      lost_reason: reason,
      lost_reported_by: logingInformation_LocalStore.all_user_list.employeE_ID,
    });

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/lostProduct" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/lostProduct" + "?company_name=" + company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: data,
    };
    console.log("otpconfig", config);
    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        return json_object;
      })
      .then((res) => {
        console.log("response is fe list", res);
        setinformation(res.message);
        toast.info(res.message);
        setpayload(true);
        closeInvoiceModal();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      {/*<div id="lost">*/}

      <div className="bordered">
        {/* Invoice modal */}
        <Modal
          isOpen={infoModalOpen}
          style={customStyles}
          //   onRequestClose={closeInvoiceModal}
          closeTimeoutMS={200}
          contentLabel="Example Modal"
        >
          {/* <button
                        className="btn btn-outline-danger mb-2"
                        onClick={closeInvoiceModal}
                    >
                        close
                    </button> */}
          <div className="d-flex justify-content-center mt-5">
            <h4>Confirm OTP</h4>
          </div>

          <div className="d-flex flex-direction-row justify-content-center">
            <input
              placeholder="input OTP"
              type="number"
              max={4}
              value={otp}
              required
              className="form-control "
              onChange={(e) => {
                setotp(e.target.value);
              }}
            />
            <label>Reason: </label>
            <input
              required
              type="text"
              value={reason}
              placeholder="Type reason"
              list="felist"
              className="form-control w-50"
              onChange={(e) => setreason(e.target.value)}
            />
            {/*<datalist id="felist">*/}
            {/*    <option value="Parcel is lost."></option>*/}
            {/*    <option value="Parcel was hijacked"></option>*/}

            {/*    /!* {*/}
            {/*        felist.map((single_fe) => {*/}
            {/*            if(single_fe.active_or_inactive==="Active")*/}
            {/*                return(*/}
            {/*                    <option value={single_fe.field_operative_id}>{single_fe.field_operative_name}</option>*/}
            {/*                )})*/}
            {/*    } *!/*/}
            {/*</datalist>*/}
          </div>
          <div className="d-flex mt-4 justify-content-center">
            <button
              className="btn btn-outline-success mb-2"
              onClick={lostreport}
              disabled={!otp || !reason}
            >
              Submit
            </button>
          </div>
        </Modal>
      </div>
      {/* <div className="container row-col-2" id="lost">
        <div className="border  mb-5">
          <form className="row d-flex justify-content-center">
            <div className=" col-sm-4 form-group mx-3 mt-2">
              <div className=" text-center text-black mx-1">
                Product Waybill:
              </div>
              <input
                className="form-control "
                onChange={(e) => {
                  setwaybill(e.target.value);
                }}
              />
            </div>

            <div className="col-md-12 d-flex justify-content-center mt-4 mb-2">
              <button
                type="button"
                className="btn btn-outline-primary"
                disabled={!waybill}
                onClick={Submit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div> */}

      <div className="row" id="lost">
        <div className="col-lg-6 col-md-8 col-12 m-auto mt-5">
          <div className="border mb-2 p-3 rounded-3">
            <div className="row">
              <div className="col-12 col-md-4 col-lg-4">
                <p className=""> Product Waybill:</p>
              </div>
              <div className="col-12 col-md-8 col-lg-8">
                <input
                  style={{
                    backgroundColor: "#C5D5E4",
                    outline: "none",
                    border: "none",
                    padding: "7px",
                    borderRadius: "8px",
                    width: "100%",
                  }}
                  className="form-control "
                  onChange={(e) => {
                    setwaybill(e.target.value);
                  }}
                />
              </div>
              <div className="col-md-12 d-flex justify-content-center mt-3 mb-2">
                <button
                  type="button"
                  className="btn btn-success btn-sm px-4"
                  disabled={!waybill}
                  onClick={Submit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*</div>*/}
    </>
  );
};
export default Lostmarktable;
