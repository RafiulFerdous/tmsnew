import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import "./HomeO.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
import HomeOperation from "../../Model/operation_content/HomeOperation";
import Newpartnerchangetable from "../../Model/Processingcenter/Newpartnerchangetable";
import "../css/all.css";
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
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
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

// let employId, setemployId;
// let date_time, setdate_time;

const Newpartnerchange = () => {
    toast.configure();
    const [employId, setemployId] = useState("");
    const [date_time, setdate_time] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [information, setinformation] = useState({});
    //
    console.log("see infomation", information.message);

    // unattamptStutus number for dashboard

    const [payload, setpayload] = useState(false);

    const [startdate, setstartdate] = useState(null);
    const [enddate, setenddate] = useState(null);
    const [waybill, setwaybill] = useState("");

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
                employee_degignation_list.ProcessingCenter
            ) {
                setsiteBarInformation_LocalStore(Linksidebar); //useState a set kore rakhlam.
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

    const search = () => {
        setIsLoading(true);
        if (!logingInformation_LocalStore.token || employId === "") return;
        if (
            (waybill === "" || waybill === null) &&
            (startdate === "" || startdate === null) &&
            (enddate === "" || enddate === null)
        ) {
            toast.info("Enter Date or Waybills");
            setIsLoading(false);
            return;
        }
        toast.info("Searching");
        var data = JSON.stringify({
            employee_id: employId,
            waybill_string: waybill === "" ? null : waybill,
            start_date: startdate === "" ? null : startdate,
            end_date: enddate === "" ? null : enddate,
        });

        var axios = require("axios");

        console.log("Locked api: ", data);

        var config = {
            method: "post",
            url: Degital_Ocean_flag
                ? "https://e-deshdelivery.com/universalapi/allapi/operationPanel_Homeapi" +
                "?company_name=" +
                company_name
                : "/universalapi/allapi/operationPanel_Homeapi" +
                "?company_name=" +
                company_name,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${logingInformation_LocalStore.token}`,
            },
            data: data,
        };
        console.log("new api", config);

        axios(config)
            .then(function (response) {
                let json_object_str = JSON.stringify(response.data);
                let json_object = JSON.parse(json_object_str);
                console.log(json_object);
                return json_object;
            })
            .then((res) => {
                console.log("ops api call", res);
                toast.success("Successful Search!");
                setinformation(res);
                setIsLoading(false);
                if (res.message.length === 0) {
                    toast.success("No Data!");
                    setpayload(false);
                } else {
                    setpayload(true);
                }
                // setpayload(true);
            })
            .catch(function (error) {
                console.log(error);
                setIsLoading(false);
            });
    };

    console.log("this is new api information in operation", information);

    useEffect(() => {
        setemployId(logingInformation_LocalStore.all_user_list.employeE_ID);
    }, [logingInformation_LocalStore]);

    // useEffect(()=>{
    //     if(!logingInformation_LocalStore.token||employId ==="")return;
    //     var axios = require('axios');
    //     var data = JSON.stringify({
    //         "employee_id": employId
    //     });
    //
    //     console.log("Locked api: ",data);
    //
    //     var config = {
    //         method: 'post',
    //         url: Degital_Ocean_flag ? 'https://e-deshdelivery.com/universalapi/allapi/operationPanel_Homeapi'+'?company_name='+company_name : '/universalapi/allapi/operationPanel_Homeapi'+'?company_name='+company_name,
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${logingInformation_LocalStore.token}`
    //         },
    //         data : data
    //     };
    //
    //     axios(config)
    //         .then(function (response) {
    //             let json_object_str = JSON.stringify(response.data);
    //             let json_object = JSON.parse(json_object_str);
    //             console.log(json_object);
    //             return(json_object);
    //         }).then(res => {
    //         console.log("ops api call")
    //         setinformation(res);
    //         setpayload(true);
    //     })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // },[logingInformation_LocalStore,employId]);

    //   useEffect(()=>{
    //     if(!logingInformation_LocalStore.token||employId ==="")return;
    //     var axios = require('axios');
    //     var data = JSON.stringify({
    //       "employee_id": employId
    //     });
    //
    //     console.log("Locked api: ",data);
    //
    //     var config = {
    //       method: 'post',
    //       url: Degital_Ocean_flag ? 'https://e-deshdelivery.com/universalapi/allapi/operation_allproductInformation'+'?company_name='+company_name : '/universalapi/allapi/operation_allproductInformation'+'?company_name='+company_name,
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${logingInformation_LocalStore.token}`
    //       },
    //       data : data
    //     };
    //
    //     axios(config)
    //     .then(function (response) {
    //       let json_object_str = JSON.stringify(response.data);
    //     let json_object = JSON.parse(json_object_str);
    //     console.log(json_object);
    //     return(json_object);
    //   }).then(res => {
    //     console.log("ops api call")
    //       setinformation(res);
    //       setpayload(true);
    //   })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // },[logingInformation_LocalStore,employId]);

    const unattamptStutus = information?.message?.filter(checkUnattampt);
    function checkUnattampt(unattamptStutus) {
        return unattamptStutus?.color_code == "PRODUCT";
    }
    console.log("unattamptStutus", unattamptStutus?.length);

    // DeliveredStutus number for dashboard

    const DeliveredStutus = information?.message?.filter(checkDelivered);
    function checkDelivered(DeliveredStutus) {
        return DeliveredStutus?.color_code == "DELEVERED_PRODUCT_INFORMATION";
    }
    console.log("DeliveredStutus", DeliveredStutus?.length);
    // HoldStutus number for dashboard

    const holdStutus = information?.message?.filter(checkHold);
    function checkHold(holdStutus) {
        return holdStutus?.color_code == "Hold";
    }
    console.log("holdStutus", holdStutus?.length);
    // lostStutus number for dashboard

    const lostStutus = information?.message?.filter(checkLost);
    function checkLost(lostStutus) {
        return lostStutus?.color_code == "LOST_PRODUCT_INFORMATION";
    }
    console.log("lostStutus", lostStutus?.length);
    // lostStutus number for dashboard

    const returnStutus = information?.message?.filter(checkReturn);
    function checkReturn(returnStutus) {
        return returnStutus?.color_code == "RETURNED_PRODUCT_INFORMATION";
    }
    console.log("returnStutus", returnStutus?.length);
    const searchIcon = <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>;

    const percentage = 80;

    return (
        <>
            <div className="bodydiv">
                <div className="row">
                    <div className="col-12">
                        <Navbar sidebar_manu={siteBarInformation_LocalStore} />
                    </div>
                </div>

                <div className="container mt-5 pt-5">
                    <div className="row justify-content-center shadow-lg ">
                        {/* <div
                            className="col-lg-7 col-md-6 col-12 rounded-2 "
                            style={{ background: "#C5D5E4" }}
                        >
                            <div className="row py-3 justify-content-center">
                                <div className="col-lg-3 col-md-6 col-12 d-flex justify-content-center">
                                    <Example label="">
                                        <CircularProgressbar
                                            value={percentage}
                                            text={`${percentage}%`}
                                            background
                                            backgroundPadding={6}
                                            styles={buildStyles({
                                                backgroundColor: "#414042",
                                                textColor: "#fff",
                                                pathColor: "#ffde17",
                                                trailColor: "#58595B",
                                            })}
                                        />
                                    </Example>
                                </div>
                                <div className="col-lg-5 col-md-12 col-12 my-3">
                                    <div className="d-flex justify-content-between align-itens-center">
                                        <span className="fw-bold m-0">Previous Month:</span>
                                        <input
                                            className="shadow"
                                            style={{
                                                width: "250px",
                                                color: "white",
                                                backgroundColor: "#6D6D6D",
                                                outline: "none",
                                                border: "none",
                                                padding: "7px",
                                                borderRadius: "8px",
                                            }}
                                            type="month"
                                            name=""
                                            id=""
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <div className="d-flex justify-content-between my-1">
                                            <div className="unattempted m-0"></div>
                                            <span className="m-0 fw-bold">Total Unattempted</span>
                                            {unattamptStutus ? (
                                                <span className="m-0 fw-bold">
                          {unattamptStutus?.length}
                        </span>
                                            ) : (
                                                <span className="m-0 fw-bold">0</span>
                                            )}
                                        </div>
                                        <div className="d-flex justify-content-between my-1">
                                            <div className="Delivered m-0"></div>
                                            <span className="m-0 fw-bold">Total Delivered</span>
                                            {DeliveredStutus ? (
                                                <span className="m-0 fw-bold">
                          {DeliveredStutus?.length}
                        </span>
                                            ) : (
                                                <span className="m-0 fw-bold">0</span>
                                            )}
                                        </div>
                                        <div className="d-flex justify-content-between my-1">
                                            <div className="Lost m-0"></div>
                                            <span className="m-0 fw-bold">Total Lost</span>
                                            {lostStutus ? (
                                                <span className="m-0 fw-bold">
                          {lostStutus?.length}
                        </span>
                                            ) : (
                                                <span className="m-0 fw-bold">0</span>
                                            )}
                                        </div>
                                        <div className="d-flex justify-content-between my-1">
                                            <div className="Hold m-0"></div>
                                            <span className="m-0 fw-bold">Total Hold</span>
                                            {holdStutus ? (
                                                <span className="m-0 fw-bold">
                          {holdStutus?.length}
                        </span>
                                            ) : (
                                                <span className="m-0 fw-bold">0</span>
                                            )}
                                        </div>
                                        <div className="d-flex justify-content-between my-1">
                                            <div className="Return m-0"></div>
                                            <span className="m-0 fw-bold">Total Return</span>
                                            {returnStutus ? (
                                                <span className="m-0 fw-bold">
                          {returnStutus?.length}
                        </span>
                                            ) : (
                                                <span className="m-0 fw-bold">0</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-12 col-12 my-3">
                                    <h6 className="fw-bold m-0">Data Overview by Search</h6>

                                    <div className="mt-4">
                                        <div className="d-flex justify-content-between my-1">
                                            <div className="unattempted m-0"></div>
                                            <span className="m-0  fw-bold">Total Unattempted</span>
                                            {unattamptStutus ? (
                                                <span className="m-0 fw-bold">
                          {unattamptStutus?.length}
                        </span>
                                            ) : (
                                                <span className="m-0 fw-bold">0</span>
                                            )}
                                        </div>
                                        <div className="d-flex justify-content-between my-1">
                                            <div className="Delivered m-0"></div>
                                            <span className="m-0  fw-bold">Total Delivered</span>
                                            {DeliveredStutus ? (
                                                <span className="m-0 fw-bold">
                          {DeliveredStutus?.length}
                        </span>
                                            ) : (
                                                <span className="m-0 fw-bold">0</span>
                                            )}
                                        </div>
                                        <div className="d-flex justify-content-between my-1">
                                            <div className="Lost m-0"></div>
                                            <span className="m-0  fw-bold">Total Lost</span>
                                            {lostStutus ? (
                                                <span className="m-0 fw-bold">
                          {lostStutus?.length}
                        </span>
                                            ) : (
                                                <span className="m-0 fw-bold">0</span>
                                            )}
                                        </div>
                                        <div className="d-flex justify-content-between my-1">
                                            <div className="Hold m-0"></div>
                                            <span className="m-0  fw-bold">Total Hold</span>
                                            {holdStutus ? (
                                                <span className="m-0 fw-bold">
                          {holdStutus?.length}
                        </span>
                                            ) : (
                                                <span className="m-0 fw-bold">0</span>
                                            )}
                                        </div>
                                        <div className="d-flex justify-content-between my-1">
                                            <div className="Return m-0"></div>
                                            <span className="m-0  fw-bold">Total Return</span>
                                            {returnStutus ? (
                                                <span className="m-0 fw-bold">
                          {returnStutus?.length}
                        </span>
                                            ) : (
                                                <span className="m-0 fw-bold">0</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div className="col-lg-5 col-md-6 col-12 ">
                            <div className="p-3">
                                {/* <div className="row  ">
                                    <div className="col-lg-6 col-md-12 col-12">
                                        <div className="d-flex-justify-content-center my-1">
                                            <label htmlFor="startdate">Start Date</label>
                                            <input
                                                style={{
                                                    backgroundColor: "#C5D5E4",
                                                    outline: "none",
                                                    border: "none",
                                                    padding: "7px",
                                                    borderRadius: "8px",
                                                }}
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
                                    <div className="col-lg-6 col-md-12 col-12">
                                        <div className="d-flex-justify-content-center my-1">
                                            <label htmlFor="enddate">End Date</label>
                                            <input
                                                style={{
                                                    backgroundColor: "#C5D5E4",
                                                    outline: "none",
                                                    border: "none",
                                                    padding: "7px",
                                                    borderRadius: "8px",
                                                    marginLeft: "6px",
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
                                </div> */}
                                <div className="row mt-2">
                                    <input
                                        style={{
                                            backgroundColor: "#C5D5E4",
                                            outline: "none",
                                            border: "none",
                                            padding: "7px",
                                            borderRadius: "8px",
                                            width: "93%",
                                            marginLeft: "10px",
                                        }}
                                        type="text"
                                        placeholder="Waybill"
                                        value={waybill}
                                        onChange={(e) => {
                                            setwaybill(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="d-flex justify-content-center mt-3">
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
                </div>

                <div className="container">
                    <div className="col-12" id="">
                        <div className="" id="">
                            <form className="row d-flex justify-content-center">
                                {/*</div>*/}
                                {/*  onChange={handleFilter} */}
                                {/* <div className="w-25 form-group mt-4">
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
                </div> */}
                                {/*  */}
                                {/*<div className=" col-sm-4 form-group mx-3 mt-4">*/}
                                {/*  <div className=" text-center text-black m-2">*/}
                                {/*    Start Date:{" "}*/}
                                {/*    <input*/}
                                {/*        type="date"*/}
                                {/*        className="input-small "*/}
                                {/*        id="startdate"*/}
                                {/*        value={startdate}*/}
                                {/*        onChange={(e) => {*/}
                                {/*          setstartdate(e.target.value);*/}
                                {/*        }}*/}
                                {/*    />*/}
                                {/*  </div>*/}
                                {/*</div>*/}
                                {/*  */}
                                {/*  onChange={handleFilter}*/}
                                {/*  */}
                                {/*<div className=" col-sm-4 form-group mx-3 mt-4">*/}
                                {/*  <div className="text-center text-black m-2">*/}
                                {/*    End Date:{" "}*/}
                                {/*    <input*/}
                                {/*        type="date"*/}
                                {/*        className="input-small"*/}
                                {/*        id="enddate"*/}
                                {/*        value={enddate}*/}
                                {/*        onChange={(e) => {*/}
                                {/*          setenddate(e.target.value);*/}
                                {/*        }}*/}
                                {/*    />*/}
                                {/*  </div>*/}
                                {/*</div>*/}
                                {/*  */}
                                {/* <div className=" w-25 form-group mt-4">
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
                </div> */}
                            </form>
                            {/*  */}
                            {/*<form className="row d-flex justify-content-center">*/}
                            {/*  <div className="col-lg-6 col-md-6 col-sm-4 form-group mx-3 mt-2 p-4">*/}
                            {/*    <div className="input-group  input-icons">*/}
                            {/*      <i className="icon ">{searchIcon}</i>*/}
                            {/*      <input*/}
                            {/*          type="text"*/}
                            {/*          className="rounded-pill px-5 py-2 input-field input-search"*/}
                            {/*          placeholder="Waybill"*/}
                            {/*          value={waybill}*/}
                            {/*          onChange={(e) => {*/}
                            {/*            setwaybill(e.target.value);*/}
                            {/*          }}*/}
                            {/*      />*/}
                            {/*    </div>*/}
                            {/*    /!*<div className="d-flex justify-content-center mt-3">*!/*/}
                            {/*    /!*  <button*!/*/}
                            {/*    /!*      type="button"*!/*/}
                            {/*    /!*      className="btn btn-outline-primary"*!/*/}
                            {/*    /!*      onClick={search}*!/*/}
                            {/*    /!*  >*!/*/}
                            {/*    /!*    Search*!/*/}
                            {/*    /!*  </button>*!/*/}
                            {/*    /!*</div>*!/*/}
                            {/*    /!* </div> *!/*/}
                            {/*  </div>*/}
                            {/*</form>*/}
                            {/*  */}
                        </div>
                        {isLoading ? (
                            <Loader />
                        ) : payload ? (
                            <Newpartnerchangetable response={information} />
                        ) : (
                            <></>
                        )}
                        {/*&&information===""*/}
                        {/* {payload ? (
              <HomeOperation response={information} />
            ) : (
              <></>
              //   <div className="sk-cube-grid">
              //     <div className="sk-cube sk-cube1"></div>
              //     <div className="sk-cube sk-cube2"></div>
              //    <div className="sk-cube sk-cube3"></div>
              //     <div className="sk-cube sk-cube4"></div>
              //     <div className="sk-cube sk-cube5"></div>
              //     <div className="sk-cube sk-cube6"></div>
              //     <div className="sk-cube sk-cube7"></div>
              //     <div className="sk-cube sk-cube8"></div>
              //     <div className="sk-cube sk-cube9"></div>
              //   </div>
            )} */}
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
};
export default Newpartnerchange;

function Example(props) {
    return (
        <div style={{ marginBottom: "" }}>
            <div style={{ marginTop: 30, display: "flex" }}>
                <div style={{ width: "100%" }}>{props.children}</div>
                {/* <div style={{ width: "70%" }}>
          <h3 className="h5">{props.label}</h3>
          <p>{props.description}</p>
        </div> */}
            </div>
        </div>
    );
}
