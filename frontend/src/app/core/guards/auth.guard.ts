import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { RouterService } from '@core/services/router.service';
import { StorageService } from '@core/services/storage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanLoad {
  constructor(
    private storageService: StorageService,
    private routerService: RouterService,
    private authService: AuthService
  ) {}

  async canLoad() {
    const jwt = this.storageService.getJWT();
    if (jwt) {
      return true;
    } else {
      this.authService.logout();
      await this.routerService.goToSignIn();
      return false;
    }
  }
}
