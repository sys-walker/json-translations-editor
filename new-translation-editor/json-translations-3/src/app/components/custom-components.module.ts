import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import { AngularMaterialComponentsModule } from '../angular-material-components.module';
import { EditorToolbarComponent } from './editor-toolbar/editor-toolbar.component';
import { EditorTabsComponent } from './editor-tabs/editor-tabs.component';

@NgModule({
  declarations: [TestComponent, EditorToolbarComponent, EditorTabsComponent],
  imports: [CommonModule, AngularMaterialComponentsModule],
  exports: [TestComponent, EditorToolbarComponent, EditorTabsComponent],
})
export class CustomComponentsModule {}
