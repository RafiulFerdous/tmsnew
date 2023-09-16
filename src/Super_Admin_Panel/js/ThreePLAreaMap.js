import React from "react";
import {
  CustomerCareLinksidebar,
  Linksidebar,
  superadminsidebar,
} from "../../Common/Linksidebar";
import { useContext } from "react";
import { LoginContext } from "../../Context/loginContext";
import { useState } from "react";
import { useEffect } from "react";
import { employee_degignation_list } from "./Accountadmin";
import { Navbar } from "../../indexImport";
import Footer from "../../Common/Footer";

const ThreePLAreaMap = () => {
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

  return (
    <div className="bodydiv">
      {" "}
      <div className="row">
        <div className="col-12 ">
          <Navbar sidebar_manu={siteBarInformation_LocalStore} />
        </div>
      </div>
      {/* <div className="content">
        <div className="container-fluid">
          <div className="row mt-4">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <h3>Location Add</h3>
                    <hr style={{ color: "black" }} />
                    <div className="col-lg-12">
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-3">
                              <label for="simpleinput"> Name</label>
                              <input
                                type="text"
                                id="simpleinput"
                                className="form-control "
                                style={{ background: "gainsboro" }}
                                name="name"
                                required
                                placeholder="name"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
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

                        <div style={{ textAlign: "center" }}>
                          <button
                            type="submit"
                            className="btn btn-primary waves-effect waves-light "
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
      </div> */}
      <div className="">
        <div className="col-12">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ThreePLAreaMap;
