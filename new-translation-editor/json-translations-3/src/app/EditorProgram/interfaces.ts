export interface ITranslationFile {
  [name: string]: string;
}
interface ITranslationModel {
  [name: string]: string[];
}

export function union(setA: Set<string>, setB: Set<string>) {
  const _union = new Set(setA);
  for (const elem of setB) {
    _union.add(elem);
  }
  return _union;
}
