import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./modal.css";
import { useHistory } from "react-router";
import { SearchContext } from "../../Context/searchContext";
import { SearchButtonContext } from "../../Context/buttonContext";
import { BrowserRouter, Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

// import BarcodeScannerComponent from "react-qr-barcode-scanner";
import * as _html2canvas from "html2canvas";
import reactDom from "react-dom";
const html2canvas: any = _html2canvas;
const Vehicle1dc = (props) => {
  //new code for search in Pickup Request page...........
  var { searchInformation, setsearchInformation } = useContext(SearchContext);
  var { searchButtonInformation, setsearchButtonInformation } =
    useContext(SearchButtonContext);
  if (searchButtonInformation) {
    //search button click korar pore ki hobe...........
    setsearchInformation("");
    setsearchButtonInformation(false);
  }
  //code end for search in Pickup Request page.............
  let json_information = props.response;
  console.log("vehicle1 props", json_information);
  const pdfGenerate = () => {
    const doc = new jsPDF("portrait", "px", "a4");
    doc.autoTable({ html: "#tableq" });
    doc.save("Vehicle.pdf");
  };
  const [nameplate, setnameplate] = React.useState("");
  const [drivername, setdrivername] = React.useState("");
  const [drivercontact, setdrivercontact] = React.useState("");
  const [dest, setdest] = React.useState("");
  const [dt, setdt] = React.useState("");
  const [waybill, setwaybill] = React.useState("");
  const [bag, setbag] = React.useState("");
  const wrapper_ref = React.useRef();
  const clickme = (
    e,
    namplate,
    drivername,
    drivercontact,
    dest,
    dt,
    bag,
    waybill
  ) => {
    // setnameplate(namplate);
    // setdrivername(drivername);
    // setdrivercontact(drivercontact);
    // setdest(dest);
    // setdt(dt);
    // setbag(bag);
    // setwaybill(waybill)

    reactDom.render(
      <PafContent
        nameplate={namplate}
        drivername={drivername}
        drivercontact={drivercontact}
        dest={dest}
        dt={dt}
        bag={bag}
        waybill={waybill}
      ></PafContent>,
      document.getElementById("label")
    );

    //
    // const opt = {
    //     scale: 4
    // }
    // const elem = wrapper_ref.current;
    //  html2canvas(elem, opt).then(canvas => {
    //     const iframe = document.createElement('iframe')
    //     iframe.name = 'printf'
    //     iframe.id = 'printf'
    //     iframe.height = 0;
    //     iframe.width = 0;
    //     document.body.appendChild(iframe)
    //
    //     console.log("inside single print : ",canvas);
    //
    //     const imgUrl = canvas.toDataURL({
    //         format: 'jpeg',
    //         quality: '1.0'
    //     })
    //
    //     const style=`
    //         height:40vh;
    //         width:100vw;
    //         position:absolute;
    //         left:0:
    //         top:0;
    //     `;
    //
    //     // const style=`
    //     //     display: block;
    //     //     margin-left: auto;
    //     //     margin-right: auto;
    //     //     width: 100%;
    //     //     `;
    //
    //     const url = `<img style="${style}" src="${imgUrl}"/>`;
    //     var newWin = window.frames["printf"];
    //     newWin.document.write(`<body onload="window.print()">${url}</body>`);
    //     newWin.document.close();
    //
    //
    // });
    // //  BarCode(waybil);

    const opt = {
      scale: 4,
    };
    // const elem = wrapper_ref.current;
    const elem = document.getElementById("baglabel");
    html2canvas(elem, opt).then((canvas) => {
      const iframe = document.createElement("iframe");
      iframe.name = "printf";
      iframe.id = "printf";
      iframe.height = 0;
      iframe.width = 0;
      document.body.appendChild(iframe);

      console.log("inside single print : ", canvas);

      const imgUrl = canvas.toDataURL({
        format: "jpeg",
        quality: "1.0",
      });

      const style = `
            height:100vh;
            width:100vw;
            position:absolute;
            left:0:
            top:0;
        `;

      // const style=`
      //     display: block;
      //     margin-left: auto;
      //     margin-right: auto;
      //     width: 100%;
      //     `;

      const url = `<img style="${style}" src="${imgUrl}"/>`;
      var newWin = window.frames["printf"];
      newWin.document.write(`<body onload="window.print()">${url}</body>`);
      newWin.document.close();
    });
    reactDom.unmountComponentAtNode(document.getElementById("label"));
    //  BarCode(waybil);
  };

  const PafContent = ({
    nameplate,
    drivername,
    dest,
    drivercontact,
    dt,
    bag,
    waybill,
  }) => {
    return (
      <div className="invoice" id="baglabel" ref={wrapper_ref}>
        <div className="invoice-logo">
          <img className="d-block w-25" src="/images/e_desh_logo.png"></img>
        </div>
        <div className="invoice-sec-1">
          <div className="invoice-sec-1-ref">
            <div className="ref-no">
              {/* <p>
                    Bag ID No: <span >{bag}</span>
                </p> */}
            </div>
            <div className="invoice-sec-1-date">
              {/* <p>
                Creation Date: <span>{creationdate}</span>
                </p> */}
            </div>

            <div className="from-invoice">
              <p>Driver Details:</p>
              <h6>{nameplate}</h6>
              <h6>{drivername}</h6>
              <h6>{drivercontact}</h6>
            </div>
          </div>
          <div className="to-invoice">
            <p>Destination:</p>
            <h6>{dest}</h6>
            <h6>{dt}</h6>
            <br></br>
            <h6>Total Number Of Bags: {bag}</h6>
          </div>
        </div>
        <div className="">
          <div className="">
            <p>
              Waybill List:<br></br>{" "}
            </p>
            {console.log("waybil list", waybill)}
            <p>
              {waybill &&
                waybill.map((single_bag) => (
                  <p>
                    {single_bag.dc_name}
                    <br />
                    BagNumber{single_bag.total_count}
                    <br />
                    {single_bag.bag_waybill_list.map((bag) => bag)}
                  </p>
                ))}
              <br></br>
            </p>
          </div>
        </div>

        <div className="invoice-declaration">
          <p></p>
        </div>
        <div className="invoice-greeting">
          <p className="text-center">
            <b>Disclaimer:</b> Please Do not accept Delivery.<br></br>If Packing
            Is Torn
          </p>
          <p className="text-center">
            <b>E-Desh LTD</b>
          </p>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="container mt-5">
        <div>
          <button
            className="js-download-link button bg-success border-success text-white btn-sm mb-3"
            onClick={() => pdfGenerate()}
          >
            Download
          </button>
          <div id="no-more-tables">
            <table
              className="table bg-white"
              style={{ fontSize: "13px", marginLeft: "1px" }}
              id="tablePDF"
            >
              <thead
                className="text-center shadow sticky-top "
                style={{ backgroundColor: "#b4bec2", top: "60px", zIndex: "0" }}
              >
                <tr className="text-dark" style={{ border: "none" }}>
                  <th rowSpan={2}>
                    Vehicle Number<br></br>Driver Name <br></br>
                    Contact Number
                  </th>

                  <th rowSpan={2}>
                    Destination Address<br></br>Date And Time
                  </th>
                  <th colSpan={3}>Bag Waybill List</th>
                  <th rowSpan={2}>Total Bag</th>
                  <th rowSpan={2}>Print</th>
                </tr>
                <tr className="text-dark" style={{ border: "none" }}>
                  <th>DC Name</th>
                  <th>Bag Number</th>
                  <th> Waybill </th>
                </tr>
              </thead>
              <tbody className="text-center border border-dark">
                {json_information &&
                  json_information.message.all_vehicles.map(
                    (single_message) => {
                      return (
                        <tr key={single_message.departurE_TIME}>
                          <td data-title="Vehicle & Driver & Number">
                            {single_message.vehicalE_NAMEPLATE}
                            <br></br>
                            {single_message.driveR_NAME}
                            <br></br>
                            {single_message.driveR_CONTACT_NUMBER}
                          </td>
                          <td data-title="Des Address & Date">
                            {single_message.vehiclE_DESTINATION_CENTER}
                            <br></br>
                            {single_message.departurE_TIME}
                          </td>
                          <>
                            <td data-title="DC Name" className="h-100">
                              {single_message.baG_WAYBILL_LIST.map(
                                (single_bag) => (
                                  <p className="" style={{ width: "200px" }}>
                                    {single_bag.dc_name}
                                  </p>
                                )
                              )}
                            </td>
                            <td data-title="Bag Number" className="h-100">
                              {single_message.baG_WAYBILL_LIST.map(
                                (single_bag) => (
                                  <p>{single_bag.total_count}</p>
                                )
                              )}
                            </td>
                            <td data-title="Waybill" className="h-100">
                              {single_message.baG_WAYBILL_LIST.map(
                                (single_bag) => (
                                  <p>
                                    {single_bag.bag_waybill_list.map(
                                      (bag) => bag
                                    )}
                                  </p>
                                )
                              )}
                            </td>
                          </>

                          {/* {single_message.baG_WAYBILL_LIST.map((single_bag) => (
                            <td>{single_bag.dc_name}</td>
                          ))}
                          {single_message.baG_WAYBILL_LIST.map((single_bag) => (
                            <td>{single_bag.total_count}</td>
                          ))}
                          {single_message.baG_WAYBILL_LIST.map((single_bag) => (
                            <td>
                              {single_bag.bag_waybill_list.map((bag) => bag)}
                            </td>
                          ))} */}
                          {/* <td
                            data-title="Bag Waybill List"
                            className="word-break h-100"
                          >
                            {single_message.baG_WAYBILL_LIST.map(
                              (single_bag) => (
                                <p>
                                  {single_bag.dc_name}
                                  <br />
                                  BagNumber{single_bag.total_count}
                                  <br />
                                  {single_bag.bag_waybill_list.map(
                                    (bag) => bag
                                  )}
                                </p>
                              )
                            )}
                          </td> */}
                          <td data-title="Total Bag">
                            {single_message.numbeR_OF_BAGS}
                          </td>
                          <td data-title="Print">
                            <button
                              className="btn btn-sm px-5 bg-dark text-white border-dark mb-2"
                              onClick={(e) => {
                                clickme(
                                  e,
                                  single_message.vehicalE_NAMEPLATE,
                                  single_message.driveR_NAME,
                                  single_message.driveR_CONTACT_NUMBER,
                                  single_message.vehiclE_DESTINATION_CENTER,
                                  single_message.departurE_TIME,
                                  single_message.numbeR_OF_BAGS,
                                  single_message.baG_WAYBILL_LIST
                                );
                              }}
                            >
                              Print
                            </button>
                          </td>
                        </tr>
                      );
                    }
                  )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="invoice w-100 mt-5" ref={wrapper_ref}>
          <div className="invoice-logo">
            <img className="d-block w-25" src="/images/e_desh_logo.png"></img>
          </div>
          <div className="invoice-sec-1">
            <div className="invoice-sec-1-ref">
              <div className="ref-no">
                {/* <p>
                                        Bag ID No: <span >{bag}</span>
                                    </p> */}
              </div>
              <div className="invoice-sec-1-date">
                {/* <p>
                                    Creation Date: <span>{creationdate}</span>
                                    </p> */}
              </div>

              <div className="from-invoice">
                <p>Driver Details:</p>
                <h6>{nameplate}</h6>
                <h6>{drivername}</h6>
                <h6>{drivercontact}</h6>
              </div>
            </div>
            <div className="to-invoice">
              <p>Destination:</p>
              <h6>{dest}</h6>
              <h6>{dt}</h6>
              <br></br>
              <h6>Total Number Of Bags: {bag}</h6>
            </div>
          </div>
          <div className="">
            <div className="">
              <p>
                Waybill List:<br></br>{" "}
              </p>
              {console.log("waybil list", waybill)}
              <p>
                {waybill &&
                  waybill.map((single_bag) => (
                    <p>
                      {single_bag.dc_name}
                      <br />
                      BagNumber{single_bag.total_count}
                      <br />
                      {single_bag.bag_waybill_list.map((bag) => bag)}
                    </p>
                  ))}
                <br></br>
              </p>
            </div>
          </div>

          <div className="invoice-declaration">
            <p></p>
          </div>
          <div className="invoice-greeting">
            <p className="text-center">
              <b>Disclaimer:</b> Please Do not accept Delivery.<br></br>If
              Packing Is Torn
            </p>
            <p className="text-center">
              <b>E-Desh LTD</b>
            </p>
          </div>
        </div>
      </div>

      <div id="label"></div>
    </>
  );
};

export default Vehicle1dc;
