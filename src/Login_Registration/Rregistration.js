import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'
import {faUser,faUnlockAlt,faHome,faEnvelope,faBriefcase, faPhone} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {BrowserRouter,Link} from 'react-router-dom';


const Registration = () => {
    return (
        <div>
            <Registration_Card_View></Registration_Card_View>
        </div>
    )
}


let Registration_Card_View = ()=>{
    return (
        <div className="container-fluid">
            <div className="row maxx_hheight justify-content-center mx-auto align-items-center">
                <div className="col-sm-10 col-md-8 col-lg-5 text-align-center mx-auto">
                    <div className="card card-body mx-auto text-align-center my-4 card_border_redius box_shadow">
                        <div className="container">
                            <div className="row justify-content-center mx-auto">
                                <div className="col-6">
                                    <img className="d-block w-100" src="/images/e_desh_logo.png"></img>
                                </div>
                            </div>
                        </div>
                        <div className="card-title text-center text-white mt-5">
                            <h6 className="text-dark">Kindly Fillup the Registration Form</h6>
                        </div>

                        <div className="text-center mt-2">
                            <form className="mx-auto text-center">

                                <div className="input-group mx-2">
                                    <div className="input-group-prepand">
                                       <span><FontAwesomeIcon icon={faUser} className="fa-lg mt-1"/></span> 
                                    </div>
                                    <input type="text" id="UserName" className="shadow-lg form-control mx-2 bg-white rounded" placeholder="EMPLOYEE_ID"></input>
                                </div>

                                <div className="input-group mx-2 my-3">
                                    <div className="input-group-prepand">
                                       <span><FontAwesomeIcon icon={faUser} className="fa-lg mt-1"/></span> 
                                    </div>
                                    <input type="text" id="UserName" className="shadow-lg form-control mx-2 bg-white rounded" placeholder="EMPLOYEE_NAME"></input>
                                </div>

                                <div className="input-group mx-2 my-3">
                                    <div className="input-group-prepand">
                                       <span><FontAwesomeIcon icon={faUser} className="fa-lg mt-1"/></span> 
                                    </div>
                                    <input type="text" id="UserName" className="shadow-lg form-control mx-2 bg-white rounded" placeholder="EMPLOYEE_USER_ID"></input>
                                </div>

                                <div className="input-group mx-2 my-3">
                                    <div className="input-group-prepand">
                                       <span><FontAwesomeIcon icon={faUnlockAlt} className="fa-lg mt-1"/></span> 
                                    </div>
                                    <input type="text" id="UserName" className="shadow-lg form-control mx-2 bg-white rounded" placeholder="EMPLOYEE_PASSWORD"></input>
                                </div>

                                <div className="input-group mx-2 my-3">
                                    <div className="input-group-prepand">
                                       <span><FontAwesomeIcon icon={faHome} className="fa-lg mt-1"/></span> 
                                    </div>
                                    <input type="text" id="UserName" className="shadow-lg form-control mx-2 bg-white rounded" placeholder="EMPLOYEE_ADDRESS"></input>
                                </div>

                                <div className="input-group mx-2 my-3">
                                    <div className="input-group-prepand">
                                       <span><FontAwesomeIcon icon={faHome} className="fa-lg mt-1"/></span> 
                                    </div>
                                    <input type="text" id="UserName" className="shadow-lg form-control mx-2 bg-white rounded" placeholder="EMPLOYEE_ZONE"></input>
                                </div>

                                <div className="input-group mx-2 my-3">
                                    <div className="input-group-prepand">
                                       <span><FontAwesomeIcon icon={faBriefcase} className="fa-lg mt-1"/></span> 
                                    </div>
                                    <input type="text" id="UserName" className="shadow-lg form-control mx-2 bg-white rounded" placeholder="EMPLOYEE_DEGIGNATION"></input>
                                </div>

                                <div className="input-group mx-2 my-3">
                                    <div className="input-group-prepand">
                                       <span><FontAwesomeIcon icon={faBriefcase} className="fa-lg mt-1"/></span> 
                                    </div>
                                    <input type="text" id="UserName" className="shadow-lg form-control mx-2 bg-white rounded" placeholder="EMPLOYEE_TYPE"></input>
                                </div>

                                <div className="input-group mx-2 my-3">
                                    <div className="input-group-prepand">
                                       <span><FontAwesomeIcon icon={faPhone} className="fa-lg mt-1"/></span> 
                                    </div>
                                    <input type="text" id="UserName" className="shadow-lg form-control mx-2 bg-white rounded" placeholder="EMPLOYEE_CONTACT"></input>
                                </div>

                                <div className="input-group mx-2 my-3">
                                    <div className="input-group-prepand">
                                       <span><FontAwesomeIcon icon={faPhone} className="fa-lg mt-1"/></span> 
                                    </div>
                                    <input type="text" id="UserName" className="shadow-lg form-control mx-2 bg-white rounded" placeholder="EMPLOYEE_EMERGENCY_CONTACT"></input>
                                </div>

                                <div className="input-group mx-2 my-3">
                                    <div className="input-group-prepand">
                                       <span><FontAwesomeIcon icon={faEnvelope} className="fa-lg mt-1"/></span> 
                                    </div>
                                    <input type="text" id="UserName" className="shadow-lg form-control mx-2 bg-white rounded" placeholder="EMPLOYEE_EMAIL"></input>
                                </div>

                            </form>
                        </div>

                        <div className="text-align-center mx-auto">
                            <button className="btn btn-primary btn-sm my-3">Submit</button>
                        </div>
                        <div className="test-align-center mx-auto mb-5">
                            <p>Already Have an Account? 
                                <BrowserRouter>
                                <Link to="/">Login</Link>
                                </BrowserRouter>
                                </p> 
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}


export default Registration;
