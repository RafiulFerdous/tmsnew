import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
// import "../css/all.css";
import Clienttable from "../../Model/Sales_content/Clienttable";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { LoginContext } from "../../Context/loginContext";
import { SearchContext } from "../../Context/searchContext";
import { SearchButtonContext } from "../../Context/buttonContext";
import {
  Linksidebar,
  CustomerCareLinksidebar,
  Salessidebar,
  Operationsidebar,
  Degital_Ocean_flag,
  company_name,
} from "../../Common/Linksidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import MultiwaybillTable from "../../Model/Sales_content/MultiwaybillTable";
import Multiselect from "multiselect-react-dropdown";

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

export default function ClientOtpTable(props) {
  let json_information = props.response;
  const [finalstatus, setfinalstatus] = useState([]);
  const [clientname, setclientname] = useState([]);
  const [information, setinformation] = useState("");
  const [payload, setpayload] = useState(false);
  const [employId, setemployId] = useState("");
  const [client_name, setclient_name] = useState("");
  const [stage, setstage] = useState([]);
  const [sendto, setsendto] = useState([]);
  const [holdsendto, setholdsendto] = useState("");
  const [deliveredsendto, setdeliveredsendto] = useState("");
  const [lostsendto, setlostsendto] = useState("");
  const [returnsendto, setreturnsendto] = useState("");
  const [payment_type, setpayment_type] = useState("");

  var { loginInformation, setloginInformation } = useContext(LoginContext);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [infoModalOpen, setinfoModalOpen] = useState(false);

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
        employee_degignation_list.Marketing_executive
      ) {
        setsiteBarInformation_LocalStore(Salessidebar); //useState a set kore rakhlam.
        final_sideBar = Salessidebar;
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
        employee_degignation_list.Marketing_executive
      ) {
        setsiteBarInformation_LocalStore(Salessidebar); //useState a set kore rakhlam.
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

  useEffect(() => {
    setemployId(logingInformation_LocalStore.all_user_list.employeE_ID);
  }, [logingInformation_LocalStore]);
  useEffect(() => {
    setclientname(json_information);
    console.log("Client list", json_information);
  }, []);
  console.log("clients", finalstatus);
  const search = (e) => {
    e.preventDefault();
    if (!logingInformation_LocalStore.token || employId === "") return;

    var data = JSON.stringify({
      employee_id: employId,

      client_list: finalstatus,
    });

    var axios = require("axios");

    console.log("Locked api: ", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/otpAccessInformation" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/otpAccessInformation" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: data,
    };
    console.log("new api", config);

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        console.log(json_object);
        return json_object;
      })
      .then((res) => {
        console.log("sal3es otp api call", res);
        toast.success("Successful Search!");
        setinformation(res.message);
        setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function openModal(e, client) {
    console.log("this is client", client);
    setclient_name(client);
    setinfoModalOpen(true);

    // setSubmitFlag(!SubmitFlag);
    //setIsOpen(true);
  }

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

  console.log("this is client_name", client_name);

  const update = () => {
    if (!logingInformation_LocalStore.token || employId === "") return;

    var data = JSON.stringify({
      employee_id: employId,

      client_name: client_name,
      stages_list: [
        {
          stage_name: "Product Delivered",
          send_to: deliveredsendto,
        },
        {
          stage_name: "Product Hold ",
          send_to: holdsendto,
        },
        {
          stage_name: "Product Returned",
          send_to: returnsendto,
        },
        {
          stage_name: "Product Lost",
          send_to: lostsendto,
        },
      ],
      payment_type: [payment_type],
      product_type: ["ALL"],
      attempt_count_list: [""],
    });

    var axios = require("axios");

    console.log("Locked api: ", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/otpAccessInformationUpdate" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/otpAccessInformationUpdate" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: data,
    };
    console.log("new api", config);

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        console.log(json_object);
        return json_object;
      })
      .then((res) => {
        console.log("sal3es otp update api call", res);
        toast.success("Successful update!");
        //setinformation(res.message);
        setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      {/*modal start*/}

      <div className="bordered">
        {/* Invoice modal */}
        <Modal
          isOpen={infoModalOpen}
          style={customStyles}
          onRequestClose={closeInvoiceModal}
          // closeTimeoutMS={200}
          contentLabel="Example Modal"
          closeTimeoutMS={500}
        >
          <button
            className="btn btn-outline-danger mb-2"
            onClick={closeInvoiceModal}
          >
            close
          </button>
          <div>
            <form className="bordered">
              <div className="input-group mx-2 my-3 w-75">
                {/*<ul className="list-group list-group-flush">*/}

                {/*  */}

                <div className="form-floating mb-3 w-100">
                  <input
                    list="sendto"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Select One"
                    onChange={(e) => {
                      setdeliveredsendto(e.target.value);
                    }}
                  />
                  <label for="floatingInput">Select Product Delivery</label>
                </div>
                {/*  */}

                {/* <li className="list-group-item">{"Product Delivered "}</li>
                {"-"}
                <input
                  list="sendto"
                  placeholder="Select One"
                  className="form-control"
                  id=""
                  onChange={(e) => {
                    setdeliveredsendto(e.target.value);
                  }}
                /> */}
                {/* onChange={e => { setClientName(e.target.value) }}*/}
                <datalist id="sendto">
                  <option value="">None</option>
                  <option value="Client">Client</option>
                  <option value="Consignee">Consignee</option>
                  <option value="Employee">Employee</option>
                </datalist>

                {/*</ul>*/}
              </div>

              <div className="input-group mx-2 my-3 w-75">
                {/*<ul className="list-group list-group-flush">*/}
                {/*  */}
                <div className="form-floating mb-3 w-100">
                  <input
                    list="sendto"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Select One"
                    onChange={(e) => {
                      setholdsendto(e.target.value);
                    }}
                  />
                  <label for="floatingInput">Select Product Hold</label>
                </div>
                {/*  */}

                {/* <li className="list-group-item">{"Product Hold "}</li>
                {"-"}
                <input
                  list="sendto"
                  placeholder="Select One"
                  className="form-control"
                  id=""
                  onChange={(e) => {
                    setholdsendto(e.target.value);
                  }}
                /> */}
                {/* onChange={e => { setClientName(e.target.value) }}*/}
                <datalist id="sendto">
                  <option value="">None</option>
                  <option value="Client">Client</option>
                  <option value="Consignee">Consignee</option>
                  <option value="Employee">Employee</option>
                </datalist>

                {/*</ul>*/}
              </div>

              <div className="input-group mx-2 my-3 w-75">
                {/*<ul className="list-group list-group-flush">*/}
                {/*  */}
                <div className="form-floating mb-3 w-100">
                  <input
                    list="sendto"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Select One"
                    onChange={(e) => {
                      setlostsendto(e.target.value);
                    }}
                  />
                  <label for="floatingInput">Select Product Lost</label>
                </div>
                {/*  */}

                {/* <li className="list-group-item">{"Product Lost  "}</li>
                {"-"}
                <input
                  list="sendto"
                  placeholder="Select One"
                  className="form-control"
                  id=""
                  onChange={(e) => {
                    setlostsendto(e.target.value);
                  }}
                /> */}
                {/* onChange={e => { setClientName(e.target.value) }}*/}
                <datalist id="sendto">
                  <option value="">None</option>
                  <option value="Client">Client</option>
                  <option value="Consignee">Consignee</option>
                  <option value="Employee">Employee</option>
                </datalist>

                {/*</ul>*/}
              </div>

              <div className="input-group mx-2 my-3 w-75">
                {/*<ul className="list-group list-group-flush">*/}

                <div className="form-floating mb-3 w-100">
                  <input
                    list="sendto"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Select One"
                    onChange={(e) => {
                      setreturnsendto(e.target.value);
                    }}
                  />
                  <label for="floatingInput">Select Product Returned</label>
                </div>

                {/* <li className="list-group-item">{"Product Returned  "}</li>
                {"-"}
                <input
                  list="sendto"
                  placeholder="Select One"
                  className="form-control"
                  id=""
                  onChange={(e) => {
                    setreturnsendto(e.target.value);
                  }}
                /> */}
                {/* onChange={e => { setClientName(e.target.value) }}*/}
                <datalist id="sendto">
                  <option value="">None</option>
                  <option value="Client">Client</option>
                  <option value="Consignee">Consignee</option>
                  <option value="Employee">Employee</option>
                </datalist>

                {/*</ul>*/}
              </div>

              <div className="input-group mx-2 my-3 w-75">
                {/*<ul className="list-group list-group-flush">*/}
                {/*  */}
                <div className="form-floating mb-3 w-100">
                  <input
                    list="type"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Select One"
                    onChange={(e) => {
                      setpayment_type(e.target.value);
                    }}
                  />
                  <label for="floatingInput">Payment Type</label>
                </div>
                {/*  */}

                {/* <li className="list-group-item">{"Payment Type "}</li>
                {"-"}
                <input
                  list="type"
                  placeholder="Select One"
                  className="form-control"
                  id=""
                  onChange={(e) => {
                    setpayment_type(e.target.value);
                  }}
                /> */}
                {/* onChange={e => { setClientName(e.target.value) }}*/}
                <datalist id="type">
                  <option value="">None</option>
                  <option value="PREPAID">PREPAID</option>
                  <option value="COD">COD</option>
                  {/*<option value="Employee">Employee</option>*/}
                </datalist>

                {/*</ul>*/}
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                onClick={update}
              >
                Update
              </button>
            </form>
          </div>
        </Modal>
      </div>

      {/*modal end*/}
      <div className="container mb-5 pb-5">
        {/*  */}
        <div className="row">
          <div className="col-10 m-auto">
            <div className="container  shadow my-3 py-3 rounded single-product-upload-bg">
              <div className="row ">
                <div className="col-lg-2 col-md-2 col-11">Client Name:</div>
                <div className="col-lg-8 col-md-8 col-11 bg-white rounded p-0">
                  <Multiselect
                    // style={{
                    //   outline: "none",
                    //   border: "none",
                    //   padding: "7px",
                    //   borderRadius: "8px",
                    //   width: "93%",
                    //   backgroundColor: "white",
                    // }}
                    className="border-0"
                    isObject={false}
                    onRemove={(event) => {
                      console.log(event);
                      finalstatus.pop(event);
                    }}
                    onSelect={(event) => {
                      console.log(event);
                      setfinalstatus(event);
                      //finalstatus.push(event.selectedItem)
                    }}
                    options={clientname}
                    selectedValues={[]}
                    //showCheckbox
                  />
                </div>
                <div className="col-lg-2 col-md-2 col-11 ">
                  <button
                    type="button"
                    className="btn btn-success px-4 btn-sm rounded-3 mt-2"
                    onClick={search}
                  >
                    Search
                  </button>
                </div>
              </div>
              {/* <div className="col-md-12 d-flex justify-content-center mt-4 mb-2"></div> */}
            </div>
          </div>
        </div>
        {/*  */}
        {/* <div className="mt-5 d-flex">
          <div className="border rounded-3 shadow p-4 bg-light m-auto">
            <div className="col-lg-8 col-xl-8 col-sm-12 col-md-12">
              <form>
                <div className="input-group">
                  <p>Client Name:</p>

                  <Multiselect
                    isObject={false}
                    onRemove={(event) => {
                      console.log(event);
                      finalstatus.pop(event);
                    }}
                    onSelect={(event) => {
                      console.log(event);
                      setfinalstatus(event);
                      //finalstatus.push(event.selectedItem)
                    }}
                    options={clientname}
                    selectedValues={[]}
                    //showCheckbox
                  />
                </div>
                <div className="col-md-12 d-flex justify-content-center mt-4 mb-2">
                  <button
                    style={{ zIndex: 0 }}
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={search}
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div> */}

        {/*  */}

        {/*  */}

        {/* onChange={handleFilter} */}
        {/* <input list="clientNames" className="form-control" id="clientname" onChange={(e) => { setclient(e.target.value) }}/>
                <datalist id="clientNames">
                  <option selected value="">None</option>
                  {clientname.map(single_dc_office_name => {
                    // console.log("SINGLE DC NAME:", single_dc_office_name);
                    return (
                        <option value={single_dc_office_name}></option>
                    );
                  })}
                </datalist> */}

        <div className="row gx-3">
          {information &&
            information.map((single) => {
              return (
                <div className="col-lg-3 col-md-6 col-12 d-flex align-items-stretch">
                  <div
                    className="card "
                    style={{
                      borderRadius: "10px",
                      backgroundColor: "#dce6ef",
                      border: "1px solid #1f585f",
                    }}
                  >
                    <div className="card-body border-bottom mx-1 border-2 border-dark mb-2">
                      <h5 className="card-title">
                        Client: {single.client_name}
                      </h5>
                      <h5 className="card-title">
                        Payment Type:{" "}
                        {single.payment_type && single.payment_type}
                      </h5>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="btn btn-outline-secondary px-4 ms-2 mb-1 bg-white"
                        onClick={(e) => openModal(e, single.client_name)}
                      >
                        Edit
                      </button>
                    </div>

                    {/* <ul className="list-group list-group-flush">
                      {single.access_stage.map((stage) => (
                        // setstage(stage.stage_name),
                        // setsendto(stage.send_to),

                        <li className="list-group-item">{`${stage.stage_name} - ${stage.send_to}`}</li>
                      ))}
                    </ul> */}
                    <div>
                      {single.access_stage.map((stage) => (
                        // setstage(stage.stage_name),
                        // setsendto(stage.send_to),

                        <p className="px-2">{`${stage.stage_name} - ${stage.send_to}`}</p>
                      ))}
                    </div>
                  </div>
                </div>
                // <div className="col-xl-3 col-lg-4 col-md-6 col-12  ">
                //   <div className="card">
                //     <div className="card-body ">
                //       <h5 className="card-title">
                //         Client: {single.client_name}
                //       </h5>
                //       <h5 className="card-title">
                //         Payment Type:{" "}
                //         {single.payment_type && single.payment_type}
                //       </h5>
                //     </div>
                //     <div>
                //       <button
                //         type="button"
                //         className="btn btn-outline-secondary px-4 ms-2 mb-1"
                //         onClick={(e) => openModal(e, single.client_name)}
                //       >
                //         Edit
                //       </button>
                //     </div>

                //     <ul className="list-group list-group-flush">
                //       {single.access_stage.map((stage) => (
                //         // setstage(stage.stage_name),
                //         // setsendto(stage.send_to),

                //         <li className="list-group-item">{`${stage.stage_name} - ${stage.send_to}`}</li>
                //       ))}
                //     </ul>
                //   </div>
                // </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
