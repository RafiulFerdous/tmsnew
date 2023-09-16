import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './operation.css';
import {BrowserRouter,Link} from 'react-router-dom';
import {Bar} from 'react-chartjs-2';
import {Linksidebar,CustomerCareLinksidebar,Salessidebar,Operationsidebar,Degital_Ocean_flag,company_name} from '../../Common/Linksidebar';
let employId,setemployId;
let date_time,setdate_time;
let unlock_flag,setunlock_flag;
let waybill_id,setwaybill_id;
let extend,setextend;
let unlock_button;
let extendday_button;
let confirm_unlock_information,setconfirm_unlock_information;
let page_refresh_flag,setpage_refresh_flag;
let  allfilterproductdata,setallfilterproductdata;

const Slacontent = (props) => {
    
    let json_information=props.response;
    const [logingInformation_LocalStore, setlogingInformation_LocalStore] = useState("");
    [employId,setemployId] = useState("");
    [date_time, setdate_time] = useState("");
    [unlock_flag, setunlock_flag] = useState("");
    [waybill_id, setwaybill_id] = useState(-5);
    [extend,setextend ] = useState(0);
    [confirm_unlock_information, setconfirm_unlock_information] = useState("");
    [page_refresh_flag, setpage_refresh_flag] = useState(false);
    [allfilterproductdata,setallfilterproductdata] = useState([])
    let getLogingInformation_LocalStore = ()=>{
        let value = JSON.parse(localStorage.getItem("logingInformation_LocalStore"));
        return value;
      }


      useEffect(()=>{
        let context_flag_obj = null;
        context_flag_obj = getLogingInformation_LocalStore();
        setemployId(context_flag_obj.all_user_list.employeE_ID);
        setlogingInformation_LocalStore(context_flag_obj);
      },[]); 


  
    
    unlock_button = (waybillst_id)=>{
        setwaybill_id(waybillst_id);
        console.log("Confirmed button clicked.",waybillst_id);
        setunlock_flag(unlock_flag => !unlock_flag);
      
    }

    useEffect(()=>{
        let waybill_list = [];
        let extend_day_list = [];
        waybill_list.push(waybill_id);
        extend_day_list.push(parseInt(extend));
      
        var axios = require('axios');
        var data = JSON.stringify({
            "operation_employee_id": employId,
            "waybill_list": waybill_list,
            "extend_day": extend_day_list 
        });

        console.log("confirm button data : ",data);
        var config = {
        method: 'post',
        url: Degital_Ocean_flag ? 'https://e-deshdelivery.com/universalapi/allapi/unlockProduct'+'?company_name='+company_name : '/universalapi/allapi/unlockProduct'+'?company_name='+company_name,
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${logingInformation_LocalStore.token}`
        },
        data : data
        };
        console.log("this is",config);

        axios(config)
        .then(function (response) {
            let json_object_str = JSON.stringify(response.data);
            let json_object = JSON.parse(json_object_str);
            console.log("confirmed button clicked api : ",json_object);
            return(json_object);  
          }).then(res => {
            setconfirm_unlock_information(res);
            setpage_refresh_flag(true);
            setallfilterproductdata(res.message.json_response_list)
            console.log("last api json response : ",res);
          })
        .catch(function (error) {
        console.log(error);
        });
    },[unlock_flag])


    const [showText, setShowText] = useState(true);

    const onClick = (e) => {
        e.preventDefault();
        setShowText(showText => !showText);
    }
    
    const onClick2 = (e) => {
        e.preventDefault();
        setShowText(showText => !showText);
    }
    
    
    
    return (
        <>
                    <div className="container-fluid">
                            <div className="mss">
                            <div className=" border rounded s">
                                <h1 className='col-md-12 d-flex justify-content-center text-white'>SERVICE LEVEL AGREEMENT</h1>
                                    <p className='col-md-12 d-flex justify-content-center text-white font-weight-bold'>Please Choose Your Agreement</p>
                                    <form className='col-md-12 d-flex justify-content-center mb-5 mt-5'> 
                                            <button className="mx-5 bg-primary btn-lg border-primary text-white" onClick={onClick}>Client SLA</button>
                                            <button className="mx-5 bg-info btn-lg border-info text-white"onClick={onClick2}> Delivery SLA</button>
                                    </form>
                            </div>
                            </div>
                            {showText ? <Text message={json_information} /> : <Text2 message={json_information}/>}
                        </div>    
      </>
    );
}
const Text = (props) => {
    let json_information=props.message;
    return(
        
        <div className="mt-5">
        <div>
         <table className="table table-hover">
         <thead className="bg-dark">
           <tr className="text-white">
             <th scope="col">Client Name</th>
             <th scope="col">ID</th>
             <th scope="col">Client Address</th>
             <th scope="col">Payment Info</th>
             <th scope="col">Last Updated</th>
           </tr>
         </thead>
             <tbody>
             </tbody>
         </table>
         </div>
 </div>
    )
}
const Text2 = (props) =>{
    let json_information=props.message;
    const [searchTerm, setSearchTerm] = useState("");
    const [allfilterproductdata,setallfilterproductdata] =useState([])
    useEffect(()=>{
        setallfilterproductdata(json_information.product_information)
    },[])
    //Filtering
    const handleonChange = event => {
        setSearchTerm(event.target.value);
    };
    useEffect(() => {
        //console.log("entering filter effect", allproductdata)
        console.log("all data sla",json_information.product_information)
        const users1 = json_information.product_information.filter(p =>
            p.waybill_number.toString().toLowerCase().includes(searchTerm.toString().toLowerCase()) || p.order_id.toString().toLowerCase().includes(searchTerm.toString().toLowerCase()) ||
            p.dc_office_name.toString().toLowerCase().includes(searchTerm.toString().toLowerCase()) || p.customer_name.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())
            || p.consignee_name.toString().toLowerCase().includes(searchTerm.toString().toLowerCase()) 
            
        );
        setallfilterproductdata(users1);
    }, [searchTerm, json_information.product_information]);
   
    return(
        <div className="mt-5">
                    
                   
                            <div>
                            <div className="row n mt-5">
                    <div className="col-8 mx-5">
                        <div className="">
                            <form>
                                <div className="input-group">
                                    <input type="text" className="form-control mx-2 mb-3" placeholder="type here......."
                                        value={searchTerm} onChange={handleonChange} />
                                    <div className="input-group-append">
                                       

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                                <div>
                                        
                                {/*Table*/}
                                <table className="table table-hover css-serial">
                                    {/*Table head*/}
                                <thead className="bg-dark">
                                  <tr className="text-white">
                                  <th scope="col">SL</th>
                                  <th scope="col">WayBill No<br></br>Order ID</th>
                                    <th scope="col">Customer Name</th>
                                    <th scope="col">Consignee Name</th>
                                    <th scope="col">Product Details</th>
                                    <th scope="col">DC Office Name<br></br>Pincode</th>
                                    <th scope="col">Product Value<br></br>Product Weight</th>
                                    <th scope="col">Entry Date</th>
                                  </tr>
                                </thead>
                                    {/*Table head*/}
                                    {/*Table body*/}
                                    <tbody>
                                    {
                                        !page_refresh_flag ? allfilterproductdata.map(single_message => {
                                            
                                             return(
                                                 
                                                 <tr key={single_message.customeR_NAME}>
                                                 <td></td>
                                                     <th scope="row">{single_message.waybill_number}
                                                     <br></br>{single_message.order_id}
                                                     </th>
                                                     <td>{single_message.customer_name}
                                                     </td>
                                                     <td>{single_message.consignee_name}</td>
                                                     <td>{single_message.product_detail}
                                                     </td>
                                                     <td>
                                                         {single_message.dc_office_name}
                                                         <br></br>{single_message.pincode}
                                                     </td>
                                                     <td>
                                                         {single_message.product_value}
                                                         <br></br>{single_message.product_weight}
                                                     </td> 
                                                     <td>{single_message.product_entry_time}</td>
                                                     <td>
                                                         <button className="bg-dark btn-sm text-white border-dark mx-5" onClick={()=>unlock_button(single_message.waybill_number)}>Unlock</button>
                                                         <br></br>
                                                         <input type="text" className="mt-1" value={extend} onChange={(e)=>{ setextend(e.target.value) }}/>
                                                        <datalist id="brow">
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                            
                                                        </datalist>
                                                        
                                                     </td> 
                                                     
                                                 </tr>
                                             )
                                         }) : confirm_unlock_information.message.json_response_list.map(single_message => {
                                            
                                            return(
                                                <tr key={single_message.customeR_NAME}>
                                                <td></td>
                                                    <th scope="row">{single_message.waybill_number}
                                                    <br></br>{single_message.order_id}
                                                    </th>
                                                    <td>{single_message.customer_name}
                                                    </td>
                                                    <td>{single_message.consignee_name}</td>
                                                    <td>{single_message.product_detail}
                                                    </td>
                                                    <td>
                                                        {single_message.dc_office_name}
                                                        <br></br>{single_message.pincode}
                                                    </td>
                                                    <td>
                                                        {single_message.product_value}
                                                        <br></br>{single_message.product_weight}
                                                    </td> 
                                                    <td>{single_message.product_entry_time}</td>
                                                    <td>
                                                        <button className="bg-dark btn-sm text-white border-dark mx-5" onClick={()=>unlock_button(single_message.waybill_number)}>Unlock</button>
                                                        <br></br>
                                                        <input type="text" className="mt-1" value={extend} onChange={(e)=>{ setextend(e.target.value) }}/>
                                                       <datalist id="brow">
                                                           <option>1</option>
                                                           <option>2</option>
                                                           <option>3</option>
                                                           <option>4</option>
                                                           
                                                       </datalist>
                                                       
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
    )
}

               
export default Slacontent;
