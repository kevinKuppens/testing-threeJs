import * as THREE from 'three';

export class Renderer{
    static setRenderer = () =>{
        const canvas = document.createElement('canvas');
        document.body.appendChild(canvas);

        return new THREE.WebGLRenderer({canvas});
    } 
}