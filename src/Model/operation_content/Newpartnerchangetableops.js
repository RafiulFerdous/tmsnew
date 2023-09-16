import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDom from "react-dom";
// import "./operation.css";
import { SearchContext } from "../../Context/searchContext";
import { SearchButtonContext } from "../../Context/buttonContext";
import { Pie } from "react-chartjs-2";
// import "./bar.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { LoginContext } from "../../Context/loginContext";
import { CSVLink, CSVDownload } from "react-csv";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Modal from "react-modal";
import InfiniteScroll from "react-infinite-scroll-component";
import "../../SolaimanLipi_20-04-07-normal";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import {
  Linksidebar,
  CustomerCareLinksidebar,
  Salessidebar,
  Operationsidebar,
  Degital_Ocean_flag,
  company_name,
} from "../../Common/Linksidebar";

import { toast } from "react-toastify";
// import "./tabletd.css";
// import "./operation.css";
import { orange } from "@material-ui/core/colors";
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
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import JsBarcode from "jsbarcode";

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

let employId, setemployId;
let date_time, setdate_time;
Modal.setAppElement("#root");

const Newpartnerchangetableops = (props) => {
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
  console.log("res", json_information);
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

  const [filterClientforpartnerchange, setfilterClientforpartnerchange] =
    useState("");

  // logininfo

  const [employId, setemployId] = useState("");
  const [date_time, setdate_time] = useState("");

  const [information, setinformation] = useState({});
  const [payload, setpayload] = useState(false);
  const [newalldata, setnewalldata] = useState([]);
  console.log("newalldata", newalldata);
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
  const [dataforcsv, setdataforcsv] = useState([]);

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

  //code for csv download-------///////////--------------------

  useEffect(() => {
    let csv = [];
    allfilterproductdata.map((single) => {
      let clor;
      let finalstatus;
      if (single.color_code.includes("Product in System")) {
        clor = "bg-primary";
      } else if (single.color_code.includes("Hold")) {
        clor = "bg-warning";
      } else if (single.color_code.includes("RETURNED_PRODUCT_INFORMATION")) {
        clor = "bg-info";
      } else if (single.color_code.includes("DELEVERED_PRODUCT_INFORMATION")) {
        clor = "bg-success";
      } else if (single.color_code.includes("LOST_PRODUCT_INFORMATION")) {
        clor = "bg-danger";
      } else {
        clor = "bg-info";
      }

      if (single.color_code.includes("DELEVERED_PRODUCT_INFORMATION")) {
        finalstatus = "Delivered";
      } else if (single.color_code.includes("LOST_PRODUCT_INFORMATION")) {
        finalstatus = "Lost";
      } else if (single.color_code.includes("RETURNED_PRODUCT_INFORMATION")) {
        finalstatus = "Returned";
      } else if (single.color_code.includes("PRODUCT")) {
        finalstatus = "Product In System";
      } else {
        finalstatus = "";
      }
      let sla = "Pass";
      if (single.sla_status.includes("SLA Successfully Failed.")) {
        sla = "Failed";
      } else sla = "Pass";
      let obj = {
        "Waybill Number": single.waybill_number,
        "Bag waybill": single.bag_waybill,
        "order id": single.order_id,
        COD: single.product_value,
        "Merchant Name": single.customer_name,
        "Merchant Number": single.customer_number,
        "Customer Name": single.consignee_name,
        "Customer Number": single.consignee_number,
        "Customer Address": single.consignee_address,
        Details: single.product_detail,
        Weight: single.product_weight,
        Partner: single.korear_company_name,
        "DC Office": single.dc_office_name,
        "Coverage Area": single.coverage_area,
        "Pin Code": single.pincode,
        "Final Status": finalstatus,
        "Current Status": single.product_processing_stage,
        "Entry Date": single.product_entry_time.split("T")[0],
        "Pickup Date":
          single.pickedup_date && single?.pickedup_date?.split("T")[0],
        Date: single?.product_processing_stage_datetime?.split("T")[0],
        Reason: single.reason,
        "SLA Status": sla,
        "Paid/Unpaid": single.paid_or_unpaid,
        "Open/Close": single.openBox_or_CloseBox,
        "Nextday/Regular": single.nextDay_or_Regular,
        "Total Attempt": single.total_attempt,
      };
      csv.push(obj);
    });
    setdataforcsv(csv);

    console.log("this is csv data inside effect", csv);
  }, [allfilterproductdata]);

  console.log("this is dataforcsv outside effect", dataforcsv);

  const [count, setCount] = useState({
    prev: 0,
    next: 10,
  });
  const [hasMore, setHasMore] = useState(true);
  const [current, setCurrent] = useState([]);
  useEffect(() => {
    let endpoint = 10;
    console.log("filterdata", allfilterproductdata);
    if (allfilterproductdata.length < 10) {
      endpoint = allfilterproductdata.length;
    }
    setTimeout(() => {
      setCurrent(allfilterproductdata.slice(0, endpoint));
    }, 1000);
    setCount({
      prev: 0,
      next: 10,
    });
    setHasMore(true);
  }, [allfilterproductdata]);
  useEffect(() => {
    console.log("current", current);
  }, [current]);
  const getMoreData = () => {
    if (current.length === allfilterproductdata.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setCurrent((prev) =>
        prev.concat(
          allfilterproductdata.slice(count.prev + 10, count.next + 10)
        )
      );
    }, 500);
    setCount((prevState) => ({
      prev: prevState.prev + 10,
      next: prevState.next + 10,
    }));
  };
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
  useEffect(() => {
    //console.log("entering filter effect", allproductdata)
    const users1 = newalldata.filter(
      (p) =>
        p.waybill_number
          .toString()
          .toLowerCase()
          .includes(searchTerm.toString().toLowerCase()) ||
        p.order_id
          .toString()
          .toLowerCase()
          .includes(searchTerm.toString().toLowerCase()) ||
        p.dc_office_name
          .toString()
          .toLowerCase()
          .includes(searchTerm.toString().toLowerCase()) ||
        p.customer_name
          .toString()
          .toLowerCase()
          .includes(searchTerm.toString().toLowerCase()) ||
        p.consignee_name
          .toString()
          .toLowerCase()
          .includes(searchTerm.toString().toLowerCase()) ||
        p.product_processing_stage
          .toString()
          .toLowerCase()
          .includes(searchTerm.toString().toLowerCase()) ||
        p.product_processing_stage_datetime
          .toString()
          .toLowerCase()
          .includes(searchTerm.toString().toLowerCase()) ||
        (p.bag_waybill &&
          p.bag_waybill
            .toString()
            .toLowerCase()
            .includes(searchTerm.toString().toLowerCase())) ||
        (p.customer_number &&
          p.customer_number
            .toString()
            .toLowerCase()
            .includes(searchTerm.toString().toLowerCase()))
    );
    setallfilterproductdata(users1);
  }, [searchTermAltFlag, newalldata]);

  useEffect(() => {
    if (searchTerm.length === 0) {
      setallfilterproductdata(newalldata);
    } else {
      let waybilllist = searchTerm.split(",");
      let temp = [];
      console.log("waybillist", waybilllist);
      if (waybilllist.length <= 1) {
        setsearchTermAltFlag(!searchTermAltFlag);
      } else {
        //console.log("entering filter effect", allproductdata)
        for (let i = 0; i < waybilllist.length; i++) {
          for (let j = 0; j < newalldata.length; j++) {
            if (newalldata[j].waybill_number === waybilllist[i].trim()) {
              temp.push(newalldata[j]);
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
  }, [searchTermFlag, newalldata]);

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
  }, [SubmitFlag]);

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
    if (employId === "" || employId === null) return;
    // e.preventDefault();
    var axios = require("axios");

    var data = JSON.stringify({
      employee_id: employId,
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
  }, [SubmitFlag1]);

  console.log("this is infodata", infoData);

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

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  // const fileName = "downloaded excel for ops"s;
  const fileName = `Report${getCurrentTime()}`;

  const exportToCSV = (apiData, fileName) => {
    toast.success("Excel Download Successful");
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  let check_box_flag = [];
  const [check_box_flag_state, setcheck_box_flag_state] = useState([]);

  //let select_all_check_box_flag;
  const [select_all_check_box_flag, setselect_all_check_box_flag] =
    useState(false);
  let count_number = newalldata && newalldata.length;
  for (let i = 0; i < count_number; i++) {
    check_box_flag.push(false);
  }

  useEffect(() => {
    setcheck_box_flag_state(check_box_flag);
  }, []);

  let checkbox_click_function = (index_value) => {
    let count_number = newalldata && newalldata.length;
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
      let count_number = newalldata && newalldata.length;
      for (let i = 0; i < count_number; i++) {
        temp_check_box.push(false);
      }
    } else {
      let count_number = newalldata && newalldata.length;
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

  const partnerchange = () => {
    let inputs1 = [];
    newalldata &&
      newalldata.map(async (data, list_index) => {
        if (check_box_flag_state[list_index]) {
          let elem = data.waybill_number;
          inputs1.push(elem);
        }
      });
    console.log("this is  after function call input", inputs1);

    //setSelectedWaybill(inputs1);
    if (filterClientforpartnerchange !== "") {
      if (inputs1.length !== 0) {
        var data = JSON.stringify({
          employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
          //store_id: parseInt(storeid), //selectedUserId  11045
          waybill_list: inputs1,
          company_name: filterClientforpartnerchange,
        });
      } else {
        toast.info("Scan Product lebel OR Select Product");
      }
    } else {
      toast.info("Please Select Partner");
    }

    var axios = require("axios");

    console.log("data", data);
    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/productPartnerDeliveryCompanyChange" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/productPartnerDeliveryCompanyChange" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: data,
    };
    console.log("body parameter pathao post", config);
    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        return json_object;
      })
      .then((res) => {
        // if (res?.status == "Successful Request.") {
        //   toast.success(res?.status, {
        //     position: "top-right",
        //     autoClose: 2500,
        //   });
        // }
        console.log("this is partner change response:", res);
        toast.success("Partner Change Successful");
        setpayload(true);
      })
      .catch(function (error) {
        // toast.error(error.message);
        console.log(error);
      });
  };

  // -----------------------print function start--------------------
  let print_function = async (e) => {
    // toast.info("Please Wait",{
    //     position: "top-right", autoClose: 2500
    // })
    // reactDom.render(<PafContent></PafContent>, document.getElementById("PDFTable"));

    const opt = {
      scale: 3,
    };
    // let elem
    let pdf = new jsPDF();
    let imgData = [];
    let logoimg;
    let inputs = [];
    newalldata &&
      newalldata?.map((single_product_information, list_index) => {
        if (check_box_flag_state[list_index]) {
          // let elem = document.getElementById(single_product_information.waybill_number);
          // inputs.push(elem);
          // console.log("elem",elem)
          pdf.addPage([105, 160]);
          pdf.addImage("/images/e_desh_logo.png", 5, 5, 45, 12);
          pdf.setFontSize(12);
          pdf.addFont("SolaimanLipi_20-04-07");
          pdf.setFont("SolaimanLipi_20-04-07");
          pdf.text(
            "Order Id: " + single_product_information.order_id,
            5,
            25,
            { maxWidth: 55 },
            0
          );
          pdf.setFontSize(10);
          pdf.text(
            "Date: " + single_product_information?.pickedup_date?.split("T")[0],
            70,
            25,
            { maxWidth: 50 },
            0
          );
          pdf.text(
            [
              "Merchant Details: ",
              single_product_information.customer_name,
              "Contact: " + single_product_information.customer_contact,
            ],
            5,
            35,
            { maxWidth: 55 },
            0
          );
          pdf.setFont("SolaimanLipi_20-04-07");
          pdf.text(
            [
              "Consignee Details: ",
              single_product_information.consignee_name &&
                single_product_information.consignee_name,
              "Contact: " + single_product_information.contact,
              "Address: ",
              single_product_information.address,
            ],
            5,
            50,
            {
              maxWidth: 90,
              //font: "SolaimanLipi_20-04-07"
            },
            0
          );
          pdf.setFont("SolaimanLipi_20-04-07");
          pdf.text(
            [
              "COD Amount: " + single_product_information.product_value,
              "Pin: " + single_product_information.pincode,
              "Target Dc: " + single_product_information.dc_office_name,
              "Details: " + single_product_information.product_detail,
            ],

            5,
            85,
            {
              maxWidth: 100,
              //font: "SolaimanLipi_20-04-07",
            },
            0
          );
          pdf.setFont("SolaimanLipi_20-04-07");

          JsBarcode("#PDFTable", single_product_information.waybill_number, {
            format: "CODE128",

            width: 4,
            height: 40,
            displayValue: false,
          });

          const img = document.querySelector("img#PDFTable");
          pdf.addImage(img.src, "WEBP", 19, 100, 65, 35);
          // pdf.addSvgAsImage(img.src,  19, 100, 65, 35);
          pdf.setFontSize(12);
          pdf.text(
            single_product_information.waybill_number,
            39,
            135,
            { maxWidth: 55 },
            0
          );
          pdf.setFontSize(10);
          pdf.text("3PL-P", 53, 140, { maxWidth: 55, align: "center" }, 0);
          pdf.text(
            "Disclaimer: Please Do not accept Delivery if Packing is Torn",
            50,
            145,
            { maxWidth: 55, align: "center" },
            0
          );
          pdf.text("E-Desh LTD", 50, 155, { maxWidth: 55, align: "center" }, 0);
        }
      });
    pdf.deletePage(1);

    // pdf.autoPrint();
    // pdf.output('dataurlnewwindow');
    // pdf.save('autoprint.pdf');
    pdf.save("Labels" + getCurrentTime() + ".pdf");
    toast.success("Open Pdf to print", {
      position: "top-right",
      autoClose: 2500,
    });
  };
  // -----------------------print function end----------------------

  return (
    <>
      <div className="" id="">
        {/* bg-info text-white */}

        {/* <div className="" id="card">
          <div className="">
            {" "}
            <a
              className="bg-success btn-floating btn-sm rounded-circle ml-2"
              id="status"
            />
            <span>Delivered</span>
          </div>
          <div className="mt-2">
            {" "}
            <a
              className="bg-info btn-floating btn-sm rounded-circle ml-2"
              id="status"
            />
            <span>Return</span>
          </div>
          <div className="mt-2">
            {" "}
            <a
              className="bg-warning btn-floating btn-sm rounded-circle ml-2"
              id="status"
            />
            <span>Hold</span>
          </div>
          <div className="mt-2">
            {" "}
            <a
              className="bg-danger btn-floating btn-sm rounded-circle ml-2"
              id="status"
            />
            <span>Lost</span>
          </div>
          <div className="mt-2">
            {" "}
            <a
              className="bg-primary btn-floating btn-sm rounded-circle ml-2"
              id="status"
            />
            <span>Unattempted</span>
          </div>
          <div className="">
            <a className=" btn-floating rounded-circle bg-info" />
          </div>
        </div> */}
        {/*<span>Return</span>*/}
        {/*<div className="p-2 bg-warning text-white">Hold</div>*/}
        {/*<div className="p-2 bg-danger text-white">Lost</div>*/}
        {/*<div className="p-2 bg-primary text-white">Unattempted</div>*/}

        {/* <div className="col-md-12 d-flex flex-row-reverse mt-4">
          <CSVLink
            filename="Template.csv"
            data={csvData}
            className="bg-dark text-white border border-dark rounded-pill"
          >
            CSV Template
          </CSVLink>
        </div> */}

        {/* <div className="col-md-6 mb-4">

    <ul className="list-group list-group-flush">
        <ul className="list-group">
          <li className="list-group-item">
            <a className="text-white btn-floating btn-fb btn-sm"><i className="bg-success rounded-circle"></i></a> Cras justo odio
          </li>
          <li className="list-group-item">
            <a className="btn-floating btn-tw btn-sm"><i className="bg-info"></i></a>Dapibus ac facilisis in
          </li>
          <li className="list-group-item">
            <a className="text-white btn-floating btn-li btn-sm"><i className="fab fa-linkedin-in"></i></a>Morbi leo risus
          </li>
          <li className="list-group-item">
            <a className="text-white btn-floating btn-slack btn-sm"><i className="fab fa-slack-hash"></i></a>Porta ac
            consectetur
            ac
          </li>
          <li className="list-group-item">
            <a className="text-white btn-floating btn-yt btn-sm"><i className="fab fa-youtube"></i></a>Vestibulum at eros
          </li>
        </ul>
      </ul>

</div> */}
        {/* <div className=" piechart1 mb-4 border ">
                    <Pie
                        data={state}
                        options={{
                            title: {
                                display: true,
                                text: 'Product Statement',
                                fontSize: 20
                            },
                            legend: {
                                display: true

                            }
                        }}
                    />
                </div> */}

        {/* model */}

        {/*----------------Modal-----------------*/}

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
              {/*  */}
              {/* <table className="table table-bordered table-sm">
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
              </table> */}

              <div className="d-flex">
                <div className="order-track shadow p-3 mb-5 bg-white rounded m-auto modal-width">
                  <h4>EOD Status</h4>
                  <h6>
                    <span className="badge bg-secondary">EOD status</span>:{" "}
                    {infoData.product_infor &&
                      infoData.product_infor.eoD_COMPLETE_OR_NOT}
                  </h6>

                  <h4>Update Status</h4>
                  <span>
                    <span className="badge bg-secondary text-wrap">
                      Update status
                    </span>
                    :{" "}
                    {infoData.product_infor &&
                      infoData.product_infor.update_track}
                  </span>

                  <h4>Details Info</h4>

                  <h6>
                    <span className="badge bg-secondary">
                      Product Waybill Number
                    </span>
                    :{" "}
                    {infoData.product_infor &&
                      infoData.product_infor.producT_WAYBILL_NUMBER}
                  </h6>
                  {/* <h6><span className="badge bg-secondary">Bag Id</span>: {infoData.product_infor &&  infoData.product_infor.baG_ID_NUMBER}</h6> */}
                  {/*<h6><span className="badge bg-secondary">Bag Waybill Number</span>: {infoData.product_infor &&  infoData.product_infor.baG_WAYBILL_NUMBER}</h6>*/}
                  {/*<h6><span className="badge bg-secondary">Bag Waybill Number</span>: {infoData.product_infor &&  infoData.product_infor.baG_WAYBILL_NUMBER.replaceAll("#","")}</h6>*/}
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
              <div className="d-flex ">
                <div className="order-track shadow p-3 mb-5 bg-white rounded m-auto modal-width">
                  <form className="bordered ">
                    <h2 className="text-center text-dark">Edit Here</h2>
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
                      <label>Product Value Amount</label>
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
                      <label>Area Code</label>
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
                      <label>Product Urgent Status</label>
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
                      <label>Product Total</label>
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
                      className="btn btn-primary mt-4"
                      onClick={update}
                    >
                      Update
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </Modal>
        </div>

        {/* modelend */}

        {/*-----------modal-end-------------*/}

        {/* <div className="d-flex mt-5" id="search">
          <div className="m-auto w-75">
            <div className="">
              <form>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control mx-2"
                    placeholder="Filter waybills, Bag, DC, Merchant"
                    value={searchTerm}
                    onChange={handleonChange}
                  />
                </div>
                <div className="mx-auto mt-3 text-center">
                  <button
                    className="btn btn-success px-4  btn-sm mx-2 rounded-pill"
                    onClick={searchflag}
                  >
                    Search
                  </button>
                  <button
                    className="btn btn-danger px-4 btn-sm mx-2 rounded-pill"
                    onClick={resetflag}
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div> */}

        {/* <div className="col-lg-6 col-md-6 col-12 mb-2">
          <input
            style={{
              // backgroundColor: "#C5D5E4",
              outline: "none",
              border: "none",
              padding: "7px",
              borderRadius: "8px",
              width: "93%",
            }}
            list="partnerLIst1x"
            placeholder="Partner Change Select"
            className="form-control shadow"
            onChange={(e) => setfilterClientforpartnerchange(e.target.value)}
          />
          <datalist id="partnerLIst1x" className="w-100">
            <option value="E-desh">E-DESH</option>
            <option value="Redx">Redx</option>
            <option value="Pathao">Pathao</option>
          </datalist>
        </div>

        <button
          className="btn btn-secondary btn-sm px-4 mx-2 mb-2"
          // onClick={() => setmodalproductIsOpen(true)}
          onClick={partnerchange}
        >
          Partner Change
        </button> */}

        <InfiniteScroll
          dataLength={current.length}
          next={getMoreData}
          hasMore={hasMore}
          // loader={
          //   // <Box sx={{ width: "100%" }}>
          //   //   <LinearProgress />
          //   // </Box>
          // }
          style={{ overflow: "visible" }}
        >
          <div>
            <div className=" mt-5">
              <div className="" id="download">
                {/* <button
                                className="js-download-link button bg-success border border-success btn-sm mb-2 mx-2 text-white rounded-pill"
                                onClick={() => pdfGenerate()}>Download PDF
                            </button> */}
                <div className="mb-2">
                  {/*<CSVLink*/}
                  {/*    data={allfilterproductdata}*/}
                  {/*    filename={"CSV.csv"}*/}
                  {/*    className="js-download-link button bg-info border border-info px-4 btn-sm mb-2 mx-2 text-white rounded-pill"*/}
                  {/*>*/}
                  {/*    Export csv*/}
                  {/*</CSVLink>*/}

                  {/* <ReactHTMLTableToExcel
                  className="js-download-link button btn btn-info btn-sm px-4 mx-2 rounded-pill"
                  table="newops"
                  filename={`Report${getCurrentTime()}`}
                  sheet="Sheet"
                  buttonText="Export excel"
                />
                <CSVLink
                  filename={`Template${getCurrentTime()}`}
                  data={csvData}
                  className="btn btn-dark btn-sm px-4 mx-2 rounded-pill"
                >
                  CSV Template
                </CSVLink> */}

                  {/*btn btn-sm bg-info text-black border-info mb-2 rounded-pill*/}
                </div>
              </div>
            </div>

            <div id="no-more-tables">
              {/*Table*/}
              {/* <table
              className="col-md-12 table-bordered table-striped table-condensed cf css-serial bg-white"
              id="newops"
              style={{ fontSize: "12px" }}
            >
              <thead
                className="text-center"
                style={{ backgroundColor: "#f1f1f1" }}
              >
                <tr className="text-dark" style={{ border: "none" }}>
                  <th scope="col">SL</th>

                  <th scope="col">WayBill</th>
                  <th scope="col">Bag WayBill</th>
                  <th scope="col">Order ID</th>
                  <th scope="col">COD</th>
                  <th scope="col">Merchant Name</th>
                  <th scope="col">Merchant Number</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Customer Number</th>
                  <th scope="col">Customer Address</th>
                  <th scope="col">Details</th>
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
              <tbody className="text-center">
                {allfilterproductdata &&
                  allfilterproductdata.map((single_message) => {
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
                          {single_message.dc_office_name}
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
                        <td data-title="SLA Status">{sla}</td>
                        <td data-title="Total Attempt">
                          {single_message.total_attempt}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table> */}
              {/*Table*/}
            </div>
            {/*  */}

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
                <div className="col-lg-3 col-md-6 col-12 mb-2">
                  {/* <CSVLink
                    onClick={() => toast.success("Excel Download Successful")}
                    filename={`Home Operation ${getCurrentTime()}.xls`}
                    data={json_information?.message}
                    className="btn btn-dark btn-sm px-4 mx-2  mb-2"
                  >
                    Export Excel
                  </CSVLink> */}
                  <button
                    className="btn btn-sm btn-dark px-3 me-2 rounded-3"
                    onClick={(e) => exportToCSV(dataforcsv, fileName)}
                  >
                    Export Excel
                  </button>
                  {/* <button
                    className="btn btn-sm btn-info px-3 rounded-3"
                    onClick={(e) => print_function(e)}
                  >
                    Print
                  </button> */}
                </div>

                <div className="col-lg-6 col-md-6 col-12 mb-2">
                  <input
                    style={{
                      // backgroundColor: "#C5D5E4",
                      outline: "none",
                      border: "none",
                      padding: "7px",
                      borderRadius: "8px",
                      width: "93%",
                    }}
                    list="partnerLIst1x"
                    placeholder="Partner Change Select"
                    className="form-control shadow"
                    onChange={(e) =>
                      setfilterClientforpartnerchange(e.target.value)
                    }
                  />
                  <datalist id="partnerLIst1x" className="w-100">
                    {/*{singleCompanyName?.map((Client) => (*/}
                    <option value="E-desh">E-desh</option>
                    <option value="Redx">Redx</option>
                    <option value="Pathao">Pathao</option>
                    <option value="ePost">ePost</option>
                    <option value="Piickme Express">Piickme Express</option>
                  </datalist>
                </div>
                <div className="col-lg-2 col-md-4 col-12 mb-2">
                  <button
                    className="btn btn-secondary btn-sm px-4 mx-2 mb-2"
                    // onClick={() => setmodalproductIsOpen(true)}
                    onClick={partnerchange}
                  >
                    Partner Change
                  </button>
                </div>
                {/* <div className="col-lg-6 col-md-8 col-12 mb-2">
                                    <input
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
                                        value={searchTerm}
                                        onChange={handleonChange}
                                    />
                                </div>
                                <div className="col-lg-2 col-md-4 col-12 mb-2">
                                    <button
                                        className="btn btn-sm btn-success px-3 me-2 rounded-3"
                                        onClick={searchflag}
                                    >
                                        Search
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger px-3 ms-2 rounded-3"
                                        onClick={resetflag}
                                    >
                                        Reset
                                    </button>
                                </div> */}
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
                    <th
                      style={{ fontSize: "14px", fontWeight: 500 }}
                      scope="col"
                    >
                      Select
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          name="allSelect"
                          onChange={(e) => select_all_function()}
                        />
                      </div>
                    </th>
                    <th scope="col">WayBill</th>
                    {/*<th scope="col">Bag WayBill</th>*/}
                    <th scope="col">Order ID</th>
                    <th scope="col">COD</th>
                    <th scope="col">Merchant Name</th>
                    <th scope="col">Merchant Number</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Customer Number</th>
                    <th scope="col">Customer Address</th>
                    <th scope="col">Details</th>
                    <th scope="col">Weight</th>
                    <th scope="col">Partner</th>
                  </tr>
                </thead>
                {/*Table head*/}
                {/*Table body*/}

                <tbody className="text-center border border-secondary">
                  {/* {console.log("All filter data", allfilterproductdata)} */}
                  {/* there is  color change code*/}

                  {newalldata &&
                    newalldata.map((single_message, i) => {
                      return (
                        <>
                          {select_all_check_box_flag ? (
                            <tr className="">
                              <td data-title="SL"></td>
                              <td
                                style={{ fontSize: "14px" }}
                                data-title="Select"
                              >
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
                              <td data-title="WayBill">
                                {/* <button
                              className="btn btn-sm btn-outline-primary "
                              onClick={(e) =>
                                openModal(e, single_message.waybill_number)
                              }
                            >
                            </button> */}
                                {single_message.waybill_number}
                              </td>
                              {/*<td data-title="Bag WayBill">*/}
                              {/*    {single_message.bag_waybill}*/}
                              {/*</td>*/}
                              <td data-title="Order ID">
                                {" "}
                                {single_message.order_id}
                              </td>
                              <td data-title="COD">
                                {" "}
                                {single_message.product_value}
                              </td>
                              <td data-title="Merchant Name">
                                {single_message.customer_name}
                                <span className="word-break"></span>
                              </td>
                              <td data-title="Merchant Number">
                                {single_message.customer_number}
                              </td>
                              <td data-title="Customer Name">
                                <span className="word-break"></span>
                                {single_message.consignee_name}
                              </td>
                              <td data-title="Customer Number">
                                {single_message.consignee_number}
                              </td>
                              <td scope="row" data-title="Customer Address">
                                {single_message.consignee_address}
                              </td>
                              <td data-title="Details">
                                {single_message.product_detail}
                                <span className="word-break"></span>
                              </td>
                              <td data-title="Weight">
                                {single_message.product_weight}
                                {/*{single_message.pincode}*/}
                              </td>

                              <td data-title="Weight">
                                {single_message.korear_company_name}
                                {/*{single_message.pincode}*/}
                              </td>
                            </tr>
                          ) : (
                            <tr className="">
                              <td data-title="SL"></td>
                              <td
                                style={{ fontSize: "14px" }}
                                data-title="Select"
                              >
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
                              <td data-title="WayBill">
                                {/* <button
                              className="btn btn-sm btn-outline-primary "
                              onClick={(e) =>
                                openModal(e, single_message.waybill_number)
                              }
                            >
                            </button> */}
                                {single_message.waybill_number}
                              </td>
                              {/*<td data-title="Bag WayBill">*/}
                              {/*    {single_message.bag_waybill}*/}
                              {/*</td>*/}
                              <td data-title="Order ID">
                                {" "}
                                {single_message.order_id}
                              </td>
                              <td data-title="COD">
                                {" "}
                                {single_message.product_value}
                              </td>
                              <td data-title="Merchant Name">
                                {single_message.customer_name}
                                <span className="word-break"></span>
                              </td>
                              <td data-title="Merchant Number">
                                {single_message.customer_number}
                              </td>
                              <td data-title="Customer Name">
                                <span className="word-break"></span>
                                {single_message.consignee_name}
                              </td>
                              <td data-title="Customer Number">
                                {single_message.consignee_number}
                              </td>
                              <td scope="row" data-title="Customer Address">
                                {single_message.consignee_address}
                              </td>
                              <td data-title="Details">
                                {single_message.product_detail}
                                <span className="word-break"></span>
                              </td>
                              <td data-title="Weight">
                                {single_message.product_weight}
                                {/*{single_message.pincode}*/}
                              </td>

                              <td data-title="Weight">
                                {single_message.korear_company_name}
                                {/*{single_message.pincode}*/}
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
            </div>

            <img id="PDFTable" style={{ display: "none" }} />

            {/*  */}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};
export default Newpartnerchangetableops;

//ReactDom.render(HomeOperation, document.getElementById('root'));e
