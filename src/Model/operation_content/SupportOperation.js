import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './operation.css';
import {CSVLink} from "react-csv";
const Operationsupport = (props) => {
    let json_information=props.response;
    const [searchTerm, setSearchTerm] = React.useState([]);
    const [searchResults, setSearchResults] = React.useState([]);
    const handleonChange = event => {
       setSearchTerm(event.target.value);
     };
    React.useEffect(() => {
      const users1 =  json_information.message.all_customer_query.filter(p =>
           p.clienT_NAME.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())||p.clienT_CONTACT_NUMBER.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())||
           p.clienT_QUERY.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())
   
         );
         setSearchResults(users1);
     }, [searchTerm]);
    return (
        <>
                    <div className="container-fluid">
                    <div className="row n">
                        <div className="col-8 mx-5">
                        <div className="">
                        <form>
                            <div className="input-group">
                                    <input type="text" className="form-control mx-2 border border-warning" placeholder="type here......." value={searchTerm} onChange={handleonChange}/>
                                    <div className="input-group-append">
                                       
                                    </div>
                            </div>
                        </form>  
                        </div>
                        </div>
                   </div>
                            <div>
                                <div className="mt-3">
                                {/*Table*/}
                                <table className="table table-hover css-serial">
                                    {/*Table head*/}
                                <thead className="bg-dark">
                                  <tr className="text-white">
                                  <th scope="col">SL</th>
                                    <th scope="col">Client Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone Number</th>
                                    <th scope="col">Message</th>
                                    <th>DateTime</th>
                                      <th>
                                          <CSVLink data={searchResults} filename={"Support.csv"} className="btn btn-sm bg-info text-black border-info mb-2">Export csv</CSVLink>
                                      </th>
                                  </tr>
                                </thead>
                                    {/*Table head*/}
                                    {/*Table body*/}
                                        <tbody>
                                        {
                                            searchResults.map(single_message => {
                                            
                                             return(
                                                 <tr key={single_message.clienT_NAME}>
                                                 <td></td>
                                                     <th scope="row">{single_message.clienT_NAME}
                                                  
                                                     </th>
                                                     <td>{single_message.clienT_EMAIL}
                                                     </td>
                                                     <td>{single_message.clienT_CONTACT_NUMBER}</td>
                                                    
                                                     <td>
                                                         {single_message.clienT_QUERY}
                                                       
                                                     </td>
                                                     <td>
                                                         {single_message.querY_DATETIME}
                                                        
                                                     </td> 
                                                    
                                                 </tr>
                                             )
                                         })  
                                     }
                                        </tbody>
                                    {/*Table body*/}
                                </table>
                                {/*Table*/}
                                </div>
                            </div>
                        </div>    
      </>
    );
}
export default Operationsupport;