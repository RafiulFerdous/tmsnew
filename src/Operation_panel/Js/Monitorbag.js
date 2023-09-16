import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
//import ProductInformation from '../../Model/Sales_content/ProductInformation';
//import Reportdownloadopstable from '../../Model/operation_content/Reportdownloadopstable'
import "../css/all.css";
import axios from "axios";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Modal from "react-modal";
import Multiselect from "multiselect-react-dropdown";
import { CSVLink, CSVDownload } from "react-csv";
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
import {
  faBriefcase,
  faCartPlus,
  faChalkboardTeacher,
  faHandHolding,
  faPeopleCarry,
  faShippingFast,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
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

let employId, setemployId;
let date_time, setdate_time;
const Monitorbag = () => {
  toast.configure();

  [employId, setemployId] = useState("");
  [date_time, setdate_time] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [information, setinformation] = useState({});
  const [payload, setpayload] = useState(false);

  const [searchTerm, setSearchTerm] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);
  const [startDateTime, setstartDateTime] = React.useState([]);
  const [endDataTime, setendDataTime] = React.useState([]);
  const [baginfoData, setbaginfoData] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [infoModalOpen, setinfoModalOpen] = useState(false);

  const [alldata, setall_data] = useState([]);
  const [alldatafilter, setall_data_filter] = useState([]);
  const [waybill, setwaybill] = useState([]);
  const [SubmitFlag, setSubmitFlag] = useState(false);

  const [dcname, setdcname] = useState(null);

  const [client, setclient] = useState(null);
  const [startdate, setstartdate] = useState(null);
  const [enddate, setenddate] = useState(null);

  const [paymenttype, setpaymenttype] = useState(null);
  const [status, setstatus] = useState([
    "InSystem",
    "Delevered",
    "Returned",
    "Lost",
  ]);
  const [finalstatus, setfinalstatus] = useState([]);

  const [searchreasult, setsearchreasult] = useState([]);

  const [dc_name, setdc_name] = useState([]);
  const [clientname, setclientname] = useState([]);

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
        ? "https://e-deshdelivery.com/universalapi/allapi/allDcList" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/allDcList" + "?company_name=" + company_name,
      headers: {
        "Content-Type": "application/json", //'Authorization': `Bearer ${logingInformation_LocalStore.token}`
      }, //data : data
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
        setdc_name(res.message);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [logingInformation_LocalStore]);

  console.log("this is all dc list", dc_name);

  const openModal = (e, way) => {
    //e.preventDefault();
    console.log("waybill", way);
    console.log("employee id", employId);
    setwaybill(way);
    setSubmitFlag(!SubmitFlag);
    //setIsOpen(true);
  };

  function closeInvoiceModal() {
    setinfoModalOpen(false);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    overlay: {
      position: "fixed",
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

  const search = () => {
    console.log("this is dc", dcname);
    console.log("this is client", client);
    console.log("this is startdate", startdate);
    console.log("this is enddate", enddate);
    console.log("this is finalstatus", finalstatus);
    console.log("this is paymenttype", paymenttype);

    // console.log("this is singlestatus", final)

    var axios = require("axios");

    if (dcname == null) {
      toast.warning("Please Select DC Name");
    } else {
      if (startdate == null || startdate == "") {
        toast.warning("Select Start Date");
      } else if (enddate == null || enddate == "") {
        toast.warning("Select  End Date");
      } else {
        setIsLoading(true);
        toast.info("Searching");
        var data = JSON.stringify({
          employee_id: employId,
          dc_name: dcname,

          start_date: startdate,
          end_date: enddate,
        });
      }
    }

    console.log("this is data : ", data);
    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/monitorBagFromOperation" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/monitorBagFromOperation" +
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
        console.log("this is monitorbag response", res);
        setsearchreasult(res.data.message.all_bag_information);
        toast.success("Successful Request.");
        setIsLoading(false);
        //setinfoModalOpen(true);

        //setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  console.log("This is searchresult", searchreasult);

  const productIcon = <FontAwesomeIcon icon={faCartPlus}></FontAwesomeIcon>;
  const bagIcon = <FontAwesomeIcon icon={faBriefcase}></FontAwesomeIcon>;
  const transitIcon = <FontAwesomeIcon icon={faShippingFast}></FontAwesomeIcon>;
  const deliveryIcon = <FontAwesomeIcon icon={faTruck}></FontAwesomeIcon>;
  const fEIcon = <FontAwesomeIcon icon={faChalkboardTeacher}></FontAwesomeIcon>;

  const deliveryHandIcon = (
    <FontAwesomeIcon icon={faHandHolding}></FontAwesomeIcon>
  );
  const productReceiveIcon = (
    <FontAwesomeIcon icon={faPeopleCarry}></FontAwesomeIcon>
  );

  useEffect(() => {
    var axios = require("axios");
    var data = JSON.stringify({
      employee_id: employId,
      bag_waybill: waybill,
    });

    // console.log(" Table APi: ",data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/monitorBagProductFromOperation" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/monitorBagProductFromOperation" +
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
        console.log("data is here", json_object);
        return json_object;
      })
      .then((res) => {
        console.log("this is bag monitor product info", res);
        setbaginfoData(res.message.all_product_list);
        if (res.message.all_product_list.length === 0)
          toast.warning("No Shipment in this Bag", {
            position: "top-right",
            autoClose: true,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });

        setinfoModalOpen(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [SubmitFlag]);

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
                <div className="bordered">
                  {/* Invoice modal */}
                  <Modal
                    isOpen={infoModalOpen}
                    style={customStyles}
                    onRequestClose={closeInvoiceModal}
                    contentLabel="Example Modal"
                  >
                    <button
                      className="btn btn-outline-danger mb-2"
                      onClick={closeInvoiceModal}
                    >
                      close
                    </button>
                    <div>
                      {/*  */}
                      {/* <table className="table table-bordered table-sm">
                        <thead>
                          <th>Date time</th>
                          <th>Processing status</th>
                        </thead>
                        <tbody>
                          {infoData.status_datetime &&
                            infoData.status_datetime.map((single_product) => (
                              <tr>
                                <td>{single_product.date_time}</td>
                                <td>{single_product.processing_status}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table> */}

                      <div className="d-flex">
                        <div
                          className="table shadow p-3 mb-5 bg-white rounded m-auto "
                          id="no-more-tables"
                        >
                          <h4>Product Info</h4>
                          <ReactHTMLTableToExcel
                            className="js-download-link button btn btn-info btn-sm px-4 mx-2 rounded-pill mb-2"
                            table="bagproinfo"
                            filename={`Report${getCurrentTime()}`}
                            sheet="Sheet"
                            buttonText="Export excel"
                          />

                          <table
                            className="col-md-12 table-bordered table-striped table-condensed cf bg-white"
                            id="bagproinfo"
                            style={{ fontSize: "12px" }}
                          >
                            <thead
                              className="text-center"
                              style={{ backgroundColor: "#f1f1f1" }}
                            >
                              <tr
                                className="text-dark"
                                style={{ border: "none" }}
                              >
                                <th>Waybill</th>
                                <th>Bag Waybill</th>
                                <th>Client Name</th>
                                <th>order id</th>
                                <th>Consignee</th>
                                <th>Contact Number</th>
                                <th>address</th>
                                <th>Area code</th>
                                <th>Cod</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody className="text-center">
                              {baginfoData &&
                                baginfoData.map((single_product) => {
                                  let clor;
                                  let finalstatus;
                                  if (
                                    single_product.color_code.includes(
                                      "Product in System"
                                    )
                                  ) {
                                    clor = "bg-primary";
                                  } else if (
                                    single_product.color_code.includes("Hold")
                                  ) {
                                    clor = "bg-warning";
                                  } else if (
                                    single_product.color_code.includes(
                                      "RETURNED_PRODUCT_INFORMATION"
                                    )
                                  ) {
                                    clor = "bg-info";
                                  } else if (
                                    single_product.color_code.includes(
                                      "DELEVERED_PRODUCT_INFORMATION"
                                    )
                                  ) {
                                    clor = "bg-success";
                                  } else if (
                                    single_product.color_code.includes(
                                      "LOST_PRODUCT_INFORMATION"
                                    )
                                  ) {
                                    clor = "bg-danger";
                                  } else {
                                    clor = "bg-info";
                                  }

                                  if (
                                    single_product.color_code.includes(
                                      "DELEVERED_PRODUCT_INFORMATION"
                                    )
                                  ) {
                                    finalstatus = "Delivered";
                                  } else if (
                                    single_product.color_code.includes(
                                      "LOST_PRODUCT_INFORMATION"
                                    )
                                  ) {
                                    finalstatus = "Lost";
                                  } else if (
                                    single_product.color_code.includes(
                                      "RETURNED_PRODUCT_INFORMATION"
                                    )
                                  ) {
                                    finalstatus = "Returned";
                                  } else if (
                                    single_product.color_code.includes(
                                      "PRODUCT"
                                    )
                                  ) {
                                    finalstatus = "Product In System";
                                  } else {
                                    finalstatus = "";
                                  }

                                  return (
                                    <tr>
                                      <td data-title="Waybill">
                                        {single_product.product_waybill}
                                      </td>

                                      <td data-title="Waybill">
                                        {single_product.bag_waybill}
                                      </td>

                                      <td data-title="Waybill">
                                        {single_product.client_name}
                                      </td>

                                      <td data-title="order id">
                                        {single_product.order_id}
                                      </td>
                                      <td data-title="Consignee">
                                        {single_product.consignee_name}
                                      </td>
                                      <td data-title="Contact Number">
                                        {single_product.contact_number}
                                      </td>
                                      <td data-title="address">
                                        {single_product.address}
                                      </td>
                                      <td data-title="Area code">
                                        {single_product.area_code}
                                      </td>
                                      <td data-title="Cod">
                                        {single_product.cod_amount}
                                      </td>
                                      <td
                                        data-title="Status"
                                        className={`${clor} text-white`}
                                      >
                                        {finalstatus}
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </Modal>
                </div>

                {/* modal end */}

                {/* <div className="row n">
                        <div className="col-12 mx-5">
                        <div className="border-dark border">
                        <form>
                            <div className="input-group">
                                    <input type="text" className="form-control mx-2" placeholder="type here......." value={searchTerm} onChange={handleChange}/>
                                    <div className="input-group-append">

                                    </div>
                            </div>
                        </form>
                        </div>
                        </div>
                   </div> */}
                <div className="container row-col-2">
                  {/* search option */}

                  <div className="border  mb-5">
                    <form className="row d-flex justify-content-center">
                      <div className=" col-sm-4 form-group mx-3 mt-2">
                        <div className=" text-center text-black mx-1">
                          DC Name:
                        </div>
                        {/*  onChange={handleFilter}*/}
                        <input
                          list="dcNames"
                          className="form-control "
                          onChange={(e) => {
                            setdcname(e.target.value);
                          }}
                        />
                        <datalist id="dcNames">
                          <option selected value="">
                            None
                          </option>
                          {dc_name.map((single_dc_office_name) => {
                            // console.log("SINGLE DC NAME:", single_dc_office_name);
                            return (
                              <option
                                value={single_dc_office_name
                                  .toString()
                                  .toLowerCase()}
                              ></option>
                            );
                          })}
                        </datalist>
                      </div>

                      {/*  onChange={handleFilter} */}
                      <div className=" col-sm-4 form-group mx-3 mt-4">
                        <div className=" text-center text-black m-2">
                          Start Date:{" "}
                          <input
                            type="date"
                            className="input-small "
                            id="startdate"
                            value={startdate}
                            onChange={(e) => {
                              setstartdate(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      {/*  onChange={handleFilter}*/}
                      <div className=" col-sm-4 form-group mx-3 mt-4">
                        <div className="text-center text-black m-2">
                          End Date:{" "}
                          <input
                            type="date"
                            className="input-small"
                            id="enddate"
                            value={enddate}
                            onChange={(e) => {
                              setenddate(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="row-2 mt-5 d-flex justify-content-center">
                        <div className="col-8 mx-5">
                          <div className="">
                            <form>
                              {/*<div className="input-group">*/}
                              {/*    <input type="text" className="form-control mx-2"*/}
                              {/*           placeholder="Type here......." value={searchTerm}*/}
                              {/*           onChange={handleChange}/>*/}
                              {/*    <div className="input-group-append">*/}

                              {/*    </div>*/}
                              {/*</div>*/}
                            </form>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 d-flex justify-content-center mt-4 mb-2">
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={search}
                        >
                          Search
                        </button>
                        {/* onClick={searchFilter} */}
                      </div>
                    </form>
                  </div>

                  {/* <div className="border border-dark bg-dark mb-5">
                    <h3 className="text-center text-white"></h3>

                        <div className="row justify-content-center mx-auto">

                                <form className="form-inline">
                                    <div className="d-flex justify-content-center mx-auto text-center">
                                        <div className="col-sm-4">
                                           Dc Name: <input list="data" className="form-control" id="bgscrl" placeholder="Dc Name "   />
                                            <datalist id="data">
                                                {

                                                    dc_name.map(single_dc_office_name => {
                                                         return (
                                                             <option>{single_dc_office_name}</option>
                                                         );
                                                     })
                                                }
                                            </datalist>
                                        </div>

                                        <div className="col-sm-4">
                                           Client Name: <input list="brow" className="form-control" id="bgscrl" placeholder="Client Name "   />
                                            <datalist id="brow">
                                                {

                                                    clientname.map(single_clientname => {
                                                         return (
                                                             <option>{single_clientname}</option>
                                                         );
                                                     })
                                                }
                                            </datalist>
                                        </div>



                                        {/* <div className="text-center text-white mx-1">
                                            Client Name: <input type="text" className="input-small "   />
                                        </div> */}

                  {/* <div className=" text-center text-white mx-1">
                                            Start Date: <input type="date" className="input-small " value={startDateTime} onChange={(e) => { setstartDateTime(e.target.value) }} />
                                        </div>
                                        <div className="text-center text-white mx-1">
                                            End Date: <input type="date" className="input-small" value={endDataTime} onChange={(e) => { setendDataTime(e.target.value) }} />
                                        </div>


                                    </div>
                                    <div className="d-flex justify-content-center mx-auto text-center">
                                    <div className="col-sm-4 p-3">
                                           Payment Type: <input list="brow" className="form-control" id="bgscrl" placeholder="Payment Type"   />
                                            <datalist id="brow">
                                                {
                                                    <option>COD</option>

                                                    // DistrictNameinformation.message.all_dc_name.map(single_dc_office_name => {
                                                    //     return (
                                                    //         <option>{single_dc_office_name}</option>
                                                    //     );
                                                    // })
                                                }
                                            </datalist>

                                        </div>
                                        <div className="col-sm-4 p-3">
                                        Status: <input list="brow" className="form-control" id="bgscrl" placeholder="Status"   />
                                            <datalist id="brow">
                                                {
                                                    <option></option>
                                                    // DistrictNameinformation.message.all_dc_name.map(single_dc_office_name => {
                                                    //     return (
                                                    //         <option>{single_dc_office_name}</option>
                                                    //     );
                                                    // })
                                                }
                                            </datalist>
                                        </div>
                                        </div>

                                    <div className="mx-auto text-center">
                                        {/* <button type="submit" className="btn btn-info text-white mt-5" onClick={searchButtonFunction}>Confirm</button> */}
                  {/* </div>
                                </form>

                        </div> */}

                  {/* </div> */}

                  {/* <div className="row-2 mt-5">
                    <div className="col-8 mx-5">
                        <div className="">
                            <form>
                                <div className="input-group">
                                    <input type="text" className="form-control mx-2" placeholder="Type here......." value={searchTerm} onChange={handleChange} />
                                    <div className="input-group-append">

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div> */}
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <div>
                      {searchreasult.length !== 0 ? (
                        <div id="requesttable">
                          <div id="no-more-tables">
                            {/* <CSVLink data={searchreasult}
                                                     className="btn btn-sm bg-info text-black border-info mb-2">Download
                                                csv</CSVLink> */}
                            <ReactHTMLTableToExcel
                              className="js-download-link button bg-info border border-info px-4 btn-sm mb-2 mx-2 text-white rounded-pill"
                              table="reportops"
                              filename={`Report${getCurrentTime()}`}
                              sheet="Sheet"
                              buttonText="Report Csv"
                            />
                            {/*Table*/}
                            <table
                              className="col-md-12 table-bordered table-striped table-condensed cf css-serial bg-white"
                              id="reportops"
                              style={{ fontSize: "13px" }}
                            >
                              {/*Table head*/}
                              <thead
                                className="text-center"
                                style={{ backgroundColor: "#f1f1f1" }}
                              >
                                <tr
                                  className="text-dark"
                                  style={{ border: "none" }}
                                >
                                  <th>SL</th>
                                  <th scope="col">Bag Waybill</th>
                                  <th>Bag Type</th>
                                  <th>Bag Status</th>
                                  <th>Total Package</th>
                                  <th scope="col">Destination Center</th>
                                  <th scope="col">Creation Center</th>
                                  <th scope="col">Vehicle Id</th>
                                </tr>
                              </thead>
                              {/*Table head*/}
                              {/*Table body*/}
                              <tbody className="text-center">
                                {searchreasult.map((single_message) => {
                                  return (
                                    <tr
                                      key={single_message.baG_WAYBILL_NUMBER}
                                      className=""
                                    >
                                      <td data-title="SL"></td>
                                      <td data-title="Waybill">
                                        <button
                                          className="btn btn-sm btn-outline-primary"
                                          onClick={(e) =>
                                            openModal(
                                              e,
                                              single_message.baG_WAYBILL_NUMBER
                                            )
                                          }
                                        >
                                          {single_message.baG_WAYBILL_NUMBER}
                                        </button>
                                      </td>
                                      <td data-title="Bag Type">
                                        {single_message.baG_TYPE}
                                      </td>

                                      <td data-title="Bag Type">
                                        {
                                          single_message.baG_ACTIVITY_STAGE_STATUS
                                        }
                                      </td>

                                      <td data-title="Total Package">
                                        {
                                          single_message.numbeR_OF_PACKAGES_IN_BAG
                                        }
                                      </td>
                                      <td data-title="Bag DESTINATION CENTER">
                                        <span className="word-break">
                                          {
                                            single_message.baG_DESTINATION_CENTER
                                          }
                                        </span>
                                      </td>
                                      <td data-title="Bag CRATION CENTER">
                                        {single_message.baG_CRATION_CENTER}
                                      </td>
                                      <td data-title="Vehicle id">
                                        <span className="word-break">
                                          {single_message.baG_VEHICLE_ID}
                                        </span>
                                      </td>
                                    </tr>
                                  );
                                })}
                                {/* {
                                    json_information.message.returned_product_list.map(single_message => {

                                        return (
                                            <tr key={single_message.waybill_number} className="bg-primary text-white">
                                                <td></td>
                                                <th scope="row">{single_message.waybill_number}<br></br>
                                                    {single_message.order_id}
                                                </th>
                                                <td>{single_message.customer_name}</td>
                                                <td>{single_message.consignee_name}</td>
                                                <td>{single_message.product_detail}

                                                </td>
                                                <td>{single_message.product_value}<br></br>
                                                    {single_message.product_weight}</td>
                                                <td>{single_message.dc_office_name}<br></br>
                                                    {single_message.pincode}
                                                </td>
                                                <td>{single_message.product_processing_stage}<br></br>
                                                    {single_message.product_processing_stage_datetime}
                                                </td>
                                                <td>
                                                    {single_message.reason}

                                                </td>

                                            </tr>
                                        )
                                    })
                                }
                                {
                                    json_information.message.holded_product_list.map(single_message => {

                                        return (
                                            <tr key={single_message.waybill_number} className="bg-warning text-white">
                                                <td></td>
                                                <th scope="row">{single_message.waybill_number}<br></br>
                                                    {single_message.order_id}
                                                </th>
                                                <td>{single_message.customer_name}</td>
                                                <td>{single_message.consignee_name}</td>
                                                <td>{single_message.product_detail}

                                                </td>
                                                <td>{single_message.product_value}<br></br>
                                                    {single_message.product_weight}</td>
                                                <td>{single_message.dc_office_name}<br></br>
                                                    {single_message.pincode}
                                                </td>
                                                <td>{single_message.product_processing_stage}<br></br>
                                                    {single_message.product_processing_stage_datetime}
                                                </td>
                                                <td>
                                                    {single_message.reason}

                                                </td>

                                            </tr>
                                        )
                                    })
                                }
                                {
                                    json_information.message.lost_product_list.map(single_message => {

                                        return (
                                            <tr key={single_message.waybill_number} className="bg-danger text-black">
                                                <td></td>
                                                <th scope="row">{single_message.waybill_number}<br></br>
                                                    {single_message.order_id}
                                                </th>
                                                <td>{single_message.customer_name}</td>
                                                <td>{single_message.consignee_name}</td>
                                                <td>{single_message.product_detail}

                                                </td>
                                                <td>{single_message.product_value}<br></br>
                                                    {single_message.product_weight}</td>
                                                <td>{single_message.dc_office_name}<br></br>
                                                    {single_message.pincode}
                                                </td>
                                                <td>{single_message.product_processing_stage}<br></br>
                                                    {single_message.product_processing_stage_datetime}
                                                </td>
                                                <td>
                                                    {single_message.reason}

                                                </td>

                                            </tr>
                                        )
                                    })
                                } */}
                                {/* {
                                    searchResults.map(single_message => {

                                        return (
                                            <tr key={single_message.waybill_number} className="bg-info">
                                                <td></td>
                                                <th scope="row">{single_message.waybill_number}<br></br>
                                                    {single_message.order_id}
                                                </th>
                                                <td>{single_message.customer_name}</td>
                                                <td>{single_message.consignee_name}</td>
                                                <td>{single_message.product_detail}

                                                </td>
                                                <td>{single_message.product_value}<br></br>
                                                    {single_message.product_weight}</td>
                                                <td>{single_message.dc_office_name}<br></br>
                                                    {single_message.pincode}
                                                </td>
                                                <td>{single_message.product_processing_stage}<br></br>
                                                    {single_message.product_processing_stage_datetime}
                                                </td>
                                                <td>
                                                    {single_message.reason}

                                                </td>

                                            </tr>
                                        )
                                    })
                                } */}
                              </tbody>
                              {/*Table body*/}
                            </table>
                            {/*Table*/}
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  )}
                </div>
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
};
export default Monitorbag;
