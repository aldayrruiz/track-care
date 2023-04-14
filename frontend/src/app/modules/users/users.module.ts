import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomPipesModule } from '@core/pipes/custom-pipes.module';
import { DialogModule } from '@shared/components/dialogs/dialogs.module';
import { MatModule } from '@shared/modules/angular-material.module';
import { CreateUserComponent } from './components/create/create-user.component';
import { UsersTableComponent } from './components/table/users-table.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { EditUserComponent } from './components/edit/edit-user.component';

@NgModule({
  declarations: [
    UsersComponent,
    UsersTableComponent,
    CreateUserComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule /* This component is using users routing /admin/users */,
    MatModule,
    ReactiveFormsModule,
    CustomPipesModule,
    DialogModule,
  ],
  exports: [
    UsersTableComponent,
    CreateUserComponent,
    EditUserComponent
  ],
})
export class UsersModule {}
