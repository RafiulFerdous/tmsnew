import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
//import ProductInformation from '../../Model/Sales_content/ProductInformation';
//import Reportdownloadopstable from '../../Model/operation_content/Reportdownloadopstable'
// import "../css/all.css";
import axios from "axios";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Modal from "react-modal";
import Multiselect from "multiselect-react-dropdown";
import { CSVLink, CSVDownload } from "react-csv";

import { LoginContext } from "../../Context/loginContext";
import { SearchContext } from "../../Context/searchContext";
import { SearchButtonContext } from "../../Context/buttonContext";
import {
    Linksidebar,
    CustomerCareLinksidebar,
    Salessidebar,
    Operationsidebar,
    acsidebar,
    Degital_Ocean_flag,
    company_name,
    superadminsidebar,
    dcpanel
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
const Reportdownloaddc = () => {
    [employId, setemployId] = useState("");
    [date_time, setdate_time] = useState("");

    const [information, setinformation] = useState({});
    const [payload, setpayload] = useState(false);

    const [searchTerm, setSearchTerm] = React.useState([]);
    const [searchResults, setSearchResults] = React.useState([]);
    const [startDateTime, setstartDateTime] = React.useState([]);
    const [endDataTime, setendDataTime] = React.useState([]);
    const [infoData, setinfoData] = useState([]);
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
                employee_degignation_list.Finance
            ) {
                setsiteBarInformation_LocalStore(acsidebar); //useState a set kore rakhlam
                final_sideBar = acsidebar;
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
                setsiteBarInformation_LocalStore(dcpanel); //useState a set kore rakhlam
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

    // useEffect(() => {
    //     var axios = require("axios");
    //     // var data = JSON.stringify({
    //     //     "sales_employee_id": employId
    //     // });
    //
    //     // console.log(" Table APi: ",data);
    //
    //     var config = {
    //         method: "post",
    //         url: Degital_Ocean_flag
    //             ? "https://e-deshdelivery.com/universalapi/allapi/allDcList" +
    //             "?company_name=" +
    //             company_name
    //             : "/universalapi/allapi/allDcList" + "?company_name=" + company_name,
    //         headers: {
    //             "Content-Type": "application/json",
    //             //'Authorization': `Bearer ${logingInformation_LocalStore.token}`
    //         },
    //         //data : data
    //     };
    //
    //     axios(config)
    //         .then(function (response) {
    //             let json_object_str = JSON.stringify(response.data);
    //             let json_object = JSON.parse(json_object_str);
    //             console.log("data is here", json_object);
    //             return json_object;
    //         })
    //         .then((res) => {
    //             console.log("this is res", res);
    //             setdc_name(res.message);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }, [logingInformation_LocalStore]);

    console.log("this is all dc list", dc_name);

    // useEffect(() => {
    //     var axios = require("axios");
    //     // var data = JSON.stringify({
    //     //     "sales_employee_id": employId
    //     // });
    //
    //     // console.log(" Table APi: ",data);
    //
    //     var config = {
    //         method: "post",
    //         url: Degital_Ocean_flag
    //             ? "https://e-deshdelivery.com/universalapi/allapi/allmerchentname" +
    //             "?company_name=" +
    //             company_name
    //             : "/universalapi/allapi/allmerchentname" +
    //             "?company_name=" +
    //             company_name,
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${logingInformation_LocalStore.token}`,
    //         },
    //         //data : data
    //     };
    //
    //     axios(config)
    //         .then(function (response) {
    //             let json_object_str = JSON.stringify(response.data);
    //             let json_object = JSON.parse(json_object_str);
    //             console.log("data is here", json_object);
    //             return json_object;
    //         })
    //         .then((res) => {
    //             console.log("this is res", res);
    //             setclientname(res.message);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }, [logingInformation_LocalStore]);

    console.log("this is all client list", clientname);

    const openModal = (e, way) => {
        //e.preventDefault();
        console.log("waybill", way);
        console.log("employee id", employId);
        setwaybill(way);
        setSubmitFlag(!SubmitFlag);
        setIsOpen(true);
    };

    // console.log("this is waybill",waybill)

    useEffect(() => {
        // e.preventDefault();
        var axios = require("axios");

        var data = JSON.stringify({
            employee_id: employId,
            waybill_number: waybill,
        });

        console.log("this is data : ", data);

        var config = {
            method: "post",
            url: Degital_Ocean_flag
                ? "https://e-deshdelivery.com/universalapi/allapi/operationPanelSingleProductInformation" +
                "?company_name=" +
                company_name
                : "/universalapi/allapi/operationPanelSingleProductInformation" +
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
                // setpickupRefreshFlag(pickupRefreshFlag => !pickupRefreshFlag);
                //  toast.success("SuccessFully Forworded", {
                //      position: toast.POSITION.TOP_CENTER, autoClose: 1500
                //  }
                //  );
                //setUsers(response.data.all_product_list)
                // console.log("successfully forworded");
                return response;
            })
            .then((res) => {
                console.log("new response", res);
                setinfoData(res.data.message);

                setinfoModalOpen(true);

                //setpayload(true);
            })
            .catch(function (error) {
                // Error
                //  if (error.response) {
                //      toast.error("Error!", {
                //          position: toast.POSITION.TOP_CENTER, autoClose: 1500
                //      });

                //  } else if (error.request) {
                //      toast.error(" Request Error!", {
                //          position: toast.POSITION.TOP_CENTER, autoClose: 1500
                //      });
                //      console.log(error.request);
                //  } else {

                //      console.log('Error', error.message);
                //  }
                console.log(error.config);
            });

        //setpickupFlag(pickupFlag => !pickupFlag);
    }, [SubmitFlag, logingInformation_LocalStore, employId]);

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
            color: "orange",
            position: "absolute",
            backgroundColor: "#0000001a",
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
        var data = JSON.stringify({
            user_id: parseInt(0),
            //employId
            dc_name: logingInformation_LocalStore.all_user_list.employeE_ZONE,
            client_name: null,
            start_datetime: startdate,
            end_datetime: enddate,
            payment_type: paymenttype,
            status: finalstatus,
        });
        console.log("this is data : ", data);
        var config = {
            method: "post",
            url: Degital_Ocean_flag
                ? "https://e-deshdelivery.com/universalapi/allapi/all_panel_all_search_Finance" +
                "?company_name=" +
                company_name
                : "/universalapi/allapi/all_panel_all_search_Finance" +
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
                console.log("new response", res);
                setsearchreasult(res.data.message.all_product_information);

                //setinfoModalOpen(true);

                //setpayload(true);
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
                            <div className="col-12 d-flex" id="">
                                <div className="bordered">
                                    {/* Invoice modal */}
                                    <Modal
                                        isOpen={infoModalOpen}
                                        style={customStyles}
                                        onRequestClose={closeInvoiceModal}
                                        contentLabel="Example Modal"
                                        closeTimeoutMS={500}
                                    >
                                        <button
                                            className="btn btn-outline-danger mb-2"
                                            onClick={closeInvoiceModal}
                                        >
                                            close
                                        </button>
                                        <div>
                                            {/*  */}
                                            <div className="d-flex">
                                                <div className="order-track shadow p-3 mb-5 bg-white rounded m-auto">
                                                    <h4>Datewise Status</h4>
                                                    {infoData.status_datetime &&
                                                        infoData.status_datetime.map((single_product) => {
                                                            return (
                                                                <div className="order-track-step h-100">
                                                                    <div className="bg-success d-flex">
                                    <span className="text-warning p-2 m-auto">
                                      {/* order-track-status-dot */}
                                        {single_product.processing_status ==
                                        "Product in System"
                                            ? productIcon
                                            : single_product.processing_status ==
                                            "Product in Bag"
                                                ? bagIcon
                                                : single_product.processing_status ==
                                                "Product in Transit "
                                                    ? transitIcon
                                                    : single_product.processing_status ==
                                                    "RECEIVED BY DC (OK) "
                                                        ? deliveryIcon
                                                        : single_product.processing_status ==
                                                        "Product Assign to FE "
                                                            ? fEIcon
                                                            : single_product.processing_status ==
                                                            "Product Received by FE "
                                                                ? productReceiveIcon
                                                                : single_product.processing_status ==
                                                                "Product Delivered "
                                                                    ? deliveryHandIcon
                                                                    : productIcon}
                                    </span>
                                                                    </div>
                                                                    <div className="order-track-text">
                                                                        <div className="">
                                                                            <div className="order-track-text-stat ">
                                        <span className=" d-inline-block d-flex border-bottom">
                                          {single_product.processing_status}
                                            {"  : "}
                                            <span className="justify-content-end">
                                            {" "}
                                                {single_product.date_time}
                                          </span>
                                        </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                </div>
                                            </div>
                                            {/*  */}
                                            {/* <h4>Datewise Status</h4>

                                            <table className="table table-bordered table-sm">
                                                <thead>
                                                <th>Date time</th>
                                                <th>Processing status</th>

                                                </thead>
                                                <tbody>
                                                {
                                                    infoData.status_datetime && infoData.status_datetime.map(single_product => (

                                                            <tr>
                                                                <td>{single_product.date_time}</td>
                                                                <td>{single_product.processing_status}</td>

                                                            </tr>
                                                        )
                                                    )
                                                }
                                                </tbody>
                                            </table> */}

                                            <div className="d-flex">
                                                <div className="order-track shadow p-3 mb-5 bg-white rounded m-auto modal-width">
                                                    <h4>Details Info</h4>

                                                    <h6>
                            <span className="badge bg-secondary">
                              Product Name
                            </span>
                                                        :{" "}
                                                        {infoData.product_infor &&
                                                            infoData.product_infor.producT_NAME}
                                                    </h6>
                                                    <h6>
                            <span className="badge bg-secondary">
                              Product Waybill Number
                            </span>
                                                        :{" "}
                                                        {infoData.product_infor &&
                                                            infoData.product_infor.producT_WAYBILL_NUMBER}
                                                    </h6>
                                                    <h6>
                                                        <span className="badge bg-secondary">Address</span>:{" "}
                                                        {infoData.product_infor &&
                                                            infoData.product_infor.address}
                                                    </h6>
                                                    <h6>
                            <span className="badge bg-secondary">
                              Product Return Address
                            </span>
                                                        :{" "}
                                                        {infoData.product_infor &&
                                                            infoData.product_infor.producT_RETURN_ADDRESS}
                                                    </h6>
                                                    <h6>
                            <span className="badge bg-secondary">
                              Product Total
                            </span>
                                                        :{" "}
                                                        {infoData.product_infor &&
                                                            infoData.product_infor.producT_TOTAL}
                                                    </h6>
                                                    <h6>
                            <span className="badge bg-secondary">
                              Product Type
                            </span>
                                                        :{" "}
                                                        {infoData.product_infor &&
                                                            infoData.product_infor.producT_TYPE}
                                                    </h6>
                                                    <h6>
                            <span className="badge bg-secondary">
                              Product Urgent STATUS
                            </span>
                                                        :{" "}
                                                        {infoData.product_infor &&
                                                            infoData.product_infor.producT_URGENT_STATUS}
                                                    </h6>
                                                    <h6>
                            <span className="badge bg-secondary">
                              Product VALUE AMOUNT
                            </span>
                                                        :{" "}
                                                        {infoData.product_infor &&
                                                            infoData.product_infor.producT_VALUE_AMOUNT}
                                                    </h6>

                                                    <h6>
                            <span className="badge bg-secondary">
                              Product WEIGHT
                            </span>
                                                        :{" "}
                                                        {infoData.product_infor &&
                                                            infoData.product_infor.producT_WEIGHT}
                                                    </h6>

                                                    <h6>
                            <span className="badge bg-secondary">
                              Receiver NAME
                            </span>
                                                        :{" "}
                                                        {infoData.product_infor &&
                                                            infoData.product_infor.receiveR_NAME}
                                                    </h6>
                                                    <h6>
                            <span className="badge bg-secondary">
                              Receiver PHONE NUMBER
                            </span>
                                                        :{" "}
                                                        {infoData.product_infor &&
                                                            infoData.product_infor.receiveR_PHONE_NUMBER}
                                                    </h6>
                                                    <h6>
                            <span className="badge bg-secondary">
                              Reference NO
                            </span>
                                                        :{" "}
                                                        {infoData.product_infor &&
                                                            infoData.product_infor.referencE_NO}
                                                    </h6>
                                                    <h6>
                            <span className="badge bg-secondary">
                              Return PIN
                            </span>
                                                        :{" "}
                                                        {infoData.product_infor &&
                                                            infoData.product_infor.returN_PIN}
                                                    </h6>

                                                    <h6>
                            <span className="badge bg-secondary">
                              Area CODE
                            </span>
                                                        :{" "}
                                                        {infoData.product_infor &&
                                                            infoData.product_infor.areA_CODE}
                                                    </h6>
                                                    <h6>
                            <span className="badge bg-secondary">
                              Bag ID NUMBER
                            </span>
                                                        :{" "}
                                                        {infoData.product_infor &&
                                                            infoData.product_infor.baG_ID_NUMBER}
                                                    </h6>
                                                    <h6>
                            <span className="badge bg-secondary">
                              Consignee NAME
                            </span>
                                                        :{" "}
                                                        {infoData.product_infor &&
                                                            infoData.product_infor.consigneE_NAME}
                                                    </h6>
                                                    <h6>
                            <span className="badge bg-secondary">
                              Contact NUMBER
                            </span>
                                                        :{" "}
                                                        {infoData.product_infor &&
                                                            infoData.product_infor.contacT_NUMBER}
                                                    </h6>
                                                    <h6>
                            <span className="badge bg-secondary">
                              District INCHARGE ID
                            </span>
                                                        :{" "}
                                                        {infoData.product_infor &&
                                                            infoData.product_infor.districT_INCHARGE_ID}
                                                    </h6>
                                                    <h6>
                            <span className="badge bg-secondary">
                              Emergency NUMBER
                            </span>
                                                        :{" "}
                                                        {infoData.product_infor &&
                                                            infoData.product_infor.emergencY_NUMBER}
                                                    </h6>
                                                    <h6>
                            <span className="badge bg-secondary">
                              EOD STATUS
                            </span>
                                                        :{" "}
                                                        {infoData.product_infor &&
                                                            infoData.product_infor.eoD_STATUS}
                                                    </h6>
                                                    <h6>
                            <span className="badge bg-secondary">
                              EOD STATUS DATETIME
                            </span>
                                                        :{" "}
                                                        {infoData.product_infor &&
                                                            infoData.product_infor.eoD_STATUS_DATETIME}
                                                    </h6>
                                                    <h6>
                            <span className="badge bg-secondary">
                              EOD STATUS FINISH DATETIME
                            </span>
                                                        :{" "}
                                                        {infoData.product_infor &&
                                                            infoData.product_infor.eoD_STATUS_FINISH_DATETIME}
                                                    </h6>
                                                    <h6>
                                                        <span className="badge bg-secondary">Pincode</span>:{" "}
                                                        {infoData.product_infor &&
                                                            infoData.product_infor.pincode}
                                                    </h6>
                                                    <h6>
                            <span className="badge bg-secondary">
                              Product CUSTOMER ID
                            </span>
                                                        :{" "}
                                                        {infoData.product_infor &&
                                                            infoData.product_infor.producT_CUSTOMER_ID}
                                                    </h6>
                                                    <h6>
                            <span className="badge bg-secondary">
                              Product DELEVERED BY
                            </span>
                                                        :{" "}
                                                        {infoData.product_infor &&
                                                            infoData.product_infor.producT_DELEVERED_BY}
                                                    </h6>
                                                    <h6>
                            <span className="badge bg-secondary">
                              Product DELEVERY TIME
                            </span>
                                                        :{" "}
                                                        {infoData.product_infor &&
                                                            infoData.product_infor.producT_DELEVERY_TIME}
                                                    </h6>
                                                    <h6>
                            <span className="badge bg-secondary">
                              Product DESCRIPTION
                            </span>
                                                        :{" "}
                                                        {infoData.product_infor &&
                                                            infoData.product_infor.producT_DESCRIPTION}
                                                    </h6>

                                                    <h6>
                            <span className="badge bg-secondary">
                              Product DETAILS
                            </span>
                                                        :{" "}
                                                        {infoData.product_infor &&
                                                            infoData.product_infor.producT_DETAILS}
                                                    </h6>
                                                    <h6>
                            <span className="badge bg-secondary">
                              Product ENTRY TIME
                            </span>
                                                        :{" "}
                                                        {infoData.product_infor &&
                                                            infoData.product_infor.producT_ENTRY_TIME}
                                                    </h6>
                                                    <h6>
                            <span className="badge bg-secondary">
                              Product ID
                            </span>
                                                        :{" "}
                                                        {infoData.product_infor &&
                                                            infoData.product_infor.producT_ID}
                                                    </h6>
                                                    <h6>
                            <span className="badge bg-secondary">
                              Product LOCK STATUS
                            </span>
                                                        :{" "}
                                                        {infoData.product_infor &&
                                                            infoData.product_infor.producT_LOCK_STATUS}
                                                    </h6>

                                                    <h6>
                            <span className="badge bg-secondary">
                              Product PAYMENT TYPE
                            </span>
                                                        :{" "}
                                                        {infoData.product_infor &&
                                                            infoData.product_infor.producT_PAYMENT_TYPE}
                                                    </h6>
                                                    <h6>
                            <span className="badge bg-secondary">
                              Product PROCESSING STATUS
                            </span>
                                                        :{" "}
                                                        {infoData.product_infor &&
                                                            infoData.product_infor.producT_PROCESSING_STATUS}
                                                    </h6>
                                                    <h6>
                            <span className="badge bg-secondary">
                              Product PRODESSING STATUS DATE
                            </span>
                                                        :{" "}
                                                        {infoData.product_infor &&
                                                            infoData.product_infor
                                                                .producT_PRODESSING_STATUS_DATETIME}
                                                    </h6>
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

                                    {/*new design accounts panel report download start */}

                                    <div className="">
                                        <h4 className="text-dark text-center">Report Download</h4>
                                        <div className="container shadow my-3 py-3 rounded single-product-upload-bg">
                                            <div className="row">
                                                {/*<div className="col-lg-6 col-md-6 col-12">*/}
                                                {/*    <div className="row my-2">*/}
                                                {/*        <div className="col-lg-3 col-md-3 col-12">*/}
                                                {/*            <p> DC Name:</p>*/}
                                                {/*        </div>*/}
                                                {/*        <div className="col-lg-9 col-md-9 col-12">*/}
                                                {/*            <input*/}
                                                {/*                className="shadow-lg form-control  me-3 bg-white rounded"*/}
                                                {/*                // defaultValue={clientName}*/}
                                                {/*                list="dcNames"*/}
                                                {/*                onChange={(e) => {*/}
                                                {/*                    setdcname(e.target.value);*/}
                                                {/*                }}*/}
                                                {/*            ></input>*/}
                                                {/*            <datalist id="dcNames">*/}
                                                {/*                <option selected value="">*/}
                                                {/*                    None*/}
                                                {/*                </option>*/}
                                                {/*                {dc_name.map((single_dc_office_name) => {*/}
                                                {/*                    // console.log("SINGLE DC NAME:", single_dc_office_name);*/}
                                                {/*                    return (*/}
                                                {/*                        <option*/}
                                                {/*                            value={single_dc_office_name*/}
                                                {/*                                .toString()*/}
                                                {/*                                .toLowerCase()}*/}
                                                {/*                        ></option>*/}
                                                {/*                    );*/}
                                                {/*                })}*/}
                                                {/*            </datalist>*/}
                                                {/*        </div>*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}
                                                {/*<div className="col-lg-6 col-md-6 col-12">*/}
                                                {/*    <div className="row my-2">*/}
                                                {/*        <div className="col-lg-3 col-md-3 col-12">*/}
                                                {/*            <p>Client Name:</p>*/}
                                                {/*        </div>*/}
                                                {/*        <div className="col-lg-9 col-md-9 col-12">*/}
                                                {/*            <input*/}
                                                {/*                className="shadow-lg form-control  me-3 bg-white rounded"*/}
                                                {/*                list="clientNames"*/}
                                                {/*                id="clientname"*/}
                                                {/*                onChange={(e) => {*/}
                                                {/*                    setclient(e.target.value);*/}
                                                {/*                }}*/}
                                                {/*            />*/}
                                                {/*            <datalist id="clientNames">*/}
                                                {/*                <option selected value="">*/}
                                                {/*                    None*/}
                                                {/*                </option>*/}
                                                {/*                {clientname.map((single_dc_office_name) => {*/}
                                                {/*                    // console.log("SINGLE DC NAME:", single_dc_office_name);*/}
                                                {/*                    return (*/}
                                                {/*                        <option*/}
                                                {/*                            value={single_dc_office_name}*/}
                                                {/*                        ></option>*/}
                                                {/*                    );*/}
                                                {/*                })}*/}
                                                {/*            </datalist>*/}
                                                {/*        </div>*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-12">
                                                    <div className="row my-2">
                                                        <div className="col-lg-3 col-md-3 col-12">
                                                            <p> Start Date:</p>
                                                        </div>
                                                        <div className="col-lg-9 col-md-9 col-12">
                                                            <input
                                                                style={{
                                                                    backgroundColor: "#fff",
                                                                    outline: "none",
                                                                    border: "none",
                                                                    padding: "7px",
                                                                    borderRadius: "8px",
                                                                    width: "100%",
                                                                }}
                                                                className="input-small "
                                                                type="date"
                                                                id="startdate"
                                                                value={startdate}
                                                                onChange={(e) => {
                                                                    setstartdate(e.target.value);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-12">
                                                    <div className="row my-2">
                                                        <div className="col-lg-3 col-md-3 col-12">
                                                            <p> End Date:</p>
                                                        </div>
                                                        <div className="col-lg-9 col-md-9 col-12">
                                                            <input
                                                                style={{
                                                                    backgroundColor: "#fff",
                                                                    outline: "none",
                                                                    border: "none",
                                                                    padding: "7px",
                                                                    borderRadius: "8px",
                                                                    width: "100%",
                                                                }}
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
                                                </div>
                                            </div>
                                            <div className="row">
                                                {/*<div className="col-lg-6 col-md-6 col-12">*/}
                                                {/*    <div className="row my-2">*/}
                                                {/*        <div className="col-lg-3 col-md-3 col-12">*/}
                                                {/*            <p> Payement Type:</p>*/}
                                                {/*        </div>*/}
                                                {/*        <div className="col-lg-9 col-md-9 col-12">*/}
                                                {/*            <select*/}
                                                {/*                className="form-select"*/}
                                                {/*                id="paymenttype"*/}
                                                {/*                onChange={(e) => {*/}
                                                {/*                    setpaymenttype(e.target.value);*/}
                                                {/*                }}*/}
                                                {/*            >*/}
                                                {/*                <option selected value={null}>*/}
                                                {/*                    None*/}
                                                {/*                </option>*/}
                                                {/*                <option value="COD">COD</option>*/}
                                                {/*                <option value="Prepaid">Prepaid</option>*/}
                                                {/*            </select>*/}
                                                {/*        </div>*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}
                                                <div className="col-lg-6 col-md-6 col-12">
                                                    <div className="row my-2">
                                                        <div className="col-lg-3 col-md-3 col-12">
                                                            <p> Status:</p>
                                                        </div>
                                                        <div className="col-lg-9 col-md-9 col-12">
                                                            <div
                                                                style={{
                                                                    backgroundColor: "#fff",
                                                                    outline: "none",
                                                                    border: "none",
                                                                    borderRadius: "8px",
                                                                }}
                                                            >
                                                                <Multiselect
                                                                    isObject={false}
                                                                    onRemove={(event) => {
                                                                        console.log(event);
                                                                        finalstatus.pop(event);
                                                                    }}
                                                                    onSelect={(event) => {
                                                                        console.log(event);
                                                                        setfinalstatus(event);
                                                                        //finalstatus.push(event.selectedItem)
                                                                    }}
                                                                    options={status}
                                                                    selectedValues={[]}
                                                                    //showCheckbox
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 d-flex justify-content-center mt-4 mb-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-success btn-sm px-4 rounded-pill"
                                                    onClick={search}
                                                >
                                                    Search
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {/*new design accounts panel report download end */}

                                    {/* <div className="border  mb-5">
                    <form className="row d-flex justify-content-center">
                      <div className=" col-sm-4 form-group mx-3 mt-2">
                        <div className=" text-center text-black mx-1">
                          DC Name:
                        </div>
                        <input
                          className="form-control "
                          list="dcNames"
                          onChange={(e) => {
                            setdcname(e.target.value);
                          }}
                        />
                        <datalist id="dcNames">
                          <option selected value="">
                            None
                          </option>
                          {dc_name.map((single_dc_office_name) => {
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
                      <div className="col-sm-4 form-group mx-3 mt-2">
                        <div className=" text-center text-black mx-1">
                          Client Name:
                        </div>
                        <input
                          className="form-control"
                          list="clientNames"
                          id="clientname"
                          onChange={(e) => {
                            setclient(e.target.value);
                          }}
                        />
                        <datalist id="clientNames">
                          <option selected value="">
                            None
                          </option>
                          {clientname.map((single_dc_office_name) => {
                            return (
                              <option value={single_dc_office_name}></option>
                            );
                          })}
                        </datalist>
                      </div>
                      <div className=" col-sm-4 form-group mx-3 mt-4">
                        <div className=" text-center text-black m-2">
                          Start Date:{" "}
                          <input
                            className="input-small "
                            type="date"
                            id="startdate"
                            value={startdate}
                            onChange={(e) => {
                              setstartdate(e.target.value);
                            }}
                          />
                        </div>
                      </div>
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
                      <div className=" col-sm-4 form-group mx-3 mt-4">
                        <div className=" text-center text-black mx-1">
                          Payement Type:
                        </div>
                        <select
                          className="form-select"
                          id="paymenttype"
                          onChange={(e) => {
                            setpaymenttype(e.target.value);
                          }}
                        >
                          <option selected value={null}>
                            None
                          </option>
                          <option value="COD">COD</option>
                          <option value="Prepaid">Prepaid</option>
                        </select>
                      </div>
                      <div className=" col-sm-4 form-group mx-3 mt-4">
                        <div className=" text-center text-black mx-1">
                          Status:
                        </div>

                        <Multiselect
                          isObject={false}
                          onRemove={(event) => {
                            console.log(event);
                            finalstatus.pop(event);
                          }}
                          onSelect={(event) => {
                            console.log(event);
                            setfinalstatus(event);
                          }}
                          options={status}
                          selectedValues={[]}
                          //showCheckbox
                        />
                      </div>
                      <div className="row-2 mt-5 d-flex justify-content-center">
                        <div className="col-8 mx-5">
                          <div className="">
                            <form></form>
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
                      </div>
                    </form>
                  </div> */}

                                    <div id="requesttable">
                                        <div id="no-more-tables">
                                            {/* <CSVLink data={searchreasult}
                                                     className="btn btn-sm bg-info text-black border-info mb-2">Download
                                                csv</CSVLink> */}
                                            <ReactHTMLTableToExcel
                                                className="js-download-link btn btn-dark px-4 btn-sm mb-2 text-white rounded-pill"
                                                table="reportops"
                                                filename="ReportExcel"
                                                sheet="Sheet"
                                                buttonText="Report Csv"
                                            />
                                            {/*Table*/}
                                            <table
                                                id="reportops"
                                                className="table css-serial bg-white"
                                                style={{ fontSize: "13px", marginLeft: "1px" }}
                                            >
                                                {/*Table head*/}
                                                <thead
                                                    className="text-center shadow sticky-top"
                                                    style={{
                                                        backgroundColor: "#b4bec2",
                                                        top: "60px",
                                                        zIndex: 0,
                                                    }}
                                                >
                                                <tr className="text-dark" style={{ border: "none" }}>
                                                    <th>SL</th>
                                                    <th scope="col">Waybill</th>
                                                    <th>Order ID</th>
                                                    <th scope="col">Customer Name</th>
                                                    <th scope="col">Customer No.</th>
                                                    <th scope="col">Consignee Name</th>
                                                    <th scope="col">Consignee No.</th>
                                                    <th scope="col">Details</th>
                                                    <th>Value</th>
                                                    <th>Weight</th>

                                                    <th scope="col">Dc Office</th>
                                                    <th scope="col">FE Name</th>
                                                    <th>Final Status</th>
                                                    <th>Entry Date</th>
                                                    <th>Current Status</th>
                                                    <th>Status date</th>
                                                    <th>Reason</th>
                                                </tr>
                                                </thead>
                                                {/*Table head*/}
                                                {/*Table body*/}
                                                <tbody className="text-center border border-secondary">
                                                {searchreasult.map((single_message) => {
                                                    let clor;
                                                    let finalstatus;
                                                    if (
                                                        single_message.color_code.includes(
                                                            "Product in System"
                                                        )
                                                    ) {
                                                        clor = "bg-primary";
                                                    } else if (
                                                        single_message.color_code.includes("Hold")
                                                    ) {
                                                        clor = "bg-warning";
                                                    } else if (
                                                        single_message.color_code.includes(
                                                            "RETURNED_PRODUCT_INFORMATION"
                                                        )
                                                    ) {
                                                        clor = "bg-info";
                                                    } else if (
                                                        single_message.color_code.includes(
                                                            "DELEVERED_PRODUCT_INFORMATION"
                                                        )
                                                    ) {
                                                        clor = "bg-success";
                                                    } else if (
                                                        single_message.color_code.includes(
                                                            "LOST_PRODUCT_INFORMATION"
                                                        )
                                                    ) {
                                                        clor = "bg-danger";
                                                    } else {
                                                        clor = "bg-info";
                                                    }

                                                    if (
                                                        single_message.color_code.includes(
                                                            "DELEVERED_PRODUCT_INFORMATION"
                                                        )
                                                    ) {
                                                        finalstatus = "Delivered";
                                                    } else if (
                                                        single_message.color_code.includes(
                                                            "LOST_PRODUCT_INFORMATION"
                                                        )
                                                    ) {
                                                        finalstatus = "Lost";
                                                    } else if (
                                                        single_message.color_code.includes(
                                                            "RETURNED_PRODUCT_INFORMATION"
                                                        )
                                                    ) {
                                                        finalstatus = "Returned";
                                                    } else if (
                                                        single_message.color_code.includes("PRODUCT")
                                                    ) {
                                                        finalstatus = "Product In System";
                                                    } else {
                                                        finalstatus = "";
                                                    }

                                                    return (
                                                        <tr
                                                            key={single_message.product_waybill}
                                                            className=""
                                                        >
                                                            <td></td>

                                                            <td data-title="WayBill" className="w-100">
                                                                <button
                                                                    className="btn btn-sm btn-outline-primary "
                                                                    onClick={(e) =>
                                                                        openModal(
                                                                            e,
                                                                            single_message.product_waybill
                                                                        )
                                                                    }
                                                                >
                                                                    {single_message.product_waybill}
                                                                </button>
                                                            </td>
                                                            <td>{single_message.order_id}</td>
                                                            <td>{single_message.client_name}</td>
                                                            <td>{single_message.client_contact}</td>
                                                            <td>{single_message.consingee_name}</td>
                                                            <td>{single_message.consignee_contact}</td>
                                                            <td>{single_message.product_des}</td>
                                                            <td>{single_message.cod_amount}</td>
                                                            <td>{single_message.product_weight}</td>

                                                            <td>{single_message.dc_name}</td>
                                                            <td>{single_message.fe_name}</td>
                                                            <td className={`${clor} text-white`}>
                                                                {finalstatus}
                                                            </td>
                                                            <td>
                                                                {single_message.product_entry_time &&
                                                                    single_message.product_entry_time.split(
                                                                        "T"
                                                                    )[0]}
                                                            </td>
                                                            <td className={`${clor} text-white`}>
                                                                {single_message.product_processing_status}
                                                            </td>
                                                            <td>
                                                                {single_message.product_processing_status_datetime &&
                                                                    single_message.product_processing_status_datetime.split(
                                                                        "T"
                                                                    )[0]}
                                                            </td>
                                                            <td>{single_message.reason}</td>
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
export default Reportdownloaddc;
