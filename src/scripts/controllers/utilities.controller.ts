export class Utilities{
    static generateRange(rangeValue:number){
        const value = Math.random()*rangeValue;
        const sign = Math.random() > 0.5 ? 1 : -1;
        return value*sign;
    }
}