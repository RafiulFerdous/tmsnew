import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";

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
  acsidebar,
  superadminsidebar
} from "../../Common/Linksidebar";
import InvoiceSummarytable from "../../Model/Accounts/InvoiceSummarytable";
let employId, setemployId;

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

const InvoiceSummary = () => {
  const [employId, setemployId] = useState("");

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
        employee_degignation_list.Finance
      ) {
        setsiteBarInformation_LocalStore(acsidebar); //useState a set kore rakhlam.
        final_sideBar = acsidebar;
      } else if (
        loginInformation.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.DistrictIncharge
      ) {
        setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam
        final_sideBar = CustomerCareLinksidebar;
      }

      else if (
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
        employee_degignation_list.Finance
      ) {
        setsiteBarInformation_LocalStore(acsidebar); //useState a set kore rakhlam.
      } else if (
        context_flag_obj.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.DistrictIncharge
      ) {
        setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam
      }

      else if (
          context_flag_obj.all_user_list.employeE_DEGIGNATION ==
          employee_degignation_list.SuperAdmin
      ) {
        setsiteBarInformation_LocalStore(superadminsidebar); //useState a set kore rakhlam
      }
      setlogingInformation_LocalStore(context_flag_obj);
    }
  }, []);
  const [allClient, setAllClient] = useState([]);

  useEffect(() => {
    var axios = require("axios");

    var data = JSON.stringify({
      employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
    });
    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/accountPanelallInvoiceSummary" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/accountPanelallInvoiceSummary" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: data,
    };
    console.log("config", config);
    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        console.log("response is : ", json_object);
        return json_object;
      })
      .then((res) => {
        console.log("response is ", res);
        setinformation(res);
        setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });

    // .then(res => {
    //     setAllClient(res.message.all_client_name);
    //     //setpayload(true);
    //     console.log("res is here", res.message.all_client_name)
    // })

    // .catch(function (error) {
    // console.log(error);
    // });
  }, [logingInformation_LocalStore]);

  //   useEffect(()=>{
  //     var axios = require('axios');
  //     var data = JSON.stringify({

  //     "account_employee_id" :logingInformation_LocalStore.all_user_list.employeE_ID,
  //     "client_id":
  //     "start_date_time" :
  //     "end_date_time" :
  //     "current_date_time":

  //     });
  //     console.log("employee id is here",data)

  //    console.log(siteBarInformation_LocalStore);
  //     var config = {
  //       method: 'post',
  //       url: Degital_Ocean_flag ? 'https://e-deshdelivery.com/universalapi/allapi/accountPanelAllProductFinantialCondition'+'?company_name='+company_name : '/universalapi/allapi/accountPanelAllProductFinantialCondition'+'?company_name='+company_name,
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${logingInformation_LocalStore.token}`
  //       },
  //       data: data

  //     };

  //     console.log("config",config);
  //     axios(config)
  //     .then(function (response) {
  //       let json_object_str = JSON.stringify(response.data);
  //       let json_object = JSON.parse(json_object_str);
  //       console.log("response is : ",json_object);
  //       return(json_object);
  //     }).then(res => {
  //         setinformation(res);
  //         setpayload(true);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   },[logingInformation_LocalStore]);

  const handleFilter = () => {};
  const [clientName, setClientName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <>
      <div className="">
        <div className="row">
          <div className="col-12 ">
            <Navbar sidebar_manu={siteBarInformation_LocalStore} />
          </div>
        </div>
        {/* <div className="row">
                    <div className="col-12">
                        <Sidebar sidebar_manu={siteBarInformation_LocalStore} />
                    </div>
                </div> */}

        {/* <div className="row container-fluid">
                            <div className="col-6 " id="srchmenu">
                                    <Search/>
                            </div>
                       </div>
                    */}

        <div className="mt-5 pt-5 container">
          <div className="col-12 pt-5 d-flex" id="">
            {payload ? (
              <InvoiceSummarytable response={information} />
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
    </>
  );
};
export default InvoiceSummary;