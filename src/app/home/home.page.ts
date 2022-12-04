import { Component, Inject } from '@angular/core';
import { AppComponent } from '../app.component';
import { IAddLanguageEv, IRemoveLangEv, ITranslatorEvent } from '../interfaces';
import { EventsManagerService } from '../services/events-manager.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  dark: boolean = false;
  selected: string = 'language';
  theArrayHeaders = ['Key', 'en'];
  theArray = [
    ['<ion-input value="hello_world"></ion-input>', '<ion-input value="Hello World!"></ion-input>'], //value="Default value"

  ];
  numCols = this.theArray[0].length;
  numRows = this.theArray.length;
  constructor(private sharedEv: EventsManagerService, private AppMain: AppComponent) {
    this.sharedEv.event.subscribe((res: ITranslatorEvent) => {
      this.manageEvent(res);
    });
  }
  manageEvent(res: ITranslatorEvent) {
    if (res === undefined) {
      return;
    }
    console.log(`Received ${res.name} Event`);
    switch (res.name) {
      case 'IAddLanguageEv':
        this.addLanguage(<IAddLanguageEv>res);
        break; //IRemoveLangEv
      case 'IRemoveLangEv':
        this.removeLanguage(<IRemoveLangEv>res);
        break;
      case 'IAddTranslationEv':
        this.addTranslation();
        break;
      default:
        break;
    }
  }
  addTranslation() {
    this.numCols = this.theArrayHeaders.length;
    let newRow = Array(this.numCols).fill('<ion-input></ion-input>', 0, this.numCols);

    this.theArray.push(newRow);
    console.log(this.theArray)
  }
  removeLanguage(res: IRemoveLangEv) {
    console.log(res);
    
    let idx = this.theArrayHeaders.indexOf(res.lang);
    if (idx > -1) {
      // only splice array when item is found
      this.numRows = this.theArray.length;
      this.theArrayHeaders.splice(idx, 1); // 2nd parameter means remove one item only
      this.theArray.map((row) => {
        row.splice(idx, 1);
      });
    }
  }
  addLanguage(res: IAddLanguageEv) {
    this.numCols = this.theArray[0].length;
    this.theArrayHeaders.push(res.lang);
    this.theArray.map((r) => {
      r.push('<ion-input></ion-input>');
    });
  }



  enableDarkMode(attr: any) {
    console.log(attr);
    this.AppMain.darkmode.next(attr);
  }

  deleteRow(idx:number){
    this.theArray.splice(idx,1)
  }
}
