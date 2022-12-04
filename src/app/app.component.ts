import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  public darkmode: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public dark: boolean=false;
  constructor() {
    

  }
  ngOnInit(): void {

    this.darkmode.subscribe((enable)=>{
      this.dark= enable;

    });  }

}
