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
      );
    // .pipe(
    //   switchMap((myArray) => {
    // pending merge
    //     return of(myArray);
    //   })
    // );
  }

  mock_uploadFiles() {
    return of(mock)
      .pipe(
        switchMap((val) => {
          let Language_jsonValues:any = {};

          val.forEach((v) => {
            const { LANGUAGEFILE, ...filteredObject } = v;
            let language:string = v['LANGUAGEFILE'];
            Language_jsonValues[language] = filteredObject;
          });

          return of(Language_jsonValues);
        })
      )
      .pipe(
        switchMap((val) => {
          let keysTable=mergedKeys(  Object.values(val))
          console.log(Object.keys(val));
        
          
          return of(val);
        })
      );
  }
}

let mock = [
  {
    name: 'json-translations-editor-angular',
    version: '0.0.1',
    author: 'Syswalker',
    homepage: 'https://sys-walker.github.io/json-translations-editor/',
    'scripts.ng': 'ng',
    'scripts.start': 'ng serve',
    'scripts.build': 'ng build',
    'scripts.watch': 'ng build --watch --configuration development',
    'scripts.test': 'ng test',
    'scripts.lint': 'ng lint',
    'scripts.pretty-check': 'npx prettier --check ./src/app',
    'scripts.pretty-write': 'npx prettier --write ./src/app',
    'scripts.url:dev': 'sed -i -e \'s/^\\(\\s*\\)"baseHref.*$/\\1"baseHref":"\\/",/g\' angular.json',
    'scripts.url:prod':
      'sed -i -e \'s/^\\(\\s*\\)"baseHref.*$/\\1"baseHref":"\\/json-translations-editor\\/",/g\' angular.json',
    'scripts.deploy:production': 'npm run url:prod && ionic build --prod && rm -rfv docs/* && cp -rv www/* docs/',
    'scripts.deploy:manteinance-mode':
      "rm -rfv docs/* && echo \"<!DOCTYPE html><html><style>body, html {height: 100%;margin: 0;}.bottomleft {position: absolute;bottom: 0;left: 16px;}.middle {position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);text-align: center;}hr {mrgin: auto;width: 40%;}</style><body><div><div class='middle'><h1>IN MAINTENANCE MODE</h1><hr><p>I'm working for a awesome update or fixing an important issue (Sorry for the inconvenience)</p></div></div></body></html>\" > index.html && mv index.html docs/",
    private: true,
    'dependencies.@angular/common': '^15.0.0',
    'dependencies.@angular/core': '^15.0.0',
    'dependencies.@angular/forms': '^15.0.0',
    'dependencies.@angular/platform-browser': '^15.0.0',
    'dependencies.@angular/platform-browser-dynamic': '^15.0.0',
    'dependencies.@angular/router': '^15.0.0',
    'dependencies.@capacitor/app': '4.1.1',
    'dependencies.@capacitor/core': '4.6.0',
    'dependencies.@capacitor/haptics': '4.1.0',
    'dependencies.@capacitor/keyboard': '4.1.0',
    'dependencies.@capacitor/status-bar': '4.1.1',
    'dependencies.@capawesome/capacitor-file-picker': '^0.5.2',
    'dependencies.@ionic/angular': '^6.1.9',
    'dependencies.angular-cli-ghpages': '^1.0.5',
    'dependencies.file-saver': '^2.0.5',
    'dependencies.html-escaper': '^3.0.3',
    'dependencies.ionicons': '^6.0.3',
    'dependencies.jszip': '^3.10.1',
    'dependencies.prettier': '^2.8.0',
    'dependencies.rxjs': '~7.5.0',
    'dependencies.tslib': '^2.3.0',
    'dependencies.zone.js': '~0.11.4',
    'devDependencies.@angular-devkit/build-angular': '^15.0.0',
    'devDependencies.@angular-eslint/builder': '^14.0.0',
    'devDependencies.@angular-eslint/eslint-plugin': '^14.0.0',
    'devDependencies.@angular-eslint/eslint-plugin-template': '^14.0.0',
    'devDependencies.@angular-eslint/template-parser': '^14.0.0',
    'devDependencies.@angular/cli': '^15.0.0',
    'devDependencies.@angular/compiler': '^15.0.0',
    'devDependencies.@angular/compiler-cli': '^15.0.0',
    'devDependencies.@angular/language-service': '^15.0.0',
    'devDependencies.@capacitor/cli': '4.6.0',
    'devDependencies.@ionic/angular-toolkit': '^6.0.0',
    'devDependencies.@types/file-saver': '^2.0.5',
    'devDependencies.@types/jasmine': '~4.0.0',
    'devDependencies.@types/node': '^12.11.1',
    'devDependencies.@typescript-eslint/eslint-plugin': '5.3.0',
    'devDependencies.@typescript-eslint/parser': '5.3.0',
    'devDependencies.eslint': '^7.6.0',
    'devDependencies.eslint-plugin-import': '2.22.1',
    'devDependencies.eslint-plugin-jsdoc': '30.7.6',
    'devDependencies.eslint-plugin-prefer-arrow': '1.2.2',
    'devDependencies.jasmine-core': '~4.3.0',
    'devDependencies.jasmine-spec-reporter': '~5.0.0',
    'devDependencies.karma': '~6.4.0',
    'devDependencies.karma-chrome-launcher': '~3.1.0',
    'devDependencies.karma-coverage': '~2.2.0',
    'devDependencies.karma-coverage-istanbul-reporter': '~3.0.2',
    'devDependencies.karma-jasmine': '~5.1.0',
    'devDependencies.karma-jasmine-html-reporter': '~2.0.0',
    'devDependencies.ts-node': '~8.3.0',
    'devDependencies.typescript': '~4.8.4',
    description: 'An Ionic project',
    LANGUAGEFILE: 'package.json',
  },
  {
    version: '0.2.0',
    'configurations[0].name': 'ng serve',
    'configurations[0].type': 'chrome',
    'configurations[0].request': 'launch',
    'configurations[0].preLaunchTask': 'npm: start',
    'configurations[0].url': 'http://localhost:4200/',
    'configurations[1].name': 'ng test',
    'configurations[1].type': 'chrome',
    'configurations[1].request': 'launch',
    'configurations[1].preLaunchTask': 'npm: test',
    'configurations[1].url': 'http://localhost:9876/debug.html',
    LANGUAGEFILE: 'launch.json',
  },
];
