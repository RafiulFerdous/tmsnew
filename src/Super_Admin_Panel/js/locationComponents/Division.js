import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Degital_Ocean_flag } from "../../../Common/Linksidebar";

const Division = ({ setDivision, country }) => {
  const [getDivision, setGetDivision] = useState([]);

  useEffect(() => {
    if (country === "") return;
    var config = {
      method: "get",
      url: Degital_Ocean_flag
        ? `https://e-deshdelivery.com/api/v1.1/Location/GetDivisionByCountry?countryId=${country}`
        : `http://test.e-deshdelivery.com/api/v1.1/Location/GetDivisionByCountry?countryId=${country}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((res) => {
        console.log("res", res);
        setGetDivision(res?.data?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [country]);

  return (
    <div className="col-lg-3 col-md-6 q2 div">
      <div className="form-group mb-3">
        <label for="simpleinput">Division</label>
        <select
          className="form-control set "
          id="example-select"
          name="division_get"
          required
          style={{ background: "gainsboro" }}
          onChange={(e) => setDivision(e.target.value)}
        >
          <option hidden> Select Division</option>
          {getDivision?.map((c) => (
            <option key={c.text} value={c.text}>
              {c.value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Division;
