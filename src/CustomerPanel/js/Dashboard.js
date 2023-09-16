/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import Footer from "../../Common/Footer";
import {
  CustomerCareLinksidebar,
  Linksidebar,
  company_name,
  Degital_Ocean_flag,
} from "../../Common/Linksidebar";
import axios from "axios";
import { Navbar } from "../../Common/Navbar";
import { LoginContext } from "../../Context/loginContext";
import "./Dashboard.css";
import { Doughnut } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { GiHandTruck } from "react-icons/gi";
import { BsTruck } from "react-icons/bs";
import DashboardCard from "../customerComponents/DashboardCard";
import { FaHandPaper, FaTruckMoving } from "react-icons/fa";
import { AiOutlineIssuesClose } from "react-icons/ai";
import { MdOutlineAssignmentReturn } from "react-icons/md";
import { ImSleepy } from "react-icons/im";
import { RiEBike2Line } from "react-icons/ri";
import { Skeleton } from "antd";
import { getCurrentTime } from "../../Common/common";
import { employee_degignation_list } from "../../Super_Admin_Panel/js/Accountadmin";
import CountUp from "react-countup";

const Dashboard = () => {
  const [clientId, setclientId] = useState("");
  const [date_time, setdate_time] = useState("");
  const [parcelhistory, setparcelhistory] = useState("");
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

    if (context_flag_obj == undefined) {
      if (loginInformation.user_type == employee_degignation_list.Customer) {
        setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam.
        final_sideBar = CustomerCareLinksidebar;
      } else {
        if (
          loginInformation.all_user_list.employeE_DEGIGNATION ==
          employee_degignation_list.ProcessingCenter
        ) {
          setsiteBarInformation_LocalStore(Linksidebar); //useState a set kore rakhlam.
          final_sideBar = Linksidebar;
        }
      }
      setLogin_Sidebar_LocalStore(loginInformation, final_sideBar); //local store a set kore rakhlam.
      setclientId(loginInformation.all_user_list_Client.customeR_ID);
      setdate_time(getCurrentTime);
      setlogingInformation_LocalStore(loginInformation); //useState a set kore rakhlam.
      console.log(
        "value set up if: ",
        loginInformation.all_user_list_Client.customeR_ID
      );
    } else {
      if (context_flag_obj.user_type == employee_degignation_list.Customer) {
        setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam.
      } else if (
        context_flag_obj.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.ProcessingCenter
      ) {
        setsiteBarInformation_LocalStore(Linksidebar); //useState a set kore rakhlam.
      }
      setclientId(context_flag_obj.all_user_list_Client.customeR_ID);
      setdate_time(getCurrentTime);
      setlogingInformation_LocalStore(context_flag_obj);
      console.log(
        "value set up else : ",
        context_flag_obj.all_user_list_Client.customeR_ID
      );
    }
  }, [loginInformation]);

  // customer Information from local storage

  const customerIdFromLocal = JSON.parse(
    localStorage?.getItem("logingInformation_LocalStore")
  );
  const token = JSON.parse(
    localStorage?.getItem("logingInformation_LocalStore")
  )?.token;

  useEffect(() => {
    setIsLoading(true);
    var data = JSON.stringify({
      client_id: customerIdFromLocal?.all_user_list_Client?.customeR_ID,
      date_time: getCurrentTime(),
    });
    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/Merchantdashboard" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/Merchantdashboard" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
        console.log("response is parcel history", res);
        setparcelhistory(res.message);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  }, [customerIdFromLocal?.all_user_list_Client?.customeR_ID, token]);

  const data = {
    // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        // label: "# of Votes",
        data: [
          parcelhistory.deliveryCount,
          parcelhistory.returnCount,
          parcelhistory.holdCount,
          parcelhistory.lostCount,
          parcelhistory.unattemptedCount,
          parcelhistory.inTransitCount,
          parcelhistory.outForDeliveryCount,
          parcelhistory.pickupRequestedCount,
        ],
        backgroundColor: [
          "#198754",
          "#ffc107",
          "#0dcaf0",
          "#dc3545",
          "#6c757d",
          "#212529",
          "#198754",
          "#0d6efd",
        ],

        borderWidth: 0,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Product Overview",
      },
    },
  };

  const labels = [
    "Delivered",
    "Return",
    "Product In Dc",
    "Lost",
    "in Process",
    "Intransit",
    "OutForDelivery",
    "PickupRequested",
  ];
  const lineData = {
    labels,

    datasets: [
      {
        fill: true,
        label: "Product Data",
        //data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        data: [
          parcelhistory.deliveryCount,
          parcelhistory.returnCount,
          parcelhistory.productInDcCount,
          parcelhistory.lostCount,
          parcelhistory.inProcessCount,
          parcelhistory.inTransitCount,
          parcelhistory.outForDeliveryCount,
          parcelhistory.pickupRequestedCount,
        ],

        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const path = "/individualProductList";

  console.log({ parcelhistory });
  return (
    <div>
      <div className="row">
        <div className="col-12 ">
          <Navbar sidebar_manu={siteBarInformation_LocalStore} />
        </div>
      </div>
      <div className="mt-5 p-4 pt-5 text-center">
        {/* cards */}
        <div className="row m-0 p-0 justify-content-around">
          <div className="col-lg-3 col-md-4 col-10 col-sm-6 my-2 py-2 p-2 ">
            {/* <div className="mx-2 total-card total-card-pickupRequested "> */}
            {!isLoading && parcelhistory !== "" && (
              <div className="mx-2 rounded-2 shadow-lg total-card bg-primary">
                <Link
                  to={{
                    pathname: path,
                    state: {
                      productlist: "PickupRequested",
                    },
                  }}
                >
                  {/* <h5>Total Lost</h5>
                  <p>
                    <b>{parcelhistory.lostCount}</b>
                  </p> */}
                  <DashboardCard
                    icon={<GiHandTruck />}
                    text={
                      <>
                        Pickup Requested :{" "}
                        <b>
                          <CountUp end={parcelhistory.pickupRequestedCount} />
                        </b>
                      </>
                    }
                  />
                </Link>
              </div>
            )}
            {(isLoading || parcelhistory === "") && (
              <>
                <Skeleton.Avatar active size={"large"} />
                <Skeleton.Input active size={"large"} />
              </>
            )}
          </div>
          <div className="col-lg-3 col-md-4 col-10 col-sm-6 my-2 py-2 p-2 ">
            {/* <div className="mx-2 total-card total-card-Unattempted "> */}
            {!isLoading && parcelhistory !== "" && (
              <div className="mx-2 rounded-2 shadow-lg total-card bg-secondary">
                <Link
                  to={{
                    pathname: path,
                    state: {
                      productlist: "InProcess",
                    },
                  }}
                >
                  {/* <h5>Total Lost</h5>
                  <p>
                    <b>{parcelhistory.lostCount}</b>
                  </p> */}
                  <DashboardCard
                    icon={<ImSleepy />}
                    text={
                      <>
                        Inprocess :{" "}
                        <b>
                          <CountUp end={parcelhistory.inProcessCount} />
                        </b>
                      </>
                    }
                  />
                </Link>
              </div>
            )}
            {(isLoading || parcelhistory === "") && (
              <>
                <Skeleton.Avatar active size={"large"} />
                <Skeleton.Input active size={"large"} />
              </>
            )}
          </div>
          <div className="col-lg-3 col-md-4 col-10 col-sm-6 my-2 py-2 p-2 ">
            {/* <div className="mx-2 total-card total-card-inTransit "> */}
            {!isLoading && parcelhistory !== "" && (
              <div className="mx-2 rounded-2 shadow-lg total-card bg-dark ">
                <Link
                  to={{
                    pathname: path,
                    state: {
                      productlist: "InTransit",
                    },
                  }}
                >
                  {/* <h5>Total Lost</h5>
                  <p>
                    <b>{parcelhistory.lostCount}</b>
                  </p> */}
                  <DashboardCard
                    icon={<FaTruckMoving />}
                    text={
                      <>
                        Intransit :{" "}
                        <b>
                          <CountUp end={parcelhistory.inTransitCount} />
                        </b>
                      </>
                    }
                  />
                </Link>
              </div>
            )}
            {(isLoading || parcelhistory === "") && (
              <>
                <Skeleton.Avatar active size={"large"} />
                <Skeleton.Input active size={"large"} />
              </>
            )}
          </div>

          <div className="col-lg-3 col-md-4 col-10 col-sm-6 my-2 py-2 p-2 ">
            {/* <div className="mx-2 total-card total-card-Hold "> */}
            {!isLoading && parcelhistory !== "" && (
              <div className="mx-2 rounded-2 shadow-lg total-card  bg-info">
                <Link
                  to={{
                    pathname: path,
                    state: {
                      productlist: "ProductInDc",
                    },
                  }}
                >
                  {/* <h5>Total Hold</h5>
                  <p>
                    <b>{parcelhistory.holdCount}</b>
                  </p> */}
                  <DashboardCard
                    icon={<FaHandPaper />}
                    text={
                      <>
                        Product In Dc :{" "}
                        <b>
                          <CountUp end={parcelhistory.productInDcCount} />
                        </b>
                      </>
                    }
                  />
                </Link>
              </div>
            )}
            {(isLoading || parcelhistory === "") && (
              <>
                <Skeleton.Avatar active size={"large"} />
                <Skeleton.Input active size={"large"} />
              </>
            )}
          </div>

          <div className="col-lg-3 col-md-4 col-10 col-sm-6 my-2 py-2 p-2 ">
            {/* <div className="mx-2 total-card total-card-outForDelivery "> */}
            {!isLoading && parcelhistory !== "" && (
              <div className="mx-2 rounded-2 shadow-lg total-card bg-success">
                <Link
                  to={{
                    pathname: path,
                    state: {
                      productlist: "OutForDelivery",
                    },
                  }}
                >
                  {/* <h5>Total Lost</h5>
                  <p>
                    <b>{parcelhistory.lostCount}</b>
                  </p> */}
                  <DashboardCard
                    icon={<RiEBike2Line />}
                    text={
                      <>
                        Out For Delivery :{" "}
                        <b>
                          <CountUp end={parcelhistory.outForDeliveryCount} />
                        </b>
                      </>
                    }
                  />
                </Link>
              </div>
            )}
            {(isLoading || parcelhistory === "") && (
              <>
                <Skeleton.Avatar active size={"large"} />
                <Skeleton.Input active size={"large"} />
              </>
            )}
          </div>

          <div className="col-lg-3 col-md-4 col-10 col-sm-6 my-2 p-2 p-2 ">
            {/* <div className="mx-2 total-card total-card-delivered"> */}
            {!isLoading && parcelhistory !== "" && (
              <div className="mx-2 rounded-2 shadow-lg total-card bg-success">
                <Link
                  to={{
                    pathname: path,
                    state: {
                      productlist: "Delivered",
                    },
                  }}
                >
                  {/* <h5>Total Delivered</h5>
                  <p>
                    <b>{parcelhistory.deliveryCount}</b>
                  </p> */}
                  <DashboardCard
                    icon={<BsTruck />}
                    text={
                      <>
                        Total Delivery :{" "}
                        <b>
                          <CountUp end={parcelhistory.deliveryCount} />
                        </b>
                      </>
                    }
                  />
                </Link>
              </div>
            )}
            {(isLoading || parcelhistory === "") && (
              <>
                <Skeleton.Avatar active size={"large"} />
                <Skeleton.Input active size={"large"} />
              </>
            )}
          </div>

          <div className="col-lg-3 col-md-4 col-10 col-sm-6 my-2 p-2 p-2  ">
            {/* <div className="mx-2 total-card total-card-returned "> */}
            {!isLoading && parcelhistory !== "" && (
              <div className="mx-2 rounded-2 shadow-lg total-card bg-warning ">
                <Link
                  to={{
                    pathname: path,
                    state: {
                      productlist: "Returned",
                    },
                  }}
                >
                  {/* <h5>Total Return</h5>
                  <p>
                    <b>{parcelhistory.returnCount}</b>
                  </p> */}
                  <DashboardCard
                    icon={<MdOutlineAssignmentReturn />}
                    text={
                      <>
                        Total Return :{" "}
                        <b>
                          <CountUp end={parcelhistory.returnCount} />
                        </b>
                      </>
                    }
                  />
                </Link>
              </div>
            )}
            {(isLoading || parcelhistory === "") && (
              <>
                <Skeleton.Avatar active size={"large"} />
                <Skeleton.Input active size={"large"} />
              </>
            )}
          </div>

          <div className="col-lg-3 col-md-4 col-10 col-sm-6 my-2 py-2 p-2 ">
            {/* <div className="mx-2 total-card total-card-Lost "> */}
            {!isLoading && parcelhistory !== "" && (
              <div className="mx-2 rounded-2 shadow-lg total-card bg-danger">
                <Link
                  to={{
                    pathname: path,
                    state: {
                      productlist: "Lost",
                    },
                  }}
                >
                  {/* <h5>Total Lost</h5>
                  <p>
                    <b>{parcelhistory.lostCount}</b>
                  </p> */}
                  <DashboardCard
                    icon={<AiOutlineIssuesClose />}
                    text={
                      <>
                        Total Lost :{" "}
                        <b>
                          <CountUp end={parcelhistory.lostCount} />
                        </b>
                      </>
                    }
                  />
                </Link>
              </div>
            )}
            {(isLoading || parcelhistory === "") && (
              <>
                <Skeleton.Avatar active size={"large"} />
                <Skeleton.Input active size={"large"} />
              </>
            )}
          </div>
        </div>
        {/* charts */}
        <div className="charts">
          <div className="row m-0 p-0 justify-content-around ">
            <div className="col-lg-4 col-md-4 col-10 p-2 my-5 chart-left">
              {!isLoading && parcelhistory !== "" && (
                <div className="row m-0 p-0 justify-content-between">
                  <div className="col-lg-5 col-md-5 col-10 pie-center">
                    <div className="pie-chart ">
                      <Doughnut
                        data={data}
                        plugins={[
                          {
                            id: "textCenter",
                            beforeDatasetsDraw(chart, arg, plugin) {
                              const { ctx, data } = chart;
                              ctx.font = "24px sans-serif";
                              ctx.textAlign = "center";
                              ctx.fillText(
                                `${parseInt(parcelhistory.deliveryRatio)}%`,
                                chart.getDatasetMeta(0).data[0].x,
                                chart.getDatasetMeta(0).data[0].y
                              );
                            },
                          },
                        ]}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-10">
                    <div className="box-1 rounded-3 bg-success">
                      <p className="ms-4">Delivered</p>
                    </div>
                    <div className="box-1 rounded-3 bg-warning">
                      <p className="ms-4">Return</p>
                    </div>
                    <div className="box-1 rounded-3 bg-info">
                      <p className="ms-4">ProductInDc</p>
                    </div>
                    <div className="box-1 rounded-3 bg-danger">
                      <p className="ms-4">Lost</p>
                    </div>
                    <div className="box-1 rounded-3 bg-secondary">
                      <p className="ms-4">InProcess</p>
                    </div>
                    <div className="box-1 rounded-3 bg-dark">
                      <p className="ms-4">Intransit</p>
                    </div>
                    <div className="box-1 rounded-3 bg-success">
                      <p className="ms-4">OutForDelivery</p>
                    </div>
                    <div className="box-1 rounded-3 bg-primary">
                      <p className="ms-4">PickupRequested</p>
                    </div>
                  </div>
                </div>
              )}
              <Skeleton
                active
                loading={isLoading || parcelhistory === ""}
                paragraph={{
                  rows: 5,
                }}
              />
            </div>

            <div className="col-lg-5 col-md-5 col-10 p-2 my-5 chart-right">
              <div className="lone-chart">
                <Skeleton
                  active
                  loading={isLoading || parcelhistory === ""}
                  paragraph={{
                    rows: 5,
                  }}
                />

                {!isLoading && parcelhistory !== "" && (
                  <Line options={options} data={lineData} />
                )}
              </div>
            </div>
          </div>
        </div>
        {/* border style */}
        {/* <div className="dashboard-border">
          <div className="inner-content pt-5"></div>
        </div> */}
      </div>

      <div className="">
        <div className="col-12">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
