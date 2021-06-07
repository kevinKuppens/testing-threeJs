interface Scales{
    width: number,
    height: number,
    depth?: number
}

interface MaterialOptions{
    color: number
}

interface MeshOptions{
    name:string,
    position ?: number[],
    scale ?:number[],
    rotation ?:number[], 
    gui ?:dat.GUI
}

interface EnemiesOptions{
    scale : {
        min:number,
        max:number
    },
    spawnLimit : {
        min:number,
        max:number
    },
    colors : number[],
    speed : {
        min : number,
        max:number
    }
}

export {Scales, MaterialOptions, MeshOptions, EnemiesOptions};