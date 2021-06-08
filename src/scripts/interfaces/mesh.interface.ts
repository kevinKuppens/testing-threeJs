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
        radiusMin:number,
        radiusMax:number, 
        segmentNumber:number
    },
    positionLimit :number,
    colors : number[],
    speed ?: {
        min : number,
        max:number
    }
}

export {Scales, MaterialOptions, MeshOptions, EnemiesOptions};