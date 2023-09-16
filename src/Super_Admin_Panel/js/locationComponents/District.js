import React, { useEffect, useState } from "react";
import { Degital_Ocean_flag } from "../../../Common/Linksidebar";
import axios from "axios";

const District = ({ division, setDistrict }) => {
  const [getDistrict, setGetDistrict] = useState([]);

  useEffect(() => {
    if (division === "") return;
    var config = {
      method: "get",
      url: Degital_Ocean_flag
        ? `https://e-deshdelivery.com/api/v1.1/Location/GetDistrictByDivision?divisionId=${division}`
        : `http://test.e-deshdelivery.com/api/v1.1/Location/GetDistrictByDivision?divisionId=${division}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((res) => {
        console.log("res", res);
        setGetDistrict(res?.data?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [division]);
  console.log("all district",getDistrict)
  return (
    <div className="col-lg-3 col-md-6 q2 dis">
      <div className="form-group mb-3">
        <label for="simpleinput">District</label>

        <select
          className="form-control disset "
          id="example-select"
          name="district_get"
          required
          style={{ background: "gainsboro" }}
          onChange={(e) => setDistrict(e.target.value)}
        >
          <option hidden> Select District</option>
          {getDistrict?.map((c) => (
            <option key={c.text} value={c.text}>
              {c.value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default District;
