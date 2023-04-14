import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Smartwatch } from '@core/models/smartwaches/smartwatch.model';
import { EditPatchUser } from '@core/models/users/patch.model';
import { User } from '@core/models/users/user.model';
import { RouterService } from '@core/services/router.service';
import { SnackerService } from '@core/services/snacker.service';
import { UserService } from '@core/services/user.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent {
  formGroup!: FormGroup;
  sending = false;
  smartwatches: Smartwatch[] = [];
  user!: User;

  constructor(
    private snackerService: SnackerService,
    private routerService: RouterService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.resolveData();
    this.initFormGroup();
  }

  get email() {
    return this.formGroup.get('email');
  }

  get name() {
    return this.formGroup.get('name');
  }

  get smartwatch() {
    return this.formGroup.get('smartwatch');
  }

  updateUser(): void {
    const user = this.getFormData();
    this.sending = true;
    const msg = 'Se ha actualizado al usuario correctamente';
    this.userService
      .update(this.user.id, user)
      .pipe(finalize(() => (this.sending = false)))
      .subscribe({
        next: async () => {
          this.routerService.goToUsers();
          this.snackerService.showSuccessful(msg);
        },
        error: async (error) => {
          this.snackerService.showError(error.error.message);
        },
      });
  }

  private initFormGroup() {
    this.formGroup = this.formBuilder.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      name: [this.user.name, [Validators.required]],
      smartwatch: [this.user.smartwatch, []],
    });
  }

  private getFormData(): EditPatchUser {
    const email = this.email?.value;
    const name = this.name?.value;
    const smartwatch = this.smartwatch?.value;
    return { email, name, smartwatch };
  }

  private resolveData() {
    this.route.data.subscribe((response) => {
      this.smartwatches = response['smartwatches'];
      this.user = response['user'];
    });
  }
}
