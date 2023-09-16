import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./customermodel.css";
import { CSVLink, CSVDownload } from "react-csv";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import './table.css';
import { LoginContext } from "../../Context/loginContext";
import {
  company_name,
  CustomerCareLinksidebar,
  Degital_Ocean_flag,
  Linksidebar,
} from "../../Common/Linksidebar";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "react-modal";

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

let clientId, setclientId;
let date_time, setdate_time;
const Customerhometable = (props) => {
  const csvData = [
    [
      "Waybill",
      "reference no",
      "Consignee Name",
      "City",
      "State",
      "Address",
      "Pincode",
      "Areacode",
      "Phone",
      "Mobile",
      "Weight",
      "Payment Mode",
      "Package Amount",
      "Cod Amount",
      "Product to be Shipped",
      "Return Address",
      "Return Pin",
      "Seller Name",
      "Country",
      "Seller Address",
      "Country_code",
      "Seller CST No",
      "Seller TIN",
      "Invoice No",
      "Invoice Date",
      "Length",
      "Breadth",
      "Height",
      "Quantity",
      "Commodity Value",
      "Tax Value",
      "Category of Goods",
      "Sales Tax Form ack no",
      "Consignee TIN",
      "Shipping Client",
      "Seller_GST_TIN",
      "Client_GST_TIN",
      "Consignee_GST_TIN",
      "Invoice_Reference",
      "HSN_Code",
      "Return Reason",
      "Vendor Pickup Location",
      "EWBN",
      "Supply_Sub_Type",
      "Document_Type",
      "Document_Number",
      "Document_Date",
      "OD_Distance",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "p88",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
  ];
  const [infoData, setinfoData] = useState([]);
  const searchIcon = <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>;
  [clientId, setclientId] = useState("");
  [date_time, setdate_time] = useState("");

  const [unconfirmdata, setunconfirmdata] = useState([]);

  let json_information = props.response;

  useEffect(() => {
    setunconfirmdata(json_information);
  }, []);

  console.log("this is props after effect", unconfirmdata);

  const [information, setinformation] = useState({});
  const [payload, setpayload] = useState(false);

  const [waybill, setwaybill] = useState([]);

  const [deletewaybill, setdeletewaybill] = useState([]);
  const [deletesubmit, setdeletesubmit] = useState([]);

  const [SubmitFlag, setSubmitFlag] = useState(false);
  const [SubmitFlag1, setSubmitFlag1] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  const [product, setproduct] = useState("");
  const [emergencynumber, setemergencynumber] = useState("");
  const [address, setaddress] = useState("");
  const [contactnumber, setcontactnumber] = useState("");
  const [productdescription, setproductdescription] = useState("");
  const [productvalueamount, setproductvalueamount] = useState("");

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

  const [infoModalOpen, setinfoModalOpen] = useState(false);

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
      if (loginInformation.user_type == employee_degignation_list.Customer) {
        setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam.
        final_sideBar = CustomerCareLinksidebar;
      } else {
        if (
            loginInformation.all_user_list.employeE_DEGIGNATION ==
            employee_degignation_list.ProcessingCenter
        ) {
          setsiteBarInformation_LocalStore(Linksidebar); //useState a set kore rakhlam.
          final_sideBar = Linksidebar;
        }
      }
      setLogin_Sidebar_LocalStore(loginInformation, final_sideBar); //local store a set kore rakhlam.
      setclientId(loginInformation.all_user_list_Client.customeR_ID);
      setdate_time(getCurrentTime);
      setlogingInformation_LocalStore(loginInformation); //useState a set kore rakhlam.
      console.log(
          "value set up if: ",
          loginInformation.all_user_list_Client.customeR_ID
      );
    } else {
      if (context_flag_obj.user_type == employee_degignation_list.Customer) {
        setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam.
      } else if (
          context_flag_obj.all_user_list.employeE_DEGIGNATION ==
          employee_degignation_list.ProcessingCenter
      ) {
        setsiteBarInformation_LocalStore(Linksidebar); //useState a set kore rakhlam.
      }
      setclientId(context_flag_obj.all_user_list_Client.customeR_ID);
      setdate_time(getCurrentTime);
      setlogingInformation_LocalStore(context_flag_obj);
      console.log(
          "value set up else : ",
          context_flag_obj.all_user_list_Client.customeR_ID
      );
    }
  }, []);

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

  useEffect(() => {
    console.log("this is", logingInformation_LocalStore);
    // setclientId(logingInformation_LocalStore.all_user_list_Client.customeR_ID);
    // setdate_time(getCurrentTime);
  }, [logingInformation_LocalStore]);

  const [searchTerm, setSearchTerm] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);
  const handleonChange = (event) => {
    setSearchTerm(event.target.value);
  };
  // React.useEffect(() => {
  //     const users1 = json_information.message.holded_product_list.filter(p =>
  //         p.ordeR_ID.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())
  //     );
  //
  //     setSearchResults(users1);
  // }, [searchTerm]);

  useEffect(() => {
    //|| waybill.length===0
    if (!logingInformation_LocalStore.token) return;
    // e.preventDefault();
    var axios = require("axios");

    var data = JSON.stringify({
      employee_id: clientId,
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
          console.log("new response knr clientedit", res);
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

  function update(e) {
    e.preventDefault();
    setSubmitFlag1(!SubmitFlag1);
  }

  useEffect(() => {
    // e.preventDefault();
    var axios = require("axios");

    var data = JSON.stringify({
      employee_id: clientId,
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
            toast.success(res.data.status, {
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

  function openModal(e, way) {
    console.log("waybill", way);

    setwaybill(way);
    setSubmitFlag(!SubmitFlag);
    setIsOpen(true);
  }

  const Delete = (e, way) => {
    e.preventDefault();
    console.log("this is deleteway", way);
    // alert("are you Sure to Delete This?");
    setdeletewaybill(way);
    setdeletesubmit(!deletesubmit);
  };

  useEffect(() => {
    var axios = require("axios");

    var data = JSON.stringify({
      employee_id: clientId,
      product_waybill: null,
      order_id: deletewaybill,
    });

    console.log("this is data : ", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
          ? "https://e-deshdelivery.com/universalapi/allapi/delete_product" +
          "?company_name=" +
          company_name
          : "/universalapi/allapi/delete_product" +
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
          let msg = response.data.message;
          if (response.data.message === "Abnurmal Behaviour.") {
            msg = "Already Deleted!";
          }
          // setpickupRefreshFlag(pickupRefreshFlag => !pickupRefreshFlag);
          toast.success(msg, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
          //setUsers(response.data.all_product_list)
          // console.log("successfully forworded");
          return response;
        })
        .then((res) => {
          console.log("new update res", res);

          // if (res.status === 200) {
          //   console.log("toast call");
          //   toast.success(res.data.message, {
          //     position: "top-right",
          //   });
          //    , autoClose: 2500

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
  }, [deletesubmit, logingInformation_LocalStore]);

  return (
      <>
        {/* model */}

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

              <h4>Details Info</h4>

              <h6>
                <span className="badge bg-secondary">Product Waybill Number</span>
                :{" "}
                {infoData.product_infor &&
                    infoData.product_infor.producT_WAYBILL_NUMBER}
              </h6>
              {/* <h6><span className="badge bg-secondary">Bag Id</span>: {infoData.product_infor &&  infoData.product_infor.baG_ID_NUMBER}</h6> */}
              {/* <h6><span className="badge bg-secondary">Bag Waybill Number</span>: {infoData.product_infor &&  infoData.product_infor.baG_WAYBILL_NUMBER}</h6> */}

              <form className="bordered">
                <div className="form-group">
                  <label>PRODUCT_NAME</label>
                  <input
                      type="text"
                      className="form-control"
                      value={product}
                      onChange={(e) => {
                        setproduct(e.target.value);
                      }}
                  />
                </div>
                <div className="form-group">
                  <label>Product Description</label>
                  <input
                      type="text"
                      className="form-control"
                      value={productdescription}
                      onChange={(e) => {
                        setproductdescription(e.target.value);
                      }}
                  />
                </div>

                <div className="form-group">
                  <label>Contact Number</label>
                  <input
                      type="text"
                      className="form-control"
                      value={contactnumber}
                      onChange={(e) => {
                        setcontactnumber(e.target.value);
                      }}
                  />
                </div>

                <div className="form-group">
                  <label>Emergency Number</label>
                  <input
                      type="text"
                      className="form-control"
                      value={emergencynumber}
                      onChange={(e) => {
                        setemergencynumber(e.target.value);
                      }}
                  />
                </div>

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
                  <label>Product COD Amount</label>
                  <input
                      type="text"
                      className="form-control"
                      value={productvalueamount}
                      onChange={(e) => {
                        setproductvalueamount(e.target.value);
                      }}
                  />
                </div>
                {/*

   setwaybillnum(res.data.message.product_infor.producT_WAYBILL_NUMBER)
                 setconsigneename(res.data.message.product_infor.consigneE_NAME)
                 setpincode(res.data.message.product_infor.pincode)
                setareacode(res.data.message.product_infor.areA_CODE)
                setproductweight(res.data.message.product_infor.producT_WEIGHT)
                setproducttype(res.data.message.product_infor.producT_TYPE)
             setproducturgentstatus(res.data.message.product_infor.producT_URGENT_STATUS)
                  setproducttotal(res.data.message.product_infor.producT_TOTAL)
               setproductpaymenttype(res.data.message.product_infor.producT_PAYMENT_TYPE)
                setproductdetail(res.data.message.product_infor.producT_DETAILS)



  */}

                <div className="form-group">
                  <label>PRODUCT WAYBILL NUMBER</label>
                  <input
                      type="text"
                      className="form-control"
                      value={waybillnum}
                      onChange={(e) => {
                        setwaybillnum(e.target.value);
                      }}
                  />
                </div>

                <div className="form-group">
                  <label>Consignee Name</label>
                  <input
                      type="text"
                      className="form-control"
                      value={consigneename}
                      onChange={(e) => {
                        setconsigneename(e.target.value);
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
                      type="text"
                      className="form-control"
                      value={areacode}
                      onChange={(e) => {
                        setareacode(e.target.value);
                      }}
                  />
                </div>

                <div className="form-group">
                  <label>Product Weight</label>
                  <input
                      type="text"
                      className="form-control"
                      value={productweight}
                      onChange={(e) => {
                        setproductweight(e.target.value);
                      }}
                  />
                </div>

                <div className="form-group">
                  <label>Product Type</label>
                  <input
                      type="text"
                      className="form-control"
                      value={producttype}
                      onChange={(e) => {
                        setproducttype(e.target.value);
                      }}
                  />
                </div>

                <div className="form-group">
                  <label>ProductUrgent Status</label>
                  <input
                      type="text"
                      className="form-control"
                      value={producturgentstatus}
                      onChange={(e) => {
                        setproducturgentstatus(e.target.value);
                      }}
                  />
                </div>

                <div className="form-group">
                  <label>Product Actual Value</label>
                  <input
                      type="text"
                      className="form-control"
                      value={producttotal}
                      onChange={(e) => {
                        setproducttotal(e.target.value);
                      }}
                  />
                </div>

                <div className="form-group">
                  <label>Product Payment Type</label>
                  <input
                      type="text"
                      className="form-control"
                      value={productpaymenttype}
                      onChange={(e) => {
                        setproductpaymenttype(e.target.value);
                      }}
                  />
                </div>

                <div className="form-group">
                  <label>Product Details</label>
                  <input
                      type="text"
                      className="form-control"
                      value={productdetail}
                      onChange={(e) => {
                        setproductdetail(e.target.value);
                      }}
                  />
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

        {/* modelend */}

        <div className="row  col-12" id="container">
          <div className="mb-5">
            {/* <div className="col-md-12 d-flex flex-row-reverse ">
            <CSVLink
              filename="Template.csv"
              data={csvData}
              className="btn btn-outline-primary  fw-bold px-4 rounded-pill"
            >
              CSV Template
            </CSVLink>
          </div> */}
            {/*  */}
            {/* <form className="row d-flex justify-content-center">
            <div className="col-lg-6 col-md-6 col-sm-4 form-group mx-3 mt-2 p-4">
              <div className="input-group  input-icons">
                <i className="icon ">{searchIcon}</i>
                <input
                  type="search"
                  name=""
                  id=""
                  placeholder="Search"
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
              </div>
              <div className="d-flex justify-content-center mt-3">
                <CSVLink
                  filename="Template.csv"
                  data={csvData}
                  className="btn btn-outline-primary  fw-bold px-4 rounded-pill"
                >
                  CSV Template
                </CSVLink>
              </div>
            </div>
          </form> */}
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-8 col-12 ">
                <div className="row mt-2">
                  <div className="">
                    <input
                        style={{
                          backgroundColor: "#C5D5E4",
                          outline: "none",
                          border: "none",
                          padding: "7px",
                          borderRadius: "8px",
                          width: "100%",
                          // marginLeft: "10px",
                        }}
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleonChange}
                    />
                  </div>
                  {/* <div className="col-3">
                  <div className="d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-success btn-sm px-4 py-2 rounded-3"
                      // onClick={search}
                    >
                      Search
                    </button>
                  </div>
                </div> */}
                </div>
                <div className="row justify-content-center mt-3">
                  <div className="col-6 d-flex justify-content-center ">
                    <CSVLink
                        filename="Template.csv"
                        data={csvData}
                        className="btn btn-sm btn-success  fw-bold  rounded-3"
                    >
                      CSV Template
                    </CSVLink>
                  </div>
                  <div className="col-6 d-flex justify-content-center  ">
                    <CSVLink
                        filename="Products.csv"
                        data={unconfirmdata}
                        className="btn btn-sm btn-dark px-3 fw-bold rounded-3"
                    >
                      Export csv
                    </CSVLink>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}

            {/* <form className="row d-flex justify-content-center">
            <div className="input-group  input-icons">
              <i className="icon ">{searchIcon}</i>
              <input
                type="search"
                name=""
                id=""
                placeholder="Search...."
                className="rounded-pill px-5 py-2  input-field"
                style={{
                  width: "50%",
                  textAlign: "start",
                  marginLeft: "15px",
                  boxShadow: "2px 3px 3px 1px #00000059",
                  outline: "none",
                  border: "none",
                }}
                value={searchTerm}
                onChange={handleonChange}
              /> */}

            {/* <input
                        type="text"
                        className="form-control mx-2 border-warning border"
                        placeholder="Type Waybill here......."
                        value={waybill}
                        onChange={handleonChange}
                      /> /}
                  {/ <div className="input-group-append"  value={searchTerm} onChange={handleonChange}>

                </div> */}
            {/* </div> */}

            {/*        <div className="col-sm-4 form-group mx-3 mt-2">*/}
            {/*            <div className="input-group">*/}
            {/*                <input type="text" className="form-control mx-2 border-warning border"*/}
            {/*                       placeholder="Type here......." value={searchTerm} onChange={handleonChange}/>*/}
            {/*                /!* <div className="input-group-append">*/}

            {/*</div> *!/*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/* </form> */}
          </div>
          <div>
            <div id="no-more-tables">
              {/*json_information.message.delevered_product_list.concat(searchResults).concat(json_information.message.returned_product_list).concat(json_information.message.lost_product_list)*/}
              {/* <CSVLink
              filename="Products.csv"
              data={unconfirmdata}
              className="btn btn-primary my-2 px-3"
            >
              Export Excel
            </CSVLink> */}
              <table
                  className="table css-serial bg-white"
                  style={{ fontSize: "13px", marginLeft: "1px" }}
              >
                <thead
                    className="text-center shadow sticky-top "
                    style={{ backgroundColor: "#b4bec2", top: "60px", zIndex: "0" }}
                >
                <tr className="text-dark" style={{ border: "none" }}>
                  <th scope="col"> SL</th>
                  {/*<th></th>*/}

                  <th scope="col">Action</th>
                  <th scope="col">Id</th>
                  <th scope="col">Order Id</th>
                  <th scope="col">Consignee</th>
                  <th scope="col">Contact Number</th>
                  <th scope="col">Payment Mode</th>
                  <th scope="col">Pincode</th>
                  <th scope="col">Details</th>
                  <th scope="row">Return Address</th>
                  <th scope="col">Return Pin</th>
                  <th scope="col">Seller Name</th>
                  <th scope="col">Weight</th>
                  {/* <th scope="col">COD </th> */}
                  {/*<th scope="col">COD</th>*/}
                  {/*<th scope="col">Actual Value</th>*/}
                  {/*<th scope="col">Status</th>*/}
                  {/*<th scope="col">Date Time*/}
                  {/*</th>*/}
                </tr>
                </thead>
                <tbody className="text-center border border-secondary">
                {unconfirmdata.map((single_message) => {
                  return (
                      <tr key={single_message.ordeR_ID}>
                        <td data-title="SL"></td>

                        <td data-title="Action">
                          {/*<button type="button" className="btn btn-sm btn-outline-secondary"*/}
                          {/*        onClick={(e) => openModal(e, single_message.waybilL_NUMBER)}>Edit*/}
                          {/*</button>*/}
                          <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={(e) =>
                                  Delete(e, single_message.referencE_NO)
                              }
                          >
                            Delete
                          </button>
                        </td>

                        <td data-title="Id ">{single_message.iD_NUMBER}</td>
                        <td data-title="Reference No">
                          {single_message.referencE_NO}
                        </td>

                        <td data-title="Condignee" scope="row">
                          {single_message.consigneE_NAME}
                        </td>
                        <td data-title="Number">
                          {single_message.contacT_NUMBER}
                        </td>

                        <td data-title="Payment Type">
                          {single_message.paymenT_TYPE}
                        </td>

                        <td data-title="Pincode">{single_message.pincode}</td>
                        <td data-title="Product">
                          {single_message.producT_TO_BE_SHIFT}
                        </td>
                        <td data-title="Return Address" className="w-100">
                          {single_message.returN_ADDRESS}
                        </td>

                        <td data-title="Return Pin">
                          {single_message.returN_PIN}
                        </td>

                        <td data-title="Seller Name">
                          {single_message.selleR_NAME}
                        </td>
                        {/* <td data-title="COD Amount">
                                                    {single_message.product_value} </td> */}
                        <td data-title="Weight">{single_message.weight}</td>

                        {/*<td data-title="Actual Value">*/}
                        {/*    {single_message.producT_TOTAL}*/}
                        {/*</td>*/}

                        {/*<td data-title="Status">{single_message.producT_PROCESSING_STATUS}</td>*/}
                        {/*<td data-title="DateTime">*/}
                        {/*    {single_message.producT_PRODESSING_STATUS_DATETIME}*/}
                        {/*</td>*/}
                      </tr>
                  );
                })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
  );
};
export default Customerhometable;
