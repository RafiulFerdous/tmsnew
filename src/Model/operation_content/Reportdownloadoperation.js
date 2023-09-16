import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./operation.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactHTMLTableTpExcel from "react-html-table-to-excel";
const Opreportdownload = () => {
  const pdfGenerate = () => {
    const doc = new jsPDF("portrait", "px", "a4");
    doc.autoTable({ html: "#table" });
    doc.save("Report.pdf");
  };
  return (
    <>
      <div className="container border">
        <div className="row ">
          <div className="col-md-12 mb-2 d-flex justify-content-center">
            <form className="form-inline">
              Start Date:{" "}
              <input type="date" className="input-small px-3 mx-2" />
              End Date:{" "}
              <input type="date" className="input-small mb-3 mt-3  px-3 mx-2" />
              <button type="submit" className="btn btn-dark ">
                Confirm
              </button>
            </form>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 d-flex justify-content-center">
            <button
              className="js-download-link button bg-success btn-lg mb-2 mx-2"
              onClick={() => pdfGenerate()}
            >
              Download PDF File
            </button>
            <div className="row">
              <div className="col-md-12 d-flex justify-content-center">
                <ReactHTMLTableTpExcel
                  id="test-table-xls-button"
                  className="download-table-xls-button bg-primary btn-lg mb-2"
                  table="table"
                  filename="Report Download"
                  buttonText="Download As XLS"
                />
              </div>
            </div>
          </div>
        </div>
        <table
          className="table table-hover mt-4 css-serial"
          style={{ display: "none" }}
        >
          {/*Table head*/}
          <thead className="bg-dark">
            <tr className="text-white">
              <th></th>
              <th>WayBill Number</th>
              <th>Order Id</th>
              <th>Status</th>
              <th>COD/Prepaid</th>
              <th>Payment</th>
            </tr>
          </thead>
          {/*Table head*/}
          {/*Table body*/}
          <tbody>
            <tr>
              <th scope="row">1234</th>
              <td>00303404</td>
              <td>paid</td>
              <td>138000tk</td>
              <td>False</td>
            </tr>
            <tr>
              <th scope="row">1234</th>
              <td>00303404</td>
              <td>paid</td>
              <td>12000tk</td>
              <td>False</td>
            </tr>
          </tbody>
          {/*Table body*/}
        </table>
      </div>
    </>
  );
};
export default Opreportdownload;
