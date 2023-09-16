import React , {useState,useContext,useEffect}  from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import { SearchContext } from "../Context/searchContext";
import {SearchButtonContext} from '../Context/buttonContext';
const Search = () =>{
    var {searchInformation, setsearchInformation} = useContext(SearchContext);
    var {searchButtonInformation,setsearchButtonInformation} = useContext(SearchButtonContext);

    return(
        <>
                      
            {/*Search*/}
            
            <div>
            <form>
                <div className="input-group">
                        <input type="text" className="form-control mx-2" placeholder="Type here...." value={searchInformation} onChange={(e)=>{ setsearchInformation(e.target.value) }} />
                        <div className="input-group-append">
                            <button className="btn btn-dark mt-1" type="button" onClick={()=>setsearchButtonInformation(true)}>search</button>
                        </div>
                </div>
            </form>  
            </div>
                         
                                            
                    
        </>
    )
};
export default Search;