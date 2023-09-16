import React,{useState,useEffect,useContext}  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar} from '../../Common/Navbar';
import Sidebar from '../../Common/Sidebar';
import Search from '../../Common/Search';
import Footer from '../../Common/Footer';
import '../css/all.css';
import Spickuprequestform from '../../Model/Sales_content/pickupform';

import {LoginContext} from '../../Context/loginContext';
import { SearchContext} from '../../Context/searchContext';
import {SearchButtonContext} from '../../Context/buttonContext';
import {Linksidebar,CustomerCareLinksidebar,Salessidebar,Operationsidebar,} from '../../Common/Linksidebar';

let employee_degignation_list = {
  ProcessingCenter : "PROCESSING CENTER",
  DistrictIncharge : "DISTRICT INCHARGE",
  CustomerCare : "CUSTOMER CARE",
  FieldExecutive : "FIELD EXECUTIVE",
  Marketing_executive : "MARKETING EXECUTIVE",
  Operation : "OPERATION",
  Finance : "FINANCE",
  Admin : "ADMIN",
  SuperAdmin : "SUPERADMIN",
  Customer : "CUSTOMER"
}

const SalesPickupform=() =>{
    const [sidebar_manu_state, setsidebar_manu_state] = useState([]);
    var {loginInformation,setloginInformation} = useContext(LoginContext);

    var {loginInformation,setloginInformation} = useContext(LoginContext);
    var {searchInformation, setsearchInformation} = useContext(SearchContext);
    var {searchButtonInformation,setsearchButtonInformation} = useContext(SearchButtonContext);
    if(searchButtonInformation){
      console.log(searchInformation);
      setsearchInformation("");
      setsearchButtonInformation(false);
    }

    
    useEffect(()=>{
        if(loginInformation.user_type == "Client"){
            setsidebar_manu_state(CustomerCareLinksidebar);
          }
          else if(loginInformation.all_user_list.employeE_DEGIGNATION == employee_degignation_list.ProcessingCenter)
            setsidebar_manu_state(Linksidebar);
          else if(loginInformation.all_user_list.employeE_DEGIGNATION == employee_degignation_list.DistrictIncharge)
            setsidebar_manu_state(Operationsidebar);
          else if(loginInformation.all_user_list.employeE_DEGIGNATION == employee_degignation_list.FieldExecutive)
            setsidebar_manu_state(Salessidebar);
    },[])
    
    return(
        <>
            <div className="bodydiv">
          <div className="row">
              <div className="col-12 bg-dark position-fixed">
                  <Navbar sidebar_manu={sidebar_manu_state}/>
              </div>
          </div>
            {/* <div className="row">
                  <div className="col-12">
                   <Sidebar sidebar_manu={sidebar_manu_state}/>
                  </div>
                  </div> */}
                    
                       <div className="row container">
                            <div className="col-6 " id="srchmenu">
                                    <Search/>
                            </div>
                       </div>
                   
           
            <div className="row container">
                            <div className="col-12" id="sr">
                               <Spickuprequestform/>
                            </div>
                          </div>
                <div className="row">
                      <div className="col-12">
                      <Footer/>

                      </div>
                </div>
        </div>

        </>
    )
};
export default SalesPickupform;