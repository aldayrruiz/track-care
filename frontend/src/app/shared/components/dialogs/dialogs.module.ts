import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DeleteUserComponent } from './delete-user/delete-user.component';
// My components & modules
import { MatModule } from '@shared/modules/angular-material.module';
import { DeleteSmartwatchComponent } from './delete-smartwatch/delete-smartwatch.component';

@NgModule({
  declarations: [DeleteUserComponent, DeleteSmartwatchComponent],
  imports: [
    FormsModule,
    CommonModule,
    /* Due to all of these declared components needs Angular Material. I need to import them */
    MatModule,
  ],
  exports: [DeleteUserComponent, DeleteSmartwatchComponent],
})
export class DialogModule {}
