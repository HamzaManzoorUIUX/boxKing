import React from 'react';
import {useHistory} from 'react-router-dom'
export default () => {
    const history=useHistory();
    return    <section class="footer-cs">
    <div class="container-fluid cont-footer-cs">
        <div class="row">
            <div class="col-md-3 col-margin-cs">
                <div class="row">
                    <div class="col-md-12 product-heading-cs">
                        <ul>
                            <li><h5>Products</h5></li>
                        </ul>
                    </div>
                    <div class="col-md-12 Products-cs">
                        <ul>
                            <li><a href="javascript:void(0)">Folding Cartons</a></li>
                            <li><a href="javascript:void(0)">Packing with lions</a></li>
                            <li><a href="javascript:void(0)">Gift Packings</a></li>
                            <li><a href="javascript:void(0)">SlipCaces</a></li>
                            <li><a href="javascript:void(0)">Pillow Box and Sleeves</a></li>
                            <li><a href="javascript:void(0)">Open packings</a></li>
                            <li><a href="javascript:void(0)">Food save packing</a></li>
                            <li><a href="javascript:void(0)">Shipping Boxes</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-margin-cs">
                <div class="row class-border-cs">
                    <div class="col-md-12 product-heading-cs">
                        <ul>
                            <li><h5>Information</h5></li>
                        </ul>
                    </div>
                    <div class="col-md-12 Products-cs">
                        <ul>
                            <li><a href="javascript:void(0)">About Us</a></li>
                            <li><a href="javascript:void(0)">Order Information</a></li>
                            <li><a href="javascript:void(0)">Artwork Instructions</a></li>
                            <li><a href="javascript:void(0)">Print Templates</a></li>
                            <li><a href="javascript:void(0)">FAQ</a></li>
                            <li><a onClick={()=>history.push("/printing/register")}>Register as Company</a></li>
                            <li><a href="javascript:void(0)">Register as Designer</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-margin-cs">
                <div class="row class-border-cs">
                    <div class="col-md-12 product-heading-cs">
                        <ul>
                            <li><h5>Newsletter</h5></li>
                        </ul>
                    </div>
                    <div class="col-md-12 Subscribe-cs">
                        <ul>
                            <li>
                                <p>Subscribe to our newsletter now and receive a £5 welcome voucher for your next order!</p>
                            </li>
                            <li>
                                <div class="input-group input-group-lg footer_emaileingabe mt-5">
                                    <input
                                        name="plc$lt$zoneFooter$Footer$EmailInput"
                                        type="text"
                                        id="EmailInput"
                                        class="form-control jq_email_input bg-color-cs"
                                        aria-label="Email"
                                        aria-describedby="button-addon3"
                                        placeholder="Your email address"
                                    />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-margin-cs">
                <div class="row class-border-cs">
                    <div class="col-md-12 product-heading-cs">
                        <ul>
                            <li><h5>Contact</h5></li>
                        </ul>
                    </div>
                    <div class="col-md-12 Products-cs">
                        <ul>
                            <li>London-based Service Centre</li>
                            <li>
                                <span class="phone-no-cs"><i class="fa fa-phone"></i> 020 3608 0777</span>
                            </li>
                            <li>Mon-Fri:8am - 5pm</li>
                            <li>Contact Form</li>
                            <li>service@saxoprint.co.uk</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <hr class="hr-line-cs" />
        <div class="row pb-2">
            <div class="col-md-12 text-right">
                <h6>Payment on Account <span class="pl-3"> prepayments</span></h6>
            </div>
        </div>
    </div>
</section>
}
    // return <footer className="page-footer font-small pt-4">


    //     <div className="pl-5 pr-5 text-center text-md-left">

    //         <div className="row text-center text-md-left mt-3 pb-3">

    //             <div className="col-md-4 mx-auto mt-2 mb-4">
    //                 <img src={require('../../images/logo.png')} style={{ width: 196 }} alt="logo" className="footerLogo" />
    //                 <p className="text-center text-md-left mt-2 footerParagraph">Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
    //                 consectetur
    //           adipisicing elit.</p>
    //                 <p className="text-center text-md-left footerParagraph">© 2020-2025
    //         </p>
    //             </div>



    //             <div className="col-md-2  mx-auto mt-4 mb-4">
    //                 <h6 className="mb-4 font-weight-bold footerHeading">Popular Products</h6>


    //                 <a href="#!" className="footerLinks">lorem ipsum</a>
    //                 <a href="#!" className="footerLinks" >lorem ipsum</a>
    //                 <a href="#!" className="footerLinks">lorem ipsum</a>
    //                 <a href="#!" className="footerLinks">lorem ipsum</a>
    //                 <a href="#!" className="footerLinks">lorem ipsum</a>

    //             </div>
    //             <div className="col-md-2 col-lg-2 col-sm-2 mx-auto mt-4 mb-4">
    //                 <h6 className="mb-4 font-weight-bold footerHeading">Quick Links</h6>

    //                 <a href="#!" className="footerLinks">lorem ipsum</a>
    //                 <a href="#!" className="footerLinks">lorem ipsum</a>
    //                 <a href="#!" className="footerLinks">lorem ipsum</a>
    //                 <a href="#!" className="footerLinks">lorem ipsum</a>

    //             </div>

    //             <div className="col-md-4 mx-auto mt-4 mb-4">
    //                 <h6 className="mb-4 font-weight-bold footerHeading">Reach To Us</h6>
    //                 <p className="mb-3 font-weight-bold contact">
    //                     <i className="fa fa-phone contactIcon" aria-hidden="true"></i> &nbsp 043 588 00 88</p>
    //                 <p className="mb-3 contact">
    //                     <i className="fa fa-envelope contactIcon" aria-hidden="true"></i> &nbsp contact@boxking.com</p>
    //                 <a href=""><i className="fab fa-facebook-f social-icon" aria-hidden="true"></i></a>
    //                 <a href=""><i className="fab fa-linkedin-in social-icon" aria-hidden="true"></i></a>
    //                 <a href=""><i className="fab fa-twitter social-icon" aria-hidden="true"></i></a>
    //                 <a href=""><i className="fab fa-youtube social-icon" aria-hidden="true"></i></a>

    //             </div>


    //         </div>
    //     </div>

    // </footer>











