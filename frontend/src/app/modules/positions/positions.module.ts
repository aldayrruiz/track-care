import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CustomPipesModule } from '@core/pipes/custom-pipes.module';
import { MatModule } from '@shared/modules/angular-material.module';
import { SharedModule } from '@shared/shared.module';
import { MapComponent } from './components/map/map.component';
import { PositionsRoutingModule } from './positions-routing.module';
import { PositionsComponent } from './positions.component';
@NgModule({
  declarations: [PositionsComponent, MapComponent],
  imports: [
    CommonModule,
    PositionsRoutingModule,
    SharedModule,
    LeafletModule,
    MatModule,
    CustomPipesModule,
  ],
  exports: [MapComponent],
})
export class PositionsModule {}
