import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
import HomeOperation from "../../Model/operation_content/HomeOperation";
import "../css/all.css";
import { LoginContext } from "../../Context/loginContext";
import Modal from "react-modal";
import { SearchContext } from "../../Context/searchContext";
import { SearchButtonContext } from "../../Context/buttonContext";
import { toast } from "react-toastify";
import {
  Linksidebar,
  CustomerCareLinksidebar,
  Salessidebar,
  Operationsidebar,
  Degital_Ocean_flag,
  acsidebar,
  company_name,
  superadminsidebar,
} from "../../Common/Linksidebar";
import { CSVLink } from "react-csv";
import Loader from "../../Loader";

let convert_time_to_time = (receive_time) => {
  let return_time = "";
  for (let i = 0; i < receive_time.length; i++) {
    if (return_time[i] == "/") return_time = return_time + "-";
    else return_time = return_time + receive_time[i];
  }
  return_time = return_time + "T15:47:28.807";
  return return_time;
};

let getOnlyTime = () => {
  let date_ob = new Date();

  let hours = date_ob.getHours();
  if (hours < 10) hours = "0" + hours;
  let minutes = date_ob.getMinutes();
  if (minutes < 10) minutes = "0" + minutes;
  let seconds = date_ob.getSeconds();
  if (seconds < 10) seconds = "0" + seconds;
  let milisecond = date_ob.getMilliseconds();
  if (milisecond < 10) milisecond = "0" + milisecond;
  let date_time =
      "T" + hours + ":" + minutes + ":" + seconds + "." + milisecond;
  return date_time;
};

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

