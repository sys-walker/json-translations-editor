import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FilePicker, PickFilesResult } from '@capawesome/capacitor-file-picker';
import { AlertController, LoadingController } from '@ionic/angular';
import { INPUT_ELEMENT, INPUT_ELEMENT_EMPTY } from 'src/app/home/home.page';
import { FormatedJSON, IUploadFile } from 'src/app/interfaces/interfaces';
import { EventBus } from 'src/app/services/EventBus/event-bus';
import { escape } from 'html-escaper';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'panel-file',
  templateUrl: './panel-file.component.html',
  styleUrls: ['./panel-file.component.scss'],
})
export class PanelFileComponent implements OnInit {
  dark: boolean = false;
  loading: HTMLIonLoadingElement = undefined;

  constructor(
    private alertController: AlertController,
    private AppMain: AppComponent,
    private loadingCtrl: LoadingController
  ) {
    this.AppMain.darkmode.subscribe((res) => {
      this.dark = res;
    });
  }

  ngOnInit() {}

  async uploadMultipleFiles() {
    let pressedOkay = false;
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      message: 'It will erase all translation table translations',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (arg) => {},
        },
        {
          text: 'Okay',
          handler: async () => {
            pressedOkay = true;
          },
        },
      ],
    });
    alert
      .onDidDismiss()
      .then(async () => {
        if (!pressedOkay) {
          return;
        }
        this.loading = await this.loadingCtrl.create({
          message: 'Loading...',
          spinner: 'circles',
        });

        await this.loading.present();

        await this.uploadMultipleFiles_().catch((err) => {
          console.debug(err);
        });
      })
      .catch((err) => {
        console.debug(err);
      })
      .finally(async () => {
        await this.loading.dismiss();
      });

    await alert.present();
  }
  async uploadMultipleFiles_() {
    const pickFiles = await FilePicker.pickFiles({
      types: ['application/json'],
      multiple: true,
    }).catch(() => {
      return undefined;
    });
    if (pickFiles === undefined) {
      //we did not pick files
      return;
    }

    const fileArr = pickFiles.files;

    //start loading

    const blobFileArr = fileArr.map((x) => {
      return { blob: x.blob, fname: x.name };
    });

    const jsonArray = await Promise.all(
      blobFileArr
        .map(async (object: any) => {
          let e = object['blob'];
          if (!e) {
            return undefined;
          }
          let txt = await e.text();
          let json = FormatedJSON.text2json(txt);
          let flattened = FormatedJSON.flatten(json);
          flattened['filename-locale'] = object['fname']?.replace('.json', ''); //D'alguna forma he de saber de quin idioma es tracta LOL
          return flattened;
        })
        .filter((element) => {
          return element !== undefined && element !== null;
        })
    ).catch((err) => {
      console.debug(err);
      return undefined;
    });
    if (jsonArray === undefined) {
      //alert
      //Exit if something was wrong
      return;
    }

    //Get all common and not common keys from json
    let setKeys: Set<string> = new Set();
    jsonArray.map((obj) => {
      Object.keys(obj).map((k) => {
        setKeys.add(k);
      });
    });

    //construct output json
    let output = {};
    for (const k of setKeys) {
      output[k] = [];
    }

    let added = 1;
    jsonArray.map((obj) => {
      output = jsonConcat(output, obj, added);
      added++;
    });

    //End Loading

    let outputTableHeaders: string[] = ['Key'];

    let outputTable: string[][] = [];

    Object.keys(output).map((k) => {
      let valuesArray = [k].concat(output[k]);
      //first value is translation key
      //we ned to filter 'filename-locale' that helps us to identify translation language and add it to headers
      if (valuesArray[0] === 'filename-locale') {
        let localesArray = valuesArray.slice(1);
        localesArray.map((l) => {
          outputTableHeaders.push(l);
        });
      } else {
        let inputsArray = valuesArray.map((v) => {
          if (v === '') {
            return INPUT_ELEMENT_EMPTY;
          } else {
            let escapedHTML = escape(v); //if a translation contains html
            return INPUT_ELEMENT(escapedHTML);
          }
        });
        outputTable.push(inputsArray);
      }
    });
    let data: IUploadFile = {
      name: 'IUploadFile',
      headers: outputTableHeaders,
      table: outputTable,
    };
    console.debug(`Sent data to EventBus`, data);
    EventBus.getInstance().dispatch('IUploadFile', data);

    //Save to local storage
  }
}

function jsonConcat(o1, o2, numCols: number) {
  for (var key in o2) {
    if (!(key in o1)) {
      let arr = [];
      arr.push(o2[key]);
      o1[key] = arr;
    } else {
      let savedArr = o1[key];
      savedArr.push(o2[key]);
    }
  }

  for (var key in o1) {
    if (o1[key].length !== numCols) {
      let remaining = numCols - o1[key].length;
      const rArray = Array(remaining).fill('', 0, remaining);
      let old = o1[key];

      o1[key] = old.concat(rArray);
    }
  }
  return o1;
}
