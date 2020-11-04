import React from "react";
import { Navbar, NavDropdown, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { IoIosCall,IoMdMail } from "react-icons/io";
import { RiUserSmileLine } from "react-icons/ri";
import {GrFacebookOption,GrTwitter,GrInstagram,GrLinkedinOption} from 'react-icons/gr'
export default () => {
    return   <div className="utility-nav-cs d-none d-md-block">
    <div className="container">
        <div className="row" style={{paddingLeft:"0.7%",paddingRight:'1.1%',marginTop:2}}>
            <div className="col-12 col-md-6">
                <p className="small"><i className="bx bx-envelope"></i> boxking@gmail.com | <i className="bx bx-phone"></i> +91-9876543210</p>
            </div>

            <div className="col-12 col-md-6 text-right">
                <ul className="social-icon-top">
                <li>
                        <a href=""> <GrFacebookOption/></a>
                    </li>
                    <li>
                        <a href=""> <GrTwitter/> </a>
                    </li>
                    <li>
                        <a href=""><GrInstagram/> </a>
                    </li>
                  
                    <li>
                        <a href=""> <GrLinkedinOption/> </a>
                    </li>
                   
                   
                </ul>
            </div>
        </div>
    </div>
</div>

    //<div classNameName="strip">
    //     <div classNameName="strip-child">
    //     <div classNameName="strip-child"><IoIosCall style={{color:"white"}} classNameName="mt-2 prm-clr" /><p>041-12122324</p></div>
    //     <div classNameName="strip-child ml-5"><IoMdMail style={{color:"white"}} classNameName="mt-2 prm-clr" /><p>contact@boxking.com</p></div>
    //     </div>
    //     <div classNameName="strip-child">
    //     <div classNameName="strip-child"><RiUserSmileLine style={{color:"white"}} classNameName="mt-2 prm-clr" /><p>account</p></div>
    //     <div classNameName=""><p classNameName="prm-clr">DE</p></div>
    //     </div>

    // </div>



}

