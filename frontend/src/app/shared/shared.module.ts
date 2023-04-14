import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatModule } from './modules/angular-material.module';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [CommonModule, MatModule],
  exports: [ToolbarComponent],
})
export class SharedModule {}
