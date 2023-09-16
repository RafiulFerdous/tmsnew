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
import ReactPaginate from "react-paginate";
import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import downloadPdf from "../../DownloadPDF";
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
// let date_time, setdate_time;
let pageRefreshFlag, setpageRefreshFlag;
let informationResponse, setinformationResponse;

const Confirmpickuptable = (props) => {
  toast.configure();
  let json_information = props.response;
  //   console.log("response:" + json_information);
  const [payload, setpayload] = useState(false);
  const [inputs, setinputs] = useState([]);
  const [filterdata, setfilterdata] = useState([]);
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  const [pickupdata, setpickupdata] = useState([]);
  const [submittype, setsubmittype] = useState("");
  const [waybill, setwaybill] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newalldata, setnewalldata] = useState([]);
  console.log("newalldata", newalldata);

  console.log("waybill", waybill);

  const [searchTerm, setsearchTerm] = React.useState("");
  const [searchTermFlag, setsearchTermFlag] = useState(false);
  const [searchTermAltFlag, setsearchTermAltFlag] = useState(false);
  const [allfilterproductdata, setallfilterproductdata] = useState([]);
  const [exportExcel, setExportExcel] = useState([]);
  const [saveInPc, setSaveInPC] = useState([]);
  //  const [newalldata, setnewalldata] = useState([]);
  //  console.log("newalldata", newalldata);
  // -----------------state for pagination start--------------------------

  const [currentItems, setCurrentItems] = useState(0);

  // -----------------state for pagination end  --------------------------

  // checkbox

  let check_box_flag = [];
  const [check_box_flag_state, setcheck_box_flag_state] = useState([]);

  //let select_all_check_box_flag;
  const [select_all_check_box_flag, setselect_all_check_box_flag] =
      useState(false);
  let count_number = pickupdata && pickupdata.length;
  for (let i = 0; i < count_number; i++) {
    check_box_flag.push(false);
  }

  useEffect(() => {
    setcheck_box_flag_state(check_box_flag);
  }, []);

  let checkbox_click_function = (index_value) => {
    let count_number = pickupdata && pickupdata.length;
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
      let count_number = pickupdata && pickupdata.length;
      for (let i = 0; i < count_number; i++) {
        temp_check_box.push(false);
      }
    } else {
      let count_number = pickupdata && pickupdata.length;
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

  const [clientname, setclientname] = useState([]);
  const [apihit100, setapihit100] = useState([false]);
  console.log("clientname", clientname);
  const [clientid, setclientid] = useState("");

  const [date_time, setdate_time] = useState("");
  [informationResponse, setinformationResponse] = useState("");
  [pageRefreshFlag, setpageRefreshFlag] = useState(true);

  useEffect(() => {
    setclientname(json_information);
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
  console.log("client name in tablejs", clientname);

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
    pickupdata.map(async (data, list_index) => {
      if (check_box_flag_state[list_index]) {
        if (submittype === "Product Waybill") {
          let elem = data.productWaybill_number;
          inputs1.push(elem);
        } else {
          let elem = data.orderId;
          inputs1.push(elem);
        }
      }
    });
    console.log("this is  after function call input", inputs1);
    console.log("count of input",inputs1)
    setcheck_box_flag_state([]);
    setinputs(inputs1);

    // if(inputs1.length>100){
      
    //   toast.warning(`You Can't submit 100+ data`, {
    //     position: "top-right",
    //     autoClose: 3000,
    //     hideProgressBar: true,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //   });
      
    // }
    // else{
    //   setapihit100(!apihit100)

    // }
    //setpageRefreshFlag(false);
  };

  const handleinput = (e) => {
    let demo = [];
    const value = e.target.value;

    demo.push(value);
    // demo.push(e.target.value.toString() + ",");

    setwaybill(demo);
  };

  const Search = () => {
    setIsLoading(true);
    var axios = require("axios");
    var data = JSON.stringify({
      employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
      client_id: clientid === "" ? null : parseInt(clientid),

      startDate: startdate === "" ? null : startdate,
      endDate: enddate === "" ? null : enddate,
    });
    console.log(data);

    console.log(siteBarInformation_LocalStore);
    var config = {
      method: "post",
      url: Degital_Ocean_flag
          ? "https://e-deshdelivery.com/universalapi/allapi/needToPickupProductList" +
          "?company_name=" +
          company_name
          : "/universalapi/allapi/needToPickupProductList" +
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
          //console.log("response is client name : ", json_object);
          return json_object;
        })
        .then((res) => {
          console.log("This is res of pickup list", res);
          setpickupdata(res.message.information);
          setnewalldata(res.message.information);
          setExportExcel(res.message.information);
          setIsLoading(false);
          if (res.message.information.length === 0) {
            toast.info("No Data!");
            setpayload(false);
          } else {
            setpayload(true);
          }
        })
        .catch(function (error) {
          console.log(error);
          setIsLoading(false);
        });
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

  // const searchbyclient = (e) => {
  //     let templist = [];
  //     alldata.map((single_product) => {
  //         if (
  //             single_product.selleR_NAME
  //                 .toLowerCase()
  //                 .includes(e.target.value.toLowerCase())
  //         ) {
  //             templist.push(single_product);
  //         }
  //     });
  //     console.log("filter data", templist);
  //     setfilterdata(templist);
  // };

  // mod 1000+

  useEffect(() => {
    if (inputs.length || waybill.length > 0) {
      console.log("you cant submit 100+ data",inputs.length)
      
    }
    
      var axios = require("axios");

    var data = JSON.stringify({
      employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
      // product_list: inputs,
      product_list: waybill ? waybill : inputs,
      submitType: submittype,

      dateTime: date_time,
      client_id: clientid === "" ? null : parseInt(clientid),
      startDate: startdate === "" ? null : startdate,
      endDate: enddate === "" ? null : enddate,
    });

    console.log("single product : ", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
          ? "https://e-deshdelivery.com/universalapi/allapi/confirmProductPickedUp" +
          "?company_name=" +
          company_name
          : "/universalapi/allapi/confirmProductPickedUp" +
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
          //console.log(JSON.stringify(response.data));
          // setpickupRefreshFlag(pickupRefreshFlag => !pickupRefreshFlag);
          // toast.success("SuccessFully Created !", {
          //     position: toast.POSITION.TOP_CENTER, autoClose: 1500
          // });
          console.log("Successfully api called : ", response);
          return response;
        })
        .then((res) => {
          console.log("new response is confirm pick up", res);
          setpickupdata(res.data.refreshProduct_list.information);
          setnewalldata(res.data.refreshProduct_list.information);
          setExportExcel(res.data.refreshProduct_list.information);
          // setSaveInPC(res.data.update_push_body_parameter.value);
          // downloadPdf(res.data.update_push_body_parameter.value);
          // downloadPdf(res.data.update_push_body_parameter.value);
          if (submittype === "") {
            toast.warning(`Please Select Submit Type`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
          }
          if (res.data.message.successful_list.length >= 1) {
            toast.success(`Product Confirmed! ${inputs}`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
            setselect_all_check_box_flag(false);
          }
          if (res.data.message.unsuccessful_list.length >= 1) {
            toast.error(
                `Product Not Confirmed! "${res.data.message.unsuccessful_list}"`,
                {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                }
            );
            setselect_all_check_box_flag(false);
          }
        });

    
    
  }, [inputs]);

  //   useEffect(() => {
  //     console.log("saveInPc", saveInPc);
  //     let entries = [];
  //     let daraz = [];

  //     if (saveInPc.length !== 0) {
  //       entries = Object.entries(saveInPc.ajkerDeal_payload);
  //       console.log(entries);
  //       if (saveInPc.darazPayload.length !== 0) {
  //         daraz = saveInPc.darazPayload;
  //         // downloadPdf(saveInPc.darazPayload);
  //       }
  //     }
  //     const data = daraz.concat(entries);
  //     downloadPdf(data);
  //   }, [saveInPc]);

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
    setpickupdata(newalldata);
    setExportExcel(newalldata);
    // setCurrentItems(json_information.message);
    // setExportCsv(json_information.message);
  };

  useEffect(() => {
    //console.log("entering filter effect", allproductdata)
    const users1 = newalldata?.filter(
        (p) =>
            p.productWaybill_number
                ?.toString()
                .toLowerCase()
                .includes(searchTerm?.toString().toLowerCase()) ||
            p.orderId
                ?.toString()
                .toLowerCase()
                .includes(searchTerm?.toString().toLowerCase())
    );
    // setallfilterproductdata(users1);
    // setpickupdata(users1);
    console.log("user1", users1);
    setpickupdata(users1);
  }, [searchTermAltFlag, newalldata]);

  useEffect(() => {
    if (searchTerm.length === 0) {
      setallfilterproductdata(newalldata);
    } else {
      let waybilllist = searchTerm.split(",");
      let temp = [];
      console.log("waybillist", waybilllist);
      if (waybilllist.length <= 1) {
        setsearchTermAltFlag(!searchTermAltFlag);
      } else {
        //console.log("entering filter effect", allproductdata)
        for (let i = 0; i < waybilllist.length; i++) {
          for (let j = 0; j < newalldata.length; j++) {
            if (newalldata[j].productWaybill_number === waybilllist[i].trim()) {
              temp.push(newalldata[j]);
            } else if (newalldata[j].orderId === waybilllist[i].trim()) {
              temp.push(newalldata[j]);
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
        setpickupdata(temp);
        setExportExcel(temp);
        // setExportCsv(temp);
      }
    }
  }, [searchTermFlag, newalldata]);
  useEffect(() => {
    // setnewalldata(json_information.message);
  }, []);

  // ------------------------------------------multiple search end--------------------------------

  // ------------------------------------------pagination start-----------------------------------
  const perPage = 50;
  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentItems(selectedPage);
  };
  const offset = currentItems * perPage;
  const currentPageData = pickupdata.slice(offset, offset + perPage);
  console.log("currentPageData", currentPageData);
  const pageCount = Math.ceil(pickupdata.length / perPage);

  // ------------------------------------------pagination end-------------------------------------

  // ------------------excel download function start---------------------------

  const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const fileName = "Confirm Pickup Table ";

  const exportToCSV = (apiData, fileName) => {
    toast.success("Excel Download Successful");
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  // ------------------excel download function end---------------------------

  useEffect(() => {
    let inputs1 = [];
    pickupdata.map(async (data, list_index) => {
      if (check_box_flag_state[list_index]) {
        let elem = data;
        inputs1.push(elem);
      }
    });
    setExportExcel(inputs1);
  }, [check_box_flag_state]);

  return (
      <>
        <div id="no-more-tables">
          <div className="rounded">
            <div className="row">
              <div
                  className="col-lg-5 col-md-5 col-12 d-flex mb-4 p-3 mx-3 rounded"
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
                    onChange={(e) => {
                      setclientid(e.target.value);
                    }}
                />
                <datalist id="clientnamelist">
                  {clientname &&
                      clientname.map((client) => (
                          <option value={client.client_id}>
                            {client.client_name}
                          </option>
                      ))}
                </datalist>
              </div>
              <div className="col-lg-6 col-md-6 col-12 ms-3 ">
                <div
                    className="row  rounded"
                    style={{ backgroundColor: "#C5D5E4", padding: "13px" }}
                >
                  <div className="col-lg-6 col-md-12 col-12">
                    <div className="d-flex-justify-content-center my-1">
                      <label htmlFor="startdate">Start Date</label>
                      <input
                          style={{
                            // backgroundColor: "#C5D5E4",
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
                            // backgroundColor: "#C5D5E4",
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
                </div>
              </div>
            </div>
            <div className="mb-3 text-center">
              <button className="btn btn-success btn-sm px-4" onClick={Search}>
                Search
              </button>
            </div>
            <div className="row">
              <div
                  className="col-lg-5 col-md-5 col-12 d-flex mb-4 p-3 mx-3 rounded"
                  style={{ backgroundColor: "#C5D5E4" }}
              >
                <p className="w-25">Submit Type:</p>
                <input
                    style={{
                      // backgroundColor: "#C5D5E4",
                      outline: "none",
                      border: "none",
                      padding: "7px",
                      borderRadius: "8px",
                      width: "93%",
                    }}
                    list="towoption"
                    placeholder="Order ID or Waybill"
                    className="form-control shadow"
                    onChange={(e) => {
                      setsubmittype(e.target.value);
                    }}
                />
                <datalist id="towoption">
                  <option value=""></option>
                  <option value="Product Waybill">Product Waybill</option>
                  <option value="Reference No">Reference No</option>
                </datalist>
              </div>
              <div className="col-lg-6 col-md-6 col-12 ms-3 ">
                {/* ------------------------------multiple order id and waybill start------------------------- */}

                <div className="row justify-content-between">
                  <div className="col-lg-8 col-md-8 col-12 mb-2">
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
                  <div className="col-lg-4 col-md-4 col-12 mb-2">
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
                {/* ------------------------------multiple order id and waybill end--------------------------- */}
                {/* <div className="row mt-2">
                <div className="col-9">
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
                    placeholder="waybill OR Order ID"
                    disabled={waybill}
                    value={waybill}
                    onChange={(e) => {
                      handleinput(e);
                    }}
                  />
                </div>
                <div className="col-3">
                  <button
                    className="btn btn-sm btn-danger px-4"
                    onClick={() => setwaybill("")}
                  >
                    Clear
                  </button>
                </div>
              </div> */}
              </div>
            </div>
          </div>

          {isLoading ? (
              <Loader />
          ) : payload ? (
              <div>
                <button
                    className="btn btn-sm btn-dark px-3 rounded-3"
                    onClick={(e) => exportToCSV(exportExcel, fileName)}
                >
                  Export Excel
                </button>

                {/* <CSVLink
          data={currentPageData && currentPageData}
          filename={`Report${getCurrentTime()}.xls`}
          className="btn btn-sm btn-dark px-3 ms-2 rounded-3"
        >
          Download all
        </CSVLink> */}
                <div className="d-flex justify-content-end mb-3">
                  <ReactPaginate
                      breakLabel="..."
                      nextLabel=" >"
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={5}
                      pageCount={pageCount}
                      previousLabel="< "
                      renderOnZeroPageCount={null}
                      breakClassName={"page-item"}
                      breakLinkClassName={"page-link"}
                      containerClassName={"pagination"}
                      pageClassName={"page-item"}
                      pageLinkClassName={"page-link"}
                      previousClassName={"page-item"}
                      previousLinkClassName={"page-link"}
                      nextClassName={"page-item"}
                      nextLinkClassName={"page-link"}
                      activeClassName={"active"}
                  />
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
                    {/*<th scope="col">ID</th>*/}
                    <th scope="col">productWaybill_number</th>
                    <th scope="col">orderId</th>
                    <th scope="col">client_name</th>
                    <th scope="col">client_contact</th>
                    <th scope="col">consignee_name</th>
                    <th scope="col">consignee_contact</th>
                    <th scope="col">consignee_address</th>
                    <th scope="col">dc_name</th>
                    <th scope="col">menifested_date</th>
                  </tr>
                  </thead>
                  <tbody className="text-center border border-dark">
                  {currentPageData &&
                      currentPageData.map((single_data, i) => {
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

                                    {/*<td data-title="ID">{single_data.iD_NUMBER}</td>*/}
                                    <td data-title="Waybill">
                                      {single_data.productWaybill_number}
                                    </td>
                                    <td data-title="REF. NO">{single_data.orderId}</td>
                                    <td data-title="Client Name">
                                      {single_data.client_name}
                                    </td>
                                    <td data-title="Address">
                                      {single_data.client_contact}
                                    </td>
                                    <td data-title="Pincode">
                                      {single_data.consignee_name}
                                    </td>
                                    <td data-title="Area Code">
                                      {single_data.consignee_contact}
                                    </td>
                                    <td data-title="Contact Number">
                                      {single_data.consignee_address}
                                    </td>
                                    <td data-title="dc_name">{single_data.dc_name}</td>
                                    <td data-title="date">
                                      {single_data.menifested_date}
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

                                    {/*<td data-title="ID">{single_data.iD_NUMBER}</td>*/}
                                    <td data-title="Waybill">
                                      {single_data.productWaybill_number}
                                    </td>
                                    <td data-title="REF. NO">{single_data.orderId}</td>
                                    <td data-title="Client Name">
                                      {single_data.client_name}
                                    </td>
                                    <td data-title="Address">
                                      {single_data.client_contact}
                                    </td>
                                    <td data-title="Pincode">
                                      {single_data.consignee_name}
                                    </td>
                                    <td data-title="Area Code">
                                      {single_data.consignee_contact}
                                    </td>
                                    <td data-title="Contact Number">
                                      {single_data.consignee_address}
                                    </td>
                                    <td data-title="dc_name">{single_data.dc_name}</td>
                                    <td data-title="date">
                                      {single_data.menifested_date}
                                    </td>
                                  </tr>
                              )}
                            </>
                        );
                      })}
                  </tbody>
                </table>
                <div className="d-flex my-3 justify-content-between">
                  <button
                      className="btn btn-primary px-4 "
                      onClick={(e) => SubmitButtonFunction(e)}
                  >
                    Submit
                  </button>
                  {/*onClick={SubmitButtonFunction}*/}
                  {/*  disabled={!clientName||!username||!password||!person||!clientContact||!pickuPADDRESS||!pincode||!returnaddress} */}
                  <div>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=" >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="< "
                        renderOnZeroPageCount={null}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        containerClassName={"pagination"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        activeClassName={"active"}
                    />
                  </div>
                </div>
              </div>
          ) : (
              <></>
          )}
        </div>
      </>
  );
};

export default Confirmpickuptable;
