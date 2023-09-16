import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './operation.css';
import {Pie, Bar} from 'react-chartjs-2';
import './bar.css'
const  Operformance = (props) => {
    let json_information=props.response;
    const state = {
        labels: ['Total Delivery', 'Total Lost or Damage', 'Total Hold','Total Return','Total Unattempted'],
        datasets: [
          {
            label: 'Volume',
            backgroundColor: [
              '#2FDE00',
              '#B21F00',
              '#C9DE00',
              '#FFA500',
              '#4287f5'
              
            ],
            hoverBackgroundColor: [
            '#501800',
            '#4B5000',
            '#175000',
            '#FFA500',
            '#9942f5'
            ],
            data: [json_information.message.total_delevered_product,json_information.message.total_lost_product,
                json_information.message.total_holded_product,json_information.message.total_returned_product,json_information.message.total_unattempted_product]
          }
        ]
      }
      const barstate = {
        labels: ['COD Amount'],
            datasets: [
            {
            label: 'Total COD Statement',
            backgroundColor: '#00008B',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [json_information.message.total_collected_cod]
            }
            ]
    }
    return (
        <>
                    <div className="container-fluid">
                            <div className=" piechart mb-4 border">
                                        <Pie
                                        data={state}
                                        options={{
                                            title:{
                                            display:true,
                                            text:'Average Volume per month',
                                            fontSize:20
                                            },
                                            legend:{
                                            display:true,
                                            position:'right'
                                            }
                                        }}
                                        />
                                    </div>
                                    <div className="w-50 barchartvolume mb-4 border">
                                    <Bar
                                        data={barstate}
                                        options={{
                                            title:{
                                            display:true,
                                            text:'Total COD per month',
                                            fontSize:20
                                            },
                                            legend:{
                                            display:true,
                                            position:'right'
                                            }
                                        }}
                                    />
                                </div>
                                <div className="devicer"></div>
                            <div>
                                <div id="tbletop">
                                {/*Table*/}
                                <table className="table table-hover">
                                    {/*Table head*/}
                                <thead className="bg-dark">
                                  <tr className="text-white">
                                    
                                    <th scope="col">Total Delivery</th>
                                    <th scope="col">Total Lost</th>
                                    <th scope="col">Total Hold</th>
                                    <th scope="col">Total Return</th>
                                    <th scope="col">Total Unattempted</th>
                                    <th scope="col">Total COD Amount</th>
                                  </tr>
                                </thead>
                                    {/*Table head*/}
                                    {/*Table body*/}
                                    <tbody>
                                    <tr>
                                        <td>{json_information.message.total_delevered_product}</td>
                                        <td>{json_information.message.total_lost_product}</td>
                                        <td>{json_information.message.total_holded_product}</td>
                                        <td>{json_information.message.total_returned_product}</td>
                                        <td>{json_information.message.total_unattempted_product}</td>
                                        <td>{json_information.message.total_collected_cod}</td>
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
export default Operformance;