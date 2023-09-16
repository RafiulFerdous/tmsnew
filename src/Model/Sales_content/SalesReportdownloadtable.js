import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sales.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactHTMLTableTpExcel from "react-html-table-to-excel";
const Salesreportdownloadtable = (props) => {
  let json_information = props.response;
  function generate() {
    const doc = new jsPDF("p", "mm");

    doc.autoTable({
      // html: '#my-table',
      head: [
        [
          "Total Pickup Rquest",
          "Number Of Products",
          "Total Delivared",
          "Total Holded",
          "Total Return",
          "Total Lost",
          "Total Unattempted",
          "Total Value",
          "Total Delivared Collected COD",
        ],
      ],
      body: [
        [
          json_information.message.number_of_pickup_request,
          json_information.message.number_of_total_products,
          json_information.message.number_of_total_delevered_product,
          json_information.message.number_of_total_holded_product,
          json_information.message.number_of_total_returned_product,
          json_information.message.number_of_total_lost_product,
          json_information.message.number_of_total_unattempted_product,
          json_information.message.client_total_product_value,
          json_information.message.total_delevered_product_collected_cod,
        ],
      ],
      theme: "grid",
      tableWidth: 180,
      styles: {},
      columnStyles: {},
    });

    doc.save("Client Report");
  }
  return (
    <>
      <div className="container border mt-5 pt-4" id="no-more-tables">
        <table className="col-md-12 table-bordered table-striped table-condensed cf css-serial bg-white">
          {/*Table head*/}
          <thead className="text-center" style={{ backgroundColor: "#f1f1f1" }}>
            <tr className="text-dark" style={{ border: "none" }}>
              <th>Total Pickup Rquest</th>
              <th>Number Of Products</th>
              <th>Total Delivared</th>
              <th>Total Holded</th>
              <th>Total Return</th>
              <th>Total Lost</th>
              <th>Total Unattempted</th>
              <th>Total Value</th>
              <th>Total Delivared Collected COD </th>
            </tr>
          </thead>
          {/*Table head*/}
          {/*Table body*/}
          <tbody className="text-center">
            <tr>
              <td data-title="Pickup Rquest">
                {json_information.message.number_of_pickup_request}
              </td>
              <td data-title="Number Of Products">
                {json_information.message.number_of_total_products}
              </td>
              <td data-title="Total Delivared">
                {json_information.message.number_of_total_delevered_product}
              </td>
              <td data-title="Total Holded">
                {json_information.message.number_of_total_holded_product}
              </td>
              <td data-title="Total Return">
                {json_information.message.number_of_total_returned_product}
              </td>
              <td data-title="Total Lost">
                {json_information.message.number_of_total_lost_product}
              </td>
              <td data-title="Total Unattempted">
                {json_information.message.number_of_total_unattempted_product}
              </td>
              <td data-title="Total Value">
                {json_information.message.client_total_product_value}
              </td>
              <td data-title="Collected COD">
                {json_information.message.total_delevered_product_collected_cod}
              </td>
            </tr>
          </tbody>
          {/*Table body*/}
        </table>
        <div className="row mt-5">
          <div className="col-md-12 d-flex justify-content-center">
            <button
              className="js-download-link btn btn-success px-4 text-white fw-bold mb-3"
              onClick={() => generate()}
            >
              Download PDF File
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Salesreportdownloadtable;
