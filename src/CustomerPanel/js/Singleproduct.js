import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Footer from "../../Common/Footer";
//import '../css/allc.css';
import { toast } from "react-toastify";

import { LoginContext } from "../../Context/loginContext";
import {
  Linksidebar,
  CustomerCareLinksidebar,
  Salessidebar,
  Operationsidebar,
  Degital_Ocean_flag,
  company_name,
} from "../../Common/Linksidebar";
import { getCurrentTime } from "../../Common/common";
import { employee_degignation_list } from "../../Super_Admin_Panel/js/Accountadmin";
import { Button, Modal } from "antd";

const Singleproduct = () => {
  toast.configure();
  const [referenceno, setreferenceno] = useState("");
  const [consigneename, setconsigneename] = useState("");
  const [address, setaddress] = useState("");
  const [pincode, setpincode] = useState("");
  const [areacode, setareacode] = useState("");
  const [contactnum, setcontactnum] = useState("88");
  const [emergencynumber, setemergencynumber] = useState("");
  const [weight, setweight] = useState("");
  const [paymenttype, setpaymenttype] = useState("");
  const [totalpackage, settotalpackage] = useState("");
  const [codamount, setcodamount] = useState("");
  const [producttobeshift, setproducttobeshift] = useState("");
  const [returnaddress, setreturnaddress] = useState("");
  const [returnpin, setreturnpin] = useState("");
  const [sellername, setsellername] = useState("");
  const [clientName, setclientName] = useState("");

  const [coveragearea, setcoveragearea] = useState([]);

  const [contact_color, setcontact_color] = useState("red");

  const [area, setarea] = useState("");
  const [areacodedrop, setareacodedrop] = useState([]);

  const [pickupFlag, setpickupFlag] = useState(false);
  const [pickupRefreshFlag, setpickupRefreshFlag] = useState(false);
  const [showText, setShowText] = useState(false);

  const [dataForModal, setDataForModal] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  let onclick = (e) => {
    e.preventDefault();
    setShowText(!showText);
  };
  const [clientId, setclientId] = useState("");
  const [date_time, setdate_time] = useState("");

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
      setclientName(loginInformation.all_user_list_Client.customeR_NAME);
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
      setclientName(context_flag_obj.all_user_list_Client.customeR_NAME);
      setdate_time(getCurrentTime);
      setlogingInformation_LocalStore(context_flag_obj);
      setreturnpin(context_flag_obj?.all_user_list_Client?.customeR_RETURN_PIN);
      setreturnaddress(
        context_flag_obj?.all_user_list_Client?.customeR_RETURN_ADDRESS
      );
      console.log(
        "value set up else : ",
        context_flag_obj?.all_user_list_Client?.customeR_ID
      );
    }
  }, []);

  const [category, setCategory] = useState("");
  const [category1, setCategory1] = useState("");

  const [districtCity, setDistrictCity] = useState("");

  useEffect(() => {
    // e.preventDefault();
    var axios = require("axios");
    var data = JSON.stringify({
      callerID: parseInt(3),
    });

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/clientPanelCoverageAreawithDistictCity" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/clientPanelCoverageAreawithDistictCity" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        //  'Authorization': `Bearer ${logingInformation_LocalStore.token}`
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        return response;
      })
      .then((res) => {
        setDistrictCity(res?.data?.infrormation);
        //setinfoModalOpen(true);

        //setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // e.preventDefault();
    var axios = require("axios");

    var config = {
      method: "get",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/getCoverageArea" +
          "?company_name=" +
          "EDESH"
        : "/universalapi/allapi/getCoverageArea" + "?company_name=" + "EDESH",
      headers: {
        "Content-Type": "application/json",
        //  'Authorization': `Bearer ${logingInformation_LocalStore.token}`
      },
    };

    axios(config)
      .then(function (response) {
        return response;
      })
      .then((res) => {
        console.log("new response", res);
        setcoveragearea(res.data.message.all_information);

        //setinfoModalOpen(true);

        //setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });

    //setpickupFlag(pickupFlag => !pickupFlag);
  }, []);

  const showInModal = () => {
    const data = {
      REFERENCE_NO: referenceno,
      CONSIGNEE_NAME: consigneename,
      ADDRESS: address,
      PINCODE: "1230",
      AREA_CODE: category,
      CONTACT_NUMBER: contactnum,
      EMERGENCY_NUMBER: emergencynumber,
      WEIGHT: parseFloat(weight),
      PAYMENT_TYPE: paymenttype,
      TOTAL_PACKAGE: parseInt(totalpackage),
      COD_AMOUNT: parseFloat(paymenttype === "COD" ? codamount : 0),
      PRODUCT_TO_BE_SHIFT: producttobeshift,
      // RETURN_ADDRESS: returnaddress,
      // RETURN_PIN: returnpin,
      SELLER_NAME: clientName,
      BOOKING_DATE_TIME: getCurrentTime(),
      COVERAGE_AREA: category1,
    };
    setDataForModal(data);
    return data;
  };

  useEffect(() => {
    let len = contactnum.length;
    if (len < 13) {
      setcontact_color("red");
    } else {
      if (len > 13) {
        setcontact_color("red");
      } else {
        if (
          contactnum[0] == "8" &&
          contactnum[1] == "8" &&
          contactnum[2] == "0" &&
          contactnum[3] == "1"
        ) {
          setcontact_color("green");
        } else {
          setcontact_color("red");
        }
      }
    }
  }, [contactnum]);

  const validate = (e) => {
    e.preventDefault();

    var axios = require("axios");
    var data = JSON.stringify({
      order_id: referenceno,
    });

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/order_id_validation" +
          "?company_name=" +
          "EDESH"
        : "/universalapi/allapi/order_id_validation" +
          "?company_name=" +
          "EDESH",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Bearer ${logingInformation_LocalStore.token}`
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        return json_object;

        // toast.success("SuccessFully Vehicle Created!", {
        //     position: toast.POSITION.TOP_CENTER, autoClose: 1500
        // });
      })
      .then((res) => {
        console.log("this is validate", res);
        toast.success(res.message, {
          position: "top-right",
          autoClose: false,
        });
      })
      .catch(function (error) {
        console.log("this is", error);
        // toast.error("Something Wrong!", {
        //     position: toast.POSITION.TOP_CENTER, autoClose: 1800
        // });
      });
  };

  const showModal = () => {
    console.log(showInModal());
    setIsModalOpen(true);
  };
  const handleOk = () => {
    var axios = require("axios");

    var data = JSON.stringify({
      REFERENCE_NO: referenceno,
      CONSIGNEE_NAME: consigneename,
      ADDRESS: address,
      PINCODE: "1230",
      AREA_CODE: category,
      CONTACT_NUMBER: contactnum,
      EMERGENCY_NUMBER: emergencynumber,
      WEIGHT: parseFloat(weight),
      PAYMENT_TYPE: paymenttype,
      TOTAL_PACKAGE: parseInt(totalpackage),
      COD_AMOUNT: parseFloat(paymenttype === "COD" ? codamount : 0),
      PRODUCT_TO_BE_SHIFT: producttobeshift,
      // RETURN_ADDRESS: returnaddress,
      // RETURN_PIN: returnpin,
      SELLER_NAME: clientName,
      BOOKING_DATE_TIME: getCurrentTime(),
      COVERAGE_AREA: category1,
    });

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/clientSingleProductUpload" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/clientSingleProductUpload" +
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
        setIsModalOpen(false);
        setpickupRefreshFlag((pickupRefreshFlag) => !pickupRefreshFlag);
        // toast.success("SuccessFully Created !", {
        //   position: toast.POSITION.TOP_CENTER, autoClose: 1500
        // });
        if (typeof response.data.message === "string") {
          toast.error(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          });
        }

        toast.success(response.data.status, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });

        // console.log("successfully created", response);
      })
      .catch(function (error) {
        setIsModalOpen(false);
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
    setpickupFlag((pickupFlag) => !pickupFlag);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bodydiv">
        <div className="row">
          <div className="col-12 bg-dark">
            <Navbar sidebar_manu={siteBarInformation_LocalStore} />
          </div>
        </div>
        <form action="" onSubmit={showModal}>
          <div className="mt-5 pt-5">
            <h4 className="text-dark text-center">Single Product Upload</h4>
            <div className="container shadow my-3 py-3 rounded single-product-upload-bg">
              <div>
                <div className="row my-2">
                  <div className="col-12 col-lg-2 col-md-2">
                    <p>Order ID</p>
                  </div>
                  <div className="col-8 col-lg-9 col-md-8">
                    {" "}
                    <input
                      required
                      placeholder="Order ID"
                      type="text"
                      className="shadow-lg form-control  me-3 bg-white rounded"
                      value={referenceno}
                      onChange={(e) => {
                        setreferenceno(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div className="col-4 col-lg-1 col-md-1">
                    <button
                      type="button"
                      className="btn btn-sm btn-success rounded-3"
                      onClick={validate}
                      disabled={!referenceno}
                    >
                      Validate
                    </button>
                  </div>
                </div>

                <div className="row my-2">
                  <div className="col-12 col-lg-2 col-md-2">
                    <p>Receiver Name</p>
                  </div>
                  <div className="col-11 col-lg-9 col-md-8">
                    {" "}
                    <input
                      required
                      placeholder="Receiver Name"
                      type="text"
                      className="shadow-lg form-control  me-3 bg-white rounded"
                      value={consigneename}
                      onChange={(e) => {
                        setconsigneename(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div className="col-4 col-lg-1 col-md-1"></div>
                </div>
                <div className="row my-2">
                  <div className="col-12 col-lg-2 col-md-2">
                    <p>Customer's Address</p>
                  </div>
                  <div className="col-lg-9 col-md-8 col-8">
                    <div className="row">
                      <div className="col-12 col-lg-6 col-md-6">
                        <input
                          required
                          placeholder="Customer Address"
                          type="text"
                          className="shadow-lg form-control  bg-white rounded"
                          value={address}
                          onChange={(e) => {
                            setaddress(e.target.value);
                          }}
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row my-2">
                  <div className="col-12 col-lg-2 col-md-2">
                    <p>Select City</p>
                  </div>
                  <div className="col-lg-9 col-md-8 col-11">
                    <div className="row">
                      <div className="col-12 col-lg-6 col-md-6">
                        <input
                          required
                          list="districtCity"
                          placeholder="Select"
                          className="shadow-lg form-control  bg-white rounded"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        />
                        <datalist id="districtCity">
                          {/* <option value="">Select</option> */}
                          {districtCity &&
                            districtCity.map((option, index) => (
                              <option key={index} value={option.districtCity}>
                                {option.districtCity}
                              </option>
                            ))}
                        </datalist>
                      </div>
                      <div className="col-12 col-lg-2 col-md-2">
                        <p>Coverage Area</p>
                      </div>
                      <div className="col-12 col-lg-4 col-md-4  ">
                        <input
                          required
                          list="coverArea"
                          placeholder="Select"
                          className="form-control bg-white me-3 rounded"
                          value={category1}
                          onChange={(e) => setCategory1(e.target.value)}
                        />
                        <datalist id="coverArea">
                          {/* <option value="">Select</option> */}
                          {districtCity &&
                            districtCity.map((option, index) => (
                              <>
                                {category == option.districtCity ? (
                                  <>
                                    {option.coverage_area.map(
                                      (coverarea, index) => (
                                        <option key={index} value={coverarea}>
                                          {coverarea}
                                        </option>
                                      )
                                    )}
                                  </>
                                ) : (
                                  <></>
                                )}
                              </>
                            ))}
                        </datalist>
                      </div>
                    </div>
                  </div>
                </div>
                {/*  */}
                <div className="row my-2">
                  <div className="col-lg-9 col-md-8 col-11">
                    <div className="row"></div>
                  </div>
                  <div className="col-4 col-lg-1 col-md-1"></div>
                </div>
                <div className="row my-2">
                  <div className="col-lg-2 col-md-2 col-12">
                    <p>Customer's Number</p>
                  </div>
                  <div className="col-lg-9 col-md-8 col-11">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-12">
                        <input
                          required
                          placeholder="e.g. 8801xxxxxxxxx"
                          style={{ color: contact_color }}
                          type="text"
                          className="shadow-lg form-control  me-3 bg-white rounded"
                          value={contactnum}
                          onChange={(e) => {
                            setcontactnum(e.target.value);
                          }}
                        ></input>
                      </div>
                      <div className="col-lg-2 col-md-2 col-12 p-0">
                        <p>Emergency Number</p>
                      </div>
                      <div className="col-lg-4 col-md-4 col-12  ">
                        <input
                          required
                          placeholder="e.g. 8801xxxxxxxxx"
                          type="text"
                          className="shadow-lg form-control bg-white rounded"
                          value={emergencynumber}
                          onChange={(e) => {
                            setemergencynumber(e.target.value);
                          }}
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="col-4 col-lg-1 col-md-1"></div>
                </div>

                <div className="row my-2">
                  <div className="col-lg-2 col-md-2 col-12">
                    <p>Product Weight In KG : </p>
                  </div>
                  <div className="col-lg-9 col-md-8 col-11">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-12">
                        <input
                          required
                          placeholder="e.g. 2"
                          type="number"
                          className="shadow-lg form-control  me-3 bg-white rounded"
                          value={weight}
                          onChange={(e) => {
                            setweight(e.target.value);
                          }}
                        ></input>
                      </div>
                      <div className="col-lg-2 col-md-2 col-12 ">
                        <p>Payment Mode</p>
                      </div>
                      <div className="col-lg-4 col-md-4 col-12  ">
                        <select
                          required
                          type="text"
                          className="shadow-lg form-control bg-white rounded"
                          placeholder="select "
                          value={paymenttype}
                          onChange={(e) => {
                            setpaymenttype(e.target.value);
                          }}
                        >
                          <option value="" hidden>
                            Select
                          </option>
                          <option value="COD">COD</option>
                          <option value="Prepaid">Prepaid</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-4 col-lg-1 col-md-1"></div>
                </div>

                <div className="row my-2">
                  <div className="col-lg-2 col-md-2 col-12">
                    <p>Product Actual Value</p>
                  </div>
                  <div className="col-lg-9 col-md-8 col-11">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-12">
                        <input
                          required
                          placeholder="Product Actual value"
                          type="number"
                          className="shadow-lg form-control  me-3 bg-white rounded"
                          value={totalpackage}
                          onChange={(e) => {
                            settotalpackage(e.target.value);
                          }}
                        ></input>
                      </div>
                      <div className="col-lg-2 col-md-2 col-12  ">
                        <p>COD Amount</p>
                      </div>
                      <div className="col-lg-4 col-md-4 col-12  ">
                        <input
                          required={paymenttype === "COD" ? true : false}
                          type="number"
                          className="shadow-lg form-control bg-white rounded"
                          value={paymenttype === "COD" ? codamount : 0}
                          disabled={paymenttype === "COD" ? false : true}
                          onChange={(e) => {
                            setcodamount(e.target.value);
                          }}
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="col-4 col-lg-1 col-md-1"></div>
                </div>

                <div className="row my-2">
                  <div className="col-12 col-lg-2 col-md-2">
                    <p>Product Description</p>
                  </div>
                  <div className="col-11 col-lg-9 col-md-8">
                    {" "}
                    <input
                      required
                      placeholder="Your Product Description"
                      type="text"
                      className="shadow-lg form-control  me-3 bg-white rounded"
                      value={producttobeshift}
                      onChange={(e) => {
                        setproducttobeshift(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div className="col-4 col-lg-1 col-md-1"></div>
                </div>
                {/* <div className="row my-2">
                <div className="col-12 col-lg-2 col-md-2">
                  <p>Merchant Name</p>
                </div>
                <div className="col-11 col-lg-9 col-md-8">
                  {" "}
                  <input
                    type="text"
                    disabled={true}
                    className="shadow-lg form-control  me-3 bg-white rounded"
                    value={clientName}
                  ></input>
                </div>
                <div className="col-4 col-lg-1 col-md-1"></div>
              </div>
              <div className="row my-2">
                <div className="col-lg-2 col-md-2 col-12">
                  <p>Merchant Address</p>
                </div>
                <div className="col-lg-9 col-md-8 col-11">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                      <input
                        type="text"
                        disabled={true}
                        className="shadow-lg form-control  me-3 bg-white rounded"
                        value={returnaddress}
                      ></input>
                    </div>
                    <div className="col-lg-2 col-md-2 col-12 ">
                      <p className="pt-1">Pincode</p>
                    </div>
                    <div className="col-lg-4 col-md-4 col-12 ">
                      <input
                        type="text"
                        disabled={true}
                        className="shadow-lg form-control bg-white rounded"
                        value={returnpin}
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="col-4 col-lg-1 col-md-1"></div>
              </div> */}
              </div>
            </div>
          </div>

          <div className="">
            <div className="d-flex justify-content-center text-align-center">
              <button
                type="submit"
                className="btn btn-sm btn-success rounded-3 px-3"
                // onClick={SubmitButtonFunction}
                // onClick={}
                // disabled={!category || !category1}
              >
                Submit
              </button>
              {/*  disabled={!clientName||!username||!password||!person||!clientContact||!pickuPADDRESS||!pincode||!returnaddress} */}
            </div>
          </div>
        </form>
        <div className="">
          <div className="col-12">
            <Footer />
          </div>
        </div>
      </div>

      <>
        <Modal
          title="Product Information"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="row">
            <div className="col-6">
              <p className="border-bottom border-secondary">Order ID : </p>
              <p className="border-bottom border-secondary">Receiver Name : </p>
              <p className="border-bottom border-secondary">
                Customer's Address :{" "}
              </p>
              <p className="border-bottom border-secondary">Select City : </p>
              <p className="border-bottom border-secondary">Coverage Area : </p>
              <p className="border-bottom border-secondary">
                Customer's Number :{" "}
              </p>
              <p className="border-bottom border-secondary">
                Emergency Number :{" "}
              </p>
              <p className="border-bottom border-secondary">
                Product Weight :{" "}
              </p>
              <p className="border-bottom border-secondary">Payment Mode : </p>
              <p className="border-bottom border-secondary">
                Product Actual Value :{" "}
              </p>
              <p className="border-bottom border-secondary">COD Amount : </p>
            </div>
            <div className="col-6">
              <p className="border-bottom border-secondary">
                {dataForModal?.REFERENCE_NO}
              </p>
              <p className="border-bottom border-secondary">
                {dataForModal?.CONSIGNEE_NAME}
              </p>
              <p className="border-bottom border-secondary">
                {dataForModal?.ADDRESS}
              </p>
              <p className="border-bottom border-secondary">
                {dataForModal?.REFERENCE_NO}
              </p>
              <p className="border-bottom border-secondary">
                {dataForModal?.AREA_CODE}
              </p>
              <p className="border-bottom border-secondary">
                {dataForModal?.CONTACT_NUMBER}
              </p>
              <p className="border-bottom border-secondary">
                {dataForModal?.EMERGENCY_NUMBER}
              </p>
              <p className="border-bottom border-secondary">
                {dataForModal?.WEIGHT}
              </p>
              <p className="border-bottom border-secondary">
                {dataForModal?.PAYMENT_TYPE}
              </p>
              <p className="border-bottom border-secondary">
                {dataForModal?.TOTAL_PACKAGE}
              </p>
              <p className="border-bottom border-secondary">
                {dataForModal?.COD_AMOUNT}
              </p>
            </div>
          </div>
        </Modal>
      </>
    </>
  );
};

export default Singleproduct;
