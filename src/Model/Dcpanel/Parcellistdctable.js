import React, { useState, useEffect, useContext } from "react";
import reactDom from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { SearchContext } from "../../Context/searchContext";
import { SearchButtonContext } from "../../Context/buttonContext";
import BarCode, { useBarcode } from "react-barcode";
import { jsPDF } from "jspdf";
import { CSVLink, CSVDownload } from "react-csv";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
//import './invoice.css'
// import "./sc.css";
import "../../Model/Processingcenter/sc.css";
import "../../Model/Processingcenter/table.css";
import "../../Model/Processingcenter/modal.css";
// import "./table.css";
// import "./modal.css";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
// import "jspdf-barcode";
// let JsBarcode = require('jsbarcode');
import JsBarcode from "jsbarcode";
import html2canvas from "html2canvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { LoginContext } from "../../Context/loginContext";
import {
  CustomerCareLinksidebar,
  dcpanel,
  Linksidebar,
} from "../../Common/Linksidebar";

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

const Parcellistdctable = (props) => {
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

  const [searchTerm, setSearchTerm] = React.useState([]);

  //const [isChecked, setIsChecked] =useState([])
  const [users, setUsers] = useState([]);
  const handleonChange = (event) => {
    setSearchTerm(event.target.value);
  };

  //login and sodebar info

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
        setsiteBarInformation_LocalStore(dcpanel); //useState a set kore rakhlam
        final_sideBar = dcpanel;
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

  React.useEffect(() => {
    const results =
      json_information.message &&
      json_information.message.filter(
        (p) =>
          p.pincode
            ?.toString()
            .toLowerCase()
            .includes(searchTerm?.toString().toLowerCase()) ||
          p.dc_office_name
            ?.toString()
            .toLowerCase()
            .includes(searchTerm?.toString().toLowerCase()) ||
          p.waybill_number
            ?.toString()
            .toLowerCase()
            .includes(searchTerm?.toString().toLowerCase()) ||
          p.customer_name
            ?.toString()
            .toLowerCase()
            .includes(searchTerm?.toString().toLowerCase()) ||
          p.order_id
            ?.toString()
            .toLowerCase()
            .includes(searchTerm?.toString().toLowerCase())
      );
    setUsers(results);
  }, [searchTerm]);

  let json_information = props.response;
  // pagination states
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [printdoneflag, setprintdoneflag] = useState(false);
  // pagination state end

  useEffect(() => {
    setUsers(json_information.message);
  }, []);
  //pagination
  let itemsPerPage = 100;
  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(users.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(users.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, users]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % users.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  //   pagination end

  let check_box_flag = [];
  const [check_box_flag_state, setcheck_box_flag_state] = useState([]);
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

  useEffect(() => {
    console.log("After single click : ", check_box_flag_state);
  }, [check_box_flag_state]);

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

  // new print func

  // const Print_all_emement = (e) =>{
  //     const opt = {
  //         scale: 4
  //     }

  //     let len_ara = check_box_flag_state.length;
  //     let count_ara = 0;
  //     for(let i=0;i<len_ara;i++){
  //         if(check_box_flag_state[i])
  //             count_ara = count_ara + 1;
  //     }
  //     count_ara = count_ara * 100;
  //     let area = count_ara + "vh";
  //     //let elem =  document.getElementById("table1");
  //     //let elem = <Single_phone_infromation></Single_phone_infromation>
  //     //reactDom.render(<Get_selected_element></Get_selected_element>,document.getElementById("emni_element"))
  //     //console.log("selected table : ",elem);
  //     reactDom.render(<PafContent></PafContent>, document.getElementById("PDFTable"));
  //     let elem =  document.getElementById("table1");
  //     console.log("TAble 1 : ",elem);
  //     htmlToImage.toJpeg(elem, { quality: 1,backgroundColor:"white"})
  //         .then(function (imgUrl) {
  //             const iframe = document.createElement('iframe')
  //             iframe.name = 'iframe'
  //             iframe.id = 'iframe';
  //             // iframe.height = canvas.height;
  //             // iframe.width = canvas.width;
  //             document.body.appendChild(iframe)

  //             // const imgUrl = canvas.toDataURL({
  //             //     format: 'jpeg',
  //             //     quality: '4.0'
  //             // });

  //             console.log("Table to table data : ",imgUrl);

  //             const style=`
  //                     display: block;
  //                     margin-left: auto;
  //                     margin-right: auto;
  //                     width: 100%;
  //                     min-height : ${area};
  //                     `;

  //             var url = `<img style="${style}" src="${imgUrl}"/><br>`;
  //             var newWin = window.frames["iframe"];
  //             newWin.document.write(`<body onload="window.print()">${url}</body>`);
  //             newWin.document.close();
  //         })
  //         .catch(function (error) {
  //             console.error('oops, something went wrong!', error);
  //         });

  //     //  html2canvas(elem, opt).then(canvas => {
  //     //     id = elem.getAttribute("table1");
  //     //     const iframe = document.createElement('iframe')
  //     //     iframe.name = 'iframe'
  //     //     iframe.id = 'iframe';
  //     //     iframe.height = canvas.height;
  //     //     iframe.width = canvas.width;
  //     //     document.body.appendChild(iframe)

  //     //     const imgUrl = canvas.toDataURL({
  //     //         format: 'jpeg',
  //     //         quality: '4.0'
  //     //     });

  //     //     console.log("Table to table data : ",imgUrl);

  //     //     const style=`
  //     //             display: block;
  //     //             margin-left: auto;
  //     //             margin-right: auto;
  //     //             width: 100%;
  //     //             min-height : ${area};
  //     //             `;

  //     //     var url = `<img style="${style}" src="${imgUrl}"/><br>`;
  //     //     var newWin = window.frames["iframe"];
  //     //     newWin.document.write(`<body onload="window.print()">${url}</body>`);
  //     //     newWin.document.close();
  //     // });

  // }

  // new print func end

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

  let PafContent = () => {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col">
              <div>
                <table
                  className="table table-hover mt-4 "
                  id="table1"
                  style={{ border: "1px solid yellow" }}
                >
                  <thead className="bg-dark text-white"></thead>
                  <tbody>
                    {currentItems.map(
                      (single_product_information, list_index) => {
                        if (check_box_flag_state[list_index]) {
                          return (
                            <>
                              <tr
                                className="main-page"
                                style={{ border: "1px solid black" }}
                                id={single_product_information.waybill_number}
                              >
                                <Generate_pdf_content
                                  product_infor={single_product_information}
                                  list_index={list_index}
                                  key={
                                    single_product_information.waybill_number
                                  }
                                ></Generate_pdf_content>
                              </tr>
                              <br />
                            </>
                          );
                        }
                      }
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  let Generate_pdf_content = (props) => {
    let single_product_information = props.product_infor;
    return (
      // <table id='printcontent'>
      //     <thead>

      //         <tbody >
      //         <tr>
      //             <td >
      //             {/* <div className=""> */}
      //                 <img className="d-block w-25" src="/images/e_desh_logo.png"></img>
      //             {/* </div> */}
      //             </td>
      //         </tr>
      //             <tr>
      //                 <td>
      //                     Order ID: <span >{single_product_information.order_id}</span>
      //                 </td>
      //                 <td>
      //                     Date:<span>{single_product_information.product_entry_date_time}</span>
      //                 </td>
      //             </tr>
      //             <tr>
      //                 <td>
      //                     <p>Merchant Details:</p>
      //                     <h6>{single_product_information.customer_name}</h6>
      //                     {/* <h6>Contact:  {single_product_information.customer_contact}</h6>
      //                     <br></br><br></br>
      //                     <br></br><br></br><br></br>
      //                     <h6>COD Amount: {single_product_information.product_value}</h6>
      //                     <h6>Target-DC: {single_product_information.dc_office_name}</h6> */}
      //                 </td>
      //                 <td>
      //                     <p>Consignee Details:</p>
      //                     <h6>{single_product_information.consignee_name}</h6><br></br>
      //                     {/* <h6>Contact:  {single_product_information.contact}</h6>
      //                     <p>Address: <span>{single_product_information.address}</span></p>
      //                     <p>Pin Code:<span>{single_product_information.pincode}</span></p>
      //                     <p>Product Description: {single_product_information.product_detail}-{single_product_information.product_weight}</p> */}
      //                 </td>
      //             </tr>
      //             <tr>
      //                 <td>
      //                     Contact:  {single_product_information.customer_contact}
      //                 </td>
      //                 <td>
      //                     <h6>Contact:  {single_product_information.contact}</h6>
      //                 </td>
      //             </tr>
      //             <tr>
      //                 <td>
      //                 COD Amount: {single_product_information.product_value}

      //                 </td>
      //                 <td>
      //                 <p>Address: <span>{single_product_information.address}</span></p>
      //                 </td>
      //             </tr>
      //             <tr>
      //                 <td>
      //                 Target-DC: {single_product_information.dc_office_name}

      //                 </td>
      //                 <td>
      //                 Pin Code:<span>{single_product_information.pincode}</span>
      //                     <p>Product Description: {single_product_information.product_detail}-{single_product_information.product_weight}</p>
      //                 </td>
      //             </tr>
      //             <tr>
      //                 <td>
      //                 <BarCode value={single_product_information.waybill_number} />
      //                 </td>

      //             </tr>
      //             <tr>
      //             <td>
      //                 <p className="text-center"><b>Disclaimer:</b> Please Do not accept Delivery.<br></br>If Packing Is Torn</p>
      //                 <p className="text-center"><b>E-Desh LTD</b></p>
      //                 </td>
      //             </tr>
      //         </tbody>

      //     </thead>
      // </table>

      <div className="invoice" id={single_product_information.waybill_number}>
        <div className="invoice-logo ">
          <img className="d-block w-25" src="/images/e_desh_logo.png"></img>
        </div>

        <div className="invoice-sec-1">
          <div className="invoice-sec-1-ref">
            <div className="ref-no">
              <p>Order ID: {single_product_information.order_id}</p>
              <p>
                Date:{" "}
                <span>
                  {single_product_information.product_entry_date_time}
                </span>
              </p>
              <br></br>
              <br></br>
            </div>
            {/* <div className="invoice-sec-1-date">
                                <p>Date:    <span>{single_product_information.product_entry_date_time}</span></p><br></br><br></br>
                            </div> */}
            <div className="from-invoice">
              <p>Merchant Details:</p>
              <p>{single_product_information.customer_name}</p>
              <p>Contact: {single_product_information.customer_contact}</p>
              <br></br>
              <p>COD Amount:{single_product_information.product_value}</p>
              <p>Target-DC:{single_product_information.dc_office_name}</p>
            </div>
          </div>
          <div className="to-invoice">
            <p>Consignee Details:</p>
            <p>{single_product_information.consignee_name}</p>
            <p>Contact: {single_product_information.contact}</p>
            <p>Address: {single_product_information.address}</p>
            <p>Pin Code: {single_product_information.pincode}</p>
            <p>
              Product Description: {single_product_information.product_detail}-
              {single_product_information.product_weight}
            </p>
          </div>
        </div>
        <div className="invoice-declaration">
          <p>
            <div>
              <BarCode value={single_product_information.waybill_number} />
            </div>
          </p>
        </div>
        <div className="invoice-greeting">
          <p className="text-center">
            <b>Disclaimer:</b> Please Do not accept Delivery.<br></br>If Packing
            Is Torn
          </p>
          <p className="text-center">
            <b>E-Desh LTD</b>
          </p>
        </div>
      </div>
    );
  };
  const searchIcon = <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>;
  return (
    <>
      <div className="container">
        {/*  */}

        <div className="container ">
          <div className="mb-5 ">
            {/* <form className="row d-flex justify-content-center">
              <div className="col-lg-6 col-md-6 col-sm-4 form-group mx-3 mt-2 p-4">
                <div className="input-group  input-icons">
                  <i className="icon ">{searchIcon}</i>
                  <input
                    type="search"
                    name=""
                    id=""
                    placeholder="Waybill, Order ID, DC Office"
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
            <div className="row">
              <div className="col-lg-6 col-md-8 col-12 p-0">
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
                  placeholder="Waybill, Order ID, DC Office"
                  value={searchTerm}
                  onChange={handleonChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/*  */}
        {/* <div className="mb-5">
          <div className="row">
            <div className="col-xl-2 col-lg-2 col-md-2 col-12"></div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-2 input-icons">

              <i className="icon">{searchIcon}</i>
              <input
                type="search"
                name=""
                id=""
                placeholder=" Type Here..."
                className="rounded-pill px-4 py-2 border input-field"
                style={{
                  width: "-webkit-fill-available",
                  textAlign: "start",
                }}
                value={searchTerm}
                onChange={handleonChange}
              />
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-12">
              <CSVLink
                filename="Template.csv"
                data={csvData}
                className="btn btn-outline-primary  fw-bold px-4 rounded-pill"
              >
                CSV Template
              </CSVLink>
            </div>
          </div>
        </div> */}

        {/* <form className="row d-flex justify-content-center">
            <div className="col-xl-4 col-lg-4 col-md-4 col-12 form-group  mt-2">
              <div className="input-group">
                 <input
                  type="text"
                  className="form-control mx-2 border-warning border"
                  placeholder="Type here......."
                  value={searchTerm}
                  onChange={handleonChange}
                />

                <div>
                  <input
                    type="search"
                    name=""
                    id=""
                    placeholder="Type Here..."
                    className="rounded-pill px-4 py-2 border "
                    value={searchTerm}
                    onChange={handleonChange}
                  />
                </div>

              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-4 col-12 ms-3 form-group mt-2">
              <CSVLink
                filename="Template.csv"
                data={csvData}
                className="btn btn-primary"
              >
                CSV Template
              </CSVLink>
            </div>
          </form> */}

        {/* <div className="d-flex flex-row-reverse">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
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
        </div> */}
        <div id="no-more-tables" className="">
          <div className="row mb-2">
            <div className="col-xl-6 col-lg-6 col-md-8 col-12">
              <CSVLink
                data={users}
                className="btn btn-dark btn-sm me-2 fw-bold px-4 rounded-pill mb-2"
              >
                Export csv
              </CSVLink>
              <button
                className="btn btn-sm me-2 bg-info text-black rounded-pill px-4 mb-2"
                onClick={(e) => print_function(e)}
              >
                Print All
              </button>
              <CSVLink
                filename="Template.csv"
                data={csvData}
                className="btn btn-dark btn-sm ms-2 fw-bold px-4 rounded-pill mb-2"
              >
                CSV Template
              </CSVLink>
            </div>
            {/* <div className="col-xl-6 col-lg-6 col-md-12 col-12 d-flex flex-row-reverse">
              <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
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
            </div> */}
          </div>
          <table
            className="col-md-12 table-bordered table-striped table-condensed cf css-serial bg-white"
            id=""
          >
            <thead
              className="text-center"
              style={{ backgroundColor: "#f1f1f1" }}
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
                {/* <th>Status</th>
                                <th>
                                    status datetime
                                </th> */}
                {/* <th>Print<button className="btn btn-sm bg-info text-black border-info mb-2" onClick={(e) => print_function(e)}>Print All</button> </th>
                                <th>ex<CSVLink data={users} className="btn btn-sm bg-info text-black border-info mb-2" >Export csv</CSVLink></th> */}
              </tr>
            </thead>
            <tbody className="text-center">
              {currentItems &&
                currentItems.map((single_message, i) => {
                  if (
                    single_message.dc_office_name ===
                    logingInformation_LocalStore.all_user_list.employeE_ZONE
                  ) {
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
                            </td>
                            {/* <td data-title="product Status">
                                                        {single_message.product_status} </td>
                                                    <td data-title="product status datetime">
                                                        {single_message.product_status_datetime}
                                                    </td> */}
                            {/* onClick ={ JsBarcode("#code128",single_message.waybill_number)}  */}
                            {/* <td><button className="btn btn-sm bg-dark text-white border-dark mb-2"   >Print</button></td> */}
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
                            </td>
                            {/* <td data-title="product Status">
                                                        {single_message.product_status} </td>
                                                    <td data-title="product status datetime">
                                                        {single_message.product_status_datetime}
                                                    </td> */}
                            {/* onClick ={ JsBarcode("#code128",single_message.waybill_number)}  */}
                            {/* <td><button className="btn btn-sm bg-dark text-white border-dark mb-2"   >Print</button></td> */}
                          </tr>
                        )}
                      </>
                    );
                  }
                })}
            </tbody>
          </table>
        </div>
      </div>

      <img id="PDFTable" style={{ display: "none" }} />

      {/*
            <div id="PDFTable" >



            </div> */}
    </>
  );
};
export default Parcellistdctable;
