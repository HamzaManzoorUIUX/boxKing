import React from 'react';
import NavBar from '../components/navbar';
import Footer from '../components/home/footer';
import Bread from '../components/breadCrum';
import { useLocation } from 'react-router-dom'
export default () => {
    const location = useLocation();

    return <>
        <NavBar />
        <Bread />
        <div className="ml-5 mr-5 box-cart mb-5 mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-md" style={{backgroundColor:'white'}}>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',paddingTop:'18%'}}>
                        <img className="ml-5 big-img" src={location.state.obj.printimage} style={{width:'100%',height:'100%',maxWidth:400,maxHe
                    :400}} alt="" />

                        </div>
                    </div>
                    <div className="col-md">
                        <div className="your-cart design-cart">
                            <div className="row">
                                <div className="col-md">
                                    <h4 className="mt-3 mb-0 pt-4 tag pl-4 ml-2">Product</h4>
                                </div>
                                <div className="col-md">
                                    <p className="mt-3 pt-4 mb-0 tag mr-5 pncl">
                                        <i className="fa fa-pencil" aria-hidden="true"></i>
                                    </p>
                                </div>
                            </div>
                            <hr className="new2" />

                            <div className="mt-4 container">
                                <div style={{ display: 'flex', justifyContent: 'space-between', margin: 10 }}>
                                    <h4 className="mb-3 tag pl-4 ml-2">Size</h4>
                                    <h4 className="mb-3 tag pl-4 ml-2">W: {location.state.obj.width} D: {location.state.obj.depth} H: {location.state.obj.height}</h4>

                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', margin: 10 }}>
                                    <h4 className="mb-3 tag pl-4 ml-2">Finishing</h4>
                                    <h4 className="mb-3 tag pl-4 ml-2">{location.state.obj.finishing}</h4>
                                  
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', margin: 10 }}>
                                <h4 className="mb-3 tag pl-4 ml-2">Finishing Price</h4>
                                    <h4 className="mb-3 tag pl-4 ml-2">{location.state.obj.finishingPrice}</h4>
     
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', margin: 10 }}>
                                    <h4 className="mb-3 tag pl-4 ml-2">Finishing effect</h4>
                                    <h4 className="mb-3 tag pl-4 ml-2">{location.state.obj.finishingEffect}</h4>

                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', margin: 10 }}>
                                    <h4 className="mb-3 tag pl-4 ml-2">Finishing effect Price</h4>
                                    <h4 className="mb-3 tag pl-4 ml-2">{location.state.obj.finishingEffectPrice}</h4>

                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', margin: 10 }}>
                                    <h4 className="mb-3 tag pl-4 ml-2">Material</h4>
                                    <h4 className="mb-3 tag pl-4 ml-2">{location.state.obj.material}</h4>

                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', margin: 10 }}>
                                    <h4 className="mb-3 tag pl-4 ml-2">Material Price</h4>
                                    <h4 className="mb-3 tag pl-4 ml-2">{location.state.obj.materialPrice}</h4>

                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', margin: 10 }}>
                                    <h4 className="mb-3 tag pl-4 ml-2">Processing Price</h4>
                                    <h4 className="mb-3 tag pl-4 ml-2">{location.state.obj.typeOfprocessingPrice}</h4>

                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', margin: 10 }}>
                                    <h4 className="mb-3 tag pl-4 ml-2">Quanity</h4>
                                    <h4 className="mb-3 tag pl-4 ml-2">{location.state.obj.quantity}</h4>

                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', margin: 10 }}>
                                    <h4 className="mb-3 tag pl-4 ml-2">Price</h4>
                                    <h4 className="mb-3 tag pl-4 ml-2">${location.state.obj.purchaseAmount}</h4>

                                </div> <div style={{ display: 'flex', justifyContent: 'space-between', margin: 10 }}>
                                    <h4 className="mb-3 tag pl-4 ml-2">Total</h4>
                                    <h4 className="mb-3 tag pl-4 ml-2">${parseInt(location.state.obj.quantity)*(parseFloat(location.state.obj.purchaseAmount)+parseFloat(location.state.obj.finishingPrice)+parseFloat(location.state.obj.finishingEffectPrice)+parseFloat(location.state.obj.materialPrice)+parseFloat(location.state.obj.typeOfprocessingPrice)).toFixed(2)  }</h4>

                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>    <Footer />
    </>
}

/*
   <div className="mt-2 your-cart design-cart">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-9">
                                        <p className="mt-3 pl-3">Have coupon..?</p>
                                        <form className="ml-3">
                                            <div className="row">
                                                <div className="col-md-10">
                                                    <input type="text" className="form-control gray_1"
                                                        placeholder="Coupon Code" />
                                                </div>


                                                <div className="col-md-1">
                                                    <button className="gray_1 coupon_code" type="button">Apply Code</button>
                                                    <br /><br />
                                                </div>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>

                        </div>
                        <br />
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4">
                                </div>
                                <div className="col-md-8">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-9">
                                                <h4 className="mb-3 tag pl-3">Subtotal</h4>
                                                <hr />
                                                <h4 className="mb-3 tag pl-3">Delivery Charges</h4>
                                                <hr />
                                                <h4 className="mb-3 tag pl-3 total_tag">Total Cost</h4>
                                            </div>
                                            <div className="col-md-3">
                                                <h4 className="mb-3 tag pl-4 ml-2">$30</h4>
                                                <hr />
                                                <h4 className="mb-3 tag pl-4 ml-2">$30</h4>
                                                <hr />
                                                <h4 className="mb-3 tag pl-3 total_tag ml-2">$30</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-md">
                                    <button type="button" className="mt-3 btn draft_btn btn-block waves-effect">Save as
                                    draft</button>
                                </div>
                                <div className="col-md">
                                    <button type="button" className="mt-3 btn colr btn-block waves-effect" style={{ color: "white" }}>Proceed to
                                    Payment</button>

                                </div>
                            </div>
                        </div>
                        <br /><br /><br />
                        */