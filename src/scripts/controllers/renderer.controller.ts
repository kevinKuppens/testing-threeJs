import * as THREE from 'three';
import { WebGLRenderer } from 'three';

export class Renderer{
    static setRenderer = () =>{
        const canvas = document.createElement('canvas');
        const frame: HTMLElement = document.getElementById('container') as HTMLElement;
        canvas.setAttribute('id', 'game-canvas');
        frame.appendChild(canvas);

        return new THREE.WebGLRenderer({canvas, alpha:true});
    } 

    static resizeRendererToDisplaySize(renderer:WebGLRenderer){
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if(needResize){
            renderer.setSize(width, height, false);
        }
        return needResize;
    }
}