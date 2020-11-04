import React,{useState} from 'react';
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder,ArcRotateCamera,SceneLoader,Texture,Color3,DynamicTexture } from '@babylonjs/core';
import SceneComponent from './SceneComponent'; // ^^ point to file we created above or 'babylonjs-hook' NPM.
import { Rect } from 'react-konva';
import {urlImg} from '../../utils/baseUrl';

let done=0;
const mainCoponent=React.forwardRef((props,ref) =>
{
  
  var img = new Image();
  const [scene, setScene] = useState(null);

  const {scaleSize}=props.scaleSize;

  React.useEffect(()=>{

//   useImgRef.src=props.imageRender
    if(scene!=null)
    {
      var textureResolution = 1024;
      var textureGround = new DynamicTexture("dynamic texture", textureResolution, scene, true);   

      var textureContext = textureGround.getContext();
      const  shaderBall = scene.getMeshByID("Plane");
      if(shaderBall)
      {
        let shaderBallMtl = shaderBall.material;
      shaderBallMtl.albedoTexture = textureGround ;
      shaderBallMtl.albedoColor=new Color3.FromHexString(props.boxDefaultColor);
      
      shaderBallMtl.metallic = 0;
      shaderBallMtl.roughness = 1;
      
      //if(scene.meshes[0] && scaleSize)
      scene.meshes[0].scaling = new Vector3(props.scaleSize.x/(25.4*3),props.scaleSize.y/(25.4*3),props.scaleSize.z/(25.4*3));  

 
       img.src="./texture1.jpg";
       if(ref)
       {
         
        
    var x = document.createElement("CANVAS");
    x.width=props.width;
x.height=props.height;
    var ctx = x.getContext("2d");
    ctx.scale(-1, 1);

    ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.fillStyle = props.fillColor;
    ctx.fillRect(0, 0, props.width,props.height );
    var imagexx = new Image();
    imagexx.src = ref.toDataURL();
    imagexx.onload = function() {
      ctx.drawImage(imagexx, 0, 0);
      img.src=x.toDataURL();
    };

         
       }
      img.onload = function() {
            textureContext.drawImage(this, 0, 0,1024,1024);
        textureGround.update();	
        }
      }
    }
    done+=1;
    return 
  });
const onRender = scene => {

}

  const onSceneReady = (scene) => {
    scene.clearColor = Color3.FromHexString("#e8e8e8");
    // This creates and positions a free camera (non-mesh)
  var camera = new ArcRotateCamera("camera1", 0, 1, 10, new Vector3.Zero(), scene);

  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new HemisphericLight();
  // Default intensity is 1. Let's dim the light a small amount
 light.direction.y=-200;
 light.direction.z=-200;
 light.direction.x=-200;

  SceneLoader.ImportMesh(
     "",
    // `./`,
    // "Box1.gltf",
    `https://devboxking.boxking.ch/laravel/system/public/dist/img/model/`,
    props.model,
    scene,(shaderBallMeshes, particleSystems, skeletons)=>{
      var textureResolution = 1024;
      var textureGround = new DynamicTexture("dynamic texture", textureResolution, scene, true); 
      var textureContext = textureGround.getContext();

      let  shaderBall = scene.getMeshByID("Plane");
     let shaderBallMtl = shaderBall.material;
     shaderBallMtl.albedoTexture = textureGround ;
     shaderBallMtl.metallic = 0;
     shaderBallMtl.roughness = 1;
     scene.animationsEnabled=false
     scene.meshes[0].scaling = new Vector3(props.scaleSize.x/(25.4*3),props.scaleSize.y/(25.4*3),props.scaleSize.z/(25.4*3));  
     shaderBallMtl.albedoColor=new Color3.FromHexString(props.boxDefaultColor);
     
  
     try
     {
      scene.animationsEnabled=true;
      scene.animationGroups[0].start(false, 1, 0, 2.5);
      scene.animationGroups[0].loopAnimation = false;

     }
     catch
     {
       
     }
      img.src="./texture1.jpg";

      if(ref)
      {

      
        var x = document.createElement("CANVAS");
        x.width=props.width;
x.height=props.height;
        var ctx = x.getContext("2d");
        ctx.scale(-1, 1);

        ctx.setTransform(1, 0, 0, 1, 0, 0);

        ctx.fillStyle = props.fillColor;
        ctx.fillRect(0, 0, props.width,props.height );
        var imagexx = new Image();
        imagexx.src = ref.toDataURL();
        imagexx.onload = function() {
          ctx.drawImage(imagexx, 0, 0);
          img.src=x.toDataURL();
        };
                
      }
     img.onload = function() {
           textureContext.drawImage(this, 0, 0,1024,1024);
       textureGround.update();	
       }
    });
    

 
    
}

 
  return     (<SceneComponent  setcheckOutModal={props.setcheckOutModal}  antialias onSceneReady={onSceneReady} scene={scene} setScene={setScene}  onRender={onRender} id='my-canvas' />)

});

export default mainCoponent;


