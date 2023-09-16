import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
//import Confirmpaymentdctable from '../../Model/Dcpanel/Confirmpaymentdctable';
import Unconfirmpaymentdctable from "../../Model/operation_content/Unconfirmpaymenttable";
// import '../css/all.css';
import axios from "axios";
import { CSVLink, CSVDownload } from "react-csv";
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
import Multiselect from "multiselect-react-dropdown";
import Confirmpaymenttable from "../../Model/Accounts/Confirmpaymenttable";
import Creportdownload from "../../Model/Customer_content/Creportdownload";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
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


export default function OverallPerformance() {
    toast.configure();
    const [employId, setemployId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [information, setinformation] = useState("");
    const [payload, setpayload] = useState(false);
    const [employeezone, setemployeezone] = useState("");
    const [startdate, setstartdate] = useState("");
    const [enddate, setenddate] = useState("");
    const [submitflag, setsubmitflag] = useState(false);
    const [dc_name, setdc_name] = useState([]);
    const [dcname, setdcname] = useState("");
    const [productlist, setproductlist] = useState([]);
    const [selectedtype, setselectedtype] = useState("");
    const [empid, setempid] = useState("");

    //     [employId,setemployId] = useState("");
    // [date_time, setdate_time] = useState("");

    // const [information, setinformation] = useState({});
    // const [payload, setpayload] = useState(false);

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
    const search = () => {
        setsubmitflag(!submitflag);
    };
    useEffect(() => {
        console.log(siteBarInformation_LocalStore);
        let emp_desg = null;
        if (selectedtype == "dc_list") {
            emp_desg = "DISTRICT INCHARGE";
        } else if (selectedtype == "fe_list") {
            emp_desg = "FIELD EXECUTIVE";
        }
        if (startdate === "" || startdate === null) {
            toast.warning("Select Start Date.");
            return;
        } else if (enddate === "" || enddate === null) {
            toast.warning("Select End Date.");
            return;
        } else {
            toast.info("Searching...");
            setIsLoading(true);
        }
        let data = JSON.stringify({
            employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
            dc_name: dcname === "" ? null : dcname,
            start_date: startdate,
            end_date: enddate,
        });
        console.log("this is dc_id", data);

        var config = {
            method: "post",
            url: Degital_Ocean_flag
                ? "https://e-deshdelivery.com/universalapi/allapi/dcOverallPerformance" +
                "?company_name=" +
                company_name
                : "/universalapi/allapi/dcOverallPerformance" +
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
                console.log("response is date wise product", res);
                setinformation(res.message.final_response);
                setpayload(true);
                toast.success("Request Successfull");
                setIsLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setIsLoading(false);
            });
    }, [submitflag]);

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
       <Sidebar sidebar_manu={siteBarInformation_LocalStore}/>
      </div>
      </div> */}

                {/* <div className="row container">
                <div className="col-6 " id="srchmenu">
                        <Search/>
                </div>
           </div> */}
                <div className="row container">
                    <div className="col-12 d-flex" id="mainmenu">
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
                                <Loader></Loader>
                            ) : (
                                <div id="requesttable">
                                    <div>
                                        {/* <CSVLink data={information &&information.day_collection}
                                             className="btn btn-sm bg-info text-black border-info mb-2">Download
                                        csv</CSVLink> */}
                                        <ReactHTMLTableToExcel
                                            className="js-download-link button bg-info border border-info px-4 btn-sm mb-2 mx-2 text-white rounded-pill"
                                            table="performance"
                                            filename="ReportExcel"
                                            sheet="Sheet"
                                            buttonText="Performance Csv"
                                        />
                                        {/* <CSVLink data={productlist &&productlist}
                                     filename={`DCProductPerformance${getCurrentTime()}.csv`}
                                     className="btn btn-sm bg-info mx-2 text-black border-info mb-2">Product Report
                                csv</CSVLink> */}

                                        <table className="table table-hover" id="performance">
                                            <thead className="bg-dark">
                                            <tr className="text-white">
                                                <th scope="col">DC</th>
                                                <th scope="col">Date</th>
                                                <th>total accessable</th>
                                                <th>total received</th>
                                                <th scope="col">total dispatched</th>
                                                <th>total delivered</th>
                                                <th scope="col">total holded</th>
                                                <th>total return</th>
                                                <th scope="col">total lost</th>
                                                <th scope="col">total unattempted</th>
                                            </tr>
                                            </thead>

                                            <tbody>
                                            {information &&
                                                information.map((dc) => {
                                                    return dc.datePerformance_list.map(
                                                        (single_message) => {
                                                            console.log(
                                                                "date info",
                                                                single_message.working_date
                                                            );
                                                            return (
                                                                <tr
                                                                    key={single_message.working_date}
                                                                    className="bg-success text-white"
                                                                >
                                                                    {/* className="btn btn-outline-primary text-white"*/}
                                                                    <td scope="row">{dc.dC_name}</td>
                                                                    <td scope="row">
                                                                        {single_message.working_date &&
                                                                            single_message.working_date.split(
                                                                                "T"
                                                                            )[0]}
                                                                    </td>
                                                                    <td>
                                                                        {single_message.total_accessable_product}
                                                                    </td>
                                                                    <td>
                                                                        {single_message.total_received_product}
                                                                    </td>
                                                                    <td>
                                                                        {single_message.total_dispaced_product}
                                                                    </td>
                                                                    <td>
                                                                        {single_message.total_delevered_product}
                                                                    </td>
                                                                    <td>
                                                                        {single_message.total_holded_product}
                                                                    </td>
                                                                    <td>
                                                                        {single_message.total_return_product}
                                                                    </td>
                                                                    <td>{single_message.total_lost_product}</td>
                                                                    <td>
                                                                        {single_message.total_unattempted_product}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        }
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
}
