import * as THREE from 'three';

interface LightOptions {
    color: number,
    intensity : number,
    positions : number[]
}


export class Lights{
    static createPointLight(options:LightOptions){
        const light = new THREE.PointLight(options.color, options.intensity);
        light.position.set(options.positions[0], options.positions[1], options.positions[2]);
        return light;
    }
}