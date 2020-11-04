import React, { useState, useEffect, useRef } from 'react';
import TransformerComponent from '../components/tool/transformer';
import FunImage from '../components/tool/funImage'
import { Scrollbars } from 'react-custom-scrollbars';
import useImage from 'use-image';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import MainTool from './mainTool';
import EditorBar from '../components/tool/editorBar';
import { Stage, Layer, Group, Text, Rect, Arrow, Star, Circle, Shape, TextPath, Label, Tag } from "react-konva";
import Image from '../components/tool/UriImage';
import newId from '../utils/newId';
import ThreeD from '../components/babylonjs/models';
import MainThreeD from '../components/babylonjs/mainCom';
import { Modal, Button } from 'react-bootstrap';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { repository } from '../utils/repository'
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../redux/actionMethodes/cartActionsTypes'
import uniqeId from '../utils/newId';
import { useHistory, useLocation } from "react-router-dom";
import { BsTextCenter, BsTextLeft, BsTextRight, BsFillSquareFill, BsFillTriangleFill } from 'react-icons/bs';
import Draggable from 'react-draggable';
import { urlImg } from '../utils/baseUrl';
import URLUploadImage from '../components/tool/uploadCanvasimg';
let historyStep;
let historyPanObj = [];
let currentSelectedIndex;
let textEnb = false;



