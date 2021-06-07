import { Object3D } from 'three';
import * as THREE from 'three';

export class PlayerController{
    static setPlayerControls (speed:number, limit: number, player:Object3D){
        const mouse = new THREE.Vector2();
        window.addEventListener('mousemove', (e) => {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            const offset = player.position.x + mouse.x;
            
            if((mouse.x + offset)*speed <= limit && (mouse.x + offset)*speed >= -limit){
                player.position.x = (mouse.x + offset)*speed;
            }
        });
    }
}