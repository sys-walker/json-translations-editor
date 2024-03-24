import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

export interface TableElement {
  [locale: string]: any;
}
export interface TableElementKey {
  [key: string]: TableElement;
}

const ELEMENT_DATA_KEY: TableElementKey[] = [
  { Hydrogen: { ca: 1, es: 'Hydrogen', jp: 1.0079, ko: 'H' } },
  { Helium: { ca: 2, es: 'Helium', jp: 4.0026, ko: 'He' } },
  { Lithium: { ca: 3, es: 'Lithium', jp: 6.941, ko: 'Li' } },
  { Beryllium: { ca: 4, es: 'Beryllium', jp: 9.0122, ko: 'Be' } },
  { Boron: { ca: 5, es: 'Boron', jp: 10.811, ko: 'B' } },
];

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  [key: string]: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-translate-table-editor',
  templateUrl: './translate-table-editor.component.html',
  styleUrl: './translate-table-editor.component.scss',
})
export class TranslateTableEditorComponent {
  displayedColumns = this.getPeriodicElementDisplayedColumns(ELEMENT_DATA);
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable)
  table!: MatTable<PeriodicElement>;

  addData() {
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataSource.push(ELEMENT_DATA[randomElementIndex]);
    this.table.renderRows();
  }

  removeData() {
    this.dataSource.pop();
    this.table.renderRows();
  }

  addColumn() {
    let newColumnName = this.randomString(5);
    // this.dataSource.forEach((el) => {
    //   console.log(el[newColumnName]);
    //   //el[newColumnName] = 'Lorem Ipsum';
    // });
    this.displayedColumns.splice(this.displayedColumns.length - 1, 0, newColumnName);
  }

  removeColumn() {
    if (this.displayedColumns.length) {
      this.displayedColumns.pop();
    }
    this.dataSource.forEach((el) => {
      console.log(el);
    });
  }

  removeRecord(i?: any) {
    console.log('record removal performed: ', i);
    this.dataSource.splice(i, 1);
    this.table.renderRows();
  }
  //random
  randomString(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  getPeriodicElementDisplayedColumns(arr: PeriodicElement[]) {
    return ['name', 'symbol', 'position', 'weight', 'star'];
  }
}
