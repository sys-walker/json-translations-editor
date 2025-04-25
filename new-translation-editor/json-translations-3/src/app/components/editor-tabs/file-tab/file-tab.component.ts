import { Component } from '@angular/core';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { JSONUploaderService, LANGUAGEJSON, TRANSLATION_KEY } from '../../../services/json-uploader.service';
import { mergedKeys } from '../../../util/json-functions';
import { ITranslationRow, IntermediaryFileTranslation, TranslationLiteral } from '../../../interfaces/interfaces';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoadingJSONComponent } from '../../dialogs/loading-translation-json/loading-json.component';
import { FilesUoplaodResult } from '../../../interfaces/json-upload';

@Component({
  selector: 'editor-file-tab',
  templateUrl: './file-tab.component.html',
  styleUrl: './file-tab.component.scss',
})
export class FileTabComponent {
  constructor(
    private uploader: JSONUploaderService,
    public dialog: MatDialog
  ) {}

  async uploadFile() {
    const dialogRef = this.dialog.open(LoadingJSONComponent);
    //@ts-ignore
    dialogRef.componentInstance.title = 'Loading JSON files...';
    //@ts-ignore
    dialogRef.componentInstance.message = 'Please wait while we load the JSON files.';
    this.uploader.uploadFiles().subscribe((data: FilesUoplaodResult) => {
      if (data.status === 'CANCELLED') {
        dialogRef.close();
        return;
      } else {
        dialogRef.close();
      

      

        console.log(data.files);
      }
    });
  }
}
