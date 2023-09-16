import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './error.css';

const Errorpage = () => {
    return (
        <section className="page_404">
                    <div className="container-fluid">
                        <div className="row">
                        <div className="col-sm-12 ">
                            <div className="col-sm-12 col-sm-offset-1  text-center">
                            <div className="four_zero_four_bg">
                                <h3 className="text-center ">You are Not Authorized</h3>
                            </div>
                            <div className="contant_box_404">
                                <h3 className="h2">Please Log In again</h3>
                                <p>The page you are looking for not available!</p>
                               
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
</section>
    )
}

export default Errorpage