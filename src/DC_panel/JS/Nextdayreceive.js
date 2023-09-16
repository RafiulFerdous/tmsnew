import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
//import Assigntofetable from '../../Model/Dcpanel/Assigntofetable';
import Lostmarktable from "../../Model/Dcpanel/Lostmarktable";
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
import { toast } from "react-toastify";
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

const Nextdayreceive = () => {
    const [employId, setemployId] = useState("");

    const [information, setinformation] = useState({});
    const [payload, setpayload] = useState(false);
    // const [Submit, setSubmit] = useState(false);

    var { loginInformation, setloginInformation } = useContext(LoginContext);

    const [logingInformation_LocalStore, setlogingInformation_LocalStore] =
        useState(loginInformation);
    const [siteBarInformation_LocalStore, setsiteBarInformation_LocalStore] =
        useState([]);


    const [waybill, setwaybill] = useState("");

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
                employee_degignation_list.SuperAdmin
            ) {
                setsiteBarInformation_LocalStore(superadminsidebar); //useState a set kore rakhlam.
                final_sideBar = superadminsidebar;
            } else if (
                loginInformation.all_user_list.employeE_DEGIGNATION ==
                employee_degignation_list.DistrictIncharge
            ) {
                setsiteBarInformation_LocalStore(dcpanel); //useState a set kore rakhlam
                final_sideBar = dcpanel;
            }
            setemployId(loginInformation.all_user_list.employeE_ID);
            setLogin_Sidebar_LocalStore(loginInformation, final_sideBar); //local store a set kore rakhlam.
            setlogingInformation_LocalStore(loginInformation); //useState a set kore rakhlam.
        } else {
            if (
                context_flag_obj.all_user_list.employeE_DEGIGNATION ==
                employee_degignation_list.SuperAdmin
            ) {
                setsiteBarInformation_LocalStore(superadminsidebar); //useState a set kore rakhlam.
                final_sideBar = superadminsidebar;
            } else if (
                context_flag_obj.all_user_list.employeE_DEGIGNATION ==
                employee_degignation_list.DistrictIncharge
            ) {
                setsiteBarInformation_LocalStore(dcpanel); //useState a set kore rakhlam
            }
            setemployId(context_flag_obj.all_user_list.employeE_ID);
            setlogingInformation_LocalStore(context_flag_obj);
        }
    }, []);
    // useEffect(()=>{
    //   setemployId(logingInformation_LocalStore.all_user_list.employeE_ID);
    // },[logingInformation_LocalStore])

    const Submit=()=>{

        let data = JSON.stringify({
            employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
            waybill_list_str:waybill,
            date_time: getCurrentTime()

        });

        console.log("data",data)

        var config = {
            method: "post",
            url: Degital_Ocean_flag
                ? "https://e-deshdelivery.com/universalapi/allapi/makeDCParcelReadytoDispatch" +
                "?company_name=" +
                company_name
                : "/universalapi/allapi/makeDCParcelReadytoDispatch" + "?company_name=" + company_name,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${logingInformation_LocalStore.token}`,
            },
            data: data,
        };

        console.log("config",config)

        axios(config)
            .then(function (response) {
                let json_object_str = JSON.stringify(response.data);
                let json_object = JSON.parse(json_object_str);
                return json_object;
            })
            .then((res) => {
                console.log("response ready to dispatch", res);

                if(res.message.response_code==="200"){
                    toast.success("Successfully Nextday parcel Receiver");
                }

                setinformation(res.message);
                setpayload(true);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    // useEffect(() => {
    //     //console.log(siteBarInformation_LocalStore);
    //     let data = JSON.stringify({
    //         employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
    //         waybill_list_str:waybill,
    //         date_time: getCurrentTime()
    //
    //     });
    //
    //     console.log("data",data)
    //
    //     var config = {
    //         method: "post",
    //         url: Degital_Ocean_flag
    //             ? "https://e-deshdelivery.com/universalapi/allapi/makeDCParcelReadytoDispatch" +
    //             "?company_name=" +
    //             company_name
    //             : "/universalapi/allapi/makeDCParcelReadytoDispatch" + "?company_name=" + company_name,
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${logingInformation_LocalStore.token}`,
    //         },
    //         data: data,
    //     };
    //
    //     console.log("config",config)
    //
    //     axios(config)
    //         .then(function (response) {
    //             let json_object_str = JSON.stringify(response.data);
    //             let json_object = JSON.parse(json_object_str);
    //             return json_object;
    //         })
    //         .then((res) => {
    //             console.log("response is fe list", res);
    //             setinformation(res.message);
    //             setpayload(true);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }, [Submit]);

    return (
        <>
            <div className="bodydiv">
                <div className="row">
                    <div className="col-12 ">
                        <Navbar sidebar_manu={siteBarInformation_LocalStore} />
                    </div>
                </div>
                {/* <div className="row">
                  <div className="col-12">
                   <Sidebar sidebar_manu={siteBarInformation_LocalStore}/>
                  </div>
                  </div> */}

                {/* <div className="row container-fluid">
                            <div className="col-6 " id="srchmenu">
                                    <Search/>
                            </div>
                       </div>
                    */}

                <div className="container">



                    <div className="row" id="lost">
                        <div className="col-lg-6 col-md-8 col-12 m-auto mt-5">
                            <div className="border mb-2 p-3 rounded-3">
                                <div className="row">
                                    <div className="col-12 col-md-4 col-lg-4">
                                        <p className=""> Product Waybill:</p>
                                    </div>
                                    <div className="col-12 col-md-8 col-lg-8">
                                        <input
                                            style={{
                                                backgroundColor: "#C5D5E4",
                                                outline: "none",
                                                border: "none",
                                                padding: "7px",
                                                borderRadius: "8px",
                                                width: "100%",
                                            }}
                                            className="form-control "
                                            onChange={(e) => {
                                                setwaybill(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-12 d-flex justify-content-center mt-3 mb-2">
                                        <button
                                            type="button"
                                            className="btn btn-success btn-sm px-4"
                                            disabled={!waybill}
                                             onClick={Submit}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>





                    {/*<div className="col-12" id="menuhome">*/}
                    {/*    {payload ? (*/}
                    {/*        <Lostmarktable response={information} />*/}
                    {/*    ) : (*/}
                    {/*        <div className="sk-cube-grid">*/}
                    {/*            <div className="sk-cube sk-cube1"></div>*/}
                    {/*            <div className="sk-cube sk-cube2"></div>*/}
                    {/*            <div className="sk-cube sk-cube3"></div>*/}
                    {/*            <div className="sk-cube sk-cube4"></div>*/}
                    {/*            <div className="sk-cube sk-cube5"></div>*/}
                    {/*            <div className="sk-cube sk-cube6"></div>*/}
                    {/*            <div className="sk-cube sk-cube7"></div>*/}
                    {/*            <div className="sk-cube sk-cube8"></div>*/}
                    {/*            <div className="sk-cube sk-cube9"></div>*/}
                    {/*        </div>*/}
                    {/*    )}*/}
                    {/*</div>*/}
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
export default Nextdayreceive;
