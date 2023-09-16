import React,{useState,useEffect,useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './modal.css';
import { useHistory } from 'react-router';
import { SearchContext} from '../../Context/searchContext';
import {SearchButtonContext} from '../../Context/buttonContext';
const Supporttable = () =>{

    //new code for search in Pickup Request page...........
    var {searchInformation, setsearchInformation} = useContext(SearchContext);
    var {searchButtonInformation,setsearchButtonInformation} = useContext(SearchButtonContext);
    if(searchButtonInformation){
       //search button click korar pore ki hobe...........
       setsearchInformation("");
       setsearchButtonInformation(false);
    }
    //code end for search in Pickup Request page.............


       return(
            <>
                            <div>
                                <table className="table table-hover">
                                    <thead className="bg-dark">
                                            <tr className="text-white">
                                                    <th scope="col">Client Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Phone Number</th>
                                                    <th scope="col">Message</th>
                                                    <th>Status</th>
                                             </tr>
                                    </thead>

                                    <tbody>
                                    <tr>
                                                <td>Alesha Mart</td>
                                                <td>ALeshmart@gmail.com</td>
                                                <td>017xxxxxxx</td>
                                                <td> As soon as possible delivery my parcel</td>
                                                <td><p><button className="mb-1 bg-info">Done</button><button className="mx-1 bg-danger">Delete</button></p></td>
                                            </tr>
                                            <tr>
                                                <td>Priyo Shop</td>
                                                <td>Priyoshop@gmail.com</td>
                                                <td>018xxxxxxx</td>
                                                <td>please pickup my parcel</td>
                                                <td><p><button className="mb-1 bg-info">Done</button><button className="mx-1 bg-danger">Delete</button></p></td>
                                            </tr>
                                    </tbody>
                                </table>
                            </div>
            </>
    )
};
export default Supporttable;