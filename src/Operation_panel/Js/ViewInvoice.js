import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
import HomeOperation from "../../Model/operation_content/HomeOperation";
import "../css/all.css";
import { LoginContext } from "../../Context/loginContext";
import Modal from "react-modal";
import { SearchContext } from "../../Context/searchContext";
import { SearchButtonContext } from "../../Context/buttonContext";
import { toast } from "react-toastify";
import {
    Linksidebar,
    CustomerCareLinksidebar,
    Salessidebar,
    Operationsidebar,
    Degital_Ocean_flag,
    company_name,
    superadminsidebar,
} from "../../Common/Linksidebar";
import { CSVLink } from "react-csv";
import Loader from "../../Loader";

let convert_time_to_time = (receive_time) => {
    let return_time = "";
    for (let i = 0; i < receive_time.length; i++) {
        if (return_time[i] == "/") return_time = return_time + "-";
        else return_time = return_time + receive_time[i];
    }
    return_time = return_time + "T15:47:28.807";
    return return_time;
};

let getOnlyTime = () => {
    let date_ob = new Date();

    let hours = date_ob.getHours();
    if (hours < 10) hours = "0" + hours;
    let minutes = date_ob.getMinutes();
    if (minutes < 10) minutes = "0" + minutes;
    let seconds = date_ob.getSeconds();
    if (seconds < 10) seconds = "0" + seconds;
    let milisecond = date_ob.getMilliseconds();
    if (milisecond < 10) milisecond = "0" + milisecond;
    let date_time =
        "T" + hours + ":" + minutes + ":" + seconds + "." + milisecond;
    return date_time;
};

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

