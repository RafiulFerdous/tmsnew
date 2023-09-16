import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Footer from "../../Common/Footer";
import "../css/all.css";
import { toast } from "react-toastify";
import axios from "axios";

import { LoginContext } from "../../Context/loginContext";
import {
  Linksidebar,
  CustomerCareLinksidebar,
  Degital_Ocean_flag,
  company_name,
  superadminsidebar,
} from "../../Common/Linksidebar";
import Loader from "../../Loader";
import { getCurrentTime } from "../../Common/common";
import { Input, Table } from "antd";
// import Table from "ant-responsive-table";
import { CSVLink } from "react-csv";
import { employee_degignation_list } from "./Accountadmin";
import { updateIndex } from "../../utils/indexFunction";

const Employeeactive = () => {
  toast.configure();
  const [information, setinformation] = useState([]);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmployeeChangeLoading, setIsEmployeeChangeLoading] = useState(false);

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

  useEffect(() => {
    setIsLoading(true);
    // console.log(logingInformation_LocalStore);
    if (!logingInformation_LocalStore.token) return;
    var data = JSON.stringify({
      employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
    });
    // console.log("data", data);
    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/allEmployee_information" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/allEmployee_information" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: data,
    };
    // console.log("config", config);

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        return json_object;
      })
      .then((res) => {
        // console.log("response is all employee list ", res);
        setinformation(res.message.all_employee_information);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  }, [logingInformation_LocalStore]);

  const employeeChange = (empid, activestatus) => {
    setIsEmployeeChangeLoading(true);
    var data = JSON.stringify({
      employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
      all_information: [
        {
          employee_id: empid,
          active_status: activestatus === "Active" ? "InActive" : "Active",
        },
      ],
    });
    // console.log("data", data);
    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/updateEmployee_active_or_inactive" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/updateEmployee_active_or_inactive" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: data,
    };
    // console.log("config", config);

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        return json_object;
      })
      .then((res) => {
        // console.log("response is all employee list after api hit ", res);
        setinformation(res.message.all_employee_information);
        toast.success("Successfully Status Change");
        setIsEmployeeChangeLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsEmployeeChangeLoading(false);
      });
  };

  const columns = [
    {
      render: (record) => (
        <div className="row">
          <div className="col-6">
            <p className="border-bottom border-secondary">#ID :</p>
            <p className="border-bottom border-secondary">Employee Name : </p>
            <p className="border-bottom border-secondary">Address : </p>
            <p className="border-bottom border-secondary">Contact : </p>
            <p className="border-bottom border-secondary">User ID : </p>
            <p className="border-bottom border-secondary">Password :</p>
            <p className="border-bottom border-secondary">Designation :</p>
            <p className="border-bottom border-secondary">Zone :</p>
            <p className="border-bottom border-secondary">Active/InActive :</p>
          </div>
          <div className="col-6 text-start ">
            <p className="border-bottom border-secondary">
              {record.employeE_ID}
            </p>
            <p className="border-bottom border-secondary">
              {record.employeE_NAME}
            </p>
            <p className="border-bottom border-secondary">
              {record.employeE_ADDRESS}
            </p>
            <p className="border-bottom border-secondary">
              {record.employeE_CONTACT}
            </p>
            <p className="border-bottom border-secondary">
              {record.employeE_USER_ID}
            </p>
            <p className="border-bottom border-secondary">
              {record.employeE_PASSWORD}
            </p>
            <p className="border-bottom border-secondary">
              {record.employeE_DEGIGNATION}
            </p>
            <p className="border-bottom border-secondary">
              {record.employeE_ZONE}
            </p>

            <button
              className={`btn btn-sm ${
                record.employeE_ACTIVE_INACTIVE === "Active"
                  ? "btn-success"
                  : "btn-danger"
              }`}
              onClick={() => {
                employeeChange(
                  record?.employeE_ID,
                  record?.employeE_ACTIVE_INACTIVE
                );
                console.log(record);
              }}
            >
              {record.employeE_ACTIVE_INACTIVE}
            </button>
          </div>
        </div>
      ),
      responsive: ["xs"],
    },
    {
      title: "#ID",
      dataIndex: "employeE_ID",
      key: "employeE_ID",
      responsive: ["sm"],
      // showOnResponse: true,
      // showOnDesktop: true,
    },
    {
      title: "Name",
      dataIndex: "employeE_NAME",
      key: "employeE_NAME",
      responsive: ["sm"],
      // showOnResponse: true,
      // showOnDesktop: true,
    },
    {
      title: "Address",
      dataIndex: "employeE_ADDRESS",
      key: "employeE_ADDRESS",
      responsive: ["sm"],
      // showOnResponse: true,
      // showOnDesktop: true,
    },
    {
      title: "Contact",
      dataIndex: "employeE_CONTACT",
      key: "employeE_CONTACT",
      responsive: ["sm"],
      // showOnResponse: true,
      // showOnDesktop: true,
    },
    {
      title: "User ID",
      dataIndex: "employeE_USER_ID",
      key: "employeE_USER_ID",
      responsive: ["sm"],
      // showOnResponse: true,
      // showOnDesktop: true,
    },
    {
      title: "Password",
      dataIndex: "employeE_PASSWORD",
      key: "employeE_PASSWORD",
      responsive: ["sm"],
      // showOnResponse: true,
      // showOnDesktop: true,
    },
    {
      title: "Designation",
      dataIndex: "employeE_DEGIGNATION",
      key: "employeE_DEGIGNATION",
      responsive: ["sm"],
      // showOnResponse: true,
      // showOnDesktop: true,
    },
    {
      title: "ZONE",
      dataIndex: "employeE_ZONE",
      key: "employeE_ZONE",
      responsive: ["sm"],
      // showOnResponse: true,
      // showOnDesktop: true,
    },
    {
      title: "Active/InActive",
      key: "employeE_ACTIVE_INACTIVE",
      dataIndex: "employeE_ACTIVE_INACTIVE",
      responsive: ["sm"],
      render: (e, r) => {
        // console.log(r, r?.employeE_ID, "eee", e);

        return (
          <button
            className={`btn btn-sm ${
              r.employeE_ACTIVE_INACTIVE === "Active"
                ? "btn-success"
                : "btn-danger"
            }`}
            onClick={() => {
              employeeChange(r?.employeE_ID, r?.employeE_ACTIVE_INACTIVE);
              console.log(r);
            }}
          >
            {/* {r?.employeE_ACTIVE_INACTIVE} */}
            {e}
          </button>
        );
      },
    },
    // {
    //   title: "Active/InActive",
    //   key: `"employeE_ACTIVE_INACTIVE"${updateIndex()}`,
    //   render: (e, r) => {
    //     return (
    //       <button
    //         disabled={
    //           isEmployeeChangeLoading || e.employeE_ACTIVE_INACTIVE === null
    //         }
    //         className={`btn btn-sm
    //         ${
    //           r === undefined
    //             ? e === "Active"
    //               ? "btn-success"
    //               : "btn-danger"
    //             : e?.employeE_ACTIVE_INACTIVE === "Active"
    //             ? "btn-success"
    //             : "btn-danger"
    //         } `}
    //         onClick={() => {
    //           // console.log("edit", e, r);
    //           employeeChange(r?.employeE_ID, r?.employeE_ACTIVE_INACTIVE);
    //         }}
    //       >
    //         {e.employeE_ACTIVE_INACTIVE === null
    //           ? "null"
    //           : e.employeE_ACTIVE_INACTIVE}
    //       </button>
    //     );
    //   },

    //   showOnResponse: true,
    //   showOnDesktop: true,
    // },
  ];

  const dataSource = information?.filter((entry) =>
    entry?.employeE_NAME?.toLowerCase().includes(value?.toLowerCase())
  );
  // console.log(dataSource);

  return (
    <>
      <div className="bodydiv">
        <div className="row">
          <div className="col-12 ">
            <Navbar sidebar_manu={siteBarInformation_LocalStore} />
          </div>
        </div>
        {isLoading ? (
          <div className="mt-5 pt-5">
            <Loader />
          </div>
        ) : (
          <div className="container mt-5 pt-5">
            <div className="d-flex justify-content-between">
              <h3 className="">All Employee List</h3>
              <div className="d-flex align-items-end">
                <CSVLink
                  onClick={() => toast.success("Excel Download Successful")}
                  filename={`All Employee ${getCurrentTime()}.xls`}
                  data={information}
                  className="btn btn-success btn-sm px-4 me-2"
                >
                  Export Excel
                </CSVLink>
                <div>
                  <Input
                    width="100%"
                    placeholder="Search Name"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <hr style={{ color: "black" }} />

            <Table
              columns={columns}
              dataSource={dataSource}

              // antTableProps={{
              //   showHeader: true,
              //   columns,
              //   dataSource,
              //   pagination: true,
              // }}
              // mobileBreakPoint={768}
            />
          </div>
        )}
        <div className="">
          <div className="col-12">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};
export default Employeeactive;
