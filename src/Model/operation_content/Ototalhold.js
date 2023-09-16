import React,{useEffect,useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './operation.css';
import './bar.css'
import {Bar,Line} from 'react-chartjs-2';
import {CSVLink} from "react-csv";

const Ototalholdtable = (props) => {
    let json_information=props.response;
    const [returnlen, setreturnlen] = useState([]);
    const [unlen, setunlen] = useState([]);
    const [holdlen, setholdlen] = useState([]);
    const [lostlen, setlostlen] = useState([]);
    const [deliverylen,setdeliverylen] = useState([]);

    useEffect(() => {
        setreturnlen(json_information.message.returned_product_information);
        setunlen(json_information.message.unattempted_product_information);
        setholdlen(json_information.message.holded_product_information);
        setlostlen(json_information.message.lost_product_information);
        setdeliverylen(json_information.message.delevered_product_information);
    }, []);



    console.log(returnlen.length);
    const state = {
        labels: ['Total Delivery', 'Total Lost or Damage', 'Total Hold','Total Return'],
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
                data: [deliverylen.length,lostlen.length,holdlen.length,returnlen.length]
            }
        ]
    }
    const [searchTerm, setSearchTerm] = React.useState([]);
    const [searchResults, setSearchResults] = React.useState([]);
    const handleonChange = event => {
        setSearchTerm(event.target.value);
    };
    React.useEffect(() => {
        const users1 =  json_information.message.holded_product_information.filter(p =>
            p.waybill_number.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())||p.order_id.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())||
            p.consignee_name.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())||
            p.dc_office_name.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())||
            p.customer_name.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())

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
                                    <input type="text" className="form-control mx-2 bg-light border border-warning" placeholder="Type Here......." value={searchTerm} onChange={handleonChange}/>
                                    <div className="input-group-append">

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className=" piechart2 mb-4  mt-3 border justify-content-center d-flex">
                    <Line
                        data={state}
                        options={{
                            title:{
                                display:true,
                                text:'Average Hold per month',
                                fontSize:20
                            },
                            legend:{
                                display:true,
                                position:'right'
                            }
                        }}
                    />
                </div>
                <div>
                    <div>
                        {/*Table*/}
                        <CSVLink data={searchResults} filename={"producthold.csv"} className="btn btn-sm bg-info text-black border-info mb-2">Export csv</CSVLink>
                        <table className="table table-hover mt-5 css-serial">
                            {/*Table head*/}
                            <thead className="bg-dark">
                            <tr className="text-white">
                                <th scope="col">SL</th>
                                <th scope="col">WayBill No<br></br>Order ID</th>
                                <th scope="col">Customer Name</th>
                                <th scope="col">Consignee Name</th>
                                <th scope="col">Product Details</th>
                                <th scope="col">DC Office Name<br></br>Pin Code</th>
                                <th scope="col">Status<br></br>DateTime</th>

                            </tr>

                            </thead>
                            {/*Table head*/}
                            {/*Table body*/}
                            <tbody>
                            {
                                searchResults.map(single_message => {

                                    return(
                                        <tr key={single_message.waybill_number}>
                                            <td></td>
                                            <th scope="row">{single_message.waybill_number}
                                                <br></br>{single_message.order_id}
                                            </th>
                                            <td>{single_message.customer_name}
                                            </td>
                                            <td>{single_message.consignee_name}</td>
                                            <td>{single_message.product_detail}
                                            </td>
                                            <td>{single_message.dc_office_name}<br></br>
                                                {single_message.pincode}
                                            </td>
                                            <td>
                                                {single_message.product_processing_stage}
                                                <br></br>{single_message.product_processing_stage_datetime}
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
export default Ototalholdtable;