import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../Context/loginContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { CSVLink } from "react-csv";
import axios from "axios";
import {
  Linksidebar,
  Degital_Ocean_flag,
  company_name,
  dcpanel,
} from "../../Common/Linksidebar";
import "./css/home.css";
import { toast } from "react-toastify";
// import downloadPdf from "../../DownloadPDF";
import { getCurrentTime } from "../../Common/common";
import { func } from "prop-types";

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

const Assigntofetablenew = ({ reFetch, setReFetch, response, reFetchSuccess }) => {
  toast.configure();
  const [dispatch, setDispatch] = useState([]);
  console.log("dispatch", dispatch);
  const [selectedData, setSelectedData] = useState([]);
  const [scanProduct, setScanProduct] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const [pdfstate, setpdfstate] = useState(false);

  const [employId, setemployId] = useState("");
  const [felist, setfelist] = useState([]);
  const [selectedfe, setselectedfe] = useState("");
  const [readyScanProduct, setReadyScanProduct] = useState([]);
  var { loginInformation, setloginInformation } = useContext(LoginContext);

  const [apihitstate, setapihitstate] = useState(false);

    const [debouncedValue, setDebouncedValue] = useState('');
    const [sortdata, setsortdata] = useState(false);
    const [sorteddata, setsorteddata] = useState([]);

  const [logingInformation_LocalStore, setlogingInformation_LocalStore] =
    useState(loginInformation);
  const [siteBarInformation_LocalStore, setsiteBarInformation_LocalStore] =
    useState([]);
  const [isDropdownSelected, setIsDropdownSelected] = useState(false);

  const [datapdf, setdatapdf] = useState([]);

  

  let json_information = response;
  function handleDropdownChange  (e)  {
    setIsDropdownSelected(true);
    setselectedfe(e.target.value)
  };

  useEffect(() => {
    //console.log(siteBarInformation_LocalStore);
    let data = JSON.stringify({
      DC_ID_number: logingInformation_LocalStore.all_user_list.employeE_ID,
    });

  

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/getFeinDc" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/getFeinDc" + "?company_name=" + company_name,
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
        return json_object;
      })
      .then((res) => {
        setfelist(res.message);
        // setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [logingInformation_LocalStore]);

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
      setemployId(loginInformation.all_user_list.employeE_ID);
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
      setemployId(context_flag_obj.all_user_list.employeE_ID);
      setlogingInformation_LocalStore(context_flag_obj);
    }
  }, []);

  useEffect(() => {
    let temp = [];
    json_information.message?.map((product) => {
      product?.all_Products_of_Bag?.map((single_product) => {
        temp.push(single_product);
        setDispatch(temp);
      });
    });
  }, [reFetchSuccess]);
  // check box start
  const handleCheck = (e) => {
    const { name, checked } = e.target;
    if (name === "allselect") {
      const tempUser = dispatch.map((e) => {
        return { ...e, isChecked: checked };
      });
      console.log("in if", tempUser);
      setDispatch(tempUser);
    } else {
      const tempUser = dispatch.map((e) =>
        e.producT_WAYBILL_NUMBER === name ? { ...e, isChecked: checked } : e
      );
      console.log("in else", tempUser);
      setDispatch(tempUser);
    }
  };
  useEffect(() => {
    const selectedValue = dispatch.filter((e) => e.isChecked == true);
    setSelectedData(selectedValue);
  }, [dispatch]);
  // check box end

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

  // organized scan product for payload

  useEffect(() => {
    let waybillLength = 13;
    let startIndex = 0;
    let endIndex = 13;
    let temp = [];
    while (endIndex <= scanProduct.length) {
      temp.push(scanProduct.slice(startIndex, endIndex));
      startIndex += waybillLength;
      endIndex += waybillLength;
    }
    setReadyScanProduct(temp);
  }, [scanProduct]);

  // submit assign to fe function
  function submit() {
    if (selectedData.length === 0 && scanProduct.length === 0) {
      return toast.warning("please select or scant Product!");
    }

    let data =
      selectedData?.map((e) => e.producT_WAYBILL_NUMBER).length == 0
        ? readyScanProduct
        : selectedData?.map((e) => e.producT_WAYBILL_NUMBER);
    const dd = data.map((elm) =>
      dispatch.filter((e) => e.producT_WAYBILL_NUMBER == elm)
    );

    // const arrForPdf = dd.flat(Infinity);

    const preparePayload = data.map((e) => ({
      product_waybill_number: e,
      field_operative_id: parseInt(selectedfe),
      dc_id: logingInformation_LocalStore.all_user_list.employeE_ID,
      dateTime: getCurrentTime(),
    }));
    const payload = JSON.stringify(preparePayload);
    // return console.log("dekh", payload);
    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/assignProducttoFe" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/assignProducttoFe" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: payload,
    };
    console.log("this is data", data);
    console.log("this is data", config);

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        return json_object;
      })
      .then((res) => {
        console.log("response is fe list", res);
        // downloadPdf(feNameArr.concat(arrForPdf));
        toast.success(res.status);
        setReFetch(!reFetch);

        if (res.already_confirmed_product_list.length >= 1) {
          let str = "";
          res.already_confirmed_product_list.map((wrong_waybill) => {
            str += wrong_waybill + " ";
          });

          toast.warning(
            `Products Already Assigned ! 
              ${str}`
          );
        }
      })
      .catch(function (error) {
        toast.warning("Please Select FE");
        console.log(error);
      });
  }
  
  

  // submit func end

  const feName = felist.filter((e) => e?.field_operative_id == selectedfe)[0]
    ?.field_operative_name;

  const feNameArr = [{ field_operative_name: feName }];
  console.log("feName", feName);

  function newsearch(e) {
    const searchValuesArray = e.split(",").map((value) => value.trim());
    setSearchValue(searchValuesArray);
  }

  

  function createpdf() {

    if (scanProduct.trim() !== '') {
      // Create a new object with a key and value
      const newItem = { "producT_WAYBILL_NUMBER": scanProduct };

      // Add the new item to the dataArray
        setdatapdf([...datapdf, newItem]);
        // setsortdata(!sortdata);

      // Clear the input field
       setScanProduct('');
      }
      
      
    
    }
    
    // useEffect(() => {
    //     const sortedData = datapdf.slice().sort((a, b) => a.producT_WAYBILL_NUMBER - b.producT_WAYBILL_NUMBER);
    //     setsorteddata(sortedData)

        
    // },[sortdata])

  console.log("dbounced value",debouncedValue)

  

  useEffect(() => {

    const fetchData = async () => { 

//       if (scanProduct.length <=5) {
//         // Display an error message or handle the condition as needed
//         toast.warning("Invalid scanProduct length. It should be 13 or greater.");
//         setScanProduct("")
//         setDebouncedValue('')
//     console.error("Invalid scanProduct length. It should be 13 or 17 characters.");
//     return; // Exit the function without making the API request
//   }

       const preparePayload = {
      product_waybill_number: scanProduct,
      field_operative_id: parseInt(selectedfe),
      dc_id: logingInformation_LocalStore.all_user_list.employeE_ID,
      dateTime: getCurrentTime(),
    };
    const payload = JSON.stringify(preparePayload);
    // return console.log("dekh", payload);
    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/assignProducttoFeNew" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/assignProducttoFeNew" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: payload,
    };
    console.log("this is data", payload);
    console.log("this is data", config);

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        return json_object;
      })
      .then((res) => {
        console.log("response is fe assign", res);
        setScanProduct("")
        setDebouncedValue('')
        // downloadPdf(feNameArr.concat(arrForPdf));
          toast.success(res.message+res.data);
          if (res.statusCode == 200) {
              createpdf()
              setScanProduct("")
            setDebouncedValue('')
          }
        
        setReFetch(!reFetch);

        if (res.already_confirmed_product_list.length >= 1) {
          let str = "";
          res.already_confirmed_product_list.map((wrong_waybill) => {
            str += wrong_waybill + " ";
          });

          toast.warning(
            `Products Already Assigned ! 
              ${str}`
          );
        }
      })
      .catch(function (error) {
        // toast.warning("Please Select FE");
        console.log(error);
      });

    }

    if (debouncedValue) {

      console.log("dbounced value inside effect",debouncedValue)
      fetchData();
    }

    // if (dispatch.includes(scanProduct)) {

     
      
    // }
    // else {
    //   toast.warning("Please select correct waybill or reference");
    // }
     
    
  }, [debouncedValue])
  
  console.log("data for pdf", datapdf)

  // const debounce = (func, delay) => {
  //   let timeoutId;

  //   return function () {
  //     if (timeoutId) {
  //       clearTimeout(timeoutId);
  //     }

  //     const args = arguments;

  //     timeoutId = setTimeout(() => {
  //       func.apply(this, args);
  //     }, delay);
  //   };
  // };

  useEffect(() => {
    // Create a timer to update the debounced value
    const timer = setTimeout(() => {
      setDebouncedValue(scanProduct);
    }, 400); // Debounce for 300 milliseconds

    // Clear the timer if the component unmounts or if inputValue changes
    return () => {
      clearTimeout(timer);
    };
  }, [scanProduct]);

  function apihit(e) {

    setScanProduct(e.target.value);

    // debounce(() => {
    //   setDebouncedValue(e.target.value);
    // }, 300);

    // setapihitstate(!apihitstate)


    // setpdfstate(true)

      // e.preventDefault();
    
  }
  
  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=600,height=600');
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Table</title>
          <style>
            /* Define your print styles here */
            body {
              font-size: 13px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #000;
              padding: 5px;
            }
            thead {
              background-color: #b4bec2;
            }
            .text-center {
              text-align: center;
            }
          </style>
        </head>
        <body>
          <table class="table">
            <thead class="text-center">
              <tr class="text-dark">
                <th>WAYBILL NUMBER</th>
              </tr>
            </thead>
            <tbody class="text-center">
              ${datapdf.slice().reverse()
                .map(
                  (single_message) => `
                    <tr>
                      <td data-title="WAYBILL_NUMBER">${single_message.producT_WAYBILL_NUMBER}</td>
                    </tr>
                  `
                )
                .join('')}
            </tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  return (
    <>
      <div className="mt-4 container" id="">
        <h3 className="text-center">
          Welcome To {logingInformation_LocalStore.all_user_list.employeE_ZONE}
        </h3>

        <div className="bordered mt-5">
          <div className="row align-items-center">
            <div
              className="col-lg-6 col-md-6 col-12 mb-2 p-4 rounded"
              style={{ backgroundColor: "#C5D5E4" }}
            >
              <div className="row">
                <div className="col-12 col-md-4 col-lg-3">
                  <p className="">Select FE:</p>
                </div>
                <div className="col-12 col-md-8 col-lg-9">
                  <input
                    style={{
                      //   backgroundColor: "#C5D5E4",
                      outline: "none",
                      border: "none",
                      padding: "7px",
                      borderRadius: "8px",
                      width: "93%",
                    }}
                    type="text"
                    placeholder="Select FE"
                    list="felist"
                    // onChange={(e) => setselectedfe(e.target.value)}
                    onChange={(e)=>handleDropdownChange(e)}
                  />
                  <datalist id="felist" className="w-100">
                    {felist.map((single_fe) => {
                      if (single_fe.active_or_inactive === "Active")
                        return (
                          <option value={single_fe.field_operative_id}>
                            {single_fe.field_operative_name}
                          </option>
                        );
                    })}
                  </datalist>
                </div>
              </div>
            </div>
            <div className="col-4 col-lg-1 col-md-2 ">
              {/* <button
                type="button"
                className="btn btn-sm btn-success rounded-3 mb-2"
                onClick={submit}
                disabled={
                  felist.filter(
                    (e) =>
                      e?.field_operative_id === parseInt(selectedfe) &&
                      e?.active_or_inactive === "Active"
                  )[0]?.field_operative_id !== parseInt(selectedfe)
                }
              >
                Submit
              </button> */}
            </div>
            <div className="col-12 col-lg-3 col-md-4">
              <div
                className="rounded rounded-3 bg-primary"
                // id="dashboard-card"
              >
                <div className="card-body text-white">
                  <h5 className="card-title">Total Shipment</h5>
                  <span className="card-title">
                    <b>{datapdf.length}</b>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="no-more-tables" className="mt-4">
          <div className="row">
            {/* <div className="col-lg-2 col-md-2 col-12">
              <CSVLink
                data={dispatch}
                className="btn btn-sm px-4 btn-dark mb-2"
              >
                Export csv
              </CSVLink>
            </div> */}
            <div
              className="col-lg-5 col-md-5 col-12"
              //  style={{ width: "370px", minWidth: "250px" }}
            >
              {isDropdownSelected && (
                 <input
                className="shadow-lg form-control mb-2 bg-white rounded"
                type="text"
                placeholder="Scan Product Bar Code"
                required
                value={scanProduct}
                // onChange={(e) => {
                //   setScanProduct(e.target.value);
                  //   }}
                  
                  onChange={(e) => {
                  apihit(e);
                  }}
                  

              />
        
      )}
             
            </div>
            <div className="col-lg-5 col-md-5 col-12">

              {/* <button
                // type="button"
            className="btn btn-sm btn-success rounded-3 mb-2"
            disabled={datapdf.length==0}
                onClick={downloadPdf(feNameArr.concat(datapdf))}
                
              >
                Download pdf
              </button> */}
          
              
            </div>
          </div>

          {/* <table
            className="table bg-white"
            style={{ fontSize: "13px", marginLeft: "1px" }}
          >
            <thead
              className="text-center shadow sticky-top "
              style={{ backgroundColor: "#b4bec2", top: "60px", zIndex: "0" }}
            >
              <tr className="text-dark" style={{ border: "none" }}>
                <th scope="col">
                  All
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      checked={
                        dispatch.filter((e) => e.isChecked !== true).length < 1
                      }
                      name="allselect"
                      onChange={handleCheck}
                      disabled={searchValue.length !== 0}
                    />
                  </div>
                </th>
                <th>ID</th>
                <th>WAYBILL NUMBER</th>
                <th>Reference NO</th>
                <th>Product NAME</th>
                <th>Consignee NAME</th>
                <th>Address</th>
                <th>DETAILS</th>
                <th>DC ID</th>
                <th>AMOUNT</th>
                <th>Picked Date</th>
              </tr>
            </thead>

            <tbody className="text-center border border-dark">
              {dispatch
                .filter((e) => {
                  if (!searchValue || searchValue.trim() === "") {
                    return true;
                  }

                  const searchValuesArray = searchValue
                    .split(",")
                    .map((value) => value.trim().toLowerCase());

                  return searchValuesArray.some(
                    (searchItem) =>
                      e.producT_WAYBILL_NUMBER
                        .toString()
                        .toLowerCase()
                        .includes(searchItem) ||
                      e.referencE_NO
                        .toString()
                        .toLowerCase()
                        .includes(searchItem)
                  );
                })
                // .filter((e) => {
                //   return searchValue && searchValue.toLowerCase() == ""
                //     ? e
                //     : e.producT_WAYBILL_NUMBER
                //         .toString()
                //         .toLowerCase()
                //         .includes(searchValue?.toLowerCase()) ||
                //         e.referencE_NO
                //           .toString()
                //           .toLowerCase()
                //           .includes(searchValue?.toLowerCase());
                // })
                .map((single_message, i) => {
                  return (
                    <tr key={i}>
                      <td data-title="Select">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            onChange={handleCheck}
                            name={single_message.producT_WAYBILL_NUMBER}
                            checked={single_message?.isChecked || false}
                          />
                        </div>
                      </td>

                      <td data-title="ID">{single_message.producT_ID}</td>
                      <td data-title=" WAYBILL_NUMBER">
                        {single_message.producT_WAYBILL_NUMBER}
                      </td>
                      <td data-title="Order ID">
                        {single_message.referencE_NO}
                      </td>
                      <td data-title=" Product Name">
                        {single_message.producT_NAME}
                      </td>
                      <td data-title="Consignee NAME">
                        {single_message.consigneE_NAME}
                      </td>
                      <td data-title="Address">{single_message.address}</td>
                      <td data-title="DETAILS">
                        {single_message.producT_DETAILS}
                      </td>

                      <td data-title="DC ID">
                        {single_message.districT_INCHARGE_ID}
                      </td>
                      <td data-title="Amount">
                        {single_message.producT_VALUE_AMOUNT}
                      </td>
                      <td data-title="Picked Date">
                        {single_message.pickeD_UP_DATE}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table> */}

          <button onClick={handlePrint}>Print</button>
          

          

           <table
            className="table bg-white"
            style={{ fontSize: "13px", marginLeft: "1px" }}
          >
            
            <thead
              className="text-center shadow sticky-top "
              style={{ backgroundColor: "#b4bec2", top: "60px", zIndex: "0" }}
            >
              <tr className="text-dark" style={{ border: "none" }}>
                
                
                <th>WAYBILL NUMBER</th>
               
              </tr>
            </thead>

            <tbody className="text-center border border-dark">
              {datapdf?.slice().reverse()
                
             
                .map((single_message, i) => {
                  return (
                    <tr key={i}>
                     

                      <td data-title=" WAYBILL_NUMBER">
                        {single_message.producT_WAYBILL_NUMBER}
                      </td>
                      
                    </tr>
                  );
                })}
            </tbody>
          </table> 
        </div>
      </div>
    </>
  );
};
export default Assigntofetablenew;
