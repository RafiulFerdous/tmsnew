import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Search from "../../Common/Search";
import Footer from "../../Common/Footer";
//import Assigntofetable from '../../Model/Dcpanel/Assigntofetable';
import Lostmarktable from "../../Model/Dcpanel/Lostmarktable";
// import '../css/all.css';
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
    Linksidebar,
    CustomerCareLinksidebar,
    Salessidebar,
    Operationsidebar,
    Degital_Ocean_flag,
    company_name,
    dcpanel,
    superadminsidebar,
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
//let informationflag,setinformatinflag;
const Bagserch = () => {
    const [employId, setemployId] = useState("");
    const [waybill, setwaybill] = useState("");
   const [informationflag, setinformationflag] = useState(false);
    const [information, setinformation] = useState([]);
    //const [payload, setpayload] = useState(false);

    var {loginInformation, setloginInformation} = useContext(LoginContext);

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
                employee_degignation_list.SuperAdmin
            ) {
                setsiteBarInformation_LocalStore(superadminsidebar); //useState a set kore rakhlam.
                final_sideBar = superadminsidebar;
            } else if (
                loginInformation.all_user_list.employeE_DEGIGNATION ==
                employee_degignation_list.DistrictIncharge
            ) {
                setsiteBarInformation_LocalStore(dcpanel); //useState a set kore rakhlam
                final_sideBar = dcpanel;
            }
            setemployId(loginInformation.all_user_list.employeE_ID);
            setLogin_Sidebar_LocalStore(loginInformation, final_sideBar); //local store a set kore rakhlam.
            setlogingInformation_LocalStore(loginInformation); //useState a set kore rakhlam.
        } else {
            if (
                context_flag_obj.all_user_list.employeE_DEGIGNATION ==
                employee_degignation_list.Operation
            ) {
                setsiteBarInformation_LocalStore(Operationsidebar); //useState a set kore rakhlam.
                final_sideBar = Operationsidebar;
            } else if (
                context_flag_obj.all_user_list.employeE_DEGIGNATION ==
                employee_degignation_list.DistrictIncharge
            ) {
                setsiteBarInformation_LocalStore(dcpanel); //useState a set kore rakhlam
            }
            setemployId(context_flag_obj.all_user_list.employeE_ID);
            setlogingInformation_LocalStore(context_flag_obj);
        }
    }, []);
    // useEffect(()=>{
    //   setemployId(logingInformation_LocalStore.all_user_list.employeE_ID);
    // },[logingInformation_LocalStore])

    const Submit=()=>{

        //console.log(siteBarInformation_LocalStore);
        let data = JSON.stringify({
            employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
            bag_waybill_str: waybill
        });

        var config = {
            method: "post",
            url: Degital_Ocean_flag
                ? "https://e-deshdelivery.com/universalapi/allapi/operationBagProductInformation" +
                "?company_name=" +
                company_name
                : "/universalapi/allapi/operationBagProductInformation" + "?company_name=" + company_name,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${logingInformation_LocalStore.token}`,
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
                console.log("response is bagwaybill search result", res);
                setinformation(res.message.all_information);
                //setpayload(true);
                setinformationflag(true);
            })
            .catch(function (error) {
                console.log(error);
            });

    }


    console.log("this is bagwaybill search after function",information)




    // useEffect(() => {
    //     //console.log(siteBarInformation_LocalStore);
    //     let data = JSON.stringify({
    //         employee_id: logingInformation_LocalStore.all_user_list.employeE_ID,
    //         bag_waybill_str: waybill
    //     });
    //
    //     var config = {
    //         method: "post",
    //         url: Degital_Ocean_flag
    //             ? "https://e-deshdelivery.com/universalapi/allapi/operationBagProductInformation" +
    //             "?company_name=" +
    //             company_name
    //             : "/universalapi/allapi/operationBagProductInformation" + "?company_name=" + company_name,
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${logingInformation_LocalStore.token}`,
    //         },
    //         data: data,
    //     };
    //
    //     axios(config)
    //         .then(function (response) {
    //             let json_object_str = JSON.stringify(response.data);
    //             let json_object = JSON.parse(json_object_str);
    //             return json_object;
    //         })
    //         .then((res) => {
    //             console.log("response is fe list", res);
    //             setinformation(res.message);
    //             setpayload(true);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }, [logingInformation_LocalStore]);



    return (
        <>
            <div className="bodydiv">
                <div className="row">
                    <div className="col-12 ">
                        <Navbar sidebar_manu={siteBarInformation_LocalStore} />
                    </div>
                </div>
                {/* <div className="row">
                  <div className="col-12">
                   <Sidebar sidebar_manu={siteBarInformation_LocalStore}/>
                  </div>
                  </div> */}

                {/* <div className="row container-fluid">
                            <div className="col-6 " id="srchmenu">
                                    <Search/>
                            </div>
                       </div>
                    */}

                <div className="container">



                    <div className="row" id="lost">
                        <div className="col-lg-6 col-md-8 col-12 m-auto mt-5">
                            <div className="border mb-2 p-3 rounded-3">
                                <div className="row">
                                    <div className="col-12 col-md-4 col-lg-4">
                                        <p className=""> Product Waybill:</p>
                                    </div>
                                    <div className="col-12 col-md-8 col-lg-8">
                                        <input
                                            style={{
                                                backgroundColor: "#C5D5E4",
                                                outline: "none",
                                                border: "none",
                                                padding: "7px",
                                                borderRadius: "8px",
                                                width: "100%",
                                            }}
                                            className="form-control "
                                            onChange={(e) => {
                                                setwaybill(e.target.value);
                                            }}
                                        />
                                    </div>

                                    {/*code for search button */}


                                    <div className="col-md-12 d-flex justify-content-center mt-3 mb-2">
                                        <button
                                            type="button"
                                            className="btn btn-success btn-sm px-4"
                                            disabled={!waybill}
                                             onClick={Submit}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div >

                        <table className="table bg-white"
                               id="newops"
                               style={{ fontSize: "13px", marginLeft: "1px" }}>
                            <thead
                                className="text-center shadow sticky-top "
                                     style={{
                                         backgroundColor: "#b4bec2",
                                         top: "60px",
                                         zIndex: "0",
                                     }}>

                            <tr className="text-dark" style={{ border: "none" }}>
                                {/*<th scope="col">SL</th>*/}
                                {/*<th scope="col">Action</th>*/}
                                <th scope="col">WayBill</th>
                                <th scope="col">reference_no</th>
                                <th scope="col">consignee_name</th>
                                <th scope="col">contact_number</th>
                                <th scope="col">payment_type</th>
                                <th scope="col">address</th>

                            </tr>

                            </thead>
                            {
                                //informationflag && <p>this is true</p>

                                informationflag && <tbody className="text-center border border-secondary">
                                {
                                    informationflag && information.map((single)=>{
                                        return(
                                            single.product_information.map((single_parcel)=>{
                                               // console.log("thise is single parcel inside the tble",single_parcel.product_waybill)
                                                return(
                                                    <tr className="">
                                                        {/*<p>this is true</p>*/}
                                                        <td className="text-primary" >
                                                            {single_parcel.product_waybill}
                                                        </td>

                                                        <td >
                                                            {single_parcel.reference_no}
                                                        </td>

                                                        <td >
                                                            {single_parcel.consignee_name}
                                                        </td>
                                                        <td >
                                                            {single_parcel.contact_number}
                                                        </td>


                                                        <td >
                                                            {single_parcel.payment_type}
                                                        </td>

                                                        <td >
                                                            {single_parcel.address}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        )

                                        //console.log("this is single inside table",single.product_information
                                    })
                                }

                                </tbody>


                            }



                        </table>

                    </div>







                    {/*<div className="col-12" id="menuhome">*/}
                    {/*    {payload ? (*/}
                    {/*        <Lostmarktable response={information} />*/}
                    {/*    ) : (*/}
                    {/*        <div className="sk-cube-grid">*/}
                    {/*            <div className="sk-cube sk-cube1"></div>*/}
                    {/*            <div className="sk-cube sk-cube2"></div>*/}
                    {/*            <div className="sk-cube sk-cube3"></div>*/}
                    {/*            <div className="sk-cube sk-cube4"></div>*/}
                    {/*            <div className="sk-cube sk-cube5"></div>*/}
                    {/*            <div className="sk-cube sk-cube6"></div>*/}
                    {/*            <div className="sk-cube sk-cube7"></div>*/}
                    {/*            <div className="sk-cube sk-cube8"></div>*/}
                    {/*            <div className="sk-cube sk-cube9"></div>*/}
                    {/*        </div>*/}
                    {/*    )}*/}
                    {/*</div>*/}
                </div>
                <div className="">
                    <div className="col-12">
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
};
export default Bagserch;
