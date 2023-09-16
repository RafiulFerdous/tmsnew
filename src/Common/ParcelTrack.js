import {Link, useHistory, useParams} from 'react-router-dom';
import {React,useEffect,useState} from 'react';
import axios from 'axios';
import {Degital_Ocean_flag, company_name} from '../Common/Linksidebar';
let payload , setpayload;
let information,setinformation;
const ParcelTrack = () => {

  [payload,setpayload] = useState(false);
  [information,setinformation] = useState("");

  const { id } = useParams();
  useEffect(()=>{
    var axios = require('axios');
        var data = JSON.stringify({
            "access_id": 1,
            "access_token": "firstAccessToken_test_product_track",
            "product_waybill": id
        });
        console.log("this is data : ", data);

        var config = {
            method: 'post',
            //url: Degital_Ocean_flag ? 'https://e-deshdelivery.com/universalapi/allapi/unAuthorized_parcel_tracking' + '?company_name=' + company_name : '/universalapi/allapi/unAuthorized_parcel_tracking' + '?company_name=' + company_name,
            url: Degital_Ocean_flag ? 'https://e-deshdelivery.com/universalapi/allapi/unAuthorized_parcel_tracking' + '?company_name=' + "EDESH" : '/universalapi/allapi/unAuthorized_parcel_tracking' + '?company_name=' + "EDESH",
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${logingInformation_LocalStore.token}`
            },
            data: data
        };

        console.log("Configuration variable is : ",config);
        
      axios(config)
      .then(function (response) {
        let json_object_str = JSON.stringify(response.data);
        let json_object = JSON.parse(json_object_str);
        return(json_object);  
      })
      .then(res => {
        console.log("response is ",res);
        setinformation(res);
        setpayload(true);
      })
      .catch(function (error) {
        console.log(error);
      });

  },[]); 

  return (
    <div>
      { payload && <div><p>Waybill : {information.message.message.product_infor.producT_WAYBILL_NUMBER}</p> 
                         <p>Reference No : {information.message.message.product_infor.referencE_NO}</p>
                         <p>Product Name : {information.message.message.product_infor.producT_DESCRIPTION}</p>
      </div>}
    </div>
    
  )
}

export default ParcelTrack