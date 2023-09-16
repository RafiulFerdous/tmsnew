import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './operation.css'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
const Opendingcod = (props) => {
    let json_information=props.response;
    const [searchTerm, setSearchTerm] = React.useState([]);
    const [searchResults, setSearchResults] = React.useState([]);
    const handleonChange = event => {
       setSearchTerm(event.target.value);
     };
    React.useEffect(() => {
      const users1 = json_information.message.coD_at_DC.filter(p =>
           p.producT_WAYBILL_NUMBER.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())||p.referencE_NO.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())||
           p.producT_COD_AMOUNT.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())||
           p.producT_PROCESSING_STATUS.toString().toLowerCase().includes(searchTerm.toString().toLowerCase()) ||
           p.coD_COLLECTED_BY_FE_DATETIME.toString().toLowerCase().includes(searchTerm.toString().toLowerCase()) || 
           p.dC_office_name.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())  
         );
      const users2 = json_information.message.coD_at_FE.filter(p =>
           p.producT_WAYBILL_NUMBER.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())||p.referencE_NO.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())||
           p.producT_COD_AMOUNT.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())||
           p.producT_PROCESSING_STATUS.toString().toLowerCase().includes(searchTerm.toString().toLowerCase()) ||
           p.coD_COLLECTED_BY_FE_DATETIME.toString().toLowerCase().includes(searchTerm.toString().toLowerCase()) || 
           p.dC_office_name.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())  
         );
      const users3 = json_information.message.coD_at_PC.filter(p =>
           p.producT_WAYBILL_NUMBER.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())||p.referencE_NO.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())||
           p.producT_COD_AMOUNT.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())||
           p.producT_PROCESSING_STATUS.toString().toLowerCase().includes(searchTerm.toString().toLowerCase()) ||
           p.coD_COLLECTED_BY_FE_DATETIME.toString().toLowerCase().includes(searchTerm.toString().toLowerCase()) || 
           p.dC_office_name.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())  
         );
         setSearchResults(users1.concat(users2).concat(users3));
     }, [searchTerm]);
    return (
        <>
                    <div className="container-fluid">
                                        <div className="row n">
                                            <div className="col-8 mx-5">
                                            <div className="">
                                            <form>
                                                <div className="input-group ">
                                                        <input type="text" className="form-control mx-2 bg-light border border-warning" placeholder="Type Here......." value={searchTerm} onChange={handleonChange}/>
                                                        <div className="input-group-append">
                                                        
                                                        </div>
                                                </div>
                                            </form>  
                                            </div>
                                            </div>
                                    </div>
                                    
                            <div>
                                <div >
                                    <div>
                                    <ReactHTMLTableToExcel
                                    className="js-download-link button bg-info border border-info px-4 btn-sm mb-2 mx-2 text-white"
                                    table="tableq"
                                    filename="ReportExcel"
                                    sheet="Sheet"
                                    buttonText="Export excel" />
                                        
                                    </div>
                                
                                {/*Table*/}
                                <table className="table table-hover mt-5 css-serial" id="tableq">
                                    {/*Table head*/}
                                    <thead className="bg-dark">
                                    <tr className="text-white">
                                    <th scope="col">SL</th>
                                    <th scope="col">WayBill No</th>
                                    <th>DC Office</th>
                                    <th>DC Emp</th>
                                    <th>FE Emp</th>
                                    <th>Order ID</th>
                                    <th scope="col">Payment Type</th>
                                    <th scope="col">Total COD Amount</th>
                                    <th scope="col">Received By</th>
                                    <th scope="col">Status<br></br>Date And Time</th>
                                    
                                    </tr>
                                    
                                    </thead>
                                    {/*Table head*/}
                                    {/*Table body*/}
                                    <tbody>
                                    {
                                        searchResults.map(single_message => {
                                            
                                             return(
                                                 <tr key={single_message.producT_WAYBILL_NUMBER}>
                                                    <td></td>
                                                     <td scope="row">{single_message.producT_WAYBILL_NUMBER}
                                                     </td>

                                                     <td>
                                                         {single_message.dC_office_name}
                                                     </td>
                                                     <td>
                                                         {single_message.dc_employee_name}
                                                     </td>
                                                     <td>
                                                         {single_message.fe_employee_name}
                                                     </td>



                                                     <td>
                                                         {single_message.referencE_NO}
                                                     </td>
                                                     <td>{single_message.producT_PAYMENT_TYPE}
                                                     </td>
                                                     <td>{single_message.producT_COD_AMOUNT}</td>
                                                     <td>{single_message.coD_COLLECTED_BY_FE}-By DC
                                                     </td>
                                                     <td>
                                                         {single_message.producT_PROCESSING_STATUS}
                                                         <br></br>{single_message.coD_COLLECTED_BY_FE_DATETIME}
                                                     </td> 
                                                 </tr>
                                             )
                                         })  
                                     }
                                      {/* {
                                         json_information.message.coD_at_FE.map(single_message => {
                                            
                                             return(
                                                 <tr key={single_message.producT_WAYBILL_NUMBER}>
                                                    <td></td>
                                                     <td scope="row">{single_message.producT_WAYBILL_NUMBER}
                                                     </td>

                                                     <td>
                                                         {single_message.dC_office_name}
                                                     </td>
                                                     <td>
                                                         {single_message.dc_employee_name}
                                                     </td>
                                                     <td>
                                                         {single_message.fe_employee_name}
                                                     </td>
                                                     <td>{single_message.referencE_NO}
                                                     </td>
                                                     <td>{single_message.producT_PAYMENT_TYPE}
                                                     </td>
                                                     <td>{single_message.producT_COD_AMOUNT}</td>
                                                     <td>{single_message.coD_COLLECTED_BY_FE}-By FE
                                                     </td>
                                                     <td>
                                                         {single_message.producT_PROCESSING_STATUS}
                                                         <br></br>{single_message.coD_COLLECTED_BY_FE_DATETIME}
                                                     </td> 
                                                 </tr>
                                             )
                                         })  
                                     } */}
                                    </tbody>
                                    {/*Table body*/}
                                </table>
                                {/*Table*/}
                                {/*Table*/}
                                </div>
                            </div> 
                        </div>
                        
      </>
    );
}
export default Opendingcod;