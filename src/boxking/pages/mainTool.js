import React, { Component, useState } from 'react';
import { render } from 'react-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import 'react-web-tabs/dist/react-web-tabs.css';
import { CirclePicker, SketchPicker, ChromePicker, BlockPicker } from 'react-color';
import { BsTextCenter, BsTextLeft, BsTextRight, BsFillSquareFill, BsFillTriangleFill } from 'react-icons/bs';
import { AiTwotoneStar } from 'react-icons/ai';//star
import { GiPlainCircle } from 'react-icons/gi';//circle
import { FiArrowUpRight } from 'react-icons/fi';//arrow
import ImageUploader from '../components/tool/imageUpload';

import Scrollbars from 'react-custom-scrollbars'
import InputRange from 'react-input-range';
import { Accordion, Card, Button } from 'react-bootstrap'
import { FiPlus, FiMinus } from 'react-icons/fi';

export default ({quantity,selectedPrinting,handlePrintingChange,printingCompanies,selectedfinishing,handleFinishingChange,finishing,addItemTocart,selectedfinishingEffect,finishingEffect,handleFinishingEffectChange,selectedmaterial  ,handleMaterialChange ,material ,handleProcessingChange ,selectedtypeOfprocessing ,typeOfprocessing,handleQuanity,handleTextAlignhange,fontSize,setfontSize,handleFontFamily,handleFontSizeChange,setscaleSize,scaleSize, dragObj, objectColorChange, objectColor, textColorChange, textColor, backColorChange, backColor,boxDefaultColor ,boxColorChange}) => {
  //const [defaultfontSize,setfontSize]=useState();
  const [imagesU, setImagesU] = useState([]);
  const [SVGicons,setSVGIcons]=useState([{id:1,name:'Social Circle Icons',iconFolder:'social',icons:["badoo","behance","deviantart","dribbble","facebook","flickr","google-plus","instagram","lastfm","linkedin","pinterest","soundcloud","swarm","tumblr","twitter","vk"]},{id:2,name:'Social Square Icons',iconFolder:'socialSquare',icons:["badoo","bebo","behance","blogger","deviantart","digg","disqus","dribbble","facebook","flickr","forrst","google-plus","instagram","line","linkedin","myspace","pinterest","plurk","rss","skype","telegram","tumblr","twitter","viber","vimeo","vine","vk","whatsapp","xing","youtube"]},{id:3,name:'Flags Icons',iconFolder:'flags',icons:["germany","japan","pakistan","turkey","united-arab-emirates","united-kingdom","united-nations","united-states"]}]);

  
  return (
    <Tabs defaultTab="vertical-tab-one" vertical defaultTab="vt1">
      <TabList>
        <Tab tabFor="vt1"><img src={require('../images/tools/tabsImages/01.png')} className="img-tl" /></Tab>
        <Tab tabFor="vt2"><img src={require('../images/tools/tabsImages/02.png')} className="img-tl" /></Tab>
        <Tab tabFor="vt3"><img src={require('../images/tools/tabsImages/03.png')} className="img-tl" /></Tab>
        <Tab tabFor="vt4"><img src={require('../images/tools/tabsImages/04.png')} className="img-tl" /></Tab>
        <Tab tabFor="vt5"><img src={require('../images/tools/tabsImages/05.png')} className="img-tl" /></Tab>
        <Tab tabFor="vt6"><img src={require('../images/tools/tabsImages/06.png')} className="img-tl" /></Tab>
      </TabList>
      <TabPanel tabId="vt1" className="pb-4">
        <div className="dpt-headBox">
          <p className="dpt-headtext"> 3D Packaging Tool </p>
        </div>
        <div className="editor-pan-pabel" style={{maxWidth: 294}}>
          <div className="colorPickBox">
            <p className="colorPickhead">Product Colour</p>
            <CirclePicker colors={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#ffffff", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"]} color={boxDefaultColor}
            onChangeComplete={e => boxColorChange(e)} />
          </div>
          <div className="dd-box">
            <DropdownButton id="example-month-input-2" title="Choose Size">
              <Dropdown.Item onClick={() => alert()}></Dropdown.Item>
              <Dropdown.Item onClick={() => alert()}></Dropdown.Item>
              <Dropdown.Item onClick={() => alert()}></Dropdown.Item>
            </DropdownButton>
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
            
                {/* <div className="md-check-pr md-check-h1 mt-4 pr-3">
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
                </div> */}

                {/* <div className="scyuyu44brn">
                    <p>We’ve lots or printing partners all over the switzerland. Find the very nearest</p>
                </div> */}
                <div className="md-check-pr md-check-h1 mt-4 pr-3">
                    <select 
                    // value={(selectedfinishing.id ? selectedfinishing.id : 0)}
                        // onChange={e => handleFinishingChange(e.target.value)}
                         className="printddhh33d form-control ">
                        <option>Delivery Term</option>
                        {/* {
                            finishing.map(x => <option key={x.id} value={x.id}>
                                {x.name}
                            </option>)
                        } */}
                    </select>
                </div>
                <div className="md-check-pr md-check-h1 mt-4 pr-3">
                    <select 
                    // value={(selectedfinishing.id ? selectedfinishing.id : 0)}
                        // onChange={e => handleFinishingChange(e.target.value)}
                         className="printddhh33d form-control ">
                        <option>Quantity</option>
                        {/* {
                            finishing.map(x => <option key={x.id} value={x.id}>
                                {x.name}
                            </option>)
                        } */}
                    </select>
                </div>
                <div className="md-check-pr md-check-h1 mt-4 pr-3">
                    <input className="printddhh33d form-control"/>
                    
                        

                </div>
                <div className="md-check-pr mt-2" >
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
                <div className="mdl-btm-23" >
                    <button className="btn mdl-btm-chk-btn" onClick={() =>{}} >Save</button>

                </div> 
                <div className="mdl-btm-23" >
                    <button className="btn mdl-btm-chk-btn" onClick={() => addItemTocart()} >Confirm and proceed to cart</button>

                </div>  
                 
          {/* <div>
            <p className="colorPickhead ">Adjust Sizes</p>
            <div className="colorPickhead  size-editor" >
              <p>Depth</p>
              <p>{scaleSize.x}mm</p>
            </div>
            <div className="">
              <InputRange
                step={1}
                maxValue={300}
                disabledInputRange={true}
                minValue={25.4}
                value={scaleSize.x}

                onChange={value => setscaleSize({x:value,y:scaleSize.y,z:scaleSize.z})}
              />
            </div>

            <div className="colorPickhead  size-editor" >
              <p>Height</p>
              <p>{scaleSize.y}mm</p>
            </div>
            <div className="">
              <InputRange
                step={1}
                maxValue={300}
                disabledInputRange={true}
                minValue={25.4}
                value={scaleSize.y}

                onChange={value => setscaleSize({x:scaleSize.x,y:value,z:scaleSize.z})}
              />
            </div>

            <div className="colorPickhead  size-editor" >
              <p>Width</p>
              <p>{scaleSize.z}mm</p>
            </div>
            <div className="">
              <InputRange
                step={1}
                maxValue={300}
                disabledInputRange={true}
                minValue={25.4}
                value={scaleSize.z}

                onChange={value => setscaleSize({x:scaleSize.x,y:scaleSize.y,z:value})}
              />
            </div>


          </div> */}
        </div>

      </TabPanel>
      <TabPanel tabId="vt2">
        <div className="dpt-headBox" style={{ width: 252 }}>

          <p className="dpt-headtext"> 3D Packaging Tool </p>
        </div>
        <Scrollbars
          style={{ height: 498 }}>
          <div className="editor-pan-pabel">

            <div className="colorPickBox">
              <p className="colorPickhead">Fonts</p>

              <img onDragStart={e => {
                dragObj.current = { type: 'text', src: 'f1' };

              }} src={require('../images/text/tx-1.png')} style={{ width: '100%' }} />

              <img onDragStart={e => {
                dragObj.current = { type: 'text', src: 'f2' };

              }} src={require('../images/text/tx-2.png')} style={{ width: '100%' }} />
              <img onDragStart={e => {
                dragObj.current = { type: 'text', src: 'f3' };

              }} src={require('../images/text/tx-3.png')} style={{ width: '100%' }} />
              <img onDragStart={e => {
                dragObj.current = { type: 'text', src: 'f4' };

              }} src={require('../images/text/tx-4.png')} style={{ width: '100%' }} />

            </div>

            <div className="dd-box">
              <DropdownButton id="example-month-input-2" title="Font Family">
                <Dropdown.Item onClick={() => handleFontFamily('Arizonia')}>            <h1 className="too-h1">Arizonia</h1></Dropdown.Item>
                <Dropdown.Item onClick={() => handleFontFamily('Marmelad')}>            <h2 className="too-h2">Marmelad</h2></Dropdown.Item>
                <Dropdown.Item onClick={() => handleFontFamily('Kosugi')}>            <h3 className="too-h3">Kosugi</h3></Dropdown.Item>
                <Dropdown.Item onClick={() => handleFontFamily('Acme')}>            <h2 className="too-h2">Acme</h2></Dropdown.Item>
                <Dropdown.Item onClick={() => handleFontFamily('Allan')}>            <h3 className="too-h3">Allan</h3></Dropdown.Item>

              </DropdownButton>
            </div>
            <div className="colorPickhead  size-editor" >
              <p>Font Size:px</p>

            </div>
            <div className="colorPickhead  size-editor" >
              <input value={fontSize}  onChange={(e)=>setfontSize(e.target.value)} type="number" className="tool-text" placeholder="Font-Size" onKeyPress={(e)=>handleFontSizeChange(e)}   />

            </div>
            <p className=" size-editor">Text Allignment</p>

            <div className="colorPickhead  size-editor" >
              <button className="btn" onClick={()=>handleTextAlignhange("left")}><BsTextLeft /></button>
              <button className="btn" onClick={()=>handleTextAlignhange("center")} ><BsTextCenter /></button>
              <button className="btn" onClick={()=>handleTextAlignhange("right")}><BsTextRight /></button>

            </div>
            <p className=" size-editor">Font Color</p>
            <ChromePicker className="" color={textColor}
              onChangeComplete={e => textColorChange(e)} />
          </div>
        </Scrollbars>

      </TabPanel>
      <TabPanel tabId="vt3">
        <div className="dpt-headBox" style={{ width: 252 }}>

          <p className="dpt-headtext"> 3D Packaging Tool </p>
        </div>
        <Scrollbars
          style={{ width: 252, height: 498 }}>
          <p className="colorPickhead">Product Colour</p>

          <div className="colorPickhead size-editor" >
            <img onDragStart={e => {
              dragObj.current = { type: 'shape', src: 'arrow' };

            }} src={require('../images/tools/shapes/si-1.png')} style={{ width: 60, height: 60 }} />

            <img onDragStart={e => {
              dragObj.current = { type: 'shape', src: 'circle' };

            }} src={require('../images/tools/shapes/si-2.png')} style={{ width: 60, height: 60 }} />
          </div>

          <div className="colorPickhead  size-editor" >

            <img onDragStart={e => {
              dragObj.current = { type: 'shape', src: 'square' };

            }} src={require('../images/tools/shapes/si-3.png')} style={{ width: 60, height: 60 }} />

            <img onDragStart={e => {
              dragObj.current = { type: 'shape', src: 'triangle' };

            }} src={require('../images/tools/shapes/si-4.png')} style={{ width: 60, height: 60 }} />

          </div>
          <div className="colorPickhead  size-editor" >
            <img onDragStart={e => {
              dragObj.current = { type: 'shape', src: 'star' };

            }} src={require('../images/tools/shapes/si-5.png')} style={{ width: 60, height: 60 }} />
          </div>
          <p className=" colorPickhead">Shape Colour</p>

          <SketchPicker color={objectColor}
            onChangeComplete={e => objectColorChange(e)} />
        </Scrollbars>

      </TabPanel>
      <TabPanel tabId="vt4">
        <div className="dpt-headBox" style={{ width: 252 }}>

          <p className="dpt-headtext"> 3D Packaging Tool </p>
        </div>
        <Scrollbars
          style={{ width: 252, height: 498 }}>
          <p className=" colorPickhead">Background Color</p>

          <SketchPicker className="" color={backColor}
            onChangeComplete={e => backColorChange(e)} />
        </Scrollbars>
      </TabPanel>
      <TabPanel tabId="vt5">
        <div className="dpt-headBox" style={{ width: 252 }}>

          <p className="dpt-headtext"> 3D Packaging Tool </p>
        </div>
        <Scrollbars
          style={{ width: 252, height: 498 }}>
          <p className=" colorPickhead">SVG Shapes</p>
          <Accordion defaultActiveKey="0">
          {
            SVGicons.map(x=>  <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey={x.id}>
                  {x.name}
      </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={x.id}>
                <Card.Body>
                  <div style={{display:'flex',flexWrap:'wrap'}}>
                  {
                    x.icons.map(y=>   <img onDragStart={e => {
                      dragObj.current = { type: 'svg', src:require('../images/svg/'+x.iconFolder+"/"+y+".svg") };
        
                    }} src={require('../images/svg/'+x.iconFolder+"/"+y+".svg")} style={{ width: 50, height: 50,margin:5 }} />)
                  }
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            
           )
          }
          </Accordion>
        </Scrollbars> </TabPanel>
      <TabPanel tabId="vt6">
        <div className="dpt-headBox" style={{ width: 252 }}>

          <p className="dpt-headtext"> 3D Packaging Tool </p>
        </div>
        <Scrollbars
          style={{ width: 252, height: 498 }}>
          <p className=" colorPickhead">Upload Image</p>
          <ImageUploader
            withIcon={true}
            buttonText='Choose images'
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
            withPreview={true}
            dragObj={dragObj}
          />
        </Scrollbars>
      </TabPanel>
    </Tabs>

  )
}