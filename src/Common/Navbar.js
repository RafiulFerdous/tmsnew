import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import "./Pcsidebar.css";
//import {Linksidebar} from './Linksidebar';

import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

import { faAngleDown, faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
// import { Linksidebar } from "./Linksidebar";
import SubMenu from "./SubMenu";
import { AiOutlinePoweroff, AiFillSetting } from "react-icons/ai";
import { GoSignOut } from "react-icons/go";
export const Navbar = (props) => {
  let Linksidebar = props.sidebar_manu;
  // console.log("linkside", Linksidebar);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const [loggedout, setloggedout] = useState(false);
  const [Url, setUrl] = useState("");
  useEffect(() => {
    let url = window.location.href;
    url = url.split("/");
    url = url[url.length - 1];
    setUrl(url);
    console.log("URL", url);
  }, []);
  const logout = () => {
    localStorage.clear();
    localStorage.removeItem("user");
    setloggedout(true);
  };
  if (loggedout) {
    return <Redirect to="/" push={true} />;
  }
  const bergerIcon = <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>;
  const downIcon = <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>;
  const userName = JSON.parse(
    localStorage.getItem("logingInformation_LocalStore")
  )?.all_user_list?.employeE_NAME;
  const zone = JSON.parse(localStorage.getItem("logingInformation_LocalStore"))
    ?.all_user_list?.employeE_ZONE;
  // console.log("user Name", userName);
  const clientName = JSON.parse(
    localStorage.getItem("logingInformation_LocalStore")
  )?.all_user_list_Client?.customeR_NAME;
  // console.log("client Name", clientName);

  const storeData = JSON.parse(
    localStorage.getItem("logingInformation_LocalStore")
  )?.all_user_list;
  //console.log("storeData", storeData);
  let sideBar = [];
  if (
    storeData?.employeE_ID == 68990 ||
    storeData?.employeE_ID == 90089 ||
    storeData?.employeE_ID == 230223
  ) {
    sideBar = Linksidebar.filter(
      (e) =>
        e.title !== "SLA" &&
        e.title != "3PL Parcel List" &&
        e.title != "Employee Registration" &&
        e.title != "Payment" &&
        e.title != "Lost Mark" &&
        e.title != "Wrong Menifest Correction" &&
        e.title != "Monitoring"
    );
  } else {
    sideBar = Linksidebar;
  }
  //console.log("eeeee", sideBar);
  return (
    <>
      {/*  */}
      <div
        className="w-100 position-fixed d-flex justify-content-between"
        style={{ backgroundColor: "gainsboro", zIndex: "1000" }}
      >
        <div className="">
          {["left"].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)}>
                {" "}
                <span className="text-dark" style={{ fontSize: "30px" }}>
                  {bergerIcon}
                </span>
              </Button>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                <div
                  style={{
                    width: "270px",
                    background: "black",
                    height: "1000%",
                  }}
                >
                  <div className="mb-2">
                    <img className="w-75" src="./logo.png" alt=""></img>
                  </div>

                  {sideBar.map((item, index) => {
                    return <SubMenu item={item} key={index} />;
                  })}

                  {/* <p>
                    <Link to='/Homeopstable'>
                      <span className="text-white">Home</span>
                    </Link>
                  </p>


                  <p>
                    <Link to='/HomePC'>
                      <span className="text-white">parcel list</span>
                    </Link>
                  </p>

                  <p>
                    <Link to='/centerchangepc'>
                      <span className="text-white">Centerchange</span>
                    </Link>
                  </p>

                  <p>
                    <Link to='/Parceltrackingpc'>
                      <span className="text-white">Parcel Tracking</span>
                    </Link>
                  </p>

                  <p>
                    <Link to='/Pickup'>
                      <span className="text-white">Pickup Request</span>
                    </Link>

                  </p>

                  <p>
                    <Link to='/manifest'>
                      <span className="text-white">Upload CSV</span>
                    </Link>
                  </p>

                  <p>
                    <Link to='/bagcreation'>
                      <span className="text-white">Bag Creation</span>
                    </Link>
                  </p>

                  <p>
                    <Link to='/reroutebagcreation'>
                      <span className="text-white">Re-Route Bag Creation</span>
                    </Link>
                  </p>

                  <p>
                    <Link to='/Returnbagcreation'>
                      <span className="text-white">Return Bag Creation</span>
                    </Link>
                  </p>

                  <p>
                    <Link to='/vehiclecreate'>
                      <span className="text-white">Vehicle Creation</span>
                    </Link>
                  </p>

                  <p>
                    <Link to='/vehiclecreate'>
                      <span className="text-white">Return Vehicle Creation</span>
                    </Link>
                  </p>

                  <p>
                    <Link to='/Confirmsingleproduct'>
                      <span className="text-white">Confirm Single Product</span>
                    </Link>
                  </p>

                  <p>
                    <Link to='/ReturnPcBag'>
                      <span className="text-white">Return Bag Receive</span>
                    </Link>
                  </p>

                  <p>
                    <Link to='/ReturnedProduct'>
                      <span className="text-white">Returned Product</span>
                    </Link>
                  </p>

                  <p>
                    <Link to='/ReturnedProduct'>
                      <span className="text-white">Returned Product</span>
                    </Link>
                  </p>

                  <p>
                    <Link to='/Directrto'>
                      <span className="text-white">RTO</span>
                    </Link>
                  </p>


 */}

                  {/*<p>*/}
                  {/*  <Link to="/Homeopstable">*/}
                  {/*    <span className="text-white">Home</span>*/}
                  {/*  </Link>*/}
                  {/*</p>*/}
                  {/*<p>*/}
                  {/*  <Link to="/HomePC">*/}
                  {/*    <span className="text-white">parcel list</span>*/}
                  {/*  </Link>*/}
                  {/*</p>*/}
                  {/*<p>*/}
                  {/*  <Link to="/centerchangepc">*/}
                  {/*    <span className="text-white">Centerchange</span>*/}
                  {/*  </Link>*/}
                  {/*</p>*/}

                  {/*<p>*/}
                  {/*  <Link to="/Parceltrackingpc">*/}
                  {/*    <span className="text-white">Parcel Tracking</span>*/}
                  {/*  </Link>*/}
                  {/*</p>*/}

                  {/*<p>*/}
                  {/*  <Link to="/Pickup">*/}
                  {/*    <span className="text-white">Pickup Request</span>*/}
                  {/*  </Link>*/}
                  {/*</p>*/}

                  {/*<p>*/}
                  {/*  <Link to="/manifest">*/}
                  {/*    <span className="text-white">Upload CSV</span>*/}
                  {/*  </Link>*/}
                  {/*</p>*/}
                  {/* dropDown start */}
                  {/*<p className="dropdown">*/}
                  {/*  <Link to="/bagcreation">*/}
                  {/*    <div className="d-flex justify-content-center align-items-center">*/}
                  {/*      <span className="text-white dropbtn">Bag Creation</span>{" "}*/}
                  {/*      <span className="text-white fs-5">{downIcon}</span>*/}
                  {/*    </div>*/}
                  {/*  </Link>*/}
                  {/*  <div className="dropdown-content">*/}
                  {/*    <a to="/bagcreation">Link 1</a>*/}
                  {/*    <a href="#">Link 2</a>*/}
                  {/*    <a href="#">Link 3</a>*/}
                  {/*    <Link to="/manifest">*/}
                  {/*      <span className="text-white">Upload CSV</span>*/}
                  {/*    </Link>*/}
                  {/*  </div>*/}
                  {/*</p>*/}
                  {/* dropDown end */}
                </div>
              </Drawer>
            </React.Fragment>
          ))}
        </div>
        <div className="d-flex justify-content-end ">
          <h4 className="mt-2">{zone}</h4>
          <div>
            <label className="dropdown rounded-circle">
              <div className="dd-button">
                <FontAwesomeIcon
                  icon={faUser}
                  className="rounded-circle"
                  id="icn"
                ></FontAwesomeIcon>
                {userName ? (
                  <span className="px-2">{userName}</span>
                ) : (
                  <span className="px-2">{clientName}</span>
                )}
                <AiOutlinePoweroff style={{ fontSize: "22px" }} />
              </div>
              <input type="checkbox" className="dd-input" id="test" />
              <ul className="dd-menu">
                <Link to="/settings">
                  <li className="d-flex align-items-center">
                    <AiFillSetting className="fs-5" />
                    <span className="ps-2">Settings</span>
                  </li>
                </Link>
                <li className="divider" />
                <li className="d-flex align-items-center" onClick={logout}>
                  <GoSignOut className="fs-5" />
                  <span className="ps-2">Log Out</span>
                </li>
              </ul>
            </label>
          </div>
        </div>
      </div>
      {/*  */}
    </>
  );
};
// export default Navbar;
