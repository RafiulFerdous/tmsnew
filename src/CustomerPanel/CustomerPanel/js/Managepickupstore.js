import React, { useState, useEffect, useContext } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../../Common/Navbar";
import Sidebar from "../../../Common/Sidebar";
import Search from "../../../Common/Search";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { Button, Result } from "antd";
import Footer from "../../../Common/Footer";
// import Invoicesummarytable from "../../Model/Customer_content/Invoicesummarytable";
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
import { LoginContext } from "../../../Context/loginContext";
// import { SearchContext } from "../../Context/searchContext";
// import { SearchButtonContext } from "../../Context/buttonContext";
import {
  Linksidebar,
  CustomerCareLinksidebar,
  Salessidebar,
  Operationsidebar,
  Degital_Ocean_flag,
  company_name,
} from "../../../Common/Linksidebar";

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

let clientId, setclientId;
let date_time, setdate_time;

const Managepickupstore = () => {
  toast.configure();
  [clientId, setclientId] = useState("");
  [date_time, setdate_time] = useState("");

  const [information, setinformation] = useState([]);
  const [payload, setpayload] = useState(false);

  const [payload1, setpayload1] = useState(false);

  var { loginInformation, setloginInformation } = useContext(LoginContext);

  const [logingInformation_LocalStore, setlogingInformation_LocalStore] =
    useState(loginInformation);
  const [siteBarInformation_LocalStore, setsiteBarInformation_LocalStore] =
    useState([]);

  const [rootcountry, setrootcountry] = useState([]);
  const [rootdivision, setrootdivision] = useState([]);
  const [rootdistrict, setrootdistrict] = useState([]);
  const [rootthana, setrootthana] = useState([]);
  const [rootarea, setrootarea] = useState([]);

  const [storename, setstorename] = useState([]);
  const [countryid, setcountryid] = useState([]);
  const [divisionid, setdivisionid] = useState([]);
  const [districtid, setdistrictid] = useState([]);
  const [thanaid, setthanaid] = useState([]);
  const [areaid, setareaid] = useState([]);
  const [isactive, setisactive] = useState([]);

  const [isactiveupdate, setisactiveupdate] = useState([]);

  const [rootupdateinfo, setrootupdateinfo] = useState([]);

  const [modalIsOpen, setIsOpen] = useState(false);

  const [infoModalOpen, setinfoModalOpen] = useState(false);

  const [infoModalOpenupdate, setinfoModalOpenupdate] = useState(false);

  function closeInvoiceModal() {
    setinfoModalOpen(false);
  }

  function closeInvoiceModal1() {
    setinfoModalOpenupdate(false);
  }

  function closeModal() {
    setIsOpen(false);
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
      backgroundColor: "#0000001a",
      color: "orange",
      position: "absolute",

      top: "80px",
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
  const customStyles1 = {
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
      backgroundColor: "#0000001a",
      color: "orange",
      position: "absolute",

      top: "80px",
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

  useEffect(() => {
    var axios = require("axios");
    var data = JSON.stringify({
      client_id: clientId,
    });

    console.log("Client Report api: ", data);

    var config = {
      method: "get",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/api/v1.1/Location/GetCountry"
        : "/api/v1.1/Location/GetCountry",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      //   data: data,
    };

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        console.log("rootcountry", json_object);
        return json_object;
      })
      .then((res) => {
        setrootcountry(res.data);
        // setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [logingInformation_LocalStore]);
  console.log("rootcountry", rootcountry);

  useEffect(() => {
    var axios = require("axios");
    var data = JSON.stringify({
      client_id: clientId,
    });

    console.log("Client Report api: ", data);

    var config = {
      method: "get",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/api/v1.1/MultiPickupStrore/GetAllStoresByMerChantId" +
          "?merchantId=" +
          clientId
        : "/api/v1.1/MultiPickupStrore/GetAllStoresByMerChantId" +
          "?merchantId=" +
          clientId,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      //   data: data,
    };

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        console.log(json_object);
        return json_object;
      })
      .then((res) => {
        setinformation(res.data);
        // setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [logingInformation_LocalStore, clientId, payload, payload1]);

  console.log("this is response information", information);

  function openModal(e) {
    //  console.log("waybill", way);

    setinfoModalOpen(true);
  }

  console.log("country", countryid);

  function divisionapi(e) {
    console.log("inside fun", e);
    setcountryid(e);

    var axios = require("axios");
    var data = JSON.stringify({
      client_id: clientId,
    });

    console.log("Client Report api: ", data);

    var config = {
      method: "get",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/api/v1.1/Location/GetDivisionByCountry" +
          "?countryId=" +
          e
        : "/api/v1.1/Location/GetDivisionByCountry" + "?countryId=" + e,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      //   data: data,
    };

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        console.log("division", json_object);
        return json_object;
      })
      .then((res) => {
        setrootdivision(res.data);
        // setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  console.log("rootdivision", rootdivision);

  function districtapi(e) {
    setdivisionid(e);
    var axios = require("axios");
    var data = JSON.stringify({
      client_id: clientId,
    });

    console.log("Client Report api: ", data);

    var config = {
      method: "get",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/api/v1.1/Location/GetDistrictByDivision" +
          "?divisionId=" +
          e
        : "/api/v1.1/Location/GetDistrictByDivision" + "?divisionId=" + e,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      //   data: data,
    };

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        console.log("district", json_object);
        return json_object;
      })
      .then((res) => {
        setrootdistrict(res.data);
        // setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  console.log("rootdistrict", rootdistrict);

  function thanaapi(e) {
    setdistrictid(e);

    var axios = require("axios");
    var data = JSON.stringify({
      client_id: clientId,
    });

    console.log("Client Report api: ", data);

    var config = {
      method: "get",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/api/v1.1/Location/GetThanaByDistrict" +
          "?districtId=" +
          e
        : "/api/v1.1/Location/GetThanaByDistrict" + "?districtId=" + e,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      //   data: data,
    };

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        console.log("thana", json_object);
        return json_object;
      })
      .then((res) => {
        setrootthana(res.data);
        // setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  console.log("root Thana", rootthana);

  function areaapi(e) {
    setthanaid(e);
    var axios = require("axios");
    var data = JSON.stringify({
      client_id: clientId,
    });

    console.log("Client Report api: ", data);

    var config = {
      method: "get",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/api/v1.1/Location/GetAreaByThana" +
          "?thanaId=" +
          e
        : "/api/v1.1/Location/GetAreaByThana" + "?thanaId=" + e,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      //   data: data,
    };

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        console.log("area", json_object);
        return json_object;
      })
      .then((res) => {
        setrootarea(res.data);
        // setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
        toast.error("No Area Found");
      });
  }

  console.log("rootarea", rootarea);

  function update(e) {
    //e.preventDefault();
    var axios = require("axios");
    var data = JSON.stringify({
      // client_id: clientId,

      MerchantId: clientId,
      StroreName: storename,
      StoreCountryId: parseInt(countryid),
      StoreDivisionId: parseInt(divisionid),
      StoreDistrictId: parseInt(districtid),
      StoreThanaId: parseInt(thanaid),
      StoreAreaId: parseInt(3),
      PostedById: clientId,
      UpdatedById: clientId,
      IsActive: parseInt(isactive),
    });

    console.log("store create api: ", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/api/v1.1/MultiPickupStrore/CreatePickupStore"
        : "/api/v1.1/MultiPickupStrore/CreatePickupStore",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        console.log("update response", json_object);
        return json_object;
      })
      .then((res) => {
        if (res.statusCode == 201) {
          toast.success(res.message);
          setpayload(payload == true ? false : true);
          setinfoModalOpen(false);
          setstorename([]);
          setcountryid([]);
          setdivisionid([]);
          setdistrictid([]);
          setthanaid([]);
          setareaid([]);
          setisactive([]);

          // setinformation(res.dada);
        }

        // setrootarea(res.data);
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error.message);
      });
  }

  function openmodalupdate(e) {
    var axios = require("axios");
    var data = JSON.stringify({
      client_id: clientId,
    });

    console.log("Client Report api: ", data);

    var config = {
      method: "get",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/api/v1.1/MultiPickupStrore/GetPickupStoreByStoreId" +
          "?storeId=" +
          e
        : "/api/v1.1/MultiPickupStrore/GetPickupStoreByStoreId" +
          "?storeId=" +
          e,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      //   data: data,
    };

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        console.log("update", json_object);
        return json_object;
      })
      .then((res) => {
        setrootupdateinfo(res.data);
        setinfoModalOpenupdate(true);
        // setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error.message);
      });
  }
  console.log("root update info", rootupdateinfo);

  function updateapi(e) {
    e.preventDefault();
    var axios = require("axios");
    var data = JSON.stringify({
      // client_id: clientId,

      StoreId: rootupdateinfo.storeId,
      MerchantId: clientId,
      StroreName: "",
      StoreCountryId: 0,
      StoreDivisionId: 0,
      StoreDistrictId: 0,
      StoreThanaId: 0,
      StoreAreaId: 0,
      PostedById: 0,
      UpdatedById: clientId,
      IsActive: isactiveupdate == "true" ? true : false,
    });

    console.log("Client Report api: ", data);

    var config = {
      method: "put",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/api/v1.1/MultiPickupStrore/UpdatePickUpStore"
        : "/api/v1.1/MultiPickupStrore/UpdatePickUpStore",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        console.log("update api res", json_object);
        return json_object;
      })
      .then((res) => {
        if (res.statusCode == 200) {
          toast.success(res.message);

          setpayload1(payload1 == true ? false : true);
          setinfoModalOpenupdate(false);
          setisactiveupdate([]);
          // setinformation(res.dada);
        }
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error.message);
      });
  }

  return (
    <>
      {/* Invoice modal */}

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
          {/* <div className="col-12 d-flex pt-5" id="mainmenu"> */}
          <div className="mt-5 pt-5" id="no-more-tables">
            <div className="row mb-2">
              {/* <div className="col-lg-2 col-md-6 col-12 mb-2">


                    <CSVLink
                      data={dataforcsv}
                      filename={`Report${getCurrentTime()}.xls`}
                      className="btn btn-sm btn-dark px-3 ms-2 rounded-3"
                    >
                      Download all
                    </CSVLink>

                </div> */}
              <div className="col-lg-2 col-md-6 col-12 mb-2">
                {/* <CSVLink
                    onClick={() => toast.success("Excel Download Successful")}
                    filename={`Home Operation ${getCurrentTime()}.xls`}
                    data={json_information?.message}
                    className="btn btn-dark btn-sm px-4 mx-2  mb-2"
                  >
                    Export Excel
                  </CSVLink> */}
                {/* <button
                  className="btn btn-sm btn-dark px-3 rounded-3"
                  // onClick={(e) => exportToCSV(dataforcsv, fileName)}
                >
                  Export Excel
                </button> */}
              </div>

              <div className="col-lg-6 col-md-8 col-12 mb-2">
                {/* <input
                  style={{
                    backgroundColor: "#C5D5E4",
                    outline: "none",
                    border: "none",
                    padding: "7px",
                    borderRadius: "8px",
                    width: "93%",
                  }}
                  type="text"
                  placeholder="Filter waybills, Bag, DC, Merchant"
                  // value={searchTerm}
                  // onChange={handleonChange}
                /> */}
              </div>
              <div className="col-lg-2 col-md-4 col-12 mb-2">
                {/* <button
                  className="btn btn-sm btn-success px-3 me-2 rounded-3"
                  // onClick={searchflag}
                >
                  Search
                </button> */}
                <button
                  className="btn btn-sm btn-success px-3 ms-2 rounded-3"
                  onClick={openModal}
                >
                  Add New
                </button>
              </div>
            </div>
            {/*Table*/}

            <table
              className="table css-serial bg-white"
              id="newops"
              style={{ fontSize: "13px", marginLeft: "1px" }}
            >
              {/*Table head*/}
              <thead
                className="text-center shadow sticky-top "
                style={{
                  backgroundColor: "#b4bec2",
                  top: "60px",
                  zIndex: "0",
                }}
              >
                <tr className="text-dark" style={{ border: "none" }}>
                  <th scope="col">SL</th>
                  <th scope="col">MerchantName</th>
                  <th scope="col">StoreName</th>
                  <th scope="col">CountryName</th>
                  <th scope="col">DivisionName</th>
                  <th scope="col">DistrictName</th>
                  <th scope="col">ThanaName</th>
                  <th scope="col">PostedBy</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              {/*Table head*/}
              {/*Table body*/}

              <tbody className="text-center border border-secondary">
                {/* {console.log("All filter data", allfilterproductdata)} */}
                {/* there is  color change code*/}

                {information &&
                  information.map((single_message) => {
                    let color;
                    if (single_message.isActive == true) {
                      color = "bg-success";
                    } else {
                      color = "bg-danger";
                    }
                    return (
                      <tr className="">
                        <td data-title="SL"></td>
                        {/* <td data-title="Action">
                          <button
                            style={{ width: "110px" }}
                            className="btn btn-sm btn-outline-primary "
                            onClick={(e) =>
                              openModal(e, single_message.waybill_number)
                            }
                          >
                            See And Edit
                          </button>
                        </td> */}
                        <td data-title="MerchantName">
                          {/* <button
                              className="btn btn-sm btn-outline-primary "
                              onClick={(e) =>
                                openModal(e, single_message.waybill_number)
                              }
                            >
                            </button> */}
                          {single_message.merchantName}
                        </td>

                        <td data-title="StoreName">
                          {single_message.storeName}
                        </td>
                        <td data-title="CountryName">
                          {single_message.countryName}
                        </td>
                        <td data-title="DivisionName">
                          {single_message.divisionName}
                        </td>
                        <td data-title="DistrictName">
                          {single_message.districtName}
                        </td>
                        <td data-title="ThanaName">
                          {single_message.thanaName}
                        </td>
                        <td data-title="PostedBy">{single_message.postedBy}</td>
                        <td
                          data-title="Status"
                          className={`${color} btn px-3 ms-2 rounded-3`}
                        >
                          {single_message.isActive == false
                            ? "Inactive"
                            : "Active"}
                        </td>

                        <td>
                          <Button
                            variant="primary"
                            onClick={(e) => {
                              openmodalupdate(single_message.storeId);
                            }}
                          >
                            Edit
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>

              {/*Table body*/}
            </table>

            {/*Table*/}
          </div>
          {/* </div> */}
        </div>

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
            <div className="d-flex ">
              <div className="order-track shadow p-3 mb-5 bg-white rounded m-auto modal-width">
                <form className="bordered ">
                  <h2 className="text-center text-dark">Create Here</h2>

                  <div className="form-group">
                    <label>Store name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={storename}
                      onChange={(e) => {
                        setstorename(e.target.value);
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label>Country name</label>
                    <input
                      type="text"
                      className="form-control"
                      list="country"
                      value={countryid}
                      onChange={(e) => {
                        divisionapi(e.target.value);
                      }}
                    />

                    <datalist id="country">
                      <option selected value="">
                        Nones
                      </option>
                      {/* <option value="All">All</option> */}
                      {rootcountry.map((single_dc_office_name) => {
                        // console.log("SINGLE DC NAME:", single_dc_office_name);
                        return (
                          <option value={single_dc_office_name.text}>
                            {single_dc_office_name.value}
                          </option>
                        );
                      })}
                    </datalist>
                  </div>

                  <div className="form-group">
                    <label>Division name</label>
                    {/* <select
                      className="form-select"
                      onChange={(e) => {
                        districtapi(e.target.value);
                      }}
                    >
                      {rootdivision.map((single_dc_office_name) => {
                        // console.log("SINGLE DC NAME:", single_dc_office_name);
                        return (
                          <option value={single_dc_office_name.text}>
                            {single_dc_office_name.value}
                          </option>
                        );
                      })}
                    </select> */}
                    <input
                      type="text"
                      className="form-control"
                      list="division"
                      value={divisionid}
                      onChange={(e) => {
                        districtapi(e.target.value);
                      }}
                    />

                    <datalist id="division">
                      <option selected value="">
                        Nones
                      </option>
                      {/* <option value="All">All</option> */}
                      {rootdivision.map((single_dc_office_name) => {
                        // console.log("SINGLE DC NAME:", single_dc_office_name);
                        return (
                          <option value={single_dc_office_name.text}>
                            {single_dc_office_name.value}
                          </option>
                        );
                      })}
                    </datalist>
                  </div>

                  <div className="form-group">
                    <label>District name</label>
                    <input
                      type="text"
                      className="form-control"
                      list="district"
                      value={districtid}
                      onChange={(e) => {
                        thanaapi(e.target.value);
                      }}
                    />

                    <datalist id="district">
                      <option selected value="">
                        Nones
                      </option>
                      {/* <option value="All">All</option> */}
                      {rootdistrict.map((single_dc_office_name) => {
                        // console.log("SINGLE DC NAME:", single_dc_office_name);
                        return (
                          <option value={single_dc_office_name.text}>
                            {single_dc_office_name.value}
                          </option>
                        );
                      })}
                    </datalist>
                  </div>

                  <div className="form-group">
                    <label>Thana name</label>
                    <input
                      type="text"
                      className="form-control"
                      list="thana"
                      value={thanaid}
                      onChange={(e) => {
                        areaapi(e.target.value);
                      }}
                    />

                    <datalist id="thana">
                      <option selected value="">
                        Nones
                      </option>
                      {/* <option value="All">All</option> */}
                      {rootthana.map((single_dc_office_name) => {
                        // console.log("SINGLE DC NAME:", single_dc_office_name);
                        return (
                          <option value={single_dc_office_name.text}>
                            {single_dc_office_name.value}
                          </option>
                        );
                      })}
                    </datalist>
                  </div>

                  <div className="form-group">
                    <label>Area name</label>
                    <input
                      type="text"
                      className="form-control"
                      list="area"
                      value={areaid}
                      // onChange={(e) => {
                      //   areaapi(e.target.value);
                      // }}
                    />

                    <datalist id="area">
                      <option selected value="">
                        Nones
                      </option>
                      {/* <option value="All">All</option> */}
                      {rootarea.map((single_dc_office_name) => {
                        // console.log("SINGLE DC NAME:", single_dc_office_name);
                        return (
                          <option value={single_dc_office_name.text}>
                            {single_dc_office_name.value}
                          </option>
                        );
                      })}
                    </datalist>
                  </div>

                  <div className="form-group">
                    <label>Status</label>
                    <input
                      type="text"
                      className="form-control"
                      list="isactive"
                      value={isactive}
                      onChange={(e) => {
                        setisactive(e.target.value);
                      }}
                    />

                    <datalist id="isactive">
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                      {/* <option value="All">All</option> */}
                      {/* {rootarea.map((single_dc_office_name) => {
                        // console.log("SINGLE DC NAME:", single_dc_office_name);
                        return (
                          <option value={single_dc_office_name.text}>
                            {single_dc_office_name.value}
                          </option>
                        );
                      })} */}
                    </datalist>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary mt-4"
                    onClick={(e) => {
                      update(e);
                    }}
                  >
                    create
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={infoModalOpenupdate}
          style={customStyles1}
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
            <div className="d-flex ">
              <div className="order-track shadow p-3 mb-5 bg-white rounded m-auto modal-width">
                <form className="bordered ">
                  <h2 className="text-center text-dark">Update Here</h2>

                  <div className="form-group">
                    <h2>{"Previous Status : " + rootupdateinfo.isActive}</h2>

                    {/* {console.log("Previous Status :", rootupdateinfo.isActive)} */}
                    <label>Status</label>
                    <input
                      type="text"
                      className="form-control"
                      list="isactiveup"
                      value={isactiveupdate}
                      onChange={(e) => {
                        setisactiveupdate(e.target.value);
                      }}
                    />
                    <datalist id="isactiveup">
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                      {/* <option value="All">All</option> */}
                      {/* {rootarea.map((single_dc_office_name) => {
                        // console.log("SINGLE DC NAME:", single_dc_office_name);
                        return (
                          <option value={single_dc_office_name.text}>
                            {single_dc_office_name.value}
                          </option>
                        );
                      })} */}
                    </datalist>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary mt-4"
                    onClick={(e) => {
                      updateapi(e);
                    }}
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Modal>

        <div className="">
          <div className="col-12">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};
export default Managepickupstore;
