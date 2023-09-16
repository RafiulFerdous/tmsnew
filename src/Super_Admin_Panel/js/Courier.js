import React from "react";
import {
  CustomerCareLinksidebar,
  Degital_Ocean_flag,
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
import axios from "axios";
import Loader from "../../Loader";
import Table from "ant-responsive-table";
import ShowCourierById from "./courierModal/ShowCourierById";
import ShowCourierByName from "./courierModal/ShowCourierByName";

const Courier = () => {
  const [getAllCourier, setGetAllCourier] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  //   const [isModalOpen1, setIsModalOpen1] = useState(false);
  //   const [id, setId] = useState(undefined);
  //   const [courierName, setCourierName] = useState(undefined);

  const dataSource = getAllCourier;
  console.log(getAllCourier);
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

  //   const showModal = (e) => {
  //     setId(e);
  //     setIsModalOpen(true);
  //   };
  //   const showModal1 = (e) => {
  //     console.log(e);
  //     setCourierName(e);
  //     setIsModalOpen1(true);
  //   };

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
    var config = {
      method: "get",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/api/v1.1/CourierArea/AllCourierArea"
        : "http://test.e-deshdelivery.com/api/v1.1/CourierArea/AllCourierArea",
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((res) => {
        // console.log("res", res);
        setGetAllCourier(res?.data?.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const columns = [
    {
      title: "Courier Area Name",
      dataIndex: "courierAreaName",
      key: "courierAreaName",
      //   render: (e) => <span>{e?.locationName}</span>,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (e) => <span>{e?.locationName}</span>,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Courier",
      dataIndex: "courier",
      key: "courier",
      render: (e) => <span>{e?.courieR_NAME}</span>,

      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Posted By",
      dataIndex: "postedBy",
      key: "postedBy",
      render: (e) => <span>{e?.employeE_NAME}</span>,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Updated By",
      dataIndex: "updatedBy",
      key: "updatedBy",
      render: (e) => <span>{e?.employeE_NAME}</span>,
      showOnResponse: true,
      showOnDesktop: true,
    },
    // {
    //   title: "Action",
    //   dataIndex: "cAreaId",
    //   key: "cAreaId",
    //   width: 360,

    //   //   key: `a${updateIndex()}`,
    //   render: (e, r) => (
    //     <>
    //       <button
    //         className="btn btn-sm btn-outline-secondary rounded-2 "
    //         // onClick={() => console.log("edit", e, r)}
    //         onClick={() => showModal(e)}
    //       >
    //         View With ID
    //       </button>
    //       <button
    //         className="btn btn-sm btn-outline-secondary rounded-2 ms-2"
    //         // onClick={() => console.log("name", e)}
    //         onClick={() => showModal1(r?.courierAreaName)}
    //       >
    //         View With name
    //       </button>
    //     </>
    //   ),
    //   showOnResponse: true,
    //   showOnDesktop: true,
    // },
  ];
  return (
    <div className="bodydiv">
      {" "}
      <div className="row">
        <div className="col-12 ">
          <Navbar sidebar_manu={siteBarInformation_LocalStore} />
        </div>
      </div>
      <div className="container">
        <div className="mt-5 pt-5">
          {isLoading ? (
            <Loader />
          ) : (
            <Table
              antTableProps={{
                showHeader: true,
                columns,
                dataSource,
                pagination: true,
              }}
              // columns={columns}
              // dataSource={getAllLocation?.filter((entry) =>
              //   entry?.locationName?.toLowerCase().includes(value?.toLowerCase())
              // )}

              mobileBreakPoint={768}
            />
          )}

          {/* <ShowCourierById
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            id={id}
          />
          <ShowCourierByName
            name={courierName}
            isModalOpen1={isModalOpen1}
            setIsModalOpen1={setIsModalOpen1}
          /> */}
        </div>
      </div>
      <div className="">
        <div className="col-12">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Courier;
