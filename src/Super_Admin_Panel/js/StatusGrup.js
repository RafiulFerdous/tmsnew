import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Footer from "../../Common/Footer";

import {
  CustomerCareLinksidebar,
  Degital_Ocean_flag,
  Hrsidebar,
  Linksidebar,
  superadminsidebar,
} from "../../Common/Linksidebar";
import { LoginContext } from "../../Context/loginContext";
import { Navbar } from "../../indexImport";
import { employee_degignation_list } from "./Accountadmin";
import Loader from "../../Loader";
import StatusTable from "./StatusTable";

const StatusGrup = () => {
  const [statusGroup, setStatusGroup] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reFetch, setReFetch] = useState(false);
  const { loginInformation, setloginInformation } = useContext(LoginContext);

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

  useEffect(() => {
    setLoading(true);
    const config = {
      method: "get",
      url: Degital_Ocean_flag
        ? "http://test.e-deshdelivery.com:8080/api/StatusGroup/GetAllStatusGroup"
        : "http://test.e-deshdelivery.com:8080/api/StatusGroup/GetAllStatusGroup",
    };

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        return json_object;
      })
      .then((res) => {
        setLoading(false);
        setStatusGroup(res?.model);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  }, [reFetch]);

  return (
    <div className="bodydiv">
      <div className="row">
        <div className="col-12 bg-dark">
          <Navbar sidebar_manu={siteBarInformation_LocalStore} />
        </div>
      </div>
      <div className="container mt-5 pt-5">
        {loading ? (
          <Loader />
        ) : (
          // <div id="no-more-tables">
          //   <table
          //     className="table bg-white"
          //     style={{ fontSize: "13px", marginLeft: "1px" }}
          //   >
          //     <thead
          //       className="text-center shadow sticky-top "
          //       style={{ backgroundColor: "#b4bec2", top: "60px", zIndex: "0" }}
          //     >
          //       <tr className="text-dark" style={{ border: "none" }}>
          //         <th>Group ID</th>
          //         <th>reportStatusGroup</th>
          //         <th>fulfillmentStatusGroup</th>
          //         <th>orderTrackStatusGroup</th>
          //         <th>orderTrackStatusPublicGroup</th>
          //         <th>dashboardStatusGroup</th>
          //         <th>Action</th>
          //       </tr>
          //     </thead>

          //     <tbody className="text-center border border-dark">
          //       {statusGroup.map((e) => {
          //         return (
          //           <tr key={e.statusGroupId}>
          //             <td data-title="Group ID">{e.statusGroupId}</td>
          //             <td data-title="reportStatusGroup">
          //               {e.reportStatusGroup}
          //             </td>
          //             <td data-title="fulfillmentStatusGroup">
          //               {e.fulfillmentStatusGroup}
          //             </td>
          //             <td data-title="orderTrackStatusGroup">
          //               {e.orderTrackStatusGroup}
          //             </td>
          //             <td data-title="orderTrackStatusPublicGroup">
          //               {e.orderTrackStatusPublicGroup}
          //             </td>
          //             <td data-title="dashboardStatusGroup">
          //               {e.dashboardStatusGroup}
          //             </td>
          //             <td data-title="Action" style={{ minWidth: "200px" }}>
          //               <div className="d-flex justify-content-around">
          //                 <button
          //                   className="btn btn-info btn-sm px-3 fs-6 "
          //                   onClick={() => handleEdit(e)}
          //                 >
          //                   Edit
          //                   <span className="ps-2">
          //                     <BiEdit />
          //                   </span>
          //                 </button>
          //                 <button
          //                   className="btn btn-danger btn-sm px-3 fs-6 fw-light"
          //                   onClick={() => openModal(e)}
          //                 >
          //                   Delete{" "}
          //                   <span className="ps-2">
          //                     <RiDeleteBin6Line />
          //                   </span>
          //                 </button>
          //               </div>
          //             </td>
          //           </tr>
          //         );
          //       })}
          //     </tbody>
          //   </table>
          //   <button
          //     className="btn btn-sm btn-success px-5"
          //     onClick={addNewModal}
          //   >
          //     ADD NEW
          //     <span className="ps-2 fs-6">
          //       <MdOutlineAddCircleOutline />
          //     </span>
          //   </button>
          // </div>

          <StatusTable
            data={statusGroup}
            setReFetch={setReFetch}
            reFetch={reFetch}
          />
        )}
      </div>

      <div className="">
        <div className="col-12">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default StatusGrup;
