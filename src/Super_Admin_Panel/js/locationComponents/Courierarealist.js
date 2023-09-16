import React, { useEffect, useState } from "react";
// import { Degital_Ocean_flag } from "../../../Common/Linksidebar";
import { useContext } from "react";
import Footer from "../../../Common/Footer";
import {
  CustomerCareLinksidebar,
  Degital_Ocean_flag,
  Linksidebar,
  superadminsidebar,
} from "../../../Common/Linksidebar";
import { Navbar } from "../../../Common/Navbar";
import { LoginContext } from "../../../Context/loginContext";
import axios from "axios";
import { Input } from "antd";
import Table from "ant-responsive-table";
import Loader from "../../../Loader";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
import { updateIndex } from "../../../utils/indexFunction";
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
const { confirm } = Modal;
const Courierarealist = ({ state }) => {
  const [getAllLocation, setGetAllLocation] = useState([]);
  const [hitapi, sethitapi] = useState(false);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure delete this Location?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        // call delete api
        console.log("OK", id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

 

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
         console.log("getall carea", res);
        setGetAllLocation(res?.data?.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  }, [state,hitapi]);
  console.log("get all hub",getAllLocation)

  function submit(e,id1,status1){
    let id=id1;
    let status=status1;

    let data = JSON.stringify({
      HubId: id,
      HubName:"",      // LocationTypeId: parseInt(area),
     
      UpdatedById: logingInformation_LocalStore?.all_user_list?.employeE_ID,
       IsActive: status===true?false:true,
      // AreaType: parseInt(locationType),
    });

    console.log("data for hub update", data);

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/api/v1.1/Hub/UpdateHub"
        : "http://test.e-deshdelivery.com/api/v1.1/Hub/UpdateHub",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response);
        sethitapi(!hitapi)
        // toast.success(response?.message);
       
        // setState(!state);
      })
      .catch((error) => {
        // console.log("error", error?.response?.data?.message);
        //toast.error(error?.response?.data?.message);
      });
    e.preventDefault();


  }

  // filter functionality
 

  // console.log(dataSource);
  return (
    <div className="bodydiv">
      {" "}
      <div className="row">
        <div className="col-12 ">
          <Navbar sidebar_manu={siteBarInformation_LocalStore} />
        </div>
      </div>
      <div className="content">
        <div className="container-fluid ">
          <div className="bg-gray-100 w-full ">
            <div className="flex justify-between mt-5">
              <div className="card-body bg-white border rounded pb-0 mb-0">
                <div className="d-flex justify-content-between">
                  <h3 className="">Courier Area List</h3>
                  <div>
                    <Input
                      width="100%"
                      placeholder="Search Area Name"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>
                </div>
                <hr style={{ color: "black" }} />
              </div>
              {/* <input
            className="pl-3 placeholder:text-xs placeholder:text-gray-400 rounded outline-none border-none"
            type="text"
            placeholder="Search order ID"
          /> */}
            </div>
            {/* <div className="my-8 bg-white h-fit p-5 rounded-md">
          <div className="my-5 flex justify-between">
            <input
              className="pl-3 placeholder:text-xs placeholder:text-gray-500 bg-gray-200 w-72 rounded outline-none border-none"
              type="text"
              placeholder="Search..."
            />
            <div className="flex gap-4 w-80">
              <div className="rounded bg-gray-200 text-gray-500 flex-grow pr-3">
                <select
                  className=" form-select outline-none border-none w-full h-full px-4 py-3 rounded bg-gray-200 text-gray-500 flex-grow "
                  name=""
                  id=""
                >
                  <option value="Status" className="">
                    Status
                  </option>
                  <option value="Active">Active</option>
                  <option value="Disable">Disable</option>
                  <option value="Show all">Show all</option>
                </select>
              </div>
              <div className="rounded bg-gray-200 text-gray-500 flex-grow pr-3">
                <select
                  className=" form-select outline-none border-none w-full h-full px-4 py-3 rounded bg-gray-200 text-gray-500 flex-grow "
                  name=""
                  id=""
                >
                  <option value="Show 20" className="">
                    Show 20
                  </option>
                  <option value="Show 30">Show 30</option>
                  <option value="Show 40">Show 40</option>
                </select>
              </div>
            </div>
          </div>
          <hr className="" />
          <div> <Table columns={columns} dataSource={data} /> </div>
        </div> */}
            <div>

            <table
                            className="col-md-12 table-bordered table-striped table-condensed cf bg-white"
                            style={{ fontSize: "12px" }}
                        >
                            <thead
                                className="text-center"
                                style={{ backgroundColor: "#f1f1f1" }}
                            >
                            <tr className="text-dark" style={{ border: "none" }}>
                                
                                <th scope="col">CArea Name</th>
                                <th scope="col">City Name</th>
                                <th scope="col">Zone Name</th>
                                
                                
                            </tr>
                            </thead>
                            <tbody className="text-center">
                            {getAllLocation?.map((single_message) => {
                                // console.log(single_message);
                                return (
                                    <tr
                                        /*onClick={()=>bag_row_clicked_function(single_message.baG_ID_NUMBER)}*/
                                    >
                                        
                                        <td data-title="">
                                            {single_message.courierAreaName}
                                        </td>

                                        <td data-title="">
                                            {single_message.courierCityName}
                                        </td>

                                        <td data-title="">
                                            {single_message.courierZoneName}
                                        </td>
                                        
                                       
                                       
                                    </tr>
                                );
                            })}
                            </tbody>
                            
                        </table>
              {/* {isLoading ? (
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
              )} */}
            </div>
          </div>
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

export default Courierarealist;
