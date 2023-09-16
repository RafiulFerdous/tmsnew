import React from "react";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faLinkedin } from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
  return (
    <>
      <div className="mt-5 pt-5 footer  ">
        <footer className="text-center text-white" id="footer-color">
          <div className="container pt-4 ">
            <section className="mb-4 d-lg-flex flex-row justify-content-evenly">
              <div className="text-dark">
                <h4>Head Office</h4>
                <span>
                  14, Gausul Azam Avenue, Sector 13, Uttara, <br></br>Dhaka
                  1230, Bangladesh
                </span>
              </div>
              <div className="text-dark">
                <h4>Mail us</h4>
                <a href="mailto:info@e-deshltd.com" target="_blank">
                  info@e-deshltd.com
                </a>
              </div>
              <div className="text-dark">
                <h4>Call us</h4>
                {/* <span>+8801960000900</span> */}
                <a href="tel:8801960000900"> 01960000900</a>

                <br></br>

                {/* <a href="tel:8801401144507">+8801401144507</a> */}
              </div>
              <div className="text-dark">
                <h4>Follow us</h4>
                <a
                  className="btn btn-link btn-floating btn-lg text-dark m-1"
                  href="https://www.facebook.com/Edeshltd/"
                >
                  <FontAwesomeIcon icon={faFacebookF}></FontAwesomeIcon>
                </a>
                <a
                  className="btn btn-link btn-floating btn-lg text-dark m-1"
                  href="https://bd.linkedin.com/company/e-desh"
                >
                  <FontAwesomeIcon icon={faLinkedin}></FontAwesomeIcon>
                </a>
              </div>
            </section>
          </div>

          <div className="text-center bg-dark text-white p-3">
            Copyright E-desh © 2022, All Right Reserved
          </div>
        </footer>
      </div>
    </>
  );
};
export default Footer;
