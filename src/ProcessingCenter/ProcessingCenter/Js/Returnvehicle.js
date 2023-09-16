import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
import "../css/all.css";
import { toast } from "react-toastify";
//import Vehicle1 from '../../Model/Processingcenter/vehicle';
import Returnvehicle1 from "../../Model/Processingcenter/Returnvehicle1";
import { LoginContext } from "../../Context/loginContext";
import {
  Linksidebar,
  CustomerCareLinksidebar,
  Salessidebar,
  Operationsidebar,
  Degital_Ocean_flag,
  company_name,
} from "../../Common/Linksidebar";

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

let vehicle_information_refreshFlag, setvehicle_information_refreshFlag;
let vehicle_namePlate, setvehicle_namePlate;
let bag_waybill_list, setbag_waybill_list;
let bag_seal_list, setbag_seal_list;
let destination_address, setdestination_address;
let employee_id, setemployee_id;
let date_time, setdate_time;
let vehicleCreationFlag, setvehicleCreationFlag;
let vehicleCreatedAt, setvehicleCreatedAt;
let vehicleDriverName, setvehicleDriverName;
let vehicleDriverContact, setvehicleDriverContact;

let vehicleCreationSubmitButtonFunction;

const Returnvehicle = () => {
  toast.configure();
  [destination_address, setdestination_address] = useState("");
  [bag_seal_list, setbag_seal_list] = useState("");
  [bag_waybill_list, setbag_waybill_list] = useState("");
  [vehicle_namePlate, setvehicle_namePlate] = useState("");
  [vehicle_information_refreshFlag, setvehicle_information_refreshFlag] =
    useState("");
  [employee_id, setemployee_id] = useState(0);
  [date_time, setdate_time] = useState(null);
  [vehicleCreationFlag, setvehicleCreationFlag] = useState(false);
  [vehicleCreatedAt, setvehicleCreatedAt] = useState("");
  [vehicleDriverContact, setvehicleDriverContact] = useState("");
  [vehicleDriverName, setvehicleDriverName] = useState("");

  const [showText, setShowText] = useState(true);
  const onClick = () => setShowText((showText) => !showText);
  //const [information, setinformation] = useState({});
  const [information, setinformation] = useState(null);
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

      setemployee_id(loginInformation.all_user_list.employeE_ID);
      setdate_time(getCurrentTime);
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
        setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam
      }
      setlogingInformation_LocalStore(context_flag_obj);

      setemployee_id(context_flag_obj.all_user_list.employeE_ID);
      setdate_time(getCurrentTime);
    }
  }, []);

  //new code start here for setting infromation...........
  useEffect(() => {
    if (information != undefined) {
      for (let i = 0; i < information.message.all_vehicles.length; i++) {
        if (
          information.message.all_vehicles[i].vehicalE_NAMEPLATE ==
          vehicle_namePlate
        ) {
          setvehicleDriverName(information.message.all_vehicles[i].driveR_NAME);
          setvehicleDriverContact(
            information.message.all_vehicles[i].driveR_CONTACT_NUMBER
          );
          setvehicleCreatedAt(
            information.message.all_vehicles[i].vehiclE_STARTS_AT
          );
          break;
        } else {
          setvehicleDriverName("");
          setvehicleDriverContact("");
          setvehicleCreatedAt("");
        }
      }
    }
  }, [vehicle_namePlate]);
  //   //new code end here for ................................

  useEffect(() => {
    var axios = require("axios");
    var data = JSON.stringify({
      employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
    });

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/vehicle_information" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/vehicle_information" +
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
        setinformation(res);
        setpayload(true);
      })
      .catch(function (error) {
        console.log("This is", error);
      });
  }, [logingInformation_LocalStore, vehicle_information_refreshFlag]);

  //eitoko code change hobe...............

  vehicleCreationSubmitButtonFunction = (e) => {
    e.preventDefault();
    var axios = require("axios");
    var data = JSON.stringify({
      employee_id: employee_id,
      bag_waybill_number: bag_waybill_list,
      bag_seal_number_list: vehicle_namePlate,
      vehicle_number: vehicle_namePlate,
      date_time: date_time,
      destination_address: destination_address,
    });

    console.log("bag inside vehicle : ", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/insertBagInVehicle" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/insertBagInVehicle" +
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
        console.log(JSON.stringify(response.data));

        setvehicle_information_refreshFlag(
          (vehicle_information_refreshFlag) => !vehicle_information_refreshFlag
        );
        toast.success("SuccessFully Vehicle Created!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
      })
      .catch(function (error) {
        console.log("this is", error);
        toast.error("Something Wrong!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1800,
        });
      });

    setvehicleCreationFlag((vehicleCreationFlag) => !vehicleCreationFlag);
  };
  //   useEffect(()=>{

  //   },[vehicleCreationFlag])

  //ei toko code change hobe..................
  // const [selectedFlavors, setSelectedFlavors] = useState([]);

  // const handleSelect = function(selectedItems) {
  //     const flavors = [];
  //     for (let i=0; i<selectedItems.length; i++) {
  //         flavors.push(selectedItems[i].value);
  //     }
  //     setSelectedFlavors(flavors);
  // }

  return (
    <>
      <div className="bodydiv">
        <div className="row">
          <div className="col-12">
            <Navbar sidebar_manu={siteBarInformation_LocalStore} />
          </div>
        </div>
        {/* <div className="row">
                            <div className="col-12">
                              <Sidebar sidebar_manu={siteBarInformation_LocalStore}/>
                            </div>
                      </div> */}

        {/* <div className="row container">
                            <div className="col-6 " id="srchmenu">
                                <Search/>
                            </div>
                      </div> */}

        <div className="row container">
          <div className="col-12" id="vh">
            <div className="mss1">
              <div className=" border rounded truck1">
                <h1 className="col-md-12 d-flex justify-content-center text-white">
                  Vehicle Creation
                </h1>
                <p className="col-md-12 d-flex justify-content-center text-white font-weight-bold">
                  Please Choose Your Vehicle
                </p>
                <div className="mb-2">
                  <button
                    className=" bg-primary border-primary btn-lg own text-white"
                    onClick={onClick}
                  >
                    OWN
                  </button>
                  <button
                    className="mx-5 bg-success border-success btn-lg text-white"
                    onClick={onClick}
                  >
                    3-PL
                  </button>
                </div>
                <div></div>
              </div>
            </div>
            {showText ? <Text /> : <Text2 />}

            {payload ? (
              <Returnvehicle1 response={information} />
            ) : (
              <div className="sk-cube-grid">
                <div className="sk-cube sk-cube1"></div>
                <div className="sk-cube sk-cube2"></div>
                <div className="sk-cube sk-cube3"></div>
                <div className="sk-cube sk-cube4"></div>
                <div className="sk-cube sk-cube5"></div>
                <div className="sk-cube sk-cube6"></div>
                <div className="sk-cube sk-cube7"></div>
                <div className="sk-cube sk-cube8"></div>
                <div className="sk-cube sk-cube9"></div>
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};
const Text = () => {
  return (
    <div className="mt-5">
      <div className="border border-primary d">
        <h3 className="text-center"> Own Vehicle Creation</h3>
        <div className="container p-3">
          <form>
            <div className="form-group row mb-2">
              <label htmlFor className="col-sm-3 col-form-label">
                Vehicle Number:
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  required
                  value={vehicle_namePlate}
                  onChange={(e) => {
                    setvehicle_namePlate(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="form-group row mb-2">
              <label htmlFor className="col-sm-3 col-form-label">
                Destination Address:
              </label>
              <div className="col-sm-6">
                <input
                  list="brow"
                  multiple={true}
                  className="form-control"
                  id="bgscrl"
                  placeholder="Select Your Destination "
                  required
                  value={destination_address}
                  onChange={(e) => {
                    setdestination_address(e.target.value);
                  }}
                />
                <datalist id="brow">
                  <option>Uttara-DC</option>
                  <option>Banani-DC</option>
                  <option>Jatrabari-DC</option>
                  <option>Mirpur-DC</option>
                  <option>Mohamadpur-DC</option>

                  {/* <option>Bagerhat</option>
                                                            <option>Bandarban</option>
                                                            <option>Barguna</option>
                                                            <option>Barisal</option>
                                                            <option>Bhola</option>
                                                            <option>Bogra</option>
                                                            <option>Brahmanbaria</option>
                                                            <option>Chandpur</option>
                                                            <option>Chittagong</option>
                                                            <option>Chuadanga</option>
                                                            <option>Comilla</option>
                                                            <option>Cox's Bazar</option>
                                                            <option>Dhaka</option>
                                                            <option>Dinajpur</option>
                                                            <option>Faridpur</option>
                                                            <option>Feni</option>
                                                            <option>Gaibanda</option>
                                                            <option>Gazipur</option>
                                                            <option>Gopalgonj</option>
                                                            <option>Habiganj</option>
                                                            <option>Jaipurhat</option>
                                                            <option>Jamalpur</option>
                                                            <option>Jessore</option>
                                                            <option>Jhalakati</option>
                                                            <option>Jhenaidha</option>
                                                            <option>Khagrachari</option>
                                                            <option>Khulna</option>
                                                            <option>Kishoreganj</option>
                                                            <option>Kurigram</option>
                                                            <option>Khushtia</option>
                                                            <option>Lakshmipur</option>
                                                            <option>Lalmonirhat</option>
                                                            <option>Madaripur</option>
                                                            <option>Magura</option>
                                                            <option>Manikganj</option>
                                                            <option>Meherpur</option>
                                                            <option>Moulivibazar</option>
                                                            <option>Munshiganj</option>
                                                            <option>Mymenshing</option>
                                                            <option>Naogaon</option>
                                                            <option>Narail</option>
                                                            <option>Narayanganj</option>
                                                            <option>Narsingdi</option>
                                                            <option>Natore</option>
                                                            <option>Nawabgonj</option>
                                                            <option>Netrokona</option>
                                                            <option>Nilphamari</option>
                                                            <option>Noakhali</option>
                                                            <option>Pabna</option>
                                                            <option>Panchagarh</option>
                                                            <option>Parbatty Chattagram</option>
                                                            <option>Patuakhali</option>
                                                            <option>Pirojpur</option>
                                                            <option>Rajbari</option>
                                                            <option>Rajshahi</option>
                                                            <option>Rangpur</option>
                                                            <option>Rangamati</option>
                                                            <option>Satkira</option>
                                                            <option>Shariatpur</option>
                                                            <option>Sherpur</option>
                                                            <option>Sirajgonj</option>
                                                            <option>Sunamganj</option>
                                                            <option>Sylhet</option>
                                                            <option>Tangail</option>
                                                            <option>Thakurgaon</option> */}
                </datalist>
                {/* <Multiselect
                                                            isObject={false}
                                                            onRemove={function noRefCheck(){}}
                                                            onSearch={function noRefCheck(){}}
                                                            onSelect={function noRefCheck(){}}
                                                            options={[
                                                                'Banani',
                                                                'Gazipur',
                                                                'Narsigndi',
                                                                'Option 4',
                                                                'Option 5'
                                                            ]}
                                                            /> */}
              </div>
            </div>
            <div className="form-group row mb-2">
              <label htmlFor className="col-sm-3 col-form-label">
                Creation Address:
              </label>
              <div className="col-sm-6">
                <p className="border border-light bg-light">
                  {vehicleCreatedAt}
                </p>
              </div>
            </div>

            <div className="form-group row mb-2">
              <label htmlFor className="col-sm-3 col-form-label">
                Driver Name:{" "}
              </label>
              <div className="col-sm-6">
                <p className="border border-light bg-light">
                  {vehicleDriverName}
                </p>
              </div>
            </div>
            <div className="form-group row mb-2">
              <label htmlFor className="col-sm-3 col-form-label">
                Driver Contact Number:{" "}
              </label>
              <div className="col-sm-6">
                <p className="border border-light bg-light">
                  {vehicleDriverContact}
                </p>
              </div>
            </div>
            <div className="form-group row mb-2">
              <label htmlFor className="col-sm-3 col-form-label">
                Bag Waybill Number:{" "}
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  required
                  value={bag_waybill_list}
                  onChange={(e) => {
                    setbag_waybill_list(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="form-group row mb-2">
              <label htmlFor className="col-sm-3 col-form-label">
                Bag Seal Number:{" "}
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  required
                  value={bag_seal_list}
                  onChange={(e) => {
                    setbag_seal_list(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="form-group row mb-2">
              <label htmlFor className="col-sm-3 col-form-label">
                Bag Create Employe ID:
              </label>
              <div className="col-sm-6">
                <p className="border border-light bg-light">{employee_id}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-12 d-flex justify-content-center text-align-center">
                <button
                  className="btn btn-primary  mb-3 "
                  onClick={vehicleCreationSubmitButtonFunction}
                  disabled={
                    !bag_seal_list ||
                    !bag_waybill_list ||
                    !destination_address ||
                    !vehicle_namePlate
                  }
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Text2 = () => (
  <div className="mt-5">
    <div className="border border-primary d">
      <h3 className="text-center">3-PL Vehicle Creation</h3>
      <div className="container p-3">
        <form>
          <div className="form-group row mb-2">
            <label htmlFor className="col-sm-3 col-form-label">
              {" "}
              Vehicle Creation Address:
            </label>
            <div className="col-sm-6">
              <p className="border border-light bg-light">Tongi-PC</p>
            </div>
          </div>
          <div className="form-group row mb-2">
            <label htmlFor className="col-sm-3 col-form-label">
              Company Name:
            </label>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                placeholder=""
                required
              />
            </div>
          </div>
          <div className="form-group row mb-2">
            <label htmlFor className="col-sm-3 col-form-label">
              Booking Number:
            </label>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                placeholder=""
                required
              />
            </div>
          </div>
          <div className="form-group row mb-2">
            <label htmlFor className="col-sm-3 col-form-label">
              Destination Address:
            </label>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                placeholder=""
                required
              />
            </div>
          </div>
          <div className="form-group row mb-2">
            <label htmlFor className="col-sm-3 col-form-label">
              Bag Waybill Number:{" "}
            </label>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                placeholder=""
                required
              />
            </div>
          </div>
          <div className="form-group row mb-2">
            <label htmlFor className="col-sm-3 col-form-label">
              Bag Seal Number:{" "}
            </label>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                placeholder=""
                required
              />
            </div>
          </div>
          <div className="form-group row mb-2">
            <label htmlFor className="col-sm-3 col-form-label">
              Bag Create Employe ID:
            </label>
            <div className="col-sm-6">
              <p className="border border-light bg-light">101</p>
            </div>
          </div>
          <div className="row">
            <div className="col-12 d-flex justify-content-center text-align-center">
              <button
                className="btn btn-primary  mb-3 "
                onClick={vehicleCreationSubmitButtonFunction}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
);
export default Returnvehicle;
