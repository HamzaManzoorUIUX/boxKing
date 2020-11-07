import React, { useState, useEffect } from "react";
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
import { FiPlus, FiMinus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../redux/actionMethodes/cartActionsTypes';
import uniqeId from '../utils/newId';
import Snackbar from '@material-ui/core/Snackbar';
import { useLocation, useHistory } from 'react-router-dom';
import { Accordion, Card, Button } from "react-bootstrap";
import { BsChevronRight } from "react-icons/bs";

import _ from 'lodash';


let selectedProduct = 0;
export default () => {
  const [categories, setCategories] = useState([]);
  const [productTypes, setProductTypes] = useState([]);

  const history = useHistory();
  useEffect(() => {


    const categories = async () => {
      const { data, status } = await repository.CategoriesComplete().then(x => x).then(x => x);
      if (status == 200) {
        setCategories(data);
        if (data.length > 0) {
          if (data[0] && data[0].product_type)
            setProductTypes(data[0].product_type);
        }
      }

    }

    categories();

  }, []);

  const handleProductTypeChange = (id) => {
    const data = categories.find(x => x.id == id);
    if (data && data.product_type) {
      setProductTypes(data.product_type);
    }
  }

  return (
    <>
      <Strip />
      <Navbar />


      <section class="lorem-section">
        <div class="container mt-4 mb-5">
          <div class="row mb-2">
            <div class="col-md-12">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="#">Home</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Categories</li>
                </ol>
              </nav>

            </div>
          </div>
          <div class="row setMinHeight">
            <div class="col-md-3 text-left">
              <Accordion defaultActiveKey="0">
                {
                  categories.map(x => <Card className="cresfdky"  >
                    <Card.Header className="accordian-Header crdtdsdS">
                      <Accordion.Toggle
                        className="accordian-toggle-specs"
                        variant="link"
                        eventKey={x.id}
                        onClick={() => handleProductTypeChange(x.id)}
                      >
                        <div><p className="accoridan-specs-font my-2" style={{ color: '#333', fontSize: 15 }}>{x.name}</p></div>
                        <div><BsChevronRight className="accoridan-specs-font1" style={{ color: '#333', fontSize: 15 }} /> </div>
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={x.id}>
                      <div class="row">
                        <div class="col-md-12 am-collapselink">
                          <ul class="p-d-ul">
                            {x.product_type.map(X => <li><a onClick={() => {
                              history.push("/categories/productTypes/producttype", { productType: X })

                            }}>{X.name}</a></li>)}

                          </ul>
                        </div>
                      </div>

                    </Accordion.Collapse>
                  </Card>)
                }

              </Accordion>
            </div>
            <div class="col-md-9 mt-5 mt-md-0">
              <div class="row">

                {
                  productTypes.map(x => <div onClick={() => {
                    history.push("/categories/productTypes/producttype", { productType: x })

                  }} class="col-md-6 col-sm-6 col-lg-3 text-center col-12">
                    <div class="card category-card-cs">
                      <div class="category-img-cs">
                        <img
                          class="card-img img-responsive"
                          src={`${urlImg}system/public/dist/img/prdtype/${x.image}`}
                        />
                      </div>
                      <div class="row cat-page-cs">
                        <div class="col-md-12">
                          <a >{x.name}</a>
                        </div>
                      </div>

                    </div>
                  </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </section>






      <Footer />

    </>
  );
}

