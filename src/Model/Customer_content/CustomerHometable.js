import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./customermodel.css";
import { CSVLink, CSVDownload } from "react-csv";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import InfiniteScroll from "react-infinite-scroll-component";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Customerhometable = (props) => {
  const csvData = [
    [
      "Waybill",
      "reference no",
      "Consignee Name",
      "City",
      "State",
      "Address",
      "Pincode",
      "Areacode",
      "Phone",
      "Mobile",
      "Weight",
      "Payment Mode",
      "Package Amount",
      "Cod Amount",
      "Product to be Shipped",
      "Return Address",
      "Return Pin",
      "Seller Name",
      "Country",
      "Seller Address",
      "Country_code",
      "Seller CST No",
      "Seller TIN",
      "Invoice No",
      "Invoice Date",
      "Length",
      "Breadth",
      "Height",
      "Quantity",
      "Commodity Value",
      "Tax Value",
      "Category of Goods",
      "Sales Tax Form ack no",
      "Consignee TIN",
      "Shipping Client",
      "Seller_GST_TIN",
      "Client_GST_TIN",
      "Consignee_GST_TIN",
      "Invoice_Reference",
      "HSN_Code",
      "Return Reason",
      "Vendor Pickup Location",
      "EWBN",
      "Supply_Sub_Type",
      "Document_Type",
      "Document_Number",
      "Document_Date",
      "OD_Distance",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "p88",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
  ];
  let json_information = props.response;
  const [searchTerm, setSearchTerm] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);
  const [selectedMonth, setSelectedMonth] = React.useState("");
  const handleonChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const [currentCount,setCurrentCount] =useState({
    hold:0,
    delivered:0,
    returned:0,
    lost:0
  })
  const [prevCount,setPrevCount] =useState({
    hold:0,
    delivered:0,
    returned:0,
    lost:0
  })
  useEffect(()=>{

    const month =new Date().getMonth()
    const year =new Date().getYear()
    const users1 = json_information.message.holded_product_list.filter(
        (p) =>{
          let d = new Date( p.producT_PRODESSING_STATUS_DATETIME)
          if(d.getMonth()===month&& d.getYear()===year){
            return p
          }
        }

    );
    console.log("hold",users1)
    setCurrentCount(prev=>({...prev,hold:users1.length}))
    const users2 = json_information.message.delevered_product_list.filter(
        (p) =>{
          let d = new Date( p.producT_PRODESSING_STATUS_DATETIME)
          if(d.getMonth()===month&& d.getYear()===year){
            return p
          }
        }
    );
    setCurrentCount(prev=>({...prev,delivered:users2.length}))
    const users3 = json_information.message.returned_product_list.filter(
        (p) =>{
          let d = new Date( p.producT_PRODESSING_STATUS_DATETIME)
          if(d.getMonth()===month&& d.getYear()===year){
            return p
          }
        }
    );
    setCurrentCount(prev=>({...prev,returned:users3.length}))
    const users4 = json_information.message.lost_product_list.filter(
        (p) =>{
          let d = new Date( p.producT_PRODESSING_STATUS_DATETIME)
          if(d.getMonth()===month&& d.getYear()===year){
            return p
          }
        }
    );
    console.log("lost count",users1.length)
    setCurrentCount(prev=>({...prev,lost:users4.length}))

  },[])

  useEffect(()=>{
    const year =new Date(selectedMonth).getYear()
    const month =new Date(selectedMonth).getMonth()
    const users1 = json_information.message.holded_product_list.filter(
        (p) =>{
          let d = new Date( p.producT_PRODESSING_STATUS_DATETIME)
          if(d.getMonth()===month&& d.getYear()===year){
            return p
          }
        }

    );
    console.log("hold",users1)
    setPrevCount(prev=>({...prev,hold:users1.length}))
    const users2 = json_information.message.delevered_product_list.filter(
        (p) =>{
          let d = new Date( p.producT_PRODESSING_STATUS_DATETIME)
          if(d.getMonth()===month&& d.getYear()===year){
            return p
          }
        }
    );
    setPrevCount(prev=>({...prev,delivered:users2.length}))
    const users3 = json_information.message.returned_product_list.filter(
        (p) =>{
          let d = new Date( p.producT_PRODESSING_STATUS_DATETIME)
          if(d.getMonth()===month&& d.getYear()===year){
            return p
          }
        }
    );
    setPrevCount(prev=>({...prev,returned:users3.length}))
    const users4 = json_information.message.lost_product_list.filter(
        (p) =>{
          let d = new Date( p.producT_PRODESSING_STATUS_DATETIME)
          if(d.getMonth()===month&& d.getYear()===year){
            return p
          }
        }
    );
    console.log("lost count",users1.length)
    setPrevCount(prev=>({...prev,lost:users4.length}))

  },[selectedMonth])

  const searchIcon = <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>;
  React.useEffect(() => {

    const users1 = json_information.message.holded_product_list.filter(
        (p) =>
            p.ordeR_ID
                .toString()
                .toLowerCase()
                .includes(searchTerm.toString().toLowerCase()) ||
            p.waybilL_NUMBER
                .toString()
                .toLowerCase()
                .includes(searchTerm.toString().toLowerCase()) ||
            p.contacT_NUMBER
                .toString()
                .toLowerCase()
                .includes(searchTerm.toString().toLowerCase())
    );
    const users2 = json_information.message.delevered_product_list.filter(
        (p) =>
            p.ordeR_ID
                .toString()
                .toLowerCase()
                .includes(searchTerm.toString().toLowerCase()) ||
            p.waybilL_NUMBER
                .toString()
                .toLowerCase()
                .includes(searchTerm.toString().toLowerCase()) ||
            p.contacT_NUMBER
                .toString()
                .toLowerCase()
                .includes(searchTerm.toString().toLowerCase())
    );
    const users3 = json_information.message.returned_product_list.filter(
        (p) =>
            p.ordeR_ID
                .toString()
                .toLowerCase()
                .includes(searchTerm.toString().toLowerCase()) ||
            p.waybilL_NUMBER
                .toString()
                .toLowerCase()
                .includes(searchTerm.toString().toLowerCase()) ||
            p.contacT_NUMBER
                .toString()
                .toLowerCase()
                .includes(searchTerm.toString().toLowerCase())
    );
    const users4 = json_information.message.lost_product_list.filter(
        (p) =>
            p.ordeR_ID
                .toString()
                .toLowerCase()
                .includes(searchTerm.toString().toLowerCase()) ||
            p.waybilL_NUMBER
                .toString()
                .toLowerCase()
                .includes(searchTerm.toString().toLowerCase()) ||
            p.contacT_NUMBER
                .toString()
                .toLowerCase()
                .includes(searchTerm.toString().toLowerCase())
    );

    setSearchResults(users1.concat(users2).concat(users3).concat(users4));
  }, [searchTerm]);

  const percentage = 80;


  const [count, setCount] = useState({
    prev: 0,
    next: 10,
  });

  const [hasMore, setHasMore] = useState(true);
  const [current, setCurrent] = useState([]);

  useEffect(() => {
    let endpoint = 10;
    console.log("filterdata", searchResults);
    if (searchResults.length < 10) {
      endpoint = searchResults.length;
    }
    setTimeout(() => {
      setCurrent(searchResults.slice(0, endpoint));
    }, 1000);
    setCount({
      prev: 0,
      next: 10,
    });
    setHasMore(true);
  }, [searchResults]);

  useEffect(() => {
    console.log("current", current);
  }, [current]);

  const getMoreData = () => {
    if (current.length === searchResults.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setCurrent((prev) =>
          prev.concat(
              searchResults.slice(count.prev + 10, count.next + 10)
          )
      );
    }, 500);
    setCount((prevState) => ({
      prev: prevState.prev + 10,
      next: prevState.next + 10,
    }));
  };

  return (
      <>
        <div className="container">
          {/*  */}
          <div className="">
            <div className="row">
              <div
                  className="col-lg-9 col-md-6 col-12 rounded-2 "
                  style={{ background: "#C5D5E4" }}
              >
                <div className="row py-3 justify-content-center">
                  <div className="col-lg-2 col-md-6 col-12 d-flex justify-content-center">
                    <Example label="">
                      <CircularProgressbar
                          value={percentage}
                          text={`${percentage}%`}
                          background
                          backgroundPadding={6}
                          styles={buildStyles({
                            backgroundColor: "#414042",
                            textColor: "#fff",
                            pathColor: "#ffde17",
                            trailColor: "#58595B",
                          })}
                      />
                    </Example>
                  </div>
                  <div className="col-lg-5 col-md-12 col-12 my-3">
                    <div className="d-flex justify-content-between align-itens-center">
                      <span className="fw-bold m-0">Previous Month:</span>
                      <input
                          className="shadow"
                          style={{
                            width: "250px",
                            color: "white",
                            backgroundColor: "#6D6D6D",
                            outline: "none",
                            border: "none",
                            padding: "7px",
                            borderRadius: "8px",
                          }}
                          type="month"
                          name=""
                          id=""
                          onChange={e=>setSelectedMonth(e.target.value)}
                      />
                    </div>
                    <div className="mt-2">
                      <div className="d-flex justify-content-between my-1">
                        <div className="unattempted m-0"></div>
                        <span className="m-0 fw-bold">
                        Total Product Hold
                      </span>
                        <span className="m-0 fw-bold">{prevCount.hold}</span>
                      </div>
                      <div className="d-flex justify-content-between my-1">
                        <div className="Delivered m-0"></div>
                        <span className="m-0 fw-bold">
                        Total Product Delivered
                      </span>
                        <span className="m-0 fw-bold">{prevCount.delivered}</span>
                      </div>
                      <div className="d-flex justify-content-between my-1">
                        <div className="Lost m-0"></div>
                        <span className="m-0 fw-bold">Total Returned</span>
                        <span className="m-0 fw-bold">{prevCount.returned}</span>
                      </div>
                      {/* <div className="d-flex justify-content-between my-1">
                      <div className="Hold m-0"></div>
                      <span className="m-0 fw-bold">Total Hold</span>
                      <span className="m-0 fw-bold">{712}</span>
                    </div>
                    <div className="d-flex justify-content-between my-1">
                      <div className="Return m-0"></div>
                      <span className="m-0 fw-bold">Total Return</span>
                      <span className="m-0 fw-bold">{26}</span>
                    </div> */}
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-12 col-12 my-3">
                    <span className="fw-bold m-0">Current Month:</span>

                    <div className="mt-4">
                      <div className="d-flex justify-content-between my-1">
                        <div className="unattempted m-0"></div>
                        <span className="m-0 fw-bold">
                        Total Product Hold
                      </span>
                        <span className="m-0  fw-bold">{currentCount.hold}</span>
                      </div>
                      <div className="d-flex justify-content-between my-1">
                        <div className="Delivered m-0"></div>
                        <span className="m-0  fw-bold">
                        Total Product Delivered
                      </span>
                        <span className="m-0  fw-bold">{currentCount.delivered}</span>
                      </div>
                      <div className="d-flex justify-content-between my-1">
                        <div className="Lost m-0"></div>
                        <span className="m-0  fw-bold">Total Returned</span>
                        <span className="m-0 fw-bold">{currentCount.returned}</span>
                      </div>
                      {/* <div className="d-flex justify-content-between my-1">
                      <div className="Hold m-0"></div>
                      <span className="m-0  fw-bold">Total Hold</span>
                      <span className="m-0  fw-bold">{712}</span>
                    </div>
                    <div className="d-flex justify-content-between my-1">
                      <div className="Return m-0"></div>
                      <span className="m-0  fw-bold">Total Return</span>
                      <span className="m-0  fw-bold">{26}</span>
                    </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-12 ">
                <div className="row mt-2">
                  <div className="">
                    <input
                        style={{
                          backgroundColor: "#C5D5E4",
                          outline: "none",
                          border: "none",
                          padding: "7px",
                          borderRadius: "8px",
                          width: "100%",
                          // marginLeft: "10px",
                        }}
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleonChange}
                    />
                  </div>
                  {/* <div className="col-3">
                  <div className="d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-success btn-sm px-4 py-2 rounded-3"
                      // onClick={search}
                    >
                      Search
                    </button>
                  </div>
                </div> */}
                </div>
                <div className="row justify-content-center mt-3">
                  <div className="col-6  ">
                    <CSVLink
                        filename="Template.csv"
                        data={csvData}
                        className="btn btn-sm btn-success  fw-bold  rounded-3"
                    >
                      CSV Template
                    </CSVLink>
                  </div>
                  <div className="col-6 d-flex justify-content-end  ">
                    <CSVLink
                        data={searchResults}
                        filename={"Product.xls"}
                        className="btn btn-sm btn-dark px-3 fw-bold rounded-3"
                    >
                      Export csv
                    </CSVLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*  */}

          {/* <form className="row d-flex justify-content-center">
          <div className="col-lg-6 col-md-6 col-sm-4 form-group mx-3 mt-2 p-4">
            <div className="input-group  input-icons">
              <i className="icon ">{searchIcon}</i>
              <input
                type="search"
                name=""
                id=""
                placeholder="Search"
                className="rounded-pill px-5 py-2  input-field"
                style={{
                  width: "-webkit-fill-available",
                  textAlign: "start",
                  marginLeft: "15px",
                  boxShadow: "2px 3px 3px 1px #00000059",
                  outline: "none",
                  border: "none",
                }}
                value={searchTerm}
                onChange={handleonChange}
              />

            </div>
          </div>
        </form> */}
          {/*  */}
          {/* <div className="col-md-12 d-flex flex-row-reverse ">
          <CSVLink
            filename="Template.csv"
            data={csvData}
            className="btn btn-outline-primary  fw-bold px-4 rounded-pill"
          >
            CSV Template
          </CSVLink>
        </div>

        <div className="input-group  input-icons">
          <i className="icon ">{searchIcon}</i>
          <input
            type="search"
            name=""
            id=""
            placeholder="Search...."
            className="rounded-pill px-5 py-2  input-field"
            style={{
              width: "50%",
              //-webkit-fill-available
              textAlign: "start",
              marginLeft: "15px",
              boxShadow: "2px 3px 3px 1px #00000059",
              outline: "none",
              border: "none",
            }}
            value={searchTerm}
            onChange={handleonChange}
          />

        </div> */}
          {/* <input
                        type="text"
                        className="form-control mx-2 border-warning border"
                        placeholder="Type Waybill here......."
                        value={waybill}
                        onChange={handleonChange}
                      /> /}
                  {/ <div className="input-group-append"  value={searchTerm} onChange={handleonChange}>

                </div> */}
          {/*<div className="row n">*/}
          {/*    <div className="col-8 mx-5">*/}
          {/*        <div className="">*/}
          {/*            <form>*/}
          {/*                <div className="input-group">*/}
          {/*                    <input type="text" className="form-control mx-2" placeholder="Search......." value={searchTerm} onChange={handleonChange}/>*/}
          {/*                    <div className="input-group-append">*/}

          {/*                    </div>*/}
          {/*                </div>*/}
          {/*            </form>*/}
          {/*        </div>*/}
          {/*    </div>*/}
          {/*</div>*/}
          <InfiniteScroll
              dataLength={current.length}
              next={getMoreData}
              hasMore={hasMore}
              loader={
                <Box sx={{ width: "100%" }}>
                  <LinearProgress />
                </Box>
              }
              style={{ overflow: "visible" }}
          >

            {/*<Box sx={{ width: "100%" }}>
                  <LinearProgress />
                </Box>*/}

            <div>
              <div className="mt-3" id="no-more-tables">
                {/* <CSVLink
              data={searchResults}
              filename={"Product.csv"}
              className="btn btn-sm px-3 bg-info text-black border-info mb-2"
            >
              Export csv
            </CSVLink> */}
                <div className="row">
                  <div className="col-lg-6 col-md-8 col-12 mb-2">
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
                        placeholder="Filter waybills, Order ID, Contact"
                        value={searchTerm}
                        onChange={handleonChange}
                    />
                  </div>
                </div>

                <table
                    className="table css-serial bg-white"
                    style={{ fontSize: "13px", marginLeft: "1px" }}
                >
                  <thead
                      className="text-center shadow sticky-top "
                      style={{ backgroundColor: "#b4bec2", top: "60px", zIndex: "0" }}
                  >
                  <tr className="text-dark" style={{ border: "none" }}>
                    <th>SL</th>
                    <th>Waybill</th>
                    <th>Order Id</th>
                    <th>Product</th>
                    <th>Product Details</th>
                    <th>Consignee</th>
                    <th>Contact Number</th>
                    <th> Address</th>
                    <th> PinCode</th>
                    <th>Weight</th>
                    <th>Payment Mode</th>
                    <th>COD Amount</th>
                    <th>Product Value</th>
                    <th>Status</th>
                    <th>Date/Time</th>
                  </tr>
                  </thead>
                  <tbody className="text-center border border-dark">
                  {
                    //  json_information.message.delevered_product_list.map(single_message => {
                    //      return(
                    //          <tr key={single_message.ordeR_ID}>
                    //          <td></td>
                    //              <td>{single_message.ordeR_ID}</td>
                    //              <th scope="row">{single_message.producT_NAME}<br></br>
                    //              {single_message.producT_DETAILS}
                    //              </th>
                    //              <td>{single_message.consigneE_NAME}</td>
                    //              <td>{single_message.contacT_NUMBER}<br></br>
                    //              {single_message.address}<br></br>
                    //              {single_message.pincode}
                    //              </td>
                    //              <td>{single_message.producT_WEIGHT}</td>
                    //              <td>{single_message.producT_PAYMENT_TYPE}<br></br>
                    //              </td>
                    //              <td>
                    //                  {single_message.product_value} <br></br>
                    //                  {single_message.producT_VALUE}
                    //              </td>
                    //              <td>{single_message.producT_PROCESSING_STATUS}<br></br>
                    //                  {single_message.producT_PRODESSING_STATUS_DATETIME}
                    //              </td>
                    //          </tr>
                    //      )
                    //  })
                  }
                  {/*searchResults*/}

                  {current.map((single_message) => {
                    return (
                        <tr key={single_message.ordeR_ID}>
                          <td data-title="SL" className=""></td>
                          <td data-title="Waybill">
                            {single_message.waybilL_NUMBER}
                          </td>
                          <td data-title="Order Id">{single_message.ordeR_ID}</td>
                          <td data-title="Product" className="td-product-name">
                            {single_message.producT_NAME}
                          </td>
                          <td
                              data-title="Product Details"
                              className="td-product-details"
                          >
                            {single_message.producT_DETAILS}
                          </td>
                          <td data-title="Consignee">
                            {single_message.consigneE_NAME}
                          </td>
                          <td data-title="Contact Number">
                            {single_message.contacT_NUMBER}
                          </td>
                          <td data-title="Address" className="td-address">
                            {single_message.address}
                          </td>
                          <td data-title="PinCode">{single_message.pincode}</td>
                          <td data-title="Weight">
                            {single_message.producT_WEIGHT}
                          </td>
                          <td data-title="Payment Mode">
                            {single_message.producT_PAYMENT_TYPE}
                          </td>
                          <td data-title="COD Amount">
                            {single_message.producT_VALUE}{" "}
                          </td>
                          <td data-title="Product Value">
                            {single_message.producT_TOTAL}
                          </td>
                          <td data-title="Status">
                            {single_message.producT_PROCESSING_STATUS}
                          </td>
                          <td data-title="Date/Time">
                            {single_message.producT_PRODESSING_STATUS_DATETIME}
                          </td>
                        </tr>
                    );
                  })}

                  {/* {
                                            json_information.message.returned_product_list.map(single_message => {
                                                return(
                                                    <tr key={single_message.ordeR_ID}>
                                                    <td></td>
                                                        <td>{single_message.ordeR_ID}</td>

                                                        <th scope="row">{single_message.producT_NAME}<br></br>
                                                        {single_message.producT_DETAILS}
                                                        </th>

                                                        <td>{single_message.consigneE_NAME}</td>

                                                        <td>{single_message.contacT_NUMBER}<br></br>
                                                        {single_message.address}<br></br>
                                                        {single_message.pincode}
                                                        </td>

                                                        <td>{single_message.producT_WEIGHT}</td>

                                                        <td>{single_message.producT_PAYMENT_TYPE}<br></br>

                                                        </td>
                                                        <td>
                                                            {single_message.product_value} <br></br>
                                                            {single_message.producT_VALUE}
                                                        </td>

                                                        <td>{single_message.producT_PROCESSING_STATUS}<br></br>
                                                            {single_message.producT_PRODESSING_STATUS_DATETIME}
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                    } */}

                  {/* {

                                        json_information.message.lost_product_list.map(single_message => {

                                            return(
                                                <tr key={single_message.ordeR_ID}>
                                                <td></td>
                                                    <td>{single_message.ordeR_ID}</td>

                                                    <th scope="row">{single_message.producT_NAME}<br></br>
                                                    {single_message.producT_DETAILS}
                                                    </th>

                                                    <td>{single_message.consigneE_NAME}</td>

                                                    <td>{single_message.contacT_NUMBER}<br></br>
                                                    {single_message.address}<br></br>
                                                    {single_message.pincode}
                                                    </td>

                                                    <td>{single_message.producT_WEIGHT}</td>

                                                    <td>{single_message.producT_PAYMENT_TYPE}<br></br>

                                                    </td>
                                                    <td>
                                                        {single_message.product_value} <br></br>
                                                        {single_message.producT_VALUE}
                                                    </td>

                                                    <td>{single_message.producT_PROCESSING_STATUS}<br></br>
                                                        {single_message.producT_PRODESSING_STATUS_DATETIME}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    } */}
                  </tbody>
                </table>
              </div>
            </div>




          </InfiniteScroll>

        </div>
      </>
  );
};
export default Customerhometable;

function Example(props) {
  return (
      <div style={{ marginBottom: "" }}>
        <div style={{ marginTop: 30, display: "flex" }}>
          <div style={{ width: "100%" }}>{props.children}</div>
          {/* <div style={{ width: "70%" }}>
          <h3 className="h5">{props.label}</h3>
          <p>{props.description}</p>
        </div> */}
        </div>
      </div>
  );
}
