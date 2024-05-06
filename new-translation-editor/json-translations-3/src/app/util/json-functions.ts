export function getCommonSize(arr:any[]){
    let maxim= arr.reduce((total, obj)=>  Math.max(total,Object.keys(obj).length),0)-1 //restar langJSON key
    return maxim
}
 
 
 
export function union(setA:Set<any>, setB:Set<any>) {
  const _union = new Set(setA);
  for (const elem of setB) {
    _union.add(elem);
  }
  return _union;
}
 
 
export function mergedKeys(arr:any[]){
    let maxim= arr.reduce((total, obj)=>  union(total,new Set(Object.keys(obj)),),new Set())
    return maxim
}
 
function mergedJSON(arr:any[]){
    let keys:string[]= mergedKeys(arr)
    let mergedValues:any={}
    keys.forEach((k)=>{
        arr.forEach((val)=>{
            if(k==="langJSON"){
                mergedValues[val[k]]=[]
            }else{
                let curr=mergedValues[val["langJSON"]]
                let update=val[k] ? val[k]:''
                curr.push(update)
            }
        })
    })
    console.log(mergedValues)
 
}