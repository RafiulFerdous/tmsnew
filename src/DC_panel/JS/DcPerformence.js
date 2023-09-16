import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from '../../Common/Navbar';
import Sidebar from '../../Common/Sidebar';
import Search from '../../Common/Search';
import Footer from '../../Common/Footer';
import Assigntofetable from '../../Model/Dcpanel/Assigntofetable';
// import '../css/all.css';
import axios from 'axios';
import { BrowserRouter, Switch, Route, useHistory, useLocation, Link } from 'react-router-dom';
import { LoginContext } from '../../Context/loginContext';
import { SearchContext } from '../../Context/searchContext';
import { SearchButtonContext } from '../../Context/buttonContext';
import { Linksidebar, CustomerCareLinksidebar, Salessidebar, Operationsidebar, Degital_Ocean_flag, company_name, dcpanel,superadminsidebar } from '../../Common/Linksidebar';
import { CSVLink, CSVDownload } from 'react-csv';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
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
    Customer: "Client"
}
let getCurrentTime = ()=>{
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    if(hours < 10)
        hours = "0"+hours;
    let minutes = date_ob.getMinutes();
    if(minutes < 10)
        minutes = "0"+minutes;
    let seconds = date_ob.getSeconds();
    if(seconds < 10)
        seconds = "0"+seconds;
    let milisecond = date_ob.getMilliseconds();
    if(milisecond < 10)
        milisecond = "0"+milisecond;
    let date_time = year + "-" + month + "-" + date + "T" + hours + ":" + minutes + ":" + seconds +"." + milisecond;
    return date_time;
}

