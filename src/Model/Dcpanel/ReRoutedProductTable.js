import React,{useState,useEffect,useContext}  from 'react';
import './css/home.css'

export default function ReRoutedProductTable(props) {
    let regular_bag_list = props.response
    const [searchTerm,setsearchTerm] =useState("")
    const [searchResult,setsearchResult]=useState("")
    useEffect(()=>{
        setsearchResult(regular_bag_list.message.returnProductInformation)
    },[])
    return (
        <div>
             <div className="container" >
                <div className='d-flex justify-content-center my-2'>
                    <div className="input-group w-50">
                        <input type="text" className="form-control mx-2" placeholder="search......."
                               value={searchTerm} onChange={e=>setsearchTerm(e.target.value)} />
                    </div>
                </div>

                <div>

                    <table className="table table-hover" id="dctable">
                        <thead className="bg-dark">
                        <tr className="text-white">
                            <th scope="col">Order Id</th>
                            <th scope="col">WayBill</th>
                            <th>Customer</th>
                            <th scope="col">Consignee</th>
                            <th>Address</th>
                            <th scope="col">Pincode</th>

                            <th scope="col">Contact</th>
                            <th>DC</th>
                            <th>COD</th>
                            <th scope="col">Entry DateTime</th>
                            {/* <th>totaL VALUE OF BAG</th> */}
                        </tr>
                        </thead>
                        <tbody>
                        {
                            searchResult&&searchResult.map(single_message => {
                                // console.log(single_message)
                                return(

                                    <tr key={single_message.baG_ID_NUMBER} /*onClick={()=>bag_row_clicked_function(single_message.baG_ID_NUMBER)}*/>
                                        <td>
                                            {single_message.order_id}

                                        </td>
                                        <td>
                                            {single_message.waybill_number}

                                        </td>
                                        <td>
                                            {single_message.customer_name} </td>
                                        <td>{single_message.consignee_name}</td>
                                        <td>
                                            {single_message.address}</td>
                                        <td>{single_message.pincode}</td>

                                        <td>{single_message.contact}</td>
                                        <td>
                                            {single_message.dc_office_name}</td>
                                        <td>
                                            {single_message.product_value}</td>
                                        <td>{single_message.product_entry_date_time}</td>
                                        {/* <td>{single_message.totaL_VALUE_OF_BAG}</td> */}

                                    </tr>

                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>

            </div>
            
        </div>
    )
}
