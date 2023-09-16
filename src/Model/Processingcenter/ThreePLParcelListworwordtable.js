import axios from "axios";
import React, { useState, useEffect } from "react";

import "../../ProcessingCenter/Js/ThreePLParcelTable.css";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { company_name, Degital_Ocean_flag } from "../../Common/Linksidebar";

import { CSVLink } from "react-csv";

import ScaleLoader from "react-spinners/ScaleLoader";

import { getCurrentTime } from "../../Common/common";
import { print_function } from "../../utils/printFunction";

const ThreePLParcelListworwordtable = ({ response, setReCall, reCall }) => {
  toast.configure();
  const companyName = ["Redx", "Pathao", "Piickme Express"];

  const [dataForTable, setDataForTable] = useState([]);
  const [tableSelectedValue, setTableSelectedValue] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [successFullList, setSuccessFullList] = useState([]);
  const [unSuccessFullList, setUnSuccessFullList] = useState([]);
  const [redXStore, setRedXStore] = useState([]);
  const [pathao, setPathao] = useState([]);
  const [storeId, setStoreId] = useState("");
  const [filterClient, setfilterClient] = useState("");
  const [modalproductIsOpen, setmodalproductIsOpen] = useState(false);
  const [reFetchStore, setRefetchStore] = useState(false);

  // check box function
  const handleCheck = (e) => {
    const { name, checked } = e.target;
    if (name === "allselect") {
      const tempUser = dataForTable.map((e) => {
        return { ...e, isChecked: checked };
      });
      setDataForTable(tempUser);
    } else {
      const tempUser = dataForTable.map((e) =>
        e.waybill_number === name ? { ...e, isChecked: checked } : e
      );
      setDataForTable(tempUser);
    }
  };

  // get check box data
  useEffect(() => {
    const selectedValue = dataForTable.filter((e) => e.isChecked == true);
    setTableSelectedValue(selectedValue);
    // console.log("selectedValue", selectedValue);
  }, [dataForTable]);

  // pagination states
  const [currentItems, setCurrentItems] = useState([]);

  const [selectedPage, setSelectedPage] = useState(0);

  function closeProductModal() {
    setmodalproductIsOpen(false);
    setStoreId("");
  }

  const customStyles1 = {
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
      height: "80%",
      width: "80%",
      top: "15%",
      left: "10%",
      right: "40px",

      border: "1px solid #ccc",
      background: "#fff",
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "4px",
      outline: "none",
      padding: "20px",
    },
  };

  // ---------get data from localStorage----------
  const employee = JSON.parse(
    localStorage.getItem("logingInformation_LocalStore")
  )?.all_user_list;

  // --------access token-------
  const token = JSON.parse(
    localStorage.getItem("logingInformation_LocalStore")
  )?.token;

  //   pagination end

  const handelForwad = () => {
    if (tableSelectedValue.length > 0) {
      setmodalproductIsOpen(true);
    } else {
      toast.info("please select Product.");
    }
  };

  //--------- GET redX store register api-----------

  useEffect(() => {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/RedxGetstores"
        : "http://test.e-deshdelivery.com/universalapi/allapi/RedxGetstores",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        setRedXStore(response?.data?.data?.pickup_stores);
      })
      .catch(function (error) {
        setRedXStore([]);
      });
  }, []);

  //--------- GET pathao store register api-----------
  useEffect(() => {
    var config = {
      method: "get",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/edeshStroreRegisteredtoPathao" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/edeshStroreRegisteredtoPathao" +
          "?company_name=" +
          company_name,

      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${logingInformation_LocalStore.token}`,
        Authorization: `Bearer ${token}`,
      },
    };
    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        return json_object;
      })
      .then((res) => {
        if (res?.status == "Successful Request.") {
          setPathao(res.message);
          setLoading(false);
        }
        if (res?.message === "Failed to Get Token.") {
          setRefetchStore(!reFetchStore);
        }
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  }, [reFetchStore]);

  const selectedWaybill = tableSelectedValue.map((e) => e.waybill_number);

  const callForwardToRedx = () => {
    toast.info("Forwarding to redx...");

    const data = JSON.stringify({
      Waybill: selectedWaybill.toString(),
      partnerCourierName: "Redx",
      StoreID: parseInt(storeId),
      EmployeeName: employee.employeE_NAME,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/RedxCreateOrder"
        : "https://test.e-deshdelivery.com/universalapi/allapi/RedxCreateOrder",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setReCall(!reCall);
        setfilterClient("");
        setSuccessFullList(response?.data?.data?.successfulList);
        setUnSuccessFullList(response?.data?.data?.notFoundList);
        toast.success(response?.data?.message);
        toast.info(JSON.stringify(response?.data?.data?.successfulList));
        setmodalproductIsOpen(false);
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error?.message);
        setSuccessFullList([]);
        setUnSuccessFullList([]);
        setReCall(!reCall);
        setfilterClient("");
        setmodalproductIsOpen(false);
      });
  };
  const callForwardToPathao = () => {
    toast.info("Forwarding to Pathao...");

    const data = JSON.stringify({
      employee_id: employee.employeE_ID,
      store_id: parseInt(storeId), //selectedUserId  11045
      waybill_string: selectedWaybill,
      dateTime: getCurrentTime(),
    });

    const config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/universalapi/allapi/pathaoSendProducts" +
          "?company_name=" +
          company_name
        : "/universalapi/allapi/pathaoSendProducts" +
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
        if (res?.status == "Successful Request.") {
          toast.success(res?.status);
        }
        setSuccessFullList(res.successful_products?.successfulProduct_list);
        setUnSuccessFullList(res?.failed_products?.unsuccessful_product_list);
        setReCall(!reCall);
        setfilterClient("");
        setmodalproductIsOpen(false);
      })
      .catch(function (error) {
        setReCall(!reCall);
        setfilterClient("");
        toast.error(error?.message);
        setSuccessFullList([]);
        setUnSuccessFullList([]);
        setmodalproductIsOpen(false);
      });
  };

  const handleSubmitForward = () => {
    if (filterClient === "Redx") {
      callForwardToRedx();
    }
    if (filterClient === "Pathao") {
      callForwardToPathao();
    }
  };

  useEffect(() => {
    const result = response?.message?.filter(
      (word) => word.partner_company == filterClient
    );
    if (result.length > 0) {
      setDataForTable(result);
    } else if (filterClient === "") {
      setDataForTable(response?.message);
    } else {
      setDataForTable([]);
    }
  }, [filterClient]);

  //------------------------------------------multiple search start------------------------------

  useEffect(() => {
    const tempData = response.message?.filter(
      (p) =>
        p.waybill_number
          ?.toString()
          .toLowerCase()
          .includes(searchInput?.toString().toLowerCase()) ||
        p.order_id
          ?.toString()
          .toLowerCase()
          .includes(searchInput?.toString().toLowerCase())
    );
    setDataForTable(tempData);
  }, [searchInput]);

  // ------------------------------------------multiple search end--------------------------------

  // ------------------------------------------pagination start-----------------------------------
  const perPage = 50;
  const handlePageClick = ({ selected: selectedPage }) => {
    setSelectedPage(selectedPage);
  };
  const offset = selectedPage * perPage;
  const currentPageData = currentItems.slice(offset, offset + perPage);

  const pageCount = Math.ceil(currentItems.length / perPage);

  // ------------------------------------------pagination end-------------------------------------

  return (
    <div>
      <div className="container">
        <div id="no-more-tables" className="">
          <div
            className="mb-4 p-3 rounded-3"
            style={{ backgroundColor: "#C5D5E4" }}
          >
            <div className="row mb-3">
              {/* ------------------------------multiple order id and waybill Search start------------------------- */}

              <div className="col-lg-6 col-md-6 col-12">
                <input
                  style={{
                    // backgroundColor: "#C5D5E4",
                    outline: "none",
                    border: "none",
                    padding: "7px",
                    borderRadius: "8px",
                    width: "93%",
                  }}
                  type="text"
                  placeholder="Filter Waybills OR Order ID"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
              {/* ------------------------------multiple order id and waybill Search end--------------------------- */}
              <div className="col-lg-6 col-md-6 col-12 ">
                <input
                  style={{
                    // backgroundColor: "#C5D5E4",
                    outline: "none",
                    border: "none",
                    padding: "7px",
                    borderRadius: "8px",
                    width: "93%",
                  }}
                  list="partnerLIstred"
                  placeholder="Partner Forword Select"
                  className="form-control shadow"
                  value={filterClient}
                  onChange={(e) => setfilterClient(e.target.value)}
                />
                <datalist id="partnerLIstred" className="w-100">
                  {/*<option value="Redx">Redx</option>*/}
                  {companyName?.map((Client, i) => (
                    <option key={i} value={Client}>
                      {Client}
                    </option>
                  ))}
                </datalist>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="mb-2 ps-1 col-lg-6 col-md-6 col-12">
              <CSVLink
                onClick={() => toast.success("Excel Download Successful")}
                filename={`Three PL Parcel ${getCurrentTime()}.xls`}
                data={response?.message}
                className="btn btn-dark btn-sm px-4 mx-2  mb-2"
              >
                Export Excel
              </CSVLink>
              <button
                className="btn btn-primary btn-sm px-4 mx-2 mb-2"
                onClick={() => print_function(tableSelectedValue)}
                onFocus={() => toast.info("Please Wait a Moment!")}
                disabled={tableSelectedValue.length == 0}
              >
                {tableSelectedValue?.length > 1 ? "Print All" : "Print"}
              </button>

              <button
                className="btn btn-success btn-sm px-4 mx-2 mb-2"
                onClick={handelForwad}
                disabled={
                  filterClient === "Redx" || filterClient === "Pathao"
                    ? false
                    : true
                }
              >
                Forward
              </button>
            </div>
            {/* <div
              className="d-flex flex-row-reverse col-lg-6 col-md-6 col-12"
              // style={{ position: "fixed" }}
            >
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={0}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                activeClassName={"active"}
              />
            </div> */}
          </div>
          <table
            id="3pltablelist"
            className="table bg-white"
            style={{ fontSize: "12px" }}
          >
            <thead
              className="text-center shadow sticky-top "
              style={{
                backgroundColor: "#b4bec2",
                top: "60px",
                zIndex: "0",
              }}
            >
              <tr className="text-dark" style={{ border: "none" }}>
                <th>SL</th>
                <th scope="col">
                  Select All
                  <br />
                  <input
                    type="checkbox"
                    checked={
                      dataForTable.filter((e) => e.isChecked !== true).length <
                      1
                    }
                    name="allselect"
                    onChange={handleCheck}
                  />
                </th>
                <th>Waybill</th>
                <th>Order ID</th>
                <th>Partner Name</th>
                <th>Client Name</th>
                <th>Consignee Name</th>
                <th>Details</th>
                <th>DC Office </th>
                <th>Pin Code</th>
                <th>Value</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {dataForTable.map((single_message, i) => {
                return (
                  <tr key={single_message.waybill_number}>
                    <td data-title="SL">{i + 1}</td>
                    <td data-title="Select">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          onChange={handleCheck}
                          name={single_message.waybill_number}
                          checked={single_message?.isChecked || false}
                        />
                      </div>
                    </td>
                    <td data-title="WayBill Number">
                      {single_message.waybill_number}
                    </td>
                    <td data-title=" Order Id">{single_message.order_id}</td>
                    <td data-title="Partner Name">
                      {single_message.partner_company}
                    </td>
                    <td data-title="Client Name">
                      {single_message.customer_name}
                    </td>
                    <td data-title=" Consignee Name">
                      {single_message.consignee_name}
                    </td>
                    <td data-title="Product Details">
                      {single_message.product_detail}
                    </td>
                    <td data-title="Dc Office Name">
                      {single_message.dc_office_name}
                    </td>
                    <td data-title="Pin Code">{single_message.pincode}</td>
                    <td data-title="Product Value">
                      {single_message.product_value}
                    </td>
                    <td data-title="Product Weight">
                      {single_message.product_weight}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <img id="PDFTable" style={{ display: "none" }} />
        </div>
      </div>

      {pathao && (
        <Modal
          isOpen={modalproductIsOpen}
          style={customStyles1}
          onRequestClose={closeProductModal}
          closeTimeoutMS={500}
          contentLabel="Example Modal"
        >
          {loading ? (
            <div>
              <div className="d-flex justify-content-center align-items-center">
                <ScaleLoader color="green" size={150} />
              </div>
              <p className="text-center mt-5">Please Wait</p>
            </div>
          ) : (
            <div>
              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={closeProductModal}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success px-4"
                  onClick={handleSubmitForward}
                  disabled={storeId === null || storeId === ""}
                >
                  Submit
                </button>
              </div>
              {/* <h4>Product Details</h4> */}
              <div className="my-3">
                <input
                  style={{
                    // backgroundColor: "#C5D5E4",
                    outline: "none",
                    border: "none",
                    padding: "7px",
                    borderRadius: "8px",
                    width: "93%",
                  }}
                  list="storeLIst"
                  placeholder="store Address"
                  className="form-control shadow"
                  value={storeId}
                  //onChange={(e) => handelSelected(e)}
                  onChange={(e) => setStoreId(e.target.value)}
                />

                {filterClient === "Redx" ? (
                  <datalist id="storeLIst">
                    {redXStore?.map((store) => (
                      <option key={store?.id} value={store?.id}>
                        {store?.name}
                      </option>
                    ))}
                  </datalist>
                ) : (
                  <datalist id="storeLIst">
                    {filterClient === "Pathao" &&
                      pathao?.map((store) => (
                        <option key={store.store_id} value={store.store_id}>
                          {store.store_name}
                        </option>
                      ))}
                  </datalist>
                )}
              </div>
              <div>
                <div>
                  {unSuccessFullList?.length == 0 ? (
                    <div></div>
                  ) : (
                    <div>
                      <h2>Unsuccessful Product List</h2>
                      {unSuccessFullList?.map((e, i) => {
                        return (
                          <div
                            key={i}
                            className="row border-dark border p-4 my-2 rounded-3"
                          >
                            <div className="col-5">
                              Waybill :
                              {e?.waybill_number ? e?.waybill_number : e}
                            </div>
                            <div className="col-7">
                              Reason : {e.reason ? e.reason : e}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div>
                  {successFullList?.length == 0 ? (
                    <div></div>
                  ) : (
                    <div>
                      <h2>Successful Product List</h2>
                      {successFullList?.map((e, i) => {
                        return (
                          <div
                            key={i}
                            className="row border-dark border p-4 my-2 rounded-3"
                          >
                            <div className="col-5">
                              Waybill :
                              {e?.waybill_number ? e?.waybill_number : e}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default ThreePLParcelListworwordtable;
