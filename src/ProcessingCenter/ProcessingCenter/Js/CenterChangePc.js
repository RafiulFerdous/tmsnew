import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
import Modal from "react-modal";
import "../css/all.css";
import axios from "axios";
import {
  BrowserRouter,
  Switch,
  Route,
  useHistory,
  useLocation,
  Link,
} from "react-router-dom";
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
import { toast } from "react-toastify";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

//let dcname, setdcname;

export default function CenterChangePc() {
  toast.configure();
  const [information, setinformation] = useState({});
  const [payload, setpayload] = useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [searchterm1, setsearchterm1] = React.useState([]);
  const [searchResults1, setSearchResults1] = React.useState([]);
  const [infoModalOpen, setinfoModalOpen] = useState(false);
  const [product, setproduct] = useState("");
  const [emergencynumber, setemergencynumber] = useState("");
  const [address, setaddress] = useState("");
  const [contactnumber, setcontactnumber] = useState("");
  const [productdescription, setproductdescription] = useState("");
  const [productvalueamount, setproductvalueamount] = useState("");
  const [infoData, setinfoData] = useState([]);
  const [SubmitFlag, setSubmitFlag] = useState(false);
  const [waybillnum, setwaybillnum] = useState("");
  const [consigneename, setconsigneename] = useState("");
  const [pincode, setpincode] = useState("");
  const [areacode, setareacode] = useState("");
  const [productweight, setproductweight] = useState("");
  const [producttype, setproducttype] = useState("");
  const [producturgentstatus, setproducturgentstatus] = useState("");
  const [producttotal, setproducttotal] = useState("");
  const [productpaymenttype, setproductpaymenttype] = useState("");
  const [productdetail, setproductdetail] = useState("");
  const [waybill, setwaybill] = useState("");
  const [SubmitFlag1, setSubmitFlag1] = useState(false);
  const [searchTermFlag, setsearchTermFlag] = useState(false);
  const [searchTermAltFlag, setsearchTermAltFlag] = useState(false);
  const [dcname, setdcname] = useState([]);

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
    var axios = require("axios");

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
    };

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        return json_object;
      })
      .then((res) => {
        console.log("response is dcname ", res);
        setdcname(res.message);
        //setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [logingInformation_LocalStore]);

  const handleonChange = (event) => {
    setwaybill(event.target.value);
  };
  const centerchangesubmit = (e) => {
    e.preventDefault();
    setSubmitFlag(!SubmitFlag);
    setinfoModalOpen(true);
  };
  useEffect(() => {
    if (waybill == "") return;
    // e.preventDefault();
    var axios = require("axios");

    var data = JSON.stringify({
      employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
      waybill_number: waybill,
    });

    console.log("this is data : ", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/operationPanelSingleProductInformation" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/operationPanelSingleProductInformation" +
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
        return response;
      })
      .then((res) => {
        console.log("new response", res);
        setinfoData(res.data.message);

        setproduct(res.data.message.product_infor.producT_NAME);
        setemergencynumber(res.data.message.product_infor.contacT_NUMBER);
        setaddress(res.data.message.product_infor.address);
        setcontactnumber(res.data.message.product_infor.contacT_NUMBER);
        setproductdescription(
          res.data.message.product_infor.producT_DESCRIPTION
        );
        setproductvalueamount(
          res.data.message.product_infor.producT_VALUE_AMOUNT
        );

        setwaybillnum(res.data.message.product_infor.producT_WAYBILL_NUMBER);
        setconsigneename(res.data.message.product_infor.consigneE_NAME);
        setpincode(res.data.message.product_infor.pincode);
        setareacode(res.data.message.product_infor.areA_CODE);
        setproductweight(res.data.message.product_infor.producT_WEIGHT);
        setproducttype(res.data.message.product_infor.producT_TYPE);
        setproducturgentstatus(
          res.data.message.product_infor.producT_URGENT_STATUS
        );
        setproducttotal(res.data.message.product_infor.producT_TOTAL);
        setproductpaymenttype(
          res.data.message.product_infor.producT_PAYMENT_TYPE
        );
        setproductdetail(res.data.message.product_infor.producT_DETAILS);

        setinfoModalOpen(true);

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
  function closeInvoiceModal() {
    setinfoModalOpen(false);
  }

  function update(e) {
    e.preventDefault();
    setSubmitFlag1(!SubmitFlag1);
  }
  useEffect(() => {
    // e.preventDefault();
    var axios = require("axios");

    var data = JSON.stringify({
      employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
      product_info: {
        PRODUCT_WAYBILL_NUMBER: waybillnum,

        PRODUCT_NAME: product,
        PRODUCT_DETAILS: productdetail,
        CONSIGNEE_NAME: consigneename,
        ADDRESS: address,
        PINCODE: pincode,
        AREA_CODE: areacode,
        CONTACT_NUMBER: contactnumber,
        EMERGENCY_NUMBER: emergencynumber,
        PRODUCT_WEIGHT: parseFloat(productweight),
        PRODUCT_TYPE: producttype,
        PRODUCT_URGENT_STATUS: producturgentstatus,
        PRODUCT_TOTAL: parseInt(producttotal),
        PRODUCT_PAYMENT_TYPE: productpaymenttype,
        PRODUCT_VALUE_AMOUNT: parseFloat(productvalueamount),
        PRODUCT_DESCRIPTION: productdescription,
      },
    });

    console.log("this is data : ", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/operationPanelSingleProductInformation_update" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/operationPanelSingleProductInformation_update" +
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
        closeInvoiceModal();
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
        console.log("new update res", res);

        if (res.status === 200) {
          console.log("toast call");
          toast.success("SuccessFully Updated", {
            position: "top-right",
            autoClose: 2500,
          });
        }

        //setIsOpen(true);
        // setinfoModalOpen(true);
        // setUsers(res.data.all_product_list)

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
  }, [SubmitFlag1, logingInformation_LocalStore]);

  const customStyles = {
    overlay: {
      position: "fixed",
      height: "100vh",
      width: "100vw",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 30,
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
      top: "100px",
      left: "40px",
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

  console.log("these are dc name", dcname);
  const searchIcon = <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>;
  return (
    <>
      <div className="bodydiv">
        <div className="row">
          <div className="col-12 ">
            <Navbar sidebar_manu={siteBarInformation_LocalStore} />
          </div>
        </div>
        {/* <div className="row">
                  <div className="col-12">
                   <Sidebar sidebar_manu={siteBarInformation_LocalStore}/>
                  </div>
                  </div> */}

        {/* <div className="row container-fluid">
                            <div className="col-6 " id="srchmenu">
                                    <Search/>
                            </div>
                       </div>
                    */}

        <div className=" container">
          <div className="col-12 d-flex" id="menuhome">
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
                <div>
                  <h4>Datewise Status</h4>

                  <table className="table table-bordered table-sm">
                    <thead>
                      <th>Date time</th>
                      <th>Processing status</th>
                    </thead>
                    <tbody>
                      {infoData.status_datetime &&
                        infoData.status_datetime.map((single_product) => (
                          <tr>
                            <td>{single_product.date_time}</td>
                            <td>{single_product.processing_status}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>

                  <form className="bordered">
                    <div className="form-group">
                      <label>Address</label>
                      <input
                        type="text"
                        className="form-control"
                        value={address}
                        onChange={(e) => {
                          setaddress(e.target.value);
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label>Pincode</label>
                      <input
                        type="text"
                        className="form-control"
                        value={pincode}
                        onChange={(e) => {
                          setpincode(e.target.value);
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label>AreaCode</label>
                      <input
                        list="dcnamelist"
                        type="text"
                        className="form-control"
                        value={areacode}
                        onChange={(e) => {
                          setareacode(e.target.value);
                        }}
                      />
                      <datalist id="dcnamelist">
                        <option selected value="None"></option>
                        <option value="Head Office"></option>
                        {/* required value={employeezone} onChange={(e) => { setemployeezone(e.target.value) }} */}
                        {dcname &&
                          dcname.map((single_dc) => {
                            console.log("SINGLE DC NAME:", single_dc);
                            return (
                              <option value={single_dc}>{single_dc}</option>
                            );
                          })}
                      </datalist>
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

            <div className="container mt-5 pt-5">
              <div className="mb-5 pt-5">
                <form className="row d-flex justify-content-center">
                  <div className="col-lg-6 col-md-6 col-sm-4 form-group mx-3 mt-2 p-4">
                    <div className="input-group  input-icons">
                      <i className="icon ">{searchIcon}</i>
                      <input
                        type="search"
                        name=""
                        id=""
                        placeholder="Type Waybill here"
                        className="rounded-pill px-5 py-2  input-field"
                        style={{
                          width: "-webkit-fill-available",
                          textAlign: "start",
                          marginLeft: "15px",
                          boxShadow: "2px 3px 3px 1px #00000059",
                          outline: "none",
                          border: "none",
                        }}
                        value={waybill}
                        onChange={handleonChange}
                      />

                      {/* <input
                        type="text"
                        className="form-control mx-2 border-warning border"
                        placeholder="Type Waybill here......."
                        value={waybill}
                        onChange={handleonChange}
                      /> */}
                      {/* <div className="input-group-append"  value={searchTerm} onChange={handleonChange}>

                </div> */}
                    </div>
                    {/* <div className="justify-content-center"> */}
                    <div className="d-flex justify-content-center mt-3">
                      <button
                        className="btn btn-outline-primary  fw-bold px-4 rounded-pill"
                        onClick={centerchangesubmit}
                      >
                        Submit
                      </button>
                    </div>
                    {/* </div> */}
                  </div>
                </form>
              </div>
            </div>

            {/* {payload ? <Hometable response={information}/> : 
                                    <div className="sk-cube-grid">
                                    <div className="sk-cube sk-cube1"></div>
                                    <div className="sk-cube sk-cube2"></div>
                                    <div className="sk-cube sk-cube3"></div>
                                    <div className="sk-cube sk-cube4"></div>
                                    <div className="sk-cube sk-cube5"></div>
                                    <div className="sk-cube sk-cube6"></div>
                                    <div className="sk-cube sk-cube7"></div>
                                    <div className="sk-cube sk-cube8"></div>
                                    <div className="sk-cube sk-cube9"></div>
                                  </div>
                                 }    */}
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
