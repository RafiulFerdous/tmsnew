import {React,useState,useEffect,useContext} from 'react'

import {Link,BrowserRouter} from 'react-router-dom';
const Welcome =()=>{
    
    return(
        <div className="center">
            <h1>WELCOME</h1>
            <div>
                <BrowserRouter>
                <button className="btn "><Link to='/login' target='_blank'> Log IN </Link></button>
                </BrowserRouter>
              
            </div>
        </div>
    )

};
export default Welcome;