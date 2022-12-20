import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-modal-downloads-list',
  templateUrl: './modal-downloads-list.component.html',
  styleUrls: ['./modal-downloads-list.component.scss'],
})
export class ModalDownloadsListComponent implements OnInit {

  objectURLS:any[]=[];
  dark: boolean = false;

  constructor(public navParams: NavParams,public modalCtrl: ModalController) {

    let table = navParams.get('translations')
    this.dark = navParams.get('dark-mode')
    Object.keys(table).map((locale)=>{  
      this.objectURLS.push({
        filename:`${locale}.json`,
        url:this.createURLObject(table[locale])
      })
    })
  }

  ngOnInit() {}
  closeModal(){
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  downloadZip(){
    let localeTranslate = this.navParams.get('translations')
    let zip = new JSZip();
      Object.keys(localeTranslate).map((locale)=>{
        zip.file(`${locale}.json`, localeTranslate[locale]);
      })
  
      zip.generateAsync({ type: 'blob' }).then(function (content) {
        // see FileSaver.js
        saveAs(content, 'i18n.zip');
      });
  }

  createURLObject(jsonData:string):string{
    let file = new Blob([jsonData], { type: 'application/json' });
    return URL.createObjectURL(file);

  }
}
