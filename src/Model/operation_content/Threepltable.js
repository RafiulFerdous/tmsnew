import React, { useState, useEffect, useContext } from "react";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { CSVLink, CSVDownload } from "react-csv";
import { toast } from "react-toastify";
import axios from "axios";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import {
  BrowserRouter,
  Switch,
  Route,
  useHistory,
  useLocation,
  Link,
} from "react-router-dom";
import { LoginContext } from "../../Context/loginContext";
import Modal from "react-modal";
// import { SearchContext } from "../../Context/searchContext";
// import { SearchButtonContext } from "../../Context/buttonContext";
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
const Threepltable = (props) => {
  toast.configure();
  const [partnerinfo, setpartnerinfo] = useState([]);
  const [csvdata, setcsvdata] = useState([]);

  let json = props.response;
  let dcName = props.dcName;
  useEffect(() => {
    setpartnerinfo(json);
  }, [json]);

  // useEffect(() => {
  //
  //
  //         setcsvdata(partnerinfo.all_information &&
  //             partnerinfo.all_information);
  //
  //
  //
  // }, [partnerinfo]);

  console.log("this is coverageareapartner information in model", partnerinfo);

  const [employId, setemployId] = useState("");

  var { loginInformation, setloginInformation } = useContext(LoginContext);

  const [logingInformation_LocalStore, setlogingInformation_LocalStore] =
    useState(loginInformation);
  const [siteBarInformation_LocalStore, setsiteBarInformation_LocalStore] =
    useState([]);

  //   const [dcName, setDcName] = useState("");

  const [allDcName, setAllDcName] = useState([]);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [infoModalOpen, setinfoModalOpen] = useState(false);
  const [coverageareainformation, setcoverageareainformation] = useState([]);
  const [coveragearea, setcoveragearea] = useState("");
  const [partnercourier, setpartnercourier] = useState("");
  const [partnercourierlist, setpartnercourierlist] = useState([]);
  const [coverageArea, setCoverageArea] = useState({});
  console.log("coverageArea", coverageArea);
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
    console.log("this is value", value);
  };

  useEffect(() => {
    let final_sideBar = null;
    let context_flag_obj = null;
    context_flag_obj = getLogingInformation_LocalStore();

    if (context_flag_obj == undefined) {
      if (
        loginInformation.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.Operation
      ) {
        setsiteBarInformation_LocalStore(Operationsidebar); //useState a set kore rakhlam.
        final_sideBar = Operationsidebar;
      } else if (
        loginInformation.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.DistrictIncharge
      ) {
        setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam
        final_sideBar = CustomerCareLinksidebar;
      }

      //useState a set kore rakhlam.
      setLogin_Sidebar_LocalStore(loginInformation, final_sideBar); //local store a set kore rakhlam.
      setemployId(loginInformation.all_user_list.employeE_ID);
      setlogingInformation_LocalStore(loginInformation); //useState a set kore rakhlam.
      console.log(
        "value set up if: ",
        loginInformation.all_user_list.employeE_ID
      );
    } else {
      if (
        context_flag_obj.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.Operation
      ) {
        setsiteBarInformation_LocalStore(Operationsidebar); //useState a set kore rakhlam.
      } else if (
        context_flag_obj.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.DistrictIncharge
      ) {
        setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam
      }
      setlogingInformation_LocalStore(context_flag_obj);
      setemployId(context_flag_obj.all_user_list.employeE_ID);
      setlogingInformation_LocalStore(context_flag_obj);
      console.log(
        "value set up else : ",
        context_flag_obj.all_user_list.employeE_ID
      );
    }
  }, []);

  let check_box_flag = [];
  const [check_box_flag_state, setcheck_box_flag_state] = useState([]);
  //let select_all_check_box_flag;
  const [select_all_check_box_flag, setselect_all_check_box_flag] =
    useState(false);
  let count_number =
    partnerinfo.all_information && partnerinfo.all_information.length;
  for (let i = 0; i < count_number; i++) {
    check_box_flag.push(false);
  }

  useEffect(() => {
    setcheck_box_flag_state(check_box_flag);
  }, []);

  let checkbox_click_function = (index_value) => {
    let count_number =
      partnerinfo.all_information && partnerinfo.all_information.length;
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
      let count_number =
        partnerinfo.all_information && partnerinfo.all_information.length;
      for (let i = 0; i < count_number; i++) {
        temp_check_box.push(false);
      }
    } else {
      let count_number =
        partnerinfo.all_information && partnerinfo.all_information.length;
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

  function closeInvoiceModal() {
    setinfoModalOpen(false);
  }

  function closeModal() {
    setIsOpen(false);
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
      backgroundColor: "#0000001a",
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
  console.log("this is partner courier", partnercourier);

  useEffect(() => {
    var axios = require("axios");

    var config = {
      method: "get",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/allcourierlist" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/allcourierlist" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      //data: data,
    };
    console.log("this is config partner area", config);

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
        return response;
      })
      .then((res) => {
        console.log("new response partnercourier", res);
        setpartnercourierlist(res.data.message);

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
  }, []);

  const object = (e, covarea, partnerkurier1, dc) => {
    let cov = covarea;
    let dcname = dc;
    let kurier = partnerkurier1;
    console.log("this is coveragearea", cov);
    console.log("this is partner kurier", kurier);
    setcoveragearea(cov);

    // let coverageinformation = {
    //     coverageArea: cov,
    //     partnerKorear: partnercourier,
    // };
    // console.log("this is object",coverageinformation)

    // setDcName(dcname);

    setinfoModalOpen(true);
  };
  console.log("this is coverage area", coveragearea);
  console.log("this is partnercourier", partnercourier);
  console.log("this is dc name", dcName);

  const partnerchange = () => {
    let coverageinformation = {
      // coverageArea: coveragearea,
      coverageArea: coverageArea,
      partnerKorear: partnercourier,
    };

    var axios = require("axios");

    var data = JSON.stringify({
      DC_Name: dcName,
      information: coverageArea,
    });

    console.log("this is data : ", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/coverageAreaParterChange" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/coverageAreaParterChange" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: data,
    };
    console.log("this is config partner area", config);

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
        return response;
      })
      .then((res) => {
        console.log("new response partner area", res);
        setinfoModalOpen(false);
        setpartnerinfo(res.data.message);
        setcheck_box_flag_state([]);
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
  };
  const newsubmit = () => {
    let inputs1 = [];
    let coverArea = [];
    partnerinfo.all_information &&
      partnerinfo.all_information.map(async (data, list_index) => {
        if (check_box_flag_state[list_index]) {
          const cover = {
            coverageArea: data.coverageArea,
            partnerKorear: partnercourier,
          };

          coverArea.push(cover);
          let elem = data.coverageArea;
          inputs1.push(elem);
          console.log("cover", cover);
          setCoverageArea(coverArea);
        }
      });

    console.log("this is  after function call input", inputs1);
  };
  useEffect(() => {
    newsubmit();
  }, [partnercourier]);

  // ------------------excel download function start---------------------------

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const fileName = "Three PL Excel";

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
      <div className="mt-5" id="no-more-tables">
        {/*Table*/}
        <button
          className="btn btn-dark me-2 px-4 btn-sm rounded mb-3"
          onClick={(e) =>
            object(
              e
              //   single_message.coverageArea,
              //   single_message.partnerKorear,
            )
          }
        >
          Forwoard{" "}
        </button>

        {/*<CSVLink*/}
        {/*    data={csvdata}*/}
        {/*    filename={`Report${getCurrentTime()}.xls`}*/}
        {/*    className="btn btn-sm btn-dark px-3 ms-2 rounded-3"*/}
        {/*>*/}
        {/*    Download all*/}
        {/*</CSVLink>*/}

        {/* <ReactHTMLTableToExcel
                    className="js-download-link button btn btn-info btn-sm px-4 mx-2 rounded-pill"
                    table="newops1"
                    filename={`Report${getCurrentTime()}`}
                    sheet="Sheet"
                    buttonText="Export excel"
                /> */}
        <button
          className="btn btn-info ms-2 px-4 btn-sm rounded mb-3"
          onClick={(e) => exportToCSV(partnerinfo.all_information, fileName)}
        >
          Export Excel
        </button>
        <div></div>
        <table
          className="table css-serial bg-white"
          id="newops1"
          style={{ fontSize: "13px", marginLeft: "1px" }}
        >
          {/*Table head*/}
          <thead
            className="text-center shadow sticky-top "
            style={{
              backgroundColor: "#b4bec2",
              top: "60px",
              zIndex: "0",
            }}
          >
            <tr className="text-dark" style={{ border: "none" }}>
              <th scope="col">SL</th>
              <th scope="col">
                Select
                <div className="custom-control custom-checkbox cursor-pointe">
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
              {/* <th>Action</th> */}
              <th scope="col"> DC Name</th>
              <th scope="col">District</th>
              <th scope="col">DistrictCity</th>
              <th scope="col">Coverage Area</th>
              <th scope="col">Partner Courier</th>
            </tr>
          </thead>
          {/*Table head*/}
          {/*Table body*/}

          <tbody className="text-center border border-secondary">
            {/* {console.log("All filter data", allfilterproductdata)} */}
            {/* there is  color change code*/}

            {partnerinfo.all_information &&
              partnerinfo.all_information.map((single_message, i) => {
                return (
                  <>
                    {select_all_check_box_flag ? (
                      <tr className="">
                        <td data-title="SL"></td>
                        <td data-title="Select">
                          <div className="custom-control custom-checkbox ">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              checked={check_box_flag_state[i]}
                              value={check_box_flag_state[i]}
                              onChange={() => checkbox_click_function(i)}
                            />
                          </div>
                        </td>
                        {/* <td data-title="WayBill">
                          <button
                            className="btn btn-sm btn-outline-primary "
                            onClick={(e) =>
                              object(
                                e,
                                single_message.coverageArea,
                                single_message.partnerKorear,
                                single_message.dC_Name
                              )
                            }
                          >
                            Edit
                          </button>
                        </td> */}
                        <td data-title="DC Name ">{single_message.dC_Name}</td>
                        <td data-title="District">
                          {" "}
                          {single_message.district}
                        </td>
                        <td data-title="DistrictCity">
                          {" "}
                          {single_message.districtCity}
                        </td>
                        <td data-title="Coverage Area">
                          {single_message.coverageArea}
                        </td>
                        <td data-title="Partner Courier">
                          {single_message.partnerKorear}
                        </td>
                      </tr>
                    ) : (
                      <tr className="">
                        <td data-title="SL"></td>
                        <td data-title="Select">
                          <div className="custom-control custom-checkbox cursor-pointe">
                            <input
                              type="checkbox"
                              className="custom-control-input cursor-pointe"
                              checked={check_box_flag_state[i]}
                              value={check_box_flag_state[i]}
                              onChange={() => checkbox_click_function(i)}
                            />
                          </div>
                        </td>
                        {/* <td data-title="WayBill">
                          <button
                            className="btn btn-sm btn-outline-primary "
                            onClick={(e) =>
                              object(
                                e,
                                single_message.coverageArea,
                                single_message.partnerKorear,
                                single_message.dC_Name
                              )
                            }
                          >
                            Edit
                          </button>
                        </td> */}
                        <td data-title="DC Name ">{single_message.dC_Name}</td>
                        <td data-title="District">
                          {" "}
                          {single_message.district}
                        </td>
                        <td data-title="DistrictCity">
                          {" "}
                          {single_message.districtCity}
                        </td>
                        <td data-title="Coverage Area">
                          {single_message.coverageArea}
                        </td>
                        <td data-title="Partner Courier">
                          {single_message.partnerKorear}
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
          </tbody>

          {/*Table body*/}
        </table>

        {/*Table*/}

        {/* model */}
        {/* <div className="row">
          <div className="col-lg-6 col-md-8 col-12 m-auto">
            <div className="bordered border-dark">

            </div>
          </div>
        </div> */}
        {/* Invoice modal */}
        <Modal
          isOpen={infoModalOpen}
          style={customStyles}
          onRequestClose={closeInvoiceModal}
          closeTimeoutMS={200}
          contentLabel="Example Modal"
        >
          <div className="">
            <button
              className="btn btn-outline-danger mb-2"
              onClick={closeInvoiceModal}
            >
              close
            </button>
            <div className="row">
              <div className="col-lg-6 col-md-8 col-9 m-auto">
                {/*  */}

                <div className="">
                  <div className="">
                    <input
                      style={{
                        // backgroundColor: "#C5D5E4",
                        outline: "none",
                        border: "none",
                        padding: "7px",
                        borderRadius: "8px",
                        width: "93%",
                      }}
                      list="partnerLIst1"
                      placeholder="Select Partner"
                      className="form-control shadow"
                      onChange={(e) => setpartnercourier(e.target.value)}
                      // onChange={(e) => setDcName(JSON.stringify(e.target.value))}
                    />
                    <datalist id="partnerLIst1" className="w-100">
                      {/*{partnercourierlist&&partnercourierlist.map((Client) => (*/}
                      {/*<option value={Client}>{Client}</option>*/}
                      <option value="E-desh">E-desh</option>
                      <option value="Pathao">Pathao</option>
                      <option value="Redx">Redx</option>
                      <option value="ePost">ePost</option>
                      <option value="Piickme Express">Piickme Express</option>
                    </datalist>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-2 col-2">
                <button
                  className="btn btn-success btn-sm px-4 "
                  onClick={partnerchange}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Modal>
        {/* modelend */}
      </div>
    </>
  );
};

export default Threepltable;
