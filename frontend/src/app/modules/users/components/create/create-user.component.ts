import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Smartwatch } from '@core/models/smartwaches/smartwatch.model';
import { CreateUser } from '@core/models/users/create.model';
import { RouterService } from '@core/services/router.service';
import { SnackerService } from '@core/services/snacker.service';
import { UserService } from '@core/services/user.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {
  formGroup!: FormGroup;
  sending = false;
  smartwatches: Smartwatch[] = [];

  constructor(
    private snackerService: SnackerService,
    private routerService: RouterService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.initFormGroup();
    this.resolveData();
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

  createUser(): void {
    const user = this.getFormData();
    this.sending = true;
    const msg = 'Se ha registrado al usuario correctamente';
    this.userService
      .create(user)
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
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      smartwatch: [],
    });
  }

  private getFormData(): CreateUser {
    const email = this.email?.value;
    const name = this.name?.value;
    // this.smartwatch.value have a value, return it in {} else do not include it in {}

    const smartwatch = this.smartwatch?.value;
    return { email, name, smartwatch };
  }

  private resolveData() {
    this.route.data.subscribe((response) => {
      this.smartwatches = response['smartwatches'];
    });
  }
}
