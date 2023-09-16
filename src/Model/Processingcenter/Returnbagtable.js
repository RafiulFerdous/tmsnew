import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./modal.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { SearchContext } from "../../Context/searchContext";
import { SearchButtonContext } from "../../Context/buttonContext";
import BarCode, { useBarcode } from "react-barcode";
import { jsPDF } from "jspdf";

// import BarcodeScannerComponent from "react-qr-barcode-scanner";
import * as _html2canvas from "html2canvas";
const html2canvas: any = _html2canvas;

export const Returnbagtable = (props) => {
  let json_table = props.response;

  //code start for clicking Bag Table Row.
  let history = useHistory();
  const [bagID, setbagID] = useState(-5);
  /*
    let bag_row_clicked_function = (bag_id_number)=>{
        setbagID(bag_id_number);
    }

    
    useEffect(()=>{
        if(bagID>0)
            history.push("/product",bagID);
    },[bagID])
    */
  //code start for clicking Bag Table Row.

  //new code for search in home page...........
  var { searchInformation, setsearchInformation } = useContext(SearchContext);
  var { searchButtonInformation, setsearchButtonInformation } =
      useContext(SearchButtonContext);
  if (searchButtonInformation) {
    //search button click korar pore ki hobe...........
    setsearchInformation("");
    setsearchButtonInformation(false);
  }
  //code end for search in home page.............
  const [wayBill, setwayBill] = React.useState("");
  const [bag, setbag] = React.useState("");
  const [From, setFrom] = React.useState("");
  const [creationdate, setcreationdate] = React.useState("");
  const [To, setTo] = React.useState("");
  const [ProductValue, setProductvalue] = React.useState("");
  const [pac, setpac] = React.useState("");
  const wrapper_ref = React.useRef();

  const clickme = (e, waybil, bagid, from, date, to, value, total) => {
    setwayBill(waybil);
    setbag(bagid);
    setFrom(from);
    setcreationdate(date);
    setTo(to);
    setProductvalue(value);
    setpac(total);

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
    //  BarCode(waybil);
  };

  return (
      <div>
        {
          //ei jaygay bag creation er form ta silo.......................
        }
        <div className="container mt-5" id="tablebag">
          <div>
            <div id="no-more-tables">
              <table
                  className="table bg-white"
                  style={{ fontSize: "13px", marginLeft: "1px" }}
              >
                <thead
                    className="text-center shadow sticky-top "
                    style={{ backgroundColor: "#b4bec2", top: "60px", zIndex: "0" }}
                >
                <tr className="text-dark" style={{ border: "none" }}>
                  <th scope="col">
                    WayBill<br></br>ID{" "}
                  </th>
                  <th scope="col">
                    DC ID <br></br>
                    Description
                  </th>
                  <th scope="col">
                    Package Number<br></br>
                    COD{" "}
                  </th>
                  <th scope="col">
                    Bag-Creation Center<br></br>
                    Bag-Creation Date<br></br>
                    Bag-Destination Center
                  </th>
                  <th scope="col">Created Employee ID</th>
                  <th></th>
                </tr>
                </thead>
                <tbody className="text-center border border-dark">
                {json_table.map((single_message) => {
                  console.log(single_message);
                  return (
                      <tr
                          key={
                            single_message.baG_ID_NUMBER
                          } /*onClick={()=>bag_row_clicked_function(single_message.baG_ID_NUMBER)}*/
                      >
                        <td>
                          {single_message.baG_WAYBILL_NUMBER}
                          <br></br>
                          {single_message.baG_ID_NUMBER}{" "}
                        </td>
                        <td>
                          {single_message.baG_RECEIVER_ID}
                          <br></br>
                          {single_message.baG_DESCRIPTION}
                        </td>
                        <td>
                          {single_message.numbeR_OF_PACKAGES_IN_BAG}
                          <br></br>
                          {single_message.totaL_VALUE_OF_BAG}
                        </td>
                        <td>
                          {single_message.baG_CRATION_CENTER}
                          <br></br>
                          {single_message.baG_CREATION_DATE}
                          <br></br>
                          {single_message.baG_DESTINATION_CENTER}
                        </td>
                        <td>
                          <Link
                              to={{
                                pathname: "/productreturn",
                                state: {
                                  fromNotifications: single_message.baG_ID_NUMBER,
                                  returnway: single_message.baG_WAYBILL_NUMBER,
                                },
                              }}
                          >
                            {single_message.baG_CREATED_BY}
                          </Link>
                        </td>
                        <td>
                          <button
                              className="btn btn-sm bg-dark text-white border-dark mb-2"
                              onClick={(e) => {
                                clickme(
                                    e,
                                    single_message.baG_WAYBILL_NUMBER,
                                    single_message.baG_ID_NUMBER,
                                    single_message.baG_CRATION_CENTER,
                                    single_message.baG_CREATION_DATE,
                                    single_message.baG_DESTINATION_CENTER,
                                    single_message.totaL_VALUE_OF_BAG,
                                    single_message.numbeR_OF_PACKAGES_IN_BAG
                                );
                              }}
                          >
                            Generate
                          </button>
                        </td>
                      </tr>
                  );
                })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="invoice mt-4" ref={wrapper_ref}>
          <div className="invoice-logo">
            <img className="d-block w-25" src="/images/e_desh_logo.png"></img>
          </div>
          <div className="invoice-sec-1">
            <div className="invoice-sec-1-ref">
              <div className="ref-no">
                <p>
                  Bag ID No: <span>{bag}</span>
                </p>
              </div>
              <div className="invoice-sec-1-date">
                <p>
                  Creation Date: <span>{creationdate}</span>
                </p>
              </div>

              <div className="from-invoice">
                <p>From:</p>
                <h6>{From}</h6>
                <h6>{creationdate}</h6>
              </div>
            </div>
            <div className="to-invoice">
              <p>To:</p>
              <h6>{To}</h6>
              <h6>Product Value: {ProductValue}</h6>
              <h6>Total Number Of Packages: {pac}</h6>
            </div>
          </div>
          {/* <div className="invoice-banner">
                                <div className="banner-d">
                                    <p>Target-DC: {dc}<br></br>COD Amount: {cod}</p>
                                </div>
                                </div> */}

          <div className="invoice-declaration">
            <p>
              <div>
                <BarCode value={wayBill} />
              </div>
            </p>
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
      </div>
  );
};
