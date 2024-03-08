import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialComponentsModule } from '../angular-material-components.module';
import { EditorToolbarComponent } from './editor-toolbar/editor-toolbar.component';
import { EditorTabsComponent } from './editor-tabs/editor-tabs.component';
import { FileTabComponent } from './editor-tabs/file-tab/file-tab.component';
import { LanguageTabComponent } from './editor-tabs/language-tab/language-tab.component';
import { DownloadTabComponent } from './editor-tabs/download-tab/download-tab.component';
import { AboutTabComponent } from './editor-tabs/about-tab/about-tab.component';
import { DownloadFileDialogComponent } from './download-file-dialog/download-file-dialog.component';

@NgModule({
  declarations: [
    EditorToolbarComponent,
    EditorTabsComponent,
    FileTabComponent,
    LanguageTabComponent,
    DownloadTabComponent,
    AboutTabComponent,
    DownloadFileDialogComponent, //Not exported, it will be used only inside 
  ],
  imports: [CommonModule, AngularMaterialComponentsModule],
  exports: [
    EditorToolbarComponent,
    EditorTabsComponent,
    FileTabComponent,
    LanguageTabComponent,
    DownloadTabComponent,
    AboutTabComponent,
  ],
})
export class CustomComponentsModule {}
