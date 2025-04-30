import { Component } from '@angular/core';
import { JSONUploaderService, LANGUAGEJSON } from '../../../services/json-uploader.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoadingJSONComponent } from '../../dialogs/loading-translation-json/loading-json.component';
import { FilesUoplaodResult } from '../../../interfaces/json-upload';
import { EventBus } from '../../../util/event-bus';

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
    this.uploader.uploadFiles().subscribe((data: FilesUoplaodResult) => {
      if (data.status === 'CANCELLED') {
        // dialogRef.close();
        return;
      } else {
        console.log('sucess upload: ', data);

        EventBus.getInstance().dispatch('FilesUpload', data.files);
        // dialogRef.close();
      }
    });
  }
}
