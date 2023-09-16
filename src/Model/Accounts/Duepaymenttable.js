import React, { useState, useEffect, useContext } from "react";
import reactDom from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { SearchContext } from "../../Context/searchContext";
import { SearchButtonContext } from "../../Context/buttonContext";
import BarCode, { useBarcode } from "react-barcode";
import { jsPDF } from "jspdf";
import { CSVLink, CSVDownload } from "react-csv";
import { toast } from "react-toastify";

import ReactHTMLTableToExcel from "react-html-table-to-excel";
import {
    Linksidebar,
    CustomerCareLinksidebar,
    Salessidebar,
    Operationsidebar,
    Degital_Ocean_flag,
    company_name,
    acsidebar,
} from "../../Common/Linksidebar";
import { LoginContext } from "../../Context/loginContext";
//for modal popup
import Modal from "react-modal";
//import './sc.css';

import html2canvas from "html2canvas";
import Duepayment from "../../Accounts_Panel/js/Duepayment";

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

const Duepaymenttable = (props) => {
    toast.configure();
    const [alldata, setalldata] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [allclient, setAllClient] = useState([]);
    const [clientName, setClientName] = useState("");
    const [endDate, setEndDate] = useState("");
    const [startDate, setStartDate] = useState("");
    const [submitFlag, setSubmitFlag] = useState(false);

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
            setlogingInformation_LocalStore(context_flag_obj);
        }
    }, []);

    let json_information = props.response;

    useEffect(() => {
        console.log("this is json", json_information);
        setAllClient(json_information.message.all_client_name);
    }, []);

    console.log("client name", clientName);
    console.log("start date", startDate);
    console.log("end date", endDate);

    console.log("all client", allclient);
    const search = (e) => {
        if (clientName === "" || clientName === null) {
            toast.warning("Select Client Name");
            return;
        }

        if (startDate === "" || startDate === null) {
            toast.warning("Select Start Date");
            return;
        }
        if (endDate === "" || endDate === null) {
            toast.warning("Select End Date");
            return;
        }

        setIsLoading(true);
        toast.info("searching...");
        var axios = require("axios");

        var data = JSON.stringify({
            employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
            client_id: parseInt(clientName),
            start_date: startDate,
            end_date: endDate,
        });
        var config = {
            method: "post",
            url: Degital_Ocean_flag
                ? "https://e-deshdelivery.com/universalapi/allapi/accountPaneldateWisePaymentfromClient" +
                "?company_name=" +
                company_name
                : "/universalapi/allapi/accountPaneldateWisePaymentfromClient" +
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
                console.log("all res is here ", res);
                toast.success("Successfully Searched", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
                setalldata(res.message);
                setIsLoading(false);

                //setDisplayInvoice(res);
                //setpayload(true);
            })
            .catch(function (error) {
                console.log(error);
                setIsLoading(false);
            });
    };

    // useEffect(() => {
    //   if (clientName === "" || clientName === null) {
    //     toast.warning("Select Client Name");
    //     return;
    //   }

    //   if (startDate === "" || startDate === null) {
    //     toast.warning("Select Start Date");
    //     return;
    //   }
    //   if (endDate === "" || endDate === null) {
    //     toast.warning("Select End Date");
    //     return;
    //   }

    //   setIsLoading(true);
    //   toast.info("searching...");
    //   var axios = require("axios");

    //   var data = JSON.stringify({
    //     employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
    //     client_id: parseInt(clientName),
    //     start_date: startDate,
    //     end_date: endDate,
    //   });
    //   var config = {
    //     method: "post",
    //     url: Degital_Ocean_flag
    //       ? "https://e-deshdelivery.com/universalapi/allapi/accountPaneldateWisePaymentfromClient" +
    //         "?company_name=" +
    //         company_name
    //       : "/universalapi/allapi/accountPaneldateWisePaymentfromClient" +
    //         "?company_name=" +
    //         company_name,
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${logingInformation_LocalStore.token}`,
    //     },
    //     data: data,
    //   };
    //   console.log("config", config);
    //   axios(config)
    //     .then(function (response) {
    //       let json_object_str = JSON.stringify(response.data);
    //       let json_object = JSON.parse(json_object_str);
    //       console.log("response is : ", json_object);
    //       return json_object;
    //     })
    //     .then((res) => {
    //       console.log("all res is here ", res);
    //       toast.success("Successfully Searched", {
    //         position: "top-right",
    //         autoClose: 3000,
    //         hideProgressBar: true,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //       });
    //       setalldata(res.message);
    //       setIsLoading(false);

    //       //setDisplayInvoice(res);
    //       //setpayload(true);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //       setIsLoading(false);
    //     });
    // }, [submitFlag, logingInformation_LocalStore]);
    console.log("all data is here", alldata);
    return (
        <>
            <div className=" container">
                {/*new design accounts panel DUE Payment start */}
                <div className="col-lg-8 col-md-11 col-10 m-auto">
                    <div className="">
                        <h4 className="text-dark text-center">Due Payment</h4>
                        <div className="container shadow my-3 py-3 rounded single-product-upload-bg">
                            <div className="row my-2">
                                <div className="col-lg-2 col-md-2 col-12">
                                    <p>Client Name:</p>
                                </div>
                                <div className="col-lg-10 col-md-10 col-12">
                                    <select
                                        style={{
                                            backgroundColor: "#fff",
                                            outline: "none",
                                            border: "none",
                                            padding: "7px",
                                            borderRadius: "8px",
                                            width: "100%",
                                        }}
                                        className="form-select"
                                        id="clientname"
                                        onChange={(e) => {
                                            setClientName(e.target.value);
                                        }}
                                    >
                                        <option selected value="none">
                                            None
                                        </option>
                                        {allclient.map((client) => {
                                            return (
                                                <option value={client.client_id}>
                                                    {client.client_name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-12">
                                    <div className="row my-2">
                                        <div className="col-lg-4 col-md-4 col-12">
                                            <p> Start Date:</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-12">
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
                                                value={startDate}
                                                onChange={(e) => {
                                                    setStartDate(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <div className="row my-2">
                                        <div className="col-lg-4 col-md-4 col-12">
                                            <p> End Date:</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-12">
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
                                                value={endDate}
                                                onChange={(e) => {
                                                    setEndDate(e.target.value);
                                                }}
                                            />
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
                </div>

                {/*new design accounts panel DUE Payment end */}
                {/* <div className="border  mb-5">
          <form className="row d-flex justify-content-center">
            <div className="col-sm-4 form-group mx-3 mt-2">
              <div className=" text-center text-black mx-1">Client Name:</div>
              <select
                className="form-select"
                id="clientname"
                onChange={(e) => {
                  setClientName(e.target.value);
                }}
              >
                <option selected value="none">
                  None
                </option>
                {allclient.map((client) => {
                  return (
                    <option value={client.client_id}>
                      {client.client_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className=" col-sm-4 form-group mx-3 mt-4">
              <div className=" text-center text-black m-2">
                Start Date:{" "}
                <input
                  type="date"
                  className="input-small "
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
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
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="col-md-12 d-flex justify-content-center mt-4 mb-2">
              <button
                type="button"
                onClick={search}
                className="btn btn-outline-primary"
              >
                Search
              </button>
            </div>
          </form>
        </div> */}

                <div className=" mt-5" id="no-more-tables">
                    <ReactHTMLTableToExcel
                        className="js-download-linkbtn btn-sm btn-dark px-3 mb-2 me-2 rounded-3"
                        table="export-table-data"
                        filename={`ClientInfo${getCurrentTime()}`}
                        sheet="Sheet"
                        buttonText="Export excel"
                    />
                    <table
                        className="table bg-white"
                        style={{ fontSize: "13px", marginLeft: "1px" }}
                        // id="tableacc"
                        id="export-table-data"
                    >
                        <thead
                            className="text-center shadow sticky-top"
                            style={{
                                backgroundColor: "#b4bec2",
                                top: "60px",
                                zIndex: 0,
                            }}
                        >
                        <tr className="text-dark" style={{ border: "none" }}>
                            {/* <th scope="col">SL</th>
                           <th scope="col">
                               <div className="custom-control custom-checkbox">
                                   <input type="checkbox" className="custom-control-input" name="allSelect" onChange={(e) => select_all_function()} />

                               </div>
                           </th> */}

                            <th scope="col">Client Name</th>

                            <th scope="col">Total Charge From Client</th>
                            <th scope="col">Total Delivered Charge</th>
                            <th scope="col">Total Delivered Product</th>
                            <th scope="col">Total Inside Dhaka Delivered Product</th>
                            <th scope="col">Total Inside Dhaka Delivery Charge</th>
                            <th scope="col">Total Outside Dhaka Delivered Product</th>
                            <th scope="col">Total Outside Dhaka Delivery Charge</th>
                            <th scope="col">Total Return Charge</th>
                            <th scope="col">Total Return Product</th>
                            <th scope="col">Total Shipment</th>

                            {/* <th><button className="btn btn-sm bg-info text-black border-info mb-2" onClick={(e) => print_function(e)}>Print All</button> </th>
                            <th><CSVLink data={users} className="btn btn-sm bg-info text-black border-info mb-2" >Export csv</CSVLink></th> */}
                        </tr>
                        </thead>

                        <tbody className="text-center border border-secondary">
                        {/* {allinvoice.all_invoice_information && allinvoice.all_invoice_information.map(invoice => ( */}
                        <tr>
                            <td
                                data-title="Client Name"
                                scope="col"
                                className="text-end pe-3"
                            >
                                {alldata.C_name}
                            </td>
                            <td
                                data-title="Total Charge From Client"
                                scope="col"
                                className="text-end pe-3"
                            >
                                {alldata.total_charge_from_client}
                            </td>
                            <td
                                data-title="Total Delivered Charge"
                                scope="col"
                                className="text-end pe-3"
                            >
                                {alldata.total_delevered_charge}
                            </td>
                            <td
                                data-title="Total Delivered Product"
                                scope="col"
                                className="text-end pe-3"
                            >
                                {alldata.total_delevered_product}
                            </td>
                            <td
                                data-title="Total Inside Dhaka Delivered Product"
                                scope="col"
                                className="text-end pe-3"
                            >
                                {alldata.total_inside_dhaka_delevered_product}
                            </td>
                            <td
                                data-title="Total Inside Dhaka Delivery Charge"
                                scope="col"
                                className="text-end pe-3"
                            >
                                {alldata.total_inside_dhaka_delevery_charge}
                            </td>
                            <td
                                data-title="Total Outside Dhaka Delivered Product"
                                scope="col"
                                className="text-end pe-3"
                            >
                                {alldata.total_outside_dhaka_delevered_product}
                            </td>
                            <td
                                data-title="Total Outside Dhaka Delivery Charge"
                                scope="col"
                                className="text-end pe-3"
                            >
                                {alldata.total_outside_dhaka_delevery_charge}
                            </td>
                            <td
                                data-title="Total Return Charge"
                                scope="col"
                                className="text-end pe-3"
                            >
                                {alldata.total_return_charge}
                            </td>
                            <td
                                data-title="Total Return Product"
                                scope="col"
                                className="text-end pe-3"
                            >
                                {alldata.total_return_product}
                            </td>
                            <td
                                data-title="Total Shipment"
                                scope="col"
                                className="text-end pe-3"
                            >
                                {alldata.total_shipment}
                            </td>
                        </tr>

                        {/* ))} */}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};
export default Duepaymenttable;
