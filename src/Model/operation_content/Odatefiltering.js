import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './operation.css'
const Odatefilteringtable = () => {
    return (
        <>
                    <div className="container-fluid">
                                    <div className="row border mb-3">
                                        <div className="col-md-12 mb-2 d-flex justify-content-center">
                                        <form className="form-inline">
                                            From Date: <input type="date" className="input-small px-3 mx-2" />
                                            To Date: <input type="date" className="input-small mb-3 mt-3  px-3 mx-2" />
                                            <button type="submit" className="btn btn-dark ">Confirm</button>
                                        </form>       
                                        </div>      
                                    </div>
                            <div>
                                <div>
                                {/*Table*/}
                                        <table className="table table-hover">
                                        {/*Table head*/}
                                            <thead className="bg-dark">
                                                    <tr className="text-white">
                                                        <th scope="col">PickUp Location</th>
                                                        <th scope="col">ID</th>
                                                        <th scope="col">Customer Details</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Payment Info</th>
                                                        <th scope="col">Last Updated</th>
                                                    </tr>
                                            </thead>
                                            {/*Table head*/}
                                            {/*Table body*/}
                                            <tbody>
                                                    <tr>
                                                        <td>Dhaka</td>
                                                        <td>1234</td>
                                                        <td>Dhamaka</td>
                                                        <td>
                                                            <button className="btn btn-dark text-white btn-lg"></button>
                                                        </td>
                                                        <td> 174000</td>
                                                        <td> 19-7-21</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Dhaka</td>
                                                        <td>1234</td>
                                                        <td>Dhamaka</td>
                                                        <td>
                                                            <button className="btn btn-dark text-white btn-lg"></button>
                                                        </td>
                                                        <td> 174000</td>
                                                        <td> 19-7-21</td>
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
export default Odatefilteringtable;