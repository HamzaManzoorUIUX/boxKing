import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useHistory
} from "react-router-dom";
import { useSelector } from 'react-redux';
import {useDispatch} from 'react-redux';
import NavBar from './navbar';
import Strip from './strip';
import actionMethodes from '../../../redux/actionMethodes/cartActionsTypes';
export default (props) => {
    const user = useSelector(e => e.auth)
    const dispatch=useDispatch();
    const history=useHistory();
    return <>
        <Strip />
        <NavBar />
        <div className="container" style={{ marginTop: 83, marginBottom:20}}>
            <div className="row">
                <div className="col-md-3">
                    <div className="card ">
                        <div className="printingavtr">
                            <img style={{ width: 111, height: 111, marginTop: 12 }} src="https://image.freepik.com/free-vector/man-avatar-profile-round-icon_24640-14044.jpg" />
                            <h2 className="printingTitle" style={{ marginTop: 13 }}>{user ? user.CompanyName : ""}</h2>
                            <h2 className="printingTitleSub" style={{ marginTop: -10 }}>{user ? user.email : ""}</h2>
                        </div>

                        <div className="printingTitleMenu">
                            <p>Menu</p>
                            <div></div>
                        </div>
                        <div className="mt-3 mtd-2s">
                            <Link to='/printing' style={{color: '#707070'}}><span><img src={require('../../images/panel/1.png')} style={{
                                width: 19, marginTop: -3,
                                marginLeft: 10,
                                marginRight: 7
                            }} /></span> Dashboard</Link>
                            <Link to='/printing/recent' style={{color: '#707070'}}><span><img src={require('../../images/panel/2.png')} style={{
                                width: 19, marginTop: -3,
                                marginLeft: 10,
                                marginRight: 7
                            }} /></span>Recent Orders</Link>
                            <Link to='/printing/orders' style={{color: '#707070'}}><span><img src={require('../../images/panel/3.png')} style={{
                                width: 19, marginTop: -3,
                                marginLeft: 10,
                                marginRight: 7
                            }} /></span>All Orders</Link>
                            <Link to='/printing/payment' style={{color: '#707070'}}><span><img src={require('../../images/panel/5.png')} style={{
                                width: 13, marginTop: -3,
                                marginLeft: 10,
                                marginRight: 7
                            }} /></span>My Payments</Link>
                            <Link to='/printing/customers' style={{color: '#707070'}}><span><img src={require('../../images/panel/4.png')} style={{
                                width: 13, marginTop: -3,
                                marginLeft: 10,
                                marginRight: 7
                            }} /></span>My Customers</Link>
                            <Link to='/printing/settings' style={{color: '#707070'}}><span><img src={require('../../images/panel/6.png')} style={{
                                width: 19, marginTop: -3,
                                marginLeft: 12,
                                marginRight: 10
                            }} /></span>Settings</Link>
                            <Link  onClick={()=>{
                                 dispatch({type:actionMethodes.logOut,payload:{}});
                                 history.replace('/')
                            }} style={{color: '#707070',marginBottom:30}}><span><img src={require('../../images/panel/7.png')} style={{
                                width: 19, marginTop: -3,
                                marginLeft: 10,
                                marginRight: 7
                            }} /></span>Logout</Link>

                        </div>
                    </div>


                </div>
                <div className="col-md-9">
                    {props.children}
                </div>
            </div>
        </div>
    </>
}