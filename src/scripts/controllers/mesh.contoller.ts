import * as THREE from 'three';
import { Scene } from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import { EnemiesOptions, MaterialOptions, MeshOptions, Scales } from '../interfaces/mesh.interface';

export class Mesh{

    static setMaterial(materialType:string, materialOptions:MaterialOptions){
        switch(materialType){
            case 'basic' : return new THREE.MeshBasicMaterial(materialOptions);
            case 'phong' : return new THREE.MeshPhongMaterial(materialOptions);
            default : throw new Error('NO TYPE FOUND');
        }
    }

    static createBasicBox(scales:Scales, materialType:string, materialOptions:MaterialOptions){
        const geometry = new THREE.BoxGeometry(scales.width, scales.height, scales.depth);
        const material = this.setMaterial(materialType, materialOptions);
        return new THREE.Mesh(geometry, material); 
    }
    static createBasicPlane(scales:Scales, materialType:string, materialOptions:MaterialOptions){
        const geometry = new THREE.PlaneGeometry(scales.width, scales.height);
        const material = this.setMaterial(materialType, materialOptions);
        return new THREE.Mesh(geometry, material); 
    }

    static importModel(pathToModel:string, actualScene:Scene, options?:MeshOptions){
        const gltfLoader = new GLTFLoader();     
        gltfLoader.load(pathToModel, (model) => {
            model.scene.name = `${pathToModel.split('.')[0]}`;
            model.scene.traverse( ( node:any ) => {
                    if ( node.isMesh ) { node.castShadow = true; }
                    } );
            if(options?.position){
                 model.scene.position.set(options.position[0], options.position[1], options.position[2]);
            }
            if(options?.scale){
                model.scene.scale.set(options.scale[0], options.scale[1], options.scale[2]);
            }
            if(options?.rotation){
                model.scene.rotation.set(options.rotation[0], options.rotation[1], options.rotation[2]);
            }
            if(options?.gui){
                const gui = options.gui;
                const meshGui = gui.addFolder(`${options.name}`);
                const meshPos = meshGui.addFolder('position');
                const meshScale = meshGui.addFolder('scale');
                meshPos.add(model.scene.position, 'x', -5, 5, 0.1);
                meshPos.add(model.scene.position, 'y', -5, 5, 0.1);
                meshPos.add(model.scene.position, 'z', -5, 5, 0.1);
                meshScale.add(model.scene.scale, 'y');
                meshScale.add(model.scene.scale, 'z');
                meshScale.add(model.scene.scale, 'x');
                meshGui.open();
            }
            actualScene.add(model.scene);
        });
    }
    
    static createEnemy(actualScene:Scene, options:EnemiesOptions){
        //RANDOMLY CREATE ENEMIES ( scales, pop positions, speed, ...)
    }
}