import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './operation.css';
import {Bar} from 'react-chartjs-2';
const state = {
    labels: ['Alesha', 'PriyoShop', 'Dhamaka'],
        datasets: [
        {
        label: ' Total Delivery Statement',
        backgroundColor: '#FFA500',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [0, 1800, 1500]
        }
        ]
}
const Odeliverytable = () => {
    return (
        <>
                    <div className="container-fluid">
                                <div className="w-50 barchart">
                                    <Bar
                                        data={state}
                                        options={{
                                            title:{
                                            display:true,
                                            text:'Average Return per month',
                                            fontSize:20
                                            },
                                            legend:{
                                            display:true,
                                            }
                                        }}
                                    />
                                </div>
                            <div>
                                <div>
                                {/*Table*/}
                                <table className="table table-hover">
                                    {/*Table head*/}
                                <thead className="bg-dark">
                                  <tr className="text-white">
                                    <th scope="col">Client Name</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Customer Address</th>
                                    <th scope="col">Total Delivery</th>
                                    <th scope="col">Last Updated</th>
                                  </tr>
                                </thead>
                                    {/*Table head*/}
                                    {/*Table body*/}
                                    <tbody>
                                    <tr>
                                        <td>Priyo Shop</td>
                                        <td>1234</td>
                                        <td>DHaka</td>
                                        <td>1800</td>
                                        <td> 19-7-21</td>
                                    </tr>
                                    <tr>
                                        <td>Dhamaka</td>
                                        <td>2360</td>
                                        <td>Gulsan</td>
                                        <td>1500</td>
                                        <td> 20-7-21</td>
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
export default Odeliverytable;