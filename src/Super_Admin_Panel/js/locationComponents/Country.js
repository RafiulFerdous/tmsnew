import React from "react";

import { useEffect, useState } from "react";
import { Degital_Ocean_flag } from "../../../Common/Linksidebar";
import axios from "axios";

const Country = ({ setCountry, country }) => {
  const [getCountry, setGetCountry] = useState([]);

  useEffect(() => {
    var config = {
      method: "get",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/api/v1.1/Location/GetCountry"
        : "http://test.e-deshdelivery.com/api/v1.1/Location/GetCountry",
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((res) => {
        console.log("res", res);
        setGetCountry(res?.data?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="col-lg-3 col-md-6 q1 country">
      <div className="form-group mb-3">
        <label for="simpleinput">Country</label>
        <select
          className="form-control country  cont"
          id="example-select"
          name="country_get"
          required
          style={{ background: "gainsboro" }}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option hidden>Select Country</option>

          {getCountry?.map((c) => (
            <option key={c.text} value={c.text}>
              {c.value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Country;
