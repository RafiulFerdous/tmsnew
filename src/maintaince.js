import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './man.css';

const Maintance = () => {
    return (
        <>
        <div className="error-image">
          <h1>👨‍🔧</h1>
        </div>
        <div className="error-msg-container text-black">
          <h1>We're working on this Website now!</h1>
          <p>
          Sorry for the inconvenience. We’re performing some maintenance at the moment.If you need please contact us via email at info@e-deshltd.com .
          </p>
          <p>Otherwise we’ll be back up shortly!.</p>
          <p>— The E-Desh Tech Team</p>
        </div>
      </>
    )
}

export default Maintance