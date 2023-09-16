import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./customermodel.css";
import {
  faAddressBook,
  faAddressCard,
  faBusinessTime,
  faEnvelope,
  faMobile,
  faMoneyBillAlt,
  faTruck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faProductHunt } from "@fortawesome/free-brands-svg-icons";
import { SearchContext } from "../../Context/searchContext";
import { SearchButtonContext } from "../../Context/buttonContext";
const Cpickuprequest = (props) => {
  let json_table = props.response;
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
  return (
    <>
      {json_table.message.all_pickupRequest != 0 ? (
        <div id="no-more-tables">
          <table
            // className="col-md-12 table-bordered table-striped table-condensed cf css-serial bg-white"
            className="table css-serial bg-white"
            style={{ fontSize: "13px", marginLeft: "1px" }}
          >
            <thead
              className="text-center shadow sticky-top "
              style={{ backgroundColor: "#b4bec2", top: "60px", zIndex: "0" }}
            >
              <tr className="text-dark" style={{ border: "none" }}>
                <th>SL</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Pincode</th>
                <th>Pickup DateTime</th>
                <th>Pickup Request DateTime</th>
                <th>Number Of Packages</th>
                <th>COD</th>
                <th>Type</th>
                <th>Description</th>
                <th>Instruction</th>
                <th>Pickup Rquest Status</th>
                <th>Pickup Request Status DateTime</th>
              </tr>
            </thead>

            <tbody className="text-center border border-secondary">
              {json_table.message.all_pickupRequest.map((single_message) => {
                return (
                  <tr key={single_message.id}>
                    <td data-title="SL"></td>
                    <td data-title="Name">{single_message.clienT_NAME}</td>
                    <td data-title="Contact">
                      {single_message.clienT_CONTACT}
                    </td>
                    <td data-title="Address">
                      {single_message.pickuP_ADDRESS}
                    </td>
                    <td data-title="Pincode">{single_message.pincode}</td>
                    <td data-title="Pickup DateTime">
                      {single_message.pickuP_DATETIME &&
                        single_message.pickuP_DATETIME.split("T")[0]}
                    </td>
                    <td data-title="Pickup Request DateTime">
                      {single_message.pickuP_REQUEST_DATETIME &&
                        single_message.pickuP_REQUEST_DATETIME.split("T")[0]}
                    </td>
                    <td data-title="Number Of Packages">
                      {single_message.totaL_NUMBER_OF_PACKAGES}
                    </td>
                    <td data-title="COD">{single_message.totaL_COD_AMOUNT}</td>
                    <td data-title="Type">{single_message.producT_TYPE}</td>
                    <td data-title="Description">
                      {single_message.producT_DESCRIPTION}
                    </td>
                    <td data-title="Instruction">
                      {single_message.speciaL_INSTRUCTION}
                    </td>
                    <td data-title="Pickup Rquest Status">
                      {single_message.pickuP_REQUEST_STATUS}
                    </td>
                    <td data-title="Pick Req Status DateTime">
                      {single_message.pickuP_REQUEST_STATUS_DATETIME &&
                        single_message.pickuP_REQUEST_STATUS_DATETIME.split(
                          "T"
                        )[0]}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default Cpickuprequest;
