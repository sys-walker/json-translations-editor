import { CommonModule } from '@angular/common';
import { DownloadFileDialogComponent } from './dialogs/download-file-dialog/download-file-dialog.component';
import { NgModule } from '@angular/core';
import { MatDialogModule, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LoadingJSONComponent } from './dialogs/loading-translation-json/loading-json.component';

@NgModule({
  declarations: [DownloadFileDialogComponent,LoadingJSONComponent],
  imports: [
    CommonModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
  ],
  exports: [DownloadFileDialogComponent,LoadingJSONComponent],
})
export class CustomDialogsModule {}
