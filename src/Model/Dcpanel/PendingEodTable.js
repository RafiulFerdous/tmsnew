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
import { toast } from "react-toastify";
import { getCurrentTime } from "../../Common/common";

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

export default function PendingEodTable(props) {
  toast.configure();
  const [eod, seteod] = useState([]);
  const [filtereod, setfiltereod] = useState("");
  const [infoModalOpen, setinfoModalOpen] = useState(false);
  const [confirmeod, setconfirmeod] = useState("");
  var { loginInformation, setloginInformation } = useContext(LoginContext);

  const [searchTerm, setSearchTerm] = React.useState([]);

  const handleonChange = (event) => {
    setSearchTerm(event.target.value);
  };

  console.log(eod);

  const [logingInformation_LocalStore, setlogingInformation_LocalStore] =
    useState(loginInformation);
  const [siteBarInformation_LocalStore, setsiteBarInformation_LocalStore] =
    useState([]);
  const [employId, setemployId] = useState("");

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

  useEffect(() => {
    seteod(
      props.response.delevered_product_list
        .concat(props.response.holded_product_list)
        .concat(props.response.insystem_product_list)
        .concat(props.response.lost_product_list)
        .concat(props.response.return_product_list)
    );
  }, []);
  let check_box_flag = [];
  const [check_box_flag_state, setcheck_box_flag_state] = useState([]);
  //let select_all_check_box_flag;
  const [select_all_check_box_flag, setselect_all_check_box_flag] =
    useState(false);
  let count_number = filtereod.length;
  for (let i = 0; i < count_number; i++) {
    check_box_flag.push(false);
  }

  useEffect(() => {
    setcheck_box_flag_state(check_box_flag);
  }, []);

  let checkbox_click_function = (index_value) => {
    let count_number = filtereod.length;

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
      let count_number = filtereod.length;
      for (let i = 0; i < count_number; i++) {
        temp_check_box.push(false);
      }
    } else {
      let count_number = filtereod.length;
      for (let i = 0; i < count_number; i++) {
        temp_check_box.push(true);
      }
    }
    setcheck_box_flag_state(temp_check_box);
  }, [select_all_check_box_flag]);
  function closeInvoiceModal() {
    setinfoModalOpen(false);
  }
  function submit() {
    console.log("this is fun call");
    let inputs1 = [];
    filtereod.map(async (data, list_index) => {
      if (check_box_flag_state[list_index]) {
        inputs1.push(data.waybill_number);
      }
    });
    setconfirmeod(inputs1);
    console.log("Input", inputs1);
  }
  useEffect(() => {
    // if (inputs.length === 0) return

    let data = JSON.stringify({
      dc_id: logingInformation_LocalStore.all_user_list.employeE_ID,
      product_waybill_list: confirmeod,
      current_datetime: getCurrentTime(),
    });

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/feEODComplete" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/feEODComplete" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: data,
    };
    console.log("this is data", data);
    console.log("this is config", config);

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        return json_object;
      })
      .then((res) => {
        console.log("response is confirmation", res);
        // setfelist(res.message);
        // setpayload(true);
        toast.success(res.status, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    closeInvoiceModal();
  }, [confirmeod]);

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

  React.useEffect(() => {
    const results =
      eod &&
      eod.filter(
        (p) =>
          (p.fe_name &&
            p.fe_name
              .toString()
              .toLowerCase()
              .includes(searchTerm.toString().toLowerCase())) ||
          p.waybill_number
            .toString()
            .toLowerCase()
            .includes(searchTerm.toString().toLowerCase()) ||
          p.order_id
            .toString()
            .toLowerCase()
            .includes(searchTerm.toString().toLowerCase())
      );
    setfiltereod(results);
  }, [eod, searchTerm]);

  return (
    <>
      <div id="pendingeod">
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
              <h4>Confirm Eod</h4>
            </div>
            <div className="d-flex mt-4 justify-content-center">
              <button className="btn btn-outline-success mb-2" onClick={submit}>
                Submit
              </button>
            </div>
          </Modal>
        </div>

        <div id="no-more-tables">
          <div className="row mb-2">
            <div className="col-lg-6 col-md-6 col-12">
              <CSVLink
                data={filtereod && filtereod}
                className="btn btn-sm btn-dark px-4 me-3 mb-2"
              >
                Export csv
              </CSVLink>
              {/* <button
                className="btn btn-sm me-2 bg-info text-black border-info ms-2 mb-2"
                onClick={(e) => setinfoModalOpen(true)}
              >
                Confirm Eod
              </button> */}
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="row">
                <div className="col-12 col-md-4 col-lg-3">
                  <p className=""> Search:</p>
                </div>
                <div className="col-12 col-md-8 col-lg-9">
                  {" "}
                  <input
                    style={{
                      //   backgroundColor: "#C5D5E4",
                      outline: "none",
                      border: "none",
                      padding: "7px",
                      borderRadius: "8px",
                      width: "100%",
                    }}
                    type="text"
                    className="form-control mx-2 border-warning border"
                    placeholder="Waybill Order ID FE Name"
                    value={searchTerm}
                    onChange={handleonChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/*search option*/}

          {/* <div className="col-sm-4 form-group mx-auto mt-2">
            <div className="input-group">
              Search:
              <input
                type="text"
                className="form-control mx-2 border-warning border"
                placeholder="Type here......."
                value={searchTerm}
                onChange={handleonChange}
              />

            </div>
          </div>

          <div className="">

            <CSVLink
              data={filtereod && filtereod}
              className="btn btn-sm bg-info text-black border-info mb-2"
            >
              Export csv
            </CSVLink>
          </div>
          <div className="">
            <button
              className="btn btn-sm me-2 bg-info text-black border-info mb-2"
              onClick={(e) => setinfoModalOpen(true)}
            >
              Confirm Eod
            </button>
          </div> */}
          <table
            className="table bg-white"
            style={{ fontSize: "13px", marginLeft: "1px" }}
            id="dctable"
          >
            <thead
              className="text-center shadow sticky-top "
              style={{ backgroundColor: "#b4bec2", top: "60px", zIndex: "0" }}
            >
              <tr className="text-dark" style={{ border: "none" }}>
                {/* <th>SL</th> */}
                {/* <th scope="col">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      name="allSelect"
                      disabled={eod.filter(
                        (status) =>
                          status.product_status === "Product Assign to FE"
                      )}
                      onChange={(e) => select_all_function()}
                    />
                  </div>
                </th> */}

                <th>WAYBILL</th>
                <th>Order Id</th>
                <th>Consignee</th>
                <th>Status</th>

                <th>Dc </th>
                <th>Fe </th>
                <th>Date Time </th>

                {/* <th>Print<button className="btn btn-sm bg-info text-black border-info mb-2" onClick={(e) => print_function(e)}>Print All</button> </th>
                                <th>ex<CSVLink data={users} className="btn btn-sm bg-info text-black border-info mb-2" >Export csv</CSVLink></th> */}
              </tr>
            </thead>

            <tbody className="text-center border border-dark">
              {filtereod &&
                filtereod.map((single_message, i) => {
                  return (
                    <>
                      {select_all_check_box_flag ? (
                        <tr>
                          {/* <td data-title="SL" className="css-serial"></td> */}
                          {/* <td data-title="Select">
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                disabled={
                                  single_message.product_status ===
                                  "Product Assign to FE"
                                    ? true
                                    : false
                                }
                                checked={
                                  single_message.product_status ===
                                  "Product Assign to FE"
                                    ? false
                                    : check_box_flag_state[i]
                                }
                                // checked={check_box_flag_state[i]}
                                value={check_box_flag_state[i]}
                                onChange={() => checkbox_click_function(i)}
                              />
                            </div>
                          </td> */}

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
                            {single_message.product_status}
                          </td>
                          <td data-title="status">
                            {single_message.dc_employee_name}
                          </td>
                          <td data-title="status">{single_message.fe_name}</td>
                          <td data-title="status">
                            {single_message.eod_start_datetime}
                          </td>

                          {/* onClick ={ JsBarcode("#code128",single_message.waybill_number)}  */}
                          {/* <td><button className="btn btn-sm bg-dark text-white border-dark mb-2"   >Print</button></td> */}
                        </tr>
                      ) : (
                        <tr>
                          {/* <td data-title="SL" className="css-serial"></td> */}
                          {/* <td data-title="Select">
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                disabled={
                                  single_message.product_status ===
                                  "Product Assign to FE"
                                    ? true
                                    : false
                                }
                                checked={check_box_flag_state[i]}
                                value={check_box_flag_state[i]}
                                onChange={() => checkbox_click_function(i)}
                              />
                            </div>
                          </td> */}

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
                            {single_message.product_status}
                          </td>
                          <td data-title="status">
                            {single_message.dc_employee_name}
                          </td>
                          <td data-title="status">{single_message.fe_name}</td>
                          <td data-title="status">
                            {single_message.eod_start_datetime}
                          </td>

                          {/* onClick ={ JsBarcode("#code128",single_message.waybill_number)}  */}
                          {/* <td><button className="btn btn-sm bg-dark text-white border-dark mb-2"   >Print</button></td> */}
                        </tr>
                      )}
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
