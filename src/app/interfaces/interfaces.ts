export interface ITranslatorEvent {
  name: string;
}

export interface IAddLanguageEv extends ITranslatorEvent {
  lang: string;
}
export interface IRemoveLangEv extends ITranslatorEvent {
  lang: string;
}
export interface IAddTranslationEv extends ITranslatorEvent {}

export interface IGetTranslationsEv extends ITranslatorEvent {
  zip: boolean;
}

export interface IRetTranslationsTableEv extends ITranslatorEvent {
  languages: string[];
  keys: string[];
  values: string[][];
  zip: boolean;
}
export interface IUploadFile extends ITranslatorEvent {
  headers: string[];
  table: string[][];
}
export interface IGetCurrentLangs extends ITranslatorEvent {}
export interface IRetCurrentLangs extends ITranslatorEvent {
  headers: string[];
}
export class FormatedJSON {
    //Functions to flat or unflat JSON
    //https://stackoverflow.com/questions/19098797/fastest-way-to-flatten-un-flatten-nested-javascript-objects#:~:text=Flatten%20a%20JSON%20object%3A,))%20%7B%20var%20length%20%3D%20table.
    static flatten(flatJSON: object) {
      //@ts-ignore
      Object.flatten = function (data) {
        var result = {};
        //@ts-ignore
        function recurse(cur, prop) {
          if (Object(cur) !== cur) {
            //@ts-ignore
            result[prop] = cur;
          } else if (Array.isArray(cur)) {
            for (var i = 0, l = cur.length; i < l; i++) recurse(cur[i], prop + '[' + i + ']');
            //@ts-ignore
            if (l == 0) result[prop] = [];
          } else {
            var isEmpty = true;
            for (var p in cur) {
              isEmpty = false;
              recurse(cur[p], prop ? prop + '.' + p : p);
            }
            //@ts-ignore
            if (isEmpty && prop) result[prop] = {};
          }
        }
        recurse(data, '');
        return result;
      };
      //@ts-ignore
      return Object.flatten(flatJSON);
    }
  
    static unflatten(nestedJSON: object) {
      //@ts-ignore
      Object.unflatten = function (data) {
        'use strict';
        if (Object(data) !== data || Array.isArray(data)) return data;
        var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
          resultholder = {};
        for (var p in data) {
          var cur = resultholder,
            prop = '',
            m;
          while ((m = regex.exec(p))) {
            //@ts-ignore
            cur = cur[prop] || (cur[prop] = m[2] ? [] : {});
            prop = m[2] || m[1];
          }
          //@ts-ignore
          cur[prop] = data[p];
        }
        //@ts-ignore
        return resultholder[''] || resultholder;
      };
      //@ts-ignore
      return Object.unflatten(nestedJSON);
    }
    static text2json(a: string | ArrayBuffer | null) {
        //Json parse
      let s: string = '';
      if (typeof a === 'string') {
        s = a?.toString();
      } else if (a instanceof ArrayBuffer) {
        s = a!!.toString();
      } else {
      }
  
      return JSON.parse(s);
    }
    static equal(json1: object,json2: object){
        //@ts-ignore
        const isObject = (object) => {
            return object != null && typeof object === 'object'; 
        };
        
        let obj1=FormatedJSON.flatten(json1)
        let obj2=FormatedJSON.flatten(json2)
    
        var props1 = Object.getOwnPropertyNames(obj1);
        var props2 = Object.getOwnPropertyNames(obj2);

        if (props1.length != props2.length) {
            return false;
        }
        for (var i = 0; i < props1.length; i++) {
            let val1 = obj1[props1[i]];
            let val2 = obj2[props1[i]];
            let isObjects = isObject(val1) && isObject(val2);
            if (isObjects && !FormatedJSON.equal(val1, val2) || !isObjects && val1 !== val2) {
                return false;
            }
        }
        return true;
    }
    static concat(json1:object,json2:object){
      /*
        Currently it works directionally
        eg:
        - "e1" + "e2" = ["e1","e2"]

        - ["e1"] + "e2" = ["e1","e2"]

        - ["e1","e2","e3"] +"e4" =  ["e1","e2","e3", "e4"] 


        Not works or not works as expected:
         - "e1" + "e2" = ["e1","e2"] OK
         - "e1" + "[e2]" = ["e1"] ???
         ...

      */
      // funciona []+"element"

      let o1 =  json1//FormatedJSON.flatten(json1);
      let o2 = json2//FormatedJSON.flatten(json2);
      //Unio de totes les keys dels 2 json
      const mySet1 = new Set(Object.keys(o1));
      const mySet2 = new Set(Object.keys(o2));
      const u = union(mySet1,mySet2)

      //crea un nou json flattered
      let newJson={}
      //let len_=0;
      //afegeix els valors al nou json
      for (const key of Array.from(u)) {
        //Creo la entrada amb una llista per defecte, si aquest ja hi es llavors no ho faig
        let existent=[]
      
        //@ts-ignore
        if(o1[key]){
           //@ts-ignore
           if(!Array.isArray(o1[key])){
              //@ts-ignore
              existent.push(o1[key])
           }else{
            //@ts-ignore
            existent=o1[key]
           }
        }else{
          existent.push("*")
        }
        //@ts-ignore
        if(o2[key]){
          //@ts-ignore
           if(!Array.isArray(o2[key])){
              //@ts-ignore
              existent.push(o2[key])
           }else{
            //@ts-ignore
            existent=o2[key]
           }
        }else{
          existent.push("*")
        }

        //console.log("Despres de mirar a o2",existent)
        //console.log(existent)
        //@ts-ignore
        newJson[key]=existent



      }
      //unflatter JSONf

      console.log(newJson)
      
      return newJson  
    }

    static mergeTranslationArray(jsonArray:[]){
      let result={};
      jsonArray.forEach(element => {

        result = FormatedJSON.mergeJSON(element,result);
      });
      console.log(result);
      

      return result;
    }
    static mergeJSON(jsonObj1, jsonObj2:any) {
      if(Object.keys(jsonObj2).length===0){
        return jsonObj1
      }
      const mergedJSON = {};
      Object.keys(jsonObj1).forEach((property)=>{
          if (Array.isArray(jsonObj1[property])) {
              mergedJSON[property] = jsonObj1[property];
          } else {
              mergedJSON[property] = [jsonObj1[property]];
              ;
          }
      }
      );
  
      let set = new Set(Object.keys(jsonObj1).concat(Object.keys(jsonObj2)));
      let arr = Array.from(set);
  
      arr.forEach((property)=>{
          if (!mergedJSON[property]) {
              mergedJSON[property] = [""]
          }
  
          if (!mergedJSON.hasOwnProperty(property)) {
              mergedJSON[property] = [jsonObj2[property]];
          } else {
              if (Array.isArray(mergedJSON[property])) {
  
                  if (jsonObj2[property] === undefined) {
                      jsonObj2[property] = ""
                  }
  
                  mergedJSON[property].push(jsonObj2[property]);
  
              } else {
                  mergedJSON[property] = [mergedJSON[property], jsonObj2[property]];
              }
          }
      }
      );
  
      return mergedJSON;
  }
  
}
//@ts-ignore
function union(setA, setB) {
  let _union = new Set(setA);
  for (let elem of setB) {
    _union.add(elem);
  }
  return _union;
}