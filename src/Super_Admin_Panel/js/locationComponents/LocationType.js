import React from "react";

const LocationType = ({ setLocationType }) => {
  return (
    <div className="col-lg-3 col-md-6">
      <div className="form-group mb-3 cc">
        <label for="simpleinput">Area Type</label>
        <select
          className="form-control "
          id="example-select"
          style={{ background: "gainsboro" }}
          name="type"
          required
          onChange={(e) => setLocationType(e.target.value)}
        >
          <option hidden>Select Area Type</option>
          <option value={1}>Inside</option>
          <option value={2}>Outside</option>
          <option value={3}>SubUrban</option>

          {/* {information?.map((typee) => (
        <option key={typee.locationTypeId} value={typee.locationTypeId}>
          {typee.locationTypeName}{" "}
        </option>
      ))} */}
        </select>
        {/* @error('type')
                                                <span className="text-danger">{{ $message }}</span>
                                                @enderror */}
      </div>
    </div>
  );
};

export default LocationType;
