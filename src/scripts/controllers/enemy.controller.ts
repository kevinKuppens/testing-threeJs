import { Object3D, SphereGeometry } from 'three';
import { EnemiesOptions } from '../interfaces/mesh.interface';
import { Mesh } from './mesh.contoller';
import { Utilities } from './utilities.controller';

export class EnemyController{
    static spawnEnemy(options:EnemiesOptions){
        const enemy = Mesh.createEnemy(options);
        enemy.position.set(Utilities.generateRange(options.positionLimit), enemy.scale.x/2, -7);
        return enemy;
    }
    static enemyBoundary (enemyObject:Object3D, enemyGeometry:SphereGeometry){
        const boundaryRight = (enemyObject.position.x + (enemyGeometry.parameters.radius/2));
        const boundaryLeft = (enemyObject.position.x - (enemyGeometry.parameters.radius/2));
        const boundaryBack = (enemyObject.position.z - (enemyGeometry.parameters.radius/2));
        const boundaryFront= (enemyObject.position.z + (enemyGeometry.parameters.radius));
        return {boundaryLeft, boundaryRight, boundaryFront, boundaryBack};
    }

    static enemyAnimation(speed:number, enemyMesh:Object3D){
            enemyMesh.position.z += speed;
    }
}