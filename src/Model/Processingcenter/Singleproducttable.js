import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { SearchContext } from "../../Context/searchContext";
import { SearchButtonContext } from "../../Context/buttonContext";
import BarCode, { useBarcode } from "react-barcode";
import { jsPDF } from "jspdf";
import { CSVLink, CSVDownload } from "react-csv";
import { toast } from "react-toastify";
import { LoginContext } from "../../Context/loginContext";
import {
  Linksidebar,
  CustomerCareLinksidebar,
  Salessidebar,
  Operationsidebar,
  Degital_Ocean_flag,
  company_name,
} from "../../Common/Linksidebar";

import FileSaver from "file-saver";
import * as XLSX from "xlsx";

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

const Singleproducttable = (props) => {
  toast.configure();
  let json_information = props.response;
  console.log("response:" + json_information);
  const [payload, setpayload] = useState(false);
  const [inputs, setinputs] = useState([]);
  const [filterdata, setfilterdata] = useState([]);
  // checkbos

  let check_box_flag = [];
  const [check_box_flag_state, setcheck_box_flag_state] = useState([]);
  //let select_all_check_box_flag;
  const [select_all_check_box_flag, setselect_all_check_box_flag] =
      useState(false);
  let count_number = json_information?.message?.all_product_information?.length;
  for (let i = 0; i < count_number; i++) {
    check_box_flag.push(false);
  }

  useEffect(() => {
    setcheck_box_flag_state(check_box_flag);
  }, []);

  let checkbox_click_function = (index_value) => {
    let count_number = filterdata.length;
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
      let count_number = filterdata.length;
      for (let i = 0; i < count_number; i++) {
        temp_check_box.push(false);
      }
    } else {
      let count_number = filterdata.length;
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

  // const [select_all_check_box_flag, setselect_all_check_box_flag] = useState(false);

  const [alldata, setalldata] = useState([]);

  const [clientname, setclientname] = useState([]);

  const [date_time, setdate_time] = useState("");
  [informationResponse, setinformationResponse] = useState("");
  [pageRefreshFlag, setpageRefreshFlag] = useState(true);

  useEffect(() => {
    setalldata(json_information.message.all_product_information);
  }, []);
  useEffect(() => {
    setfilterdata(alldata);
    let tempclient = [];
    alldata &&
    alldata.map((single_product) => {
      if (tempclient.indexOf(single_product.selleR_NAME) === -1) {
        tempclient.push(single_product.selleR_NAME);
      }
    });
    setclientname(tempclient);
    console.log("temp client", tempclient);
  }, [alldata]);
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

  let SubmitButtonFunction = (e) => {
    e.preventDefault();
    let inputs1 = [];
    filterdata.map(async (data, list_index) => {
      if (check_box_flag_state[list_index]) {
        let elem = data.referencE_NO;
        inputs1.push(elem);
      }
    });
    console.log("this is  after function call input", inputs1);
    setinputs(inputs1);
    setpageRefreshFlag(false);
  };

  useEffect(() => {
    if (inputs.length > 0) {
      var axios = require("axios");

      var data = JSON.stringify({
        pc_id: logingInformation_LocalStore.all_user_list.employeE_ID,
        product_list: inputs,

        date_time: date_time,
      });

      console.log("single product : ", data);

      var config = {
        method: "post",
        url: Degital_Ocean_flag
            ? "https://e-deshdelivery.com/universalapi/allapi/confirmSingleProductbyPC" +
            "?company_name=" +
            company_name
            : "/universalapi/allapi/confirmSingleProductbyPC" +
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
            // toast.success("SuccessFully Created !", {
            //     position: toast.POSITION.TOP_CENTER, autoClose: 1500
            // });
            console.log("Successfully api called : ", response);
            return response;
          })
          .then((res) => {
            console.log("new response", res);
            if (
                res.data.confirm_information.successful_conferm_product_waybill
                    .length >= 1
            ) {
              toast.success("Product Confirmed!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
              });
              setselect_all_check_box_flag(false);
            }
            if (
                res.data.confirm_information.unsuccessful_confirm_product_waybill
                    .length >= 1
            ) {
              let str = "";
              res.data.confirm_information.unsuccessful_confirm_product_waybill.map(
                  (wrong_waybill) => {
                    str += wrong_waybill + " ";
                  }
              );

              toast.error(
                  `Wrong Order id ! 
                    ${str}`,
                  {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                  }
              );
            }
            setalldata(
                res.data.waiting_tobe_confirmed_product.all_product_information
            );

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

  // ------------------excel download function start---------------------------
  

  const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const fileName = "Confirm Single Product Table ";

  const exportToCSV = (apiData, fileName) => {
    toast.success("Excel Download Successful");
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  // ------------------excel download function end---------------------------

  return (
      <>
        <div id="no-more-tables">
          <div className="row">
            <div
                className="col-lg-6 col-md-8 col-12 d-flex mb-4 p-3 ms-3 rounded"
                style={{ backgroundColor: "#C5D5E4" }}
            >
              <p className="w-25">Client Name:</p>
              <input
                  style={{
                    // backgroundColor: "#C5D5E4",
                    outline: "none",
                    border: "none",
                    padding: "7px",
                    borderRadius: "8px",
                    width: "93%",
                  }}
                  list="clientnamelist"
                  placeholder="Client Name"
                  className="form-control shadow"
                  onChange={searchbyclient}
              />
              <datalist id="clientnamelist">
                {clientname.map((client) => (
                    <option value={client}></option>
                ))}
              </datalist>
            </div>
          </div>

          <div className="my-3">
            <button
                className="btn btn-sm btn-dark px-3 rounded-3"
                onClick={(e) => exportToCSV(filterdata, fileName)}
            >
              Export Excel
            </button>
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
              {/* <th>
                                <button className="btn btn-sm bg-dark text-white border-dark mb-2">All Done</button>
                            </th> */}
              {/* <th scope="col">Select</th> */}
              <th scope="col">
                <div className="custom-control custom-checkbox">
                  <input
                      type="checkbox"
                      style={{ cursor: "pointer" }}
                      className="custom-control-input"
                      name="allSelect"
                      checked={select_all_check_box_flag}
                      onChange={(e) => select_all_function()}
                  />
                </div>
              </th>
              <th scope="col">ID</th>
              <th scope="col">Waybill</th>
              <th scope="col">REF. NO.</th>
              <th scope="col">Consignee Name</th>
              <th scope="col">Address</th>
              <th scope="col">Pincode</th>
              <th scope="col">Area Code</th>
              <th scope="col">Contact Number</th>
              <th scope="col">Emergency Number</th>
              <th scope="col">Weight</th>
              <th scope="col">Payment Type</th>
              <th scope="col">Total Package</th>
              <th scope="col">COD</th>
              <th scope="col">Description</th>
              <th scope="col">Return Address</th>
              <th scope="col">Return Pin</th>
              <th scope="col">Seller Name</th>
            </tr>
            </thead>
            <tbody className="text-center border border-dark">
            {filterdata &&
                filterdata.map((single_data, i) => {
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

                              <td data-title="ID">{single_data.iD_NUMBER}</td>
                              <td data-title="Waybill">{single_data.wayBill}</td>
                              <td data-title="REF. NO">{single_data.referencE_NO}</td>
                              <td data-title="Consignee Name">
                                {single_data.consigneE_NAME}
                              </td>
                              <td data-title="Address">{single_data.address}</td>
                              <td data-title="Pincode">{single_data.pincode}</td>
                              <td data-title="Area Code">{single_data.areA_CODE}</td>
                              <td data-title="Contact Number">
                                {single_data.contacT_NUMBER}
                              </td>
                              <td data-title="Emergency Number">
                                {single_data.emergencY_NUMBER}
                              </td>
                              <td data-title="Weight">{single_data.weight}</td>
                              <td data-title="Payment Type">
                                {single_data.paymenT_TYPE}
                              </td>
                              <td data-title="Total Package">
                                {single_data.totaL_PACKAGE}
                              </td>
                              <td data-title="COD">{single_data.coD_AMOUNT}</td>
                              <td data-title="Description">
                                {single_data.producT_TO_BE_SHIFT}
                              </td>
                              <td data-title="Return Address">
                                {single_data.returN_ADDRESS}
                              </td>
                              <td data-title="Return Pin">
                                {single_data.returN_PIN}
                              </td>
                              <td data-title="Seller Name">
                                {single_data.selleR_NAME}
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
                              <td data-title="ID" scope="row">
                                {single_data.iD_NUMBER}
                              </td>
                              <td data-title="Waybill">{single_data.wayBill}</td>
                              <td data-title="REF. NO">{single_data.referencE_NO}</td>
                              <td data-title="Consignee Name">
                                {single_data.consigneE_NAME}
                              </td>
                              <td data-title="Address">{single_data.address}</td>
                              <td data-title="Pincode">{single_data.pincode}</td>
                              <td data-title="Area Code">{single_data.areA_CODE}</td>
                              <td data-title="Contact Number">
                                {single_data.contacT_NUMBER}
                              </td>
                              <td data-title="Emergency Number">
                                {single_data.emergencY_NUMBER}
                              </td>
                              <td data-title="Weight">{single_data.weight}</td>
                              <td data-title="Payment Type">
                                {single_data.paymenT_TYPE}
                              </td>
                              <td data-title="Total Package">
                                {single_data.totaL_PACKAGE}
                              </td>
                              <td data-title="COD">{single_data.coD_AMOUNT}</td>
                              <td data-title="Description">
                                {single_data.producT_TO_BE_SHIFT}
                              </td>
                              <td data-title="Return Address">
                                {single_data.returN_ADDRESS}
                              </td>
                              <td data-title="Return Pin">
                                {single_data.returN_PIN}
                              </td>
                              <td data-title="Seller Name">
                                {single_data.selleR_NAME}
                              </td>
                            </tr>
                        )}
                      </>
                  );
                })}
            </tbody>

            <div className="col-12 d-flex justify-content-center text-align-center">
              <button
                  className="btn btn-primary px-4 my-3 "
                  onClick={(e) => SubmitButtonFunction(e)}
              >
                Submit
              </button>
              {/* onClick={SubmitButtonFunction} */}
              {/*  disabled={!clientName||!username||!password||!person||!clientContact||!pickuPADDRESS||!pincode||!returnaddress} */}
            </div>
          </table>
        </div>
      </>
  );
};

export default Singleproducttable;
