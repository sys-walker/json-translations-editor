import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

export interface PeriodicElement {
  TRANSLATION_KEY: string;
  [key: string]: any;
}

const ELEMENT_DATA1: PeriodicElement[] = [
  { es: 1, TRANSLATION_KEY: 'Hydrogen', en: 1.0079, sh: 'H' },
  { es: 2, TRANSLATION_KEY: 'Helium', en: 4.0026, sh: 'He' },
  { es: 3, TRANSLATION_KEY: 'Lithium', en: 6.941, sh: 'Li' },
  { es: 4, TRANSLATION_KEY: 'Beryllium', en: 9.0122, sh: 'Be' },
  { es: 5, TRANSLATION_KEY: 'Boron', en: 10.811, sh: 'B' },
  { es: 6, TRANSLATION_KEY: 'Carbon', en: 12.0107, sh: 'C' },
  { es: 7, TRANSLATION_KEY: 'Nitrogen', en: 14.0067, sh: 'N' },
  { es: 8, TRANSLATION_KEY: 'Oxygen', en: 15.9994, sh: 'O' },
  { es: 9, TRANSLATION_KEY: 'Fluorine', en: 18.9984, sh: 'F' },
  { es: 10, TRANSLATION_KEY: 'Neon', en: 20.1797, sh: 'Ne' },
];

const ELEMENT_DATA2: PeriodicElement[] = [
  {
    TRANSLATION_KEY: 'name',
    file1: 'json-translations3',
    file2: 'other',
    file3: '',
  },
  {
    TRANSLATION_KEY: 'version',
    file1: '0.0.0',
    file2: '1.0.0',
    file3: '',
  },
  {
    TRANSLATION_KEY: 'scripts.ng',
    file1: 'ng',
    file2: '',
    file3: '',
  },
  {
    TRANSLATION_KEY: 'scripts.start',
    file1: 'ng serve',
    file2: '',
    file3: '',
  },
  {
    TRANSLATION_KEY: 'scripts.dependencies.@angular/ssr',
    file1: '^17.2.2',
    file2: '',
    file3: '',
  },
  {
    TRANSLATION_KEY: 'scripts.dependencies.@capawesome/capacitor-file-picker',
    file1: '^5.3.0',
    file2: '',
    file3: '',
  },
  {
    TRANSLATION_KEY: 'scripts.dependencies.express[0]',
    file1: 1,
    file2: '',
    file3: '',
  },
  {
    TRANSLATION_KEY: 'scripts.dependencies.express[1]',
    file1: 2,
    file2: '',
    file3: '',
  },
  {
    TRANSLATION_KEY: 'scripts.dependencies.express[2]',
    file1: 3,
    file2: '',
    file3: '',
  },
  {
    TRANSLATION_KEY: 'scripts.dependencies.express[3]',
    file1: 4,
    file2: '',
    file3: '',
  },
  {
    TRANSLATION_KEY: 'private',
    file1: '',
    file2: true,
    file3: '',
  },
  {
    TRANSLATION_KEY: 'notpresent_in_file1',
    file1: '',
    file2: 'Lorem ipsum',
    file3: '',
  },
  {
    TRANSLATION_KEY: 'euh',
    file1: '',
    file2: '',
    file3: 'Lorem ipsum',
  },
];
const ELEMENT_DATA: PeriodicElement[] =ELEMENT_DATA2;
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
    let newColumnTRANSLATION_KEY = this.randomString(5);
    this.displayedColumns.splice(this.displayedColumns.length - 1, 0, newColumnTRANSLATION_KEY);
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
    return Object.keys(arr[0]).concat(['star']); 
  }
}
