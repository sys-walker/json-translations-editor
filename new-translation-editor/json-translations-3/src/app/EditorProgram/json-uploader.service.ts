import { Injectable } from '@angular/core';
import {
  Observable,
  Subscription,
  catchError,
  concatMap,
  filter,
  flatMap,
  from,
  map,
  of,
  switchMap,
  tap,
  throwError,
  toArray,
} from 'rxjs';
import { FilePicker, PickFilesResult, PickedFile } from '@capawesome/capacitor-file-picker';

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
                  let stringifiedJSONJson = await object.blob.text();

                  if (!stringifiedJSONJson) {
                    stringifiedJSONJson = JSON.stringify({});
                  }

                  let parsedJSON = JSON.parse(stringifiedJSONJson);
                  parsedJSON['langugeee'] = object.name;
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
      )
      .pipe
      // switchMap((myArray) => {
      //   const stringifiedJSON: string[] = myArray
      //     .map((element) => (element === undefined ? '' : element)) // Replace undefined with empty strings
      //     .filter((element) => element !== ''); // Filter out the empty strings

      //   let parsed = stringifiedJSON.map((e) => {
      //     console.log(JSON.parse(e));

      //     return JSON.parse(e);
      //   });

      //   return of(parsed);
      // })
      ();
  }

  // _uplaodFiles(): Observable<any[]> {
  //   return from<Promise<PickFilesResult>>(
  //     FilePicker.pickFiles({
  //       types: ['application/json'],
  //       multiple: true,
  //     }).catch((err: Error) => {
  //       console.log(err.message);
  //       //Cancelled pick files
  //       return { files: [] };
  //     })
  //   )
  //     .pipe(switchMap((pickFiles: PickFilesResult) => of(pickFiles.files)))
  //     .pipe(map(async (blobFileArr) => {

  //       const jsonArray = await Promise.all(
  //         blobFileArr
  //           .map(async (object: any) => {
  //             let e = object['blob'];
  //             if (!e) {
  //               return undefined;
  //             }
  //             return  await e.text();
  //           })
  //           .filter((element) => {
  //             return element !== undefined && element !== null;
  //           })
  //       ).catch((err) => {
  //         console.debug(err);
  //         return undefined;
  //       });
  //       return of(jsonArray)
  //     }));
  // }
}

/*




   catchError(() => of([])), // Handle cancellation or errors
      map(files => files),
      switchMap(fileArr => {
        // Start loading indicator or handle loading state appropriately
  
        return from(fileArr.).pipe(
          map(file => this.processFile(file)),
          catchError(err => throwError(err)), // Propagate errors
          filter(processedFile => processedFile !== undefined), // Remove skipped files
          toArray() // Combine parsed files into a single array
        );
      })


      //------------------------------------------------------------------------------
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

    const blobFileArr = fileArr

    const jsonArray = await Promise.all(
      blobFileArr
        .map(async (object: any) => {
          let e = object['blob'];
          if (!e) {
            return undefined;
          }
          ret  await e.text();
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
    return jsonArray

*/
