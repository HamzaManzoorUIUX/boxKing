import { Engine, Scene } from '@babylonjs/core'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../../redux/actionMethodes/cartActionsTypes';
import AnimateHeight from 'react-animate-height';
import {BsPlusCircle} from 'react-icons/bs'
export default (props, ref) => {

    const [showCheckOutModal,sershowCheckOutModal]=useState(false);
    //console.log(props);
    const reactCanvas = useRef(null);
    const { antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, convaStageRef, ...rest } = props;

    const [loaded, setLoaded] = useState(false);
    const [triggetCount,settriggetCount]=useState(0);
    const [StageXsize,setStageXsize]=useState({
        height:323,
        width:368,
        isZoom:false,
    })
    useEffect(() => {
        if (window) {
            const resize = () => {
                if (props.scene) {
                    props.scene.getEngine().resize();

                }
            }
            window.addEventListener('resize', resize);

            return () => {
                window.removeEventListener('resize', resize);
            }
        }
    }, [props.scene]);

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            const engine = new Engine(reactCanvas.current, antialias, engineOptions, adaptToDeviceRatio);
            const scene = new Scene(engine, sceneOptions);
            scene.createDefaultLight(true);
   
            if (scene.isReady()) {
              
                props.setScene(scene);
                props.onSceneReady(scene)
                
                
            } else {
                scene.onReadyObservable.addOnce(scene => props.onSceneReady(scene));
            }

            engine.runRenderLoop(() => {
                if (typeof onRender === 'function') {

                    onRender(scene);
                }
                scene.render();
            })
        }
        
        return () => {
        
            if (props.scene !== null) {
                props.scene.dispose();
            }
        }
    }, [reactCanvas])

    const handleCheckOut=()=>{
      
        /*
       
        */
    }

    const handleAnimation = (type) => {
        console.log(props.scene.animationGroups[0]);
        if (type == "open") {
            props.scene.animationsEnabled = true;
            props.scene.animationGroups[0].loopAnimation = false;
            if(triggetCount==0)
            {
              

                
                props.scene.animationGroups[0].start(false,.5, 0.7, 0.40);
                
                    settriggetCount(1);
            }
            else
            {
                props.scene.animationGroups[0].start(false, .5, 0.40, 0);
                settriggetCount(0);
            }
            


        }
        else if (type == 'close') {
            if(triggetCount==0)
            {
                props.scene.animationGroups[0].start(false, .5, 0, 0.40);
                    settriggetCount(1);
            }
            else
            {
                props.scene.animationGroups[0].start(false, .5, 0.40, 2.5);
                settriggetCount(0);
            }
        }
    }

    return (
        <div className="three-d-box-main" style={{width: StageXsize.width,
            height:  StageXsize.height}} >
        <div className="three-d-header">
            <p>3D Preview</p>
            <button style={{position:'relative',left:'28%',backgroundColor:'white',borderColor:'transparent'}} onClick={()=>{
                if(StageXsize.isZoom==true)
                {
                    setStageXsize({
                        height:323,
                        width:368,
                        isZoom:false
                    })
                }
                else
                {
                    setStageXsize({
                        width:600,
                        height:468,
                        isZoom:true
                    })
                    var x = document.getElementsByClassName("react-draggable-dragged");
                    x[0].style.transform="translate(-564px, -6px)";

                }
            }}><BsPlusCircle style={{fontSize:25}}/></button>
        </div>
        <canvas width={StageXsize.width} height={StageXsize.height} ref={reactCanvas} {...rest} />
        <div style={{ display: 'flex', justifyContent: 'space-around', backgroundColor: 'white' }}>
            <button className="btn btnt-d-1" onClick={() => handleAnimation("close")}>Close <span><img className="btn-icon-cst12s" src={require('../../images/bxcls.png')} /></span></button>
            <button className="btn btnt-d-1" onClick={() => handleAnimation("open")}>Open <span><img className="btn-icon-cst12s" src={require('../../images/bxopn.png')} /></span></button>

        </div>

        <div className="mdl-btm-23">
            <button className="btn mdl-btm-chk-btn" onClick={() =>props.setcheckOutModal(true)}>Check Out</button>

        </div>
    </div>
   
    );
}