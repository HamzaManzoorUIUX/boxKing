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
import { Modal, Button } from 'react-bootstrap';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../redux/actionMethodes/cartActionsTypes';
import uniqeId from '../utils/newId';
import Snackbar from '@material-ui/core/Snackbar';
import {useLocation,useHistory} from 'react-router-dom';
import _ from 'lodash';
import {urlImg} from '../utils/baseUrl';


let selectedProduct = 0;
export default () => {
  const history=useHistory();

    const location=useLocation();

    const [categories, setCategories] = useState([]);
  const [products, setproducts] = useState([]);


  const [printingCompanies, setPrintingCompanies] = useState([]);
  const [selectedPrinting, setSelectedPrinting] = useState({});
  const [finishing, setfinishing] = useState([]);
  const [selectedfinishing, setSelectedfinishing] = useState('');
  const [finishingEffect, setfinishingEffect] = useState([]);
  const [selectedfinishingEffect, setSelectedfinishingEffect] = useState('');
  const [material, setmaterial] = useState([]);
  const [selectedmaterial, setSelectedmaterial] = useState('');
  const [typeOfprocessing, settypeOfprocessing] = useState([]);
  const [selectedtypeOfprocessing, setSelectedtypeOfprocessing] = useState('');
  const [checkOutModal, setcheckOutModal] = useState(false);
  const [quantity, setquantity] = useState(1);
  const [cartmsg, setcartmsg] = useState(false);

  //cart handling
  const Cart = useSelector(state => state.Cart);
  const dispatch = useDispatch();

  const addItemTocart = () => {


    let obj = categories.find(x => x.id == selectedProduct);
    if (obj) {


      dispatch({
        type: actionTypes.addItem, payload: {
          item: {
            id: uniqeId(),
            purchaseAmount: obj.unitCost,
            quantity: quantity,
            productId: obj.id,
            product: obj.shortdescription,
            description: obj.shortdescription,
            finishing: selectedfinishing,
            finishingEffect: selectedfinishingEffect,
            material: selectedmaterial,
            typeOfprocessing: selectedtypeOfprocessing,
            nonCustomize: true,
            // printRun: '',
            printimage: 'https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg',

          },
          printing: selectedPrinting
        }
      })
      setcheckOutModal(false);
      setcartmsg(true);

    }


  }

  const getPrintingCompanies = async () => {
    const { data, status } = await repository.printingCompanies().then(x => x).then(x => x);
    if (status == 200) {
      setPrintingCompanies(data);

    }

  }
  const getMaterials = async () => {
    const { data, status } = await repository.getmaterials().then(x => x).then(x => x);
    if (status == 200) {
      setmaterial(data);

    }

  }
  const getFinishings = async () => {
    const { data, status } = await repository.getfinishings().then(x => x).then(x => x);
    if (status == 200) {
      setfinishing(data);

    }

  }
  const getFinishingsEffects = async () => {
    const { data, status } = await repository.getfinishingeffects().then(x => x).then(x => x);
    if (status == 200) {
      setfinishingEffect(data);

    }

  }
  const gettypeOfprocessing = async () => {
    const { data, status } = await repository.getprocessings().then(x => x).then(x => x);
    if (status == 200) {
      settypeOfprocessing(data);

    }

  }
  const handlePrintingChange = (value) => {
    let foundValue = printingCompanies.find(x => x.id == value);
    if (foundValue) {
      setSelectedPrinting(foundValue);
    }
  }

  const handleQuanity = (value) => {
    switch (value) {
      case "plus": {
        setquantity(quantity + 1);
        break;
      }
      case "minus": {
        if (quantity > 1) {
          setquantity(quantity - 1);
        }
        break;
      }
    }
  }

  
  useEffect(() => {
    const fetchAll = async () => {
        await getPrintingCompanies();
        await gettypeOfprocessing();
        await getFinishingsEffects();
        await getFinishings();
        await getMaterials();
    }
    fetchAll();
  
    console.log(location.state.products)
    if(location.state.products)
    {
        setCategories(location.state.products);
    }
  }, []);

  return (
    <>
      <Strip />
      <Navbar />
      <section class="page-header">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <h2 class="page-title"> Products</h2>
                  <p class="mt-2">  <a  class="home-link">Home</a> / Categories/Product Types/<span class="text-muted">Products</span></p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      <section class="we-offer-area text-center" style={{ backgroundColor: 'white' }}>
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
        
                    <a onClick={()=> history.push("/productdetial",{product:x})}>
                    <div className="card product-card">
                      <div className="product-img">
                        <img className="card-img img-responsive" src={`${urlImg}system/public/dist/img/upload/${x.image}`}  alt="Vans" />
                      </div>
                      
                      <div className="card-body">
                        <h5 className="product-title mt-2 mb-2">{x.title}</h5>
                        <span className="product-description">{x.shortdescription}</span>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-12">
                          <button className="btn change-btn" onClick={()=>{
                            setcheckOutModal(true)
                            selectedProduct=x.id;
                          }}>Add To Cart</button>
                        </div>
                      </div>
                    </div>
       
                          </a>
         </div>
                )
                }
          </div>
        </div>
      </section>
      
      <Modal onHide={() => setcheckOutModal(false)}
            centered show={checkOutModal}>
            <Modal.Header closeButton={true}>

            </Modal.Header>
            <Modal.Body>
                <div className="md-check-pr">
                    <div className="md-check-h1" style={{ width: '79%', marginRight: '1%' }}>
                        <p className="m-sdsd-d-txt1">Quantity</p>
                    </div>
                    <div className="md-check-h1" style={{ width: '30%' }}>
                        <div className="btn-cdsd3">
                            <button className="btn" onClick={() => handleQuanity('minus')} style={{ paddingTop: 0 }}>
                                <FiMinus />
                            </button>
                            {quantity}
                            <button className="btn" onClick={() => handleQuanity('plus')} style={{ paddingTop: 0 }}>
                                <FiPlus />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="md-check-pr md-check-h1 mt-4 pr-3">
                    <select value={(selectedPrinting.id ? selectedPrinting.id : 0)}
                        onChange={e => handlePrintingChange(e.target.value)}
                        className="printddhh33d form-control ">
                        <option>Select Printing Company</option>
                        {
                            printingCompanies.map(x => <option key={x.id} value={x.id}>
                                {x.CompanyName}
                            </option>)
                        }
                    </select>
                </div>

                <div className="scyuyu44brn">
                    <p>We’ve lots or printing partners all over the switzerland. Find the very nearest</p>
                </div>
                <div className="md-check-pr md-check-h1 mt-4 pr-3">
                    <select value={selectedfinishing}
                        onChange={e => setSelectedfinishing(e.target.value)}
                        className="printddhh33d form-control ">
                        <option>Select finishing</option>
                        {
                            finishing.map(x => <option key={x.id} value={x.name}>
                                {x.name}
                            </option>)
                        }
                    </select>
                </div>
                <div className="md-check-pr md-check-h1 mt-4 pr-3">
                    <select value={selectedfinishingEffect}
                        onChange={e => setSelectedfinishingEffect(e.target.value)}
                        className="printddhh33d form-control ">
                        <option>Select finishing Effect</option>
                        {
                            finishingEffect.map(x => <option key={x.id} value={x.name}>
                                {x.name}
                            </option>)
                        }
                    </select>
                </div>
                <div className="md-check-pr md-check-h1 mt-4 pr-3">
                    <select value={selectedmaterial}
                        onChange={e => setSelectedmaterial(e.target.value)}
                        className="printddhh33d form-control ">
                        <option>Select Material</option>
                        {
                            material.map(x => <option key={x.id} value={x.name}>
                                {x.name}
                            </option>)
                        }
                    </select>
                </div>
                <div className="md-check-pr md-check-h1 mt-4 pr-3">
                    <select value={selectedtypeOfprocessing}
                        onChange={e => setSelectedtypeOfprocessing(e.target.value)}
                        className="printddhh33d form-control ">
                        <option>Select type of processing</option>
                        {
                            typeOfprocessing.map(x => <option key={x.id} value={x.name}>
                                {x.name}
                            </option>)
                        }
                    </select>
                </div>

                <div className="mdl-btm-23" >
                    <button className="btn mdl-btm-chk-btn" onClick={() => addItemTocart()} >Confirm and proceed to cart</button>

                </div>
            </Modal.Body>

        </Modal>
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={cartmsg}
           onClose={setcartmsg}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Item Added to Cart</span>}
          />
      <Footer />

    </>
  );
}

