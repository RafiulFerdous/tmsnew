import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
import {
  Linksidebar,
  CustomerCareLinksidebar,
  Salessidebar,
  Operationsidebar,
  Hrsidebar,
  Degital_Ocean_flag,
  company_name,
} from "../../Common/Linksidebar";
import { LoginContext } from "../../Context/loginContext";
import axios from "axios";

export let employee_degignation_list = {
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

const Employeereg = () => {
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
      if (
        loginInformation.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.Admin
      ) {
        setsiteBarInformation_LocalStore(Hrsidebar); //useState a set kore rakhlam.
        final_sideBar = Hrsidebar;
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
        employee_degignation_list.Admin
      ) {
        setsiteBarInformation_LocalStore(Hrsidebar); //useState a set kore rakhlam.
      } else if (
        context_flag_obj.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.DistrictIncharge
      ) {
        setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam
      }
      setlogingInformation_LocalStore(context_flag_obj);
    }
  }, []);

  return (
    <>
      <div className="bodydiv">
        <div className="row">
          <div className="col-12 bg-dark">
            <Navbar sidebar_manu={siteBarInformation_LocalStore} />
          </div>
        </div>
        {/* <div className="row">
              <div className="col-12">
                   <Sidebar sidebar_manu={siteBarInformation_LocalStore}/>
              </div>
            </div> */}

        <div className="row container">
          <div className="col-12" id="bgcrt">
            <div className="border border-primary d">
              <h3 className="text-center">Employee Registration</h3>
              <div className="container p-3">
                <form className>
                  <div className="form-group row mb-2">
                    <label htmlFor className="col-sm-3 col-form-label">
                      Employee ID :{" "}
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Employee ID"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label htmlFor className="col-sm-3 col-form-label">
                      Employee Name :{" "}
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Employee Name"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label htmlFor className="col-sm-3 col-form-label">
                      User ID :{" "}
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="User ID"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label htmlFor className="col-sm-3 col-form-label">
                      Password :{" "}
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Password"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label htmlFor className="col-sm-3 col-form-label">
                      Employee Address :{" "}
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Employee Address"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label htmlFor className="col-sm-3 col-form-label">
                      Employee Zone :{" "}
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Employee Zone"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label htmlFor className="col-sm-3 col-form-label">
                      Employee Designation:{" "}
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Employee Designation"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label htmlFor className="col-sm-3 col-form-label">
                      Employee Contact:{" "}
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Employee Contact"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label htmlFor className="col-sm-3 col-form-label">
                      Employee Emergency Contact:{" "}
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Employee Emergency Contact"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label htmlFor className="col-sm-3 col-form-label">
                      Employee Email:{" "}
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Employee Email"
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 d-flex justify-content-center text-align-center">
                      <button className="btn btn-primary  mb-3 ">Submit</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
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
export default Employeereg;
