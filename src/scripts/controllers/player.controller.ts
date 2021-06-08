import { BoxGeometry, Object3D } from 'three';
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
    static playerBoundary (playerObject:Object3D, playerGeometry:BoxGeometry){
        const boundaryRight = (playerObject.position.x + (playerGeometry.parameters.width/2));
        const boundaryLeft = (playerObject.position.x - (playerGeometry.parameters.width/2));
        const boundaryFront = (playerObject.position.z);

        return {boundaryLeft, boundaryRight, boundaryFront};
    }
}