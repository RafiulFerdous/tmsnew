import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./operation.css";
import { SearchContext } from "../../Context/searchContext";
import { SearchButtonContext } from "../../Context/buttonContext";
import { Pie, Line, Bar } from "react-chartjs-2";
import "./bar.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { LoginContext } from "../../Context/loginContext";
import { CSVLink, CSVDownload } from "react-csv";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Modal from "react-modal";
import {
  Linksidebar,
  CustomerCareLinksidebar,
  Salessidebar,
  Operationsidebar,
  Degital_Ocean_flag,
  company_name,
} from "../../Common/Linksidebar";

import { toast } from "react-toastify";
import { orange } from "@material-ui/core/colors";

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

let employId, setemployId;
let date_time, setdate_time;
Modal.setAppElement("#root");
export default function DashboardOps(props) {
  const [returnlen, setreturnlen] = useState([]);
  const [unlen, setunlen] = useState([]);
  const [holdlen, setholdlen] = useState([]);
  const [lostlen, setlostlen] = useState([]);
  const [deliverylen, setdeliverylen] = useState([]);
  const [waybill, setwaybill] = useState([]);
  let json_information = props.response;
  const state = {
    labels: [
      "Total Delivery",
      "Total Lost or Damage",
      "Total Hold",
      "Total Return",
      "Total Unattempted",
    ],
    datasets: [
      {
        label: "Volume",
        backgroundColor: [
          "#2FDE00",
          "#B21F00",
          "#C9DE00",
          "#FFA500",
          "#4287f5",
        ],
        hoverBackgroundColor: [
          "#501800",
          "#4B5000",
          "#175000",
          "#FFA500",
          "#9942f5",
        ],
        data: [
          deliverylen.length,
          lostlen.length,
          holdlen.length,
          returnlen.length,
          unlen.length,
        ],
      },
    ],
  };
  const linechartdata = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul"],
    datasets: [
      {
        label: "",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [1500000, 3900000, 3000000, 4100000, 2300000, 1800000, 2000000],
      },
    ],
  };
  useEffect(() => {
    setreturnlen(json_information.message.returned_product_information);
    setunlen(json_information.message.unattempted_product_information);
    setholdlen(json_information.message.holded_product_information);
    setlostlen(json_information.message.lost_product_information);
    setdeliverylen(json_information.message.delevered_product_information);
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-md-2 col-sm-12  mx-2 card bg-primary p-2"
            id="dashboard-card"
          >
            <div className="card-body">
              <h5 className="card-title">Total Unattempted</h5>
              <p className="card-title">{unlen.length}</p>
            </div>
          </div>
          <div
            className="col-md-2 col-sm-12 mx-2 card bg-success p-2"
            id="dashboard-card"
          >
            <div className="card-body">
              <h5 className="card-title">Total Delivered</h5>
              <p className="card-title">{deliverylen.length}</p>
            </div>
          </div>
          <div
            className="col-md-2 col-sm-12 mx-2 card bg-danger p-2"
            id="dashboard-card"
          >
            <div className="card-body">
              <h5 className="card-title">Total Lost</h5>
              <p className="card-title">{lostlen.length}</p>
            </div>
          </div>
          <div
            className="col-md-2 col-sm-12  mx-2  card bg-purple p-2"
            id="dashboard-card"
          >
            <div className="card-body">
              <h5 className="card-title">Total Hold</h5>
              <p className="card-title">{holdlen.length}</p>
            </div>
          </div>
          <div
            className="col-md-2 col-sm-12 mx-2 card bg-orange p-2"
            id="dashboard-card"
          >
            <div className="card-body">
              <h5 className="card-title">Total Return</h5>
              <h5 className="card-title">{returnlen.length}</h5>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="  col-md-6 col-sm-12 my-4 p-2 ">
            <div className="border">
              <p className="">
                <u>Pie Chart</u>
              </p>
              <Pie
                data={state}
                options={{
                  title: {
                    display: true,
                    text: "Product Statement",
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                  },
                }}
              />
            </div>
          </div>
          <div className=" col-md-6 col-sm-12 my-4 p-2 ">
            <div className="border h-100">
              <p>
                <u>Line Chart</u>
              </p>
              <Line
                data={state}
                options={{
                  title: {
                    display: true,
                    text: "Product Statement",
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                  },
                }}
              />
            </div>
          </div>
        </div>
        <div className="row">
          {/* <div className=" col-md-6 col-sm-12 my-4 border ">
                <Line 
                    data={state}
                    options={{
                        title: {
                            display: true,
                            text: 'Product Statement',
                            fontSize: 20
                        },
                        legend: {
                            display: true

                        }
                    }}
                />
            </div> */}
        </div>
        <div className="row">
          <div className=" col-md-6 col-sm-12 my-4 border ">
            <p>
              <u>Bar Chart</u>
            </p>
            <Bar
              data={linechartdata}
              options={{
                title: {
                  display: true,
                  text: "Product Statement",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
