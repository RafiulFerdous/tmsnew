import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import './operation.css'
import { SearchContext } from "../../Context/searchContext";
import { SearchButtonContext } from "../../Context/buttonContext";
import { Pie } from "react-chartjs-2";
//import './bar.css'
import { jsPDF } from "jspdf";

import "jspdf-autotable";
import { LoginContext } from "../../Context/loginContext";
import { CSVLink, CSVDownload } from "react-csv";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Modal from "react-modal";
import {
  Linksidebar,
  CustomerCareLinksidebar,
  Salessidebar,
  Operationsidebar,
  Degital_Ocean_flag,
  company_name,
} from "../../Common/Linksidebar";

import { toast } from "react-toastify";
//import './tabletd.css';
//import './operation.css'
import { orange } from "@material-ui/core/colors";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faCartPlus,
  faChalkboardTeacher,
  faHandHolding,
  faPeopleCarry,
  faShippingFast,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import JsBarcode from "jsbarcode";
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
  Customer: "CUSTOMER",
};

let employId, setemployId;
let date_time, setdate_time;
Modal.setAppElement("#root");

const Homeoperationtable = (props) => {
  toast.configure();
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
  var { searchInformation, setsearchInformation } = useContext(SearchContext);
  var { searchButtonInformation, setsearchButtonInformation } =
    useContext(SearchButtonContext);
  if (searchButtonInformation) {
    //search button click korar pore ki hobe...........
    setsearchInformation("");
    setsearchButtonInformation(false);
  }

  let json_information = props.response;
  const [alldata, setalldata] = useState([]);
  const [infoData, setinfoData] = useState([]);

  const [SubmitFlag, setSubmitFlag] = useState(false);
  const [SubmitFlag1, setSubmitFlag1] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  const [returnlen, setreturnlen] = useState([]);
  const [unlen, setunlen] = useState([]);
  const [holdlen, setholdlen] = useState([]);
  const [lostlen, setlostlen] = useState([]);
  const [deliverylen, setdeliverylen] = useState([]);
  const [waybill, setwaybill] = useState([]);
  const [allproductdata, setallproductdata] = useState([]);
  const [allfilterproductdata, setallfilterproductdata] = useState([]);

  // logininfo

  const [employId, setemployId] = useState("");
  const [checkSelectedValue, setCheckSelectedValue] = useState([]);

  const [information, setinformation] = useState({});
  const [payload, setpayload] = useState(false);
  const [newalldata, setnewalldata] = useState([]);

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
    setnewalldata(json_information.message);
    // setreturnlen(json_information.message.returned_product_information);
    // setunlen(json_information.message.unattempted_product_information);
    // setholdlen(json_information.message.holded_product_information);
    // setlostlen(json_information.message.lost_product_information);
    // setdeliverylen(json_information.message.delevered_product_information);
  }, [json_information]);

  console.log("this is setnewalldata", newalldata);

  // console.log(returnlen.length);
  const state = {
    labels: [
      "Total Delivery",
      "Total Lost or Damage",
      "Total Hold",
      "Total Return",
      "Total Unattempted",
    ],
    datasets: [
      {
        label: "Volume",
        backgroundColor: [
          "#2FDE00",
          "#B21F00",
          "#C9DE00",
          "#FFA500",
          "#4287f5",
        ],
        hoverBackgroundColor: [
          "#501800",
          "#4B5000",
          "#175000",
          "#FFA500",
          "#9942f5",
        ],
        data: [
          deliverylen.length,
          lostlen.length,
          holdlen.length,
          returnlen.length,
          unlen.length,
        ],
      },
    ],
  };
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
  const [searchTermFlag, setsearchTermFlag] = useState(false);
  const [searchTermAltFlag, setsearchTermAltFlag] = useState(false);

  const handleonChange = (event) => {
    setSearchTerm(event.target.value);
  };
  // const handleonChange1 = event => {
  //     setsearchterm1(event.target.value);
  // };
  // React.useEffect(() => {
  //     const users1 = json_information.message.unattempted_product_information.filter(p =>
  //         p.waybill_number.toString().toLowerCase().includes(searchTerm.toString().toLowerCase()) || p.order_id.toString().toLowerCase().includes(searchTerm.toString().toLowerCase()) ||
  //         p.dc_office_name.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())
  //     );
  //     setSearchResults(users1);
  // }, [searchTerm]);
  // React.useEffect(() => {
  //     const users2 = json_information.message.delevered_product_information.filter(p =>
  //         p.waybill_number.toString().toLowerCase().includes(searchTerm.toString().toLowerCase()) || p.order_id.toString().toLowerCase().includes(searchTerm.toString().toLowerCase()) ||
  //         p.dc_office_name.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())
  //     );
  //     setSearchResults1(users2);

  // }, [searchterm1]);
  //filtering all data
  // useEffect(() => {
  //     console.log("json data", json_information)
  //     let temp = []
  //     json_information.message.unattempted_product_information.map(product => {
  //         temp.push(product)
  //     })
  //     json_information.message.delevered_product_information.map(product => {
  //         temp.push(product)
  //     })
  //     json_information.message.returned_product_information.map(product => {
  //         temp.push(product)
  //     })
  //     json_information.message.lost_product_information.map(product => {
  //         temp.push(product)
  //     })
  //     json_information.message.holded_product_information.map(product => {
  //         temp.push(product)
  //     })
  //     console.log("temp all data", temp)
  //     setallproductdata(temp)
  //     setallfilterproductdata(temp)
  //
  // }, [])
  // console.log("this is unattempted_product_information", json_information.message.unattempted_product_information)
  // console.log("this is delevered_product_information", json_information.message.delevered_product_information)
  // console.log("this is returned_product_information", json_information.message.returned_product_information)
  // console.log("this is lost_product_information", json_information.message.lost_product_information)
  // console.log("this is holded_product_information", json_information.message.holded_product_information)
  // useEffect(() => {
  //     //console.log("entering filter effect", allproductdata)
  //     const users1 = allproductdata.filter(p =>
  //         p.waybill_number.toString().toLowerCase().includes(searchTerm.toString().toLowerCase()) || p.order_id.toString().toLowerCase().includes(searchTerm.toString().toLowerCase()) ||
  //         p.dc_office_name.toString().toLowerCase().includes(searchTerm.toString().toLowerCase()) || p.customer_name.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())
  //         || p.consignee_name.toString().toLowerCase().includes(searchTerm.toString().toLowerCase()) || p.product_processing_stage.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())
  //         || p.product_processing_stage_datetime.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())
  //         || p.bag_waybill&& p.bag_waybill.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())||
  //         p.customer_number&& p.customer_number.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())
  //     );
  //     setallfilterproductdata(users1);
  // }, [searchTermAltFlag, allproductdata]);

  useEffect(() => {
    if (searchTerm.length === 0) {
      setallfilterproductdata(allproductdata);
    } else {
      let waybilllist = searchTerm.split(",");
      let temp = [];
      console.log("waybillist", waybilllist);
      if (waybilllist.length <= 1) {
        setsearchTermAltFlag(!searchTermAltFlag);
      } else {
        //console.log("entering filter effect", allproductdata)
        for (let i = 0; i < waybilllist.length; i++) {
          for (let j = 0; j < allproductdata.length; j++) {
            if (allproductdata[j].waybill_number === waybilllist[i].trim()) {
              temp.push(allproductdata[j]);
            }
          }
        }
        // const users1 = waybilllist.map((waybill)=>{
        //     return( allproductdata.filter(p =>
        //         p.waybill_number.toString().toLowerCase().includes(waybill.toString().toLowerCase())
        //         // || p.order_id.toString().toLowerCase().includes(searchTerm.toString().toLowerCase()) ||
        //         // p.dc_office_name.toString().toLowerCase().includes(searchTerm.toString().toLowerCase()) || p.customer_name.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())
        //         // || p.consignee_name.toString().toLowerCase().includes(searchTerm.toString().toLowerCase()) || p.product_processing_stage.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())
        //         // || p.product_processing_stage_datetime.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())
        //     ))

        // })
        console.log("filterdata", temp);
        setallfilterproductdata(temp);
      }
    }
  }, [searchTermFlag, allproductdata]);

  const pdfGenerate = () => {
    const doc = new jsPDF("portrait", "px", "a4");
    doc.autoTable({ html: "#tableq" });
    doc.save("Report.pdf");
  };

  // update data

  function update(e) {
    e.preventDefault();
    setSubmitFlag1(!SubmitFlag1);
  }

  // model

  function openModal(e, way) {
    console.log("waybill", way);

    setwaybill(way);
    setSubmitFlag(!SubmitFlag);
    setIsOpen(true);
  }

  // operationsingleproductinfo

  useEffect(() => {
    if (!logingInformation_LocalStore.token || waybill.length === 0) return;
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

  //  update api here
  const searchflag = (e) => {
    e.preventDefault();
    setsearchTermFlag(!searchTermFlag);
  };
  const resetflag = (e) => {
    e.preventDefault();
    setSearchTerm("");
    setsearchTermFlag(!searchTermFlag);
  };

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

  //console.log("this is infodata",infoData)

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

  //console.log("this is waybill",waybill)
  //console.log("this is product name",product)

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

  // ------------------excel download function start---------------------------

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const fileName = "Home PC Table ";

  const exportToCSV = (apiData, fileName) => {
    toast.success("Excel Download Successful");
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  // ------------------excel download function end---------------------------

  const handleCheck = (e) => {
    const { name, checked } = e.target;
    if (name === "allselect") {
      const tempUser = newalldata.map((e) => {
        return { ...e, isChecked: checked };
      });
      setnewalldata(tempUser);
    } else {
      const tempUser = newalldata.map((e) =>
        e.waybill_number === name ? { ...e, isChecked: checked } : e
      );

      setnewalldata(tempUser);
    }
  };
  // let checkValue = [];

  // get check box data
  useEffect(() => {
    setCheckSelectedValue(newalldata.filter((e) => e.isChecked == true));
  }, [newalldata]);

  let print_function = (e) => {
    // toast.info("Please Wait a Moment!", {
    //   position: "top-right",
    //   autoClose: 2500,
    // });

    let pdf = new jsPDF("l", "mm", [101.6, 76.2]);

    checkSelectedValue &&
      checkSelectedValue.map((single_product_information, list_index) => {
        if (checkSelectedValue[list_index]) {
          // let elem = document.getElementById(single_product_information.waybill_number);
          // inputs.push(elem);
          // console.log("elem",elem)
          pdf.addPage([101.6, 76.2, "landscape"]);
          pdf.rect(3, 3, 96, 70, "D");

          pdf.addImage("/images/e_desh_logo.png", 4, 4, 24, 8);
          pdf.setFontSize(10);
          pdf.addFont("SolaimanLipi_20-04-07");
          pdf.setFont("SolaimanLipi_20-04-07");
          pdf.text(
            "Order ID: " + single_product_information.order_id,
            37,
            12,
            { maxWidth: 100 },
            0
          );
          pdf.setFontSize(10);
          pdf.text(
            "Date: " + single_product_information?.pickedup_date?.split("T")[0],
            37,
            8,
            { maxWidth: 50 },
            0
          );

          pdf.setFontSize(13);
          pdf.text("3PL-P", 88, 8, { maxWidth: 55, align: "center" }, 0);

          pdf.setFontSize(10);
          pdf.text(
            "----------------------------------------------------------------------------------",
            3,
            15
          );

          pdf.text("Merchant : ", 5, 18, { maxWidth: 55 }, 0);

          pdf.text(
            [single_product_information.customer_name],
            25,
            18,
            { maxWidth: 50 },
            0
          );
          //customer contact
          pdf.text(
            // single_product_information.customer_contact,
            "+8809642601777",
            5,
            22,
            { maxWidth: 55 },
            0
          );
          pdf.setFont("SolaimanLipi_20-04-07");
          //consignee name contact and address
          pdf.text(
            [
              "Consignee : " + single_product_information.consignee_name,
              "Contact: " + single_product_information.consignee_number,
              "Address: " +
                single_product_information.consignee_address.length ===
              30
                ? single_product_information.consignee_address + `</br>`
                : single_product_information.consignee_address,
            ],
            5,
            27,
            {
              maxWidth: 100,
              //font: "SolaimanLipi_20-04-07"
            },
            0
          );
          // pdf.text(single_product_information.consignee_name, 25, 27);
          pdf.setFont("SolaimanLipi_20-04-07");

          //cod pin and dc name
          pdf.text(
            [
              "COD Amount: " + single_product_information.product_value,

              "Target Dc: " + single_product_information.dc_office_name,
            ],

            5,
            44,
            {
              maxWidth: 100,
              //font: "SolaimanLipi_20-04-07",
            },
            0
          );
          pdf.text("Pin: " + single_product_information.pincode, 50, 44);
          pdf.setFont("SolaimanLipi_20-04-07");

          JsBarcode("#PDFTable", single_product_information.waybill_number, {
            format: "CODE128",

            width: 5,
            height: 40,
            displayValue: false,
          });

          const img = document.querySelector("img#PDFTable");
          pdf.addImage(img.src, "WEBP", 25, 49, 50, 18);

          // pdf.addSvgAsImage(img.src,  19, 100, 65, 35);
          pdf.setFontSize(12);

          //waybill number
          pdf.text(
            single_product_information.waybill_number,
            37,
            68,
            { maxWidth: 55 },
            0
          );
          pdf.setFontSize(10);

          pdf.text(
            "Disclaimer: Please Do not accept Delivery if Packing is Torn",
            51,
            71,
            { maxWidth: 100, align: "center" },
            0
          );
        }
      });
    if (checkSelectedValue.length > 0) {
      pdf.deletePage(1);

      pdf.save("Labels " + getCurrentTime() + ".pdf");

      pdf.autoPrint();
      pdf.addPage([101.6, 76.2, "landscape"]);
      pdf.deletePage(pdf.internal.getNumberOfPages());
      window.open(pdf.output("bloburl"), "_blank");
    }
  };

  return (
    <>
      <div className="container" id="">
        <div className="col-md-12 d-flex flex-row-reverse mt-4"></div>

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
              {/*  */}
              <div className="d-flex">
                <div className="order-track shadow p-3 mb-5 bg-white rounded m-auto">
                  <h4>Datewise Status</h4>
                  {infoData.status_datetime &&
                    infoData.status_datetime.map((single_product) => {
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

              <div className="d-flex">
                <div className="order-track shadow p-3 mb-5 bg-white rounded m-auto modal-width">
                  <h4>EOD Status</h4>
                  <h6>
                    <span className="badge bg-secondary">EOD status</span>:{" "}
                    {infoData.product_infor &&
                      infoData.product_infor.eoD_COMPLETE_OR_NOT}
                  </h6>

                  <h4>Update Status</h4>
                  <h6>
                    <span className="badge bg-secondary">Update status</span>:{" "}
                    {infoData.product_infor &&
                      infoData.product_infor.update_track}
                  </h6>

                  <h4>Details Info</h4>

                  <h6>
                    <span className="badge bg-secondary">
                      Product Waybill Number
                    </span>
                    :{" "}
                    {infoData.product_infor &&
                      infoData.product_infor.producT_WAYBILL_NUMBER}
                  </h6>

                  <h6>
                    <span className="badge bg-secondary">
                      Bag Waybill Number
                    </span>
                    :{" "}
                    {infoData.product_infor &&
                      infoData.product_infor.baG_WAYBILL_NUMBER &&
                      infoData.product_infor.baG_WAYBILL_NUMBER.replaceAll(
                        "#",
                        ""
                      )}
                  </h6>
                </div>
              </div>
              <div className="d-flex">
                <div className="order-track shadow p-3 mb-5 bg-white rounded m-auto modal-width">
                  <form className="bordered">
                    <h2 className="text-center text-dark">Edit Here</h2>
                    <div className="form-group">
                      <label>PRODUCT_NAME</label>
                      <input
                        type="text"
                        disabled={true}
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
                        disabled={true}
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
                        disabled={true}
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
                        disabled={true}
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
                        disabled={true}
                        className="form-control"
                        value={address}
                        onChange={(e) => {
                          setaddress(e.target.value);
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label>Product Value Amount</label>
                      <input
                        type="text"
                        disabled={true}
                        className="form-control"
                        value={productvalueamount}
                        onChange={(e) => {
                          setproductvalueamount(e.target.value);
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label>PRODUCT WAYBILL NUMBER</label>
                      <input
                        type="text"
                        disabled={true}
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
                        disabled={true}
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
                        disabled={true}
                        className="form-control"
                        value={pincode}
                        onChange={(e) => {
                          setpincode(e.target.value);
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label>Area Code</label>
                      <input
                        type="text"
                        disabled={true}
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
                        disabled={true}
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
                        disabled={true}
                        className="form-control"
                        value={producttype}
                        onChange={(e) => {
                          setproducttype(e.target.value);
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label>Product Urgent Status</label>
                      <input
                        type="text"
                        disabled={true}
                        className="form-control"
                        value={producturgentstatus}
                        onChange={(e) => {
                          setproducturgentstatus(e.target.value);
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label>Product Total</label>
                      <input
                        type="text"
                        disabled={true}
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
                        disabled={true}
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
                        disabled={true}
                        className="form-control"
                        value={productdetail}
                        onChange={(e) => {
                          setproductdetail(e.target.value);
                        }}
                      />
                    </div>

                    {/* <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={update}
                    >
                      Update
                    </button> */}
                  </form>
                </div>
              </div>
            </div>
          </Modal>
        </div>

        {/* modelend */}

        <div>
          <div className="row mt-3">
            <div
              className="col-md-12 d-flex justify-content-center"
              id="download"
            >
              <div></div>
            </div>
          </div>

          <div id="no-more-tables">
            {/*Table*/}
            <div className="mb-3">
              <button
                className="btn btn-sm btn-info px-3 rounded-3"
                onClick={(e) => exportToCSV(newalldata, fileName)}
              >
                Export Excel
              </button>

              <CSVLink
                filename="Template.csv"
                data={csvData}
                className="btn btn-dark btn-sm px-4 mx-2 rounded-3"
              >
                CSV Template
              </CSVLink>
              <button
                className="btn btn-info btn-sm px-4 mx-2 rounded-3"
                onClick={(e) => print_function(e)}
                onFocus={() =>
                  toast.info("Please Wait a Moment!", {
                    position: "top-right",
                    autoClose: 2500,
                  })
                }
                disabled={checkSelectedValue.length == 0}
              >
                Print All
              </button>
            </div>
            <table
              // className="col-md-12 table-bordered table-striped table-condensed cf css-serial bg-white"
              // id="opspc"
              // style={{ fontSize: "12px", marginLeft: "-15px" }}

              className="table css-serial bg-white"
              id="opspc"
              style={{ fontSize: "12px", marginLeft: "1px" }}
            >
              {/*Table head*/}
              <thead
                className="text-center shadow sticky-top "
                // style={{ backgroundColor: "#f1f1f1" }}
                style={{
                  backgroundColor: "#b4bec2",
                  top: "60px",
                  zIndex: "0",
                }}
              >
                <tr className="text-dark" style={{ border: "none" }}>
                  <th scope="col">SL</th>
                  {/*<th></th>*/}
                  <th>
                    select
                    <input
                      type="checkbox"
                      checked={
                        newalldata.filter((e) => e.isChecked !== true).length <
                        1
                      }
                      name="allselect"
                      onChange={handleCheck}
                    />
                  </th>

                  <th scope="col">WayBill</th>
                  <th scope="col">Bag WayBill</th>
                  <th scope="col">Order ID</th>
                  <th scope="col">COD</th>
                  <th scope="col">Partner</th>

                  <th scope="col">Merchant Name</th>
                  <th scope="col">Merchant Number</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Customer Number</th>
                  <th scope="col">Customer Address</th>
                  <th scope="col">Details</th>
                  <th scope="col">Weight</th>
                  <th scope="col">DC Office</th>
                  <th scope="col">Pin Code</th>
                  <th scope="col">Final Status</th>
                  <th scope="col">Current Status</th>
                  <th scope="col">Entry Date</th>
                  <th scope="col">Date</th>
                  <th scope="col">Reason</th>
                  <th scope="col">SLA Status</th>
                  <th scope="col">Total Attempt</th>
                </tr>
              </thead>
              {/*Table head*/}
              {/*Table body*/}
              <tbody className="text-center">
                {/* {console.log("All filter data", allfilterproductdata)} */}
                {newalldata &&
                  newalldata.map((single_message) => {
                    let clor;
                    let finalstatus;
                    if (
                      single_message.color_code.includes("Product in System")
                    ) {
                      clor = "bg-primary";
                    } else if (single_message.color_code.includes("Hold")) {
                      clor = "bg-warning";
                    } else if (
                      single_message.color_code.includes(
                        "RETURNED_PRODUCT_INFORMATION"
                      )
                    ) {
                      clor = "bg-info";
                    } else if (
                      single_message.color_code.includes(
                        "DELEVERED_PRODUCT_INFORMATION"
                      )
                    ) {
                      clor = "bg-success";
                    } else if (
                      single_message.color_code.includes(
                        "LOST_PRODUCT_INFORMATION"
                      )
                    ) {
                      clor = "bg-danger";
                    } else {
                      clor = "bg-info";
                    }

                    if (
                      single_message.color_code.includes(
                        "DELEVERED_PRODUCT_INFORMATION"
                      )
                    ) {
                      finalstatus = "Delivered";
                    } else if (
                      single_message.color_code.includes(
                        "LOST_PRODUCT_INFORMATION"
                      )
                    ) {
                      finalstatus = "Lost";
                    } else if (
                      single_message.color_code.includes(
                        "RETURNED_PRODUCT_INFORMATION"
                      )
                    ) {
                      finalstatus = "Returned";
                    } else if (single_message.color_code.includes("PRODUCT")) {
                      finalstatus = "Product In System";
                    } else {
                      finalstatus = "";
                    }

                    let sla = "Pass";
                    if (
                      single_message.sla_status.includes(
                        "SLA Successfully Failed."
                      )
                    ) {
                      sla = "Failed";
                    } else sla = "Pass";

                    return (
                      // key={single_message.waybill_number}
                      <tr>
                        <td data-title="SL"></td>
                        <td>
                          <input
                            type="checkbox"
                            onChange={handleCheck}
                            name={single_message.waybill_number}
                            checked={single_message?.isChecked || false}
                          />
                        </td>

                        <td data-title="WayBill">
                          <button
                            className="btn btn-sm btn-outline-primary "
                            onClick={(e) =>
                              openModal(e, single_message.waybill_number)
                            }
                          >
                            {single_message.waybill_number}
                          </button>
                        </td>
                        <td data-title="Bag WayBill">
                          {single_message.bag_waybill}
                        </td>
                        <td data-title="Order ID">
                          {" "}
                          {single_message.order_id}
                        </td>
                        <td data-title="COD">
                          {" "}
                          {single_message.product_value}
                        </td>

                        <td data-title="COD">
                          {" "}
                          {single_message.korear_company_name}
                        </td>
                        <td data-title="Merchant Name">
                          <span className="word-break">
                            {single_message.customer_name}
                          </span>
                        </td>
                        <td data-title="Merchant Number">
                          {single_message.customer_number}
                        </td>
                        <td data-title="Customer Name">
                          <span className="word-break">
                            {single_message.consignee_name}
                          </span>
                        </td>
                        <td data-title="Customer Number">
                          {single_message.consignee_number}
                        </td>
                        <td data-title="Customer Address">
                          <span className="word-break">
                            {single_message.consignee_address}
                          </span>
                        </td>
                        <td data-title="Details">
                          <span className="word-break">
                            {single_message.product_detail}
                          </span>
                        </td>

                        <td data-title="DC Office & PIN">
                          {single_message.product_weight}
                          {/*{single_message.pincode}*/}
                        </td>
                        <td data-title="DC Office & PIN">
                          {single_message.dc_office_name}
                          {/*{single_message.pincode}*/}
                        </td>
                        <td data-title="PIN">{single_message.pincode}</td>
                        <td
                          data-title="Final Status"
                          className={`${clor} text-white`}
                        >
                          {finalstatus}
                        </td>
                        <td
                          data-title="Current Status"
                          className={`${clor} text-white`}
                        >
                          {single_message.product_processing_stage}
                        </td>

                        <td data-title="Entry Date">
                          {single_message.product_entry_time &&
                            single_message.product_entry_time.split("T")[0]}
                        </td>

                        <td data-title="Date">
                          {single_message.product_processing_stage_datetime &&
                            single_message.product_processing_stage_datetime.split(
                              "T"
                            )[0]}
                        </td>

                        <td data-title="Reason" className="h-100">
                          <span className="word-break ">
                            {single_message.reason}
                          </span>
                        </td>
                        <td data-title="SLA Status">
                          {sla}
                          {/*    {single_message.sla_status}*/}
                        </td>
                        <td data-title="Total Attempt">
                          {single_message.total_attempt}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
              {/*Table body*/}
            </table>
            {/*Table*/}
            <img id="PDFTable" style={{ display: "none" }} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Homeoperationtable;
