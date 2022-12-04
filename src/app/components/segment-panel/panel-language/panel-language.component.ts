import { Component, OnInit } from '@angular/core';
import { IAddTranslationEv, IAddLanguageEv, IRemoveLangEv } from 'src/app/interfaces';
import { EventsManagerService } from 'src/app/services/events-manager.service';
const TAG="PanelLanguageComponent::"
const NO_LANG="No languages available"
const SELECT_LANG="Select a language"
@Component({
  selector: 'panel-language',
  templateUrl: './panel-language.component.html',
  styleUrls: ['./panel-language.component.scss'],
})
export class PanelLanguageComponent implements OnInit {
  languageInput:string=''
  theLanguagesArray:String[]=['en']
  languageToRemove:string='';
  selectPlaceholder:string='';

  constructor(private sharedEv: EventsManagerService) {
    this.selectPlaceholder=SELECT_LANG;
   }

  ngOnInit() {}

  protected setLanguageToAdd(event:any){
    let nativeElem:HTMLInputElement = event?.target
    if(nativeElem===null || nativeElem===undefined ){
      return;
    }
    this.languageInput=nativeElem.value;
    
  }

  protected sendAddLanguage() {
    if(this.languageInput==""){console.debug(`${TAG} No m'enviis idiomes buits!!`);return;} //No ma fiquis idiomes buits!
    console.log('Clicked button from component',this.languageInput);
    this.theLanguagesArray.push(this.languageInput)
    
    let data: IAddLanguageEv = {
      name: 'IAddLanguageEv',
      lang: this.languageInput,
    };
    this.sharedEv.event.next(data);
  }




  
  protected sendRemoveLanguage() {
    console.log('Called sendRemoveLanguage from component');
    if(this.languageToRemove==""){console.debug(`${TAG} No m'enviis idiomes buits, no els podre eliminar!!`);return;} //No ma fiquis idiomes buits!
  


    let idx = this.theLanguagesArray.indexOf(this.languageToRemove);
    if (idx > -1) {
      this.theLanguagesArray.splice(idx, 1);
    }

   

    let data: IRemoveLangEv = {
      name: 'IRemoveLangEv',
      lang: this.languageToRemove,
    };
    this.sharedEv.event.next(data);

    //coloca el placeholder depenent si te idiomes disponibles o no
    if(this.theLanguagesArray.length===0){
      this.selectPlaceholder=NO_LANG;
      this.languageToRemove='';
    }

    
  }



  sendAddTranslation() {
    console.log('Clicked button from component');
    let data: IAddTranslationEv = {
      name: 'IAddTranslationEv',
    };
    this.sharedEv.event.next(data);
  }
}