export default function DcPerformence() {

    const [startdate, setstartdate] = useState("");
    const [enddate, setenddate] = useState("");
    const [submitflag, setsubmitflag] = useState(false);
    const [employId, setemployId] = useState("");
    const [information, setinformation] = useState("");
    const [payload, setpayload] = useState(false);
    const [productlist,setproductlist]=useState([])

    var { loginInformation, setloginInformation } = useContext(LoginContext);

    const [logingInformation_LocalStore, setlogingInformation_LocalStore] = useState(loginInformation);
    const [siteBarInformation_LocalStore, setsiteBarInformation_LocalStore] = useState([]);

    let setLogin_Sidebar_LocalStore = (current_value_login_context, sidebar_context) => {
        localStorage.setItem("logingInformation_LocalStore", JSON.stringify(current_value_login_context));
    }

    let getLogingInformation_LocalStore = () => {
        let value = JSON.parse(localStorage.getItem("logingInformation_LocalStore"));
        return value;
    }

    useEffect(() => {
        let final_sideBar = null;
        let context_flag_obj = null;
        context_flag_obj = getLogingInformation_LocalStore();

        if (context_flag_obj == undefined) {
            if (loginInformation.all_user_list.employeE_DEGIGNATION == employee_degignation_list.SuperAdmin) {
                setsiteBarInformation_LocalStore(superadminsidebar);//useState a set kore rakhlam.
                final_sideBar = superadminsidebar;
            }
            else if (loginInformation.all_user_list.employeE_DEGIGNATION == employee_degignation_list.DistrictIncharge) {
                setsiteBarInformation_LocalStore(dcpanel);//useState a set kore rakhlam
                final_sideBar = dcpanel;
            }
            setemployId(loginInformation.all_user_list.employeE_ID);
            setLogin_Sidebar_LocalStore(loginInformation, final_sideBar);//local store a set kore rakhlam.
            setlogingInformation_LocalStore(loginInformation);//useState a set kore rakhlam.
        }
        else {
            if (context_flag_obj.all_user_list.employeE_DEGIGNATION == employee_degignation_list.SuperAdmin) {
                setsiteBarInformation_LocalStore(superadminsidebar);//useState a set kore rakhlam.
                final_sideBar = superadminsidebar;
            }
            else if (context_flag_obj.all_user_list.employeE_DEGIGNATION == employee_degignation_list.DistrictIncharge) {
                setsiteBarInformation_LocalStore(dcpanel);//useState a set kore rakhlam
            }
            setemployId(context_flag_obj.all_user_list.employeE_ID);
            setlogingInformation_LocalStore(context_flag_obj);
        }

    }, []);


    useEffect(()=>{
        console.log(siteBarInformation_LocalStore);
        let data = JSON.stringify({

            "employee_id":logingInformation_LocalStore.all_user_list.employeE_ID,
            "employee_degination" :logingInformation_LocalStore.all_user_list.employeE_DEGIGNATION,
            "begining_date":startdate,
            "ending_date": enddate
        });
        console.log("this is dc_id",data)

        var config = {
            method: 'post',
            url: Degital_Ocean_flag ? 'https://e-deshdelivery.com/universalapi/allapi/performanceReportdcandfe'+'?company_name='+company_name : '/universalapi/allapi/performanceReportdcandfe'+'?company_name='+company_name,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${logingInformation_LocalStore.token}`
            },
            data:data
        };

        axios(config)
            .then(function (response) {
                let json_object_str = JSON.stringify(response.data);
                let json_object = JSON.parse(json_object_str);
                return(json_object);
            })
            .then(res => {
                console.log("response is date wise product",res);
                setinformation(res.message);
                setpayload(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    },[submitflag]);
    useEffect(()=>{
        if(information==="")return;
        let temp=[]
        information.day_collection.map(item=>{
            if(item.product_information!=null){
                console.log("single",item.product_information)
                item.product_information.map(single=>{
                    temp.push(single)
                })
            }
        })
        setproductlist(temp)
        console.log("product ",temp)

    },[information])
    const search = ()=>{
        setsubmitflag(!submitflag)
    }
    return (
        <>
            <div className="bodydiv">
                <div className="row">
                    <div className="col-12">
                        <Navbar sidebar_manu={siteBarInformation_LocalStore} />
                    </div>
                </div>
                {/* <div className="row">
              <div className="col-12">
               <Sidebar sidebar_manu={siteBarInformation_LocalStore}/>
              </div>
              </div> */}

                {/* <div className="row container">
                        <div className="col-6 " id="srchmenu">
                                <Search/>
                        </div>
                   </div> */}
                <div className="row container">
                    <div className="col-12 d-flex" id="mainmenu">


                        <div className="container row-col-2">

                            {/* search option */}

                            <div className="border  mb-5">
                                <form className="row d-flex justify-content-center">

                                    <div className=" col-sm-4 form-group mx-3 mt-4">
                                        <div className=" text-center text-black m-2">
                                            Start Date: <input type="date" className="input-small "
                                                               id="startdate" value={startdate}
                                                               onChange={(e) => {
                                                                   setstartdate(e.target.value)
                                                               }} />
                                        </div>
                                    </div>
                                    <div className=" col-sm-4 form-group mx-3 mt-4">
                                        <div className="text-center text-black m-2">
                                            End Date: <input type="date" className="input-small" id="enddate"
                                                             value={enddate} onChange={(e) => {
                                            setenddate(e.target.value)
                                        }} />
                                        </div>
                                    </div>
                                    <div className="col-md-12 d-flex justify-content-center mt-4 mb-2">
                                        <button type="button" className="btn btn-outline-primary"
                                                onClick={search}>Search
                                        </button>
                                        {/* onClick={searchFilter} */}
                                    </div>
                                </form>
                            </div>

                            <div id="requesttable">
                                <div>
                                    {/* <CSVLink data={information &&information.day_collection}
                                                     className="btn btn-sm bg-info text-black border-info mb-2">Download
                                                csv</CSVLink> */}
                                    <ReactHTMLTableToExcel
                                        className="js-download-link button bg-info border border-info px-4 btn-sm mb-2 mx-2 text-white rounded-pill"
                                        table="performance"
                                        filename="ReportExcel"
                                        sheet="Sheet"
                                        buttonText="Performance Csv"
                                    />
                                    <CSVLink data={productlist &&productlist}
                                             filename={`DCProductPerformance${getCurrentTime()}.csv`}
                                             className="btn btn-sm bg-info mx-2 text-black border-info mb-2">Product Report
                                        csv</CSVLink>

                                    <table className="table table-hover" id="performance">

                                        <thead className="bg-dark">
                                        <tr className="text-white">

                                            <th scope="col">Date</th>
                                            <th>Dispatched</th>
                                            <th>Delivered</th>
                                            <th scope="col">Performance %</th>

                                        </tr>

                                        </thead>

                                        <tbody>
                                        {
                                            information&&information.day_collection.map(single_message => {
                                                if(single_message.total_dispatch !=0){



                                                    return (
                                                        <tr key={single_message.working_date}
                                                            className="bg-success text-white">

                                                            {/* className="btn btn-outline-primary text-white"*/}
                                                            <td scope="row"

                                                            >{single_message.working_date}</td>
                                                            <td>
                                                                {single_message.total_dispatch}
                                                            </td>
                                                            <td>
                                                                {single_message.total_delevered}
                                                            </td>
                                                            <td>{single_message.date_performance}</td>



                                                        </tr>
                                                    )
                                                }
                                            })

                                        }

                                        </tbody>

                                    </table>

                                </div>
                                <h4>Performance Summary</h4>
                                <div>
                                    <ReactHTMLTableToExcel
                                        className="js-download-link button bg-info border border-info px-4 btn-sm mb-2 mx-2 text-white rounded-pill"
                                        table="datatable"
                                        filename="ReportExcel"
                                        sheet="Sheet"
                                        buttonText="Export excel"
                                    />

                                    <table className="table table-hover" id="datatable">

                                        <thead className="bg-dark">
                                        <tr className="text-white">

                                            <th scope="col">Name</th>
                                            <th>Total COD</th>
                                            <th>Dispatched</th>
                                            <th>Delivered</th>
                                            <th>Holded</th>
                                            <th>Returned</th>
                                            <th>Lost</th>
                                            <th scope="col">Performance %</th>

                                        </tr>

                                        </thead>

                                        <tbody>
                                        {
                                            information&&

                                            <tr key={information.employee_name}
                                                className="bg-success text-white">

                                                {/* className="btn btn-outline-primary text-white"*/}
                                                <td scope="row"

                                                >{information.employee_name}</td>
                                                <td scope="row"

                                                >{information.total_collected_cod}</td>
                                                <td scope="row"

                                                >{information.total_dispatch}</td>
                                                <td>
                                                    {information.total_deleved_product}
                                                </td>
                                                <td>
                                                    {information.total_holded_product}
                                                </td>
                                                <td>
                                                    {information.total_returned_product}
                                                </td>
                                                <td>
                                                    {information.total_lost_product}
                                                </td>
                                                <td>{information.total_performance}</td>


                                            </tr>




                                        }

                                        </tbody>

                                    </table>

                                </div>
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
    )
}
