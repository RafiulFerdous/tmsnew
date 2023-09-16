import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 15px;
  transition:all 0.3s ease-in-out;

  &:hover {
    background: green;
    border-left: 4px solid blue;
    cursor: pointer;
    color: white;
  }
`;
// margin-left: 16px;
const SidebarLabel = styled.span``;

const DropdownLink = styled(Link)`
  background: #252831;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 15px;
  transition:all 0.3s ease-in-out;

  &:hover {
    background: green;
    cursor: pointer;
    border-left: 4px solid blue;
    color: white;
  }
`;

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  const [Url, setUrl] = useState("");
  useEffect(() => {
    let url = window.location.href;
    url = url.split("/");
    url = url[url.length - 1];
    setUrl(url);
    console.log("URL", url);
  }, []);

  return (
    <>
      <SidebarLink
        to={item.path}
        onClick={item.subNav && showSubnav}
        className={"/" + Url === item.path ? "bg-primary" : ""}
      >
        <div>
          <span className="p-2 fs-5 text-white">{item.icon}</span>
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink
              to={item.path}
              key={index}
              className={"/" + Url === item.path ? "bg-primary" : ""}
            >
              <span className="p-2 fs-5 text-white">{item.icon}</span>
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;
