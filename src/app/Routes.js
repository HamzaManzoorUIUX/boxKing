/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import {Layout} from "../_metronic/layout";
import BasePage from "./BasePage";
import { Logout, AuthPage } from "./modules/Auth";
import ErrorsPage from "./modules/ErrorsExamples/ErrorsPage";
import HomePage from '../boxking/pages/home';
import Login from '../boxking/pages/login';
import Forgot from '../boxking/pages/forgot';
import SignUp from '../boxking/pages/signUp';
import FAQ from '../boxking/pages/faq'
import Cart from '../boxking/pages/cart'
import Howitwork from '../boxking/pages/howitwork'
import Summry from '../boxking/pages/summry'
import Tool from '../boxking/pages/tool'
import Packaging from '../boxking/pages/packagingpage'
import TDcomp from '../boxking/components/tool/threeDMainCom';
import ProductListing from '../boxking/pages/ProductListing';
import PrintingDashboard from '../boxking/pages/printing panel/dashboard';
import UserDashboard from '../boxking/pages/USER/dashboard';
import Userrecent from '../boxking/pages/USER/recent';
import Userorders from '../boxking/pages/USER/orders';
import Userpending from '../boxking/pages/USER/pending';
import Usercancel from '../boxking/pages/USER/cancel';
import Usercompleted from '../boxking/pages/USER/complete';
import Usersettings from '../boxking/pages/USER/settings';
import Userpayment from '../boxking/pages/USER/payment';
import RecentOrders from '../boxking/pages/printing panel/recentOrders'
import OrderItems from '../boxking/pages/printing panel/products'
import OrderItem from '../boxking/pages/printing panel/product'
import UOrderItems from '../boxking/pages/USER/products'
import UOrderItem from '../boxking/pages/USER/product'
import Orders from '../boxking/pages/printing panel/allOrders'
import Customers from '../boxking/pages/printing panel/customers';
import PrintingLogin from '../boxking/pages/printing panel/login';
import PrintingSignUp from '../boxking/pages/printing panel/signUp';
import Printpayment from '../boxking/pages/printing panel/Printpayment';
import Printsetting from '../boxking/pages/printing panel/Printsetting';
import Success from '../boxking/pages/congrates';
import Categories from '../boxking/pages/categories'
import PRCategories from '../boxking/pages/prcategories'
import PRType from '../boxking/pages/producttypepage'
import PRProduct from '../boxking/pages/prproduct'
import Info from '../boxking/pages/packaginginformation'
import ProductDetails from '../boxking/pages/productDetails'
import _ from 'lodash';
export function Routes() {
    const {isAuthorized,role} = useSelector(
        ({auth}) => ({
            isAuthorized:!_.isEmpty(auth) ,
            role:(!_.isEmpty(auth)?auth.role:"")
        }),
        shallowEqual
    );

    const authUrl=()=>{
     if(!isAuthorized)
     {

       
       return <>
        <Route path="/login">
       <Login/> 
      </Route>
      <Route path="/printing/login">
       <PrintingLogin/> 
     </Route>
     <Route path="/printing/register">
       <PrintingSignUp/> 
     </Route>
     <Route path="/admin"  >
      <AuthPage />
     </Route>
     <Route path="/register">
            <SignUp />
          </Route>
          <Route path="/fpassword">
            <Forgot />
          </Route>
       </>
     }
     else if(isAuthorized && role=="user")
     {
       return <>
        <Route exact path="/user" >
       <UserDashboard />
       </Route>
       <Route exact path='/user/orders/recent' >
       <Userrecent  />
       </Route>
       <Route exact path='/user/orders' >
       <Userorders  />
       </Route>
       <Route exact path='/user/orders/pending' >
       <Userpending  />
       </Route>
       <Route exact path='/user/orders/cancel' >
       <Usercancel  />
       </Route>
       <Route exact path='/user/orders/completed' >
       <Usercompleted  />
       </Route>
       <Route exact path='/user/payment' >
       <Userpayment  />
       </Route>
       <Route exact path='/user/settings' >
       <Usersettings />
     </Route>
     <Route path="/user/OrderItems">
       <UOrderItems/> 
     </Route>
     <Route path="/user/OrderItem">
       <UOrderItem/> 
     </Route>
    
     </>
     }
     else if(isAuthorized && role=="admin")
     {
      return  <Layout>
      <BasePage/>
      </Layout>
     }
     else if(isAuthorized && role=="printing")
     {
         return (<>
             <Route exact path="/printing">
       <PrintingDashboard/>
     </Route>
     
     <Route path="/printing/recent">
       <RecentOrders/>
     </Route>

     <Route path="/printing/OrderItems">
       <OrderItems/> 
     </Route>
     <Route path="/printing/OrderItem">
       <OrderItem/> 
     </Route>
     <Route path="/printing/Orders">
       <Orders/> 
     </Route>
     <Route path="/printing/customers">
       <Customers/> 
     </Route>
     <Route exact path='/printing/payment' >
       <Printpayment  />
       </Route>
       <Route exact path='/printing/settings' >
       <Printsetting />
     </Route>

         </>)
     }
   }
 

    return (
        <Switch>
        <Route exact path="/">
        <HomePage />
        </Route>
        
          <Route path="/faq">
            <FAQ />
          </Route>
          <Route path="/packaging">
            <Packaging />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/howitwork">
            <Howitwork />
          </Route>
          <Route path="/summry">
            <Summry />
          </Route>
          
          <Route path="/categories/productTypes/producttype">
            <Categories />
          </Route>
          <Route exact path="/categories">
            <PRCategories />
          </Route>
          <Route exact path="/categories/productTypes">
            <PRType />
          </Route>
          <Route path="/categories/productTypes/products">
            <PRProduct />
          </Route>
          <Route path="/info">
            <Info />
          </Route>
          <Route path="/tool">
            <Tool/>
          </Route>
          <Route path="/success">
            <Success/>
          </Route>
          
          <Route path="/productdetial">
       <ProductDetails/> 
     </Route>
      
       {
         authUrl()
       }
          
         
          

        <Route path="/error" component={ErrorsPage}/>
        <Route path="/logout" component={Logout}/>

  <Route component={ErrorsPage} />        
        {/* {!isAuthorized ? (
                <Route>
                    <AuthPage />
                </Route>
            ) : (
                <Layout>
                <BasePage/>
            </Layout>
                
            )} */}
        </Switch>
    );
}
