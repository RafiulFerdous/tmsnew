/* eslint-disable jsx-a11y/anchor-is-valid */
import React , {useState} from 'react';
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Link} from 'react-router-dom';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Redirect } from 'react-router';
export const Navbar1 = () =>{
  const [loggedout, setloggedout] = useState(false)
  const logout = () =>{
      localStorage.clear();
      localStorage.removeItem("user")
      setloggedout(true)
  };
  if(loggedout){
    return <Redirect to="/" push={true}/>
  }
  return(
    <>
    {/* Navbar*/}
                  
                      <div className=" bg-dark">
                      <div className="top_navbar">
                        <div className="top_menu">
                          <div className="logo cnt">
                            <img src="./logo.png" alt=""></img>
                          </div>
                          <label className="dropdown">
                                <div className="dd-button">
                                <FontAwesomeIcon icon={faUser} className=" rounded-circle" id="icn"></FontAwesomeIcon>
                                </div>
                                <input type="checkbox" className="dd-input" id="test" />
                                <ul className="dd-menu">
                                  <li><Link to="#"> Profile</Link></li>
                                  <li><Link to="#">Settings</Link></li>
                                  <li className="divider" />
                                  <li>
                                    <a onClick={logout}>Log Out</a>
                                  </li>
                                </ul>
                              </label>

                        </div>
                    </div>
                    </div>
                   
            
                                {/* Sidebar*/}
            
                                    {/*Search And main*/}
              
                                {/*Footer*/}
        

  </>
  )
};
