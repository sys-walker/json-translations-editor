import { Component } from '@angular/core';

@Component({
  selector: 'app-download-file-dialog',
  templateUrl: './download-file-dialog.component.html',
  styleUrl: './download-file-dialog.component.scss'
})
export class DownloadFileDialogComponent {
  folders: ItemDownload[] = [
    {
      name: 'es.json',
   
    },
    {
      name: 'en.json',
    },
    {
      name: 'ca.json',
    },
  ];
}
export interface ItemDownload {
  name: string;
}