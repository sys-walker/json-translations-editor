


export interface ITranslationFile {
  [name: string]: string;
}
export interface ITranslationRow {
  TRANSLATION_KEY: string;
  [key: string]: any;
}




export interface IntermediaryFileTranslation {
  [fileName: string]: TranslationLiteral;
}
export interface TranslationLiteral {
  [key: string]: any;
}






export function union(setA: Set<string>, setB: Set<string>) {
  const _union = new Set(setA);
  for (const elem of setB) {
    _union.add(elem);
  }
  return _union;
}
