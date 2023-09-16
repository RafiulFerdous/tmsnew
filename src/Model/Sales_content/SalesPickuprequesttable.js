import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sales.css";
import { BrowserRouter, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const Salespickuprequesttable = (props) => {
  let json_information = props.response;
  const [searchTerm, setSearchTerm] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  React.useEffect(() => {
    const results = json_information.message.all_pickupRequest.filter(
        (p) =>
            p.clienT_NAME
                .toString()
                .toLowerCase()
                .includes(searchTerm.toString().toLowerCase()) ||
            p.clienT_CONTACT
                .toString()
                .toLowerCase()
                .includes(searchTerm.toString().toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  const searchIcon = <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>;
  return (
      <>
        <div className="">
          <div className=""></div>
        </div>
        <div className="container">
          {/*  */}
          {/* <form className="row d-flex justify-content-center">
          <div className="col-lg-6 col-md-6 col-sm-4 form-group mx-3 mt-2 p-4">
            <div className="input-group  input-icons">
              <i className="icon ">{searchIcon}</i>
              <input
                type="search"
                name=""
                id=""
                placeholder="Client Name or Contact Number"
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
                onChange={handleChange}
              />
            </div>
          </div>
        </form> */}
          {/*  */}
          {/* <div className="row n">
          <div className="col-8 mx-5">
            <div className="">
              <form>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control mx-2"
                    placeholder="type here......."
                    value={searchTerm}
                    onChange={handleChange}
                  />
                  <div className="input-group-append"></div>
                </div>
              </form>
            </div>
          </div>
        </div> */}
          <div id="requesttable">
            <div id="no-more-tables">
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
                      placeholder="Client Name or Contact Number"
                      value={searchTerm}
                      onChange={handleChange}
                  />
                </div>
              </div>
              {/*Table*/}
              <table
                  className="table css-serial bg-white"
                  style={{ fontSize: "13px", marginLeft: "1px" }}
              >
                {/*Table head*/}
                <thead
                    className="text-center shadow sticky-top "
                    style={{ backgroundColor: "#b4bec2", top: "60px", zIndex: "0" }}
                >
                <tr className="text-dark" style={{ border: "none" }}>
                  <th scope="col">SL</th>
                  <th scope="col">Client Name</th>
                  <th scope="col">Contact Number</th>
                  <th scope="col">Pickup Address</th>
                  <th scope="col">Pin Code</th>
                  <th scope="col">
                    Total Packages<br></br>COD
                  </th>
                  <th scope="col">
                    Product Type<br></br>And Description
                  </th>
                  <th scope="col">Pickup Status</th>
                  <th scope="col">Instruction</th>
                </tr>
                </thead>
                {/*Table head*/}
                {/*Table body*/}
                <tbody className="text-center border border-dark">
                {searchResults.map((single_message) => {
                  return (
                      <tr key={single_message.clienT_NAME}>
                        <td data-title="SL"></td>
                        <td data-title="Client Name" scope="row">
                          {single_message.clienT_NAME}
                        </td>
                        <td data-title="Contact Number" scope="row">
                          {single_message.clienT_CONTACT}
                        </td>
                        <td
                            data-title="Pickup Address"
                            className="clientP-td-address"
                        >
                          {single_message.pickuP_ADDRESS}
                        </td>
                        <td data-title="Pin Code">{single_message.pincode}</td>
                        <td data-title="Packages & COD">
                          {single_message.totaL_NUMBER_OF_PACKAGES}
                          <br></br>
                          {single_message.totaL_COD_AMOUNT}
                        </td>
                        <td data-title="Product Type">
                          {single_message.producT_TYPE}
                          <br></br>
                          {single_message.producT_DESCRIPTION}
                        </td>
                        <td data-title="Pickup Status">
                          {single_message.pickuP_REQUEST_STATUS}
                          <br></br>
                          {single_message.pickuP_REQUEST_STATUS_DATETIME &&
                              single_message.pickuP_REQUEST_STATUS_DATETIME.split(
                                  "T"
                              )[0]}
                        </td>
                        <td data-title="Instruction">
                          {single_message.speciaL_INSTRUCTION}
                          <br></br>
                          {single_message.pickuP_REQUEST_DATETIME &&
                              single_message.pickuP_REQUEST_DATETIME.split("T")[0]}
                        </td>
                      </tr>
                  );
                })}
                </tbody>
                {/*Table body*/}
              </table>
              {/*Table*/}
            </div>
          </div>
        </div>
      </>
  );
};
export default Salespickuprequesttable;
