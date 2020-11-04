import React,{useState,useEffect} from "react";
import Navbar from '../components/navbar';
import Strip from '../components/strip';
import FirstCom from '../components/home/firstCom';
import Second from '../components/home/featuresbox';
import Footer from '../components/home/footer';
import FeatureProducts from '../components/home/featureProduct';
import WhatWeGet from '../components/home/whatWeGet';
import Sub from '../components/home/subscribe'
import { repository } from '../utils/repository';
import { urlImg } from '../utils/baseUrl';
import { Modal, Button } from 'react-bootstrap';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../redux/actionMethodes/cartActionsTypes';
import uniqeId from '../utils/newId';
import Snackbar from '@material-ui/core/Snackbar';
import {useLocation,useHistory} from 'react-router-dom';
import _ from 'lodash';
import Bread from '../components/breadCrum';

let selectedProduct = 0;
export default () => {

    const location=useLocation();
    const history=useHistory();

    const [categories, setCategories] = useState([]);
 
  useEffect(() => {

  console.log(location.state.productType);
    if(location.state.productType)
    {
        setCategories(location.state.productType);
    }
  }, []);

  return (
    <>
      <Strip />
      <Navbar />

      <section class="we-offer-area text-center" style={{ backgroundColor: 'white' }}>
        
      <div className="row mb-4 mt-4">
                <div className="col-md-6 offset-md-3 text-center">
                  <h2 className="cat-title mb-3">Product Types</h2>
                  <hr className="hr-c" />
                </div>
              </div>
        <div class="container"><br />
          <div class="row mb-4">
            <div class="col-md-4 offset-md-8 text-right">
              <div class="example">

                <input type="text" placeholder="Search.." name="search" />
                <button type="submit"><i class="fa fa-search" style={{ color: 'white' }}></i></button>


              </div>
            </div>
          </div>
          <div class="row mb-5">
          {
                 categories.map(x=><div className="col-md-3 mb-3">
                          <div className="card product-card">
                      <div className="product-img">
                        <img className="card-img img-responsive" src={`${urlImg}system/public/dist/img/prdtype/${x.image}`}  alt="Vans" />
                      </div>
                      
                      <div className="card-body">
                        <h5 className="product-title mt-2 mb-2">{x.name}</h5>
                        {/* <span className="product-description">                        <div dangerouslySetInnerHTML={ { __html:x.description}} >
                        </div>    

</span> */}
                             
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-12">
                          <button className="btn change-btn" onClick={()=>{
                              history.push("/categories/productTypes/producttype",{productType:x})

                          }}>View</button>
                        </div>
                      </div>
                    </div>
         </div>
                )
                }
          </div>
        </div>
      </section>
      
    
      <Footer />

    </>
  );
}

