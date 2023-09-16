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
import { CSVLink, CSVDownload } from "react-csv";

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

export default function ViewDcPayment() {
    const [startdate, setstartdate] = useState(null);
    const [enddate, setenddate] = useState(null);
    const [dcname, setdcname] = useState(null);
    const [dc_name, setdc_name] = useState([]);

    const [employId, setemployId] = useState("");
    const [information, setinformation] = useState([]);
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

    const search = () => {
        // console.log("this is singlestatus", final)

        var axios = require("axios");
        var data = JSON.stringify({
            dc_id: logingInformation_LocalStore.all_user_list.employeE_ID,
            start_date: startdate,
            end_date: enddate,
        });
        console.log("this is data : ", data);
        var config = {
            method: "post",
            url: Degital_Ocean_flag
                ? "https://e-deshdelivery.com/universalapi/allapi/dcPaymentInvoiceDisplay" +
                "?company_name=" +
                company_name
                : "/universalapi/allapi/dcPaymentInvoiceDisplay" +
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
                setinformation(res.data.message);
                setenddate("");
                setstartdate("");
                console.log("theis is res invoice display", information);

                //setinfoModalOpen(true);

                setpayload(true);
            });
    };

    return (
        <>
            <div className="">
                <div className="row">
                    <div className="col-12">
                        <Navbar sidebar_manu={siteBarInformation_LocalStore} />
                    </div>
                </div>
                {/* <div className="row">
              <div className="col-12">
               <Sidebar sidebar_manu={siteBarInformation_LocalStore}/>
              </div>
              </div> */}

                {/* <div className="row container">
                        <div className="col-6 " id="srchmenu">
                                <Search/>
                        </div>
                   </div> */}
                <div className=" container">
                    <div className="col-12" id="">
                        <div className="">
                            {/* search option */}
                            <div className="row">
                                {/*  */}
                                <div className="col-lg-8 col-md-11 col-10  m-auto ">
                                    {/*new design accounts panel report download start */}

                                    <div className="mt-5 pt-5">
                                        <div className="container shadow my-3 py-3 rounded single-product-upload-bg">
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
                                                                value={enddate}
                                                                onChange={(e) => {
                                                                    setenddate(e.target.value);
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
                                {/*  */}
                            </div>

                            {/* <div className="border  mb-5">
                <form className="row d-flex justify-content-center">
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

                            <div id="no-more-tables" className="mt-5">
                                <div>
                                    <CSVLink
                                        data={information}
                                        className="btn btn-sm bg-info text-black border-info mb-2"
                                    >
                                        Download csv
                                    </CSVLink>

                                    <table
                                        className="table bg-white  data-title=''"
                                        style={{ fontSize: "12px" }}
                                    >
                                        <thead
                                            className="text-center shadow sticky-top "
                                            // style={{ backgroundColor: "#f1f1f1" }}
                                            style={{
                                                backgroundColor: "#b4bec2",
                                                top: "60px",
                                                zIndex: "0",
                                            }}
                                        >
                                        <tr className="text-dark" style={{ border: "none" }}>
                                            <th>ID</th>
                                            <th scope="col">Invoice</th>
                                            <th>Transaction Number</th>
                                            <th>DC</th>
                                            <th scope="col">Product Value</th>
                                            <th scope="col">Delivery Product</th>
                                            <th scope="col">Paid Amount</th>
                                            <th>Pending Amount</th>
                                            <th>POD Date</th>
                                        </tr>
                                        </thead>

                                        <tbody className="text-center border border-dark">
                                        {information &&
                                            information.map((information1) => {
                                                return (
                                                    information1.all_invoice_info &&
                                                    information1.all_invoice_info.map(
                                                        (single_message) => {
                                                            let color = "bg-success text-white";
                                                            if (
                                                                parseInt(
                                                                    single_message.invoicE_CONFIRM_EMPLOYEE_ID
                                                                ) === 0
                                                            ) {
                                                                color = "bg-danger text-white";
                                                            }

                                                            return (
                                                                <tr key={single_message.id} className={color}>
                                                                    <td data-title="ID">{single_message.id}</td>
                                                                    {/* className="btn btn-outline-primary text-white"*/}
                                                                    <td data-title="Invoice" scope="row">
                                                                        {single_message.paymenT_INVOICE_NUMBER}
                                                                    </td>
                                                                    <td data-title="Transaction Number">
                                                                        {single_message.transactioN_NUMBER}
                                                                    </td>
                                                                    <td data-title="DC">
                                                                        {single_message.districT_INCHARGE_ID}
                                                                    </td>
                                                                    <td data-title="Product Value">
                                                                        {single_message.totaL_PRODUCT_VALUE}
                                                                    </td>
                                                                    <td data-title="Delivery Product">
                                                                        {single_message.totaL_DELEVERED_PRODUCT}
                                                                    </td>
                                                                    <td data-title="Paid Amount">
                                                                        {single_message.totaL_PAID_AMOUNT}
                                                                    </td>
                                                                    <td data-title="Pending Amount">
                                                                        {single_message.totaL_PANDING_AMOUNT}
                                                                    </td>
                                                                    <td data-title="POD Date">
                                                                        {single_message.poD_DATE}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        }
                                                    )
                                                );
                                            })}
                                        </tbody>
                                    </table>
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
        </>
    );
}
