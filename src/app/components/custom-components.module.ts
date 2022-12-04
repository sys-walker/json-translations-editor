import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SegmentPanelComponent } from './segment-panel/segment-panel.component';
import { PanelLanguageComponent } from './segment-panel/panel-language/panel-language.component';
import { PanelDownloadsComponent } from './segment-panel/panel-downloads/panel-downloads.component';
import { PanelAboutComponent } from './segment-panel/panel-about/panel-about.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule, ReactiveFormsModule],
  declarations: [
    SegmentPanelComponent,
    PanelLanguageComponent,
    PanelDownloadsComponent,
    PanelAboutComponent
    /* Other componet*/
  ],
  exports: [
    SegmentPanelComponent,
    PanelLanguageComponent,
    PanelDownloadsComponent,
    PanelAboutComponent
    /*Other componet*/
  ],
})
export class CustomComponentsModule {}
