import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./modal.css";
import {
    Linksidebar,
    CustomerCareLinksidebar,
    Salessidebar,
    Operationsidebar,
    Degital_Ocean_flag,
    company_name,
} from "../../Common/Linksidebar";
import jsPDF from "jspdf";
import "jspdf-autotable";

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

let pageRefreshFlag, setpageRefreshFlag;
let informationResponse, setinformationResponse;
let productWaybill, setproductWaybill;
let employee_id, setemployee_id;
let dateTime, setdateTime;
let idNumber, setidNumber;

export const Producttabledc = (props) => {
    let json_product = props.response;

    [informationResponse, setinformationResponse] = useState("");
    [pageRefreshFlag, setpageRefreshFlag] = useState(true);
    [productWaybill, setproductWaybill] = useState(-5);
    [employee_id, setemployee_id] = useState(-5);
    [dateTime, setdateTime] = useState("");
    [idNumber, setidNumber] = useState(json_product.bagID);

    const [information, setinformation] = useState({});
    const [payload, setpayload] = useState(false);

    const [logingInformation_LocalStore, setlogingInformation_LocalStore] =
        useState("");

    /*
      //new code for search in Pickup Request page...........
      var {searchInformation, setsearchInformation} = useContext(SearchContext);
      var {searchButtonInformation,setsearchButtonInformation} = useContext(SearchButtonContext);
      if(searchButtonInformation){
         //search button click korar pore ki hobe...........
         setsearchInformation("");
         setsearchButtonInformation(false);
      }
      //code end for search in Pickup Request page.............
      */

    let bagRemoveButton = (product_waybill) => {
        setproductWaybill(product_waybill);
        setpageRefreshFlag(false);
        setdateTime(getCurrentTime);
    };

    let getLogingInformation_LocalStore = () => {
        let value = JSON.parse(
            localStorage.getItem("logingInformation_LocalStore")
        );
        return value;
    };

    useEffect(() => {
        let context_flag_obj = null;
        context_flag_obj = getLogingInformation_LocalStore();
        setemployee_id(context_flag_obj.all_user_list.employeE_ID);
        setlogingInformation_LocalStore(context_flag_obj);
    }, []);

    useEffect(() => {
        if (productWaybill.length > 0) {
            var axios = require("axios");
            var data = JSON.stringify({
                employee_id: employee_id,
                bag_id: idNumber,
                product_waybill_list: productWaybill,
            });

            console.log("again call data: ", data);

            var config = {
                method: "post",
                url: Degital_Ocean_flag
                    ? "https://e-deshdelivery.com/universalapi/allapi/removeProductfromBag" +
                    "?company_name=" +
                    company_name
                    : "/universalapi/allapi/removeProductfromBag" +
                    "?company_name=" +
                    company_name,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${logingInformation_LocalStore.token}`,
                },
                data: data,
            };
            console.log("THIS THE CONFIG:", config);

            axios(config)
                .then(function (response) {
                    let json_object_str = JSON.stringify(response.data);
                    let json_object = JSON.parse(json_object_str);
                    console.log(json_object);
                    return json_object;
                })
                .then((res) => {
                    setpageRefreshFlag(false);
                    setinformation(res);
                    setpayload(true);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }, [productWaybill, logingInformation_LocalStore]);

    const pdfGenerate = () => {
        const doc = new jsPDF("portrait", "px", "a4");
        doc.autoTable({ html: "#tableq" });
        doc.save("Report.pdf");
    };

    return (
        <div className="border border-primary e">
            <div className="row">
                <div className="col-12">
                    {/*<div>*/}
                    {/*    <button className="btn btn-primary" onClick={pdfGenerate}>Download PDF</button>*/}
                    {/*</div>*/}
                    <div id="no-more-tables">
                        <table
                            className="col-md-12 table-bordered table-striped table-condensed cf bg-white"
                            style={{ fontSize: "12px" }}
                        >
                            <thead
                                className="text-center"
                                style={{ backgroundColor: "#f1f1f1" }}
                            >
                            <tr
                                id="back_d"
                                className="text-dark"
                                style={{ border: "none" }}
                            >
                                <th scope="col">ButtonActivity</th>
                                <th scope="col">Waybill</th>
                                <th scope="col">Order ID</th>
                                <th scope="col">Customer Name</th>
                                <th scope="col">Consignee Name</th>
                                <th scope="col">Details</th>
                                <th scope="col">Area Code</th>
                                <th scope="col">DC Office</th>
                                <th scope="col">Value</th>
                                <th scope="col">Weight</th>
                            </tr>
                            {pageRefreshFlag
                                ? json_product.product_information.map((single_message) => {
                                    return (
                                        <tr key={single_message.waybill_number}>
                                            <td>
                                                <button
                                                    className="btn btn-success btn-small"
                                                    onClick={() =>
                                                        bagRemoveButton(single_message.waybill_number)
                                                    }
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                            <td id="back_d">{single_message.waybill_number}</td>
                                            <td>{single_message.order_id}</td>
                                            <td>{single_message.customer_name}</td>
                                            <td id="back_d">{single_message.consignee_name}</td>
                                            <td>{single_message.product_detail}</td>
                                            <td>{single_message.pincode}</td>
                                            <td id="back_d">{single_message.dc_office_name}</td>
                                            <td>{single_message.product_value}</td>
                                            <td>{single_message.product_weight}</td>
                                        </tr>
                                    );
                                })
                                : payload
                                    ? information.message.map((single_message) => {
                                        return (
                                            <tr key={single_message.waybill_number}>
                                                <td>
                                                    <button
                                                        className="btn btn-success btn-small"
                                                        onClick={() =>
                                                            bagRemoveButton(single_message.waybill_number)
                                                        }
                                                    >
                                                        Remove
                                                    </button>
                                                </td>
                                                <td id="back_d">{single_message.waybill_number}</td>
                                                <td>{single_message.order_id}</td>
                                                <td>{single_message.customer_name}</td>
                                                <td id="back_d">{single_message.consignee_name}</td>
                                                <td>{single_message.product_detail}</td>
                                                <td>{single_message.pincode}</td>
                                                <td id="back_d">{single_message.dc_office_name}</td>
                                                <td>{single_message.product_value}</td>
                                                <td>{single_message.product_weight}</td>
                                            </tr>
                                        );
                                    })
                                    : "Wait for a moment."}
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
