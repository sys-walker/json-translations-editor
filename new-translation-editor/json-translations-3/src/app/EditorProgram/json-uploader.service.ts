import { Injectable } from '@angular/core';
import { from, of, switchMap } from 'rxjs';
import { FilePicker, PickFilesResult, PickedFile } from '@capawesome/capacitor-file-picker';
import { FormatedJSON } from '../util/json-formatter';
import { mergedKeys } from '../util/json-functions';

@Injectable({
  providedIn: 'root',
})

export class JSONUploaderService {
  constructor() {}

  uploadFiles() {
    return from(
      FilePicker.pickFiles({
        types: ['application/json'],
        multiple: true,
      }).catch((err: Error) => {
        console.log(err.message);
        return { files: [] };
      })
    )
      .pipe(switchMap((pickFiles: PickFilesResult) => of(pickFiles.files)))
      .pipe(
        switchMap(async (blobFileArr: PickedFile[]) => {
          let r = await Promise.all(
            blobFileArr
              .map(async (object: PickedFile) => {
                if (object.blob !== undefined) {
                  let filename = object.name;
                  let stringifiedJSON = await object.blob.text();

                  if (!stringifiedJSON) {
                    //show error????
                    stringifiedJSON = JSON.stringify({});
                  }
                  let objectJSON = JSON.parse(stringifiedJSON);
                  let parsedJSON = FormatedJSON.flatten(objectJSON);
                  parsedJSON[LANGUAGEJSON] = filename.replace('.json', '');
                  return parsedJSON;
                }
                return undefined;
              })
              .filter((element) => {
                return element !== undefined && element !== null;
              })
          );

          return r;
        })
      );
    // .pipe(
    //   switchMap((myArray) => {
    // pending merge
    //     return of(myArray);
    //   })
    // );
  }


}
export const LANGUAGEJSON= 'languageJsonTranslation'
export const TRANSLATION_KEY= 'TRANSLATION_KEY'