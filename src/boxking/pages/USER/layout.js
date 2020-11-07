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
        {/* <button className="SideNavBtn">
            <span className="fas fa-plus"></span>
        </button> */}
        <div className="container" style={{ marginTop: 83, marginBottom:20}}>
            <div id='myShadow'  onClick={()=>SideNavBarTriger('sideNavUser')}></div>
            <div className="row">
                <div className="col-md-3 sideNavUser" id="sideNavUser">
                    <div className="card ">
                        <div className="printingavtr" onClick={()=>SideNavBarTriger('sideNavUser')}>
                            <img className="userImg" src="https://image.freepik.com/free-vector/man-avatar-profile-round-icon_24640-14044.jpg" />
                            <h2 className="printingTitle" style={{ marginTop: 13 }}>{user ? user.name : ""}</h2>
                            <h2 className="printingTitleSub font-13px">{user ? user.email : ""}</h2>
                        </div>

                        <div className="printingTitleMenu">
                            <p>Menu</p>
                            <div></div>
                        </div>
                        <div className="mt-3 mtd-2s">
                            <Link to='/user' style={{color: '#707070'}}><span className="DashoardIcon"><img src={require('../../images/panel/1.png')} /></span><span className='myText'>Dashboard</span></Link>
                            <Link to='/user/orders/recent' style={{color: '#707070'}}><span className="DashoardIcon"><img src={require('../../images/panel/2.png')}  /></span><span className='myText'>Recent Orders</span></Link>
                            <Link to='/user/orders' style={{color: '#707070'}}><span className="DashoardIcon"><img src={require('../../images/panel/3.png')} /></span><span className='myText'>All Orders</span></Link>
                            <Link to='/user/payment' style={{color: '#707070'}}><span className="DashoardIcon"><img className="doller" src={require('../../images/panel/5.png')}  /></span><span className='myText'>My Payments</span></Link>
                            <Link to='/user/settings' style={{color: '#707070'}}><span className="DashoardIcon"><img src={require('../../images/panel/6.png')} /></span><span className='myText'>Settings</span></Link>
                            <Link  onClick={()=>{
                                 dispatch({type:actionMethodes.logOut,payload:{}});
                                 history.replace('/')
                            }} style={{color: '#707070',marginBottom:30}}><span className="DashoardIcon"><img src={require('../../images/panel/7.png')}/></span><span className='myText'>Logout</span></Link>

                        </div>
                    </div>


                </div>
                <div className="col-md-9 otherConteny">
                    {props.children}
                </div>
            </div>
        </div>
    </>
}
function SideNavBarTriger(id){
var sideNav=document.getElementById(id);
var myShadow=document.getElementById('myShadow');
if(sideNav.classList.contains(id)){
    sideNav.classList.remove(id)
    myShadow.classList.add('show')
    
}
else if(!sideNav.classList.contains(id)){
    sideNav.classList.add(id)
    myShadow.classList.remove('show')
}
}