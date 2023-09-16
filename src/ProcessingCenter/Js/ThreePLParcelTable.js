import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import ReactPaginate from "react-paginate";
import "./ThreePLParcelTable.css";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { company_name, Degital_Ocean_flag } from "../../Common/Linksidebar";
import { LoginContext } from "../../Context/loginContext";
import {
  CustomerCareLinksidebar,
  dcpanel,
  Linksidebar,
} from "../../Common/Linksidebar";

import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { CSVLink, CSVDownload } from "react-csv";

import BarCode, { useBarcode } from "react-barcode";
import { jsPDF } from "jspdf";

import JsBarcode from "jsbarcode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ScaleLoader from "react-spinners/ScaleLoader";
import { css } from "@emotion/react";

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

let string_to_list = (str_obj) => {
  let list_obj = [];
  let single_list_value = "";
  for (let i = 0; i < str_obj.length; i++) {
    if (str_obj[i] == ",") {
      list_obj.push(single_list_value);
      single_list_value = "";
    } else {
      if (str_obj[i] == " ") continue;
      else single_list_value = single_list_value + str_obj[i];
    }
  }
  if (single_list_value.length > 0) list_obj.push(single_list_value);

  return list_obj;
};

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

const ThreePLParcelTable = (props) => {
  const [strProductWaybillList, setstrProductWaybillList] = useState([]);
  const [bagProductWaybillList, setbagProductWaybillList] = useState([]);
  toast.configure();

  //const [isChecked, setIsChecked] =useState([])
  const [users, setUsers] = useState([]);
  const [responsedata, setresponsedata] = useState([]);

  let json_information = props.response;
  console.log("json_information", json_information.message);
  // pagination states
  const [currentItems, setCurrentItems] = useState([]);
  // const [pageCount, setPageCount] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [printdoneflag, setprintdoneflag] = useState(false);
  const [payload, setpayload] = useState(false);
  const [pathao, setPathao] = useState([]);
  const [check_box_flag_state, setcheck_box_flag_state] = useState([]);
  const [filterClient, setfilterClient] = useState("");
  const [filterClientforpartnerchange, setfilterClientforpartnerchange] =
      useState("");
  const [modalproductIsOpen, setmodalproductIsOpen] = useState(false);

  const [selectedWaybill, setSelectedWaybill] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [apihit, setapihit] = useState(false);
  const [storeid, setstoreid] = useState("");
  const [singleCompanyName, setSingleCompanyName] = useState([]);
  const [filterByPartner, setFilterByPartner] = useState([]);
  const [newalldata, setnewalldata] = useState([]);
  console.log("setSelectedWaybill", selectedWaybill);

  console.log("filter client", filterClient);
  // StroreRegisteredtoPathao api call
  console.log(" pathao set response", pathao);

  function closeProductModal() {
    setmodalproductIsOpen(false);
  }

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
      color: "orange",
      position: "absolute",
      height: "80%",
      width: "80%",
      top: "15%",
      left: "10%",
      right: "40px",

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
        setsiteBarInformation_LocalStore(dcpanel); //useState a set kore rakhlam
      }
      setlogingInformation_LocalStore(context_flag_obj);
    }
  }, []);

  useEffect(() => {
    setUsers(json_information.message);
    setnewalldata(json_information.message);
  }, []);
  //pagination
  // let itemsPerPage = json_information.message.length;
  // let itemsPerPage = 50;
  // useEffect(() => {
  //   // Fetch items from another resources.
  //   const endOffset = itemOffset + itemsPerPage;
  //   console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  //   setCurrentItems(users.slice(itemOffset, endOffset));
  //   setPageCount(Math.ceil(users.length / itemsPerPage));
  // }, [itemOffset, itemsPerPage, users]);

  // Invoke when user click to request another page.
  // const handlePageClick = (event) => {
  //   const newOffset = (event.selected * itemsPerPage) % users.length;
  //   console.log(
  //     `User requested page number ${event.selected}, which is offset ${newOffset}`
  //   );
  //   setItemOffset(newOffset);
  // };
  // ---------get data from localStorage----------
  const employeeId = JSON.parse(
      localStorage.getItem("logingInformation_LocalStore")
  )?.all_user_list?.employeE_ID;
  console.log("employeeId from local", employeeId);
  // --------access token-------
  const token = JSON.parse(
      localStorage.getItem("logingInformation_LocalStore")
  )?.token;
  // console.log("first token", token);

  //   pagination end

  let check_box_flag = [];

  //let select_all_check_box_flag;
  const [select_all_check_box_flag, setselect_all_check_box_flag] =
      useState(false);
  // let count_number = json_information.message.length;
  useEffect(() => {
    if (!currentItems) return;
    let count_number = currentItems.length;
    for (let i = 0; i < count_number; i++) {
      check_box_flag.push(false);
    }
  }, [currentItems, printdoneflag]);

  // for (let i = 0; i < count_number; i++) {
  //     check_box_flag.push(false);
  // }

  useEffect(() => {
    setcheck_box_flag_state(check_box_flag);
  }, [printdoneflag]);

  let checkbox_click_function = (index_value) => {
    let count_number = currentItems.length;
    // let count_number = json_information.message.length;
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

  // useEffect(() => {
  //   console.log("After single click : ", check_box_flag_state);
  // }, [check_box_flag_state]);

  let select_all_function = () => {
    if (select_all_check_box_flag) {
      setselect_all_check_box_flag(false);
    } else {
      setselect_all_check_box_flag(true);
    }
  };

  useEffect(() => {
    let temp_check_box = [];
    if (!select_all_check_box_flag) {
      if (!currentItems) return;
      let count_number = currentItems.length;
      // let count_number = json_information.message.length;
      for (let i = 0; i < count_number; i++) {
        temp_check_box.push(false);
      }
    } else {
      if (!currentItems) return;

      let count_number = currentItems.length;
      // let count_number = json_information.message.length;
      for (let i = 0; i < count_number; i++) {
        temp_check_box.push(true);
      }
    }
    setcheck_box_flag_state(temp_check_box);
  }, [select_all_check_box_flag]);

  // const [render_complete, setrender_complete] = useState(false);

  // useEffect(()=>{

  // },[render_complete])

  let index = [];

  const submitPathaoStore = () => {
    let inputs1 = [];
    currentItems.map(async (data, list_index) => {
      if (check_box_flag_state[list_index]) {
        let elem = data.waybill_number;
        inputs1.push(elem);
      }
    });
    // console.log("this is  after function call input", inputs1);

    setSelectedWaybill(inputs1);
    setapihit(true);
  };
  // useEffect(()=>{
  //
  //   let inputs1 = [];
  //   currentItems.map(async (data, list_index) => {
  //     if (check_box_flag_state[list_index]) {
  //       let elem = data.waybill_number;
  //       inputs1.push(elem);
  //     }
  //   });
  //   console.log("this is  after function call input", inputs1);
  //
  //   //setSelectedWaybill(inputs1);
  //
  // },[apihit])

  const handelForwad = () => {
    setmodalproductIsOpen(true);
    // console.log("handel forward", selectedWaybill);
    // if (check_box_flag_state == check_box_flag_state.includes(!true)) {
    //   setmodalproductIsOpen(false);
    //   toast.warning("Select parcel First.!", {
    //     position: "top-right",
    //     autoClose: 2500,
    //   });
    //   console.log("condition exicute", check_box_flag_state);
    // } else {
    //   setmodalproductIsOpen(true);
    // }
  };

  // console.log("user auth token", token);
  //--------- GET pathao store register api-----------
  useEffect(() => {
    var config = {
      method: "get",
      url: Degital_Ocean_flag
          ? "https://e-deshdelivery.com/universalapi/allapi/edeshStroreRegisteredtoPathao" +
          "?company_name=" +
          company_name
          : "/universalapi/allapi/edeshStroreRegisteredtoPathao" +
          "?company_name=" +
          company_name,

      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${logingInformation_LocalStore.token}`,
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(config);
    axios(config)
        .then(function (response) {
          let json_object_str = JSON.stringify(response.data);
          let json_object = JSON.parse(json_object_str);
          return json_object;
        })
        .then((res) => {
          // if (res.message.indexOf() != -1) {
          //   console.log(" not  array");
          // }\

          if (res.status == "Successful Request.") {
            setPathao(res.message);
            setLoading(false);
          }

          console.log("get api response", res.message);

          setpayload(true);
        })
        .catch(function (error) {
          console.log(error);
        });
  }, []); //check_box_flag_state

  //---------- POST pathao send product api-----------

  useEffect(() => {
    if (apihit == true) {
      var data = JSON.stringify({
        employee_id: employeeId,
        store_id: parseInt(storeid), //selectedUserId  11045
        waybill_string: selectedWaybill,
        dateTime: getCurrentTime(),
      });
      console.log("data", data);
      var config = {
        method: "post",
        url: Degital_Ocean_flag
            ? "https://e-deshdelivery.com/universalapi/allapi/pathaoSendProducts" +
            "?company_name=" +
            company_name
            : "/universalapi/allapi/pathaoSendProducts" +
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
            if (res?.status == "Successful Request.") {
              toast.success(res?.status, {
                position: "top-right",
                autoClose: 2500,
              });
            }
            console.log("pathao post api res:", res);

            setresponsedata(res.failed_products);

            setpayload(true);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  }, [selectedWaybill]);

  const handelSelected = (e) => {
    const inputValue = e.target.value;
    setfilterClient(inputValue);
    pathao.map((store) => {
      if (inputValue == store.store_address) {
        const storeId = store.store_id;
        setSelectedUserId(storeId);
      }
    });
  };
  // console.log("this is store id", storeid);

  const handelFilterClient = () => {};

  useEffect(() => {
    const singelClient = [];
    currentItems.map((singleItem) => {
      if (!singelClient.includes(singleItem.partner_company)) {
        singelClient.push(singleItem.partner_company);
      }
    });

    setSingleCompanyName(singelClient);
  }, [currentItems]);

  // let clientname = [];
  // currentItems.map(single_client => {
  //        let client = single_client.partner_company;
  //        if (clientname.indexOf(client) == -1) {
  //            clientname.push(client);
  //        }
  //    })

  // console.log("This is clientname",clientname)

  useEffect(() => {
    const result = currentItems.filter(
        (word) => word.partner_company == filterClient
    );
    console.log("filter for table data", result);

    setFilterByPartner(result);
  }, [filterClient]);

  const partnerchange = () => {
    let inputs1 = [];
    currentItems.map(async (data, list_index) => {
      if (check_box_flag_state[list_index]) {
        let elem = data.waybill_number;
        inputs1.push(elem);
      }
    });
    console.log("this is  after function call input", inputs1);

    //setSelectedWaybill(inputs1);

    var data = JSON.stringify({
      employee_id: employeeId,
      //store_id: parseInt(storeid), //selectedUserId  11045
      waybill_list: inputs1,
      company_name: filterClientforpartnerchange,
    });
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

          setpayload(true);
        })
        .catch(function (error) {
          console.log(error);
        });
  };

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
    console.log("current items", currentItems);
    currentItems &&
    currentItems.map((single_product_information, list_index) => {
      if (check_box_flag_state[list_index]) {
        // let elem = document.getElementById(single_product_information.waybill_number);
        // inputs.push(elem);
        // console.log("elem",elem)
        pdf.addPage([105, 160]);
        pdf.addImage("/images/e_desh_logo.png", 5, 5, 45, 12);
        pdf.setFontSize(12);
        pdf.text(
            "Order Id: " + single_product_information.order_id,
            5,
            25,
            { maxWidth: 55 },
            0
        );
        pdf.setFontSize(10);
        pdf.text(
            "Date: " +
            single_product_information?.pickedup_date?.split("T")[0],
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
        pdf.text(
            [
              "Consignee Details: ",
              single_product_information.consignee_name,
              "Contact: " + single_product_information.contact,
              "Address: ",
              single_product_information.address,
            ],
            5,
            50,
            { maxWidth: 90 },
            0
        );
        pdf.text(
            [
              "COD Amount: " + single_product_information.product_value,
              "Pin: " + single_product_information.pincode,
              "Target Dc: " + single_product_information.dc_office_name,
              "Details: " + single_product_information.product_detail,
            ],

            5,
            85,
            { maxWidth: 100 },
            0
        );
        // pdf.text([
        //     "Order Id: "+single_product_information.waybill_number,
        //     "Date: "+ single_product_information.product_entry_date_time,
        //     "Merchant Details:"+single_product_information.customer_name,
        //     "Contact: "+single_product_information.customer_contact,
        //     "Cod Amount: "+single_product_information.product_value,
        //     "Target Dc: "+single_product_information.dc_office_name,
        //     "Consignee Details: "+single_product_information.consignee_name,
        //     "Contact: "+single_product_information.contact,
        //     "Address: "+single_product_information.address,
        //     "Pin: "+single_product_information.pincode,
        //     "Details: "+single_product_information.product_detail+"-"+single_product_information.product_weight
        // //+"-"+single_product_information.product_weight+" Kg"

        // ],10,25,{maxWidth:100},0)
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
    // pdf.autoPrint();
    // pdf.output('datauristring')
    // window.open();
    // const printing = new Promise(async(successhandle,errorhandle)=>{
    //     let pdf = new jsPDF()
    //     let imgelems=""
    //         const style=`
    //                             display: block;
    //                             margin-left: auto;
    //                             margin-right: auto;
    //                             width: 100%;
    //                             height:100vh;

    //                             `;

    //     inputs.forEach(input=>{
    //         htmlToImage.toJpeg(input, { quality: 1,backgroundColor:"white"})
    //             .then(function (imgUrl) {
    //                 console.log("img data",imgUrl)
    //                 imgData.push(imgUrl)
    //                 // pdf.addPage([105, 160])
    //                 // pdf.addImage(imgUrl, 'JPEG', 7, 5, 95, 150,null,"NONE");//width,height
    //                 let url = `<img style="${style}" src="${imgUrl}"/>`;
    //                 imgelems+=url

    //             }).then(()=>{
    //             if(imgData.length===inputs.length)
    //                 successhandle(imgelems)
    //         })
    //     })

    //     // console.log(i, imgData[i])

    // })
    // printing.then((pdf)=>{
    //     const iframe = document.createElement('iframe')
    //         iframe.name = 'iframe'
    //         iframe.id = 'iframe';
    //                 // iframe.height = canvas.height;
    //                 // iframe.width = canvas.width;
    //         document.body.appendChild(iframe)
    //         let newWin = window.frames["iframe"];
    //         newWin.document.write(`<body onload="window.print()">${pdf}</body>`);
    //         newWin.document.close();
    //     console.log("time to print")
    //     // pdf.deletePage(1);
    //     // pdf.save("waybill.pdf");
    // })

    // for (let i = 0; i < inputs.length; i++) {
    //    htmlToImage.toJpeg(inputs[i], { quality: 1,backgroundColor:"white"})
    //         .then(function (imgUrl) {
    //             console.log("img data",imgUrl)
    //             imgData.push(imgUrl)
    //             // pdf.addImage(imgUrl, 'JPEG', 15, 40, 180, 160);
    //             // pdf.addPage()

    //     })
    //     // console.log(i, imgData[i])
    // }

    //     for(let i=0;i<imgData.length;i++){
    //     console.log("print img data", imgData[i])
    //     pdf.addImage(imgData[i], 'JPEG', 15, 40, 180, 160);
    //     pdf.addPage()
    // }

    // imgData.map((img) => {
    //     console.log(img)
    //     // pdf.addImage(img, 'JPEG', 0, 0);
    //     pdf.addImage(img, 'JPEG', 15, 40, 180, 160);
    //     pdf.addPage()
    // })
    // pdf.deletePage(imgData.length + 1);
    // pdf.save("waybill.pdf");
    // pdf.autoPrint();
    // pdf.output('datauristring')
    // window.open();

    // const hiddFrame = document.createElement('iframe');
    // hiddFrame.style.position = 'fixed';
    // // "visibility: hidden" would trigger safety rules in some browsers like safari，
    // // in which the iframe display in a pretty small size instead of hidden.
    // // here is some little hack ~
    // hiddFrame.style.width = '1px';
    // hiddFrame.style.height = '1px';
    // hiddFrame.style.opacity = '0.01';
    // const isSafari = /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);
    // if (isSafari) {
    //     // fallback in safari
    //     hiddFrame.onload = () => {
    //         try {
    //             hiddFrame.contentWindow.document.execCommand('print', false, null);
    //         } catch (e) {
    //             hiddFrame.contentWindow.print();
    //         }
    //     };
    // }
    // hiddFrame.src = pdf.output('bloburl');
    // document.body.appendChild(hiddFrame);
    // //await window.location.reload(false);
    // setprintdoneflag(!printdoneflag)
  };

  console.log("singleCompanyName", singleCompanyName);
  console.log("filterByPartner", filterByPartner, filterByPartner.length);
  const addcomma = (e) => {
    // let tempstrSt = JSON.stringify(e.target.value);
    // console.log("tempstr", tempstrSt);
    let tempstr = e.target.value;
    let newstr = "";
    let count = 0;
    for (let i = 0; i < tempstr.length; i++) {
      if (tempstr[i] == " " || tempstr[i] == ",") {
        continue;
      }
      if (count === 12) {
        count = 0;
        newstr += tempstr[i] + ",";
      } else {
        count++;
        newstr += tempstr[i];
      }
    }
    setstrProductWaybillList(newstr);
  };

  useEffect(() => {}, []);
  const searchIcon = <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>;
  // const [searchTerm, setSearchTerm] = useState("");
  // React.useEffect(() => {
  //   const results = json_information.message?.filter(
  //     (p) =>
  //       // p.pincode
  //       //   ?.toString()
  //       //   .toLowerCase()
  //       //   .includes(searchTerm.toString().toLowerCase()) ||
  //       // p.dc_office_name
  //       //   ?.toString()
  //       //   .toLowerCase()
  //       //   .includes(searchTerm.toString().toLowerCase()) ||
  //       p.customer_name
  //         ?.toString()
  //         .toLowerCase()
  //         .includes(searchTerm.toString().toLowerCase()) ||
  //       p.waybill_number
  //         ?.toString()
  //         .toLowerCase()
  //         .includes(searchTerm.toString().toLowerCase()) ||
  //       p.order_id
  //         ?.toString()
  //         .toLowerCase()
  //         .includes(searchTerm.toString().toLowerCase())
  //   );
  //   setCurrentItems(results);
  // }, [searchTerm]);
  const [loading, setLoading] = useState(true);
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  const [searchTerm, setsearchTerm] = React.useState("");
  const [searchTermFlag, setsearchTermFlag] = useState(false);
  const [searchTermAltFlag, setsearchTermAltFlag] = useState(false);
  const [allfilterproductdata, setallfilterproductdata] = useState([]);
  //------------------------------------------multiple search start------------------------------
  const handleOnChangeMultiple = (event) => {
    setsearchTerm(event.target.value);
  };

  const searchflag = (e) => {
    // e.preventDefault();
    setsearchTermFlag(!searchTermFlag);
    // setsearchTerm("");
  };
  const resetflag = (e) => {
    e.preventDefault();
    setsearchTerm("");
    setsearchTermFlag(!searchTermFlag);
    // setpickupdata(newalldata);
    setCurrentItems(json_information.message);
    toast.info("Table data has been reset!");
    // setExportCsv(json_information.message);
  };

  useEffect(() => {
    //console.log("entering filter effect", allproductdata)
    const users1 = newalldata?.filter(
        (p) =>
            p.waybill_number
                ?.toString()
                .toLowerCase()
                .includes(searchTerm?.toString().toLowerCase()) ||
            p.order_id
                ?.toString()
                .toLowerCase()
                .includes(searchTerm?.toString().toLowerCase())
    );
    // setallfilterproductdata(users1);
    // setpickupdata(users1);
    console.log("user1", users1);
    if (searchTerm) {
      if (users1.length !== 0) {
        toast.success("Search SuccessFul !");
      } else {
        toast.error("Please Search Valid Waybill OR Order ID");
      }
    }

    // setpickupdata(users1);
    setCurrentItems(users1);
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
            } else if (newalldata[j].order_id === waybilllist[i].trim()) {
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
        setCurrentItems(temp);
        // setallfilterproductdata(temp);
        // setpickupdata(temp);
        // setExportCsv(temp);
      }
    }
  }, [searchTermFlag, newalldata]);
  useEffect(() => {
    // setnewalldata(json_information.message);
  }, []);

  // ------------------------------------------multiple search end--------------------------------

  // ------------------------------------------pagination start-----------------------------------
  const perPage = 50;
  const handlePageClick = ({ selected: selectedPage }) => {
    setSelectedPage(selectedPage);
  };
  const offset = selectedPage * perPage;
  const currentPageData = currentItems.slice(offset, offset + perPage);
  console.log("currentPageData", currentPageData);
  const pageCount = Math.ceil(currentItems.length / perPage);

  // ------------------------------------------pagination end-------------------------------------
  return (
      <div>
        <div className="container">
          {/*  */}
          {/* <div className="form-group row mb-2">
          <label htmlFor className="col-sm-3 col-form-label">
            Way Bill Number:
          </label>
          <div className="col-sm-6 input-icons">
            <i className="icon ">{searchIcon}</i>
            <input
              type="text"
              className="rounded-pill px-5 py-2 input-field input-search"
              placeholder="Waybill Number"
              required
              value={strProductWaybillList}
              onChange={(e) => {
                addcomma(e);
              }}
            />
          </div>
        </div> */}

          {/* ai button a click korle input waybill array pawa jabe #console kora ace! */}
          {/* <button
          className="btn btn-success px-4"
          onClick={() =>
            setbagProductWaybillList(string_to_list(strProductWaybillList))
          }
        >
          {" "}
          Submit
        </button> */}
          {/*  */}
          <div id="no-more-tables" className="">
            <div
                className="mb-4 p-3 rounded-3"
                style={{ backgroundColor: "#C5D5E4" }}
            >
              <div className="row mb-3">
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
                  type="text"
                  className="shadow"
                  placeholder="Search Waybill , Order ID Or Client Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div> */}
                {/* ------------------------------multiple order id and waybill Search start------------------------- */}
                <div className="col-lg-9 col-md-10 col-12 mb-2">
                  <div className="row justify-content-between">
                    <div className="col-lg-8 col-md-8 col-12 mb-2">
                      <input
                          style={{
                            // backgroundColor: "#C5D5E4",
                            outline: "none",
                            border: "none",
                            padding: "7px",
                            borderRadius: "8px",
                            width: "93%",
                          }}
                          type="text"
                          placeholder="Filter Waybills OR Order ID"
                          value={searchTerm}
                          onChange={(e) => handleOnChangeMultiple(e)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              console.log("do validate");
                              searchflag();
                            }
                          }}
                      />
                    </div>
                    <div className="col-lg-4 col-md-4 col-12 mb-2">
                      <button
                          className="btn btn-sm btn-success px-3 me-3 rounded-3"
                          onClick={searchflag}
                      >
                        Search
                      </button>
                      <button
                          className="btn btn-sm btn-danger px-3  rounded-3"
                          onClick={resetflag}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
                {/* ------------------------------multiple order id and waybill Search end--------------------------- */}
                <div className="col-lg-6 col-md-6 col-12 mb-2">
                  {/* <input
                  style={{
                    // backgroundColor: "#C5D5E4",
                    outline: "none",
                    border: "none",
                    padding: "7px",
                    borderRadius: "8px",
                    width: "93%",
                  }}
                  type="text"
                  className="shadow "
                  placeholder="Enter Waybill Number"
                  required
                  value={strProductWaybillList}
                  onChange={(e) => {
                    addcomma(e);
                  }}
                /> */}
                </div>
              </div>
              <div className="row mb-3">
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
                      list="partnerLIst1"
                      placeholder="Partner Change Select"
                      className="form-control shadow"
                      onChange={(e) =>
                          setfilterClientforpartnerchange(e.target.value)
                      }
                  />
                  <datalist id="partnerLIst1" className="w-100">
                    {/*{singleCompanyName?.map((Client) => (*/}
                    <option value="E-desh">E-DESH</option>
                    <option value="Redx">Redx</option>
                    <option value="Pathao">Pathao</option>
                  </datalist>
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
                      list="partnerLIst"
                      placeholder="Partner Forword Select"
                      className="form-control shadow"
                      onChange={(e) => setfilterClient(e.target.value)}
                  />
                  <datalist id="partnerLIst" className="w-100">
                    <option value="Redx">Redx</option>
                    {singleCompanyName?.map((Client) => (
                        <option value={Client}>{Client}</option>
                    ))}
                  </datalist>
                </div>
              </div>
            </div>

            {/*<ReactHTMLTableToExcel*/}
            {/*     className="js-download-link button btn btn-info btn-sm px-4 mx-2 rounded-pill"*/}
            {/*     table="3pltablelist"*/}
            {/*     filename={`Report${getCurrentTime()}`}*/}
            {/*     sheet="Sheet"*/}
            {/*     buttonText="Export excel"*/}
            {/*   />*/}

            <div className="row">
              <div className="mb-2 ps-1 col-lg-6 col-md-6 col-12">
                <CSVLink
                    onClick={() => toast.success("Excel Download Successful")}
                    filename={`Three PL Parcel ${getCurrentTime()}.xls`}
                    data={currentItems}
                    className="btn btn-dark btn-sm px-4 mx-2  mb-2"
                >
                  Export Excel
                </CSVLink>
                <button
                    className="btn btn-primary btn-sm px-4 mx-2 mb-2"
                    // onClick={() => setmodalproductIsOpen(true)}
                    //onClick={handelForwad}
                    onClick={(e) => print_function(e)}
                >
                  Print All
                </button>
                <button
                    className="btn btn-secondary btn-sm px-4 mx-2 mb-2"
                    // onClick={() => setmodalproductIsOpen(true)}
                    onClick={partnerchange}
                >
                  Partner Change
                </button>
                <button
                    className="btn btn-success btn-sm px-4 mx-2 mb-2"
                    // onClick={() => setmodalproductIsOpen(true)}
                    onClick={handelForwad}
                >
                  Forward
                </button>
              </div>
              <div
                  className="d-flex flex-row-reverse col-lg-6 col-md-6 col-12"
                  // style={{ position: "fixed" }}
              >
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={0}
                    pageCount={pageCount}
                    previousLabel="<"
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

            <table
                id="3pltablelist"
                className="table css-serial bg-white"
                style={{ fontSize: "12px" }}
            >
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
                <th style={{ fontSize: "14px", fontWeight: 500 }}>SL</th>
                <th style={{ fontSize: "14px", fontWeight: 500 }} scope="col">
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
                <th style={{ fontSize: "14px", fontWeight: 500 }}>Waybill</th>
                <th style={{ fontSize: "14px", fontWeight: 500 }}>Order ID</th>
                <th style={{ fontSize: "14px", fontWeight: 500 }}>
                  Partner Name
                </th>
                <th style={{ fontSize: "14px", fontWeight: 500 }}>
                  Client Name
                </th>
                <th style={{ fontSize: "14px", fontWeight: 500 }}>
                  Consignee Name
                </th>
                <th style={{ fontSize: "14px", fontWeight: 500 }}>Details</th>
                <th style={{ fontSize: "14px", fontWeight: 500 }}>
                  DC Office{" "}
                </th>
                <th style={{ fontSize: "14px", fontWeight: 500 }}>Pin Code</th>
                <th style={{ fontSize: "14px", fontWeight: 500 }}>Value</th>
                <th style={{ fontSize: "14px", fontWeight: 500 }}>Weight</th>
              </tr>
              </thead>
              {filterByPartner.length != 0 ? (
                  <tbody className="text-center">
                  {filterByPartner &&
                      filterByPartner.map((single_message, i) => {
                        return (
                            <>
                              {select_all_check_box_flag ? (
                                  <tr key={single_message.waybill_number}>
                                    <td
                                        style={{ fontSize: "14px" }}
                                        data-title="SL"
                                        className="css-serial"
                                    ></td>
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
                                    <td
                                        style={{ fontSize: "14px" }}
                                        data-title="WayBill Number"
                                    >
                                      {single_message.waybill_number}
                                    </td>
                                    <td
                                        style={{ fontSize: "14px" }}
                                        data-title=" Order Id"
                                    >
                                      {single_message.order_id}
                                    </td>
                                    <td
                                        style={{ fontSize: "14px" }}
                                        data-title="Partner Name"
                                    >
                                      {single_message.partner_company}
                                    </td>
                                    <td
                                        style={{ fontSize: "14px" }}
                                        data-title="Client Name"
                                    >
                                      {single_message.customer_name}
                                    </td>
                                    <td
                                        style={{ fontSize: "14px" }}
                                        data-title=" Consignee Name"
                                    >
                                      {single_message.consignee_name}
                                    </td>
                                    <td
                                        style={{ fontSize: "14px" }}
                                        data-title="Product Details"
                                    >
                                      {single_message.product_detail}
                                    </td>
                                    <td
                                        style={{ fontSize: "14px" }}
                                        data-title="Dc Office Name"
                                    >
                                      {single_message.dc_office_name}
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
                                      {single_message.product_value}{" "}
                                    </td>
                                    <td
                                        style={{ fontSize: "14px" }}
                                        data-title="Product Weight"
                                    >
                                      {single_message.product_weight}
                                    </td>{" "}
                                  </tr>
                              ) : (
                                  <tr key={single_message.waybill_number}>
                                    <td
                                        style={{ fontSize: "14px" }}
                                        data-title="SL"
                                    ></td>
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
                                    <td
                                        style={{ fontSize: "14px" }}
                                        data-title="WayBill Number"
                                    >
                                      {single_message.waybill_number}
                                    </td>
                                    <td
                                        style={{ fontSize: "14px" }}
                                        data-title=" Order Id"
                                    >
                                      {single_message.order_id}
                                    </td>
                                    <td
                                        style={{ fontSize: "14px" }}
                                        data-title="Partner Name"
                                    >
                                      {single_message.partner_company}
                                    </td>
                                    <td
                                        data-title="Client Name"
                                        style={{ height: "80px", fontSize: "14px" }}
                                    >
                                      {single_message.customer_name}
                                    </td>
                                    <td
                                        data-title=" Consignee Name"
                                        style={{ height: "80px", fontSize: "14px" }}
                                    >
                                      {single_message.consignee_name}
                                    </td>
                                    <td
                                        style={{ fontSize: "14px" }}
                                        data-title="Product Details"
                                    >
                                      {single_message.product_detail}
                                    </td>
                                    <td
                                        style={{ fontSize: "14px" }}
                                        data-title="Dc Office Name"
                                    >
                                      {single_message.dc_office_name}
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
                                      {single_message.product_value}{" "}
                                    </td>
                                    <td
                                        style={{ fontSize: "14px" }}
                                        data-title="Product Weight"
                                    >
                                      {single_message.product_weight}
                                    </td>{" "}
                                  </tr>
                              )}
                            </>
                        );
                      })}
                  </tbody>
              ) : (
                  <tbody className="text-center">
                  {currentPageData &&
                      currentPageData.map((single_message, i) => {
                        return (
                            <>
                              {select_all_check_box_flag ? (
                                  <tr key={single_message.waybill_number}>
                                    <td
                                        style={{ fontSize: "14px" }}
                                        data-title="SL"
                                        className="css-serial"
                                    ></td>
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
                                    <td
                                        style={{ fontSize: "14px" }}
                                        data-title="WayBill Number"
                                    >
                                      {single_message.waybill_number}
                                    </td>
                                    <td
                                        style={{ fontSize: "14px" }}
                                        data-title=" Order Id"
                                    >
                                      {single_message.order_id}
                                    </td>
                                    <td
                                        style={{ fontSize: "14px" }}
                                        data-title="Partner Name"
                                    >
                                      {single_message.partner_company}
                                    </td>
                                    <td
                                        style={{ fontSize: "14px" }}
                                        data-title="Client Name"
                                    >
                                      {single_message.customer_name}
                                    </td>
                                    <td
                                        style={{ fontSize: "14px" }}
                                        data-title=" Consignee Name"
                                    >
                                      {single_message.consignee_name}
                                    </td>
                                    <td
                                        style={{ fontSize: "14px" }}
                                        data-title="Product Details"
                                    >
                                      {single_message.product_detail}
                                    </td>
                                    <td
                                        style={{ fontSize: "14px" }}
                                        data-title="Dc Office Name"
                                    >
                                      {single_message.dc_office_name}
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
                                      {single_message.product_value}{" "}
                                    </td>
                                    <td
                                        style={{ fontSize: "14px" }}
                                        data-title="Product Weight"
                                    >
                                      {single_message.product_weight}
                                    </td>{" "}
                                  </tr>
                              ) : (
                                  <tr key={single_message.waybill_number}>
                                    <td
                                        style={{ fontSize: "14px" }}
                                        data-title="SL"
                                    ></td>
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
                                    <td
                                        style={{ fontSize: "14px" }}
                                        data-title="WayBill Number"
                                    >
                                      {single_message.waybill_number}
                                    </td>
                                    <td
                                        style={{ fontSize: "14px" }}
                                        data-title=" Order Id"
                                    >
                                      {single_message.order_id}
                                    </td>
                                    <td
                                        style={{ fontSize: "14px" }}
                                        data-title="Partner Name"
                                    >
                                      {single_message.partner_company}
                                    </td>
                                    <td
                                        data-title="Client Name"
                                        style={{ height: "80px", fontSize: "14px" }}
                                    >
                                      {single_message.customer_name}
                                    </td>
                                    <td
                                        data-title=" Consignee Name"
                                        style={{ height: "80px", fontSize: "14px" }}
                                    >
                                      {single_message.consignee_name}
                                    </td>
                                    <td
                                        style={{ fontSize: "14px" }}
                                        data-title="Product Details"
                                    >
                                      {single_message.product_detail}
                                    </td>
                                    <td
                                        style={{ fontSize: "14px" }}
                                        data-title="Dc Office Name"
                                    >
                                      {single_message.dc_office_name}
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
                                      {single_message.product_value}{" "}
                                    </td>
                                    <td
                                        style={{ fontSize: "14px" }}
                                        data-title="Product Weight"
                                    >
                                      {single_message.product_weight}
                                    </td>{" "}
                                  </tr>
                              )}
                            </>
                        );
                      })}
                  </tbody>
              )}
            </table>
            <img id="PDFTable" style={{ display: "none" }} />
          </div>
        </div>

        {pathao && (
            <Modal
                isOpen={modalproductIsOpen}
                style={customStyles1}
                onRequestClose={closeProductModal}
                closeTimeoutMS={500}
                contentLabel="Example Modal"
            >
              {loading ? (
                  <div>
                    <div className="d-flex justify-content-center align-items-center">
                      <ScaleLoader color="green" size={150} />
                    </div>
                    <p className="text-center mt-5">Please Wait</p>
                  </div>
              ) : (
                  <div>
                    <div className="d-flex justify-content-between">
                      {" "}
                      <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                          onClick={closeProductModal}
                      >
                        Cancel
                      </button>{" "}
                      <button
                          className="btn btn-success px-4"
                          onClick={submitPathaoStore}
                      >
                        {" "}
                        Submit
                      </button>
                    </div>
                    {/* <h4>Product Details</h4> */}
                    <div className="my-3">
                      <input
                          style={{
                            // backgroundColor: "#C5D5E4",
                            outline: "none",
                            border: "none",
                            padding: "7px",
                            borderRadius: "8px",
                            width: "93%",
                          }}
                          list="storeLIst"
                          placeholder="store Address"
                          className="form-control shadow"
                          //onChange={(e) => handelSelected(e)}
                          onChange={(e) => setstoreid(e.target.value)}
                      />

                      <datalist id="storeLIst">
                        {pathao.map((store) => (
                            <option key={store.store_id} value={store.store_id}>
                              {store.store_address}
                            </option>
                        ))}
                      </datalist>
                    </div>
                    <div>
                      <div>
                        {responsedata &&
                        responsedata.unsuccessfulProduct_list?.length == 0 ? (
                            <div></div>
                        ) : (
                            <div>
                              <h2>Unsuccessful Product List</h2>
                              {responsedata?.unsuccessful_product_list?.map((e) => {
                                return (
                                    <div className="row border-dark border p-4 my-2 rounded-3">
                                      <div className="col-5">
                                        Waybill : {e.waybill_number}
                                      </div>
                                      <div className="col-7">Reason : {e.reason}</div>
                                    </div>
                                );
                              })}
                            </div>
                        )}
                      </div>
                      <div>
                        {responsedata &&
                        responsedata.successfulProduct_list?.length == 0 ? (
                            <div></div>
                        ) : (
                            <div>
                              <h2>Successful Product List</h2>
                              {responsedata?.successfulProduct_list?.map((e) => {
                                return (
                                    <div className="row border-dark border p-4 my-2 rounded-3">
                                      <div className="col-5">
                                        Waybill : {e.waybill_number}
                                      </div>
                                      {/* <div className="col-7">Reason : {e.reason}</div> */}
                                    </div>
                                );
                              })}
                            </div>
                        )}
                      </div>
                    </div>
                  </div>
              )}

              {console.log("inside modal", responsedata)}

              {/* <div>
            <h2>unsuccessful list</h2>
            {responsedata?.unsuccessful_product_list.map((e) => {
              console.log("e", e);
              return <p key={e.waybill_number}>{e.reason}</p>;
            })}
          </div> */}
            </Modal>
        )}
      </div>
  );
};

export default ThreePLParcelTable;
