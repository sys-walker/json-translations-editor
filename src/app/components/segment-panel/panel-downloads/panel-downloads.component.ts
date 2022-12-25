import { Component, OnDestroy, OnInit } from '@angular/core';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { AppComponent } from 'src/app/app.component';
import { FormatedJSON, IGetTranslationsEv, IRetTranslationsTableEv, ITranslatorEvent } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { ModalDownloadsListComponent } from '../../modal-downloads-list/modal-downloads-list.component';
import { Subscription, take } from 'rxjs';
import { EventBus, Registry } from 'src/app/services/EventBus/event-bus';
const TAG = 'PanelDownloadsComponent';
@Component({
  selector: 'panel-downloads',
  templateUrl: './panel-downloads.component.html',
  styleUrls: ['./panel-downloads.component.scss'],
})
export class PanelDownloadsComponent implements OnInit,OnDestroy {
  dark: boolean = false;
  flattenFiles: Boolean = true;

  //@ts-ignore
  downloadReqAnswer:Registry
  
  modalTranslationsProp={}

  constructor(
    private AppMain: AppComponent,
    public modalController: ModalController
  ) {
    this.AppMain.darkmode.subscribe((res) => {
      this.dark = res;
    });
  }
  ngOnDestroy(): void {
    this.downloadReqAnswer.unregister();
  }

  ngOnInit() {

    this.downloadReqAnswer=EventBus.getInstance().register(
      'IRetTranslationsTableEv',
      async (message: IRetTranslationsTableEv) => {  
        if(message.zip){
          this.prepareZipFileAndDownload(message);
        }else{
          this.modalTranslationsProp=this.prepareZipFileAndDownload(message)
          await this.openDownloadList()
        }
      }
    );
   
  }
  prepareZipFileAndDownload(res: IRetTranslationsTableEv) {
    console.debug('Preparing to download');
    let locales = res.languages;
    let keysT = res.keys;
    let valuesT = res.values;
    let localeTranslate:any={}
    locales.map((locale, idx) => {
      let docgen = this.generateJSON(keysT, valuesT, idx);
      if (!this.flattenFiles) {
        docgen = FormatedJSON.unflatten(docgen);
      }
      let text = JSON.stringify(docgen, null, 4);
      localeTranslate[locale]=text;
    });

    if(!res.zip){
      return localeTranslate;
    }else{
      let zip = new JSZip();
      Object.keys(localeTranslate).map((locale)=>{
        zip.file(`${locale}.json`, localeTranslate[locale]);
      })
  
      zip.generateAsync({ type: 'blob' }).then(function (content) {
        // see FileSaver.js
        saveAs(content, 'i18n.zip');
      });
    }
  }
  generateJSON(keysT: string[], valuesT: string[][], idx: number) {
    let docJSON: any = {};
    keysT.map((k, i) => {
      docJSON[k] = valuesT[i][idx];
    });

    return docJSON;
  }

  sendDownloadZipEvent() {
    let data: IGetTranslationsEv = {
      name: 'IGetTranslationsEv',
      zip:true
    };
    console.debug(`Sent data to EventBus`, data);
    EventBus.getInstance().dispatch("IGetTranslationsEv",data)
  }

  radioGroupChange(ev: any) {
    this.flattenFiles = JSON.parse(ev.detail?.value);
  }


  sendDownloadEvent(){
    let data: IGetTranslationsEv = {
      name: 'IGetTranslationsEv',
      zip:false
    };
    console.debug(`Sent data to EventBus`, data);
    EventBus.getInstance().dispatch("IGetTranslationsEv",data)
  }

  async openDownloadList() {
    const modal = await this.modalController.create({
      component: ModalDownloadsListComponent,
      componentProps: {
        translations: this.modalTranslationsProp,
        'dark-mode':this.dark
      }
    });
    return await modal.present();
  }

}
