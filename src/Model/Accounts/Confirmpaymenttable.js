import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { SearchContext } from "../../Context/searchContext";
import { SearchButtonContext } from "../../Context/buttonContext";
import BarCode, { useBarcode } from "react-barcode";
import { jsPDF } from "jspdf";
import { CSVLink, CSVDownload } from "react-csv";
import { toast } from "react-toastify";
import "./acctable.css";
import { LoginContext } from "../../Context/loginContext";
import {
    Linksidebar,
    CustomerCareLinksidebar,
    Salessidebar,
    Operationsidebar,
    Degital_Ocean_flag,
    company_name,
    acsidebar,
} from "../../Common/Linksidebar";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
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
let date_time, setdate_time;
let pageRefreshFlag, setpageRefreshFlag;
let informationResponse, setinformationResponse;

const Confirmpaymenttable = (props) => {
    toast.configure();
    let json_information = props.response;
    console.log("response:" + json_information);
    const [payload, setpayload] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [inputs, setinputs] = useState([]);
    const [clientname, setclientname] = useState([]);
    const [dcname, setdcname] = useState(null);
    const [dc_name, setdc_name] = useState([]);
    const [client, setclient] = useState(null);
    const [startdate, setstartdate] = useState(null);
    const [enddate, setenddate] = useState(null);

    const [alldata, setalldata] = useState([]);
    const [allfiltereddata, setallfiltereddata] = useState([]);

    const [searchTermFlag, setsearchTermFlag] = useState(false);

    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchTermAltFlag, setsearchTermAltFlag] = useState(false);

    const handleonChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // checkbos

    let check_box_flag = [];
    const [check_box_flag_state, setcheck_box_flag_state] = useState([]);
    //let select_all_check_box_flag;
    const [select_all_check_box_flag, setselect_all_check_box_flag] =
        useState(false);
    let count_number = allfiltereddata.length;
    for (let i = 0; i < count_number; i++) {
        check_box_flag.push(false);
    }

    useEffect(() => {
        setcheck_box_flag_state(check_box_flag);
    }, []);

    let uncheck_all = () => {
        let count_number = allfiltereddata.length;
        let temp_check_box = [];
        for (let i = 0; i < count_number; i++) {
            temp_check_box.push(false);
        }
        setcheck_box_flag_state(temp_check_box);
        setselect_all_check_box_flag(false);
    };

    let checkbox_click_function = (index_value) => {
        let count_number = allfiltereddata.length;
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
            let count_number = allfiltereddata.length;
            for (let i = 0; i < count_number; i++) {
                temp_check_box.push(false);
            }
        } else {
            let count_number = allfiltereddata.length;
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

    //const [select_all_check_box_flag, setselect_all_check_box_flag] = useState(false);

    [date_time, setdate_time] = useState("");
    [informationResponse, setinformationResponse] = useState("");
    [pageRefreshFlag, setpageRefreshFlag] = useState(true);

    useEffect(() => {
        setclientname(json_information.message.all_client_name);
    }, []);

    console.log("all client data is here", clientname);

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

    console.log("this is all dc list", dc_name);

    //get list

    const Search = () => {
        setIsLoading(true);
        var axios = require("axios");
        var data = JSON.stringify({
            employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
            dc_name: dcname,
            client_id: parseInt(client),
            start_date: startdate,
            end_date: enddate,
        });
        console.log("employee id is here", data);

        console.log(siteBarInformation_LocalStore);
        var config = {
            method: "post",
            url: Degital_Ocean_flag
                ? "https://e-deshdelivery.com/universalapi/allapi/accountPanelReceivePaymentProductListFromDC" +
                "?company_name=" +
                company_name
                : "/universalapi/allapi/accountPanelReceivePaymentProductListFromDC" +
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
                console.log("This is acc pro list res", res);
                toast.success("SuccessFully Searched", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                });
                setalldata(res.message.all_product_info);
                setIsLoading(false);
                //setpayload(true);
            })
            .catch(function (error) {
                console.log(error);
                setIsLoading(false);
            });
    };

    console.log("This is acc pro list alldata", alldata);

    useEffect(() => {
        //console.log("entering filter effect", allproductdata)
        const users1 = alldata.filter((p) =>
            p.waybill_number
                .toString()
                .toLowerCase()
                .includes(searchTerm.toString().toLowerCase())
        );
        setallfiltereddata(users1);
    }, [searchTermAltFlag, alldata]);

    useEffect(() => {
        if (searchTerm.length === 0) {
            setallfiltereddata(alldata);
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
                setallfiltereddata(temp);
            }
        }
    }, [searchTermFlag, alldata]);

    let SubmitButtonFunction = (e) => {
        e.preventDefault();
        let inputs1 = [];
        allfiltereddata.map(async (data, list_index) => {
            if (check_box_flag_state[list_index]) {
                let elem = data.waybill_number;
                inputs1.push(elem);
            }
        });
        console.log("this is rony after function call input", inputs1);
        setinputs(inputs1);
        setpageRefreshFlag(false);
    };

    useEffect(() => {
        if (inputs.length > 0) {
            var axios = require("axios");

            var data = JSON.stringify({
                employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
                product_waybill_list: inputs,

                date_time: date_time,
                dc_name: dcname,
                client_id: parseInt(client),
                start_date: startdate,
                end_date: enddate,
            });

            console.log("single product : ", data);

            var config = {
                method: "post",
                url: Degital_Ocean_flag
                    ? "https://e-deshdelivery.com/universalapi/allapi/accountPanelReceivePaymentFromDC" +
                    "?company_name=" +
                    company_name
                    : "/universalapi/allapi/accountPanelReceivePaymentFromDC" +
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
                    //console.log(JSON.stringify(response.data));
                    // setpickupRefreshFlag(pickupRefreshFlag => !pickupRefreshFlag);
                    toast.success("SuccessFully Submitted !", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 1500,
                    });
                    console.log("Successfully api called submit: ", response);
                    return response;
                })
                .then((res) => {
                    console.log("new response", res);
                    setalldata(res.data.update_list.all_product_info);
                    uncheck_all();
                    setpayload(true);
                })
                .catch(function (error) {
                    // Error
                    if (error.response) {
                        toast.error("Error!", {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 1500,
                        });
                    } else if (error.request) {
                        toast.error(" Request Error!", {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 1500,
                        });
                        console.log(error.request);
                    } else {
                        console.log("Error", error.message);
                    }
                    console.log(error.config);
                });
            //setpickupFlag(pickupFlag => !pickupFlag);
        }
    }, [inputs, logingInformation_LocalStore]);

    const searchflag = (e) => {
        e.preventDefault();
        setsearchTermFlag(!searchTermFlag);
    };
    const resetflag = (e) => {
        e.preventDefault();
        setSearchTerm("");
        setsearchTermFlag(!searchTermFlag);
    };

    return (
        <>
            <div>
                {/*search form*/}

                {/*new design accounts panel  Confirm payment start */}

                <div className="">
                    <h4 className="text-dark text-center">Confirm DC Payment</h4>
                    <div className="container shadow my-3 py-3 rounded single-product-upload-bg">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-12">
                                <div className="row my-2">
                                    <div className="col-lg-3 col-md-3 col-12">
                                        <p> DC Name:</p>
                                    </div>
                                    <div className="col-lg-9 col-md-9 col-12">
                                        <input
                                            className="shadow-lg form-control  me-3 bg-white rounded"
                                            // defaultValue={clientName}
                                            list="dcNames"
                                            onChange={(e) => {
                                                setdcname(e.target.value);
                                            }}
                                        ></input>
                                        <datalist id="dcNames">
                                            <option selected value="">
                                                None
                                            </option>
                                            {dc_name.map((single_dc_office_name) => {
                                                // console.log("SINGLE DC NAME:", single_dc_office_name);
                                                return <option value={single_dc_office_name}></option>;
                                            })}
                                        </datalist>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-12">
                                <div className="row my-2">
                                    <div className="col-lg-3 col-md-3 col-12">
                                        <p>Client Name:</p>
                                    </div>
                                    <div className="col-lg-9 col-md-9 col-12">
                                        <input
                                            className="shadow-lg form-control  me-3 bg-white rounded"
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
                                            {clientname.map((single_client) => {
                                                // console.log("SINGLE DC NAME:", single_dc_office_name);
                                                return (
                                                    <option value={single_client.client_id}>
                                                        {single_client.client_name}
                                                    </option>
                                                );
                                            })}
                                        </datalist>
                                    </div>
                                </div>
                            </div>
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

                        <div className="col-md-12 d-flex justify-content-center mt-4 mb-2">
                            <button
                                type="button"
                                className="btn btn-success btn-sm px-4 rounded-pill"
                                onClick={Search}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                {/*new design accounts panel Confirm payment end */}

                {/* <div className="border  mb-5">
          <form className="row d-flex justify-content-center">
            <div className=" col-sm-4 form-group mx-3 mt-2">
              <div className=" text-center text-black mx-1">DC Name:</div>
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
                  return <option value={single_dc_office_name}></option>;
                })}
              </datalist>
            </div>
            <div className="col-sm-4 form-group mx-3 mt-2">
              <div className=" text-center text-black mx-1">Client Name:</div>
              <input
                list="clientNames"
                className="form-control"
                id="clientname"
                onChange={(e) => {
                  setclient(e.target.value);
                }}
              />
              <datalist id="clientNames">
                <option selected value="">
                  None
                </option>
                {clientname.map((single_client) => {
                  // console.log("SINGLE DC NAME:", single_dc_office_name);
                  return (
                    <option value={single_client.client_id}>
                      {single_client.client_name}
                    </option>
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
                onClick={Search}
              >
                Search
              </button>
            </div>
          </form>
        </div> */}

                {/*search form end*/}

                {/* <div className="">
          <form>
            <div className="input-group">
              <input
                type="text"
                className="form-control mx-2"
                placeholder="Filter waybills, Bag, DC, Merchant"
                value={searchTerm}
                onChange={handleonChange}
              />
            </div>
            <div className="mx-auto mt-3 text-center">
              <button
                className="btn btn-sm bg-info text-black border-info m-2 rounded-pill"
                onClick={searchflag}
              >
                Search
              </button>
              <button
                className="btn btn-sm bg-info text-black border-info m-2 rounded-pill"
                onClick={resetflag}
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        <div className="col-1 d-flex justify-content-center text-align-center">
          <button
            className="btn btn-primary  mb-3 "
            onClick={(e) => SubmitButtonFunction(e)}
          >
            Submit
          </button>
        </div>

        <div>
          <CSVLink
            data={allfiltereddata && allfiltereddata}
            filename={`PaymentConfirmed${getCurrentTime()}.csv`}
            className="btn btn-sm bg-info text-black border-info mb-2 rounded-pill"
          >
            Export csv
          </CSVLink>
        </div> */}
                {isLoading ? (
                    <Loader />
                ) : (
                    <div id="no-more-tables" className="mt-5">
                        <div className="row mb-2">
                            <div className="col-lg-3 col-md-6 col-12 mb-2">
                                <button
                                    className="btn btn-sm btn-success px-3 me-2 rounded-3 "
                                    onClick={(e) => SubmitButtonFunction(e)}
                                >
                                    Submit
                                </button>
                                <CSVLink
                                    data={allfiltereddata && allfiltereddata}
                                    filename={`PaymentConfirmed${getCurrentTime()}.csv`}
                                    className="btn btn-sm btn-dark px-3 ms-2 rounded-3"
                                >
                                    Export csv
                                </CSVLink>
                            </div>

                            <div className="col-lg-6 col-md-8 col-12 mb-2">
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
                                    placeholder="Filter waybills, Bag, DC, Merchant"
                                    value={searchTerm}
                                    onChange={handleonChange}
                                />
                            </div>
                            <div className="col-lg-3 col-md-4 col-12 mb-2">
                                <button
                                    className="btn btn-sm btn-success px-3 me-2 rounded-3"
                                    onClick={searchflag}
                                >
                                    Search
                                </button>
                                <button
                                    className="btn btn-sm btn-danger px-3 ms-2 rounded-3"
                                    onClick={resetflag}
                                >
                                    Reset
                                </button>
                            </div>
                        </div>

                        <table
                            className="table css-serial bg-white"
                            style={{ fontSize: "13px", marginLeft: "1px" }}
                            // id="tableacc"
                        >
                            <thead
                                className="text-center shadow sticky-top"
                                style={{ backgroundColor: "#b4bec2", top: "60px", zIndex: 0 }}
                            >
                            <tr className="text-dark" style={{ border: "none" }}>
                                <th scope="col">SL</th>
                                {/* <th>
                                <button className="btn btn-sm bg-dark text-white border-dark mb-2">All Done</button>
                            </th> */}
                                {/*<th scope="col">Select</th>*/}
                                <th scope="col">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            style={{ cursor: "pointer" }}
                                            type="checkbox"
                                            checked={select_all_check_box_flag}
                                            className="custom-control-input"
                                            name="allSelect"
                                            onChange={(e) => select_all_function()}
                                        />
                                    </div>
                                </th>

                                {/*<th scope="col">*/}
                                {/*   */}
                                {/*</th>*/}
                                <th scope="col">Waybill Number</th>
                                <th scope="col">Order Id</th>

                                <th scope="col">DC Name</th>
                                <th scope="col">Client Name</th>
                                <th scope="col">COD Amount</th>

                                <th scope="col">Processing Status</th>

                                <th scope="col">Processing date time</th>

                                <th scope="col">Financial Status</th>
                                {/*<th scope="col">*/}
                                {/*<CSVLink data={alldata} filename={"confirmdata.csv"} className="btn btn-sm bg-info text-black border-info mb-2">Export csv</CSVLink>*/}
                                {/*</th>*/}
                            </tr>
                            </thead>
                            <tbody className="text-center border border-secondary">
                            {allfiltereddata &&
                                allfiltereddata.map((single_data, i) => {
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
                                                    <td
                                                        data-title="Select"
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        <div className="custom-control custom-checkbox">
                                                            <input
                                                                type="checkbox"
                                                                className="custom-control-input"
                                                                checked={check_box_flag_state[i]}
                                                                value={check_box_flag_state[i]}
                                                                onChange={() => checkbox_click_function(i)}
                                                            />
                                                        </div>
                                                    </td>

                                                    {/*<th scope="row">*/}
                                                    {/*    {single_data.iD_NUMBER}*/}

                                                    {/*</th>*/}
                                                    <td data-title="Waybill Number">
                                                        {single_data.waybill_number}
                                                    </td>
                                                    <td data-title="Order Id">
                                                        {single_data.order_id}
                                                    </td>
                                                    <td data-title="DC Name">{single_data.dc_name}</td>
                                                    <td data-title="Client Name">
                                                        {single_data.client_name}
                                                    </td>
                                                    <td data-title="COD Amount">
                                                        {single_data.cod_amount}
                                                    </td>

                                                    <td data-title="Processing Status">
                                                        {single_data.processing_status}
                                                    </td>

                                                    <td data-title="Processing date time">
                                                        {single_data.processing_status_date_time}
                                                    </td>

                                                    <td data-title="Financial Status">
                                                        {single_data.finaltial_status}
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
                                                    <td data-title="Select">
                                                        <div className="custom-control custom-checkbox">
                                                            <input
                                                                type="checkbox"
                                                                className="custom-control-input"
                                                                checked={check_box_flag_state[i]}
                                                                value={check_box_flag_state[i]}
                                                                onChange={() => checkbox_click_function(i)}
                                                            />
                                                        </div>
                                                    </td>

                                                    {/*<th scope="row">*/}
                                                    {/*    {single_data.iD_NUMBER}*/}

                                                    {/*</th>*/}
                                                    <td data-title="Waybill Number">
                                                        {single_data.waybill_number}
                                                    </td>
                                                    <td data-title="Order Id">
                                                        {single_data.order_id}
                                                    </td>
                                                    <td data-title="DC Name">{single_data.dc_name}</td>
                                                    <td data-title="Client Name">
                                                        {single_data.client_name}
                                                    </td>
                                                    <td data-title="COD Amount">
                                                        {single_data.cod_amount}
                                                    </td>

                                                    <td data-title="Processing Status">
                                                        {single_data.processing_status}
                                                    </td>

                                                    <td data-title="Processing date time">
                                                        {single_data.processing_status_date_time}
                                                    </td>

                                                    <td data-title="Financial Status">
                                                        {single_data.finaltial_status}
                                                    </td>
                                                </tr>
                                            )}
                                        </>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
};

export default Confirmpaymenttable;
