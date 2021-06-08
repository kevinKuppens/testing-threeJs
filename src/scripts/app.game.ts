import * as THREE from 'three';
import * as dat from 'dat.gui';
import { Camera } from './controllers/camera.controller';
import { Lights } from './controllers/lights.controller';
import { Mesh } from './controllers/mesh.contoller';
import { Renderer } from './controllers/renderer.controller';
import { Scene } from './controllers/scene.controller';
import { PlayerController } from './controllers/player.controller';
import { EnemyController } from './controllers/enemy.controller';


const init = () =>{

    //SET RENDERER
    const renderer = Renderer.setRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    //SET CAMERA
    const camera = Camera.setCamera();
    //SET SCENE
    const scene = Scene.setScene();

    //IMPLEMENTING GUI FOR DEVELOPEMENT
    const gui = new dat.GUI();


    //LIGHTS
    const pointLightOptions = {
        name : 'Light 01',
        color : 0xFFFFFFF,
        intensity : 1,
        positions : [0, 1, 0],
        shadow : true,
        shadowSize : 1024, 
        gui
    };
    const pointLight = Lights.createPointLight(pointLightOptions);
        //ADD HELPERS TO LIGHTS
    const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
    scene.add(pointLight);
    scene.add(pointLightHelper);

    

    //MESHES
    const cubeDimension = {
        width : 1,
        height : 0.2,
        depth : 0.1
    };
    const cubeMaterial = {
        color : 0xfc6703
    };
    const player = Mesh.createBasicBox(cubeDimension, 'phong', cubeMaterial);
    scene.add(player);
    player.castShadow = true;
    player.receiveShadow = true;
    const planeDimension = {
        width : 7,
        height : 7
    };
    const planeMaterial = {
        color : 0x8fb996
    };
    const plane = Mesh.createBasicPlane(planeDimension, 'phong', planeMaterial);
 
    scene.add(plane);
    plane.receiveShadow = true;

    player.position.y = 0.5;
    player.position.z = 0.75;
    plane.rotation.x = -1.5708;


    //IMPORT CUSTOM MODEL
    const citernLeftOptions = {
        name : 'citern left',
        position : [-1, 0, 1.5],
        scale : [0.2, 0.2, 0.2],
        rotation : [0, -3.1416, 0],
        gui
    };
    const citernCenterOptions = {
        name : 'citern center',
        position : [0, 0, 1.5],
        scale : [0.2, 0.2, 0.2],
        rotation : [0, -3.1416, 0],
        gui
    };
    const citernRightOptions = {
        name : 'citern right',
        position : [1, 0, 1.5],
        scale : [0.2, 0.2, 0.2],
        rotation : [0, -3.1416, 0],
        gui
    };

    
    Mesh.importModel('citern.glb', scene, citernLeftOptions);
    Mesh.importModel('citern.glb', scene, citernCenterOptions);
    Mesh.importModel('citern.glb', scene, citernRightOptions);
   
    const enemyOptions= {
        scale : {
            radiusMin : 1,
            radiusMax : 2.1,
            segmentNumber : 32
        },
        positionLimit : 0.5,
        colors : [0xE27D60, 0x85DCB, 0xE8A87C]
    };
    const enemy = EnemyController.spawnEnemy(enemyOptions);
    enemy.name = 'enemy';
    scene.add(enemy);
   
    
    //Camera position
    camera.position.z =2;
    camera.position.y =3.5;
    camera.rotation.x = -1;


    // PLAYER CONTROLLER INITIATE
    const speed = 0.5;
    const limit = 1.5;
    PlayerController.setPlayerControls(speed, limit, player);


    
    //render
    const render = () =>{
        // time *= 0.000000001;
        //RESPONSIVE
        if(Renderer.resizeRendererToDisplaySize(renderer)){
             const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        }
 

        //ANIMATIONS
        // cube.rotation.x =time;
        // cube.rotation.y =time;
        if(scene.getObjectByName('enemy')){
             if(enemy.position.z <= 1.5){
            EnemyController.enemyAnimation(0.01, enemy);
            }else{
            scene.remove(enemy);
        }
        }
        const playerBoundary = PlayerController.playerBoundary(player, player.geometry);
        if(scene.children.find((el) => el.name === 'enemy')){
            const enemyBoundary = EnemyController.enemyBoundary(enemy, enemy.geometry);
           
            if(enemyBoundary.boundaryRight >= playerBoundary.boundaryLeft
                 && enemyBoundary.boundaryLeft <= playerBoundary.boundaryRight 
                && enemyBoundary.boundaryFront >= playerBoundary.boundaryFront){
                     scene.remove(enemy);
                }
        }
        
        
       
        renderer.render(scene, camera);

        requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
};

window.addEventListener('load', init);