export default function ViewInvoice() {
    toast.configure();
    const [startdate, setstartdate] = useState(null);
    const [enddate, setenddate] = useState(null);
    const [dcname, setdcname] = useState(null);
    const [dc_name, setdc_name] = useState([]);

    const [infoModalOpen, setinfoModalOpen] = useState(false);

    const [employId, setemployId] = useState("");
    const [information, setinformation] = useState([]);
    const [payload, setpayload] = useState(false);
    const [invoicenumber, setinvoicenumber] = useState("");
    const [randomnumber, setrandomnumber] = useState("");
    const [random, setrandom] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    console.log("information", information);
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
                "Content-Type": "application/json",
                //'Authorization': `Bearer ${logingInformation_LocalStore.token}`
            },
            //data : data
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

    const search = () => {
        if (dcname == null || dcname == "") {
            toast.warning("Select DC Name");
        } else if (startdate == "" || startdate == null) {
            toast.warning("Select Start Date");
        } else if (enddate == "" || enddate == null) {
            toast.warning("Select End Date");
        } else {
            toast.info("Searching...");
            setIsLoading(true);
            var axios = require("axios");
            var data = JSON.stringify({
                dc_id: employId,
                start_date: startdate + getOnlyTime(),
                end_date: enddate + getOnlyTime(),
                dc_name: dcname,
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

            console.log("this is config new date", config);

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    console.log(response.data);

                    return response;
                })
                .then((res) => {
                    console.log("new response", res);
                    setinformation(res.data.message[0].all_invoice_info);
                    setIsLoading(false);

                    //setinfoModalOpen(true);

                    setpayload(true);
                })
                .catch(function (error) {
                    console.log(error);
                    setIsLoading(false);
                    // toast.error(error.message);
                });
        }

        // console.log("after conversion start time : ", convert_time_to_time(startdate));
        // console.log("after conversion End time : ", convert_time_to_time(enddate));

        // console.log("this is new starttime after convert",startdate)
        // console.log("this is new endtime after convert",enddate)
    };

    const confirm = (e, invoice) => {
        console.log("This is invoice in confirm fun", invoice);
        setinvoicenumber(invoice);
        setinfoModalOpen(true);

        let min = 15267;
        let max = 98765;
        let number = Math.floor(Math.random() * (max - min + 1) + min);
        setrandomnumber(number);

        console.log("this is random number", number);
    };
    console.log("This is setinvoicenumber ", invoicenumber);
    console.log("This is setrandomnumber ", randomnumber);

    function closeInvoiceModal() {
        setinfoModalOpen(false);
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
            color: "orange",
            position: "absolute",
            height: "50%",
            width: "50%",
            top: "30%",
            left: "20%",
            right: "40px",

            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
        },
    };

    const submit = () => {
        if (random != randomnumber) {
            toast.warning("Please input the verification Number", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
            });

            return;
        }
        console.log("api hit start");

        var axios = require("axios");
        var data = JSON.stringify({
            employee_id: employId,
            invoice_number: invoicenumber,
            date_time: getCurrentTime(),
        });
        console.log("this is data : ", data);
        var config = {
            method: "post",
            url: Degital_Ocean_flag
                ? "https://e-deshdelivery.com/universalapi/allapi/dcPaymentInvoice_confirm" +
                "?company_name=" +
                company_name
                : "/universalapi/allapi/dcPaymentInvoice_confirm" +
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

                toast.info(res.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
                closeInvoiceModal();
                //setinformation(res.data.message.all_invoice_info)

                //setinfoModalOpen(true);

                // setpayload(true);
            });
        //closeInvoiceModal()
        console.log("api hit end");
    };

    return (
        <>
            <div className="bordered">
                {/* Invoice modal */}
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
                    <div className="d-flex justify-content-center">
                        <label>Please Input Bellow Number: </label>
                        <input
                            list="felist"
                            className="form-control w-50"
                            onChange={(e) => setrandom(e.target.value)}
                        />
                        <br></br>

                        {/*onChange={e => setselectedfe(e.target.value)}*/}
                        {/*<datalist id="felist">*/}
                        {/*    {*/}
                        {/*        felist.map((single_fe) => {*/}
                        {/*            if(single_fe.active_or_inactive==="Active")*/}
                        {/*                return(*/}
                        {/*                    <option value={single_fe.field_operative_id}>{single_fe.field_operative_name}</option>*/}
                        {/*                )})*/}
                        {/*    }*/}

                        {/*</datalist>*/}
                    </div>
                    <div className="d-flex justify-content-center">
                        <h4>{randomnumber}</h4>
                    </div>

                    <div className="d-flex mt-4 justify-content-center">
                        <button className="btn btn-outline-success mb-2" onClick={submit}>
                            Submit
                        </button>
                    </div>
                </Modal>
            </div>

            <div className="bodydiv">
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

                <div className="mt-5 container">
                    <div className="mt-5 pt-5" id="">
                        <div className="container row-col-2">
                            {/* search option */}

                            <div className="border  mb-5">
                                <form className="row d-flex justify-content-center">
                                    <div className=" col-sm-4 form-group mx-3 mt-2">
                                        <div className=" text-center text-black mx-1">DC Name:</div>
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
                                        {/* onClick={searchFilter} */}
                                    </div>
                                </form>
                            </div>
                            {isLoading ? (
                                <Loader />
                            ) : information.length !== 0 ? (
                                <div id="requesttable">
                                    <div id="no-more-tables">
                                        <CSVLink
                                            data={information}
                                            className="btn btn-sm bg-info text-black border-info mb-2"
                                        >
                                            Download csv
                                        </CSVLink>

                                        <table
                                            className="table bg-white"
                                            style={{ fontSize: "13px", marginLeft: "1px" }}
                                        >
                                            <thead
                                                className="text-center shadow sticky-top "
                                                style={{
                                                    backgroundColor: "#b4bec2",
                                                    top: "60px",
                                                    zIndex: "0",
                                                }}
                                            >
                                            <tr className="text-dark" style={{ border: "none" }}>
                                                <th>Action</th>
                                                <th>ID</th>
                                                <th scope="col">Invoice</th>
                                                <th>Transaction Nnumber</th>
                                                <th>DC</th>
                                                <th scope="col">Product Value</th>
                                                <th scope="col">Deliverd Product</th>
                                                <th scope="col">Paid Amount</th>
                                                <th>Pending Amount</th>
                                                <th>POD Date</th>
                                            </tr>
                                            </thead>

                                            <tbody className="text-center border border-secondary">
                                            {information &&
                                                information.map((single_message) => {
                                                    return (
                                                        <tr
                                                            key={single_message.id}
                                                            className="bg-success text-white"
                                                        >
                                                            <td
                                                                data-title="Action"
                                                                onClick={(e) =>
                                                                    confirm(
                                                                        e,
                                                                        single_message.paymenT_INVOICE_NUMBER
                                                                    )
                                                                }
                                                            >
                                                                <button className="btn text-white btn-outline-dark">
                                                                    Confirm
                                                                </button>
                                                            </td>
                                                            <td data-title="ID">{single_message.id}</td>
                                                            {/* className="btn btn-outline-primary text-white"*/}
                                                            <td data-title="Invoice" scope="row">
                                                                {single_message.paymenT_INVOICE_NUMBER}
                                                            </td>
                                                            <td data-title="Transaction Nnumber">
                                                                {single_message.transactioN_NUMBER}
                                                            </td>
                                                            <td data-title="DC">
                                                                {single_message.districT_INCHARGE_ID}
                                                            </td>
                                                            <td data-title="Product Value">
                                                                {single_message.totaL_PRODUCT_VALUE}
                                                            </td>
                                                            <td data-title="Deliverd Product">
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
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ) : (
                                <></>
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
        </>
    );
}
