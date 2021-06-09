import { Object3D, Scene } from 'three';
import { EnemiesOptions } from '../interfaces/mesh.interface';
import { EnemyController } from './enemy.controller';
import { PlayerController } from './player.controller';

export class GameController{
    static enemiesOutOfField(enemyEntity:Object3D, actualScene:Scene, options:EnemiesOptions){
        if(enemyEntity.position.z <= 2){
            EnemyController.enemyAnimation(0.01, enemyEntity);
         }else{
            actualScene.remove(enemyEntity);
             EnemyController.spawnEnemies(actualScene, 1, options);
         }
    }

    static playerCollision(playerEntity:Object3D, playerGeometry:any, enemyEntity:Object3D, actualScene:Scene, options:EnemiesOptions){
        const playerBoundary = PlayerController.playerBoundary(playerEntity, playerGeometry);
                if(actualScene.children.find((el) => el.name.includes('enemy') )){
                    
                    // const enemyBoundary = EnemyController.enemyBoundary(enemy, en);
                    if(enemyEntity.position.x >= playerBoundary.boundaryLeft
                        && enemyEntity.position.x <= playerBoundary.boundaryRight 
                        && enemyEntity.position.z >= playerBoundary.boundaryFront){
                        
                            actualScene.remove(enemyEntity);
                        EnemyController.spawnEnemies(actualScene, 1, options);
                        return true;
                    }
                }
    }
    static protectedCollision(protectedEntity:any[], enemyEntity:Object3D, actualScene:Scene, options:EnemiesOptions){

        // console.log(protectedEntity);
        protectedEntity.forEach( entity => {
            const entityGeometry = entity.geometry;
            const boundaryLeft = entity.position.x - entityGeometry.parameters.width/2;
            const boundaryRight = entity.position.x + entityGeometry.parameters.width/2;
            const boundaryFront = entity.position.z - entityGeometry.parameters.depth/2;
            if(enemyEntity.position.z >= boundaryFront 
                && enemyEntity.position.x >= boundaryLeft
                && enemyEntity.position.x <= boundaryRight){
                    actualScene.remove(enemyEntity);
                    EnemyController.spawnEnemies(actualScene, 1, options);
            }
        });
    }

     static updateScoring(currentScore:number, scoreField:HTMLElement){
            currentScore += 10;
            scoreField.innerText = currentScore.toString();
            return currentScore;
        

        }
    static levelGain(score:number, currentLevel:number, levelField:HTMLElement){
        if(score%500 === 0){
            currentLevel ++;
            
               levelField.innerText = currentLevel.toString();  
          
                  
        }
        return currentLevel; 
    }
}
