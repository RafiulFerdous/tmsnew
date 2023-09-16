import React, { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import { AiFillFileExcel } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-circular-progressbar/dist/styles.css";
import { Degital_Ocean_flag } from "../../Common/Linksidebar";
const GetDarazCsv = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [reportUrl, setReportUrl] = useState("");

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (orderId === "") return;
      setIsLoading(true);
      var axios = require("axios");
      var config = {
        method: "post",
        url: Degital_Ocean_flag
          ? "https://e-deshdelivery.com/api/v1.1/NewReport/DarazCsv"
          : "http://test.e-deshdelivery.com/api/v1.1/NewReport/DarazCsv",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${logingInformation_LocalStore.token}`,
        },
        data: JSON.stringify({
          OrderId: orderId,
        }),
      };
      axios(config)
        .then((res) => {
          setReportUrl(res?.data?.data);
          toast.success(res?.data?.message);
          setIsLoading(false);
        })
        .catch(function (error) {
          toast.error(error?.response?.data?.message);
          setIsLoading(false);
          setReportUrl("");
        });
    }, 800);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [orderId]);

  return (
    <div>
      <div className="container w-100">
        <div className="row ">
          <label htmlFor="report-download">Daraz CSV file Download</label>
          <input
            style={{
              backgroundColor: "#C5D5E4",
              outline: "none",
              border: "none",
              padding: "7px",
              borderRadius: "8px",
            }}
            placeholder="enter OrderID e.g. OID1, OID2, OID3 ..."
            type="text"
            name=""
            id="report-download"
            onChange={(e) => setOrderId(e.target.value)}
          />
          <br />
          <br />

          {orderId.length === 0 || reportUrl === "" ? (
            <p className="border p-2 d-inline ">Please Enter valid OrderId:</p>
          ) : isLoading ? (
            <div className="text-center mt-1 border rounded">
              <ScaleLoader color="#36d7b7" height={15} width={3} />
            </div>
          ) : (
            <a className="btn btn-success my-2 text-white " href={reportUrl}>
              <AiFillFileExcel /> DownLoad CSV
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetDarazCsv;
