import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmartwatchesResolver } from '@core/resolvers/smartwatches.resolver';
import { UsersResolver } from '@core/resolvers/users.resolver';
import { MapComponent } from './components/map/map.component';
import { PositionsComponent } from './positions.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'map',
    pathMatch: 'full',
  },
  {
    path: '',
    component: PositionsComponent,
    children: [
      {
        path: 'map',
        component: MapComponent,
        resolve: {
          users: UsersResolver,
          smartwatches: SmartwatchesResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PositionsRoutingModule {}
