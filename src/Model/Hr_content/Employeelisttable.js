import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const Employelisttable = (props) =>{
   
    // const [searchTerm, setSearchTerm] = React.useState([]);
    // const [searchResults, setSearchResults] = React.useState([]);
    // const handleonChange = event => {
    //    setSearchTerm(event.target.value);
    //  };
    // React.useEffect(() => {
    //   const users1 =json_information.message.holded_product_list.filter(p =>
    //        p.ordeR_ID.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())
   
    //      );
         
    //      setSearchResults(users1);
    //  }, [searchTerm]);
  
    return(
            <>
                    <div className="container-fluid">
                  
                    <div className="row n">
                        <div className="col-8 mx-5">
                        <div className="">
                        <form>
                            <div className="input-group">
                                    <input type="text" className="form-control mx-2" placeholder="Type here......." />
                                    <div className="input-group-append">
                                    {/* value={searchTerm} onChange={handleonChange} */}
                                    </div>
                            </div>
                        </form>  
                        </div>
                        </div>
                   </div>
                            <div>
                                <div className="mt-3">

                                <table className="table table-hover">
                                     <thead className="bg-dark">
                                        <tr className="text-white">
                                        <th scope="col">Employee ID</th>
                                        <th scope="col">Name<br></br> Designation</th>
                                        <th scope="col">Employee Contact<br></br> Emergency Contact</th>
                                        <th scope="col"> Address
                                        </th>
                                        <th scope="col">Employee Zone</th>
                                        <th scope="col">Email
                                        </th>
                                        </tr>
                                     </thead>
                                     <tbody>
                                    
                                   

                                     </tbody>
                                 </table>
                                </div>
                            </div>
                        </div>
            </>
    )
};
export default Employelisttable;