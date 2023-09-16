import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDom from "react-dom";
//import "./operation.css";
import { SearchContext } from "../../Context/searchContext";
import { SearchButtonContext } from "../../Context/buttonContext";
import { Pie } from "react-chartjs-2";
//import "./bar.css";
import jsPDF from "jspdf";

import "jspdf-autotable";
import { LoginContext } from "../../Context/loginContext";
import { CSVLink, CSVDownload } from "react-csv";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Modal from "react-modal";
import InfiniteScroll from "react-infinite-scroll-component";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import {
    Linksidebar,
    CustomerCareLinksidebar,
    Salessidebar,
    Operationsidebar,
    Degital_Ocean_flag,
    company_name,
} from "../../Common/Linksidebar";

import { toast } from "react-toastify";
// import "./tabletd.css";
// import "./operation.css";
import { orange } from "@material-ui/core/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBriefcase,
    faCartPlus,
    faChalkboardTeacher,
    faHandHolding,
    faPeopleCarry,
    faShippingFast,
    faTruck,
} from "@fortawesome/free-solid-svg-icons";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

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

let getCurrentTime = () => {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    if (hours < 10) hours = "0" + hours;
    let minutes = date_ob.getMinutes();
    if (minutes < 10) minutes = "0" + minutes;
    let seconds = date_ob.getSeconds();
    if (seconds < 10) seconds = "0" + seconds;
    let milisecond = date_ob.getMilliseconds();
    if (milisecond < 10) milisecond = "0" + milisecond;
    let date_time =
        year +
        "-" +
        month +
        "-" +
        date +
        "T" +
        hours +
        ":" +
        minutes +
        ":" +
        seconds +
        "." +
        milisecond;
    return date_time;
};

const Employeeactivetable = (props) => {
    toast.configure();

    let json_information = props.response;

}

export  default Employeeactivetable;