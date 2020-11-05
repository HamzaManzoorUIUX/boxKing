import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useHistory
} from "react-router-dom";
import { useSelector } from 'react-redux';
import NavBar from './navbar';
import Strip from './strip';
import {useDispatch} from 'react-redux';

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
                            <img style={{ width: 111, height: 111, marginTop: 22, marginBottom: 13
                             }} src="https://image.freepik.com/free-vector/man-avatar-profile-round-icon_24640-14044.jpg" />
                            <h2 className="printingTitle" style={{ marginTop: 13 }}>{user ? user.name : ""}</h2>
                            <h2 className="printingTitleSub font-13px">{user ? user.email : ""}</h2>
                        </div>

                        <div className="printingTitleMenu">
                            <p>Menu</p>
                            <div></div>
                        </div>
                        <div className="mt-3 mtd-2s">
                            <Link to='/user' style={{color: '#707070'}}><span className="DashoardIcon"><img src={require('../../images/panel/1.png')} /></span>Dashboard</Link>
                            <Link to='/user/orders/recent' style={{color: '#707070'}}><span className="DashoardIcon"><img src={require('../../images/panel/2.png')}  /></span>Recent Orders</Link>
                            <Link to='/user/orders' style={{color: '#707070'}}><span className="DashoardIcon"><img src={require('../../images/panel/3.png')} /></span>All Orders</Link>
                            <Link to='/user/payment' style={{color: '#707070'}}><span className="DashoardIcon"><img className="doller" src={require('../../images/panel/5.png')}  /></span>My Payments</Link>
                            <Link to='/user/settings' style={{color: '#707070'}}><span className="DashoardIcon"><img src={require('../../images/panel/6.png')} /></span>Settings</Link>
                            <Link  onClick={()=>{
                                 dispatch({type:actionMethodes.logOut,payload:{}});
                                 history.replace('/')
                            }} style={{color: '#707070',marginBottom:30}}><span className="DashoardIcon"><img src={require('../../images/panel/7.png')}/></span>Logout</Link>

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