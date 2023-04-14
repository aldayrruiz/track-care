import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from '@shared/modules/angular-material.module';
import { SharedModule } from '@shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

@NgModule({
  declarations: [AuthComponent, LoginFormComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatModule,
    SharedModule,
  ],
})
export class AuthModule {}
