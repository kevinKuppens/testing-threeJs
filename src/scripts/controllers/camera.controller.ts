import * as THREE from 'three';
export class Camera{
    static setCamera = () => {
        const fov = 75;
        const aspect = 2;
        const near = 0.1;
        const far = 10;
       return new THREE.PerspectiveCamera(fov, aspect, near, far);
    }
}