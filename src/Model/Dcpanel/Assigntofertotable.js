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
import { toast } from "react-toastify";

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

const Assigntofertotable = (props) => {
  toast.configure();
  const [assignedproduct, setassignedproduct] = useState([]);
  const [productlist, setproductlist] = useState([]);
  const [employId, setemployId] = useState("");
  const [felist, setfelist] = useState([]);
  const [infoModalOpen, setinfoModalOpen] = useState(false);
  const [selectedfe, setselectedfe] = useState("");
  const [inputs, setinputs] = useState([]);
  const [selectedbag, setselectedbag] = useState("");
  const [strProductWaybillList, setstrProductWaybillList] = useState("");
  let json_information = props.response;

  useEffect(() => {
    setassignedproduct(json_information.message);
  }, []);

  useEffect(() => {
    let temp = [];
    assignedproduct.map((product) => {
      product.all_Products_of_Bag.map((single_product) => {
        temp.push(single_product);
        setproductlist(temp);
      });
    });
  }, [assignedproduct]);

  // check box

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
    //console.log(siteBarInformation_LocalStore);
    let data = JSON.stringify({
      DC_ID_number: logingInformation_LocalStore.all_user_list.employeE_ID,
    });

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/getFeinDc" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/getFeinDc" + "?company_name=" + company_name,
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
        console.log("response is fe list", res);
        setfelist(res.message);
        // setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [logingInformation_LocalStore]);
  function closeInvoiceModal() {
    setinfoModalOpen(false);
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

  // submit fun

  function submit() {
    console.log("this is fun call");
    let inputs1 = [];
    // selectedbag.map(item=>{
    //     let elem = {
    //         "product_waybill_number":item,
    //         "field_operative_id" : parseInt(selectedfe),
    //         "dc_id": logingInformation_LocalStore.all_user_list.employeE_ID,
    //         "dateTime": getCurrentTime()
    //     }
    //     inputs1.push(elem);
    //     setinputs(inputs1);
    // })
    productlist.map(async (data, list_index) => {
      if (check_box_flag_state[list_index]) {
        // check if data is selected or not
        let elem = {
          product_waybill_number: data.producT_WAYBILL_NUMBER,
          field_operative_id: parseInt(selectedfe),
          dc_id: logingInformation_LocalStore.all_user_list.employeE_ID,
          dateTime: getCurrentTime(),
        };

        inputs1.push(elem);
        //set input1 in final inputs[]
        setinputs(inputs1);
      }
    });
    console.log("this is product array", inputs1);
  }

  // submit fun end

  // fe assign api start here
  //data as input declared above effect as object in submit fun

  useEffect(() => {
    if (inputs.length === 0) return;

    let data = JSON.stringify(inputs);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/assignReturnProducttoFe" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/assignReturnProducttoFe" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: data,
    };
    console.log("this is data", data);
    console.log("this is data", config);

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        return json_object;
      })
      .then((res) => {
        console.log("response is fe list", res);
        toast.success(res.status, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });

        if (res.already_confirmed_product_list.length >= 1) {
          let str = "";
          res.already_confirmed_product_list.map((wrong_waybill) => {
            str += wrong_waybill + " ";
          });

          toast.warning(
            `Products Already Assigned ! 
              ${str}`,
            {
              position: "top-right",
              autoClose: false,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            }
          );
        }
        // setfelist(res.message);
        // setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
    closeInvoiceModal();
  }, [inputs]);

  // fe assign api

  // check box end

  console.log("this is product array2", inputs);

  console.log("this is product list", productlist);
  console.log("this is selected fe", selectedfe);
  const confirmproduct = (e) => {
    e.preventDefault();
    let waybillLength = 13;
    let startIndex = 0;
    let endIndex = 13;
    let temp = [];
    while (endIndex <= strProductWaybillList.length) {
      temp.push(strProductWaybillList.slice(startIndex, endIndex));
      startIndex += waybillLength;
      endIndex += waybillLength;
    }
    console.log("confirm waybill list", temp);

    setselectedbag(temp);
    setinfoModalOpen(true);
  };

  return (
    <>
      <div className="mt-4 container" id="">
        <h3 className="text-center">
          Welcome To {logingInformation_LocalStore.all_user_list.employeE_ZONE}
        </h3>
        {/* <div className="row">
          <div
            className="col-md-3 col-sm-12  mx-2 card bg-primary p-2"
            id="dashboard-card"
          >
            <div className="card-body">
              <h5 className="card-title">Total Shipment</h5>
              <p className="card-title">{count_number}</p>
            </div>
          </div>
          <div
            className="col-md-3 col-sm-12 mx-2 card bg-success p-2"
            id="dashboard-card"
          >
            <div className="card-body">
              <h5 className="card-title"></h5>
              <p className="card-title">{}</p>
            </div>
          </div>
          <div
            className="col-md-2 col-sm-12 mx-2 card bg-danger p-2"
            id="dashboard-card"
          >
            <div className="card-body">
              <h5 className="card-title"></h5>
              <p className="card-title">{}</p>
            </div>
          </div>
          <div
            className="col-md-3 col-sm-12  mx-2  card bg-purple p-2"
            id="dashboard-card"
          >
            <div className="card-body">
              <h5 className="card-title"></h5>
              <p className="card-title">{}</p>
            </div>
          </div>
          <div
            className="col-md-2 col-sm-12   mx-2 card bg-orange p-2"
            id="dashboard-card"
          >
            <div className="card-body">
              <h5 className="card-title">Total Return</h5>
              <h5 className="card-title">{}</h5>
            </div>
          </div>
        </div> */}
        <div className="bordered mt-5">
          <div className="row align-items-center">
            <div
              className="col-lg-6 col-md-6 col-12 mb-2 p-4 rounded"
              style={{ backgroundColor: "#C5D5E4" }}
            >
              <div className="row">
                <div className="col-12 col-md-4 col-lg-3">
                  <p className="">Select FE:</p>
                </div>
                <div className="col-12 col-md-8 col-lg-9">
                  <input
                    style={{
                      //   backgroundColor: "#C5D5E4",
                      outline: "none",
                      border: "none",
                      padding: "7px",
                      borderRadius: "8px",
                      width: "93%",
                    }}
                    type="text"
                    placeholder="Select FE"
                    list="felist"
                    onChange={(e) => setselectedfe(e.target.value)}
                  />
                  <datalist id="felist">
                    {felist.map((single_fe) => {
                      if (single_fe.active_or_inactive === "Active")
                        return (
                          <option value={single_fe.field_operative_id}>
                            {single_fe.field_operative_name}
                          </option>
                        );
                    })}
                  </datalist>
                </div>
              </div>
            </div>
            <div className="col-4 col-lg-1 col-md-2 ">
              <button
                type="button"
                className="btn btn-sm btn-success rounded-3 mb-2"
                onClick={submit}
              >
                Submit
              </button>
            </div>
            <div className="col-12 col-lg-3 col-md-4">
              <div
                className="rounded rounded-3 bg-primary"
                // id="dashboard-card"
              >
                <div className="card-body">
                  <h5 className="card-title">Total Shipment</h5>
                  <p className="card-title">{count_number}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice modal */}
          {/* <Modal
                        isOpen={infoModalOpen}
                        style={customStyles}
                        onRequestClose={closeInvoiceModal}
                        closeTimeoutMS={200}

                        contentLabel="Example Modal"
                    > */}

          {/* <button className="btn btn-outline-danger mb-2" onClick={closeInvoiceModal}>close</button> */}
          {/* <label>Select FE: </label> */}
          {/* <div className="d-flex justify-content-center">
            <input
              placeholder="Select FE"
              list="felist"
              className="form-control w-50 shadow p-3 mb-3 bg-body rounded"
              onChange={(e) => setselectedfe(e.target.value)}
            />
            <datalist id="felist">
              {felist.map((single_fe) => {
                if (single_fe.active_or_inactive === "Active")
                  return (
                    <option value={single_fe.field_operative_id}>
                      {single_fe.field_operative_name}
                    </option>
                  );
              })}
            </datalist>
          </div>
          <div className="d-flex mt-4 justify-content-center">
            <button className="btn btn-outline-success mb-2" onClick={submit}>
              Submit
            </button>
          </div> */}

          {/* </Modal> */}
        </div>
        {/* <p>
          welcome to {logingInformation_LocalStore.all_user_list.employeE_ZONE}
        </p> */}
        {/* <div className="container p-3">
                    <form>
                        <div className="form-group row mb-2">
                            <label  className="col-sm-3 col-form-label">Confirm Way Bill Number:</label>
                            <div className="col-sm-6">
                                <input type="text" className="form-control form-control-success" placeholder="Waybill Number" required value={strProductWaybillList} onChange={(e)=>{ setstrProductWaybillList(e.target.value) }}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center text-align-center">
                                <button className="btn btn-primary  mb-3" onClick={confirmproduct}disabled={!strProductWaybillList}>Submit</button>
                            </div>
                        </div>
                    </form>
                </div> */}

        {/*<div className="d-flex justify-content-center">*/}
        {/*    <label >Select FE: </label>*/}
        {/*    <input list="felist" className="form-control w-50" onChange={e => setselectedfe(e.target.value)} />*/}
        {/*    <datalist id="felist">*/}
        {/*        {*/}
        {/*            felist.map((single_fe) => (*/}
        {/*                <option value={single_fe.field_operative_id}>{single_fe.field_operative_name}</option>*/}
        {/*            ))*/}
        {/*        }*/}

        {/*    </datalist>*/}

        {/*</div>*/}

        <div id="no-more-tables" className="mt-5">
          <div className="">
            {/* <button className="btn btn-sm me-2 bg-info text-black border-info mb-2" onClick={(e) => bridgeme(e)}>Confirm</button> */}
            <CSVLink
              data={productlist}
              className="btn btn-sm px-4 btn-dark mb-2"
            >
              Export csv
            </CSVLink>
          </div>
          {/* <div className="">
                        <button className="btn btn-sm me-2 bg-info text-black border-info mb-2" onClick={(e) => setinfoModalOpen(true)}>Confirm</button>

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
                {/* <th>SL</th> */}
                <th scope="col">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      name="allSelect"
                      onChange={(e) => select_all_function()}
                    />
                  </div>
                </th>
                <th>ID</th>
                <th>WAYBILL NUMBER</th>
                <th>Reference NO</th>
                <th>Product NAME</th>
                <th>Consignee NAME</th>
                <th>Address</th>
                <th>DETAILS</th>

                <th>DC ID</th>
                <th>AMOUNT</th>

                {/* <th>Print<button className="btn btn-sm bg-info text-black border-info mb-2" onClick={(e) => print_function(e)}>Print All</button> </th>
                                <th>ex<CSVLink data={users} className="btn btn-sm bg-info text-black border-info mb-2" >Export csv</CSVLink></th> */}
              </tr>
            </thead>

            <tbody className="text-center border border-dark">
              {productlist.map((single_message, i) => {
                return (
                  <>
                    {select_all_check_box_flag ? (
                      <tr>
                        {/* <td data-title="SL" className="css-serial"></td> */}
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

                        <td data-title="WayBill Number">
                          {single_message.producT_ID}
                        </td>
                        <td data-title=" baG_WAYBILL_NUMBER">
                          {single_message.producT_WAYBILL_NUMBER}
                        </td>
                        <td data-title="Client Name">
                          {single_message.referencE_NO}
                        </td>
                        <td data-title=" Consignee Name">
                          {single_message.producT_NAME}
                        </td>
                        <td data-title="Product Details">
                          {single_message.consigneE_NAME}
                        </td>
                        <td data-title="Product Details">
                          {single_message.address}
                        </td>
                        <td data-title=" Consignee Name">
                          {single_message.producT_DETAILS}
                        </td>

                        <td data-title="Dc Office Name">
                          {single_message.districT_INCHARGE_ID}
                        </td>
                        <td data-title="Pin Code">
                          {single_message.producT_VALUE_AMOUNT}
                        </td>

                        {/* onClick ={ JsBarcode("#code128",single_message.waybill_number)}  */}
                        {/* <td><button className="btn btn-sm bg-dark text-white border-dark mb-2"   >Print</button></td> */}
                      </tr>
                    ) : (
                      <tr>
                        {/* <td data-title="SL" className="css-serial"></td> */}
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

                        <td data-title="WayBill Number">
                          {single_message.producT_ID}
                        </td>
                        <td data-title=" baG_WAYBILL_NUMBER">
                          {single_message.producT_WAYBILL_NUMBER}
                        </td>
                        <td data-title="Client Name">
                          {single_message.referencE_NO}
                        </td>
                        <td data-title=" Consignee Name">
                          {single_message.producT_NAME}
                        </td>
                        <td data-title="Product Details">
                          {single_message.consigneE_NAME}
                        </td>
                        <td data-title="Product Details">
                          {single_message.address}
                        </td>
                        <td data-title=" Consignee Name">
                          {single_message.producT_DETAILS}
                        </td>

                        <td data-title="Dc Office Name">
                          {single_message.districT_INCHARGE_ID}
                        </td>
                        <td data-title="Pin Code">
                          {single_message.producT_VALUE_AMOUNT}
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
};
export default Assigntofertotable;
