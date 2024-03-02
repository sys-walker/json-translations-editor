import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import { AngularMaterialComponentsModule } from '../angular-material-components.module';


@NgModule({
  declarations: [
    TestComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialComponentsModule
  
  ],
  exports:[TestComponent]
})
export class CustomComponentsModule { }
