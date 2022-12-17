import { Component, OnInit } from '@angular/core';
import { HomePage } from 'src/app/home/home.page';
import { IAddTranslationEv, IAddLanguageEv, IRemoveLangEv } from 'src/app/interfaces';
import { EventBus } from 'src/app/services/EventBus/event-bus';
const TAG = 'PanelLanguageComponent::';
const NO_LANG = 'No languages available';
const SELECT_LANG = 'Select a language';
@Component({
  selector: 'panel-language',
  templateUrl: './panel-language.component.html',
  styleUrls: ['./panel-language.component.scss'],
})
export class PanelLanguageComponent implements OnInit {
  languageInput: string = '';
  theLanguagesArray: String[] = ['en'];
  languageToRemove: string = '';
  selectPlaceholder: string = '';

  constructor() {
    this.selectPlaceholder = SELECT_LANG;
  }

  ngOnInit() {}

  protected setLanguageToAdd(event: any) {
    let nativeElem: HTMLInputElement = event?.target;
    if (nativeElem === null || nativeElem === undefined) {
      return;
    }
    this.languageInput = nativeElem.value;
  }

  protected sendAddLanguage() {
    if (this.languageInput == '') {
      console.debug(`${TAG} No m'enviis idiomes buits!!`);
      return;
    } //No ma fiquis idiomes buits!

    this.theLanguagesArray.push(this.languageInput);

    let data: IAddLanguageEv = {
      name: 'IAddLanguageEv',
      lang: this.languageInput,
    };
    console.debug(`Sent data to EventBus`, data);
    EventBus.getInstance().dispatch("IAddLanguageEv",data)
  }

  protected sendRemoveLanguage() {
    if (this.languageToRemove == '') {
      console.debug(`${TAG} No m'enviis idiomes buits, no els podre eliminar!!`);
      return;
    } //No ma fiquis idiomes buits!

    let idx = this.theLanguagesArray.indexOf(this.languageToRemove);
    if (idx > -1) {
      this.theLanguagesArray.splice(idx, 1);
    }

    let data: IRemoveLangEv = {
      name: 'IRemoveLangEv',
      lang: this.languageToRemove,
    };
    console.debug(`Sent data to EventBus`, data);
    EventBus.getInstance().dispatch("IRemoveLangEv",data)

    //coloca el placeholder depenent si te idiomes disponibles o no
    if (this.theLanguagesArray.length === 0) {
      this.selectPlaceholder = NO_LANG;
      this.languageToRemove = '';
    }
  }

  sendAddTranslation() {
    let data: IAddTranslationEv = {
      name: 'IAddTranslationEv',
    };
    console.debug(`Sent data to EventBus`, data);
    EventBus.getInstance().dispatch("IAddTranslationEv",data)
  }
}
