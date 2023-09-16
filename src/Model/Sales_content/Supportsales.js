import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sales.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const Supportsales = (props) => {
  let json_information = props.response;
  const [searchTerm, setSearchTerm] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);
  const handleonChange = (event) => {
    setSearchTerm(event.target.value);
  };
  React.useEffect(() => {
    const users1 = json_information.message.all_information.filter(
      (p) =>
        p.clienT_NAME
          .toString()
          .toLowerCase()
          .includes(searchTerm.toString().toLowerCase()) ||
        p.clienT_CONTACT_NUMBER
          .toString()
          .toLowerCase()
          .includes(searchTerm.toString().toLowerCase()) ||
        p.clienT_QUERY
          .toString()
          .toLowerCase()
          .includes(searchTerm.toString().toLowerCase())
    );
    setSearchResults(users1);
  }, [searchTerm]);
  const searchIcon = <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>;
  return (
    <>
      {/*
                        <div className="row">
                            <div className="col-12">
                            <div className=" container table-responsive"> 
                            <table id="table">
                            <thead className="thead-dark justify-content-center">
                                <tr id="back_c">
                                <th scope="col">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input"  />
                                    <label className="custom-control-label" htmlFor="customCheck1">Creation Date</label>
                                </div>
                                </th>
                                <th scope="col">PickUp Location</th>
                                <th scope="col">ID</th>
                                <th scope="col">Customer Details</th>
                                <th scope="col">Status</th>
                                <th scope="col">Payment Info</th>
                                <th scope="col">Last Updated</th>
                                </tr>

                                            <tr>
                                                <td>
                                                <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input"  />
                                                <label className="custom-control-label" htmlFor="customCheck1">12-3-21</label>
                                                </div>
                                                </td>
                                                <td>Dhaka</td>
                                                <td>1234</td>
                                                <td>Dhamaka</td>
                                                <td>
                                                    <button className="btn btn-dark text-white btn-lg"></button>
                                                </td>
                                                <td> 174000</td>
                                                <td> 19-7-21</td>
                                            </tr>
                            </thead>
                            </table>
                            </div>
                            </div>
                        </div>
                   */}
      <div className="container">
        {/*  */}
        <form className="row d-flex justify-content-center">
          <div className="col-lg-6 col-md-6 col-sm-4 form-group mx-3 mt-2 p-4">
            <div className="input-group  input-icons">
              <i className="icon ">{searchIcon}</i>
              <input
                type="search"
                name=""
                id=""
                placeholder="Client Name or Number"
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
        </form>
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
                    onChange={handleonChange}
                  />
                  <div className="input-group-append"></div>
                </div>
              </form>
            </div>
          </div>
        </div> */}
        <div className="mt-3">
          <div id="no-more-tables">
            {/*Table*/}
            <table className="col-md-12 table-bordered table-striped table-condensed cf css-serial bg-white">
              {/*Table head*/}
              <thead
                className="text-center"
                style={{ backgroundColor: "#f1f1f1" }}
              >
                <tr className="text-dark" style={{ border: "none" }}>
                  <th scope="col">SL</th>
                  <th scope="col">Client Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Message</th>
                  <th>Date And Time</th>
                </tr>
              </thead>
              {/*Table head*/}
              {/*Table body*/}
              <tbody className="text-center">
                {searchResults.map((single_message) => {
                  return (
                    <tr key={single_message.clienT_NAME}>
                      <td data-title="SL"></td>
                      <td data-title="Client Name" scope="row">
                        {single_message.clienT_NAME}
                      </td>
                      <td data-title="Email">{single_message.clienT_EMAIL}</td>
                      <td data-title="Phone Number">
                        {single_message.clienT_CONTACT_NUMBER}
                      </td>
                      <td data-title="Message">
                        {single_message.clienT_QUERY}
                      </td>
                      <td data-title="Date And Time">
                        {single_message.querY_DATETIME &&
                          single_message.querY_DATETIME.split("T")[0]}
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
export default Supportsales;
