import { Object3D, Scene, SphereGeometry } from 'three';
import { EnemiesOptions } from '../interfaces/mesh.interface';
import { Mesh } from './mesh.contoller';
import { Utilities } from './utilities.controller';

export class EnemyController{
    static createEnemyObject(options:EnemiesOptions){
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
    static spawnEnemies(actualScene:Scene, enemiesCount:number, options:EnemiesOptions){
        const enemies:Object3D[]=[];
        for(let count =0; count < enemiesCount; count++ ){
            const enemy = EnemyController.createEnemyObject(options);
            enemy.name = `enemy${count}`;
            enemies.push(enemy);
        }
        const maxSpawnDelay = 1000;
        const minSpawnDelay = 500;
        enemies.forEach((asset, assetIndex) => {
            const speed = Math.floor(Math.random()*maxSpawnDelay)+minSpawnDelay;
            setTimeout(()=> actualScene.add(asset), assetIndex * speed);
            
        });
    }
    
}