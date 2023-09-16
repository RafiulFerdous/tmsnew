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

const Partnerreturntable = (props) => {
  toast.configure();
  let json_information = props.response;
  console.log("response:" + json_information);
  const [payload, setpayload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setinputs] = useState([]);
  const [filterdata, setfilterdata] = useState([]);
  // checkbos

  // const [select_all_check_box_flag, setselect_all_check_box_flag] = useState(false);

  const [partnernamelist, setpartnernamelist] = useState([]);
  const [alldata, setalldata] = useState([]);
  console.log("alldata", alldata);

  const [clientname, setclientname] = useState([]);
  const [partnername, setpartnername] = useState("");

  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");

  const [date_time, setdate_time] = useState("");
  [informationResponse, setinformationResponse] = useState("");
  [pageRefreshFlag, setpageRefreshFlag] = useState(true);

  const [newalldata, setnewalldata] = useState([]);
  console.log("newalldata", newalldata);
  const [searchTerm, setsearchTerm] = React.useState("");
  const [searchTermFlag, setsearchTermFlag] = useState(false);
  const [searchTermAltFlag, setsearchTermAltFlag] = useState(false);
  const [allfilterproductdata, setallfilterproductdata] = useState([]);
  const [current, setCurrent] = useState([]);
  console.log("current", current);

  let check_box_flag = [];
  const [check_box_flag_state, setcheck_box_flag_state] = useState([]);
  //let select_all_check_box_flag;
  const [select_all_check_box_flag, setselect_all_check_box_flag] =
    useState(false);
  let count_number = current && current.length;
  for (let i = 0; i < count_number; i++) {
    check_box_flag.push(false);
  }

  useEffect(() => {
    setcheck_box_flag_state(check_box_flag);
  }, []);

  let checkbox_click_function = (index_value) => {
    let count_number = current && current.length;
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
      let count_number = current && current.length;
      for (let i = 0; i < count_number; i++) {
        temp_check_box.push(false);
      }
    } else {
      let count_number = current && current.length;
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

  useEffect(() => {
    setpartnernamelist(json_information);
  }, []);
  useEffect(() => {
    setfilterdata(current);
    let tempclient = [];
    current &&
      current.map((single_product) => {
        if (tempclient.indexOf(single_product.selleR_NAME) === -1) {
          tempclient.push(single_product.selleR_NAME);
        }
      });
    setclientname(tempclient);
    console.log("temp client", tempclient);
  }, [current]);
  console.log("client name", clientname);
  console.log("partnernamelist", partnernamelist);

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
    current.map(async (data, list_index) => {
      if (check_box_flag_state[list_index]) {
        let elem = data.productWaybill_number;
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
        employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
        waybill_list: inputs,

        dateTime: date_time,

        partnerName: partnername === "" ? null : partnername,
        startDate: startdate === "" ? null : startdate,
        endDate: enddate === "" ? null : enddate,
      });

      console.log("single product : ", data);

      var config = {
        method: "post",
        url: Degital_Ocean_flag
          ? "https://e-deshdelivery.com/universalapi/allapi/partnerKorearCompanyReturnProdutConfirmbyPC" +
            "?company_name=" +
            company_name
          : "/universalapi/allapi/partnerKorearCompanyReturnProdutConfirmbyPC" +
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
          if (res.data.message.successfulList.length >= 1) {
            toast.success("Product Confirmed!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
            setselect_all_check_box_flag(false);
          }
          // if (
          //     res.data.confirm_information.unsuccessful_confirm_product_waybill
          //         .length >= 1
          // ) {
          //     let str = "";
          //     res.data.confirm_information.unsuccessful_confirm_product_waybill.map(
          //         (wrong_waybill) => {
          //             str += wrong_waybill + " ";
          //         }
          //     );
          //
          //     toast.error(
          //         `Wrong Order id !
          // ${str}`,
          //         {
          //             position: "top-right",
          //             autoClose: 3000,
          //             hideProgressBar: true,
          //             closeOnClick: true,
          //             pauseOnHover: true,
          //         }
          //     );
          // }
          // setalldata(
          //     res.data.waiting_tobe_confirmed_product.all_product_information
          // );
          //
          // setpayload(true);

          setalldata(res.data.refresh_response.allProductinformation);
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

  const Search = () => {
    setIsLoading(true);
    var axios = require("axios");

    var data = JSON.stringify({
      employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
      partnerName: partnername === "" ? null : partnername,
      startDate: startdate === "" ? null : startdate,
      endDate: enddate === "" ? null : enddate,
    });

    console.log("partner courier return : ", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/partnerKorearCompanyReturnProductList" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/partnerKorearCompanyReturnProductList" +
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
        console.log("this is partner courer return list", res);
        setalldata(res.message.allProductinformation);
        setnewalldata(res.message.allProductinformation);
        setIsLoading(false);
        if (res.message.allProductinformation.length === 0) {
          toast.info("No Data!");
          setpayload(false);
        } else {
          setpayload(true);
        }
      })
      .catch(function (error) {
        setIsLoading(false);
        console.log(error);
      });
  };

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
    setCurrent(newalldata);
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
    setCurrent(users1);
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
        setCurrent(temp);
        // setExportCsv(temp);
      }
    }
  }, [searchTermFlag, newalldata]);
  useEffect(() => {
    // setnewalldata(json_information.message);
  }, []);

  // ------------------------------------------multiple search end--------------------------------

  return (
    <>
      <div id="no-more-tables">
        {/*search field start*/}

        <div className="row justify-content-between">
          <div
            className="col-lg-5 col-md-5 col-12 d-flex mb-4 p-3  rounded"
            style={{ backgroundColor: "#C5D5E4" }}
          >
            <p className="w-25">Partner Name:</p>
            <input
              style={{
                // backgroundColor: "#C5D5E4",
                outline: "none",
                border: "none",
                padding: "7px",
                borderRadius: "8px",
                width: "70%",
              }}
              list="clientnamelist1"
              placeholder="Partner Name"
              className="form-control shadow"
              onChange={(e) => {
                setpartnername(e.target.value);
              }}
            />
            <datalist id="clientnamelist1">
              {/*{partnernamelist &&*/}
              {/*    partnernamelist.map((client) => (*/}
              {/*        <option value={client}>{client}</option>*/}
              {/*    ))}*/}

              <option value="Pathao">Pathao</option>
              <option value="Redx">Redx</option>
              <option value="ePost">ePost</option>
            </datalist>
          </div>
          <div className="col-lg-6 col-md-6 col-12 ">
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

        {/*search field end*/}
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

        {isLoading ? (
          <Loader />
        ) : payload ? (
          <div>
            <CSVLink
              data={current && current}
              filename={`Report${getCurrentTime()}.xls`}
              className="btn btn-sm btn-dark px-3 ms-2 rounded-3 mb-2"
            >
              Download all
            </CSVLink>

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
                  <th scope="col">Dc Name</th>
                  <th scope="col">consignee name</th>
                  <th scope="col">consignee Contact</th>
                  <th scope="col">consignee address</th>
                  <th scope="col">client name</th>
                </tr>
              </thead>
              <tbody className="text-center border border-dark">
                {current &&
                  current.map((single_data, i) => {
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
                            <td data-title="Waybill">
                              {single_data.productWaybill_number}
                            </td>
                            <td data-title="REF. NO">{single_data.orderId}</td>
                            <td data-title="Consignee Name">
                              {single_data.dc_name}
                            </td>
                            <td data-title="Address">
                              {single_data.consignee_name}
                            </td>
                            <td data-title="Pincode">
                              {single_data.consignee_contact}
                            </td>
                            <td data-title="Area Code">
                              {single_data.consignee_address}
                            </td>
                            <td data-title="Contact Number">
                              {single_data.client_name}
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

                            <td data-title="ID">{single_data.iD_NUMBER}</td>
                            <td data-title="Waybill">
                              {single_data.productWaybill_number}
                            </td>
                            <td data-title="REF. NO">{single_data.orderId}</td>
                            <td data-title="Consignee Name">
                              {single_data.dc_name}
                            </td>
                            <td data-title="Address">
                              {single_data.consignee_name}
                            </td>
                            <td data-title="Pincode">
                              {single_data.consignee_contact}
                            </td>
                            <td data-title="Area Code">
                              {single_data.consignee_address}
                            </td>
                            <td data-title="Contact Number">
                              {single_data.client_name}
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
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Partnerreturntable;
