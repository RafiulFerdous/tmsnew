import React, { useState, useEffect, useContext } from "react";
import reactDom from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { SearchContext } from "../../Context/searchContext";
import { SearchButtonContext } from "../../Context/buttonContext";
import BarCode, { useBarcode } from "react-barcode";
import { jsPDF } from "jspdf";
import { CSVLink, CSVDownload } from "react-csv";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import {
  Linksidebar,
  CustomerCareLinksidebar,
  Salessidebar,
  Operationsidebar,
  Degital_Ocean_flag,
  company_name,
  acsidebar,
} from "../../Common/Linksidebar";
import { LoginContext } from "../../Context/loginContext";
//for modal popup
import Modal from "react-modal";
//import './sc.css';

import html2canvas from "html2canvas";
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

const FinancialHomeTable = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [allClient, setAllClient] = useState([]);
  const [clientName, setClientName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [noCheckData, setnoCheckData] = useState([]);
  const [clientInfo, setclientInfo] = useState([]);
  const [filteredclientInfo, setfilteredclientInfo] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm1, setSearchTerm1] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const [modalproductIsOpen, setmodalproductIsOpen] = useState(false);
  const [modalnonproductIsOpen, setmodalnonproductIsOpen] = useState(false);
  const [allproductlist, setallproductlist] = useState("");
  const [filterallproductlist, setfilterallproductlist] = useState("");
  const searchIcon = <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>;
  console.log("this is client id", clientName);

  console.log("this is productlist", allproductlist);

  const [employId, setemployId] = useState("");

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

  // check box
  const [allclientInfo, setallclientInfo] = useState([]);

  let check_box_flag = [];
  const [check_box_flag_state, setcheck_box_flag_state] = useState([]);
  //let select_all_check_box_flag;
  const [select_all_check_box_flag, setselect_all_check_box_flag] =
    useState(false);
  let count_number = filterallproductlist.length;
  for (let i = 0; i < count_number; i++) {
    check_box_flag.push(false);
  }

  useEffect(() => {
    setcheck_box_flag_state(check_box_flag);
  }, []);

  let checkbox_click_function = (index_value) => {
    let count_number = filterallproductlist.length;
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
      let count_number = filterallproductlist.length;
      for (let i = 0; i < count_number; i++) {
        temp_check_box.push(false);
      }
    } else {
      let count_number = filterallproductlist.length;
      for (let i = 0; i < count_number; i++) {
        temp_check_box.push(true);
      }
    }
    setcheck_box_flag_state(temp_check_box);
  }, [select_all_check_box_flag]);

  // check box end

  // bridge data
  const [inputs, setinputs] = useState([]);
  const [SubmitFlag, setSubmitFlag] = useState(false);

  let bridgeme = (e) => {
    // setwaybill_number(waybill_number);

    let inputs1 = [];
    filterallproductlist.map(async (data, list_index) => {
      if (check_box_flag_state[list_index]) {
        let elem = data.product_waybill_number;

        inputs1.push(elem);
        setinputs(inputs1);
      }
    });
    setSubmitFlag(!SubmitFlag);
  };
  //invoice data
  const [invoiceData, setinvoiceData] = useState([]);
  useEffect(() => {
    if (parseInt(clientName) === 0 || clientName === "")
      toast.success("Please Select Client", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
      });

    // e.preventDefault();
    var axios = require("axios");

    var data = JSON.stringify({
      employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
      product_waybill: inputs,
      client_id: parseInt(clientName),
      date_time: getCurrentTime(),
      //    parseInt(clientName)
    });

    console.log("single product : ", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/accountPanelPaymentInvoiceGenerateforClient" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/accountPanelPaymentInvoiceGenerateforClient" +
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
        // setpickupRefreshFlag(pickupRefreshFlag => !pickupRefreshFlag);
        toast.success("SuccessFully Forworded", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
        //setUsers(response.data.all_product_list)
        console.log("successfully forworded");
        return response;
      })
      .then((res) => {
        console.log("new response invoice", res);
        setinvoiceData(res);
        setinvoiceModalOpen(true);
        // setUsers(res.data.all_product_list)

        //setpayload(true);
      })
      .catch(function (error) {
        // Error
        // if (error.response) {
        //     toast.error("Error!", {
        //         position: toast.POSITION.TOP_CENTER, autoClose: 1500
        //     });
        //
        // } else if (error.request) {
        //     toast.error(" Request Error!", {
        //         position: toast.POSITION.TOP_CENTER, autoClose: 1500
        //     });
        //     console.log(error.request);
        // } else {
        //
        //     console.log('Error', error.message);
        // }
        console.log(error.config);
      });

    //setpickupFlag(pickupFlag => !pickupFlag);
  }, [SubmitFlag]);

  console.log("invoice data", invoiceData);

  const [endDate, setEndDate] = useState("");
  let json_information = props.response;

  useEffect(() => {
    console.log(json_information);
    setAllClient(json_information.message.all_client_name);
  }, []);
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
  console.log("this is all client", allClient);
  //const [clientInfo, setclientInfo] = useState([])
  const [clientData, setClientData] = useState("");

  console.log("allclientinfo", allclientInfo);

  const searchClient = () => {
    if (startDate === "" || startDate === null) {
      toast.warning("Select Start Date");
      return;
    }
    if (endDate === "" || endDate === null) {
      toast.warning("Select End Date");
      return;
    }

    setIsLoading(true);
    toast.info("searching...");
    var axios = require("axios");
    var data = JSON.stringify({
      employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
      client_id: clientName === "" ? parseInt(0) : parseInt(clientName),
      //parseInt(clientName)
      start_date_time: startDate,
      end_date_time: endDate,
      current_date_time: getCurrentTime(),
    });
    console.log(data);
    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/accountPanelPaymentInvoiceGenerateProductListforClient" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/accountPanelPaymentInvoiceGenerateProductListforClient" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: data,
    };
    console.log(config);
    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        console.log("response is : ", json_object);
        return json_object;
      })
      .then((res) => {
        console.log("new res is client id 0  ", res);
        toast.success("Successfuly Searched", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });
        setclientInfo(res.message);

        setClientData(res.message);
        setIsLoading(false);
        //setpayload(true);
        // return res;
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });

    // .then(res => {
    //     setAllClient(res.message.all_client_name);
    //     //setpayload(true);
    //     console.log("res is here", res.message.all_client_name)
    // })

    // .catch(function (error) {
    // console.log(error);
    // });
  };
  console.log("client state date", clientInfo);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [clickedClient, setClickedClient] = useState({});

  function openModal(e) {
    console.log("clicked name", e.target.innerText);
    let company_name = e.target.innerText;
    clientInfo.client_charge_information.map((client) => {
      //    loop condition here for client name
      setClickedClient(client);
    });
    setIsOpen(true);
  }
  function openModal(e) {
    setmodalproductIsOpen(true);
  }
  const [invoiceModalOpen, setinvoiceModalOpen] = useState(false);

  function closeInvoiceModal() {
    setinvoiceModalOpen(false);
  }
  function closeModal() {
    setIsOpen(false);
  }
  function closeProductModal() {
    setmodalproductIsOpen(false);
  }

  function closenonProductModal() {
    setmodalnonproductIsOpen(false);
  }

  const Nonreconciled = () => {
    setmodalnonproductIsOpen(true);
  };
  const customStyles = {
    overlay: {
      position: "fixed",
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
      top: "50px",
      left: "20%",
      right: "40px",
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
      color: "",
      position: "absolute",
      height: "80%",
      width: "80%",
      top: "10%",
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
      color: "",
      position: "absolute",
      height: "80%",
      width: "80%",
      top: "10%",
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

  const [nonreconcileproduct, setnonreconcileproduct] = useState("");
  const [filternonreconcileproduct, setfilternonreconcileproduct] =
    useState("");
  useEffect(() => {
    let temp = [];
    let recontemp = [];
    clientInfo.map((single, i) => {
      single.non_reconciled_object.all_non_reconciled_product.map(
        (reconprod) => {
          recontemp.push({ ...reconprod, client_name: single.client_name });
        }
      );
      return single.all_product.map((singleClient) =>
        temp.push({ ...singleClient, client_name: single.client_name })
      );
    });
    setnonreconcileproduct(recontemp);
    setfilternonreconcileproduct(recontemp);
    setallproductlist(temp);
    setfilterallproductlist(temp);
  }, [clientInfo]);
  console.log("these are non reconciled product", nonreconcileproduct);

  React.useEffect(() => {
    const results =
      allproductlist &&
      allproductlist.filter(
        (p) =>
          (p.client_name &&
            p.client_name
              .toString()
              .toLowerCase()
              .includes(searchTerm.toString().toLowerCase())) ||
          p.product_waybill_number
            .toString()
            .toLowerCase()
            .includes(searchTerm.toString().toLowerCase())
      );
    setfilterallproductlist(results);
  }, [searchTerm, allproductlist]);
  React.useEffect(() => {
    const results =
      nonreconcileproduct &&
      nonreconcileproduct.filter(
        (p) =>
          (p.client_name &&
            p.client_name
              .toString()
              .toLowerCase()
              .includes(searchTerm1.toString().toLowerCase())) ||
          p.product_waybill_number
            .toString()
            .toLowerCase()
            .includes(searchTerm1.toString().toLowerCase())
      );
    setfilternonreconcileproduct(results);
  }, [searchTerm1, nonreconcileproduct]);
  React.useEffect(() => {
    const results =
      clientInfo &&
      clientInfo.filter(
        (p) =>
          p.client_name &&
          p.client_name
            .toString()
            .toLowerCase()
            .includes(searchTerm2.toString().toLowerCase())
      );
    setfilteredclientInfo(results);
  }, [searchTerm2, clientInfo]);
  const handleonChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleonChange1 = (event) => {
    setSearchTerm1(event.target.value);
  };

  const handleonChange2 = (event) => {
    setSearchTerm2(event.target.value);
  };

  return (
    <>
      <div className="container">
        {/*new design accounts panel report download start */}
        <div className="col-lg-8 col-md-11 col-10 m-auto">
          <div className="">
            <h4 className="text-dark text-center">Client Payment</h4>
            <div className="container shadow my-3 py-3 rounded single-product-upload-bg">
              <div className="row my-2">
                <div className="col-lg-2 col-md-2 col-12">
                  <p>Client Name:</p>
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
                    list="clientnames"
                    className="form-control"
                    id="clientname"
                    onChange={(e) => {
                      setClientName(e.target.value);
                    }}
                  />
                  <datalist id="clientnames">
                    <option selected value="">
                      None
                    </option>
                    {allClient.map((client) => {
                      return (
                        <option value={client.client_id}>
                          {client.client_name}
                        </option>
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
                        value={startDate}
                        onChange={(e) => {
                          setStartDate(e.target.value);
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
                        value={endDate}
                        onChange={(e) => {
                          setEndDate(e.target.value);
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
                  onClick={searchClient}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/*new design accounts panel report download end */}
        {/* <div className="border  mb-5">
          <form className="row d-flex justify-content-center">
            <div className="col-sm-4 form-group mx-3 mt-2">
              <div className=" text-center text-black mx-1">Client Name:</div>

              <input
                list="clientnames"
                className="form-control"
                id="clientname"
                onChange={(e) => {
                  setClientName(e.target.value);
                }}
              />
              <datalist id="clientnames">
                <option selected value="">
                  None
                </option>
                {allClient.map((client) => {
                  return (
                    <option value={client.client_id}>
                      {client.client_name}
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
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
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
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="col-md-12 d-flex justify-content-center mt-4 mb-2">
              <button
                type="button"
                onClick={searchClient}
                className="btn btn-outline-primary"
              >
                Search
              </button>
            </div>
          </form>
        </div> */}
        {/* <div>
                <h4>Cod Charge: <span className="badge bg-secondary">{clientInfo!=['']?clientInfo.client_charge_information[0].coD_CHARGE:''}</span></h4>
                <h4>Inside DELEVERY CHARGE: <span className="badge bg-secondary">{clientInfo!=['']?clientInfo.client_charge_information[0].insidE_DHAKA_DELEVERY_CHARGE:''}</span></h4>
                <h4>Inside DHAKA DELEVERY CHARGE INCREMENT: <span className="badge bg-secondary">{clientInfo!=['']?clientInfo.client_charge_information[0].insidE_DHAKA_DELEVERY_CHARGE_INCREMENT:''}</span></h4>
                <h4>Return CHARGE: <span className="badge bg-secondary">{clientInfo!=['']?clientInfo.client_charge_information[0].returN_CHARGE:''}</span></h4>
                <h4>Outside DHAKA DELEVERY CHARGE: <span className="badge bg-secondary">{clientInfo!=['']?clientInfo.client_charge_information[0].outsidE_DHAKA_DELEVERY_CHARGE:''}</span></h4>
                <h4>Outside DHAKA DELEVERY CHARGE INCREMENT: <span className="badge bg-secondary">{clientInfo!=['']?clientInfo.client_charge_information[0].outsidE_DHAKA_DELEVERY_CHARGE_INCREMENT:''}</span></h4>

                </div> */}
        <div>
          {/* company modal */}
          {/* <Modal
                        isOpen={modalIsOpen}
                        style={customStyles}
                        onRequestClose={closeModal}

                        contentLabel="Example Modal"
                    >

                        <button className="btn btn-outline-danger mb-2" onClick={closeModal}>close</button>
                        <div>
                            <h4>Cod Charge: <span className="badge bg-secondary">{clickedClient.coD_CHARGE}</span></h4>
                            <h4>Inside DELEVERY CHARGE: <span className="badge bg-secondary">{clickedClient.insidE_DHAKA_DELEVERY_CHARGE}</span></h4>
                            <h4>Inside DHAKA DELEVERY CHARGE INCREMENT: <span className="badge bg-secondary">{clickedClient.insidE_DHAKA_DELEVERY_CHARGE_INCREMENT}</span></h4>
                            <h4>Return CHARGE: <span className="badge bg-secondary">{clickedClient.returN_CHARGE}</span></h4>
                            <h4>Outside DHAKA DELEVERY CHARGE: <span className="badge bg-secondary">{clickedClient.outsidE_DHAKA_DELEVERY_CHARGE}</span></h4>
                            <h4>Outside DHAKA DELEVERY CHARGE INCREMENT: <span className="badge bg-secondary">{clickedClient.outsidE_DHAKA_DELEVERY_CHARGE_INCREMENT}</span></h4>

                        </div>
                    </Modal> */}
        </div>
        <div>
          {/* Invoice modal */}
          <Modal
            isOpen={invoiceModalOpen}
            style={customStyles}
            onRequestClose={closeInvoiceModal}
            contentLabel="Example Modal"
          >
            <button
              className="btn btn-outline-danger mb-2"
              onClick={closeInvoiceModal}
            >
              close
            </button>
            <div>
              <h4>Invoice</h4>
              <h6>
                total cod amount:{" "}
                {invoiceData.data && invoiceData.data.message.total_cod_amount}
              </h6>
              <h6>
                total number product:{" "}
                {invoiceData.data &&
                  invoiceData.data.message.total_number_product}
              </h6>
              <h6>
                total charge:{" "}
                {invoiceData.data && invoiceData.data.message.total_charge}
              </h6>
              <h6>
                {" "}
                total submit amount:
                {invoiceData.data &&
                  invoiceData.data.message.total_submit_amount}
              </h6>
              <h6>
                client name:{" "}
                {invoiceData.data && invoiceData.data.message.client_name}
              </h6>
              {/* <h6>invoice number: {invoiceData.data && invoiceData.data.message.invoice_number}</h6> */}

              <ReactHTMLTableToExcel
                className="js-download-link button bg-info border border-info px-4 btn-sm mb-2 mx-2 text-white rounded-pill"
                table="invoiceaccount"
                filename="ReportExcel"
                sheet="Sheet"
                buttonText="Export excel"
              />

              <table className="table" id="invoiceaccount">
                <thead>
                  <th>Waybill Number</th>
                  <th>Order Id</th>
                  <th>Payment Type</th>
                  <th>Cod Amount</th>
                  <th>Single Product Charge</th>
                  <th>Cod Charge</th>
                  <th>Client Submit Amount</th>
                  <th>Invoice No.</th>
                </thead>
                <tbody>
                  {invoiceData.data &&
                    invoiceData.data.message.product_information.map(
                      (single_product) => (
                        <tr>
                          <td>{single_product.product_waybill_number}</td>
                          <td>{single_product.order_id}</td>
                          <td>{single_product.payment_type}</td>
                          <td>{single_product.cod_amount}</td>
                          <td>{single_product.single_product_charge}</td>
                          <td>{single_product.cod_charge}</td>
                          <td>{single_product.client_submit_amount}</td>
                          <td>
                            {invoiceData.data &&
                              invoiceData.data.message.invoice_number}
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>

              {/* <h4>Cod Charge: <span className="badge bg-secondary">{clickedClient.coD_CHARGE}</span></h4>
                            <h4>Inside DELEVERY CHARGE: <span className="badge bg-secondary">{clickedClient.insidE_DHAKA_DELEVERY_CHARGE}</span></h4>
                            <h4>Inside DHAKA DELEVERY CHARGE INCREMENT: <span className="badge bg-secondary">{clickedClient.insidE_DHAKA_DELEVERY_CHARGE_INCREMENT}</span></h4>
                            <h4>Return CHARGE: <span className="badge bg-secondary">{clickedClient.returN_CHARGE}</span></h4>
                            <h4>Outside DHAKA DELEVERY CHARGE: <span className="badge bg-secondary">{clickedClient.outsidE_DHAKA_DELEVERY_CHARGE}</span></h4>
                            <h4>Outside DHAKA DELEVERY CHARGE INCREMENT: <span className="badge bg-secondary">{clickedClient.outsidE_DHAKA_DELEVERY_CHARGE_INCREMENT}</span></h4> */}
            </div>
          </Modal>
        </div>

        {/*modal end here*/}

        {/*table start here*/}

        {isLoading ? (
          <Loader />
        ) : (
          <div className="mt-5" id="no-more-tables">
            <div className="row mb-2">
              <div className="col-lg-5 col-md-5 col-12 mb-2">
                <input
                  style={{
                    backgroundColor: "#C5D5E4",
                    outline: "none",
                    border: "none",
                    padding: "7px",
                    borderRadius: "8px",
                    width: "93%",
                  }}
                  type="search"
                  placeholder="Waybill, Order ID, Client Name"
                  value={searchTerm}
                  onChange={handleonChange}
                />
              </div>
              <div className="col-lg-6 col-md-7 col-12 mb-2">
                <CSVLink
                  data={filterallproductlist && filterallproductlist}
                  filename={`Client${getCurrentTime()}.csv`}
                  className="btn btn-sm btn-dark px-3 me-2 mb-2 rounded-3"
                >
                  Export csv
                </CSVLink>
                <button
                  className="bbtn btn-sm btn-info mb-2 px-3 rounded-3"
                  onClick={Nonreconciled}
                >
                  See Non-Reconciled Shipment
                </button>
              </div>
            </div>
            {/* <div>
            <CSVLink
              data={filterallproductlist && filterallproductlist}
              filename={`Client${getCurrentTime()}.csv`}
              className="btn btn-sm bg-info text-black border-info mb-2 rounded-pill"
            >
              Export csv
            </CSVLink>
          </div>
          <div>
            <button
              className="btn btn-sm bg-info text-black border-info mb-2 rounded-pill"
              onClick={Nonreconciled}
            >
              See Non-Reconciled Shipment
            </button>
          </div>
          <div className="input-group  input-icons">
            <i className="icon ">{searchIcon}</i>
            <input
              type="search"
              name=""
              id=""
              placeholder="Waybill, Order ID, Client Name"
              className="rounded-pill px-5 py-2  input-field"
              style={{
                width: "-webkit-fill-available",
                textAlign: "start",
                marginLeft: "15px",
                boxShadow: "2px 3px 3px 1px #00000059",
                outline: "none",
                border: "none",
              }}
              value={searchTerm}
              onChange={handleonChange}
            />
          </div> */}
            <table
              className="table css-serial bg-white"
              style={{ fontSize: "13px", marginLeft: "1px" }}
              id="accstable"
            >
              <thead
                className="text-center shadow sticky-top"
                style={{ backgroundColor: "#b4bec2", top: "60px", zIndex: 0 }}
              >
                <tr className="text-dark" style={{ border: "none" }}>
                  {/* <th scope="col">SL</th> */}
                  <th>
                    <div className="custom-control custom-checkbox">
                      <input
                        style={{ cursor: "pointer" }}
                        type="checkbox"
                        className="custom-control-input"
                        name="allSelect"
                        onChange={(e) => select_all_function()}
                      />
                    </div>
                  </th>

                  <th>Client Name</th>

                  <th>WayBill Number</th>
                  <th>Order Id</th>
                  {/*<th'>Customer Name*/}
                  {/*</th>*/}
                  <th>Inside Outside Dhaka</th>
                  <th>Payment Type</th>
                  <th>Cod Amount</th>
                  <th>Cod Charge</th>
                  <th>Product In System DateTime</th>
                  <th>Product Weight</th>
                  <th>Single Product Charge</th>
                  <th>Status</th>
                  <th>Status DateTime</th>
                  <th>Confirm DateTime</th>

                  <th>other charge</th>

                  <th>packing charge</th>
                  <th>pickup charge</th>
                  <th>quality check charge</th>
                  {/*<th'>single product charge*/}
                  {/*</th>*/}

                  <th>vat tax charge</th>
                  <th>Net Payable Amount</th>
                  {/* <th><button className="btn btn-sm bg-info text-black border-info mb-2" onClick={(e) => print_function(e)}>Print All</button> </th>
                             <th><CSVLink data={users} className="btn btn-sm bg-info text-black border-info mb-2" >Export csv</CSVLink></th> */}
                </tr>
              </thead>
              <tbody className="text-center border border-secondary">
                {filterallproductlist &&
                  filterallproductlist.map((singleClient, i) => {
                    let color = "bg-success text-white";
                    if (parseInt(singleClient.client_submit_amount) < 0) {
                      color = "bg-danger text-white";
                    }

                    return (
                      <tr className={color}>
                        <td data-title="Select">
                          <div className="custom-control custom-checkbox">
                            <input
                              style={{ cursor: "pointer" }}
                              type="checkbox"
                              className="custom-control-input"
                              checked={check_box_flag_state[i]}
                              value={check_box_flag_state[i]}
                              onChange={() => checkbox_click_function(i)}
                            />
                          </div>
                        </td>

                        <td
                          data-title="Client Name"
                          scope="col"
                          className="w-100"
                        >
                          <button
                            className="btn btn-sm btn-outline-primary text-white fw-bold"
                            onClick={(e) => openModal(e)}
                          >
                            {singleClient.client_name}
                          </button>
                        </td>

                        <td data-title="WayBill Number" scope="col">
                          {singleClient.product_waybill_number}
                        </td>
                        <td data-title="Order Id" scope="col">
                          {singleClient.order_id}
                        </td>
                        {/*<td scope="col" className="btn btn-outline-primary" value={singleClient.client_id} onClick={openModal}>*/}
                        {/*    {singleClient.customer_name}*/}
                        {/*</td>*/}
                        <td data-title="Inside Outside Dhaka" scope="col">
                          {singleClient.inside_outside_dhaka}
                        </td>
                        <td data-title="Payment Type" scope="col">
                          {singleClient.payment_type}
                        </td>
                        <td data-title="Cod Amount" scope="col">
                          {singleClient.cod_amount}
                        </td>
                        <td data-title="Cod Charge" scope="col">
                          {singleClient.cod_charge}
                        </td>
                        <td data-title="Product In System DateTime" scope="col">
                          {singleClient.productInsystem_dateTime}
                        </td>
                        <td data-title="Product Weight" scope="col">
                          {singleClient.product_weight}
                        </td>
                        <td data-title="Single Product Charge" scope="col">
                          {singleClient.single_product_charge}
                        </td>
                        <td data-title="Status" scope="col">
                          {singleClient.status}
                        </td>
                        <td data-title="Status DateTime" scope="col">
                          {singleClient.status_dateTime}
                        </td>

                        <td data-title="Status DateTime" scope="col">
                          {singleClient.codCofirmbyPCDatetime}
                        </td>

                        <td data-title="other charge" scope="col">
                          {singleClient.other_charge}
                        </td>

                        <td data-title="packing charge" scope="col">
                          {singleClient.packing_charge}
                        </td>
                        <td data-title="pickup charge" scope="col">
                          {singleClient.pickup_charge}
                        </td>
                        <td data-title="quality check charge" scope="col">
                          {singleClient.quality_check_charge}
                        </td>
                        {/*<td scope="col">{singleClient.single_product_charge}*/}
                        {/*</td>*/}

                        <td data-title="vat tax charge" scope="col">
                          {singleClient.vat_tex_charge}
                        </td>
                        <td data-title="Net Payable Amount" scope="col">
                          {singleClient.client_submit_amount}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>

              <div className="col-12 d-flex justify-content-center text-align-center">
                <button className="btn btn-primary  mb-3 " onClick={bridgeme}>
                  Forward
                </button>
                {/* onClick={SubmitButtonFunction} */}
                {/*  disabled={!clientName||!username||!password||!person||!clientContact||!pickuPADDRESS||!pincode||!returnaddress} */}
              </div>
            </table>

            {/*   table end here */}
          </div>
        )}

        {/* calculation table */}
        <div className="justify content center">
          {" "}
          <h3></h3>
        </div>

        {/*<div className=' table-responsive'>*/}

        {/*    <table className="table">*/}
        {/*        <thead className="bg-dark">*/}

        {/*        <tr className="text-white">*/}
        {/*            /!* <th scope="col">SL</th>*/}
        {/*            <th scope="col">*/}
        {/*                <div className="custom-control custom-checkbox">*/}
        {/*                    <input type="checkbox" className="custom-control-input" name="allSelect" onChange={(e) => select_all_function()} />*/}

        {/*                </div>*/}
        {/*            </th> *!/*/}
        {/*            <th scope="col">client name*/}
        {/*            </th>*/}
        {/*            <th scope="col">total shipment*/}
        {/*            </th>*/}
        {/*            <th scope="col">total inside dhaka shipment*/}
        {/*            </th>*/}
        {/*            <th scope="col">total outside dhaka shipment</th>*/}
        {/*            <th scope="col">total cod*/}
        {/*            </th>*/}
        {/*            <th scope="col">total delivery charge inside dhaka*/}
        {/*            </th>*/}
        {/*            <th scope="col">total delivery charge outside dhaka*/}
        {/*            </th>*/}
        {/*            <th scope="col">total delivery charge*/}
        {/*            </th>*/}
        {/*            <th scope="col">total cod charge*/}
        {/*            </th>*/}
        {/*            <th scope="col">total charge from client*/}
        {/*            </th>*/}

        {/*            /!* <th><button className="btn btn-sm bg-info text-black border-info mb-2" onClick={(e) => print_function(e)}>Print All</button> </th>*/}
        {/*             <th><CSVLink data={users} className="btn btn-sm bg-info text-black border-info mb-2" >Export csv</CSVLink></th> *!/*/}
        {/*        </tr>*/}
        {/*        </thead>*/}
        {/*        <tbody>*/}
        {/*        {*/}
        {/*            clientInfo.map((single)=>{*/}
        {/*                return(*/}
        {/*                    <tr>*/}
        {/*                        <td scope="col">{single.client_name}*/}
        {/*                        </td>*/}
        {/*                        <td scope="col">{single.total_shipment}*/}
        {/*                        </td>*/}
        {/*                        <td scope="col">{single.total_inside_dhaka_shipment}*/}
        {/*                        </td>*/}
        {/*                        <td scope="col">{single.total_outside_dhaka_shipment}</td>*/}
        {/*                        <td scope="col">{single.total_cod}*/}
        {/*                        </td>*/}

        {/*                        <td scope="col">{single.total_delevery_charge_inside_dhaka}*/}
        {/*                        </td>*/}
        {/*                        <td scope="col">{single.total_delevery_charge_outside_dhaka}*/}
        {/*                        </td>*/}
        {/*                        <td scope="col">{single.total_delevery_charge}*/}
        {/*                        </td>*/}
        {/*                        <td scope="col">{single.total_cod_charge}*/}
        {/*                        </td>*/}
        {/*                        <td scope="col">{single.total_charge_from_client}*/}
        {/*                        </td>*/}

        {/*                    </tr>*/}

        {/*                )*/}
        {/*            })*/}
        {/*        }*/}

        {/*        </tbody>*/}
        {/*    </table>*/}

        {/*</div>*/}
      </div>

      <Modal
        isOpen={modalproductIsOpen}
        style={customStyles1}
        onRequestClose={closeProductModal}
        closeTimeoutMS={200}
        contentLabel="Example Modal"
      >
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
          onClick={closeProductModal}
        >
          Cancel
        </button>
        <h4>General Info</h4>
        <div id="no-more-tables" className="table-responsive-sm">
          <CSVLink
            data={filteredclientInfo && filteredclientInfo}
            filename={`GeneralClient info${getCurrentTime()}.csv`}
            className="btn btn-sm bg-info text-black border-info mb-2 rounded-pill"
          >
            Export csv
          </CSVLink>
          <div className="input-group  input-icons">
            <i className="icon ">{searchIcon}</i>
            <input
              type="search"
              name=""
              id=""
              placeholder="Client Name"
              className="rounded-pill px-5 py-2  input-field"
              style={{
                width: "-webkit-fill-available",
                textAlign: "start",
                marginLeft: "15px",
                boxShadow: "2px 3px 3px 1px #00000059",
                outline: "none",
                border: "none",
              }}
              value={searchTerm2}
              onChange={handleonChange2}
            />
          </div>
          {/*<div className="col-1 d-flex justify-content-center text-align-center">*/}
          {/*    <button*/}
          {/*        className="btn btn-primary  mb-3 "*/}
          {/*        onClick={(e) => SubmitButtonFunction(e)}*/}
          {/*    >*/}
          {/*        Submit*/}
          {/*    </button>*/}
          {/*    /!* onClick={SubmitButtonFunction} *!/*/}
          {/*    /!*  disabled={!clientName||!username||!password||!person||!clientContact||!pickuPADDRESS||!pincode||!returnaddress} *!/*/}
          {/*</div>*/}

          {/* <div className="">
                        <button className="btn btn-sm me-2 bg-info text-black border-info mb-2" onClick={(e) => print_function(e)}>Print All</button>
                        <CSVLink data={users} className="btn btn-sm bg-info text-black border-info mb-2" >Export csv</CSVLink>
                    </div> */}
          <table
            className="col-md-12 table-bordered table-striped table-condensed cf bg-white"
            style={{ fontSize: "13px" }}
          >
            <thead
              className="text-center"
              style={{ backgroundColor: "#f1f1f1" }}
            >
              <tr className="text-black">
                {/* <th scope="col">SL</th>
                            <th scope="col">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" name="allSelect" onChange={(e) => select_all_function()} />

                                </div>
                            </th> */}
                <th scope="col">client name</th>
                <th scope="col">total shipment</th>
                <th scope="col">total inside dhaka shipment</th>
                <th scope="col">total outside dhaka shipment</th>
                <th scope="col">total cod</th>
                <th scope="col">total delivery charge inside dhaka</th>
                <th scope="col">total delivery charge outside dhaka</th>
                <th scope="col">total delivery charge</th>
                <th scope="col">total cod charge</th>
                <th scope="col">total charge from client</th>

                {/* <th><button className="btn btn-sm bg-info text-black border-info mb-2" onClick={(e) => print_function(e)}>Print All</button> </th>
                             <th><CSVLink data={users} className="btn btn-sm bg-info text-black border-info mb-2" >Export csv</CSVLink></th> */}
              </tr>
            </thead>
            <tbody className="text-center">
              {filteredclientInfo &&
                filteredclientInfo.map((single) => {
                  return (
                    <tr>
                      <td scope="col">{single.client_name}</td>
                      <td scope="col">{single.total_shipment}</td>
                      <td scope="col">{single.total_inside_dhaka_shipment}</td>
                      <td scope="col">{single.total_outside_dhaka_shipment}</td>
                      <td scope="col">{single.total_cod}</td>

                      <td scope="col">
                        {single.total_delevery_charge_inside_dhaka}
                      </td>
                      <td scope="col">
                        {single.total_delevery_charge_outside_dhaka}
                      </td>
                      <td scope="col">{single.total_delevery_charge}</td>
                      <td scope="col">{single.total_cod_charge}</td>
                      <td scope="col">{single.total_charge_from_client}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </Modal>

      {/*    nonreconciled product modal here*/}

      <Modal
        isOpen={modalnonproductIsOpen}
        style={customStyles2}
        onRequestClose={closenonProductModal}
        closeTimeoutMS={200}
        contentLabel="Example Modal"
      >
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
          onClick={closenonProductModal}
        >
          Cancel
        </button>
        <h4>Nonreconciled shipment </h4>
        <div id="no-more-tables" className="table-responsive-sm">
          <CSVLink
            data={filternonreconcileproduct && filternonreconcileproduct}
            filename={`ReconciledProduct${getCurrentTime()}.csv`}
            className="btn btn-sm bg-info text-black border-info mb-2 rounded-pill"
          >
            Export csv
          </CSVLink>
          <div className="input-group  input-icons">
            <i className="icon ">{searchIcon}</i>
            <input
              type="search"
              name=""
              id=""
              placeholder="Waybill, Client Name"
              className="rounded-pill px-5 py-2  input-field"
              style={{
                width: "-webkit-fill-available",
                textAlign: "start",
                marginLeft: "15px",
                boxShadow: "2px 3px 3px 1px #00000059",
                outline: "none",
                border: "none",
              }}
              value={searchTerm1}
              onChange={handleonChange1}
            />
          </div>
          {/*<div className="col-1 d-flex justify-content-center text-align-center">*/}
          {/*    <button*/}
          {/*        className="btn btn-primary  mb-3 "*/}
          {/*        onClick={(e) => SubmitButtonFunction(e)}*/}
          {/*    >*/}
          {/*        Submit*/}
          {/*    </button>*/}
          {/*    /!* onClick={SubmitButtonFunction} *!/*/}
          {/*    /!*  disabled={!clientName||!username||!password||!person||!clientContact||!pickuPADDRESS||!pincode||!returnaddress} *!/*/}
          {/*</div>*/}

          {/* <div className="">
                        <button className="btn btn-sm me-2 bg-info text-black border-info mb-2" onClick={(e) => print_function(e)}>Print All</button>
                        <CSVLink data={users} className="btn btn-sm bg-info text-black border-info mb-2" >Export csv</CSVLink>
                    </div> */}
          <table
            className="col-md-12 table-bordered table-striped table-condensed cf bg-white"
            style={{ fontSize: "13px" }}
          >
            <thead
              className="text-center"
              style={{ backgroundColor: "#f1f1f1" }}
            >
              <tr className="text-black">
                {/* <th scope="col">SL</th>
                            <th scope="col">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" name="allSelect" onChange={(e) => select_all_function()} />

                                </div>
                            </th> */}
                <th scope="col">Client</th>
                <th scope="col">Waybill</th>
                <th scope="col">Order Id</th>
                <th scope="col">Customer name</th>
                <th scope="col">Payment</th>
                <th scope="col">COD</th>
                <th scope="col">Submit Amount</th>
                <th scope="col">COD Charge</th>
                <th scope="col">Pickup Charge</th>
                <th scope="col">Single Product Charge</th>
                <th scope="col">Weight</th>
                <th scope="col">Status</th>

                {/* <th><button className="btn btn-sm bg-info text-black border-info mb-2" onClick={(e) => print_function(e)}>Print All</button> </th>
                             <th><CSVLink data={users} className="btn btn-sm bg-info text-black border-info mb-2" >Export csv</CSVLink></th> */}
              </tr>
            </thead>
            <tbody className="text-center">
              {filternonreconcileproduct &&
                filternonreconcileproduct.map((single) => {
                  return (
                    <tr>
                      <td scope="col">{single.client_name}</td>
                      <td scope="col">{single.product_waybill_number}</td>
                      <td scope="col">{single.order_id}</td>
                      <td scope="col">{single.customer_name}</td>
                      <td scope="col">{single.payment_type}</td>
                      <td scope="col">{single.cod_amount}</td>
                      <td scope="col">{single.client_submit_amount}</td>

                      <td scope="col">{single.cod_charge}</td>
                      <td scope="col">{single.pickup_charge}</td>
                      <td scope="col">{single.single_product_charge}</td>
                      <td scope="col">{single.product_weight}</td>
                      <td scope="col">{single.status}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </Modal>
    </>
  );
};
export default FinancialHomeTable;
