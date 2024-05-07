export function getCommonSize(arr:any[]):number{
    let maxim= arr.reduce((total, obj)=>  Math.max(total,Object.keys(obj).length),0)-1 //restar langJSON key
    return maxim
}
 
 
 
export function union(setA:Set<any>, setB:Set<any>):Set<any> {
  const _union = new Set(setA);
  for (const elem of setB) {
    _union.add(elem);
  }
  return _union;
}
 
 
export function mergedKeys(arr:any[]):string[]{
    let maxim= arr.reduce((total, obj)=>  union(total,new Set(Object.keys(obj)),),new Set())
    return maxim
}
