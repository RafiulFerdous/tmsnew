import React, { useEffect, useState } from "react";
import { Degital_Ocean_flag } from "../../../Common/Linksidebar";
import axios from "axios";

const Thana = ({ district, setThana }) => {
  const [getThana, setGetThana] = useState([]);
  useEffect(() => {
    if (district === "") return;
    var config = {
      method: "get",
      url: Degital_Ocean_flag
        ? `https://e-deshdelivery.com/api/v1.1/Location/GetThanaByDistrict?districtId=${district}`
        : `http://test.e-deshdelivery.com/api/v1.1/Location/GetThanaByDistrict?districtId=${district}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((res) => {
        console.log("res", res);
        setGetThana(res?.data?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [district]);
  return (
    <div className="col-lg-3 col-md-6 q3 thana">
      <div className="form-group mb-3">
        <label for="simpleinput">Thana</label>
        <select
          className="form-control "
          id="example-select"
          name="thana_get"
          required
          style={{ background: "gainsboro" }}
          onChange={(e) => setThana(e.target.value)}
        >
          <option hidden> Select Thana</option>
          {getThana?.map((c) => (
            <option key={c.text} value={c.text}>
              {c.value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Thana;
