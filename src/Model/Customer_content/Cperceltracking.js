import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./customermodel.css";
import { faUser, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

let waybillNumber, setwaybillNumber;
let orderId, setorderId;
let clientName, setclientName;
let dateTime, setdateTime;
let searchFlag, setsearchFlag;
let parcelInformation, setparcelInformation;
let payload, setpayload;
let track, settrack;

let information = {
  stage: "",
  date: "",
  color: "bg-danger",
};
let tracking_information = [
  {
    stage: "",
    date: "",
    color: "bg-danger",
  },
  {
    stage: "",
    date: "",
    color: "bg-danger",
  },
  {
    stage: "",
    date: "",
    color: "bg-danger",
  },
  {
    stage: "",
    date: "",
    color: "bg-danger",
  },
  {
    stage: "",
    date: "",
    color: "bg-danger",
  },
  {
    stage: "",
    date: "",
    color: "bg-danger",
  },
];

const Cparceltracking = (props) => {
  const [showText, setShowText] = useState(false);

  let onclick = (e) => {
    e.preventDefault();
    setShowText(!showText);
  };
  let json_table = props.response;
  console.log(json_table);

  [waybillNumber, setwaybillNumber] = useState("");
  [orderId, setorderId] = useState("");
  [clientName, setclientName] = useState("");
  [dateTime, setdateTime] = useState("");
  [searchFlag, setsearchFlag] = useState("");
  [parcelInformation, setparcelInformation] = useState("");
  [payload, setpayload] = useState(false);
  [track, settrack] = useState(tracking_information);

  let submitTrackButtonFunction = (e) => {
    e.preventDefault();
    setsearchFlag((searchFlag) => !searchFlag);
  };

  let string_devide = (all_processing_stages) => {
    let date = "";
    let stage = "";

    tracking_information = [
      // {
      //     stage : "",
      //     date : "",
      //     color : "bg-light",
      //  },
      //  {
      //     stage : "",
      //     date : "",
      //     color : "bg-light",
      //  },
      //  {
      //     stage : "",
      //     date : "",
      //     color : "bg-light",
      //  },
      //  {
      //     stage : "",
      //     date : "",
      //     color : "bg-light",
      //  },
      //  {
      //     stage : "",
      //     date : "",
      //     color : "bg-light",
      //  },
      //  {
      //     stage : "",
      //     date : "",
      //     color : "bg-light",
      //  },
      //  {
      //     stage : "",
      //     date : "",
      //     color : "bg-light",
      //  },
      //  {
      //     stage : "",
      //     date : "",
      //     color : "bg-light",
      //  },
      //  {
      //     stage : "",
      //     date : "",
      //     color : "bg-light",
      //  }
    ];

    const total_stages = all_processing_stages.split("*");
    let len = total_stages.length;
    for (let i = 0; i < len; i++) {
      const stage_dateTime = total_stages[i].split("+");
      stage = stage_dateTime[0];
      date = stage_dateTime[1];
      let temp_tracking_information = {
        stage: stage,
        date: date,
        color: "bg-success",
      };
      tracking_information.push(temp_tracking_information);
      // tracking_information[i].stage = stage;
      // tracking_information[i].date = date;
      // tracking_information[i].color = "bg-success ";
    }
    console.log("Tracking info", tracking_information);
    settrack((track) => tracking_information);
  };

  useEffect(() => {
    //here is the search code..............
    json_table.message.delevered_product_list.map((single_product) => {
      if (single_product.ordeR_ID == orderId) {
        setparcelInformation(single_product);
        console.log("allsteptrack", single_product.alL_STEP_TRACKING);
        string_devide(single_product.alL_STEP_TRACKING);
        settrack(tracking_information);
        setpayload(true);
      }
    });
    json_table.message.holded_product_list.map((single_product) => {
      if (single_product.ordeR_ID == orderId) {
        setparcelInformation(single_product);
        string_devide(single_product.alL_STEP_TRACKING);
        settrack(tracking_information);
        setpayload(true);
      }
    });
    json_table.message.returned_product_list.map((single_product) => {
      if (single_product.ordeR_ID == orderId) {
        setparcelInformation(single_product);
        string_devide(single_product.alL_STEP_TRACKING);
        settrack(tracking_information);
        setpayload(true);
      }
    });
    json_table.message.lost_product_list.map((single_product) => {
      if (single_product.ordeR_ID == orderId) {
        setparcelInformation(single_product);
        string_devide(single_product.alL_STEP_TRACKING);
        settrack(tracking_information);
        setpayload(true);
      }
    });
    //here end search code................
  }, [searchFlag]);

  return (
      <>
        <div className="container">
          {/* <div className=" border border-dark bg-dark">
          <h4 className="  text-center border border-dark bg-dark text-white">
            Search By
          </h4>
          <div className="row ">
            <div className="col-12 mb-2 d-flex justify-content-right " id="">
              <form className="form-inline mx-5" id="">
                <input
                  type="text"
                  className="input-small mb-3 mt-3 px-3 mx-4 border-success"
                  placeholder="Order Id"
                  value={orderId}
                  onChange={(e) => {
                    setorderId(e.target.value);
                  }}
                />
                <input
                  type="text"
                  className="input-small mb-3 mt-3 px-3 mx-4 border-primary"
                  placeholder="Customer Phone Number"
                  value={clientName}
                  onChange={(e) => {
                    setclientName(e.target.value);
                  }}
                />
                <input
                  type="Date"
                  className="input-small mb-3 mt-3 px-3 mx-4 border-light"
                  value={dateTime}
                  onChange={(e) => {
                    setdateTime(e.target.value);
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-info "
                  onClick={submitTrackButtonFunction}
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div> */}

          {/*  */}
          <h4 className="text-dark text-center">Search By</h4>
          <div className="row justify-content-center">
            <div className="col-10">
              <div className="container shadow my-3 py-3 rounded single-product-upload-bg">
                <div className="row my-2">
                  <div className="col-lg-3 col-md-3 col-12">
                    <p>Order ID</p>
                  </div>
                  <div className="col-lg-9 col-md-9 col-12">
                    <input
                        type="text"
                        className="shadow-lg form-control  me-3 bg-white rounded"
                        value={orderId}
                        onChange={(e) => {
                          setorderId(e.target.value);
                        }}
                    />
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col-lg-3 col-md-3 col-12">
                    <p>Customer Phone Number</p>
                  </div>
                  <div className="col-lg-9 col-md-9 col-12">
                    <input
                        type="text"
                        className="shadow-lg form-control  me-3 bg-white rounded"
                        value={clientName}
                        onChange={(e) => {
                          setclientName(e.target.value);
                        }}
                    />
                  </div>
                </div>

                <div className="row my-2">
                  <div className="col-lg-3 col-md-3 col-12">
                    <p>Date</p>
                  </div>
                  <div className="col-lg-9 col-md-9 col-12">
                    <input
                        type="date"
                        className="shadow-lg form-control  me-3 bg-white rounded"
                        value={dateTime}
                        onChange={(e) => {
                          setdateTime(e.target.value);
                        }}
                    />
                  </div>
                </div>
                <div className="text-center mt-2">
                  <button
                      type="submit"
                      className="btn btn-sm btn-success rounded-3 px-3"
                      onClick={submitTrackButtonFunction}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/*  */}

          <div className="mt-5" id="no-more-tables">
            <table className="col-md-12 table-bordered table-striped table-condensed cf bg-white">
              <thead
                  className="text-center"
                  style={{ backgroundColor: "#f1f1f1" }}
              >
              <tr className="text-dark" style={{ border: "none" }}>
                <th>Order Id</th>
                <th>Status</th>
              </tr>
              </thead>
              <tbody className="text-center">
              <tr onClick={onclick}>
                <td data-title="Order Id">{parcelInformation.ordeR_ID}</td>
                <td data-title="Status">
                  {parcelInformation.producT_PROCESSING_STATUS}
                </td>
              </tr>
              </tbody>
            </table>
            {showText && <Text stage_information={tracking_information} />}
            <div className="text-center">
              <button
                  className="button bg-dark border-dark btn-lg text-white "
                  onClick={onclick}
              >
                See Full Details
              </button>
            </div>
          </div>
        </div>
      </>
  );
};
const Text = (props) => {
  let tracking_info = props.stage_information;

  return (
      <>
        <div className="mt-5">
          <div className="">
            <div className="container padding-bottom-3x mb-1 mt-5">
              <div className=" mb-3">
                {payload && (
                    <div className="card card-body mx-auto text-align-center my-4 card_border_redius box_shadow box1 border-dark">
                      <div className="card-title text-center text-white mt-2">
                        <h3 className="text-white bg-dark">Product Information</h3>
                      </div>
                      <div className="text-center">
                        <div>{parcelInformation.ordeR_ID}</div>
                        <div>{parcelInformation.producT_NAME}</div>
                        <div>{parcelInformation.producT_DETAILS}</div>
                        <div>{parcelInformation.consigneE_NAME}</div>
                        <div>{parcelInformation.contacT_NUMBER}</div>
                        <div>{parcelInformation.address}</div>
                        <div>{parcelInformation.pincode}</div>
                        <div>{parcelInformation.producT_WEIGHT}</div>
                        <div>{parcelInformation.producT_PAYMENT_TYPE}</div>
                        <div>{parcelInformation.pincode}</div>
                        <div>{parcelInformation.producT_VALUE}</div>
                        <div className="text-danger font-weight-bold">
                          {parcelInformation.producT_PROCESSING_STATUS}
                        </div>
                        <div>
                          {parcelInformation.producT_PRODESSING_STATUS_DATETIME}
                        </div>
                      </div>
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {payload && (
            <div className="box">
              <section className="root">
                <figure>
                  <img
                      src="https://image.flaticon.com/icons/svg/970/970514.svg"
                      alt
                  />
                  <figcaption>
                    <h4>Tracking Details</h4>
                    <h6>Order Id</h6>
                    <h2>{parcelInformation.ordeR_ID}</h2>
                  </figcaption>
                </figure>
                <div className="order-track">
                  {track.map((single_track) => (
                      <div className="order-track-step">
                        <div className={single_track.color}>
                          <span className="order-track-status-dot" />
                        </div>
                        <div className="order-track-text">
                          <div>
                            <div className="mx-auto text-center"></div>
                            <div className="order-track-text-stat">
                        <span>
                          {single_track.stage}- {single_track.date}
                        </span>
                            </div>
                          </div>
                        </div>
                      </div>
                  ))}
                  {/* <div className="order-track-step">
                                    <div className={track[0].color}>
                                        <span className="order-track-status-dot" />
                                      
                                    </div>
                                    <div className="order-track-text">
                                       
                                    <div >
                                        <div className="mx-auto text-center">
                                            
                                        </div>
                                        <div className="order-track-text-stat">
                                            <span>Pickup Request- {track[0].date}</span>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="order-track-step">
                                    <div className={track[0].color}>
                                        <span className="order-track-status-dot" />
                                      
                                    </div>
                                    <div className="order-track-text">
                                       
                                    <div >
                                        <div className="mx-auto text-center">
                                            
                                        </div>
                                        <div className="order-track-text-stat">
                                            <span>Pickup Done- {track[0].date}</span>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="order-track-step">
                                    <div className={track[0].color}>
                                        <span className="order-track-status-dot" />
                                      
                                    </div>
                                    <div className="order-track-text">
                                       
                                    <div >
                                        <div className="mx-auto text-center">
                                            
                                        </div>
                                        <div className="order-track-text-stat">
                                            <span>Processing Order- {track[0].date}</span>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="order-track-step">
                                    <div className={track[1].color}>
                                        <span className="order-track-status-dot" />
                                      
                                    </div>
                                    <div className="order-track-text">
                                       
                                    <div >
                                        <div className="mx-auto text-center">
                                            
                                        </div>
                                        <div className="order-track-text-stat">
                                            <span>Shorting And Bagging- {track[1].date}</span>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="order-track-step">
                                    <div className={track[1].color}>
                                        <span className="order-track-status-dot" />
                                      
                                    </div>
                                    <div className="order-track-text">
                                       
                                    <div >
                                        <div className="mx-auto text-center">
                                            
                                        </div>
                                        <div className="order-track-text-stat">
                                            <span>Dispatched To Line- {track[1].date}</span>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="order-track-step">
                                    <div className={track[2].color}>
                                        <span className="order-track-status-dot" />
                                      
                                    </div>
                                    <div className="order-track-text">
                                       
                                    <div >
                                        <div className="mx-auto text-center">
                                            
                                        </div>
                                        <div className="order-track-text-stat">
                                            <span>Received In DC- {track[2].date}</span>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="order-track-step">
                                    <div className={track[3].color}>
                                        <span className="order-track-status-dot" />
                                      
                                    </div>
                                    <div className="order-track-text">
                                       
                                    <div >
                                        <div className="mx-auto text-center">
                                            
                                        </div>
                                        <div className="order-track-text-stat">
                                            <span>Dispatched From DC- {track[3].date}</span>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="order-track-step">
                                    <div className={track[4].color}>
                                        <span className="order-track-status-dot" />
                                      
                                    </div>
                                    <div className="order-track-text">
                                       
                                    <div >
                                        <div className="mx-auto text-center">
                                            
                                        </div>
                                        <div className="order-track-text-stat">
                                            <span>Out For Delivery- {track[4].date}</span>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="order-track-step">
                                    <div className={track[5].color}>
                                        <span className="order-track-status-dot" />
                                      
                                    </div>
                                    <div className="order-track-text">
                                       
                                    <div >
                                        <div className="mx-auto text-center">
                                            
                                        </div>
                                        <div className="order-track-text-stat">
                                            <span>{track[5].stage} {track[5].date}</span>
                                        </div>
                                    </div>
                                    </div>
                                </div> */}
                </div>
              </section>
            </div>
        )}
      </>
  );
};
export default Cparceltracking;