export default () => {

    const location = useLocation();


    const textAreaRef = useRef(null);
    //const selectedNodeRef = useRef(null);

    const [mainProduct, setMainProduct] = useState();
    const history = useHistory();
    const stageRef = React.useRef();
    const layerRef = React.useRef();

    const textRef = React.useRef();

    const fontsizeRef = React.useRef();
    const fontfamilyRef = React.useRef();


    const [stageSize, setStageSize] = useState({ width: 570 - 20, height: 470 - 20 });
    const [rangeValue, setRangeValue] = useState(0);
    //background Image
    // const [img] = useImage(require('../images/Plane.png'));
    const [img] = useImage(`https://devboxking.boxking.ch/laravel/system/public/dist/img/cuttings/${(location.state.product && location.state.product.uvImage ? location.state.product.uvImage : "")}`, 'Anonymous');
    const dragObject = React.useRef();
    const [selectedShapeName, setSelectedShape] = useState("");
    //objects and Images
    const [panObject, SetPanObject] = useState([]);
    const [objecDefaultColor, setobjecDefaultColor] = useState("#22194D");
    const [textDefaultColor, settextDefaultColor] = useState("#22194D");
    const [backDefaultColor, setbackDefaultColor] = useState("transparent");
    const [boxDefaultColor, setboxDefaultColor] = useState("#ffffff");
    const [imageRender, setimageRender] = useState();
    //const [renderImage,setrenderImage]=useState();
    const [fontSize, setfontSize] = useState();
    //depth height width
    //76.2 76.2 76.2
    const [fontSizescst, setfontSizescst] = useState([12, 14, 16, 18, 22, 24, 26, 30, 32, 36, 40, 45, 51, 61, 75])

    const [fontModal, setfontModal] = useState(false);



    const [scaleSize, setscaleSize] = useState({ x: 76.2, y: 76.2, z: 76.2 })
    const nodeRef = React.useRef(null);


    //product
    const [quantity, setquantity] = useState(1);
    const [checkOutModal, setcheckOutModal] = useState(false);


    //printing and types
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


    //cart handling
    const Cart = useSelector(state => state.Cart);
    const dispatch = useDispatch();


    const UVUnwrapImage = (props) => {

        // const [image] = useImage(`${process.env.PUBLIC_URL}/laravel/system/public/dist/img/cuttings/${(location.state.product && location.state.product.uvImage ? location.state.product.uvImage: "")}`);
        //    var img1 = new Image();
        //    img1.setAttribute('crossOrigin', 'anonymous');
        //    img1.src = `https://devboxking.boxking.ch/laravel/system/public/dist/img/cuttings/${(location.state.product && location.state.product.uvImage ? location.state.product.uvImage: "")}`;
        //    const [image]=useImage(require('../images/plane.png'));
        return <Image width={props.width} height={props.height} image={img} />;
    };


    const addItemTocart = () => {




        dispatch({
            type: actionTypes.addItem, payload: {
                item: {
                    id: uniqeId() + new Date(),
                    purchaseAmount: mainProduct.unitCost,
                    quantity: quantity,
                    productId: mainProduct.id,
                    product: mainProduct.title,
                    description: mainProduct.shortdescription,
                    finishing: selectedfinishing.name,
                    finishingPrice: selectedfinishing.extraamount,
                    finishingEffect: selectedfinishingEffect.name,
                    finishingEffectPrice: selectedfinishingEffect.extraamount,
                    material: selectedmaterial.name,
                    materialPrice: selectedmaterial.extraamount,
                    typeOfprocessing: selectedtypeOfprocessing.name,
                    typeOfprocessingPrice: selectedtypeOfprocessing.extraamount,
                    nonCustomize: false,
                    // printRun: '',
                    printimage: stageRef.current.toDataURL(),

                },
                printing: selectedPrinting
            }
        })
        history.push('/cart');
        //     // dispatch({
        //     type: actionTypes.addItem, payload: {
        //         item: {
        //             id: uniqeId()+new Date(),
        //             purchaseAmount: location.state.product.unitCost,
        //             quantity: quantity,
        //             productId: location.state.product.id,
        //             product: location.state.product.title,
        //             description: location.state.product.shortdescription,
        //             width: scaleSize.z + 'mm',
        //             depth: scaleSize.x + 'mm',
        //             height: scaleSize.y + 'mm',
        //             finishing: selectedfinishing,
        //             finishingEffect: selectedfinishingEffect,
        //             material: selectedmaterial,
        //             imgaefromtool: true,
        //             typeOfprocessing: selectedtypeOfprocessing,
        //             // printRun: '',
        //             nonCustomize:true,


        //             printimage: stageRef.current.toDataURL(),

        //         },
        //         printing: selectedPrinting
        //     }
        // })
        // history.push('/cart');

    }
    const handlePrintingChange = (value) => {

        let foundValue = printingCompanies.find(x => x.id == value);
        if (foundValue) {
            setSelectedPrinting(foundValue);
        }
    }
    const getPrintingCompanies = async () => {
        const { data, status } = await repository.printingCompanies().then(x => x).then(x => x);
        if (status == 200) {
            setPrintingCompanies(data);

        }

    }

    const handleFinishingChange = (value) => {
        let foundValue = finishing.find(x => x.id == value);
        if (foundValue) {
            setSelectedfinishing(foundValue);
        }
    }
    const handleFinishingEffectChange = (value) => {
        let foundValue = finishingEffect.find(x => x.id == value);
        if (foundValue) {
            setSelectedfinishingEffect(foundValue);
        }
    }
    const handleMaterialChange = (value) => {
        let foundValue = material.find(x => x.id == value);
        if (foundValue) {
            setSelectedmaterial(foundValue);
        }
    }
    const handleProcessingChange = (value) => {
        let foundValue = typeOfprocessing.find(x => x.id == value);
        if (foundValue) {
            setSelectedtypeOfprocessing(foundValue);
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
    useEffect(() => {
        const fetchAll = async () => {
            await getPrintingCompanies();
            await gettypeOfprocessing();
            await getFinishingsEffects();
            await getFinishings();
            await getMaterials();
        }
        fetchAll();

        if (location.state.product) {
            setMainProduct(location.state.product)
        }
    }, [])



    const handleUpdateImage = () => {
        //console.log(imageRef,"imggggg")
        setimageRender(stageRef.current.toDataURL());
    }
    const handleZoom = (value) => {
        setRangeValue(value);
        //10 % of 400 width=400
        //2
        let newwidth = value / 100;
        let newheight = value / 100;
        setStageSize({ width: 576 + (576 * newwidth), height: 498 + (498 * newheight) })


    }

    const handleObjectColorCange = (color) => {

        setobjecDefaultColor(color.hex);
        if (selectedShapeName != "") {

            const indexGet = panObject.findIndex(x => x.name == selectedShapeName);
            const newPanObject = [...panObject];
            if (newPanObject[indexGet] && newPanObject[indexGet].type == "shape") {
                newPanObject[indexGet].fill = color.hex;
                const npm = JSON.stringify([...newPanObject]);
                updateHistory(JSON.parse(npm));
                SetPanObject(newPanObject);

            }
        }


    }


    const handleTextColor = (color) => {

        settextDefaultColor(color.hex);
        if (selectedShapeName != "") {

            const indexGet = panObject.findIndex(x => x.name == selectedShapeName);
            const newPanObject = [...panObject];
            if (newPanObject[indexGet] && newPanObject[indexGet].type == "text") {
                newPanObject[indexGet].fill = color.hex;
                const npm = JSON.stringify([...newPanObject]);
                updateHistory(JSON.parse(npm));
                SetPanObject(newPanObject);
            }
        }




    }

    const handleFontFamily = (family) => {

        if (selectedShapeName != "") {
            const indexGet = panObject.findIndex(x => x.name == selectedShapeName);
            const newPanObject = [...panObject];
            if (newPanObject[indexGet] && newPanObject[indexGet].type == "text") {
                newPanObject[indexGet].fontFamily = family;
                SetPanObject(newPanObject);
                const npm = JSON.stringify([...newPanObject]);
                updateHistory(JSON.parse(npm));
            }
        }
    }

    const handleDragControl = () => {
        if (selectedShapeName != "") {
            const indexGet = panObject.findIndex(x => x.name == selectedShapeName);
            const newPanObject = [...panObject];
            newPanObject[indexGet].draggable = !newPanObject[indexGet].draggable;
            const npm = JSON.stringify([...newPanObject]);
            updateHistory(JSON.parse(npm));
            SetPanObject(newPanObject);


        }

    }


    const handleDelete = () => {
        if (selectedShapeName != "") {
            let newPanObject = [...panObject];
            newPanObject = newPanObject.filter(x => x.name != selectedShapeName)
            const npm = JSON.stringify([...newPanObject]);
            updateHistory(JSON.parse(npm));
            SetPanObject(newPanObject);


        }
    }

    const handleCopyLeft = () => {
        if (selectedShapeName != "") {
            const id = newId();

            const indexGet = panObject.findIndex(x => x.name == selectedShapeName);
            const newPanObject = [...panObject];
            let cloneObj = { ...newPanObject[indexGet] }
            cloneObj.id = id;

            cloneObj.name = id;
            cloneObj.x = newPanObject[indexGet].x - 10;
            cloneObj.y = newPanObject[indexGet].y - 10;
            const stringifyJson = JSON.stringify(panObject.concat(cloneObj));
            const parsJason = JSON.parse(stringifyJson);
            const parsJason1 = JSON.parse(stringifyJson);

            let JSONFinal = parsJason1;
            JSONFinal[parsJason.length - 1] = parsJason[parsJason.length - 2]
            JSONFinal[parsJason.length - 2] = parsJason[parsJason.length - 1]

            SetPanObject(JSONFinal);
            updateHistory(JSONFinal);

        }
    }

    const handleCopyRight = () => {
        if (selectedShapeName != "") {
            const id = newId();

            const indexGet = panObject.findIndex(x => x.name == selectedShapeName);
            const newPanObject = [...panObject];
            let cloneObj = { ...newPanObject[indexGet] }
            cloneObj.id = id;

            cloneObj.name = id;
            cloneObj.x = newPanObject[indexGet].x + 10;
            cloneObj.y = newPanObject[indexGet].y + 10;
            SetPanObject(panObject.concat(cloneObj));
            updateHistory([...panObject.concat({ ...cloneObj })]);

        }
    }
    /*
    const handleFontSize = (e) => 
        console.log(e)
        if (e.keyCode  == 13) {
            if (selectedShapeName != "") {
                const indexGet = panObject.findIndex(x => x.name == selectedShapeName);
                const newPanObject = [...panObject];
                if (newPanObject[indexGet] && newPanObject[indexGet].type == "text") {
                    {
                        newPanObject[indexGet].fontSize=defaultfontSize;
                    
                        SetPanObject(newPanObject);
alert();    
console.log(panObject)
                    }
                    
            }
            }
          }
    }
    //use to display current font on font size box
    
    const setFsize=(e)=>{
        setfontSize(e)
        alert(e)
    }
    */
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


    const updateFont = () => {

        if (selectedShapeName != "") {
            const indexGet = panObject.findIndex(x => x.name == selectedShapeName);
            const newPanObject = [...panObject];
            if (newPanObject[indexGet] && newPanObject[indexGet].type == "text") {
                setfontSize(newPanObject[indexGet].fontSize);

            }
        }


    }

    const handleFontSizeChange = (e) => {
        if (e.key === 'Enter') {
            if (selectedShapeName != "") {
                const indexGet = panObject.findIndex(x => x.name == selectedShapeName);
                const newPanObject = [...panObject];
                if (newPanObject[indexGet] && newPanObject[indexGet].type == "text") {
                    newPanObject[indexGet].fontSize = fontSize;
                    const npm = JSON.stringify([...newPanObject]);
                    updateHistory(JSON.parse(npm));
                    SetPanObject(newPanObject);

                }
            }
        }
    }



    const handleTextAlignhange = (e) => {

        switch (e) {
            case 'center': {

                if (selectedShapeName != "") {
                    const indexGet = panObject.findIndex(x => x.name == selectedShapeName);
                    const newPanObject = [...panObject];
                    if (newPanObject[indexGet] && newPanObject[indexGet].type == "text") {
                        newPanObject[indexGet].align = 'center';
                        const npm = JSON.stringify([...newPanObject]);
                        updateHistory(JSON.parse(npm));
                        SetPanObject(newPanObject);

                    }
                }
                break;
            }
            case 'left':
                {

                    if (selectedShapeName != "") {
                        const indexGet = panObject.findIndex(x => x.name == selectedShapeName);
                        const newPanObject = [...panObject];
                        if (newPanObject[indexGet] && newPanObject[indexGet].type == "text") {
                            newPanObject[indexGet].align = 'left';
                            const npm = JSON.stringify([...newPanObject]);
                            updateHistory(JSON.parse(npm));
                            SetPanObject(newPanObject);

                        }
                    }
                    break;
                }

            case 'right':
                {

                    if (selectedShapeName != "") {
                        const indexGet = panObject.findIndex(x => x.name == selectedShapeName);
                        const newPanObject = [...panObject];
                        if (newPanObject[indexGet] && newPanObject[indexGet].type == "text") {
                            newPanObject[indexGet].align = 'right';
                            const npm = JSON.stringify([...newPanObject]);
                            updateHistory(JSON.parse(npm));
                            SetPanObject(newPanObject);

                        }
                    }
                    break;
                }
        }
    }



    const handleBackColor = (color) => {

        setbackDefaultColor(color.hex);
        if (selectedShapeName != "") {

            const indexGet = panObject.findIndex(x => x.name == selectedShapeName);
            const newPanObject = [...panObject];
            if (newPanObject[indexGet]) {
                if (newPanObject[indexGet].type == "image") {
                    {
                        newPanObject[indexGet].fill = color.hex;
                        SetPanObject(newPanObject);
                        const npm = JSON.stringify([...newPanObject]);
                        updateHistory(JSON.parse(npm));
                    }
                }
                if (newPanObject[indexGet].type == "text") {
                    newPanObject[indexGet].background = color.hex;
                    SetPanObject(newPanObject);
                    const npm = JSON.stringify([...newPanObject]);
                    updateHistory(JSON.parse(npm));
                }
            }

        }


    }
    const handleBoxColor = (color) => {
        setboxDefaultColor(color.hex);

    }


    const handleTextDblClick = (e, obj) => {
        setfontModal(true);
        const indexGet = panObject.findIndex(x => x.name == e.target.attrs.id);
        textRef.current.innerText = panObject[indexGet].text;
        currentSelectedIndex = indexGet;
        console.log("stgref", stageRef);
        console.log("stgref", fontfamilyRef);
        console.log("stgref", fontfamilyRef);


    };


    const handleTransformEnd = () => {

        if (selectedShapeName != "") {
            const indexGet = panObject.findIndex(x => x.name == selectedShapeName);
            const newPanObject = [...panObject];
            let textx = document.createElement("span");
            document.body.appendChild(textx);
            textx.style.font = "times new roman";
            textx.style.fontSize = newPanObject[indexGet].fontSize + "px";
            textx.style.height = 'auto';
            textx.style.width = 'auto';
            textx.style.position = 'absolute';
            textx.style.whiteSpace = 'no-wrap';
            textx.style.display = 'none';
            textx.innerHTML = textRef.current.value;
            if (newPanObject[indexGet] && newPanObject[indexGet].type == "text") {

                console.log({ ...newPanObject[indexGet] });
                if (fontfamilyRef.current.value != "") {
                    newPanObject[indexGet].fontFamily = fontfamilyRef.current.value;
                }

                if (fontsizeRef.current.value != "") {
                    newPanObject[indexGet].fontFamily = parseInt(fontsizeRef.current.value);
                }


                let widthx = Math.ceil(textx.clientWidth);
                let formattedWidth = widthx;
                newPanObject[indexGet].text = textRef.current.value;
                newPanObject[indexGet].width = 1000;
                newPanObject[indexGet].height = textRef.current.clientHeight;
                SetPanObject(newPanObject);
                const npm = JSON.stringify([...newPanObject]);
                updateHistory(JSON.parse(npm));
            }
        }
        // panObject[currentSelectedIndex].text = textAreaRef.current.innerText;
        // panObject[currentSelectedIndex].width = textAreaRef.current.style.width;
        // panObject[currentSelectedIndex].visable = true;
        // textAreaRef.current.innerHtml = "";
        // textAreaRef.current.innerText = "";
        // textAreaRef.current.style.display = 'none!important';
        // textEnb = false;

    }
    const handleTextEdit = e => {
        /*
        setAvailText({
            textValue: e.target.value
        });
        */
    };
    const handleTextareaKeyDown = e => {
        if (e.keyCode === 13) {
            /*
             setAvailText({
                 textEditVisible: false
             });
             */
        }
    };
    //
    const ThreeD = React.forwardRef((_, ref) => (
        <h1 ref={ref}>Child Component</h1>
    ));


    const handleStageMouseDown = e => {

        //all objects un selected
        if (e.target === e.target.getStage()) {

            setSelectedShape("");

            return;
        }



        // clicked on transformer - do nothing
        const clickedOnTransformer =
            e.target.getParent().className === "Transformer";
        if (clickedOnTransformer) {
            return;
        }

        // find clicked rect by its name
        const name = e.target.name();
        // const rect = this.state.rectangles.find(r => r.name === name);
        if (name) {
            setSelectedShape(name);
        } else {
            setSelectedShape("");
        }
    };


    const getPanObject = (obj) => {
        if (obj) {
            switch (obj.type) {

                case 'text':
                    {

                        if (obj.src != "f4") {
                            return <Label onMouseLeave={() => updateFont()} x={obj.x}
                                y={obj.y}>
                                <Tag fill={obj.background} />
                                <Text
                                    text={obj.text}
                                    width={200}
                                    onDblClick={(e) => handleTextDblClick(e, this)}
                                    name={obj.name}
                                    id={obj.name}
                                    align={obj.align}
                                    fontFamily={obj.fontFamily}
                                    fontSize={obj.fontSize}
                                    fill={obj.fill}
                                    fontWeight={obj.fontWeight}
                                    visible={obj.visbale}
                                /></Label>
                        }
                        else {
                            return <Label onMouseLeave={() => updateFont()} x={obj.x}
                                y={obj.y} >
                                <Tag fill={obj.background} />
                                <TextPath
                                    text={obj.text}
                                    width={200}
                                    onDblClick={(e) => handleTextDblClick(e, this)}
                                    name={obj.name}
                                    id={obj.name}
                                    align={obj.align}
                                    fontFamily={obj.fontFamily}
                                    fontSize={obj.fontSize}
                                    fill={obj.fill}
                                    fontWeight={obj.fontWeight}
                                    visible={obj.visbale}
                                    data='M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97'
                                />
                            </Label>

                        }
                    }
                case 'image':
                    {
                        return <Image fill={obj.fill} name={obj.name} id={obj.name} src={obj.src} x={obj.x} y={obj.y} />
                    }
                case 'svg':
                    {
                        return <Image fill={obj.fill} width={40} height={40} name={obj.name} id={obj.name} src={obj.src} x={obj.x} y={obj.y} />
                    }
                case 'shape':
                    {

                        switch (obj.src) {
                            case 'arrow':
                                {
                                    return <Arrow

                                        name={obj.name} id={obj.name} src={obj.src} x={obj.x} y={obj.y}
                                        width={100}
                                        height={100}
                                        fill={obj.fill}
                                        shadowBlur={1}
                                        points={[0, 0, stageSize.width / 4, stageSize.height / 4]}
                                        pointerLength={20}
                                        pointerWidth={20}
                                        fill={obj.fill}
                                        stroke={obj.fill}
                                        strokeWidth={10}

                                    />
                                }
                            case 'circle':
                                {
                                    return <Circle

                                        name={obj.name} id={obj.name} src={obj.src} x={obj.x} y={obj.y}
                                        width={100}
                                        height={100}
                                        fill={obj.fill}
                                        shadowBlur={1}
                                    />
                                }
                            case 'square':
                                {
                                    return <Rect

                                        name={obj.name} id={obj.name} src={obj.src} x={obj.x} y={obj.y}
                                        width={100}
                                        height={100}
                                        fill={obj.fill}
                                        shadowBlur={1}
                                    />
                                }

                            case 'triangle':
                                {
                                    return <Shape
                                        sceneFunc={(context, shape) => {
                                            context.beginPath();
                                            context.moveTo(100, 0);
                                            context.lineTo(0, 100);
                                            context.quadraticCurveTo(0, 0, 0, 0);
                                            context.closePath();
                                            // (!) Konva specific method, it is very important
                                            context.fillStrokeShape(shape);
                                        }}
                                        name={obj.name} id={obj.name} src={obj.src} x={obj.x} y={obj.y}
                                        width={100}
                                        height={100}
                                        fill={obj.fill}
                                        shadowBlur={1} />
                                }

                            case 'star':
                                {
                                    return <Star

                                        name={obj.name} id={obj.name} src={obj.src} x={obj.x} y={obj.y}
                                        width={100}
                                        height={100}
                                        fill={obj.fill}
                                        shadowBlur={1}
                                        innerRadius={20}
                                        outerRadius={40}
                                        numPoints={5}

                                    />
                                }

                        }

                    }
            }
        }
        return null;
    }

    const handleUndo = () => {


        if (historyStep != undefined) {
            if (historyStep == 0) {
                const oldPanhistoryObj = historyPanObj[historyStep];
                SetPanObject([]);

                historyStep = undefined;
            }
            else {
                historyStep -= 1;
                const oldPanhistoryObj = historyPanObj[historyStep];
                if (oldPanhistoryObj) {
                    SetPanObject(oldPanhistoryObj);


                }
                else {
                    historyStep += 1;
                }
            }
        }
    }
    const handleRedo = () => {

        if (historyStep != undefined) {
            historyStep += 1;
            const hstObj = historyPanObj[historyStep];
            if (hstObj) {
                SetPanObject(hstObj);
            }
            else {
                historyStep -= 1;
            }


        }
        else {

            const checkAvailable = historyPanObj[0];
            if (checkAvailable) {
                historyStep = 0;
                SetPanObject(historyPanObj[historyStep]);
            }
        }
    }

    const handleDragEnd = (e) => {


    }

    const updateHistory = (historyObj) => {
        historyPanObj.push(historyObj);
        console.log(historyPanObj);
        if (historyStep == undefined) {
            historyStep = 0;
        }
        else {
            historyStep += 1;
        }

    }

    return <div className="tool-back">
        <div className="toolNav">
            <img onClick={() => history.push('./')} style={{
                width: 196,
                height: 62,
                cursor: 'pointer'
            }} src={require('../images/logo.png')} />
        </div>
        <EditorBar handleCopyLeft={handleCopyLeft} handleCopyRight={handleCopyRight} handleDelete={handleDelete} handleDragControl={handleDragControl} handleUndo={handleUndo} handleRedo={handleRedo} />

        <div className="row mt-5">
            <div className="col-md-4">
                <div style={{ marginLeft: '10%' }}>
                    <MainTool selectedPrinting={selectedPrinting} addItemTocart={addItemTocart} quantity={quantity} handlePrintingChange={handlePrintingChange} printingCompanies={printingCompanies} selectedfinishing={selectedfinishing} handleFinishingChange={handleFinishingChange} finishing={finishing} selectedfinishingEffect={selectedfinishingEffect} finishingEffect={finishingEffect} handleFinishingEffectChange={handleFinishingEffectChange}
                        selectedmaterial={selectedmaterial} handleQuanity={handleQuanity} handleMaterialChange={handleMaterialChange} material={material} handleProcessingChange={handleProcessingChange} selectedtypeOfprocessing={selectedtypeOfprocessing} typeOfprocessing={typeOfprocessing} handleTextAlignhange={handleTextAlignhange} setfontSize={setfontSize} fontSize={fontSize} handleFontSizeChange={handleFontSizeChange} handleFontFamily={handleFontFamily} dragObj={dragObject} scaleSize={scaleSize} setscaleSize={setscaleSize} boxColorChange={handleBoxColor} boxDefaultColor={boxDefaultColor} textColorChange={handleTextColor} backColor={backDefaultColor} backColorChange={handleBackColor} textColor={textDefaultColor} objectColorChange={handleObjectColorCange} objectColor={objecDefaultColor} />
                </div>

            </div>
            <div className="col-md-5">
                <div style={{ marginLeft: -50 }}>
                    <div className="row"  >
                        <div>

                            <div onDrop={e => {

                                stageRef.current.setPointersPositions(e);
                                // add image
                                if (dragObject.current.type == "image") {

                                    let id = newId();
                                    let objNew = {
                                        ...stageRef.current.getPointerPosition(),
                                        src: dragObject.current.src,
                                        type: 'image',
                                        name: id,
                                        fill: 'transparent',
                                        historyObjType: "panObject",
                                        draggable: true,
                                    };
                                    SetPanObject(panObject.concat(objNew));
                                    updateHistory([...panObject.concat({ ...objNew })]);


                                }
                                else if (dragObject.current.type == "shape") {
                                    let id = newId();
                                    let objNew = {
                                        ...stageRef.current.getPointerPosition(),
                                        src: dragObject.current.src,
                                        type: 'shape',
                                        name: id,
                                        fill: objecDefaultColor,
                                        historyObjType: "panObject",
                                        draggable: true,
                                    };

                                    SetPanObject(panObject.concat(objNew));
                                    updateHistory([...panObject.concat({ ...objNew })]);

                                }
                                else if (dragObject.current.type == "text") {
                                    switch (dragObject.current.src) {

                                        case "f1":
                                            {

                                                let id = newId();
                                                let objNew = {
                                                    ...stageRef.current.getPointerPosition(),
                                                    src: dragObject.current.src,
                                                    text: 'Drag to amend text',
                                                    name: id,
                                                    type: 'text',
                                                    align: 'center',
                                                    fontFamily: 'Arizonia',
                                                    fontSize: 30,
                                                    fill: 'black',
                                                    fontWeight: 'bold',
                                                    background: 'transparent',
                                                    historyObjType: "panObject",
                                                    visbale: true,
                                                    draggable: true,

                                                };
                                                SetPanObject(panObject.concat(objNew));
                                                updateHistory([...panObject.concat({ ...objNew })]);

                                                break;
                                            }
                                        case "f2":
                                            {
                                                let id = newId();
                                                let objNew = {
                                                    ...stageRef.current.getPointerPosition(),
                                                    src: dragObject.current.src,
                                                    text: 'Drag to amend text',
                                                    name: newId(),
                                                    type: 'text',
                                                    align: 'center',
                                                    fontFamily: 'Acme',
                                                    fontSize: 25,
                                                    fill: 'black',
                                                    fontWeight: 'bold',
                                                    background: 'transparent',
                                                    historyObjType: "panObject",
                                                    draggable: true,
                                                    visbale: true,

                                                };
                                                SetPanObject(panObject.concat(objNew));
                                                updateHistory([...panObject.concat({ ...objNew })]);
                                                break;
                                            }

                                        case "f3":
                                            {
                                                let id = newId();
                                                let objNew = {
                                                    ...stageRef.current.getPointerPosition(),
                                                    src: dragObject.current.src,
                                                    text: 'Drag to amend text',
                                                    name: newId(),
                                                    type: 'text',
                                                    align: 'center',
                                                    fontFamily: 'Marmelad',
                                                    fontSize: 20,
                                                    fill: 'black',
                                                    fontWeight: 'bold',
                                                    background: 'transparent',
                                                    historyObjType: "panObject",
                                                    visbale: true,
                                                    draggable: true,

                                                };
                                                SetPanObject(panObject.concat(objNew));
                                                updateHistory([...panObject.concat({ ...objNew })]);
                                                break;
                                            }
                                        case "f4":
                                            {
                                                let id = newId();
                                                let objNew = {
                                                    ...stageRef.current.getPointerPosition(),
                                                    src: dragObject.current.src,
                                                    text: 'Drag to amend text',
                                                    name: newId(),
                                                    type: 'text',
                                                    align: 'center',
                                                    fontFamily: 'Acme',
                                                    fontSize: 25,
                                                    fill: 'black',
                                                    fontWeight: 'bold',
                                                    background: 'transparent',
                                                    historyObjType: "panObject",
                                                    visbale: true,
                                                    draggable: true,


                                                };
                                                SetPanObject(panObject.concat(objNew));
                                                updateHistory([...panObject.concat({ ...objNew })]);
                                                break;
                                            }
                                    }
                                }
                                if (dragObject.current.type == "svg") {
                                    let id = newId();
                                    let objNew = {
                                        ...stageRef.current.getPointerPosition(),
                                        src: dragObject.current.src,
                                        type: 'svg',
                                        name: newId(),
                                        fill: 'transparent',
                                        historyObjType: "panObject",
                                        draggable: true,

                                    };
                                    SetPanObject(panObject.concat(objNew));
                                    updateHistory([...panObject.concat({ ...objNew })]);

                                }
                            }}
                                onDragOver={e => e.preventDefault()}
                                style={{ backgroundColor: '#d6d6d6' }}>
                                <Scrollbars
                                    style={{ width: 608, height: 505 }}>
                                    <div className="canvas-line12312s">
                                        <p className="sdasd3-3423ds">124mm</p>
                                    </div>
                                    <div className="canvas-line12312s1">
                                        <p className="sdasd3-3423ds1">124mm</p>
                                    </div>
                                    <Stage width={stageSize.width}
                                        height={stageSize.height}
                                        style={{ marginLeft: 32 }}
                                        ref={stageRef}
                                        onMouseDown={handleStageMouseDown}
                                    >
                                        <Layer style={{ position: 'absolute', zIndex: -100 }}>

                                            <Rect width={stageSize.width} height={stageSize.height}
                                                fill={boxDefaultColor} />
                                        </Layer>
                                        <Layer style={{ position: 'absolute', zIndex: -100 }}>
                                            <UVUnwrapImage width={stageSize.width} height={stageSize.height} />

                                        </Layer>

                                        <Layer ref={layerRef} >




                                            {
                                                panObject.map(x => <Group key={x.name} draggable={(x.draggable == true ? true : false)} onDragEnd={handleDragEnd}>{getPanObject(x)}</Group>)
                                            }
                                            <TransformerComponent

                                                selectedShapeName={selectedShapeName} updateImage={handleUpdateImage}
                                            />
                                        </Layer>


                                    </Stage>
                                    <textarea ref={textAreaRef} style={{ display: 'none', position: 'absolute' }} >

                                    </textarea>
                                </Scrollbars>
                                {/*  */}

                            </div>

                        </div>
                    </div>

                </div>

                <div className="csdkfl3j49usua">
                    <div className="csdkfl3j49usua213d">
                        <div className="bloc23jo234">
                            <button className="btn bgwhistrwe4">
                                <img className="imdsfghewwj34" src={require('../images/dspbx.png')}/>
                                <p className="s3utw3teawd6">Front</p>
                            </button>
                            <button className="btn bgwhistrwe4">
                                <img className="imdsfghewwj34" src={require('../images/dspbx.png')}/>
                                <p className="s3utw3teawd6">Back</p>
                            </button>
                        </div>
                        <div className="bloc23jo234"></div>
                    </div>
                    <div className="">
                       <div className="sdf943u2324sczxc33">
                       <InputRange
                            step={10}
                            maxValue={100}
                            minValue={0}
                            value={rangeValue}
                            onChange={value => handleZoom(value)}
                            
                        />
                       </div>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                {
                    <Draggable nodeRef={nodeRef}>
                        <div ref={nodeRef}>
                            <MainThreeD
                                ref={layerRef.current}
                                width={stageSize.width}
                                fillColor={boxDefaultColor}
                                height={stageSize.height}
                                model={location.state.product && location.state.product.modelPath ? location.state.product.modelPath : ""} setcheckOutModal={setcheckOutModal} scaleSize={scaleSize} imageRender={imageRender} boxDefaultColor={boxDefaultColor} />

                        </div>

                    </Draggable>
                }

            </div>
        </div>
        <div className="row">

        </div>
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

                </div>  </Modal.Body>

        </Modal>

        <Modal onHide={() => setfontModal(false)}
            centered show={fontModal}>
            <Modal.Header closeButton>
                <Modal.Title>Customize Font</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Text</p>
                <textarea className="form-control" ref={textRef}></textarea>
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                    <p style={{ marginTop: 15 }}>Font Family:</p>
                    <select ref={fontfamilyRef} style={{
                        marginTop: 10, marginRight: 10,
                        marginLeft: 10,
                        width: 203
                    }} className="form-control" >
                        <option value="">Select Font family</option>
                        <option value="Arizonia">Arizonia</option>
                        <option value="Marmelad">Marmelad</option>
                        <option value="Kosugi">Kosugi</option>
                        <option value="Acme">Acme</option>
                        <option value="Allan">Allan</option>
                    </select>
                    <p style={{ marginTop: 15 }}>Font Size:</p>
                    <select style={{
                        marginTop: 10, marginRight: 10,
                        marginLeft: 10,
                        width: 80
                    }} className="form-control" ref={fontsizeRef} >
                        <option value="">Select Font Size</option>

                        {
                            fontSizescst.map(x => <option key={x} value={x}>{x + "px"}</option>)
                        }
                    </select>
                </div>
                <div>
                    <p>Justify Text</p>
                    <div className="colorPickhead  size-editor" >
                        <button className="btn" ><BsTextLeft /></button>
                        <button className="btn"  ><BsTextCenter /></button>
                        <button className="btn" ><BsTextRight /></button>

                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button className="btn btn-success p-3 m-2" style={{ width: 140 }}>Cancel</button>
                    <button className="btn btn-primary p-3 m-2" onClick={() => handleTransformEnd()} style={{ width: 140 }}>Confirm</button>
                </div>
            </Modal.Footer>
        </Modal>

    </div>
}