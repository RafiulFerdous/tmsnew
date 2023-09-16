import React, { useState, useEffect, useContext } from "react";
import reactDom from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { SearchContext } from "../../Context/searchContext";
import { SearchButtonContext } from "../../Context/buttonContext";
import BarCode, { useBarcode } from "react-barcode";
import { jsPDF } from "jspdf";
import { toast } from "react-toastify";
import { CSVLink, CSVDownload } from "react-csv";
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

//import './sc.css';

const Paymentconfirmtable = (props) => {
  const [searchTerm, setSearchTerm] = React.useState([]);
  const [inputs, setinputs] = useState([]);

  //const [isChecked, setIsChecked] =useState([])
  const [alldata, setalldata] = useState([]);
  const handleonChange = (event) => {
    setSearchTerm(event.target.value);
  };

  let json_information = props.response;

  useEffect(() => {
    setalldata(json_information.message.all_product_information);
  }, []);

  [clientId, setclientId] = useState("");
  [date_time, setdate_time] = useState("");

  const [information, setinformation] = useState({});
  const [payload, setpayload] = useState(false);

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

  // checkbox

  let check_box_flag = [];
  const [check_box_flag_state, setcheck_box_flag_state] = useState([]);
  //let select_all_check_box_flag;
  const [select_all_check_box_flag, setselect_all_check_box_flag] =
    useState(false);
  let count_number = json_information.message.all_product_information.length;
  for (let i = 0; i < count_number; i++) {
    check_box_flag.push(false);
  }

  useEffect(() => {
    setcheck_box_flag_state(check_box_flag);
  }, []);

  let checkbox_click_function = (index_value) => {
    let count_number = json_information.message.all_product_information.length;
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
      let count_number =
        json_information.message.all_product_information.length;
      for (let i = 0; i < count_number; i++) {
        temp_check_box.push(false);
      }
    } else {
      let count_number =
        json_information.message.all_product_information.length;
      for (let i = 0; i < count_number; i++) {
        temp_check_box.push(true);
      }
    }
    setcheck_box_flag_state(temp_check_box);
  }, [select_all_check_box_flag]);

  // forword

  let bridgeme = (e) => {
    // setwaybill_number(waybill_number);

    let inputs1 = [];
    alldata.map(async (data, list_index) => {
      if (check_box_flag_state[list_index]) {
        let elem = data.order_id;
        inputs1.push(elem);
        setinputs(inputs1);
      }
    });
  };

  //  forword url

  useEffect(() => {
    if (inputs.length > 0) {
      // e.preventDefault();
      var axios = require("axios");

      var data = JSON.stringify({
        client_id: clientId,
        order_id_list: inputs,
        date_time: getCurrentTime(),
      });

      console.log("single product : ", data);

      var config = {
        method: "post",
        url: Degital_Ocean_flag
          ? "https://e-deshdelivery.com/universalapi/allapi/clientPanelProductPaymentConfirmedbyClient" +
            "?company_name=" +
            company_name
          : "/universalapi/allapi/clientPanelProductPaymentConfirmedbyClient" +
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
          console.log(JSON.stringify(response.data));
          console.log(response.data);
          // setpickupRefreshFlag(pickupRefreshFlag => !pickupRefreshFlag);
          toast.success("SuccessFully Forwarded", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
          //setUsers(response.data.all_product_list)
          console.log("successfully forworded");
          return response;
        })
        .then((res) => {
          console.log("new response", res);
          // setUsers(res.data.all_product_list)

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
    }
    //setpickupFlag(pickupFlag => !pickupFlag);
  }, [inputs, logingInformation_LocalStore]);

  return (
    <>
      <div className="container row-col-2">
        <div className=" ml-4" id="no-more-tables">
          <button className="btn btn-primary  mb-2 " onClick={bridgeme}>
            Forward
          </button>
          <table
            className="col-md-12 table-bordered table-striped table-condensed cf css-serial bg-white"
            style={{ fontSize: "13px" }}
          >
            <thead
              className="text-center"
              style={{ backgroundColor: "#f1f1f1" }}
            >
              <tr className="text-dark" style={{ border: "none" }}>
                <th scope="col">SL</th>
                <th scope="col">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      name="allSelect"
                      onChange={(e) => select_all_function()}
                    />
                  </div>
                  Select All
                </th>
                <th scope="col">COD Amount</th>
                <th scope="col">Order Id</th>
                <th scope="col">Payment Type</th>
                <th scope="col">Product Processing Status Date Time</th>
                <th scope="col">Product Entry Time</th>
                <th scope="col">Product Processing Status</th>
                <th scope="col">Submitted Amount</th>
                {/* <th><button className="btn btn-sm bg-info text-black border-info mb-2" onClick={(e) => print_function(e)}>Print All</button> </th> */}
                {/* <th><CSVLink data={users} className="btn btn-sm bg-info text-black border-info mb-2" >Export csv</CSVLink></th> */}
              </tr>
            </thead>
            <tbody className="text-center">
              {alldata.map((single_message, i) => {
                return (
                  <>
                    {select_all_check_box_flag ? (
                      <tr key={single_message.waybill_number}>
                        <td data-title="SL"></td>
                        <td data-title="">
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

                        <td data-title="COD Amount" scope="row">
                          {single_message.cod_amount}
                        </td>
                        <td data-title="Order Id">{single_message.order_id}</td>
                        <td data-title="Payment Type">
                          {single_message.payment_type}
                        </td>
                        <td data-title="Status Date Time">
                          {single_message.product_Processing_status_date_time}
                        </td>
                        <td data-title="Entry Time">
                          {single_message.product_entry_time}
                        </td>
                        <td data-title="Processing Status">
                          {single_message.product_processing_status}
                        </td>
                        <td data-title="Submitted Amount">
                          {single_message.submited_amount}
                        </td>
                        {/* onClick ={ JsBarcode("#code128",single_message.waybill_number)}  */}
                        {/* <td><button className="btn btn-sm bg-dark text-white border-dark mb-2"   >Print</button></td> */}
                      </tr>
                    ) : (
                      <tr key={single_message.waybill_number}>
                        <td data-title="SL"></td>
                        <td data-title="">
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

                        <td data-title="COD Amount" scope="row">
                          {single_message.cod_amount}
                        </td>
                        <td data-title="Order Id">{single_message.order_id}</td>
                        <td data-title="Payment Type">
                          {single_message.payment_type}
                        </td>
                        <td data-title="Status Date Time">
                          {single_message.product_Processing_status_date_time}
                        </td>
                        <td data-title="Entry Time">
                          {single_message.product_entry_time}
                        </td>
                        <td data-title="Processing Status">
                          {single_message.product_processing_status}
                        </td>
                        <td data-title="Submitted Amount">
                          {single_message.submited_amount}
                        </td>
                        {/* onClick ={ JsBarcode("#code128",single_message.waybill_number)}  */}
                        {/* <td><button className="btn btn-sm bg-dark text-white border-dark mb-2"   >Print</button></td> */}
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
            {/* <div className="col-12 d-flex justify-content-center text-align-center">
                        <button className="btn btn-primary  mb-3 " onClick={bridgeme }>Forword</button>
                        onClick={SubmitButtonFunction}
                         disabled={!clientName||!username||!password||!person||!clientContact||!pickuPADDRESS||!pincode||!returnaddress}
                    </div> */}
          </table>
          <div className="col-12 d-flex justify-content-start text-align-start">
            {/* <button className="btn btn-primary  mb-3 " onClick={bridgeme }>Forward</button> */}
            {/* onClick={SubmitButtonFunction} */}
            {/*  disabled={!clientName||!username||!password||!person||!clientContact||!pickuPADDRESS||!pincode||!returnaddress} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Paymentconfirmtable;
