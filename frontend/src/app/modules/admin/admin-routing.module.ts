import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'positions',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'positions',
        loadChildren: () => import('../positions/positions.module').then((m) => m.PositionsModule),
      },
      {
        path: 'users',
        loadChildren: () => import('../users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'smartwatches',
        loadChildren: () =>
          import('../smartwatches/smartwatches.module').then((m) => m.SmartwatchesModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
