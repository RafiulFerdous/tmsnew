import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
import "../css/all.css";
import Clienttable from "../../Model/Sales_content/Clienttable";
import Modal from "react-modal";
import { toast } from "react-toastify";
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
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import MultiwaybillTable from "../../Model/Sales_content/MultiwaybillTable";
import ClientOtpTable from "../../Model/Sales_content/ClientOtpTable";

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

export default function ClientOtp() {
  const [employId, setemployId] = useState("");
  const [information, setinformation] = useState("");
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
  useEffect(() => {
    var axios = require("axios");
    // var data = JSON.stringify({
    //     "sales_employee_id": employId
    // });

    // console.log(" Table APi: ",data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/allmerchentname" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/allmerchentname" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      //data : data
    };

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        console.log("data is here", json_object);
        return json_object;
      })
      .then((res) => {
        console.log("this is res", res);
        //setclientname(res.message);
        setinformation(res.message);
        setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [logingInformation_LocalStore]);

  return (
    <>
      <div className="bodydiv">
        <div>
          <div>
            <div className="row">
              <div className="col-12 bg-dark">
                <Navbar sidebar_manu={siteBarInformation_LocalStore} />
              </div>
            </div>
            {/* <div className="row">
                  <div className="col-12">
                   <Sidebar  sidebar_manu={siteBarInformation_LocalStore}/>
                  </div>
                  </div> */}
            {/* <div className="row container">
                            <div className="col-6 " id="srchmenu">
                                    <Search/>
                            </div>
                       </div>
                    */}
            <div className="mt-5 pt-5 container">
              <div className="col-12 pt-5 d-flex" id="">
                {payload ? (
                  <ClientOtpTable response={information} />
                ) : (
                  <div className="sk-cube-grid">
                    <div className="sk-cube sk-cube1"></div>
                    <div className="sk-cube sk-cube2"></div>
                    <div className="sk-cube sk-cube3"></div>
                    <div className="sk-cube sk-cube4"></div>
                    <div className="sk-cube sk-cube5"></div>
                    <div className="sk-cube sk-cube6"></div>
                    <div className="sk-cube sk-cube7"></div>
                    <div className="sk-cube sk-cube8"></div>
                    <div className="sk-cube sk-cube9"></div>
                  </div>
                )}
              </div>
            </div>
            <div className="">
              <div className="col-12">
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
