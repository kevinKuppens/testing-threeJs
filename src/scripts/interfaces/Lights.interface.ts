export interface LightOptions {
    name : string,
    color: number,
    intensity : number,
    positions : number[],
    shadow ?: boolean,
    shadowSize ?: number,
    gui?:dat.GUI
}

