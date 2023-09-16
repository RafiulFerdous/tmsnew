import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";
import { LoginContext } from "../../Context/loginContext";
import { SearchContext } from "../../Context/searchContext";
import { SearchButtonContext } from "../../Context/buttonContext";
import {
  Linksidebar,
  fepanel,
  CustomerCareLinksidebar,
  Salessidebar,
  Operationsidebar,
  Degital_Ocean_flag,
  company_name,
  dcpanel,
} from "../../Common/Linksidebar";
import { toast } from "react-toastify";
import ReactModal from "react-modal";
import { getCurrentTime } from "../../Common/common";

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
export default function Receiveparcelfetable(props) {
  toast.configure();

  const [regular_bag_list, setregular_bag_list] = useState(
    props.response.message[0].all_Product_information
  );
  let return_bag_list = props.response.message[1].all_Product_information;
  //var regular_bag_list = props.response.message[0].all_Product_information;

  console.log("This is product list for fe regular", regular_bag_list);
  console.log("This is product list for fe return", return_bag_list);
  const [bagtype, setbagtype] = useState("");
  const [data, setdata] = useState([]);
  const [infoModalOpen, setinfoModalOpen] = useState(false);
  const [searchResult, setsearchResult] = useState("");
  const [searchTerm, setsearchTerm] = useState("");
  const [inputs, setinputs] = useState([]);
  const [feconfirm, setfeconfirm] = useState(false);

  var { loginInformation, setloginInformation } = useContext(LoginContext);
  //login context start
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
        employee_degignation_list.FieldExecutive
      ) {
        setsiteBarInformation_LocalStore(fepanel); //useState a set kore rakhlam
        final_sideBar = fepanel;
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
        employee_degignation_list.FieldExecutive
      ) {
        setsiteBarInformation_LocalStore(fepanel); //useState a set kore rakhlam
        final_sideBar = fepanel;
      }
      setlogingInformation_LocalStore(context_flag_obj);
    }
  }, []);
  // login context end

  //checkbox start

  let check_box_flag = [];
  const [check_box_flag_state, setcheck_box_flag_state] = useState([]);
  //let select_all_check_box_flag;
  const [select_all_check_box_flag, setselect_all_check_box_flag] =
    useState(false);
  // let count_number = json_information.message.length;
  useEffect(() => {
    if (!searchResult) return;
    let count_number = searchResult.length;
    for (let i = 0; i < count_number; i++) {
      check_box_flag.push(false);
    }
  }, [searchResult]);

  // for (let i = 0; i < count_number; i++) {
  //     check_box_flag.push(false);
  // }

  useEffect(() => {
    setcheck_box_flag_state(check_box_flag);
  }, [searchResult]);

  let checkbox_click_function = (index_value) => {
    let count_number = searchResult.length;
    // let count_number = json_information.message.length;
    let temp_check_box = [];
    for (let i = 0; i < count_number; i++) {
      if (i == index_value) {
        if (check_box_flag_state[i]) {
          temp_check_box.push(false);
        } else {
          temp_check_box.push(true);
        }
      } else {
        temp_check_box.push(check_box_flag_state[i]);
      }
    }
    setcheck_box_flag_state(temp_check_box);
    //console.log(temp_check_box);
  };

  useEffect(() => {
    console.log("After single click : ", check_box_flag_state);
  }, [check_box_flag_state]);

  let select_all_function = () => {
    if (select_all_check_box_flag) {
      setselect_all_check_box_flag(false);
    } else {
      setselect_all_check_box_flag(true);
    }
  };

  useEffect(() => {
    let temp_check_box = [];
    if (!select_all_check_box_flag) {
      if (!searchResult) return;
      let count_number = searchResult.length;
      // let count_number = json_information.message.length;
      for (let i = 0; i < count_number; i++) {
        temp_check_box.push(false);
      }
    } else {
      if (!searchResult) return;

      let count_number = searchResult.length;
      // let count_number = json_information.message.length;
      for (let i = 0; i < count_number; i++) {
        temp_check_box.push(true);
      }
    }
    setcheck_box_flag_state(temp_check_box);
  }, [select_all_check_box_flag]);
  let index = [];

  //checkbox end
  // selecting type of bag; regular or return
  const bagtypeselect = (e) => {
    console.log("bagtype", e.target.value);
    setbagtype(e.target.value);
  };
  // setting the array with selected bag type to show in table
  useEffect(() => {
    bagtype === "Return" ? setdata(return_bag_list) : setdata(regular_bag_list);
  }, [bagtype]);
  console.log("this is product for fe after select bagtype", data);

  useEffect(() => {
    //console.log("entering filter effect", allproductdata)
    const users1 =
      data &&
      data.filter((p) =>
        p.product_waybill_number
          .toString()
          .toLowerCase()
          .includes(searchTerm.toString().toLowerCase())
      );
    setsearchResult(users1);
  }, [searchTerm, data]);

  const closeInvoiceModal = () => {
    setinfoModalOpen(false);
  };
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
      color: "black",
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

  const submit = (e) => {
    e.preventDefault();
    let inputs1 = [];
    searchResult.map(async (data, list_index) => {
      if (check_box_flag_state[list_index]) {
        let elem = data.product_waybill_number;
        inputs1.push(elem);
      }
    });
    console.log("this is  after function call input", inputs1);
    setinputs(inputs1);
    setfeconfirm(!feconfirm);
  };

  console.log("this is product list after select", inputs);

  useEffect(() => {
    if (inputs.length === 0) {
      toast.info("Select Shipment To Confirm Product!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }

    //if(inputs.length===0)return;

    let data = JSON.stringify({
      fe_id: logingInformation_LocalStore.all_user_list.employeE_ID,
      confirm_waybill_list: inputs,
      date_time: getCurrentTime(),
    });
    console.log("this is fe data", data);

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/confirmProductByFE" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/confirmProductByFE" +
          "?company_name=" +
          company_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logingInformation_LocalStore.token}`,
      },
      data: data,
    };
    console.log("config", config);

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        return json_object;
      })
      .then((res) => {
        console.log("product confirmed", res);
        //setregular_bag_list(res.message[0].all_Product_information);
        if (res?.status == "Successful Request.") {
          toast.success(`${res.status} 'and wayBill is: ${inputs}`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
        }

        //  setinformation(res);
        //  setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [inputs]);

  return (
    <div>
      <div className=" mb-5">
        <form className="row d-flex justify-content-center" id="dcrecevedbag">
          <p>
            welcome to{" "}
            {logingInformation_LocalStore.all_user_list.employeE_ZONE}{" "}
            {logingInformation_LocalStore.all_user_list.employeE_DEGIGNATION}
          </p>

          <div className=" col-md-4 col-sm-4 w-25 form-group mx-3 mt-2">
            <div className=" text-center text-black mx-1">
              <label>Select Shipment Type</label>
            </div>

            <select
              className="form-select "
              id="paymenttype"
              onChange={bagtypeselect}
            >
              <option selected value="Regular">
                Regular
              </option>
              <option value="Return">Return</option>
            </select>
          </div>
        </form>
      </div>

      <div className="container">
        <div className="d-flex justify-content-center my-2">
          <div className="input-group w-50">
            <input
              type="text"
              className="form-control mx-2"
              placeholder="search......."
              value={searchTerm}
              onChange={(e) => setsearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="col-xl-6 col-lg-6 col-md-6 col-12">
          <button
            className="btn btn-sm me-2 bg-info text-black border-info mb-2"
            onClick={(e) => submit(e)}
          >
            Submit
          </button>
        </div>

        <div>
          <table className="table table-hover" id="dctable">
            <thead className="bg-dark">
              <tr className="text-white">
                <th scope="col">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      name="allSelect"
                      onChange={(e) => select_all_function()}
                    />
                  </div>
                </th>
                <th scope="col">WayBill</th>
                <th>client name</th>
                <th scope="col">client phone</th>
                <th>consignee_name</th>
                <th scope="col">consignee phone</th>

                <th scope="col">cod amount</th>
              </tr>
            </thead>
            <tbody>
              {searchResult &&
                searchResult.map((single_message, i) => {
                  return (
                    <>
                      {select_all_check_box_flag ? (
                        <tr
                          key={
                            single_message.baG_ID_NUMBER
                          } /*onClick={()=>bag_row_clicked_function(single_message.baG_ID_NUMBER)}*/
                        >
                          <td>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                checked={check_box_flag_state[i]}
                                value={check_box_flag_state[i]}
                                onChange={() => checkbox_click_function(i)}
                              />
                            </div>
                          </td>
                          <td>{single_message.product_waybill_number}</td>
                          <td>{single_message.client_name} </td>
                          <td>{single_message.client_phone_number}</td>
                          <td>{single_message.consignee_name}</td>
                          <td>{single_message.consignee_phone_number}</td>

                          <td>{single_message.cod_amount}</td>
                        </tr>
                      ) : (
                        <tr
                          key={
                            single_message.baG_ID_NUMBER
                          } /*onClick={()=>bag_row_clicked_function(single_message.baG_ID_NUMBER)}*/
                        >
                          <td>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                checked={check_box_flag_state[i]}
                                value={check_box_flag_state[i]}
                                onChange={() => checkbox_click_function(i)}
                              />
                            </div>
                          </td>
                          <td>{single_message.product_waybill_number}</td>
                          <td>{single_message.client_name} </td>
                          <td>{single_message.client_phone_number}</td>
                          <td>{single_message.consignee_name}</td>
                          <td>{single_message.consignee_phone_number}</td>

                          <td>{single_message.cod_amount}</td>
                        </tr>
                      )}
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
