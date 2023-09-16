import React, { useState, useEffect, useContext } from 'react';
import reactDom from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SearchContext } from '../../Context/searchContext';
import { SearchButtonContext } from '../../Context/buttonContext';
import BarCode, { useBarcode } from 'react-barcode';
import { jsPDF } from "jspdf";
import { CSVLink, CSVDownload } from 'react-csv';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import './css/home.css'
import {BrowserRouter,Switch,Route,useHistory,useLocation,Link} from 'react-router-dom';
import {LoginContext} from '../../Context/loginContext';



import {Linksidebar,CustomerCareLinksidebar,Salessidebar,Operationsidebar,Degital_Ocean_flag,company_name,dcpanel} from '../../Common/Linksidebar';
import {toast} from 'react-toastify';
//import './invoice.css'
// import './sc.css';
// import './table.css'
// import './modal.css'
let employee_degignation_list = {
    ProcessingCenter : "PROCESSING CENTER",
    DistrictIncharge : "DISTRICT INCHARGE",
    CustomerCare : "CUSTOMER CARE",
    FieldExecutive : "FIELD EXECUTIVE",
    Marketing_executive : "MARKETING EXECUTIVE",
    Operation : "OPERATION",
    Finance : "FINANCE",
    Admin : "ADMIN",
    SuperAdmin : "SUPERADMIN",
    Customer : "Client"
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

const Returndctable = (props) => {
    toast.configure()
    const [returnproduct, setreturnproduct] = useState([]);
    let json_information = props.response;
    const [selectedbag, setselectedbag] = useState("")
    const [strProductWaybillList, setstrProductWaybillList] = useState("")
    var {loginInformation,setloginInformation} = useContext(LoginContext);
    //login context start
    const [logingInformation_LocalStore, setlogingInformation_LocalStore] = useState(loginInformation);
    const [siteBarInformation_LocalStore, setsiteBarInformation_LocalStore] = useState([]);

    let setLogin_Sidebar_LocalStore = (current_value_login_context,sidebar_context)=>{
        localStorage.setItem("logingInformation_LocalStore", JSON.stringify(current_value_login_context));
    }

    let getLogingInformation_LocalStore = ()=>{
        let value = JSON.parse(localStorage.getItem("logingInformation_LocalStore"));
        return value;
    }

    useEffect(()=>{
        let final_sideBar = null;
        let context_flag_obj = null;
        context_flag_obj = getLogingInformation_LocalStore();

        if(context_flag_obj == undefined){
            if(loginInformation.all_user_list.employeE_DEGIGNATION == employee_degignation_list.ProcessingCenter)
            {
                setsiteBarInformation_LocalStore(Linksidebar);//useState a set kore rakhlam.
                final_sideBar = Linksidebar;
            }
            else if(loginInformation.all_user_list.employeE_DEGIGNATION == employee_degignation_list.DistrictIncharge)
            {
                setsiteBarInformation_LocalStore(dcpanel);//useState a set kore rakhlam
                final_sideBar = dcpanel;
            }

            setLogin_Sidebar_LocalStore(loginInformation,final_sideBar);//local store a set kore rakhlam.
            setlogingInformation_LocalStore(loginInformation);//useState a set kore rakhlam.
        }
        else {
            if(context_flag_obj.all_user_list.employeE_DEGIGNATION == employee_degignation_list.ProcessingCenter)
            {
                setsiteBarInformation_LocalStore(Linksidebar);//useState a set kore rakhlam.
            }
            else if(context_flag_obj.all_user_list.employeE_DEGIGNATION == employee_degignation_list.DistrictIncharge)
            {
                setsiteBarInformation_LocalStore(dcpanel);//useState a set kore rakhlam
            }
            setlogingInformation_LocalStore(context_flag_obj);
        }

    },[]);
    useEffect(() => {

        if(selectedbag==="")return;


        let data = JSON.stringify({

            "dc_id": logingInformation_LocalStore.all_user_list.employeE_ID,
            "bag_waybill_list": selectedbag,
            "date_time": getCurrentTime()

        });
        var config = {
            method: 'post',
            url: Degital_Ocean_flag ? 'https://e-deshdelivery.com/universalapi/allapi/receiveBagbyDC'+'?company_name='+company_name : '/universalapi/allapi/receiveBagbyDC'+'?company_name='+company_name,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${logingInformation_LocalStore.token}`
            },
            data:data
        };
        console.log("config",config)
        axios(config)
            .then(function (response) {
                let json_object_str = JSON.stringify(response.data);
                let json_object = JSON.parse(json_object_str);
                return(json_object);
            })
            .then(res => {
                console.log("response is bag to confirm",res);
                if(res.message.receiveBagbyDC_Product_Info_Classes_list.length===0){
                    toast.error("Wrong Waybill!", {
                        position: toast.POSITION.TOP_CENTER, autoClose:1500
                    });
                }
                else{
                    toast.success("Bag Confirmed!", {
                        position: toast.POSITION.TOP_CENTER, autoClose:1500
                    });
                }
                //  setinformation(res);
                //  setpayload(true);
            })
            .catch(function (error) {
                console.log(error);
            });


    }, [selectedbag])
    const confirmproduct =(e)=>{
        e.preventDefault()
        let waybillLength = 13
        let startIndex = 0
        let endIndex =13
        let temp =[]
        while(endIndex<=strProductWaybillList.length){
            temp.push(strProductWaybillList.slice(startIndex,endIndex))
            startIndex += waybillLength
            endIndex += waybillLength
        }
        console.log("confirm waybill list",temp)
        setselectedbag(temp)
    }

    useEffect(() => {
        setreturnproduct(json_information);
    }, []);
    console.log("return product list json",returnproduct)
    useEffect(() => {
        //console.log("entering filter effect", allproductdata)
        const users1 = json_information.filter(p =>
            p.waybill_number.toString().toLowerCase().includes(strProductWaybillList.toString().toLowerCase()) ||
            p.dc_office_name.toString().toLowerCase().includes(strProductWaybillList.toString().toLowerCase()) ||
            p.customer_contact.toString().toLowerCase().includes(strProductWaybillList.toString().toLowerCase())

        );
        setreturnproduct(users1);
    }, [strProductWaybillList]);

    return(
        <>

            <div className="row container" id="returnpro">
                <p>Return Product List</p>
                <div id="no-more-tables" className="table-responsive-sm">
                    <div className="container p-3">
                        <form>
                            <div className="form-group row mb-2">
                                <label  className="col-sm-3 col-form-label"></label>
                                <div className="col-sm-6">
                                    <input type="text" className="form-control form-control-success" placeholder="Waybill Number" required value={strProductWaybillList} onChange={(e)=>{ setstrProductWaybillList(e.target.value) }}/>
                                </div>
                            </div>
                            {/*<div className="row">*/}
                            {/*    <div className="col-12 d-flex justify-content-center text-align-center">*/}
                            {/*        <button className="btn btn-primary  mb-3" onClick={confirmproduct}disabled={!strProductWaybillList}>Submit</button>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </form>
                    </div>
                    <div className="">
                        {/* <button className="btn btn-sm me-2 bg-info text-black border-info mb-2" onClick={(e) => bridgeme(e)}>Confirm</button> */}
                        <CSVLink data={returnproduct} className="btn btn-sm bg-info text-black border-info mb-2" >Export csv</CSVLink>
                    </div>
                    <table className="col-md-12 table-bordered table-striped table-condensed css-serial cf" id="dctable">
                        <thead className="cf bg-dark">

                        <tr className="text-white">
                            <th>SL</th>
                            {/* <th scope="col">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" name="allSelect" onChange={(e) => select_all_function()} />

                                    </div>
                                </th> */}
                            <th>WAYBILL</th>
                            <th>
                                Order Id
                            </th>
                            <th>Customer Name</th>
                            <th>
                                Customer Number
                            </th>
                            <th>Consignee Name</th>

                            <th>Consignee Number</th>
                            <th>DC</th>
                            <th>
                                Value
                            </th>

                            <th>
                                Weight
                            </th>

                            {/* <th>Print<button className="btn btn-sm bg-info text-black border-info mb-2" onClick={(e) => print_function(e)}>Print All</button> </th>
                                <th>ex<CSVLink data={users} className="btn btn-sm bg-info text-black border-info mb-2" >Export csv</CSVLink></th> */}
                        </tr>
                        </thead>
                        <tbody>

                        {
                            returnproduct.map((single_message) => {

                                return (
                                    <>
                                        {/* {select_all_check_box_flag ? */}
                                        <tr>
                                            <td data-title="SL" ></td>
                                            {/* <td data-title="Select">
                                                        <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" checked={check_box_flag_state[i]} value={check_box_flag_state[i]} onChange={() => checkbox_click_function(i)} />

                                                        </div>
                                                    </td> */}


                                            <td data-title="WayBill Number">{single_message.waybill_number}</td>
                                            <td data-title=" order Id">
                                                {single_message.order_id}
                                            </td>
                                            <td data-title="Client Name">{single_message.customer_name}</td>
                                            <td data-title=" Consignee Name">
                                                {single_message.customer_contact}
                                            </td>
                                            <td data-title=" Consignee Name">
                                                {single_message.consignee_name}
                                            </td>
                                            <td data-title="Product Details">{single_message.contact}</td>
                                            <td data-title="Dc Office Name">{single_message.dc_office_name}</td>
                                            <td data-title="Pin Code">
                                                {single_message.product_value}
                                            </td>

                                            <td data-title="Pin Code">
                                                {single_message.product_weight}
                                            </td>

                                            {/* onClick ={ JsBarcode("#code128",single_message.waybill_number)}  */}
                                            {/* <td><button className="btn btn-sm bg-dark text-white border-dark mb-2"   >Print</button></td> */}
                                        </tr>

                                        {/* : */}
                                        {/* <tr key={single_message.ordeR_ID}> */}
                                        {/* <td data-title="SL" className="css-serial"></td> */}
                                        {/* <td data-title="Select">
                                                //     <div className="custom-control custom-checkbox">
                                                //         <input type="checkbox" className="custom-control-input" checked={check_box_flag_state[i]} value={check_box_flag_state[i]} onChange={() => checkbox_click_function(i)} />

                                                //     </div>
                                                // </td> */}


                                        {/* <td data-title="WayBill Number">{single_message.ordeR_ID}</td>
                                                 <td data-title=" Order Id">
                                                     {single_message.producT_NAME}
                                                 </td>
                                             <td data-title="Client Name">{single_message.producT_DETAILS}</td>
                                                 <td data-title=" Consignee Name">
                                                     {single_message.consigneE_NAME}
                                                 </td>
                                                 <td data-title=" Consignee Name">
                                                     {single_message.reason}
                                                 </td>
                                                 <td data-title="Product Details">{single_message.contacT_NUMBER}</td>
                                                 <td data-title="Dc Office Name">{single_message.address}</td>
                                                 <td data-title="Pin Code">
                                                     {single_message.pincode}
                                                 </td>
                                                 <td data-title="Product Value">
                                                     {single_message.producT_WEIGHT} </td>
                                                 <td data-title="Product Weight">
                                                     {single_message.producT_PAYMENT_TYPE}
                                                 </td>
                                                 <td data-title="product Status">
                                                     {single_message.producT_VALUE} </td>
                                                 <td data-title="product status datetime">
                                                     {single_message.producT_PROCESSING_STATUS}
                                                 </td>
                                                 <td data-title="product status datetime">
                                                     {single_message.producT_PRODESSING_STATUS_DATETIME}
                                                 </td> */}
                                        {/* onClick ={ JsBarcode("#code128",single_message.waybill_number)}  */}
                                        {/* <td><button className="btn btn-sm bg-dark text-white border-dark mb-2"   >Print</button></td> */}
                                        {/* </tr> */}

                                        {/* }  */}




                                    </>

                                )
                            })
                        }
                        </tbody>

                    </table>
                </div>
            </div>
        </>
    );
}
export default Returndctable