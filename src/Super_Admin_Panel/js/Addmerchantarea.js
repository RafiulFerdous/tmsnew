import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Footer from "../../Common/Footer";
import Modal from "react-modal";
import {
  CustomerCareLinksidebar,
  Degital_Ocean_flag,
  Linksidebar,
  superadminsidebar,
} from "../../Common/Linksidebar";
import { Navbar } from "../../Common/Navbar";
import { LoginContext } from "../../Context/loginContext";
import AreaType from "./locationComponents/AreaType";
import Country from "./locationComponents/Country";
import Division from "./locationComponents/Division";
import District from "./locationComponents/District";
import Thana from "./locationComponents/Thana";
import { toast } from "react-toastify";
import LocationType from "./locationComponents/LocationType";
import LocationList from "./locationComponents/LocationList";

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

const Addmerchantarea = () => {
  toast.configure();
  //   const [inputText, setInputText] = useState("");
  //   const [area, setArea] = useState("");
  //   const [country, setCountry] = useState("");
  //   const [division, setDivision] = useState("");
  //   const [district, setDistrict] = useState("");
  //   const [thana, setThana] = useState("");
  //   const [locationType, setLocationType] = useState(0);
  //   const [state, setState] = useState(false);
  //   const [error, setError] = useState("");
  //   const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const [MerchantAreaId, setMerchantAreaId] = useState("");
  const [MerchantAreaName, setMerchantAreaName] = useState("");
  const [LocationId, setLocationId] = useState("");
  const [MerchantId, setMerchantId] = useState("");
  const [res, setres] = useState("");
  const [allmerchantarea, setallmerchantarea] = useState([]);
  const [payload, setpayload] = useState(false);

  const [rootarea, setrootarea] = useState([]);
  const [rootmerchant, setrootmerchant] = useState([]);

  const [modalIsOpen, setIsOpen] = useState(false);

  const [infoModalOpen, setinfoModalOpen] = useState(false);

  const [infoModalOpenupdate, setinfoModalOpenupdate] = useState(false);

  function closeInvoiceModal() {
    setinfoModalOpen(false);
  }

  function closeInvoiceModal1() {
    setinfoModalOpenupdate(false);
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

    if (context_flag_obj === undefined) {
      if (
        loginInformation.all_user_list.employeE_DEGIGNATION ===
        employee_degignation_list.ProcessingCenter
      ) {
        setsiteBarInformation_LocalStore(Linksidebar); //useState a set kore rakhlam.
        final_sideBar = Linksidebar;
      } else if (
        loginInformation.all_user_list.employeE_DEGIGNATION ===
        employee_degignation_list.DistrictIncharge
      ) {
        setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam
        final_sideBar = CustomerCareLinksidebar;
      }

      setLogin_Sidebar_LocalStore(loginInformation, final_sideBar); //local store a set kore rakhlam.
      setlogingInformation_LocalStore(loginInformation); //useState a set kore rakhlam.
    } else {
      if (
        context_flag_obj.all_user_list.employeE_DEGIGNATION ===
        employee_degignation_list.ProcessingCenter
      ) {
        setsiteBarInformation_LocalStore(Linksidebar); //useState a set kore rakhlam.
      } else if (
        context_flag_obj.all_user_list.employeE_DEGIGNATION ===
        employee_degignation_list.SuperAdmin
      ) {
        setsiteBarInformation_LocalStore(superadminsidebar); //useState a set kore rakhlam
      }
      setlogingInformation_LocalStore(context_flag_obj);
    }
  }, []);

  useEffect(() => {
    var axios = require("axios");
    //  var data = JSON.stringify({
    //    client_id: clientId,
    //  });

    // console.log("Client Report api: ", data);

    var config = {
      method: "get",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/api/v1.1/Location/GetAreaList"
        : "/api/v1.1/Location/GetAreaList",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      //   data: data,
    };

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        console.log("rootarea", json_object);
        return json_object;
      })
      .then((res) => {
        setrootarea(res.data);
        // setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [logingInformation_LocalStore]);

  useEffect(() => {
    var axios = require("axios");
    //  var data = JSON.stringify({
    //    client_id: clientId,
    //  });

    // console.log("Client Report api: ", data);

    var config = {
      method: "get",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/getAllClientName?company_name=EDESH"
        : "/universalapi/allapi/getAllClientName?company_name=EDESH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      //   data: data,
    };

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        console.log("rootarea", json_object);
        return json_object;
      })
      .then((res) => {
        setrootmerchant(res.message.all_client_name);
        // setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [logingInformation_LocalStore]);

  console.log("all root merchant ", rootmerchant);

  useEffect(() => {
    var axios = require("axios");
    //  var data = JSON.stringify({
    //    client_id: clientId,
    //  });

    // console.log("Client Report api: ", data);

    var config = {
      method: "get",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/api/v1.1/MerchantArea/AllMerchantArea"
        : "/api/v1.1/MerchantArea/AllMerchantArea",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      //   data: data,
    };

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        console.log("rootarea", json_object);
        return json_object;
      })
      .then((res) => {
        setallmerchantarea(res.data);
        // setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [logingInformation_LocalStore, payload]);

  console.log("all merchant area: ", allmerchantarea);

  function openModal(e) {
    //  console.log("waybill", way);

    setinfoModalOpen(true);
  }

  const resetInput = () => {
    setMerchantAreaId("");
    setMerchantAreaName("");
    setLocationId("");
    setMerchantId("");
  };

  const handleSubmit = (e) => {
    let data = JSON.stringify({
      MerchantAreaId: parseInt(MerchantAreaId),
      MerchantAreaName: MerchantAreaName,
      LocationId: parseInt(LocationId),
      MerchantId: parseInt(MerchantId),

      PostedById: logingInformation_LocalStore?.all_user_list?.employeE_ID,
      UpdatedById: logingInformation_LocalStore?.all_user_list?.employeE_ID,
    });

    console.log("data", data);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/api/v1.1/MerchantArea/CreateMerchantArea"
        : "http://e-deshdelivery.com/api/v1.1/MerchantArea/CreateMerchantArea",
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
        console.log("create response", json_object);
        return json_object;
      })
      .then((res) => {
        if (res.statusCode == 201) {
          toast.success(res.message);

          setpayload(payload == true ? false : true);
          setinfoModalOpen(false);
          //   setisactiveupdate([]);
          resetInput();
          // setinformation(res.dada);
        }
        // setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error.message);
      });
    e.preventDefault();
  };

  return (
    <div className="bodydiv">
      {" "}
      {/* Invoice modal */}
      <div className="bodydiv">
        <div className="row">
          <div className="col-12 bg-dark">
            <Navbar sidebar_manu={siteBarInformation_LocalStore} />
          </div>
        </div>
        {/* <div className="row">
              <div className="col-12">
                   <Sidebar sidebar_manu={siteBarInformation_LocalStore}/>
              </div>
            </div> */}

        <div className="mt-5 pt-5 container">
          {/* <div className="col-12 d-flex pt-5" id="mainmenu"> */}
          <div className="mt-5 pt-5" id="no-more-tables">
            <div className="row mb-2">
              {/* <div className="col-lg-2 col-md-6 col-12 mb-2">


                    <CSVLink
                      data={dataforcsv}
                      filename={`Report${getCurrentTime()}.xls`}
                      className="btn btn-sm btn-dark px-3 ms-2 rounded-3"
                    >
                      Download all
                    </CSVLink>

                </div> */}
              <div className="col-lg-2 col-md-6 col-12 mb-2">
                {/* <CSVLink
                    onClick={() => toast.success("Excel Download Successful")}
                    filename={`Home Operation ${getCurrentTime()}.xls`}
                    data={json_information?.message}
                    className="btn btn-dark btn-sm px-4 mx-2  mb-2"
                  >
                    Export Excel
                  </CSVLink> */}
                {/* <button
                  className="btn btn-sm btn-dark px-3 rounded-3"
                  // onClick={(e) => exportToCSV(dataforcsv, fileName)}
                >
                  Export Excel
                </button> */}
              </div>

              <div className="col-lg-6 col-md-8 col-12 mb-2">
                {/* <input
                  style={{
                    backgroundColor: "#C5D5E4",
                    outline: "none",
                    border: "none",
                    padding: "7px",
                    borderRadius: "8px",
                    width: "93%",
                  }}
                  type="text"
                  placeholder="Filter waybills, Bag, DC, Merchant"
                  // value={searchTerm}
                  // onChange={handleonChange}
                /> */}
              </div>
              <div className="col-lg-2 col-md-4 col-12 mb-2">
                {/* <button
                  className="btn btn-sm btn-success px-3 me-2 rounded-3"
                  // onClick={searchflag}
                >
                  Search
                </button> */}
                <button
                  className="btn btn-sm btn-success px-3 ms-2 rounded-3"
                  onClick={openModal}
                >
                  Add New
                </button>
              </div>
            </div>
            {/*Table*/}

            <table
              className="table css-serial bg-white"
              id="newops"
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
                  <th scope="col">MerchantName</th>
                  <th scope="col">merchantAreaName</th>
                  <th scope="col">locationName</th>
                </tr>
              </thead>
              {/*Table head*/}
              {/*Table body*/}

              <tbody className="text-center border border-secondary">
                {/* {console.log("All filter data", allfilterproductdata)} */}
                {/* there is  color change code*/}

                {allmerchantarea &&
                  allmerchantarea.map((single_message) => {
                    let color;
                    if (single_message.isActive == true) {
                      color = "bg-success";
                    } else {
                      color = "bg-danger";
                    }
                    return (
                      <tr className="">
                        <td data-title="SL"></td>
                        {/* <td data-title="Action">
                          <button
                            style={{ width: "110px" }}
                            className="btn btn-sm btn-outline-primary "
                            onClick={(e) =>
                              openModal(e, single_message.waybill_number)
                            }
                          >
                            See And Edit
                          </button>
                        </td> */}
                        <td data-title="MerchantName">
                          {/* <button
                              className="btn btn-sm btn-outline-primary "
                              onClick={(e) =>
                                openModal(e, single_message.waybill_number)
                              }
                            >
                            </button> */}
                          {single_message.merchant.customeR_NAME}
                        </td>

                        <td data-title="StoreName">
                          {single_message.merchantAreaName}
                        </td>
                        <td data-title="StoreName">
                          {single_message.location.locationName}
                        </td>
                        {/* <td data-title="CountryName">
                          {single_message.countryName}
                        </td>
                        <td data-title="DivisionName">
                          {single_message.divisionName}
                        </td>
                        <td data-title="DistrictName">
                          {single_message.districtName}
                        </td>
                        <td data-title="ThanaName">
                          {single_message.thanaName}
                        </td>
                        <td data-title="PostedBy">{single_message.postedBy}</td>
                        <td
                          data-title="Status"
                          className={`${color} btn px-3 ms-2 rounded-3`}
                        >
                          {single_message.isActive == false
                            ? "Inactive"
                            : "Active"}
                        </td> */}

                        {/* <td>
                          <Button
                            variant="primary"
                            onClick={(e) => {
                              openmodalupdate(single_message.storeId);
                            }}
                          >
                            Edit
                          </Button>
                        </td> */}
                      </tr>
                    );
                  })}
              </tbody>

              {/*Table body*/}
            </table>

            {/*Table*/}
          </div>
          {/* </div> */}
        </div>

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
          <div>
            <div className="d-flex ">
              <div className="order-track shadow p-3 mb-5 bg-white rounded m-auto modal-width">
                <form className="bordered ">
                  <h2 className="text-center text-dark">Create Here</h2>

                  <div className="form-group">
                    <label>Merchant Area Id</label>
                    <input
                      type="text"
                      className="form-control"
                      value={MerchantAreaId}
                      onChange={(e) => {
                        setMerchantAreaId(e.target.value);
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label>Merchant Area Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={MerchantAreaName}
                      onChange={(e) => {
                        setMerchantAreaName(e.target.value);
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label>Location/Area name</label>
                    <input
                      type="text"
                      className="form-control"
                      list="area"
                      value={LocationId}
                      onChange={(e) => {
                        setLocationId(e.target.value);
                      }}
                    />

                    <datalist id="area">
                      <option selected value="">
                        Nones
                      </option>
                      {/* <option value="All">All</option> */}
                      {rootarea &&
                        rootarea.map((single_dc_office_name) => {
                          // console.log("SINGLE DC NAME:", single_dc_office_name);
                          return (
                            <option value={single_dc_office_name.text}>
                              {single_dc_office_name.value}
                            </option>
                          );
                        })}
                    </datalist>
                  </div>

                  <div className="form-group">
                    <label>Merchant name</label>
                    <input
                      type="text"
                      className="form-control"
                      list="merchant"
                      value={MerchantId}
                      onChange={(e) => {
                        setMerchantId(e.target.value);
                      }}
                    />

                    <datalist id="merchant">
                      <option selected value="">
                        Nones
                      </option>
                      {/* <option value="All">All</option> */}
                      {rootmerchant &&
                        rootmerchant.map((single_dc_office_name) => {
                          // console.log("SINGLE DC NAME:", single_dc_office_name);
                          return (
                            <option value={single_dc_office_name.client_id}>
                              {single_dc_office_name.client_name}
                            </option>
                          );
                        })}
                    </datalist>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary mt-4"
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    create
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Modal>

        <div className="">
          <div className="col-12">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addmerchantarea;
