import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
import "../css/all.css";
import Ovolumetable from "../../Model/operation_content/Ovolume";
import { LoginContext } from "../../Context/loginContext";
import { SearchContext } from "../../Context/searchContext";
import { SearchButtonContext } from "../../Context/buttonContext";
import Otptable from "../../Model/operation_content/Otptable";
import { toast } from "react-toastify";
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
  Customer: "CUSTOMER",
};
let convert_time_to_time = (receive_time) => {
  let return_time = "";
  for (let i = 0; i < receive_time.length; i++) {
    if (return_time[i] == "/") return_time = return_time + "-";
    else return_time = return_time + receive_time[i];
  }
  return_time = return_time + "T15:47:28.807";
  return return_time;
};

let employId, setemployId;
let token, settoken;
let submitFlag, setsubmitFlag;

const Otp = () => {
  [employId, setemployId] = useState("");
  [token, settoken] = useState("");
  [submitFlag, setsubmitFlag] = useState("");

  const [information, setinformation] = useState({});
  const [payload, setpayload] = useState(false);
  const [token1, settoken1] = useState("");

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
        employee_degignation_list.Operation
      ) {
        setsiteBarInformation_LocalStore(Operationsidebar); //useState a set kore rakhlam.
        final_sideBar = Operationsidebar;
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
        employee_degignation_list.Operation
      ) {
        setsiteBarInformation_LocalStore(Operationsidebar); //useState a set kore rakhlam.
      } else if (
        context_flag_obj.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.DistrictIncharge
      ) {
        setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam
      } else if (
        context_flag_obj.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.SuperAdmin
      ) {
        setsiteBarInformation_LocalStore(superadminsidebar); //useState a set kore rakhlam
      }
      setlogingInformation_LocalStore(context_flag_obj);
      setemployId(context_flag_obj.all_user_list.employeE_ID);
    }
  }, []);
  let searchButtonFunction = (e) => {
    e.preventDefault();

    if (
      employId === parseInt(1121) ||
      employId === parseInt(68990) ||
      employId === parseInt(90089) ||
      employId === parseInt(230223) ||
      employId === parseInt(146) ||
      employId === parseInt(1046)
    ) {
      settoken(token);
      setsubmitFlag((submitFlag) => !submitFlag);
      if (typeof token == typeof null) {
        console.log("Value is not set. No api calling.");
      } else {
        var axios = require("axios");
        var data = JSON.stringify({
          employee_id: employId,
          employee_token: "EDESHOTP",
        });
        console.log("Api call data: ", data);
        var config = {
          method: "post",
          url: Degital_Ocean_flag
            ? "https://e-deshdelivery.com/universalapi/allapi/operationPanelOTPSupport" +
              "?company_name=" +
              company_name
            : "/universalapi/allapi/operationPanelOTPSupport" +
              "?company_name=" +
              company_name,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${logingInformation_LocalStore.token}`,
          },
          data: data,
        };
        console.log("this is ", config);
        axios(config)
          .then(function (response) {
            let json_object_str = JSON.stringify(response.data);
            let json_object = JSON.parse(json_object_str);
            // toast.success("Report show !", {
            //   position: toast.POSITION.TOP_CENTER, autoClose:1500
            // });
            console.log(json_object);
            return json_object;
          })
          .then((res) => {
            setinformation(res);
            setpayload(true);
          })
          .catch(function (error) {
            if (error.response) {
              //   toast.error("Error!", {
              //       position: toast.POSITION.TOP_CENTER, autoClose:1500
              //     });
            } else if (error.request) {
              //   toast.error(" Request Error!", {
              //       position: toast.POSITION.TOP_CENTER, autoClose:1500
              //     });
              console.log(error.request);
            } else {
              console.log("Error", error.message);
            }
            console.log(error.config);
          });
      }
    } else {
      toast.error("you are not authorize");
      // toast.warning("you are not Authorize", {
      //     position: "top-right",
      //     autoClose: false,
      //     hideProgressBar: true,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      // });
    }
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

        <div className="container mt-5 pt-5">
          <div className="col-12" id="">
            <div className="border border-dark bg-dark mb-5">
              <h3 className="text-center text-white">OTP</h3>
              <div className="container p-3">
                <div className="row justify-content-center mx-auto">
                  <div className="col-10 mx-auto">
                    <form className="form-inline">
                      <div className="d-flex justify-content-center mx-auto text-center">
                        <div className=" text-center text-white mx-1">
                          Token:{" "}
                          <input
                            type="text"
                            className="input-small "
                            value={token1}
                            onChange={(e) => {
                              settoken1(e.target.value);
                            }}
                          />
                          {/*onChange={(e)=>{ settoken(e.target.value) }}*/}
                        </div>
                      </div>
                      <div className="mx-auto text-center">
                        <button
                          type="submit"
                          className="btn btn-info text-white mt-5"
                          onClick={searchButtonFunction}
                          // disabled={!token}
                        >
                          Confirm
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div></div>
            {payload ? (
              <Otptable response={information} />
            ) : (
              <h4 className="text-center">Enter Token</h4>
            )}
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
export default Otp;
