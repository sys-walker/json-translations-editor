import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'json-translations3';
  panelOpenState = false;
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  openAll(){
    console.log(this.accordion);
    
    this.accordion.openAll();
  }
}
