import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./modal.css";
import { useHistory } from "react-router";
import { SearchContext } from "../../Context/searchContext";
import { SearchButtonContext } from "../../Context/buttonContext";
import { BrowserRouter, Link } from "react-router-dom";
const Owntable = () => {
  //new code for search in Pickup Request page...........
  var { searchInformation, setsearchInformation } = useContext(SearchContext);
  var { searchButtonInformation, setsearchButtonInformation } =
    useContext(SearchButtonContext);
  if (searchButtonInformation) {
    //search button click korar pore ki hobe...........
    setsearchInformation("");
    setsearchButtonInformation(false);
  }
  //code end for search in Pickup Request page.............

  return (
    <>
      <div className="border border-primary d">
        <h3 className="text-center"> Own Vehicle Creation</h3>
        <div className="container p-3">
          <form>
            <div className="form-group row mb-2">
              <label htmlFor className="col-sm-3 col-form-label">
                Vehicle Number:
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  required
                />
              </div>
            </div>
            <div className="form-group row mb-2">
              <label htmlFor className="col-sm-3 col-form-label">
                Destination Address:
              </label>
              <div className="col-sm-6">
                <input
                  list="brow"
                  className="form-control"
                  id="bgscrl"
                  placeholder="Select Your Destination "
                  required
                />
                <datalist id="brow">
                  <option>Bagerhat</option>
                  <option>Bandarban</option>
                  <option>Barguna</option>
                  <option>Barisal</option>
                  <option>Bhola</option>
                  <option>Bogra</option>
                  <option>Brahmanbaria</option>
                  <option>Chandpur</option>
                  <option>Chittagong</option>
                  <option>Chuadanga</option>
                  <option>Comilla</option>
                  <option>Cox's Bazar</option>
                  <option>Dhaka</option>
                  <option>Dinajpur</option>
                  <option>Faridpur</option>
                  <option>Feni</option>
                  <option>Gaibanda</option>
                  <option>Gazipur</option>
                  <option>Gopalgonj</option>
                  <option>Habiganj</option>
                  <option>Jaipurhat</option>
                  <option>Jamalpur</option>
                  <option>Jessore</option>
                  <option>Jhalakati</option>
                  <option>Jhenaidha</option>
                  <option>Khagrachari</option>
                  <option>Khulna</option>
                  <option>Kishoreganj</option>
                  <option>Kurigram</option>
                  <option>Khushtia</option>
                  <option>Lakshmipur</option>
                  <option>Lalmonirhat</option>
                  <option>Madaripur</option>
                  <option>Magura</option>
                  <option>Manikganj</option>
                  <option>Meherpur</option>
                  <option>Moulivibazar</option>
                  <option>Munshiganj</option>
                  <option>Mymenshing</option>
                  <option>Naogaon</option>
                  <option>Narail</option>
                  <option>Narayanganj</option>
                  <option>Narsingdi</option>
                  <option>Natore</option>
                  <option>Nawabgonj</option>
                  <option>Netrokona</option>
                  <option>Nilphamari</option>
                  <option>Noakhali</option>
                  <option>Pabna</option>
                  <option>Panchagarh</option>
                  <option>Parbatty Chattagram</option>
                  <option>Patuakhali</option>
                  <option>Pirojpur</option>
                  <option>Rajbari</option>
                  <option>Rajshahi</option>
                  <option>Rangpur</option>
                  <option>Rangamati</option>
                  <option>Satkira</option>
                  <option>Shariatpur</option>
                  <option>Sherpur</option>
                  <option>Sirajgonj</option>
                  <option>Sunamganj</option>
                  <option>Sylhet</option>
                  <option>Tangail</option>
                  <option>Thakurgaon</option>
                </datalist>
              </div>
            </div>
            <div className="form-group row mb-2">
              <label htmlFor className="col-sm-3 col-form-label">
                Creation Address:
              </label>
              <div className="col-sm-6">
                <p className="border border-light bg-light">Tongi-PC</p>
              </div>
            </div>

            <div className="form-group row mb-2">
              <label htmlFor className="col-sm-3 col-form-label">
                Driver Name:{" "}
              </label>
              <div className="col-sm-6">
                <p className="border border-light bg-light">Hasan</p>
              </div>
            </div>
            <div className="form-group row mb-2">
              <label htmlFor className="col-sm-3 col-form-label">
                Driver Contact Number:{" "}
              </label>
              <div className="col-sm-6">
                <p className="border border-light bg-light">019xxxxxxx</p>
              </div>
            </div>
            <div className="form-group row mb-2">
              <label htmlFor className="col-sm-3 col-form-label">
                Bag Waybill Number:{" "}
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  required
                />
              </div>
            </div>
            <div className="form-group row mb-2">
              <label htmlFor className="col-sm-3 col-form-label">
                Bag Seal Number:{" "}
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  required
                />
              </div>
            </div>
            <div className="form-group row mb-2">
              <label htmlFor className="col-sm-3 col-form-label">
                Bag Create Employe ID:
              </label>
              <div className="col-sm-6">
                <p className="border border-light bg-light">101</p>
              </div>
            </div>
            <div className="row">
              <div className="col-12 d-flex justify-content-center text-align-center">
                <button className="btn btn-primary  mb-3 ">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div>
        {
          //ei jaygay bag creation er form ta silo.......................
        }
        <div className="container" id="tablebag">
          <div>
            <div>
              <table className="table table-hover">
                <thead className="bg-dark">
                  <tr className="text-white">
                    <th scope="col">DateTime</th>
                    <th scope="col">Vehicle Number</th>
                    <th scope="col">Destination Address</th>
                    <th scope="col">
                      Driver Name <br></br>
                      Contact Number
                    </th>
                    <th scope="col">
                      Bag Waybill<br></br>Bag Seal{" "}
                    </th>
                    <th scope="col">
                      {" "}
                      Employee ID<br></br> Creation Address
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>12-8-21 11.30am</td>
                    <td>32-1233</td>
                    <td>Banani</td>
                    <td>
                      Hasan<br></br>019xxxxxxxx
                    </td>
                    <td>
                      11123000001<br></br>321
                    </td>
                    <td>
                      101<br></br> Tongi-PC
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Owntable;