export default function Viewinvoiceacc() {
  toast.configure();
  const [startdate, setstartdate] = useState(null);
  const [enddate, setenddate] = useState(null);
  const [dcname, setdcname] = useState(null);
  const [dc_name, setdc_name] = useState([]);
  const [searchbuttonclicked, setsearchbuttonclicked] = useState(false);

  const [infoModalOpen, setinfoModalOpen] = useState(false);
  const [infoModalOpen1, setinfoModalOpen1] = useState(false);
  const [infoModalOpen2, setinfoModalOpen2] = useState(false);

  const [confirmedlist, setconfirmedlist] = useState("");
  const [unconfirmedlist, setunconfirmedlist] = useState("");
  const [employId, setemployId] = useState("");
  const [information, setinformation] = useState("");
  const [payload, setpayload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [invoicenumber, setinvoicenumber] = useState("");
  const [randomnumber, setrandomnumber] = useState("");
  const [random, setrandom] = useState("");
  const [viewinvoice, setviewinvoice] = useState("");
  const [viewinvoicedata, setviewinvoicedata] = useState([]);

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
          employee_degignation_list.SuperAdmin
      ) {
        setsiteBarInformation_LocalStore(superadminsidebar); //useState a set kore rakhlam
      }
      setlogingInformation_LocalStore(context_flag_obj);
    }
  }, []);

  useEffect(() => {
    setemployId(logingInformation_LocalStore.all_user_list.employeE_ID);
  }, [logingInformation_LocalStore]);
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

  const search = () => {
    // console.log("after conversion start time : ", convert_time_to_time(startdate));
    // console.log("after conversion End time : ", convert_time_to_time(enddate));

    // console.log("this is new starttime after convert",startdate)
    // console.log("this is new endtime after convert",enddate)
    if (!dcname) {
      toast.warning("Select DC.");
      return;
    }
    if (startdate === "" || startdate === null) {
      toast.warning("Select Start Date");
      return;
    }
    if (enddate === "" || enddate === null) {
      toast.warning("Select End Date");
      return;
    }
    setIsLoading(true);
    toast.info("searching...");
    var axios = require("axios");
    var data = JSON.stringify({
      dc_id: employId,
      start_date: startdate + getOnlyTime(),
      end_date: enddate + getOnlyTime(),
      dc_name: dcname,
    });
    console.log("this is data : ", data);
    var config = {
      method: "post",
      url: Degital_Ocean_flag
          ? "https://e-deshdelivery.com/universalapi/allapi/dcPaymentInvoiceDisplay" +
          "?company_name=" +
          company_name
          : "/universalapi/allapi/dcPaymentInvoiceDisplay" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: data,
    };

    console.log("this is config new date", config);

    axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          console.log(response.data);

          return response;
        })
        .then((res) => {
          console.log("new response", res);
          toast.success("Searched!");
          setinformation(res.data.message);
          setsearchbuttonclicked(!searchbuttonclicked);

          //setinfoModalOpen(true);
          setIsLoading(false);
          setpayload(true);
        })
        .catch(function (error) {
          console.log(error);
          setIsLoading(false);
        });
  };

  const confirm = (e, invoice) => {
    console.log("This is invoice in confirm fun", invoice);
    setinvoicenumber(invoice);
    setinfoModalOpen(true);

    let min = 15267;
    let max = 98765;
    let number = Math.floor(Math.random() * (max - min + 1) + min);
    setrandomnumber(number);

    console.log("this is random number", number);
  };
  console.log("This is setinvoicenumber ", invoicenumber);
  console.log("This is setrandomnumber ", randomnumber);

  function closeInvoiceModal() {
    setinfoModalOpen(false);
  }
  function closeInvoiceModal1() {
    setinfoModalOpen1(false);
  }

  function closeInvoiceModal2() {
    setinfoModalOpen2(false);
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
      width: "90%",
      top: "30%",
      left: "10%",
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

  const customStyles1 = {
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

      top: "80px",
      left: "10%",
      right: "10%",
      bottom: "40px",
      border: "1px solid #ccc",
      background: "#fff",
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "4px",
      outline: "none",
      padding: "20px",
    },
  };

  const customStyles2 = {
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

      top: "80px",
      left: "10%",
      right: "10%",
      bottom: "40px",
      border: "1px solid #ccc",
      background: "#fff",
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "4px",
      outline: "none",
      padding: "20px",
    },
  };

  const submit = () => {
    if (random != randomnumber) {
      toast.warning("Please input the verification Number", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });

      return;
    }
    console.log("api hit start");

    var axios = require("axios");
    var data = JSON.stringify({
      employee_id: employId,
      invoice_number: invoicenumber,
      date_time: getCurrentTime(),
    });
    console.log("this is data : ", data);
    var config = {
      method: "post",
      url: Degital_Ocean_flag
          ? "https://e-deshdelivery.com/universalapi/allapi/dcPaymentInvoice_confirm" +
          "?company_name=" +
          company_name
          : "/universalapi/allapi/dcPaymentInvoice_confirm" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: data,
    };

    console.log("this is config", config);

    axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          console.log(response.data);

          return response;
        })
        .then((res) => {
          console.log("new response", res);

          toast.info(res.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          });
          closeInvoiceModal();
          //setinformation(res.data.message.all_invoice_info)

          //setinfoModalOpen(true);

          // setpayload(true);
        });
    //closeInvoiceModal()
    console.log("api hit end");
  };
  useEffect(() => {
    if (!information) return;
    console.log("mapping inform", information);
    let temp = [];
    let temp1 = [];
    information.map((information1) => {
      information1.all_invoice_info.map((invoice) => {
        if (invoice.invoicE_CONFIRM_EMPLOYEE_ID != null) {
          temp.push(invoice);
        } else {
          temp1.push(invoice);
        }
      });
    });

    console.log("confirmed ", temp);
    setconfirmedlist(temp);
    setunconfirmedlist(temp1);
  }, [information]);
  useEffect(() => {
    if (unconfirmedlist === "") return;
    if (unconfirmedlist.length === 0) {
      toast.warning("No Unconfirmed Invoice", {
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  }, [unconfirmedlist]);

  // useEffect(()=>{
  //     //if(!information)return;
  //     let un=[]
  //     information.map(invoice=>{
  //         if(invoice.invoicE_CONFIRM_EMPLOYEE_ID!=null){
  //             un.push(invoice)
  //             console.log("this is unconfirm list in useeffect",invoice)
  //         }
  //     })
  //     console.log("unconfirmed ",un);
  // setunconfirmedlist(un)

  //     console.log("this is unconfirmed list length",unconfirmedlist.length)

  //     if(unconfirmedlist.length===0)
  //         toast.warning("No Unconfirm list", {
  //             position: "top-right",
  //             autoClose: false,
  //             hideProgressBar: true,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //         });

  // },[information])

  console.log("this is unconfirmed list under effect", unconfirmedlist);

  const view = (event, invoice) => {
    console.log("this is view invoice", invoice);
    setviewinvoice(invoice);

    var axios = require("axios");
    var data = JSON.stringify({
      employee_id: employId,
      invoice_number: invoice,
    });
    console.log("this is data : ", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
          ? "https://e-deshdelivery.com/universalapi/allapi/dcPaymentInvoice_display" +
          "?company_name=" +
          company_name
          : "/universalapi/allapi/dcPaymentInvoice_display" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: data,
    };

    console.log("this is config view invoicedata", config);

    axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          console.log(response.data);

          return response;
        })
        .then((res) => {
          console.log("new response is viewinvoicedata", res);

          toast.info(res.status, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          });

          setviewinvoicedata(
              res.data.message.all_product && res.data.message.all_product
          );
          // closeInvoiceModal()
          //setinformation(res.data.message.all_invoice_info)

          setinfoModalOpen2(true);

          //setinfoModalOpen(true);

          // setpayload(true);
        });
    //closeInvoiceModal()
    console.log("api hit end");
  };

  console.log("this is viewinvoicedata after api", viewinvoicedata);

  return (
      <>
        <div className="bordered">
          {/* Invoice modal */}
          <Modal
              isOpen={infoModalOpen}
              style={customStyles}
              onRequestClose={closeInvoiceModal}
              closeTimeoutMS={200}
              contentLabel="Example Modal"
          >
            <button
                className="btn btn-outline-danger mb-2"
                onClick={closeInvoiceModal}
            >
              close
            </button>
            <div className="d-flex justify-content-center">
              <label>Please Input Bellow Number: </label>
              <input
                  list="felist"
                  className="form-control w-50"
                  onChange={(e) => setrandom(e.target.value)}
              />
              <br></br>

              {/*onChange={e => setselectedfe(e.target.value)}*/}
              {/*<datalist id="felist">*/}
              {/*    {*/}
              {/*        felist.map((single_fe) => {*/}
              {/*            if(single_fe.active_or_inactive==="Active")*/}
              {/*                return(*/}
              {/*                    <option value={single_fe.field_operative_id}>{single_fe.field_operative_name}</option>*/}
              {/*                )})*/}
              {/*    }*/}

              {/*</datalist>*/}
            </div>
            <div className="d-flex justify-content-center">
              <h4>{randomnumber}</h4>
            </div>

            <div className="d-flex mt-4 justify-content-center">
              <button className="btn btn-outline-success mb-2" onClick={submit}>
                Submit
              </button>
            </div>
          </Modal>
        </div>
        <div className="bordered">
          {/* Invoice modal */}
          <Modal
              isOpen={infoModalOpen1}
              style={customStyles1}
              onRequestClose={closeInvoiceModal1}
              closeTimeoutMS={200}
              contentLabel="Example Modal"
          >
            <button
                className="btn btn-outline-danger mb-2"
                onClick={closeInvoiceModal1}
            >
              close
            </button>
            <div className="d-flex justify-content-center">
              <div id="requesttable">
                <div>
                  <CSVLink
                      data={confirmedlist}
                      filename={`ConfirmedInvoice${getCurrentTime()}.csv`}
                      className="btn btn-sm bg-info text-black border-info mb-2"
                  >
                    Download csv
                  </CSVLink>

                  <table className="table table-hover">
                    <thead className="bg-dark">
                    <tr className="text-white">
                      <th>Id</th>
                      <th scope="col">INVOICE</th>
                      <th>Transaction NUMBER</th>
                      <th>Dc</th>
                      <th scope="col">PRODUCT VALUE</th>
                      <th scope="col">DELIVERED PRODUCT</th>
                      <th scope="col">PAID AMOUNT</th>
                      <th>PENDING AMOUNT</th>
                      <th>PoD DATE</th>
                    </tr>
                    </thead>

                    <tbody>
                    {confirmedlist &&
                        confirmedlist.map((single_message) => {
                          return (
                              <tr
                                  key={single_message.id}
                                  className="bg-success text-white"
                              >
                                {/* <td className="btn btn-outline-primary" onClick={(e) => confirm(e,single_message.paymenT_INVOICE_NUMBER)} >Confirm</td> */}
                                <td>{single_message.id}</td>
                                {/* className="btn btn-outline-primary text-white"*/}
                                <td scope="row">
                                  {single_message.paymenT_INVOICE_NUMBER}
                                </td>
                                <td>{single_message.transactioN_NUMBER}</td>
                                <td>{single_message.districT_INCHARGE_ID}</td>
                                <td>{single_message.totaL_PRODUCT_VALUE}</td>
                                <td>{single_message.totaL_DELEVERED_PRODUCT}</td>
                                <td>{single_message.totaL_PAID_AMOUNT}</td>
                                <td>{single_message.totaL_PANDING_AMOUNT}</td>
                                <td>{single_message.poD_DATE}</td>
                              </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Modal>
        </div>

        {/*viewinvoice data modal*/}

        <div className="bordered">
          {/* Invoice modal */}
          <Modal
              isOpen={infoModalOpen2}
              style={customStyles2}
              onRequestClose={closeInvoiceModal2}
              closeTimeoutMS={200}
              contentLabel="Example Modal"
          >
            <button
                className="btn btn-outline-danger mb-2"
                onClick={closeInvoiceModal2}
            >
              close
            </button>
            <div className="d-flex justify-content-center">
              <div id="requesttable">
                <div>
                  <CSVLink
                      data={viewinvoicedata}
                      filename={`invoice productlist${getCurrentTime()}.csv`}
                      className="btn btn-sm bg-info text-black border-info mb-2"
                  >
                    Download csv
                  </CSVLink>

                  <table className="table table-hover">
                    <thead className="bg-dark">
                    <tr className="text-white">
                      <th>waybill_number</th>
                      <th scope="col">order_id</th>
                      <th>client_name</th>
                      <th>dc_name</th>
                      <th scope="col">payment_type</th>
                      <th scope="col">cod_amount</th>
                    </tr>
                    </thead>

                    <tbody>
                    {viewinvoicedata &&
                        viewinvoicedata.map((single_message) => {
                          return (
                              <tr
                                  key={single_message.id}
                                  className="bg-success text-white"
                              >
                                {/* <td className="btn btn-outline-primary" onClick={(e) => confirm(e,single_message.paymenT_INVOICE_NUMBER)} >Confirm</td> */}
                                <td>{single_message.waybill_number}</td>
                                {/* className="btn btn-outline-primary text-white"*/}
                                <td scope="row">{single_message.order_id}</td>
                                <td>{single_message.client_name}</td>
                                <td>{single_message.dc_name}</td>
                                <td>{single_message.payment_type}</td>
                                <td>{single_message.cod_amount}</td>
                              </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Modal>
        </div>

        {/*viewinvoice data modal end*/}

        <div className="bodydiv">
          <div className="row">
            <div className="col-12">
              <Navbar sidebar_manu={siteBarInformation_LocalStore} />
            </div>
          </div>
          {/* <div className="row">
              <div className="col-12">
               <Sidebar sidebar_manu={siteBarInformation_LocalStore}/>
              </div>
              </div> */}

          {/* <div className="row container">
                        <div className="col-6 " id="srchmenu">
                                <Search/>
                        </div>
                   </div> */}
          <div className=" container mt-5 pt-5">
            <div className="col-12 d-flex" id="">
              <div className="container row-col-2">
                {/*new design accounts panel Confirm Payment start */}
                <div className="col-lg-8 col-md-11 col-10 m-auto">
                  <div className="">
                    <h4 className="text-dark text-center">Confirm Payment</h4>
                    <div className="container shadow my-3 py-3 rounded single-product-upload-bg">
                      <div className="row my-2">
                        <div className="col-lg-2 col-md-2 col-12">
                          <p>DC Name:</p>
                        </div>
                        <div className="col-lg-10 col-md-10 col-12">
                          <input
                              style={{
                                backgroundColor: "#fff",
                                outline: "none",
                                border: "none",
                                padding: "7px",
                                borderRadius: "8px",
                                width: "100%",
                              }}
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
                            <option value="All">All</option>
                            {dc_name.map((single_dc_office_name) => {
                              // console.log("SINGLE DC NAME:", single_dc_office_name);
                              return (
                                  <option
                                      value={single_dc_office_name
                                          .toString()
                                          .toLowerCase()}
                                  ></option>
                              );
                            })}
                          </datalist>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                          <div className="row my-2">
                            <div className="col-lg-4 col-md-4 col-12">
                              <p> Start Date:</p>
                            </div>
                            <div className="col-lg-8 col-md-8 col-12">
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
                            <div className="col-lg-4 col-md-4 col-12">
                              <p> End Date:</p>
                            </div>
                            <div className="col-lg-8 col-md-8 col-12">
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
                            onClick={search}
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/*new design accounts panel Confirm Payment end */}

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
                      <option value="All">All</option>
                      {dc_name.map((single_dc_office_name) => {
                        // console.log("SINGLE DC NAME:", single_dc_office_name);
                        return (
                          <option
                            value={single_dc_office_name
                              .toString()
                              .toLowerCase()}
                          ></option>
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
                      onClick={search}
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div> */}
                {isLoading ? (
                    <Loader />
                ) : (
                    <div id="no-more-tables">
                      <div>
                        <CSVLink
                            data={unconfirmedlist}
                            filename={`UnconfirmedInvoice${getCurrentTime()}.csv`}
                            className="btn btn-sm btn-dark px-3 mb-2 me-2 rounded-3"
                        >
                          Download csv
                        </CSVLink>
                        <button
                            className="btn btn-sm btn-success ms-2 mb-2 px-3 rounded-3"
                            onClick={(e) => setinfoModalOpen1(true)}
                        >
                          Confirmed List
                        </button>

                        <table
                            className="table bg-white"
                            style={{ fontSize: "13px", marginLeft: "1px" }}
                        >
                          <thead
                              className="text-center shadow sticky-top"
                              style={{
                                backgroundColor: "#b4bec2",
                                top: "60px",
                                zIndex: 0,
                              }}
                          >
                          <tr className="text-dark" style={{ border: "none" }}>
                            <th>Action</th>
                            <th>Id</th>
                            <th scope="col">INVOICE</th>
                            <th>Transaction NUMBER</th>
                            <th>Dc</th>
                            <th scope="col">PRODUCT VALUE</th>
                            <th scope="col">DELIVERED PRODUCT</th>
                            <th scope="col">PAID AMOUNT</th>
                            <th>PENDING AMOUNT</th>
                            <th>PoD DATE</th>
                            <th>Payment Type</th>
                          </tr>
                          </thead>

                          <tbody className="text-center border border-secondary">
                          {unconfirmedlist &&
                              unconfirmedlist.map((single_message) => {
                                if (
                                    single_message.invoicE_CONFIRM_EMPLOYEE_ID ===
                                    null
                                ) {
                                  return (
                                      <tr
                                          key={single_message.id}
                                          className="bg-success text-white"
                                      >
                                        <td data-title="Action">
                                          <button
                                              className="btn btn-sm btn-outline-primary text-white"
                                              onClick={(e) =>
                                                  confirm(
                                                      e,
                                                      single_message.paymenT_INVOICE_NUMBER
                                                  )
                                              }
                                          >
                                            Confirm
                                          </button>
                                        </td>
                                        <td data-title="Id">{single_message.id}</td>
                                        {/* className="btn btn-outline-primary text-white"*/}
                                        <td data-title="INVOICE" scope="row">
                                          <button
                                              className="btn btn-sm btn-outline-primary text-white"
                                              onClick={(event) =>
                                                  view(
                                                      event,
                                                      single_message.paymenT_INVOICE_NUMBER
                                                  )
                                              }
                                          >
                                            {single_message.paymenT_INVOICE_NUMBER}
                                          </button>
                                        </td>
                                        <td data-title="Transaction NUMBER">
                                          {single_message.transactioN_NUMBER}
                                        </td>
                                        <td data-title="Dc">
                                          {single_message.districT_INCHARGE_ID}
                                        </td>
                                        <td data-title="PRODUCT VALUE">
                                          {single_message.totaL_PRODUCT_VALUE}
                                        </td>
                                        <td data-title="DELIVERED PRODUCT">
                                          {single_message.totaL_DELEVERED_PRODUCT}
                                        </td>
                                        <td data-title="PAID AMOUNT">
                                          {single_message.totaL_PAID_AMOUNT}
                                        </td>
                                        <td data-title="PENDING AMOUNT">
                                          {single_message.totaL_PANDING_AMOUNT}
                                        </td>
                                        <td data-title="PoD DATE">
                                          {single_message.poD_DATE}
                                        </td>
                                        <td data-title="Payment Type">
                                          {single_message.paymenT_TYPE &&
                                              single_message.paymenT_TYPE}
                                        </td>
                                      </tr>
                                  );
                                }
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                )}
              </div>
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
}
