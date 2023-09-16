import React, { useState, useEffect, useContext } from "react";
import reactDom from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { SearchContext } from "../../Context/searchContext";
import { SearchButtonContext } from "../../Context/buttonContext";
import BarCode, { useBarcode } from "react-barcode";
import { jsPDF } from "jspdf";
import { CSVLink, CSVDownload } from "react-csv";
import "./sc.css";
import "./table.css";
import { toast } from "react-toastify";
import Modal from "react-modal";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
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
Modal.setAppElement("#root");

export default function ReturnPcBagTable(props) {
  toast.configure();
  let json_information = props.response;
  const [returnbag, setreturnbag] = useState([]);
  const [returnbag1, setreturnbag1] = useState([]);
  const [reroutebag, setreroutebag] = useState([]);
  const [data, setdata] = useState([]);
  const [bagtype, setbagtype] = useState("");
  const [waybill, setwaybill] = useState([]);
  const [SubmitFlag, setSubmitFlag] = useState(false);
  const [infoModalOpen, setinfoModalOpen] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalproductIsOpen, setmodalproductIsOpen] = useState(false);
  const [information, setinformation] = useState({});
  const [productlist, setproductlist] = useState("");
  const [inputs, setinputs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchresult, setsearchresult] = useState("");

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

  useEffect(() => {
    setreturnbag(json_information?.message);

    let reroute = [];
    let return1 = [];
    if (json_information.message !== "You are not Authorized.") {
      json_information.message.map((single) => {
        console.log("this is single bag", single);
        if (single.baG_TYPE === "Reroute") {
          reroute.push(single);
        } else {
          return1.push(single);
        }
      });
    }
    setreturnbag1(return1);
    setreroutebag(reroute);

    // setsearchresult(json_information.message)
  }, []);

  console.log("this is return pc bag in returnpcbagtable", returnbag);
  //reroute product list
  // useEffect(() => {
  //   let reroute = [];
  //   let return1 = [];
  //   if (returnbag.length == -1) {
  //     returnbag.map((single) => {
  //       console.log("this is single bag",single)
  //       if (single.baG_TYPE === "Reroute") {
  //         reroute.push(single);
  //       } else {
  //         return1.push(single);
  //       }
  //     });
  //   }
  //   setreturnbag1(return1);
  //   setreroutebag(reroute);
  // }, []);

  console.log("this is reroute bag list", reroutebag);
  console.log("this is return bag list", returnbag1);

  const bagtypeselect = (e) => {
    console.log("selected bagtype in pc", e.target.value);
    setbagtype(e.target.value);
  };

  useEffect(() => {
    //setdata(returnbag)
    if (bagtype === "None") {
      setdata(json_information.message);
    } else if (bagtype === "Reroute") {
      setdata(reroutebag);
    } else {
      setdata(returnbag1);
    }
    // bagtype==="Reroute"?setdata(reroutebag):setdata(returnbag1)
  }, [bagtype]);
  // modal
  function openModal(e, way) {
    console.log("waybill", way);

    setwaybill(way);
    //setSubmitFlag(!SubmitFlag)
    setIsOpen(true);
  }
  function closeInvoiceModal() {
    setIsOpen(false);
  }
  function closeProductModal() {
    setmodalproductIsOpen(false);
  }
  function closeModal() {
    setIsOpen(false);
  }
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
      top: "50%",
      left: "50%",
      right: "50%",
      bottom: "50%",
      // marginRight: '-50%',
      // transform: 'translate(-50%, -50%)',
      color: "orange",
      position: "relative",
      height: "25vh",
      width: "25vw",

      // top: '50px',
      // left: '20%',
      // right: '40px',
      // bottom: '20px',
      border: "1px solid #ccc",
      background: "#fff",
      overflow: "auto",
      // WebkitOverflowScrolling: 'touch',
      borderRadius: "4px",
      outline: "none",
      padding: "20px",
    },
  };

  function receiveproduct() {
    setSubmitFlag(!SubmitFlag);
    setIsOpen(false);
  }

  // universalapi/allapi/receiveReturnedProductBagbyPC

  useEffect(() => {
    // e.preventDefault();
    var axios = require("axios");

    var data = JSON.stringify({
      pc_id: logingInformation_LocalStore.all_user_list.employeE_ID,
      bag_waybill_list: [waybill],
      // "bag_waybill_list":
      //     ["211122BA43929"],
      date_time: getCurrentTime(),
    });

    console.log("this is data : ", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/receiveReturnedProductBagbyPC" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/receiveReturnedProductBagbyPC" +
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
        //  toast.success("SuccessFully Forworded", {
        //      position: toast.POSITION.TOP_CENTER, autoClose: 1500
        //  }
        //  );
        //setUsers(response.data.all_product_list)
        // console.log("successfully forworded");
        return response.data;
      })
      .then((res) => {
        console.log("new response return", res);
        if (res.status == "Failed Request.") {
          toast.info("Already Confirmed", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
          return;
        }
        setproductlist(res.message.receiveBagbyDC_Product_Info_Classes_list);
        setmodalproductIsOpen(true);
        //setinfoData(res.data.message)

        //setinfoModalOpen(true);

        //setpayload(true);
      })
      .catch(function (error) {
        // Error
        //  if (error.response) {
        //      toast.error("Error!", {
        //          position: toast.POSITION.TOP_CENTER, autoClose: 1500
        //      });

        //  } else if (error.request) {
        //      toast.error(" Request Error!", {
        //          position: toast.POSITION.TOP_CENTER, autoClose: 1500
        //      });
        //      console.log(error.request);
        //  } else {

        //      console.log('Error', error.message);
        //  }
        console.log(error.config);
      });

    //setpickupFlag(pickupFlag => !pickupFlag);
  }, [SubmitFlag, logingInformation_LocalStore]);

  console.log("this is way bill", waybill);
  // modal end
  // selecting product

  let check_box_flag = [];
  const [check_box_flag_state, setcheck_box_flag_state] = useState([]);
  //let select_all_check_box_flag;
  const [select_all_check_box_flag, setselect_all_check_box_flag] =
    useState(false);
  let count_number = productlist.length;
  for (let i = 0; i < count_number; i++) {
    check_box_flag.push(false);
  }

  useEffect(() => {
    setcheck_box_flag_state(check_box_flag);
  }, []);

  let checkbox_click_function = (index_value) => {
    let count_number = productlist.length;
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
      let count_number = productlist.length;
      for (let i = 0; i < count_number; i++) {
        temp_check_box.push(false);
      }
    } else {
      let count_number = productlist.length;
      for (let i = 0; i < count_number; i++) {
        temp_check_box.push(true);
      }
    }
    setcheck_box_flag_state(temp_check_box);
  }, [select_all_check_box_flag]);

  let SubmitButtonFunction = (e) => {
    e.preventDefault();
    let inputs1 = [];
    productlist.map(async (data, list_index) => {
      if (check_box_flag_state[list_index]) {
        let elem = data.producT_WAYBILL_NUMBER;
        inputs1.push(elem);
      }
    });
    console.log("this is input after function call input", inputs1);
    setinputs(inputs1);
    // setpageRefreshFlag(false);
  };

  // confirm return api

  useEffect(() => {
    if (inputs.length > 0) {
      var axios = require("axios");

      var data = JSON.stringify({
        dc_id: logingInformation_LocalStore.all_user_list.employeE_ID,
        bag_waybill_number: waybill,
        //   211122BA43929 waybill
        date_time: getCurrentTime(),
        conferm_product_list: inputs,
        lost_product_list: [],
        damaged_product_list: [],
      });

      console.log("single product : ", data);

      var config = {
        method: "post",
        url: Degital_Ocean_flag
          ? "https://e-deshdelivery.com/universalapi/allapi/confermReturnBagProducts" +
            "?company_name=" +
            company_name
          : "/universalapi/allapi/confermReturnBagProducts" +
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
          toast.success("SuccessFully confirmed!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
          console.log("Successfully api called : ", response);
          return response;
        })
        .then((res) => {
          console.log("new response", res);
          //setalldata(res.data.update_list.all_product_info);

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
  const handleonChange = (event) => {
    setSearchTerm(event.target.value);
  };
  React.useEffect(() => {
    //json_information.message

    const results = data.filter(
      (p) =>
        p.baG_WAYBILL_NUMBER
          .toString()
          .toLowerCase()
          .includes(searchTerm.toString().toLowerCase()) ||
        p.baG_ID_NUMBER
          .toString()
          .toLowerCase()
          .includes(searchTerm.toString().toLowerCase())
    );
    setsearchresult(results);
  }, [searchTerm, data]);

  return (
    <div>
      {/* modal start */}

      <div className="bordered">
        {/* Invoice modal */}
        <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          onRequestClose={closeInvoiceModal}
          closeTimeoutMS={200}
          contentLabel="Example Modal"
        >
          {/* <button className="btn btn-outline-danger mb-2" onClick={closeInvoiceModal}>close</button> */}
          {/* <div className="justify-content-center">
                            <h4>Confirm Submit</h4>
                            <button className="btn btn-outline-success mb-2" onClick={closeInvoiceModal}>Confirm</button>
                            <button className="btn btn-outline-danger mb-2 ml-2" onClick={closeInvoiceModal}>Cancel</button>

                        </div> */}

          <div className="">
            <div className="">
              <div className="">
                <h5 className="" id="exampleModalLabel">
                  Confirm
                </h5>
                {/* <button type="button" className="btn-close"  onClick={closeInvoiceModal}>close</button> */}
              </div>
              {/* <div className="modal-body">
                                    <p>Please confirm</p>
                                </div> */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={closeInvoiceModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={receiveproduct}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>

      {/* <div className="">
        <form className="row d-flex justify-content-center" id="">

          <div className=" col-md-4 col-sm-4 w-25 form-group mx-3 mt-2">
            <div className=" text-center text-black mx-1">
              <label>Select Bag Type</label>
            </div>

            <select
              className="form-select "
              id="paymenttype"
              onChange={bagtypeselect}
            >
              <option selected value="None">
                None
              </option>
              <option value="Return">Return</option>
              <option value="Reroute">Reroute</option>
            </select>
          </div>
        </form>
      </div> */}

      <div className="row">
        <div
          className="col-lg-6 col-md-12 col-11 mb-4 p-3 ms-3 rounded"
          style={{ backgroundColor: "#C5D5E4" }}
        >
          <div className="row">
            <div className="col-12 col-md-4 col-lg-3">
              <p className="">Select Bag Type:</p>
            </div>
            <div className="col-12 col-md-8 col-lg-9">
              {" "}
              <select
                style={{
                  // backgroundColor: "#C5D5E4",
                  outline: "none",
                  border: "none",
                  padding: "7px",
                  borderRadius: "8px",
                  width: "85%",
                }}
                id="paymenttype"
                onChange={bagtypeselect}
              >
                <option selected value="None">
                  None
                </option>
                <option value="Return">Return</option>
                <option value="Reroute">Reroute</option>
              </select>
            </div>
          </div>
          {/* <p className="w-25">Select Bag Type:</p> */}
          {/* <input
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
            </datalist> */}
        </div>
      </div>

      {/*className=" col-lg-4 col-sm-4 w-25 form-group mx-3 mt-2"*/}
      {/*<div className="row col-lg-8">*/}

      {/*    <div className="col align-self-center w-25">*/}
      {/*        <div className=" text-center text-black mx-1">*/}
      {/*            <label >Select Bag Type</label>*/}
      {/*        </div>*/}
      {/*        /!*onChange={bagtypeselect}*!/*/}

      {/*        <select className="form-select " id="paymenttype"  onChange={bagtypeselect}>*/}
      {/*            <option value="Return">Return</option>*/}
      {/*            <option selected value="Reroute">Reroute</option>*/}
      {/*        </select>*/}
      {/*    </div>*/}

      {/*</div>*/}
      {/*
      <div className="col-sm-4 form-group mx-3 m-2">
        <div className="input-group">
          Bag Filter:
          <input
            type="text"
            className="form-control mx-2 shadow"
            placeholder="Waybill or Bag ID"
            value={searchTerm}
            onChange={handleonChange}
          />

        </div>
      </div> */}

      <div className="row">
        <div className="col-lg-6 col-md-8 col-12 mb-3">
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
            placeholder="Waybill or Bag ID"
            value={searchTerm}
            onChange={handleonChange}
          />
        </div>
      </div>
      {/* modal end */}
      <div id="no-more-tables">
        {/* <div className="">
                        <button className="btn btn-sm me-2 bg-info text-black border-info mb-2" onClick={(e) => print_function(e)}>Print All</button>
                        <CSVLink data={users} className="btn btn-sm bg-info text-black border-info mb-2" >Export csv</CSVLink>
                    </div> */}
        <table
          className="table bg-white"
          style={{ fontSize: "13px", marginLeft: "1px" }}
        >
          <thead
            className="text-center shadow sticky-top "
            style={{ backgroundColor: "#b4bec2", top: "60px", zIndex: "0" }}
          >
            <tr className="text-dark" style={{ border: "none" }}>
              {/* <th scope="col">Select
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" name="allSelect" onChange={(e) => select_all_function()} />

                                    </div>
                                </th> */}
              <th>Bag ID</th>
              <th>Bag Waybill</th>
              <th>Bag Type</th>
              <th>Bag Creation Center</th>
              <th>Bag Description</th>
              <th>Bag Destination Center</th>
              <th>Bag Receiver ID</th>
              <th>Bag Vehicle ID</th>
              <th>Number Of Packages in Bag</th>
              <th>Total Value of Bag</th>

              {/* <th>Print<button className="btn btn-sm bg-info text-black border-info mb-2" onClick={(e) => print_function(e)}>Print All</button> </th>
                                <th>ex<CSVLink data={users} className="btn btn-sm bg-info text-black border-info mb-2" >Export csv</CSVLink></th> */}
            </tr>
          </thead>
          <tbody className="text-center border border-dark">
            {searchresult &&
              searchresult.map((single_message) => {
                return (
                  <>
                    {
                      <tr key={single_message.waybill_number}>
                        {/* <td data-title="Select">
                                                        <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" checked={check_box_flag_state[i]} value={check_box_flag_state[i]} onChange={() => checkbox_click_function(i)} />

                                                        </div>
                                                    </td> */}

                        <td data-title="WayBill Number">
                          {single_message.baG_ID_NUMBER}
                        </td>

                        <td data-title="Client Name">
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={(e) =>
                              openModal(e, single_message.baG_WAYBILL_NUMBER)
                            }
                          >
                            {single_message.baG_WAYBILL_NUMBER}
                          </button>
                        </td>
                        <td data-title=" Consignee Name">
                          {single_message.baG_TYPE}
                        </td>
                        <td data-title="Product Details">
                          {single_message.baG_CRATION_CENTER}
                        </td>
                        <td data-title="Dc Office Name">
                          {single_message.baG_DESCRIPTION}
                        </td>
                        <td data-title="Pin Code">
                          {single_message.baG_DESTINATION_CENTER}
                        </td>
                        <td data-title="Product Value">
                          {single_message.baG_RECEIVER_ID}{" "}
                        </td>
                        <td data-title="Product Weight">
                          {single_message.baG_VEHICLE_ID}
                        </td>
                        <td data-title="product Status">
                          {single_message.numbeR_OF_PACKAGES_IN_BAG}{" "}
                        </td>
                        <td data-title="product status datetime">
                          {single_message.totaL_VALUE_OF_BAG}
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

      {/*product modal start here */}

      {/*<Modal*/}
      {/*    isOpen={modalproductIsOpen}*/}
      {/*    style={customStyles1}*/}
      {/*    onRequestClose={closeProductModal}*/}
      {/*    closeTimeoutMS={200}*/}
      {/*    contentLabel="Example Modal"*/}
      {/*>*/}
      {/*    <button*/}
      {/*        type="button"*/}
      {/*        className="btn btn-secondary"*/}
      {/*        data-bs-dismiss="modal"*/}
      {/*        onClick={closeProductModal}*/}
      {/*    >*/}
      {/*        Cancel*/}
      {/*    </button>*/}
      {/*    <h4>Product Details</h4>*/}
      {/*    <div id="no-more-tables" className="table-responsive-sm">*/}
      {/*        <div className="col-1 d-flex justify-content-center text-align-center">*/}
      {/*            <button*/}
      {/*                className="btn btn-primary  mb-3 "*/}
      {/*                onClick={(e) => SubmitButtonFunction(e)}*/}
      {/*            >*/}
      {/*                Submit*/}
      {/*            </button>*/}

      {/*            /!* onClick={SubmitButtonFunction} *!/*/}
      {/*            /!*  disabled={!clientName||!username||!password||!person||!clientContact||!pickuPADDRESS||!pincode||!returnaddress} *!/*/}
      {/*        </div>*/}

      {/*        <ReactHTMLTableToExcel*/}
      {/*            className="js-download-link button btn btn-info btn-sm px-4 mx-2 rounded-pill"*/}
      {/*            table="returnpccontab"*/}
      {/*            filename={`Report${getCurrentTime()}`}*/}
      {/*            sheet="Sheet"*/}
      {/*            buttonText="Export excel"*/}
      {/*        />*/}

      {/*        <div className="">*/}
      {/*            /!*<button className="btn btn-sm me-2 bg-info text-black border-info mb-2" onClick={(e) => print_function(e)}>Print All</button>*!/*/}
      {/*            <CSVLink data={productlist} className="btn btn-sm bg-info text-black border-info mb-2" >Export csv</CSVLink>*/}
      {/*        </div>*/}
      {/*        <table*/}
      {/*            className="col-md-12 table-bordered table-striped table-condensed cf css-serial bg-white" id="returnpccontab"*/}
      {/*            style={{ fontSize: "13px" }}*/}
      {/*        >*/}
      {/*            <thead*/}
      {/*                className="text-center"*/}
      {/*                style={{ backgroundColor: "#f1f1f1" }}*/}
      {/*            >*/}
      {/*            <tr className="text-dark" style={{ border: "none" }}>*/}
      {/*                <th scope="col">*/}
      {/*                    Select*/}
      {/*                    <div className="custom-control custom-checkbox">*/}
      {/*                        <input*/}
      {/*                            type="checkbox"*/}
      {/*                            className="custom-control-input"*/}
      {/*                            name="allSelect"*/}
      {/*                            onChange={(e) => select_all_function()}*/}
      {/*                        />*/}
      {/*                    </div>*/}
      {/*                </th>*/}
      {/*                <th>ID </th>*/}
      {/*                <th>Waybill</th>*/}
      {/*                <th>Ref. NO.</th>*/}
      {/*                <th>Name</th>*/}
      {/*                <th>Details</th>*/}
      {/*                <th>Consignee Name</th>*/}
      {/*                <th>Address</th>*/}
      {/*                <th>Pincode</th>*/}
      {/*                <th>Area Code</th>*/}
      {/*                <th>Contact Number</th>*/}
      {/*                <th>Processing Status</th>*/}
      {/*                <th>Processing Status Datetime</th>*/}

      {/*                /!* <th>Print<button className="btn btn-sm bg-info text-black border-info mb-2" onClick={(e) => print_function(e)}>Print All</button> </th>*/}
      {/*                    <th>ex<CSVLink data={users} className="btn btn-sm bg-info text-black border-info mb-2" >Export csv</CSVLink></th> *!/*/}
      {/*            </tr>*/}
      {/*            </thead>*/}
      {/*            <tbody className="text-center">*/}
      {/*            {productlist &&*/}
      {/*                productlist.map((single_message, i) => {*/}
      {/*                    return (*/}
      {/*                        <>*/}
      {/*                            {*/}
      {/*                                <tr key={single_message.waybill_number}>*/}
      {/*                                    <td data-title="Select">*/}
      {/*                                        <div className="custom-control custom-checkbox">*/}
      {/*                                            <input*/}
      {/*                                                type="checkbox"*/}
      {/*                                                className="custom-control-input"*/}
      {/*                                                checked={check_box_flag_state[i]}*/}
      {/*                                                value={check_box_flag_state[i]}*/}
      {/*                                                onChange={() => checkbox_click_function(i)}*/}
      {/*                                            />*/}
      {/*                                        </div>*/}
      {/*                                    </td>*/}

      {/*                                    <td data-title="WayBill Number">*/}
      {/*                                        {single_message.producT_ID}*/}
      {/*                                    </td>*/}

      {/*                                    <td data-title="Client Name">*/}
      {/*                                        {single_message.producT_WAYBILL_NUMBER}*/}
      {/*                                    </td>*/}

      {/*                                    <td data-title="Product Details">*/}
      {/*                                        {single_message.referencE_NO}*/}
      {/*                                    </td>*/}
      {/*                                    <td data-title="Dc Office Name">*/}
      {/*                                        {single_message.producT_NAME}*/}
      {/*                                    </td>*/}
      {/*                                    <td data-title="Pin Code">*/}
      {/*                                        {single_message.producT_DETAILS}*/}
      {/*                                    </td>*/}
      {/*                                    <td data-title="Product Value">*/}
      {/*                                        {single_message.consigneE_NAME}{" "}*/}
      {/*                                    </td>*/}
      {/*                                    <td data-title="Product Weight">*/}
      {/*                                        {single_message.address}*/}
      {/*                                    </td>*/}
      {/*                                    <td data-title="product Status">*/}
      {/*                                        {single_message.pincode}{" "}*/}
      {/*                                    </td>*/}
      {/*                                    <td data-title="product status datetime">*/}
      {/*                                        {single_message.areA_CODE}*/}
      {/*                                    </td>*/}
      {/*                                    <td data-title="product status datetime">*/}
      {/*                                        {single_message.contacT_NUMBER}*/}
      {/*                                    </td>*/}
      {/*                                    <td data-title="product status datetime">*/}
      {/*                                        {single_message.producT_PROCESSING_STATUS}*/}
      {/*                                    </td>*/}
      {/*                                    <td data-title="product status datetime">*/}
      {/*                                        {single_message.producT_PRODESSING_STATUS_DATETIME}*/}
      {/*                                    </td>*/}
      {/*                                    /!* onClick ={ JsBarcode("#code128",single_message.waybill_number)}  *!/*/}
      {/*                                    /!* <td><button className="btn btn-sm bg-dark text-white border-dark mb-2"   >Print</button></td> *!/*/}
      {/*                                </tr>*/}
      {/*                            }*/}
      {/*                        </>*/}
      {/*                    );*/}
      {/*                })}*/}
      {/*            </tbody>*/}
      {/*        </table>*/}
      {/*    </div>*/}
      {/*</Modal>*/}
    </div>
  );
}
