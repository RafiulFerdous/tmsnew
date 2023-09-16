import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Uploadcsvfile from "../../Model/Processingcenter/Uploadcsvfile";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
import "../css/all.css";
import { toast } from "react-toastify";
import { LoginContext } from "../../Context/loginContext";
import { SearchContext } from "../../Context/searchContext";
import { SearchButtonContext } from "../../Context/buttonContext";
import "./UploadCsv.css";
import {
  Linksidebar,
  CustomerCareLinksidebar,
  Salessidebar,
  Operationsidebar,
  Degital_Ocean_flag,
  company_name,
  superadminsidebar,
} from "../../Common/Linksidebar";
import { CSVLink } from "react-csv";
import Select from "react-dropdown-select";
import { MdOutlineUploadFile } from "react-icons/md";
import GetDarazCsv from "./GetDarazCsv";
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
let destination_address, setdestination_address;

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

let baseFile, setBaseFile;
let file_name, setfile_name;
let csvUploadButtonFlag, setcsvUploadButtonFlag;
let fileUpload_flag, setfileUpload_flag;
let date_time, setdate_time;

const Upload = () => {
  toast.configure();
  [destination_address, setdestination_address] = useState("");
  const [information, setinformation] = useState({});
  const [payload, setpayload] = useState(false);

  [date_time, setdate_time] = useState("");

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
        employee_degignation_list.SuperAdmin
      ) {
        setsiteBarInformation_LocalStore(superadminsidebar); //useState a set kore rakhlam
      }
      setlogingInformation_LocalStore(context_flag_obj);
    }
  }, []);

  [baseFile, setBaseFile] = useState("");
  [file_name, setfile_name] = useState("");

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setfile_name(file?.name);
    setBaseFile(base64);
    console.log("base64 data : ", base64);
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (file == undefined) {
        setError("No Chosen File.");
        setfile_name(null);
      } else {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      }
    });
  };

  [csvUploadButtonFlag, setcsvUploadButtonFlag] = useState(false);
  [fileUpload_flag, setfileUpload_flag] = useState(false);

  let csv_upload_filebutton_function = (e) => {
    if (logingInformation_LocalStore.token != undefined) {
      var axios = require("axios");
      let start_index = -5;
      for (let i = 0; i < baseFile.length; i++) {
        if (baseFile[i] == ",") {
          start_index = i + 1;
          break;
        }
      }
      let final_file_data = baseFile.substring(start_index, baseFile.length);
      console.log("final data : ", final_file_data);
      var data = JSON.stringify(
        {
          base64EncodedData_new: final_file_data,
          fileName: file_name,
        }
        /*
            {
              "base64EncodedData_new":"V2F5YmlsbCxyZWZlcmVuY2Ugbm8sQ29uc2lnbmVlIE5hbWUsQ2l0eSxTdGF0ZSxBZGRyZXNzLFBpbmNvZGUsUGhvbmUsTW9iaWxlLFdlaWdodCxQYXltZW50IE1vZGUsUGFja2FnZSBBbW91bnQsQ29kIEFtb3VudCxQcm9kdWN0IHRvIGJlIFNoaXBwZWQsUmV0dXJuIEFkZHJlc3MsUmV0dXJuIFBpbixTZWxsZXIgTmFtZSxDb3VudHJ5LFNlbGxlciBBZGRyZXNzLENvdW50cnlfY29kZSxTZWxsZXIgQ1NUIE5vLFNlbGxlciBUSU4sSW52b2ljZSBObyxJbnZvaWNlIERhdGUsTGVuZ3RoLEJyZWFkdGgsSGVpZ2h0LFF1YW50aXR5LENvbW1vZGl0eSBWYWx1ZSxUYXggVmFsdWUsQ2F0ZWdvcnkgb2YgR29vZHMsU2FsZXMgVGF4IEZvcm0gYWNrIG5vLENvbnNpZ25lZSBUSU4sU2hpcHBpbmcgQ2xpZW50LFNlbGxlcl9HU1RfVElOLENsaWVudF9HU1RfVElOLENvbnNpZ25lZV9HU1RfVElOLEludm9pY2VfUmVmZXJlbmNlLEhTTl9Db2RlLFJldHVybiBSZWFzb24sVmVuZG9yIFBpY2t1cCBMb2NhdGlvbixFV0JOLFN1cHBseV9TdWJfVHlwZSxEb2N1bWVudF9UeXBlLERvY3VtZW50X051bWJlcixEb2N1bWVudF9EYXRlLE9EX0Rpc3RhbmNlCixNNTQ1LChNZWhlcmluIE5vb3IgU2FraWJhLS0wMDg4MDE2MjczNjMxOTQpLEdhemlwdXIgU2FkYXIsR2F6aXB1ciwiTWFzZGFpciAoUmFuZ3B1ciBIb3VzZSkgTmFyYXlhbmdhbmosCkhvbGRpbmcgTm86IDExCldhcmQgTm86IDA5CkJsb2NrOiBBICIsMTcwMywsMTYzMDAwMDAwMCwwLjUsQ09ELDEsMjE1MCxEUkVTUywiRUNCIENoYXR0YXIsIEhha2thbmkgTnVyYW5pIEphbWUgTW9zaGppZCwgTWFuaWtkaSBNYXRoZXIgS29uYSBQYXRoLCBEaGFrYSIsMTIxNixNaXRoaWxhX0NvbGxlY3Rpb24sQmFuZ2xhZGVzaCxbMzFzdF9NYXJjaF8yMDIxXSxCRCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLAosTTU0NiwoTXVzYXJyYXQgWmFiaW4gLS0wMDg4MDE5NzE0NTk3ODkpLEtodWxuYSBTYWRhcixLaHVsbmEsQmFpdHVsIGlzbGFtLiBCZWhpbmQgbnVyaXlhIHNjaG9vbC4gU291dGggYWxla2FuZGEuIEJvcmlzbCBzb2Rvci4sMTcwMCwsMTk3MTQ1OTc4OSwwLjUsQ09ELDEsNTAwLERSRVNTLCJFQ0IgQ2hhdHRhciwgSGFra2FuaSBOdXJhbmkgSmFtZSBNb3NoamlkLCBNYW5pa2RpIE1hdGhlciBLb25hIFBhdGgsIERoYWthIiwxMjE2LE1pdGhpbGFfQ29sbGVjdGlvbixCYW5nbGFkZXNoLFszMXN0X01hcmNoXzIwMjFdLEJELCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsCixNNTQ3LChSZXp3YW5hIFNoYXJtaW4tLTAwODgwMTk4NjE1MzExMiksR2F6aXB1ciBTYWRhcixHYXppcHVyLCJTaGVraCBzYWhlYiBiYXphciBkb3RhbGEgbW9zamlkLGF6aW1wdXIsRGhha2EiLDEyMTMsLDE5ODYxNTMxMTIsMC41LENPRCwxLDk4MCxEUkVTUyAsIkVDQiBDaGF0dGFyLCBIYWtrYW5pIE51cmFuaSBKYW1lIE1vc2hqaWQsIE1hbmlrZGkgTWF0aGVyIEtvbmEgUGF0aCwgRGhha2EiLDEyMTYsTWl0aGlsYV9Db2xsZWN0aW9uLEJhbmdsYWRlc2gsWzMxc3RfTWFyY2hfMjAyMV0sQkQsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwKLE01NDgsKFNpbXJpbiBTYWppZC0tMDA4ODAxOTIwMjAxMDA4KSxLaHVsbmEgU2FkYXIsS2h1bG5hLCJXZXN0IERoYW5tb25kaSxNb2RodWJhemFyLCBIYXppIEFrdGVyIEhvc3NhaW4gUm9hZCAKSG91c2Ugbm8gMTQ1LzUvSSIsMTIyOSwsMTkyMDIwMTAwOCwwLjUsQ09ELDEsNTgwLERSRVNTICwiRUNCIENoYXR0YXIsIEhha2thbmkgTnVyYW5pIEphbWUgTW9zaGppZCwgTWFuaWtkaSBNYXRoZXIgS29uYSBQYXRoLCBEaGFrYSIsMTIxNixNaXRoaWxhX0NvbGxlY3Rpb24sQmFuZ2xhZGVzaCxbMzFzdF9NYXJjaF8yMDIxXSxCRCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLAosTTU0OSwoRWl0ZSBJc2xtYW0tLTAwODgwMTk5NDQ3MjU2NyksREhBS0EgU2FkYXIsREhBS0EsIkJyYWhtYW5iYXJpYSxCaXNzaG8tcm9hZCAiLDIzNTAsLDE5OTQ0NzI1NjcsMC41LENPRCwxLDEzMDAsRFJFU1MsIkVDQiBDaGF0dGFyLCBIYWtrYW5pIE51cmFuaSBKYW1lIE1vc2hqaWQsIE1hbmlrZGkgTWF0aGVyIEtvbmEgUGF0aCwgRGhha2EiLDEyMTYsTWl0aGlsYV9Db2xsZWN0aW9uLEJhbmdsYWRlc2gsWzMxc3RfTWFyY2hfMjAyMV0sQkQsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwKLE01NTAsKEZhcnphbmEgQWhtZWQtLTAwODgwMTcxNjcyMjMwNCksS2FwYXNoaXlhLEdhemlwdXIsIkUtMTgsM3JkIGZsb29yLiBKYWtpciBob3NzYWluIHJvYWQuIE1vaGFtbWFkcHVyLiBEaGFrYS0xMjA3IiwxNjUxLCwxNzE2NzIyMzA0LDAuNSxDT0QsMSwxMzgwLERSRVNTLCJFQ0IgQ2hhdHRhciwgSGFra2FuaSBOdXJhbmkgSmFtZSBNb3NoamlkLCBNYW5pa2RpIE1hdGhlciBLb25hIFBhdGgsIERoYWthIiwxMjE2LE1pdGhpbGFfQ29sbGVjdGlvbixCYW5nbGFkZXNoLFszMXN0X01hcmNoXzIwMjFdLEJELCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsCixNNTUxLChOdXNyYXQgWGFoYW4tLTAwODgwMTg4OTA0NDcyOCksUmFtbmEgVGhhbmEsREhBS0EsIjQyL0JDQyBSb2FkLCBHb2dpbm9nb3IgTGFuZSB3YXJpIFNhcGxhIFRvd2VyIiwxNDEyLCwxODg5MDQ0NzI4LDAuNSxDT0QsMSwyNjgwLERSRVNTICwiRUNCIENoYXR0YXIsIEhha2thbmkgTnVyYW5pIEphbWUgTW9zaGppZCwgTWFuaWtkaSBNYXRoZXIgS29uYSBQYXRoLCBEaGFrYSIsMTIxNixNaXRoaWxhX0NvbGxlY3Rpb24sQmFuZ2xhZGVzaCxbMzFzdF9NYXJjaF8yMDIxXSxCRCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLAosTTU1MiwoTm8gTmFtZS0tMDA4ODAxNzEwODM4ODIwOCksR2F6aXB1ciBTYWRhcixHYXppcHVyLCI1MDcvQSAoNXRoIGZsb29yKSBsaWZ0IDQoQSkgU2hhamFoYW5wdXIgVG93ZXIsIE5vcnRoIFNoYWphaGFucHVyLCBTaGFudGluYWdhciwgTW90aWpoZWVsLCBEaGFrYS0gMTIxNy4iLDE0MjEsLDE3MTA4Mzg4MjAsMC41LENPRCwxLDkzMCxEUkVTUywiRUNCIENoYXR0YXIsIEhha2thbmkgTnVyYW5pIEphbWUgTW9zaGppZCwgTWFuaWtkaSBNYXRoZXIgS29uYSBQYXRoLCBEaGFrYSIsMTIxNixNaXRoaWxhX0NvbGxlY3Rpb24sQmFuZ2xhZGVzaCxbMzFzdF9NYXJjaF8yMDIxXSxCRCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLAo =",
              "fileName" : file_name

          }*/
      );
      console.log("basefile==", baseFile);
      console.log("fileName: ", file_name);
      var config = {
        method: "post",
        url: Degital_Ocean_flag
          ? "https://e-deshdelivery.com/universalapi/allapi/readAllFiles" +
            "?company_name=" +
            company_name
          : "/universalapi/allapi/readAllFiles" +
            "?company_name=" +
            company_name,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${logingInformation_LocalStore.token}`,
        },
        data: data,
      };

      console.log("api for upload csv file....:: ", config);

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          setdate_time(getCurrentTime);
          setfileUpload_flag((fileUpload_flag) => !fileUpload_flag);
          console.log("Successfully call upload csv file.", response);
          toast.success("SuccessFully Uploaded  !", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
        })
        .catch(function (error) {
          //console.log(error);
          toast.error("Please Try again  !", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
        });
    }
    e.preventDefault();
    console.log("button click base file", baseFile);
    setcsvUploadButtonFlag((csvUploadButtonFlag) => !csvUploadButtonFlag);
  };

  // useEffect(()=>{

  // },[logingInformation_LocalStore,csvUploadButtonFlag]);

  useEffect(() => {
    if (logingInformation_LocalStore.token != undefined) {
      var axios = require("axios");
      var data = JSON.stringify({
        employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
        csv_path: file_name,
        //"date_time": "2021-08-03T15:47:28.000"
        date_time: date_time,
        company_name: destination_address,
      });

      var config = {
        method: "post",
        url: Degital_Ocean_flag
          ? "https://e-deshdelivery.com/universalapi/allapi/clientUploadCsv" +
            "?company_name=" +
            company_name
          : "/universalapi/allapi/clientUploadCsv" +
            "?company_name=" +
            company_name,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${logingInformation_LocalStore.token}`,
        },
        data: data,
      };

      console.log("Read CSV file:::::", config);
      // toast.success("Please wait !", {
      //   position: "top-right",
      //   autoClose: 3000,
      //   hideProgressBar: true,
      //   closeOnClick: true,
      //   pauseOnHover: true,

      // });

      axios(config)
        .then(function (response) {
          let json_object_str = JSON.stringify(response.data);
          let json_object = JSON.parse(json_object_str);
          if (json_object.already_existed_products_list.length !== 0) {
            toast.info(
              "Product Already Exist " +
                json_object.already_existed_products_list.map(
                  (e) => e.referencE_NO
                )
            );
          }
          if (json_object.inserted_product_list.length !== 0) {
            toast.info(
              "Product Inserted " +
                json_object.inserted_product_list.map((e) => e.referencE_NO)
            );
          }
          if (json_object.inserted_product_list.length === 0) {
            toast.info("Product Not Inserted see Details in table!");
          }
          if (
            json_object.inserted_product_list.length === 0 &&
            json_object.already_existed_products_list.length === 0
          ) {
            toast.warning("Something is wrong please try Again!");
          }
          if (json_object.inserted_product_list.length !== 0) {
            toast.success("Uploaded Data !", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
          }

          console.log("Successfully call read_data from file.", response);
          console.log(json_object.already_existed_products_list);
          return json_object;
        })
        .then((res) => {
          setinformation(res);
          setpayload(true);
        })
        .catch(function (error) {
          //console.log(error);
        });
    }
  }, [logingInformation_LocalStore, fileUpload_flag]);

  const [error, setError] = useState("");
  console.log("first", error);

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <>
      <div className="bodydiv">
        <div className="row">
          <div className="col-12 ">
            <Navbar sidebar_manu={siteBarInformation_LocalStore} />
          </div>
        </div>

        <div className="mt-5 pt-5 container">
          <div className="col-12 pt-4" id="">
            <div className="form-group row mb-2 d-flex justify-content-center">
              <div className="row">
                <div className="col-lg-6 col-md-8 col-12 m-auto row">
                  <div className=" w-100 m-auto mb-3">
                    <label for="uploadFile" className="col-form-label">
                      Destination Address:
                    </label>
                    <input
                      id="uploadFile"
                      list="brow"
                      multiple={true}
                      className="form-control"
                      placeholder="Select Your Destination "
                      style={{
                        width: "-webkit-fill-available",
                        textAlign: "start",
                        boxShadow: "2px 3px 3px 1px #00000059",
                        outline: "none",
                        border: "none",
                      }}
                      required
                      value={destination_address}
                      onChange={(e) => {
                        setdestination_address(e.target.value);
                      }}
                    />
                    <datalist id="brow">
                      <option>EDESH</option>
                      <option>K&R Express Delivery</option>
                    </datalist>
                  </div>

                  <div className="upload-drag-area w-100 m-auto">
                    <div className="drag-area position-relative">
                      <div className="icon">
                        {/* <i className="fas fa-cloud-upload-alt"></i> */}
                        <MdOutlineUploadFile />
                      </div>
                      {file_name ? (
                        <h6> Chosen file : {file_name}</h6>
                      ) : (
                        <h6>{error}</h6>
                      )}
                      <header>Drag & Drop to Upload File</header>
                      <span>OR</span>
                      <button>Choose File</button>
                      <input
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          // display: "contents",
                          opacity: 0,
                        }}
                        type="file"
                        name="fields[]"
                        onChange={(e) => {
                          uploadFile(e);
                        }}
                      />
                    </div>
                  </div>
                  <div className="d-flex mt-4">
                    <button
                      className="btn btn-success px-4 fw-bold btn-sm m-auto"
                      onClick={csv_upload_filebutton_function}
                    >
                      Upload File
                    </button>
                  </div>
                </div>
                <div className="col-lg-6 col-md-8 col-12 m-auto">
                  {/* <div>
                    <label htmlFor="daraz-csv"></label>
                    <input type="text" id="daraz-csv" onChange={handleChange} />
                  </div> */}
                  <GetDarazCsv />
                </div>
              </div>
            </div>

            {payload ? (
              <Uploadcsvfile response={information} />
            ) : (
              ""
              // <h4 className="text-center">Please Upload Your CSV File</h4>
            )}
          </div>
        </div>
        <div className="">
          <div className="col-12">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};
export default Upload;
