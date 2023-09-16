// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './customermodel.css'
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import ReactHTMLTableTpExcel from 'react-html-table-to-excel';
// const Creportdownload= (props) =>{
//     let json_information=props.response;
//     const pdfGenerate =()=>{
//         const  doc = new jsPDF('portrait','px','a4');
//         doc.autoTable({html: '#table'});
//         doc.save ('Report.pdf')
//     }
//     // function generate() {
//     //     const doc = new jsPDF('p', 'mm');
//
//     //     doc.autoTable({
//     //       // html: '#my-table',
//     //       head: [
//     //         ['Delivered Product List', 'Returned Product List', 'Holded Product List', 'Lost Product List','Collected COD'],
//     //       ],
//     //       body: [
//     //         [json_information.message.total_number_of_delevered_product,json_information.message.total_number_of_returned_product,
//     //             json_information.message.total_number_of_holded_product,json_information.message.total_number_of_lost_product, json_information.message.total_collected_amount],
//
//     //       ],
//     //       theme: 'grid',
//     //       tableWidth: 180,
//     //       styles: {},
//     //       columnStyles: {},
//     //     });
//
//     //     doc.save('Report');
//     //   }
//
//     let delevered_flag = -1;
//     let return_flag = -1;
//     let hold_flag = -1;
//     let lost_flag = -1;
//     let refresh_flag = -1;
//     let date_flag = -1;
//
//     let delevered_number = 0;
//     let holded_number = 0;
//     let return_number = 0;
//     let lost_number = 0;
//     let total = 0;
//
//
//
//     return(
//             <>
//                   <div className="container border">
//
//                         <div className="row">
//                             <div className="col-md-12 d-flex justify-content-center mt-2 mb-2">
//                                 <button className="js-download-link button bg-success border-success text-white btn-lg mb-2 mx-2" onClick={()=>pdfGenerate()}>Download PDF File</button>
//                                         <div className="row">
//                                         <div className="col-md-12 d-flex justify-content-center">
//                                             <ReactHTMLTableTpExcel
//                                             id="test-table-xls-button"
//                                             className="download-table-xls-button bg-primary border-primary text-white btn-lg mb-2"
//                                             table="tableq"
//                                             filename="Report Download"
//                                             buttonText="Download As XLS"/>
//                                         </div>
//                                     </div>
//                             </div>
//                         </div>
//
//                     </div>
//                     <table className="table table-hover mt-4 css-serial" id="tableq">
//                                     {/*Table head*/}
//                                         <thead className="bg-dark text-white">
//
//                                     <tr>
//                                     <th>SL</th>
//                                         <th>Order Id<br></br>Product Name</th>
//                                         <th>Consignee Name</th>
//                                         <th>Contact Number</th>
//                                         <th>Processing Stage</th>
//                                         <th >Product Type</th>
//                                         <th >DateTime</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                        {
//                                             json_information.message.all_day_range_information.map((single_day_information)=>{
//
//                                                 delevered_flag = -1;
//                                                 hold_flag = -1;
//                                                 lost_flag = -1;
//                                                 refresh_flag = -1;
//                                                 date_flag = -1;
//                                                 delevered_number = single_day_information.delevered_product_list.length;
//                                                 holded_number = single_day_information.holded_product_list.length;
//                                                 return_number = single_day_information.returned_product_list.length;
//                                                 lost_number = single_day_information.lost_product_list.length;
//                                                 total = delevered_number + holded_number + return_number + lost_number;
//
//                                                 return(
//                                                     <>
//                                                         {
//                                                             single_day_information.delevered_product_list.map((single_delevered_product)=>{
//                                                                 delevered_flag = delevered_flag+1;
//                                                                 date_flag = date_flag +1;
//                                                                 return(
//                                                                     <tr>
//                                                                     <td></td>
//                                                                         <td >{single_delevered_product.ordeR_ID}<br></br>{single_delevered_product.producT_NAME}</td>
//                                                                         <td>{single_delevered_product.consigneE_NAME}</td>
//                                                                         <td>{single_delevered_product.contacT_NUMBER}</td>
//                                                                         <td className="bg-success">{single_delevered_product.producT_PROCESSING_STATUS}</td>
//                                                                         {!delevered_flag && <td rowSpan={delevered_number} align="center">{"DELEVERED"}</td>}
//                                                                         {!date_flag && <td rowSpan={total} >{single_day_information.date_time}</td>}
//                                                                     </tr>
//                                                                 )
//                                                             })
//                                                         }
//
//                                                         {
//                                                             single_day_information.holded_product_list.map((single_delevered_product)=>{
//                                                                 hold_flag = hold_flag+1;
//                                                                 date_flag = date_flag +1;
//                                                                 return(
//                                                                     <tr>
//                                                                     <td></td>
//                                                                         <td>{single_delevered_product.ordeR_ID}<br></br>{single_delevered_product.producT_NAME}</td>
//                                                                         <td>{single_delevered_product.consigneE_NAME}</td>
//                                                                         <td>{single_delevered_product.contacT_NUMBER}</td>
//                                                                         <td>{single_delevered_product.producT_PROCESSING_STATUS}</td>
//                                                                         {!hold_flag && <td rowSpan={holded_number} align="center">{"HOLDED"}</td>}
//                                                                         {!date_flag && <td rowSpan={total} >{single_day_information.date_time}</td>}
//                                                                     </tr>
//                                                                 )
//                                                             })
//                                                         }
//
//                                                         {
//                                                             single_day_information.returned_product_list.map((single_delevered_product)=>{
//                                                                 return_flag = return_flag+1;
//                                                                 date_flag = date_flag +1;
//                                                                 return(
//                                                                     <tr>
//                                                                     <td></td>
//                                                                         <td>{single_delevered_product.ordeR_ID}<br></br>{single_delevered_product.producT_NAME}</td>
//                                                                         <td>{single_delevered_product.consigneE_NAME}</td>
//                                                                         <td>{single_delevered_product.contacT_NUMBER}</td>
//                                                                         <td>{single_delevered_product.producT_PROCESSING_STATUS}</td>
//                                                                         {!return_flag && <td rowSpan={return_number} align="center">{"RETURNED"}</td>}
//                                                                         {!date_flag && <td rowSpan={total} >{single_day_information.date_time}</td>}
//                                                                     </tr>
//                                                                 )
//                                                             })
//                                                         }
//
//                                                         {
//                                                             single_day_information.lost_product_list.map((single_delevered_product)=>{
//                                                                 lost_flag = lost_flag+1;
//                                                                 date_flag = date_flag +1;
//                                                                 return(
//                                                                     <tr>
//                                                                     <td></td>
//                                                                         <td>{single_delevered_product.ordeR_ID}<br></br>{single_delevered_product.producT_NAME}</td>
//                                                                         <td>{single_delevered_product.consigneE_NAME}</td>
//                                                                         <td>{single_delevered_product.contacT_NUMBER}</td>
//                                                                         <td>{single_delevered_product.producT_PROCESSING_STATUS}</td>
//                                                                         {!lost_flag && <td rowSpan={lost_number} align="center">{"LOST"}</td>}
//                                                                         {!date_flag && <td rowSpan={total} >{single_day_information.date_time}</td>}
//                                                                     </tr>
//                                                                 )
//                                                             })
//                                                         }
//                                                     </>
//                                                 )
//                                             })
//                                        }
//                                 </tbody>
//                                     {/*Table body*/}
//                                 </table>
//
//
//
//             </>
//     )
// };
//
// export default Creportdownload;

