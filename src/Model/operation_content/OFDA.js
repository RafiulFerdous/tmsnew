import React, { useEffect, useState, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './operation.css'
const Ofdatable = (props) => {
    let json_information=props.response;
    // const [searchTerm, setSearchTerm] = React.useState("");
    // const handleonChange = event => {
    //     setSearchTerm(event.target.value);
    // };
    const [searchTerm, setSearchTerm] = React.useState([]);
    const [searchResults, setSearchResults] = React.useState([]);
    const handleonChange = event => {
       setSearchTerm(event.target.value);
     };
     useEffect(() => {
        setSearchResults(json_information.message.response)
         
     }, [])
    React.useEffect(() => {
      
      const users1 = json_information.message.response.filter(p =>
           p.waybill_number.includes(searchTerm)||  
           p.dc_office_name.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())
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
                            <div className="input-group ">
                                    <input type="text" className="form-control mx-2 bg-light border border-warning" placeholder="Type Here......."
                                    value={searchTerm} onChange={handleonChange} />
                                    <div className="input-group-append">
                                       
                                    </div>
                            </div>
                        </form>  
                        </div>
                        </div>
                   </div>
                            <div>
                                <div>
                                 {/*Table*/}
                                 <table className="table table-hover mt-5 css-serial">
                                    {/*Table head*/}
                                    <thead className="bg-dark">
                                    <tr className="text-white">
                                    <th scope="col">SL</th>
                                    <th scope="col">WayBill No<br></br>Order ID</th>
                                    <th scope="col">Customer Name</th>
                                    <th scope="col">Consignee Name</th>
                                    <th scope="col">Dc Office Name<br></br>Pin Code</th>
                                    <th scope="col">Product Details<br></br>Weight</th>
                                    <th scope="col">COD Amount</th>
                                    
                                    </tr>
                                    
                                    </thead>
                                    {/*Table head*/}
                                    {/*Table body*/}
                                    <tbody>
                                    {
                                        searchResults.map(single_message => {

                                            
                                             return(
                                                 
                                                    single_message.map(fda =>{
                                                     return(
                                                        <tr key={fda.waybill_number}>
                                                        <td></td>
                                                     <th scope="row">{fda.waybill_number}
                                                     <br></br>{fda.order_id}
                                                     </th>
                                                     <td>{fda.customer_name}
                                                     </td>
                                                     <td>{fda.consignee_name}</td>
                                                     <td>{fda.dc_office_name}<br></br>
                                                     {fda.pincode}
                                                     </td>
                                                     <td>
                                                         {fda.product_detail}
                                                         <br></br>{fda.product_weight}
                                                     </td>
                                                     <td>{fda.product_value}</td> 
                                                 </tr>
                                                     )
                                                 })
                                                 
                                                
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
export default Ofdatable;