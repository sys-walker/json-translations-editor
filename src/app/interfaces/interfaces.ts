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
  static text2json(a:string | ArrayBuffer | null){
    let s:string =""
    if (typeof a === 'string') {
      s=a?.toString();
    } else if (a instanceof ArrayBuffer) {
      s=a!!.toString()
    } else {} 
  
    return JSON.parse(s);
  }

}
