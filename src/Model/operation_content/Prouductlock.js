import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import "./operation.css";
import {
    Linksidebar,
    CustomerCareLinksidebar,
    Salessidebar,
    Operationsidebar,
    Degital_Ocean_flag,
    company_name,
} from "../../Common/Linksidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
let employId, setemployId;
let date_time, setdate_time;
let lock_flag, setlock_flag;
let waybill_id, setwaybill_id;
let lock_button;
let confirm_lock_information, setconfirm_lock_information;
let page_refresh_flag, setpage_refresh_flag;

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

const LockOperation = (props) => {
    toast.configure();
    let json_information = props.response;
    const [logingInformation_LocalStore, setlogingInformation_LocalStore] =
        useState("");
    [employId, setemployId] = useState("");
    [date_time, setdate_time] = useState("");
    [lock_flag, setlock_flag] = useState("");
    [waybill_id, setwaybill_id] = useState(-5);
    [confirm_lock_information, setconfirm_lock_information] = useState("");
    [page_refresh_flag, setpage_refresh_flag] = useState(false);

    let getLogingInformation_LocalStore = () => {
        let value = JSON.parse(
            localStorage.getItem("logingInformation_LocalStore")
        );
        return value;
    };
    // const [users, setUsers] = useState([]);

    useEffect(() => {
        setSearchResults(json_information.message.product_information);
    }, []);

    const handleChange = (e) => {
        const { name, checked } = e.target;
        if (name === "allSelect") {
            let tempUser = searchResults.map((user) => {
                return { ...user, isChecked: checked };
            });
            setSearchResults(tempUser);
        } else {
            let tempUser = searchResults.map((user) =>
                user.name === name ? { ...user, isChecked: checked } : user
            );
            setSearchResults(tempUser);
        }
    };

    useEffect(() => {
        let context_flag_obj = null;
        context_flag_obj = getLogingInformation_LocalStore();
        setemployId(context_flag_obj.all_user_list.employeE_ID);
        setlogingInformation_LocalStore(context_flag_obj);
    }, []);

    lock_button = (waybillst_id) => {
        setwaybill_id(waybillst_id);
        setdate_time(getCurrentTime);
        console.log("Confirmed button clicked.", waybillst_id);
        setlock_flag((lock_flag) => !lock_flag);
    };

    // const lockall = (e) =>{
    //   searchResults.map((info) =>{
    //     if(info.isChecked){
    //       setwaybill_id(info.waybill_id);
    //       setdate_time(getCurrentTime);
    //       console.log("Confirmed button clicked.",info.waybill_id);
    //       setlock_flag(lock_flag => !lock_flag);

    //     }

    //   });

    // }

    useEffect(() => {
        let locked_product_waybill_list = [];
        locked_product_waybill_list.push(waybill_id);
        var axios = require("axios");
        var data = JSON.stringify({
            employee_id: employId,
            locked_product_waybill_list: locked_product_waybill_list,
            date_time: date_time,
        });

        console.log("confirm button data : ", data);
        var config = {
            method: "post",
            url: Degital_Ocean_flag
                ? "https://e-deshdelivery.com/universalapi/allapi/confirmLockedForProducts" +
                "?company_name=" +
                company_name
                : "/universalapi/allapi/confirmLockedForProducts" +
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
                setconfirm_lock_information(res);
                setpage_refresh_flag(true);
                console.log("last api json response : ", res);
                toast.success("Product Locked !", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [lock_flag]);

    const [searchTerm, setSearchTerm] = React.useState([]);
    const [searchResults, setSearchResults] = React.useState([]);
    const handleonChange = (event) => {
        setSearchTerm(event.target.value);
    };
    React.useEffect(() => {
        const users1 = json_information.message.product_information.filter(
            (p) =>
                p.waybill_number
                    .toString()
                    .toLowerCase()
                    .includes(searchTerm.toString().toLowerCase()) ||
                p.order_id
                    .toString()
                    .toLowerCase()
                    .includes(searchTerm.toString().toLowerCase())
        );
        setSearchResults(users1);
    }, [searchTerm]);
    const searchIcon = <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>;
    return (
        <>
            <div className="container">
                <div className="row ">
                    <div className="col-12">
                        <div className="">
                            {/*  */}
                            <form className="row d-flex justify-content-center">
                                <div className="col-lg-6 col-md-6 col-sm-4 form-group mx-3 mt-2 p-4">
                                    <div className="input-group  input-icons">
                                        <i className="icon ">{searchIcon}</i>
                                        <input
                                            type="text"
                                            className="rounded-pill px-5 py-2 input-field input-search"
                                            placeholder="Waybill"
                                            value={searchTerm}
                                            onChange={handleonChange}
                                        />
                                    </div>
                                </div>
                            </form>
                            {/*  */}
                            {/* <form>
                <div className="input-group ">
                  <input
                    type="text"
                    className="form-control mx-2 bg-light border border-warning"
                    placeholder="Type Here......."
                    value={searchTerm}
                    onChange={handleonChange}
                  />
                  <div className="input-group-append"></div>
                </div>
              </form> */}
                        </div>
                    </div>
                </div>
                <div>
                    {/* <button className="btn bg-dark border-dark btn-sm text-white" onClick= {(e)=>lockall(e)}>Locked All</button> */}
                    <div className="mt-3" id="no-more-tables">
                        <table
                            className="col-md-12 table-bordered table-striped table-condensed cf css-serial bg-white"
                            id=""
                            style={{ fontSize: "12px" }}
                        >
                            <thead
                                className="text-center"
                                style={{ backgroundColor: "#f1f1f1" }}
                            >
                            <tr className="text-dark" style={{ border: "none" }}>
                                {/* <th scope="col">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" name= "allSelect" checked={searchResults.filter((user) => user?.isChecked !== true).length<1} onChange={handleChange}/>

                                        </div>
                                    </th> */}
                                <th scope="col">SL</th>
                                <th scope="col">WayBill No</th>
                                <th scope="col">Order ID</th>
                                <th scope="col">Customer Name</th>
                                <th scope="col">Consignee Name</th>
                                <th scope="col">Product Details</th>
                                <th scope="col">
                                    DC Office Name<br></br>Pincode
                                </th>
                                <th scope="col">
                                    Product Value<br></br>Product Weight
                                </th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody className="text-center">
                            {!page_refresh_flag
                                ? searchResults.map((single_message) => {
                                    return (
                                        <tr key={single_message.customeR_NAME}>
                                            <td data-title="SL"></td>
                                            {/* <td>
                                                        <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" name={single_message} checked={single_message?.isChecked || false} onChange={handleChange}/>

                                                        </div>
                                                    </td> */}
                                            <td data-title="WayBill" scope="row">
                                                {single_message.waybill_number}
                                            </td>
                                            <td data-title="Order ID" scope="row">
                                                {single_message.order_id}
                                            </td>
                                            <td data-title="Customer Name">
                                                {single_message.customer_name}
                                            </td>
                                            <td data-title="Consignee Name">
                                                {single_message.consignee_name}
                                            </td>
                                            <td data-title="Product Details">
                                                {single_message.product_detail}
                                            </td>
                                            <td data-title="DC Name & PinCode">
                                                {single_message.dc_office_name}
                                                <br></br>
                                                {single_message.pincode}
                                            </td>
                                            <td data-title="Product Value & weight">
                                                {single_message.product_value}
                                                <br></br>
                                                {single_message.product_weight}
                                            </td>
                                            <td data-title="Action">
                                                <button
                                                    className="btn bg-dark border-dark btn-sm text-white"
                                                    onClick={() =>
                                                        lock_button(single_message.waybill_number)
                                                    }
                                                >
                                                    Locked
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                                : confirm_lock_information.message.product_information.map(
                                    (single_message) => {
                                        return (
                                            <tr key={single_message.customeR_NAME}>
                                                <td></td>
                                                <th scope="row">
                                                    {single_message.waybill_number}
                                                    <br></br>
                                                    {single_message.order_id}
                                                </th>
                                                <td>{single_message.customer_name}</td>
                                                <td>{single_message.consignee_name}</td>
                                                <td>{single_message.product_detail}</td>
                                                <td>
                                                    {single_message.dc_office_name}
                                                    <br></br>
                                                    {single_message.pincode}
                                                </td>
                                                <td>
                                                    {single_message.product_value}
                                                    <br></br>
                                                    {single_message.product_weight}
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn bg-dark border-dark btn-sm text-white"
                                                        onClick={() =>
                                                            lock_button(single_message.waybill_number)
                                                        }
                                                    >
                                                        Locked
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};
export default LockOperation;
