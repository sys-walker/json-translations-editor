import { Injectable } from '@angular/core';
import { catchError, defer, filter, forkJoin, from, iif, of, switchMap } from 'rxjs';
import { FilePicker, PickFilesResult, PickedFile } from '@capawesome/capacitor-file-picker';
import { FormatedJSON } from '../util/json-formatter';
import { mergedKeys } from '../util/json-functions';
import { PickFilesStatus } from '../interfaces/json-upload';
import { IntermediaryFileTranslation, ITranslationRow, TranslationLiteral } from './interfaces';
import { TRANSLATION_KEY } from '../util/constants';

@Injectable({
  providedIn: 'root',
})
export class JSONUploaderService {
  constructor() {}

  uploadFiles() {
    return from(FilePicker.pickFiles({ types: ['application/json'], multiple: true })).pipe(
      catchError((err: Error) => {
        console.log(err.message);
        return of({ files: [] });
      }),
      switchMap((pickFiles: PickFilesResult) => {
        return iif(() => pickFiles.files.length === 0, this.errorUpload$(), this.process$(pickFiles.files));
      })
    );
  }
  errorUpload$() {
    return of({ status: PickFilesStatus.CANCELLED, files: [] });
  }
  process$(blobFileArr: PickedFile[]) {
    let obsArr = blobFileArr.map((object: PickedFile) => {
      if (object.blob !== undefined) {
        return defer(() => from(object.blob!!.text())).pipe(
          switchMap((stringifiedJSON: string) => {
            if (!stringifiedJSON) {
              //show error????
              stringifiedJSON = JSON.stringify({});
            }
            let objectJSON = JSON.parse(stringifiedJSON);
            let parsedJSON = FormatedJSON.flatten(objectJSON);
            parsedJSON[LANGUAGEJSON] = object.name.replace('.json', '');
            return of(parsedJSON);
          })
        );
      } else {
        return of(undefined);
      }
    });

    return forkJoin(obsArr).pipe(
      switchMap((res) => {
        return of({ status: PickFilesStatus.SUCCESS, files: this.process2(res) });
      })
    );
  }
  process2(data: any) {
    let intermediaryObjFile: IntermediaryFileTranslation = {};
    data.forEach((d: TranslationLiteral) => {
      intermediaryObjFile[d[LANGUAGEJSON]] = d;
      delete d[LANGUAGEJSON];
    });

    let mergedKeys_: string[] = mergedKeys(data);

    let outputArray: ITranslationRow[] = [];
    for (let k of mergedKeys_) {
      let output: any = {};
      output[TRANSLATION_KEY] = k;
      for (let lang of Object.keys(intermediaryObjFile)) {
        output[lang] = intermediaryObjFile[lang][k] || '';
      }
      outputArray.push(output);
    }

    return outputArray;
  }
}
export const LANGUAGEJSON = 'languageJsonTranslation';

