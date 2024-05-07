import { Component } from '@angular/core';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { JSONUploaderService, LANGUAGEJSON, TRANSLATION_KEY } from '../../../EditorProgram/json-uploader.service';
import { mergedKeys } from '../../../util/json-functions';
import { ITranslationRow, IntermediaryFileTranslation, TranslationLiteral } from '../../../EditorProgram/interfaces';

@Component({
  selector: 'editor-file-tab',
  templateUrl: './file-tab.component.html',
  styleUrl: './file-tab.component.scss',
})
export class FileTabComponent {
  constructor(private uploader: JSONUploaderService) {}

  async uploadFile() {
    this.uploader.uploadFiles().subscribe((data) => {
      console.log('Uploaded: ', data);


      let intermediaryObjFile: IntermediaryFileTranslation={};
      data.forEach((d:TranslationLiteral) => {
        intermediaryObjFile[d[LANGUAGEJSON]] = d;
        delete d[LANGUAGEJSON];
      });





      let mergedKeys_:string[] = mergedKeys(data);


      let outputArray: ITranslationRow[] = [];
      for (let k of mergedKeys_) {
        let output: any = {};
        output[TRANSLATION_KEY] = k;
        for (let lang of Object.keys(intermediaryObjFile)) {
          output[lang] = intermediaryObjFile[lang][k] || '';
        }
        outputArray.push(output);
      }

      console.log(outputArray);
    });
  }
}
