import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Footer from "../../Common/Footer";
import {
  CustomerCareLinksidebar,
  Degital_Ocean_flag,
  Linksidebar,
  superadminsidebar,
} from "../../Common/Linksidebar";
import { Navbar } from "../../Common/Navbar";
import { LoginContext } from "../../Context/loginContext";
import AreaType from "./locationComponents/AreaType";
import Country from "./locationComponents/Country";
import Division from "./locationComponents/Division";
import District from "./locationComponents/District";
import Thana from "./locationComponents/Thana";
import { toast } from "react-toastify";
import LocationType from "./locationComponents/LocationType";
import LocationList from "./locationComponents/LocationList";

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

const Hubadd = () => {
  toast.configure();
  const [inputText, setInputText] = useState("");
  const [area, setArea] = useState("");
  const [country, setCountry] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [thana, setThana] = useState("");
  const [locationType, setLocationType] = useState(0);
  const [state, setState] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

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

    if (context_flag_obj === undefined) {
      if (
        loginInformation.all_user_list.employeE_DEGIGNATION ===
        employee_degignation_list.ProcessingCenter
      ) {
        setsiteBarInformation_LocalStore(Linksidebar); //useState a set kore rakhlam.
        final_sideBar = Linksidebar;
      } else if (
        loginInformation.all_user_list.employeE_DEGIGNATION ===
        employee_degignation_list.DistrictIncharge
      ) {
        setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam
        final_sideBar = CustomerCareLinksidebar;
      }

      setLogin_Sidebar_LocalStore(loginInformation, final_sideBar); //local store a set kore rakhlam.
      setlogingInformation_LocalStore(loginInformation); //useState a set kore rakhlam.
    } else {
      if (
        context_flag_obj.all_user_list.employeE_DEGIGNATION ===
        employee_degignation_list.ProcessingCenter
      ) {
        setsiteBarInformation_LocalStore(Linksidebar); //useState a set kore rakhlam.
      } else if (
        context_flag_obj.all_user_list.employeE_DEGIGNATION ===
        employee_degignation_list.SuperAdmin
      ) {
        setsiteBarInformation_LocalStore(superadminsidebar); //useState a set kore rakhlam
      }
      setlogingInformation_LocalStore(context_flag_obj);
    }
  }, []);
  const resetInput = () => {
    setThana("");
    setDistrict("");
    setDivision("");
    setCountry("");
    setArea("");
    setInputText("");
  };

  const handleSubmit = (e) => {
    let data = JSON.stringify({
      HubName: inputText,
      // LocationTypeId: parseInt(area),
      LocationId:
        area == 1
          ? 0
          : area == 2
          ? parseInt(country)
          : area == 3
          ? parseInt(district)
          : area == 4
          ? parseInt(thana)
          : area == 5
          ? parseInt(thana)
          : null,
      CreatedById: logingInformation_LocalStore?.all_user_list?.employeE_ID,
      UpdatedById: logingInformation_LocalStore?.all_user_list?.employeE_ID,
      // IsActive: 1,
      // AreaType: parseInt(locationType),
    });

    console.log("data for hub add", data);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/api/v1.1/Hub/AddHub"
        : "http://test.e-deshdelivery.com/api/v1.1/Hub/AddHub",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response));
        //toast.success(response?.data?.message);
        resetInput();
        // setState(!state);
      })
      .catch((error) => {
        // console.log("error", error?.response?.data?.message);
        //toast.error(error?.response?.data?.message);
      });
    e.preventDefault();
  };

 



  console.log("see input text", inputText);

  return (
    <div className="bodydiv">
      {" "}
      <div className="row">
        <div className="col-12 ">
          <Navbar sidebar_manu={siteBarInformation_LocalStore} />
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          <div className="row mt-4">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <h3>Hubb Add</h3>
                    <hr style={{ color: "black" }} />
                    <div className="col-lg-12">
                      <form>
                        <div className="row">
                          <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-3">
                              <label for="simpleinput"> Name</label>
                              <input
                                //type="text"
                                // id="simpleinput"
                                className="form-control "
                                style={{ background: "gainsboro" }}
                                name="name"
                                required
                                placeholder="name"
                                // value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                // onChange={(e) => inputText(e.target.value)}
                              />
                            </div>
                          </div>

                          <AreaType setArea={setArea} area={area} />

                          {area === "2" && (
                            <Country
                              country={country}
                              setCountry={setCountry}
                            />
                          )}
                          {area === "3" && (
                            <>
                              <Country
                                country={country}
                                setCountry={setCountry}
                              />
                              <Division
                                division={division}
                                setDivision={setDivision}
                                country={country}
                              />
                              <District
                                district={district.text}
                                setDistrict={setDistrict}
                                division={division}
                              />
                            </>
                          )}
                          {area === "4" && (
                            <>
                              <Country
                                country={country}
                                setCountry={setCountry}
                              />
                              <Division
                                division={division}
                                setDivision={setDivision}
                                country={country}
                              />
                              <District
                                district={district}
                                setDistrict={setDistrict}
                                division={division}
                              />
                              <Thana
                                thana={thana.text}
                                setThana={setThana}
                                district={district}
                              />
                            </>
                          )}
                          {area === "5" && (
                            <>
                              <Country
                                country={country}
                                setCountry={setCountry}
                              />
                              <Division
                                division={division}
                                setDivision={setDivision}
                                country={country}
                              />
                              <District
                                district={district}
                                setDistrict={setDistrict}
                                division={division}
                              />
                              <Thana
                                thana={thana}
                                setThana={setThana}
                                district={district}
                              />
                              <LocationType setLocationType={setLocationType} />
                            </>
                          )}
                        </div>

                        <div>
                          {error && <p style={{ color: "red" }}>{error}</p>}
                        </div>

                        <div style={{ textAlign: "center" }}>
                          <button
                            type="submit"
                            className="btn btn-primary waves-effect waves-light "
                            // disabled={isSubmitDisabled}
                            onClick={handleSubmit}
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <LocationList state={state} /> */}
      <div className="">
        <div className="col-12">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Hubadd;
