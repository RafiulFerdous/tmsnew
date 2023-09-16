import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
import Hometabledc from "../../Model/Dcpanel/Hometabledc";
// import '../css/all.css';
//import './css/home.css'
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
    fepanel,
    CustomerCareLinksidebar,
    Salessidebar,
    Operationsidebar,
    Degital_Ocean_flag,
    company_name,
    dcpanel,
} from "../../Common/Linksidebar";
import { toast } from "react-toastify";
import ReactModal from "react-modal";

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

export default function Parceldeliverytable(props) {
    toast.configure();

    const [regular_bag_list, setregular_bag_list] = useState(
        props.response.message[0].all_Product_information
    );
    let return_bag_list = props.response.message[1].all_Product_information;
    //var regular_bag_list = props.response.message[0].all_Product_information;

    console.log("This is received product list for fe regular", regular_bag_list);
    console.log("This is receiveproduct list for fe return", return_bag_list);
    const [bagtype, setbagtype] = useState("");
    const [data, setdata] = useState([]);
    const [productflag, setproductflag] = useState(false);
    const [infoModalOpen, setinfoModalOpen] = useState(false);
    const [infoModalOpen1, setinfoModalOpen1] = useState(false);
    const [infoModalOpen2, setinfoModalOpen2] = useState(false);
    const [selectedbag, setselectedbag] = useState("");
    const [searchResult, setsearchResult] = useState("");
    const [information, setinformation] = useState("");
    const [payload, setpayload] = useState("");
    const [searchTerm, setsearchTerm] = useState("");
    const [strProductWaybillList, setstrProductWaybillList] = useState("");
    const [confirmproductlist, setconfirmproductlist] = useState([]);
    const [inputs, setinputs] = useState([]);
    const [feconfirm, setfeconfirm] = useState(false);
    const [checkotpdeliver, setcheckotpdeliver] = useState("");
    const [deliveredwaybill, setdeliveredwaybill] = useState("");
    const [deliverwithotp, setdeliverwithotp] = useState(false);
    const [deliverwitouthotp, setdeliverwitouthotp] = useState(false);
    const [deliverto, setdeliverto] = useState("Consignee");
    const [delivername, setdelivername] = useState("");
    const [deliverphn, setdeliverphn] = useState("");
    const [consigneephn, setconsigneephn] = useState("");
    const [deliverotp, setdeliverotp] = useState("");
    const [deliverpaymenttype, setdeliverpaymenttype] = useState("");
    const [returnwaybill, setreturnwaybill] = useState("");
    const [returnreason, setreturnreason] = useState("");
    const [returndata, setreturndata] = useState([]);
    const [frominput, setfrominput] = useState("");

    var { loginInformation, setloginInformation } = useContext(LoginContext);
    //login context start
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
                employee_degignation_list.FieldExecutive
            ) {
                setsiteBarInformation_LocalStore(fepanel); //useState a set kore rakhlam
                final_sideBar = fepanel;
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
                employee_degignation_list.FieldExecutive
            ) {
                setsiteBarInformation_LocalStore(fepanel); //useState a set kore rakhlam
            }
            setlogingInformation_LocalStore(context_flag_obj);
        }
    }, []);
    // login context end

    //checkbox start

    let check_box_flag = [];
    const [check_box_flag_state, setcheck_box_flag_state] = useState([]);
    //let select_all_check_box_flag;
    const [select_all_check_box_flag, setselect_all_check_box_flag] =
        useState(false);
    // let count_number = json_information.message.length;
    useEffect(() => {
        if (!searchResult) return;
        let count_number = searchResult.length;
        for (let i = 0; i < count_number; i++) {
            check_box_flag.push(false);
        }
    }, [searchResult]);

    // for (let i = 0; i < count_number; i++) {
    //     check_box_flag.push(false);
    // }

    useEffect(() => {
        setcheck_box_flag_state(check_box_flag);
    }, [searchResult]);

    let checkbox_click_function = (index_value) => {
        let count_number = searchResult.length;
        // let count_number = json_information.message.length;
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
            if (!searchResult) return;
            let count_number = searchResult.length;
            // let count_number = json_information.message.length;
            for (let i = 0; i < count_number; i++) {
                temp_check_box.push(false);
            }
        } else {
            if (!searchResult) return;

            let count_number = searchResult.length;
            // let count_number = json_information.message.length;
            for (let i = 0; i < count_number; i++) {
                temp_check_box.push(true);
            }
        }
        setcheck_box_flag_state(temp_check_box);
    }, [select_all_check_box_flag]);
    let index = [];

    //checkbox end
    // selecting type of bag; regular or return
    const bagtypeselect = (e) => {
        console.log("bagtype", e.target.value);
        setbagtype(e.target.value);
    };
    // setting the array with selected bag type to show in table
    useEffect(() => {
        if (bagtype === "Return") {
            // setdata(return_bag_list)
            setreturndata(return_bag_list);
            setinfoModalOpen2(true);
        } else {
            setdata(regular_bag_list);
        }
        // bagtype === "Return" ? setdata(return_bag_list) setinfoModalOpen2(true) : setdata(regular_bag_list)
    }, [bagtype]);
    console.log("this is product for fe after select bagtype", data);
    // s
    // const showproductlist = (e)=>{
    //     console.log("selected bag",e.target.value)
    //     setselectedbag(e.target.value)
    //     setinfoModalOpen(true)
    //
    // }
    // useEffect(() => {
    //
    //     if(selectedbag==="")return;
    //
    //
    //     let data = JSON.stringify({
    //
    //         "dc_id": logingInformation_LocalStore.all_user_list.employeE_ID,
    //         "bag_waybill_list": [selectedbag],
    //         "date_time": getCurrentTime()
    //
    //     });
    //     var config = {
    //         method: 'post',
    //         url: Degital_Ocean_flag ? 'https://e-deshdelivery.com/universalapi/allapi/receiveBagbyDC'+'?company_name='+company_name : '/universalapi/allapi/receiveBagbyDC'+'?company_name='+company_name,
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${logingInformation_LocalStore.token}`
    //         },
    //         data:data
    //     };
    //
    //     axios(config)
    //         .then(function (response) {
    //             let json_object_str = JSON.stringify(response.data);
    //             let json_object = JSON.parse(json_object_str);
    //             return(json_object);
    //         })
    //         .then(res => {
    //             console.log("response is product to confirm",res);
    //             setinformation(res);
    //             setstrProductWaybillList("")
    //             setpayload(true);
    //             toast.success("Products Loaded!", {
    //                 position: toast.POSITION.TOP_CENTER, autoClose:1500
    //             });
    //             //  setinfoModalOpen(true)
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    //
    //
    // }, [selectedbag])
    // const confirmproduct =(e)=>{
    //     e.preventDefault()
    //     let waybillLength = 13
    //     let startIndex = 0
    //     let endIndex =13
    //     let temp =[]
    //     while(endIndex<=strProductWaybillList.length){
    //         temp.push(strProductWaybillList.slice(startIndex,endIndex))
    //         startIndex += waybillLength
    //         endIndex += waybillLength
    //     }
    //     console.log("confirm product list",temp)
    //     setconfirmproductlist(temp)
    // }
    // useEffect(() => {
    //
    //     if(selectedbag===""){
    //         toast.info("Select Shipment To Confirm Product!", {
    //             position: toast.POSITION.TOP_CENTER, autoClose:1500
    //         });
    //         return
    //     };
    //
    //     if(confirmproductlist.length===0)return;
    //
    //
    //     let data = JSON.stringify({
    //             "dc_id" : logingInformation_LocalStore.all_user_list.employeE_ID,
    //             "bag_waybill_number": selectedbag,
    //             "date_time": getCurrentTime(),
    //             "conferm_product_list": confirmproductlist,
    //             "lost_product_list": [],
    //             "damaged_product_list": []
    //         }
    //     );
    //     var config = {
    //         method: 'post',
    //         url: Degital_Ocean_flag ? 'https://e-deshdelivery.com/universalapi/allapi/confermBagProducts'+'?company_name='+company_name : '/universalapi/allapi/confermBagProducts'+'?company_name='+company_name,
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${logingInformation_LocalStore.token}`
    //         },
    //         data:data
    //     };
    //     console.log("config",config)
    //
    //     axios(config)
    //         .then(function (response) {
    //             let json_object_str = JSON.stringify(response.data);
    //             let json_object = JSON.parse(json_object_str);
    //             return(json_object);
    //         })
    //         .then(res => {
    //             console.log("product confirmed",res);
    //             if(res.message.wrong_product_waybill_list.length>=1){
    //                 let str="";
    //                 res.message.wrong_product_waybill_list.map(wrong_waybill=>{
    //                     str += wrong_waybill +" ";
    //                 })
    //
    //                 toast.error(`Wrong Waybill List !
    //         ${str}`, {
    //                     position: "top-right",
    //                     autoClose: false,
    //                     hideProgressBar: true,
    //                     closeOnClick: true,
    //                     pauseOnHover: true,
    //
    //                 });
    //             }
    //             if(res.message.successful_conferm_product_waybill.length>=1){
    //                 let str="";
    //                 res.message.successful_conferm_product_waybill.map(wrong_waybill=>{
    //                     str += wrong_waybill +" ";
    //                 })
    //
    //                 toast.success(`Products Confirmed !
    //           ${str}`, {
    //                     position: "top-right",
    //                     autoClose: false,
    //                     hideProgressBar: true,
    //                     closeOnClick: true,
    //                     pauseOnHover: true,
    //
    //                 });
    //             }
    //             if(res.already_confirmed_product_list.length>=1){
    //                 let str="";
    //                 res.already_confirmed_product_list.map(wrong_waybill=>{
    //                     str += wrong_waybill +" ";
    //                 })
    //
    //                 toast.warning(`Products Already Confirmed !
    //           ${str}`, {
    //                     position: "top-right",
    //                     autoClose: false,
    //                     hideProgressBar: true,
    //                     closeOnClick: true,
    //                     pauseOnHover: true,
    //
    //                 });
    //             }
    //
    //             //  setinformation(res);
    //             //  setpayload(true);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    //
    //
    // }, [confirmproductlist])
    useEffect(() => {
        //console.log("entering filter effect", allproductdata)
        const users1 =
            data &&
            data.filter((p) =>
                p.product_waybill_number
                    .toString()
                    .toLowerCase()
                    .includes(searchTerm.toString().toLowerCase())
            );
        setsearchResult(users1);
    }, [searchTerm, data]);

    const closeInvoiceModal = () => {
        setinfoModalOpen(false);
    };

    const closeInvoiceModal1 = () => {
        setinfoModalOpen1(false);
    };

    const closeInvoiceModal2 = () => {
        setinfoModalOpen2(false);
    };
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
            color: "black",
            position: "absolute",

            top: "20%",
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

    const submit = (e) => {
        e.preventDefault();
        let inputs1 = [];
        searchResult.map(async (data, list_index) => {
            if (check_box_flag_state[list_index]) {
                let elem = data.product_waybill_number;
                inputs1.push(elem);
            }
        });
        console.log("this is  after function call input", inputs1);
        setinputs(inputs1);
        setfeconfirm(!feconfirm);
    };

    console.log("this is product list after select", inputs);

    useEffect(() => {
        if (inputs.length === 0) {
            toast.info("Select Shipment To Confirm Product!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
            return;
        }
        //if(inputs.length===0)return;

        let data = JSON.stringify({
            fe_id: logingInformation_LocalStore.all_user_list.employeE_ID,
            confirm_waybill_list: inputs,
            date_time: getCurrentTime(),
        });
        console.log("this is fe data", data);

        var config = {
            method: "post",
            url: Degital_Ocean_flag
                ? "https://e-deshdelivery.com/universalapi/allapi/confirmProductByFE" +
                "?company_name=" +
                company_name
                : "/universalapi/allapi/confirmProductByFE" +
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
                console.log("product confirmed", res);

                //setregular_bag_list(res.message[0].all_Product_information);

                //  setinformation(res);
                //  setpayload(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [inputs]);

    const Checkotp = (e, waybill, ptype, conphn) => {
        setdeliveredwaybill(waybill);
        setconsigneephn(conphn);
        setdeliverpaymenttype(ptype);

        let data = JSON.stringify({
            employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
            product_waybill: waybill,
            access_stage: "Product Delivered",
            payment_type: ptype,
            attempt_count: "",
        });
        console.log("this is fe data", data);

        var config = {
            method: "post",
            url: Degital_Ocean_flag
                ? "https://e-deshdelivery.com/universalapi/allapi/checkif_otpisRequired" +
                "?company_name=" +
                company_name
                : "/universalapi/allapi/checkif_otpisRequired" +
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
                console.log("check otp", res);
                setcheckotpdeliver(res.message);
                //setregular_bag_list(res.message[0].all_Product_information);
                if (res.message === "False") {
                    //setdeliverwitouthotp(!deliverwitouthotp)
                    setinfoModalOpen(true);
                } else {
                    //setdeliverwithotp(!deliverwithotp)
                    setinfoModalOpen(true);
                }

                //  setinformation(res);
                //  setpayload(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    console.log("this is check otp message delivered", checkotpdeliver);
    console.log("this  delivered waybill", deliveredwaybill);

    const Deliver = () => {
        let data = JSON.stringify({
            consignee_phone_number: consigneephn === "" ? "" : consigneephn,
            product_receiver_name: delivername === "" ? "" : delivername,
            receiver_phone_number: deliverphn === "" ? "" : deliverphn,
            product_waybill_number: deliveredwaybill,
            otp_number: "False",
            payment_method: deliverpaymenttype,
            delered_date_time: getCurrentTime(),
        });
        console.log("this is fe data", data);

        var config = {
            method: "post",
            url: Degital_Ocean_flag
                ? "https://e-deshdelivery.com/universalapi/allapi/productDeliveredTo" +
                "?company_name=" +
                company_name
                : "/universalapi/allapi/productDeliveredTo" +
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
                console.log("this is deliver status", res);

                toast.success(res.status + res.message, {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    useEffect(() => {
        let data = JSON.stringify({
            Consignee_phone_number: consigneephn,
            fild_operative_id: logingInformation_LocalStore.all_user_list.employeE_ID,
            otp_dateTime: getCurrentTime(),
            product_waybill_number: deliveredwaybill,
            otp_type: "Deliver",
        });
        console.log("this is fe data", data);

        var config = {
            method: "post",
            url: Degital_Ocean_flag
                ? "https://e-deshdelivery.com/universalapi/allapi/sendOtpToConsignee" +
                "?company_name=" +
                company_name
                : "/universalapi/allapi/sendOtpToConsignee" +
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
                console.log("this is otp status", res);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [deliverwithotp]);

    const Hold = (e, waybill, orderid, returnpin) => {
        let data = JSON.stringify({
            WAYBILL_NUMBER: waybill,
            REFERENCE_NO: orderid,
            RETURN_PIN: returnpin,
            HOLDED_REASON: "reason",
            HOLDED_DATETIME: getCurrentTime(),
            otp_information: "False",
            delered_date_time: getCurrentTime(),
        });
        console.log("this is fe data", data);

        var config = {
            method: "post",
            url: Degital_Ocean_flag
                ? "https://e-deshdelivery.com/universalapi/allapi/holdProduct" +
                "?company_name=" +
                company_name
                : "/universalapi/allapi/holdProduct" + "?company_name=" + company_name,
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
                console.log("this is hold status", res);
                if (res.status == "Everything is OK") {
                    toast.warning(res.message, {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 5000,
                    });
                } else {
                    toast.info("! Something Went Wrong, Please try again!", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })

            .catch(function (error) {
                console.log("error", error.message);
                toast.error(error.message + "   Try Again", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 5000,
                });
            });
    };

    const Return = (e, returnway) => {
        setreturnwaybill(returnway);

        setinfoModalOpen1(true);
    };

    const Returnconfurm = () => {
        let data = JSON.stringify({
            product_waybill: returnwaybill,
            otp_number: "False",
            conferm_date_time: getCurrentTime(),
        });
        console.log("this is fe data", data);

        var config = {
            method: "post",
            url: Degital_Ocean_flag
                ? "https://e-deshdelivery.com/universalapi/allapi/returnConferm" +
                "?company_name=" +
                company_name
                : "/universalapi/allapi/returnConferm" +
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
                console.log("this is return confirm status", res);
                if (res.status == "Successfully Returned Product") {
                    toast.success(res?.status, {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 5000,
                    });
                } else {
                    toast.info("! Something Went Wrong, Please try again!", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
            .catch(function (error) {
                console.log("error", error.message);
                toast.error(error.message + "   Try Again", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 5000,
                });
            });
    };

    useEffect(() => {
        let data = JSON.stringify({
            waybill_number: returnwaybill,
            return_reason: returnreason,
            return_date_time: getCurrentTime(),
        });
        console.log("this is fe data", data);

        var config = {
            method: "post",
            url: Degital_Ocean_flag
                ? "https://e-deshdelivery.com/universalapi/allapi/returnedProduct" +
                "?company_name=" +
                company_name
                : "/universalapi/allapi/returnedProduct" +
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
                console.log("this is return status", res);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [returnreason]);

    const rto = (e, order) => {
        let data = JSON.stringify({
            fe_id: logingInformation_LocalStore.all_user_list.employeE_ID,
            product_order_id: [order],
            date_time: getCurrentTime(),
        });
        console.log("this is rto data", data);

        var config = {
            method: "post",
            url: Degital_Ocean_flag
                ? "https://e-deshdelivery.com/universalapi/allapi/submitReturnProductToClient" +
                "?company_name=" +
                company_name
                : "/universalapi/allapi/submitReturnProductToClient" +
                "?company_name=" +
                company_name,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${logingInformation_LocalStore.token}`,
            },
            data: data,
        };
        console.log("rto config", config);

        axios(config)
            .then(function (response) {
                let json_object_str = JSON.stringify(response.data);
                let json_object = JSON.parse(json_object_str);
                return json_object;
            })
            .then((res) => {
                console.log("this is rto status", res);
                if (res.status === "Successful Request.") {
                    toast.success("Product Submitted to client !", {
                        position: "top-right",
                        autoClose: false,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    let Withoutconsignee = () => {
        return (
            <div className="mt-5 pt-5 container">
                <div className="col-12 pt-5" id="">
                    <div className="form-group row mb-2">
                        <label htmlFor className="col-sm-3 col-form-label">
                            Name :{" "}
                        </label>
                        <div className="col-sm-6 position-relative">
              <span
                  className="position-absolute text-secondary p-2 m-0"
                  style={{ marginLeft: "-4px" }}
              >
                {/*{bagDesIcon}*/}
              </span>
                            <input
                                type="text"
                                className="form-control shadow mb-3 bg-body rounded"
                                style={{ paddingLeft: "35px" }}
                                placeholder="Name"
                                required
                                value={delivername}
                                onChange={(e) => {
                                    setdelivername(e.target.value);
                                }}
                            />
                        </div>
                    </div>

                    <div className="form-group row mb-2">
                        <label htmlFor className="col-sm-3 col-form-label">
                            Phone Number :{" "}
                        </label>
                        <div className="col-sm-6 position-relative">
              <span
                  className="position-absolute text-secondary p-2 m-0"
                  style={{ marginLeft: "-4px" }}
              >
                {/*{bagDesIcon}*/}
              </span>
                            <input
                                type="text"
                                className="form-control shadow mb-3 bg-body rounded"
                                style={{ paddingLeft: "35px" }}
                                placeholder="Phone Number"
                                required
                                value={deliverphn}
                                onChange={(e) => {
                                    setdeliverphn(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className=" mb-5">
                <form className="row d-flex justify-content-center" id="dcrecevedbag">
                    <p>
                        welcome to{" "}
                        {logingInformation_LocalStore.all_user_list.employeE_ZONE}{" "}
                        {logingInformation_LocalStore.all_user_list.employeE_DEGIGNATION}
                    </p>

                    <div className=" col-md-4 col-sm-4 w-25 form-group mx-3 mt-2">
                        <div className=" text-center text-black mx-1">
                            <label>Select Shipment Type</label>
                        </div>

                        <select
                            className="form-select "
                            id="paymenttype"
                            onChange={bagtypeselect}
                        >
                            <option selected value="Regular">
                                Regular
                            </option>
                            <option value="Return">Return</option>
                        </select>
                    </div>
                </form>
            </div>

            <div className="container">
                <div className="d-flex justify-content-center my-2">
                    <div className="input-group w-50">
                        <input
                            type="text"
                            className="form-control mx-2"
                            placeholder="search......."
                            value={searchTerm}
                            onChange={(e) => setsearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/*<div className="col-xl-6 col-lg-6 col-md-6 col-12">*/}
                {/*    <button*/}
                {/*        className="btn btn-sm me-2 bg-info text-black border-info mb-2"*/}
                {/*        onClick={(e) => submit(e)}*/}
                {/*    >*/}
                {/*        Submit*/}
                {/*    </button>*/}
                {/*</div>*/}

                <div>
                    <table className="table table-hover" id="dctable">
                        <thead className="bg-dark">
                        <tr className="text-white">
                            <th scope="col">
                                Action
                                {/*<div className="custom-control custom-checkbox">*/}
                                {/*    <input*/}
                                {/*        type="checkbox"*/}
                                {/*        className="custom-control-input"*/}
                                {/*        name="allSelect"*/}
                                {/*        onChange={(e) => select_all_function()}*/}
                                {/*    />*/}
                                {/*</div>*/}
                            </th>
                            <th scope="col">WayBill</th>
                            <th>client name</th>
                            <th scope="col">client phone</th>
                            <th>consignee_name</th>
                            <th scope="col">consignee phone</th>

                            <th scope="col">cod amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        {searchResult &&
                            searchResult.map((single_message, i) => {
                                return (
                                    <>
                                        <tr
                                            key={
                                                single_message.baG_ID_NUMBER
                                            } /*onClick={()=>bag_row_clicked_function(single_message.baG_ID_NUMBER)}*/
                                        >
                                            <td>
                                                <div className="d-flex ">
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-success mx-2"
                                                        onClick={(e) =>
                                                            Checkotp(
                                                                e,
                                                                single_message.product_waybill_number,
                                                                single_message.payment_type,
                                                                single_message.consignee_phone_number
                                                            )
                                                        }
                                                    >
                                                        Deliver
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-warning mx-2 "
                                                        onClick={(e) =>
                                                            Hold(
                                                                e,
                                                                single_message.product_waybill_number,
                                                                single_message.order_id,
                                                                single_message.pincode
                                                            )
                                                        }
                                                    >
                                                        Hold
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={(e) =>
                                                            Return(
                                                                e,
                                                                single_message.product_waybill_number,
                                                                single_message.order_id,
                                                                single_message.pincode
                                                            )
                                                        }
                                                    >
                                                        Return
                                                    </button>
                                                </div>

                                                {/*<div className="custom-control custom-checkbox">*/}
                                                {/*    <input*/}
                                                {/*        type="checkbox"*/}
                                                {/*        className="custom-control-input"*/}
                                                {/*        checked={check_box_flag_state[i]}*/}
                                                {/*        value={check_box_flag_state[i]}*/}
                                                {/*        onChange={() => checkbox_click_function(i)}*/}
                                                {/*    />*/}
                                                {/*</div>*/}
                                            </td>
                                            <td>{single_message.product_waybill_number}</td>
                                            <td>{single_message.client_name} </td>
                                            <td>{single_message.client_phone_number}</td>
                                            <td>{single_message.consignee_name}</td>
                                            <td>{single_message.consignee_phone_number}</td>

                                            <td>{single_message.cod_amount}</td>
                                        </tr>
                                    </>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <ReactModal
                isOpen={infoModalOpen}
                style={customStyles}
                onRequestClose={closeInvoiceModal}
                closeTimeoutMS={200}
                contentLabel="Example Modal"
            >
                <div className="container">
                    <button
                        className="btn btn-outline-danger mb-2"
                        onClick={closeInvoiceModal}
                    >
                        close
                    </button>

                    <div className="border border-primary d">
                        <div className="container p-3">
                            <form>
                                <div className="form-group row mb-2">
                                    <label htmlFor className="col-sm-3 col-form-label">
                                        Payment Type:
                                    </label>
                                    <div className="col-sm-6 position-relative">
                    <span
                        className="position-absolute text-secondary p-2 m-0"
                        style={{ marginLeft: "-4px" }}
                    >
                      {/*{bagTypIcon}*/}
                    </span>
                                        <select
                                            className="form-control shadow mb-3 bg-body rounded"
                                            style={{ paddingLeft: "35px" }}
                                            id="bgscrl"
                                            // onChange={(e) => {
                                            //     setbagtype(e.target.value);
                                            // }}
                                        >
                                            <option selected value="">
                                                None
                                            </option>
                                            <option value="Regular">Cash</option>
                                            <option value="Return">Bkash</option>
                                            <option value="Return">Others</option>
                                        </select>
                                    </div>
                                </div>

                                {/*payment Type*/}
                                <div className="form-group row mb-2">
                                    <label htmlFor className="col-sm-3 col-form-label">
                                        Deliver To:
                                    </label>
                                    <div className="col-sm-6 position-relative">
                    <span
                        className="position-absolute text-secondary p-2 m-0"
                        style={{ marginLeft: "-4px" }}
                    >
                      {/*{bagTypIcon}*/}
                    </span>
                                        <select
                                            className="form-control shadow mb-3 bg-body rounded"
                                            style={{ paddingLeft: "35px" }}
                                            id="bgscrl"
                                            onChange={(e) => {
                                                setdeliverto(e.target.value);
                                            }}
                                        >
                                            {/*<option  selected value="none">None</option>*/}

                                            <option selected value="Consignee">
                                                Consignee
                                            </option>
                                            <option value="Consignees Family">
                                                Consignees Family
                                            </option>
                                            <option value="Other as Instructed by Consignee">
                                                Other as Instructed by Consignee
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/*input fun here*/}

                        {deliverto === "Consignee" ? <div></div> : <Withoutconsignee />}

                        {/*      input fun end*/}

                        {/*  <div className="mt-5 pt-5 container">*/}
                        {/*      <div className="col-12 pt-5" id="">*/}

                        {/*          <div className="form-group row mb-2">*/}
                        {/*              <label htmlFor className="col-sm-3 col-form-label">*/}
                        {/*                  Name :{" "}*/}
                        {/*              </label>*/}
                        {/*              <div className="col-sm-6 position-relative">*/}
                        {/*      <span*/}
                        {/*    className="position-absolute text-secondary p-2 m-0"*/}
                        {/*    style={{marginLeft: "-4px"}}*/}
                        {/*>*/}
                        {/*  /!*{bagDesIcon}*!/*/}
                        {/*</span>*/}
                        {/*                  <input*/}
                        {/*                      type="text"*/}
                        {/*                      className="form-control shadow mb-3 bg-body rounded"*/}
                        {/*                      style={{paddingLeft: "35px"}}*/}
                        {/*                      placeholder="Name"*/}
                        {/*                      required*/}
                        {/*                      value={delivername}*/}
                        {/*                      onChange={(e) => {*/}
                        {/*                          setdelivername(e.target.value);*/}
                        {/*                      }}*/}
                        {/*                  />*/}
                        {/*              </div>*/}
                        {/*          </div>*/}

                        {/*          <div className="form-group row mb-2">*/}
                        {/*              <label htmlFor className="col-sm-3 col-form-label">*/}
                        {/*                  Phone Number :{" "}*/}
                        {/*              </label>*/}
                        {/*              <div className="col-sm-6 position-relative">*/}
                        {/*<span*/}
                        {/*    className="position-absolute text-secondary p-2 m-0"*/}
                        {/*    style={{marginLeft: "-4px"}}*/}
                        {/*>*/}
                        {/*  /!*{bagDesIcon}*!/*/}
                        {/*</span>*/}
                        {/*                  <input*/}
                        {/*                      type="text"*/}
                        {/*                      className="form-control shadow mb-3 bg-body rounded"*/}
                        {/*                      style={{paddingLeft: "35px"}}*/}
                        {/*                      placeholder="Phone Number"*/}
                        {/*                      required*/}
                        {/*                      value={deliverphn}*/}
                        {/*                      onChange={(e) => {*/}
                        {/*                          setdeliverphn(e.target.value);*/}
                        {/*                      }}*/}
                        {/*                  />*/}
                        {/*              </div>*/}
                        {/*          </div>*/}

                        {/*      </div>*/}
                        {/*  </div>*/}
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                        <button
                            className="btn btn-sm me-2 bg-info text-black border-info mb-2"
                            onClick={(e) => Deliver(e)}
                        >
                            Deliver
                        </button>
                    </div>
                </div>
            </ReactModal>

            {/*    return modal*/}

            <ReactModal
                isOpen={infoModalOpen1}
                style={customStyles}
                onRequestClose={closeInvoiceModal1}
                closeTimeoutMS={200}
                contentLabel="Example Modal"
            >
                <div className="container">
                    <button
                        className="btn btn-outline-danger mb-2"
                        onClick={closeInvoiceModal1}
                    >
                        close
                    </button>

                    <div className="border border-primary d">
                        <div className="container p-3">
                            <form>
                                <div className="form-group row mb-2">
                                    <label htmlFor className="col-sm-3 col-form-label">
                                        Reason:
                                    </label>
                                    <div className="col-sm-6 position-relative">
                    <span
                        className="position-absolute text-secondary p-2 m-0"
                        style={{ marginLeft: "-4px" }}
                    >
                      {/*{bagTypIcon}*/}
                    </span>
                                        <select
                                            className="form-control shadow mb-3 bg-body rounded"
                                            style={{ paddingLeft: "35px" }}
                                            id="bgscrl"
                                            onChange={(e) => {
                                                setreturnreason(e.target.value);
                                            }}
                                        >
                                            <option selected value="">
                                                None
                                            </option>
                                            <option value="The customer's phone is off.">
                                                The customer's phone is off.
                                            </option>
                                            <option value="The customer has requested to hold the parcel.">
                                                The customer has requested to hold the parcel.
                                            </option>
                                            <option value="The customer is not present at the specified address.">
                                                The customer is not present at the specified address.
                                            </option>
                                            <option value="The customer could not be found on the phone.">
                                                The customer could not be found on the phone.
                                            </option>
                                            <option value="ডুপ্লিকেট অর্ডার">ডুপ্লিকেট অর্ডার</option>
                                            <option value="গ্রাহক কোনো অর্ডার করেননি">
                                                গ্রাহক কোনো অর্ডার করেননি
                                            </option>
                                            <option value="গ্রাহক নির্দিষ্ট ঠিকানায় উপস্থিত নেই">
                                                গ্রাহক নির্দিষ্ট ঠিকানায় উপস্থিত নেই
                                            </option>
                                            <option value="হোল্ড এর লিমিট অতিক্রম করেছে">
                                                হোল্ড এর লিমিট অতিক্রম করেছে
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-12 mt-4">
                        <button
                            className="btn btn-sm me-2 bg-info text-black border-info mb-2"
                            onClick={(e) => Returnconfurm(e)}
                        >
                            Deliver
                        </button>
                    </div>
                </div>
            </ReactModal>

            {/*    return data modal*/}

            <ReactModal
                isOpen={infoModalOpen2}
                style={customStyles}
                onRequestClose={closeInvoiceModal2}
                closeTimeoutMS={200}
                contentLabel="Example Modal"
            >
                <div className="container">
                    <button
                        className="btn btn-outline-danger mb-2"
                        onClick={closeInvoiceModal2}
                    >
                        close
                    </button>

                    <div>
                        <table className="table table-hover" id="dctable">
                            <thead className="bg-dark">
                            <tr className="text-white">
                                <th scope="col">
                                    Action
                                    {/*<div className="custom-control custom-checkbox">*/}
                                    {/*    <input*/}
                                    {/*        type="checkbox"*/}
                                    {/*        className="custom-control-input"*/}
                                    {/*        name="allSelect"*/}
                                    {/*        onChange={(e) => select_all_function()}*/}
                                    {/*    />*/}
                                    {/*</div>*/}
                                </th>
                                <th scope="col">WayBill</th>
                                <th>client name</th>
                                <th scope="col">client phone</th>
                                <th>consignee_name</th>
                                <th scope="col">consignee phone</th>

                                <th scope="col">cod amount</th>
                            </tr>
                            </thead>
                            <tbody>
                            {returndata &&
                                returndata.map((single_message, i) => {
                                    return (
                                        <>
                                            <tr
                                                key={
                                                    single_message.baG_ID_NUMBER
                                                } /*onClick={()=>bag_row_clicked_function(single_message.baG_ID_NUMBER)}*/
                                            >
                                                <td>
                                                    <div className="d-flex ">
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-outline-danger mx-2"
                                                            onClick={(e) => rto(e, single_message.order_id)}
                                                        >
                                                            RTO
                                                        </button>
                                                    </div>

                                                    {/*<div className="custom-control custom-checkbox">*/}
                                                    {/*    <input*/}
                                                    {/*        type="checkbox"*/}
                                                    {/*        className="custom-control-input"*/}
                                                    {/*        checked={check_box_flag_state[i]}*/}
                                                    {/*        value={check_box_flag_state[i]}*/}
                                                    {/*        onChange={() => checkbox_click_function(i)}*/}
                                                    {/*    />*/}
                                                    {/*</div>*/}
                                                </td>
                                                <td>{single_message.product_waybill_number}</td>
                                                <td>{single_message.client_name} </td>
                                                <td>{single_message.client_phone_number}</td>
                                                <td>{single_message.consignee_name}</td>
                                                <td>{single_message.consignee_phone_number}</td>

                                                <td>{single_message.cod_amount}</td>
                                            </tr>
                                        </>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </ReactModal>
        </div>
    );
}
