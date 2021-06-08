import * as THREE from 'three';
import * as dat from 'dat.gui';
import { Camera } from './controllers/camera.controller';
import { Lights } from './controllers/lights.controller';
import { Mesh } from './controllers/mesh.contoller';
import { Renderer } from './controllers/renderer.controller';
import { Scene } from './controllers/scene.controller';
import { PlayerController } from './controllers/player.controller';
import { EnemyController } from './controllers/enemy.controller';
import { GameController } from './controllers/game.controller';


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

    const protectedColliders:any[] =[];
    Mesh.importModel('citern.glb', scene, citernLeftOptions);
    const citernLeftColider:any = Mesh.modelBoxCollider(citernLeftOptions);
    citernLeftColider.position.set(citernLeftOptions.position[0], (citernLeftOptions.scale[1]*3)/2, citernLeftOptions.position[2]);
    scene.add(citernLeftColider);
    protectedColliders.push(citernLeftColider);

    Mesh.importModel('citern.glb', scene, citernCenterOptions);
    const citernCenterColider:any = Mesh.modelBoxCollider(citernCenterOptions);
    citernCenterColider?.position.set(citernCenterOptions.position[0], (citernCenterOptions.scale[1]*3)/2, citernCenterOptions.position[2]);
    scene.add(citernCenterColider);
    protectedColliders.push(citernCenterColider);
   

    Mesh.importModel('citern.glb', scene, citernRightOptions);
    const citernRightColider:any = Mesh.modelBoxCollider(citernRightOptions);
    citernRightColider?.position.set(citernRightOptions.position[0], (citernRightOptions.scale[1]*3)/2, citernRightOptions.position[2]);
    scene.add(citernRightColider);
    protectedColliders.push(citernRightColider);

    


    const enemyOptions= {
        scale : {
            radiusMin : 1,
            radiusMax : 2.1,
            segmentNumber : 32
        },
        positionLimit : 1.5,
        colors : [0xE27D60, 0x85DCB, 0xE8A87C]
    };
    const enemyCount = 5;
    EnemyController.spawnEnemies(scene, enemyCount, enemyOptions);
    // scene.add(enemy);
   
    
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
        
        //RESPAWN AND COLLISION
        const enemiesOnScene =scene.children.filter(child => { return child.name.includes('enemy');}); // IF ENEMIES SPAWNS
        
        
        
        const playerGeometry = player.geometry;
        if(enemiesOnScene.length>0){
            
            enemiesOnScene.forEach((enemy) => {
                //IF ENEMIES GOES OUT THE SCENE
                GameController.enemiesOutOfField(enemy, scene, enemyOptions);
                //IF PLAYER COLLIDE WITH ENEMIES
                GameController.playerCollision(player, playerGeometry, enemy, scene, enemyOptions);
                GameController.protectedCollision(protectedColliders, enemy, scene, enemyOptions);
            });
        }
        
       
        renderer.render(scene, camera);

        requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
};

window.addEventListener('load', init);




