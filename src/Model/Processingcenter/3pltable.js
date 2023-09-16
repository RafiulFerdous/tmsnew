import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./modal.css";
import { useHistory } from "react-router";
import { SearchContext } from "../../Context/searchContext";
import { SearchButtonContext } from "../../Context/buttonContext";
import { BrowserRouter, Link } from "react-router-dom";
import jsPDF from "jspdf";
import * as _html2canvas from "html2canvas";
const html2canvas: any = _html2canvas;
const Pltable = (props) => {
  let baglist = props.response.message.all_3pl_bag_list;
  console.log("#pl data", props.response);
  const pdfGenerate = () => {
    const doc = new jsPDF("portrait", "px", "a4");
    doc.autoTable({ html: "#tablePDF" });
    doc.save("Vehicle.pdf");
  };
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
  // print label fro
  const [nameplate, setnameplate] = React.useState("");
  const [drivername, setdrivername] = React.useState("");
  const [drivercontact, setdrivercontact] = React.useState("");
  const [dest, setdest] = React.useState("");
  const [dt, setdt] = React.useState("");
  const [waybill, setwaybill] = React.useState("");
  const [bag, setbag] = React.useState("");
  const wrapper_ref = React.useRef();
  const clickme = (e, waybill, bag, dest, dt) => {
    // setnameplate(namplate);
    // setdrivername(drivername);
    // setdrivercontact(drivercontact);
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
      <div id="no-more-tables">
        <div>
          <button
            className="js-download-link button bg-success border-success text-white btn-sm mb-3"
            onClick={() => pdfGenerate()}
          >
            Download
          </button>
        </div>
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
              <th scope="col">WayBill </th>
              <th scope="col">ID </th>

              <th scope="col">Description</th>
              <th scope="col">Package Number </th>
              <th scope="col">COD </th>
              <th scope="col">Bag Creation Center</th>
              <th scope="col">Bag Creation Date</th>
              <th scope="col">Bag Dest. Center</th>
              <th scope="col">Bag VEHICLE ID</th>
              <th scope="col">Created Employee ID</th>
              <th>Print</th>
            </tr>
          </thead>
          <tbody className="text-center border border-dark">
            {baglist.map((single_message) => {
              console.log(single_message);
              return (
                <tr
                  key={
                    single_message.baG_ID_NUMBER
                  } /*onClick={()=>bag_row_clicked_function(single_message.baG_ID_NUMBER)}*/
                >
                  <td data-title="WayBill">
                    {single_message.baG_WAYBILL_NUMBER}
                  </td>
                  <td data-title="ID">{single_message.baG_ID_NUMBER}</td>
                  <td data-title="Description">
                    {single_message.baG_DESCRIPTION}{" "}
                  </td>
                  <td data-title="Package Number">
                    {single_message.numbeR_OF_PACKAGES_IN_BAG}
                  </td>
                  <td data-title="COD">{single_message.totaL_VALUE_OF_BAG}</td>
                  <td data-title="Bag Creation Center">
                    {single_message.baG_CRATION_CENTER}
                  </td>
                  <td data-title="Bag Creation Date">
                    {single_message.baG_CREATION_DATE}
                  </td>
                  <td data-title="Bag Dest. Center">
                    {single_message.baG_DESTINATION_CENTER}
                  </td>
                  <td data-title="Bag VEHICLE ID">
                    {single_message.baG_VEHICLE_ID}
                  </td>
                  <td data-title="Created Employee ID">
                    {single_message.baG_CREATED_BY}
                  </td>
                  <td data-title="Print">
                    <button
                      className="btn btn-sm bg-dark text-white border-dark mb-2"
                      onClick={(e) => {
                        clickme(
                          e,
                          single_message.baG_WAYBILL_NUMBER,
                          single_message.numbeR_OF_PACKAGES_IN_BAG,
                          single_message.baG_DESTINATION_CENTER,
                          single_message.baG_CREATION_DATE
                        );
                      }}
                    >
                      Print
                    </button>
                  </td>

                  {/* <td><button className="btn btn-sm bg-dark text-white border-dark mb-2" onClick={(e)=> {clickme(e,single_message.baG_WAYBILL_NUMBER,single_message.baG_ID_NUMBER,single_message.baG_CRATION_CENTER,single_message.baG_CREATION_DATE,single_message.baG_DESTINATION_CENTER,single_message.totaL_VALUE_OF_BAG,single_message.numbeR_OF_PACKAGES_IN_BAG)}}  >Generate</button></td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* <div className="border border-primary d">
                                  <h3 className="text-center">3-PL Vehicle Creation</h3>
                                  <div className="container p-3">
                                      <form>
                                            <div className="form-group row mb-2">
                                                    <label htmlFor className="col-sm-3 col-form-label"> Vehicle Creation Address:</label>
                                                    <div className="col-sm-6">
                                                    <p className="border border-light bg-light">Tongi-PC</p>
                                                    </div>
                                                </div>
                                            <div className="form-group row mb-2">
                                              <label htmlFor className="col-sm-3 col-form-label">Company Name:</label>
                                              <div className="col-sm-6">
                                                  <input type="text" className="form-control" placeholder="" required/>
                                              </div>
                                          </div>
                                          <div className="form-group row mb-2">
                                              <label htmlFor className="col-sm-3 col-form-label">Booking Number:</label>
                                              <div className="col-sm-6">
                                                  <input type="text" className="form-control" placeholder="" required/>
                                              </div>
                                          </div>
                                          <div className="form-group row mb-2">
                                              <label htmlFor className="col-sm-3 col-form-label">Destination Address:</label>
                                              <div className="col-sm-6">
                                                  <input type="text" className="form-control" placeholder="" required/>
                                              </div>
                                          </div>
                                          <div className="form-group row mb-2">
                                              <label htmlFor className="col-sm-3 col-form-label">Bag Waybill Number: </label>
                                              <div className="col-sm-6">
                                                  <input type="text" className="form-control" placeholder="" required/>
                                              </div>
                                          </div>
                                          <div className="form-group row mb-2">
                                              <label htmlFor className="col-sm-3 col-form-label">Bag Seal Number: </label>
                                              <div className="col-sm-6">
                                                  <input type="text" className="form-control" placeholder="" required/>
                                              </div>
                                          </div>
                                          <div className="form-group row mb-2">
                                              <label htmlFor className="col-sm-3 col-form-label">Bag Create Employe ID:</label>
                                              <div className="col-sm-6">
                                              <p className="border border-light bg-light">101</p>
                                              </div>
                                          </div>
                                          <div className="row">
                                              <div className="col-12 d-flex justify-content-center text-align-center">
                                                  <button className="btn btn-primary  mb-3 ">Submit</button>
                                              </div>
                                          </div>
                                      </form>
                                  </div>
                              </div>
                              <div>

                {
                    //ei jaygay bag creation er form ta silo.......................
                }
                <div className="container" id="tablebag">
                    <div>
                        <div>
                            <table className="table table-hover">
                                <thead className="bg-dark">
                                    <tr className="text-white">
                                    <th scope="col">Company Name</th>
                                    <th scope="col">Booking Number</th>
                                    <th scope="col">Destination Adress</th>
                                    <th scope="col">Bag Waybill Number<br></br>Bag Seal Number</th>
                                    <th scope="col">Date And Time</th>
                                    <th scope="col">Employee ID<br></br> Creation Address</th>
                                    </tr>
                                </thead>
                                    <tbody>
                                        <tr>
                                            <td>E-Desh Limited</td>
                                            <td>ss-321233</td>
                                            <td>Banani</td>
                                            <td>11123000001<br></br>321</td>
                                            <td>12-8-21 11.30am</td>
                                            <td>101<br></br>Tongi-PC</td>
                                        </tr>
                                    </tbody>
                             </table>
                            </div>
                        </div>
                    </div>
            </div> */}
      <div className="invoice mt-5 w-100" ref={wrapper_ref}>
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

            {/* <div className="from-invoice">

                            <p>Driver Details:</p>
                            <h6>{nameplate}</h6>
                            <h6>{drivername}</h6>
                            <h6>{drivercontact}</h6>

                        </div> */}
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
            <b>Disclaimer:</b> Please Do not accept Delivery.<br></br>If Packing
            Is Torn
          </p>
          <p className="text-center">
            <b>E-Desh LTD</b>
          </p>
        </div>
      </div>
    </>
  );
};
export default Pltable;
