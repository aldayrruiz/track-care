import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmartwatchesResolver } from '@core/resolvers/smartwatches.resolver';
import { CreateUserComponent } from './components/create/create-user.component';
import { EditUserComponent } from './components/edit/edit-user.component';
import { UsersTableComponent } from './components/table/users-table.component';
import { UsersComponent } from './users.component';
import { UserResolver } from '@core/resolvers/user.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'table',
    pathMatch: 'full',
  },
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'table',
        component: UsersTableComponent,
      },
      {
        path: 'create',
        component: CreateUserComponent,
        resolve: { smartwatches: SmartwatchesResolver },
      },
      {
        path: 'edit/:userId',
        component: EditUserComponent,
        resolve: {
          user: UserResolver,
          smartwatches: SmartwatchesResolver
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
