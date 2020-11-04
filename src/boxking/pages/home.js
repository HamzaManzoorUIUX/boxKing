import React,{useState,useEffect} from "react";
import FirstCom from '../components/home/firstCom';
import Second from '../components/home/featuresbox';
import Navbar from '../components/navbar';
import Strip from '../components/strip';

import Footer from '../components/home/footer';
import FeatureProducts from '../components/home/featureProduct';
import WhatWeGet from '../components/home/whatWeGet';
import Sub from '../components/home/subscribe';
import { repository } from '../utils/repository';
import {urlImg} from '../utils/baseUrl';
import { Modal, Button } from 'react-bootstrap';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../redux/actionMethodes/cartActionsTypes';
import uniqeId from '../utils/newId';
import Snackbar from '@material-ui/core/Snackbar';

import _ from 'lodash';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Link
} from "react-router-dom";


let selectedProduct=0;
export default () => {
  const history=useHistory();
  const [categories,setCategories]=useState([]);
  const [products,setproducts]=useState([]);
  const [activeIndex,setActiveIndex]=useState(0);

  const [printingCompanies, setPrintingCompanies] = useState([]);
  const [selectedPrinting, setSelectedPrinting] = useState({});
  const [finishing, setfinishing] = useState([]);
  const [selectedfinishing, setSelectedfinishing] = useState({});
  const [finishingEffect, setfinishingEffect] = useState([]);
  const [selectedfinishingEffect, setSelectedfinishingEffect] = useState({});
  const [material, setmaterial] = useState([]);
  const [selectedmaterial, setSelectedmaterial] = useState({});
  const [typeOfprocessing, settypeOfprocessing] = useState([]);
  const [selectedtypeOfprocessing, setSelectedtypeOfprocessing] = useState({});
  const [checkOutModal, setcheckOutModal] = useState(false);
  const [quantity, setquantity] = useState(1);
  const [cartmsg,setcartmsg]=useState(false);

//cart handling
const Cart = useSelector(state => state.Cart);
const dispatch = useDispatch();

const addItemTocart = () => {


  let obj=products.find(x=>x.id==selectedProduct);
  if(obj)
  {
    
    

    dispatch({
      type: actionTypes.addItem, payload: {
          item: {
              id: uniqeId()+new Date(),
              purchaseAmount: obj.unitCost,
              quantity: quantity,
              productId: obj.id,
              product: obj.title,
              description: obj.shortdescription,
              finishing: selectedfinishing.name,
              finishingPrice:selectedfinishingEffect.extraamount,
              finishingEffect: selectedfinishingEffect.name,
              finishingEffectPrice:selectedfinishingEffect.extraamount,
              material: selectedmaterial.name,
              materialPrice:selectedfinishingEffect.extraamount,
              typeOfprocessing: selectedtypeOfprocessing.name,
              typeOfprocessingPrice:selectedfinishingEffect.extraamount,
              nonCustomize:false,
              // printRun: '',
             printimage:urlImg+'system/public/dist/img/upload/'+obj.image,

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

const handleFinishingChange=(value)=>{
  let foundValue = finishing.find(x => x.id == value);
  if (foundValue) {
    setSelectedfinishing(foundValue);
  }
}
const handleFinishingEffectChange=(value)=>{
  let foundValue = finishingEffect.find(x => x.id == value);
  if (foundValue) {
    setSelectedfinishingEffect(foundValue);
  }
}
const handleMaterialChange=(value)=>{
  let foundValue = material.find(x => x.id == value);
  if (foundValue) {
    setSelectedmaterial(foundValue);
  }
}
const handleProcessingChange=(value)=>{
  let foundValue = typeOfprocessing.find(x => x.id == value);
  if (foundValue) {
    setSelectedtypeOfprocessing(foundValue);
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

const handleActiveIndex=(val)=>{
  if(val==0)
  {
    if(activeIndex==0)
    {
      setActiveIndex(2);
    }
    else
    {
      setActiveIndex(activeIndex-1)
    }
  }

  else   if(val==1)
  {
    if(activeIndex==2)
    {
      setActiveIndex(0);
    }
    else
    {
      setActiveIndex(activeIndex+1)
    }
  }
}

  useEffect(()=>{
  
    const fetchAll = async () => {
      await getPrintingCompanies();
      await gettypeOfprocessing();
      await getFinishingsEffects();
      await getFinishings();
      await getMaterials();
  }
  fetchAll();
    const categories = async () => {
      const { data, status } = await repository.CategoriesComplete().then(x => x).then(x => x);
      if (status == 200) {
        setCategories(_.take(data, 12));

      }

    }
    const categories1 = async () => {
      const { data, status } = await repository.products().then(x => x).then(x => x);
      if (status == 200) {
      const  filterData=data.filter(x=>x.makeFeature==1)
        setproducts(_.take(filterData, 12));

      }

    }
    categories();
    categories1();

  },[]);
    return (
      <>
        <div style={{ backgroundColor: 'white' }}>
          <Strip />
          <Navbar />
          {/* <FirstCom/>
   <Second/>
   <FeatureProducts/>
   <WhatWeGet/>
   <Sub/> */}

          <section className="slider-margin">
            <div id="myCarousel" className="carousel slide carousel-fade" data-ride="carousel">
              <div className="carousel-inner">
                <div className={activeIndex==0?"carousel-item active":"carousel-item"}>
                  <div className="mask flex-center">
                    <div className="container h-100 d-flex justify-content-center align-items-center">
                      <div className="row align-items-center">
                        <div className="col-md-6 offset-md-1 col-12 mt-5 mt-md-0">
                          <h4>
                            Copying and <br />
                                            Printing Center
                                        </h4>
                          <p>We bring design together with technology</p>
                          <button type="button" className="btn change-btn pl-4 pr-4 mb-3">Download templete1</button>
                        </div>
                        <div className="col-md-5 col-12">
                          <img src="https://cdn.shopify.com/s/files/1/0018/1587/1546/products/custom-design-corrugated-mailer-boxes_1024x1024.png?v=1591919291" className="mx-auto" alt="slide" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={activeIndex==1?"carousel-item active":"carousel-item"}>
                  <div className="mask flex-center">
                    <div className="container h-100 d-flex justify-content-center align-items-center">
                      <div className="row align-items-center">
                        <div className="col-md-6 offset-md-1 col-12 mt-5 mt-md-0">
                          <h4>
                            Present your <br />
                                            awesome product
                                        </h4>
                          <p>We bring design together with technology</p>
                          <button type="button" className="btn change-btn pl-4 pr-4 mb-3">Download templete2</button>
                        </div>
                        <div className="col-md-5 col-12">
                          <img src="https://www.blueboxpackaging.com/wp-content/uploads/2018/12/Custom-Cardboard-Espresso-You-Reverse-Tuck-Coffee-Boxes.jpg" className="mx-auto" alt="slide" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={activeIndex==2?"carousel-item active":"carousel-item"}>
                  <div className="mask flex-center">
                    <div className="container h-100 d-flex justify-content-center align-items-center">
                      <div className="row align-items-center">
                        <div className="col-md-6 offset-md-1 col-12 mt-5 mt-md-0">
                          <h4>
                            Present your <br />
                                            awesome product
                                        </h4>
                          <p>We bring design together with technology</p>
                          <button type="button" className="btn change-btn pl-4 pr-4 mb-3">Download templete3</button>
                        </div>
                        <div className="col-md-5 col-12">
                          <img src="https://cdn.shopify.com/s/files/1/0018/1587/1546/products/custom-branded-product-box-tuck-end_800x.png?v=1591919254" className="mx-auto" alt="slide" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a className="carousel-control-prev" onClick={()=>handleActiveIndex(0)} role="button" data-slide="prev"> <span className="fa fa-angle-left" aria-hidden="true"></span> <span className="sr-only">Previous</span> </a>
              <a className="carousel-control-next"  onClick={()=>handleActiveIndex(1)} role="button" data-slide="next"> <span className="fa fa-angle-right" aria-hidden="true"></span> <span className="sr-only">Next</span> </a>
            </div>
          </section>

        <div style={{marginLeft:'11%',marginRight:'11%'}}>
        <section className="category-section">
            <div className="container">
              <div className="row mb-4 mt-4">
                <div className="col-md-6 offset-md-3 text-center">
                  <h2 className="cat-title mb-3">Our Categories</h2>
                  <hr className="hr-c" />
                </div>
              </div>
              <div className="row mt-4">
              {
                categories.map(x=><div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 col-6 block">
                <div className="content category-card">
                  <center>
                    <img src={`${urlImg}system/public/dist/img/categories/${x.image}`} className="cate-img" />
                  </center>
                  <a onClick={()=>{
                            history.push("/categories/productTypes",{productType:x.product_type})
                          }} >
                    <div className="content-overlay"></div>
                    <div className="content-details fadeIn-bottom">
                      <h3 className="content-title">{x.name}</h3>
                    </div>
                  </a>
                </div>
              </div>
          )
              }
              </div>
              {(categories.length>12?<div className="row mt-4">
                <div className="col-md-12 text-center">
                  <Button className="btn change-btn" as={Link} to="/categories" >See more</Button>
                </div>
              </div>:<></>)}
            </div>
          </section>
          <section className="we-offer-area text-center">
            <div className="container">
              <div className="row mb-5 mt-0">
                <div className="col-md-6 offset-md-3 text-center">
                  <h2 className="cat-title mb-3">Popular Products</h2>
                  <hr className="hr-c" />
                </div>
              </div>

              <div className="row mb-5">
                {
                  products.map(x=><div className="col-md-3 col-sm-6 col-12 mb-3">
                  <a  >
                    <div className="card product-card">
                    <div  className="d-flex justify-content-end">
                <a onClick={()=> history.push("/productdetial",{product:x})}   className="card-link">£{x.unitCost}</a>
                      </div>
                      <div  className="product-img">
                        <img  className="card-img img-responsive" src={`${urlImg}system/public/dist/img/upload/${x.image}`}  alt="Vans" />
                      </div>
                     
                      <div className="card-body" onClick={()=> history.push("/productdetial",{product:x})}>
                        <h5  className="product-title mt-2 mb-2" ><a onClick={()=> history.push("/productdetial",{product:x})}>{x.title}</a></h5>
                        <span className="product-description"><a onClick={()=> history.push("/productdetial",{product:x})}>{x.shortdescription}</a></span>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-12">
                          <button className="btn change-btn" onClick={()=>{
                            setcheckOutModal(true)
                            selectedProduct=x.id;
                          }}>Add to Cart</button>
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

          <section className="detail-boxes">
            <div className="container">
              <div className="row mt-5">
                <div className="col-md-6">
                  <img className="detail-img" src="https://www.saxoprint.co.uk/-/media/saxoprint/products/teaser/promotional-material/flyers/flyers.ashx?mh=422&mw=760&hash=65C03E8262A126313A42B4D1787E5B42" />
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-12" style={{padding:0}}>
                      <h2 className="cat-title"> Even More Good Stuff</h2>
                    </div>
                  </div>
                  <p className="mt-2" style={{fontSize: '1.3rem',fontFamily: 'Poppins'}}>Do you need some stunning flyers for your next guerilla marketing campaign? We have you covered. Choose between a range of formats. Our flyers can be folded or unfolded, allowing up to 12 different sides. If you want a glossy finish, UV coating, or lamination, to build the perfect flyer for your advertising campaign, use our online store.</p>
                  <a href="#" className="buy-now">Buy Now <i className="fa fa-angle-right"></i><i className="fa fa-angle-right"></i></a>
                </div>
              </div>
            </div>
          </section>

          <section className="detail-boxes">
            <div className="container">
              <hr />
              <div className="row mt-5">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-12" style={{padding:0}}>
                      <h2 className="cat-title"> Poster Printing</h2>
                    </div>
                  </div>
                  <p className="mt-2" style={{fontSize: '1.3rem',fontFamily: 'Poppins'}}>Poster advertising remains a bedrock of any comprehensive marketing campaign. We offer seven different materials perfect for indoor and outdoor installations. See how beautiful your brand looks displayed over 150 x 70 cm with a fresh, clean finish.</p>
                  <a href="#" className="buy-now">Buy Now <i className="fa fa-angle-right"></i><i className="fa fa-angle-right"></i></a>
                </div>
                <div className="col-md-6">
                  <img className="detail-img" src="https://www.saxoprint.co.uk/-/media/saxoprint/products/teaser/promotional-material/posters/posters.ashx?mh=422&mw=760&hash=3926AD33ECC753A97246BF80075C0932" />
                </div>

              </div>
            </div>
          </section>

          <section className="detail-boxes">
            <div className="container"><hr />
              <div className="row mt-5">
                <div className="col-md-6">
                  <img className="detail-img" src="https://www.saxoprint.co.uk/-/media/saxoprint/products/teaser/business-stationery/business-cards/business-cards.ashx?mh=422&mw=760&hash=F7FEF88C7AFBF6CAA0775A60E107C4DF" />
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-12" style={{padding:0}}>
                      <h2 className="cat-title"  > Business Card Printing</h2>
                    </div>
                  </div>
                  <p className="mt-2" style={{fontSize: '1.3rem',fontFamily: 'Poppins'}}>Freshen up your networking evenings with some trendy new business cards.</p>
                  <ul className="circle-ul">
                    <li style={{fontSize: '1.3rem',fontFamily: 'Poppins'}}>Standard or folded business cards</li>
                    <li style={{fontSize: '1.3rem',fontFamily: 'Poppins'}}>Up to 450gsm cardstock</li>
                    <li style={{fontSize: '1.3rem',fontFamily: 'Poppins'}}>Spot colours and print finishing available</li>
                  </ul>
                  <a href="#" className="buy-now">Buy Now <i className="fa fa-angle-right"></i><i className="fa fa-angle-right"></i></a>
                </div>
              </div>
            </div>
          </section>

          <section className="detail-boxes">
            <div className="container">
              <hr />
              <div className="row mt-5">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-12" style={{padding:0}}>
                      <h2 className="cat-title"> Greeting Card Printing</h2>
                    </div>
                  </div>
                  <p className="mt-2" style={{fontSize: '1.3rem',fontFamily: 'Poppins'}}>Showing customer appreciation has never lost importance. Send a personalised greeting card to say thank-you. Remind your best customers that you appreciate their business with custom messages which are easy to create with individual online printing capabilities.</p>
                  <a href="#" className="buy-now">Buy Now <i className="fa fa-angle-right"></i><i className="fa fa-angle-right"></i></a>
                </div>
                <div className="col-md-6">
                  <img className="detail-img" src="https://www.saxoprint.co.uk/-/media/saxoprint/products/teaser/cards/cards/cards.ashx?mh=422&mw=760&hash=AD139731124E6F674D380AF08C7F1D38" />
                </div>

              </div>
            </div>
          </section>


   
        </div>
        <div>
          
        <section className="we-offer-area text-center bg-gray" style={{paddingLeft:'12%',paddingRight:'12%'}}>
            <div className="container"><br />
              <div className="row mb-4 mt-4">
                <div className="col-md-6 offset-md-3 text-center">
                  <h2 className="cat-title mb-3">What We Do</h2>
                  <p style={{fontSize: '1.3rem',fontFamily: 'Poppins'}}>There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration in some form</p>

                  <hr className="hr-c" />
                </div>
              </div>
              <div className="row our-offer-items less-carousel">
                <div className="col-md-4 col-sm-6 equal-height adjfiw3">
                  <div className="item">
                    <i className="fa fa-envelope"></i>
                    <h4>Personal contact partner</h4>
                    <p>
                      Customer advice is important to us. Our expert employees are available from Monday to Friday to provide you with prompt answers to your questions and offer customised solutions based on your requirements.
                            </p>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6 equal-height adjfiw3">
                  <div className="item">
                    <i className="fa fa-envelope"></i>
                    <h4>Payment on account</h4>
                    <p>
                      Customer advice is important to us. Our expert employees are available from Monday to Friday to provide you with prompt answers to your questions and offer customised solutions based on your requirements.
                            </p>
                  </div>
                </div>

                <div className="col-md-4 col-sm-6 equal-height adjfiw3">
                  <div className="item">
                    <i className="fa fa-search"></i>
                    <h4>Transparent prices</h4>
                    <p>
                      Customer advice is important to us. Our expert employees are available from Monday to Friday to provide you with prompt answers to your questions and offer customised solutions based on your requirements.
                            </p>
                  </div>
                </div>

                <div className="col-md-4 col-sm-6 equal-height adjfiw3">
                  <div className="item">
                    <i className="fa fa-check"></i>
                    <h4>Standard artwork check</h4>
                    <p>
                      Customer advice is important to us. Our expert employees are available from Monday to Friday to provide you with prompt answers to your questions and offer customised solutions based on your requirements.
                            </p>
                  </div>
                </div>

                <div className="col-md-4 col-sm-6 equal-height adjfiw3">
                  <div className="item">
                    <i className="fa fa-user"></i>
                    <h4>Artwork acceptance</h4>
                    <p>
                      Customer advice is important to us. Our expert employees are available from Monday to Friday to provide you with prompt answers to your questions and offer customised solutions based on your requirements.
                            </p>
                  </div>
                </div>

                <div className="col-md-4 col-sm-6 equal-height adjfiw3">
                  <div className="item">
                    <i className="fa fa-history"></i>
                    <h4>Personal contact partner</h4>
                    <p>
                      Customer advice is important to us. Our expert employees are available from Monday to Friday to provide you with prompt answers to your questions and offer customised solutions based on your requirements.
                            </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
      
        <section className="banners-section" style={{paddingLeft:'12%',paddingRight:'12%'}}>
            <div className="container">
              <div className="row" >
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-12">
                      <h2 className="banner-text-title"> Even More Good Stuff</h2>
                      <hr className="hr-c-banner" />  <hr className="hr-c-banner2" />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <ul className="list-box">
                        <li><i className="fa fa-check-circle"></i>Professional designs with added fizz</li>
                        <li><i className="fa fa-check-circle"></i>Create an army of business stationery</li>
                        <li><i className="fa fa-check-circle"></i>Take your attention to detail up a level</li>
                        <li><i className="fa fa-check-circle"></i>Totally safe for laser printers</li>
                        <li><i className="fa fa-check-circle"></i>Take your attention to detail up a level</li>
                      </ul>

                    </div>
                  </div>


                </div>

                <div className="col-md-6">
                  <div className="">
                    <iframe width="100%" height="355" src="https://www.youtube.com/embed/RkhY58eprQg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                  </div>
                </div>
              </div>
            </div>
          </section>

    
        </div>
        <div style={{marginLeft:'11%',marginRight:'11%'}}>
        <section className="blog-section">
            <div className="container">
              <div className="row mb-4 mt-5">
                <div className="col-md-6 offset-md-3 text-center">
                  <h2 className="cat-title mb-3">Our Recent Blog</h2>
                  <p style={{fontFamily:'Poppins',fontSize:'1.2rem'}}>There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration in some form</p>

                  <hr className="hr-c" />
                </div>
              </div>
              <div className="row mt-5 mb-4">
                <div className="col-md-4 col-12">
                  <div className="card-blog radius shadowDepth1">
                    <div className="card__image border-tlr-radius">
                      <img src="https://ourwpdemo.com/printify/wp-content/uploads/2019/03/we-belive-in-1-2.jpg.webp" alt="Blog" className="border-tlr-radius" />
                    </div>

                    <div className="card__content card__padding">
                      <div className="card__share">
                        <div className="card__social">
                          <a className="share-icon facebook" href="#"><span className="fa fa-facebook"></span></a>
                          <a className="share-icon twitter" href="#"><span className="fa fa-twitter"></span></a>
                          <a className="share-icon googleplus" href="#"><span className="fa fa-google-plus"></span></a>
                        </div>

                        <a id="share" className="share-toggle share-icon" href="#"></a>
                      </div>

                      <div className="card__meta">

                        <time>17th March</time>
                      </div>

                      <article className="card__article">
                        <h2><a href="#">How I can get good plan for future for my children education?</a></h2>

                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus harum...</p>
                      </article>
                    </div>

                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="card-blog radius shadowDepth1">
                    <div className="card__image border-tlr-radius">
                      <img src="https://ourwpdemo.com/printify/wp-content/uploads/2019/03/we-belive-in-1-2.jpg.webp" alt="Blog" className="border-tlr-radius" />
                    </div>

                    <div className="card__content card__padding">
                      <div className="card__share">
                        <div className="card__social">
                          <a className="share-icon facebook" href="#"><span className="fa fa-facebook"></span></a>
                          <a className="share-icon twitter" href="#"><span className="fa fa-twitter"></span></a>
                          <a className="share-icon googleplus" href="#"><span className="fa fa-google-plus"></span></a>
                        </div>

                        <a id="share" className="share-toggle share-icon" href="#"></a>
                      </div>

                      <div className="card__meta">

                        <time>17th March</time>
                      </div>

                      <article className="card__article">
                        <h2><a href="#">How I can get good plan for future for my children education?</a></h2>

                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus harum...</p>
                      </article>
                    </div>

                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="card-blog radius shadowDepth1">
                    <div className="card__image border-tlr-radius">
                      <img src="https://ourwpdemo.com/printify/wp-content/uploads/2019/03/we-belive-in-1-2.jpg.webp" alt="Blog" className="border-tlr-radius" />
                    </div>

                    <div className="card__content card__padding">
                      <div className="card__share">
                        <div className="card__social">
                          <a className="share-icon facebook" href="#"><span className="fa fa-facebook"></span></a>
                          <a className="share-icon twitter" href="#"><span className="fa fa-twitter"></span></a>
                          <a className="share-icon googleplus" href="#"><span className="fa fa-google-plus"></span></a>
                        </div>

                        <a id="share" className="share-toggle share-icon" href="#"></a>
                      </div>

                      <div className="card__meta">

                        <time>17th March</time>
                      </div>

                      <article className="card__article">
                        <h2><a href="#">How I can get good plan for future for my children education?</a></h2>

                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus harum...</p>
                      </article>
                    </div>

                  </div>
                </div>
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
                    <select value={(selectedfinishing.id ? selectedfinishing.id : 0)}
                        onChange={e => handleFinishingChange(e.target.value)}
                        className="printddhh33d form-control ">
                        <option>Select finishing</option>
                        {
                            finishing.map(x => <option key={x.id} value={x.id}>
                                {x.name}
                            </option>)
                        }
                    </select>
                </div>
                <div className="md-check-pr md-check-h1 mt-4 pr-3">
                    <select value={(selectedfinishingEffect.id ? selectedfinishingEffect.id : 0)
                    }                        onChange={e => handleFinishingEffectChange(e.target.value)}
                        className="printddhh33d form-control ">
                        <option>Select finishing Effect</option>
                        {
                            finishingEffect.map(x => <option key={x.id} value={x.id}>
                                {x.name}
                            </option>)
                        }
                    </select>
                </div>
                <div className="md-check-pr md-check-h1 mt-4 pr-3">
                    <select value={(selectedmaterial.id ? selectedmaterial.id : 0)} 
                        onChange={e => handleMaterialChange(e.target.value)}
                        className="printddhh33d form-control ">
                        <option>Select Material</option>
                        {
                            material.map(x => <option key={x.id} value={x.id}>
                                {x.name}
                            </option>)
                        }
                    </select>
                </div>
                <div className="md-check-pr md-check-h1 mt-4 pr-3">
                    <select value={(selectedtypeOfprocessing.id ? selectedtypeOfprocessing.id : 0)} 
                        onChange={e => handleProcessingChange(e.target.value)}
                        className="printddhh33d form-control ">
                        <option>Select type of processing</option>
                        {
                            typeOfprocessing.map(x => <option key={x.id} value={x.id}>
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
            onClick={()=>setcartmsg(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={cartmsg}
           onClose={setcartmsg}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Item Added to Cart</span>}
          />
        </div>
          <Footer />
        </div>
      </>
    );
  }

