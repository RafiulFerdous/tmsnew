import React from "react";
import { Link } from "react-router-dom";
import { Button, Result } from "antd";
import "./PageNotFound.css";
const PageNotFound = () => {
  return (
    // <div className="not-found-container">
    //   <div className="page-404">
    //     <p className="page-not">Oops!</p>
    //     <h1 className="line-404">404</h1>
    //     <p className="page-not">Page Not Found!</p>
    //     <Link to={"/"}>
    //       <div className="text-center">
    //         <button className="btn btn-outline-danger px-4">Go Back</button>
    //       </div>
    //     </Link>
    //   </div>
    // </div>
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to={"/"}>
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  );
};

export default PageNotFound;
