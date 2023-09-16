import React from 'react';
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Link} from 'react-router-dom';
//import {Linksidebar} from './Linksidebar';

const Sidebar = (props) =>{
 
    let Linksidebar = props.sidebar_manu ;
    return(
        <>
                <div className="wrapper">
                                {/* Sidebar*/}
            <div className="sidebar">
            
              <ul> 
                {Linksidebar.map((item, index) => {
                    return (
                      <li key={index} className={item.cName}>
                          <Link to={item.path}>
                            <span>{item.title}</span>
                          </Link>
                      </li>
                    );
                  })}
              </ul>
             
            </div>
            
            </div>
        </>
    )

};
export default Sidebar;