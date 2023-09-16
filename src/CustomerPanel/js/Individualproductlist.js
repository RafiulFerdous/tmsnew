import React, { useContext, useEffect, useRef, useState } from "react";
import Footer from "../../Common/Footer";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  CustomerCareLinksidebar,
  Linksidebar,
  company_name,
  Degital_Ocean_flag,
} from "../../Common/Linksidebar";
import axios from "axios";
import { Navbar } from "../../Common/Navbar";
import { LoginContext } from "../../Context/loginContext";
import "./Dashboard.css";
import { useHistory, useLocation } from "react-router";
import ReactPaginate from "react-paginate";
import Loader from "../../Loader";
import {
  faCartPlus,
  faBriefcase,
  faTruck,
  faChalkboardTeacher,
  faPeopleCarry,
  faShippingFast,
  faHandHolding,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { DownloadTableExcel } from "react-export-table-to-excel";
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

const Individualproductlist = () => {
  toast.configure();
  const tableRef = useRef(null);
  let location = useLocation();
  let history = useHistory();
  let individualproduct = location?.state?.productlist;

  try {
    individualproduct = location.state.productlist;
  } catch (e) {
    history.push("/Dashboard");
  }

  const [isLoading, setIsLoading] = useState(false);

  const [currentItems, setCurrentItems] = useState([]);
  const [currentItemsP, setCurrentItemsP] = useState(0);
  const [pagenumber, setpagenumber] = useState("");
  const [waybill, setWaybill] = useState([]);
  const [SubmitFlag, setSubmitFlag] = useState(false);
  const [infoModalOpen, setinfoModalOpen] = useState(false);
  const [productinfo, setproductinfo] = useState([]);

  var { loginInformation, setloginInformation } = useContext(LoginContext);

  const [siteBarInformation_LocalStore, setsiteBarInformation_LocalStore] =
    useState([]);

  const [logingInformation_LocalStore, setlogingInformation_LocalStore] =
    useState(loginInformation);

  const productIcon = <FontAwesomeIcon icon={faCartPlus}></FontAwesomeIcon>;
  const bagIcon = <FontAwesomeIcon icon={faBriefcase}></FontAwesomeIcon>;
  const transitIcon = <FontAwesomeIcon icon={faShippingFast}></FontAwesomeIcon>;
  const deliveryIcon = <FontAwesomeIcon icon={faTruck}></FontAwesomeIcon>;
  const fEIcon = <FontAwesomeIcon icon={faChalkboardTeacher}></FontAwesomeIcon>;

  const deliveryHandIcon = (
    <FontAwesomeIcon icon={faHandHolding}></FontAwesomeIcon>
  );
  const productReceiveIcon = (
    <FontAwesomeIcon icon={faPeopleCarry}></FontAwesomeIcon>
  );
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

  let getLogingInformation_LocalStore = () => {
    let value = JSON.parse(
      localStorage.getItem("logingInformation_LocalStore")
    );
    return value;
  };
  let setLogin_Sidebar_LocalStore = (
    current_value_login_context,
    sidebar_context
  ) => {
    localStorage.setItem(
      "logingInformation_LocalStore",
      JSON.stringify(current_value_login_context)
    );
  };

  useEffect(() => {
    let final_sideBar = null;
    let context_flag_obj = null;
    context_flag_obj = getLogingInformation_LocalStore();

    if (context_flag_obj == undefined) {
      if (loginInformation.user_type == employee_degignation_list.Customer) {
        setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam.
        final_sideBar = CustomerCareLinksidebar;
      } else if (
        loginInformation.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.ProcessingCenter
      ) {
        setsiteBarInformation_LocalStore(Linksidebar); //useState a set kore rakhlam.
        final_sideBar = Linksidebar;
      }

      setLogin_Sidebar_LocalStore(loginInformation, final_sideBar); //local store a set kore rakhlam.
      setlogingInformation_LocalStore(loginInformation); //useState a set kore rakhlam.
      //   setclientId(loginInformation.all_user_list_Client.customeR_ID);
    } else {
      if (context_flag_obj.user_type == employee_degignation_list.Customer) {
        setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam.
      } else if (
        context_flag_obj.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.ProcessingCenter
      ) {
        setsiteBarInformation_LocalStore(Linksidebar); //useState a set kore rakhlam.
      }
      setlogingInformation_LocalStore(context_flag_obj);
      //   setclientId(context_flag_obj.all_user_list_Client.customeR_ID);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  const customerIdFromLocal = JSON.parse(
    localStorage.getItem("logingInformation_LocalStore")
  );
  // console.log("customerIdFromLocal", customerIdFromLocal);
  const token = JSON.parse(
    localStorage.getItem("logingInformation_LocalStore")
  ).token;

  useEffect(() => {
    var data = JSON.stringify({
      Product_type: individualproduct,
      pagenumber: 1,
      client_id: customerIdFromLocal.all_user_list_Client.customeR_ID,
    });
    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/individualClientReport" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/individualClientReport" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    // console.log("data",data)
    // console.log("configuration",config)

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        return json_object;
      })
      .then((res) => {
        // console.log("response ", res);
        setIsLoading(false);
        setpagenumber(res.total_page_numbers);
        if (res.data.deliveredList.length > 0) {
          setCurrentItems(res.data.deliveredList);
        } else if (res.data.productInDcList.length > 0) {
          setCurrentItems(res.data.productInDcList);
        } else if (res.data.lostList.length > 0) {
          setCurrentItems(res.data.lostList);
        } else if (res.data.returnedList.length > 0) {
          setCurrentItems(res.data.returnedList);
        } else if (res.data.inTransitList.length > 0) {
          setCurrentItems(res.data.inTransitList);
        } else if (res.data.outForDeliveryList.length > 0) {
          setCurrentItems(res.data.outForDeliveryList);
        } else if (res.data.pickupRequestedList.length > 0) {
          setCurrentItems(res.data.pickupRequestedList);
        } else if (res.data.inProcessList.length > 0) {
          setCurrentItems(res.data.inProcessList);
        }
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  }, [individualproduct]);

  const handlePageClick = ({ selected: selectedPage }) => {
    setIsLoading(true);
    setCurrentItemsP(selectedPage);
    //
    let currentPage = selectedPage + 1;
    // console.log("CURRENT PAGE", currentPage);

    var data = JSON.stringify({
      Product_type: individualproduct,
      pagenumber: currentPage,
      client_id: customerIdFromLocal.all_user_list_Client.customeR_ID,
    });

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/individualClientReport" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/individualClientReport" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
        // console.log("response is new pagination backend ", res);
        setIsLoading(false);
        setpagenumber(res.total_page_numbers);
        if (res.data.deliveredList.length > 0) {
          setCurrentItems(res.data.deliveredList);
        } else if (res.data.productInDcList.length > 0) {
          setCurrentItems(res.data.productInDcList);
        } else if (res.data.lostList.length > 0) {
          setCurrentItems(res.data.lostList);
        } else if (res.data.returnedList.length > 0) {
          setCurrentItems(res.data.returnedList);
        } else if (res.data.inTransitList.length > 0) {
          setCurrentItems(res.data.inTransitList);
        } else if (res.data.outForDeliveryList.length > 0) {
          setCurrentItems(res.data.outForDeliveryList);
        } else if (res.data.pickupRequestedList.length > 0) {
          setCurrentItems(res.data.pickupRequestedList);
        } else if (res.data.inProcessList.length > 0) {
          setCurrentItems(res.data.inProcessList);
        }

        // setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  function openModal(e, way) {
    // console.log("waybill", { way });
    if (way === "") {
      toast.warning("Not Found !");
      return;
    }

    var axios = require("axios");
    var data = JSON.stringify({
      access_id: 1,
      access_token: "firstAccessToken_test_product_track",
      product_waybill: way,
    });

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/unAuthorized_parcel_tracking" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/unAuthorized_parcel_tracking" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        //'Authorization': `Bearer ${logingInformation_LocalStore.token}`
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        return response;
      })
      .then((res) => {
        // console.log("new response", res);
        setproductinfo(res.data.message.message);
        //setsearchresult(res.data.message.message.status_datetime)

        setinfoModalOpen(true);
      });

    setWaybill(way);
    setSubmitFlag(!SubmitFlag);
    // setIsOpen(true);
  }
  function closeInvoiceModal() {
    setinfoModalOpen(false);
  }

  return (
    <>
      <div className="row">
        <div className="col-12 ">
          <Navbar sidebar_manu={siteBarInformation_LocalStore} />
        </div>
      </div>
      <div className="mt-5 pt-5">
        <div className="container">
          <div id="no-more-tables" className="">
            <h5>
              INFORMATION OF{" "}
              <span className="text-primary">{individualproduct}</span> PRODUCT
            </h5>
            <div className="mb-2 d-flex justify-content-between">
              <div>
                {/* <ReactHtmlTableToExcel
                  className="js-download-link btn btn-success px-4 text-white rounded-3"
                  table="exportExcel"
                  filename={`${individualproduct} Product ${getCurrentTime()}`}
                  sheet="Sheet"
                  buttonText="Export excel"
                /> */}
                {/* <CSVLink
                  onClick={() => toast.success("Excel Download Successful")}
                  filename={`${individualproduct} Product ${getCurrentTime()}.xls`}
                  data={currentItems}
                  className="btn btn-success btn-sm px-4 me-2"
                >
                  Export Excel
                </CSVLink> */}
                <DownloadTableExcel
                  filename="report"
                  sheet="report"
                  currentTableRef={tableRef.current}
                >
                  <button className="btn btn-success btn-sm px-4 me-2">
                    {" "}
                    Export excel{" "}
                  </button>
                </DownloadTableExcel>
              </div>
              <div>
                <ReactPaginate
                  breakLabel="..."
                  nextLabel=" >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={parseInt(pagenumber)}
                  previousLabel="< "
                  renderOnZeroPageCount={null}
                  breakClassName={"page-item"}
                  breakLinkClassName={"page-link"}
                  containerClassName={"pagination"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  previousClassName={"page-item"}
                  previousLinkClassName={"page-link"}
                  nextClassName={"page-item"}
                  nextLinkClassName={"page-link"}
                  activeClassName={"active"}
                />
              </div>
            </div>
            {isLoading ? (
              <Loader />
            ) : (
              <table
                ref={tableRef}
                className="table bg-white"
                id="exportExcel"
                style={{ fontSize: "13px", marginLeft: "1px" }}
              >
                <thead
                  className="text-center shadow sticky-top "
                  style={{
                    backgroundColor: "#b4bec2",
                    top: "60px",
                    zIndex: "0",
                  }}
                >
                  <tr className="text-dark" style={{ border: "none" }}>
                    <th style={{ fontSize: "14px", fontWeight: 500 }}>SL</th>
                    <th style={{ fontSize: "14px", fontWeight: 500 }}>
                      Action
                    </th>

                    <th style={{ fontSize: "14px", fontWeight: 500 }}>
                      Waybill
                    </th>
                    <th style={{ fontSize: "14px", fontWeight: 500 }}>
                      Order ID
                    </th>

                    <th style={{ fontSize: "14px", fontWeight: 500 }}>
                      Consignee Name
                    </th>
                    <th style={{ fontSize: "14px", fontWeight: 500 }}>
                      Consignee Number
                    </th>
                    <th style={{ fontSize: "14px", fontWeight: 500 }}>
                      Consignee Address
                    </th>
                    <th style={{ fontSize: "14px", fontWeight: 500 }}>
                      Details
                    </th>

                    <th style={{ fontSize: "14px", fontWeight: 500 }}>
                      Pin Code
                    </th>
                    <th style={{ fontSize: "14px", fontWeight: 500 }}>Value</th>
                    <th style={{ fontSize: "14px", fontWeight: 500 }}>
                      Weight
                    </th>
                    <th style={{ fontSize: "14px", fontWeight: 500 }}>
                      Reason
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center border border-secondary">
                  {currentItems &&
                    currentItems.map((single_message, i) => {
                      return (
                        <>
                          <tr key={single_message.waybilL_NUMBER}>
                            <td style={{ fontSize: "14px" }} data-title="SL">
                              {currentItemsP === 0
                                ? i + 1
                                : i < 9
                                ? currentItemsP + "0" + (i + 1)
                                : currentItemsP !== 0 && i < 99
                                ? currentItemsP + "" + (i + 1)
                                : i === 99
                                ? currentItemsP + 1 + "00"
                                : 0}
                            </td>
                            <td data-title="Action">
                              <button
                                style={{ width: "110px" }}
                                className="btn btn-sm btn-outline-primary "
                                onClick={(e) =>
                                  openModal(e, single_message.waybilL_NUMBER)
                                }
                              >
                                view
                              </button>
                            </td>

                            <td
                              style={{ fontSize: "14px" }}
                              data-title="WayBill Number"
                            >
                              {single_message.waybilL_NUMBER}
                            </td>
                            <td
                              style={{ fontSize: "14px" }}
                              data-title=" Order Id"
                            >
                              {single_message.ordeR_ID}
                            </td>

                            <td
                              style={{ fontSize: "14px" }}
                              data-title=" Consignee Name"
                            >
                              {single_message.consigneE_NAME}
                            </td>
                            <td
                              style={{ fontSize: "14px" }}
                              data-title=" Consignee Number"
                            >
                              {single_message.contacT_NUMBER}
                            </td>
                            <td
                              style={{ fontSize: "14px" }}
                              data-title=" Consignee Address"
                            >
                              {single_message.address}
                            </td>
                            <td
                              style={{ fontSize: "14px" }}
                              data-title="Product Details"
                            >
                              {single_message.producT_DETAILS}
                            </td>

                            <td
                              style={{ fontSize: "14px" }}
                              data-title="Pin Code"
                            >
                              {single_message.pincode}
                            </td>
                            <td
                              style={{ fontSize: "14px" }}
                              data-title="Product Value"
                            >
                              {single_message.producT_VALUE}{" "}
                            </td>
                            <td
                              style={{ fontSize: "14px" }}
                              data-title="Product Weight"
                            >
                              {single_message.producT_WEIGHT}
                            </td>

                            <td
                              style={{ fontSize: "14px" }}
                              data-title="Product Weight"
                            >
                              {single_message.reason}
                            </td>
                          </tr>
                        </>
                      );
                    })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <Modal
          isOpen={infoModalOpen}
          style={customStyles}
          onRequestClose={closeInvoiceModal}
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
            <h4>Datewise Status</h4>

            {/*  */}

            {/* <div className="box">
          <section className="root">
            <figure>
              <img
                src="https://image.flaticon.com/icons/svg/970/970514.svg"
                alt
              />
              <figcaption>
                <h4>Tracking Details</h4>
                <h6>Order Id</h6>
                <h2>{parcelInformation.ordeR_ID}</h2>
              </figcaption>
            </figure>
            <div className="order-track">
              {track.map((single_track) => (
                <div className="order-track-step">
                  <div className={single_track.color}>
                    <span className="order-track-status-dot" />
                  </div>
                  <div className="order-track-text">
                    <div>
                      <div className="mx-auto text-center"></div>
                      <div className="order-track-text-stat">
                        <span>
                          {single_track.stage}- {single_track.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div> */}
            <div className="d-flex">
              <div className="order-track shadow p-3 mb-5 bg-white rounded m-auto">
                {productinfo.status_datetime &&
                  productinfo.status_datetime.map((single_product) => {
                    return (
                      <div className="order-track-step h-100">
                        <div className="bg-success d-flex">
                          <span className="text-warning p-2 m-auto">
                            {/* order-track-status-dot */}
                            {single_product.processing_status ==
                            "Product in System"
                              ? productIcon
                              : single_product.processing_status ==
                                "Product in Bag"
                              ? bagIcon
                              : single_product.processing_status ==
                                "Product in Transit "
                              ? transitIcon
                              : single_product.processing_status ==
                                "RECEIVED BY DC (OK) "
                              ? deliveryIcon
                              : single_product.processing_status ==
                                "Product Assign to FE "
                              ? fEIcon
                              : single_product.processing_status ==
                                "Product Received by FE "
                              ? productReceiveIcon
                              : single_product.processing_status ==
                                "Product Delivered "
                              ? deliveryHandIcon
                              : productIcon}
                          </span>
                        </div>
                        <div className="order-track-text">
                          <div className="">
                            <div className="order-track-text-stat ">
                              <span className=" d-inline-block d-flex border-bottom">
                                {single_product.processing_status}
                                {"  : "}
                                <span className="justify-content-end">
                                  {" "}
                                  {single_product.date_time}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/*  */}

            {/* <table className="table table-bordered table-sm">
              <thead>
                <th>Date time</th>
                <th>Processing status</th>
              </thead>
              <tbody>
                {productinfo.status_datetime &&
                  productinfo.status_datetime.map((single_product) => (
                    <tr>
                      <td>{single_product.date_time}</td>
                      <td>{single_product.processing_status}</td>
                    </tr>
                  ))}
              </tbody>
            </table> */}

            <div className="d-flex">
              <div className="order-track shadow p-3 mb-5 bg-white rounded m-auto modal-width">
                <h4>Details Info</h4>

                <h6>
                  <span className="badge bg-secondary">Product Waybill</span>:
                  {productinfo.product_infor &&
                    productinfo.product_infor.producT_WAYBILL_NUMBER}
                </h6>
                <h6>
                  <span className="badge bg-secondary">Product Name</span>:
                  {productinfo.product_infor &&
                    productinfo.product_infor.producT_DESCRIPTION}
                </h6>
                <h6>
                  <span className="badge bg-secondary">
                    Product Entry date{" "}
                  </span>
                  :
                  {productinfo.product_infor &&
                    productinfo.product_infor.producT_ENTRY_TIME}
                </h6>
                <h6>
                  <span className="badge bg-secondary">Product COD</span>:
                  {productinfo.product_infor &&
                    productinfo.product_infor.producT_VALUE_AMOUNT}
                </h6>
                <h6>
                  <span className="badge bg-secondary">Order ID</span>:
                  {productinfo.product_infor &&
                    productinfo.product_infor.referencE_NO}
                </h6>
                <h6>
                  <span className="badge bg-secondary">Consignee Name</span>:
                  {productinfo.product_infor &&
                    productinfo.product_infor.consigneE_NAME}
                </h6>

                <h6>
                  <span className="badge bg-secondary">Client Name</span>:
                  {productinfo.product_infor &&
                    productinfo.product_infor.merchentName}
                </h6>
              </div>
            </div>
          </div>
        </Modal>
      </div>
      <div className="">
        <div className="col-12">
          <Footer />
        </div>
      </div>
    </>
  );
};
export default Individualproductlist;
