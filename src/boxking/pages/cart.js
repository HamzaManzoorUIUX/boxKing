import React, { useEffect, useRef, useState } from 'react';
import NavBar from '../components/navbar';
import Footer from '../components/home/footer';
import Bread from '../components/breadCrum';
import { useSelector, useDispatch } from 'react-redux';
import actionTypes from '../../redux/actionMethodes/cartActionsTypes';
import { useHistory } from "react-router-dom";
import Paypal from './paypal';
import { Modal } from 'react-bootstrap';
import { repository } from '../utils/repository';
import Congrats from './congrates';
import ClipLoader from "react-spinners/PulseLoader";
import { Form, Col, Row } from 'react-bootstrap';
import { MdCancel } from 'react-icons/md'
import { css } from "@emotion/core";
const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `;
export default () => {
    const user = useSelector(e => e.auth)
    const cart = useSelector(x => x.cart);
    const dispatch = useDispatch();
    const history = useHistory();
    const [paynow, setpaynow] = useState(false);
    const [success, setsucces] = useState(false);
    const [loaderMain, setloaderMain] = useState(false);

    const handleFinish = () => {
        setpaynow(true);
        setloaderMain(true);
        //
        const postOrder = async () => {
            console.log("sss", { ...cart, userId: user.id, printingCompanyId: cart.printiingCompany.id, source: "Paypal", Description: "Purchase Customize box", })

            const { data, status } = await repository.createOrder({ ...cart, userId: user.id, printingCompanyId: cart.printiingCompany.id, source: "Paypal", Description: "Purchase Customize box", }).then(x => x).then(x => x);
            if (status != 200) {
                alert("Opps something wen't wrong")

            }
            else {
                if (data == 1) {
                    dispatch({ type: "cartempty", payload: {} });
                    setsucces(true);
                }
                else {
                    alert("Opps something wen't wrong")
                }
            }

        }
        postOrder();
        setloaderMain(false);
    }

    const handleShipping = (val) => {
        if (val == 0) {
            dispatch({

                type: 'freeShipping', payload: { type: 0 }
            });
        }
        else if (val == 1) {
            dispatch({

                type: 'freeShipping', payload: { type: 1 }
            });
        }


    }
    return <>
        { loaderMain ?
            <div className="sweet-loading" style={{ position: 'absolute', top: '50%', left: '50%' }}>
                <ClipLoader
                    css={override}
                    size={20}
                    color={"#f9b541"}
                    loading={true}
                />
            </div> :
            <>
                <NavBar />
                <Bread />
                {
                    (success ? <>
                        <div style={{ marginTop: '5%', marginBottom: '5%' }}>
                            <Congrats />
                        </div>
                    </> : <>
                            <div className="ml-5 mr-5 box-cart mb-5 mt-5">
                                <div className="row setMinHeight">
                                    <div className="col-md-8">
                                        <div className="your-cart">
                                            <h4 className="mt-3 mb-3 tag pl-4 ml-2 font-20px">Your Cart</h4>
                                            <hr className="new2" />
                                            <br /><br />

                                            {
                                                cart.items.map(x => <div className="container mt-3">
                                                    <div className="row justify-content-center align-items-center">
                                                        <div className="col-md-2 text-center">
                                                            <img className="cart-box ml-4 mt-0" style={{width:'80%' }} src={x.printimage} alt="" />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <h4 className="tag mb-0 font-16px">{x.product} <span
                                                                className="tag custom-tag">{x.nonCustomize ? "(Customized)" : ""}</span></h4>
                                                            <p className="brochures__des font-12px">{x.description ? x.description : 'Perfect binding135 and 250g/m<sup>2</sup> art paper 96 pages with cover'}</p>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <div className="ml-5 mt-1 center">
                                                                <div className="input-group">
                                                                    <button className="dec__btn" onClick={() => {
                                                                        dispatch({

                                                                            type: actionTypes.incDec, payload: { id: x.id, type: 'dec' }
                                                                        });
                                                                    }}>-</button>
                                                                    <input type="text" name="" className="no_input" value={x.quantity} min="1" />
                                                                    <button className="inc__btn" onClick={() => {
                                                                        dispatch({

                                                                            type: actionTypes.incDec, payload: { id: x.id, type: 'inc' }
                                                                        });
                                                                    }}> +</button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-2">
                                                            <h4 className="mt-3 mb-3 tag">${parseFloat(x.purchaseAmount * x.quantity).toFixed(2)}</h4>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <button type="button" className=" btn btn-outline-prm btn-block waves-effect seHeight" onClick={() => {
                                                                history.push('/summry', { obj: x });

                                                            }} >View Summry</button>
                                                            <div style={{ position: 'absolute', top: '-21px', right: 0 }}>
                                                                <button style={{ backgroundColor: 'white', borderColor: 'transparent' }} onClick={() => {
                                                                    dispatch({

                                                                        type: actionTypes.removeItem, payload: { id: x.id }
                                                                    });
                                                                }} ><MdCancel fontSize={22} color="#7c7c7c" /></button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="your-cart box-cart">
                                            <h4 className="mt-3 mb-3 tag pl-4 ml-2 font-20px">Summary</h4>
                                            <hr className="new2" />
                                            <br /><br />
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-sm-8">
                                                        <h4 className="mb-3 tag pl-3 font-16px">Printing Company</h4>

                                                        <h4 className="mb-3 tag pl-3 font-16px">Total</h4>
                                                        <h4 className="mb-3 tag pl-3 font-16px">Extra Amount</h4>
                                                        <h4 className="mb-3 tag pl-3 font-16px">Delivery Charges</h4>
                                                        <h4 className="mb-3 tag pl-3 font-16px">Total VAT</h4>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <h4 className="mb-3 tag  ml-2 font-16px">{cart.printiingCompany.CompanyName}&nbsp;</h4>

                                                        <h4 className="mb-3 tag ml-2 font-16px">${parseFloat(cart.total).toFixed(2)}</h4>
                                                        <h4 className="mb-3 tag ml-2 font-16px">${parseFloat(cart.extraAmount).toFixed(2)}</h4>
                                                        <h4 className="mb-3 tag ml-2 font-16px">${parseFloat(cart.deliveryCharges).toFixed(2)}</h4>
                                                        <h4 className="mb-3 tag ml-2 font-16px">${0}</h4>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />


                                            <div className="container">
                                                <div className="row">

                                                    <div className="col-sm-8">
                                                        <h3 className="mb-3 tag pl-3 total_tag">Sub Total</h3>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <h3 className="mb-3 tag ml-1 total_tag">${parseFloat(cart.subTotal).toFixed(2)}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-sm-12 font-16px text-center">
                                                        <Form.Check
                                                            style={{ padding: 10 }}
                                                            onClick={() => handleShipping(0)}

                                                            type="radio"
                                                            label="Standard Shipping"
                                                            name="formHorizontalRadios"
                                                            id="formHorizontalRadios1"
                                                        />
                                                        <Form.Check
                                                            style={{ padding: 10 }}
                                                            type="radio"
                                                            onClick={() => handleShipping(1)}
                                                            label="Premium Shipping"
                                                            name="formHorizontalRadios"
                                                            id="formHorizontalRadios2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <button type="button" className="mt-3 btn btn-outline-prm bg-themeOrange text-white font-18px btn-block waves-effect" onClick={() => {
                                            setpaynow(true)
                                        }} >Proceed to Payment</button>
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                {
                                    <Modal show={paynow} onHide={setpaynow}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Choose Payment Methode</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            {
                                                (user && user.role == "user" ? <Paypal amount={cart.subTotal} handleFinish={handleFinish} /> : <h3>Please login as user to Proceed payment</h3>)
                                            }
                                        </Modal.Body>
                                        <Modal.Footer>

                                        </Modal.Footer>
                                    </Modal>
                                }
                            </div>

                        </>)

                }
                <Footer />

            </>
        }
    </>
}