import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHTMLPipe } from './safe-html.pipe';
@NgModule({
  declarations: [
    SafeHTMLPipe,
    /* Other pipe*/
  ],
  exports: [
    SafeHTMLPipe,
    /* Other pipe*/
  ],
  imports: [CommonModule],
})
export class CustomPipesModule {}
