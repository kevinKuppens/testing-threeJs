import * as THREE from 'three';

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
}