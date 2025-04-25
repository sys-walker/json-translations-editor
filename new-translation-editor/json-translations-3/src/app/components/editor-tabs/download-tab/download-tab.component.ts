import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DownloadFileDialogComponent } from '../../dialogs/download-file-dialog/download-file-dialog.component';

@Component({
  selector: 'editor-download-tab',
  templateUrl: './download-tab.component.html',
  styleUrl: './download-tab.component.scss',
})
export class DownloadTabComponent {
  favoriteSeason: string = 'Nested schema';
  seasons: string[] = ['Nested schema', 'Flat schema'];

  constructor(public dialog: MatDialog) {}

  donwloadFile() {
    console.log('click donwloadFile');
    const dialogRef = this.dialog.open(DownloadFileDialogComponent, { minWidth: '80vw' });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  donwloadAllFiles() {
    console.log('click donwloadAllFiles');
  }
}
