import React, { useState } from "react";
import { Navbar, NavDropdown, Nav, Form, FormControl, Button, Modal } from 'react-bootstrap';
import { shallowEqual, useSelector } from "react-redux";
import { RiShoppingCartLine } from "react-icons/ri";
import { MdSearch } from "react-icons/md";
import { Dropdown } from 'react-bootstrap'
import { BiUser } from 'react-icons/bi';
import { AiOutlineUser, AiFillCaretDown } from 'react-icons/ai'
import { FaRegHeart } from 'react-icons/fa'
import { HiOutlineShoppingBag } from 'react-icons/hi';
import Flag from "react-flags";
import logo from '../images/logo.png';

import _ from 'lodash';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";



export default () => {

  const [showCart, setShowCart] = useState(false);
  const cart = useSelector(x => x.cart);
  const [lanmodal, setlanmodal] = useState(false);
  const history=useHistory();
  const { isAuthorized, role } = useSelector(
    ({ auth }) => ({
      isAuthorized: !_.isEmpty(auth),
      role: (!_.isEmpty(auth) ? auth.role : "")
    }),
    shallowEqual
  );

  const authUrl = () => {
    if (!isAuthorized) {

      return <>    <Link class="" to="/login" style={{ color: 'black', fontSize: '1.3rem' }}>Login </Link>
        <Link class="btn cstbtns2" to="/register" >Create Account </Link >
      </>

    }

  }
  const authUrl1 = () => {
    if (!isAuthorized) {


    }
    else if (isAuthorized && role == "user") {

      return <Link to="/user" style={{ color: 'black', fontSize: '1.3rem', margin: 1, padding: 6.4 }}><AiOutlineUser /> </Link>

    }
    else if (isAuthorized && role == "admin") {
      return <Link to="/udashboard" style={{ color: 'black', fontSize: '1.3rem', margin: 1, padding: 6.4 }}><AiOutlineUser /> </Link>

    }
    else if (isAuthorized && role == "printing") {
      return <Link to="/printing" style={{ color: 'black', fontSize: '1.3rem', margin: 1, padding: 6.4 }}><AiOutlineUser /> </Link>


    }
  }
  const getCartLenth = () => {
    if (cart.items && cart.items.length > 0) {
      return cart.items.length
    } else
      return null;

  }
  return <div className="bgNav bgNav sticky-bars">
    <Navbar  expand="lg" style={{ boxShadow: 'none',marginLeft:'9.5%' }}>
      <Navbar.Brand as={Link} to="/" ><img className="logomain" src={logo} /></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/" >Home</Nav.Link>
          <Nav.Link as={Link} to="/categories"  >Categories</Nav.Link>
          <Nav.Link as={Link} to="/Howitwork" className="navbrr-tt" >How it Works</Nav.Link>
          <Nav.Link as={Link} to="/categories" className="navbrr-tt" >Find a Designer</Nav.Link>
          {
            /* 
                  <Nav.Link as={Link} to="/cart" >Cart</Nav.Link>
                  <Nav.Link as={Link} to="/summry" >Summry</Nav.Link>
                  <Nav.Link as={Link} to="/fpassword" >Forgot Password</Nav.Link>
            
                        <Nav.Link as={Link} to="/tool" >Tool</Nav.Link>
                  <Nav.Link as={Link} to="/faq" >FAQ</Nav.Link>
                  {
                 authUrl()
                }
            
            
                 <MdSearch  className="mr-sm-2" style={{fontSize:20}} />
                  <Link to={'/cart'}><RiShoppingCartLine  className="mr-sm-2" style={{fontSize:20}} ></RiShoppingCartLine></Link>
                  {
                  getCartLenth()
                  }
                  <Button className="prm-color btn-cst-primary">Search</Button>
            
            */
          }
        </Nav>
        <Form className="form-zxsyu" >
          {authUrl()}
          <a class="" onClick={() => setlanmodal(true)} style={{ color: 'black', fontSize: '1.3rem', margin: 1, padding: 6.4, marginRight: 10 }}>
            <img src={require('../images/svg/flags/france.svg')} style={{ width: 17 }} />
          </a>
          {
            authUrl1()
          }
          <a class="" href="#" style={{ color: 'black', fontSize: '1.3rem', margin: 1, padding: 6.4 }}><FaRegHeart /><span class="badge badge-default nav-badges">3</span> </a>
          
          <a onClick={() => setShowCart(!showCart)} style={{ color: 'black', fontSize: '1.3rem', margin: 1, padding: 6.4 }}><HiOutlineShoppingBag /><span class={getCartLenth() != null ? "badge badge-default nav-badges" : "displsrye"}>   {
            getCartLenth()
          }</span><AiFillCaretDown style={{ marginLeft: 4, fontSize: 11 }} /> </a>

        </Form>


      </Navbar.Collapse>

    </Navbar>
    <div  className={showCart == false ? "displsrye" : "bxshd-none12dsdsds"}>

      {cart && cart.items && cart.items.length > 0 ? cart.items.map(x => <div class="row" style={{ padding: 15 }}>
        <div class="col-3">
          <img src={x.printimage} class="cart-imgs-cs" />
        </div>
        <div class="col-9">
          <h4 className="cart-title-cs">{x.product} <span
            className="cart-title-cs">{x.nonCustomize ? "(Customized)" : ""}</span></h4>
          <p className="cart-title-cs">{x.description ? x.description : 'Perfect binding135 and 250g/m<sup>2</sup> art paper 96 pages with cover'}</p>
        </div>
      </div>

      ) : ""}
      <div class="row mt-3 mb-5">
        <div class="col-md-6">
          <button class="btn btn-block btn-theme-outline" onClick={()=>history.push("/cart")}>Go to Cart</button>
        </div>
        <div class="col-md-6">
          <button class="btn btn-block btn-theme-outline">Checkout</button>
        </div>
      </div>
    </div>
    <Modal centered
      show={lanmodal} onHide={setlanmodal}>
      <Modal.Header closeButton>
        <Modal.Title>Change Language</Modal.Title>
      </Modal.Header>
      <Modal.Body>   <ul class="flags-ul">
        <li>
          <a href="#"><img src={require('../images/svg/flags/france.svg')} width="20px" /><span class="pl-3">FR</span></a>
        </li>
        <li>
          <a href="#"><img src={require('../images/svg/flags/italy.svg')} width="20px" /><span class="pl-3">IT</span></a>
        </li>
        <li>
          <a href="#"><img src={require('../images/svg/flags/spain.svg')} width="20px" /><span class="pl-3">ES</span></a>
        </li>
        <li>
          <a href="#"><img src={require('../images/svg/flags/united-kingdom.svg')} width="20px" /><span class="pl-3">EN</span></a>
        </li>

        <li>
          <a href="#"><img src={require('../images/svg/flags/germany.svg')} width="20px" /><span class="pl-3">DE</span></a>
        </li>
      </ul></Modal.Body>
    </Modal>
  </div>



}

