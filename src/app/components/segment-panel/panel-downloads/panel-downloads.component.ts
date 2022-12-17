import { Component, OnDestroy, OnInit } from '@angular/core';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { AppComponent } from 'src/app/app.component';
import { FormatedJSON, IGetTranslationsEv, IRetTranslationsTableEv, ITranslatorEvent } from 'src/app/interfaces';
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

  private subscription!: Subscription;
  //@ts-ignore
  downloadReqAnswer:Registry

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
      (message: IGetTranslationsEv) => {
        this.prepareZipFileAndDownload(<IRetTranslationsTableEv>message);
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

    let zip = new JSZip();
    Object.keys(localeTranslate).map((locale)=>{
      zip.file(`${locale}.json`, localeTranslate[locale]);
    })

    zip.generateAsync({ type: 'blob' }).then(function (content) {
      // see FileSaver.js
      saveAs(content, 'i18n.zip');
    });
  }
  generateJSON(keysT: string[], valuesT: string[][], idx: number) {
    let docJSON: any = {};
    keysT.map((k, i) => {
      docJSON[k] = valuesT[i][idx];
    });

    return docJSON;
  }

  sendDownloadEvent() {
    let data: IGetTranslationsEv = {
      name: 'IGetTranslationsEv',
    };
    console.debug(`Sent data to EventBus`, data);
    EventBus.getInstance().dispatch("IGetTranslationsEv",data)
  }

  radioGroupChange(ev: any) {
    this.flattenFiles = JSON.parse(ev.detail?.value);
  }
  async openDownloadList() {
    const modal = await this.modalController.create({
      component: ModalDownloadsListComponent,
    });
    return await modal.present();
  }

}
