import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./operation.css";
import { CSVLink } from "react-csv";
const Otptable = (props) => {
    let json_information = props.response;
    const [searchTerm, setSearchTerm] = React.useState([]);
    const [searchResults, setSearchResults] = React.useState([]);
    const handleonChange = (event) => {
        setSearchTerm(event.target.value);
    };
    console.log("otp table", json_information);
    React.useEffect(() => {
        const users1 = json_information.message.all_otp_information?.filter(
            (p) =>
                p.product_waybill_number
                    .toString()
                    .toLowerCase()
                    .includes(searchTerm.toString().toLowerCase()) ||
                p.fe_id
                    .toString()
                    .toLowerCase()
                    .includes(searchTerm.toString().toLowerCase())
        );
        setSearchResults(users1);
    }, [searchTerm, json_information]);

    return (
        <>
            <div className="container-fluid">
                <div className="row n">
                    <div className="col-8 mx-5">
                        <div className="">
                            <form>
                                <div className="input-group ">
                                    <input
                                        type="text"
                                        className="form-control mx-2 bg-light border border-warning"
                                        placeholder="Type Here......."
                                        value={searchTerm}
                                        onChange={handleonChange}
                                    />
                                    <div className="input-group-append"></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        {/*Table*/}
                        <table className="table table-hover mt-5 css-serial">
                            {/*Table head*/}
                            <thead className="bg-dark">
                            <tr className="text-white">
                                <th scope="col">SL</th>
                                <th scope="col">WayBill No</th>
                                <th scope="col">OTP Type</th>
                                <th scope="col">Fe ID</th>
                                <th scope="col">DC</th>
                                <th scope="col">OTP Number</th>
                                <th scope="col">Consignee Contact</th>
                                <th scope="col">Date Time</th>
                                <th>
                                    <CSVLink
                                        data={searchResults}
                                        filename={"csv.csv"}
                                        className="btn btn-sm bg-info text-black border-info mb-2"
                                    >
                                        Export csv
                                    </CSVLink>
                                </th>
                            </tr>
                            </thead>
                            {/*Table head*/}
                            {/*Table body*/}
                            <tbody>
                            {searchResults.map((single_message) => {
                                return (
                                    <tr key={single_message.product_waybill_number}>
                                        <td></td>
                                        <th scope="row">
                                            {single_message.product_waybill_number}
                                            <br></br>
                                            {single_message.order_id}
                                        </th>
                                        <td>{single_message.otp_type}</td>
                                        <td>{single_message.fe_id}</td>
                                        <td>{single_message.area_name}</td>
                                        <td>{single_message.otp_number}</td>
                                        <td>{single_message.consignee_phone_number}</td>
                                        <td>{single_message.date_time}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                            {/*Table body*/}
                        </table>
                        {/*Table*/}
                    </div>
                </div>
            </div>
        </>
    );
};
export default Otptable;
