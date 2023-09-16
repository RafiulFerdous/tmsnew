import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './operation.css';
const Oreturntable = () => {
    return (
        <>
                    <div className="container-fluid">
                            <div>
                                <div>
                                {/*Table*/}
                                <table className="table table-hover">
                                    {/*Table head*/}
                                <thead className="bg-dark">
                                  <tr className="text-white">
                                    <th scope="col">DC Name</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Total Return</th>
                                  </tr>
                                </thead>
                                    {/*Table head*/}
                                    {/*Table body*/}
                                    <tbody>
                                        <tr>
                                            <td>Banani</td>
                                            <td>1234</td>
                                            <td>12</td>
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
export default Oreturntable;