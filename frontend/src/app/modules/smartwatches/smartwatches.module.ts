import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomPipesModule } from '@core/pipes/custom-pipes.module';
import { DialogModule } from '@shared/components/dialogs/dialogs.module';
import { MatModule } from '@shared/modules/angular-material.module';
import { CreateSmartwatchComponent } from './components/create/create-smartwatch.component';
import { SmartwatchesTableComponent } from './components/table/smartwatches-table.component';
import { SmartwatchesRoutingModule } from './smartwatches-routing.module';
import { SmartwatchesComponent } from './smartwatches.component';

@NgModule({
  declarations: [SmartwatchesComponent, SmartwatchesTableComponent, CreateSmartwatchComponent],
  imports: [
    CommonModule,
    SmartwatchesRoutingModule,
    MatModule,
    ReactiveFormsModule,
    CustomPipesModule,
    DialogModule,
  ],
  exports: [SmartwatchesTableComponent, CreateSmartwatchComponent],
})
export class SmartwatchesModule {}
