import * as THREE from 'three';

interface LightOptions {
    name : string,
    color: number,
    intensity : number,
    positions : number[],
    shadow ?: boolean,
    shadowSize ?: number,
    gui?:dat.GUI
}


export class Lights{
    static createPointLight(options:LightOptions){
        const light = new THREE.PointLight(options.color, options.intensity);
        light.position.set(options.positions[0], options.positions[1], options.positions[2]);
        if(options.shadow && options.shadowSize){
            light.castShadow = options.shadow;
            light.shadow.mapSize.width = options.shadowSize;
            light.shadow.mapSize.height = options.shadowSize;
        }
        if(options.gui){
            const light1Folder = options.gui.addFolder(`${options.name}`);
            light1Folder.add(light.position, 'x', -5, 5, 0.0001);
            light1Folder.add(light.position, 'y', -5, 5, 0.0001);
            light1Folder.add(light.position, 'z', -5, 5, 0.0001);
            light1Folder.add(light, 'intensity', 0, 5, 0.0001);
            light1Folder.addColor(options, 'color')
                .onChange(()=> light.color.set(options.color));
            light1Folder.open();
        }
       
        
        return light;
    }
}