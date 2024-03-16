import { Component } from '@angular/core';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { JSONUploaderService } from '../../../EditorProgram/json-uploader.service';

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
    });
    
  }
}
