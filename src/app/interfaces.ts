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
