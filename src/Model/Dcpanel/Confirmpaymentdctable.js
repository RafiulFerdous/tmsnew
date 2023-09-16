import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import './customermodel.css'
import jsPDF from "jspdf";
import "jspdf-autotable";
import Modal from "react-modal";
import ReactHTMLTableTpExcel from "react-html-table-to-excel";
import {
    company_name,
    dcpanel,
    Degital_Ocean_flag,
    Linksidebar,
} from "../../Common/Linksidebar";
import axios from "axios";
import { toast } from "react-toastify";
import { LoginContext } from "../../Context/loginContext";

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

const Confirmpaymentdctable = (props) => {
    const [alldata, setalldata] = useState([]);
    const [dcid, setdcid] = useState("");
    const [date_time, setdate_time] = useState("");
    const [payable_amount, setpayable_amount] = useState("");
    const [transection_amount, settransection_amount] = useState("");
    const [transection_number, settransection_number] = useState("");
    const [paymenttype, setpaymenttype] = useState("");
    const [modalIsOpen, setIsOpen] = useState(false);
    const [infoModalOpen, setinfoModalOpen] = useState(false);
    const [num1, setnum1] = useState("");

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
                setsiteBarInformation_LocalStore(dcpanel); //useState a set kore rakhlam
                final_sideBar = dcpanel;
            }
            //setemployId(loginInformation.all_user_list.employeE_ID);
            // setemployeezone(logingInformation_LocalStore.all_user_list.employeE_ZONE)
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
                employee_degignation_list.DistrictIncharge
            ) {
                setsiteBarInformation_LocalStore(dcpanel); //useState a set kore rakhlam
            }
            // setemployId(context_flag_obj.all_user_list.employeE_ID);
            setlogingInformation_LocalStore(context_flag_obj);
            // setemployeezone(logingInformation_LocalStore.all_user_list.employeE_ZONE)
        }
    }, []);

    let json_information = props.response;
    useEffect(() => {
        setalldata(json_information);
    }, []);
    console.log("this is all date wise", alldata);
    const pdfGenerate = () => {
        const doc = new jsPDF("portrait", "px", "a4");
        doc.autoTable({ html: "#table" });
        doc.save("Report.pdf");
    };
    // function generate() {
    //     const doc = new jsPDF('p', 'mm');

    //     doc.autoTable({
    //       // html: '#my-table',
    //       head: [
    //         ['Delivered Product List', 'Returned Product List', 'Holded Product List', 'Lost Product List','Collected COD'],
    //       ],
    //       body: [
    //         [json_information.message.total_number_of_delevered_product,json_information.message.total_number_of_returned_product,
    //             json_information.message.total_number_of_holded_product,json_information.message.total_number_of_lost_product, json_information.message.total_collected_amount],

    //       ],
    //       theme: 'grid',
    //       tableWidth: 180,
    //       styles: {},
    //       columnStyles: {},
    //     });

    //     doc.save('Report');
    //   }

    let delevered_flag = -1;
    let return_flag = -1;
    let hold_flag = -1;
    let lost_flag = -1;
    let refresh_flag = -1;
    let date_flag = -1;

    let delevered_number = 0;
    let holded_number = 0;
    let return_number = 0;
    let lost_number = 0;
    let total = 0;

    const confirm = (e, date, payable_amount, dc) => {
        setdate_time(date);
        setpayable_amount(payable_amount);
        setdcid(dc);
        // setIsOpen(true)
        setinfoModalOpen(true);
    };

    function closeInvoiceModal() {
        setinfoModalOpen(false);
    }
    function closeModal() {
        setIsOpen(false);
    }
    const customStyles = {
        overlay: {
            position: "fixed",
            height: "100vh",
            width: "100vw",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.75)",
        },
        content: {
            // top: '50%',
            // left: '60%',
            // right: '60',
            // bottom: 'auto',
            // marginRight: '-50%',
            // transform: 'translate(-50%, -50%)',
            color: "orange",
            position: "absolute",

            top: "50px",
            left: "20%",
            right: "40px",
            bottom: "40px",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
        },
    };

    console.log("this is dc_id", dcid);
    console.log("this is datetime", date_time);
    console.log("this is setpayable_amount", payable_amount);

    const Submit = () => {
        var axios = require("axios");

        var data = JSON.stringify({
            dc_id: dcid,
            date_time: date_time,
            payable_amount: parseInt(payable_amount),
            transection_amount: parseInt(transection_amount),
            transection_number: transection_number,
            payment_type: paymenttype,
        });

        console.log("this is data : ", data);

        var config = {
            method: "post",
            url: Degital_Ocean_flag
                ? "https://e-deshdelivery.com/universalapi/allapi/dcPaymentInvoiceGenerate" +
                "?company_name=" +
                company_name
                : "/universalapi/allapi/dcPaymentInvoiceGenerate" +
                "?company_name=" +
                company_name,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${logingInformation_LocalStore.token}`,
            },
            data: data,
        };
        console.log("this is config", config);

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                console.log(response.data);
                // closeInvoiceModal()
                // setpickupRefreshFlag(pickupRefreshFlag => !pickupRefreshFlag);
                //  toast.success("SuccessFully Forworded", {
                //      position: toast.POSITION.TOP_CENTER, autoClose: 1500
                //  }
                //  );
                //setUsers(response.data.all_product_list)
                // console.log("successfully forworded");
                return response;
            })
            .then((res) => {
                console.log("new update res", res);

                if (res.status === 200) {
                    console.log("toast call");
                    toast.success(res.data.status, {
                        position: "top-right",
                        autoClose: 2500,
                    });
                }
                closeInvoiceModal();

                //setIsOpen(true);
                // setinfoModalOpen(true);
                // setUsers(res.data.all_product_list)

                //setpayload(true);
            })
            .catch(function (error) {
                // Error
                //  if (error.response) {
                //      toast.error("Error!", {
                //          position: toast.POSITION.TOP_CENTER, autoClose: 1500
                //      });

                //  } else if (error.request) {
                //      toast.error(" Request Error!", {
                //          position: toast.POSITION.TOP_CENTER, autoClose: 1500
                //      });
                //      console.log(error.request);
                //  } else {

                //      console.log('Error', error.message);
                //  }
                console.log(error.config);
            });
    };

    return (
        <>
            {/* model */}

            <div className="bordered">
                {/* Invoice modal */}
                <Modal
                    isOpen={infoModalOpen}
                    style={customStyles}
                    onRequestClose={closeInvoiceModal}
                    closeTimeoutMS={200}
                    contentLabel="Example Modal"
                >
                    <button
                        className="btn btn-outline-danger mb-2"
                        onClick={closeInvoiceModal}
                    >
                        close
                    </button>
                    <div>
                        <h4>Submit</h4>

                        <form className="bordered">
                            <div className="form-group">
                                <label>Dc Id</label>
                                <input type="text" className="form-control" value={dcid} />
                            </div>
                            <div className="form-group">
                                <label>Date Time</label>
                                <input type="text" className="form-control" value={date_time} />
                            </div>

                            <div className="form-group">
                                <label>payable amount</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={payable_amount}
                                />
                            </div>

                            <div className="form-group">
                                <label>transaction amount</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={transection_amount}
                                    onChange={(e) => {
                                        settransection_amount(e.target.value);
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <label>Transaction Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={transection_number}
                                    onChange={(e) => {
                                        settransection_number(e.target.value);
                                    }}
                                />
                            </div>

                            

                          

                            <div className="form-group">
                                <label>Payment Type</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={paymenttype}
                                    onChange={(e) => {
                                        setpaymenttype(e.target.value);
                                    }}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary mt-4"
                                onClick={Submit}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </Modal>
            </div>

            {/* modelend */}

            <div className="container">
                {/* <div className="row">
          <div className="col-md-12 d-flex justify-content-center mt-2 mb-2">

            <div className="row">
              <div className="col-md-12 d-flex justify-content-center">
                <ReactHTMLTableTpExcel
                  id="test-table-xls-button"
                  className="download-table-xls-button bg-primary border-primary text-white btn-lg mb-2"
                  table="confirmpaymentdc"
                  filename="Report Download"
                  buttonText="Download As XLS"
                />
              </div>
            </div>
          </div>
        </div> */}
                {/*    id="dctable"*/}
            </div>
            <div id="no-more-tables" className="mt-5">
                <ReactHTMLTableTpExcel
                    id="test-table-xls-button"
                    className="btn btn-primary px-4 mb-2"
                    table="confirmpaymentdc"
                    filename="Report Download"
                    buttonText="Download As XLS"
                />
                <table
                    id="confirmpaymentdc"
                    className="table bg-white css-serial"
                    style={{ fontSize: "12px" }}
                >
                    {/*Table head*/}
                    <thead
                        className="text-center shadow sticky-top "
                        // style={{ backgroundColor: "#f1f1f1" }}
                        style={{
                            backgroundColor: "#b4bec2",
                            top: "60px",
                            zIndex: "0",
                        }}
                    >
                    <tr className="text-dark" style={{ border: "none" }}>
                        <th>SL</th>
                        <th>Waybill Number</th>
                        <th>Order ID</th>
                        <th>Client Name</th>
                        <th>Consignee Name</th>
                        <th>Payment Type</th>
                        <th>COD Amount</th>
                        <th>EOD Status</th>
                        <th>Action</th>
                        <th>Date</th>
                        {/*<th>Status</th>*/}
                    </tr>
                    </thead>
                    <tbody className="text-center border border-dark">
                    {alldata &&
                        alldata.map((alldata1) => {
                            return (
                                alldata1.final_response &&
                                alldata1.final_response.map((single_day_information) => {
                                    let color = "bg-success text-white";
                                    let num = single_day_information.invoice_number;
                                    let disableflag = true;
                                    if (num === null || num === "") {
                                        //setnum1("")
                                        color = "bg-danger text-white";
                                        disableflag = false;
                                    }
                                    console.log("Data color", color);

                                    delevered_flag = -1;
                                    // hold_flag = -1;
                                    // lost_flag = -1;
                                    refresh_flag = -1;
                                    date_flag = -1;
                                    delevered_number = single_day_information.length;
                                    // holded_number = single_day_information.holded_product_list.length;
                                    // return_number = single_day_information.returned_product_list.length;
                                    // lost_number = single_day_information.lost_product_list.length;
                                    total =
                                        delevered_number +
                                        holded_number +
                                        return_number +
                                        lost_number;

                                    return (
                                        <>
                                            {single_day_information.product_list.map(
                                                (single_delevered_product) => {
                                                    delevered_flag = delevered_flag + 1;
                                                    date_flag = date_flag + 1;
                                                    //
                                                    return (
                                                        <tr className={color}>
                                                            <td data-title="SL"></td>
                                                            <td data-title="Waybill Number">
                                                                {single_delevered_product.waybill_number}
                                                            </td>
                                                            <td data-title="Order ID">
                                                                {single_delevered_product.order_id}
                                                            </td>
                                                            <td data-title="Client Name">
                                                                {single_delevered_product.client_name}
                                                            </td>
                                                            <td data-title="Consignee Name">
                                                                {single_delevered_product.consignee_name}
                                                            </td>
                                                            <td data-title="Payment Type">
                                                                {single_delevered_product.payment_type}
                                                            </td>
                                                            <td data-title="COD Amount">
                                                                {single_delevered_product.cod_amount}
                                                            </td>
                                                            <td data-title="EOD Status">
                                                                {single_delevered_product.eod_status}
                                                            </td>
                                                            {/*"btn btn-outline-primary"*/}
                                                            {/*<td className="bg-success">{single_delevered_product.producT_PROCESSING_STATUS}</td>*/}
                                                            {
                                                                !delevered_flag && (
                                                                <td data-title="Action">
                                                                    <button
                                                                        className="btn btn-dark btn-sm px-3"
                                                                        disabled={disableflag}
                                                                        onClick={(e) =>
                                                                            confirm(
                                                                                e,
                                                                                single_day_information.date,
                                                                                single_day_information.payable_amount,
                                                                                single_delevered_product.dc_id
                                                                            )
                                                                        }
                                                                        rowSpan={delevered_number}
                                                                        align="center"
                                                                    >
                                                                        Send
                                                                    </button>{" "}
                                                                </td>
                                                            )}
                                                            {!date_flag && (
                                                                <td data-title="Date">
                                                                    {single_day_information.date}
                                                                </td>
                                                            )}
                                                            {/*    rowSpan={total}*/}
                                                            {/*<td>{single_delevered_product.cod_manager_confirm_status}</td>*/}
                                                        </tr>
                                                    );
                                                }
                                            )}
                                        </>
                                    );
                                })
                            );
                        })}
                    </tbody>
                    {/*Table body*/}
                </table>
            </div>
        </>
    );
};

export default Confirmpaymentdctable;
