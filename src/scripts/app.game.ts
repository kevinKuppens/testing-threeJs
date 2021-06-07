
import { Camera } from './controllers/camera.controller';
import { Lights } from './controllers/lights.controller';
import { Mesh } from './controllers/mesh.contoller';
import { Renderer } from './controllers/renderer.controller';
import { Scene } from './controllers/scene.controller';


const init = () =>{
    const renderer = Renderer.setRenderer();
    const camera = Camera.setCamera();
    const scene = Scene.setScene();


    //LIGHTS
    const pointLightOptions = {
        color : 0xFFFFFFF,
        intensity : 1,
        positions : [-1, 2, 4]
    };
    const pointLight = Lights.createPointLight(pointLightOptions);
    scene.add(pointLight);

    //MESHES
    const cubeDimension = {
        width : 1,
        height : 1,
        depth : 1
    };
    const cubeMaterial = {
        color : 0x44aa88
    };
    const cube = Mesh.createBasicBox(cubeDimension, 'phong', cubeMaterial);

    scene.add(cube);


    //IMPORT CUSTOM MODEL
    Mesh.importModel('citern.glb', scene);

    //Camera position
    camera.position.z =2;



    //render
    const render = (time:number) =>{
        time *= 0.001;

        //RESPONSIVE
        if(Renderer.resizeRendererToDisplaySize(renderer)){
             const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        }
       

        //ANIMATIONS
        cube.rotation.x =time;
        cube.rotation.y =time;
        
        renderer.render(scene, camera);

        requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
};

window.addEventListener('load', init);




