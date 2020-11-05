import React, { useState, useEffect } from "react";
import Navbar from '../components/navbar';
import Strip from '../components/strip';
import { useLocation } from "react-router-dom";
import Footer from '../components/home/footer';
import { urlImg } from '../utils/baseUrl';
import MainThreeD from '../components/babylonjs/mainCom';
import { Modal, Button, Accordion, Card } from 'react-bootstrap';
import Draggable from 'react-draggable';
import { useHistory } from 'react-router-dom';
import { repository } from '../utils/repository';
import { FiPlus, FiMinus } from 'react-icons/fi';
import uniqeId from '../utils/newId';
import actionTypes from '../../redux/actionMethodes/cartActionsTypes';
import { useDispatch, useSelector } from 'react-redux';
import {VscSymbolColor} from 'react-icons/vsc';
import {ImDownload} from 'react-icons/im';
import Snackbar from '@material-ui/core/Snackbar';

import {FaAdobe} from 'react-icons/fa';
import _ from 'lodash';

export default () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const [cartmsg,setcartmsg]=useState(false);

    const [product, setProduct] = React.useState(null);
    const [width, setwidth] = React.useState(null);
    const [height, setheight] = React.useState(null);
    const [depth, setdepth] = React.useState(null);
    const [checkOutModal, setcheckOutModal] = React.useState(false);
    const [checkOutModal1, setcheckOutModal1] = React.useState(false);

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
    const [subTotal,setSubTotal]=useState(parseFloat((location.state.product&&location.state.product.unitCost?location.state.product.unitCost:0)));
    const [quantity, setquantity] = useState(1);
    
    const nodeRef = React.useRef(null);
    React.useEffect(() => {
        
        if (location.state.product) {
            setProduct(location.state.product)
            setwidth(location.state.product.minimumWidth);
            setheight(location.state.product.minimumHeight);
            setdepth(location.state.product.minimumDepth);
        }


    }, []);


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

    const handleFinishingChange = (value) => {
        let foundValue = finishing.find(x => x.id == value);
        if (foundValue) {
            setSelectedfinishing(foundValue);
            setSubTotal(parseFloat(subTotal)+parseFloat(foundValue.extraamount))
        }
    }
    const handleFinishingEffectChange = (value) => {
        let foundValue = finishingEffect.find(x => x.id == value);
        if (foundValue) {
            setSelectedfinishingEffect(foundValue);
            setSubTotal(parseFloat(subTotal)+parseFloat(foundValue.extraamount))
        }
    }
    const handleMaterialChange = (value) => {
        let foundValue = material.find(x => x.id == value);
        if (foundValue) {
            setSelectedmaterial(foundValue);            setSubTotal(parseFloat(subTotal)+parseFloat(foundValue.extraamount))
        }
    }
    const handleProcessingChange = (value) => {
        let foundValue = typeOfprocessing.find(x => x.id == value);
        if (foundValue) {
            setSelectedtypeOfprocessing(foundValue);            setSubTotal(parseFloat(subTotal)+parseFloat(foundValue.extraamount))
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
    const addItemTocart = () => {


        let obj = product;
        if (product != null) {



            dispatch({
                type: actionTypes.addItem, payload: {
                    item: {
                        id: uniqeId() + new Date(),
                        purchaseAmount: obj.unitCost,
                        quantity: quantity,
                        productId: obj.id,
                        product: obj.title,
                        description: obj.shortdescription,
                        finishing: selectedfinishing.name,
                        finishingPrice: selectedfinishingEffect.extraamount,
                        finishingEffect: selectedfinishingEffect.name,
                        finishingEffectPrice: selectedfinishingEffect.extraamount,
                        material: selectedmaterial.name,
                        materialPrice: selectedfinishingEffect.extraamount,
                        typeOfprocessing: selectedtypeOfprocessing.name,
                        typeOfprocessingPrice: selectedfinishingEffect.extraamount,
                        nonCustomize: false,
                        // printRun: '',
                        printimage: urlImg + 'system/public/dist/img/upload/' + obj.image,

                    },
                    printing: selectedPrinting
                }
            })
            setcartmsg(false);

        }
        setcheckOutModal(false);

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


    }, []);

    return <>
        <Strip />
        <Navbar />
        <section class="lorem-section">
            <div class="container mt-4 mb-5">
                <div class="row">

                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="card product-cont">
                                    <div class="card-header p-4">
                                        <h4 >{(product != null ? product.title : "")}</h4>
                                        <p class="am-self-pera fntfamlyy-popins">{(product != null ? product.shortdescription : "")}</p>
                                    </div>
                                    <div class="card-body">
                                        <div style={{ marginLeft: '3.8%' }}>
                                            <div class="row">
                                                <div class="col-md-12 text-center">
                                                    <div class="product-img-detail">

                                                        <img class="card-img img-responsive" src={`${urlImg}system/public/dist/img/upload/${(product != null ? product.image : "")}`} alt="Vans" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-12" style={{ padding: 0 }}>
                                                    <span class="pac-type">Packaging Description</span>
                                                </div>
                                            </div>
                                            <div class="row mb-5">

                                                <div dangerouslySetInnerHTML={{ __html: (product != null ? product.longdescription : "") }} >
                                                </div>
                                            </div>

                                        </div>
                                        <div class="row mt-2 mb-4">
                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-md-5">
                                                        <label class="am-label-color fntfamlyy-popins">Inner Dimension Width (W)</label>
                                                    </div>
                                                    <div class="col-md-7">
                                                        <div class="input-group">
                                                            <input type="text" class="form-control" value={width} onChange={(e) => setwidth(e.currentTarget.value)} placeholder="153" aria-label="Recipient's username" aria-describedby="#basic-addon21" />
                                                            <div class="input-group-append">
                                                                <span class="input-group-text" id="#basic-addon21">{(product != null ? product.minimumWidth : "0")}mm</span>
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-12 mt-2">
                                                <div class="row">
                                                    <div class="col-md-5">
                                                        <label class="am-label-color fntfamlyy-popins">Inner Depth (D)</label>
                                                    </div>
                                                    <div class="col-md-7">
                                                        <div class="input-group">
                                                            <input type="text" class="form-control" value={depth} onChange={(e) => setdepth(e.currentTarget.value)} placeholder="153" aria-label="Recipient's username" aria-describedby="#basic-addon21" />
                                                            <div class="input-group-append">
                                                                <span class="input-group-text" id="#basic-addon21">{(product != null ? product.minimumDepth : "0")}mm</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-12 mt-2">
                                                <div class="row">
                                                    <div class="col-md-5">
                                                        <label class="am-label-color fntfamlyy-popins">Inner Dimension Height (H)</label>
                                                    </div>
                                                    <div class="col-md-7">
                                                        <div class="input-group">
                                                            <input type="text" class="form-control" placeholder="35" value={height} onChange={(e) => setheight(e.currentTarget.value)} aria-label="Recipient's username" aria-describedby="#basic-addon21" />
                                                            <div class="input-group-append">
                                                                <span class="input-group-text" id="#basic-addon21">{(product != null ? product.minimumHeight : "0")}mm</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-12 mt-3 text-right">
                                                <button type="button" class="btn change-btn pl-4 pr-4" style={{ margin: 17 }}>Refresh</button>
                                            </div>
                                        </div>
                                        <div class="col-md-12 mt-2">
                                            <div class="row">
                                                <div class="col-md-5">
                                                    <label class="am-label-color fntfamlyy-popins">Print run</label>
                                                </div>
                                                <div class="col-md-7">
                                                    <div className="md-check-pr px-2">

                                                        <div className=" printddhh33d assaasf33d" >
                                                        <div className="">
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
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12 mt-2">
                                            <div class="row">
                                                <div class="col-md-5">
                                                    <label class="am-label-color fntfamlyy-popins">Printing Company</label>
                                                </div>
                                                <div class="col-md-7">
                                                    <div className="assaasf33d md-check-pr">
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
                                                </div>
                                            </div>
                                        </div>


                                        <div class="col-md-12 mt-2">
                                            <div class="row">
                                                <div class="col-md-5">
                                                    <label class="am-label-color fntfamlyy-popins">Fininshing</label>
                                                </div>
                                                <div class="col-md-7">
                                                    <div className="assaasf33d md-check-pr">
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
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-12 mt-2">
                                            <div class="row">
                                                <div class="col-md-5">
                                                    <label class="am-label-color fntfamlyy-popins">Finishing Effect</label>
                                                </div>
                                                <div class="col-md-7">
                                                    <div className="assaasf33d md-check-pr">
                                                        <select value={(selectedfinishingEffect.id ? selectedfinishingEffect.id : 0)
                                                        } onChange={e => handleFinishingEffectChange(e.target.value)}
                                                            className="printddhh33d form-control ">
                                                            <option>Select finishing Effect</option>
                                                            {
                                                                finishingEffect.map(x => <option key={x.id} value={x.id}>
                                                                    {x.name}
                                                                </option>)
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12 mt-2">
                                            <div class="row">
                                                <div class="col-md-5">
                                                    <label class="am-label-color fntfamlyy-popins">Material</label>
                                                </div>
                                                <div class="col-md-7">
                                                    <div className="assaasf33d md-check-pr">
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
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12 mt-2">
                                            <div class="row">
                                                <div class="col-md-5">
                                                    <label class="am-label-color fntfamlyy-popins">Type of processing</label>
                                                </div>
                                                <div class="col-md-7">
                                                    <div className="assaasf33d md-check-pr">
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
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        (product != null && product.hasModel == 1 ? <div class="col-md-4">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="card shadow-none">
                                        <div class="card-header bg-white am-Product-Preview">
                                            <h5>Product Preview and Offer</h5>
                                        </div>
                                        <div class="card-body font-16px">
                                            <div class="row">
                                                <div class="col-md-12 text-center">

                                                    <img src={`${urlImg}system/public/dist/img/cuttings/${(product != null ? product.uvImage : "")}`} class="two-d-img" width="100%" />
                                                    <button class="btn btn-theme-circle myRotateBtn"> <img src={require('../images/rotation.png')} onClick={() => setcheckOutModal1(true)} class="three-d-img" /> </button>
                                                </div>
                                            </div>
                                            <div class="row mt-5">
                                                <div class="col-md-12 fsdlkekss">
                                                    <small><b>Your price net</b></small>
                                                    <small class="pull-right"><b>${(product != null ? product.unitCost : "")}</b></small>
                                                </div>
                                            </div>
                                            <div class="row mt-1">
                                                <div class="col-md-12 fsdlkekss">
                                                    <small>Finishing</small>
                                                    <small class="pull-right pl-2">${(_.isEmpty(selectedfinishing) ?0: selectedfinishing.extraamount)}</small>
                                                </div>
                                            </div>
                                            <div class="row mt-1">
                                                <div class="col-md-12 fsdlkekss">
                                                    <small>Finishing Effect</small>
                                                    <small class="pull-right pl-2">${(_.isEmpty(selectedfinishingEffect) ?0: selectedfinishingEffect.extraamount)}</small>
                                                </div>
                                            </div>
                                            <div class="row mt-1">
                                                <div class="col-md-12 fsdlkekss">
                                                    <small>Material</small>
                                                    <small class="pull-right pl-2">${(_.isEmpty(selectedmaterial) ?0: selectedmaterial.extraamount)}</small>
                                                </div>
                                            </div>
                                            <div class="row mt-1">
                                                <div class="col-md-12 fsdlkekss">
                                                    <small>Processing</small>
                                                    <small class="pull-right pl-2">${(_.isEmpty(selectedtypeOfprocessing) ?0: selectedtypeOfprocessing.extraamount)}</small>
                                                </div>
                                            </div>
                                            <div class="row mt-1">
                                                <div class="col-md-12 fsdlkekss">
                                                    <small><b>Your price gross</b></small>
                    <small class="pull-right"><b class="theme-text f-20">$ {parseFloat(subTotal).toFixed(2)}</b></small>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <small class="xs-text">Incl. printing, further processing, delivery and statutory VAT.</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div class="row mb-2 mt-2">
                                <div class="col-md-6">
                                    <button class="btn btn-block change-btn" onClick={() => {
                                         setcheckOutModal(true)

                                    }}>Add to Cart </button>
                                </div>
                                <div class="col-md-6">
                                    <button class="btn btn-block change-btn" onClick={() => {
                                        const newProduct = { ...product };
                                        newProduct.minimumDepth = depth;
                                        newProduct.minimumWidth = width;
                                        newProduct.minimumHeight = height;
                                        history.push("/tool", { product: newProduct })
                                    }}>Purchase &amp; Design </button>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <Accordion defaultActiveKey="0">
                                    <Card className="csdrhsdf">
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} onClick={() => {
                                        const newProduct = { ...product };
                                        newProduct.minimumDepth = depth;
                                        newProduct.minimumWidth = width;
                                        newProduct.minimumHeight = height;
                                        history.push("/tool", { product: newProduct })
                                    }} variant="link" >
                                             <VscSymbolColor style={{fontSize:24,color:'white'}} />   Design Online
      </Accordion.Toggle>
                                        </Card.Header>
                                       
                                    </Card>
                                    <Card className="csdrhsdf">
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                            <ImDownload style={{fontSize:24,color:'white'}} />  Continue with own template
      </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="1">
                                            <Card.Body>
                                            <div>
                                                <a style={{fontSize:16}}><FaAdobe/> Download Print Templates</a>
                                                
                                            </div>
                                            <div>
                                            <a style={{fontSize:16}}><FaAdobe/> Data Sheet</a>
                                            </div>
                                            <div>
                                            <a style={{fontSize:16}}><FaAdobe/> Finishing Data Sheet</a>

</div>
                                            <button  class="btn btn-block change-btn1"  onClick={() =>  setcheckOutModal(true)}>Add to Basket </button>
                
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>

                            </div>
                            {/* <div class="row">
                                <div class="col-md-12">
                                    <button class="btn btn-block btn-design"> <img src="images/palette.png" class="icon-p-d" /> &nbsp;Design Online <i class="fa fa-angle-right pull-right"></i> </button>
                                </div>
                            </div>

                            <div class="row mt-11">
                                <div class="col-md-12">
                                    <button class="btn btn-block btn-design"> <img src="images/file.png" class="icon-p-d" /> &nbsp;Continue with own template <i class="fa fa-angle-right pull-right"></i> </button>
                                </div>
                            </div> */}

                        </div>
                            : <></>)

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
        <Footer className="mt-5" />
        <div >
            <Modal id="msdhsdh" onHide={() => setcheckOutModal1(false)}
                centered show={checkOutModal1}>
                <Draggable nodeRef={nodeRef} >
                    <div style={{ marginLeft: '18%' }} ref={nodeRef}> <MainThreeD model={product != null ? product.modelPath : ""} scaleSize={{ x: width, y: depth, z: height }} boxDefaultColor="#ffffff" />
                    </div>
                </Draggable>

                {/* setcheckOutModal={setcheckOutModal}
            ref={stageRef.current} ref={stageRef.current}
            imageRender={imageRender} */}

            </Modal>

        </div>

    </>
}