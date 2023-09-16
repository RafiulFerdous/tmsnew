import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
import Invoicesummarytable from "../../Model/Customer_content/Invoicesummarytable";
import "../css/all.css";
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
} from "../../Common/Linksidebar";
import { getCurrentTime } from "../../Common/common";

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

let clientId, setclientId;
let date_time, setdate_time;

const Invoicesummaryc = () => {
  [clientId, setclientId] = useState("");
  [date_time, setdate_time] = useState("");

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
      if (loginInformation.user_type == employee_degignation_list.Customer) {
        setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam.
        final_sideBar = CustomerCareLinksidebar;
      } else {
        if (
          loginInformation.all_user_list.employeE_DEGIGNATION ==
          employee_degignation_list.ProcessingCenter
        ) {
          setsiteBarInformation_LocalStore(Linksidebar); //useState a set kore rakhlam.
          final_sideBar = Linksidebar;
        }
      }
      setLogin_Sidebar_LocalStore(loginInformation, final_sideBar); //local store a set kore rakhlam.
      setclientId(loginInformation.all_user_list_Client.customeR_ID);
      setdate_time(getCurrentTime);
      setlogingInformation_LocalStore(loginInformation); //useState a set kore rakhlam.
      console.log(
        "value set up if: ",
        loginInformation.all_user_list_Client.customeR_ID
      );
    } else {
      if (context_flag_obj.user_type == employee_degignation_list.Customer) {
        setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam.
      } else if (
        context_flag_obj.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.ProcessingCenter
      ) {
        setsiteBarInformation_LocalStore(Linksidebar); //useState a set kore rakhlam.
      }
      setclientId(context_flag_obj.all_user_list_Client.customeR_ID);
      setdate_time(getCurrentTime);
      setlogingInformation_LocalStore(context_flag_obj);
      console.log(
        "value set up else : ",
        context_flag_obj.all_user_list_Client.customeR_ID
      );
    }
  }, []);

  useEffect(() => {
    console.log("this is", logingInformation_LocalStore);
    // setclientId(logingInformation_LocalStore.all_user_list_Client.customeR_ID);
    // setdate_time(getCurrentTime);
  }, [logingInformation_LocalStore]);

  // useEffect(() => {
  //   var axios = require("axios");
  //   var data = JSON.stringify({
  //     client_id: clientId,
  //   });

  //   console.log("Client Report api: ", data);

  //   var config = {
  //     method: "post",
  //     url: Degital_Ocean_flag
  //       ? "https://e-deshdelivery.com/universalapi/allapi/clientPanelallInvoiceSummary" +
  //         "?company_name=" +
  //         company_name
  //       : "/universalapi/allapi/clientPanelallInvoiceSummary" +
  //         "?company_name=" +
  //         company_name,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${logingInformation_LocalStore.token}`,
  //     },
  //     data: data,
  //   };

  //   axios(config)
  //     .then(function (response) {
  //       let json_object_str = JSON.stringify(response.data);
  //       let json_object = JSON.parse(json_object_str);

  //       return json_object;
  //     })
  //     .then((res) => {
  //       setinformation(res);
  //       setpayload(true);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, [clientId]);

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

        <div className="mt-5 pt-5 container">
          <div className="col-12 pt-5 d-flex" id="">
            <Invoicesummarytable />
            {/* {payload ? (
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
            )} */}
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
export default Invoicesummaryc;
