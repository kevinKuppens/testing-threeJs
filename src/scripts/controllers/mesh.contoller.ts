import * as THREE from 'three';
import { Scene } from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';


interface Scales{
    width: number,
    height: number,
    depth: number
}

interface MaterialOptions{
    color: number
}

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
    // static createBasicPlane(scales:Scales, materialType:string, materialOptions:MaterialOptions){
    //     const geometry = new THREE.PlaneGeometry(scales.width, scales.height, scales.depth);
    //     const material = this.setMaterial(materialType, materialOptions);
    //     return new THREE.Mesh(geometry, material); 
    // }

    static importModel(pathToModel:string, actualScene:Scene){
        const gltfLoader = new GLTFLoader();
        gltfLoader.load(pathToModel, (model) => {
            actualScene.add(model.scene);
        });
    }
}