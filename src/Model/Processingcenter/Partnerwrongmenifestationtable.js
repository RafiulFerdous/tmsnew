import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { SearchContext } from "../../Context/searchContext";
import { SearchButtonContext } from "../../Context/buttonContext";
import BarCode, { useBarcode } from "react-barcode";
import { jsPDF } from "jspdf";
import { CSVLink, CSVDownload } from "react-csv";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { LoginContext } from "../../Context/loginContext";
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
// let date_time, setdate_time;
let pageRefreshFlag, setpageRefreshFlag;
let informationResponse, setinformationResponse;

const Partnerwrongmenifestationtable = (props) => {
    toast.configure();
    let json_information = props.response;
    console.log("response:" + json_information);
    const [payload, setpayload] = useState(false);
    const [inputs, setinputs] = useState([]);
    const [filterdata, setfilterdata] = useState([]);
    const [alldclist, setalldclist] = useState([]);
    const [infoModalOpen, setinfoModalOpen] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [alldata, setalldata] = useState([]);
    const [dcname, setdcname] = useState("");
    const [allcoveragearea, setallcoveragearea] = useState([]);
    const [coveragearea, setcoveragearea] = useState("");
    const [waybiil, setwaybiil] = useState("");
    // state for multiple search start
    const [allfilterproductdata, setallfilterproductdata] = useState([]);
    const [searchTerm, setsearchTerm] = React.useState("");
    const [searchTermFlag, setsearchTermFlag] = useState(false);
    const [searchTermAltFlag, setsearchTermAltFlag] = useState(false);
    const [exportExcel, setExportExcel] = useState([]);
    // state for multiple search end
    console.log("exportExcel", exportExcel);
    // checkbos

    // const [select_all_check_box_flag, setselect_all_check_box_flag] = useState(false);

    const [clientname, setclientname] = useState([]);

    const [date_time, setdate_time] = useState("");
    [informationResponse, setinformationResponse] = useState("");
    [pageRefreshFlag, setpageRefreshFlag] = useState(true);

    useEffect(() => {
        setalldata(json_information.message.all_product_information);
    }, []);
    // useEffect(() => {
    //     setfilterdata(alldata);
    //     let tempclient = [];
    //     alldata&&alldata.map((single_product) => {
    //         if (tempclient.indexOf(single_product.selleR_NAME) === -1) {
    //             tempclient.push(single_product.selleR_NAME);
    //         }
    //     });
    //     setclientname(tempclient);
    //     console.log("temp client", tempclient);
    // }, [alldata]);
    console.log("client name", clientname);

    const [referencE_NO, setreferencE_NO] = React.useState("");

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

    const [information, setinformation] = useState({});
    //const [payload, setpayload] = useState(false);

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
        setdate_time(getCurrentTime);

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
                setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam
                final_sideBar = CustomerCareLinksidebar;
            }

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
                setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam
            }
            setlogingInformation_LocalStore(context_flag_obj);
        }
    }, []);

    let check_box_flag = [];
    const [check_box_flag_state, setcheck_box_flag_state] = useState([]);
    //let select_all_check_box_flag;
    const [select_all_check_box_flag, setselect_all_check_box_flag] =
        useState(false);
    let count_number = alldata && alldata.length;
    for (let i = 0; i < count_number; i++) {
        check_box_flag.push(false);
    }

    useEffect(() => {
        setcheck_box_flag_state(check_box_flag);
    }, []);

    let checkbox_click_function = (index_value) => {
        let count_number = alldata && alldata.length;
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
        console.log("Checked data : ", check_box_flag_state);
    }, [check_box_flag_state]);

    useEffect(() => {
        let temp_check_box = [];
        if (!select_all_check_box_flag) {
            let count_number = alldata && alldata.length;
            for (let i = 0; i < count_number; i++) {
                temp_check_box.push(false);
            }
        } else {
            let count_number = alldata && alldata.length;
            for (let i = 0; i < count_number; i++) {
                temp_check_box.push(true);
            }
        }
        setcheck_box_flag_state(temp_check_box);
    }, [select_all_check_box_flag]);

    let index = [];

    let select_all_function = () => {
        if (select_all_check_box_flag) {
            setselect_all_check_box_flag(false);
        } else {
            setselect_all_check_box_flag(true);
        }
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

    // useEffect(() => {
    //     if (inputs.length > 0) {
    //         var axios = require("axios");
    //
    //         var data = JSON.stringify({
    //             pc_id: logingInformation_LocalStore.all_user_list.employeE_ID,
    //             product_list: inputs,
    //
    //             date_time: date_time,
    //         });
    //
    //         console.log("single product : ", data);
    //
    //         var config = {
    //             method: "post",
    //             url: Degital_Ocean_flag
    //                 ? "https://e-deshdelivery.com/universalapi/allapi/confirmSingleProductbyPC" +
    //                 "?company_name=" +
    //                 company_name
    //                 : "/universalapi/allapi/confirmSingleProductbyPC" +
    //                 "?company_name=" +
    //                 company_name,
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${logingInformation_LocalStore.token}`,
    //             },
    //             data: data,
    //         };
    //
    //         axios(config)
    //             .then(function (response) {
    //                 //console.log(JSON.stringify(response.data));
    //                 // setpickupRefreshFlag(pickupRefreshFlag => !pickupRefreshFlag);
    //                 // toast.success("SuccessFully Created !", {
    //                 //     position: toast.POSITION.TOP_CENTER, autoClose: 1500
    //                 // });
    //                 console.log("Successfully api called : ", response);
    //                 return response;
    //             })
    //             .then((res) => {
    //                 console.log("new response", res);
    //                 if (
    //                     res.data.confirm_information.successful_conferm_product_waybill
    //                         .length >= 1
    //                 ) {
    //                     toast.success("Product Confirmed!", {
    //                         position: "top-right",
    //                         autoClose: 3000,
    //                         hideProgressBar: true,
    //                         closeOnClick: true,
    //                         pauseOnHover: true,
    //                     });
    //                     setselect_all_check_box_flag(false);
    //                 }
    //                 if (
    //                     res.data.confirm_information.unsuccessful_confirm_product_waybill
    //                         .length >= 1
    //                 ) {
    //                     let str = "";
    //                     res.data.confirm_information.unsuccessful_confirm_product_waybill.map(
    //                         (wrong_waybill) => {
    //                             str += wrong_waybill + " ";
    //                         }
    //                     );
    //
    //                     toast.error(
    //                         `Wrong Order id !
    //                 ${str}`,
    //                         {
    //                             position: "top-right",
    //                             autoClose: 3000,
    //                             hideProgressBar: true,
    //                             closeOnClick: true,
    //                             pauseOnHover: true,
    //                         }
    //                     );
    //                 }
    //                 setalldata(
    //                     res.data.waiting_tobe_confirmed_product.all_product_information
    //                 );
    //
    //                 setpayload(true);
    //             })
    //             .catch(function (error) {
    //                 // Error
    //                 if (error.response) {
    //                     toast.error("Error!", {
    //                         position: toast.POSITION.TOP_CENTER,
    //                         autoClose: 1500,
    //                     });
    //                 } else if (error.request) {
    //                     toast.error(" Request Error!", {
    //                         position: toast.POSITION.TOP_CENTER,
    //                         autoClose: 1500,
    //                     });
    //                     console.log(error.request);
    //                 } else {
    //                     console.log("Error", error.message);
    //                 }
    //                 console.log(error.config);
    //             });
    //         //setpickupFlag(pickupFlag => !pickupFlag);
    //     }
    // }, [inputs, logingInformation_LocalStore]);

    const searchbyclient = (e) => {
        let templist = [];
        alldata.map((single_product) => {
            if (
                single_product.selleR_NAME
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
            ) {
                templist.push(single_product);
            }
        });
        console.log("filter data", templist);
        setfilterdata(templist);
    };

    useEffect(() => {
        var axios = require("axios");
        var config = {
            method: "post",
            url: Degital_Ocean_flag
                ? "https://e-deshdelivery.com/universalapi/allapi/allDcList" +
                "?company_name=" +
                company_name
                : "/universalapi/allapi/allDcList" + "?company_name=" + company_name,
            headers: {
                "Content-Type": "application/json",
                //Authorization: `Bearer ${logingInformation_LocalStore.token}`,
            },
        };

        console.log("config", config);

        axios(config)
            .then(function (response) {
                let json_object_str = JSON.stringify(response.data);
                let json_object = JSON.parse(json_object_str);
                return json_object;
            })
            .then((res) => {
                console.log("all dc list", res);
                setalldclist(res.message);
                //setpayload(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const coverage = (e) => {
        //setdcname(e.target.value)

        var axios = require("axios");
        var data = JSON.stringify({
            DCname: dcname,
        });
        console.log("body", data);
        var config = {
            method: "post",
            url: Degital_Ocean_flag
                ? "https://e-deshdelivery.com/universalapi/allapi/coverageAreaUnderDC" +
                "?company_name=" +
                company_name
                : "/universalapi/allapi/coverageAreaUnderDC" +
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
                return json_object;
            })
            .then((res) => {
                console.log("all coverage area", res);
                setallcoveragearea(res.message);
                //setpayload(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    let SubmitButtonFunction = (e, waybill) => {
        e.preventDefault();
        setinfoModalOpen(true);
        setwaybiil(waybill);
    };
    const [multipleBodyData, setMultipleBodyData] = useState([]);
    console.log("this is selected dcname", dcname);
    console.log("this is selected multipleBodyData", multipleBodyData);
    const multipleWrongManifest = (e) => {
        console.log("function para meter", e);
        let multipleObj = [];
        let obj = {
            waybill_number: e.waybill_number,
            area_code: dcname,
            coverage_area: coveragearea,
        };

        // multipleObj.push(obj);
        multipleBodyData.push(obj);
        // console.log("multipleWrongManifest", multipleObj);
    };

    const wrongmanifest = (e) => {
        // let inputs1 = [];
        // let obj = {
        //   waybill_number: waybiil,
        //   area_code: dcname,
        //   coverage_area: coveragearea,
        // };

        // inputs1.push(obj);
        // alldata && alldata.map(async (data, list_index) => {
        //     if (check_box_flag_state[list_index]) {
        //         let elem = data.referencE_NO;
        //         inputs1.push(elem);
        //     }
        // });

        // console.log("this is  after function call input", inputs1);
        // setinputs(inputs1);
        setpageRefreshFlag(false);
        //setinfoModalOpen(true)

        var axios = require("axios");
        var data = JSON.stringify({
            employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
            //   product_info: [
            //     {
            //       waybill_number: waybiil,
            //       area_code: dcname,
            //       coverage_area: coveragearea,
            //     },
            //   ],
            product_info: multipleBodyData,
            dateTime: getCurrentTime(),
        });
        console.log("body", data);
        var config = {
            method: "post",
            url: Degital_Ocean_flag
                ? "https://e-deshdelivery.com/universalapi/allapi/menifestedProblemProductListforCorrection_update" +
                "?company_name=" +
                company_name
                : "/universalapi/allapi/menifestedProblemProductListforCorrection_update" +
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
                return json_object;
            })
            .then((res) => {
                console.log("updated wrong menifest", res);
                setinfoModalOpen(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    // const SubmitButtonFunction1=(e)=>{
    //     setinfoModalOpen(true)
    // }

    // ------------------------------------------multiple search start------------------------------
    const handleOnChangeMultiple = (event) => {
        setsearchTerm(event.target.value);
    };

    const searchflag = (e) => {
        e.preventDefault();
        setsearchTermFlag(!searchTermFlag);
        // setsearchTerm("");
    };
    const resetflag = (e) => {
        e.preventDefault();
        setsearchTerm("");
        setsearchTermFlag(!searchTermFlag);
        // setpickupdata(newalldata);
        setExportExcel(alldata);
        // setCurrentItems(json_information.message);
        // setExportCsv(json_information.message);
    };
    console.log("alldata", alldata);
    useEffect(() => {
        //console.log("entering filter effect", allproductdata)
        const users1 = alldata?.filter(
            (p) =>
                p.waybill_number
                    ?.toString()
                    .toLowerCase()
                    .includes(searchTerm?.toString().toLowerCase()) ||
                p.reference
                    ?.toString()
                    .toLowerCase()
                    .includes(searchTerm?.toString().toLowerCase())
        );
        // setallfilterproductdata(users1);
        // setpickupdata(users1);
        console.log("user1", users1);
        setExportExcel(users1);
    }, [searchTermAltFlag, alldata]);

    useEffect(() => {
        if (searchTerm.length === 0) {
            setallfilterproductdata(alldata);
        } else {
            let waybilllist = searchTerm.split(",");
            let temp = [];
            console.log("waybillist", waybilllist);
            if (waybilllist.length <= 1) {
                setsearchTermAltFlag(!searchTermAltFlag);
            } else {
                //console.log("entering filter effect", allproductdata)
                for (let i = 0; i < waybilllist.length; i++) {
                    for (let j = 0; j < alldata.length; j++) {
                        if (alldata[j].waybill_number === waybilllist[i].trim()) {
                            temp.push(alldata[j]);
                        } else if (alldata[j].reference === waybilllist[i].trim()) {
                            temp.push(alldata[j]);
                        }
                    }
                }
                // const users1 = waybilllist.map((waybill)=>{
                //     return( allproductdata.filter(p =>
                //         p.waybill_number.toString().toLowerCase().includes(waybill.toString().toLowerCase())
                //         // || p.order_id.toString().toLowerCase().includes(searchTerm.toString().toLowerCase()) ||
                //         // p.dc_office_name.toString().toLowerCase().includes(searchTerm.toString().toLowerCase()) || p.customer_name.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())
                //         // || p.consignee_name.toString().toLowerCase().includes(searchTerm.toString().toLowerCase()) || p.product_processing_stage.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())
                //         // || p.product_processing_stage_datetime.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())
                //     ))

                // })
                console.log("filterdata", temp);
                // setallfilterproductdata(temp);
                // setpickupdata(temp);
                setExportExcel(temp);
                // setExportCsv(temp);
            }
        }
    }, [searchTermFlag, alldata]);
    useEffect(() => {
        // setnewalldata(json_information.message);
    }, []);

    // ------------------------------------------multiple search end--------------------------------

    return (
        <div className="container">
            <div id="no-more-tables">
                {/*<div className="row">*/}
                {/*    <div*/}
                {/*        className="col-lg-6 col-md-8 col-12 d-flex mb-4 p-3 ms-3 rounded"*/}
                {/*        style={{backgroundColor: "#C5D5E4"}}*/}
                {/*    >*/}
                {/*        <p className="w-25">Client Name:</p>*/}
                {/*        <input*/}
                {/*            style={{*/}
                {/*                // backgroundColor: "#C5D5E4",*/}
                {/*                outline: "none",*/}
                {/*                border: "none",*/}
                {/*                padding: "7px",*/}
                {/*                borderRadius: "8px",*/}
                {/*                width: "93%",*/}
                {/*            }}*/}
                {/*            list="clientnamelist"*/}
                {/*            placeholder="Client Name"*/}
                {/*            className="form-control shadow"*/}
                {/*            onChange={searchbyclient}*/}
                {/*        />*/}
                {/*        <datalist id="clientnamelist">*/}
                {/*            {clientname.map((client) => (*/}
                {/*                <option value={client}></option>*/}
                {/*            ))}*/}
                {/*        </datalist>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="row">
                    <div className="col-xl-2 col-lg-3 col-md-3 col-12">
                        <CSVLink
                            onClick={() => toast.success("Excel Download Successful")}
                            filename={`Three PL Wrong Manifest ${getCurrentTime()}.xls`}
                            data={exportExcel}
                            className="btn btn-dark btn-sm px-4 mb-2"
                        >
                            Export Excel
                        </CSVLink>
                    </div>

                    {/* ------------------------------multiple order id and waybill start------------------------- */}
                    <div className="col-xl-6 col-lg-8 col-md-9 col-12">
                        <div className="row justify-content-between">
                            <div className="col-lg-7 col-md-7 col-12 mb-2">
                                <input
                                    style={{
                                        backgroundColor: "#C5D5E4",
                                        outline: "none",
                                        border: "none",
                                        padding: "7px",
                                        borderRadius: "8px",
                                        width: "93%",
                                    }}
                                    type="text"
                                    placeholder="Filter Waybills OR Order ID"
                                    value={searchTerm}
                                    onChange={handleOnChangeMultiple}
                                />
                            </div>
                            <div className=" col-lg-5 col-md-5 col-12 mb-2">
                                <button
                                    className="btn btn-sm btn-success px-3 me-3 rounded-3"
                                    onClick={searchflag}
                                >
                                    Search
                                </button>
                                <button
                                    className="btn btn-sm btn-danger px-3  rounded-3"
                                    onClick={resetflag}
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* ------------------------------multiple order id and waybill end--------------------------- */}
                </div>
                <table
                    className="table css-serial bg-white"
                    style={{ fontSize: "13px", marginLeft: "1px" }}
                >
                    <thead
                        className="text-center shadow sticky-top "
                        style={{ backgroundColor: "#b4bec2", top: "60px", zIndex: "0" }}
                    >
                    <tr className="text-dark" style={{ border: "none" }}>
                        <th scope="col">SL</th>
                        {/* <th></th> */}
                        {/* <th>
                                <button className="btn btn-sm bg-dark text-white border-dark mb-2">All Done</button>
                            </th> */}
                        {/* <th scope="col">Select</th> */}
                        {/*<th scope="col">*/}
                        {/*    <div className="custom-control custom-checkbox">*/}
                        {/*        <input*/}
                        {/*            type="checkbox"*/}
                        {/*            style={{cursor: "pointer"}}*/}
                        {/*            className="custom-control-input"*/}
                        {/*            name="allSelect"*/}
                        {/*            checked={select_all_check_box_flag}*/}
                        {/*            onChange={(e) => select_all_function()}*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*</th>*/}
                        {/*<th scope="col">ID</th>*/}
                        <th scope="col">Waybill</th>
                        <th scope="col">REF. NO.</th>
                        <th scope="col">Client Name</th>
                        <th scope="col">product Info</th>
                        <th scope="col">COD Amount</th>
                        <th scope="col">product Weight</th>
                        <th scope="col">consignee Name</th>
                        <th scope="col">consignee Contact</th>
                        <th scope="col">consignee Address</th>
                        <th scope="col">Select DC</th>
                        <th scope="col">coverage Area</th>
                        <th scope="col">processing Status</th>
                        <th scope="col">processing Status Datetime</th>
                    </tr>
                    </thead>
                    <tbody className="text-center border border-dark">
                    {exportExcel &&
                        exportExcel.map((single_data, i) => {
                            return (
                                <>
                                    {select_all_check_box_flag ? (
                                        <tr key={single_data.iD_NUMBER}>
                                            <td data-title="SL"></td>
                                            {/* <td>

                                                <button className="btn btn-sm bg-dark text-white border-dark mb-2"
                                                    onClick={(e) => {
                                                        clickme(e, single_data.referencE_NO)
                                                    }}>Done
                                                </button>
                                            </td> */}
                                            {/*<td data-title="Select">*/}
                                            {/*    <div className="custom-control custom-checkbox">*/}
                                            {/*        <input*/}
                                            {/*            type="checkbox"*/}
                                            {/*            className="custom-control-input"*/}
                                            {/*            checked={check_box_flag_state[i]}*/}
                                            {/*            value={check_box_flag_state[i]}*/}
                                            {/*            onChange={() => checkbox_click_function(i)}*/}
                                            {/*        />*/}
                                            {/*    </div>*/}
                                            {/*</td>*/}

                                            {/* <td data-title="WayBill">
                          <button
                            className="btn btn-sm btn-outline-primary "
                            onClick={(e) =>
                              SubmitButtonFunction(
                                e,
                                single_data.waybill_number
                              )
                            }
                          >
                            Edit
                          </button>
                        </td> */}

                                            {/*<td data-title="ID">{single_data.iD_NUMBER}</td>*/}
                                            <td data-title="Waybill">
                                                {single_data.waybill_number}
                                            </td>
                                            <td data-title="REF. NO">{single_data.reference}</td>
                                            <td data-title="Client Name">
                                                {single_data.client_name}
                                            </td>
                                            <td data-title="product Info">
                                                {single_data.product_info}
                                            </td>
                                            <td data-title="COD Amount">
                                                {single_data.cod_amount}
                                            </td>
                                            <td data-title="product Weight">
                                                {single_data.product_weight}
                                            </td>
                                            <td data-title="consignee Name">
                                                {single_data.consignee_name}
                                            </td>
                                            <td data-title="consignee Contact">
                                                {single_data.consignee_contact}
                                            </td>
                                            <td data-title="consignee Address">
                                                {single_data.consignee_address}
                                            </td>
                                            <td data-title="Select DC">
                                                {/* {single_data.area_code} */}

                                                {/*  */}
                                                <input
                                                    list="dcnames"
                                                    className="form-control"
                                                    placeholder="DC Name "
                                                    required
                                                    onChange={(e) => {
                                                        setdcname(e.target.value);
                                                    }}
                                                    onBlur={(e) => coverage(e)}
                                                />
                                                <datalist id="dcnames">
                                                    {alldclist &&
                                                        alldclist.map((single_dc_office_name) => {
                                                            return (
                                                                <option value={single_dc_office_name}>
                                                                    {single_dc_office_name}
                                                                </option>
                                                            );
                                                        })}
                                                </datalist>
                                                {/*  */}
                                            </td>
                                            <td data-title="coverage Area">
                                                {/* {single_data.coverage_area} */}

                                                <input
                                                    list="dcnames1"
                                                    className="form-control"
                                                    placeholder="coverage Area "
                                                    required
                                                    onChange={(e) => {
                                                        setcoveragearea(e.target.value);
                                                    }}
                                                    onBlur={(e) => multipleWrongManifest(single_data)}
                                                />
                                                <datalist id="dcnames1">
                                                    {allcoveragearea &&
                                                        allcoveragearea.map((single_dc_office_name) => {
                                                            return (
                                                                <option value={single_dc_office_name}>
                                                                    {single_dc_office_name}
                                                                </option>
                                                            );
                                                        })}
                                                </datalist>
                                            </td>
                                            <td data-title="processing Status">
                                                {single_data.processing_status}
                                            </td>
                                            <td data-title="processing Status Datetime">
                                                {single_data.processing_status_datetime}
                                            </td>
                                        </tr>
                                    ) : (
                                        <tr key={single_data.iD_NUMBER}>
                                            <td data-title="SL"></td>
                                            {/* <td>

                                                <button className="btn btn-sm bg-dark text-white border-dark mb-2"
                                                    onClick={(e) => {
                                                        clickme(e, single_data.referencE_NO)
                                                    }}>Done
                                                </button>
                                            </td> */}
                                            {/*<td data-title="Select">*/}
                                            {/*    <div className="custom-control custom-checkbox">*/}
                                            {/*        <input*/}
                                            {/*            type="checkbox"*/}
                                            {/*            className="custom-control-input"*/}
                                            {/*            checked={check_box_flag_state[i]}*/}
                                            {/*            value={check_box_flag_state[i]}*/}
                                            {/*            onChange={() => checkbox_click_function(i)}*/}
                                            {/*        />*/}
                                            {/*    </div>*/}
                                            {/*</td>*/}

                                            {/* <td data-title="WayBill">
                          <button
                            className="btn btn-sm btn-outline-primary "
                            onClick={(e) =>
                              SubmitButtonFunction(
                                e,
                                single_data.waybill_number
                              )
                            }
                          >
                            Edit
                          </button>
                        </td> */}

                                            {/*<td data-title="ID">{single_data.iD_NUMBER}</td>*/}
                                            <td data-title="Waybill">
                                                {single_data.waybill_number}
                                            </td>
                                            <td data-title="REF. NO">{single_data.reference}</td>
                                            <td data-title="Client Name">
                                                {single_data.client_name}
                                            </td>
                                            <td data-title="product Info">
                                                {single_data.product_info}
                                            </td>
                                            <td data-title="COD Amount">
                                                {single_data.cod_amount}
                                            </td>
                                            <td data-title="product Weight">
                                                {single_data.product_weight}
                                            </td>
                                            <td data-title="consignee Name">
                                                {single_data.consignee_name}
                                            </td>
                                            <td data-title="consignee Contact">
                                                {single_data.consignee_contact}
                                            </td>
                                            <td data-title="consignee Address">
                                                {single_data.consignee_address}
                                            </td>
                                            <td data-title="Select DC">
                                                {/* {single_data.area_code} */}
                                                {/*  */}
                                                <input
                                                    style={{
                                                        width: "130px",
                                                        //   backgroundColor: "#006400",
                                                        border: "2px solid #006400",
                                                        borderRadius: "5px",
                                                    }}
                                                    list="dcnames"
                                                    className="form-control "
                                                    placeholder="DC Name "
                                                    required
                                                    onChange={(e) => {
                                                        setdcname(e.target.value);
                                                    }}
                                                    onBlur={(e) => coverage(e)}
                                                />
                                                <datalist id="dcnames">
                                                    {alldclist &&
                                                        alldclist.map((single_dc_office_name) => {
                                                            return (
                                                                <option value={single_dc_office_name}>
                                                                    {single_dc_office_name}
                                                                </option>
                                                            );
                                                        })}
                                                </datalist>
                                                {/*  */}
                                            </td>
                                            <td data-title="coverage Area">
                                                {/* {single_data.coverage_area} */}
                                                <input
                                                    style={{
                                                        width: "150px",
                                                        //   backgroundColor: "#2f4f4f",
                                                        border: "2px solid #4b0082",
                                                        borderRadius: "5px",
                                                    }}
                                                    list="dcnames1"
                                                    className="form-control"
                                                    placeholder="coverage Area "
                                                    required
                                                    onChange={(e) => {
                                                        setcoveragearea(e.target.value);
                                                    }}
                                                    onBlur={(e) => multipleWrongManifest(single_data)}
                                                />
                                                <datalist id="dcnames1">
                                                    {allcoveragearea &&
                                                        allcoveragearea.map((single_dc_office_name) => {
                                                            return (
                                                                <option value={single_dc_office_name}>
                                                                    {single_dc_office_name}
                                                                </option>
                                                            );
                                                        })}
                                                </datalist>
                                            </td>
                                            <td data-title="processing Status">
                                                {single_data.processing_status}
                                            </td>
                                            <td data-title="processing Status Datetime">
                                                {single_data.processing_status_datetime}
                                            </td>
                                        </tr>
                                    )}
                                </>
                            );
                        })}
                    </tbody>

                    {/*<div className="col-12 d-flex justify-content-center text-align-center">*/}
                    {/*    <button*/}
                    {/*        className="btn btn-primary px-4 my-3 "*/}
                    {/*        //onClick={(e) => SubmitButtonFunction1(e)}*/}
                    {/*        //onClick={setinfoModalOpen(true)}*/}

                    {/*    >*/}
                    {/*        Submit*/}
                    {/*    </button>*/}
                    {/*    /!* onClick={SubmitButtonFunction} *!/*/}
                    {/*    /!*  disabled={!clientName||!username||!password||!person||!clientContact||!pickuPADDRESS||!pincode||!returnaddress} *!/*/}
                    {/*</div>*/}
                </table>
                <div className="col-12 d-flex justify-content-center text-align-center">
                    <button
                        className="btn btn-primary px-4 my-3 "
                        onClick={(e) => wrongmanifest(e)}
                        //onClick={setinfoModalOpen(true)}
                    >
                        Submit
                    </button>
                    {/* onClick={SubmitButtonFunction} */}
                    {/*  disabled={!clientName||!username||!password||!person||!clientContact||!pickuPADDRESS||!pincode||!returnaddress} */}
                </div>

                {/* model */}

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
                        <div>
                            {/*  */}

                            <div className=" mt-5 pt-5  mx-5 border border-primary d">
                                <h3 className="text-center">Wrong Menifest Correction </h3>
                                <div className="container p-3">
                                    <form className>
                                        <div className="form-group row mb-2">
                                            <label htmlFor className="col-sm-3 col-form-label">
                                                DC Name:
                                            </label>
                                            <div className="col-sm-6">
                                                <input
                                                    list="dcnames"
                                                    className="form-control"
                                                    placeholder="DC Name "
                                                    required
                                                    onChange={(e) => {
                                                        setdcname(e.target.value);
                                                    }}
                                                />
                                                <datalist id="dcnames">
                                                    {alldclist &&
                                                        alldclist.map((single_dc_office_name) => {
                                                            return (
                                                                <option value={single_dc_office_name}>
                                                                    {single_dc_office_name}
                                                                </option>
                                                            );
                                                        })}
                                                </datalist>
                                            </div>

                                            <button
                                                className="btn btn-primary px-4 my-3 "
                                                onClick={(e) => coverage(e)}
                                                //onClick={setinfoModalOpen(true)}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                        {/*<div className="form-group row mb-2">*/}
                                        {/*    <label htmlFor className="col-sm-3 col-form-label">Address: </label>*/}
                                        {/*    <div className="col-sm-6">*/}
                                        {/*        <input type="text" className="form-control" placeholder="Address" required value={address} onChange={(e)=>{ setaddress(e.target.value) }}/>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        {/*<div className="form-group row mb-2">*/}
                                        {/*    <label htmlFor className="col-sm-3 col-form-label">Pin : </label>*/}
                                        {/*    <div className="col-sm-6">*/}
                                        {/*        <input type="text" className="form-control" placeholder="Pin" required value={pin} onChange={(e)=>{ setpin(e.target.value) }}/>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        <div className="form-group row mb-2">
                                            <label htmlFor className="col-sm-3 col-form-label">
                                                Coverage Area :{" "}
                                            </label>
                                            <div className="col-sm-6">
                                                <input
                                                    list="dcnames1"
                                                    className="form-control"
                                                    placeholder="coverage Area "
                                                    required
                                                    onChange={(e) => {
                                                        setcoveragearea(e.target.value);
                                                    }}
                                                />
                                                <datalist id="dcnames1">
                                                    {allcoveragearea &&
                                                        allcoveragearea.map((single_dc_office_name) => {
                                                            return (
                                                                <option value={single_dc_office_name}>
                                                                    {single_dc_office_name}
                                                                </option>
                                                            );
                                                        })}
                                                </datalist>
                                            </div>
                                        </div>

                                        <div className="col-12 d-flex justify-content-center text-align-center">
                                            <button
                                                className="btn btn-primary px-4 my-3 "
                                                onClick={(e) => wrongmanifest(e)}
                                                //onClick={setinfoModalOpen(true)}
                                            >
                                                Submit
                                            </button>
                                            {/* onClick={SubmitButtonFunction} */}
                                            {/*  disabled={!clientName||!username||!password||!person||!clientContact||!pickuPADDRESS||!pincode||!returnaddress} */}
                                        </div>
                                        {/*h*/}

                                        {/* bag type */}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>

                {/* modelend */}
            </div>
        </div>
    );
};

export default Partnerwrongmenifestationtable;
