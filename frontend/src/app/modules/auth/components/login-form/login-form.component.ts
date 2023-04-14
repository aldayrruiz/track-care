import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JWT } from '@core/models/jwt.model';
import { AuthService } from '@core/services/auth.service';
import { RouterService } from '@core/services/router.service';
import { SnackerService } from '@core/services/snacker.service';
import { StorageService } from '@core/services/storage.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  loginForm: FormGroup;
  showPassword = false;
  emailErrorMessage = 'Please enter a valid email';

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private storageService: StorageService,
    private snackerService: SnackerService,
    private routerService: RouterService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberEmail: [false, []],
    });
  }

  login() {
    this.authService.signIn(this.email?.value, this.password?.value).subscribe({
      next: (jwt: JWT) => {
        this.authService.storeImportantVariables(jwt);
        this.routerService.goToHome();
      },
      error: (error) => {
        console.error(error);
        this.snackerService.showError(error.error.message);
      },
    });
  }
}
