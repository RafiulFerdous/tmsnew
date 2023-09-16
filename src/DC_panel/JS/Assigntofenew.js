import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
import Assigntofetable from "../../Model/Dcpanel/Assigntofetable";
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

const Assigntofenew = () => {
    const [employId, setemployId] = useState("");
     const [dispatch, setDispatch] = useState([]);

  const [information, setinformation] = useState([]);
  const [reFetch, setReFetch] = useState(false);
  const [reFetchSuccess, setReFetchSuccess] = useState(false);
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
        employee_degignation_list.SuperAdmin
      ) {
        setsiteBarInformation_LocalStore(superadminsidebar); //useState a set kore rakhlam.
        final_sideBar = superadminsidebar;
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
        employee_degignation_list.SuperAdmin
      ) {
        setsiteBarInformation_LocalStore(superadminsidebar); //useState a set kore rakhlam.
        final_sideBar = superadminsidebar;
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

  useEffect(() => {
    setpayload(false);
    console.log(siteBarInformation_LocalStore);
    let data = JSON.stringify({
      district_in_charge_id:
        logingInformation_LocalStore.all_user_list.employeE_ID,
    });
    console.log("fedata", data);
    //this is for configuration file
    var config = {
      //==========Mrthod==============//
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/getProductinDcNew" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/getProductinDcNew" +
          "?company_name=" +
          company_name,
      //============headers==========//
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: data,
    };

    console.log("feconfig", config);

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        return json_object;
      })
      .then((res) => {
        console.log("response is product list", res);
        setinformation(res?.data);
        setpayload(!payload);
        // setReFetchSuccess(!reFetchSuccess);
      })
      .catch(function (error) {
        setpayload(!payload);
        console.log(error);
      });
  }, [logingInformation_LocalStore]);
    
  //   useEffect(() => {
  //   let temp = [];
  //   information.message?.map((product) => {
  //     product?.all_Products_of_Bag?.map((single_product) => {
  //       temp.push(single_product);
  //       setDispatch(temp);
  //     });
  //   });
  // }, [payload]);

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
              
              <div className="col-12 col-lg-3 col-md-4">
              
            </div>

        <div className="mt-5 pt-5 container">

          <div
                className="rounded rounded-3 bg-primary"
                // id="dashboard-card"
              >
                <div className="card-body text-white">
                  <h5 className="card-title">Total Shipment</h5>
                  <span className="card-title">
                    <b>{information.length}</b>
                  </span>
                </div>
              </div>
                  <div className="" id="menuhome">
                      
                      <table
            className="table bg-white"
            style={{ fontSize: "13px", marginLeft: "1px" }}
          >
            <thead
              className="text-center shadow sticky-top "
              style={{ backgroundColor: "#b4bec2", top: "60px", zIndex: "0" }}
            >
              <tr className="text-dark" style={{ border: "none" }}>
                
                <th>ID</th>
                <th>WAYBILL NUMBER</th>
                <th>Reference NO</th>
                <th>Product NAME</th>
                <th>Consignee NAME</th>
                <th>Address</th>
                <th>DETAILS</th>
                <th>DC ID</th>
                <th>AMOUNT</th>
                <th>Picked Date</th>
              </tr>
            </thead>

            <tbody className="text-center border border-dark">
              {information
                // .filter((e) => {
                //   if (!searchValue || searchValue.trim() === "") {
                //     return true;
                //   }

                //   const searchValuesArray = searchValue
                //     .split(",")
                //     .map((value) => value.trim().toLowerCase());

                //   return searchValuesArray.some(
                //     (searchItem) =>
                //       e.producT_WAYBILL_NUMBER
                //         .toString()
                //         .toLowerCase()
                //         .includes(searchItem) ||
                //       e.referencE_NO
                //         .toString()
                //         .toLowerCase()
                //         .includes(searchItem)
                //   );
                // })
                // .filter((e) => {
                //   return searchValue && searchValue.toLowerCase() == ""
                //     ? e
                //     : e.producT_WAYBILL_NUMBER
                //         .toString()
                //         .toLowerCase()
                //         .includes(searchValue?.toLowerCase()) ||
                //         e.referencE_NO
                //           .toString()
                //           .toLowerCase()
                //           .includes(searchValue?.toLowerCase());
                // })
                .map((single_message, i) => {
                  return (
                    <tr key={i}>
                      

                      <td data-title="ID">{single_message.producT_ID}</td>
                      <td data-title=" WAYBILL_NUMBER">
                        {single_message.waybillNumber}
                      </td>
                      <td data-title="Order ID">
                        {single_message.referenceNumber}
                      </td>
                      <td data-title=" Product Name">
                        {single_message.productName}
                      </td>
                      <td data-title="Consignee NAME">
                        {single_message.consigneeName}
                      </td>
                      <td data-title="Address">{single_message.address}</td>
                      <td data-title="DETAILS">
                        {single_message.details}
                      </td>

                      <td data-title="DC ID">
                        {single_message.dcId}
                      </td>
                      <td data-title="Amount">
                        {single_message.amount}
                      </td>
                      <td data-title="Picked Date">
                        {single_message.pickedDate}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
            
                      

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
export default Assigntofenew;
