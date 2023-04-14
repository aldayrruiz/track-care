import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSmartwatchComponent } from './components/create/create-smartwatch.component';
import { SmartwatchesTableComponent } from './components/table/smartwatches-table.component';
import { SmartwatchesComponent } from './smartwatches.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'table',
    pathMatch: 'full',
  },
  {
    path: '',
    component: SmartwatchesComponent,
    children: [
      {
        path: 'table',
        component: SmartwatchesTableComponent,
      },
      { path: 'create', component: CreateSmartwatchComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmartwatchesRoutingModule {}
