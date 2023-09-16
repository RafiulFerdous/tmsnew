import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
import "../../ProcessingCenter/css/all.css";
import { toast } from "react-toastify";
import Vehicle1 from "../../Model/Processingcenter/vehicle";
import { LoginContext } from "../../Context/loginContext";
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
import Pltable from "../../Model/Processingcenter/3pltable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faFileInvoice,
  faLaptopHouse,
  faMobileAlt,
  faSuitcaseRolling,
  faTruckMoving,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

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

let vehicle_information_refreshFlag, setvehicle_information_refreshFlag;
let vehicle_namePlate, setvehicle_namePlate;
let bag_waybill_list, setbag_waybill_list;
let bag_seal_list, setbag_seal_list;
let destination_address, setdestination_address;
let employee_id, setemployee_id;
let date_time, setdate_time;
let vehicleCreationFlag, setvehicleCreationFlag;
let vehicleCreatedAt, setvehicleCreatedAt;
let vehicleDriverName, setvehicleDriverName;
let vehicleDriverContact, setvehicleDriverContact;
let bookingnumber, setbookingnumber;
let employId, setemployId;

let vehicleCreationSubmitButtonFunction;
let vehicleCreationSubmitButtonFunction3pl;

let DistrictNameinformation, setDistrictNameinformation;
let DistrictNamePayload, setDistrictNamePayload;

let companyname, setcompanyname;

const Returnvehicledc = () => {
  toast.configure();
  [destination_address, setdestination_address] = useState("");
  [bag_seal_list, setbag_seal_list] = useState("");
  [bag_waybill_list, setbag_waybill_list] = useState("");
  [vehicle_namePlate, setvehicle_namePlate] = useState("");
  [vehicle_information_refreshFlag, setvehicle_information_refreshFlag] =
    useState("");
  [employee_id, setemployee_id] = useState(0);
  [date_time, setdate_time] = useState(null);
  [vehicleCreationFlag, setvehicleCreationFlag] = useState(false);
  [vehicleCreatedAt, setvehicleCreatedAt] = useState("");
  [vehicleDriverContact, setvehicleDriverContact] = useState("");
  [vehicleDriverName, setvehicleDriverName] = useState("");

  [employId, setemployId] = useState("")[
    (DistrictNameinformation, setDistrictNameinformation)
  ] = useState([]);
  [DistrictNamePayload, setDistrictNamePayload] = useState(false);

  const [showText, setShowText] = useState("own");
  const onClick = (name) => setShowText(name);
  //const [information, setinformation] = useState({});
  const [information, setinformation] = useState(null);
  const [information3pl, setinformation3pl] = useState(null);
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
      } else if (
        loginInformation.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.SuperAdmin
      ) {
        setsiteBarInformation_LocalStore(superadminsidebar); //useState a set kore rakhlam
        final_sideBar = superadminsidebar;
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
      } else if (
        context_flag_obj.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.SuperAdmin
      ) {
        setsiteBarInformation_LocalStore(superadminsidebar); //useState a set kore rakhlam
      }
      setemployId(context_flag_obj.all_user_list.employeE_ID);
      setlogingInformation_LocalStore(context_flag_obj);
    }
  }, []);

  //new code start here for setting infromation...........
  useEffect(() => {
    if (information != undefined) {
      for (let i = 0; i < information.message.all_vehicles.length; i++) {
        if (
          information.message.all_vehicles[i].vehicalE_NAMEPLATE ==
          vehicle_namePlate
        ) {
          setvehicleDriverName(information.message.all_vehicles[i].driveR_NAME);
          setvehicleDriverContact(
            information.message.all_vehicles[i].driveR_CONTACT_NUMBER
          );
          setvehicleCreatedAt(
            information.message.all_vehicles[i].vehiclE_STARTS_AT
          );
          break;
        } else {
          setvehicleDriverName("");
          setvehicleDriverContact("");
          setvehicleCreatedAt("");
        }
      }
    }
  }, [vehicle_namePlate]);
  //   //new code end here for ................................

  useEffect(() => {
    var axios = require("axios");
    var data = JSON.stringify({
      employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
    });

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/vehicle_information" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/vehicle_information" +
          "?company_name=" +
          company_name,
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

        return json_object;
      })
      .then((res) => {
        console.log("this is res", res);
        setinformation(res);
        setpayload(true);
      })
      .catch(function (error) {
        console.log("This is", error);
      });
  }, [logingInformation_LocalStore, vehicle_information_refreshFlag]);
  console.log("this is vehicle info", information);

  // 3pl vehicle info

  useEffect(() => {
    var axios = require("axios");
    var data = JSON.stringify({
      employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
    });

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/insertedBagInVehiclefor3pl" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/insertedBagInVehiclefor3pl" +
          "?company_name=" +
          company_name,
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

        return json_object;
      })
      .then((res) => {
        console.log("this is res", res);
        setinformation3pl(res);
        setpayload(true);
      })
      .catch(function (error) {
        console.log("This is", error);
      });
  }, [logingInformation_LocalStore, vehicle_information_refreshFlag]);

  console.log("this is 3pl info", information3pl);

  useEffect(() => {
    if (!logingInformation_LocalStore.token) return;
    var axios = require("axios");
    var config = {
      method: "get",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/getAllDCName" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/getAllDCName" + "?company_name=" + company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
    };

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        return json_object;
      })
      .then((res) => {
        setDistrictNameinformation(res);
        setDistrictNamePayload(true);
        console.log("GET ALL DC name successful", res);
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log("LOGING USER : ", logingInformation_LocalStore);
  }, [logingInformation_LocalStore]);

  // 3pl vehicle info end

  //eitoko code change hobe...............

  vehicleCreationSubmitButtonFunction = (e) => {
    e.preventDefault();
    var axios = require("axios");
    var data = JSON.stringify({
      employee_id: employId,
      bag_waybill_number: bag_waybill_list,
      bag_seal_number_list: vehicle_namePlate,
      vehicle_number: vehicle_namePlate,
      date_time: getCurrentTime(),
      destination_address: destination_address,
    });

    console.log("bag inside vehicle : ", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/insertBagInVehicle" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/insertBagInVehicle" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: data,
    };
    console.log("this is return vehicle config", config);

    axios(config)
      .then(function (response) {
        console.log(response.data);

        setvehicle_information_refreshFlag(
          (vehicle_information_refreshFlag) => !vehicle_information_refreshFlag
        );
        if (response.data.message.failed_bag_inside_vehicle.length >= 1) {
          let str = "";
          response.data.message.failed_bag_inside_vehicle.map(
            (wrong_waybill) => {
              str += wrong_waybill + " ";
            }
          );

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
        } else {
          toast.success("SuccessFully Vehicle Created!", {
            position: "top-right",
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          });
        }
      })
      .catch(function (error) {
        console.log("this is", error);
        toast.error("Something Wrong!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1800,
        });
      });

    setvehicleCreationFlag((vehicleCreationFlag) => !vehicleCreationFlag);
  };

  // 3pl

  vehicleCreationSubmitButtonFunction3pl = (e) => {
    e.preventDefault();
    var axios = require("axios");
    var data = JSON.stringify({
      employee_id: employId,
      bag_waybill_number: bag_waybill_list,
      bag_seal_number_list: bag_seal_list,
      vehicle_number: "",
      date_time: getCurrentTime(),
      destination_address: destination_address,
      company_name_3pl: companyname,
      booking_number_3pl: bookingnumber,
    });

    console.log("bag inside vehicle : ", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/insertBagInVehicle" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/insertBagInVehicle" +
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

        setvehicle_information_refreshFlag(
          (vehicle_information_refreshFlag) => !vehicle_information_refreshFlag
        );
        toast.success("SuccessFully Vehicle Created!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
      })
      .catch(function (error) {
        console.log("this is", error);
        toast.error("Something Wrong!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1800,
        });
      });

    setvehicleCreationFlag((vehicleCreationFlag) => !vehicleCreationFlag);
  };

  // 3pl end
  //   useEffect(()=>{

  //   },[vehicleCreationFlag])

  //ei toko code change hobe..................
  // const [selectedFlavors, setSelectedFlavors] = useState([]);

  // const handleSelect = function(selectedItems) {
  //     const flavors = [];
  //     for (let i=0; i<selectedItems.length; i++) {
  //         flavors.push(selectedItems[i].value);
  //     }
  //     setSelectedFlavors(flavors);
  // }

  return (
    <>
      <div className="bodydiv">
        <div className="row">
          <div className="col-12">
            <Navbar sidebar_manu={siteBarInformation_LocalStore} />
          </div>
        </div>
        {/* <div className="row">
                    <div className="col-12">
                        <Sidebar sidebar_manu={siteBarInformation_LocalStore} />
                    </div>
                </div> */}

        {/* <div className="row container">
                            <div className="col-6 " id="srchmenu">
                                <Search/>
                            </div>
                      </div> */}

        <div className="mt-5 pt-5 container">
          <div className="col-12 pt-5" id="">
            <div className="">
              {/*  */}
              <div className=" border rounded truck1">
                <h1 className="col-md-12 d-flex justify-content-center text-white">
                  Vehicle Creation
                </h1>
                <p className="col-md-12 d-flex justify-content-center text-white font-weight-bold">
                  Please Choose Your Vehicle
                </p>
                <div className="mb-2 d-flex justify-content-center">
                  <button
                    className=" bg-primary border-primary btn-lg text-white"
                    onClick={(e) => onClick("own")}
                  >
                    OWN
                  </button>
                  <button
                    className="mx-5 bg-success border-success btn-lg text-white"
                    onClick={(e) => onClick("3pl")}
                  >
                    3-PL
                  </button>
                </div>
                <div></div>
              </div>
              {/*  */}
              {/* <div className=" border rounded truck1">
                <h1 className="col-md-12 d-flex justify-content-center text-white">
                  Vehicle Creation
                </h1>
                <p className="col-md-12 d-flex justify-content-center text-white font-weight-bold">
                  Please Choose Your Vehicle
                </p>
                <div className="mb-2">
                  <button
                    className=" bg-primary border-primary btn-lg own text-white"
                    onClick={(e) => onClick("own")}
                  >
                    OWN
                  </button>
                  <button
                    className="mx-5 bg-success border-success btn-lg text-white"
                    onClick={(e) => onClick("3pl")}
                  >
                    3-PL
                  </button>
                </div>
                <div></div>
              </div> */}
            </div>
            {showText === "own" ? (
              <Text
                response={information}
                login={logingInformation_LocalStore}
              />
            ) : (
              <Text2
                login={logingInformation_LocalStore.all_user_list.employeE_ZONE}
              />
            )}

            {payload ? (
              showText === "own" ? (
                <Vehicle1 response={information} />
              ) : (
                <Pltable response={information3pl} />
              )
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
const Text = (props) => {
  let information = props.response;
  let logingInformation_LocalStore = props.login;

  const truckIcon = <FontAwesomeIcon icon={faTruckMoving}></FontAwesomeIcon>;
  const addressIcon = <FontAwesomeIcon icon={faAddressCard}></FontAwesomeIcon>;
  const userIcon = <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>;
  const phoneIcon = <FontAwesomeIcon icon={faMobileAlt}></FontAwesomeIcon>;
  const waybillIcon = <FontAwesomeIcon icon={faFileInvoice}></FontAwesomeIcon>;
  const bagDesIcon = (
    <FontAwesomeIcon icon={faSuitcaseRolling}></FontAwesomeIcon>
  );
  return (
    <div className="mt-5">
      <div
        className=" shadow p-2 mb-4 rounded"
        style={{ backgroundColor: "#f8f8f8 " }}
      >
        <h3 className="text-center mt-3"> Own Vehicle Creation</h3>
        <div className="container p-3">
          <form>
            {/*  */}
            <div className="form-group row">
              <label htmlFor className="col-sm-3 col-form-label">
                Vehicle Number:
              </label>
              <div className="col-sm-6 position-relative">
                <span
                  className="position-absolute text-secondary p-2 m-0"
                  style={{ marginLeft: "-4px" }}
                >
                  {truckIcon}
                </span>
                <input
                  list="vehiclelist"
                  className="form-control shadow mb-3 bg-body rounded"
                  style={{ paddingLeft: "35px" }}
                  placeholder="Select Vehicle"
                  required
                  onChange={(e) => {
                    setvehicle_namePlate(e.target.value);
                  }}
                />
                <datalist id="vehiclelist">
                  {information &&
                    information.message.all_vehicles.map((single_message) => (
                      <option value={single_message.vehicalE_NAMEPLATE} />
                    ))}
                </datalist>
              </div>
            </div>
            {/*  */}
            {/* <div className="form-group row mb-2">
              <label htmlFor className="col-sm-3 col-form-label">
                Vehicle Number:
              </label>
              <div className="col-sm-6">
                <input
                  list="vehiclelist"
                  className="form-control"
                  placeholder=""
                  required
                  onChange={(e) => {
                    setvehicle_namePlate(e.target.value);
                  }}
                />
                <datalist id="vehiclelist">
                  {information &&
                    information.message.all_vehicles.map((single_message) => (
                      <option value={single_message.vehicalE_NAMEPLATE} />
                    ))}
                </datalist>
              </div>
            </div> */}
            {/*  */}
            <div className="form-group row">
              <label htmlFor className="col-sm-3 col-form-label">
                Destination Address:
              </label>
              <div className="col-sm-6 position-relative">
                <span
                  className="position-absolute text-secondary p-2 m-0"
                  style={{ marginLeft: "-4px" }}
                >
                  {addressIcon}
                </span>
                <input
                  list="vehicledc"
                  className="form-control shadow mb-3 bg-body rounded"
                  style={{ paddingLeft: "35px" }}
                  placeholder="Select Your Destination "
                  required
                  value={destination_address}
                  onChange={(e) => {
                    setdestination_address(e.target.value);
                  }}
                />
                <datalist id="vehicledc">
                  <option value="Tongi Pc"></option>
                </datalist>
              </div>
            </div>
            {/*  */}
            {/* <div className="form-group row mb-2">
              <label htmlFor className="col-sm-3 col-form-label">
                Destination Address:
              </label>
              <div className="col-sm-6">
                <input
                  list="vehicledc"
                  className="form-control"
                  placeholder="Select Your Destination "
                  required
                  value={destination_address}
                  onChange={(e) => {
                    setdestination_address(e.target.value);
                  }}
                />
                <datalist id="vehicledc">
                  <option value="Tongi Pc"></option>
                </datalist>
              </div>
            </div> */}
            {/*  */}
            <div className="form-group row">
              <label htmlFor className="col-sm-3 col-form-label">
                Creation Address:
              </label>
              <div className="col-sm-6 position-relative">
                <span
                  className=" position-absolute text-secondary p-2 m-0"
                  style={{ marginLeft: "-4px" }}
                >
                  {addressIcon}
                </span>
                <p
                  className="shadow mb-3 bg-body rounded border border-light bg-light"
                  style={{ padding: "5px 10px 10px 35px", height: "38px" }}
                >
                  {`Creation Address : ${logingInformation_LocalStore.all_user_list.employeE_ZONE}`}
                </p>
              </div>
            </div>
            {/*  */}
            {/* <div className="form-group row mb-2">
              <label htmlFor className="col-sm-3 col-form-label">
                Creation Address:
              </label>
              <div className="col-sm-6">
                <p className="border border-light bg-light">
                  {logingInformation_LocalStore.all_user_list.employeE_ZONE}
                </p>
              </div>
            </div> */}
            {/*  */}
            <div className="form-group row">
              <label htmlFor className="col-sm-3 col-form-label">
                Driver Name:
              </label>
              <div className="col-sm-6 position-relative">
                <span
                  className=" position-absolute text-secondary p-2 m-0"
                  style={{ marginLeft: "-4px" }}
                >
                  {userIcon}
                </span>
                <p
                  className="shadow mb-3 bg-body rounded border border-light bg-light"
                  style={{ padding: "5px 10px 10px 35px", height: "38px" }}
                >
                  {`Driver Name : ${vehicleDriverName}`}
                </p>
              </div>
            </div>
            {/*  */}

            {/* <div className="form-group row mb-2">
              <label htmlFor className="col-sm-3 col-form-label">
                Driver Name:{" "}
              </label>
              <div className="col-sm-6">
                <p className="border border-light bg-light">
                  {vehicleDriverName}
                </p>
              </div>
            </div> */}
            {/*  */}
            <div className="form-group row">
              <label htmlFor className="col-sm-3 col-form-label">
                Driver Contact Number:
              </label>
              <div className="col-sm-6 position-relative">
                <span
                  className=" position-absolute text-secondary p-2 m-0"
                  style={{ marginLeft: "-4px" }}
                >
                  {phoneIcon}
                </span>
                <p
                  className="shadow mb-3 bg-body rounded border border-light bg-light"
                  style={{ padding: "5px 10px 10px 35px", height: "38px" }}
                >
                  {`Driver Number : ${vehicleDriverContact}`}
                </p>
              </div>
            </div>
            {/*  */}
            {/* <div className="form-group row mb-2">
              <label htmlFor className="col-sm-3 col-form-label">
                Driver Contact Number:{" "}
              </label>
              <div className="col-sm-6">
                <p className="border border-light bg-light">
                  {vehicleDriverContact}
                </p>
              </div>
            </div> */}
            {/*  */}
            <div className="form-group row">
              <label htmlFor className="col-sm-3 col-form-label">
                Bag Waybill Number:
              </label>
              <div className="col-sm-6 position-relative">
                <span
                  className="position-absolute text-secondary p-2 m-0"
                  style={{ marginLeft: "-4px" }}
                >
                  {waybillIcon}
                </span>
                <input
                  // list="vehiclelist"
                  type="text"
                  className="form-control shadow mb-3 bg-body rounded"
                  style={{ paddingLeft: "35px" }}
                  placeholder="Bag Waybill Number"
                  required
                  value={bag_waybill_list}
                  onChange={(e) => {
                    setbag_waybill_list(e.target.value);
                  }}
                />
              </div>
            </div>
            {/*  */}
            {/* <div className="form-group row mb-2">
              <label htmlFor className="col-sm-3 col-form-label">
                Bag Waybill Number:{" "}
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  required
                  value={bag_waybill_list}
                  onChange={(e) => {
                    setbag_waybill_list(e.target.value);
                  }}
                />
              </div>
            </div> */}
            {/*  */}
            <div className="form-group row">
              <label htmlFor className="col-sm-3 col-form-label">
                Bag Seal Number:
              </label>
              <div className="col-sm-6 position-relative">
                <span
                  className="position-absolute text-secondary p-2 m-0"
                  style={{ marginLeft: "-4px" }}
                >
                  {bagDesIcon}
                </span>
                <input
                  // list="vehiclelist"
                  type="text"
                  className="form-control shadow mb-3 bg-body rounded"
                  style={{ paddingLeft: "35px" }}
                  placeholder=" Bag Seal Number"
                  required
                  value={bag_seal_list}
                  onChange={(e) => {
                    setbag_seal_list(e.target.value);
                  }}
                />
              </div>
            </div>
            {/*  */}
            {/* <div className="form-group row mb-2">
              <label htmlFor className="col-sm-3 col-form-label">
                Bag Seal Number:{" "}
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  required
                  value={bag_seal_list}
                  onChange={(e) => {
                    setbag_seal_list(e.target.value);
                  }}
                />
              </div>
            </div> */}
            {/*  */}
            <div className="form-group row">
              <label htmlFor className="col-sm-3 col-form-label">
                Bag Create Employee ID:
              </label>
              <div className="col-sm-6 position-relative">
                <span
                  className=" position-absolute text-secondary p-2 m-0"
                  style={{ marginLeft: "-4px" }}
                >
                  {addressIcon}
                </span>
                <p
                  className="shadow mb-3 bg-body rounded border border-light bg-light"
                  style={{ padding: "5px 10px 10px 35px", height: "38px" }}
                >
                  {`Employee ID : ${employId}`}
                </p>
              </div>
            </div>
            {/*  */}
            {/* <div className="form-group row mb-2">
              <label htmlFor className="col-sm-3 col-form-label">
                Bag Create Employe ID:
              </label>
              <div className="col-sm-6">
                <p className="border border-light bg-light">{employId}</p>
              </div>
            </div> */}
            <div className="row">
              <div className="col-12 d-flex justify-content-center text-align-center">
                <button
                  className="btn btn-primary  mb-3 "
                  onClick={vehicleCreationSubmitButtonFunction}
                  disabled={
                    !bag_seal_list ||
                    !bag_waybill_list ||
                    !destination_address ||
                    !vehicle_namePlate
                  }
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* vehicle list */}
        <div>{/* <Vehicle1 response={vehecle}/> */}</div>

        {/* vehicle list end */}
      </div>
    </div>
  );
};

const Text2 = (props) => {
  let loginin = props.login;
  console.log("#PL login", loginin);
  const [companyname, setcompanyname] = useState("");
  const [bookingnumber, setbookingnumber] = useState("");

  const truckIcon = <FontAwesomeIcon icon={faTruckMoving}></FontAwesomeIcon>;
  const addressIcon = <FontAwesomeIcon icon={faAddressCard}></FontAwesomeIcon>;
  const userIcon = <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>;
  const phoneIcon = <FontAwesomeIcon icon={faMobileAlt}></FontAwesomeIcon>;
  const waybillIcon = <FontAwesomeIcon icon={faFileInvoice}></FontAwesomeIcon>;
  const houseIcon = <FontAwesomeIcon icon={faLaptopHouse}></FontAwesomeIcon>;
  const bagDesIcon = (
    <FontAwesomeIcon icon={faSuitcaseRolling}></FontAwesomeIcon>
  );

  return (
    <>
      <div className="mt-5">
        <div
          className=" shadow p-2 mb-4 rounded"
          style={{ backgroundColor: "#f8f8f8 " }}
        >
          <h3 className="text-center mt-3">3-PL Vehicle Creation</h3>
          <div className="container p-3">
            <form>
              {/*  */}
              <div className="form-group row">
                <label htmlFor className="col-sm-3 col-form-label">
                  Vehicle Creation Address:
                </label>
                <div className="col-sm-6 position-relative">
                  <span
                    className=" position-absolute text-secondary p-2 m-0"
                    style={{ marginLeft: "-4px" }}
                  >
                    {addressIcon}
                  </span>
                  <p
                    className="shadow mb-3 bg-body rounded border border-light bg-light"
                    style={{ padding: "5px 10px 10px 35px", height: "38px" }}
                  >
                    {loginin && loginin}
                  </p>
                </div>
              </div>
              {/*  */}
              {/* <div className="form-group row mb-2">
                <label htmlFor className="col-sm-3 col-form-label">
                  {" "}
                  Vehicle Creation Address:
                </label>
                <div className="col-sm-6">
                  <p className="border border-light bg-light">
                    {loginin && loginin}
                  </p>
                </div>
              </div> */}
              {/*  */}
              <div className="form-group row">
                <label htmlFor className="col-sm-3 col-form-label">
                  Company Name:
                </label>
                <div className="col-sm-6 position-relative">
                  <span
                    className="position-absolute text-secondary p-2 m-0"
                    style={{ marginLeft: "-4px" }}
                  >
                    {houseIcon}
                  </span>
                  <input
                    // list="vehiclelist"
                    type="text"
                    className="form-control shadow mb-3 bg-body rounded"
                    style={{ paddingLeft: "35px" }}
                    placeholder="Company Name"
                    required
                    value={companyname}
                    onChange={(e) => {
                      setcompanyname(e.target.value);
                    }}
                  />
                </div>
              </div>
              {/*  */}
              {/* <div className="form-group row mb-2">
                <label htmlFor className="col-sm-3 col-form-label">
                  Company Name:
                </label>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    required
                    value={companyname}
                    onChange={(e) => {
                      setcompanyname(e.target.value);
                    }}
                  />
                </div>
              </div> */}
              {/*  */}
              <div className="form-group row">
                <label htmlFor className="col-sm-3 col-form-label">
                  Booking Number:
                </label>
                <div className="col-sm-6 position-relative">
                  <span
                    className="position-absolute text-secondary p-2 m-0"
                    style={{ marginLeft: "-4px" }}
                  >
                    {phoneIcon}
                  </span>
                  <input
                    // list="vehiclelist"
                    type="text"
                    className="form-control shadow mb-3 bg-body rounded"
                    style={{ paddingLeft: "35px" }}
                    placeholder="Booking Number"
                    required
                    value={bookingnumber}
                    onChange={(e) => {
                      setbookingnumber(e.target.value);
                    }}
                  />
                </div>
              </div>
              {/*  */}
              {/* <div className="form-group row mb-2">
                <label htmlFor className="col-sm-3 col-form-label">
                  Booking Number:
                </label>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    required
                    value={bookingnumber}
                    onChange={(e) => {
                      setbookingnumber(e.target.value);
                    }}
                  />
                </div>
              </div> */}
              {/*  */}
              <div className="form-group row">
                <label htmlFor className="col-sm-3 col-form-label">
                  Destination Address:
                </label>
                <div className="col-sm-6 position-relative">
                  <span
                    className="position-absolute text-secondary p-2 m-0"
                    style={{ marginLeft: "-4px" }}
                  >
                    {addressIcon}
                  </span>
                  <input
                    list="brow"
                    multiple={true}
                    className="form-control shadow mb-3 bg-body rounded"
                    style={{ paddingLeft: "35px" }}
                    placeholder="Select Your Destination "
                    required
                    value={destination_address}
                    onChange={(e) => {
                      setdestination_address(e.target.value);
                    }}
                  />
                  <datalist id="brow">
                    <option value="Tongi Pc"></option>
                  </datalist>
                </div>
              </div>
              {/*  */}
              {/* <div className="form-group row mb-2">
                <label htmlFor className="col-sm-3 col-form-label">
                  Destination Address:
                </label>
                <div className="col-sm-6">
                  <input
                    list="brow"
                    multiple={true}
                    className="form-control"
                    placeholder="Select Your Destination "
                    required
                    value={destination_address}
                    onChange={(e) => {
                      setdestination_address(e.target.value);
                    }}
                  />
                  <datalist id="brow">
                    <option value="Tongi Pc"></option>
                  </datalist>
                </div>
              </div> */}
              {/*  */}
              <div className="form-group row">
                <label htmlFor className="col-sm-3 col-form-label">
                  Bag Waybill Number:
                </label>
                <div className="col-sm-6 position-relative">
                  <span
                    className="position-absolute text-secondary p-2 m-0"
                    style={{ marginLeft: "-4px" }}
                  >
                    {waybillIcon}
                  </span>
                  <input
                    // list="vehiclelist"
                    type="text"
                    className="form-control shadow mb-3 bg-body rounded"
                    style={{ paddingLeft: "35px" }}
                    placeholder="Bag Waybill Number"
                    required
                    value={bag_waybill_list}
                    onChange={(e) => {
                      setbag_waybill_list(e.target.value);
                    }}
                  />
                </div>
              </div>
              {/*  */}
              {/* <div className="form-group row mb-2">
                <label htmlFor className="col-sm-3 col-form-label">
                  Bag Waybill Number:{" "}
                </label>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    required
                    value={bag_waybill_list}
                    onChange={(e) => {
                      setbag_waybill_list(e.target.value);
                    }}
                  />
                </div>
              </div> */}
              {/*  */}
              <div className="form-group row">
                <label htmlFor className="col-sm-3 col-form-label">
                  Bag Seal Number:
                </label>
                <div className="col-sm-6 position-relative">
                  <span
                    className="position-absolute text-secondary p-2 m-0"
                    style={{ marginLeft: "-4px" }}
                  >
                    {bagDesIcon}
                  </span>
                  <input
                    // list="vehiclelist"
                    type="text"
                    className="form-control shadow mb-3 bg-body rounded"
                    style={{ paddingLeft: "35px" }}
                    placeholder=" Bag Seal Number"
                    required
                    value={bag_seal_list}
                    onChange={(e) => {
                      setbag_seal_list(e.target.value);
                    }}
                  />
                </div>
              </div>
              {/*  */}
              {/* <div className="form-group row mb-2">
                <label htmlFor className="col-sm-3 col-form-label">
                  Bag Seal Number:{" "}
                </label>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    required
                    value={bag_seal_list}
                    onChange={(e) => {
                      setbag_seal_list(e.target.value);
                    }}
                  />
                </div>
              </div> */}
              {/*  */}
              <div className="form-group row">
                <label htmlFor className="col-sm-3 col-form-label">
                  Bag Create Employee ID:
                </label>
                <div className="col-sm-6 position-relative">
                  <span
                    className=" position-absolute text-secondary p-2 m-0"
                    style={{ marginLeft: "-4px" }}
                  >
                    {addressIcon}
                  </span>
                  <p
                    className="shadow mb-3 bg-body rounded border border-light bg-light"
                    style={{ padding: "5px 10px 10px 35px", height: "38px" }}
                  >
                    {`Employee ID : ${employId}`}
                  </p>
                </div>
              </div>
              {/*  */}
              {/* <div className="form-group row mb-2">
                <label htmlFor className="col-sm-3 col-form-label">
                  Bag Create Employe ID:
                </label>
                <div className="col-sm-6">
                  <p className="border border-light bg-light">{employId}</p>
                </div>
              </div> */}
              <div className="row">
                <div className="col-12 d-flex justify-content-center text-align-center">
                  <button
                    className="btn btn-primary  mb-3 "
                    onClick={vehicleCreationSubmitButtonFunction3pl}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Returnvehicledc;
