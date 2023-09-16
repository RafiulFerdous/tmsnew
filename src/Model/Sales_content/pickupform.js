import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
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
const Spickuprequestform = () => {
  return (
    <>
      <div>
        <div className="border border-primary bgimg">
          <h3 className="text-center bg-info">
            {" "}
            Place an order/PickUp Request
          </h3>
          <div className="container p-3">
            <form>
              {/*
                                <div className="form-group row mb-2">
                                    <label htmlFor className="col-sm-3 col-form-label">Client Name:</label>
                                    <div className="col-sm-6">
                                        <input type="text" className="form-control form-control-success" placeholder="Name.." required/>
                                    </div>
                                </div>
                                <div className="form-group row mb-2">
                                    <label htmlFor className="col-sm-3 col-form-label">PickUp Address:</label>
                                    <div className="col-sm-6">
                                        <input type="text" className="form-control" placeholder="Address" required/>
                                    </div>
                                </div>
                                <div className="form-group row mb-2">
                                    <label htmlFor className="col-sm-3 col-form-label">Pin Code:</label>
                                    <div className="col-sm-6">
                                        <input type="text" className="form-control" placeholder="1230" required/>
                                    </div>
                                </div>
                                <div className="form-group row mb-2">
                                    <label htmlFor className="col-sm-3 col-form-label">Date and Time</label>
                                    <div className="col-sm-6">
                                        <input type="text" className="form-control" placeholder="11-7-21 11.30"required/>
                                    </div>
                                </div>
                                <div className="form-group row mb-2">
                                    <label htmlFor className="col-sm-3 col-form-label">Total Number of Packges:</label>
                                    <div className="col-sm-6">
                                        <input type="text" className="form-control" placeholder="1-2-3" required/>
                                    </div>
                                </div>
                                <div className="form-group row mb-2">
                                    <label htmlFor className="col-sm-3 col-form-label">Product Type:</label>
                                    <div className="col-sm-6" >
                                    <select className="form-control">
                                        <option>Select Your Product Type</option>
                                        <option>Fragile</option>
                                        <option>Perishable</option>
                                        <option>Gadgets</option>
                                        <option>Electronics</option>
                                        <option>Fashion Item</option>
                                        <option>Clothing</option>
                                        <option>Document</option>
                                        <option>Glass</option>
                                        <option>Liquid</option>
                                    </select>
                                    </div>
                                </div>
                                */}
              <h6 className="text-success">
                <FontAwesomeIcon
                  icon={faBusinessTime}
                  className=" rounded-circle mx-2"
                  id="icn"
                ></FontAwesomeIcon>
                <u>Shop/Business Deatils</u>
              </h6>
              <div className="form-group has-success mb-2">
                <label className="control-label" htmlFor="inputSuccess1">
                  <h6>
                    <FontAwesomeIcon
                      icon={faUser}
                      className=" rounded-circle mx-2"
                      id="icn"
                    ></FontAwesomeIcon>
                    Marchant/Shop Name:
                  </h6>
                </label>
                <p className="border border-light bg-light form-control mt-1">
                  Mithila Collection
                </p>
              </div>
              <div className="form-group has-success mb-2">
                <label className="control-label" htmlFor="inputSuccess1">
                  <h6>
                    <FontAwesomeIcon
                      icon={faAddressBook}
                      className=" rounded-circle mx-2"
                      id="icn"
                    ></FontAwesomeIcon>
                    Marchant Contact Person Name:
                  </h6>
                </label>
                <p className="border border-light bg-light form-control mt-1">
                  ALien
                </p>
              </div>
              <h6 className="text-success">
                <FontAwesomeIcon
                  icon={faTruck}
                  className=" rounded-circle mx-2"
                  id="icn"
                ></FontAwesomeIcon>
                <u>Package and Delivary Details:</u>
              </h6>
              <div className="form-group has-success mb-2">
                <label className="control-label" htmlFor="inputSuccess1">
                  <h6>
                    <FontAwesomeIcon
                      icon={faUser}
                      className=" rounded-circle mx-2"
                      id="icn"
                    ></FontAwesomeIcon>
                    Consignee:
                  </h6>
                </label>
                <input type="text" className="form-control mt-1" required />
              </div>
              <div className="form-group has-success mb-2">
                <label className="control-label" htmlFor="inputSuccess1">
                  <h6>
                    <FontAwesomeIcon
                      icon={faAddressCard}
                      className=" rounded-circle mx-2"
                      id="icn"
                    ></FontAwesomeIcon>
                    Delivary Address:
                  </h6>
                </label>
                <input type="text" className="form-control mt-1" required />
              </div>
              <div className="form-group has-success mb-2">
                <label className="control-label" htmlFor="inputSuccess1">
                  <h6>
                    <FontAwesomeIcon
                      icon={faMobile}
                      className=" rounded-circle mx-2"
                      id="icn"
                    ></FontAwesomeIcon>
                    Mobile Number:
                  </h6>
                </label>
                <input type="text" className="form-control mt-1" required />
              </div>
              <div className="form-group has-success mb-2">
                <label className="control-label" htmlFor="inputSuccess1">
                  <h6>
                    <FontAwesomeIcon
                      icon={faMoneyBillAlt}
                      className=" rounded-circle mx-2"
                      id="icn"
                    ></FontAwesomeIcon>
                    Total COD Amount:
                  </h6>
                </label>
                <input type="text" className="form-control mt-1" required />
              </div>
              <div className="form-group has-success mb-2">
                <label className="control-label" htmlFor="inputSuccess1">
                  <h6>
                    <FontAwesomeIcon
                      icon={faProductHunt}
                      className=" rounded-circle mx-2"
                      id="icn"
                    ></FontAwesomeIcon>
                    Product Deatils
                  </h6>
                </label>
              </div>
              <div>
                <input list="brow" className="form-control" required />
                <datalist id="brow">
                  <option value="Fragile"></option>
                  <option value="Perishable"></option>
                  <option value="Gadgets"></option>
                  <option value="Electronics"></option>
                  <option value="Fashion Item"></option>
                  <option value="Clothing"></option>
                  <option value="Document"></option>
                  <option value="Glass"></option>
                  <option value="Liquid"></option>
                </datalist>
              </div>
              <div className="form-group has-success mb-2">
                <label className="control-label" htmlFor="inputSuccess1">
                  <h6>
                    <FontAwesomeIcon
                      icon={faProductHunt}
                      className=" rounded-circle mx-2"
                      id="icn"
                    ></FontAwesomeIcon>
                    Product Description:
                  </h6>
                </label>
                <input type="text" className="form-control mt-1" required />
              </div>
              <div className="form-group has-success mb-3">
                <label className="control-label" htmlFor="inputSuccess1">
                  <h6>
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className=" rounded-circle mx-2"
                      id="icn"
                    ></FontAwesomeIcon>
                    Special Instruction:
                  </h6>
                </label>
              </div>
              <div>
                <input list="brow" className="form-control" required />
                <datalist id="brow">
                  <option value="Fragile"></option>
                  <option value="Perishable"></option>
                  <option value="Gadgets"></option>
                  <option value="Electronics"></option>
                  <option value="Fashion Item"></option>
                  <option value="Clothing"></option>
                  <option value="Document"></option>
                  <option value="Glass"></option>
                  <option value="Liquid"></option>
                </datalist>
              </div>
              <div className="row">
                <div className="col-12 d-flex justify-content-center text-align-center">
                  <button className="btn btn-primary  mb-3 mt-2 ">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Spickuprequestform;
