import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from '../app.component';
import { IAddLanguageEv, IAddTranslationEv, IGetTranslationsEv, IRemoveLangEv, IRetTranslationsTableEv } from '../interfaces';
import { EventBus, Registry } from '../services/EventBus/event-bus';

const TAG = 'HomePage';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit,OnDestroy{
  @ViewChild('someInput') someInput!: ElementRef;
  dark: boolean = false;
  selected: string = 'language';
  theArrayHeaders = ['Key', 'en'];
  theArray = [
    [
      '<ion-input style="width: 100%;" value="hello_world"></ion-input>',
      '<ion-input style="width: 100%;" value="Hello World!"></ion-input>',
    ], //value="Default value"
    ['<ion-input style="width: 100%;"></ion-input>', '<ion-input style="width: 100%;"></ion-input>'],
  ];
  numCols = this.theArray[0].length;
  numRows = this.theArray.length;
  //@ts-ignore
  addLanguageListener:Registry;
  //@ts-ignore
  addRowListener:Registry;
  //@ts-ignore
  removeLanguageListener:Registry;
  //@ts-ignore
  downloadRequestListener:Registry;


  constructor(private AppMain: AppComponent) {

  }
  ngOnInit(): void {
    this.addLanguageListener = EventBus.getInstance().register(
      'IAddLanguageEv',
      (message: IAddLanguageEv) => {
        this.addLanguage(<IAddLanguageEv>message);
      }
    );
    this.addRowListener = EventBus.getInstance().register(
      'IAddTranslationEv',
      (message: IAddTranslationEv) => {
        this.addTranslation();
      }
    );
    this.removeLanguageListener= EventBus.getInstance().register(
      'IRemoveLangEv',
      (message: IRemoveLangEv) => {
        this.removeLanguage(<IRemoveLangEv>message);
      }
    );
    this.downloadRequestListener= EventBus.getInstance().register(
      'IGetTranslationsEv',
      (message: IGetTranslationsEv) => {
        this.getCurrentTranslations(message);
      }
    );
  
  }

  ngOnDestroy(): void {
    
  }

  getCurrentTranslations(message: IGetTranslationsEv) {
    let tbody: HTMLTableElement = this.someInput.nativeElement;
    let ionInputs = Array.from(tbody.getElementsByTagName('ion-input'));

    //Converts 1D table to 2D table
    const newArr = [];
    while (ionInputs.length) newArr.push(ionInputs.splice(0, this.theArrayHeaders.length));

    //Iterate for each input and gets its value
    let retArray: any = newArr
      .map((row: any[]) => {
        let values: string[] = row.map((elem: HTMLInputElement) => {
          return elem.value;
        });
        //Undefined for translations thas has no key
        return values[0] != '' ? values : undefined;
      })
      .filter((e) => {
        return e !== undefined;
      });

    let locales = this.getHeadersLanguages(this.theArrayHeaders);
    let { keysT, valuesT } = this.getTranslationTable(retArray);

    let data: IRetTranslationsTableEv = {
      name: 'IRetTranslationsTableEv',
      languages: locales,
      keys: keysT,
      values: valuesT,
      zip: message.zip,
    };
    console.debug(`Sent data to EventBus`, data);
    EventBus.getInstance().dispatch("IRetTranslationsTableEv",data)
  
  }
  getTranslationTable(theArray: string[][]) {
    //throw new Error('Method not implemented.');
    let keysT: string[] = [];
    let valuesT: string[][] = [];

    theArray.map((row) => {
      let k = row.slice(0, 1);
      let v = row.slice(1, row.length);
      keysT.push(k[0]);
      valuesT.push(v);
    });
    return { keysT, valuesT };
  }
  getHeadersLanguages(headers: string[]) {
    //throw new Error('Method not implemented.');
    return headers.slice(1, headers.length);
  }
  addTranslation() {
    this.numCols = this.theArrayHeaders.length;
    let newRow = Array(this.numCols).fill('<ion-input style="width: 100%;"></ion-input>', 0, this.numCols);
    this.theArray.push(newRow);
    
  }
  removeLanguage(res: IRemoveLangEv) {
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
      r.push('<ion-input style="width: 100%;" ></ion-input>');
    });
  }

  enableDarkMode(attr: any) {
    this.AppMain.darkmode.next(attr);
  }

  deleteRow(idx: number) {
    this.theArray.splice(idx, 1);
  }
}
