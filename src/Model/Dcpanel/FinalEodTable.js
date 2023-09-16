import React, { useState, useEffect, useContext } from "react";
import reactDom from "react-dom";
import { LoginContext } from "../../Context/loginContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { SearchContext } from "../../Context/searchContext";
import { SearchButtonContext } from "../../Context/buttonContext";
import BarCode, { useBarcode } from "react-barcode";
import { jsPDF } from "jspdf";
import { CSVLink, CSVDownload } from "react-csv";
import axios from "axios";
import Modal from "react-modal";
import {
    Linksidebar,
    CustomerCareLinksidebar,
    Salessidebar,
    Operationsidebar,
    Degital_Ocean_flag,
    company_name,
    dcpanel,
} from "../../Common/Linksidebar";
import ReactPaginate from "react-paginate";
//import './invoice.css'
// import './sc.css';
// import './table.css'
// import './modal.css'
import "./css/home.css";
import Multiselect from "multiselect-react-dropdown";

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

export default function FinalEodTable(props) {
    const [allfe, setallfe] = useState([]);
    const [productlist, setproductlist] = useState([]);
    const [employId, setemployId] = useState("");
    const [eod, seteod] = useState("");
    const [infoModalOpen, setinfoModalOpen] = useState(false);
    const [selectedfe, setselectedfe] = useState("");
    const [inputs, setinputs] = useState([]);
    const [return_waybill_list, setreturn_waybill_list] = useState([]);
    const [hold_waybill_list, sethold_waybill_list] = useState([]);
    const [lost_waybill_list, setlost_waybill_list] = useState([]);
    const [eodproduct, seteodproduct] = useState([]);
    const [totalcod, settotalcod] = useState("");
    const [totalshipment, settotalshipment] = useState("");
    const [totaldelivered, settotaldelivered] = useState("");
    const [totalhold, settotalhold] = useState("");
    const [totalcollectedcod, settotalcollectedcod] = useState("");

    const [searchresult, setsearchresult] = useState("");
    let json_information = props.response;

    useEffect(() => {
        setallfe(json_information);
    }, []);

    console.log("this is allfe list", allfe);

    // useEffect(() => {
    //     let temp = []
    //     assignedproduct.map((product) => {
    //         product.all_Products_of_Bag.map((single_product) => {
    //             temp.push(single_product)
    //             setproductlist(temp)
    //         })
    //     })
    //
    // }, [assignedproduct]);

    // check box

    let check_box_flag = [];
    const [check_box_flag_state, setcheck_box_flag_state] = useState([]);
    //let select_all_check_box_flag;
    const [select_all_check_box_flag, setselect_all_check_box_flag] =
        useState(false);
    let count_number = eod.length;
    for (let i = 0; i < count_number; i++) {
        check_box_flag.push(false);
    }

    useEffect(() => {
        setcheck_box_flag_state(check_box_flag);
    }, []);

    let checkbox_click_function = (index_value) => {
        let count_number = eod.length;
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
            let count_number = eod.length;
            for (let i = 0; i < count_number; i++) {
                temp_check_box.push(false);
            }
        } else {
            let count_number = eod.length;
            for (let i = 0; i < count_number; i++) {
                temp_check_box.push(true);
            }
        }
        setcheck_box_flag_state(temp_check_box);
    }, [select_all_check_box_flag]);

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
            }
            setemployId(context_flag_obj.all_user_list.employeE_ID);
            setlogingInformation_LocalStore(context_flag_obj);
        }
    }, []);

    // useEffect(() => {
    //     //console.log(siteBarInformation_LocalStore);
    //     let data = JSON.stringify({
    //         "DC_ID_number": logingInformation_LocalStore.all_user_list.employeE_ID
    //     });
    //
    //     var config = {
    //         method: 'post',
    //         url: Degital_Ocean_flag ? 'https://e-deshdelivery.com/universalapi/allapi/getFeinDc' + '?company_name=' + company_name : '/universalapi/allapi/getFeinDc' + '?company_name=' + company_name,
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${logingInformation_LocalStore.token}`
    //         },
    //         data: data
    //     };
    //
    //     axios(config)
    //         .then(function (response) {
    //             let json_object_str = JSON.stringify(response.data);
    //             let json_object = JSON.parse(json_object_str);
    //             return (json_object);
    //         })
    //         .then(res => {
    //             console.log("response is fe list", res);
    //             setfelist(res.message);
    //             // setpayload(true);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }, [logingInformation_LocalStore]);
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

    // submit fun

    useEffect(() => {
        let data = JSON.stringify({
            employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
            employee_dezignation:
            logingInformation_LocalStore.all_user_list.employeE_DEGIGNATION,
            date_time: getCurrentTime(),
        });

        var config = {
            method: "post",
            url: Degital_Ocean_flag
                ? "https://e-deshdelivery.com/universalapi/allapi/employeeEod" +
                "?company_name=" +
                company_name
                : "/universalapi/allapi/employeeEod" + "?company_name=" + company_name,
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
                console.log("response is eod", res);
                seteod(
                    res.message.delevered_Products
                        .concat(res.message.holded_Products)
                        .concat(res.message.lost_Products)
                        .concat(res.message.returned_Products)
                        .concat(res.message.rto_Products)
                );
                setsearchresult({
                    Delivered: res.message.delevered_Products,
                    Holded: res.message.holded_Products,
                    Lost: res.message.lost_Products,
                    Return: res.message.returned_Products,
                    Rto: res.message.rtO_product,
                });
                settotalcod(res.message.total_COD);
                settotalcollectedcod(res.message.total_collected_COD);
                settotalshipment(res.message.total_shipment);
                settotaldelivered(res.message.total_delevered_product);
                settotalhold(res.message.total_holded_product);

                // setpayload(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [logingInformation_LocalStore]);
    console.log("this is Eod status", eod);
    console.log("this is res.message.total cod", totalcod);

    // submit fun end

    // fe assign api

    // filter
    const filterstatus = (type) => {
        if (type.length != 0) {
            seteod(searchresult[type]);
        } else {
            let temp = [];
            Object.keys(searchresult).map((sr) => {
                searchresult[sr].map((item) => {
                    temp.push(item);
                });
            });
            console.log("temp", temp);
            seteod(temp);
        }
    };

    // fe assign api

    // check box end

    console.log("this is product array2", inputs);

    console.log("this is selected fe", selectedfe);
    return (
        <>
            {/*model start*/}

            {/*model end*/}

            <div id="finaleod">
                <div className="row mb-2">
                    <div
                        className="col-lg-6 col-md-9 col-12 border rounded-3 m-auto p-4"
                        style={{ backgroundColor: "#8dc0ba" }}
                    >
                        <div className="row ">
                            <div className="col-12 col-lg-6 col-md-6">
                                <h5>Total COD : {totalcod}</h5>
                                <h5>Total Collected cod : {totalcollectedcod}</h5>
                                <h5>Total UnCollected cod : {totalcod - totalcollectedcod}</h5>
                            </div>
                            <div className="col-12 col-lg-6 col-md-6">
                                <h5>Total shipment : {totalshipment}</h5>
                                <h5>Total Delivered : {totaldelivered}</h5>
                                <h5>Total Hold : {totalhold}</h5>
                            </div>
                        </div>
                    </div>
                    {/* <div className="row">
            <div className="col-9">
              <h5>Total COD : {totalcod}</h5>
              <h5>Total Collected cod : {totalcollectedcod}</h5>
              <h5>Total UnCollected cod : {totalcod - totalcollectedcod}</h5>
            </div>
            <div className="col-3">
              <h5>Total shipment : {totalshipment}</h5>
              <h5>Total Delivered : {totaldelivered}</h5>
              <h5>Total Hold : {totalhold}</h5>
            </div>
          </div> */}
                </div>

                {/* <div className="border  mb-5">
                    <form className="row d-flex justify-content-center">

                        <div className=" col-sm-4 form-group mx-3 mt-2">
                            <div className=" text-center text-black mx-1">
                                FE Name:
                            </div>
                             onChange={handleFilter}
                            <input list="felist" className="form-control " onChange={(e) => {
                                setselectedfe(e.target.value)
                            }} />
                            <datalist id="felist">
                                <option selected value="">None</option>
                                {allfe.map(single_dc_office_name => {
                                    console.log("SINGLE DC NAME:", single_dc_office_name);
                                    return (
                                        <option value={single_dc_office_name.field_operative_id}>{single_dc_office_name.field_operative_name}</option>
                                    );
                                })}
                            </datalist>


                        </div>


                        <div className="col-md-12 d-flex justify-content-center mt-4 mb-2">
                            <button type="button" className="btn btn-outline-primary" onClick={Eod} >Search</button>
                            onClick={searchFilter}
                        </div>


                    </form>
                </div> */}

                {/*    table*/}
                {/* <div className='d-flex justify-content-center'>


                    <div className=" col-sm-4 form-group mx-3 mt-2 ">
                        <div className=" text-center text-black mx-1">
                            Status Type:
                        </div>
                         onChange={handleFilter}
                        <select  className="form-control " disabled={totalcod.length==0?true:false} onChange={(e) => {
                            filterstatus(e.target.value)
                        }} >

                            <option selected value="">None</option>
                            <option  value="Delivered">Delivered</option>
                            <option  value="Holded">Holded</option>
                            <option  value="Return">Return</option>
                            <option  value="Lost">Lost</option>
                            <option  value="Rto">Rto</option>

                        </select>




                    </div>

                </div> */}

                <div id="no-more-tables">
                    <div className="">
                        {/* <button className="btn btn-sm me-2 bg-info text-black border-info mb-2" onClick={(e) => bridgeme(e)}>Confirm</button> */}
                        <CSVLink data={eod} className="btn btn-sm btn-dark px-4 mb-2">
                            Export csv
                        </CSVLink>
                    </div>
                    {/* <div className="">
                        <button className="btn btn-sm me-2 bg-info text-black border-info mb-2" onClick={(e) => setinfoModalOpen(true)}>Confirm Eod</button>

                    </div> */}
                    <table
                        id="dctable"
                        className="table bg-white"
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
                            {/* <th>SL</th> */}

                            <th>WAYBILL</th>
                            <th>Order Id</th>
                            <th>Consignee</th>
                            <th>payment type</th>

                            <th>Status</th>

                            {/* <th>Print<button className="btn btn-sm bg-info text-black border-info mb-2" onClick={(e) => print_function(e)}>Print All</button> </th>
                                <th>ex<CSVLink data={users} className="btn btn-sm bg-info text-black border-info mb-2" >Export csv</CSVLink></th> */}
                        </tr>
                        </thead>

                        <tbody className="text-center border border-dark">
                        {eod &&
                            eod.map((single_message, i) => {
                                return (
                                    <>
                                        {
                                            <tr>
                                                {/* <td data-title="SL" className="css-serial"></td> */}

                                                <td data-title="WAYBILL_NUMBER">
                                                    {single_message.waybill_number}
                                                </td>
                                                <td data-title="order_id">
                                                    {single_message.order_id}
                                                </td>
                                                <td data-title=" Consignee Name">
                                                    {single_message.consignee_name}
                                                </td>
                                                <td data-title=" payment_type">
                                                    {single_message.payment_type}
                                                </td>
                                                <td data-title="status">
                                                    {single_message.product_type}
                                                </td>

                                                {/* onClick ={ JsBarcode("#code128",single_message.waybill_number)}  */}
                                                {/* <td><button className="btn btn-sm bg-dark text-white border-dark mb-2"   >Print</button></td> */}
                                            </tr>
                                        }
                                    </>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/*    table end*/}
            </div>
        </>
    );
}
