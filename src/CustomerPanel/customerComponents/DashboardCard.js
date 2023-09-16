import React from "react";

const DashboardCard = ({ icon, text }) => {
  return (
    <div className="row p-2">
      <div className="col-3">
        <div
          style={{
            fontSize: "21px",
            color: "black",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "white",
            textAlign: "center",
            marginLeft: "10px",
          }}
        >
          {icon}
        </div>
      </div>
      <div
        className="col-9"
        style={{
          color: "white",
          textAlign: "start",
          paddingTop: "5px",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default DashboardCard;
