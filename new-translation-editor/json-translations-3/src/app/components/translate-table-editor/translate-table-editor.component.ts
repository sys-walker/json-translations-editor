import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { EventBus, Registry } from '../../util/event-bus';
import { REMOVE_ICON, TRANSLATION_KEY } from '../../util/constants';
import { ITranslationRow } from '../../interfaces/interfaces';

const FIRST = [
  {
    TRANSLATION_KEY: 'hello_world',
    en: 'Hello World!',
    // etne: 'Hello World!',
    // eetn: 'Hello World!',
    // enp: 'Hello World!',
    // ene: 'Hello World!',
    // een: 'Hello World!',
    // enf: 'Hello World!',
    // eenf: 'Hello World!',

    // en3e: 'Hello World!',
    // e4en: 'Hello World!',
    // en43f: 'Hello World!',
    // ee3nf: 'Hello World!',
  },
];
@Component({
  selector: 'app-translate-table-editor',
  templateUrl: './translate-table-editor.component.html',
  styleUrl: './translate-table-editor.component.scss',
})
export class TranslateTableEditorComponent {
  @ViewChild(MatTable) table!: MatTable<ITranslationRow>;
  uploadListener!: Registry;
  displayedColumns = this.getDisplayedColumns(FIRST);
  dataSource = FIRST;

  ngOnInit() {
    this.uploadListener = EventBus.getInstance().register('FilesUpload', (data: any) => {
      console.log('FilesUpload event received: ', data);
      this.dataSource = data;
      this.displayedColumns = this.getDisplayedColumns(data);
      let language = this.displayedColumns.filter((e) => e !== TRANSLATION_KEY && e !== REMOVE_ICON);
      console.log('languages: ', language);
      this.table.renderRows();
    });
  }
  ngOnDestroy() {
    this.uploadListener.unregister();
  }

  // addData() {
  //   const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
  //   this.dataSource.push(ELEMENT_DATA[randomElementIndex]);
  //   this.table.renderRows();
  // }

  // removeData() {
  //   this.dataSource.pop();
  //   this.table.renderRows();
  // }

  // addColumn() {
  //   let newColumnTRANSLATION_KEY = this.randomString(5);
  //   this.displayedColumns.splice(this.displayedColumns.length - 1, 0, newColumnTRANSLATION_KEY);
  // }

  // removeColumn() {
  //   if (this.displayedColumns.length) {
  //     this.displayedColumns.pop();
  //   }
  //   this.dataSource.forEach((el) => {
  //     console.log(el);
  //   });
  // }

  removeRecord(i?: any) {
    console.log('record removal performed: ', i);
    this.dataSource.splice(i, 1);
    this.table.renderRows();
  }
  getDisplayedColumns(arr: ITranslationRow[]) {
    return Object.keys(arr[0]).concat([REMOVE_ICON]);
  }
}
