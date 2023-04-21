import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from '../app.component';
import {
  IAddLanguageEv,
  IAddTranslationEv,
  IGetCurrentLangs,
  IGetTranslationsEv,
  IRemoveLangEv,
  IRetCurrentLangs,
  IRetTranslationsTableEv,
  ISaveQuery,
  IUploadFile,
} from '../interfaces/interfaces';
import { EventBus, Registry } from '../services/EventBus/event-bus';

const TAG = 'HomePage';

export const INPUT_ELEMENT_EMPTY = '<ion-input style="width: 100%;"></ion-input>';

export function INPUT_ELEMENT(value: string) {
  if (!value) {
    throw new Error('Must provide value.');
  }
  return `<ion-input style="width: 100%;" value="${value}"></ion-input>`;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  @ViewChild('someInput') someInput!: ElementRef;
  @ViewChild('THeadLang') THeadLang!: ElementRef;
  @ViewChild('TBodyInputs') TBodyInputs!: ElementRef;
  dark: boolean = false;
  selected: string = 'file';
  theArrayHeaders = ['Key', 'en'];
  theArray = [
    [INPUT_ELEMENT('hello_world'), INPUT_ELEMENT('Hello world!')],
    [INPUT_ELEMENT_EMPTY, INPUT_ELEMENT_EMPTY],
  ];
  numCols = this.theArray[0].length;
  numRows = this.theArray.length;

  addLanguageListener!: Registry;
  addRowListener!: Registry;
  removeLanguageListener!: Registry;
  downloadRequestListener!: Registry;
  uploadTableListener!: Registry;
  requestLanguagesListener!: Registry;
  saveQueryListener!: Registry;

  constructor(private AppMain: AppComponent) {}

  ngOnInit(): void {
    this.addLanguageListener = EventBus.getInstance().register('IAddLanguageEv', (message: IAddLanguageEv) => {
      this.addLanguage(<IAddLanguageEv>message);
    });
    this.addRowListener = EventBus.getInstance().register('IAddTranslationEv', (message: IAddTranslationEv) => {
      this.addTranslation();
    });
    this.removeLanguageListener = EventBus.getInstance().register('IRemoveLangEv', (message: IRemoveLangEv) => {
      this.removeLanguage(<IRemoveLangEv>message);
    });
    this.downloadRequestListener = EventBus.getInstance().register(
      'IGetTranslationsEv',
      (message: IGetTranslationsEv) => {
        this.getCurrentTranslations(message);
      }
    );
    this.uploadTableListener = EventBus.getInstance().register('IUploadFile', (message: IUploadFile) => {
      this.theArrayHeaders = message.headers;
      this.theArray = message.table;
    });
    this.requestLanguagesListener = EventBus.getInstance().register('IGetCurrentLangs', (message: IGetCurrentLangs) => {
      let data: IRetCurrentLangs = {
        name: 'IRetCurrentLangs',
        headers: this.theArrayHeaders,
      };
      EventBus.getInstance().dispatch('IRetCurrentLangs', data);
    });

    this.saveQueryListener = EventBus.getInstance().register('ISaveQuery', (message: ISaveQuery) => {
      console.log(message)
      //Refactor  to function
      let head:HTMLTableSectionElement =this.THeadLang.nativeElement
      let childs =head.children[0].children
      Array.from(childs).forEach(e=>{

        console.log(e.innerHTML)

      })
      //TBODY
      let body:HTMLTableSectionElement =this.TBodyInputs.nativeElement
      let body_childs =body.children
      console.log(body_childs);
      Array.from(body_childs).forEach(e=>{
        console.log(e);
      })
      

    });
  }


  ionViewDidEnter() {
    const slider: HTMLElement = document.querySelector('.draggable');
    let mouseDown = false;
    let startX, scrollLeft;

    let startDragging = function (e) {
      mouseDown = true;
      //@ts-ignore
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };
    let stopDragging = function (event) {
      mouseDown = false;
    };

    slider.addEventListener('mousemove', (e) => {
      e.preventDefault();
      if (!mouseDown) {
        return;
      }
      //@ts-ignore
      const x = e.pageX - slider.offsetLeft;
      const scroll = x - startX;
      slider.scrollLeft = scrollLeft - scroll;
    });

    // Add the event listeners
    slider.addEventListener('mousedown', startDragging, false);
    slider.addEventListener('mouseup', stopDragging, false);
    slider.addEventListener('mouseleave', stopDragging, false);
  }

  ngOnDestroy(): void {}

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
    EventBus.getInstance().dispatch('IRetTranslationsTableEv', data);
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
    let newRow = Array(this.numCols).fill(INPUT_ELEMENT_EMPTY, 0, this.numCols);
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
    this.theArray.map((r: string[]) => {
      r.push(INPUT_ELEMENT_EMPTY);
    });
  }
  enableDarkMode(attr: any) {
    this.AppMain.darkmode.next(attr);
  }
  deleteRow(idx: number) {
    this.theArray.splice(idx, 1);
  }
}
