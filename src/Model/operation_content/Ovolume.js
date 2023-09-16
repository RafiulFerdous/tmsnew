import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './operation.css';
import {Pie, Bar} from 'react-chartjs-2';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './bar.css'
const Ovolumetable = (props) => {
    let json_information=props.response;
    const pdfGenerate =()=>{
        const  doc = new jsPDF('portrait','px','a4');
        doc.autoTable({html: '#trr'});
        doc.save ('Report.pdf')
    }
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
                            <div className="d-flex flex-row" id="card">
                                <div className="p-2 bg-success text-white">Delivered</div>
                                <div className="p-2 bg-info text-white">Return</div>
                                <div className="p-2 bg-warning text-white">Hold</div>
                                <div className="p-2 bg-danger text-white">Lost</div>
                                <div className="p-2 bg-primary text-white">Unattempted</div>
                                </div>
                                
                            <div>
                            <div className="row">
                                        <div className="col-md-12 d-flex justify-content-start">
                                        <button className="js-download-link button bg-success border border-success btn-sm mb-2 mx-2 text-white" onClick={()=>pdfGenerate()}>Download PDF File</button>
                                        <div>  
                                        <ReactHTMLTableToExcel  
                                                className="js-download-link button bg-info border border-info px-4 btn-sm mb-2 mx-2 text-white"  
                                                table="vol"  
                                                filename="ReportExcel"  
                                                sheet="Sheet"  
                                                buttonText="Export excel" />  
                                </div>  
                                        </div>
                                        
                                       
                                    </div>
                                <div id="tbletop">
                                {/*Table*/}
                                <table className="table table-sm table-hover mt-5 css-serial" id="vol">
                                    {/*Table head*/}
                                    <thead className="bg-dark">
                                    <tr className="text-white">
                                    <th scope="col">SL</th>
                                    <th scope="col">WayBill No</th>
                                    <th>Order ID</th>
                                    <th scope="col">Customer Name</th>
                                    <th scope="col">Consignee Name</th>
                                    <th scope="col">Consignee Number</th>
                                    <th scope="col">Consignee Address</th>
                                    <th scope="col">Product Details</th>
                                    <th scope="col">DC Office Name</th>
                                    <th>Pin Code</th>
                                    <th scope="col">Status</th>
                                    <th>Date Time</th>
                                    
                                    </tr>
                                    
                                    </thead>
                                    {/*Table head*/}
                                    {/*Table body*/}
                                    <tbody>
                                    {
                                         json_information.message.all_information.map(infor => {
                                            
                                             return(
                                                 infor.unattempted_product_list.map(single_message=>{
                                                     return(
                                                        <tr key={single_message.waybill_number}>
                                                        <td></td>
                                                        <td>{single_message.waybill_number}
                                                        </td>
                                                        <td>{single_message.order_id}
                                                        </td>
                                                        <td>{single_message.customer_name}
                                                        </td>
                                                        <td>{single_message.consignee_name}</td>
                                                        <td>{single_message.consignee_number}</td>
                                                        <td>{single_message.consignee_address}</td>
                                                        <td>{single_message.product_detail}
                                                        </td>
                                                        <td>{single_message.dc_office_name}</td>
                                                        <td>
                                                        {single_message.pincode}
                                                        </td>
                                                        <td className="bg-primary text-white">
                                                            {single_message.product_processing_stage}
                                                            </td>
                                                            <td>
                                                            {single_message.product_processing_stage_datetime}
                                                        </td> 
                                                    </tr>
                                                     )
                                                 })

                                                
                                             )
                                         })  
                                     }
                                    {
                                         json_information.message.all_information.map(infor => {
                                            
                                             return(
                                                 infor.delevered_product_list.map(single_message=>{
                                                     return(
                                                        <tr key={single_message.waybill_number}>
                                                        <td></td>
                                                        <th scope="row">{single_message.waybill_number}
                                                        <br></br>{single_message.order_id}
                                                        </th>
                                                        <td>{single_message.customer_name}
                                                        </td>
                                                        <td>{single_message.consignee_name}</td>
                                                        <td>{single_message.consignee_number}</td>
                                                        <td>{single_message.consignee_address}</td>
                                                        <td>{single_message.product_detail}
                                                        </td>
                                                        <td>{single_message.dc_office_name}<br></br>
                                                        {single_message.pincode}
                                                        </td>
                                                        <td className="bg-success text-white">
                                                            {single_message.product_processing_stage}
                                                            <br></br>{single_message.product_processing_stage_datetime}
                                                        </td> 
                                                    </tr>
                                                     )
                                                 })

                                                
                                             )
                                         })  
                                     }
                                      {
                                         json_information.message.all_information.map(infor => {
                                            
                                             return(
                                                 infor.returned_product_list.map(single_message=>{
                                                     return(
                                                        <tr key={single_message.waybill_number}>
                                                        <td></td>
                                                        <th scope="row">{single_message.waybill_number}
                                                        <br></br>{single_message.order_id}
                                                        </th>
                                                        <td>{single_message.customer_name}
                                                        </td>
                                                        <td>{single_message.consignee_name}</td>
                                                        <td>{single_message.consignee_number}</td>
                                                        <td>{single_message.consignee_address}</td>
                                                        <td>{single_message.product_detail}
                                                        </td>
                                                        <td>{single_message.dc_office_name}<br></br>
                                                        {single_message.pincode}
                                                        </td>
                                                        <td className="bg-info text-white">
                                                            {single_message.product_processing_stage}
                                                            <br></br>{single_message.product_processing_stage_datetime}
                                                        </td> 
                                                    </tr>
                                                     )
                                                 })

                                                
                                             )
                                         })  
                                     }
                                     {
                                         json_information.message.all_information.map(infor => {
                                            
                                             return(
                                                 infor.holded_product_list.map(single_message=>{
                                                     return(
                                                        <tr key={single_message.waybill_number}>
                                                        <td></td>
                                                        <th scope="row">{single_message.waybill_number}
                                                        <br></br>{single_message.order_id}
                                                        </th>
                                                        <td>{single_message.customer_name}
                                                        </td>
                                                        <td>{single_message.consignee_name}</td>
                                                        <td>{single_message.consignee_number}</td>
                                                        <td>{single_message.consignee_address}</td>
                                                        <td>{single_message.product_detail}
                                                        </td>
                                                        <td>{single_message.dc_office_name}<br></br>
                                                        {single_message.pincode}
                                                        </td>
                                                        <td className="bg-warning text-white">
                                                            {single_message.product_processing_stage}
                                                            <br></br>{single_message.product_processing_stage_datetime}
                                                        </td> 
                                                    </tr>
                                                     )
                                                 })

                                                
                                             )
                                         })  
                                     }
                                      {
                                         json_information.message.all_information.map(infor => {
                                            
                                             return(
                                                 infor.lost_product_list.map(single_message=>{
                                                     return(
                                                        <tr key={single_message.waybill_number}>
                                                        <td></td>
                                                        <th scope="row">{single_message.waybill_number}
                                                        <br></br>{single_message.order_id}
                                                        </th>
                                                        <td>{single_message.customer_name}
                                                        </td>
                                                        <td>{single_message.consignee_name}</td>
                                                        <td>{single_message.consignee_number}</td>
                                                        <td>{single_message.consignee_address}</td>
                                                        <td>{single_message.product_detail}
                                                        </td>
                                                        <td>{single_message.dc_office_name}<br></br>
                                                        {single_message.pincode}
                                                        </td>
                                                        <td className="bg-danger text-white">
                                                            {single_message.product_processing_stage}
                                                            <br></br>{single_message.product_processing_stage_datetime}
                                                        </td> 
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
                            <table className="table table-hover mt-5 css-serial" id="trr" style={{display:"none"}}>
                                    {/*Table head*/}
                                    <thead className="bg-dark">
                                    <tr className="text-white">
                                
                                    <th scope="col">WayBill No</th>
                                    <th>Order ID</th>
                                    <th scope="col">Customer Name</th>
                                    <th scope="col">Consignee Name</th>
                                    <th scope="col">Product Details</th>
                                    <th scope="col">DC Office Name</th>
                                     <th> Pin Code</th>
                                     <th>Product Value</th>
                                     <th>Product weight</th>
                                    <th scope="col">Status</th>
                                    <th>Status DateTime</th>
                                    <th>Product Entry DateTime</th>
                                    
                                    </tr>
                                    
                                    </thead>
                                    {/*Table head*/}
                                    {/*Table body*/}
                                    <tbody>
                                    {
                                         json_information.message.all_information.map(infor => {
                                            
                                             return(
                                                 infor.unattempted_product_list.map(single_message=>{
                                                     return(
                                                        <tr key={single_message.waybill_number}>
                                                      
                                                        <th scope="row">{single_message.waybill_number}</th>
                                                        <th>{single_message.order_id}</th>
                                                      
                                                        <td>{single_message.customer_name}
                                                        </td>
                                                        <td>{single_message.consignee_name}</td>
                                                        <td>{single_message.consignee_number}</td>
                                                        <td>{single_message.consignee_address}</td>
                                                        <td>{single_message.product_detail}
                                                        </td>
                                                        <td>{single_message.dc_office_name}
                                                        
                                                        </td>
                                                        <td>{single_message.pincode}</td>
                                                        <td>{single_message.product_value}</td>
                                                        <td>{single_message.product_weight}</td>
                                                        <td className="bg-primary text-white">
                                                            {single_message.product_processing_stage}
                                                            
                                                        </td> 
                                                        <td>{single_message.product_processing_stage_datetime}</td>
                                                        <td>{single_message.product_system_entry_date}</td>
                                                    </tr>
                                                     )
                                                 })

                                                
                                             )
                                         })  
                                     }
                                    {
                                         json_information.message.all_information.map(infor => {
                                            
                                             return(
                                                 infor.delevered_product_list.map(single_message=>{
                                                     return(
                                                        <tr key={single_message.waybill_number}>
                                                        <th scope="row">{single_message.waybill_number}
                                                       
                                                        </th>
                                                        <th>{single_message.order_id}</th>
                                                        <td>{single_message.customer_name}
                                                        </td>
                                                        <td>{single_message.consignee_name}</td>
                                                        <td>{single_message.consignee_number}</td>
                                                        <td>{single_message.consignee_address}</td>
                                                        <td>{single_message.product_detail}
                                                        </td>
                                                        <td>{single_message.dc_office_name}
                                                       
                                                        </td>
                                                        <td> {single_message.pincode}</td>
                                                        <td>{single_message.product_value}</td>
                                                        <td>{single_message.product_weight}</td>
                                                        <td className="bg-success text-white">
                                                            {single_message.product_processing_stage}
                                                        </td> 
                                                        <td>{single_message.product_processing_stage_datetime}</td>
                                                        <td>{single_message.product_system_entry_date}</td>
                                                    </tr>
                                                     )
                                                 })

                                                
                                             )
                                         })  
                                     }
                                      {
                                         json_information.message.all_information.map(infor => {
                                            
                                             return(
                                                 infor.returned_product_list.map(single_message=>{
                                                     return(
                                                        <tr key={single_message.waybill_number}>
                                                        <th scope="row">{single_message.waybill_number}
                                                        </th>
                                                        <th>{single_message.order_id}</th>
                                                        <td>{single_message.customer_name}
                                                        </td>
                                                        <td>{single_message.consignee_name}</td>
                                                        <td>{single_message.consignee_number}</td>
                                                        <td>{single_message.consignee_address}</td>
                                                        <td>{single_message.product_detail}
                                                        </td>
                                                        <td>{single_message.dc_office_name}
                                                        
                                                        </td>
                                                        <td>{single_message.pincode}</td>
                                                        <td>{single_message.product_value}</td>
                                                        <td>{single_message.product_weight}</td>
                                                        <td className="bg-info text-white">
                                                            {single_message.product_processing_stage}
                                                       
                                                        </td> 
                                                        <td>{single_message.product_processing_stage_datetime}</td>
                                                        <td>{single_message.product_system_entry_date}</td>
                                                    </tr>
                                                     )
                                                 })

                                                
                                             )
                                         })  
                                     }
                                     {
                                         json_information.message.all_information.map(infor => {
                                            
                                             return(
                                                 infor.holded_product_list.map(single_message=>{
                                                     return(
                                                        <tr key={single_message.waybill_number}>
                                                        <th scope="row">{single_message.waybill_number}
                                                        </th>
                                                        <th>{single_message.order_id}</th>
                                                        <td>{single_message.customer_name}
                                                        </td>
                                                        <td>{single_message.consignee_name}</td>
                                                        <td>{single_message.consignee_number}</td>
                                                        <td>{single_message.consignee_address}</td>
                                                        <td>{single_message.product_detail}
                                                        </td>
                                                        <td>{single_message.dc_office_name}
                                                       
                                                        </td>
                                                        <td> {single_message.pincode}</td>
                                                        <td>{single_message.product_value}</td>
                                                        <td>{single_message.product_weight}</td>
                                                        <td className="bg-warning text-white">
                                                            {single_message.product_processing_stage}
                                                        </td> 
                                                        <td>{single_message.product_processing_stage_datetime}</td>
                                                        <td>{single_message.product_system_entry_date}</td>
                                                    </tr>
                                                     )
                                                 })

                                                
                                             )
                                         })  
                                     }
                                      {
                                         json_information.message.all_information.map(infor => {
                                            
                                             return(
                                                 infor.lost_product_list.map(single_message=>{
                                                     return(
                                                        <tr key={single_message.waybill_number}>
                                                        <th scope="row">{single_message.waybill_number}
                                                        </th>
                                                        <th>{single_message.order_id}</th>
                                                        <td>{single_message.customer_name}
                                                        </td>
                                                        <td>{single_message.consignee_name}</td>
                                                        <td>{single_message.consignee_number}</td>
                                                        <td>{single_message.consignee_address}</td>
                                                        <td>{single_message.product_detail}
                                                        </td>
                                                        <td>{single_message.dc_office_name}
                                                 
                                                        </td>
                                                        <td>{single_message.pincode}</td>
                                                        <td>{single_message.product_value}</td>
                                                        <td>{single_message.product_weight}</td>
                                                        <td className="bg-danger text-white">
                                                            {single_message.product_processing_stage}
                                                        </td> 
                                                        <td>{single_message.product_processing_stage_datetime}</td>
                                                        <td>{single_message.product_system_entry_date}</td>
                                                    </tr>
                                                     )
                                                 })

                                                
                                             )
                                         })  
                                     }
                                    </tbody>
                                    {/*Table body*/}
                                </table>
                        </div>    
      </>
    );
}
export default Ovolumetable;