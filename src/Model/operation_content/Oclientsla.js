import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './operation.css';


const Oclientsla = () => {
    return (
        <>
           
                    <div className="container-fluid">
                            <div>
                                <div>
                                {/*Table*/}
                                <table className="table table-hover">
                                    {/*Table head*/}
                                <thead className="bg-dark">
                                  <tr className="text-white">
                                    <th scope="col">Client Name</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Client Address</th>
                                    <th scope="col">Payment Info</th>
                                    <th scope="col">Last Updated</th>
                                  </tr>
                                </thead>
                                    {/*Table head*/}
                                    {/*Table body*/}
                                    <tbody>
                                    <tr>
                                        <td>Alesha Mart</td>
                                        <td>1234</td>
                                        <td>Banani</td>
                                        <td>TK.230000</td>
                                        <td>20-7-21</td>
                                        
                                    </tr>
                                    <tr>
                                        <td>Boomboom</td>
                                        <td>1234</td>
                                        <td>Dhaka</td>
                                        <td>TK.170000</td>
                                        <td>20-7-21</td>
                                    </tr>
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
export default Oclientsla;