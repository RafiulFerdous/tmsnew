import React, { useState, useEffect, useContext } from "react";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
import Hometable from "../../Model/Processingcenter/Hometable";
import Threepltable from "../../Model/operation_content/Threepltable";
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
import { toast } from "react-toastify";
import Loader from "../../Loader";

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
const ThreePl = () => {
  toast.configure();
  const [information, setinformation] = useState({});
  const [payload, setpayload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [employId, setemployId] = useState("");

  var { loginInformation, setloginInformation } = useContext(LoginContext);

  const [logingInformation_LocalStore, setlogingInformation_LocalStore] =
    useState(loginInformation);
  const [siteBarInformation_LocalStore, setsiteBarInformation_LocalStore] =
    useState([]);

  const [dcName, setDcName] = useState([]);
  const [allDcName, setAllDcName] = useState([]);

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
        employee_degignation_list.SuperAdmin
      ) {
        setsiteBarInformation_LocalStore(superadminsidebar); //useState a set kore rakhlam
        final_sideBar = superadminsidebar;
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
        employee_degignation_list.Operation
      ) {
        setsiteBarInformation_LocalStore(Operationsidebar); //useState a set kore rakhlam.
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
    if (allDcName.length == 0) {
      var config = {
        method: "post",
        url: Degital_Ocean_flag
          ? "https://e-deshdelivery.com/universalapi/allapi/allDcList" +
            "?company_name=" +
            company_name
          : "/universalapi/allapi/allDcList" + "?company_name=" + company_name,
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${logingInformation_LocalStore.token}`,
        //   },
      };

      axios(config)
        .then(function (response) {
          let json_object_str = JSON.stringify(response.data);
          let json_object = JSON.parse(json_object_str);
          return json_object;
        })
        .then((res) => {
          // console.log("response is 3pl ", res);
          setAllDcName(res.message);
          setpayload(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);
  // console.log("allDcName", allDcName);
  console.log("deName ", dcName);

  useEffect(() => {
    // console.log(logingInformation_LocalStore);
    // if (!logingInformation_LocalStore.token) return;
    if (dcName.length === 0) {
      toast.warning("Select DC.");
    }
    if (dcName.length != 0) {
      setIsLoading(true);
      toast.info("Searching...");
      var config = {
        method: "get",
        url: Degital_Ocean_flag
          ? "https://e-deshdelivery.com/universalapi/allapi/coverageAreaParterInformation" +
            "?company_name=" +
            company_name +
            "&" +
            "dc_name=" +
            dcName
          : "/universalapi/allapi/coverageAreaParterInformation" +
            "?company_name=" +
            company_name +
            "&" +
            "dc_name=" +
            dcName,
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${logingInformation_LocalStore.token}`,
        //   },
      };
      axios(config)
        .then(function (response) {
          let json_object_str = JSON.stringify(response.data);
          let json_object = JSON.parse(json_object_str);
          return json_object;
        })
        .then((res) => {
          console.log("response is 3pl ", res);
          setinformation(res.message);
          setpayload(true);
          setIsLoading(false);
          toast.success("Request Successful.");
        })
        .catch(function (error) {
          console.log(error);
          setIsLoading(false);
        });
    }
  }, [dcName]);
  console.log("information", information);
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
        <div className="mt-5 pt-5">
          <div className="container pt-5" id="">
            {/* <p>Welcome to {logingInformation_LocalStore.all_user_list.employeE_ZONE}</p> */}

            <div className="row">
              <div className="col-lg-6 col-md-6 col-9">
                <input
                  style={{
                    // backgroundColor: "#C5D5E4",
                    outline: "none",
                    border: "none",
                    padding: "7px",
                    borderRadius: "8px",
                    width: "93%",
                  }}
                  list="partnerLIst"
                  placeholder="Select DC"
                  className="form-control shadow"
                  onBlur={(e) => setDcName(e.target.value)}
                  // onChange={(e) => setDcName(JSON.stringify(e.target.value))}
                />
                <datalist id="partnerLIst" className="w-100">
                  <option value="All DC">All DC</option>
                  {allDcName.map((Client) => (
                    <option key={Client} value={Client}>
                      {Client}
                    </option>
                  ))}
                </datalist>
              </div>
              <div className="col-lg-1 col-md-2 col-2">
                <button className="btn btn-success px-3 btn-sm">Search</button>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="container">
            {payload ? (
              <Threepltable response={information} dcName={dcName} />
            ) : (
              <></>
              //   <div className="sk-cube-grid">
              //     {/*<div className="sk-cube sk-cube1"></div>*/}
              //     {/*<div className="sk-cube sk-cube2"></div>*/}
              //     {/*<div className="sk-cube sk-cube3"></div>*/}
              //     {/*<div className="sk-cube sk-cube4"></div>*/}
              //     {/*<div className="sk-cube sk-cube5"></div>*/}
              //     {/*<div className="sk-cube sk-cube6"></div>*/}
              //     {/*<div className="sk-cube sk-cube7"></div>*/}
              //     {/*<div className="sk-cube sk-cube8"></div>*/}
              //     {/*<div className="sk-cube sk-cube9"></div>*/}
              //   </div>
            )}
          </div>
        )}

        <div className="">
          <div className="col-12">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default ThreePl;
