import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
import Hometabledc from "../../Model/Dcpanel/Hometabledc";
// import '../css/all.css';
import "./css/home.css";
import axios from "axios";
import { QrReader } from 'react-qr-reader';
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
    dcpanel,
} from "../../Common/Linksidebar";
import { toast } from "react-toastify";
import ReactModal from "react-modal";

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

export default function Receivedbagtabledc(props) {
    toast.configure();
    let regular_bag_list = props.response.message;
    let return_bag_list = props.response.return_bag_list;
    const [bagtype, setbagtype] = useState("");
    const [data, setdata] = useState([]);
    const [productflag, setproductflag] = useState(false);
    const [infoModalOpen, setinfoModalOpen] = useState(false);
    const [selectedbag, setselectedbag] = useState("");
    const [searchResult, setsearchResult] = useState("");
    const [information, setinformation] = useState("");
    const [payload, setpayload] = useState("");
    const [searchTerm, setsearchTerm] = useState("");
    const [strProductWaybillList, setstrProductWaybillList] = useState("");
    const [confirmproductlist, setconfirmproductlist] = useState([]);
    var { loginInformation, setloginInformation } = useContext(LoginContext);
    const [inputText, setInputText] = useState([]);
    const [apihit, setapihit] = useState(false);
    const [scannedData, setScannedData] = useState('');
    const [error, setError] = useState("");
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
    const [scannedDatastr, setScannedDatastr] = useState('');
    const [bagProductWaybillList, setbagProductWaybillList] = useState([]);
    const [Datanew, setDatanew] = useState("");
    const [apidata, setapidata] = useState([]);
    
  const [scannedDataArray, setScannedDataArray] = useState([]);
    //login context start
    const [logingInformation_LocalStore, setlogingInformation_LocalStore] =
        useState(loginInformation);
    const [siteBarInformation_LocalStore, setsiteBarInformation_LocalStore] =
        useState([]);
        


        

          const handleInputChange = (event) => {
              setScannedData(event.target.value);
            //   setapihit(!apihit)
            //   apinew()

    };
    
    function apinew() {
        setapidata(scannedData)
        // setapihit(!apihit)
    }

          useEffect(() => {
            if (scannedData.endsWith('\n')) {
              // If the scanned data ends with a newline character, consider it a complete scan
              const cleanedData = scannedData.trim(); // Remove leading/trailing whitespace
              console.log("cleaned data",cleanedData)
              if (cleanedData.length > 0) {
                // Push the cleaned data to the array
                setScannedDataArray((prevArray) => [...prevArray, cleanedData]);
              }
              // Clear the input field
              setScannedData('');
            //   setapihit(!apihit)
            }
            setapihit(!apihit)
          }, [scannedData]);

          console.log("new scan data",scannedDataArray)

        const handleScan = (data) => {
        
            if (data) {
                console.log("scaner data",data)
              // Add a comma to the scanned data
              const dataWithComma = `${data},`;
              console.log("data with coma",dataWithComma)
              setScannedData(dataWithComma);
            }
          }
        
          const handleError = (error) => {
            console.error(error);
          }
          console.log("scanned data",scannedData)

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
    const InputTextfunnew=(e)=>{
        setstrProductWaybillList(e.target.value)
    }
    function InputTextfun(e) {
        // Get the current value of the input field
        const inputValue = e;
    
        const stringsArray = inputValue.split(",");
        const trimmedStrings = stringsArray.map((str) => str.trim());
    
        // Check for duplicates
        const duplicates = findDuplicates(trimmedStrings);
    
        if (duplicates.length > 0) {
          setError(`Duplicate values: ${duplicates.join(", ")}`);
          setInputText(trimmedStrings);
          setIsSubmitDisabled(true);
        } else {
          setError("");
          setInputText(trimmedStrings);
          setIsSubmitDisabled(false);
        }
      }
    
      const findDuplicates = (array) => {
        const counts = {};
        const duplicates = [];
    
        array.forEach((item) => {
          if (counts[item]) {
            counts[item]++;
            if (!duplicates.includes(item)) {
              duplicates.push(item);
            }
          } else {
            counts[item] = 1;
          }
        });
    
        return duplicates;
      };
    // login context end
    // selecting type of bag; regular or return
    const bagtypeselect = (e) => {
        console.log("bagtype", e.target.value);
        setbagtype(e.target.value);
    };
    // setting the array with selected bag type to show in table
    useEffect(() => {
        bagtype === "Return" ? setdata(return_bag_list) : setdata(regular_bag_list);
    }, [bagtype]);
    // s
    const showproductlist = (e) => {
        console.log("selected bag", e.target.value);
        setselectedbag(e.target.value);
        setinfoModalOpen(true);
    };
    useEffect(() => {
        if (selectedbag === "") return;

        let data = JSON.stringify({
            dc_id: logingInformation_LocalStore.all_user_list.employeE_ID,
            bag_waybill_list: [selectedbag],
            date_time: getCurrentTime(),
        });
        var config = {
            method: "post",
            url: Degital_Ocean_flag
                ? "https://e-deshdelivery.com/universalapi/allapi/receiveBagbyDC" +
                "?company_name=" +
                company_name
                : "/universalapi/allapi/receiveBagbyDC" +
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
                let json_object_str = JSON.stringify(response.data);
                let json_object = JSON.parse(json_object_str);
                return json_object;
            })
            .then((res) => {
                console.log("response is product to confirm", res);
                setinformation(res);
                setstrProductWaybillList("");
                setpayload(true);
                toast.success("Products Loaded!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                });
                //  setinfoModalOpen(true)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [selectedbag]);
    useEffect(() => {
        // Simulating a barcode scan when the input field changes
        if (scannedData) {
          setScannedDataArray((prevArray) => [...prevArray, scannedDatastr]);
          setScannedDatastr(''); // Clear the input field
        }
      }, [scannedDatastr]);
      console.log("scannedstr,",scannedDataArray)
    const confirmproduct = (e) => {
        e.preventDefault();
        setbagProductWaybillList(string_to_list(strProductWaybillList));
        setapihit(true)
        // let waybillLength = 13;
        // let startIndex = 0;
        // let endIndex = 13;
        // let temp = [];
        // while (endIndex <= strProductWaybillList.length) {
        //     temp.push(strProductWaybillList.slice(startIndex, endIndex));
        //     startIndex += waybillLength;
        //     endIndex += waybillLength;
        // }
        // console.log("confirm product list", temp);
        // setconfirmproductlist(temp);
    };
    console.log("bag prod",bagProductWaybillList)
    useEffect(() => {
        if (selectedbag === "") {
            toast.info("Select a Bag To Confirm Product!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
            return;
        }

        // if (inputText.length === 0) return;

        let data = JSON.stringify({
            dc_id: logingInformation_LocalStore.all_user_list.employeE_ID,
            bag_waybill_number: selectedbag,
            date_time: getCurrentTime(),
            // conferm_product_list: bagProductWaybillList,
            conferm_product_list: [scannedData],
            lost_product_list: [],
            damaged_product_list: [],
        });
        console.log("this is confirm bagproduct data", data);
        var config = {
            method: "post",
            url: Degital_Ocean_flag
                ? "https://e-deshdelivery.com/universalapi/allapi/confermBagProducts" +
                "?company_name=" +
                company_name
                : "/universalapi/allapi/confermBagProducts" +
                "?company_name=" +
                company_name,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${logingInformation_LocalStore.token}`,
            },
            data: data,
        };
        console.log("config", config);

        axios(config)
            .then(function (response) {
                let json_object_str = JSON.stringify(response.data);
                let json_object = JSON.parse(json_object_str);
                return json_object;
            })
            .then((res) => {
                console.log("product confirmed", res);
                setapihit(false)
                setScannedData('')
                if (res.message.wrong_product_waybill_list.length >= 1) {
                    let str = "";
                    res.message.wrong_product_waybill_list.map((wrong_waybill) => {
                        str += wrong_waybill + " ";
                    });

            //         toast.error(
            //             `Wrong Waybill List ! 
            // ${str}`,
            //             {
            //                 position: "top-right",
            //                 autoClose: false,
            //                 hideProgressBar: true,
            //                 closeOnClick: true,
            //                 pauseOnHover: true,
            //             }
            //         );
                }
                if (res.message.successful_conferm_product_waybill.length >= 1) {
                    let str = "";
                    res.message.successful_conferm_product_waybill.map(
                        (wrong_waybill) => {
                            str += wrong_waybill + " ";
                        }
                    );

                    toast.success(
                        `Products Confirmed ! 
              ${str}`,
                        {
                            position: "top-right",
                            autoClose: false,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                        }
                    );
                }
                if (res.already_confirmed_product_list.length >= 1) {
                    let str = "";
                    res.already_confirmed_product_list.map((wrong_waybill) => {
                        str += wrong_waybill + " ";
                    });

                    toast.warning(
                        `Products Already Confirmed ! 
              ${str}`,
                        {
                            position: "top-right",
                            autoClose: false,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                        }
                    );
                }

                //  setinformation(res);
                //  setpayload(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [apihit]);
    useEffect(() => {
        //console.log("entering filter effect", allproductdata)
        const users1 = data.filter(
            (p) =>
                p.baG_WAYBILL_NUMBER
                    .toString()
                    .toLowerCase()
                    .includes(searchTerm.toString().toLowerCase()) ||
                p.baG_DESTINATION_CENTER
                    .toString()
                    .toLowerCase()
                    .includes(searchTerm.toString().toLowerCase())
        );
        setsearchResult(users1);
    }, [searchTerm, data]);

    const closeInvoiceModal = () => {
        setinfoModalOpen(false);
    };
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
            color: "black",
            position: "absolute",

            top: "20%",
            left: "10%",
            right: "10%",
            bottom: "8%",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
        },
    };

    const qrReaderStyles = {
        width: '10% !important',
    paddingTop: '10vh !important', // Add !important to ensure highest specificity
    overflow: 'hidden !important',
    position: 'relative !important',
      };

      console.log("here is datanew",Datanew)

      

    return (
        <div className="mt-5 pt-5">
            <h3 className="text-center mb-3">
                Welcome To {logingInformation_LocalStore.all_user_list.employeE_ZONE}
            </h3>
            {/* <div className=" mb-5">
        <form className="row d-flex justify-content-center" id="dcrecevedbag">
          <p>
            welcome to{" "}
            {logingInformation_LocalStore.all_user_list.employeE_ZONE}
          </p>

          <div className=" col-md-4 col-sm-4 w-25 form-group mx-3 mt-2">
            <div className=" text-center text-black mx-1">
              <label>Select Bag Type</label>
            </div>

            <select
              className="form-select "
              id="paymenttype"
              onChange={bagtypeselect}
            >
              <option selected value="Regular">
                Regular
              </option>
              <option value="Return">Return</option>
            </select>
          </div>
        </form>
      </div> */}

            <div className="row ">
                <div
                    className="col-lg-6 col-md-12 col-11 mb-4 p-3 ms-3 rounded"
                    style={{ backgroundColor: "#C5D5E4" }}
                >
                    <div className="row">
                        <div className="col-12 col-md-4 col-lg-3">
                            <p className="">Select Bag Type:</p>
                        </div>
                        <div className="col-12 col-md-8 col-lg-9">
                            {" "}
                            <select
                                style={{
                                    // backgroundColor: "#C5D5E4",
                                    outline: "none",
                                    border: "none",
                                    padding: "7px",
                                    borderRadius: "8px",
                                    width: "85%",
                                }}
                                id="paymenttype"
                                onChange={bagtypeselect}
                            >
                                <option selected value="Regular">
                                    Regular
                                </option>
                                <option value="Return">Return</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 col-md-8 col-12 mb-3">
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
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setsearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="">
                <div id="no-more-tables">
                    <table
                        className="table bg-white"
                        style={{ fontSize: "13px", marginLeft: "1px" }}
                        // id="dctable"
                    >
                        <thead
                            className="text-center shadow sticky-top "
                            style={{ backgroundColor: "#b4bec2", top: "60px", zIndex: "0" }}
                        >
                        <tr className="text-dark" style={{ border: "none" }}>
                            <th scope="col">Action</th>
                            <th scope="col">WayBill</th>
                            <th>ID</th>
                            <th scope="col">DC ID</th>
                            <th>Description</th>
                            <th scope="col">Package Number </th>

                            <th scope="col">Bag Creation Center</th>
                            <th>Bag Creation Date</th>
                            <th>Bag Destination Center</th>
                            <th scope="col">Created Employee ID</th>
                            <th>totaL VALUE OF BAG</th>
                        </tr>
                        </thead>
                        <tbody className="text-center border border-dark">
                        {searchResult &&
                            searchResult.map((single_message) => {
                                // console.log(single_message)
                                return (
                                    <tr
                                        key={
                                            single_message.baG_ID_NUMBER
                                        } /*onClick={()=>bag_row_clicked_function(single_message.baG_ID_NUMBER)}*/
                                    >
                                        <td data-title="Action">
                                            <button
                                                className="btn btn-sm btn-outline-primary"
                                                value={single_message.baG_WAYBILL_NUMBER}
                                                onClick={showproductlist}
                                            >
                                                Products
                                            </button>
                                        </td>
                                        <td data-title="WayBill">
                                            {single_message.baG_WAYBILL_NUMBER}
                                        </td>
                                        <td data-title="ID">{single_message.baG_ID_NUMBER} </td>
                                        <td data-title="DC ID">
                                            {single_message.baG_RECEIVER_ID}
                                        </td>
                                        <td data-title="Description">
                                            {single_message.baG_DESCRIPTION}
                                        </td>
                                        <td data-title="Package Number">
                                            {single_message.numbeR_OF_PACKAGES_IN_BAG}
                                        </td>
                                        <td data-title="Bag Creation Center">
                                            {single_message.baG_CRATION_CENTER}
                                        </td>
                                        <td data-title="Bag Creation Date">
                                            {single_message.baG_CREATION_DATE}
                                        </td>
                                        <td data-title="Bag Destination Center">
                                            {single_message.baG_DESTINATION_CENTER}
                                        </td>
                                        <td data-title="Created Employee ID">
                                            {single_message.baG_CREATED_BY}
                                        </td>
                                        <td data-title="Total VALUE OF BAG">
                                            {single_message.totaL_VALUE_OF_BAG}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <ReactModal
                isOpen={infoModalOpen}
                style={customStyles}
                onRequestClose={closeInvoiceModal}
                closeTimeoutMS={200}
                contentLabel="Example Modal"
            >
                <div className="">
                    <button
                        className="btn btn-outline-danger mb-2"
                        onClick={closeInvoiceModal}
                    >
                        close
                    </button>

                    <div
                        className="border border-primary d"
                        // style={{ position: "relative" }}
                    >
                        <div className="container p-3">
                            <div className="row my-2">
        
                                <div className="col-12 col-lg-3 col-md-4">
                                    <p> Confirm Way Bill Number:</p>
                                </div>
                                {/* <div>
                                <QrReader
                                  delay={300}
                                  onError={handleError}
                                  onScan={handleScan}
                                  style={qrReaderStyles}
                                />
                                <p>Scanned Data: {scannedData}</p>
                              </div> */}
                                
                                <div className="col-8 col-lg-6 col-md-6">
                                    {" "}
                                    <input
                                        type="text"
                                        className="shadow-lg form-control  me-3 bg-white rounded"
                                        placeholder="Waybill Number"
                                        required
                                        value={scannedData}
                                        onChange={handleInputChange}
                                        // onChange={(e) => InputTextfunnew(e)}
                                        // onChange={(e) => setScannedDatastr(e.target.value)}
                                        // onChange={(e) => {
                                        //     setstrProductWaybillList(e.target.value);
                                        // }}
                                    />
                                </div>
                                <div>
      <QrReader
        
        onResult={(result, error) => {
          if (!!result) {
            console.log(result)
            setDatanew(result?.text);
          }

          

          if (!!error) {
            console.info(error);
          }
        }}
        style={qrReaderStyles}
      />
      <p>Scanned Data: {scannedData}</p>
    </div>
                                <div className="col-4 col-lg-1 col-md-1">
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-success rounded-3"
                                        onClick={confirmproduct}
                                        // disabled={!strProductWaybillList}
                                    >
                                        Submit
                                    </button>
                                </div>
                                
                            </div>
                            {/* <form>
                <div className="form-group row mb-2">
                  <label className="col-sm-3 col-form-label">
                    Confirm Way Bill Number:
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control form-control-success"
                      placeholder="Waybill Number"
                      required
                      value={strProductWaybillList}
                      onChange={(e) => {
                        setstrProductWaybillList(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 d-flex justify-content-center text-align-center">
                    <button
                      className="btn btn-primary  mb-3"
                      onClick={confirmproduct}
                      disabled={!strProductWaybillList}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form> */}
                        </div>
                    </div>

                    <div id="no-more-tables" className="mt-3">
                        <table
                            className="table bg-white"
                            style={{ fontSize: "13px", marginLeft: "1px" }}
                            //  id="dctable"
                        >
                            <thead
                                className="text-center shadow"
                                style={{ backgroundColor: "#b4bec2", zIndex: "0" }}
                            >
                            <tr className="text-dark" style={{ border: "none" }}>
                                <th scope="col">WayBill</th>
                                <th>ID</th>
                                <th scope="col">Consignee NAME</th>
                                <th>contacT NUMBER</th>
                                <th scope="col">DESCRIPTION</th>

                                <th scope="col">PAYMENT TYPE</th>
                                <th>PROCESSING STATUS</th>
                                <th>PRODESSING STATUS DATETIME</th>
                                <th scope="col">address</th>
                                <th>VALUE AMOUNT</th>
                            </tr>
                            </thead>
                            <tbody className="text-center border border-dark">
                            {information.message &&
                                information.message.receiveBagbyDC_Product_Info_Classes_list.map(
                                    (single_message) => {
                                        // console.log(single_message)
                                        return (
                                            <tr
                                                key={
                                                    single_message.producT_WAYBILL_NUMBER
                                                } /*onClick={()=>bag_row_clicked_function(single_message.baG_ID_NUMBER)}*/
                                            >
                                                <td data-title="WayBill">
                                                    {single_message.producT_WAYBILL_NUMBER}
                                                </td>
                                                <td data-title="ID">
                                                    {single_message.referencE_NO}{" "}
                                                </td>
                                                <td data-title="Consignee NAME">
                                                    {single_message.consigneE_NAME}
                                                </td>
                                                <td data-title="contacT NUMBER">
                                                    {single_message.contacT_NUMBER}
                                                </td>
                                                <td data-title="DESCRIPTION">
                                                    {single_message.producT_DESCRIPTION}
                                                </td>

                                                <td data-title="PAYMENT TYPE">
                                                    {single_message.producT_PAYMENT_TYPE}
                                                </td>
                                                <td data-title="Processing Status">
                                                    {single_message.producT_PROCESSING_STATUS}
                                                </td>
                                                <td
                                                    data-title="Processing Status DATETIME"
                                                    className="h-100"
                                                >
                                                    {single_message.producT_PRODESSING_STATUS_DATETIME}
                                                </td>
                                                <td data-title="address">{single_message.address}</td>

                                                <td data-title="VALUE AMOUNT">
                                                    {single_message.producT_VALUE_AMOUNT}
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </ReactModal>
        </div>
    );
}
