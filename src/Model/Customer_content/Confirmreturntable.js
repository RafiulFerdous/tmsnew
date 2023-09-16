import React, { useState, useEffect, useContext } from "react";
import reactDom from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { SearchContext } from "../../Context/searchContext";
import { SearchButtonContext } from "../../Context/buttonContext";
import BarCode, { useBarcode } from "react-barcode";
import { jsPDF } from "jspdf";
import { CSVLink, CSVDownload } from "react-csv";
//import './sc.css';
import "../../Model/Processingcenter/table.css";
import { LoginContext } from "../../Context/loginContext";
import { toast } from "react-toastify";
import {
    Linksidebar,
    CustomerCareLinksidebar,
    Salessidebar,
    Operationsidebar,
    Degital_Ocean_flag,
    company_name,
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

const Confirmreturntable = (props) => {
    const [returnproduct, setreturnproduct] = useState([]);
    let json_information = props.response;

    [clientId, setclientId] = useState("");
    [date_time, setdate_time] = useState("");
    const [inputs, setinputs] = useState([]);
    const [SubmitFlag, setSubmitFlag] = useState(false);

    let check_box_flag = [];
    const [check_box_flag_state, setcheck_box_flag_state] = useState([]);
    //let select_all_check_box_flag;
    const [select_all_check_box_flag, setselect_all_check_box_flag] =
        useState(false);
    let count_number = returnproduct.length;
    for (let i = 0; i < count_number; i++) {
        check_box_flag.push(false);
    }

    useEffect(() => {
        setcheck_box_flag_state(check_box_flag);
    }, []);

    let checkbox_click_function = (index_value) => {
        let count_number = returnproduct.length;
        let temp_check_box = [];
        for (let i = 0; i < count_number; i++) {
            if (i == index_value) {
                if (check_box_flag_state[i]) {
                    temp_check_box.push(false);
                } else {
                    temp_check_box.push(true);
                }
            } else {
                temp_check_box.push(check_box_flag_state[i]);
            }
        }
        setcheck_box_flag_state(temp_check_box);
        //console.log(temp_check_box);
    };

    useEffect(() => {
        console.log("After single click : ", check_box_flag_state);
    }, [check_box_flag_state]);

    let select_all_function = () => {
        if (select_all_check_box_flag) {
            setselect_all_check_box_flag(false);
        } else {
            setselect_all_check_box_flag(true);
        }
    };

    useEffect(() => {
        let temp_check_box = [];
        if (!select_all_check_box_flag) {
            let count_number = returnproduct.length;
            for (let i = 0; i < count_number; i++) {
                temp_check_box.push(false);
            }
        } else {
            let count_number = returnproduct.length;
            for (let i = 0; i < count_number; i++) {
                temp_check_box.push(true);
            }
        }
        setcheck_box_flag_state(temp_check_box);
    }, [select_all_check_box_flag]);

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
        setreturnproduct(json_information.message.all_product_info);
    }, []);
    console.log("these are return product", returnproduct);
    let bridgeme = (e) => {
        // setwaybill_number(waybill_number);

        let inputs1 = [];
        returnproduct.map(async (data, list_index) => {
            if (check_box_flag_state[list_index]) {
                let elem = data.ordeR_ID;
                console.log("This is elem", elem);

                inputs1.push(elem);
                setinputs(inputs1);
            }
        });

        setSubmitFlag(!SubmitFlag);
    };

    useEffect(() => {
        // e.preventDefault();
        var axios = require("axios");

        var data = JSON.stringify({
            client_id: clientId,
            product_order_id: inputs,

            date_time: getCurrentTime(),
        });

        console.log("single product : ", data);

        var config = {
            method: "post",
            url: Degital_Ocean_flag
                ? "https://e-deshdelivery.com/universalapi/allapi/confirmReturnProductbyClient" +
                "?company_name=" +
                company_name
                : "/universalapi/allapi/confirmReturnProductbyClient" +
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
                toast.success("Successfully Confirmed", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                });
                //setUsers(response.data.all_product_list)
                console.log("successfully forwarded");
                return response;
            })
            .then((res) => {
                console.log("new response return", res);
                setreturnproduct(res.data.new_state.all_product_info);
                // setinvoiceModalOpen(true);
                // setUsers(res.data.all_product_list)

                //setpayload(true);
            })
            .catch(function (error) {
                // Error
                // if (error.response) {
                //     toast.error("Error!", {
                //         position: toast.POSITION.TOP_CENTER, autoClose: 1500
                //     });

                // } else if (error.request) {
                //     toast.error(" Request Error!", {
                //         position: toast.POSITION.TOP_CENTER, autoClose: 1500
                //     });
                //     console.log(error.request);
                // } else {

                //     console.log('Error', error.message);
                // }
                console.log(error.config);
            });

        //setpickupFlag(pickupFlag => !pickupFlag);
    }, [SubmitFlag, logingInformation_LocalStore]);

    console.log("this is order id inputs", inputs);
    return (
        <>
            <div className="container">
                <div id="no-more-tables" className="">
                    <div className="">
                        <button
                            className="btn btn-sm me-2 bg-info text-black border-info mb-2"
                            onClick={(e) => bridgeme(e)}
                        >
                            Confirm
                        </button>
                        <CSVLink
                            data={returnproduct}
                            className="btn btn-sm bg-info text-black border-info mb-2"
                        >
                            Export csv
                        </CSVLink>
                    </div>
                    <table
                        className="table bg-white"
                        style={{ fontSize: "13px", marginLeft: "1px" }}
                    >
                        <thead
                            className="text-center shadow sticky-top "
                            style={{ backgroundColor: "#b4bec2", top: "60px", zIndex: "0" }}
                        >
                        <tr className="text-dark" style={{ border: "none" }}>
                            {/* <th>SL</th> */}
                            <th scope="col">
                                <div className="custom-control custom-checkbox">
                                    <input
                                        style={{ cursor: "pointer" }}
                                        type="checkbox"
                                        className="custom-control-input"
                                        name="allSelect"
                                        onChange={(e) => select_all_function()}
                                    />
                                </div>
                            </th>
                            <th scope="col">Waybill</th>
                            <th scope="col">Order Id</th>
                            <th>Product Name</th>
                            <th scope="col">Product</th>
                            <th>Consignee Name</th>
                            <th>Reason</th>

                            <th>Contact Number</th>
                            <th>Address</th>
                            <th>Pincode</th>
                            <th>Product Weight</th>
                            <th>Product Payment Type</th>
                            <th>Product Value</th>
                            <th>Product Processing Status</th>
                            <th>Product Processing Status DateTime</th>
                            {/* <th>Print<button className="btn btn-sm bg-info text-black border-info mb-2" onClick={(e) => print_function(e)}>Print All</button> </th>
                                <th>ex<CSVLink data={users} className="btn btn-sm bg-info text-black border-info mb-2" >Export csv</CSVLink></th> */}
                        </tr>
                        </thead>
                        <tbody className="text-center border border-secondary">
                        {returnproduct.map((single_message, i) => {
                            return (
                                <>
                                    {select_all_check_box_flag ? (
                                        <tr key={single_message.ordeR_ID}>
                                            {/* <td data-title="SL" className="css-serial"></td> */}
                                            <td data-title="Select">
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        style={{ cursor: "pointer" }}
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        checked={check_box_flag_state[i]}
                                                        value={check_box_flag_state[i]}
                                                        onChange={() => checkbox_click_function(i)}
                                                    />
                                                </div>
                                            </td>

                                            <td data-title="WayBill Number">
                                                {single_message.waybilL_NUMBER}
                                            </td>

                                            <td data-title="Order Id">{single_message.ordeR_ID}</td>
                                            <td data-title=" Product Name">
                                                {single_message.producT_NAME}
                                            </td>
                                            <td data-title="Product">
                                                {single_message.producT_DETAILS}
                                            </td>
                                            <td data-title=" Consignee Name">
                                                {single_message.consigneE_NAME}
                                            </td>
                                            <td data-title=" Reason " className="h-100">
                                                {single_message.reason}
                                            </td>
                                            <td data-title="Contact Number">
                                                {single_message.contacT_NUMBER}
                                            </td>
                                            <td data-title="Address" className="h-100">
                                                {single_message.address}
                                            </td>
                                            <td data-title="Pin Code">{single_message.pincode}</td>
                                            <td data-title="Product Weight">
                                                {single_message.producT_WEIGHT}{" "}
                                            </td>
                                            <td data-title="Product Payment Type">
                                                {single_message.producT_PAYMENT_TYPE}
                                            </td>
                                            <td data-title="Product Value">
                                                {single_message.producT_VALUE}{" "}
                                            </td>
                                            <td data-title="product Status">
                                                {single_message.producT_PROCESSING_STATUS}
                                            </td>
                                            <td data-title="product status datetime">
                                                {single_message.producT_PRODESSING_STATUS_DATETIME}
                                            </td>
                                            {/* onClick ={ JsBarcode("#code128",single_message.waybill_number)}  */}
                                            {/* <td><button className="btn btn-sm bg-dark text-white border-dark mb-2"   >Print</button></td> */}
                                        </tr>
                                    ) : (
                                        <tr key={single_message.ordeR_ID}>
                                            {/* <td data-title="SL" className="css-serial"></td> */}
                                            <td data-title="Select">
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        style={{ cursor: "pointer" }}
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        checked={check_box_flag_state[i]}
                                                        value={check_box_flag_state[i]}
                                                        onChange={() => checkbox_click_function(i)}
                                                    />
                                                </div>
                                            </td>
                                            <td data-title="WayBill Number">
                                                {single_message.waybilL_NUMBER}
                                            </td>

                                            <td data-title="Order Id">{single_message.ordeR_ID}</td>
                                            <td data-title=" Product Name">
                                                {single_message.producT_NAME}
                                            </td>
                                            <td data-title="Product">
                                                {single_message.producT_DETAILS}
                                            </td>
                                            <td data-title=" Consignee Name">
                                                {single_message.consigneE_NAME}
                                            </td>
                                            <td data-title=" Reason " className="h-100">
                                                {single_message.reason}
                                            </td>
                                            <td data-title="Contact Number">
                                                {single_message.contacT_NUMBER}
                                            </td>
                                            <td data-title="Address" className="h-100">
                                                {single_message.address}
                                            </td>
                                            <td data-title="Pin Code">{single_message.pincode}</td>
                                            <td data-title="Product Weight">
                                                {single_message.producT_WEIGHT}{" "}
                                            </td>
                                            <td data-title="Product Payment Type">
                                                {single_message.producT_PAYMENT_TYPE}
                                            </td>
                                            <td data-title="Product Value">
                                                {single_message.producT_VALUE}{" "}
                                            </td>
                                            <td data-title="product Status">
                                                {single_message.producT_PROCESSING_STATUS}
                                            </td>
                                            <td data-title="product status datetime">
                                                {single_message.producT_PRODESSING_STATUS_DATETIME}
                                            </td>
                                            {/* onClick ={ JsBarcode("#code128",single_message.waybill_number)}  */}
                                            {/* <td><button className="btn btn-sm bg-dark text-white border-dark mb-2"   >Print</button></td> */}
                                        </tr>
                                    )}
                                </>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};
export default Confirmreturntable;
