import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
import Hometable from "../../Model/Processingcenter/Hometable";
import "../css/all.css";
import { toast } from "react-toastify";
import axios from "axios";
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
  superadminsidebar,
  acsidebar,
  Hrsidebar,
  dcpanel,
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
  Customer: "Client",
};

let employId, setemployId;
let date_time, setdate_time;

const Change = () => {
  toast.configure();
  let history = useHistory();

  const [information, setinformation] = useState({});
  const [payload, setpayload] = useState(false);

  const [id, setid] = useState("");
  const [userid, setuserid] = useState("");
  const [password, setpassword] = useState("");
  const [address, setaddress] = useState("");
  const [contact, setcontact] = useState("");
  const [emcontact, setemcontact] = useState("");
  const [email, setemail] = useState("");

  [employId, setemployId] = useState("");
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

  // useEffect(() => {
  //   let final_sideBar = null;
  //   let context_flag_obj = null;
  //   context_flag_obj = getLogingInformation_LocalStore();

  //   if (context_flag_obj == undefined) {
  //     if (loginInformation.all_user_list.employeE_DEGIGNATION == employee_degignation_list.ProcessingCenter) {
  //       setsiteBarInformation_LocalStore(Linksidebar);//useState a set kore rakhlam.
  //       final_sideBar = Linksidebar;
  //     }
  //     else if (loginInformation.all_user_list.employeE_DEGIGNATION == employee_degignation_list.DistrictIncharge) {
  //       setsiteBarInformation_LocalStore(CustomerCareLinksidebar);//useState a set kore rakhlam
  //       final_sideBar = CustomerCareLinksidebar;
  //     }

  //     setLogin_Sidebar_LocalStore(loginInformation, final_sideBar);//local store a set kore rakhlam.
  //     setlogingInformation_LocalStore(loginInformation);//useState a set kore rakhlam.
  //   }
  //   else {
  //     if (context_flag_obj.all_user_list.employeE_DEGIGNATION == employee_degignation_list.ProcessingCenter) {
  //       setsiteBarInformation_LocalStore(Linksidebar);//useState a set kore rakhlam.
  //     }
  //     else if (context_flag_obj.all_user_list.employeE_DEGIGNATION == employee_degignation_list.DistrictIncharge) {
  //       setsiteBarInformation_LocalStore(CustomerCareLinksidebar);//useState a set kore rakhlam
  //     }

  //   }

  // }, []);

  useEffect(() => {
    let final_sideBar = null;
    let context_flag_obj = null;
    context_flag_obj = getLogingInformation_LocalStore();

    if (context_flag_obj == undefined) {
      if (loginInformation.user_type == "Employee") {
        if (
          loginInformation.all_user_list.employeE_DEGIGNATION ==
          employee_degignation_list.Operation
        ) {
          setsiteBarInformation_LocalStore(Operationsidebar); //useState a set kore rakhlam.
        } else if (
          loginInformation.all_user_list.employeE_DEGIGNATION ==
          employee_degignation_list.DistrictIncharge
        ) {
          setsiteBarInformation_LocalStore(dcpanel); //useState a set kore rakhlam
        } else if (
          loginInformation.all_user_list.employeE_DEGIGNATION ==
          employee_degignation_list.ProcessingCenter
        ) {
          setsiteBarInformation_LocalStore(Linksidebar); //useState a set kore rakhlam
        } else if (
          loginInformation.all_user_list.employeE_DEGIGNATION ==
          employee_degignation_list.Finance
        ) {
          setsiteBarInformation_LocalStore(acsidebar); //useState a set kore rakhlam
        } else if (
          loginInformation.all_user_list.employeE_DEGIGNATION ==
          employee_degignation_list.CustomerCare
        ) {
          setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam
        } else if (
          loginInformation.all_user_list.employeE_DEGIGNATION ==
          employee_degignation_list.Admin
        ) {
          setsiteBarInformation_LocalStore(Hrsidebar); //useState a set kore rakhlam
        } else if (
          loginInformation.all_user_list.employeE_DEGIGNATION ==
          employee_degignation_list.Marketing_executive
        ) {
          setsiteBarInformation_LocalStore(Salessidebar); //useState a set kore rakhlam
        } else if (
          loginInformation.all_user_list.employeE_DEGIGNATION ==
          employee_degignation_list.SuperAdmin
        ) {
          setsiteBarInformation_LocalStore(superadminsidebar); //useState a set kore rakhlam
        }
      } else {
        // setsiteBarInformation_LocalStore(CustomerCareLinksidebar);
      }

      // setlogingInformation_LocalStore(loginInformation);
      // setemployId(loginInformation.all_user_list.employeE_ID);
      // setlogingInformation_LocalStore(loginInformation);

      setlogingInformation_LocalStore(loginInformation);
      try {
        setid(loginInformation.all_user_list.employeE_ID);
        setuserid(loginInformation.all_user_list.employeE_USER_ID);
        setpassword(loginInformation.all_user_list.employeE_PASSWORD);
        setaddress(loginInformation.all_user_list.employeE_ADDRESS);
        setcontact(loginInformation.all_user_list.employeE_CONTACT);
        setemcontact(loginInformation.all_user_list.employeE_EMERGENCY_CONTACT);
        setemail(loginInformation.all_user_list.employeE_EMAIL);
      } catch (error) {
        toast.success("You don't have access to settings", {
          position: "top-right",
          autoClose: 2500,
        });
        //history.push("/HomeC");
        history.push("/Waybilltrackingsales");
      }

      console.log("value set up else : ", loginInformation);

      //useState a set kore rakhlam.
      setLogin_Sidebar_LocalStore(loginInformation, final_sideBar); //local store a set kore rakhlam.
      // setemployId(loginInformation.all_user_list.employeE_ID);
      setlogingInformation_LocalStore(loginInformation); //useState a set kore rakhlam.
      console.log(
        "value set up if: ",
        loginInformation.all_user_list.employeE_ID
      );
    } else {
      if (context_flag_obj.user_type == "Employee") {
        if (
          context_flag_obj.all_user_list.employeE_DEGIGNATION ==
          employee_degignation_list.Operation
        ) {
          setsiteBarInformation_LocalStore(Operationsidebar); //useState a set kore rakhlam.
        } else if (
          context_flag_obj.all_user_list.employeE_DEGIGNATION ==
          employee_degignation_list.DistrictIncharge
        ) {
          setsiteBarInformation_LocalStore(dcpanel); //useState a set kore rakhlam
        } else if (
          context_flag_obj.all_user_list.employeE_DEGIGNATION ==
          employee_degignation_list.ProcessingCenter
        ) {
          setsiteBarInformation_LocalStore(Linksidebar); //useState a set kore rakhlam
        } else if (
          context_flag_obj.all_user_list.employeE_DEGIGNATION ==
          employee_degignation_list.Finance
        ) {
          setsiteBarInformation_LocalStore(acsidebar); //useState a set kore rakhlam
        } else if (
          context_flag_obj.all_user_list.employeE_DEGIGNATION ==
          employee_degignation_list.CustomerCare
        ) {
          setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam
        } else if (
          context_flag_obj.all_user_list.employeE_DEGIGNATION ==
          employee_degignation_list.Admin
        ) {
          setsiteBarInformation_LocalStore(Hrsidebar); //useState a set kore rakhlam
        } else if (
          context_flag_obj.all_user_list.employeE_DEGIGNATION ==
          employee_degignation_list.Marketing_executive
        ) {
          setsiteBarInformation_LocalStore(Salessidebar); //useState a set kore rakhlam
        } else if (
          context_flag_obj.all_user_list.employeE_DEGIGNATION ==
          employee_degignation_list.SuperAdmin
        ) {
          setsiteBarInformation_LocalStore(superadminsidebar); //useState a set kore rakhlam
        }
      } else {
        // setsiteBarInformation_LocalStore(CustomerCareLinksidebar);
      }

      // setlogingInformation_LocalStore(context_flag_obj);
      // setemployId(context_flag_obj.all_user_list.employeE_ID);
      // setlogingInformation_LocalStore(context_flag_obj);

      setlogingInformation_LocalStore(context_flag_obj);
      try {
        setid(context_flag_obj.all_user_list.employeE_ID);
        setuserid(context_flag_obj.all_user_list.employeE_USER_ID);
        setpassword(context_flag_obj.all_user_list.employeE_PASSWORD);
        setaddress(context_flag_obj.all_user_list.employeE_ADDRESS);
        setcontact(context_flag_obj.all_user_list.employeE_CONTACT);
        setemcontact(context_flag_obj.all_user_list.employeE_EMERGENCY_CONTACT);
        setemail(context_flag_obj.all_user_list.employeE_EMAIL);
      } catch (error) {
        toast.success("You don't have access to settings", {
          position: "top-right",
          autoClose: 2500,
        });
        history.push("/HomeC");
        history.push("/Waybilltrackingsales");
      }

      console.log("value set up else : ", context_flag_obj);
    }
  }, []);

  // setlogingInformation_LocalStore(context_flag_obj);
  // setid(context_flag_obj.all_user_list.employeE_ID);
  // setuserid(context_flag_obj.all_user_list.employeE_USER_ID);
  // setpassword(context_flag_obj.all_user_list.employeE_PASSWORD)
  // setaddress(context_flag_obj.all_user_list.employeE_ADDRESS)
  // setcontact(context_flag_obj.all_user_list.employeE_CONTACT)
  // setemcontact(context_flag_obj.all_user_list.employeE_EMERGENCY_CONTACT)
  // setemail(context_flag_obj.all_user_list.employeE_EMAIL)

  console.log("id", id);
  console.log("userid", userid);

  const submit = (e) => {
    e.preventDefault();
    var axios = require("axios");

    var data = JSON.stringify({
      EMPLOYEE_ID: parseInt(id),

      EMPLOYEE_USER_ID: userid,

      EMPLOYEE_PASSWORD: password,
      EMPLOYEE_ADDRESS: address,
      EMPLOYEE_CONTACT: contact,
      EMPLOYEE_EMERGENCY_CONTACT: emcontact,
      EMPLOYEE_EMAIL: email,
    });

    console.log("this is data : ", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/loginRegistration/change_username_and_password" +
          "?company_name=" +
          company_name
        : "loginRegistration/change_username_and_password" +
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
        console.log("new update res", res);

        if (res.data.status === "Successful Request.") {
          console.log("toast call");
          toast.success("Information Updated", {
            position: "top-right",
            autoClose: 2500,
          });
          history.push("/");
        }
      })
      .catch(function (error) {
        toast.error("Something Went Wrong!", {
          position: "top-right",
          autoClose: 2500,
        });
        console.log(error.config);
      });
  };

  return (
    <>
      <div className="">
        <div className="row">
          <div className="col-12 ">
            <Navbar sidebar_manu={siteBarInformation_LocalStore} />
          </div>
        </div>
        {/* <div className="row ">
          <div className="col-12">
     
          
            <Sidebar sidebar_manu={siteBarInformation_LocalStore} />
            
          </div>
          
        </div> */}

        {/* <a href="#" data-bs-target="#sidebar" data-bs-toggle="collapse" className="border rounded-3 p-1 text-decoration-none desktop"> menumenu</a> */}

        {/* <div className="row container-fluid">
                            <div className="col-6 " id="srchmenu">
                                    <Search/>
                            </div>
                       </div>
                    */}

        {/* <div className="container">

          <div className="border mt-5 mb-5">

             <form className="mt-5" >

             <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">EMPLOYEE ID</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={id}></input>
             
              </div>

              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">EMPLOYEE USER ID</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={userid} onChange={(e) => { setuserid(e.target.value) }}></input>
               
              </div>

              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input type="text" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => { setpassword(e.target.value) }}></input>
                <div id="emailHelp" className="form-text">We'll never share your password with anyone else.</div>
              </div>


              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">EMPLOYEE_ADDRESS</label>
                <input type="text" className="form-control" id="exampleInputPassword1"  value={address}  onChange={(e) => { setaddress(e.target.value) }}></input>
              </div>


              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">EMPLOYEE_CONTACT</label>
                <input type="text" className="form-control" id="exampleInputPassword1" value={contact}  onChange={(e) => { setcontact(e.target.value) }}></input>
              </div>


              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">EMPLOYEE_EMERGENCY_CONTACT</label>
                <input type="text" className="form-control" id="exampleInputPassword1"  value={emcontact}  onChange={(e) => { setemcontact(e.target.value) }}></input>
              </div>



              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email}  onChange={(e) => { setemail(e.target.value) }}></input>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>


            
              
             
              <button type="submit" className="btn btn-primary" onClick={submit}>Submit</button>
            </form>  







          </div>




        </div> */}

        {/* new form */}

        <div className="mt-5 pt-5 container">
          <div className="col-12 pt-5" id="">
            {/* id="bgcrt" */}

            <div className="border rounded-3 border-primary d p-3">
              <h3 className="text-center">Info Update</h3>
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
                        value={id}
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-2">
                    <label htmlFor className="col-sm-3 col-form-label">
                      EMPLOYEE USER ID :{" "}
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Employee Name"
                        value={userid}
                        onChange={(e) => {
                          setuserid(e.target.value);
                        }}
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
                        placeholder="User ID"
                        value={password}
                        onChange={(e) => {
                          setpassword(e.target.value);
                        }}
                      />
                      <div id="emailHelp" className="form-text">
                        We'll never share your password with anyone else.
                      </div>
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
                        value={address}
                        onChange={(e) => {
                          setaddress(e.target.value);
                        }}
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
                        value={contact}
                        onChange={(e) => {
                          setcontact(e.target.value);
                        }}
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
                        value={emcontact}
                        onChange={(e) => {
                          setemcontact(e.target.value);
                        }}
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
                        value={email}
                        onChange={(e) => {
                          setemail(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 d-flex justify-content-center text-align-center">
                      <button
                        className="btn btn-primary  mb-3 "
                        onClick={submit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* new form end */}

        <div></div>

        <div className="row">
          <div className="col-12">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Change;
