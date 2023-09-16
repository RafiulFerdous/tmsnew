import React from "react";

import { useEffect, useState } from "react";
import { Degital_Ocean_flag } from "../../../Common/Linksidebar";

const AreaType = ({ setArea, area }) => {
  const [information, setinformation] = useState([]);
  const [payload, setpayload] = useState(false);

  useEffect(() => {
    var axios = require("axios");

    var config = {
      method: "get",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/api/v1.1/LocationType/GetAllLocationType"
        : "http://test.e-deshdelivery.com/api/v1.1/LocationType/GetAllLocationType",
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);

        return json_object;
      })
      .then((res) => {
        setinformation(res.data);

        setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="col-lg-3 col-md-6">
      <div className="form-group mb-3 cc">
        <label for="simpleinput">Location Type</label>
        <select
          className="form-control "
          id="example-select"
          name="type"
          required
          style={{ background: "gainsboro" }}
          onChange={(e) => setArea(e.target.value)}
        >
          <option selected={area === ""} hidden>
            Select Area Type
          </option>

          {information?.map((typee) => (
            <option key={typee.locationTypeId} value={typee.locationTypeId}>
              {typee.locationTypeName}{" "}
            </option>
          ))}
        </select>
        {/* @error('type')
                                                    <span className="text-danger">{{ $message }}</span>
                                                    @enderror */}
      </div>
    </div>
  );
};

export default AreaType;
