import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomeO.css";
import { Navbar } from "../../Common/Navbar";
import Footer from "../../Common/Footer";
import "../css/all.css";
import { LoginContext } from "../../Context/loginContext";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Stack from "@mui/material/Stack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  Linksidebar,
  CustomerCareLinksidebar,
  Salessidebar,
  Operationsidebar,
  Degital_Ocean_flag,
  company_name,
  superadminsidebar,
} from "../../Common/Linksidebar";
import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-circular-progressbar/dist/styles.css";
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

const Threeplstatuschange = () => {
  toast.configure();
  const [employId, setemployId] = useState("");
  const [time, setTime] = useState("");
  const [statuspathao, setstatuspathao] = useState([]);
  const [updatedby, setupdatedby] = useState("");

  const [information, setinformation] = useState({});
  const searchIcon = <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>;

  const [startdate, setstartdate] = useState(null);
  const [enddate, setenddate] = useState(null);
  const [waybill, setwaybill] = useState("");
  const [orderstatus, setorderstatus] = useState("");
  const [date, setdate] = useState("");
  const [reason, setreason] = useState("");

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
        employee_degignation_list.SuperAdmin
      ) {
        setsiteBarInformation_LocalStore(superadminsidebar); //useState a set kore rakhlam
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
    if (!time) return;
    console.log("data picked", typeof time);
    let timestring =
      time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
    console.log("transformed picked", timestring);
    setdate(startdate + " " + timestring);
  }, [time, startdate]);

  const search = () => {
    if (!logingInformation_LocalStore.token || employId === "") return;
    if (
      waybill === "" ||
      waybill === null
      //   (startdate === "" || startdate === null) &&
      //   (enddate === "" || enddate === null)
    ) {
      toast.warning("Enter  Waybills");
      return;
    } else if (
      (startdate === "" || startdate === null) &&
      (enddate === "" || enddate === null)
    ) {
      toast.warning("Enter Date ");
      return;
    } else if (time === NaN || time === null || time === "") {
      toast.warning("Enter Time");
      return;
    } else if (updatedby === null || updatedby === "") {
      toast.warning("Please Select Updated by");
      return;
    }

    toast.info("Updating....");
    var data = JSON.stringify({
      consignment_id: "DC2704206TL42K",
      merchant_order_id: waybill,
      Order_status: orderstatus,
      updated_at: date,
      reason: reason,
      deliveredPersonName: "Care center",
      deliveredPersonContactNumber: "8809642601777",
      update_by: updatedby,
    });

    var axios = require("axios");

    console.log("Locked api: ", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/deleted_pathaoUpdateStatus" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/deleted_pathaoUpdateStatus" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: data,
    };
    console.log("new api", config);
    console.log("new api data", data);

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        console.log(json_object);
        return json_object;
      })
      .then((res) => {
        if (res.status == "Failed Request.") {
          toast.error(res.message);
        }
        if (res.status == "Something went wrong") {
          toast.error("Somthing Wrong ! Try Again.");
        } else if (res.status == "Successful Request") {
          toast.success("Updated successful!");
        }
        console.log("ops api call", res);
        // toast.success("Successful Search!");
        setinformation(res);

        // setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error.message);
      });
  };

  console.log("this is new api information in operation", information);

  useEffect(() => {
    setemployId(logingInformation_LocalStore.all_user_list.employeE_ID);
  }, [logingInformation_LocalStore]);

  const percentage = 80;

  useEffect(() => {
    var axios = require("axios");
    var config = {
      method: "get",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/ThreeplSatusChangeStatus" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/ThreeplSatusChangeStatus" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
    };
    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        console.log("response is : ", json_object);
        return json_object;
      })
      .then((res) => {
        console.log("response is status change pathao ", res);
        setstatuspathao(res.message.status);
      })
      .catch(function (error) {
        console.log(error);
      });

    // .then(res => {
    //     setAllClient(res.message.all_client_name);
    //     //setpayload(true);
    //     console.log("res is here", res.message.all_client_name)
    // })

    // .catch(function (error) {
    // console.log(error);
    // });
  }, []);

  const employeE_ID = JSON.parse(
    localStorage.getItem("logingInformation_LocalStore")
  )?.all_user_list?.employeE_ID;
  console.log("employeE_ID", employeE_ID);

  return (
    <>
      <div className="bodydiv">
        <div>
          <div className="row">
            <div className="col-12 bg-dark">
              <Navbar sidebar_manu={siteBarInformation_LocalStore} />
            </div>
          </div>
        </div>
        <div className="container mt-5 pt-5">
          {/*<h2>hello</h2>*/}

          <div className="container shadow my-3 py-3 rounded single-product-upload-bg">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-12">
                <div className="row my-2">
                  <div className="col-lg-3 col-md-3 col-12">
                    <p> Waybill:</p>
                  </div>
                  <div className="col-lg-9 col-md-9 col-12">
                    <div>
                      <div className="input-group  input-icons">
                        <i className="icon ">{searchIcon}</i>
                        <input
                          style={{
                            backgroundColor: "#fff",
                            outline: "none",
                            border: "none",
                            padding: "7px",
                            marginLeft: 0,
                            borderRadius: "8px",
                            width: "100%",
                          }}
                          type="text"
                          className=" px-5 py-2 input-field input-search"
                          placeholder="Waybill"
                          value={waybill}
                          onChange={(e) => {
                            setwaybill(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-12">
                <div className="row my-2">
                  <div className="col-lg-3 col-md-3 col-12">
                    <p> Date:</p>
                  </div>
                  <div className="col-lg-9 col-md-9 col-12">
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
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-12">
                <div className="row my-2">
                  <div className="col-lg-3 col-md-3 col-12">
                    <p> Order Status:</p>
                  </div>
                  <div className="col-lg-9 col-md-9 col-12">
                    <input
                      style={{
                        backgroundColor: "#fff",
                        outline: "none",
                        border: "none",
                        padding: "7px",
                        borderRadius: "8px",
                        width: "100%",
                      }}
                      list="order"
                      className="form-control"
                      id=""
                      onChange={(e) => {
                        setorderstatus(e.target.value);
                      }}
                    />
                    <datalist id="order">
                      {statuspathao &&
                        statuspathao.map((status) => {
                          return (
                            <option value={status.pathao_status}>
                              {status.edesh_status}
                            </option>
                          );
                        })}
                    </datalist>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="row my-2">
                  <div className="col-lg-3 col-md-3 col-12">
                    <p> Reason:</p>
                  </div>
                  <div className="col-lg-9 col-md-9 col-12">
                    <input
                      style={{
                        backgroundColor: "#fff",
                        outline: "none",
                        border: "none",
                        padding: "7px",
                        borderRadius: "8px",
                        width: "100%",
                      }}
                      list="reason"
                      className="form-control"
                      id=""
                      onChange={(e) => {
                        setreason(e.target.value);
                      }}
                    />
                    <datalist id="reason">
                      <option value="The customer's phone is off">
                        গ্রাহক এর ফোন বন্ধ
                      </option>
                      <option value="The customer's phone number is incorrect">
                        গ্রাহক এর ফোন নম্বরটি সঠিক নয়
                      </option>
                      <option value="The customer did not like the parcel">
                        গ্রাহককের পার্সেলটি পছন্দ হয়নি
                      </option>
                      <option value="The customer wants to open the parcel">
                        গ্রাহক পার্সেল খুলে দেখতে চায়
                      </option>
                      <option value="The customer has already collected the product">
                        গ্রাহক ইতিমধ্যে পণ্য সংগ্রহ করে ফেলেছে
                      </option>
                      <option value="The customer is reluctant to take the parcel">
                        গ্রাহক পার্সেলটা নিতে অনিচ্ছুক
                      </option>
                      <option value="The customer is not present at the specified address">
                        গ্রাহক নির্দিষ্ট ঠিকানায় উপস্থিত নেই
                      </option>
                      <option value="The customer has requested to hold the parcel">
                        গ্রাহক অনুরোধ করেছেন পার্সেল হোল্ড করার জন্য
                      </option>
                      <option value="The customer did not place any order">
                        গ্রাহক কোনো অর্ডার করেননি
                      </option>
                      <option value="Duplicate order">ডুপ্লিকেট অর্ডার</option>
                      <option value="The parcel was stolen">
                        পার্সেলটি ছিনতাই হয়েছে
                      </option>
                    </datalist>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-12">
                <div className="row my-2">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                      <TimePicker
                        ampm={false}
                        openTo="hours"
                        views={["hours", "minutes", "seconds"]}
                        inputFormat="HH:mm:ss"
                        mask="__:__:__"
                        label="Time Picker"
                        value={time}
                        onChange={(newValue) => {
                          setTime(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Stack>
                  </LocalizationProvider>
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-12">
                <div className="row my-2">
                  <div className="col-lg-3 col-md-3 col-12">
                    <p> Updated By:</p>
                  </div>
                  <div className="col-lg-9 col-md-9 col-12">
                    <select
                      name=""
                      id=""
                      style={{
                        backgroundColor: "#fff",
                        outline: "none",
                        border: "none",
                        padding: "7px",
                        borderRadius: "8px",
                        width: "100%",
                      }}
                      onChange={(e) => {
                        setupdatedby(e.target.value);
                      }}
                    >
                      <option value="">Select One</option>
                      {(employeE_ID === 1046 || employeE_ID === 678765) && (
                        <option value="E-desh">Edesh</option>
                      )}
                      <option value="Pathao">Pathao</option>
                      <option value="Redx">Redx</option>
                      <option value="ePost">ePost</option>
                      <option value="Piickme Express">Piickme Express</option>
                    </select>
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
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="col-12">
          <Footer />
        </div>
      </div>
    </>
  );
};
export default Threeplstatuschange;
