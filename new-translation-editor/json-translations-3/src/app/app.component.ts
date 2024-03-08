import { Component, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import path from 'path';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'json-translations3';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.registerIcons([
      '/download-tab/document-download-icon.svg',
      '/download-tab/download-zip-icon-dark.svg',
      '/download-tab/download-zip-icon.svg',
      '/download-tab/json-file-icon-dark.svg',
      '/download-tab/json-file-icon.svg',
    ]);
  }
  registerIcons(iconsPaths: string[]) {
    iconsPaths.forEach((element) => {
      let iconName = element.split('/').pop();
      iconName = iconName!.replace('-icon', '');
      iconName = iconName!.replace('.svg', '');
      let path = `/assets/icon${element}`;
      console.log(iconName);

      this.matIconRegistry.addSvgIcon(iconName, this.domSanitizer.bypassSecurityTrustResourceUrl(path));
    });
  }
}
