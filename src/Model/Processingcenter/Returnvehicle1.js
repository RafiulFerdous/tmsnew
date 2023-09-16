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
const html2canvas: any = _html2canvas;
const Returnvehicle1 = (props) => {
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
    setnameplate(namplate);
    setdrivername(drivername);
    setdrivercontact(drivercontact);
    setdest(dest);
    setdt(dt);
    setbag(bag);
    setwaybill(waybill);

    const opt = {
      scale: 4,
    };
    const elem = wrapper_ref.current;
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
                height:40vh;
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
    //  BarCode(waybil);
  };
  return (
    <>
      <div className="container-fluid mt-5">
        <div>
          <button
            className="js-download-link button bg-success border-success text-white btn-sm "
            onClick={() => pdfGenerate()}
          >
            Download
          </button>
          <div>
            <table className="table table-hover mt-2" id="tableq">
              <thead className="bg-dark">
                <tr className="text-white">
                  <th scope="col">
                    Vehicle Number<br></br>Driver Name <br></br>
                    Contact Number
                  </th>

                  <th scope="col">
                    Destination Address<br></br>Date Time
                  </th>

                  <th scope="col">
                    Bag Waybill List<br></br>Total Bag
                  </th>
                  <th scope="col">Print</th>
                </tr>
              </thead>

              {json_information.message.all_vehicles.map((single_message) => {
                return (
                  <tr key={single_message.departurE_TIME}>
                    <td>
                      {single_message.vehicalE_NAMEPLATE}
                      <br></br>
                      {single_message.driveR_NAME}
                      <br></br>
                      {single_message.driveR_CONTACT_NUMBER}
                    </td>
                    <td>
                      {single_message.vehiclE_DESTINATION_CENTER}
                      <br></br>
                      {single_message.departurE_TIME}
                    </td>
                    <td>
                      {single_message.baG_WAYBILL_LIST}
                      <br></br>
                      {single_message.numbeR_OF_BAGS}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm bg-dark text-white border-dark mb-2"
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
              })}
            </table>
          </div>
        </div>
        <div className="invoice" ref={wrapper_ref}>
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
              <p>
                {waybill}
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
    </>
  );
};

export default Returnvehicle1;
