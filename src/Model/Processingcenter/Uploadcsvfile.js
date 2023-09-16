import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./modal.css";
import { CSVLink, CSVDownload } from "react-csv";
import axios from "axios";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const Uploadcsvfile = (props) => {
  let json_information = props.response;

  return (
    <div className="container mt-5">
      <div>
        <div id="no-more-tables">
          <ReactHTMLTableToExcel
            className="btn btn-success"
            table="table1"
            filename="test"
            buttonText="Download as XLS"
          />

          {/*<CSVLink data={ json_information} filename={"CSV.csv"} className="btn btn-sm bg-info text-black border-info mb-2">Export csv</CSVLink>*/}

          <table
            id="table1"
            className="col-md-12 table-bordered table-striped table-condensed cf  bg-white"
          >
            {/*<th><CSVLink data={ json_information.inserted_product_list} filename={"CSV.csv"} className="btn btn-sm bg-info text-black border-info mb-2">Export csv</CSVLink></th>*/}
            <thead
              className="text-center"
              style={{ backgroundColor: "#f1f1f1" }}
            >
              <tr className="text-dark" style={{ border: "none" }}>


                <th style={{ fontSize: "14px", fontWeight: 500 }} scope="col">
                  Remarks
                </th>

                <th style={{ fontSize: "14px", fontWeight: 500 }} scope="col">
                  WayBill
                </th>
                <th style={{ fontSize: "14px", fontWeight: 500 }}>OrderId</th>
                <th style={{ fontSize: "14px", fontWeight: 500 }} scope="col">
                  Consignee Name
                </th>
                <th style={{ fontSize: "14px", fontWeight: 500 }}>Number</th>
                <th style={{ fontSize: "14px", fontWeight: 500 }} scope="col">
                  Address
                </th>
                <th style={{ fontSize: "14px", fontWeight: 500 }} scope="col">
                  P.S
                </th>
                <th style={{ fontSize: "14px", fontWeight: 500 }}>District</th>
                <th style={{ fontSize: "14px", fontWeight: 500 }}>PinCode</th>
                <th style={{ fontSize: "14px", fontWeight: 500 }} scope="col">
                  Total Packages
                </th>
                <th style={{ fontSize: "14px", fontWeight: 500 }}>Weight</th>
                <th style={{ fontSize: "14px", fontWeight: 500 }} scope="col">
                  Payment Type
                </th>
                <th style={{ fontSize: "14px", fontWeight: 500 }} scope="col">
                  COD
                </th>
                <th style={{ fontSize: "14px", fontWeight: 500 }} scope="col">
                  Product Details
                </th>
                <th style={{ fontSize: "14px", fontWeight: 500 }} scope="col">
                  Client Name
                </th>
                <th style={{ fontSize: "14px", fontWeight: 500 }}>Address</th>
                <th style={{ fontSize: "14px", fontWeight: 500 }} scope="col">
                  Return Address
                </th>
                <th style={{ fontSize: "14px", fontWeight: 500 }}>
                  Return PinCode
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {json_information.inserted_product_list.map((single_message) => {
                return (
                  <tr
                    // key={single_message.waybill}
                    className="bg-success text-white"
                  >

                    <td style={{ fontSize: "14px" }} data-title="Remarks">
                      {single_message.remarks}
                    </td>
                    <td style={{ fontSize: "14px" }} data-title="WayBill">
                      {single_message.waybill}
                    </td>
                    <td style={{ fontSize: "14px" }} data-title="OrderId">
                      {single_message.referencE_NO}
                    </td>
                    <td
                      style={{ fontSize: "14px" }}
                      data-title="Consignee Name"
                    >
                      {single_message.consigneE_NAME}
                    </td>
                    <td style={{ fontSize: "14px" }} data-title="Number">
                      {single_message.contacT_NUMBER}
                    </td>
                    <td style={{ fontSize: "14px" }} data-title="Address">
                      {single_message.address}
                    </td>
                    <td style={{ fontSize: "14px" }} data-title="P.S">
                      {single_message.thana}
                    </td>
                    <td style={{ fontSize: "14px" }} data-title="District">
                      {single_message.distric}
                    </td>
                    <td style={{ fontSize: "14px" }} data-title="PinCode">
                      {single_message.pincode}
                    </td>
                    <td
                      style={{ fontSize: "14px" }}
                      data-title="Total Packages"
                    >
                      {single_message.totaL_PACKAGE}
                    </td>
                    <td style={{ fontSize: "14px" }} data-title="Weight">
                      {single_message.weight}
                    </td>
                    <td style={{ fontSize: "14px" }} data-title="Payment Type">
                      {single_message.paymenT_TYPE}
                    </td>
                    <td style={{ fontSize: "14px" }} data-title="COD">
                      {single_message.coD_AMOUNT}
                    </td>
                    <td
                      style={{ fontSize: "14px" }}
                      data-title="Product Details"
                    >
                      {single_message.producT_TO_BE_SHIFT}
                    </td>
                    <td style={{ fontSize: "14px" }} data-title="Client Name">
                      {single_message.selleR_NAME}
                    </td>
                    <td style={{ fontSize: "14px" }} data-title="Address">
                      {single_message.selleR_ADDRESS}
                    </td>
                    <td
                      style={{ fontSize: "14px" }}
                      data-title="Return Address"
                    >
                      {single_message.returN_ADDRESS}
                    </td>
                    <td
                      style={{ fontSize: "14px" }}
                      data-title="Return PinCode"
                    >
                      {single_message.returN_PIN}
                    </td>
                  </tr>
                );
              })}
              {json_information.already_existed_products_list.map(
                (single_message) => {
                  return (
                    <tr
                      key={single_message.waybill}
                      className="bg-primary text-white"
                    >
                      <td style={{ fontSize: "14px" }} data-title="Remarks">
                        {single_message.remarks}
                      </td>
                      <td style={{ fontSize: "14px" }} data-title="WayBill">
                        {single_message.waybill}
                      </td>
                      <td style={{ fontSize: "14px" }} data-title="OrderId">
                        {single_message.referencE_NO}
                      </td>
                      <td
                        style={{ fontSize: "14px" }}
                        data-title="Consignee Name"
                      >
                        {single_message.consigneE_NAME}
                      </td>
                      <td style={{ fontSize: "14px" }} data-title="Number">
                        {single_message.contacT_NUMBER}
                      </td>
                      <td style={{ fontSize: "14px" }} data-title="Address">
                        {single_message.address}
                      </td>
                      <td style={{ fontSize: "14px" }} data-title="P.S">
                        {single_message.thana}
                      </td>
                      <td style={{ fontSize: "14px" }} data-title="District">
                        {single_message.distric}
                      </td>
                      <td style={{ fontSize: "14px" }} data-title="PinCode">
                        {single_message.pincode}
                      </td>
                      <td
                        style={{ fontSize: "14px" }}
                        data-title="Total Packages"
                      >
                        {single_message.totaL_PACKAGE}
                      </td>
                      <td style={{ fontSize: "14px" }} data-title="Weight">
                        {single_message.weight}
                      </td>
                      <td
                        style={{ fontSize: "14px" }}
                        data-title="Payment Type"
                      >
                        {single_message.paymenT_TYPE}
                      </td>
                      <td style={{ fontSize: "14px" }} data-title="COD">
                        {single_message.coD_AMOUNT}
                      </td>
                      <td
                        style={{ fontSize: "14px" }}
                        data-title="Product Details"
                      >
                        {single_message.producT_TO_BE_SHIFT}
                      </td>
                      <td style={{ fontSize: "14px" }} data-title="Client Name">
                        {single_message.selleR_NAME}
                      </td>
                      <td style={{ fontSize: "14px" }} data-title="Address">
                        {single_message.selleR_ADDRESS}
                      </td>
                      <td
                        style={{ fontSize: "14px" }}
                        data-title="Return Address"
                      >
                        {single_message.returN_ADDRESS}
                      </td>
                      <td
                        style={{ fontSize: "14px" }}
                        data-title="Return PinCode"
                      >
                        {single_message.returN_PIN}
                      </td>
                    </tr>
                  );
                }
              )}
              {json_information.problem_product_list.map((single_message) => {
                return (
                  <tr
                    key={single_message.waybill}
                    className="bg-danger text-white"
                  >
                    <td style={{ fontSize: "14px" }} data-title="Remarks">
                      {single_message.remarks}
                    </td>
                    <td style={{ fontSize: "14px" }} data-title="WayBill">
                      {single_message.waybill}
                    </td>
                    <td style={{ fontSize: "14px" }} data-title="OrderId">
                      {single_message.referencE_NO}
                    </td>
                    <td
                      style={{ fontSize: "14px" }}
                      data-title="Consignee Name"
                    >
                      {single_message.consigneE_NAME}
                    </td>
                    <td style={{ fontSize: "14px" }} data-title="Number">
                      {single_message.contacT_NUMBER}
                    </td>
                    <td style={{ fontSize: "14px" }} data-title="Address">
                      {single_message.address}
                    </td>
                    <td style={{ fontSize: "14px" }} data-title="P.S">
                      {single_message.thana}
                    </td>
                    <td style={{ fontSize: "14px" }} data-title="District">
                      {single_message.distric}
                    </td>
                    <td style={{ fontSize: "14px" }} data-title="PinCode">
                      {single_message.pincode}
                    </td>
                    <td
                      style={{ fontSize: "14px" }}
                      data-title="Total Packages"
                    >
                      {single_message.totaL_PACKAGE}
                    </td>
                    <td style={{ fontSize: "14px" }} data-title="Weight">
                      {single_message.weight}
                    </td>
                    <td style={{ fontSize: "14px" }} data-title="Payment Type">
                      {single_message.paymenT_TYPE}
                    </td>
                    <td style={{ fontSize: "14px" }} data-title="COD">
                      {single_message.coD_AMOUNT}
                    </td>
                    <td
                      style={{ fontSize: "14px" }}
                      data-title="Product Details"
                    >
                      {single_message.producT_TO_BE_SHIFT}
                    </td>
                    <td style={{ fontSize: "14px" }} data-title="Client Name">
                      {single_message.selleR_NAME}
                    </td>
                    <td style={{ fontSize: "14px" }} data-title="Address">
                      {single_message.selleR_ADDRESS}
                    </td>
                    <td
                      style={{ fontSize: "14px" }}
                      data-title="Return Address"
                    >
                      {single_message.returN_ADDRESS}
                    </td>
                    <td
                      style={{ fontSize: "14px" }}
                      data-title="Return PinCode"
                    >
                      {single_message.returN_PIN}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Uploadcsvfile;
