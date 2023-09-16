import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './operation.css'
const Opickuprequest = () =>{

    return(
        <div className="container">
                            <div id="requesttable">
                                <div>
                                {/*Table*/}
                                <table className="table table-hover">
                                    {/*Table head*/}
                                    <thead className="bg-dark">
                                    <tr className="text-white">
                                        <th>Marchant/Shop Name<br></br>Contact Person</th>
                                        <th>Consignee Name<br></br>Contact Number</th>
                                        <th>Delivery Address</th>
                                        <th>Mobile Number</th>
                                        <th>Total COD Amount</th>
                                        <th>Product Type</th>
                                    </tr>
                                    </thead>
                                    {/*Table head*/}
                                    {/*Table body*/}
                                    <tbody>
                                    <tr>
                                        <th scope="row">Mithela Collection<br></br>
                                            Mahfuz-018xxxxxxx </th>
                                        <td>Abul Kalam<br></br>
                                             019xxxxxxxx</td>
                                        <td>Gulsan-2, Road-6, House-12 Dhaka Bangladesh</td>
                                        <td>017xxxxxxxx</td>
                                        <td>12,400Tk</td>
                                        <td>Electronics</td>
                                    </tr>
                                    </tbody>
                                    {/*Table body*/}
                                </table>
                                {/*Table*/}
                                </div>
                            </div>
                        </div>

    )
};
export default Opickuprequest;