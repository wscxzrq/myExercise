
/**
 * 根据最小值和最大值得到该范围内的随机数（无法取到最大值）
 * @param max 
 * @param min 
 * @returns number
 */
export function getRamdom(max:number,min:number):number {
    return (Math.floor(Math.random()* (max - min)) + min)
}