//new file

import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import './sales.css'
import { CSVLink, CSVDownload } from "react-csv";
import { toast } from "react-toastify";
import { LoginContext } from "../../Context/loginContext";
import Modal from "react-modal";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Multiselect from "multiselect-react-dropdown";
import {
  Linksidebar,
  CustomerCareLinksidebar,
  Salessidebar,
  Operationsidebar,
  Degital_Ocean_flag,
  company_name,
} from "../../Common/Linksidebar";

let startDateTime, setstartDateTime;
let endDataTime, setendDataTime;
let clientId, setclientId;

//let employId,setemployId;

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

const Creportdownload = (props) => {
  let json_information = props.response;
  const [searchTerm, setSearchTerm] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);
  const [startDateTime, setstartDateTime] = React.useState([]);
  const [endDataTime, setendDataTime] = React.useState([]);
  const [infoData, setinfoData] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [infoModalOpen, setinfoModalOpen] = useState(false);

  const [alldata, setall_data] = useState([]);
  const [alldatafilter, setall_data_filter] = useState([]);
  const [waybill, setwaybill] = useState([]);
  const [SubmitFlag, setSubmitFlag] = (useState(false)[
    (clientId, setclientId)
  ] = useState(""));

  const [dcname, setdcname] = useState(null);

  const [client, setclient] = useState(null);
  const [startdate, setstartdate] = useState(null);
  const [enddate, setenddate] = useState(null);

  const [paymenttype, setpaymenttype] = useState(null);
  const [status, setstatus] = useState([
    "InSystem",
    "Delevered",
    "Returned",
    "Lost",
  ]);
  const [finalstatus, setfinalstatus] = useState([]);

  const [searchreasult, setsearchreasult] = useState([]);
  const [waybilsearch, setwaybilsearch] = useState([]);
  const [clientname, setclientname] = useState([]);
  const [dc_name, setdc_name] = useState([]);

  useEffect(() => {
    setclientname(json_information);
  }, []);

  const [employId, setemployId] = useState("");
  console.log("employ id initial_set ", employId);
  //console.log("this is info data",infoData)

  //[employId,setemployId] = useState("");
  const [date_time, setdate_time] = useState("");
  const [clientid, setclientid] = useState("");

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
      } else if (
        loginInformation.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.ProcessingCenter
      ) {
        setsiteBarInformation_LocalStore(Linksidebar); //useState a set kore rakhlam.
        final_sideBar = Linksidebar;
      }

      setLogin_Sidebar_LocalStore(loginInformation, final_sideBar); //local store a set kore rakhlam.
      setlogingInformation_LocalStore(loginInformation); //useState a set kore rakhlam.
      setclientId(loginInformation.all_user_list_Client.customeR_ID);
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
      setclientId(context_flag_obj.all_user_list_Client.customeR_ID);
    }
  }, []);

  useEffect(() => {
    setemployId(logingInformation_LocalStore.all_user_list.employeE_ID);
    console.log("Employee id set inside the useeffect.", employId);
  }, [logingInformation_LocalStore]);

  useEffect(() => {
    const results =
      waybilsearch &&
      waybilsearch.filter(
        (p) =>
          p.product_waybill
            .toString()
            .toLowerCase()
            .includes(searchTerm.toString().toLowerCase()) ||
          p.order_id
            .toString()
            .toLowerCase()
            .includes(searchTerm.toString().toLowerCase())
      );
    setsearchreasult(results);
    //if(results.length >0){
    setall_data(results);

    // }
    console.log("Search result", searchResults);
  }, [searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    const results =
      waybilsearch &&
      waybilsearch.filter(
        (p) =>
          p.product_waybill
            .toString()
            .toLowerCase()
            .includes(searchTerm.toString().toLowerCase()) ||
          p.order_id
            .toString()
            .toLowerCase()
            .includes(searchTerm.toString().toLowerCase())
      );
    setsearchreasult(results);
    //if(results.length >0){
    setall_data(results);

    // }
    console.log("Search result", searchResults);
  };

  // useEffect(()=>{
  //
  //     var axios = require('axios');
  //     // var data = JSON.stringify({
  //     //     "sales_employee_id": employId
  //     // });
  //
  //     // console.log(" Table APi: ",data);
  //
  //     var config = {
  //         method: 'post',
  //         url: Degital_Ocean_flag ? 'https://e-deshdelivery.com/universalapi/allapi/allDcList'+'?company_name='+company_name : '/universalapi/allapi/allDcList'+'?company_name='+company_name,
  //         headers: {
  //             'Content-Type': 'application/json',
  //             //'Authorization': `Bearer ${logingInformation_LocalStore.token}`
  //         },
  //         //data : data
  //     };
  //
  //     axios(config)
  //         .then(function (response) {
  //             let json_object_str = JSON.stringify(response.data);
  //             let json_object = JSON.parse(json_object_str);
  //             console.log("data is here",json_object);
  //             return(json_object);
  //         }).then(res => {
  //         console.log("this is res",res)
  //         setdc_name(res.message);
  //
  //     })
  //         .catch(function (error) {
  //             console.log(error);
  //         });
  // },[logingInformation_LocalStore]);

  console.log("this is all dc list", dc_name);

  // dropdown dc name
  // let dc_name = [];
  // json_information.message.delevered_product_list.map(single_dc => {
  //     let dc = single_dc.dc_office_name;
  //     if (dc_name.indexOf(dc) == -1) {
  //         dc_name.push(dc);
  //     }
  // })
  // json_information.message.holded_product_list.map(single_dc => {
  //     let dc = single_dc.dc_office_name;
  //     if (dc_name.indexOf(dc) == -1) {
  //         dc_name.push(dc);
  //     }
  // })
  // json_information.message.lost_product_list.map(single_dc => {
  //     let dc = single_dc.dc_office_name;
  //     if (dc_name.indexOf(dc) == -1) {
  //         dc_name.push(dc);
  //     }
  // })
  // json_information.message.returned_product_list.map(single_dc => {
  //     let dc = single_dc.dc_office_name;
  //     if (dc_name.indexOf(dc) == -1) {
  //         dc_name.push(dc);
  //     }
  // })
  //
  // json_information.message.unattempted_product_list.map(single_dc => {
  //     let dc = single_dc.dc_office_name;
  //     if (dc_name.indexOf(dc) == -1) {
  //         dc_name.push(dc);
  //     }
  // })
  // console.log("this is dc name", dc_name);
  // dropdown dc name end
  // dropdown client name

  // let clientname = [];
  // json_information.message.delevered_product_list.map(single_client => {
  //     let client = single_client.customer_name;
  //     if (clientname.indexOf(client) == -1) {
  //         clientname.push(client);
  //     }
  // })
  // json_information.message.holded_product_list.map(single_client => {
  //
  //     let client = single_client.customer_name;
  //     if (clientname.indexOf(client) == -1) {
  //         clientname.push(client);
  //     }
  // })
  // json_information.message.lost_product_list.map(single_client => {
  //     let client = single_client.customer_name;
  //     if (clientname.indexOf(client) == -1) {
  //         clientname.push(client);
  //     }
  // })
  // json_information.message.returned_product_list.map(single_client => {
  //     let client = single_client.customer_name;
  //     if (clientname.indexOf(client) == -1) {
  //         clientname.push(client);
  //     }
  // })
  //
  // json_information.message.unattempted_product_list.map(single_client => {
  //     let client = single_client.customer_name;
  //     if (clientname.indexOf(client) == -1) {
  //         clientname.push(client);
  //     }
  // })

  let final = [];

  finalstatus.map((single_status) => {
    console.log("this is map status", single_status);
    final.push(single_status);
  });

  // console.log("this is client name", clientname);

  //filtering
  // const [filterTerms, setfilter_terms] = useState({
  //     dcname: "none",
  //     clientname: "none",
  //     startdate: "none",
  //     enddate: "none",
  //     paymenttype: "none",
  //     status: "none"
  // })

  // useEffect(() => {
  //     let temp = []
  //     json_information.message.delevered_product_list.map((single_product) => {
  //         temp.push(single_product)
  //     })
  //     json_information.message.holded_product_list.map((single_product) => {
  //         temp.push(single_product)
  //     })
  //     json_information.message.lost_product_list.map((single_product) => {
  //         temp.push(single_product)
  //     })
  //     json_information.message.returned_product_list.map((single_product) => {
  //         temp.push(single_product)
  //     })
  //     json_information.message.unattempted_product_list.map((single_product) => {
  //         temp.push(single_product)
  //     })
  //     console.log("Full data",json_information)
  //     setall_data(temp)
  //     setall_data_filter(temp)
  // }, [])
  // useEffect(() => {
  //     //     const results = alldatafilter.filter(p =>
  //     //         p.waybill_number.toString().toLowerCase().includes(searchTerm.toString().toLowerCase()) || p.order_id.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())

  //     //     );
  //     //     setSearchResults(results);
  //     //     //if(results.length >0){
  //     //         setall_data(results)
  //     //    // }
  //     //     console.log("Search result", searchResults)
  // }, [searchTerm]);

  // const [searchFlag, setsearch_flag] = useState(false)
  // //filtering logic
  // useEffect(() => {
  //     console.log(filterTerms)

  //     console.log("Seaarching")

  //     console.log("not nul")
  //     if (filterTerms.status == "hold") {
  //         if (filterTerms.dcname != "none" && filterTerms.clientname != "none") {
  //             const results = json_information.message.holded_product_list.filter(p =>
  //                 p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase()) &&
  //                 p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())
  //                 // p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //             );
  //             console.log(results)
  //             setall_data(results);
  //         }
  //         //when dc name, clientname and payment type given
  //         else if (filterTerms.dcname != "none" && filterTerms.clientname != "none"&& filterTerms.paymenttype != "none" ) {
  //             if (filterTerms.paymenttype == "cod") {
  //                 const results = json_information.message.holded_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value > 0 &&  p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase()) &&
  //                     p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }
  //             else if (filterTerms.paymenttype == "prepaid") {
  //                 const results = json_information.message.holded_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value == 0 &&  p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase()) &&
  //                     p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }

  //         }
  //         //dcname and payement given
  //         else if (filterTerms.dcname != "none" && filterTerms.paymenttype != "none" ) {
  //             if (filterTerms.paymenttype == "cod") {
  //                 const results = json_information.message.holded_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value > 0 &&  p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }
  //             else if (filterTerms.paymenttype == "prepaid") {
  //                 const results = json_information.message.holded_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value == 0 &&  p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }

  //         }
  //         //clientname and payement type given
  //         else if ( filterTerms.clientname != "none"&& filterTerms.paymenttype != "none" ) {
  //             if (filterTerms.paymenttype == "cod") {
  //                 const results = json_information.message.holded_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value > 0 &&
  //                     p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }
  //             else if (filterTerms.paymenttype == "prepaid") {
  //                 const results = json_information.message.holded_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value == 0 &&
  //                     p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }

  //         }
  //         //only dcname given
  //         else if (filterTerms.dcname != 'none') {
  //             const results = json_information.message.holded_product_list.filter(p =>
  //                 p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                 // p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //             );
  //             console.log(results)
  //             setall_data(results);
  //         }
  //         //only clientname given
  //         else if (filterTerms.clientname != 'none') {
  //             const results = json_information.message.holded_product_list.filter(p =>
  //                 //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                 p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //             );
  //             console.log(results)
  //             setall_data(results);
  //         }
  //         //only payement type given
  //         else if (filterTerms.paymenttype != "none") {
  //             if (filterTerms.paymenttype == "cod") {
  //                 const results = json_information.message.holded_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value > 0

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }
  //             else if (filterTerms.paymenttype == "prepaid") {
  //                 const results = json_information.message.holded_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value == 0

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }

  //         }

  //         else {
  //             setall_data(json_information.message.holded_product_list)
  //         }

  //     }
  //     else if (filterTerms.status == "delivered") {
  //         console.log("Delivered product")
  //         if (filterTerms.dcname != "none" && filterTerms.clientname != "none") {
  //             const results = json_information.message.delevered_product_list.filter(p =>
  //                 p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase()) &&
  //                 p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())
  //                 // p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //             );
  //             console.log(results)
  //             setall_data(results);
  //         }
  //         //when dc name, clientname and payment type given
  //         else if (filterTerms.dcname != "none" && filterTerms.clientname != "none"&& filterTerms.paymenttype != "none" ) {
  //             if (filterTerms.paymenttype == "cod") {
  //                 const results = json_information.message.delevered_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value > 0 &&  p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase()) &&
  //                     p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }
  //             else if (filterTerms.paymenttype == "prepaid") {
  //                 const results = json_information.message.delevered_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value == 0 &&  p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase()) &&
  //                     p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }

  //         }
  //         //dcname and payement given
  //         else if (filterTerms.dcname != "none" && filterTerms.paymenttype != "none" ) {
  //             if (filterTerms.paymenttype == "cod") {
  //                 const results = json_information.message.delevered_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value > 0 &&  p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }
  //             else if (filterTerms.paymenttype == "prepaid") {
  //                 const results = json_information.message.delevered_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value == 0 &&  p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }

  //         }
  //         //clientname and payement type given
  //         else if ( filterTerms.clientname != "none"&& filterTerms.paymenttype != "none" ) {
  //             if (filterTerms.paymenttype == "cod") {
  //                 const results = json_information.message.delevered_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value > 0 &&
  //                     p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }
  //             else if (filterTerms.paymenttype == "prepaid") {
  //                 const results = json_information.message.delevered_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value == 0 &&
  //                     p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }

  //         }
  //         //only dcname given
  //         else if (filterTerms.dcname != 'none') {
  //             const results = json_information.message.delevered_product_list.filter(p =>
  //                 p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                 // p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //             );
  //             console.log(results)
  //             setall_data(results);
  //         }
  //         //only clientname given
  //         else if (filterTerms.clientname != 'none') {
  //             const results = json_information.message.delevered_product_list.filter(p =>
  //                 //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                 p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //             );
  //             console.log(results)
  //             setall_data(results);
  //         }
  //         //only payement type given
  //         else if (filterTerms.paymenttype != "none") {
  //             if (filterTerms.paymenttype == "cod") {
  //                 const results = json_information.message.delevered_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value > 0

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }
  //             else if (filterTerms.paymenttype == "prepaid") {
  //                 const results = json_information.message.delevered_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value == 0

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }

  //         }

  //         else {
  //             setall_data(json_information.message.delevered_product_list)
  //         }
  //     }
  //     else if (filterTerms.status == "unattempted") {
  //         console.log("unattempted product")
  //         if (filterTerms.dcname != "none" && filterTerms.clientname != "none") {
  //             const results = json_information.message.unattempted_product_list.filter(p =>
  //                 p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase()) &&
  //                 p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())
  //                 // p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //             );
  //             console.log(results)
  //             setall_data(results);
  //         }
  //         //when dc name, clientname and payment type given
  //         else if (filterTerms.dcname != "none" && filterTerms.clientname != "none"&& filterTerms.paymenttype != "none" ) {
  //             if (filterTerms.paymenttype == "cod") {
  //                 const results = json_information.message.unattempted_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value > 0 &&  p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase()) &&
  //                     p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }
  //             else if (filterTerms.paymenttype == "prepaid") {
  //                 const results = json_information.message.unattempted_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value == 0 &&  p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase()) &&
  //                     p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }

  //         }
  //         //dcname and payement given
  //         else if (filterTerms.dcname != "none" && filterTerms.paymenttype != "none" ) {
  //             if (filterTerms.paymenttype == "cod") {
  //                 const results = json_information.message.unattempted_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value > 0 &&  p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }
  //             else if (filterTerms.paymenttype == "prepaid") {
  //                 const results = json_information.message.unattempted_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value == 0 &&  p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }

  //         }
  //         //clientname and payement type given
  //         else if ( filterTerms.clientname != "none"&& filterTerms.paymenttype != "none" ) {
  //             if (filterTerms.paymenttype == "cod") {
  //                 const results = json_information.message.unattempted_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value > 0 &&
  //                     p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }
  //             else if (filterTerms.paymenttype == "prepaid") {
  //                 const results = json_information.message.unattempted_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value == 0 &&
  //                     p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }

  //         }
  //         //only dcname given
  //         else if (filterTerms.dcname != 'none') {
  //             const results = json_information.message.unattempted_product_list.filter(p =>
  //                 p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                 // p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //             );
  //             console.log(results)
  //             setall_data(results);
  //         }
  //         //only clientname given
  //         else if (filterTerms.clientname != 'none') {
  //             const results = json_information.message.unattempted_product_list.filter(p =>
  //                 //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                 p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //             );
  //             console.log(results)
  //             setall_data(results);
  //         }
  //         //only payement type given
  //         else if (filterTerms.paymenttype != "none") {
  //             if (filterTerms.paymenttype == "cod") {
  //                 const results = json_information.message.unattempted_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value > 0

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }
  //             else if (filterTerms.paymenttype == "prepaid") {
  //                 const results = json_information.message.unattempted_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value == 0

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }

  //         }

  //         else {
  //             setall_data(json_information.message.unattempted_product_list)
  //         }
  //     }
  //     else if (filterTerms.status == "lost") {
  //         console.log("lost product")
  //         if (filterTerms.dcname != "none" && filterTerms.clientname != "none") {
  //             const results = json_information.message.lost_product_list.filter(p =>
  //                 p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase()) &&
  //                 p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())
  //                 // p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //             );
  //             console.log(results)
  //             setall_data(results);
  //         }
  //         //when dc name, clientname and payment type given
  //         else if (filterTerms.dcname != "none" && filterTerms.clientname != "none"&& filterTerms.paymenttype != "none" ) {
  //             if (filterTerms.paymenttype == "cod") {
  //                 const results = json_information.message.lost_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value > 0 &&  p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase()) &&
  //                     p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }
  //             else if (filterTerms.paymenttype == "prepaid") {
  //                 const results = json_information.message.lost_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value == 0 &&  p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase()) &&
  //                     p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }

  //         }
  //         //dcname and payement given
  //         else if (filterTerms.dcname != "none" && filterTerms.paymenttype != "none" ) {
  //             if (filterTerms.paymenttype == "cod") {
  //                 const results = json_information.message.lost_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value > 0 &&  p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }
  //             else if (filterTerms.paymenttype == "prepaid") {
  //                 const results = json_information.message.lost_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value == 0 &&  p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }

  //         }
  //         //clientname and payement type given
  //         else if ( filterTerms.clientname != "none"&& filterTerms.paymenttype != "none" ) {
  //             if (filterTerms.paymenttype == "cod") {
  //                 const results = json_information.message.lost_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value > 0 &&
  //                     p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }
  //             else if (filterTerms.paymenttype == "prepaid") {
  //                 const results = json_information.message.lost_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value == 0 &&
  //                     p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }

  //         }
  //         //only dcname given
  //         else if (filterTerms.dcname != 'none') {
  //             const results = json_information.message.lost_product_list.filter(p =>
  //                 p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                 // p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //             );
  //             console.log(results)
  //             setall_data(results);
  //         }
  //         //only clientname given
  //         else if (filterTerms.clientname != 'none') {
  //             const results = json_information.message.lost_product_list.filter(p =>
  //                 //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                 p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //             );
  //             console.log(results)
  //             setall_data(results);
  //         }
  //         //only payement type given
  //         else if (filterTerms.paymenttype != "none") {
  //             if (filterTerms.paymenttype == "cod") {
  //                 const results = json_information.message.lost_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value > 0

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }
  //             else if (filterTerms.paymenttype == "prepaid") {
  //                 const results = json_information.message.lost_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value == 0

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }

  //         }

  //         else {
  //             setall_data(json_information.message.lost_product_list)
  //         }
  //     }
  //     else if (filterTerms.status == "return") {
  //         console.log("returned product")
  //         if (filterTerms.dcname != "none" && filterTerms.clientname != "none") {
  //             const results = json_information.message.returned_product_list.filter(p =>
  //                 p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase()) &&
  //                 p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())
  //                 // p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //             );
  //             console.log(results)
  //             setall_data(results);
  //         }
  //         //when dc name, clientname and payment type given
  //         else if (filterTerms.dcname != "none" && filterTerms.clientname != "none"&& filterTerms.paymenttype != "none" ) {
  //             if (filterTerms.paymenttype == "cod") {
  //                 const results = json_information.message.returned_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value > 0 &&  p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase()) &&
  //                     p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }
  //             else if (filterTerms.paymenttype == "prepaid") {
  //                 const results = json_information.message.returned_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value == 0 &&  p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase()) &&
  //                     p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }

  //         }
  //         //dcname and payement given
  //         else if (filterTerms.dcname != "none" && filterTerms.paymenttype != "none" ) {
  //             if (filterTerms.paymenttype == "cod") {
  //                 const results = json_information.message.returned_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value > 0 &&  p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }
  //             else if (filterTerms.paymenttype == "prepaid") {
  //                 const results = json_information.message.returned_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value == 0 &&  p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }

  //         }
  //         //clientname and payement type given
  //         else if ( filterTerms.clientname != "none"&& filterTerms.paymenttype != "none" ) {
  //             if (filterTerms.paymenttype == "cod") {
  //                 const results = json_information.message.returned_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value > 0 &&
  //                     p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }
  //             else if (filterTerms.paymenttype == "prepaid") {
  //                 const results = json_information.message.returned_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value == 0 &&
  //                     p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }

  //         }
  //         //only dcname given
  //         else if (filterTerms.dcname != 'none') {
  //             const results = json_information.message.returned_product_list.filter(p =>
  //                 p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                 // p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //             );
  //             console.log(results)
  //             setall_data(results);
  //         }
  //         //only clientname given
  //         else if (filterTerms.clientname != 'none') {
  //             const results = json_information.message.returned_product_list.filter(p =>
  //                 //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                 p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //             );
  //             console.log(results)
  //             setall_data(results);
  //         }
  //         //only payement type given
  //         else if (filterTerms.paymenttype != "none") {
  //             if (filterTerms.paymenttype == "cod") {
  //                 const results = json_information.message.returned_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value > 0

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }
  //             else if (filterTerms.paymenttype == "prepaid") {
  //                 const results = json_information.message.returned_product_list.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value == 0

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }

  //         }

  //         else {
  //             setall_data(json_information.message.returned_product_list)
  //         }
  //     }
  //     else if (filterTerms.status == "none") {
  //         console.log("none product")
  //         //when dc and client name given
  //         if (filterTerms.dcname != "none" && filterTerms.clientname != "none") {
  //             const results = alldatafilter.filter(p =>
  //                 p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase()) &&
  //                 p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())
  //                 // p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //             );
  //             console.log(results)
  //             setall_data(results);
  //         }
  //         //when dc name, clientname and payment type given
  //         else if (filterTerms.dcname != "none" && filterTerms.clientname != "none"&& filterTerms.paymenttype != "none" ) {
  //             if (filterTerms.paymenttype == "cod") {
  //                 const results = alldatafilter.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value > 0 &&  p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase()) &&
  //                     p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }
  //             else if (filterTerms.paymenttype == "prepaid") {
  //                 const results = alldatafilter.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value == 0 &&  p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase()) &&
  //                     p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }

  //         }
  //         //dcname and payement given
  //         else if (filterTerms.dcname != "none" && filterTerms.paymenttype != "none" ) {
  //             if (filterTerms.paymenttype == "cod") {
  //                 const results = alldatafilter.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value > 0 &&  p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }
  //             else if (filterTerms.paymenttype == "prepaid") {
  //                 const results = alldatafilter.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value == 0 &&  p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }

  //         }
  //         //clientname and payement type given
  //         else if ( filterTerms.clientname != "none"&& filterTerms.paymenttype != "none" ) {
  //             if (filterTerms.paymenttype == "cod") {
  //                 const results = alldatafilter.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value > 0 &&
  //                     p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }
  //             else if (filterTerms.paymenttype == "prepaid") {
  //                 const results = alldatafilter.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value == 0 &&
  //                     p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }

  //         }
  //         //only dcname given
  //         else if (filterTerms.dcname != 'none') {
  //             const results = alldatafilter.filter(p =>
  //                 p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                 // p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //             );
  //             console.log(results)
  //             setall_data(results);
  //         }
  //         //only clientname given
  //         else if (filterTerms.clientname != 'none') {
  //             const results = alldatafilter.filter(p =>
  //                 //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                 p.customer_name.toString().toLowerCase().includes(filterTerms.clientname.toString().toLowerCase())

  //             );
  //             console.log(results)
  //             setall_data(results);
  //         }
  //         //only payement type given
  //         else if (filterTerms.paymenttype != "none") {
  //             if (filterTerms.paymenttype == "cod") {
  //                 const results = alldatafilter.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value > 0

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }
  //             else if (filterTerms.paymenttype == "prepaid") {
  //                 const results = alldatafilter.filter(p =>
  //                     //p.dc_office_name.toString().toLowerCase().includes(filterTerms.dcname.toString().toLowerCase())
  //                     p.product_value == 0

  //                 );
  //                 console.log(results)
  //                 setall_data(results);
  //             }

  //         }
  //         //nothing is given
  //         else {
  //             console.log("none list",alldatafilter)
  //             setall_data(alldatafilter)
  //         }
  //     }

  // }, [searchFlag,alldatafilter])

  // useEffect(() => {

  //     const results = json_information.message.unattempted_product_list.filter(p =>
  //         p.waybill_number.toString().toLowerCase().includes(searchTerm.toString().toLowerCase()) || p.order_id.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())

  //     );
  //     setSearchResults(results);
  // }, [filterTerms]);
  // const searchFilter = () => {
  //     setsearch_flag(!searchFlag)
  // }
  // const handleFilter = (e) => {
  //     setfilter_terms({ ...filterTerms, [e.target.id]: e.target.value })
  //     setsearch_flag(!searchFlag)
  // }
  // dropdown client name end
  // modal start

  const openModal = (e, way) => {
    //e.preventDefault();
    console.log("waybill", way);
    console.log("employee id", employId);
    setwaybill(way);
    setSubmitFlag(!SubmitFlag);
    setIsOpen(true);
  };

  // console.log("this is waybill",waybill)

  useEffect(() => {
    // e.preventDefault();
    var axios = require("axios");

    var data = JSON.stringify({
      employee_id: employId,
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
  }, [SubmitFlag, logingInformation_LocalStore, employId]);

  function closeInvoiceModal() {
    setinfoModalOpen(false);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const customStyles = {
    overlay: {
      position: "fixed",
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

  const search = () => {
    console.log("this is dc", dcname);
    console.log("this is client", client);
    console.log("this is startdate", startdate);
    console.log("this is enddate", enddate);
    console.log("this is finalstatus", finalstatus);
    console.log("this is paymenttype", paymenttype);

    console.log("this is singlestatus", final);

    var axios = require("axios");
    var data = JSON.stringify({
      user_id: 0,
      dc_name: dcname,
      client_name: client,
      start_datetime: startdate,
      end_datetime: enddate,
      payment_type: paymenttype,
      status: finalstatus,
    });
    console.log("this is data : ", data);
    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/all_panel_all_search" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/all_panel_all_search" +
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

        return response;
      })
      .then((res) => {
        console.log("new response", res);
        setsearchreasult(res.data.message.all_product_information);
        setwaybilsearch(res.data.message.all_product_information);

        //setinfoModalOpen(true);

        //setpayload(true);
      });
  };

  console.log("This is searchresult", searchreasult);

  return (
    <>
      {/* modal start */}

      <div className="bordered">
        {/* Invoice modal */}
        <Modal
          isOpen={infoModalOpen}
          style={customStyles}
          onRequestClose={closeInvoiceModal}
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
              <span className="badge bg-secondary">Product Name</span>:{" "}
              {infoData.product_infor && infoData.product_infor.producT_NAME}
            </h6>
            <h6>
              <span className="badge bg-secondary">Product Waybill Number</span>
              :{" "}
              {infoData.product_infor &&
                infoData.product_infor.producT_WAYBILL_NUMBER}
            </h6>
            <h6>
              <span className="badge bg-secondary">Address</span>:{" "}
              {infoData.product_infor && infoData.product_infor.address}
            </h6>
            <h6>
              <span className="badge bg-secondary">Product Return Address</span>
              :{" "}
              {infoData.product_infor &&
                infoData.product_infor.producT_RETURN_ADDRESS}
            </h6>
            <h6>
              <span className="badge bg-secondary">Product Total</span>:{" "}
              {infoData.product_infor && infoData.product_infor.producT_TOTAL}
            </h6>
            <h6>
              <span className="badge bg-secondary">Product Type</span>:{" "}
              {infoData.product_infor && infoData.product_infor.producT_TYPE}
            </h6>
            <h6>
              <span className="badge bg-secondary">Product Urgent STATUS</span>:{" "}
              {infoData.product_infor &&
                infoData.product_infor.producT_URGENT_STATUS}
            </h6>
            <h6>
              <span className="badge bg-secondary">Product VALUE AMOUNT</span>:{" "}
              {infoData.product_infor &&
                infoData.product_infor.producT_VALUE_AMOUNT}
            </h6>

            <h6>
              <span className="badge bg-secondary">Product WEIGHT</span>:{" "}
              {infoData.product_infor && infoData.product_infor.producT_WEIGHT}
            </h6>

            <h6>
              <span className="badge bg-secondary">Receiver NAME</span>:{" "}
              {infoData.product_infor && infoData.product_infor.receiveR_NAME}
            </h6>
            <h6>
              <span className="badge bg-secondary">Receiver PHONE NUMBER</span>:{" "}
              {infoData.product_infor &&
                infoData.product_infor.receiveR_PHONE_NUMBER}
            </h6>
            <h6>
              <span className="badge bg-secondary">Reference NO</span>:{" "}
              {infoData.product_infor && infoData.product_infor.referencE_NO}
            </h6>
            <h6>
              <span className="badge bg-secondary">Return PIN</span>:{" "}
              {infoData.product_infor && infoData.product_infor.returN_PIN}
            </h6>

            <h6>
              <span className="badge bg-secondary">Area CODE</span>:{" "}
              {infoData.product_infor && infoData.product_infor.areA_CODE}
            </h6>
            <h6>
              <span className="badge bg-secondary">Bag ID NUMBER</span>:{" "}
              {infoData.product_infor && infoData.product_infor.baG_ID_NUMBER}
            </h6>
            <h6>
              <span className="badge bg-secondary">Consignee NAME</span>:{" "}
              {infoData.product_infor && infoData.product_infor.consigneE_NAME}
            </h6>
            <h6>
              <span className="badge bg-secondary">Contact NUMBER</span>:{" "}
              {infoData.product_infor && infoData.product_infor.contacT_NUMBER}
            </h6>
            <h6>
              <span className="badge bg-secondary">District INCHARGE ID</span>:{" "}
              {infoData.product_infor &&
                infoData.product_infor.districT_INCHARGE_ID}
            </h6>
            <h6>
              <span className="badge bg-secondary">Emergency NUMBER</span>:{" "}
              {infoData.product_infor &&
                infoData.product_infor.emergencY_NUMBER}
            </h6>
            <h6>
              <span className="badge bg-secondary">EOD STATUS</span>:{" "}
              {infoData.product_infor && infoData.product_infor.eoD_STATUS}
            </h6>
            <h6>
              <span className="badge bg-secondary">EOD STATUS DATETIME</span>:{" "}
              {infoData.product_infor &&
                infoData.product_infor.eoD_STATUS_DATETIME}
            </h6>
            <h6>
              <span className="badge bg-secondary">
                EOD STATUS FINISH DATETIME
              </span>
              :{" "}
              {infoData.product_infor &&
                infoData.product_infor.eoD_STATUS_FINISH_DATETIME}
            </h6>
            <h6>
              <span className="badge bg-secondary">Pincode</span>:{" "}
              {infoData.product_infor && infoData.product_infor.pincode}
            </h6>
            <h6>
              <span className="badge bg-secondary">Product CUSTOMER ID</span>:{" "}
              {infoData.product_infor &&
                infoData.product_infor.producT_CUSTOMER_ID}
            </h6>
            <h6>
              <span className="badge bg-secondary">Product DELEVERED BY</span>:{" "}
              {infoData.product_infor &&
                infoData.product_infor.producT_DELEVERED_BY}
            </h6>
            <h6>
              <span className="badge bg-secondary">Product DELEVERY TIME</span>:{" "}
              {infoData.product_infor &&
                infoData.product_infor.producT_DELEVERY_TIME}
            </h6>
            <h6>
              <span className="badge bg-secondary">Product DESCRIPTION</span>:{" "}
              {infoData.product_infor &&
                infoData.product_infor.producT_DESCRIPTION}
            </h6>

            <h6>
              <span className="badge bg-secondary">Product DETAILS</span>:{" "}
              {infoData.product_infor && infoData.product_infor.producT_DETAILS}
            </h6>
            <h6>
              <span className="badge bg-secondary">Product ENTRY TIME</span>:{" "}
              {infoData.product_infor &&
                infoData.product_infor.producT_ENTRY_TIME}
            </h6>
            <h6>
              <span className="badge bg-secondary">Product ID</span>:{" "}
              {infoData.product_infor && infoData.product_infor.producT_ID}
            </h6>
            <h6>
              <span className="badge bg-secondary">Product LOCK STATUS</span>:{" "}
              {infoData.product_infor &&
                infoData.product_infor.producT_LOCK_STATUS}
            </h6>

            <h6>
              <span className="badge bg-secondary">Product PAYMENT TYPE</span>:{" "}
              {infoData.product_infor &&
                infoData.product_infor.producT_PAYMENT_TYPE}
            </h6>
            <h6>
              <span className="badge bg-secondary">
                Product PROCESSING STATUS
              </span>
              :{" "}
              {infoData.product_infor &&
                infoData.product_infor.producT_PROCESSING_STATUS}
            </h6>
            <h6>
              <span className="badge bg-secondary">
                Product PRODESSING STATUS DATETIME
              </span>
              :{" "}
              {infoData.product_infor &&
                infoData.product_infor.producT_PRODESSING_STATUS_DATETIME}
            </h6>
          </div>
        </Modal>
      </div>

      {/* modal end */}

      {/* <div className="row n">
                        <div className="col-12 mx-5">
                        <div className="border-dark border">
                        <form>
                            <div className="input-group">
                                    <input type="text" className="form-control mx-2" placeholder="type here......." value={searchTerm} onChange={handleChange}/>
                                    <div className="input-group-append">

                                    </div>
                            </div>
                        </form>
                        </div>
                        </div>
                   </div> */}
      <div className="container row-col-2">
        {/* search option */}

        <div className="border  mb-5">
          <form className="row d-flex justify-content-center">
            <div className=" col-sm-4 form-group mx-3 mt-2">
              <div className=" text-center text-black mx-1">DC Name:</div>
              {/*  onChange={handleFilter}*/}
              <input
                list="dcNames"
                className="form-control "
                id="dcname"
                onChange={(e) => {
                  setdcname(e.target.value);
                }}
              />
              <datalist id="dcNames">
                <option selected value="">
                  None
                </option>
                {dc_name.map((single_dc_office_name) => {
                  // console.log("SINGLE DC NAME:", single_dc_office_name);
                  return (
                    <option
                      value={single_dc_office_name.toString().toLowerCase()}
                    ></option>
                  );
                })}
              </datalist>
            </div>
            <div className="col-sm-4 form-group mx-3 mt-2">
              <div className=" text-center text-black mx-1">Client Name:</div>
              {/* onChange={handleFilter} */}
              <input
                list="clientNames"
                className="form-control"
                id="clientname"
                onChange={(e) => {
                  setclient(e.target.value);
                }}
              />
              <datalist id="clientNames">
                <option selected value="">
                  None
                </option>
                {clientname.map((single_dc_office_name) => {
                  // console.log("SINGLE DC NAME:", single_dc_office_name);
                  return <option value={single_dc_office_name}></option>;
                })}
              </datalist>
            </div>
            {/*  onChange={handleFilter} */}
            <div className=" col-sm-4 form-group mx-3 mt-4">
              <div className=" text-center text-black m-2">
                Start Date:{" "}
                <input
                  type="date"
                  className="input-small "
                  id="startdate"
                  value={startdate}
                  onChange={(e) => {
                    setstartdate(e.target.value);
                  }}
                />
              </div>
            </div>
            {/*  onChange={handleFilter}*/}
            <div className=" col-sm-4 form-group mx-3 mt-4">
              <div className="text-center text-black m-2">
                End Date:{" "}
                <input
                  type="date"
                  className="input-small"
                  id="enddate"
                  value={enddate}
                  onChange={(e) => {
                    setenddate(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className=" col-sm-4 form-group mx-3 mt-4">
              <div className=" text-center text-black mx-1">Payment Type:</div>
              {/* onChange={handleFilter} */}
              <select
                className="form-select"
                id="paymenttype"
                onChange={(e) => {
                  setpaymenttype(e.target.value);
                }}
              >
                <option selected value="">
                  None
                </option>
                <option value="COD">COD</option>
                <option value="Prepaid">Prepaid</option>
              </select>
            </div>
            <div className=" col-sm-4 form-group mx-3 mt-4">
              <div className=" text-center text-black mx-1">Status:</div>
              {/* onChange={handleFilter} */}
              {/* <select className="form-select"  multiple="multiple" onChange={(e) => { setstatus(e.target.value) }}>
                                <option selected value="">None</option>
                                <option value="InSystem">InSystem</option>
                                <option value="Delevered">Delevered</option>
                                <option value="Returned">Returned</option>
                                <option value="Lost">Lost</option>

                            </select> */}

              <Multiselect
                isObject={false}
                onRemove={(event) => {
                  console.log(event);
                  finalstatus.pop(event);
                }}
                onSelect={(event) => {
                  console.log(event);
                  setfinalstatus(event);
                  //finalstatus.push(event.selectedItem)
                }}
                options={status}
                selectedValues={[]}
                //showCheckbox
              />
            </div>

            <div className="col-md-12 d-flex justify-content-center mt-4 mb-2">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={search}
              >
                Search
              </button>
              {/* onClick={searchFilter} */}
            </div>
          </form>
        </div>

        <div className="row-2 mt-5 d-flex justify-content-center">
          <div className="col-8 mx-5">
            <div className="">
              <form>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control mx-2"
                    placeholder="Type here......."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                  />
                  <div className="input-group-append"></div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* <div className="border border-dark bg-dark mb-5">
                    <h3 className="text-center text-white"></h3>

                        <div className="row justify-content-center mx-auto">

                                <form className="form-inline">
                                    <div className="d-flex justify-content-center mx-auto text-center">
                                        <div className="col-sm-4">
                                           Dc Name: <input list="data" className="form-control" id="bgscrl" placeholder="Dc Name "   />
                                            <datalist id="data">
                                                {

                                                    dc_name.map(single_dc_office_name => {
                                                         return (
                                                             <option>{single_dc_office_name}</option>
                                                         );
                                                     })
                                                }
                                            </datalist>
                                        </div>

                                        <div className="col-sm-4">
                                           Client Name: <input list="brow" className="form-control" id="bgscrl" placeholder="Client Name "   />
                                            <datalist id="brow">
                                                {

                                                    clientname.map(single_clientname => {
                                                         return (
                                                             <option>{single_clientname}</option>
                                                         );
                                                     })
                                                }
                                            </datalist>
                                        </div>



                                        {/* <div className="text-center text-white mx-1">
                                            Client Name: <input type="text" className="input-small "   />
                                        </div> */}

        {/* <div className=" text-center text-white mx-1">
                                            Start Date: <input type="date" className="input-small " value={startDateTime} onChange={(e) => { setstartDateTime(e.target.value) }} />
                                        </div>
                                        <div className="text-center text-white mx-1">
                                            End Date: <input type="date" className="input-small" value={endDataTime} onChange={(e) => { setendDataTime(e.target.value) }} />
                                        </div>


                                    </div>
                                    <div className="d-flex justify-content-center mx-auto text-center">
                                    <div className="col-sm-4 p-3">
                                           Payment Type: <input list="brow" className="form-control" id="bgscrl" placeholder="Payment Type"   />
                                            <datalist id="brow">
                                                {
                                                    <option>COD</option>

                                                    // DistrictNameinformation.message.all_dc_name.map(single_dc_office_name => {
                                                    //     return (
                                                    //         <option>{single_dc_office_name}</option>
                                                    //     );
                                                    // })
                                                }
                                            </datalist>

                                        </div>
                                        <div className="col-sm-4 p-3">
                                        Status: <input list="brow" className="form-control" id="bgscrl" placeholder="Status"   />
                                            <datalist id="brow">
                                                {
                                                    <option></option>
                                                    // DistrictNameinformation.message.all_dc_name.map(single_dc_office_name => {
                                                    //     return (
                                                    //         <option>{single_dc_office_name}</option>
                                                    //     );
                                                    // })
                                                }
                                            </datalist>
                                        </div>
                                        </div>

                                    <div className="mx-auto text-center">
                                        {/* <button type="submit" className="btn btn-info text-white mt-5" onClick={searchButtonFunction}>Confirm</button> */}
        {/* </div>
                                </form>

                        </div> */}

        {/* </div> */}

        {/* <div className="row-2 mt-5">
                    <div className="col-8 mx-5">
                        <div className="">
                            <form>
                                <div className="input-group">
                                    <input type="text" className="form-control mx-2" placeholder="Type here......." value={searchTerm} onChange={handleChange} />
                                    <div className="input-group-append">

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div> */}
        <div id="requesttable">
          <div>
            {/*<CSVLink data={searchreasult} className="btn btn-sm bg-info text-black border-info mb-2" >Download csv</CSVLink>*/}
            {/*Table*/}

            <ReactHTMLTableToExcel
              className="js-download-link button bg-info border border-info px-4 btn-sm mb-2 mx-2 text-white rounded-pill"
              table="bd"
              filename="ReportExcel"
              sheet="Sheet"
              buttonText="Export excel"
            />
            <table className="table table-hover css-serial" id="bd">
              {/*Table head*/}
              <thead className="bg-dark">
                <tr className="text-white">
                  <th></th>
                  <th scope="col">Waybill</th>
                  <th>Order ID</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Consignee Name</th>
                  <th scope="col">Details</th>
                  <th>Value</th>
                  <th>Weight</th>
                  <th scope="col">Dc Office </th>
                  <th>Pin Code</th>
                  <th>Status</th>
                  <th>StatuscDate</th>
                  <th>Reason</th>
                </tr>
              </thead>
              {/*Table head*/}
              {/*Table body*/}
              <tbody>
                {searchreasult.map((single_message) => {
                  return (
                    <tr
                      key={single_message.product_waybill}
                      className="bg-success text-white"
                    >
                      <td></td>
                      <td
                        scope="row"
                        className="btn btn-outline-primary text-white"
                        onClick={(e) =>
                          openModal(e, single_message.product_waybill)
                        }
                      >
                        {single_message.product_waybill}
                      </td>
                      <td>{single_message.order_id}</td>
                      <td>{single_message.client_name}</td>
                      <td>{single_message.consingee_name}</td>
                      <td>{single_message.product_des}</td>
                      <td>{single_message.cod_amount}</td>
                      <td> {single_message.product_weight}</td>
                      <td>{single_message.dc_name}</td>
                      <td>{single_message.pincode}</td>
                      <td>{single_message.product_processing_status}</td>
                      <td>
                        {" "}
                        {single_message.product_processing_status_datetime}
                      </td>
                      <td>{single_message.reason}</td>
                    </tr>
                  );
                })}
                {/* {
                                    json_information.message.returned_product_list.map(single_message => {

                                        return (
                                            <tr key={single_message.waybill_number} className="bg-primary text-white">
                                                <td></td>
                                                <th scope="row">{single_message.waybill_number}<br></br>
                                                    {single_message.order_id}
                                                </th>
                                                <td>{single_message.customer_name}</td>
                                                <td>{single_message.consignee_name}</td>
                                                <td>{single_message.product_detail}

                                                </td>
                                                <td>{single_message.product_value}<br></br>
                                                    {single_message.product_weight}</td>
                                                <td>{single_message.dc_office_name}<br></br>
                                                    {single_message.pincode}
                                                </td>
                                                <td>{single_message.product_processing_stage}<br></br>
                                                    {single_message.product_processing_stage_datetime}
                                                </td>
                                                <td>
                                                    {single_message.reason}

                                                </td>

                                            </tr>
                                        )
                                    })
                                }
                                {
                                    json_information.message.holded_product_list.map(single_message => {

                                        return (
                                            <tr key={single_message.waybill_number} className="bg-warning text-white">
                                                <td></td>
                                                <th scope="row">{single_message.waybill_number}<br></br>
                                                    {single_message.order_id}
                                                </th>
                                                <td>{single_message.customer_name}</td>
                                                <td>{single_message.consignee_name}</td>
                                                <td>{single_message.product_detail}

                                                </td>
                                                <td>{single_message.product_value}<br></br>
                                                    {single_message.product_weight}</td>
                                                <td>{single_message.dc_office_name}<br></br>
                                                    {single_message.pincode}
                                                </td>
                                                <td>{single_message.product_processing_stage}<br></br>
                                                    {single_message.product_processing_stage_datetime}
                                                </td>
                                                <td>
                                                    {single_message.reason}

                                                </td>

                                            </tr>
                                        )
                                    })
                                }
                                {
                                    json_information.message.lost_product_list.map(single_message => {

                                        return (
                                            <tr key={single_message.waybill_number} className="bg-danger text-black">
                                                <td></td>
                                                <th scope="row">{single_message.waybill_number}<br></br>
                                                    {single_message.order_id}
                                                </th>
                                                <td>{single_message.customer_name}</td>
                                                <td>{single_message.consignee_name}</td>
                                                <td>{single_message.product_detail}

                                                </td>
                                                <td>{single_message.product_value}<br></br>
                                                    {single_message.product_weight}</td>
                                                <td>{single_message.dc_office_name}<br></br>
                                                    {single_message.pincode}
                                                </td>
                                                <td>{single_message.product_processing_stage}<br></br>
                                                    {single_message.product_processing_stage_datetime}
                                                </td>
                                                <td>
                                                    {single_message.reason}

                                                </td>

                                            </tr>
                                        )
                                    })
                                } */}
                {/* {
                                    searchResults.map(single_message => {

                                        return (
                                            <tr key={single_message.waybill_number} className="bg-info">
                                                <td></td>
                                                <th scope="row">{single_message.waybill_number}<br></br>
                                                    {single_message.order_id}
                                                </th>
                                                <td>{single_message.customer_name}</td>
                                                <td>{single_message.consignee_name}</td>
                                                <td>{single_message.product_detail}

                                                </td>
                                                <td>{single_message.product_value}<br></br>
                                                    {single_message.product_weight}</td>
                                                <td>{single_message.dc_office_name}<br></br>
                                                    {single_message.pincode}
                                                </td>
                                                <td>{single_message.product_processing_stage}<br></br>
                                                    {single_message.product_processing_stage_datetime}
                                                </td>
                                                <td>
                                                    {single_message.reason}

                                                </td>

                                            </tr>
                                        )
                                    })
                                } */}
              </tbody>
              {/*Table body*/}
            </table>
            {/*Table*/}
          </div>
        </div>
      </div>
    </>
  );
};
export default Creportdownload;
