import React, { useState } from "react";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Loader = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("green");
  return (
    <div className="d-flex mt-5">
      <div className="m-auto">
        <div className="sweet-loading p-5 shadow-lg ">
          <HashLoader color={color} css={override} size={100} />
        </div>
      </div>
    </div>
  );
};

export default Loader;
