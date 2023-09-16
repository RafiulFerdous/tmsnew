import React, { useState, useEffect, useContext } from "react";
import reactDom from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { SearchContext } from "../../Context/searchContext";
import { SearchButtonContext } from "../../Context/buttonContext";
import BarCode, { useBarcode } from "react-barcode";
import { jsPDF } from "jspdf";
import { CSVLink, CSVDownload } from "react-csv";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import "./sc.css";
import "./table.css";
import Modal from "react-modal";
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
Modal.setAppElement("#root");

export default function ReturnedProductTable(props) {
  let json_information = props.response;
  const [returnbag, setreturnbag] = useState([]);
  useEffect(() => {
    setreturnbag(json_information.message);
  }, []);
  const [modalproductIsOpen, setmodalproductIsOpen] = useState(false);
  const [clickedbag, setclickedbag] = useState("");
  const [clickedbagflag, setclickedbagflag] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm1, setSearchTerm1] = useState("");
  const bagidclicked = (i) => {
    setclickedbag(i);
    setclickedbagflag(true);
    setmodalproductIsOpen(true);
  };
  const [product, setproducts] = useState("");
  React.useEffect(() => {
    const results = json_information.message.filter(
      (p) =>
        p.baG_WAYBILL_NUMBER
          .toString()
          .toLowerCase()
          .includes(searchTerm.toString().toLowerCase()) ||
        p.baG_ID_NUMBER
          .toString()
          .toLowerCase()
          .includes(searchTerm.toString().toLowerCase())
    );
    console.log("This is serach result", results);
    setreturnbag(results);
  }, [searchTerm]);
  React.useEffect(() => {
    const results =
      clickedbagflag &&
      returnbag[clickedbag].all_Products_of_Bag.filter(
        (p) =>
          console.log("p", p) ||
          p.producT_WAYBILL_NUMBER
            .toString()
            .toLowerCase()
            .includes(searchTerm1.toString().toLowerCase()) ||
          p.referencE_NO
            .toString()
            .toLowerCase()
            .includes(searchTerm1.toString().toLowerCase())
      );
    setproducts(results);
  }, [searchTerm1, clickedbag]);
  const handleonChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleonChange1 = (event) => {
    setSearchTerm1(event.target.value);
  };
  function closeProductModal() {
    setmodalproductIsOpen(false);
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
      color: "black",
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

  const [allproductlist, setallproductlist] = useState([]);

  React.useEffect(() => {
    let list = [];

    returnbag &&
      returnbag.map((bag) => {
        bag.all_Products_of_Bag.map((parcel) => {
          list.push(parcel);
        });
      });
    setallproductlist(list);
    console.log("this is all parcel in list in react.useffect", list);
  }, [returnbag]);
  return (
    <div>
      {/*<div className="row">*/}
      {/*  <div className="col-lg-6 col-md-8 col-12 mb-3">*/}
      {/*    <div className="row">*/}
      {/*      <div className="col-lg-2 col-md-3 col-12">*/}
      {/*        <p>Bag Filter :</p>*/}
      {/*      </div>*/}
      {/*      <div className="col-lg-9 col-md-9 col-12">*/}
      {/*        <input*/}
      {/*            style={{*/}
      {/*              backgroundColor: "#C5D5E4",*/}
      {/*              outline: "none",*/}
      {/*              border: "none",*/}
      {/*              padding: "7px",*/}
      {/*              borderRadius: "8px",*/}
      {/*              width: "93%",*/}
      {/*            }}*/}
      {/*            type="text"*/}
      {/*            placeholder="Waybill or Bag ID"*/}
      {/*            value={searchTerm}*/}
      {/*            onChange={handleonChange}*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/* <div className="col-sm-4 form-group mx-3 m-2">
        <div className="input-group">
          Bag Filter:
          <input
            type="text"
            className="form-control mx-2 shadow"
            placeholder="Waybill or Bag ID"
            value={searchTerm}
            onChange={handleonChange}
          />
        </div>
      </div> */}
      {/*<div id="no-more-tables">*/}
      {/*  /!* <div className="">*/}
      {/*                <button className="btn btn-sm me-2 bg-info text-black border-info mb-2" onClick={(e) => print_function(e)}>Print All</button>*/}
      {/*                <CSVLink data={users} className="btn btn-sm bg-info text-black border-info mb-2" >Export csv</CSVLink>*/}
      {/*            </div> *!/*/}
      {/*  <table*/}
      {/*      className="table bg-white"*/}
      {/*      style={{ fontSize: "13px", marginLeft: "1px" }}*/}
      {/*  >*/}
      {/*    <thead*/}
      {/*        className="text-center shadow sticky-top "*/}
      {/*        style={{ backgroundColor: "#b4bec2", top: "60px", zIndex: "0" }}*/}
      {/*    >*/}
      {/*    <tr className="text-dark" style={{ border: "none" }}>*/}
      {/*      /!* <th scope="col">Select*/}
      {/*                            <div className="custom-control custom-checkbox">*/}
      {/*                                <input type="checkbox" className="custom-control-input" name="allSelect" onChange={(e) => select_all_function()} />*/}

      {/*                            </div>*/}
      {/*                        </th> *!/*/}
      {/*      <th>Bag ID</th>*/}
      {/*      <th>Bag Waybill</th>*/}
      {/*      <th>Bag Receive Date</th>*/}
      {/*      <th>Bag Creation Center</th>*/}
      {/*      <th>Bag Description</th>*/}
      {/*      <th>Bag Destination Center</th>*/}
      {/*      <th>Bag Receiver ID</th>*/}
      {/*      <th>Bag Creation Date</th>*/}
      {/*      <th>Number Of Packages In Bag</th>*/}
      {/*      <th>Total Value</th>*/}

      {/*      /!* <th>Print<button className="btn btn-sm bg-info text-black border-info mb-2" onClick={(e) => print_function(e)}>Print All</button> </th>*/}
      {/*                        <th>ex<CSVLink data={users} className="btn btn-sm bg-info text-black border-info mb-2" >Export csv</CSVLink></th> *!/*/}
      {/*    </tr>*/}
      {/*    </thead>*/}
      {/*    <tbody className="text-center border border-dark">*/}
      {/*    {returnbag.map((single_message, i) => {*/}
      {/*      return (*/}
      {/*          <>*/}
      {/*            {*/}
      {/*              <tr key={single_message.waybill_number}>*/}
      {/*                /!* <td data-title="Select">*/}
      {/*                                                <div className="custom-control custom-checkbox">*/}
      {/*                                                    <input type="checkbox" className="custom-control-input" checked={check_box_flag_state[i]} value={check_box_flag_state[i]} onChange={() => checkbox_click_function(i)} />*/}

      {/*                                                </div>*/}
      {/*                                            </td> *!/*/}

      {/*                <td data-title="WayBill Number">*/}
      {/*                  <button*/}
      {/*                      className="btn btn-outline-primary btn-sm me-2"*/}
      {/*                      onClick={(e) => {*/}
      {/*                        bagidclicked(i);*/}
      {/*                      }}*/}
      {/*                  >*/}
      {/*                    {single_message.baG_ID_NUMBER}*/}
      {/*                  </button>*/}
      {/*                </td>*/}

      {/*                <td data-title="Client Name">*/}
      {/*                  {single_message.baG_WAYBILL_NUMBER}*/}
      {/*                </td>*/}
      {/*                <td data-title=" Consignee Name">*/}
      {/*                  {single_message.baG_RECEIVE_DATE}*/}
      {/*                </td>*/}
      {/*                <td data-title="Product Details">*/}
      {/*                  {single_message.baG_CRATION_CENTER}*/}
      {/*                </td>*/}
      {/*                <td data-title="Dc Office Name" className="word-break">*/}
      {/*                  {single_message.baG_DESCRIPTION}*/}
      {/*                </td>*/}
      {/*                <td data-title="Pin Code">*/}
      {/*                  {single_message.baG_DESTINATION_CENTER}*/}
      {/*                </td>*/}
      {/*                <td data-title="Product Value">*/}
      {/*                  {single_message.baG_RECEIVER_ID}{" "}*/}
      {/*                </td>*/}
      {/*                <td data-title="Product Weight">*/}
      {/*                  {single_message.baG_CREATION_DATE}*/}
      {/*                </td>*/}
      {/*                <td data-title="product Status">*/}
      {/*                  {single_message.numbeR_OF_PACKAGES_IN_BAG}{" "}*/}
      {/*                </td>*/}
      {/*                <td data-title="product status datetime">*/}
      {/*                  {single_message.totaL_VALUE_OF_BAG}*/}
      {/*                </td>*/}
      {/*                /!* onClick ={ JsBarcode("#code128",single_message.waybill_number)}  *!/*/}
      {/*                /!* <td><button className="btn btn-sm bg-dark text-white border-dark mb-2"   >Print</button></td> *!/*/}
      {/*              </tr>*/}
      {/*            }*/}
      {/*          </>*/}
      {/*      );*/}
      {/*    })}*/}
      {/*    </tbody>*/}
      {/*  </table>*/}
      {/*</div>*/}

      <div id="no-more-tables">
        <div id="no-more-tables" className="mt-5 pt-4">
          <div className="row">
            <div className="col-lg-6 col-md-8 col-12 mb-3">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-12">
                  <p>Product Filter:</p>
                </div>
                <div className="col-lg-9 col-md-9 col-12">
                  <input
                    style={{
                      backgroundColor: "#C5D5E4",
                      outline: "none",
                      border: "none",
                      padding: "7px",
                      borderRadius: "8px",
                      width: "93%",
                    }}
                    type="text"
                    placeholder="Type here"
                    value={searchTerm1}
                    onChange={handleonChange1}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* <div className="col-sm-4 form-group m-2">
            <div className="input-group">
              Product Filter:
              <input
                type="text"
                className="form-control mx-2 shadow"
                placeholder="Type here......."
                value={searchTerm1}
                onChange={handleonChange1}
              />
            </div>
          </div> */}
          <ReactHTMLTableToExcel
            className="js-download-link button btn btn-info btn-sm px-4 mx-2 rounded-pill my-3"
            table="returnprocon"
            filename={`Report${getCurrentTime()}`}
            sheet="Sheet"
            buttonText="Export excel"
          />
          {/* <div className="">
                        <button className="btn btn-sm me-2 bg-info text-black border-info mb-2" onClick={(e) => print_function(e)}>Print All</button>
                        <CSVLink data={users} className="btn btn-sm bg-info text-black border-info mb-2" >Export csv</CSVLink>
                    </div> */}
          <table
            id="returnprocon"
            className="table bg-white"
            style={{ fontSize: "13px", marginLeft: "1px" }}
          >
            <thead
              className="text-center shadow sticky-top "
              style={{ backgroundColor: "#b4bec2", top: "60px", zIndex: "0" }}
            >
              <tr className="text-dark" style={{ border: "none" }}>
                {/* <th scope="col">Select
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" name="allSelect" onChange={(e) => select_all_function()} />

                                    </div>
                                </th> */}
                {/*<th> ID </th>*/}
                <th>WAYBILL</th>
                <th>REF. No.</th>

                <th> Name</th>
                <th> Details</th>
                <th>Consignee Name</th>
                <th>Address</th>
                <th>Area Code</th>
                <th>Contact Number</th>
                <th> Processing Status</th>
                <th> Processing Status DateTime</th>

                {/* <th>Print<button className="btn btn-sm bg-info text-black border-info mb-2" onClick={(e) => print_function(e)}>Print All</button> </th>
                                <th>ex<CSVLink data={users} className="btn btn-sm bg-info text-black border-info mb-2" >Export csv</CSVLink></th> */}
              </tr>
            </thead>
            <tbody className="text-center border border-dark">
              {/*{clickedbagflag &&*/}
              {/*    console.log(*/}
              {/*        "clicked bag products,",*/}
              {/*        clickedbag,*/}
              {/*        returnbag[clickedbag]*/}
              {/*    )}*/}

              {allproductlist &&
                allproductlist.map((single_message) => {
                  return (
                    <>
                      {
                        <tr key={single_message.waybill_number}>
                          {/* <td data-title="Select">
                                                        <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" checked={check_box_flag_state[i]} value={check_box_flag_state[i]} onChange={() => checkbox_click_function(i)} />

                                                        </div>
                                                    </td> */}

                          {/*<td data-title="WayBill Number">*/}
                          {/*  {single_message.producT_ID}*/}
                          {/*</td>*/}

                          <td data-title="Client Name">
                            {single_message.producT_WAYBILL_NUMBER}
                          </td>
                          <td data-title=" Consignee Name">
                            {single_message.referencE_NO}
                          </td>
                          <td data-title="Product Details">
                            {single_message.producT_NAME}
                          </td>
                          <td data-title="Dc Office Name">
                            {single_message.producT_DETAILS}
                          </td>
                          <td data-title="Pin Code">
                            {single_message.consigneE_NAME}
                          </td>
                          <td data-title="Product Value">
                            {single_message.address}{" "}
                          </td>
                          <td data-title="Product Value">
                            {single_message.areA_CODE}{" "}
                          </td>
                          <td data-title="Product Weight">
                            {single_message.contacT_NUMBER}
                          </td>
                          <td data-title="product Status">
                            {single_message.producT_PROCESSING_STATUS}{" "}
                          </td>
                          <td data-title="product status date">
                            {single_message.producT_PRODESSING_STATUS_DATETIME}
                          </td>
                          {/* onClick ={ JsBarcode("#code128",single_message.waybill_number)}  */}
                          {/* <td><button className="btn btn-sm bg-dark text-white border-dark mb-2"   >Print</button></td> */}
                        </tr>
                      }
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={modalproductIsOpen}
        style={customStyles1}
        onRequestClose={closeProductModal}
        closeTimeoutMS={200}
        contentLabel="Example Modal"
      >
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
          onClick={closeProductModal}
        >
          Cancel
        </button>
        <h4>Bag Products</h4>
        <div id="no-more-tables" className="mt-5 pt-4">
          <div className="row">
            <div className="col-lg-6 col-md-8 col-12 mb-3">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-12">
                  <p>Product Filter:</p>
                </div>
                <div className="col-lg-9 col-md-9 col-12">
                  <input
                    style={{
                      backgroundColor: "#C5D5E4",
                      outline: "none",
                      border: "none",
                      padding: "7px",
                      borderRadius: "8px",
                      width: "93%",
                    }}
                    type="text"
                    placeholder="Type here"
                    value={searchTerm1}
                    onChange={handleonChange1}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* <div className="col-sm-4 form-group m-2">
            <div className="input-group">
              Product Filter:
              <input
                type="text"
                className="form-control mx-2 shadow"
                placeholder="Type here......."
                value={searchTerm1}
                onChange={handleonChange1}
              />
            </div>
          </div> */}
          <ReactHTMLTableToExcel
            className="js-download-link button btn btn-info btn-sm px-4 mx-2 rounded-pill my-3"
            table="returnprocon"
            filename={`Report${getCurrentTime()}`}
            sheet="Sheet"
            buttonText="Export excel"
          />
          {/* <div className="">
                        <button className="btn btn-sm me-2 bg-info text-black border-info mb-2" onClick={(e) => print_function(e)}>Print All</button>
                        <CSVLink data={users} className="btn btn-sm bg-info text-black border-info mb-2" >Export csv</CSVLink>
                    </div> */}

          <table
            id="returnprocon"
            className="table bg-white"
            style={{ fontSize: "13px", marginLeft: "1px" }}
          >
            <thead
              className="text-center shadow sticky-top "
              style={{ backgroundColor: "#b4bec2", top: "60px", zIndex: "0" }}
            >
              <tr className="text-dark" style={{ border: "none" }}>
                {/* <th scope="col">Select
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" name="allSelect" onChange={(e) => select_all_function()} />

                                    </div>
                                </th> */}
                <th> ID </th>
                <th>WAYBILL</th>
                <th>REF. No.</th>

                <th> Name</th>
                <th> Details</th>
                <th>Consignee Name</th>
                <th>Address</th>
                <th>Area Code</th>
                <th>Contact Number</th>
                <th> Processing Status</th>
                <th> Processing Status DateTime</th>

                {/* <th>Print<button className="btn btn-sm bg-info text-black border-info mb-2" onClick={(e) => print_function(e)}>Print All</button> </th>
                                <th>ex<CSVLink data={users} className="btn btn-sm bg-info text-black border-info mb-2" >Export csv</CSVLink></th> */}
              </tr>
            </thead>
            <tbody className="text-center border border-dark">
              {clickedbagflag &&
                console.log(
                  "clicked bag products,",
                  clickedbag,
                  returnbag[clickedbag]
                )}

              {product &&
                product.map((single_message) => {
                  return (
                    <>
                      {
                        <tr key={single_message.waybill_number}>
                          {/* <td data-title="Select">
                                                        <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" checked={check_box_flag_state[i]} value={check_box_flag_state[i]} onChange={() => checkbox_click_function(i)} />

                                                        </div>
                                                    </td> */}

                          <td data-title="WayBill Number">
                            {single_message.producT_ID}
                          </td>

                          <td data-title="Client Name">
                            {single_message.producT_WAYBILL_NUMBER}
                          </td>
                          <td data-title=" Consignee Name">
                            {single_message.referencE_NO}
                          </td>
                          <td data-title="Product Details">
                            {single_message.producT_NAME}
                          </td>
                          <td data-title="Dc Office Name">
                            {single_message.producT_DETAILS}
                          </td>
                          <td data-title="Pin Code">
                            {single_message.consigneE_NAME}
                          </td>
                          <td data-title="Product Value">
                            {single_message.address}{" "}
                          </td>
                          <td data-title="Product Value">
                            {single_message.areA_CODE}{" "}
                          </td>
                          <td data-title="Product Weight">
                            {single_message.contacT_NUMBER}
                          </td>
                          <td data-title="product Status">
                            {single_message.producT_PROCESSING_STATUS}{" "}
                          </td>
                          <td data-title="product status date">
                            {single_message.producT_PRODESSING_STATUS_DATETIME}
                          </td>
                          {/* onClick ={ JsBarcode("#code128",single_message.waybill_number)}  */}
                          {/* <td><button className="btn btn-sm bg-dark text-white border-dark mb-2"   >Print</button></td> */}
                        </tr>
                      }
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  );
}
