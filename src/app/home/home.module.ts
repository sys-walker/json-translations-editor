import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { CustomComponentsModule } from '../components/custom-components.module';
import { CustomPipesModule } from '../pipes/custom-pipes.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule, CustomComponentsModule, CustomPipesModule],
  declarations: [HomePage],
})
export class HomePageModule {}
