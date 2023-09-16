import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
import Hometable from "../../Model/Processingcenter/Hometable";
import "../css/all.css";
import { toast } from "react-toastify";
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
  superadminsidebar,
} from "../../Common/Linksidebar";

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

const Directrto = () => {
  const [information, setinformation] = useState({});
  const [payload, setpayload] = useState(false);
  const [waybill, setwaybill] = useState("");

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
        employee_degignation_list.SuperAdmin
      ) {
        setsiteBarInformation_LocalStore(superadminsidebar); //useState a set kore rakhlam
      }
      setlogingInformation_LocalStore(context_flag_obj);
    }
  }, []);

  // useEffect(() => {
  //     console.log(logingInformation_LocalStore);
  //     if (!logingInformation_LocalStore.token) return;
  //     var config = {
  //         method: "get",
  //         url: Degital_Ocean_flag
  //             ? "https://e-deshdelivery.com/universalapi/allapi/productInPC" +
  //             "?company_name=" +
  //             company_name
  //             : "/universalapi/allapi/productInPC" + "?company_name=" + company_name,
  //         headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${logingInformation_LocalStore.token}`,
  //         },
  //     };
  //
  //     axios(config)
  //         .then(function (response) {
  //             let json_object_str = JSON.stringify(response.data);
  //             let json_object = JSON.parse(json_object_str);
  //             return json_object;
  //         })
  //         .then((res) => {
  //             console.log("response is ", res);
  //             setinformation(res);
  //             setpayload(true);
  //         })
  //         .catch(function (error) {
  //             console.log(error);
  //         });
  // }, [logingInformation_LocalStore]);

  const search = () => {
    var axios = require("axios");
    var data = JSON.stringify({
      employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
      waybill_str: waybill,
      date_time: getCurrentTime(),
    });

    console.log("this is data : ", data);
    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/directRTOMarkfromPC" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/directRTOMarkfromPC" +
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

        return response;
      })
      .then((res) => {
        console.log("this is direct rto", res);

        if (res.data.message.unsuccessful_waybill_list.length >= 1) {
          let str = "";
          res.data.message.unsuccessful_waybill_list.map((wrong_waybill) => {
            str += wrong_waybill + " ";
          });

          toast.error(
            `Wrong Waybill List ! 
            ${str}`,
            {
              position: "top-right",
              autoClose: false,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            }
          );
        }
        if (res.data.message.successful_waybill_list.length >= 1) {
          let str = "";
          res.data.message.successful_waybill_list.map((wrong_waybill) => {
            str += wrong_waybill + " ";
          });

          toast.success(
            `Product RTO Confirmed ! 
              ${str}`,
            {
              position: "top-right",
              autoClose: false,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            }
          );
        }

        //setsearchreasult(res.data.message.all_bag_information);

        //setinfoModalOpen(true);

        //setpayload(true);
      });
  };

  return (
    <>
      <div className="bodydiv">
        <div className="row">
          <div className="col-12 ">
            <Navbar sidebar_manu={siteBarInformation_LocalStore} />
          </div>
        </div>
        {/* <div className="row">
                  <div className="col-12">
                   <Sidebar sidebar_manu={siteBarInformation_LocalStore}/>
                  </div>
                  </div> */}

        {/* <div className="row container-fluid">
                            <div className="col-6 " id="srchmenu">
                                    <Search/>
                            </div>
                       </div>
                    */}

        <div className="mt-5 pt-5 container">
          <div>
            <div className="row justify-content-center">
              <div
                className="col-lg-6 col-md-8 col-11 d-flex p-3  rounded m-auto shadow-lg border"
                // style={{ backgroundColor: "#C5D5E4" }}
              >
                <p className="w-25">Enter Waybill:</p>
                <input
                  style={{
                    backgroundColor: "#C5D5E4",
                    outline: "none",
                    border: "none",
                    padding: "7px",
                    borderRadius: "8px",
                    width: "93%",
                  }}
                  className="form-control shadow"
                  onChange={(e) => {
                    setwaybill(e.target.value);
                  }}
                />
              </div>
              <div className="d-flex justify-content-center mt-2 ">
                <button
                  type="button"
                  className="btn btn-success px-4 rounded-pill btn-sm"
                  onClick={search}
                >
                  Submit
                </button>
              </div>
            </div>

            {/* <div className="container row-col-2">
              <div className="border  mb-5">
                <form className="row d-flex justify-content-center">
                  <div className=" col-sm-4 form-group mx-3 mt-2">
                    <div className=" text-center text-black mx-1">Waybill:</div>

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
                      onClick={search}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div> */}
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
export default Directrto;
